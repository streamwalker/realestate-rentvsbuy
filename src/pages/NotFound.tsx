import { Link, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { PageHead } from "@/components/PageHead";
import { Button } from "@/components/ui/button";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 — non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <>
      <PageHead
        title="Page not found"
        description="The page you're looking for doesn't exist. Head back to the rent vs. buy calculator or browse San Antonio neighborhoods."
        path={location.pathname}
        noIndex
      />
      <section className="py-20 md:py-32 bg-cream/60 min-h-[60vh] grid place-items-center">
        <div className="container max-w-2xl text-center">
          <p className="text-gold uppercase tracking-wider text-sm font-semibold mb-3">404</p>
          <h1 className="font-serif text-4xl md:text-6xl font-bold text-navy mb-4">Page not found.</h1>
          <p className="text-foreground/75 text-lg mb-8">
            The page you're looking for moved or never existed. Try one of these instead:
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Button asChild size="lg" className="bg-gold text-navy hover:bg-gold/90">
              <Link to="/">Back to homepage</Link>
            </Button>
            <Button asChild size="lg" variant="outline">
              <Link to="/rent-vs-buy-calculator">Open the calculator</Link>
            </Button>
          </div>
        </div>
      </section>
    </>
  );
};

export default NotFound;
