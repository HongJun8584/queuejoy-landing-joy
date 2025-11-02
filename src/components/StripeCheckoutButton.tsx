import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

interface StripeCheckoutButtonProps {
  variant?: "default" | "hero" | "outline";
  size?: "default" | "sm" | "lg";
  className?: string;
  children?: React.ReactNode;
}

const STRIPE_PRICE_ID = "price_1234567890"; // Replace with actual price ID from Stripe

export const StripeCheckoutButton = ({ 
  variant = "hero", 
  size = "lg",
  className = "",
  children = "Buy Now - RM10/month"
}: StripeCheckoutButtonProps) => {
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const handleCheckout = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase.functions.invoke('create-checkout', {
        body: { priceId: STRIPE_PRICE_ID },
      });

      if (error) throw error;

      if (data?.url) {
        window.open(data.url, '_blank', 'noopener,noreferrer');
      }
    } catch (error) {
      console.error('Checkout error:', error);
      toast({
        title: "Error",
        description: "Failed to start checkout. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Button
      variant={variant}
      size={size}
      onClick={handleCheckout}
      disabled={loading}
      className={className}
    >
      {loading ? (
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          Loading...
        </>
      ) : (
        children
      )}
    </Button>
  );
};