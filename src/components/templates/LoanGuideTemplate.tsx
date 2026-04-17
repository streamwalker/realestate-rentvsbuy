import { Link } from "react-router-dom";
import { PageHead } from "@/components/PageHead";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { RentVsBuyCalculator } from "@/components/calculator/RentVsBuyCalculator";
import { FAQSection } from "@/components/sections/FAQSection";
import { EmilySection } from "@/components/sections/EmilySection";
import { faqSchema } from "@/lib/schema";
import { Check, X } from "lucide-react";
import type { LoanType } from "@/lib/calculator-defaults";

export interface LoanGuideContent {
  slug: LoanType;
  name: string;
  fullTitle: string;
  description: string;
  hero: { eyebrow: string; headline: string; sub: string };
  overview: string;
  whoQualifies: string[];
  pros: string[];
  cons: string[];
  comparisonNote: string;
  faqs: Array<{ q: string; a: string }>;
}

interface Props { content: LoanGuideContent; }

export const LoanGuideTemplate = ({ content }: Props) => {
  const path = `/loans/${content.slug}`;
  return (
    <>
      <PageHead
        title={`${content.fullTitle} | ${content.name} Guide`}
        description={content.description}
        path={path}
        jsonLd={[faqSchema(content.faqs)]}
        breadcrumbs={[
          { name: "Home", path: "/" },
          { name: "Loans", path: "/loans/va" },
          { name: content.name, path },
        ]}
      />

      <section className="bg-gradient-hero text-cream py-14 md:py-20">
        <div className="container max-w-4xl">
          <p className="text-gold uppercase tracking-wider text-sm font-semibold mb-3">{content.hero.eyebrow}</p>
          <h1 className="font-serif text-4xl md:text-6xl font-bold leading-[1.1] mb-4" data-speakable>{content.hero.headline}</h1>
          <p className="text-cream/85 text-lg max-w-2xl">{content.hero.sub}</p>
        </div>
      </section>

      <section className="py-14 md:py-20">
        <div className="container max-w-4xl prose prose-lg">
          <h2 className="font-serif text-3xl font-bold text-navy mb-4">Overview</h2>
          <p className="text-foreground/85 leading-relaxed text-lg">{content.overview}</p>

          <div className="grid md:grid-cols-2 gap-5 mt-10">
            <Card className="p-6 border-buy/30 bg-buy-soft/40">
              <h3 className="font-serif text-xl font-bold text-buy mb-3">Pros</h3>
              <ul className="space-y-2 text-sm">
                {content.pros.map((p) => (
                  <li key={p} className="flex gap-2"><Check className="h-4 w-4 text-buy mt-0.5 shrink-0" />{p}</li>
                ))}
              </ul>
            </Card>
            <Card className="p-6 border-rent/30 bg-rent-soft/40">
              <h3 className="font-serif text-xl font-bold text-rent mb-3">Cons</h3>
              <ul className="space-y-2 text-sm">
                {content.cons.map((p) => (
                  <li key={p} className="flex gap-2"><X className="h-4 w-4 text-rent mt-0.5 shrink-0" />{p}</li>
                ))}
              </ul>
            </Card>
          </div>

          <h2 className="font-serif text-3xl font-bold text-navy mt-12 mb-4">Who Qualifies</h2>
          <ul className="space-y-2">
            {content.whoQualifies.map((q) => (
              <li key={q} className="flex gap-2 text-foreground/85"><Check className="h-4 w-4 text-buy mt-1 shrink-0" />{q}</li>
            ))}
          </ul>

          <h2 className="font-serif text-3xl font-bold text-navy mt-12 mb-3">Compare Loan Programs</h2>
          <p className="text-foreground/75 mb-4">{content.comparisonNote}</p>
          <div className="overflow-x-auto rounded-lg border">
            <table className="w-full text-sm">
              <thead className="bg-navy text-cream">
                <tr>
                  <th className="px-4 py-3 text-left">Program</th>
                  <th className="px-4 py-3 text-left">Min Down</th>
                  <th className="px-4 py-3 text-left">Mortgage Insurance</th>
                  <th className="px-4 py-3 text-left">Best For</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                <tr className={content.slug === "fha" ? "bg-gold/10" : ""}><td className="px-4 py-3 font-semibold"><Link to="/loans/fha" className="text-navy hover:text-gold">FHA</Link></td><td className="px-4 py-3">3.5%</td><td className="px-4 py-3">Yes (MIP)</td><td className="px-4 py-3">First-time buyers, lower credit</td></tr>
                <tr className={content.slug === "va" ? "bg-gold/10" : ""}><td className="px-4 py-3 font-semibold"><Link to="/loans/va" className="text-navy hover:text-gold">VA</Link></td><td className="px-4 py-3">0%</td><td className="px-4 py-3">No</td><td className="px-4 py-3">Veterans, active duty, surviving spouses</td></tr>
                <tr className={content.slug === "usda" ? "bg-gold/10" : ""}><td className="px-4 py-3 font-semibold"><Link to="/loans/usda" className="text-navy hover:text-gold">USDA</Link></td><td className="px-4 py-3">0%</td><td className="px-4 py-3">Guarantee fee</td><td className="px-4 py-3">Eligible rural / suburban areas</td></tr>
                <tr className={content.slug === "conventional" ? "bg-gold/10" : ""}><td className="px-4 py-3 font-semibold"><Link to="/loans/conventional" className="text-navy hover:text-gold">Conventional</Link></td><td className="px-4 py-3">3%–20%</td><td className="px-4 py-3">If &lt;20% down</td><td className="px-4 py-3">Strong credit, larger down</td></tr>
                <tr className={content.slug === "dpa" ? "bg-gold/10" : ""}><td className="px-4 py-3 font-semibold"><Link to="/loans/dpa" className="text-navy hover:text-gold">DPA Stack</Link></td><td className="px-4 py-3">~$0 effective</td><td className="px-4 py-3">Varies</td><td className="px-4 py-3">Need help with cash to close</td></tr>
              </tbody>
            </table>
          </div>

          <div className="mt-12">
            <h2 className="font-serif text-3xl font-bold text-navy mb-3">Run the Numbers</h2>
            <p className="text-foreground/75 mb-6">Calculator pre-configured for the {content.name}.</p>
          </div>
        </div>

        <div className="container mt-4">
          <RentVsBuyCalculator lockedLoanType={content.slug} />
        </div>

        <div className="container max-w-4xl mt-14 text-center">
          <Card className="bg-navy text-cream p-8">
            <h3 className="font-serif text-2xl font-bold mb-2">Not sure if {content.name} is right for you?</h3>
            <p className="text-cream/80 mb-5">Emily walks you through every loan option, side by side, with no pressure.</p>
            <Button asChild size="lg" className="bg-gold text-navy hover:bg-gold/90">
              <Link to="/contact">Talk to Emily →</Link>
            </Button>
          </Card>
        </div>
      </section>

      <FAQSection title={`${content.name} — FAQs`} faqs={content.faqs} />
      <EmilySection source={`loan-${content.slug}`} compact />
    </>
  );
};
