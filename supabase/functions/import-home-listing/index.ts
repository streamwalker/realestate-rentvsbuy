import "./importer.js";
import { handle } from "./server.mjs";

// Public calculator: no accounts, database access or service-role key required.
// Browser callers are limited to the actual site's production origins.
const allowedOrigins = new Set([
  "https://rentvsbuyhouse.com", "https://www.rentvsbuyhouse.com",
  "https://realestate-rentvsbuy.lovable.app",
]);
Deno.serve(async (request: Request) => {
  const origin = request.headers.get("origin") || "";
  const headers = {
    "Access-Control-Allow-Origin": allowedOrigins.has(origin) ? origin : "https://www.rentvsbuyhouse.com",
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Access-Control-Allow-Headers": "content-type, apikey, authorization, x-client-info",
    "Vary": "Origin", "Cache-Control": "no-store",
  };
  if (!allowedOrigins.has(origin)) return new Response(JSON.stringify({error:"This origin is not allowed."}), {status:403,headers:{...headers,"Content-Type":"application/json"}});
  if (request.method === "OPTIONS") return new Response(null,{status:204,headers});
  // Reuse bounded requests, source allowlists, robots rules and redirect validation.
  // One conservative isolate-wide import budget; spoofed client IPs cannot evade it.
  const forwarded = new Headers(request.headers);
  forwarded.set("cf-connecting-ip", "public-calculator");
  const internalRequest = new Request(origin + "/api/listing", {
    method:request.method, headers:forwarded,
    ...(!["GET","HEAD"].includes(request.method) ? {body:request.body,duplex:"half"} : {}),
  });
  const response = await handle(internalRequest, {});
  const merged = new Headers(response.headers);
  for (const [key,value] of Object.entries(headers)) merged.set(key,value);
  return new Response(response.body,{status:response.status,headers:merged});
});
