import { Link, useParams } from "react-router-dom";
import { PageHead } from "@/components/PageHead";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { articleSchema } from "@/lib/schema";
import { EmilySection } from "@/components/sections/EmilySection";

const POSTS: Record<string, { title: string; date: string; description: string; body: string[] }> = {
  "san-antonio-housing-market-2026": {
    title: "San Antonio Housing Market Outlook — 2026",
    date: "2026-04-01",
    description: "Inventory is up, builders are stacking incentives, and rates are easing. Here's what San Antonio buyers should expect in 2026.",
    body: [
      "After two years of constrained supply, San Antonio's housing market enters 2026 with the most buyer-friendly conditions we've seen since 2019. Active inventory is up roughly 35% year-over-year, and median days-on-market has stretched from 28 to 51.",
      "What this means for buyers: more time to think, more leverage on price, and substantially better negotiation outcomes on inspection items and closing cost concessions.",
      "Builders are particularly motivated. Lennar, D.R. Horton, and KB Home are routinely offering $15,000–$20,000 in incentives on standing inventory, plus rate buy-downs that bring effective interest rates into the 4.5–5% range.",
      "Mortgage rates have eased modestly from their late-2024 highs but remain elevated. Most San Antonio buyers should plan around a 6.0–6.5% conventional rate, with VA and FHA running about 0.25% lower.",
      "The takeaway: 2026 is the year to buy if your finances are ready. Waiting for rates to drop further is gambling with continued rent payments and opportunity cost.",
    ],
  },
  "fha-vs-va-vs-conventional": {
    title: "FHA vs. VA vs. Conventional — Which Loan Wins?",
    date: "2026-03-15",
    description: "Side-by-side comparison of the three most common loan types for San Antonio buyers.",
    body: [
      "Loan choice is the single most consequential decision after the home itself. The wrong loan costs tens of thousands over the life of the loan; the right one can mean the difference between buying this year and waiting two more.",
      "VA wins for anyone eligible. Period. Zero down, no PMI, and the Texas property tax exemption stacking make this almost always the best deal.",
      "FHA wins for first-time buyers without VA eligibility, especially when stacked with HIP 80 or TSAHC. The 3.5% down payment is forgiving, and credit standards are looser than conventional.",
      "Conventional wins for buyers with 700+ credit and 10%+ down. You'll get better long-term economics by avoiding life-of-loan mortgage insurance.",
    ],
  },
  "negotiating-with-san-antonio-builders": {
    title: "How to Negotiate with San Antonio New-Construction Builders",
    date: "2026-02-20",
    description: "Builders won't move on price — but they will move on incentives. Here's exactly what to ask for.",
    body: [
      "First rule of builder negotiation: you can't move base price. Builder pricing is driven by comp protection — moving the price for one buyer hurts every other home in the community.",
      "What you can move: closing cost coverage (often $10K–$20K), rate buy-downs (down to 4.5–5%), free upgrades (refrigerator, blinds, fence), and lot premium waivers.",
      "Always tour with your own buyer's agent. The builder sales rep represents the builder — they're not on your side, no matter how friendly they are.",
      "Standing inventory at quarter-end is your friend. Builders need to hit unit targets, and a unit that's been sitting for 60+ days is your highest-leverage opportunity.",
    ],
  },
};

const BlogPost = () => {
  const { slug } = useParams<{ slug: string }>();
  const post = slug ? POSTS[slug] : undefined;

  if (!post) {
    return (
      <section className="py-20 text-center container">
        <h1 className="font-serif text-3xl text-navy">Article not found</h1>
        <Link to="/blog" className="text-buy hover:underline mt-4 inline-block">← Back to blog</Link>
      </section>
    );
  }

  const path = `/blog/${slug}`;
  return (
    <>
      <PageHead
        title={post.title}
        description={post.description}
        path={path}
        jsonLd={[articleSchema({ title: post.title, description: post.description, path, datePublished: post.date })]}
        breadcrumbs={[{ name: "Home", path: "/" }, { name: "Blog", path: "/blog" }, { name: post.title, path }]}
      />
      <article className="py-14 container max-w-3xl">
        <Link to="/blog" className="text-sm text-buy hover:underline">← All articles</Link>
        <div className="text-xs uppercase tracking-wider text-gold font-semibold mt-6 mb-3">
          {new Date(post.date).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}
        </div>
        <h1 className="font-serif text-4xl md:text-5xl font-bold text-navy mb-6 leading-tight">{post.title}</h1>
        <div className="prose prose-lg max-w-none">
          {post.body.map((p, i) => (
            <p key={i} className="text-foreground/85 leading-relaxed mb-5">{p}</p>
          ))}
        </div>
        <Card className="mt-12 p-6 bg-navy text-cream text-center">
          <h3 className="font-serif text-xl font-bold mb-2">Questions about this?</h3>
          <Button asChild className="bg-gold text-navy hover:bg-gold/90 mt-2">
            <Link to="/contact">Talk to Emily →</Link>
          </Button>
        </Card>
      </article>
      <EmilySection source={`blog-${slug}`} compact />
    </>
  );
};

export default BlogPost;
