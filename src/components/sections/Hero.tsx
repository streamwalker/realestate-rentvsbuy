import { Button } from "@/components/ui/button";
import { useReveal, useCounter } from "@/hooks/useReveal";
import heroImg from "@/assets/hero-san-antonio.jpg";

export const Hero = () => {
  const { ref, visible } = useReveal();
  const cash = useCounter(0, 1000, visible);
  const days = useCounter(60, 1500, visible);
  const savings = useCounter(3000, 1800, visible);

  return (
    <section ref={ref} className="relative isolate overflow-hidden bg-navy text-cream">
      <div className="absolute inset-0">
        <img src={heroImg} alt="San Antonio neighborhood at golden hour" className="h-full w-full object-cover opacity-25" />
        <div className="absolute inset-0 bg-gradient-to-br from-navy-deep via-navy/90 to-navy/70" />
      </div>

      <div className="container relative py-20 md:py-32">
        <p className="text-gold font-semibold uppercase tracking-[0.2em] text-xs md:text-sm mb-5 animate-fade-in">
          San Antonio · Texas · 2026
        </p>
        <h1 className="font-serif text-5xl md:text-7xl lg:text-8xl font-bold leading-[1.05] text-balance max-w-5xl">
          Stop Paying<br />
          <span className="text-gold">Someone Else's</span> Mortgage.
        </h1>
        <p className="mt-7 text-lg md:text-xl text-cream/85 max-w-2xl leading-relaxed">
          The data-driven case for homeownership — with interactive calculators,
          loan program guides, and expert guidance from Emily Russell.
        </p>

        <div className="mt-10 flex flex-col sm:flex-row gap-3">
          <Button asChild size="lg" className="bg-gold text-navy hover:bg-gold/90 shadow-gold text-base h-12 px-7">
            <a href="#calculator">Run Your Numbers →</a>
          </Button>
          <Button asChild size="lg" variant="outline" className="border-cream/40 text-cream bg-transparent hover:bg-cream/10 text-base h-12 px-7">
            <a href="#emily">Talk to Emily →</a>
          </Button>
        </div>

        <div className="mt-16 grid grid-cols-3 gap-4 md:gap-8 max-w-3xl">
          <Stat label="Cash to Close" value={`$${cash.toLocaleString()}`} sub="with right loan program" />
          <Stat label="Days Before 1st Payment" value={`~${days}`} sub="after closing" />
          <Stat label="Year-1 Savings vs. Rent" value={`$${savings.toLocaleString()}+`} sub="typical scenario" />
        </div>
      </div>
    </section>
  );
};

const Stat = ({ label, value, sub }: { label: string; value: string; sub: string }) => (
  <div>
    <div className="text-xs uppercase tracking-wider text-gold/90 font-semibold mb-1.5">{label}</div>
    <div className="font-serif text-3xl md:text-5xl font-bold text-cream tabular-nums">{value}</div>
    <div className="text-[11px] md:text-xs text-cream/60 mt-1.5">{sub}</div>
  </div>
);
