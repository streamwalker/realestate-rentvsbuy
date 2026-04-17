export interface NeighborhoodData {
  slug: string;
  name: string;
  blurb: string;
  medianPrice: number;
  avgRent: number;
  schoolDistrict: string;
  amenities: string[];
  highlights: string;
  defaultOfferPrice: number;
  defaultRent: number;
}

const make = (d: NeighborhoodData): NeighborhoodData => d;

export const NEIGHBORHOOD_DATA: Record<string, NeighborhoodData> = {
  "san-antonio": make({
    slug: "san-antonio", name: "San Antonio",
    blurb: "Texas's seventh-largest city and the heart of South-Central Texas — historic, family-friendly, and one of the most affordable major metros in the U.S.",
    medianPrice: 252000, avgRent: 1495, schoolDistrict: "Multiple ISDs (NEISD, NISD, SAISD, NSISD)",
    amenities: ["River Walk", "Pearl District", "Six Flags", "JBSA", "USAA HQ", "South Texas Medical Center"],
    highlights: "San Antonio offers the rare combination of major-metro amenities and small-city affordability. Median home price is roughly half of Austin's, with no state income tax and a property tax structure that rewards homeowners through the homestead exemption.",
    defaultOfferPrice: 252000, defaultRent: 1495,
  }),
  "san-antonio/stone-oak": make({
    slug: "san-antonio/stone-oak", name: "Stone Oak",
    blurb: "Upscale master-planned community in far north San Antonio with top-rated NEISD schools and easy 281 access.",
    medianPrice: 425000, avgRent: 1850, schoolDistrict: "North East ISD (NEISD)",
    amenities: ["The Rim shopping", "Stone Oak Park", "Methodist Stone Oak Hospital", "TPC San Antonio"],
    highlights: "Stone Oak is San Antonio's flagship suburban community — manicured neighborhoods, top-tier schools, and a strong resale market. Median home prices have appreciated steadily for over a decade.",
    defaultOfferPrice: 425000, defaultRent: 1850,
  }),
  "san-antonio/alamo-ranch": make({
    slug: "san-antonio/alamo-ranch", name: "Alamo Ranch",
    blurb: "One of San Antonio's fastest-growing master-planned communities on the far west side — heavy new construction inventory and builder incentives.",
    medianPrice: 335000, avgRent: 1750, schoolDistrict: "Northside ISD (NISD)",
    amenities: ["Alamo Ranch Town Center", "Government Canyon State Natural Area", "Loop 1604 access"],
    highlights: "Alamo Ranch is where San Antonio buyers go for new construction value. Lennar, D.R. Horton, KB Home, and Pulte all have active inventory with closing cost incentives and rate buy-downs.",
    defaultOfferPrice: 335000, defaultRent: 1750,
  }),
  "san-antonio/medical-center": make({
    slug: "san-antonio/medical-center", name: "Medical Center",
    blurb: "Centrally located near the South Texas Medical Center — strong rental demand, walkable to major hospitals.",
    medianPrice: 285000, avgRent: 1550, schoolDistrict: "Northside ISD (NISD)",
    amenities: ["Methodist Hospital", "UT Health San Antonio", "Crown Ridge", "USAA campus"],
    highlights: "Medical Center is a top pick for healthcare professionals and investors. Proximity to 75,000+ medical employees keeps rental demand strong year-round.",
    defaultOfferPrice: 285000, defaultRent: 1550,
  }),
  "san-antonio/downtown-pearl": make({
    slug: "san-antonio/downtown-pearl", name: "Downtown / Pearl",
    blurb: "Urban core with the Pearl District's renaissance — walkable, food-scene-rich, and increasingly residential.",
    medianPrice: 395000, avgRent: 1950, schoolDistrict: "San Antonio ISD (SAISD)",
    amenities: ["Pearl Brewery", "River Walk", "Hotel Emma", "Southtown arts district"],
    highlights: "Downtown and the Pearl have transformed San Antonio's urban living scene. Loft conversions, new condos, and walkable amenities make this the rare Texas downtown that's actually livable.",
    defaultOfferPrice: 395000, defaultRent: 1950,
  }),
  "san-antonio/helotes": make({
    slug: "san-antonio/helotes", name: "Helotes",
    blurb: "Northwest suburb with Hill Country charm, top schools, and many areas that qualify for USDA 0% down financing.",
    medianPrice: 410000, avgRent: 1900, schoolDistrict: "Northside ISD (NISD)",
    amenities: ["Old Town Helotes", "Government Canyon", "Bandera Road shopping"],
    highlights: "Helotes blends suburban convenience with Hill Country character. Many parts of Helotes still qualify for USDA loans, making 0% down possible on million-dollar-plus homes.",
    defaultOfferPrice: 410000, defaultRent: 1900,
  }),
  "san-antonio/converse": make({
    slug: "san-antonio/converse", name: "Converse",
    blurb: "Northeast suburb popular with JBSA-Randolph families — affordable, military-friendly, easy commutes.",
    medianPrice: 245000, avgRent: 1450, schoolDistrict: "Judson ISD",
    amenities: ["Randolph AFB proximity", "Converse City Park", "I-35 / Loop 1604 access"],
    highlights: "Converse is one of the most popular zip codes for VA-loan buyers in South Texas. Affordable inventory, easy access to JBSA-Randolph, and growing new construction.",
    defaultOfferPrice: 245000, defaultRent: 1450,
  }),
  "san-antonio/schertz": make({
    slug: "san-antonio/schertz", name: "Schertz",
    blurb: "Family-friendly Guadalupe County suburb with award-winning SCUC ISD schools and strong appreciation.",
    medianPrice: 325000, avgRent: 1750, schoolDistrict: "Schertz-Cibolo-Universal City ISD (SCUC)",
    amenities: ["Forum at Olympia Parkway", "Schertz Family YMCA", "Randolph AFB proximity"],
    highlights: "Schertz consistently ranks among the best Texas suburbs for families. SCUC ISD is one of the top public school districts in the San Antonio metro.",
    defaultOfferPrice: 325000, defaultRent: 1750,
  }),
  "san-antonio/cibolo": make({
    slug: "san-antonio/cibolo", name: "Cibolo",
    blurb: "Fast-growing Guadalupe County suburb with master-planned communities and excellent schools.",
    medianPrice: 350000, avgRent: 1800, schoolDistrict: "Schertz-Cibolo-Universal City ISD (SCUC)",
    amenities: ["Cibolo Creek", "Niemietz Park", "Master-planned communities"],
    highlights: "Cibolo is one of the fastest-growing cities in Texas. Strong school ratings, new construction inventory, and proximity to Randolph AFB drive sustained demand.",
    defaultOfferPrice: 350000, defaultRent: 1800,
  }),
  "san-antonio/new-braunfels": make({
    slug: "san-antonio/new-braunfels", name: "New Braunfels",
    blurb: "Hill Country charm halfway between San Antonio and Austin — Schlitterbahn, the Comal River, and serious appreciation.",
    medianPrice: 385000, avgRent: 1850, schoolDistrict: "New Braunfels ISD / Comal ISD",
    amenities: ["Schlitterbahn", "Comal River", "Gruene Historic District", "Landa Park"],
    highlights: "New Braunfels has been one of the fastest-appreciating markets in Texas. Hill Country lifestyle with access to both metros makes it especially attractive for remote workers.",
    defaultOfferPrice: 385000, defaultRent: 1850,
  }),
  "san-antonio/boerne": make({
    slug: "san-antonio/boerne", name: "Boerne",
    blurb: "Quintessential Texas Hill Country town northwest of San Antonio — premium schools, scenic landscapes, strong luxury inventory.",
    medianPrice: 525000, avgRent: 2200, schoolDistrict: "Boerne ISD",
    amenities: ["Cibolo Nature Center", "Boerne Lake", "Main Street historic district", "Cave Without A Name"],
    highlights: "Boerne is San Antonio's Hill Country gateway. Boerne ISD consistently ranks among the top Texas school districts. Mix of historic homes, new luxury construction, and acreage properties.",
    defaultOfferPrice: 525000, defaultRent: 2200,
  }),
};
