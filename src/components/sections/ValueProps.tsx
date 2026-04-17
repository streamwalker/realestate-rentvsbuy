import { Card } from "@/components/ui/card";
import {
  Lock, Hammer, Leaf, Home, PiggyBank, Palette, Square, GraduationCap,
  TrendingUp, Scale, HeartPulse, Sparkles,
} from "lucide-react";

const VALUES = [
  { icon: Lock, title: "Locked-In Housing Cost", body: "A fixed-rate mortgage means your principal & interest never go up. Rent does — every year." },
  { icon: Hammer, title: "New Construction Warranty", body: "Most San Antonio builders include 1-year workmanship + 10-year structural warranties. Unheard of in rentals." },
  { icon: Leaf, title: "Energy Efficiency", body: "New homes are 2–3× more efficient than older rentals. Lower bills from day one." },
  { icon: Home, title: "Homestead Exemption", body: "Texas homestead exemption can knock $40K+ off your taxable value — savings renters never see." },
  { icon: PiggyBank, title: "Forced Savings", body: "Every payment builds equity. It's the easiest, most disciplined wealth-building habit you can have." },
  { icon: Palette, title: "Freedom & Customization", body: "Paint, renovate, install solar, plant a garden. Your home, your rules." },
  { icon: Square, title: "Space & Privacy", body: "Square foot for square foot, San Antonio homes are dramatically cheaper than apartments." },
  { icon: GraduationCap, title: "School Choice", body: "Buying lets you pick your district — Northside ISD, Alamo Heights, Boerne, you name it." },
  { icon: TrendingUp, title: "Generational Wealth", body: "Real estate is the #1 way American families build inheritable wealth across generations." },
  { icon: Scale, title: "Market Leverage", body: "2026 is shaping up as a buyer's market: more inventory, builder concessions, motivated sellers." },
  { icon: HeartPulse, title: "Stability & Mental Health", body: "No more rent hikes, no more surprise non-renewals. The mental cost of housing instability is real." },
  { icon: Sparkles, title: "2026 Buyer's Market", body: "Rate cuts, builder incentives, and softening prices mean buyers have leverage they haven't had in years." },
];

export const ValueProps = () => (
  <section className="py-16 md:py-24">
    <div className="container">
      <div className="text-center mb-12">
        <p className="text-gold font-semibold uppercase tracking-wider text-sm mb-2">Why Buy</p>
        <h2 className="font-serif text-3xl md:text-5xl font-bold text-navy mb-3">12 reasons your future self will thank you.</h2>
        <p className="text-foreground/70 max-w-2xl mx-auto">
          Beyond the math, here's what you actually get when you stop renting.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-5">
        {VALUES.map((v) => (
          <Card key={v.title} className="p-5 flex gap-4 hover:shadow-card transition-smooth border-l-4 border-l-transparent hover:border-l-gold">
            <div className="shrink-0 grid h-11 w-11 place-items-center rounded-lg bg-navy text-gold">
              <v.icon className="h-5 w-5" />
            </div>
            <div>
              <h3 className="font-serif text-lg font-bold text-navy mb-1">{v.title}</h3>
              <p className="text-sm text-foreground/75 leading-relaxed">{v.body}</p>
            </div>
          </Card>
        ))}
      </div>
    </div>
  </section>
);
