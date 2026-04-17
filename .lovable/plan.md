
Replace the placeholder Emily headshot with the uploaded photo, and fix the 3 outstanding build errors while we're at it.

## Changes

1. **Swap headshot image** — Copy `user-uploads://IMG_5577.jpeg` to `src/assets/emily-russell.jpg` (overwrites the existing placeholder). All components already import from this path (`EmilySection.tsx`, `About.tsx`), so no code changes needed for the swap itself.

2. **Fix build errors** (carried over from previous turn):
   - `src/components/PageHead.tsx` — Add optional `noIndex?: boolean` prop that emits `<meta name="robots" content="noindex,nofollow">` when true. Used by `ThankYou.tsx`.
   - `src/pages/NeighborhoodPage.tsx` line 103 — The `flagship` property only exists on the San Antonio entry, so TS narrows it away on the others. Fix by using `"flagship" in n && n.flagship` or casting the array type to include optional flagship.
   - `src/pages/NotFound.tsx` — Recreate the 404 page (referenced in routing but missing).

3. **QA** — Confirm the new headshot renders crisp on the homepage Emily section and About page (circular crop, gold border already styled).
