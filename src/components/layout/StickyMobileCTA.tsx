import { EMILY } from "@/config/site";
import { Phone } from "lucide-react";

export const StickyMobileCTA = () => (
  <div className="md:hidden fixed bottom-0 inset-x-0 z-30 border-t border-gold/40 bg-navy text-cream shadow-elegant">
    <a
      href={EMILY.phoneHref}
      className="flex items-center justify-center gap-2 py-3.5 text-base font-semibold active:bg-navy-deep transition-smooth"
    >
      <Phone className="h-4 w-4 text-gold" />
      <span>📞 Talk to Emily</span>
      <span className="text-gold/80 text-sm font-normal">— Free Consultation</span>
    </a>
  </div>
);
