import { Link, NavLink as RouterNavLink } from "react-router-dom";
import { useState } from "react";
import { Menu, X, Home } from "lucide-react";
import { Button } from "@/components/ui/button";
import { EMILY } from "@/config/site";
import { cn } from "@/lib/utils";

const navLinks = [
  { to: "/rent-vs-buy-calculator", label: "Calculator" },
  { to: "/loans/va", label: "Loans" },
  { to: "/san-antonio", label: "Neighborhoods" },
  { to: "/first-time-buyer-guide", label: "Resources" },
  { to: "/about", label: "About" },
  { to: "/contact", label: "Contact" },
];

export const Header = () => {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 w-full border-b border-border/60 bg-background/85 backdrop-blur supports-[backdrop-filter]:bg-background/70">
      <div className="container flex h-16 items-center justify-between">
        <Link to="/" className="flex items-center gap-2 group" onClick={() => setOpen(false)}>
          <span className="grid h-9 w-9 place-items-center rounded-md bg-navy text-gold transition-smooth group-hover:bg-navy-deep">
            <Home className="h-4 w-4" />
          </span>
          <span className="font-serif text-lg font-bold leading-none text-navy">
            rentvsbuy<span className="text-gold">house</span>
          </span>
        </Link>

        <nav className="hidden md:flex items-center gap-1">
          {navLinks.map((l) => (
            <RouterNavLink
              key={l.to}
              to={l.to}
              className={({ isActive }) =>
                cn(
                  "px-3 py-2 text-sm font-medium rounded-md transition-smooth",
                  isActive ? "text-navy bg-gold/15" : "text-foreground/80 hover:text-navy hover:bg-muted",
                )
              }
            >
              {l.label}
            </RouterNavLink>
          ))}
          <Button asChild variant="default" size="sm" className="ml-2 bg-gold text-navy hover:bg-gold/90">
            <a href={EMILY.phoneHref}>📞 Talk to Emily</a>
          </Button>
        </nav>

        <button
          aria-label={open ? "Close menu" : "Open menu"}
          className="md:hidden p-2 -mr-2 rounded-md hover:bg-muted"
          onClick={() => setOpen(!open)}
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {open && (
        <div className="md:hidden border-t border-border bg-background animate-fade-in">
          <nav className="container flex flex-col py-3">
            {navLinks.map((l) => (
              <RouterNavLink
                key={l.to}
                to={l.to}
                onClick={() => setOpen(false)}
                className={({ isActive }) =>
                  cn(
                    "px-3 py-3 text-base font-medium rounded-md",
                    isActive ? "text-navy bg-gold/15" : "text-foreground/80",
                  )
                }
              >
                {l.label}
              </RouterNavLink>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
};
