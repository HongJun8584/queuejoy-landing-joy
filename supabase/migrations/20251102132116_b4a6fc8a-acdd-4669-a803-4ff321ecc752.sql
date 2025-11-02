-- Create tenants table
CREATE TABLE public.tenants (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug TEXT UNIQUE NOT NULL,
  admin_token_hash TEXT NOT NULL,
  stripe_customer_id TEXT,
  stripe_subscription_id TEXT,
  plan TEXT DEFAULT 'monthly_myr_10',
  active BOOLEAN DEFAULT true,
  settings JSONB DEFAULT '{
    "business_name": "Your Business",
    "welcome_text": "Welcome — please take a number.",
    "ads_html": "",
    "logo_url": null
  }'::jsonb,
  logo_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Create sessions_map table to track checkout sessions
CREATE TABLE public.sessions_map (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  session_id TEXT UNIQUE NOT NULL,
  tenant_slug TEXT REFERENCES public.tenants(slug) ON DELETE CASCADE,
  admin_token TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Create index on stripe_customer_id for faster lookups
CREATE INDEX idx_tenants_stripe_customer ON public.tenants(stripe_customer_id);
CREATE INDEX idx_tenants_stripe_subscription ON public.tenants(stripe_subscription_id);
CREATE INDEX idx_sessions_session_id ON public.sessions_map(session_id);

-- Create storage bucket for logos
INSERT INTO storage.buckets (id, name, public) 
VALUES ('tenant-logos', 'tenant-logos', true);

-- Storage policies for tenant logos
CREATE POLICY "Tenant logos are publicly accessible"
ON storage.objects FOR SELECT
USING (bucket_id = 'tenant-logos');

CREATE POLICY "Authenticated users can upload logos"
ON storage.objects FOR INSERT
WITH CHECK (bucket_id = 'tenant-logos');

CREATE POLICY "Users can update their tenant logos"
ON storage.objects FOR UPDATE
USING (bucket_id = 'tenant-logos');

-- Enable RLS on tenants table
ALTER TABLE public.tenants ENABLE ROW LEVEL SECURITY;

-- Tenants are publicly readable (for displaying queue on public screens)
CREATE POLICY "Tenants are publicly readable"
ON public.tenants FOR SELECT
USING (true);

-- Only system can create tenants (via edge functions)
CREATE POLICY "System can create tenants"
ON public.tenants FOR INSERT
WITH CHECK (true);

-- System can update tenants
CREATE POLICY "System can update tenants"
ON public.tenants FOR UPDATE
USING (true);

-- Enable RLS on sessions_map
ALTER TABLE public.sessions_map ENABLE ROW LEVEL SECURITY;

-- System can manage sessions
CREATE POLICY "System can manage sessions"
ON public.sessions_map FOR ALL
USING (true);

-- Create function to update updated_at
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;

-- Trigger to auto-update updated_at
CREATE TRIGGER update_tenants_updated_at
BEFORE UPDATE ON public.tenants
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();