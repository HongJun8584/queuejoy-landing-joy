
# QueueJoy — Full Redesign, Copy Rewrite & Post-Purchase Fix

## 1. Assets (videos)
- Upload both attached MP4s via `lovable-assets`:
  - `queuejoy-demo-video-2.mp4` (old demo) → **landing page primary showcase**
  - `queuejoy-demo-video-1.mp4` (new video) → **"Learn more" modal + post-purchase tutorial**
- Replace existing `.asset.json` pointers so all references update everywhere.

## 2. Design system (`src/index.css`, `tailwind.config.ts`)
- Lock palette: Purple `#7B3FE4` (primary), Teal `#2ED6C9` (accent), Yellow `#FFD447` (highlight).
- Larger radius (1.25rem), softer elevated shadows, refined mesh gradients.
- Add `.glass`, `.glass-strong`, `.shadow-elevated`, `.bg-mesh`, scroll-highlight tokens (background / underline / half).
- Alternating soft section backgrounds + tasteful yellow accents.

## 3. Copy rewrite (English only, polished, short)
Apply the exact replacements from the brief across every visible string in `src/contexts/LanguageContext.tsx` (EN), and prune MS/ZH keys that no longer exist. Sweep every component for hardcoded strings and replace with `t()` keys.

Sections touched: Hero, Video section, Main message, Sectors, How it works, Customer experience, Telegram/Customer view, Control center, Support/Customization, Analytics, Testimonials, Pricing, FAQ, Contact, Footer, Final CTA, all buttons, badges, microcopy.

## 4. Landing page sections (rebuild order in `Index.tsx`)
1. Hero — new headline "Turn waiting time into loyal customers", short subtitle, two CTAs, trust line, premium mockup.
2. Problem — short, emotional, 4 pain bullets.
3. Solution — clean feature grid.
4. **Video 2 showcase** (`DemoVideoSection`) with "Learn more" → modal plays Video 1.
5. **Loyalty / Telegram retention** (NEW section) — "Turn every queue into a repeat-customer channel".
6. Sectors (`IndustriesSlider`) — replace with: Clinics & Medical Centers, Dental Clinics, Beauty Salons & Aesthetic Clinics, Busy Restaurants & Cafes.
7. Comparison — manual vs QueueJoy, concise.
8. Features — 6 cards (live position, Telegram, announcements, multi-counter, analytics, retention).
9. How it works — 3 steps only.
10. Results / stats.
11. Testimonials — short quotes.
12. Pricing — single RM25/month plan.
13. FAQ — 7 short Q&A from brief.
14. Final CTA + Contact + Footer.

## 5. Motion & scroll
- `ScrollHighlight` auto-highlights: *wait less, live queue updates, Telegram notifications, direct announcements, repeat customers, customer retention, smooth digital experience, turn every queue into a repeat-customer channel*.
- Fade-up, blur-to-sharp, soft parallax on media, hover-lift on cards, smooth video frame transitions, sticky purchase panel polish.

## 6. Mobile pass
- Tighten hero stack, single-column sector slider with snap, larger tap targets, reduced font sizes for headlines, safe-area padding for sticky CTAs, video aspect-ratio containers.

## 7. Post-purchase page (`src/pages/StripeSuccess.tsx`)
Redesign with premium onboarding feel:
- Welcome hero (payment confirmed, what's next).
- **Old demo video (Video 1 — the new tutorial)** prominently embedded.
- Quick-start tutorial: 6 steps (Access account → Business setup → Branding → Telegram → Test queue → Go live).
- Onboarding checklist with progress.
- Dashboard CTA + Support section.
- Same purple/teal/yellow system, soft cards, responsive.

## 8. Auth / provisioning fix (technical)

**Important clarification:** This project runs on **Lovable Cloud (Supabase)**, not Firebase. The "Firebase Auth" issue described maps to our Supabase + tenant-token provisioning in `supabase/functions/create-business` and `claim-session`. The shared `admin@test.com` symptom comes from the seeded admin token reuse, not from Auth users.

Fix in `supabase/functions/create-business/index.ts` + `claim-session/index.ts`:
- Generate a **unique admin token per tenant** at checkout-success time (already partially done) and ensure `sessions_map` stores `(session_id → tenant_slug, admin_token)` exactly once.
- On `/stripe-success`, exchange `session_id` → fresh tenant + token via `claim-session`; never fall back to a shared default.
- Hash tokens with `admin_token_hash` (bcrypt/sha256 with salt) before storing in `tenants`.
- Store raw token only in `sessionStorage` on the client after claim; never in DB plaintext.
- Remove any default seeded `admin@test.com` path or guard it behind a dev-only env flag.
- Verify `verify-admin` edge function validates token per-tenant and rejects cross-tenant access.

If the user actually wants real per-user Supabase Auth accounts (email/password) instead of token-based admin, that's a larger refactor — flag separately, do not bundle.

## 9. Security sweep
- Re-run security scanner; address findings (RLS on `tenants`, storage policies on `tenant-logos`, function search_path).
- Confirm `update-tenant` server-side logo upload path (already done) is the only write path.
- Update `mem://architecture/security-hardening`.

## 10. Files touched (high level)
- `src/index.css`, `tailwind.config.ts`
- `src/contexts/LanguageContext.tsx` (full EN rewrite)
- `src/components/Hero.tsx`, `DemoVideoSection.tsx`, `IndustriesSlider.tsx`, `ComparisonSection.tsx`, `FeatureSections.tsx`, `HowItWorks.tsx`, `TestimonialsSection.tsx`, `PricingComparison.tsx`, `FAQ.tsx`, `Contact.tsx`, `Footer.tsx`, `FinalCTA.tsx`, `WhyLessWaitSection.tsx`, `IslandNav.tsx`, `StickyPurchasePanel.tsx`
- New: `src/components/LoyaltyTelegramSection.tsx`
- `src/pages/StripeSuccess.tsx` (full redesign)
- `src/assets/queuejoy-demo-video-1.mp4.asset.json`, `…-2.mp4.asset.json` (re-upload)
- `supabase/functions/create-business/index.ts`, `claim-session/index.ts`, `verify-admin/index.ts`
- New migration if token hashing scheme changes.

## Open question before I start
The brief says "Firebase Authentication" but the project is on Supabase/Lovable Cloud. I'll implement the **token-per-tenant hardening** described in §8 (fixes the "shared admin / password warning" symptom). If you instead want a full migration to real email/password Supabase Auth accounts per buyer, tell me and I'll plan that as a separate phase.
