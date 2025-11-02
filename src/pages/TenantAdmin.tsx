import { useEffect, useState } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { Loader2, Upload } from "lucide-react";

const TenantAdmin = () => {
  const { slug } = useParams();
  const [searchParams] = useSearchParams();
  const token = searchParams.get('token');
  const { toast } = useToast();

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [authenticated, setAuthenticated] = useState(false);
  const [settings, setSettings] = useState<{
    business_name: string;
    welcome_text: string;
    ads_html: string;
  }>({
    business_name: '',
    welcome_text: '',
    ads_html: '',
  });
  const [logoFile, setLogoFile] = useState<File | null>(null);

  useEffect(() => {
    const verifyToken = async () => {
      if (!slug || !token) {
        setLoading(false);
        return;
      }

      try {
        // Hash the provided token
        const encoder = new TextEncoder();
        const data = encoder.encode(token);
        const hashBuffer = await crypto.subtle.digest('SHA-256', data);
        const hashArray = Array.from(new Uint8Array(hashBuffer));
        const tokenHash = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');

        // Verify token matches tenant
        const { data: tenant, error } = await supabase
          .from('tenants')
          .select('*')
          .eq('slug', slug)
          .eq('admin_token_hash', tokenHash)
          .single();

        if (error || !tenant) {
          toast({
            title: "Authentication Failed",
            description: "Invalid access token",
            variant: "destructive",
          });
          setLoading(false);
          return;
        }

        setAuthenticated(true);
        if (tenant.settings && typeof tenant.settings === 'object') {
          setSettings({
            business_name: (tenant.settings as any).business_name || '',
            welcome_text: (tenant.settings as any).welcome_text || '',
            ads_html: (tenant.settings as any).ads_html || '',
          });
        }
        setLoading(false);
      } catch (error) {
        console.error('Token verification error:', error);
        setLoading(false);
      }
    };

    verifyToken();
  }, [slug, token, toast]);

  const handleSave = async () => {
    setSaving(true);
    try {
      let logoUrl = null;

      // Upload logo if selected
      if (logoFile) {
        const fileExt = logoFile.name.split('.').pop();
        const fileName = `${slug}-${Date.now()}.${fileExt}`;
        const { error: uploadError } = await supabase.storage
          .from('tenant-logos')
          .upload(fileName, logoFile);

        if (uploadError) throw uploadError;

        const { data: { publicUrl } } = supabase.storage
          .from('tenant-logos')
          .getPublicUrl(fileName);

        logoUrl = publicUrl;
      }

      // Update tenant settings
      const updateData: any = { settings };
      if (logoUrl) updateData.logo_url = logoUrl;

      const { error } = await supabase
        .from('tenants')
        .update(updateData)
        .eq('slug', slug);

      if (error) throw error;

      toast({
        title: "Success",
        description: "Settings saved successfully!",
      });
    } catch (error) {
      console.error('Save error:', error);
      toast({
        title: "Error",
        description: "Failed to save settings",
        variant: "destructive",
      });
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!authenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-card p-8 rounded-2xl shadow-lg text-center">
          <h1 className="text-2xl font-bold mb-4 text-destructive">Access Denied</h1>
          <p className="text-muted-foreground">Invalid or expired access token</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-accent/5 to-background p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-card p-8 rounded-2xl shadow-[0_20px_60px_-15px_rgba(0,0,0,0.3)] border-2 border-primary/30">
          <h1 className="text-3xl font-bold mb-2">QueueJoy Admin Panel</h1>
          <p className="text-muted-foreground mb-8">Workspace: {slug}</p>

          <div className="space-y-6">
            <div>
              <Label htmlFor="business_name">Business Name</Label>
              <Input
                id="business_name"
                value={settings.business_name}
                onChange={(e) => setSettings({ ...settings, business_name: e.target.value })}
                placeholder="Your Business Name"
                className="mt-2"
              />
            </div>

            <div>
              <Label htmlFor="welcome_text">Welcome Message</Label>
              <Textarea
                id="welcome_text"
                value={settings.welcome_text}
                onChange={(e) => setSettings({ ...settings, welcome_text: e.target.value })}
                placeholder="Welcome message for customers"
                className="mt-2"
                rows={3}
              />
            </div>

            <div>
              <Label htmlFor="ads_html">Ads / Announcements (HTML)</Label>
              <Textarea
                id="ads_html"
                value={settings.ads_html}
                onChange={(e) => setSettings({ ...settings, ads_html: e.target.value })}
                placeholder="<p>Special offer today!</p>"
                className="mt-2 font-mono text-sm"
                rows={5}
              />
            </div>

            <div>
              <Label htmlFor="logo">Business Logo</Label>
              <div className="mt-2 flex items-center gap-4">
                <Input
                  id="logo"
                  type="file"
                  accept="image/*"
                  onChange={(e) => setLogoFile(e.target.files?.[0] || null)}
                  className="flex-1"
                />
                <Upload className="w-5 h-5 text-muted-foreground" />
              </div>
              <p className="text-sm text-muted-foreground mt-1">
                PNG, JPG or GIF (max 2MB)
              </p>
            </div>

            <Button
              variant="hero"
              size="lg"
              onClick={handleSave}
              disabled={saving}
              className="w-full"
            >
              {saving ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Saving...
                </>
              ) : (
                'Save Settings'
              )}
            </Button>
          </div>

          <div className="mt-8 p-4 bg-accent/10 rounded-lg">
            <h3 className="font-semibold mb-2">Next Steps:</h3>
            <ul className="text-sm text-muted-foreground space-y-1">
              <li>• Customize your business details above</li>
              <li>• Upload your business logo</li>
              <li>• Set up your queue displays and counters</li>
              <li>• Share your queue URL with customers</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TenantAdmin;