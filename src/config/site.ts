// Centralized site configuration — swap these values when ready
export const SITE = {
  name: "rentvsbuyhouse.com",
  domain: "rentvsbuyhouse.com",
  url: "https://rentvsbuyhouse.com",
  tagline: "Stop Paying Someone Else's Mortgage",
  description:
    "Data-driven calculators, loan program guides, and expert San Antonio real estate guidance from Emily Russell. Should you rent or buy?",
} as const;

// TODO: replace with Emily's real contact info
export const EMILY = {
  name: "Emily Russell",
  title: "Realtor® — San Antonio, TX",
  phone: "+1 (210) 987-4165",
  phoneHref: "tel:+12109874165",
  email: "emily@streamwalkers.com",
  emailHref: "mailto:emily@streamwalkers.com",
  bio:
    "Emily Russell is a San Antonio Realtor® on a mission to demystify the homebuying process for clients at every price point — from $180K starter homes to multi-million dollar estates. Her approach is zero-pressure, data-first, and built around making sure you understand every dollar before you sign anything.",
  specialties: [
    "First-Time Buyers",
    "VA Loans",
    "New Construction",
    "Luxury Estates",
    "Investment Properties",
    "Relocations",
  ],
  // TODO: replace with real Calendly link
  calendly: "https://calendly.com/",
  // TODO: replace with real photo
  photo: "/emily-placeholder.svg",
} as const;

export interface NeighborhoodNav {
  slug: string;
  name: string;
  flagship?: boolean;
}

export const NEIGHBORHOODS: NeighborhoodNav[] = [
  { slug: "san-antonio", name: "San Antonio", flagship: true },
  { slug: "san-antonio/stone-oak", name: "Stone Oak" },
  { slug: "san-antonio/alamo-ranch", name: "Alamo Ranch" },
  { slug: "san-antonio/medical-center", name: "Medical Center" },
  { slug: "san-antonio/downtown-pearl", name: "Downtown / Pearl" },
  { slug: "san-antonio/helotes", name: "Helotes" },
  { slug: "san-antonio/converse", name: "Converse" },
  { slug: "san-antonio/schertz", name: "Schertz" },
  { slug: "san-antonio/cibolo", name: "Cibolo" },
  { slug: "san-antonio/new-braunfels", name: "New Braunfels" },
  { slug: "san-antonio/boerne", name: "Boerne" },
];

export const LOANS = [
  { slug: "fha", name: "FHA Loan", short: "3.5% down" },
  { slug: "va", name: "VA Loan", short: "0% down for veterans" },
  { slug: "usda", name: "USDA Loan", short: "0% down rural" },
  { slug: "conventional", name: "Conventional Loan", short: "3%–20% down" },
  { slug: "dpa", name: "Down Payment Assistance", short: "HIP 80, TSAHC, TDHCA" },
] as const;

// TODO: paste real GA4 ID when ready
export const ANALYTICS = {
  ga4: "" as string,
} as const;
