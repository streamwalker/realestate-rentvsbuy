# Resale vs. New integration

Destination: https://www.rentvsbuyhouse.com/resale-vs-new/ (React Router accepts both trailing slash forms). IONOS domain/DNS changes are not needed.

The main navigation, footer, route and sitemap include this tool. A same-origin iframe isolates the tested calculator's CSS and scripts from the host React app. Height messages are accepted only from that frame and exact origin. Existing host photo reused. The comparison is downloaded as JSON on explicit Save; no account or server persistence is added. Print/PDF runs inside the calculator frame.

## Publication

1. Deploy `supabase/functions/import-home-listing` to the existing configured Supabase project using the authorized Lovable/Supabase deployment flow. It must use the checked-in `verify_jwt = false` configuration: this is an intentionally public calculator endpoint with no database or privileged credentials.
2. Build and publish the frontend in the existing Lovable project after GitHub sync. GitHub sync by itself does not establish that the published site or backend changed.
3. Verify /resale-vs-new/ directly and via desktop/mobile navigation. Verify save/open, print/PDF, year/energy inputs, a supported listing with review before apply, blocked-source fallback and CORS errors.

The existing private Sites copy is independent; do not expose its owner authentication or replace the existing website with it.

## Import boundary and limitations

The frontend calls the configured project's `/functions/v1/import-home-listing`. The endpoint permits production www/apex origins and the project's existing lovable.app origin. Unknown origins and cross-project previews fail closed. No service key, storage, database calls or user identity is needed. Approved source HTTPS hosts and redirect targets only; robots rules, 12-second fetch budget, bounded request/response bytes, no remote script execution and explicit user review are preserved. A conservative in-memory global budget of 10 imports/minute/isolate limits abuse; this is not a distributed WAF or a guaranteed global limit. CORS is not authentication. Production scaling/rate-limit observability remains unassessed. Browser suggestions are not loan offers or warranty guarantees.

## Review boundary

Technical release gate: not_assessed for the combined production environment until backend deployment and live verification. Assurance readiness: not_assessed. External audit/certification: none. No organizational controls or compliance claims are inferred from this integration. Existing homepage, lead handling, database and auth are outside the change. Rollback: revert the integration commit and republish the prior frontend; the isolated unused edge function can remain disabled through the provider.
