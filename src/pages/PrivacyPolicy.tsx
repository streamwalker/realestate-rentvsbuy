import { PageHead } from "@/components/PageHead";
import { SITE, EMILY } from "@/config/site";

const PrivacyPolicy = () => {
  return (
    <PageHead
      title="Privacy Policy"
      description="How rentvsbuyhouse.com collects, uses, and protects your personal information."
      path="/privacy-policy"
      image={`${SITE.url}/og-privacy.jpg`}
      breadcrumbs={[
        { name: "Home", path: "/" },
        { name: "Privacy Policy", path: "/privacy-policy" },
      ]}
    >
      <article className="container max-w-3xl py-16 md:py-24">
        <header className="mb-10 border-b border-navy/10 pb-8">
          <p className="text-sm font-semibold uppercase tracking-widest text-gold">
            Legal
          </p>
          <h1 className="mt-2 font-serif text-4xl md:text-5xl font-bold text-navy">
            Privacy Policy
          </h1>
          <p className="mt-3 text-sm text-navy/60">
            Last updated: {new Date().toLocaleDateString("en-US", { month: "long", year: "numeric" })}
          </p>
        </header>

        <section className="prose prose-navy max-w-none space-y-8 text-navy/85 leading-relaxed">
          <p>
            This Privacy Policy describes how {SITE.name} (&ldquo;we,&rdquo;
            &ldquo;us,&rdquo; or &ldquo;our&rdquo;), operated by{" "}
            {EMILY.name}, collects, uses, and shares information about you
            when you visit our website or interact with our services.
          </p>

          <div>
            <h2 className="font-serif text-2xl font-semibold text-navy">
              Information We Collect
            </h2>
            <ul className="mt-3 list-disc space-y-2 pl-6">
              <li>
                <strong>Information you provide:</strong> When you submit a
                contact form, request a consultation, or schedule a call, we
                collect your name, email address, phone number, budget range,
                and any message you choose to share.
              </li>
              <li>
                <strong>Automatic information:</strong> We collect basic
                technical data such as your browser user-agent and the page
                you submitted from, which helps us route inquiries and detect
                spam.
              </li>
              <li>
                <strong>Cookies & analytics:</strong> We may use cookies and
                third-party analytics (such as Google Analytics) to understand
                how visitors use the site. You can disable cookies in your
                browser settings.
              </li>
            </ul>
          </div>

          <div>
            <h2 className="font-serif text-2xl font-semibold text-navy">
              How We Use Your Information
            </h2>
            <ul className="mt-3 list-disc space-y-2 pl-6">
              <li>To respond to your inquiries and schedule consultations.</li>
              <li>To send you information about properties, loan programs, or market updates that you have requested.</li>
              <li>To improve our website, content, and services.</li>
              <li>To comply with legal obligations and protect against fraud.</li>
            </ul>
          </div>

          <div>
            <h2 className="font-serif text-2xl font-semibold text-navy">
              Third-Party Services
            </h2>
            <p className="mt-3">
              We use trusted third-party service providers to operate this
              site, including a managed backend platform for storing form
              submissions and a calendar scheduling tool (Calendly) for
              booking consultations. These providers are bound by their own
              privacy policies and only process your data on our behalf.
            </p>
          </div>

          <div>
            <h2 className="font-serif text-2xl font-semibold text-navy">
              Sharing Your Information
            </h2>
            <p className="mt-3">
              We do not sell your personal information. We may share it with
              lenders, title companies, or other professionals only when you
              specifically ask us to make a referral, or when required by law.
            </p>
          </div>

          <div>
            <h2 className="font-serif text-2xl font-semibold text-navy">
              Your Rights
            </h2>
            <p className="mt-3">
              You may request access to, correction of, or deletion of your
              personal information at any time by emailing us at{" "}
              <a href={EMILY.emailHref} className="text-gold underline">
                {EMILY.email}
              </a>
              . We will respond within a reasonable timeframe.
            </p>
          </div>

          <div>
            <h2 className="font-serif text-2xl font-semibold text-navy">
              Contact
            </h2>
            <p className="mt-3">
              Questions about this policy? Reach {EMILY.name} at{" "}
              <a href={EMILY.emailHref} className="text-gold underline">
                {EMILY.email}
              </a>{" "}
              or{" "}
              <a href={EMILY.phoneHref} className="text-gold underline">
                {EMILY.phone}
              </a>
              .
            </p>
          </div>
        </section>
      </article>
    </PageHead>
  );
};

export default PrivacyPolicy;
