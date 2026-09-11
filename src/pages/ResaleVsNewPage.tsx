import { useEffect, useRef, useState } from "react";
import { PageHead } from "@/components/PageHead";
import "./resale-comparison-bar.css";

type Totals = { piti: number; cash: number; monthly: number };
const dollars = new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 });
function validTotals(value: unknown): value is Totals[] {
  return Array.isArray(value) && value.length === 2 && value.every(v => v &&
    [v.piti, v.cash, v.monthly].every(n => typeof n === "number" && Number.isFinite(n) && n >= 0));
}
export default function ResaleVsNewPage() {
  const frame = useRef<HTMLIFrameElement>(null);
  const [height, setHeight] = useState(2400);
  const [totals, setTotals] = useState<Totals[] | null>(null);
  const [visible, setVisible] = useState(false);
  const [headerHeight, setHeaderHeight] = useState(64);
  useEffect(() => {
    function receive(event: MessageEvent) {
      if (event.origin !== window.location.origin || event.source !== frame.current?.contentWindow) return;
      if (event.data?.type === "homecompare:totals") {
        setTotals(validTotals(event.data.totals) ? event.data.totals : null);
      } else if (event.data?.type === "homecompare:height") {
        const next = event.data.height;
        if (typeof next === "number" && Number.isFinite(next) && next >= 500 && next <= 60000) setHeight(Math.ceil(next));
      }
    }
    const onScroll = () => setVisible(window.scrollY > 96);
    const header = document.querySelector("header");
    const measure = () => setHeaderHeight(header?.getBoundingClientRect().height ?? 64);
    const observer = new ResizeObserver(measure);
    if (header) observer.observe(header);
    measure(); onScroll();
    window.addEventListener("message", receive);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      observer.disconnect();
      window.removeEventListener("message", receive);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);
  return <>
    <PageHead title="Resale vs. New Construction — Compare Home Costs"
      description="Compare resale and new construction side by side: cash to move in, monthly payments, financing, warranties and energy upgrades. Save or print your comparison."
      path="/resale-vs-new"
      breadcrumbs={[{name:"Home",path:"/"},{name:"Resale vs. New",path:"/resale-vs-new"}]} />
    {visible && <aside className="comparison-glass" style={{ top: headerHeight }} aria-label="Live home comparison totals">
      <div className="comparison-glass-grid">
        {["Resale home", "New construction"].map((label, i) => <section key={label} className="comparison-glass-side" aria-label={label}>
          <h2 className="comparison-led">{label}</h2>
          <dl className="comparison-glass-totals">
            <div><dt title="Monthly principal, interest, property taxes and homeowners insurance. Mortgage insurance and other costs are included in total ownership.">PITI / mo</dt><dd>{totals ? dollars.format(totals[i].piti) : "—"}</dd></div>
            <div><dt>Cash to move in</dt><dd>{totals ? dollars.format(totals[i].cash) : "—"}</dd></div>
            <div><dt>Total ownership / mo</dt><dd>{totals ? dollars.format(totals[i].monthly) : "—"}</dd></div>
          </dl>
        </section>)}
      </div>
      {!totals && <p className="comparison-glass-note">Complete valid inputs to see totals.</p>}
    </aside>}
    <iframe ref={frame} src="/tools/homecompare/index.html" title="Resale versus new construction cost calculator"
      className="block w-full border-0" style={{height}}
      onLoad={() => frame.current?.contentWindow?.postMessage({type:"homecompare:request-totals"}, window.location.origin)} />
    <noscript>This calculator requires JavaScript to calculate and save comparisons.</noscript>
  </>;
}
