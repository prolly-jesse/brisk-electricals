import ParticleGrid from "@/components/ParticleGrid";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqSections = [
  {
    heading: "General Information",
    items: [
      {
        q: "What is Brisk Electricals?",
        a: "Brisk Electricals is a Nairobi-based electrical company specializing in residential, commercial, and industrial electrical services. We are fully licensed by the Energy and Petroleum Regulatory Authority (EPRA).",
      },
      {
        q: "Where are you located?",
        a: "We are based in Nairobi, Kenya and serve clients across the greater Nairobi metropolitan area and surrounding counties.",
      },
      {
        q: "Are your electricians certified?",
        a: "Yes. All our technicians are EPRA-licensed professionals with years of hands-on experience in the electrical industry.",
      },
    ],
  },
  {
    heading: "Services",
    items: [
      {
        q: "What services do you offer?",
        a: "We offer a wide range of services including electrical wiring & installations, smart home automation, solar power system integration, custom lighting design, energy audits, and routine maintenance & repairs.",
      },
      {
        q: "Do you install smart home systems?",
        a: "Absolutely. We design and install complete smart home automation packages — from intelligent lighting and security systems to voice-controlled climate management.",
      },
      {
        q: "Can you install solar panels?",
        a: "Yes. We provide end-to-end solar power solutions including panel installation, inverter setup, battery storage, and grid tie-in with ongoing monitoring support.",
      },
    ],
  },
  {
    heading: "Safety & Quality",
    items: [
      {
        q: "What brands do you use?",
        a: "We exclusively use premium, industry-trusted brands including Siemens and Schneider Electric to ensure reliability, safety, and longevity in every installation.",
      },
      {
        q: "Do you offer warranties on your work?",
        a: "Yes. All our installations and services are warranty-backed. The specific warranty period depends on the type of work and materials used — we'll provide full details in your quote.",
      },
      {
        q: "How do you ensure safety compliance?",
        a: "Every project follows strict EPRA safety standards and Kenya's electrical code requirements. We conduct thorough inspections and testing before sign-off on any installation.",
      },
    ],
  },
  {
    heading: "Contact & Support",
    items: [
      {
        q: "How can I reach you?",
        a: "You can reach us via phone or WhatsApp at +254 722 648 765, or email us at Briskelectricals2407@gmail.com. We're also available on Instagram, Facebook, and TikTok @briskelectricals.kenya.",
      },
      {
        q: "Do you offer free consultations?",
        a: "Yes! We offer free initial consultations and transparent, upfront pricing with no hidden fees. Contact us to schedule yours.",
      },
      {
        q: "What are your working hours?",
        a: "We operate Monday to Saturday, 8:00 AM to 6:00 PM. For emergencies, reach out via WhatsApp and we'll respond as quickly as possible.",
      },
    ],
  },
];

const FAQ = () => (
  <div className="relative min-h-screen overflow-x-hidden">
    <ParticleGrid />
    <Navbar />
    <main className="relative z-10 pt-16">
      <section className="py-28 section-padding">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-xs font-semibold tracking-widest text-primary uppercase mb-3">
              FAQ
            </p>
            <h1 className="font-display text-3xl sm:text-4xl font-bold text-balance">
              Frequently Asked Questions
            </h1>
            <p className="text-sm text-muted-foreground mt-3 max-w-lg mx-auto">
              Everything you need to know about Brisk Electricals and our services.
            </p>
          </div>

          <div className="space-y-10">
            {faqSections.map((section) => (
              <div key={section.heading}>
                <h2 className="font-display text-lg font-semibold mb-4 text-foreground">
                  {section.heading}
                </h2>
                <Accordion type="single" collapsible className="space-y-2">
                  {section.items.map((item, i) => (
                    <AccordionItem
                      key={i}
                      value={`${section.heading}-${i}`}
                      className="glass-card border border-border rounded-xl px-5"
                    >
                      <AccordionTrigger className="text-sm font-medium text-foreground hover:text-primary py-4">
                        {item.q}
                      </AccordionTrigger>
                      <AccordionContent className="text-sm text-muted-foreground leading-relaxed pb-4">
                        {item.a}
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
    <Footer />
  </div>
);

export default FAQ;
