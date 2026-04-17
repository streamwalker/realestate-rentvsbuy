import { Link } from "react-router-dom";
import { PageHead } from "@/components/PageHead";
import { Card } from "@/components/ui/card";

const POSTS = [
  {
    slug: "san-antonio-housing-market-2026",
    title: "San Antonio Housing Market Outlook — 2026",
    excerpt: "Inventory is up, builders are stacking incentives, and rates are easing. Here's what San Antonio buyers should expect this year.",
    date: "April 2026",
  },
  {
    slug: "fha-vs-va-vs-conventional",
    title: "FHA vs. VA vs. Conventional — Which Loan Wins?",
    excerpt: "A side-by-side comparison of the three most common loan types for San Antonio buyers, with real-dollar examples.",
    date: "March 2026",
  },
  {
    slug: "negotiating-with-san-antonio-builders",
    title: "How to Negotiate with San Antonio New-Construction Builders",
    excerpt: "Builders won't move on price — but they will move on incentives. Here's exactly what to ask for.",
    date: "February 2026",
  },
];

const Blog = () => (
  <>
    <PageHead
      title="Blog — San Antonio Real Estate Insights"
      description="Articles, market updates, and deep-dives on San Antonio real estate from Emily Russell."
      path="/blog"
      breadcrumbs={[{ name: "Home", path: "/" }, { name: "Blog", path: "/blog" }]}
    />
    <section className="bg-gradient-hero text-cream py-14 md:py-20">
      <div className="container max-w-4xl">
        <p className="text-gold uppercase tracking-wider text-sm font-semibold mb-3">Blog</p>
        <h1 className="font-serif text-4xl md:text-6xl font-bold">San Antonio Real Estate Insights</h1>
        <p className="text-cream/85 text-lg mt-4">Market updates, loan deep-dives, and zero-fluff guidance.</p>
      </div>
    </section>
    <section className="py-14">
      <div className="container max-w-4xl grid md:grid-cols-2 gap-5">
        {POSTS.map((p) => (
          <Card key={p.slug} className="p-6 hover:shadow-elegant transition-smooth">
            <div className="text-xs uppercase tracking-wider text-gold font-semibold mb-2">{p.date}</div>
            <h2 className="font-serif text-2xl font-bold text-navy mb-2">{p.title}</h2>
            <p className="text-foreground/75 mb-4">{p.excerpt}</p>
            <Link to={`/blog/${p.slug}`} className="text-buy font-semibold hover:underline">Read article →</Link>
          </Card>
        ))}
      </div>
    </section>
  </>
);

export default Blog;
