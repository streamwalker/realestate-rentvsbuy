import { Helmet } from "react-helmet-async";
import { ReactNode } from "react";
import { SEO } from "@/components/SEO";
import { breadcrumbSchema, realEstateAgentSchema, websiteSchema, speakableSchema } from "@/lib/schema";

interface PageHeadProps {
  title: string;
  description: string;
  path: string;
  image?: string;
  jsonLd?: object | object[];
  breadcrumbs?: Array<{ name: string; path: string }>;
  noIndex?: boolean;
  children?: ReactNode;
}

export const PageHead = ({ title, description, path, image, jsonLd = [], breadcrumbs, noIndex, children }: PageHeadProps) => {
  const ldArray = Array.isArray(jsonLd) ? jsonLd : [jsonLd];
  const all: object[] = [websiteSchema, realEstateAgentSchema, speakableSchema, ...ldArray];
  if (breadcrumbs && breadcrumbs.length > 0) all.push(breadcrumbSchema(breadcrumbs));
  return (
    <>
      <SEO title={title} description={description} path={path} image={image} jsonLd={all} noIndex={noIndex} />
      {children}
    </>
  );
};
