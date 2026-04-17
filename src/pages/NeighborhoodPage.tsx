import { useParams, Navigate, Link } from "react-router-dom";
import { PageHead } from "@/components/PageHead";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { RentVsBuyCalculator } from "@/components/calculator/RentVsBuyCalculator";
import { EmilySection } from "@/components/sections/EmilySection";
import { NEIGHBORHOOD_DATA } from "@/data/neighborhoods";
import { fmt$ } from "@/lib/finance";
import { NEIGHBORHOODS } from "@/config/site";

const NeighborhoodPage = () => {
  const params = useParams();
  const slug = params["*"]
    ? `san-antonio/${params["*"]}`
    : params.slug ?? "san-antonio";

  // Top-level /san-antonio uses just "san-antonio"
  const lookupKey = slug === "san-antonio/" ? "san-antonio" : slug;
  const data = NEIGHBORHOOD_DATA[lookupKey];

  if (!data) return <Navigate to="/san-antonio" replace />;

  const path = `/${data.slug}`;
  const isFlagship = data.slug === "san-antonio";

  return (
    <>
      <PageHead
        title={`${data.name} Real Estate — Rent vs. Buy`}
        description={`${data.name} home prices, rent comparison, schools, and a calculator pre-filled with local market defaults. Median home: ${fmt$(data.medianPrice)}. ${data.blurb}`}
        path={path}
        breadcrumbs={[
          { name: "Home", path: "/" },
          { name: "Neighborhoods", path: "/san-antonio" },
          ...(isFlagship ? [] : [{ name: data.name, path }]),
        ]}
      />

      <section className="bg-gradient-hero text-cream py-14 md:py-20">
        <div className="container max-w-5xl">
          <p className="text-gold uppercase tracking-wider text-sm font-semibold mb-3">
            {isFlagship ? "Flagship Market" : "San Antonio Neighborhood"}
          </p>
          <h1 className="font-serif text-4xl md:text-6xl font-bold leading-tight mb-4" data-speakable>
            {data.name} — Rent vs. Buy
          </h1>
          <p className="text-cream/85 text-lg max-w-3xl">{data.blurb}</p>
        </div>
      </section>

      <section className="py-12">
        <div className="container max-w-5xl grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card className="p-5">
            <div className="text-xs uppercase tracking-wider text-gold font-semibold mb-1">Median Home</div>
            <div className="font-serif text-3xl font-bold text-navy">{fmt$(data.medianPrice)}</div>
          </Card>
          <Card className="p-5">
            <div className="text-xs uppercase tracking-wider text-gold font-semibold mb-1">Avg Rent</div>
            <div className="font-serif text-3xl font-bold text-navy">{fmt$(data.avgRent)}<span className="text-base font-sans text-foreground/60">/mo</span></div>
          </Card>
          <Card className="p-5">
            <div className="text-xs uppercase tracking-wider text-gold font-semibold mb-1">School District</div>
            <div className="font-semibold text-navy text-sm leading-snug">{data.schoolDistrict}</div>
          </Card>
          <Card className="p-5">
            <div className="text-xs uppercase tracking-wider text-gold font-semibold mb-1">Updated</div>
            <div className="font-semibold text-navy">April 2026</div>
          </Card>
        </div>

        <div className="container max-w-3xl mt-10">
          <h2 className="font-serif text-2xl font-bold text-navy mb-3">About {data.name}</h2>
          <p className="text-foreground/85 leading-relaxed mb-5">{data.highlights}</p>
          <h3 className="font-serif text-xl font-bold text-navy mb-2">Local Amenities</h3>
          <div className="flex flex-wrap gap-2">
            {data.amenities.map((a) => (
              <span key={a} className="px-3 py-1 rounded-full bg-cream border border-gold/30 text-sm">{a}</span>
            ))}
          </div>
        </div>
      </section>

      <section className="py-12 bg-cream/40">
        <div className="container">
          <div className="text-center mb-8">
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-navy">
              {data.name} Calculator
            </h2>
            <p className="text-foreground/70 mt-2">Pre-filled with {data.name} market defaults.</p>
          </div>
          <RentVsBuyCalculator
            initialBuyer={{ offerPrice: data.defaultOfferPrice }}
            initialRenter={{ monthlyRent: data.defaultRent }}
          />
        </div>
      </section>

      {isFlagship && (
        <section className="py-12">
          <div className="container max-w-5xl">
            <h2 className="font-serif text-3xl font-bold text-navy mb-6 text-center">Explore Neighborhoods</h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {NEIGHBORHOODS.filter((n) => !n.flagship).map((n) => (
                <Link key={n.slug} to={`/${n.slug}`}>
                  <Card className="p-5 hover:shadow-elegant hover:-translate-y-0.5 transition-smooth h-full">
                    <h3 className="font-serif text-xl font-bold text-navy">{n.name}</h3>
                    <p className="text-sm text-foreground/70 mt-1">
                      {NEIGHBORHOOD_DATA[n.slug]?.blurb.slice(0, 80)}…
                    </p>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      <div className="container max-w-3xl py-10 text-center">
        <Card className="bg-navy text-cream p-8">
          <h3 className="font-serif text-2xl font-bold mb-2">Buying or selling in {data.name}?</h3>
          <p className="text-cream/80 mb-5">Emily knows this market street-by-street.</p>
          <Button asChild size="lg" className="bg-gold text-navy hover:bg-gold/90">
            <Link to="/contact">Talk to Emily →</Link>
          </Button>
        </Card>
      </div>

      <EmilySection source={`neighborhood-${data.slug}`} compact />
    </>
  );
};

export default NeighborhoodPage;
