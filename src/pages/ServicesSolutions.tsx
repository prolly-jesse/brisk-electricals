import ParticleGrid from "@/components/ParticleGrid";
import Navbar from "@/components/Navbar";
import ServicesSection from "@/components/ServicesSection";
import SolutionsSection from "@/components/SolutionsSection";
import Footer from "@/components/Footer";

const ServicesSolutions = () => (
  <div className="relative min-h-screen overflow-x-hidden">
    <ParticleGrid />
    <Navbar />
    <main className="relative z-10 pt-16">
      <ServicesSection />
      <SolutionsSection />
    </main>
    <Footer />
  </div>
);

export default ServicesSolutions;
