import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const MONTHS = ["January","February","March","April","May","June","July","August","September","October","November","December"];

export const CashFlowTimeline = () => {
  const [closeMonth, setCloseMonth] = useState(5); // June (0-indexed)

  const m1 = MONTHS[closeMonth];
  const m2 = MONTHS[(closeMonth + 1) % 12];
  const m3 = MONTHS[(closeMonth + 2) % 12];

  const cards = [
    { tag: `Closing Day · ${m1}`, headline: "$0 Out of Pocket", body: "With the right loan program, your cash to close can land at zero. Seller credits, lender credits, and DPA close the gap." },
    { tag: `${m2} · No Payment Due`, headline: "Still $0", body: "Mortgages are paid in arrears. Your first payment isn't due the month you close — it's due the month after the next." },
    { tag: `${m3} 1 · First Payment`, headline: "Your Mortgage Begins", body: "About 60 days after closing, your first payment is due. From this day forward, every payment builds equity." },
    { tag: "Month 12 & Beyond", headline: "Equity, Locked In", body: "Year 1 typically builds $3K–$8K in principal — money that stays yours, not your landlord's." },
  ];

  return (
    <section className="py-16 md:py-24">
      <div className="container">
        <h2 className="font-serif text-3xl md:text-5xl font-bold text-navy text-center mb-3 leading-tight">
          The Cash-Flow Timeline of a{" "}
          <span className="inline-block align-middle">
            <Select value={String(closeMonth)} onValueChange={(v) => setCloseMonth(+v)}>
              <SelectTrigger className="inline-flex h-12 md:h-14 px-3 md:px-4 text-2xl md:text-4xl font-serif font-bold text-gold border-gold/40 bg-gold/10 w-auto">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {MONTHS.map((m, i) => <SelectItem key={i} value={String(i)}>{m}</SelectItem>)}
              </SelectContent>
            </Select>
          </span>{" "}
          Close
        </h2>
        <p className="text-center text-foreground/70 max-w-2xl mx-auto mb-12">
          Buying a home doesn't mean a giant payment hits the day you sign. Here's what the first year actually looks like.
        </p>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
          {cards.map((c, i) => (
            <Card key={i} className="p-6 hover:shadow-elegant transition-smooth border-l-4 border-l-gold">
              <div className="text-xs uppercase tracking-wider text-gold font-semibold mb-3">{c.tag}</div>
              <h3 className="font-serif text-xl font-bold text-navy mb-2">{c.headline}</h3>
              <p className="text-sm text-foreground/75 leading-relaxed">{c.body}</p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};
