import { useEffect, useRef, useState } from "react";
import { Quote } from "lucide-react";

const testimonials = [
  {
    quote: "Professional, punctual, and knowledgeable. They transformed our outdated wiring into a smart home system seamlessly!",
    name: "Susan M.",
    role: "Residential Customer",
  },
  {
    quote: "Their expertise in industrial electrical systems saved us weeks of downtime. Highly recommend for any commercial project.",
    name: "Francis K.",
    role: "Industrial Client",
  },
];

const TestimonialsSection = () => {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => entry.isIntersecting && setVisible(true),
      { threshold: 0.2 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section className="relative py-28 section-padding" ref={ref}>
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <p className="text-xs font-semibold tracking-widest text-primary uppercase mb-3">
            Testimonials
          </p>
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-balance">
            What Our Clients Say
          </h2>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {testimonials.map((t, i) => (
            <div
              key={t.name}
              className={`glass-card-hover p-8 opacity-0 ${visible ? "animate-fade-up" : ""}`}
              style={{ animationDelay: `${i * 0.15}s` }}
            >
              <Quote className="w-8 h-8 text-primary/30 mb-4" />
              <p className="text-foreground/90 leading-relaxed mb-6 text-sm italic">
                "{t.quote}"
              </p>
              <div>
                <p className="font-display font-semibold text-sm">{t.name}</p>
                <p className="text-xs text-muted-foreground">{t.role}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
