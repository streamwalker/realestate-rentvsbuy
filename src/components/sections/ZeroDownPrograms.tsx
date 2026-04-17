import { Card } from "@/components/ui/card";
import { ExternalLink } from "lucide-react";

const PROGRAMS = [
  {
    title: "USDA Rural Development",
    badge: "0% Down",
    body: "Many areas just outside San Antonio (think Helotes, Cibolo, Boerne) qualify for 100% USDA financing.",
    links: [
      { label: "rd.usda.gov", url: "https://www.rd.usda.gov/programs-services/single-family-housing-programs" },
      { label: "USDA Eligibility Map", url: "https://eligibility.sc.egov.usda.gov/eligibility/" },
    ],
  },
  {
    title: "San Antonio HIP 80",
    badge: "Up to $30K",
    body: "City of San Antonio Homeownership Incentive Program — up to $30,000 in down payment assistance for qualified buyers.",
    links: [{ label: "sa.gov homeownership", url: "https://www.sa.gov/Directory/Departments/NHSD/Programs/Homeownership" }],
  },
  {
    title: "TSAHC & TDHCA",
    badge: "Statewide",
    body: "Texas State Affordable Housing Corporation + TX Dept of Housing — DPA grants for first-time buyers, teachers, veterans, first responders.",
    links: [
      { label: "tsahc.org", url: "https://www.tsahc.org/" },
      { label: "tdhca.texas.gov", url: "https://www.tdhca.state.tx.us/" },
    ],
  },
  {
    title: "Builder Closing Cost Coverage",
    badge: "$10K – $20K+",
    body: "San Antonio builders like Lennar and D.R. Horton routinely cover closing costs and offer rate buy-downs on new construction inventory.",
    links: [
      { label: "Lennar San Antonio", url: "https://www.lennar.com/new-homes/texas/san-antonio" },
      { label: "D.R. Horton SA", url: "https://www.drhorton.com/texas/san-antonio" },
    ],
  },
  {
    title: "VA Loan",
    badge: "0% Down",
    body: "Active duty, veterans, and surviving spouses get 0% down, no PMI, and competitive rates. Plus Texas property tax exemptions for rated disabilities.",
    links: [
      { label: "VA.gov housing", url: "https://www.va.gov/housing-assistance/home-loans/" },
      { label: "JBSA", url: "https://www.jbsa.mil/" },
      { label: "TX Comptroller exemptions", url: "https://comptroller.texas.gov/taxes/property-tax/exemptions/" },
    ],
  },
  {
    title: "FHA + DPA Stack",
    badge: "3.5% Down (Covered)",
    body: "Stack an FHA loan with TSAHC or HIP 80 down payment assistance to bring your cash to close to ~$0.",
    links: [{ label: "HUD FHA programs", url: "https://www.hud.gov/program_offices/housing/sfh" }],
  },
];

export const ZeroDownPrograms = () => (
  <section className="py-16 md:py-24 bg-cream/60">
    <div className="container">
      <div className="text-center mb-12">
        <p className="text-gold font-semibold uppercase tracking-wider text-sm mb-2">$0 Down Programs</p>
        <h2 className="font-serif text-3xl md:text-5xl font-bold text-navy mb-3">You may not need a 20% down payment.</h2>
        <p className="text-foreground/70 max-w-2xl mx-auto">
          Six legitimate paths to homeownership with little to no money out of pocket — all available right now in San Antonio.
        </p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
        {PROGRAMS.map((p) => (
          <Card key={p.title} className="p-6 hover:shadow-elegant hover:-translate-y-0.5 transition-smooth flex flex-col">
            <div className="flex items-start justify-between mb-3">
              <h3 className="font-serif text-xl font-bold text-navy">{p.title}</h3>
              <span className="px-2 py-1 rounded-md bg-gold/15 text-navy text-[11px] font-semibold uppercase tracking-wider whitespace-nowrap">{p.badge}</span>
            </div>
            <p className="text-sm text-foreground/75 leading-relaxed mb-4 flex-1">{p.body}</p>
            <div className="flex flex-wrap gap-x-3 gap-y-1.5 pt-3 border-t border-border">
              {p.links.map((l) => (
                <a key={l.url} href={l.url} target="_blank" rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-xs font-medium text-buy hover:text-buy/80 transition-smooth">
                  {l.label} <ExternalLink className="h-3 w-3" />
                </a>
              ))}
            </div>
          </Card>
        ))}
      </div>
    </div>
  </section>
);
