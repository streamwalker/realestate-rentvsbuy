
Two tasks. Both are additive — no breaking changes to existing routes or assets.

## 1. Legal pages + dedicated OG images

**New pages** (in `src/pages/`):
- `TrecDisclosures.tsx` — Renders the two TREC documents as branded landing sections with summary text + prominent links to the official TREC PDFs (Consumer Notice, IABS). Same PDFs already linked from `Footer.tsx`. Includes Texas brokerage license info placeholder.
- `PrivacyPolicy.tsx` — Standard privacy policy covering: data collected via `LeadForm`, lead-submission edge function, analytics, cookies, third-party services (Supabase, Calendly), user rights, contact email.
- `TermsOfService.tsx` — Standard ToS: site purpose (informational, not financial advice — matches existing footer disclaimer), no agency relationship until signed agreement, intellectual property, limitation of liability, governing law (Texas), contact.

All three use the existing `PageHead` + `SiteLayout` pattern, with brand-consistent typography (font-serif headings, navy/gold accents) and a simple prose layout.

**Routes** (in `src/App.tsx`):
- `/trec-disclosures`
- `/privacy-policy`
- `/terms-of-service`

**Footer link updates** (`src/components/layout/Footer.tsx`):
- Add a fourth column row or expand existing legal row with internal links to the three new pages alongside the existing TREC PDF links.

**OG images** (1200×630, written to `public/`):
- `og-trec.jpg` — "TREC Disclosures" title, navy bg, gold accent, small Equal Housing Opportunity icon, Emily wordmark.
- `og-privacy.jpg` — "Privacy Policy" title, same brand template.
- `og-terms.jpg` — "Terms of Service" title, same brand template.

Generated via `/tmp/lovable_ai.py --image --model google/gemini-3-pro-image-preview` (text rendering quality matters for legal page titles). Each page passes its OG image into `PageHead` (already supports `image` prop from previous task).

## 2. Landscape iOS splash screens

Generate landscape variants for the same 10 device sizes already shipped in portrait, written to `public/splash/`:

- `iphone-8-landscape.png` (1334×750)
- `iphone-x-landscape.png` (1792×828)
- `iphone-xr-landscape.png` (1792×828)
- `iphone-13-landscape.png` (1334×750) — actually 1792×828 for newer; will use correct per-device dims
- `iphone-12-pro-max-landscape.png` (2778×1284)
- `iphone-15-pro-landscape.png` (2556×1179)
- `iphone-15-pro-max-landscape.png` (2796×1290)
- `ipad-air-landscape.png` (2360×1640)
- `ipad-pro-11-landscape.png` (2388×1668)
- `ipad-pro-12-landscape.png` (2732×2048)

**Generation approach**: Create one wide landscape master at high res (Emily portrait left-of-center, "Rent vs Buy House" wordmark right, navy bg + gold ring), then resize/crop with ImageMagick to each device dimension — same pipeline used for portrait splashes.

**index.html**: Add 10 new `<link rel="apple-touch-startup-image">` tags with `media` queries that include `(orientation: landscape)` for each device, leaving the existing portrait tags untouched.

## Files touched
- `src/pages/TrecDisclosures.tsx` (new)
- `src/pages/PrivacyPolicy.tsx` (new)
- `src/pages/TermsOfService.tsx` (new)
- `src/App.tsx` (3 new routes + imports)
- `src/components/layout/Footer.tsx` (add internal legal links)
- `public/og-trec.jpg`, `public/og-privacy.jpg`, `public/og-terms.jpg` (new)
- `public/splash/*-landscape.png` (10 new files)
- `index.html` (10 new landscape startup-image links)
