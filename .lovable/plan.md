
Looking at the current footer, the TREC Consumer Notice (CN) and IABS PDF links are already present side-by-side in the legal row. So task 1 is mostly already done — I'll just tighten the visual grouping so they read clearly as the two required disclosures, and keep the Alamo City Designs link as a separate "more info" item.

For task 2, the EHO mark already exists as a small unicode glyph (`⌂`) in a bordered box. I'll upgrade it to a proper inline SVG, and add a Realtor® "R" mark SVG next to it. Using inline SVG (rather than generated raster logos) keeps the footer crisp at all sizes, avoids trademark color-shift issues, and doesn't bloat the bundle.

## Changes

**`src/components/layout/Footer.tsx`** — only file touched.

1. **Compliance logo row** (new, sits above the existing legal links row, inside the same bottom border block):
   - Inline SVG **Equal Housing Opportunity** mark (house outline + `=` bars), sized ~28px, with `aria-label="Equal Housing Opportunity"` and visible "Equal Housing Opportunity" text label.
   - Inline SVG **Realtor®** mark (block "R" in a rounded square), sized ~28px, with `aria-label="REALTOR®"` and visible "REALTOR®" text label.
   - TREC regulatory text snippet next to the marks: "Licensed by the Texas Real Estate Commission" (standard compliance phrasing).

2. **Disclosure links row** (refined):
   - Group the two required TREC PDFs together with a small "Required disclosures:" label so it's visually obvious they're the mandated pair:
     - **TREC Consumer Protection Notice (CN 1-3) [PDF]** — already linked, just relabel from "TREC Consumer Notice (PDF)" to the official name.
     - **Information About Brokerage Services (IABS 1-0) [PDF]** — already linked, relabel from "IABS (PDF)" to the official name.
   - Keep "TREC Info (Alamo City Designs)" as a separate supplementary link.
   - Keep existing internal links to `/trec-disclosures`, `/privacy-policy`, `/terms-of-service`.

3. **Remove** the old inline `⌂` glyph EHO marker (replaced by the proper SVG above).

## Notes on logo usage
- Using inline SVG approximations (not the official downloadable HUD/NAR raster files) keeps everything in-repo and avoids licensing/hosting concerns. The marks are universally recognized symbols; the visible text labels ("Equal Housing Opportunity", "REALTOR®") are what actually satisfy the display requirement. If you want the *exact* official artwork, that's a follow-up where I'd download from HUD.gov and NAR and drop them in `public/`.

## Files touched
- `src/components/layout/Footer.tsx`
