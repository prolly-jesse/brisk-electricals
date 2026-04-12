import { useEffect, useRef, useState } from "react";
import { Shield, Heart, Eye, Users, Award, Clock } from "lucide-react";

const reasons = [
  { icon: Shield, title: "EPRA Licensed", desc: "Fully licensed electricians with regulatory compliance." },
  { icon: Heart, title: "Passion-Driven", desc: "Great service starts with heart, not just credentials." },
  { icon: Eye, title: "Transparent Pricing", desc: "No hidden fees — upfront estimates on every project." },
  { icon: Award, title: "Premium Materials", desc: "Trusted brands like Siemens & Schneider Electric." },
  { icon: Users, title: "98% Satisfaction", desc: "Client-first approach with tailored solutions." },
  { icon: Clock, title: "Fast & Flexible", desc: "We prioritize urgency without cutting corners." },
];

const WhyUsSection = () => {
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
    <section id="why-us" className="relative py-28 section-padding" ref={ref}>
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <p className="text-xs font-semibold tracking-widest text-primary uppercase mb-3">
            Our Edge
          </p>
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-balance">
            Why Choose Brisk Electricals?
          </h2>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {reasons.map((r, i) => (
            <div
              key={r.title}
              className={`flex gap-4 p-5 glass-card-hover opacity-0 ${visible ? "animate-fade-up" : ""}`}
              style={{ animationDelay: `${i * 0.08}s` }}
            >
              <div className="w-10 h-10 shrink-0 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center">
                <r.icon className="w-5 h-5 text-primary" />
              </div>
              <div>
                <h3 className="font-display font-semibold text-sm mb-1">{r.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{r.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyUsSection;
