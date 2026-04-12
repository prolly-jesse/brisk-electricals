import { useEffect, useRef, useState } from "react";
import { Wrench, Lightbulb, Sun, Home, Gauge, Cpu } from "lucide-react";

const services = [
  {
    icon: Wrench,
    title: "Installation & Wiring",
    desc: "Full electrical system installations for new builds, renovations, and upgrades with certified precision.",
  },
  {
    icon: Home,
    title: "Smart Home Automation",
    desc: "Transform your space with intelligent lighting, security systems, and connected home solutions.",
  },
  {
    icon: Sun,
    title: "Solar Power Integration",
    desc: "Solar panel systems and battery storage solutions for sustainable, cost-efficient energy.",
  },
  {
    icon: Gauge,
    title: "Maintenance & Repairs",
    desc: "Routine inspections, fault diagnosis, circuit repairs, and emergency troubleshooting.",
  },
  {
    icon: Lightbulb,
    title: "Energy Efficiency",
    desc: "LED retrofitting, energy audits, and sustainable solutions to reduce your electricity costs.",
  },
  {
    icon: Cpu,
    title: "Custom Lighting Design",
    desc: "Bespoke lighting for events, landscapes, patios, and home theaters that set the mood.",
  },
];

const ServicesSection = () => {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => entry.isIntersecting && setVisible(true),
      { threshold: 0.15 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="services" className="relative py-28 section-padding" ref={ref}>
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <p className="text-xs font-semibold tracking-widest text-primary uppercase mb-3">
            What We Do
          </p>
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-balance">
            Core Services
          </h2>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {services.map((s, i) => (
            <div
              key={s.title}
              className={`glass-card-hover p-6 opacity-0 ${visible ? "animate-fade-up" : ""}`}
              style={{ animationDelay: `${i * 0.1}s` }}
            >
              <div className="w-10 h-10 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center mb-4">
                <s.icon className="w-5 h-5 text-primary" />
              </div>
              <h3 className="font-display font-semibold text-base mb-2">{s.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
