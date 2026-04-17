import { PageHead } from "@/components/PageHead";
import { SITE, EMILY } from "@/config/site";

const TermsOfService = () => {
  return (
    <PageHead
      title="Terms of Service"
      description="Terms governing your use of rentvsbuyhouse.com and the information provided here."
      path="/terms-of-service"
      image={`${SITE.url}/og-terms.jpg`}
      breadcrumbs={[
        { name: "Home", path: "/" },
        { name: "Terms of Service", path: "/terms-of-service" },
      ]}
    >
      <article className="container max-w-3xl py-16 md:py-24">
        <header className="mb-10 border-b border-navy/10 pb-8">
          <p className="text-sm font-semibold uppercase tracking-widest text-gold">
            Legal
          </p>
          <h1 className="mt-2 font-serif text-4xl md:text-5xl font-bold text-navy">
            Terms of Service
          </h1>
          <p className="mt-3 text-sm text-navy/60">
            Last updated: {new Date().toLocaleDateString("en-US", { month: "long", year: "numeric" })}
          </p>
        </header>

        <section className="prose prose-navy max-w-none space-y-8 text-navy/85 leading-relaxed">
          <p>
            By accessing or using {SITE.name} (the &ldquo;Site&rdquo;), you
            agree to these Terms of Service. If you do not agree, please do
            not use the Site.
          </p>

          <div>
            <h2 className="font-serif text-2xl font-semibold text-navy">
              Informational Purpose Only
            </h2>
            <p className="mt-3">
              All content on this Site — including calculators, loan program
              guides, market data, and articles — is provided for general
              informational purposes only. It does not constitute financial,
              legal, tax, or investment advice. Mortgage payment estimates
              are illustrative; actual rates and fees vary based on credit,
              loan program, and lender. Always consult a licensed
              professional before making real estate decisions.
            </p>
          </div>

          <div>
            <h2 className="font-serif text-2xl font-semibold text-navy">
              No Agency Relationship
            </h2>
            <p className="mt-3">
              Use of this Site, including submitting an inquiry or scheduling
              a call, does not by itself create an agency, fiduciary, or
              client relationship between you and {EMILY.name}. A formal
              representation relationship begins only after a written
              agreement is signed by both parties.
            </p>
          </div>

          <div>
            <h2 className="font-serif text-2xl font-semibold text-navy">
              Intellectual Property
            </h2>
            <p className="mt-3">
              All content on this Site — text, graphics, logos, calculators,
              and design — is owned by {EMILY.name} or its licensors and is
              protected by copyright, trademark, and other intellectual
              property laws. You may view and share content for personal,
              non-commercial use, but you may not reproduce, republish, or
              redistribute it without written permission.
            </p>
          </div>

          <div>
            <h2 className="font-serif text-2xl font-semibold text-navy">
              Third-Party Links
            </h2>
            <p className="mt-3">
              The Site may link to third-party websites (such as TREC,
              lenders, or scheduling tools). We are not responsible for the
              content, accuracy, or practices of any third-party site.
            </p>
          </div>

          <div>
            <h2 className="font-serif text-2xl font-semibold text-navy">
              Limitation of Liability
            </h2>
            <p className="mt-3">
              To the fullest extent permitted by law, {EMILY.name} and{" "}
              {SITE.name} shall not be liable for any indirect, incidental,
              special, or consequential damages arising out of your use of —
              or inability to use — this Site or any information contained
              on it.
            </p>
          </div>

          <div>
            <h2 className="font-serif text-2xl font-semibold text-navy">
              Governing Law
            </h2>
            <p className="mt-3">
              These Terms are governed by the laws of the State of Texas,
              without regard to its conflict-of-law principles. Any dispute
              shall be resolved in the courts located in Bexar County, Texas.
            </p>
          </div>

          <div>
            <h2 className="font-serif text-2xl font-semibold text-navy">
              Changes to These Terms
            </h2>
            <p className="mt-3">
              We may update these Terms from time to time. The &ldquo;Last
              updated&rdquo; date at the top reflects the most recent
              revision. Continued use of the Site after changes are posted
              constitutes acceptance.
            </p>
          </div>

          <div>
            <h2 className="font-serif text-2xl font-semibold text-navy">
              Contact
            </h2>
            <p className="mt-3">
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

export default TermsOfService;
