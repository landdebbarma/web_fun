import { useEffect, useState } from "react";
import { Navbar, Footer } from "@/components/layout";
import { LoadingScreen, SEO } from "@/components/common";
import {
  Hero,
  WhyKafei,
  Bento,
  Product,
  CTA,
} from "@/features/home/components";
import { PricingContainer } from "@/features/pricing/components";
import { Component as Testimonial } from "@/components/ui/testimonial";
import FAQWithSpiral from "@/components/ui/faq";
import { useLocation } from "react-router-dom";

const HomePage = () => {
  const location = useLocation();
  const [loading, setLoading] = useState(location.pathname === "/");

  // SEO config based on current path
  const getSEOConfig = () => {
    switch (location.pathname) {
      case "/product":
        return {
          title: "Product",
          description:
            "Discover AnToAnt's AI-powered platform. Smart inventory, seamless ordering, and powerful analytics for your business.",
          canonical: "/product",
        };
      case "/features":
        return {
          title: "Features",
          description:
            "Explore AnToAnt's powerful features: AI-driven inventory management, smart ordering systems, and real-time analytics for businesses.",
          canonical: "/features",
        };
      case "/pricing":
        return {
          title: "Pricing",
          description:
            "Affordable pricing plans for AnToAnt. Choose the perfect plan for your business - from startups to enterprise.",
          canonical: "/pricing",
        };
      default:
        return {
          canonical: "/",
        };
    }
  };

  const seoConfig = getSEOConfig();

  useEffect(() => {
    if (location.pathname !== "/") {
      setLoading(false);
      return;
    }

    const timer = setTimeout(() => setLoading(false), 2000);
    return () => clearTimeout(timer);
  }, [location.pathname]);

  useEffect(() => {
    if (loading) return;

    const scrollToSection = () => {
      const path = location.pathname;
      let sectionId = "";

      if (path === "/product") sectionId = "product";
      else if (path === "/features") sectionId = "features";
      else if (path === "/pricing") sectionId = "pricing";

      if (sectionId) {
        const element = document.getElementById(sectionId);
        if (element) {
          element.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      }
    };

    setTimeout(scrollToSection, 100);
  }, [location.pathname, loading]);

  if (loading) return <LoadingScreen />;

  return (
    <>
      <SEO {...seoConfig} />
      <div className="relative w-full min-h-screen bg-black text-white overflow-hidden">
        <header className="fixed top-0 left-0 w-full z-50 h-20 bg-black-700/80 backdrop-blur-md">
          <Navbar />
        </header>

        <main className="pt-20">
          <Hero />
          <section id="features">
            <Bento />
          </section>
          <WhyKafei />
          <section id="product">
            <Product />
          </section>
          <section id="pricing">
            <PricingContainer />
          </section>
          <Testimonial />
          <FAQWithSpiral />
          <CTA />
          <Footer />
        </main>
      </div>
    </>
  );
};

export default HomePage;
