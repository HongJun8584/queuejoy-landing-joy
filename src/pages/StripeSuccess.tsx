import { useState, useEffect, useRef } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { Loader2, CheckCircle, XCircle, Copy, ExternalLink, Download, Play } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { useLanguage } from "@/contexts/LanguageContext";

const NETLIFY_BASE = "https://queuejoy-live.netlify.app";
const CREATE_BUSINESS_ENDPOINT = `${NETLIFY_BASE}/.netlify/functions/createBusiness`;

const buildStatusUrl = (s: string) => `${NETLIFY_BASE}/index.html?slug=${encodeURIComponent(s)}`;
const buildAdminUrl = (s: string, token?: string) =>
  `${NETLIFY_BASE}/admin.html?slug=${encodeURIComponent(s)}${token ? `&token=${encodeURIComponent(token)}` : ""}`;
const buildCounterUrl = (s: string) => `${NETLIFY_BASE}/counter.html?slug=${encodeURIComponent(s)}`;

interface TenantLinks {
  home: string;
  counter: string;
  admin: string;
}

interface CreateBusinessResponse {
  ok?: boolean;
  tenantId?: string;
  slug?: string;
  adminToken?: string;
  data?: any;
  adminUrl?: string;
  siteUrl?: string;
  error?: string;
  message?: string;
}

function getOrCreateIdempotencyKey(sessionId: string): string {
  const storageKey = `queuejoy:idem:${sessionId}`;
  try {
    const existing = sessionStorage.getItem(storageKey);
    if (existing) return existing;
    const fresh =
      (crypto as any)?.randomUUID?.() ??
      `idem_${Date.now()}_${Math.random().toString(36).slice(2)}`;
    sessionStorage.setItem(storageKey, fresh);
    return fresh;
  } catch {
    return `idem_${sessionId}`;
  }
}

