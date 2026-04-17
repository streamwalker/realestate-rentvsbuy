import { PageHead } from "@/components/PageHead";
import { Hero } from "@/components/sections/Hero";
import { RentVsBuyCalculator } from "@/components/calculator/RentVsBuyCalculator";
import { CashFlowTimeline } from "@/components/sections/CashFlowTimeline";
import { ZeroDownPrograms } from "@/components/sections/ZeroDownPrograms";
import { ValueProps } from "@/components/sections/ValueProps";
import { FAQSection } from "@/components/sections/FAQSection";
import { EmilySection } from "@/components/sections/EmilySection";
import { faqSchema } from "@/lib/schema";
import { HOMEPAGE_FAQS } from "@/data/homepage-faqs";
import { SITE } from "@/config/site";

const Index = () => {
  return (
    <>
      <PageHead
        title={`${SITE.tagline} — Rent vs. Buy in San Antonio | ${SITE.name}`}
        description={SITE.description}
        path="/"
        jsonLd={[faqSchema(HOMEPAGE_FAQS)]}
      />

      <Hero />

      <section id="calculator" className="py-16 md:py-24 bg-cream/40 scroll-mt-20">
        <div className="container">
          <div className="text-center mb-10">
            <p className="text-gold font-semibold uppercase tracking-wider text-sm mb-2">The Calculator</p>
            <h2 className="font-serif text-3xl md:text-5xl font-bold text-navy mb-3">Rent vs. Buy — Run Your Numbers</h2>
            <p className="text-foreground/70 max-w-2xl mx-auto">
              Side-by-side comparison with FHA, VA, USDA, and DPA loan logic baked in.
              Every input recalculates live.
            </p>
          </div>
          <RentVsBuyCalculator />
        </div>
      </section>

      <CashFlowTimeline />
      <ZeroDownPrograms />
      <ValueProps />
      <FAQSection
        title="People Also Ask"
        subtitle="The questions San Antonio buyers and renters search for most."
        faqs={HOMEPAGE_FAQS}
      />

      <div id="emily" className="scroll-mt-16">
        <EmilySection source="homepage" />
      </div>
    </>
  );
};

export default Index;
