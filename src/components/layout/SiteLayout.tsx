import { Header } from "./Header";
import { Footer } from "./Footer";
import { StickyMobileCTA } from "./StickyMobileCTA";
import { ReactNode } from "react";

export const SiteLayout = ({ children }: { children: ReactNode }) => (
  <div className="flex min-h-screen flex-col">
    <Header />
    <main className="flex-1 pb-20 md:pb-0">{children}</main>
    <Footer />
    <StickyMobileCTA />
  </div>
);
