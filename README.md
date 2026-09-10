# Rent Vs. Buy Extreme

# LOVABLE.DEV BUILD PROMPT — rentvsbuyhouse.com

## Complete Site Build & Optimization Specification

---

## PROJECT OVERVIEW

Build a full-featured, SEO/AEO-dominant real estate education and lead-generation website at **rentvsbuyhouse.com**. This site must compete with the informational and educational content layers of Zillow (263M monthly visits), Realtor.com (99M), Redfin (93M), and NerdWallet's mortgage content — NOT by listing homes, but by owning the **"should I rent or buy?"** decision funnel nationwide, with a hyper-local focus on **San Antonio, Texas** as the flagship market.

The site's primary conversion goal is driving consultations with **Emily Russell**, a San Antonio real estate professional who specializes in demystifying the homebuying process for clients at every price point — from $180K starter homes to multi-million dollar luxury properties.

**Tech stack preferences:** React (Next.js if possible for SSR/SEO), Tailwind CSS, responsive mobile-first design. The site must be fast (Core Web Vitals optimized), accessible (WCAG 2.1 AA), and designed for both human visitors AND AI answer engines (ChatGPT, Perplexity, Google AI Overview, Siri, Alexa).

---

## BRAND IDENTITY & DESIGN SYSTEM

### Visual Identity

