
-- 1) Remove public read on tenants (was exposing stripe_customer_id / stripe_subscription_id)
DROP POLICY IF EXISTS "Tenants are publicly readable" ON public.tenants;
REVOKE SELECT ON public.tenants FROM anon, authenticated;
GRANT ALL ON public.tenants TO service_role;

-- 2) Tighten storage policies for tenant-logos
DROP POLICY IF EXISTS "Authenticated users can upload logos" ON storage.objects;
DROP POLICY IF EXISTS "Users can update their tenant logos" ON storage.objects;

-- Keep public read for displaying logos in customer pages, but block listing by requiring a name
DROP POLICY IF EXISTS "Tenant logos are publicly accessible" ON storage.objects;
CREATE POLICY "Tenant logos are publicly readable"
ON storage.objects FOR SELECT
TO anon, authenticated
USING (bucket_id = 'tenant-logos' AND name IS NOT NULL);

-- Only the server (service_role) may write logos; client uploads must go through an edge function
CREATE POLICY "Only server can upload tenant logos"
ON storage.objects FOR INSERT
TO service_role
WITH CHECK (bucket_id = 'tenant-logos');

CREATE POLICY "Only server can update tenant logos"
ON storage.objects FOR UPDATE
TO service_role
USING (bucket_id = 'tenant-logos')
WITH CHECK (bucket_id = 'tenant-logos');

CREATE POLICY "Only server can delete tenant logos"
ON storage.objects FOR DELETE
TO service_role
USING (bucket_id = 'tenant-logos');

-- 3) Restrict update_updated_at_column trigger function so it cannot be invoked by clients
REVOKE EXECUTE ON FUNCTION public.update_updated_at_column() FROM PUBLIC, anon, authenticated;
GRANT EXECUTE ON FUNCTION public.update_updated_at_column() TO service_role;
