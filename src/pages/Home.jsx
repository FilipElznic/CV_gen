import { useAuth } from "../contexts/AuthContext";
import Navbar from "../Components/Navbar";
import FAQ from "../Components/FAQ";
import FeaturesSection from "../Components/FeaturesSection";
import HeroSection from "../Components/HeroSection";
import HowItWorksSection from "../Components/HowItWorksSection";
import PricingSection from "../Components/Pricing";

// Reusable components for better structure

function Home() {
  const { currentUser } = useAuth();

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gradient-to-br from-black via-zinc-900 to-zinc-800">
        <HeroSection currentUser={currentUser} />
        <FeaturesSection />
        <PricingSection />
        <HowItWorksSection />
        <FAQ />
      </div>
    </>
  );
}

export default Home;
