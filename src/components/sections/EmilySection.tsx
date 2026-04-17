import { Phone, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { LeadForm } from "@/components/forms/LeadForm";
import { EMILY } from "@/config/site";
import emilyPhoto from "@/assets/emily-russell.jpg";

interface Props {
  source?: string;
  compact?: boolean;
}

export const EmilySection = ({ source = "homepage", compact = false }: Props) => (
  <section className="bg-navy text-cream py-16 md:py-24">
    <div className="container">
      <div className="grid lg:grid-cols-2 gap-12 items-center">
        <div>
          <p className="text-gold font-semibold uppercase tracking-wider text-sm mb-3">Meet Your Realtor</p>
          <h2 className="font-serif text-4xl md:text-5xl font-bold leading-tight mb-2">
            Emily Russell
          </h2>
          <p className="font-serif text-xl md:text-2xl text-gold mb-6">
            Your guide through every price point.
          </p>

          <div className="flex items-center gap-5 mb-6">
            <div className="relative shrink-0">
              <div className="absolute inset-0 rounded-full bg-gradient-gold blur-md opacity-50" />
              <img
                src={emilyPhoto}
                alt="Portrait of Emily Russell, San Antonio Realtor"
                width={140}
                height={140}
                className="relative h-32 w-32 md:h-36 md:w-36 rounded-full object-cover border-4 border-gold shadow-gold"
              />
            </div>
            <div className="text-sm text-cream/85 leading-relaxed">{EMILY.bio.split(".")[0]}.</div>
          </div>

          {!compact && (
            <p className="text-cream/85 leading-relaxed mb-6">{EMILY.bio}</p>
          )}

          <div className="flex flex-wrap gap-2 mb-7">
            {EMILY.specialties.map((s) => (
              <span key={s} className="px-3 py-1 rounded-full bg-cream/10 border border-gold/30 text-xs font-medium text-cream">
                {s}
              </span>
            ))}
          </div>

          <div className="flex flex-col sm:flex-row gap-3">
            <Button asChild size="lg" className="bg-gold text-navy hover:bg-gold/90 shadow-gold">
              <a href={EMILY.phoneHref}><Phone className="h-4 w-4" /> Call Emily Now</a>
            </Button>
            <Button asChild size="lg" variant="outline" className="border-cream/40 text-cream bg-transparent hover:bg-cream/10">
              <a href={EMILY.emailHref}><Mail className="h-4 w-4" /> Send a Message</a>
            </Button>
          </div>
        </div>

        <Card className="p-6 md:p-8 bg-cream text-foreground shadow-elegant">
          <h3 className="font-serif text-2xl font-bold text-navy mb-1">Get Emily's free analysis</h3>
          <p className="text-sm text-foreground/70 mb-5">
            Tell her your situation. She'll run the numbers for your scenario — no pressure, no spam.
          </p>
          <LeadForm source={source} />
        </Card>
      </div>
    </div>
  </section>
);
