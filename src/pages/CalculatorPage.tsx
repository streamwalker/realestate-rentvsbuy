import { PageHead } from "@/components/PageHead";
import { RentVsBuyCalculator } from "@/components/calculator/RentVsBuyCalculator";
import { EmilySection } from "@/components/sections/EmilySection";

const CalculatorPage = () => (
  <>
    <PageHead
      title="Rent vs. Buy Calculator — San Antonio & Texas"
      description="Free interactive calculator compares the true cost of renting vs. buying in San Antonio, with FHA, VA, USDA, and DPA loan logic built in."
      path="/rent-vs-buy-calculator"
      breadcrumbs={[{ name: "Home", path: "/" }, { name: "Calculator", path: "/rent-vs-buy-calculator" }]}
    />
    <section className="bg-gradient-hero text-cream py-14 md:py-20">
      <div className="container max-w-4xl text-center">
        <p className="text-gold uppercase tracking-wider text-sm font-semibold mb-3">Free Tool</p>
        <h1 className="font-serif text-4xl md:text-6xl font-bold leading-tight">
          Rent vs. Buy Calculator
        </h1>
        <p className="mt-4 text-cream/85 text-lg">
          The most loan-program-aware rent-vs-buy calculator on the web. Adjust any input — every number updates live.
        </p>
      </div>
    </section>
    <section className="py-12 md:py-16">
      <div className="container">
        <RentVsBuyCalculator />
      </div>
    </section>
    <EmilySection source="calculator-page" compact />
  </>
);

export default CalculatorPage;
