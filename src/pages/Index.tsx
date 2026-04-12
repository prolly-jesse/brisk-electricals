import ParticleGrid from "@/components/ParticleGrid";
import Navbar from "@/components/Navbar";
import HeroSlider from "@/components/HeroSlider";
import ShopSection from "@/components/ShopSection";
import Footer from "@/components/Footer";

const Index = () => (
  <div className="relative min-h-screen overflow-x-hidden">
    <ParticleGrid />
    <Navbar />
    <main className="relative z-10 pt-16">
      <HeroSlider />
      <ShopSection />
    </main>
    <Footer />
  </div>
);

export default Index;
