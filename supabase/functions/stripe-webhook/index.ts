import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import Stripe from 'https://esm.sh/stripe@14.21.0';
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.39.3';

const stripe = new Stripe(Deno.env.get('STRIPE_SECRET_KEY') || '', {
  apiVersion: '2023-10-16',
});

const cryptoKey = await crypto.subtle.generateKey(
  { name: 'AES-GCM', length: 256 },
  true,
  ['encrypt', 'decrypt']
);

serve(async (req) => {
  const signature = req.headers.get('stripe-signature');
  const webhookSecret = Deno.env.get('STRIPE_WEBHOOK_SECRET');

  if (!signature || !webhookSecret) {
    console.error('Missing signature or webhook secret');
    return new Response('Webhook signature missing', { status: 400 });
  }

  try {
    const body = await req.text();
    const event = stripe.webhooks.constructEvent(body, signature, webhookSecret);

    console.log('Webhook event received:', event.type);

    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const supabase = createClient(supabaseUrl, supabaseKey);

    if (event.type === 'checkout.session.completed') {
      const session = event.data.object as Stripe.Checkout.Session;
      
      console.log('Processing checkout session:', session.id);

      // Generate unique slug
      const randomBytes = new Uint8Array(6);
      crypto.getRandomValues(randomBytes);
      const slug = `tenant-${Array.from(randomBytes).map(b => b.toString(16).padStart(2, '0')).join('')}`;

      // Generate secure admin token
      const tokenBytes = new Uint8Array(32);
      crypto.getRandomValues(tokenBytes);
      const adminToken = Array.from(tokenBytes).map(b => b.toString(16).padStart(2, '0')).join('');

      // Hash the token
      const encoder = new TextEncoder();
      const data = encoder.encode(adminToken);
      const hashBuffer = await crypto.subtle.digest('SHA-256', data);
      const hashArray = Array.from(new Uint8Array(hashBuffer));
      const tokenHash = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');

      // Create tenant
      const { data: tenant, error: tenantError } = await supabase
        .from('tenants')
        .insert({
          slug,
          admin_token_hash: tokenHash,
          stripe_customer_id: session.customer as string,
          stripe_subscription_id: session.subscription as string,
          plan: 'monthly_myr_10',
          active: true,
        })
        .select()
        .single();

      if (tenantError) {
        console.error('Error creating tenant:', tenantError);
        throw tenantError;
      }

      console.log('Tenant created:', slug);

      // Store session mapping
      const { error: mappingError } = await supabase
        .from('sessions_map')
        .insert({
          session_id: session.id,
          tenant_slug: slug,
          admin_token: adminToken,
        });

      if (mappingError) {
        console.error('Error creating session mapping:', mappingError);
        throw mappingError;
      }

      console.log('Session mapping created for:', session.id);
    }

    if (event.type === 'customer.subscription.deleted' || 
        event.type === 'customer.subscription.updated') {
      const subscription = event.data.object as Stripe.Subscription;
      
      console.log('Processing subscription event:', event.type);

      const { error } = await supabase
        .from('tenants')
        .update({ active: subscription.status === 'active' })
        .eq('stripe_subscription_id', subscription.id);

      if (error) {
        console.error('Error updating tenant:', error);
        throw error;
      }

      console.log('Tenant updated for subscription:', subscription.id);
    }

    return new Response(JSON.stringify({ received: true }), {
      headers: { 'Content-Type': 'application/json' },
      status: 200,
    });
  } catch (error) {
    console.error('Webhook error:', error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    return new Response(
      JSON.stringify({ error: errorMessage }),
      { status: 400 }
    );
  }
});