import { useEffect, useRef, useState } from "react";
import { PageHead } from "@/components/PageHead";

export default function ResaleVsNewPage() {
  const frame = useRef<HTMLIFrameElement>(null);
  const [height, setHeight] = useState(2400);
  useEffect(() => {
    function resize(event: MessageEvent) {
      if (event.origin !== window.location.origin || event.source !== frame.current?.contentWindow) return;
      if (event.data?.type !== "homecompare:height") return;
      const next = event.data.height;
      if (typeof next === "number" && Number.isFinite(next) && next >= 500 && next <= 60000) setHeight(Math.ceil(next));
    }
    window.addEventListener("message", resize);
    return () => window.removeEventListener("message", resize);
  }, []);
  return <>
    <PageHead title="Resale vs. New Construction — Compare Home Costs"
      description="Compare resale and new construction side by side: cash to move in, monthly payments, financing, warranties and energy upgrades. Save or print your comparison."
      path="/resale-vs-new"
      breadcrumbs={[{name:"Home",path:"/"},{name:"Resale vs. New",path:"/resale-vs-new"}]} />
    <iframe ref={frame} src="/tools/homecompare/index.html" title="Resale versus new construction cost calculator"
      className="block w-full border-0" style={{height}} />
    <noscript>This calculator requires JavaScript to calculate and save comparisons.</noscript>
  </>;
}
