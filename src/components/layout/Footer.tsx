import { Link } from "react-router-dom";
import { EMILY, SITE, NEIGHBORHOODS, LOANS } from "@/config/site";

export const Footer = () => {
  return (
    <footer className="bg-navy text-cream/90 mt-24">
      <div className="container py-14 grid grid-cols-2 md:grid-cols-4 gap-10">
        <div className="col-span-2 md:col-span-1">
          <h3 className="font-serif text-xl text-cream font-bold">{EMILY.name}</h3>
          <p className="text-sm mt-1 text-gold">{EMILY.title}</p>
          <p className="mt-4 text-sm leading-relaxed text-cream/75">
            Demystifying homebuying in San Antonio at every price point.
          </p>
          <div className="mt-5 space-y-2 text-sm">
            <a href={EMILY.phoneHref} className="block hover:text-gold transition-smooth">📞 {EMILY.phone}</a>
            <a href={EMILY.emailHref} className="block hover:text-gold transition-smooth break-all">✉ {EMILY.email}</a>
          </div>
        </div>

        <div>
          <h4 className="font-serif text-cream font-semibold mb-3">Loan Programs</h4>
          <ul className="space-y-2 text-sm">
            {LOANS.map((l) => (
              <li key={l.slug}>
                <Link to={`/loans/${l.slug}`} className="hover:text-gold transition-smooth">{l.name}</Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="font-serif text-cream font-semibold mb-3">Neighborhoods</h4>
          <ul className="space-y-2 text-sm">
            {NEIGHBORHOODS.slice(0, 8).map((n) => (
              <li key={n.slug}>
                <Link to={`/${n.slug}`} className="hover:text-gold transition-smooth">{n.name}</Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="font-serif text-cream font-semibold mb-3">Resources</h4>
          <ul className="space-y-2 text-sm">
            <li><Link to="/rent-vs-buy-calculator" className="hover:text-gold">Calculator</Link></li>
            <li><Link to="/first-time-buyer-guide" className="hover:text-gold">First-Time Buyer Guide</Link></li>
            <li><Link to="/cost-of-renting" className="hover:text-gold">Cost of Renting</Link></li>
            <li><Link to="/new-construction" className="hover:text-gold">New Construction</Link></li>
            <li><Link to="/military-homebuying" className="hover:text-gold">Military Homebuying</Link></li>
            <li><Link to="/blog" className="hover:text-gold">Blog</Link></li>
            <li><Link to="/about" className="hover:text-gold">About Emily</Link></li>
            <li><Link to="/contact" className="hover:text-gold">Contact</Link></li>
          </ul>
        </div>
      </div>

      <div className="border-t border-cream/10">
        <div className="container py-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4 text-xs text-cream/60">
          <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
            <span aria-label="Equal Housing Opportunity" title="Equal Housing Opportunity"
              className="inline-flex items-center gap-1.5">
              <span className="grid h-5 w-5 place-items-center rounded-sm border border-cream/40 text-[10px]">⌂</span>
              Equal Housing Opportunity
            </span>
            <a href="https://www.trec.texas.gov/sites/default/files/pdf-forms/CN%201-3.pdf"
              target="_blank" rel="noopener noreferrer" className="hover:text-gold">
              TREC Consumer Notice
            </a>
            <a href="https://www.trec.texas.gov/sites/default/files/pdf-forms/IABS%201-0.pdf"
              target="_blank" rel="noopener noreferrer" className="hover:text-gold">
              Information About Brokerage Services
            </a>
          </div>
          <div>© {new Date().getFullYear()} {EMILY.name} | {SITE.domain}</div>
        </div>
        <div className="container pb-6 text-[11px] text-cream/50 leading-relaxed">
          This website is for informational purposes only and does not constitute financial,
          legal, or tax advice. Mortgage payment estimates are illustrative; actual rates and
          fees vary based on credit, loan program, and lender. Consult a licensed professional
          before making real estate decisions.
        </div>
      </div>
    </footer>
  );
};
