import { PageHead } from "@/components/PageHead";
import { SITE, EMILY } from "@/config/site";

const TREC_CONSUMER_NOTICE_URL =
  "https://www.trec.texas.gov/sites/default/files/pdf-forms/CN%201-3.pdf";
const TREC_IABS_URL =
  "https://www.trec.texas.gov/sites/default/files/pdf-forms/IABS%201-0.pdf";

const TrecDisclosures = () => {
  return (
    <PageHead
      title="TREC Disclosures"
      description="Texas Real Estate Commission required consumer notices and information about brokerage services from Emily Russell."
      path="/trec-disclosures"
      image={`${SITE.url}/og-trec.jpg`}
      breadcrumbs={[
        { name: "Home", path: "/" },
        { name: "TREC Disclosures", path: "/trec-disclosures" },
      ]}
    >
      <article className="container max-w-3xl py-16 md:py-24">
        <header className="mb-10 border-b border-navy/10 pb-8">
          <p className="text-sm font-semibold uppercase tracking-widest text-gold">
            Required Notices
          </p>
          <h1 className="mt-2 font-serif text-4xl md:text-5xl font-bold text-navy">
            TREC Disclosures
          </h1>
          <p className="mt-4 text-lg text-navy/70 leading-relaxed">
            The Texas Real Estate Commission (TREC) requires every licensed
            real estate agent to provide consumers with two key disclosures.
            They&rsquo;re linked below in their official PDF form.
          </p>
        </header>

        <section className="space-y-10 text-navy/85 leading-relaxed">
          <div>
            <h2 className="font-serif text-2xl font-semibold text-navy">
              Consumer Protection Notice
            </h2>
            <p className="mt-3">
              The Texas Real Estate Commission regulates real estate brokers
              and agents, real estate inspectors, home warranty companies,
              easement and right-of-way agents, and timeshare interest
              providers. You can file complaints and find more information at{" "}
              <a
                href="https://www.trec.texas.gov/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gold underline hover:text-gold/80"
              >
                trec.texas.gov
              </a>
              .
            </p>
            <a
              href={TREC_CONSUMER_NOTICE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 inline-flex items-center gap-2 rounded-md bg-navy px-4 py-2 text-sm font-semibold text-cream hover:bg-navy/90 transition-smooth"
            >
              View TREC Consumer Notice (PDF) →
            </a>
          </div>

          <div>
            <h2 className="font-serif text-2xl font-semibold text-navy">
              Information About Brokerage Services
            </h2>
            <p className="mt-3">
              Texas law requires all real estate license holders to give the
              following information about brokerage services to prospective
              buyers, tenants, sellers, and landlords. This document explains
              the difference between a broker, an agent, an intermediary, and
              a subagent — and what each of them owes you.
            </p>
            <a
              href={TREC_IABS_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 inline-flex items-center gap-2 rounded-md bg-navy px-4 py-2 text-sm font-semibold text-cream hover:bg-navy/90 transition-smooth"
            >
              View Information About Brokerage Services (PDF) →
            </a>
          </div>

          <div className="rounded-lg border border-navy/10 bg-cream/50 p-6">
            <h2 className="font-serif text-xl font-semibold text-navy">
              Equal Housing Opportunity
            </h2>
            <p className="mt-2 text-sm">
              {EMILY.name} is committed to compliance with all federal, state,
              and local fair housing laws. We do not discriminate based on
              race, color, religion, sex, handicap, familial status, national
              origin, sexual orientation, or gender identity.
            </p>
          </div>

          <div className="text-sm text-navy/60">
            <p>
              <strong>Licensed in Texas.</strong> Brokerage and license
              information available on request.
            </p>
            <p className="mt-2">
              Questions? Contact {EMILY.name} at{" "}
              <a href={EMILY.emailHref} className="text-gold underline">
                {EMILY.email}
              </a>
              .
            </p>
          </div>
        </section>
      </article>
    </PageHead>
  );
};

export default TrecDisclosures;