const StripeSuccess = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const { t } = useLanguage();
  const sessionId = searchParams.get("session_id");

  const [status, setStatus] = useState<"form" | "submitting" | "tutorial" | "success" | "error">("form");
  const [slug, setSlug] = useState("");
  const [businessName, setBusinessName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [links, setLinks] = useState<TenantLinks | null>(null);

  const submittingRef = useRef(false);

  const [checklist, setChecklist] = useState({
    openCustomer: false,
    openCounter: false,
    openAdmin: false,
    downloadQr: false,
  });

  useEffect(() => {
    if (!sessionId) return;
    try {
      const cached = sessionStorage.getItem(`queuejoy:setup:${sessionId}`);
      if (cached) {
        const parsed = JSON.parse(cached);
        if (parsed?.links?.home && parsed?.slug) {
          setSlug(parsed.slug);
          setBusinessName(parsed.businessName || "");
          setLinks(parsed.links);
          setStatus("success");
        }
      }
    } catch {
      /* ignore */
    }
  }, [sessionId]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!sessionId) {
      setErrorMessage(t("success.error.invalidSession"));
      setStatus("error");
      return;
    }

    if (!slug || !businessName || !email || !password) {
      setErrorMessage(t("success.error.required"));
      return;
    }

    if (password.length < 6) {
      setErrorMessage(t("success.error.password"));
      return;
    }

    const cleanSlug = slug.toLowerCase().replace(/[^a-z0-9-]/g, "");
    if (cleanSlug.length < 3 || cleanSlug.length > 50) {
      setErrorMessage(t("success.error.slug"));
      return;
    }

    if (submittingRef.current) return;
    submittingRef.current = true;

    setStatus("submitting");
    setErrorMessage("");

    const idempotencyKey = getOrCreateIdempotencyKey(sessionId);

    try {
      const res = await fetch(CREATE_BUSINESS_ENDPOINT, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Idempotency-Key": idempotencyKey,
        },
        body: JSON.stringify({
          businessName,
          email,
          password,
          desiredSlug: cleanSlug,
          plan: "monthly_myr_25",
          purchaseInfo: { stripeSessionId: sessionId, idempotencyKey },
        }),
      });

      const contentType = res.headers.get("content-type") || "";
      const isJson = contentType.includes("application/json");

      if (!res.ok) {
        let serverMsg = "";
        try {
          serverMsg = isJson
            ? (await res.json())?.error || ""
            : (await res.text()).slice(0, 200);
        } catch {
          serverMsg = "";
        }

        if (res.status === 404) throw new Error(t("success.error.unavailable"));
        if (res.status === 409) throw new Error(serverMsg || t("success.error.slugTaken"));
        throw new Error(serverMsg || t("success.error.generic"));
      }

      if (!isJson) {
        const text = await res.text();
        console.error("[StripeSuccess] Non-JSON response:", text.slice(0, 200));
        throw new Error(t("success.error.unexpected"));
      }

      const data: CreateBusinessResponse = await res.json();
      const finalSlug = data.slug || cleanSlug;
      const adminToken = data.adminToken;

      const resolvedLinks: TenantLinks = {
        home: buildStatusUrl(finalSlug),
        counter: buildCounterUrl(finalSlug),
        admin: buildAdminUrl(finalSlug, adminToken),
      };

      setLinks(resolvedLinks);
      setStatus("tutorial");

      try {
        sessionStorage.setItem(
          `queuejoy:setup:${sessionId}`,
          JSON.stringify({
            slug: finalSlug,
            businessName,
            tenantId: data.tenantId,
            links: resolvedLinks,
          })
        );
      } catch {
        /* ignore */
      }
    } catch (err: any) {
      console.error("[StripeSuccess] createBusiness error:", err);
      setErrorMessage(err?.message || t("success.error.failed"));
      setStatus("error");
    } finally {
      submittingRef.current = false;
    }
  };

  const handleSlugChange = (value: string) => {
    const formatted = value.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "");
    setSlug(formatted);
  };

  const copyToClipboard = async (text: string) => {
    await navigator.clipboard.writeText(text);
    toast({ title: t("success.copied"), description: t("success.copiedDesc") });
  };

  const openLink = (url: string, type: "customer" | "counter" | "admin") => {
    window.open(url, "_blank", "noopener,noreferrer");
    setChecklist((prev) => ({
      ...prev,
      [type === "customer" ? "openCustomer" : type === "counter" ? "openCounter" : "openAdmin"]: true,
    }));
  };

  const downloadQR = () => {
    if (!links?.home) return;
    const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=${encodeURIComponent(links.home)}`;
    const link = document.createElement("a");
    link.href = qrUrl;
    link.download = `queuejoy-${slug}-qr.png`;
    link.click();
    setChecklist((prev) => ({ ...prev, downloadQr: true }));
    toast({ title: t("success.qrDownloaded"), description: t("success.qrDownloadedDesc") });
  };

  const handleRetry = () => {
    setErrorMessage("");
    setStatus("form");
  };

  if (!sessionId) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary/5 via-accent/5 to-background p-4">
        <div className="max-w-md w-full bg-card p-8 rounded-2xl shadow-card border border-border text-center">
          <XCircle className="w-16 h-16 mx-auto mb-6 text-destructive" />
          <h1 className="text-2xl font-bold mb-4 text-destructive">{t("success.invalid.title")}</h1>
          <p className="text-muted-foreground mb-6">{t("success.invalid.desc")}</p>
          <Button variant="outline" onClick={() => navigate("/")}>
            {t("success.invalid.home")}
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-accent/5 to-background p-4 py-12">
      <div className="max-w-2xl mx-auto">
        {status === "form" && (
          <div className="bg-card p-6 sm:p-8 rounded-2xl shadow-card border border-border">
            <div className="text-center mb-8">
              <CheckCircle className="w-16 h-16 mx-auto mb-4 text-green-500" />
              <h1 className="text-2xl sm:text-3xl font-bold mb-2">{t("success.form.title")}</h1>
              <p className="text-muted-foreground">{t("success.form.subtitle")}</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <Label htmlFor="businessName" className="text-base">{t("success.form.businessName")}</Label>
                <Input
                  id="businessName"
                  type="text"
                  value={businessName}
                  onChange={(e) => setBusinessName(e.target.value)}
                  placeholder={t("success.form.businessNamePlaceholder")}
                  className="mt-2"
                  required
                  maxLength={100}
                />
                <p className="text-sm text-muted-foreground mt-1">{t("success.form.businessNameHelp")}</p>
              </div>

              <div>
                <Label htmlFor="email" className="text-base">{t("success.form.email")}</Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder={t("success.form.emailPlaceholder")}
                  className="mt-2"
                  required
                  maxLength={120}
                />
                <p className="text-sm text-muted-foreground mt-1">{t("success.form.emailHelp")}</p>
              </div>

              <div>
                <Label htmlFor="password" className="text-base">{t("success.form.password")}</Label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder={t("success.form.passwordPlaceholder")}
                  className="mt-2"
                  required
                  minLength={6}
                  maxLength={120}
                />
                <p className="text-sm text-muted-foreground mt-1">{t("success.form.passwordHelp")}</p>
              </div>

              <div>
                <Label htmlFor="slug" className="text-base">{t("success.form.slug")}</Label>
                <Input
                  id="slug"
                  type="text"
                  value={slug}
                  onChange={(e) => handleSlugChange(e.target.value)}
                  placeholder={t("success.form.slugPlaceholder")}
                  className="mt-2 font-mono"
                  required
                  maxLength={50}
                />
                <p className="text-sm text-muted-foreground mt-1 break-all">
                  {t("success.form.slugHelp")} {buildStatusUrl(slug || "yourslug")}
                </p>
              </div>

              {errorMessage && (
                <div className="p-3 bg-destructive/10 border border-destructive/30 rounded-lg">
                  <p className="text-sm text-destructive">{errorMessage}</p>
                </div>
              )}

              <Button type="submit" variant="hero" size="lg" className="w-full" disabled={!slug || !businessName || !email || !password}>
                {t("success.form.submit")}
              </Button>
            </form>
          </div>
        )}

        {status === "submitting" && (
          <div className="bg-card p-8 rounded-2xl shadow-card border border-border text-center">
            <Loader2 className="w-16 h-16 mx-auto mb-6 text-primary animate-spin" />
            <h1 className="text-2xl font-bold mb-4">{t("success.submitting.title")}</h1>
            <p className="text-muted-foreground">
              {t("success.submitting.setup")} <span className="font-semibold">{businessName}</span>{" "}
              {t("success.submitting.at")} <span className="font-mono">{slug}</span>
            </p>
            <ul className="text-sm text-muted-foreground mt-6 space-y-1 text-left max-w-xs mx-auto">
              <li>{t("success.submitting.s1")}</li>
              <li>{t("success.submitting.s2")}</li>
              <li>{t("success.submitting.s3")}</li>
              <li>{t("success.submitting.s4")}</li>
              <li>{t("success.submitting.s5")}</li>
            </ul>
          </div>
        )}

        {status === "tutorial" && links && (
          <div className="bg-card p-6 sm:p-8 rounded-2xl shadow-card border border-border">
            <div className="text-center mb-6">
              <h1 className="text-2xl sm:text-3xl font-bold mb-2">{t("success.tutorial.title")}</h1>
              <p className="text-muted-foreground">{t("success.tutorial.subtitle")}</p>
            </div>
            <div className="relative w-full overflow-hidden rounded-xl border border-border bg-black aspect-video mb-6">
              <video
                src="/__l5e/assets-v1/b66ceb59-d391-47e4-a9c4-2c19b0f92f78/queuejoy-demo-video-1.mp4"
                controls
                playsInline
                preload="metadata"
                className="absolute inset-0 w-full h-full object-cover"
              />
            </div>
            <div className="flex flex-col sm:flex-row gap-3">
              <Button variant="hero" size="lg" className="w-full" onClick={() => setStatus("success")}>
                {t("success.tutorial.continue")}
              </Button>
              <Button variant="outline" size="lg" className="w-full" onClick={() => setStatus("success")}>
                {t("success.tutorial.skip")}
              </Button>
            </div>
            <p className="text-xs text-muted-foreground text-center mt-4">{t("success.tutorial.note")}</p>
          </div>
        )}

        {status === "success" && links && (
          <div className="space-y-6">
            <div className="relative overflow-hidden bg-card p-6 sm:p-10 rounded-3xl shadow-elevated border border-primary/15 text-center">
              <div aria-hidden className="pointer-events-none absolute -top-24 -right-24 w-72 h-72 rounded-full bg-primary/15 blur-3xl" />
              <div aria-hidden className="pointer-events-none absolute -bottom-24 -left-24 w-72 h-72 rounded-full bg-secondary/15 blur-3xl" />
              <div className="relative">
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-secondary/15 text-secondary text-xs font-semibold mb-4">
                  <CheckCircle className="w-4 h-4" /> Payment confirmed
                </div>
                <h1 className="text-3xl sm:text-4xl font-black mb-3 tracking-tight">
                  Welcome to <span className="text-gradient">QueueJoy</span> 🎉
                </h1>
                <p className="text-muted-foreground text-base sm:text-lg max-w-xl mx-auto">
                  Your system is live. Watch the tutorial, then follow the 6-step quick start below.
                </p>
              </div>
            </div>

            <div className="bg-card rounded-3xl shadow-card border border-border overflow-hidden">
              <div className="aspect-video bg-black">
                <video
                  src="/__l5e/assets-v1/b66ceb59-d391-47e4-a9c4-2c19b0f92f78/queuejoy-demo-video-1.mp4"
                  controls
                  playsInline
                  preload="metadata"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-5 sm:p-6">
                <p className="text-sm font-semibold mb-1">Start here — 60-second tutorial</p>
                <p className="text-xs text-muted-foreground">Walks you through customer page, counter, admin, and Telegram setup.</p>
              </div>
            </div>

            <div className="bg-card p-6 rounded-3xl shadow-card border border-border">
              <h2 className="text-lg font-bold mb-1">Quick start — 6 steps</h2>
              <p className="text-sm text-muted-foreground mb-5">Most businesses finish in under 5 minutes.</p>
              <div className="grid sm:grid-cols-2 gap-3">
                {[
                  { n: 1, t: "Open your admin", d: "Tap below to access your dashboard." },
                  { n: 2, t: "Set up your business", d: "Add business name and welcome text." },
                  { n: 3, t: "Customize branding", d: "Upload your logo and colors." },
                  { n: 4, t: "Connect Telegram", d: "Link your Telegram bot for notifications." },
                  { n: 5, t: "Test the queue", d: "Join from your phone and call next." },
                  { n: 6, t: "Go live", d: "Print the QR code and serve customers." },
                ].map((s) => (
                  <div key={s.n} className="flex gap-3 p-4 rounded-2xl bg-muted/40 border border-border/50">
                    <div className="w-9 h-9 rounded-full bg-gradient-to-br from-primary to-secondary text-primary-foreground flex items-center justify-center font-bold text-sm flex-shrink-0">
                      {s.n}
                    </div>
                    <div>
                      <p className="font-semibold text-sm">{s.t}</p>
                      <p className="text-xs text-muted-foreground mt-0.5">{s.d}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>


            <div className="bg-card p-6 rounded-2xl shadow-card border border-border">
              <h2 className="text-lg font-bold mb-4">{t("success.links.title")}</h2>

              <div className="space-y-4">
                {[
                  { label: t("success.links.customer"), desc: t("success.links.customerDesc"), url: links.home, type: "customer" as const },
                  { label: t("success.links.counter"), desc: t("success.links.counterDesc"), url: links.counter, type: "counter" as const },
                  { label: t("success.links.admin"), desc: t("success.links.adminDesc"), url: links.admin, type: "admin" as const },
                ].map((row) => (
                  <div key={row.type} className="p-4 bg-muted/30 rounded-xl">
                    <div className="flex items-center justify-between gap-4 flex-wrap">
                      <div className="flex-1 min-w-0">
                        <p className="font-semibold text-sm mb-1">{row.label}</p>
                        <p className="text-xs text-muted-foreground truncate font-mono">{row.url}</p>
                      </div>
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline" onClick={() => copyToClipboard(row.url)}>
                          <Copy className="h-4 w-4" />
                        </Button>
                        <Button size="sm" onClick={() => openLink(row.url, row.type)}>
                          <ExternalLink className="h-4 w-4 mr-1" />
                          {t("success.links.open")}
                        </Button>
                      </div>
                    </div>
                    <p className="text-xs text-muted-foreground mt-2">{row.desc}</p>
                  </div>
                ))}
              </div>

              <div className="flex gap-3 mt-6 flex-wrap">
                <Button variant="hero" onClick={() => openLink(links.home, "customer")}>
                  <Play className="h-4 w-4 mr-2" />
                  {t("success.links.preview")}
                </Button>
                <Button variant="outline" onClick={downloadQR}>
                  <Download className="h-4 w-4 mr-2" />
                  {t("success.links.downloadQR")}
                </Button>
              </div>
            </div>

            <div className="bg-card p-6 rounded-2xl shadow-card border border-border">
              <h2 className="text-lg font-bold mb-2">{t("success.checklist.title")}</h2>
              <p className="text-sm text-muted-foreground mb-4">{t("success.checklist.desc")}</p>

              <div className="space-y-3">
                {[
                  { key: "openCustomer", label: t("success.checklist.i1"), action: () => openLink(links.home, "customer") },
                  { key: "openCounter", label: t("success.checklist.i2"), action: () => openLink(links.counter, "counter") },
                  { key: "openAdmin", label: t("success.checklist.i3"), action: () => openLink(links.admin, "admin") },
                  { key: "downloadQr", label: t("success.checklist.i4"), action: downloadQR },
                ].map((item, i) => {
                  const done = (checklist as any)[item.key];
                  return (
                    <div key={item.key} className={`flex items-center gap-3 p-3 rounded-lg transition-colors ${done ? "bg-green-500/10" : "bg-muted/30"}`}>
                      <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 ${done ? "bg-green-500 text-white" : "bg-primary/15 text-primary"}`}>
                        {done ? "✓" : i + 1}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-sm">{item.label}</p>
                      </div>
                      <Button size="sm" variant="ghost" onClick={item.action}>
                        {t("success.checklist.doIt")}
                      </Button>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="text-center text-sm text-muted-foreground">
              <p>
                {t("success.help")}{" "}
                <a href="mailto:hello.queuejoy@gmail.com" className="text-primary hover:underline">
                  hello.queuejoy@gmail.com
                </a>{" "}
                {t("success.helpOr")}{" "}
                <a href="https://wa.me/60195055266" className="text-primary hover:underline">
                  019-505-5266
                </a>
              </p>
            </div>
          </div>
        )}

        {status === "error" && (
          <div className="bg-card p-6 sm:p-8 rounded-2xl shadow-card border border-destructive/30 text-center">
            <XCircle className="w-16 h-16 mx-auto mb-6 text-destructive" />
            <h1 className="text-2xl font-bold mb-4 text-destructive">{t("success.failed.title")}</h1>
            <p className="text-muted-foreground mb-4">
              {errorMessage || t("success.failed.default")}
            </p>
            <p className="text-sm text-muted-foreground mb-2">{t("success.failed.safe")}</p>
            {sessionId && (
              <p className="text-xs text-muted-foreground mb-6 font-mono break-all">
                {t("success.failed.reference")} {sessionId.slice(0, 16)}…
              </p>
            )}
            <div className="space-y-3">
              <Button variant="hero" onClick={handleRetry} className="w-full">
                {t("success.failed.retry")}
              </Button>
              <Button
                variant="outline"
                onClick={() => (window.location.href = "mailto:hello.queuejoy@gmail.com")}
                className="w-full"
              >
                {t("success.failed.contact")}
              </Button>
              <Button variant="ghost" onClick={() => navigate("/")} className="w-full">
                {t("success.failed.home")}
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default StripeSuccess;
