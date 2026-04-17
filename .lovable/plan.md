
# rentvsbuyhouse.com — Full Site Build

## Foundation
- **Design system**: Navy (#0B1D3A), Gold (#C9A84C), Cream (#FAF7F0), muted red/green accents. Playfair Display headlines + DM Sans body. Dark mode support. All tokens in `index.css` + `tailwind.config.ts`.
- **Layout shell**: Sticky header with nav (Calculator, Loans, Neighborhoods, Resources, About, Contact), mobile hamburger, sticky "📞 Talk to Emily" mobile bottom bar, full footer with TREC notices, Equal Housing logo, neighborhoods list, disclaimers.
- **SEO infrastructure**: react-helmet-async for per-page title/meta/OG/JSON-LD. Auto-generated `sitemap.xml` and `robots.txt`. Prerendering via `vite-plugin-prerender` (or `react-snap`) at build time so every route ships fully-rendered HTML for crawlers and AI engines. Speakable + FAQPage + RealEstateAgent + LocalBusiness + BreadcrumbList + HowTo schemas.
- **Backend (Lovable Cloud)**: `leads` table (name, email, phone, persona, budget, message, source_page, created_at) with RLS. Edge function `submit-lead` validates with zod, inserts row, sends notification email to Emily via Lovable Emails. Thank-you page after submit.

## The Calculator (centerpiece, reusable component)
Side-by-side Renter (red) and Buyer (green/navy) panels with live recalculation:
- **Renter**: rent, utilities, pets (counter × $30), insurance, parking, valet trash, pest control, move-in cost block, early lease-break scenarios (buyout vs full obligation).
- **Buyer**: Loan Type dropdown (FHA/Conventional/VA/USDA/DPA) with conditional logic — VA reveals status → disability tier → 100% auto-zeros tax rate (saves/restores prior value) → 65+ age input → VA Property Tax Exemption breakdown card with full Texas tier reference. Offer price, rate slider, down payment % ↔ $ bidirectional, tax rate, insurance, HOA, utilities, term buttons (5/15/20/30).
- **Outputs**: Monthly totals, Year-1 equity, total interest, donut breakdown (Recharts), stacked principal-vs-interest bar over loan term.
- **Verdict banner**: Rent Y1 vs Buy Y1 vs Wealth Advantage with proportional bars, scroll-triggered animation.
- **Cash-flow timeline**: inline month dropdown in heading drives 4 dynamic cards with year-wraparound logic.

## Pages

**Homepage `/`** — Hero with animated stat counters + dual CTA, Emily intro banner, full calculator, verdict, cash-flow timeline, $0 Down Programs grid (6 cards with official outbound links), 12-card value-prop grid, FAQ accordion (8 Qs with FAQPage schema), full Emily section (photo, bio, specialty tags, contact form with persona + budget dropdowns).

**Loan guides** — `/loans/fha`, `/loans/va` (with full Texas VA tax exemption deep-dive), `/loans/usda`, `/loans/conventional`, `/loans/dpa`. Each: overview, qualification, pros/cons, calculator pre-configured for that loan type, comparison table, FAQ with schema, Emily CTA.

**Neighborhood pages** — `/san-antonio` (flagship) plus `/san-antonio/{stone-oak, alamo-ranch, medical-center, downtown-pearl, helotes, converse, schertz, cibolo, new-braunfels, boerne}`. Driven by a single template + per-area data file (median price, avg rent, school district, amenities, local DPA links, calculator with local defaults).

**Resources** — `/first-time-buyer-guide`, `/rent-vs-buy-calculator` (standalone embeddable), `/cost-of-renting`, `/new-construction`, `/military-homebuying`, `/blog` (index + article template, scaffolded with 2–3 seed posts).

**About/Contact** — `/about` (Emily full bio, credentials, philosophy), `/contact` (form + phone + email + embedded Google Map placeholder + Calendly placeholder slot).

## Conversion layer
Emily CTAs at: hero banner, post-calculator, post-programs, sticky mobile bar, end-of-page section. Exit-intent modal on desktop. All forms persist to `leads` table + email Emily. Trust strip (Google Reviews placeholder, testimonials carousel, "Updated April 2026" data badges, TREC notice).

## Performance & quality
- WebP images with lazy loading, descriptive alt text
- Code-split per route, prefetch on hover
- Scroll-triggered reveals (Intersection Observer), counter animations, chart-on-viewport animations — all subtle
- WCAG 2.1 AA: focus rings, aria labels on calculator inputs, semantic landmarks, reduced-motion support
- Analytics scaffolded with placeholder GA4 ID (you can swap in later)

## Placeholders you can swap later
- Emily's headshot (styled circular gold-bordered placeholder)
- Emily's phone/email (clearly marked TODO constants in one config file)
- Calendly URL, GA4 ID, Google Reviews widget, Maps embed key

## Build order
1. Design system + layout shell + SEO/prerender setup
2. Lovable Cloud: leads table + submit-lead edge function + email wiring
3. Calculator component (the MVP engine)
4. Homepage assembled
5. Loan guide pages (VA first)
6. Neighborhood template + all 11 neighborhood pages
7. Resource pages + blog scaffold
8. About + Contact + thank-you page
9. Sitemap, robots, prerender build, final QA pass
