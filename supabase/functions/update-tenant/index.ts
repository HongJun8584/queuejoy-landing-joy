import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.39.3';

// Allowed origins for CORS
const allowedOrigins = [
  'https://queuejoy.netlify.app',
  'https://helloqueuejoy.netlify.app',
];

function getCorsHeaders(origin: string | null): Record<string, string> {
  const allowedOrigin = origin && allowedOrigins.includes(origin) 
    ? origin 
    : allowedOrigins[0];
  
  return {
    'Access-Control-Allow-Origin': allowedOrigin,
    'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
    'Access-Control-Allow-Credentials': 'true',
  };
}

// Structured logger with sanitization
const logger = {
  info: (message: string, context?: Record<string, unknown>) => {
    const sanitized = sanitizeContext(context);
    console.log(JSON.stringify({ 
      level: 'info', 
      message, 
      timestamp: new Date().toISOString(), 
      ...sanitized 
    }));
  },
  error: (message: string, context?: Record<string, unknown>) => {
    const sanitized = sanitizeContext(context);
    console.error(JSON.stringify({ 
      level: 'error', 
      message, 
      timestamp: new Date().toISOString(), 
      ...sanitized 
    }));
  }
};

function sanitizeContext(context?: Record<string, unknown>): Record<string, unknown> {
  if (!context) return {};
  const sanitized = { ...context };
  
  if (typeof sanitized.slug === 'string' && (sanitized.slug as string).length > 20) {
    sanitized.slug = `${(sanitized.slug as string).substring(0, 20)}...`;
  }
  if (typeof sanitized.token === 'string') {
    sanitized.token = '[REDACTED]';
  }
  
  return sanitized;
}

// Validate token format (64 hex characters)
function validateTokenFormat(token: string): boolean {
  return /^[a-f0-9]{64}$/i.test(token);
}

// Validate slug format
function validateSlugFormat(slug: string): boolean {
  if (!slug || typeof slug !== 'string') return false;
  if (slug.length < 3 || slug.length > 50) return false;
  return /^[a-z0-9-]+$/.test(slug);
}

// Basic HTML sanitization - strip script tags and dangerous attributes
function sanitizeHtml(html: string): string {
  if (!html) return '';
  
  // Remove script tags and their content
  let sanitized = html.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '');
  
  // Remove event handler attributes (onclick, onerror, etc.)
  sanitized = sanitized.replace(/\son\w+\s*=\s*["'][^"']*["']/gi, '');
  sanitized = sanitized.replace(/\son\w+\s*=\s*[^\s>]*/gi, '');
  
  // Remove javascript: protocol
  sanitized = sanitized.replace(/javascript:/gi, '');
  
  // Remove dangerous tags
  sanitized = sanitized.replace(/<iframe\b[^<]*(?:(?!<\/iframe>)<[^<]*)*<\/iframe>/gi, '');
  sanitized = sanitized.replace(/<object\b[^<]*(?:(?!<\/object>)<[^<]*)*<\/object>/gi, '');
  sanitized = sanitized.replace(/<embed\b[^<]*(?:(?!<\/embed>)<[^<]*)*<\/embed>/gi, '');
  
  return sanitized.trim();
}

serve(async (req) => {
  const origin = req.headers.get('origin');
  const corsHeaders = getCorsHeaders(origin);

  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { slug, token, settings, logo_url, logo_upload } = await req.json();

    if (!slug || !token) {
      return new Response(
        JSON.stringify({ error: 'Missing slug or token' }),
        {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          status: 400,
        }
      );
    }


    // Validate slug format
    if (!validateSlugFormat(slug)) {
      return new Response(
        JSON.stringify({ error: 'Invalid credentials' }),
        {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          status: 401,
        }
      );
    }

    // Validate token format before hashing
    if (!validateTokenFormat(token)) {
      return new Response(
        JSON.stringify({ error: 'Invalid credentials' }),
        {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          status: 401,
        }
      );
    }

    logger.info('Updating tenant', { slug });

    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const supabase = createClient(supabaseUrl, supabaseKey);

    // Hash the provided token
    const encoder = new TextEncoder();
    const data = encoder.encode(token);
    const hashBuffer = await crypto.subtle.digest('SHA-256', data);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const hashedToken = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');

    // Verify authentication
    const { data: tenant, error: authError } = await supabase
      .from('tenants')
      .select('id')
      .eq('slug', slug)
      .eq('admin_token_hash', hashedToken)
      .single();

    if (authError || !tenant) {
      logger.error('Invalid admin credentials for update', { slug });
      return new Response(
        JSON.stringify({ error: 'Invalid credentials' }),
        {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          status: 401,
        }
      );
    }

    // Validate and sanitize settings
    if (settings) {
      // Validate business_name
      if (settings.business_name && typeof settings.business_name === 'string') {
        settings.business_name = settings.business_name.trim().substring(0, 100);
      }
      
      // Validate welcome_text
      if (settings.welcome_text && typeof settings.welcome_text === 'string') {
        settings.welcome_text = settings.welcome_text.trim().substring(0, 200);
      }
      
      // Sanitize ads_html
      if (settings.ads_html !== undefined) {
        if (typeof settings.ads_html === 'string') {
          settings.ads_html = sanitizeHtml(settings.ads_html).substring(0, 5000);
        } else {
          settings.ads_html = '';
        }
      }
    }

    // Update tenant
    const updateData: Record<string, unknown> = {
      updated_at: new Date().toISOString()
    };

    if (settings) {
      updateData.settings = settings;
    }

    if (logo_url !== undefined) {
      updateData.logo_url = logo_url;
    }

    const { error: updateError } = await supabase
      .from('tenants')
      .update(updateData)
      .eq('id', tenant.id);

    if (updateError) {
      logger.error('Error updating tenant', { slug, error: updateError.message });
      return new Response(
        JSON.stringify({ error: 'Failed to update tenant' }),
        {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          status: 500,
        }
      );
    }

    logger.info('Tenant updated successfully', { slug });

    return new Response(
      JSON.stringify({ success: true }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200,
      }
    );
  } catch (error) {
    logger.error('Error updating tenant', { error: error instanceof Error ? error.message : 'Unknown error' });
    return new Response(
      JSON.stringify({ error: 'An error occurred' }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 500,
      }
    );
  }
});
