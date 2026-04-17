import { Link } from "react-router-dom";
import { PageHead } from "@/components/PageHead";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { EmilySection } from "@/components/sections/EmilySection";
import { FAQSection } from "@/components/sections/FAQSection";
import { faqSchema } from "@/lib/schema";
import type { ReactNode } from "react";

interface GuideContent {
  slug: string;
  title: string;
  description: string;
  eyebrow: string;
  heading: string;
  intro: string;
  sections: Array<{ heading: string; body: ReactNode }>;
  faqs: Array<{ q: string; a: string }>;
}

const GUIDES: Record<string, GuideContent> = {
  "first-time-buyer-guide": {
    slug: "first-time-buyer-guide",
    title: "First-Time Homebuyer Guide for San Antonio",
    description: "Complete first-time homebuyer guide for San Antonio: credit prep, loan options, DPA programs, the closing process, and what to expect month-by-month.",
    eyebrow: "Complete Guide",
    heading: "First-Time Homebuyer Guide — San Antonio",
    intro: "Buying your first home in San Antonio is more accessible than most people think. With FHA, VA, USDA, and the city's HIP 80 program, many first-time buyers can get into a home for $0–$3K out of pocket. Here's the complete roadmap.",
    sections: [
      { heading: "1. Credit & Finances Prep", body: <>Pull your credit (free at AnnualCreditReport.com), aim for a 620+ score for the smoothest approval, and gather two years of tax returns + recent pay stubs. Most lenders want to see 2 months of bank statements.</> },
      { heading: "2. Get Pre-Approved", body: <>A pre-approval letter (not just pre-qualification) tells sellers you're real. Talk to 2–3 lenders to compare rates and fees. Emily can refer you to vetted local lenders.</> },
      { heading: "3. Choose a Loan Program", body: <>Use the <Link to="/rent-vs-buy-calculator" className="text-buy underline">calculator</Link> to compare FHA, VA, USDA, and conventional. Stack with HIP 80 or TSAHC if you need help with cash to close.</> },
      { heading: "4. Tour Homes with Emily", body: <>Emily walks you through 5–15 properties, helps you spot red flags (foundation, HVAC age, roof condition), and structures competitive offers based on actual San Antonio market data.</> },
      { heading: "5. Inspection & Appraisal", body: <>Hire a licensed Texas inspector ($400–$600). Negotiate repairs or seller credits based on findings. Lender orders the appraisal.</> },
      { heading: "6. Closing Day", body: <>Sign the closing docs, get the keys. With seller credits and DPA, your check at closing can be $0. First mortgage payment is due roughly 60 days after closing.</> },
    ],
    faqs: [
      { q: "How much money do I need to buy my first home in San Antonio?", a: "With FHA at 3.5% down on a $200K home, that's $7,000 down + ~$5,000 in closing costs = $12,000 total. Stack with San Antonio HIP 80 or TSAHC and that out-of-pocket can drop to roughly $0." },
      { q: "What credit score do I need to buy a home?", a: "FHA allows scores as low as 580 (3.5% down) or 500 (10% down). VA has no official minimum. Conventional needs 620+. Most San Antonio lenders prefer to see 620+ for the smoothest approval." },
      { q: "How long does the homebuying process take in Texas?", a: "From pre-approval to keys, plan 60–90 days. Pre-approval (1–2 days), house hunting (2–8 weeks), under contract to closing (30–45 days)." },
    ],
  },
  "cost-of-renting": {
    slug: "cost-of-renting",
    title: "The True Cost of Renting in San Antonio",
    description: "Beyond the monthly rent: utilities, pet fees, valet trash, lease break costs, and how San Antonio rentals quietly take more than they advertise.",
    eyebrow: "Hidden Costs",
    heading: "The True Cost of Renting in San Antonio",
    intro: "The advertised rent is just the start. Once you add utilities, mandatory pet fees, valet trash, parking, and renter's insurance, San Antonio renters typically pay 20–30% more than the lease number suggests.",
    sections: [
      { heading: "Mandatory Add-Ons", body: <>Most San Antonio properties charge: valet trash ($25/mo), pest control ($8/mo), and a parking fee ($25–$60). These aren't optional — they show up on every monthly invoice.</> },
      { heading: "Pet Fees Add Up Fast", body: <>Per pet, expect: $300 refundable deposit + $300 non-refundable fee + $30/month rent. Two pets = $1,200 upfront and $720/year.</> },
      { heading: "Move-In Costs", body: <>First month's rent ($1,500) + security deposit ($500) + admin fee ($175) + application fee ($75) = $2,250 minimum. With pets, $3,500+.</> },
      { heading: "Lease Break Penalties", body: <>Texas leases typically have a 2-month buyout clause + reletting fee. Breaking early on a $1,500/mo unit = $4,500. Without a buyout, you owe rent until re-rented.</> },
      { heading: "Annual Rent Hikes", body: <>San Antonio rent increased ~5% per year over the last decade. A $1,500 rent today is $1,910 in 5 years — a $4,920 annual increase you can't lock down.</> },
    ],
    faqs: [
      { q: "What is the average rent in San Antonio in 2026?", a: "The average 1-bedroom apartment in San Antonio rents for $1,200–$1,500/month, while 2-bedrooms run $1,500–$2,000. Add utilities ($175), valet trash ($25), pest control ($8), and parking ($40) and the true cost is often $1,800–$2,300/month." },
      { q: "Is renter's insurance required in Texas?", a: "Most San Antonio property managers require renter's insurance with a minimum $100,000 liability policy, costing $10–$20/month. It's worth having either way." },
    ],
  },
  "new-construction": {
    slug: "new-construction",
    title: "Buying New Construction in San Antonio",
    description: "Guide to buying new construction in San Antonio: top builders (Lennar, D.R. Horton, KB Home), incentive structures, builder financing, and how to negotiate.",
    eyebrow: "New Construction Guide",
    heading: "New Construction Homes in San Antonio",
    intro: "San Antonio has more active new-construction inventory than almost any other major U.S. metro. Lennar, D.R. Horton, KB Home, Pulte, and Meritage all build aggressively across Alamo Ranch, Schertz, Cibolo, and the far north side.",
    sections: [
      { heading: "Why New Construction in San Antonio", body: <>Builder incentives in 2026 are unusually rich: $10,000–$20,000 in closing cost coverage, rate buy-downs to 4–5%, included appliances, and 1-year workmanship + 10-year structural warranties.</> },
      { heading: "Top Builders", body: <>
        <a className="text-buy underline" href="https://www.lennar.com/new-homes/texas/san-antonio" target="_blank" rel="noopener noreferrer">Lennar</a>,{" "}
        <a className="text-buy underline" href="https://www.drhorton.com/texas/san-antonio" target="_blank" rel="noopener noreferrer">D.R. Horton</a>, KB Home, Pulte, Meritage Homes — each has multiple active communities.
      </> },
      { heading: "Negotiation Tips", body: <>Builders rarely negotiate base price — but they will move on incentives, upgrades, and rate buy-downs. Always tour with your own agent (the builder rep represents the builder, not you).</> },
      { heading: "Inspect, Even on New", body: <>Yes, you should still hire an independent inspector on new construction. Issues like grading, framing, HVAC sizing, and finish quality are routinely caught and addressed before closing.</> },
    ],
    faqs: [
      { q: "Is new construction cheaper than resale in San Antonio?", a: "Often yes — once you factor in builder incentives ($10K–$20K in closing costs + rate buy-downs), warranties, and higher energy efficiency, new construction frequently wins on total cost of ownership versus comparable resale." },
      { q: "Can I use FHA or VA on new construction?", a: "Yes. Most San Antonio builders work with FHA, VA, USDA, and conventional loans. Many also have preferred lender programs that add additional credit for using the builder's lender." },
    ],
  },
  "military-homebuying": {
    slug: "military-homebuying",
    title: "Military Homebuying in San Antonio (JBSA Guide)",
    description: "Complete homebuying guide for JBSA service members and veterans: VA loan, Texas property tax exemptions, BAH math, and the best San Antonio neighborhoods for military families.",
    eyebrow: "For Service Members & Veterans",
    heading: "Military Homebuying — San Antonio & JBSA",
    intro: "Joint Base San Antonio is home to 80,000+ active duty, reservists, and veterans across Lackland, Randolph, and Fort Sam Houston. Pair the VA loan with Texas's disabled veteran property tax exemption and military families can buy in San Antonio at terms unavailable almost anywhere else in America.",
    sections: [
      { heading: "VA Loan Basics", body: <>0% down, no PMI, competitive rates. Funding fee waived for disabled veterans. <Link to="/loans/va" className="text-buy underline">Read the full VA guide →</Link></> },
      { heading: "Texas VA Property Tax Exemption", body: <>$5K (10–29%) → $7.5K (30–49%) → $10K (50–69%) → $12K (70–99%) → 100% exemption (no property tax) for 100% rated. Apply at your county appraisal district.</> },
      { heading: "BAH vs. Mortgage Math", body: <>If your BAH covers your full PITI, you're effectively living for free while building equity. The calculator can show this exact math for any base pay grade.</> },
      { heading: "Best Neighborhoods for JBSA Families", body: <>
        <Link to="/san-antonio/converse" className="text-buy underline">Converse</Link>,{" "}
        <Link to="/san-antonio/schertz" className="text-buy underline">Schertz</Link>, and{" "}
        <Link to="/san-antonio/cibolo" className="text-buy underline">Cibolo</Link> for Randolph;{" "}
        <Link to="/san-antonio/medical-center" className="text-buy underline">Medical Center</Link> and Stone Oak for Fort Sam; west side and Helotes for Lackland.
      </> },
    ],
    faqs: [
      { q: "Can active-duty service members at JBSA use the VA loan?", a: "Yes. Active duty service members qualify after 90 days of service during wartime or 181 days during peacetime. Most JBSA personnel qualify within their first deployment cycle." },
      { q: "Do I have to live in the home for a VA loan?", a: "Yes. VA loans require the home to be your primary residence. You typically have 60 days from closing to occupy. Active duty members on PCS orders have flexibility — Emily can walk you through the rules." },
    ],
  },
};

interface Props { slug: keyof typeof GUIDES; }

export const GuidePage = ({ slug }: Props) => {
  const guide = GUIDES[slug];
  return (
    <>
      <PageHead
        title={guide.title}
        description={guide.description}
        path={`/${guide.slug}`}
        jsonLd={[faqSchema(guide.faqs)]}
        breadcrumbs={[{ name: "Home", path: "/" }, { name: guide.title, path: `/${guide.slug}` }]}
      />

      <section className="bg-gradient-hero text-cream py-14 md:py-20">
        <div className="container max-w-4xl">
          <p className="text-gold uppercase tracking-wider text-sm font-semibold mb-3">{guide.eyebrow}</p>
          <h1 className="font-serif text-4xl md:text-6xl font-bold leading-tight mb-4" data-speakable>{guide.heading}</h1>
          <p className="text-cream/85 text-lg max-w-2xl">{guide.intro}</p>
        </div>
      </section>

      <section className="py-14">
        <div className="container max-w-3xl space-y-8">
          {guide.sections.map((s, i) => (
            <Card key={i} className="p-6 md:p-7 border-l-4 border-l-gold">
              <h2 className="font-serif text-2xl font-bold text-navy mb-2">{s.heading}</h2>
              <div className="text-foreground/85 leading-relaxed">{s.body}</div>
            </Card>
          ))}
          <div className="text-center pt-6">
            <Button asChild size="lg" className="bg-gold text-navy hover:bg-gold/90">
              <Link to="/rent-vs-buy-calculator">Run Your Numbers →</Link>
            </Button>
          </div>
        </div>
      </section>

      <FAQSection title="People Also Ask" faqs={guide.faqs} />
      <EmilySection source={`guide-${guide.slug}`} compact />
    </>
  );
};

export const GUIDES_INDEX = GUIDES;
export default GuidePage;
