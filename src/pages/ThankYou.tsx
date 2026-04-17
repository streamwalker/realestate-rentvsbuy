import { Link } from "react-router-dom";
import { PageHead } from "@/components/PageHead";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Check } from "lucide-react";
import { EMILY } from "@/config/site";

const ThankYou = () => (
  <>
    <PageHead
      title="Thank you — Emily will be in touch"
      description="Your message was received. Emily Russell will reach out shortly."
      path="/thank-you"
      noIndex
    />
    <section className="py-20 md:py-32 bg-cream/60">
      <div className="container max-w-2xl text-center">
        <div className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-buy text-white mb-6">
          <Check className="h-8 w-8" />
        </div>
        <h1 className="font-serif text-4xl md:text-5xl font-bold text-navy mb-3">Message received.</h1>
        <p className="text-foreground/75 text-lg mb-8">
          Emily will reach out personally — usually within a few hours during business days.
          In the meantime, want to put time on her calendar directly?
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Button asChild size="lg" className="bg-gold text-navy hover:bg-gold/90">
            <a href={EMILY.calendly} target="_blank" rel="noopener noreferrer">Schedule a Call →</a>
          </Button>
          <Button asChild size="lg" variant="outline">
            <Link to="/">Back to homepage</Link>
          </Button>
        </div>

        <Card className="mt-12 p-6 text-left">
          <h2 className="font-serif text-xl font-bold text-navy mb-2">While you wait</h2>
          <ul className="space-y-2 text-sm">
            <li>📊 <Link to="/rent-vs-buy-calculator" className="text-buy hover:underline">Run more scenarios in the calculator</Link></li>
            <li>🏡 <Link to="/loans/va" className="text-buy hover:underline">Read the VA loan deep-dive</Link></li>
            <li>📍 <Link to="/san-antonio" className="text-buy hover:underline">Explore San Antonio neighborhoods</Link></li>
          </ul>
        </Card>
      </div>
    </section>
  </>
);

export default ThankYou;
