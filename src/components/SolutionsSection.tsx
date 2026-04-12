import { MessageCircle } from "lucide-react";

const solutions = [
  {
    title: "Smart Home Automation Package",
    desc: "Complete home intelligence — lighting control, security, climate automation and voice integration.",
    features: ["Automated lighting", "Smart security", "Voice control", "Energy monitoring"],
  },
  {
    title: "Solar Power System",
    desc: "End-to-end solar installation with panels, inverters, and battery storage for uninterrupted power.",
    features: ["Panel installation", "Battery storage", "Grid tie-in", "Monitoring system"],
  },
  {
    title: "Commercial LED Retrofit",
    desc: "Energy-efficient lighting upgrades for offices, retail, and hospitality — cut energy bills by up to 60%.",
    features: ["LED conversion", "Energy audit", "Smart controls", "Warranty-backed"],
  },
  {
    title: "Electrical Panel Upgrade",
    desc: "Modernize outdated panels to meet current safety standards with premium Siemens & Schneider components.",
    features: ["Panel replacement", "Safety compliance", "Surge protection", "Code compliant"],
  },
  {
    title: "Custom Landscape Lighting",
    desc: "Architectural and landscape lighting design that transforms outdoor spaces with stunning effects.",
    features: ["Design consultation", "LED fixtures", "Timer controls", "Weatherproof"],
  },
  {
    title: "Industrial Electrical Systems",
    desc: "Heavy-duty installations and maintenance for factories, warehouses, and manufacturing plants.",
    features: ["3-phase systems", "Motor controls", "Safety systems", "Preventive maintenance"],
  },
];

const SolutionsSection = () => {
  return (
    <section id="solutions" className="relative py-28 section-padding">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <p className="text-xs font-semibold tracking-widest text-primary uppercase mb-3">
            Our Products
          </p>
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-balance">
            Featured Solutions
          </h2>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {solutions.map((s) => (
            <div key={s.title} className="glass-card-hover p-6 flex flex-col">
              <h3 className="font-display font-semibold text-base mb-2">{s.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed mb-4 flex-1">{s.desc}</p>

              <div className="flex flex-wrap gap-2 mb-5">
                {s.features.map((f) => (
                  <span
                    key={f}
                    className="text-[11px] px-2.5 py-1 rounded-full border border-primary/20 bg-primary/5 text-primary/80"
                  >
                    {f}
                  </span>
                ))}
              </div>

              <a
                href={`https://wa.me/254722648765?text=${encodeURIComponent(
                  `Hello Brisk Electricals! I'm interested in your "${s.title}" solution. Could you provide more details and pricing?`
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-whatsapp w-full text-center"
              >
                <MessageCircle className="w-4 h-4" />
                Inquire on WhatsApp
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SolutionsSection;
