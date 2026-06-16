import { useEffect, useState } from "react";
import { useParams, useSearchParams, useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { Loader2, Upload } from "lucide-react";
import DOMPurify from 'dompurify';

// File validation constants
const MAX_FILE_SIZE = 2 * 1024 * 1024; // 2MB
const ALLOWED_FILE_TYPES = ['image/png', 'image/jpeg', 'image/webp', 'image/svg+xml'];
const ALLOWED_EXTENSIONS = ['png', 'jpg', 'jpeg', 'webp', 'svg'];

// Validate file for upload
function validateLogoFile(file: File): { valid: boolean; error?: string } {
  // Check file size
  if (file.size > MAX_FILE_SIZE) {
    return { valid: false, error: 'Logo must be under 2MB' };
  }
  
  // Check file type (MIME)
  if (!ALLOWED_FILE_TYPES.includes(file.type)) {
    return { valid: false, error: 'Only PNG, JPEG, WebP, and SVG images are allowed' };
  }
  
  // Check file extension as additional validation
  const extension = file.name.split('.').pop()?.toLowerCase();
  if (!extension || !ALLOWED_EXTENSIONS.includes(extension)) {
    return { valid: false, error: 'Invalid file extension. Use PNG, JPG, JPEG, WebP, or SVG' };
  }
  
  return { valid: true };
}

const TenantAdmin = () => {
  const { slug } = useParams();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const token = searchParams.get('token');
  const { toast } = useToast();

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [authenticated, setAuthenticated] = useState(false);
  const [tenantData, setTenantData] = useState<{
    id?: string;
    slug?: string;
    settings?: Record<string, unknown>;
    logo_url?: string;
  } | null>(null);
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
  const [logoError, setLogoError] = useState<string | null>(null);

  useEffect(() => {
    const verifyToken = async () => {
      if (!slug || !token) {
        setLoading(false);
        return;
      }

      // Remove token from URL immediately for security
      if (token) {
        sessionStorage.setItem(`admin_token_${slug}`, token);
        navigate(`/admin/${slug}`, { replace: true });
      }

      const storedToken = sessionStorage.getItem(`admin_token_${slug}`) || token;
      if (!storedToken) {
        setLoading(false);
        return;
      }

      try {
        // Server-side authentication
        const { data, error } = await supabase.functions.invoke('verify-admin', {
          body: { slug, token: storedToken },
        });

        if (error || !data?.authenticated) {
          toast({
            title: "Authentication Failed",
            description: "Invalid access token",
            variant: "destructive",
          });
          sessionStorage.removeItem(`admin_token_${slug}`);
          setLoading(false);
          return;
        }

        setAuthenticated(true);
        setTenantData(data.tenant);
        if (data.tenant.settings && typeof data.tenant.settings === 'object') {
          const tenantSettings = data.tenant.settings as Record<string, unknown>;
          setSettings({
            business_name: (tenantSettings.business_name as string) || '',
            welcome_text: (tenantSettings.welcome_text as string) || '',
            ads_html: (tenantSettings.ads_html as string) || '',
          });
        }
        setLoading(false);
      } catch (error) {
        console.error('Token verification error:', error);
        sessionStorage.removeItem(`admin_token_${slug}`);
        setLoading(false);
      }
    };

    verifyToken();
  }, [slug, token, toast, navigate]);

  // Handle file selection with validation
  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    setLogoError(null);
    
    if (!file) {
      setLogoFile(null);
      return;
    }
    
    const validation = validateLogoFile(file);
    if (!validation.valid) {
      setLogoError(validation.error || 'Invalid file');
      setLogoFile(null);
      e.target.value = ''; // Reset input
      return;
    }
    
    setLogoFile(file);
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      const storedToken = sessionStorage.getItem(`admin_token_${slug}`);
      if (!storedToken) {
        throw new Error('Authentication token not found');
      }

      let logoUploadPayload: { data_base64: string; content_type: string; ext: string } | undefined;

      // Encode logo for server-side upload (clients can no longer write to storage directly)
      if (logoFile) {
        const validation = validateLogoFile(logoFile);
        if (!validation.valid) {
          throw new Error(validation.error || 'Invalid logo file');
        }
        const ext = logoFile.name.split('.').pop()?.toLowerCase() || 'png';
        const buf = await logoFile.arrayBuffer();
        const bytes = new Uint8Array(buf);
        let binary = '';
        for (let i = 0; i < bytes.byteLength; i++) binary += String.fromCharCode(bytes[i]);
        const data_base64 = btoa(binary);
        logoUploadPayload = { data_base64, content_type: logoFile.type, ext };
      }


      // Client-side sanitization preview (server will also sanitize)
      const sanitizedSettings = {
        ...settings,
        ads_html: DOMPurify.sanitize(settings.ads_html, {
          ALLOWED_TAGS: ['p', 'br', 'b', 'i', 'u', 'strong', 'em', 'a', 'ul', 'ol', 'li', 'h1', 'h2', 'h3'],
          ALLOWED_ATTR: ['href', 'class']
        })
      };

      // Server-side update with authentication
      const { data, error } = await supabase.functions.invoke('update-tenant', {
        body: {
          slug,
          token: storedToken,
          settings: sanitizedSettings,
          logo_upload: logoUploadPayload,
        },
      });


      if (error || !data?.success) {
        throw error || new Error('Failed to save settings');
      }

      toast({
        title: "Success",
        description: "Settings saved successfully!",
      });
    } catch (error) {
      console.error('Save error:', error);
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to save settings",
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
                maxLength={100}
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
                maxLength={200}
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
                maxLength={5000}
              />
              <p className="text-sm text-muted-foreground mt-1">
                HTML will be sanitized for security. Allowed tags: p, br, b, i, u, strong, em, a, ul, ol, li, h1-h3
              </p>
            </div>

            <div>
              <Label htmlFor="logo">Business Logo</Label>
              <div className="mt-2 flex items-center gap-4">
                <Input
                  id="logo"
                  type="file"
                  accept="image/png,image/jpeg,image/webp,image/svg+xml"
                  onChange={handleFileSelect}
                  className="flex-1"
                />
                <Upload className="w-5 h-5 text-muted-foreground" />
              </div>
              {logoError && (
                <p className="text-sm text-destructive mt-1">
                  {logoError}
                </p>
              )}
              <p className="text-sm text-muted-foreground mt-1">
                PNG, JPG, WebP, or SVG (max 2MB)
              </p>
            </div>

            <Button
              variant="hero"
              size="lg"
              onClick={handleSave}
              disabled={saving || !!logoError}
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
