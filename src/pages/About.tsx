import { Link } from "react-router-dom";
import { PageHead } from "@/components/PageHead";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { LeadForm } from "@/components/forms/LeadForm";
import { EMILY } from "@/config/site";
import emilyPhoto from "@/assets/emily-russell.jpg";

const About = () => (
  <>
    <PageHead
      title="About Emily Russell — San Antonio Realtor"
      description="Emily Russell is a San Antonio Realtor® demystifying the homebuying process for clients at every price point — from $180K starter homes to multi-million dollar estates."
      path="/about"
      breadcrumbs={[{ name: "Home", path: "/" }, { name: "About", path: "/about" }]}
    />
    <section className="bg-gradient-hero text-cream py-14 md:py-20">
      <div className="container max-w-4xl">
        <p className="text-gold uppercase tracking-wider text-sm font-semibold mb-3">About</p>
        <h1 className="font-serif text-4xl md:text-6xl font-bold leading-tight">Meet Emily Russell</h1>
        <p className="text-cream/85 text-lg max-w-2xl mt-4">{EMILY.title}</p>
        <div className="mt-6 flex flex-wrap items-center gap-4">
          <span className="inline-flex items-center gap-2 text-cream/85 text-sm">
            <img
              src="/logos/equal-housing-opportunity.png"
              alt="Equal Housing Opportunity"
              width={32}
              height={32}
              loading="lazy"
              className="h-8 w-8 object-contain bg-cream rounded-sm p-0.5"
            />
            <span>Equal Housing Opportunity</span>
          </span>
          <span className="inline-flex items-center gap-2 text-cream/85 text-sm">
            <img
              src="/logos/realtor.svg"
              alt="REALTOR®"
              width={92}
              height={32}
              loading="lazy"
              className="h-8 w-auto object-contain bg-cream rounded-sm px-1 py-0.5"
            />
          </span>
          <span className="text-cream/70 text-xs">Licensed by the Texas Real Estate Commission</span>
        </div>
      </div>
    </section>

    <section className="py-14">
      <div className="container max-w-4xl grid md:grid-cols-3 gap-10">
        <div className="md:col-span-1">
          <img src={emilyPhoto} alt="Emily Russell" width={400} height={400}
            className="w-full rounded-lg border-4 border-gold shadow-elegant" loading="lazy" />
        </div>
        <div className="md:col-span-2 prose">
          <h2 className="font-serif text-2xl font-bold text-navy">Philosophy</h2>
          <p>{EMILY.bio}</p>
          <p>
            Emily believes real estate decisions should be made with full information, not pressure. Every client
            consultation starts with a no-cost analysis of your finances, goals, and timeline — then she shows you
            every loan program you qualify for, side by side, so you can choose with confidence.
          </p>
          <h3 className="font-serif text-xl font-bold text-navy mt-6">Specialties</h3>
          <div className="flex flex-wrap gap-2 not-prose">
            {EMILY.specialties.map((s) => (
              <span key={s} className="px-3 py-1 rounded-full bg-gold/10 border border-gold/30 text-sm">{s}</span>
            ))}
          </div>
          <h3 className="font-serif text-xl font-bold text-navy mt-6">Service Area</h3>
          <p>San Antonio, Stone Oak, Alamo Ranch, Helotes, Boerne, Schertz, Cibolo, Converse, New Braunfels, and the surrounding Texas Hill Country.</p>
        </div>
      </div>
    </section>

    <section className="py-14 bg-cream/40">
      <div className="container max-w-2xl">
        <Card className="p-8">
          <h2 className="font-serif text-2xl font-bold text-navy mb-2">Get in touch</h2>
          <p className="text-foreground/70 mb-5">Questions, scenarios, or just exploring? Emily replies personally.</p>
          <LeadForm source="about-page" />
        </Card>
      </div>
    </section>
  </>
);

export default About;
