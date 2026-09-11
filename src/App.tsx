import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import { Helmet, HelmetProvider } from "react-helmet-async";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { SiteLayout } from "@/components/layout/SiteLayout";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import ResaleVsNewPage from "./pages/ResaleVsNewPage";
import CalculatorPage from "./pages/CalculatorPage";
import LoanGuidePage from "./pages/LoanGuidePage";
import NeighborhoodPage from "./pages/NeighborhoodPage";
import { GuidePage } from "./pages/GuidePage";
import About from "./pages/About";
import Contact from "./pages/Contact";
import ThankYou from "./pages/ThankYou";
import Blog from "./pages/Blog";
import BlogPost from "./pages/BlogPost";
import TrecDisclosures from "./pages/TrecDisclosures";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import TermsOfService from "./pages/TermsOfService";

const queryClient = new QueryClient();

// Route defaults must not compete with the comparison page's dedicated icons.
const DefaultBranding = () => {
  const { pathname } = useLocation();
  if (pathname.replace(/\/$/, "") === "/resale-vs-new") return null;
  return (
    <Helmet>
      <meta name="theme-color" content="#0B1D3A" />
      <meta name="apple-mobile-web-app-title" content="RentVsBuy" />
      <link rel="icon" type="image/x-icon" sizes="32x32" href="/favicon.ico" />
      <link rel="icon" type="image/png" sizes="192x192" href="/icon-192.png" />
      <link rel="icon" type="image/png" sizes="512x512" href="/icon-512.png" />
      <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
      <link rel="manifest" href="/site.webmanifest" />
    </Helmet>
  );
};

const App = () => (
  <HelmetProvider>

    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <DefaultBranding />
          <SiteLayout>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/resale-vs-new" element={<ResaleVsNewPage />} />
              <Route path="/rent-vs-buy-calculator" element={<CalculatorPage />} />

              {/* Loan guides */}
              <Route path="/loans/:slug" element={<LoanGuidePage />} />

              {/* Neighborhoods */}
              <Route path="/san-antonio" element={<NeighborhoodPage />} />
              <Route path="/san-antonio/*" element={<NeighborhoodPage />} />

              {/* Resource guides */}
              <Route path="/first-time-buyer-guide" element={<GuidePage slug="first-time-buyer-guide" />} />
              <Route path="/cost-of-renting" element={<GuidePage slug="cost-of-renting" />} />
              <Route path="/new-construction" element={<GuidePage slug="new-construction" />} />
              <Route path="/military-homebuying" element={<GuidePage slug="military-homebuying" />} />

              {/* Blog */}
              <Route path="/blog" element={<Blog />} />
              <Route path="/blog/:slug" element={<BlogPost />} />

              {/* Static */}
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/thank-you" element={<ThankYou />} />

              {/* Legal */}
              <Route path="/trec-disclosures" element={<TrecDisclosures />} />
              <Route path="/privacy-policy" element={<PrivacyPolicy />} />
              <Route path="/terms-of-service" element={<TermsOfService />} />

              <Route path="*" element={<NotFound />} />
            </Routes>
          </SiteLayout>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  </HelmetProvider>
);

export default App;
