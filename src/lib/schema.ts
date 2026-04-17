import { SITE, EMILY } from "@/config/site";

export const realEstateAgentSchema = {
  "@context": "https://schema.org",
  "@type": "RealEstateAgent",
  name: EMILY.name,
  jobTitle: EMILY.title,
  telephone: EMILY.phone,
  email: EMILY.email,
  url: SITE.url,
  image: `${SITE.url}${EMILY.photo}`,
  areaServed: [
    { "@type": "City", name: "San Antonio" },
    { "@type": "AdministrativeArea", name: "Bexar County" },
    { "@type": "State", name: "Texas" },
  ],
  knowsAbout: [...EMILY.specialties],
};

export const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "@id": SITE.url,
  name: SITE.name,
  url: SITE.url,
  telephone: EMILY.phone,
  description: SITE.description,
  address: {
    "@type": "PostalAddress",
    addressLocality: "San Antonio",
    addressRegion: "TX",
    addressCountry: "US",
  },
  areaServed: { "@type": "City", name: "San Antonio" },
};

export const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  url: SITE.url,
  name: SITE.name,
  description: SITE.description,
  potentialAction: {
    "@type": "SearchAction",
    target: `${SITE.url}/blog?q={search_term_string}`,
    "query-input": "required name=search_term_string",
  },
};

export const breadcrumbSchema = (items: Array<{ name: string; path: string }>) => ({
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: items.map((item, i) => ({
    "@type": "ListItem",
    position: i + 1,
    name: item.name,
    item: `${SITE.url}${item.path}`,
  })),
});

export const faqSchema = (faqs: Array<{ q: string; a: string }>) => ({
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((f) => ({
    "@type": "Question",
    name: f.q,
    acceptedAnswer: { "@type": "Answer", text: f.a },
  })),
});

export const speakableSchema = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  speakable: {
    "@type": "SpeakableSpecification",
    cssSelector: ["h1", ".speakable", "[data-speakable]"],
  },
};

export const articleSchema = (opts: { title: string; description: string; path: string; datePublished: string; image?: string }) => ({
  "@context": "https://schema.org",
  "@type": "Article",
  headline: opts.title,
  description: opts.description,
  image: opts.image ?? `${SITE.url}/og-default.jpg`,
  author: { "@type": "Person", name: EMILY.name },
  publisher: {
    "@type": "Organization",
    name: SITE.name,
    logo: { "@type": "ImageObject", url: `${SITE.url}/logo.svg` },
  },
  datePublished: opts.datePublished,
  mainEntityOfPage: `${SITE.url}${opts.path}`,
});
