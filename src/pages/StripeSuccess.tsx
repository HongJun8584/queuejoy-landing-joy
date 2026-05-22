import { useState, useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { Loader2, CheckCircle, XCircle, Copy, ExternalLink, Download, Play } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

// Configuration — production live domain (the deployed tenant app)
const NETLIFY_BASE = "https://queuejoy-live.netlify.app";
const SITE_BASE = NETLIFY_BASE;
const buildStatusUrl = (s: string) => `${NETLIFY_BASE}/index.html?slug=${encodeURIComponent(s)}`;
const buildAdminUrl = (s: string) => `${NETLIFY_BASE}/admin.html?slug=${encodeURIComponent(s)}`;
const buildCounterUrl = (s: string) => `${NETLIFY_BASE}/counter.html?slug=${encodeURIComponent(s)}`;

interface TenantLinks {
  home: string;
  counter: string;
  admin: string;
}

interface SetupResponse {
  ok: boolean;
  slug: string;
  data?: any;
  links?: TenantLinks;
  exists?: boolean;
  error?: string;
}

const StripeSuccess = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const sessionId = searchParams.get('session_id');
  
  const [status, setStatus] = useState<'form' | 'submitting' | 'polling' | 'success' | 'error'>('form');
  const [slug, setSlug] = useState('');
  const [businessName, setBusinessName] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [links, setLinks] = useState<TenantLinks | null>(null);
  const [pollCount, setPollCount] = useState(0);

  // Tutorial checklist state
  const [checklist, setChecklist] = useState({
    openCustomer: false,
    openCounter: false,
    openAdmin: false,
    downloadQr: false
  });

  // Poll for tenant creation (fallback if webhook creates tenant)
  useEffect(() => {
    if (status !== 'polling' || !slug) return;

    const pollInterval = setInterval(async () => {
      try {
        const res = await fetch(`/.netlify/functions/getBusiness?slug=${encodeURIComponent(slug)}`);
        const data: SetupResponse = await res.json();
        
        if (data.ok && data.links) {
          setLinks(data.links);
          setStatus('success');
          clearInterval(pollInterval);
        } else {
          setPollCount(prev => prev + 1);
          if (pollCount >= 10) { // 20 seconds max (2s * 10)
            clearInterval(pollInterval);
            setErrorMessage('Setup is taking longer than expected. Please contact support.');
            setStatus('error');
          }
        }
      } catch (err) {
        console.error('Poll error:', err);
      }
    }, 2000);

    return () => clearInterval(pollInterval);
  }, [status, slug, pollCount]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!sessionId) {
      setErrorMessage('Invalid session. Please contact support.');
      setStatus('error');
      return;
    }

    if (!slug || !businessName) {
      setErrorMessage('Please fill in all fields');
      return;
    }

    // Validate slug format
    const cleanSlug = slug.toLowerCase().replace(/[^a-z0-9-]/g, '');
    if (cleanSlug.length < 3 || cleanSlug.length > 50) {
      setErrorMessage('Slug must be 3-50 characters (letters, numbers, hyphens only)');
      return;
    }

    setStatus('submitting');
    setErrorMessage('');

    try {
      // Call Netlify function directly - NO MASTER KEY in browser
      // The server should validate the Stripe session_id and create tenant
      const res = await fetch(`/.netlify/functions/createBusiness`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
          // NO x-master-key here - browser must not contain secrets
        },
        body: JSON.stringify({
          slug: cleanSlug,
          name: businessName,
          session_id: sessionId, // Server validates this with Stripe
          createdBy: 'stripe-checkout'
        })
      });

      const data: SetupResponse = await res.json();

      if (!res.ok) {
        if (res.status === 409 && data.exists && data.links) {
          // Tenant already exists - show the links
          setLinks(data.links);
          setStatus('success');
          return;
        }
        throw new Error(data.error || `Server error: ${res.status}`);
      }

      if (data.ok && data.links) {
        setLinks(data.links);
        setStatus('success');
      } else if (data.ok && !data.links) {
        // Tenant creation started but links not ready yet - poll
        setStatus('polling');
      } else {
        throw new Error(data.error || 'Setup failed');
      }
    } catch (error: any) {
      console.error('Setup error:', error);
      setErrorMessage(error.message || 'Failed to create your system. Please try again.');
      setStatus('error');
    }
  };

  const handleSlugChange = (value: string) => {
    const formatted = value.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
    setSlug(formatted);
  };

  const copyToClipboard = async (text: string, label: string) => {
    await navigator.clipboard.writeText(text);
    toast({
      title: "Copied!",
      description: `${label} copied to clipboard`
    });
  };

  const openLink = (url: string, type: 'customer' | 'counter' | 'admin') => {
    window.open(url, '_blank', 'noopener,noreferrer');
    setChecklist(prev => ({
      ...prev,
      [type === 'customer' ? 'openCustomer' : type === 'counter' ? 'openCounter' : 'openAdmin']: true
    }));
  };

  const downloadQR = () => {
    if (!links?.home) return;
    // Generate QR code URL using a public QR API
    const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=${encodeURIComponent(links.home)}`;
    const link = document.createElement('a');
    link.href = qrUrl;
    link.download = `queuejoy-${slug}-qr.png`;
    link.click();
    setChecklist(prev => ({ ...prev, downloadQr: true }));
    toast({
      title: "QR Downloaded!",
      description: "Print this QR code for customers to scan"
    });
  };

  if (!sessionId) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary/5 via-accent/5 to-background p-4">
        <div className="max-w-md w-full bg-card p-8 rounded-2xl shadow-[0_20px_60px_-15px_rgba(0,0,0,0.3)] border-2 border-primary/30 text-center">
          <XCircle className="w-16 h-16 mx-auto mb-6 text-destructive" />
          <h1 className="text-2xl font-bold mb-4 text-destructive">Invalid Session</h1>
          <p className="text-muted-foreground mb-6">
            No payment session found. Please complete checkout first.
          </p>
          <Button variant="outline" onClick={() => navigate('/')}>
            Return to Home
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-accent/5 to-background p-4 py-12">
      <div className="max-w-2xl mx-auto">
        
        {/* Form State */}
        {status === 'form' && (
          <div className="bg-card p-8 rounded-2xl shadow-[0_20px_60px_-15px_rgba(0,0,0,0.3)] border-2 border-primary/30">
            <div className="text-center mb-8">
              <CheckCircle className="w-16 h-16 mx-auto mb-4 text-green-500" />
              <h1 className="text-2xl font-bold mb-2">Payment Successful!</h1>
              <p className="text-muted-foreground">
                Setup is under 3 minutes. Let's configure your QueueJoy system.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <Label htmlFor="businessName" className="text-base">Business Name</Label>
                <Input
                  id="businessName"
                  type="text"
                  value={businessName}
                  onChange={(e) => setBusinessName(e.target.value)}
                  placeholder="e.g. My Cafe"
                  className="mt-2"
                  required
                  maxLength={100}
                  data-track="setup_input"
                  data-input-type="business_name"
                />
                <p className="text-sm text-muted-foreground mt-1">
                  Your business name as it will appear to customers
                </p>
              </div>

              <div>
                <Label htmlFor="slug" className="text-base">Preferred Slug</Label>
                <Input
                  id="slug"
                  type="text"
                  value={slug}
                  onChange={(e) => handleSlugChange(e.target.value)}
                  placeholder="e.g. mycafe"
                  className="mt-2 font-mono"
                  required
                  maxLength={50}
                  data-track="setup_input"
                  data-input-type="slug"
                />
                <p className="text-sm text-muted-foreground mt-1 break-all">
                  Your unique URL: {buildStatusUrl(slug || 'yourslug')}
                </p>
              </div>

              {errorMessage && (
                <div className="p-3 bg-destructive/10 border border-destructive/30 rounded-lg">
                  <p className="text-sm text-destructive">{errorMessage}</p>
                </div>
              )}

              <Button
                type="submit"
                variant="hero"
                size="lg"
                className="w-full"
                disabled={!slug || !businessName}
                data-track="setup_submit"
              >
                Create My System
              </Button>
            </form>
          </div>
        )}

        {/* Submitting/Polling State */}
        {(status === 'submitting' || status === 'polling') && (
          <div className="bg-card p-8 rounded-2xl shadow-[0_20px_60px_-15px_rgba(0,0,0,0.3)] border-2 border-primary/30 text-center">
            <Loader2 className="w-16 h-16 mx-auto mb-6 text-primary animate-spin" />
            <h1 className="text-2xl font-bold mb-4">
              {status === 'submitting' ? 'Creating your system...' : 'Setting up...'}
            </h1>
            <p className="text-muted-foreground">
              Setting up {businessName} at <span className="font-mono">{slug}</span>
            </p>
            <p className="text-sm text-muted-foreground mt-4">
              This usually takes under 3 minutes.
            </p>
          </div>
        )}

        {/* Success State */}
        {status === 'success' && links && (
          <div className="space-y-6">
            {/* Header */}
            <div className="bg-card p-8 rounded-2xl shadow-[0_20px_60px_-15px_rgba(0,0,0,0.3)] border-2 border-green-500/30 text-center">
              <CheckCircle className="w-16 h-16 mx-auto mb-4 text-green-500" />
              <h1 className="text-2xl font-bold mb-2 text-green-600">
                Payment successful — now let's finish setup
              </h1>
              <p className="text-muted-foreground">
                Setup is under 3 minutes. Below are your links and quick steps.
              </p>
            </div>

            {/* Links Card */}
            <div className="bg-card p-6 rounded-2xl shadow-lg border border-border">
              <h2 className="text-lg font-bold mb-4">Your Live URLs</h2>
              
              <div className="space-y-4">
                {/* Customer Page */}
                <div className="p-4 bg-muted/30 rounded-xl">
                  <div className="flex items-center justify-between gap-4 flex-wrap">
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold text-sm mb-1">Customer Page</p>
                      <p className="text-xs text-muted-foreground truncate font-mono">{links.home}</p>
                    </div>
                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => copyToClipboard(links.home, 'Customer page URL')}
                        data-track="setup_link"
                        data-link-type="customer"
                        data-action="copy"
                        data-slug={slug}
                      >
                        <Copy className="h-4 w-4" />
                      </Button>
                      <Button
                        size="sm"
                        onClick={() => openLink(links.home, 'customer')}
                        data-track="setup_link"
                        data-link-type="customer"
                        data-action="open"
                        data-slug={slug}
                        aria-label="Open customer page — opens in new tab"
                      >
                        <ExternalLink className="h-4 w-4 mr-1" />
                        Open
                      </Button>
                    </div>
                  </div>
                  <p className="text-xs text-muted-foreground mt-2">
                    Customer-facing queue page (what customers see when they scan QR)
                  </p>
                </div>

                {/* Counter Page */}
                <div className="p-4 bg-muted/30 rounded-xl">
                  <div className="flex items-center justify-between gap-4 flex-wrap">
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold text-sm mb-1">Counter / Display</p>
                      <p className="text-xs text-muted-foreground truncate font-mono">{links.counter}</p>
                    </div>
                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => copyToClipboard(links.counter, 'Counter page URL')}
                        data-track="setup_link"
                        data-link-type="counter"
                        data-action="copy"
                        data-slug={slug}
                      >
                        <Copy className="h-4 w-4" />
                      </Button>
                      <Button
                        size="sm"
                        onClick={() => openLink(links.counter, 'counter')}
                        data-track="setup_link"
                        data-link-type="counter"
                        data-action="open"
                        data-slug={slug}
                        aria-label="Open counter page — opens in new tab"
                      >
                        <ExternalLink className="h-4 w-4 mr-1" />
                        Open
                      </Button>
                    </div>
                  </div>
                  <p className="text-xs text-muted-foreground mt-2">
                    Full-screen counter for staff or display monitor
                  </p>
                </div>

                {/* Admin Page */}
                <div className="p-4 bg-muted/30 rounded-xl">
                  <div className="flex items-center justify-between gap-4 flex-wrap">
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold text-sm mb-1">Admin / Dashboard</p>
                      <p className="text-xs text-muted-foreground truncate font-mono">{links.admin}</p>
                    </div>
                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => copyToClipboard(links.admin, 'Admin page URL')}
                        data-track="setup_link"
                        data-link-type="admin"
                        data-action="copy"
                        data-slug={slug}
                      >
                        <Copy className="h-4 w-4" />
                      </Button>
                      <Button
                        size="sm"
                        onClick={() => openLink(links.admin, 'admin')}
                        data-track="setup_link"
                        data-link-type="admin"
                        data-action="open"
                        data-slug={slug}
                        aria-label="Open admin page — opens in new tab"
                      >
                        <ExternalLink className="h-4 w-4 mr-1" />
                        Open
                      </Button>
                    </div>
                  </div>
                  <p className="text-xs text-muted-foreground mt-2">
                    Manage queue, promotions, and customers here
                  </p>
                </div>
              </div>

              {/* Quick Actions */}
              <div className="flex gap-3 mt-6 flex-wrap">
                <Button
                  variant="hero"
                  onClick={() => openLink(links.home, 'customer')}
                  data-track="setup_primary_cta"
                >
                  <Play className="h-4 w-4 mr-2" />
                  Try Live Preview
                </Button>
                <Button
                  variant="outline"
                  onClick={downloadQR}
                  data-track="download_qr"
                  data-slug={slug}
                >
                  <Download className="h-4 w-4 mr-2" />
                  Download QR (PNG)
                </Button>
              </div>
            </div>

            {/* Tutorial Checklist */}
            <div className="bg-card p-6 rounded-2xl shadow-lg border border-border">
              <h2 className="text-lg font-bold mb-4">Quick Setup Checklist</h2>
              <p className="text-sm text-muted-foreground mb-4">
                Complete these steps to go live (under 3 minutes total)
              </p>
              
              <div className="space-y-3">
                <div className={`flex items-center gap-3 p-3 rounded-lg transition-colors ${checklist.openCustomer ? 'bg-green-500/10' : 'bg-muted/30'}`}>
                  <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${checklist.openCustomer ? 'bg-green-500 text-white' : 'bg-primary/20 text-primary'}`}>
                    {checklist.openCustomer ? '✓' : '1'}
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-sm">Open Customer page — Test Join Queue</p>
                    <p className="text-xs text-muted-foreground">~1 minute</p>
                  </div>
                  <Button size="sm" variant="ghost" onClick={() => openLink(links.home, 'customer')}>
                    Do it
                  </Button>
                </div>

                <div className={`flex items-center gap-3 p-3 rounded-lg transition-colors ${checklist.openCounter ? 'bg-green-500/10' : 'bg-muted/30'}`}>
                  <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${checklist.openCounter ? 'bg-green-500 text-white' : 'bg-primary/20 text-primary'}`}>
                    {checklist.openCounter ? '✓' : '2'}
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-sm">Open Counter page — Press Start</p>
                    <p className="text-xs text-muted-foreground">~1 minute</p>
                  </div>
                  <Button size="sm" variant="ghost" onClick={() => openLink(links.counter, 'counter')}>
                    Do it
                  </Button>
                </div>

                <div className={`flex items-center gap-3 p-3 rounded-lg transition-colors ${checklist.openAdmin ? 'bg-green-500/10' : 'bg-muted/30'}`}>
                  <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${checklist.openAdmin ? 'bg-green-500 text-white' : 'bg-primary/20 text-primary'}`}>
                    {checklist.openAdmin ? '✓' : '3'}
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-sm">Open Admin — Confirm business name & slug</p>
                    <p className="text-xs text-muted-foreground">~30 seconds</p>
                  </div>
                  <Button size="sm" variant="ghost" onClick={() => openLink(links.admin, 'admin')}>
                    Do it
                  </Button>
                </div>

                <div className={`flex items-center gap-3 p-3 rounded-lg transition-colors ${checklist.downloadQr ? 'bg-green-500/10' : 'bg-muted/30'}`}>
                  <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${checklist.downloadQr ? 'bg-green-500 text-white' : 'bg-primary/20 text-primary'}`}>
                    {checklist.downloadQr ? '✓' : '4'}
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-sm">Download QR — Print or display</p>
                    <p className="text-xs text-muted-foreground">~30 seconds</p>
                  </div>
                  <Button size="sm" variant="ghost" onClick={downloadQR}>
                    Do it
                  </Button>
                </div>
              </div>

              {/* Payment method note */}
              <div className="mt-6 p-4 bg-accent/10 rounded-lg">
                <p className="text-sm font-medium">💳 Stripe Payment</p>
                <p className="text-xs text-muted-foreground mt-1">
                  Instant activation. Recurring subscription supported. Your system is ready now!
                </p>
              </div>
            </div>

            {/* Support */}
            <div className="text-center text-sm text-muted-foreground">
              <p>
                Need help? Contact{' '}
                <a href="mailto:hello.queuejoy@gmail.com" className="text-primary hover:underline">
                  hello.queuejoy@gmail.com
                </a>
                {' '}or WhatsApp{' '}
                <a href="https://wa.me/60195055266" className="text-primary hover:underline">
                  019-505-5266
                </a>
              </p>
            </div>
          </div>
        )}

        {/* Error State */}
        {status === 'error' && (
          <div className="bg-card p-8 rounded-2xl shadow-[0_20px_60px_-15px_rgba(0,0,0,0.3)] border-2 border-destructive/30 text-center">
            <XCircle className="w-16 h-16 mx-auto mb-6 text-destructive" />
            <h1 className="text-2xl font-bold mb-4 text-destructive">Setup Failed</h1>
            <p className="text-muted-foreground mb-4">
              {errorMessage || 'An error occurred while setting up your system.'}
            </p>
            <p className="text-sm text-muted-foreground mb-6">
              Your payment was successful. Please contact support with your order details.
            </p>
            <div className="space-y-3">
              <Button
                variant="hero"
                onClick={() => setStatus('form')}
                className="w-full"
              >
                Try Again
              </Button>
              <Button
                variant="outline"
                onClick={() => window.location.href = 'mailto:hello.queuejoy@gmail.com'}
                className="w-full"
              >
                Contact Support
              </Button>
              <Button
                variant="ghost"
                onClick={() => navigate('/')}
                className="w-full"
              >
                Return to Home
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default StripeSuccess;
