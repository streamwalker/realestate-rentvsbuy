
Two related asset-generation tasks. Both source from Emily's existing headshot (`src/assets/emily-russell.jpg`).

## 1. Dedicated OG image for Calculator page

- Generate `public/og-calculator.jpg` (1200×630) using AI image gen (Nano Banana Pro for quality), composing Emily's headshot on the left + "Rent vs. Buy in San Antonio" headline on the right, in the brand palette (navy #0B1D3A bg, gold #C9A84C accent, cream text).
- Update `src/pages/CalculatorPage.tsx` to pass `image="https://rentvsbuyhouse.com/og-calculator.jpg"` to `PageHead`.
- Plumb an `image` prop through `PageHead.tsx` → `SEO.tsx` (SEO already accepts `image`, PageHead currently doesn't forward one — small addition).

## 2. Mobile home-screen icons

Generate from Emily's headshot, write to `public/`:
- `apple-touch-icon.png` (180×180) — square, no transparency (iOS requirement)
- `icon-192.png` (192×192)
- `icon-512.png` (512×512)
- `site.webmanifest` — name, short_name, theme_color (#0B1D3A), background_color, icons array

Update `index.html` `<head>`:
```html
<link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png">
<link rel="manifest" href="/site.webmanifest">
```

Approach for icons: use AI image gen to crop/recompose Emily's headshot into clean square thumbnails with the gold-ring branding intact, then resize to the three required dimensions with ImageMagick. Apple icon needs a solid background (no alpha).

## Technical notes
- Use the ai-gateway skill (`/tmp/lovable_ai.py --image`) with `google/gemini-3-pro-image-preview` for the OG composition (text rendering quality matters).
- For icons, generate one high-res square master then downscale with `nix run nixpkgs#imagemagick` to the three sizes.
- All files land in `public/` so they're served at root.

## Files touched
- `public/og-calculator.jpg` (new)
- `public/apple-touch-icon.png` (new)
- `public/icon-192.png` (new)
- `public/icon-512.png` (new)
- `public/site.webmanifest` (new)
- `index.html` (add icon + manifest links)
- `src/components/PageHead.tsx` (forward `image` prop)
- `src/pages/CalculatorPage.tsx` (pass OG image)
