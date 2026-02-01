import Navbar from "@/components/landing/navbar";
import Hero from "@/components/landing/hero";
import PainPoints from "@/components/landing/pain-points";
import HowItWorks from "@/components/landing/how-it-works";
import SocialProof from "@/components/landing/social-proof";
import Pricing from "@/components/landing/pricing";
import FAQ from "@/components/landing/faq";
import FinalCTA from "@/components/landing/final-cta";
import Footer from "@/components/landing/footer";

export default function HomePage() {
  return (
    <main className="min-h-screen">
      <Navbar />
      <Hero />
      <PainPoints />
      <HowItWorks />
      <SocialProof />
      <Pricing />
      <FAQ />
      <FinalCTA />
      <Footer />
    </main>
  );
}
