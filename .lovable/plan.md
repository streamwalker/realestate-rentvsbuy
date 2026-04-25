
Execute the three technical fixes from the diagnostic. None require credentials from you.

## 1. Fix the broken production build (`@tanstack/query-core` resolution)

**Problem**: `vite.config.ts` lists `@tanstack/query-core` in `resolve.dedupe`, but it isn't in `package.json`. Bun's hoisting makes `dev` work, but `vite build` fails because Rollup can't resolve a package that isn't declared.

**Fix**: Add `@tanstack/query-core` as an explicit dependency, matching the version transitively pulled in by `@tanstack/react-query` (^5.83.0 → query-core ^5.83.x).

- Run `bun add @tanstack/query-core` so it lands in `package.json` + lockfile.
- Run `bun run build` afterward to confirm the build now completes cleanly.

No code changes needed — this is purely a dependency declaration fix.

## 2. Lock down the `public.leads` table RLS

**Problem**: The `leads` table has a permissive `INSERT` policy for `anon` + `authenticated` (`with check: true`). The frontend currently submits via the `submit-lead` edge function (which uses the service role and bypasses RLS), so the public INSERT policy is dead weight — but it leaves the table writable directly via the anon key, which is a spam/abuse vector.

**Fix** (via migration):
- Drop policy `"Anyone can submit leads"` on `public.leads`.
- Keep RLS enabled. With no policies and no service-role calls, `anon`/`authenticated` cannot read, write, update, or delete. Only the edge function (service role) can insert. This is what we want.
- No SELECT/UPDATE/DELETE policies need to be added — Emily reviews leads outside the app for now.

After the migration, I'll smoke-test by:
- Calling `submit-lead` via `curl_edge_functions` to confirm the function still inserts successfully.
- Attempting a direct anon `insert` via the Supabase client to confirm it now fails.

## 3. Inline CORS headers in `submit-lead` edge function

**Problem**: Line 2 imports `corsHeaders` from `npm:@supabase/supabase-js@2.95.0/cors` — an unofficial subpath that isn't a guaranteed export and can break on SDK updates.

**Fix**: Replace the import with an inlined `corsHeaders` constant at the top of `supabase/functions/submit-lead/index.ts`:

```ts
const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};
```

Remove the `npm:@supabase/supabase-js@2.95.0/cors` import. Everything else (handler, validation, insert) stays identical. Redeploy and re-test with `curl_edge_functions`.

## Files touched
- `package.json` + `bun.lock` (via `bun add`)
- `supabase/functions/submit-lead/index.ts` (inline CORS)
- New migration: drop the permissive INSERT policy on `public.leads`

## Out of scope (deferred — needs your input)
- Calendly URL, GA4 ID, Emily's headshot, Google Maps key, phone/email verification
- Wiring transactional email notifications to Emily on new leads (needs email domain setup)
