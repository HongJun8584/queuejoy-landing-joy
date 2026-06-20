## QueueJoy — Landing + Purchase Flow Fix Plan

Scope is **landing page polish + Stripe→Firebase Auth post-purchase only**. No backend rewrite, no Supabase migration. Existing Netlify + Firebase Realtime DB stays. Stripe stays. Existing routes stay.

---

### 1. Stripe Buy Flow (no detours)

- Audit every primary CTA (Hero, IslandNav, Pricing, FinalCTA, StickyPurchasePanel, ReturnPopup) and wire them all through `StripeCheckoutButton` → existing `create-checkout` function → Stripe Checkout. Remove any intermediate modal/scroll step that's currently in the way.

### 2. Firebase Auth user per purchase (real, unique)

- Add new client step on `/stripe-success` **before** calling `createBusiness`:
  - Collect: business name, slug, **email**, **password (required, min 8, strength meter)**.
  - Call Firebase Auth REST `signUp` (`identitytoolkit.googleapis.com/v1/accounts:signUp`) using a new `VITE_FIREBASE_API_KEY` env var → get `localId` (uid) + `idToken`.
  - Pass `{ ownerUid, ownerEmail }` into existing `createBusiness` Netlify call so it's stored on the tenant record (tenant gets a unique admin, no shared `admin@test.com`).
  - On success: sign user in (idToken stored in sessionStorage only, never logged), redirect to their tenant admin URL with their own per-tenant `adminToken`.
- Remove the "shared admin password warning" UI entirely.
- Required new secret: `VITE_FIREBASE_API_KEY` (Firebase Web API key — publishable, safe in client).

```text
Stripe Checkout ─► /stripe-success ─► [Form: name, slug, email, password]
                                     │
                                     ├─► Firebase Auth signUp  → uid + idToken
                                     ├─► createBusiness({ slug, ownerUid, ownerEmail })
                                     └─► Redirect to /admin.html?slug=…&token=…
```

### 3. Videos render reliably

- `DemoVideoSection`: keep Video 2 as the hero showcase, Video 1 in the "Watch full demo" modal. Add `poster`, explicit `width/height`, visible play overlay always present until user interacts (fixes mobile autoplay block), `preload="metadata"`, lazy-mount only after in-view.
- `StripeSuccess` tutorial: Video 1 with the same robust player (poster + play overlay + controls fallback).
- Verify both `.asset.json` pointers resolve; add `onError` fallback that swaps to a direct `<a>` download link.

### 4. Sector section → 4 real verticals

Replace `IndustriesSlider` content with 4 cards:

1. **Clinics** — "Patients wait at ease, not in line."
2. **Dental Clinics** — "Fewer no-shows, calmer waiting rooms."
3. **Beauty Salons & Spas** — "Relaxed clients, smoother bookings."
4. **Car Service Centers** — "Customers track service without hovering at the counter."

Each card: short title, 1-line explanation, 1-line business benefit, subtle teal "Great fit" badge, new image (reuse closest existing asset or generate), hover lift, scroll reveal.

### 5. Full copy + design system rewrite

- Repaint tokens in `src/index.css` + `tailwind.config.ts`:
  - Primary `#7B3FE4`, Accent `#2ED6C9`, Highlight `#FFD447`, neutral white background, soft mesh/glow gradients, radius `1.25rem`, refined elevated shadow.
- Rewrite every visible string in `LanguageContext.tsx` (EN only — keep MS/ZH keys but English-only rewrite per request) for: Hero, Metrics, Demo, Loyalty, Industries, HowItWorks, Why-Less-Wait, Feature sections, Testimonials, Pricing, FinalCTA, FAQ, Footer, microcopy.
- Apply `ScrollHighlight` to the required phrases: *live queue updates, Telegram notifications, direct announcements, repeat customers, customer retention, better customer experience, reduce waiting frustration, turn waiting time into retention*.

### 6. Motion + layout polish (whole page)

- Scroll-reveal on every section via existing `useScrollReveal`.
- Card hover lift + glow, button press states, smoother section padding scale (`py-24 md:py-32`).
- Mobile: stack hero, single-column sectors slider, larger tap targets, no overlapping text, `text-balance` on headlines.
- Visual reference: layout/rhythm/color from the uploaded screenshot only — no copying text or imagery.

### 7. Final QA pass

- Click every CTA → confirm Stripe redirect.
- Load `/stripe-success` with a test `session_id` → confirm form → Firebase signUp → tenant create → redirect.
- Play both videos on desktop + mobile viewport.
- Scan for leftover old copy / mixed-language strings / dead components.

