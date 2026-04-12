import ParticleGrid from "@/components/ParticleGrid";
import Navbar from "@/components/Navbar";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";

const Contact = () => (
  <div className="relative min-h-screen overflow-x-hidden">
    <ParticleGrid />
    <Navbar />
    <main className="relative z-10 pt-16">
      <ContactSection />
    </main>
    <Footer />
  </div>
);

export default Contact;
