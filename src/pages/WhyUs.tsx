import ParticleGrid from "@/components/ParticleGrid";
import Navbar from "@/components/Navbar";
import WhyUsSection from "@/components/WhyUsSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import Footer from "@/components/Footer";

const WhyUs = () => (
  <div className="relative min-h-screen overflow-x-hidden">
    <ParticleGrid />
    <Navbar />
    <main className="relative z-10 pt-16">
      <WhyUsSection />
      <TestimonialsSection />
    </main>
    <Footer />
  </div>
);

export default WhyUs;
