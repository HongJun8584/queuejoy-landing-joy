import { useState } from "react";
import Hero from "@/components/Hero";
import { ComparisonSection } from "@/components/ComparisonSection";
import Features from "@/components/Features";
import HowItWorks from "@/components/HowItWorks";
import { DemoVideoSection } from "@/components/DemoVideoSection";
import ValueStats from "@/components/ValueStats";
import AdsEngagement from "@/components/AdsEngagement";
import Pricing from "@/components/Pricing";
import { TestimonialsSection } from "@/components/TestimonialsSection";
import FAQ from "@/components/FAQ";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import AboutDialog from "@/components/AboutDialog";
import { TopNav } from "@/components/TopNav";
import { useScrollReveal } from "@/hooks/useScrollReveal";

const Index = () => {
  useScrollReveal();
  const [currentLanguage, setCurrentLanguage] = useState("en");

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const offset = 80; // Account for fixed nav
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;
      
      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
    }
  };

  return (
    <>
      <TopNav 
        onSectionClick={scrollToSection}
        onLanguageChange={setCurrentLanguage}
        currentLanguage={currentLanguage}
      />
      
      <main className="min-h-screen pt-16">
        <div id="hero">
          <Hero />
        </div>
        <div id="demo">
          <DemoVideoSection />
        </div>
        <ComparisonSection />
        <div id="about">
          <HowItWorks />
        </div>
        <Features />
        <ValueStats />
        <AdsEngagement />
        <div id="testimonials">
          <TestimonialsSection />
        </div>
        <div id="pricing">
          <Pricing />
        </div>
        <FAQ />
        <div id="contact">
          <Contact />
        </div>
        <Footer />
        <AboutDialog />
      </main>
    </>
  );
};

export default Index;
