import CTASection from "./_component/cta-section";
import DemoSection from "./_component/demo-section";
import Features from "./_component/features";
import Footer from "./_component/footer";
import Hero from "./_component/hero";


export default function MarketingPage() {
  return (
    <div className="min-h-screen bg-white dark:bg-neutral-950">
      <Hero />
      <Features />
      <DemoSection />
      <CTASection />
      <Footer />
    </div>
  );
}