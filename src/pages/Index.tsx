import Hero from "@/components/Hero";
import { AnimatedMetrics } from "@/components/AnimatedMetrics";
import { UserHomepageSection } from "@/components/UserHomepageSection";
import { StatusPageSection } from "@/components/StatusPageSection";
import { CounterPanelSection } from "@/components/CounterPanelSection";
import { AdminPanelSections } from "@/components/AdminPanelSections";
import { InteractiveDemo } from "@/components/InteractiveDemo";
import { PricingComparison } from "@/components/PricingComparison";
import { IndustriesSlider } from "@/components/IndustriesSlider";
import HowItWorks from "@/components/HowItWorks";
import { DemoVideoSection } from "@/components/DemoVideoSection";
import { TestimonialsSection } from "@/components/TestimonialsSection";
import FAQ from "@/components/FAQ";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import AboutDialog from "@/components/AboutDialog";
import { IslandNav } from "@/components/IslandNav";
import { StickyClickMe } from "@/components/StickyClickMe";
import { ReturnPopup } from "@/components/ReturnPopup";
import { useScrollReveal } from "@/hooks/useScrollReveal";

const Index = () => {
  useScrollReveal();

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const offset = 80;
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
      <IslandNav onSectionClick={scrollToSection} />
      
      <main className="min-h-screen">
        <div id="hero">
          <Hero />
        </div>
        <AnimatedMetrics />
        <div id="demo">
          <DemoVideoSection />
        </div>
        {/* Industries + How It Works moved ABOVE Interactive Demo */}
        <IndustriesSlider />
        <div id="about">
          <HowItWorks />
        </div>
        <InteractiveDemo />
        <div id="functions">
          <UserHomepageSection />
          <StatusPageSection />
          <CounterPanelSection />
          <AdminPanelSections />
        </div>
        <div id="testimonials">
          <TestimonialsSection />
        </div>
        <div id="pricing">
          <PricingComparison />
        </div>
        <div id="checkout">
          {/* Checkout section - scrolls to pricing which contains Stripe button */}
        </div>
        <FAQ />
        <div id="contact">
          <Contact />
        </div>
        <Footer />
        <AboutDialog />
        <StickyClickMe />
        <ReturnPopup />
      </main>
    </>
  );
};

export default Index;