---

### Technical notes

- **No Supabase changes.** All backend stays on Netlify Functions + Firebase Realtime DB.
- **New secret required:** `VITE_FIREBASE_API_KEY` (will be requested via the add-secret flow when you approve).
- **Files touched:** `src/index.css`, `tailwind.config.ts`, `src/contexts/LanguageContext.tsx`, `src/components/{Hero,DemoVideoSection,IndustriesSlider,LoyaltyTelegramSection,Pricing,PricingComparison,FinalCTA,IslandNav,StickyPurchasePanel,ReturnPopup,Footer,FAQ,TestimonialsSection,FeatureSections,AdminPanelSections,HowItWorks,WhyLessWaitSection,VideoModal,StripeCheckoutButton}.tsx`, `src/pages/StripeSuccess.tsx`, new `src/lib/firebaseAuth.ts`.
- **Not touched:** Supabase edge functions, Netlify `createBusiness` (called with extra fields, backward compatible), Stripe webhook, DB schema, routes.  
  
  
  
  
IMPORTANT INSTRUCTIONS FOR LOVABLE — FULL QUEUEJOY LANDING PAGE REDESIGN AND COPY REWRITE
  Please redesign and rewrite the entire QueueJoy landing page from top to bottom. The goal is to turn it into a premium, modern, high-conversion SaaS landing page that feels visually polished, emotionally clear, and much easier to scan. The page must feel like a high-end Dribbble-style product website: elegant, minimal, soft, modern, conversion-focused, and trustworthy.
  The current landing page has a strong foundation, but some copy is too long, some sections feel crowded, and some text blocks are blocking or overpowering the layout. Fix this completely. The new page must have better spacing, better hierarchy, better rhythm, smoother motion, cleaner cards, and shorter copy everywhere. Every part of the page should feel intentional. Every word should earn its place.
  The page must be fully rewritten in clear, polished English. Update every single visible word on the page. Replace every outdated line, every long paragraph, every label, every button, every caption, every FAQ answer, every sector name, every statistic label, every feature title, every supporting sentence, every footer item, every microcopy line, every form label, and every translation. Nothing should be left untranslated or half-updated. Every text block should be reviewed and rewritten for clarity, brevity, and premium tone.
  Use QueueJoy’s brand palette consistently across the whole experience:
  Primary brand color: Purple #7B3FE4
  Secondary accent color: Bright Teal #2ED6C9
  Tertiary highlight color: Warm Yellow #FFD447
  Purple should be the dominant brand identity and main CTA color. Teal should be used for highlights, chips, progress states, feature accents, charts, hover glows, and supporting motion. Yellow should be used sparingly for warmth, emphasis, and attention cues. The overall palette should sit on a clean white or soft neutral background with subtle purple gradients, teal glows, and tasteful yellow pops. The final look should feel premium, calm, modern, and joyful.
  The design system should be upgraded across the entire page:
  * Softer borders
  * More elegant card shadows
  * Larger rounded corners
  * More whitespace
  * Better section separation
  * Cleaner typographic scale
  * Refined hero balance
  * Premium button styling
  * Subtle glassmorphism where appropriate
  * Better desktop and mobile spacing
  * Smoother media containers
  * More polished hover states
  * Stronger scroll-based motion
  The page should not look busy. It should look sharp, expensive, and easy to understand.
  The overall story of the page should be:
  QueueJoy helps businesses turn frustrating waiting lines into a smooth digital experience, keep customers informed, reduce uncertainty, improve service flow, and build stronger repeat visits through smart queue-linked communication.
  The page should guide the visitor through a simple conversion journey:
  Hero → problem → solution → videos → sectors → loyalty → comparison → features → how it works → results → testimonials → pricing → FAQ → contact
  Please give the page a much better UI and UX with smoother animation, scroll effect, and highlight behavior. Use scroll-triggered reveals, gentle parallax motion, soft fade-ins, subtle scale transitions, blur-to-sharp reveals, and elegant section entrance effects. Important phrases should auto-highlight while the user scrolls. The highlight should feel premium and smooth, not flashy. The page should feel alive, not static.
  Please improve the media experience throughout the landing page:
  * Make images and phone mockups transition smoothly
  * Add soft motion to card images and dashboard screenshots
  * Make video blocks feel premium and interactive
  * Use polished hover and focus states
  * Add subtle motion when media enters the viewport
  * Add nice easing and timing so updates feel smooth rather than abrupt
  Two video blocks must be present on the page:
  1. Video 2 is the post-purchase video section shown prominently on the landing page as a major feature showcase.
  2. Video 1 is the main demo video, accessible through a button like “Want to learn more?” or “Watch the full demo.”
  The landing page should clearly communicate that Video 2 is the post-purchase video for the landing page experience, while Video 1 is the deeper product demo. Video 1 should also later be reusable as the post-purchase video after payment. The UI around both videos should be smooth, premium, and highly visual, with elegant frames, subtle gradients, and strong call-to-action context.
  The hero section must be redesigned to feel much stronger, cleaner, and more persuasive. The hero should instantly communicate the value of QueueJoy in one glance. It should include:
  * A strong headline
  * A short supporting subtitle
  * A primary CTA
  * A secondary CTA
  * A premium product visual or phone/dashboard mockup
  * Clean spacing and balanced composition
  The hero copy should be short, direct, and emotionally clear. Do not use long paragraphs. Do not overload the hero with too much text. The message should be obvious in under 5 seconds.
  Suggested hero direction:
  Headline should communicate that QueueJoy helps customers wait less, stay informed, and enjoy a smoother queue experience.
  Subtitle should explain that businesses can serve better, reduce friction, and build repeat visits through a modern queue system.
  CTA examples:
  * Watch Demo
  * Start Free Trial
  * See How It Works
  The hero should also include trust cues, soft stats, or compact benefit chips if useful, but keep everything elegant and uncluttered.
  Please completely rewrite the copy in the problem section. The current copy is too long in places and is visually blocking the page. Replace it with short, emotionally clear language that explains the pain of traditional waiting:
  * Customers do not know when they will be served
  * Staff are interrupted by repeated status questions
  * People hesitate to leave the queue area
  * The experience feels old-fashioned and stressful
  Then show QueueJoy as the better alternative:
  * Customers can track their place live
  * Customers can move freely
  * Businesses can communicate instantly
  * Waiting feels calm and modern
  Keep this section short, elegant, and highly readable.
  The solution section should show QueueJoy as the smarter queue experience. The focus should be on:
  * Live queue status
  * Customer notification
  * Easier service flow
  * Better retention
  * Less frustration
  * More repeat visits
  This section should be visually clean and use premium card styling or a simple feature grid. Keep the copy short.
  Please add a new loyalty and retention section that clearly explains QueueJoy’s unique advantage. This is one of the most important parts of the landing page. The page should explain that QueueJoy is not a traditional points-based loyalty app. Instead, QueueJoy creates a direct communication channel through Telegram-linked queue participation.
  Use this idea clearly:
  When customers join the queue and link Telegram, they are synced to the system. The business can then send direct announcements, promotions, reminders, return offers, and rebooking messages to customers who have already used the queue.
  Explain why this is powerful:
  * High open rates because messages go straight to Telegram
  * No separate loyalty app required
  * No physical loyalty card
  * Low friction for customers
  * Easy retargeting for businesses
  * A cheap and effective retention loop
  * Strong for bringing past customers back
  This section should position QueueJoy as a customer retention tool as well as a queue system. It should not sound like a generic loyalty program. It should sound smarter, more modern, and more practical.
  Suggested loyalty section headline:
  Turn every queue into a repeat-customer channel
  Suggested supporting message:
  QueueJoy helps businesses stay top of mind with customers through direct Telegram announcements, promotions, and reminders.
  The landing page should explicitly explain that QueueJoy is useful for businesses that want repeat visits, not just one-time transactions.
  Please upgrade the sector section completely. Replace the current sectors with 4 sectors that fit QueueJoy better and have longer wait times, repeat visits, and stronger loyalty needs. Use these 4 sectors:
  1. Clinics
  2. Dental Clinics
  3. Beauty Salons & Spas
  4. Car Service Centers
  For each sector, show why QueueJoy is valuable:
  * Clinics need smooth waiting and patient communication
  * Dental clinics need better queue flow and return reminders
  * Beauty salons and spas need repeat visits and appointment clarity
  * Car service centers need waiting updates and customer retention
  The sector section should be visually premium, easy to scan, and visually distinct. Use cards, docks, or elegant tiles. Each card should have a short headline, a small explanation, and a subtle visual accent. The section should feel more relevant to QueueJoy’s real use cases.
  Suggested sector section headline:
  Built for businesses where waiting matters most
  Please improve the comparison section. Make it more visual, concise, and compelling. Show QueueJoy compared to traditional/manual queue methods. The comparison should clearly show:
  * Manual queueing is stressful and uncertain
  * QueueJoy is live, modern, and transparent
  * Manual systems interrupt staff
  * QueueJoy reduces repeated questions
  * Manual systems lose customer attention
  * QueueJoy helps keep customers connected
  Use short copy, strong labels, and clean layout. The comparison should be obvious at a glance and feel polished.
  Please redesign the features section with better spacing, clearer hierarchy, and nicer visual cards. Do not overload it with too much text. Show only the most important features. The features should include:
  * Live queue position tracking
  * Telegram notifications
  * Direct announcements and promotions
  * Multi-counter support
  * Analytics dashboard
  * Customer retention / repeat visit flow
  Each feature card should have:
  * A short title
  * A short supporting line
  * A premium icon or visual accent
  * A hover state
  * A clean border
  * Soft shadow
  * Smooth entrance animation
  Please simplify the “How it works” section into 3 steps only:
  1. Customer joins the queue
  2. Customer tracks progress on their phone
  3. Customer gets notified when it is their turn
  This section should be visually elegant and easy to understand. The steps should feel fast and obvious. Add subtle motion and connecting lines or step indicators if useful.
  Please improve the results / stats / proof section so it looks more trustworthy and modern. If you display any numbers, use a dashboard-style treatment with premium cards and strong typography. The section should reinforce product value and trust. Keep it clean and uncluttered.
  Please improve the testimonials section so it feels authentic and premium. Use refined review cards with short quotes, small avatars or profile markers, and clean star styling if needed. The testimonials should support the product story and feel believable. Keep the quotes short and to the point.
  Please make the pricing section simpler and more premium. Keep one clear plan. Do not add confusion. The pricing should feel like an easy decision:
  * One plan
  * Clear monthly value
  * Strong CTA
  * Important included benefits
  * Simple and direct explanation
  The pricing card should reinforce that QueueJoy is a complete system, not a confusing menu of tiers. It should clearly communicate the value.
  Suggested pricing direction:
  QueueJoy
  RM25/month
  Includes queue tracking, Telegram notifications, direct announcements, multi-counter support, analytics, and support.
  Please make the FAQ section cleaner and more polished. Use accordion-style questions with smooth open/close animation. The FAQ should answer only the most common concerns:
  * Do customers need an app?
  * Does QueueJoy work on phones?
  * Can I customize branding?
  * Does it support multiple counters?
  * How fast is setup?
  Keep the answers short, helpful, and reassuring.
  Please redesign the footer / contact area so it feels polished and professional. Add a final CTA and a simple way to reach the business. The footer should be minimal but not empty. It should carry the brand identity softly and close the page with confidence.
  Now, very important: the copy on the current page is too long in some areas. Shorten everything. Replace long paragraphs with concise, premium microcopy. Improve line breaks. Make headlines sharper. Make subtitles shorter. Make buttons clearer. Avoid clutter. The page should feel more refined and less crowded.
  Please rewrite every text string on the page. This means every single word shown in the landing page must be updated into polished English. Nothing should remain in the old style. Nothing should overlap. Nothing should be too long. No half-finished translation. No leftover placeholders. No text should be hidden behind images or cards. Ensure all typography fits the layout cleanly.
  Please use Dribbble-style UI inspiration throughout the page:
  * Clean modern SaaS layout
  * Soft gradients
  * Refined shadows
  * Floating cards
  * Elegant spacing
  * Smooth hero composition
  * Premium product mockups
  * Great use of whitespace
  * Beautiful highlight colors
  * Tasteful motion
  * Minimal but high-impact design
  The page should not feel like a generic template. It should feel custom, polished, and designed for a real SaaS product with strong product-market fit.
  Please implement strong scroll animation and scroll effect design:
  * Auto-highlight key phrases on scroll
  * Fade in content as sections enter view
  * Slight upward motion on entry
  * Soft blur-to-sharp reveal
  * Smooth media transitions
  * Elegant motion for buttons and cards
  * Subtle active state changes for important text
  * Smooth sticky or floating CTA behavior where useful
  The highlight behavior should make important phrases stand out naturally, especially:
  * wait less
  * live queue status
  * Telegram notifications
  * direct announcements
  * repeat customers
  * reduce uncertainty
  * smooth digital experience
  * turn every queue into a repeat-customer channel
  These phrases should feel emphasized during scroll without being distracting.
  Please also ensure the page has better background treatment:
  * Alternate section backgrounds gently
  * Use soft tinted panels
  * Use subtle gradients
  * Add soft noise or texture only if tasteful
  * Use gentle borders and translucent layers
  * Avoid harsh blocks of color
  Please ensure the following UI areas are upgraded:
  * UI and UX
  * Background
  * Borders
  * CTA buttons
  * Comparisons
  * Docks / tile layouts
  * Features
  * Footer
  * Hero
  * Hooks
  * Scroll animation
  * Scroll highlight effect
  * Media transitions
  * Video sections
  * Image cards
  * Pricing
  * Testimonials
  * FAQ
  * Contact form
  * Final CTA
  Make the overall feeling:
  * Premium
  * Smooth
  * Modern
  * Trustworthy
  * Friendly
  * High-conversion
  * Easy to scan
  * Dribbble-inspired
  * Suitable for a SaaS product called QueueJoy
  Now rewrite the page with updated copy. Use clearer language, shorter sentences, stronger headlines, and better visual hierarchy. Remove all clutter. Make every section feel more useful and more beautiful.
  USE THIS STRUCTURE TO REPLACE TEXT ON THE LANDING PAGE:
  1. Replace the hero title with a shorter, stronger headline that explains QueueJoy’s main promise.
  2. Replace the hero subtitle with a concise explanation of queue tracking, notifications, and repeat visits.
  3. Replace hero CTAs with short, clear action buttons.
  4. Replace the problem section copy with a clearer explanation of frustration and uncertainty.
  5. Replace the solution section copy with a sharper explanation of QueueJoy’s benefits.
  6. Add a premium loyalty section explaining Telegram-linked direct announcements and repeat customer retargeting.
  7. Replace the sector section with Clinics, Dental Clinics, Beauty Salons & Spas, and Car Service Centers.
  8. Replace all feature titles and descriptions with shorter, clearer value statements.
  9. Replace the comparison section with a clean manual-vs-QueueJoy comparison.
  10. Replace the how-it-works section with 3 simple steps.
  11. Replace the testimonial copy with shorter, more believable quotes.
  12. Replace the pricing section with one clear plan at RM25/month.
  13. Replace the FAQ content with short, useful answers.
  14. Replace the final CTA with a clean conversion-focused closing message.
  15. Replace every button label, every caption, every badge, every helper text, every footer item, and every microcopy line.
  16. Ensure no text overlaps or breaks layout on desktop or mobile.
  17. Ensure all translations are fully updated into polished English.
  18. Ensure the two video areas are clearly separated and labeled as Video 2 and Video 1 with the correct CTA flow.
  19. Ensure the page uses the purple / teal / yellow brand palette beautifully.
  20. Ensure the page feels smoother, more premium, and more conversion-focused than before.
  Suggested final page tone:
  Clean, premium, modern, calm, confident, and smart.
  Suggested final CTA:
  Ready to make waiting feel modern?
  Suggested alternate CTA:
  Start your free trial today
  Suggested alternate button:
  Want to learn more?
  Suggested page promise:
  QueueJoy helps businesses reduce waiting pain, improve customer flow, and turn every queue into a retention opportunity.
  Please make this landing page feel like the best version of QueueJoy: visually stronger, emotionally clearer, more modern, and much easier to trust.
  Replace all page text with simple, attractive English copy.
  HERO
  Replace:
  “Turn frustrating waiting lines into a smooth digital experience.”
  With:
  “Turn waiting time into loyal customers.”
  Replace:
  “QueueJoy helps businesses manage queues, keep customers informed, and bring them back with direct Telegram announcements, reminders, and promotions.”
  With:
  “QueueJoy helps businesses manage queues, send live updates, and bring customers back with Telegram messages.”
  Replace:
  “No extra app. No complicated setup. Just a better customer experience that keeps people coming back.”
  With:
  “No extra app. No hard setup. Just a better way to wait.”
  Replace buttons:
  “Start Free Trial” -> “Start Free Trial”
  “Watch Demo” -> “Watch Demo”
  Replace trust line:
  “Built for businesses with real waiting lines and repeat customers.”
  With:
  “Made for businesses with real waiting time.”
  VIDEO SECTION
  Replace:
  “Watch the full QueueJoy demo in action”
  With:
  “See QueueJoy in action”
  Replace:
  “Watch how QueueJoy improves waiting, communication, and return visits in one smooth flow.”
  With:
  “See how QueueJoy makes waiting easier and keeps customers coming back.”
  Replace:
  “Want to learn more?”
  With:
  “Learn more”
  MAIN MESSAGE
  Replace:
  “QueueJoy is more than a queue system. It helps businesses reduce confusion, keep customers updated, and turn one-time visitors into repeat customers through Telegram.”
  With:
  “QueueJoy is more than a queue system. It helps businesses keep customers updated and bring them back through Telegram.”
  SECTOR SECTION
  Replace:
  “Built for businesses where waiting matters”
  With:
  “Made for businesses with waiting time”
  Replace:
  “QueueJoy works best where wait times are longer, service is personal, and return visits matter.”
  With:
  “QueueJoy works best where customers wait, come back, and care about service.”
  Sector titles:
  “Clinics and Medical Centers”
  “Dental Clinics”
  “Beauty Salons and Aesthetic Clinics”
  “Busy Restaurants and Cafes”
  Sector descriptions:
  Clinics and Medical Centers -> “Keep patients informed and make waiting feel calmer.”
  Dental Clinics -> “Reduce front desk stress and keep patients updated.”
  Beauty Salons and Aesthetic Clinics -> “Make bookings smoother and bring clients back.”
  Busy Restaurants and Cafes -> “Turn peak hour waiting into a better experience.”
  HOW IT WORKS
  Replace:
  “How it works”
  With:
  “How it works”
  Replace:
  “Simple setup. Clear communication. Better customer retention.”
  With:
  “Three simple steps. Better customer experience.”
  Steps:
  1. “Customer joins the queue”
     “The customer checks in fast.”
  2. “Customer connects through Telegram”
     “Telegram becomes the direct line.”
  3. “Business sends updates, reminders, and promotions”
     “Send updates, reminders, and offers.”
  CUSTOMER EXPERIENCE SECTION
  Replace:
  “See the customer experience”
  With:
  “See the customer view”
  Replace:
  “Customers can check their position, get updates, and stay informed without asking the front desk.”
  With:
  “Customers can see their place, get updates, and wait with less stress.”
  Replace:
  “Live queue position — less confusion, better flow”
  With:
  “Live queue position”
  Replace:
  “Customers know where they stand, so they wait with less uncertainty.”
  With:
  “Customers always know what is happening.”
  CUSTOMER VIEW / TELEGRAM
  Replace:
  “Customer view”
  With:
  “Customer view”
  Replace:
  “Automatic Telegram connection”
  With:
  “Telegram connection”
  Replace:
  “Customers connect once and become reachable for updates, reminders, and announcements.”
  With:
  “Customers connect once and stay reachable.”
  CONTROL CENTER
  Replace:
  “The control center”
  With:
  “Business dashboard”
  Replace:
  “Manage queues, send messages, and see everything from one dashboard.”
  With:
  “Manage queues, send messages, and stay in control.”
  Replace:
  “Run everything from one place”
  With:
  “Run everything in one place”
  SUPPORT / CUSTOMIZATION
  Replace:
  “Customizable support, ready to grow”
  With:
  “Built to fit your business”
  Replace:
  “Adjust QueueJoy to match your business workflow without adding complexity.”
  With:
  “Easy to fit into your daily workflow.”
  ANALYTICS
  Replace:
  “Analytics dashboard”
  With:
  “Analytics”
  Replace:
  “See usage, activity, and customer engagement at a glance.”
  With:
  “See what is happening at a glance.”
  TESTIMONIALS
  Replace:
  “What customers notice”
  With:
  “What customers say”
  Replace testimonial text with short, stronger lines:
  “The setup was fast and simple.”
  “Customers understood it right away.”
  “Communication got much better.”
  “It feels more professional.”
  “Waiting feels easier now.”
  PRICING
  Replace:
  “One simple plan”
  With:
  “One plan”
  Replace:
  “Everything you need to manage queues and keep customers connected.”
  With:
  “Everything you need in one plan.”
  Replace:
  “RM25 / month”
  With:
  “RM25 / month”
  Replace:
  “Built for businesses that want a better queue experience and stronger customer retention.”
  With:
  “Made for businesses that want better service and more repeat customers.”
  Replace button:
  “Start free trial”
  With:
  “Start free trial”
  Replace:
  “Start free today”
  With:
  “Start free today”
  FAQ
  Replace:
  “Frequently asked questions”
  With:
  “Frequently asked questions”
  Questions:
  “How does QueueJoy work?”
  “Do customers need to install an app?”
  “Is Telegram required?”
  “What businesses is QueueJoy for?”
  “Can I send announcements and reminders?”
  “Is this only for long queues?”
  “What makes QueueJoy different?”
  Answers:
  “Customers join the queue, connect through Telegram, and get live updates.”
  “No. Customers do not need another app.”
  “Telegram is the channel for updates and messages.”
  “It is best for businesses with waiting time and repeat customers.”
  “Yes. You can send updates, reminders, promotions, and announcements.”
  “It works best where waiting time is real.”
  “It combines queue management with direct customer communication.”
  CONTACT SECTION
  Replace:
  “Talk to a human — we’ll help you get live fast”
  With:
  “Talk to us”
  Replace:
  “Need help getting started? We can help you launch quickly.”
  With:
  “Need help setting up? We can help.”
  Form labels:
  Name
  Business name
  Email
  Phone number
  Message
  Replace placeholder:
  “Tell us about your business”
  With:
  “Tell us about your business”
  Replace submit button:
  “Send message”
  With:
  “Send message”
  FOOTER
  Replace:
  “QueueJoy helps businesses turn waiting time into a better experience and stronger customer retention.”
  With:
  “QueueJoy helps businesses turn waiting time into repeat business.”
  GENERAL RULES
  Replace any long text with short, simple, clear sentences.
  Replace any hard words with easy words.
  Replace any weak marketing copy with direct benefit copy.
  Use more words like:
  simple
  fast
  clear
  better
  live
  direct
  repeat
  customers
  waiting
  retention
  Translate every visible word into English.
  Remove all mixed-language text.
  Make the page feel cleaner, sharper, and easier to read.
  QUEUEJOY LOVERABLE PROMPT — FIX POST-PAYMENT AUTH + UPGRADE POST-PURCHASE PAGE
  There is a critical issue in the current purchase flow that must be fixed.
  Critical problem to fix
  After a user pays through Stripe on the landing page, the system currently does not create a proper Firebase Authentication account for that new customer. Because of this, the app keeps reusing [admin@test.com](mailto:admin@test.com) or another shared identity when new accounts are created. That causes the “change your password” warning to appear repeatedly and creates a bad onboarding experience.
  Required fix
  When Stripe payment succeeds, the system must:
  Create a new unique Firebase Authentication user for the paying customer.
  Never reuse [admin@test.com](mailto:admin@test.com) for customer signups.
  Store the new user’s Firebase Auth uid and connect it to the correct business/tenant/customer record.
  Make sure every paid customer has their own account identity.
  Prevent the password warning from appearing for future users by ensuring the account provisioning flow is correct.
  If needed, use a proper onboarding method such as:
  unique email per customer,
  password setup link,
  magic link,
  or temporary account creation followed by password setup,
  but not a shared admin account.
  The Stripe success flow must be connected to Firebase Auth creation cleanly and reliably.
  The user should land in their own account after payment with the correct tenant, dashboard, and permissions.
  Post-purchase page must also be improved
  After purchase, the customer should not be dropped into a boring or confusing screen. The post-purchase page must be redesigned with much better UI/UX and smoother guidance for a new client.
  Post-purchase page goals
  The page after payment must feel:
  welcoming
  premium
  simple
  clear
  guided
  calm
  trustworthy
  easy for a first-time customer to follow
  Post-purchase page must include
  The old demo video
  This must remain on the page.
  It should be placed prominently so the customer can watch it immediately after payment.
  It should feel like a “start here” learning video.
  A simple but detailed tutorial for new clients
  The tutorial should explain the next steps clearly.
  It must be easy enough for a new customer with no technical background.
  Use step-by-step onboarding cards or a checklist.
  Explain what to do after payment, such as:
  log in
  set up business profile
  configure queue settings
  connect Telegram
  customize branding
  test the queue
  go live
  A smooth onboarding layout
  Use a strong headline.
  Use short supporting copy.
  Add clear visual progress.
  Make the page feel like a guided setup flow, not a random thank-you page.
  A clear call to action
  Example:
  “Watch the setup video”
  “Complete your first setup”
  “Go to your dashboard”
  “Start onboarding”
  UI/UX improvements needed for the post-purchase page
  The post-purchase page should have a much better premium feel, matching the landing page quality.
  Improve:
  background
  card spacing
  button hierarchy
  typography
  section structure
  tutorial readability
  video presentation
  onboarding clarity
  mobile responsiveness
  visual polish
  trust and welcome feeling
  Style direction
  Use the same QueueJoy brand palette:
  Purple as the main color
  Teal for accents
  Yellow for highlights
  Make the page feel modern, smooth, and friendly. Use soft borders, rounded corners, clean shadows, and a clear visual hierarchy. The page should not feel like a generic checkout confirmation page. It should feel like the beginning of a premium product experience.
  Suggested structure for the post-purchase page
  1. Welcome hero
  A warm welcome message that confirms payment succeeded and tells the customer what to do next.
  2. Primary video section
  Show the old demo video prominently.
  3. Quick start tutorial
  Show a simple step-by-step onboarding guide:
  Step 1: Access your account
  Step 2: Set up your business
  Step 3: Customize your queue
  Step 4: Connect notifications
  Step 5: Test and launch
  4. Helpful checklist
  A small checklist to reduce confusion.
  5. Support/contact section
  A simple help area in case the customer gets stuck.
  Important product behavior
  The post-purchase experience must be connected properly to the user account system:
  unique Firebase Auth user per purchase
  no shared admin identity
  no repeated password-reset warning
  correct customer login flow
  correct dashboard access after payment
  correct tenant or business ownership mapping
  Tone of the page
  The page should feel:
  reassuring
  premium
  simple
  helpful
  professional
  non-technical
  onboarding-friendly
  Final request
  Please fix the Firebase Authentication issue in the Stripe post-payment flow, stop using a shared admin account, and redesign the post-purchase page so it includes the old demo video plus a clear, simple, detailed onboarding tutorial for new clients.
  The result should make the paid customer feel welcomed, guided, and ready to start using QueueJoy immediately.
  FINAL IMPLEMENTATION REQUIREMENTS
  Do everything described above. Do not skip any section, component, animation, copy rewrite, translation update, onboarding flow, or UX improvement.
  Landing Page
  Rewrite all copy and all translations
  Replace every headline, subtitle, button, FAQ, feature, testimonial, pricing text, footer text, and microcopy
  Shorten long text that causes clutter or overlap
  Improve Hero, Hooks, CTA, Features, Comparison, Loyalty, Sectors, Testimonials, Pricing, FAQ, Contact, Footer
  Add the new Telegram Retention & Direct Announcement section
  Add the new 4 sectors:
  Clinics & Medical Centers
  Dental Clinics
  Beauty Salons & Aesthetic Clinics
  Busy Restaurants & Cafes
  Add Video 2 (Post Purchase Video) as the primary video
  Add Video 1 (Full Demo Video) via “Want to Learn More?” CTA
  Use QueueJoy positioning:
  Better customer experience
  Less waiting frustration
  Live queue updates
  Telegram notifications
  Direct announcements
  Repeat customers
  Customer retention
  UI / UX
  Upgrade:
  Hero
  Backgrounds
  Borders
  Cards
  Features
  Comparison tables
  Docks
  CTA buttons
  Pricing
  Testimonials
  FAQ
  Footer
  Contact form
  Mobile responsiveness
  Use:
  Dribbble-quality SaaS design
  Purple (#7B3FE4)
  Teal (#2ED6C9)
  Yellow (#FFD447)
  Better whitespace
  Softer shadows
  Larger border radius
  Premium gradients
  Glass effects where appropriate
  Animations
  Implement:
  Scroll reveal
  Fade-in
  Blur-to-sharp
  Auto-highlight important text
  Media transitions
  Parallax effects
  Hover states
  Sticky CTA where appropriate
  Smooth video transitions
  Highlight keywords:
  Live Queue Updates
  Telegram Notifications
  Direct Announcements
  Repeat Customers
  Customer Retention
  Better Customer Experience
  Turn Waiting Time Into Customer Retention
  Post-Purchase Experience
  Fix and redesign completely.
  Authentication Fix
  After Stripe payment:
  Create a unique Firebase Authentication account
  Never reuse [admin@test.com](mailto:admin@test.com)
  Link Firebase Auth UID correctly
  Create correct tenant ownership
  Remove repeated password warning issue
  Fix onboarding account creation flow
  Post-Purchase Page
  Must include:
  Welcome Hero
  Old Demo Video
  Quick Start Tutorial
  Onboarding Checklist
  Dashboard CTA
  Support Section
  Tutorial should guide:
  Login
  Business Setup
  Branding Setup
  Telegram Setup
  Queue Testing
  Go Live
  Security
  Audit and fix:
  Authentication issues
  Authorization issues
  Stripe flow vulnerabilities
  Tenant isolation issues
  Shared account risks
  Security warnings
  Sensitive data exposure
  Any obvious security weaknesses found in the project
  Final Goal
  QueueJoy should feel like a premium modern SaaS product that is not just a queue system, but a customer experience and retention platform. The final result should be cleaner, shorter, more persuasive, more modern, more trustworthy, more conversion-focused, and significantly higher quality than the current version.
  Do not partially implement. Complete all requested UI, UX, copywriting, onboarding, authentication, security, animation, translation, video, loyalty, sector, and post-purchase improvements.