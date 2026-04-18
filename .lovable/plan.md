
Replace the broken IABS PDF link with the Alamo City Designs TREC info page in the two places it's referenced:

1. **`src/components/layout/Footer.tsx`** — the "Information About Brokerage Services (IABS 1-0) [PDF]" link in the disclosures row currently points to `https://www.trec.texas.gov/sites/default/files/pdf-forms/IABS%201-0.pdf`. Update its `href` to `https://alamocitydesigns.com/trec`. Keep the visible label as "Information About Brokerage Services (IABS 1-0)" (drop the "[PDF]" suffix since the destination is now an HTML page, not a PDF).

2. **`src/pages/TrecDisclosures.tsx`** — the `TREC_IABS_URL` constant at the top of the file points to the same broken PDF. Update it to `https://alamocitydesigns.com/trec`. The button label "View Information About Brokerage Services (PDF) →" should be changed to "View Information About Brokerage Services →" to match.

The separate "TREC Info (Alamo City Designs)" link already in the footer becomes redundant once IABS points to the same URL — I'll remove that duplicate footer link to keep the disclosures row clean.

No other files reference this URL.

## Files touched
- `src/components/layout/Footer.tsx`
- `src/pages/TrecDisclosures.tsx`