- **Primary palette:** Navy (#0B1D3A), Gold (#C9A84C), Cream (#FAF7F0), White

- **Accent colors:** Muted Red (#A83232) for "renting" negative indicators, Muted Green (#2D7A4F) for "buying" positive indicators

- **Typography:** Playfair Display for headlines (serif, editorial authority), DM Sans for body text (clean, modern readability)

- **Tone:** Authoritative but approachable. Think "your smartest friend who happens to be a real estate expert." Not salesy. Educational-first, conversion-second.

- **Photography style:** Warm, authentic — real San Antonio homes and neighborhoods. Avoid generic stock photos of smiling couples holding keys.

### Design Principles

- Every page should feel like a premium editorial experience — closer to Bloomberg or The Economist's interactive features than a typical real estate agent site

- Interactive calculators and tools are the primary engagement drivers — NOT static blog posts

- Mobile-first: 70%+ of real estate searches happen on mobile devices

- Dark mode support

- Micro-animations on scroll (subtle, not distracting) — staggered reveals, counter animations on statistics, chart animations on viewport entry

- NO generic AI design patterns (no purple gradients, no Inter font, no cookie-cutter card layouts)

---

## SITE ARCHITECTURE & PAGES

### 1. HOMEPAGE (`/`)

**Purpose:** Capture high-intent "rent vs buy" searchers and establish authority.

**Hero Section:**

- Bold headline: "Stop Paying Someone Else's Mortgage"

- Subheadline: "The data-driven case for homeownership — with interactive calculators, loan program guides, and expert guidance from Emily Russell."

- Three animated stat counters: "$0 Cash to Close" / "~60 Days Before 1st Payment" / "$3K+ Year-1 Savings vs. Rent"

- Primary CTA: "Run Your Numbers →" (scrolls to calculator)

- Secondary CTA: "Talk to Emily →" (scrolls to contact)

- Emily Russell photo + brief intro banner immediately below hero

**Interactive Buy vs. Rent Calculator** (the site's centerpiece):

Build a side-by-side, real-time calculator with two panels:

**RENTER PANEL (red-themed):**

- Monthly rent input (default: $1,495)

- Monthly utilities input with "Use average" helper button ($175)

- Pet counter (+/− buttons) with per-pet monthly rent ($30/pet/mo)

- Renter's insurance ($15/mo)

- Parking fee ($40/mo)

- Valet trash ($25/mo mandatory)

- Pest control ($8/mo mandatory)

- Move-in costs section: First month's rent, last month's rent, security deposit, admin fee ($175), application fee ($75), pet deposit per pet ($300), non-refundable pet fee per pet ($300)

- TOTAL DISPLAY: Monthly obligation (red) + Year-1 total + "Equity built: $0" in red

- Early Lease Break Calculator below: inputs for months remaining + reletting fee, with two scenario cards (Buyout Clause: 2 months rent + relet fee | Full Obligation: remaining months × rent)

**BUYER PANEL (green/navy-themed, styled after EquiForge.AI):**

- **Loan Type dropdown** (gold-highlighted, prominent):

  - FHA (3.5% Down) — auto-sets down payment to 3.5%

  - Conventional — reveals sub-buttons for 3% / 5% / 10% / 20%

  - VA Loan — sets down to 0%, reveals VA Details sub-section

  - USDA — sets down to 0%

  - Down Payment Assistance — sets down to 0%, auto-increases interest rate by +1% above current rate

- **VA Loan Details** (conditional, only shows when VA selected):

  - VA Status dropdown: Active Duty / Separated-Retired

  - When Separated/Retired selected → reveals:

    - VA Disability Rating dropdown: No Rating / 10%–29% / 30%–49% / 50%–69% / 70%–99% / 100%

    - When 100% selected → Annual Tax Rate auto-sets to 0% (saves previous rate, restores when changed back)

    - Veteran Age input (for 65+ bonus exemption)

  - VA Property Tax Exemption Breakdown panel (dark navy card):

    - Home Value → Base Exemption (dynamic by tier) → Taxable Value

    - Annual savings calculated

    - Full reference list of Texas VA exemption tiers

    - Special provisions for 65+ veterans

    - Warning about applying at county assessor's office

- Offer Price input (default: $201,999)

- Interest Rate slider + number input (default: 4.5%)

- Down Payment % slider + $ input (bidirectionally linked)

- Annual Tax Rate slider + input (default: 1.8%)

- Monthly Insurance input ($150)

- Monthly HOA input ($51)

- Monthly Utilities input ($275, with "Use average" helper)

- Loan Term buttons: 5yr / 15yr / 20yr / 30yr

- TOTAL DISPLAY: Monthly obligation (green) + P&I/Tax/Ins/HOA/Util breakdown + Year-1 equity built + Total interest over loan life

- Donut chart: Monthly payment breakdown (Principal/Interest/Taxes/Insurance/HOA/Utilities)

- Stacked bar chart: Principal vs. Interest year-by-year over full loan term

**Verdict Section** (dark navy banner below both panels):

- Side-by-side-by-side: Rent Year-1 | Buy Year-1 | Wealth Advantage

- Visual bar comparison showing monthly obligations proportionally

- Animated on scroll

**Cash-Flow Timeline** (with month selector dropdown built into the heading):

- User picks closing month from inline dropdown in title: "The Cash-Flow Timeline of a [June ▾] Close"

- Timeline dynamically updates all 4 cards:

  - Card 1: "Closing Day — [selected month]" → $0 out of pocket

  - Card 2: "[next month] — No Payment Due" → still $0

  - Card 3: "[month+2] 1 — First Payment" → mortgage begins

  - Card 4: "Month 12 & Beyond" → equity built

- Handles year wraparound (November → December → January)

**$0 Down Programs Section:**

6 program cards, each with hyperlinks to official government/builder sites:

1. USDA Rural Development → links to rd.usda.gov + USDA eligibility map

2. San Antonio HIP 80 → links to sa.gov homeownership programs

3. TSAHC & TDHCA → links to tsahc.org and tdhca.texas.gov

4. Builder Closing Cost Coverage → links to lennar.com and drhorton.com San Antonio pages

5. VA Loan → links to va.gov housing assistance + jbsa.mil + Texas comptroller tax exemptions

6. FHA + DPA Stack → links to hud.gov FHA programs

Emily Russell CTA banner after this section: "Which Program Is Right for You?"

**Value Propositions Grid:**

12 cards in a 2-column grid covering: Locked-In Housing Cost, New Construction Warranty, Energy Efficiency, Homestead Exemption, Forced Savings, Freedom & Customization, Space & Privacy, School Choice, Generational Wealth, Market Leverage, Stability & Mental Health, 2026 Buyer's Market

**FAQ Section** (critical for AEO):

8 expandable accordion questions with schema.org FAQPage markup:

1. Is it cheaper to rent or buy in San Antonio in 2026?

2. What is the minimum down payment to buy a home in San Antonio?

3. What is the San Antonio HIP 80 program?

4. Can military veterans buy a home in Texas with no down payment?

5. What is the Texas VA property tax exemption?

6. Who is Emily Russell and how can she help me buy a home?

7. How much are typical move-in costs for a San Antonio apartment?

8. What happens if I break my apartment lease early in Texas?

**Emily Russell Section** (full-width dark navy):

- Large circular headshot photo

- "Meet Your Realtor" subheading

- "Emily Russell — Your Guide Through Every Price Point"

- Bio paragraph emphasizing: demystifying homebuying, every price point ($180K–$5M+), zero-pressure guidance

- Specialty tags: First-Time Buyers, VA Loans, New Construction, Luxury Estates, Investment Properties, Relocations

- Two CTA buttons: 📞 Call Emily Now / ✉ Send a Message

- Contact form alternative with name, email, phone, message, and "What's your budget range?" dropdown

---

### 2. CITY MARKET PAGES (`/san-antonio`, `/san-antonio/stone-oak`, etc.)

**Purpose:** Capture "[city] rent vs buy" and "[neighborhood] homes" searches.

Each city/neighborhood page should include:

- Current median home price (updateable)

- Current average rent

- Cost of living comparison

- Interactive calculator pre-filled with local defaults

- Local school district information

- Neighborhood descriptions and amenities

- Links to local DPA programs

- Emily CTA specific to that area

**Priority neighborhoods to build pages for:**

San Antonio (main), Stone Oak, Alamo Ranch, Medical Center, Downtown/Pearl, Helotes, Converse, Schertz, Cibolo, New Braunfels, Boerne

---

### 3. LOAN PROGRAM GUIDE PAGES

**Purpose:** Capture "FHA loan Texas," "VA loan San Antonio," "USDA eligible areas Texas" searches.

Create dedicated deep-dive pages for:

- `/loans/fha` — FHA Loan Guide for Texas Homebuyers

- `/loans/va` — VA Loan Guide: San Antonio & Texas (include full property tax exemption breakdown)

- `/loans/usda` — USDA Loan Eligibility in San Antonio & Surrounding Areas

- `/loans/conventional` — Conventional Loan Options: 3% to 20% Down

- `/loans/dpa` — Down Payment Assistance Programs in San Antonio (HIP 80, TSAHC, TDHCA, Homeownership Across Texas)

Each page should include:

- What it is, who qualifies, pros/cons

- Interactive calculator pre-configured for that loan type

- FAQ section with schema markup

- Comparison table vs. other loan types

- Emily CTA: "Let me walk you through the [loan type] process"

---

### 4. RESOURCES & EDUCATION PAGES

- `/first-time-buyer-guide` — Complete first-time homebuyer guide for San Antonio

- `/rent-vs-buy-calculator` — Standalone calculator page (for direct linking/embedding)

- `/cost-of-renting` — Deep dive into true cost of renting in San Antonio (all the hidden fees)

- `/new-construction` — Guide to buying new construction in San Antonio (Lennar, D.R. Horton, builder incentives)

- `/military-homebuying` — Guide specifically for JBSA service members and veterans

- `/blog` — SEO content hub for ongoing articles

---

### 5. ABOUT & CONTACT

- `/about` — Emily Russell's full bio, credentials, service area, philosophy

- `/contact` — Contact form, phone, email, office location, embedded Google Map, Calendly integration for scheduling

---

## SEO & AEO OPTIMIZATION

### Technical SEO

- Server-side rendering (SSR) or static site generation (SSG) for all content pages

- Automatic sitemap.xml generation

- robots.txt configuration

- Canonical URLs on every page

- Open Graph + Twitter Card meta tags on every page

- Structured data (JSON-LD) on every page:

  - `WebSite` schema on homepage

  - `FAQPage` schema on every page with FAQ sections

  - `RealEstateAgent` schema (Emily Russell) site-wide

  - `HowTo` schema on guide pages

  - `BreadcrumbList` schema on all interior pages

  - `Article` schema on blog posts

  - `LocalBusiness` schema with service area

- Image optimization: WebP format, lazy loading, descriptive alt text on every image

- Core Web Vitals targets: LCP < 2.5s, FID < 100ms, CLS < 0.1

- Mobile-first responsive design

- Internal linking strategy connecting all pages

### AEO (Answer Engine Optimization)

This is critical. The site must be structured so that AI systems (ChatGPT with browsing, Perplexity, Google AI Overview, Siri, Alexa) can extract clean, authoritative answers.

- Every FAQ answer must be self-contained — it should make sense pulled out of context

- Use clear question-answer format that AI can parse

- Include specific numbers, dollar amounts, and percentages in answers (AI engines prefer concrete data over vague language)

- Structure content with clear H2/H3 hierarchy that maps to natural language questions

- Use "People Also Ask" style headings throughout content pages

- Include comparison tables that AI can parse (Rent vs. Buy, FHA vs. VA vs. USDA)

- Add speakable schema markup for voice assistant optimization

- Ensure every page has a clear, concise meta description that could serve as an AI-generated snippet

### Target Keywords (prioritized):

**Tier 1 (homepage + calculator):**

- rent vs buy San Antonio

- should I rent or buy in San Antonio

- San Antonio rent vs buy calculator

- buy vs rent calculator Texas

- is it cheaper to rent or buy in San Antonio

**Tier 2 (loan program pages):**

- FHA loan San Antonio / FHA loan Texas

- VA loan San Antonio / VA home loan Texas

- USDA loan San Antonio / USDA eligible areas Texas

- down payment assistance San Antonio / HIP 80 program

- Texas VA property tax exemption

- zero down payment homes San Antonio

**Tier 3 (education/guide pages):**

- first time home buyer San Antonio

- new construction homes San Antonio

- cost of renting in San Antonio

- San Antonio housing market 2026

- Emily Russell realtor San Antonio

- military homebuying San Antonio / JBSA housing

**Tier 4 (neighborhood pages):**

- homes for sale Stone Oak / rent vs buy Stone Oak

- Alamo Ranch new construction

- [neighborhood] San Antonio housing market

---

## CONVERSION OPTIMIZATION

### Emily Russell CTAs (strategically placed throughout site):

1. **Hero banner** — immediately below every page hero

2. **Mid-content** — after calculator results or after a major content section

3. **Post-programs** — after loan program/DPA information

4. **Sticky mobile CTA** — fixed bottom bar on mobile: "📞 Talk to Emily" that stays visible while scrolling

5. **Exit-intent popup** (desktop only) — "Before you go — want Emily to run your numbers for free?"

6. **End-of-page** — full dedicated Emily section with photo, bio, specialties, and contact form

### Lead Capture:

- Contact form on every page (sidebar or inline)

- Fields: Name, Email, Phone (optional), "What describes you best?" dropdown (First-Time Buyer / Moving to San Antonio / Military/Veteran / Upgrading / Investor / Just Exploring), Budget Range dropdown, Message

- Form submissions should trigger email notification to Emily

- Thank you page with Calendly embed for immediate scheduling

- Optional: SMS/text opt-in checkbox

### Trust Signals:

- Google Reviews widget

- Client testimonials carousel

- "As Featured In" / media logos if available

- Real-time market data badges ("Updated April 2026")

- Certifications/licenses display

- TREC (Texas Real Estate Commission) information notice in footer

---

## FOOTER

Every page footer should include:

- Emily Russell contact info (phone, email)

- Quick links to all major sections

- San Antonio neighborhoods served list

- Social media links

- TREC Information About Brokerage Services link (required by Texas law)

- TREC Consumer Protection Notice link

- Equal Housing Opportunity logo

- Privacy Policy and Terms of Service links

- "© 2026 Emily Russell | rentvsbuyhouse.com" copyright

- Disclaimer: "This website is for informational purposes only and does not constitute financial advice."

---

## PERFORMANCE & ANALYTICS

- Google Analytics 4 integration

- Google Search Console verification

- Microsoft Clarity or Hotjar for heatmaps/session recording

- Facebook Pixel (if Emily runs social ads)

- Conversion tracking on: form submissions, phone click-to-calls, email clicks, calculator interactions, CTA clicks

- Custom events: calculator completed, loan type changed, FAQ expanded, time on calculator > 60 seconds

---

## COMPETITIVE DIFFERENTIATION

What makes rentvsbuyhouse.com different from Zillow, Redfin, NerdWallet:

1. **Interactive, not static** — The calculator is the product, not a blog post with a generic embedded widget

2. **Loan-program-aware** — No other rent-vs-buy calculator dynamically adjusts for FHA/VA/USDA/DPA with VA disability tiers and Texas tax exemptions built in

3. **Conversion to a real human** — Every path leads to Emily Russell, not a lead form that sells your info to 5 random agents

4. **Hyper-local authority** — San Antonio-specific data, neighborhoods, school districts, builder names, and DPA programs that national sites can't match

5. **AEO-first architecture** — Structured to be the answer that AI engines cite when someone asks "should I rent or buy in San Antonio?"

6. **Military-focused** — No major real estate site has a deep VA loan + Texas VA tax exemption calculator. JBSA has 80,000+ personnel. This is a massive underserved audience.

---

## LAUNCH PRIORITIES (in order):

1. Homepage with full interactive calculator (this is the MVP — it alone should drive traffic)

2. Emily Russell contact/about section

3. FAQ section with full schema markup

4. Loan program guide pages (VA first — highest differentiation)

5. San Antonio neighborhood pages

6. Blog infrastructure for ongoing content

7. First-time buyer guide

8. Military homebuying guide

---

## IMPORTANT NOTES FOR LOVABLE:

- The calculator must be fully client-side JavaScript — no server calls needed for calculations

- All charts should use Chart.js or Recharts

- The site must work perfectly without JavaScript for basic content (progressive enhancement)

- Every page must have a unique, keyword-optimized title tag and meta description

- Do NOT use placeholder "Lorem ipsum" text anywhere — all content should be real, substantive, and SEO-optimized

- Emily Russell's headshot photo will be provided separately — use circular crop with gold border styling

- The domain is rentvsbuyhouse.com — all canonical URLs, schema markup, and internal links should reference this domain

- Color scheme, typography, and design tokens should be configured as a global theme that can be updated in one place

This project was built with [Lovable](https://lovable.dev).

**Live app**: https://realestate-rentvsbuy.lovable.app

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/bef8d54c-e92a-4c5b-ac0d-c5d4f62863e1).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
