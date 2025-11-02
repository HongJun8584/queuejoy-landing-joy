import { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Loader2, CheckCircle, XCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

const StripeSuccess = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading');
  const [tenantUrl, setTenantUrl] = useState<string>('');
  const [retryCount, setRetryCount] = useState(0);
  const maxRetries = 10;

  useEffect(() => {
    const sessionId = searchParams.get('session_id');
    if (!sessionId) {
      setStatus('error');
      return;
    }

    const claimSession = async () => {
      try {
        // Construct URL for edge function
        const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
        const functionUrl = `${supabaseUrl}/functions/v1/claim-session?session_id=${sessionId}`;
        
        const response = await fetch(functionUrl, {
          method: 'GET',
          headers: {
            'apikey': import.meta.env.VITE_SUPABASE_ANON_KEY || '',
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) {
          throw new Error('Session not ready yet');
        }

        const result = await response.json();

        if (result.tenant_url) {
          setTenantUrl(result.tenant_url);
          setStatus('success');
          // Redirect after 2 seconds
          setTimeout(() => {
            window.location.href = result.tenant_url;
          }, 2000);
        } else {
          throw new Error('No tenant URL received');
        }
      } catch (error) {
        console.error('Claim error:', error);
        if (retryCount < maxRetries) {
          // Retry after 2 seconds
          setTimeout(() => {
            setRetryCount(retryCount + 1);
          }, 2000);
        } else {
          setStatus('error');
        }
      }
    };

    claimSession();
  }, [searchParams, retryCount]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary/5 via-accent/5 to-background p-4">
      <div className="max-w-md w-full bg-card p-8 rounded-2xl shadow-[0_20px_60px_-15px_rgba(0,0,0,0.3)] border-2 border-primary/30 text-center">
        {status === 'loading' && (
          <>
            <Loader2 className="w-16 h-16 mx-auto mb-6 text-primary animate-spin" />
            <h1 className="text-2xl font-bold mb-4">Setting up your QueueJoy workspace...</h1>
            <p className="text-muted-foreground mb-4">
              Please wait while we create your personalized queue management system.
            </p>
            <p className="text-sm text-muted-foreground">
              Attempt {retryCount + 1} of {maxRetries}
            </p>
          </>
        )}

        {status === 'success' && (
          <>
            <CheckCircle className="w-16 h-16 mx-auto mb-6 text-green-500" />
            <h1 className="text-2xl font-bold mb-4 text-green-600">Success!</h1>
            <p className="text-muted-foreground mb-4">
              Your QueueJoy workspace is ready. Redirecting you now...
            </p>
            <Button 
              variant="hero" 
              onClick={() => window.location.href = tenantUrl}
              className="mt-4"
            >
              Go to Admin Panel
            </Button>
          </>
        )}

        {status === 'error' && (
          <>
            <XCircle className="w-16 h-16 mx-auto mb-6 text-destructive" />
            <h1 className="text-2xl font-bold mb-4 text-destructive">Setup Delayed</h1>
            <p className="text-muted-foreground mb-4">
              Your payment was successful, but workspace setup is taking longer than expected.
            </p>
            <p className="text-sm text-muted-foreground mb-6">
              Please check your email for admin access, or contact support with your order details.
            </p>
            <Button 
              variant="outline" 
              onClick={() => navigate('/')}
            >
              Return to Home
            </Button>
          </>
        )}
      </div>
    </div>
  );
};

export default StripeSuccess;