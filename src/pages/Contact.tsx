import { PageHead } from "@/components/PageHead";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { LeadForm } from "@/components/forms/LeadForm";
import { EMILY } from "@/config/site";
import { Phone, Mail, MapPin, Calendar } from "lucide-react";

const Contact = () => (
  <>
    <PageHead
      title="Contact Emily Russell — San Antonio Realtor"
      description="Reach Emily Russell directly: phone, email, or schedule a free consultation. San Antonio real estate guidance with zero pressure."
      path="/contact"
      breadcrumbs={[{ name: "Home", path: "/" }, { name: "Contact", path: "/contact" }]}
    />

    <section className="bg-gradient-hero text-cream py-14 md:py-20">
      <div className="container max-w-4xl">
        <p className="text-gold uppercase tracking-wider text-sm font-semibold mb-3">Contact</p>
        <h1 className="font-serif text-4xl md:text-6xl font-bold leading-tight">Talk to Emily</h1>
        <p className="text-cream/85 text-lg max-w-2xl mt-4">
          Phone, email, or schedule a free consultation. Whatever works for you.
        </p>
      </div>
    </section>

    <section className="py-14">
      <div className="container max-w-5xl grid md:grid-cols-2 gap-8">
        <div className="space-y-4">
          <Card className="p-6 flex items-start gap-4">
            <Phone className="h-6 w-6 text-gold mt-1" />
            <div>
              <div className="text-xs uppercase tracking-wider text-foreground/60 font-semibold">Call or text</div>
              <a href={EMILY.phoneHref} className="font-serif text-2xl font-bold text-navy hover:text-gold">{EMILY.phone}</a>
            </div>
          </Card>
          <Card className="p-6 flex items-start gap-4">
            <Mail className="h-6 w-6 text-gold mt-1" />
            <div className="min-w-0">
              <div className="text-xs uppercase tracking-wider text-foreground/60 font-semibold">Email</div>
              <a href={EMILY.emailHref} className="font-serif text-xl font-bold text-navy hover:text-gold break-all">{EMILY.email}</a>
            </div>
          </Card>
          <Card className="p-6 flex items-start gap-4">
            <MapPin className="h-6 w-6 text-gold mt-1" />
            <div>
              <div className="text-xs uppercase tracking-wider text-foreground/60 font-semibold">Service Area</div>
              <div className="font-semibold text-navy">San Antonio, TX & surrounding areas</div>
              <p className="text-sm text-foreground/70 mt-1">Stone Oak · Alamo Ranch · Helotes · Boerne · Schertz · Cibolo · New Braunfels</p>
            </div>
          </Card>
          <Card className="p-6 flex items-start gap-4">
            <Calendar className="h-6 w-6 text-gold mt-1" />
            <div className="flex-1">
              <div className="text-xs uppercase tracking-wider text-foreground/60 font-semibold">Schedule directly</div>
              <p className="text-sm text-foreground/70 mt-1 mb-3">Pick a time that works for you.</p>
              <Button asChild size="sm" className="bg-gold text-navy hover:bg-gold/90">
                <a href={EMILY.calendly} target="_blank" rel="noopener noreferrer">Open Calendar</a>
              </Button>
            </div>
          </Card>
        </div>

        <Card className="p-6 md:p-8">
          <h2 className="font-serif text-2xl font-bold text-navy mb-2">Send a message</h2>
          <p className="text-sm text-foreground/70 mb-5">Replies usually within a few hours during business days.</p>
          <LeadForm source="contact-page" />
        </Card>
      </div>
    </section>

    {/* TODO: replace with real Google Maps embed key */}
    <section className="py-10">
      <div className="container max-w-5xl">
        <div className="aspect-[16/7] rounded-lg overflow-hidden bg-muted grid place-items-center text-foreground/50 text-sm border">
          Google Map placeholder — paste your embed code here
        </div>
      </div>
    </section>
  </>
);

export default Contact;
