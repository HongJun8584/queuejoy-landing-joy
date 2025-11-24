import { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { useToast } from "@/hooks/use-toast";
import { Card } from "./ui/card";
import { Loader2, ExternalLink } from "lucide-react";

interface PostPaymentFormProps {
  sessionId: string;
}

export const PostPaymentForm = ({ sessionId }: PostPaymentFormProps) => {
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [businessUrl, setBusinessUrl] = useState("");
  const { toast } = useToast();

  const [formData, setFormData] = useState({
    businessName: "",
    slug: "",
    contactEmail: "",
    contactPhone: ""
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const slug = formData.slug.toLowerCase().replace(/[^a-z0-9-]/g, '-');
      
      // Call Supabase edge function to create business in Firebase
      // This edge function will call your Firebase Realtime Database
      const response = await fetch('/api/create-business', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          slug,
          name: formData.businessName,
          contactEmail: formData.contactEmail,
          contactPhone: formData.contactPhone,
          sessionId,
          defaults: {
            introText: `Welcome to ${formData.businessName}!`,
            name: formData.businessName,
            chatId: ''
          }
        })
      });

      if (!response.ok) {
        throw new Error('Failed to create business');
      }

      const data = await response.json();
      const generatedUrl = `https://queuejoy.app/${slug}`;
      
      setBusinessUrl(generatedUrl);
      setSubmitted(true);

      toast({
        title: "Success!",
        description: "Your QueueJoy site is ready!",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to create your site. Please contact support.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <Card className="p-8 max-w-2xl mx-auto text-center">
        <div className="mb-6">
          <div className="w-16 h-16 bg-accent/20 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-4xl">🎉</span>
          </div>
          <h3 className="text-2xl font-bold mb-2">Your QueueJoy Site is Live!</h3>
          <p className="text-muted-foreground mb-6">
            We've created your queue management system. Click below to access it:
          </p>
        </div>

        <div className="bg-muted/30 p-4 rounded-lg mb-6">
          <p className="text-sm text-muted-foreground mb-2">Your Site URL:</p>
          <a 
            href={businessUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary font-mono text-lg hover:underline flex items-center justify-center gap-2"
          >
            {businessUrl}
            <ExternalLink className="w-4 h-4" />
          </a>
        </div>

        <div className="space-y-3">
          <Button 
            size="lg" 
            className="w-full"
            onClick={() => window.open(businessUrl, '_blank')}
          >
            Open My QueueJoy Site
          </Button>
          <Button 
            variant="outline" 
            size="lg" 
            className="w-full"
            onClick={() => window.location.href = '/'}
          >
            Back to Home
          </Button>
        </div>

        <p className="text-sm text-muted-foreground mt-6">
          Check your email ({formData.contactEmail}) for setup instructions and admin access.
        </p>
      </Card>
    );
  }

  return (
    <Card className="p-8 max-w-2xl mx-auto">
      <h3 className="text-2xl font-bold mb-2">Complete Your Setup</h3>
      <p className="text-muted-foreground mb-6">
        Tell us about your business so we can create your queue management system.
      </p>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <Label htmlFor="businessName">Business Name *</Label>
          <Input
            id="businessName"
            required
            value={formData.businessName}
            onChange={(e) => setFormData({ ...formData, businessName: e.target.value })}
            placeholder="e.g., Happy Café"
          />
        </div>

        <div>
          <Label htmlFor="slug">Choose Your URL Slug *</Label>
          <Input
            id="slug"
            required
            value={formData.slug}
            onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
            placeholder="e.g., happy-cafe"
          />
          <p className="text-sm text-muted-foreground mt-1">
            Your site will be: queuejoy.app/{formData.slug || 'your-slug'}
          </p>
        </div>

        <div>
          <Label htmlFor="contactEmail">Contact Email *</Label>
          <Input
            id="contactEmail"
            type="email"
            required
            value={formData.contactEmail}
            onChange={(e) => setFormData({ ...formData, contactEmail: e.target.value })}
            placeholder="you@example.com"
          />
        </div>

        <div>
          <Label htmlFor="contactPhone">Contact Phone</Label>
          <Input
            id="contactPhone"
            type="tel"
            value={formData.contactPhone}
            onChange={(e) => setFormData({ ...formData, contactPhone: e.target.value })}
            placeholder="+60 12 345 6789"
          />
        </div>

        <Button type="submit" size="lg" className="w-full" disabled={loading}>
          {loading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Creating Your Site...
            </>
          ) : (
            "Create My QueueJoy Site"
          )}
        </Button>
      </form>
    </Card>
  );
};
