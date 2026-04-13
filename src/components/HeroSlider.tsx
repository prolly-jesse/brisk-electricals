import { useState, useEffect, useCallback } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import slideVoltage from "@/assets/slide-voltage-blue.jpg";
import slideShower from "@/assets/slide-instant-power.jpg";
import slideSolar from "@/assets/slide-solar.jpg";

const slides = [
  {
    image: slideVoltage,
    title: "SHOP WITH US",
    subtitle: "Premium Electrical Solutions & Modern Building Lighting",
  },
  {
    image: slideShower,
    title: "Instant Power",
    subtitle: "Professional Instant Shower Installations for Every Home",
  },
  {
    image: slideSolar,
    title: "Solar Solutions",
    subtitle: "Sustainable Solar Energy Systems — Built for Nairobi",
  },
];

const HeroSlider = () => {
  const [current, setCurrent] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const goTo = useCallback(
    (index: number) => {
      if (isTransitioning) return;
      setIsTransitioning(true);
      setCurrent(index);
      setTimeout(() => setIsTransitioning(false), 600);
    },
    [isTransitioning]
  );

  const next = useCallback(
    () => goTo((current + 1) % slides.length),
    [current, goTo]
  );
  const prev = useCallback(
    () => goTo((current - 1 + slides.length) % slides.length),
    [current, goTo]
  );

  useEffect(() => {
    const timer = setInterval(next, 6000);
    return () => clearInterval(timer);
  }, [next]);

  return (
    <section className="px-4 sm:px-6 lg:px-8 py-4">
      <div className="relative w-full h-[35vh] sm:h-[40vh] overflow-hidden rounded-2xl shadow-md">
        {/* Slides */}
        {slides.map((slide, i) => (
          <div
            key={i}
            className="absolute inset-0 transition-opacity duration-[600ms] ease-in-out"
            style={{ opacity: current === i ? 1 : 0 }}
          >
            <img
              src={slide.image}
              alt={slide.title}
              className="w-full h-full object-cover"
              width={1920}
              height={700}
              {...(i === 0 ? {} : { loading: "lazy" as const })}
            />
            {/* Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent" />

            {/* Text */}
            <div
              className="absolute bottom-[1.5rem] sm:bottom-[2rem] left-[1rem] sm:left-[1.5rem] lg:left-[2.5rem] max-w-xl transition-all duration-500 ease-out"
              style={{
                opacity: current === i ? 1 : 0,
                transform: current === i ? "translateY(0)" : "translateY(1rem)",
              }}
            >
              <h2 className="font-display text-xl sm:text-3xl lg:text-4xl font-bold text-foreground mb-1.5">
                {slide.title}
              </h2>
              <p className="text-xs sm:text-sm text-muted-foreground max-w-md">
                {slide.subtitle}
              </p>
            </div>
          </div>
        ))}

        {/* Arrows */}
        <button
          onClick={prev}
          className="absolute left-[0.5rem] top-1/2 -translate-y-1/2 z-10 w-9 h-9 rounded-full bg-card/60 backdrop-blur-sm border border-border flex items-center justify-center text-foreground hover:bg-card transition-all duration-300"
          aria-label="Previous slide"
        >
          <ChevronLeft className="w-4 h-4" />
        </button>
        <button
          onClick={next}
          className="absolute right-[0.5rem] top-1/2 -translate-y-1/2 z-10 w-9 h-9 rounded-full bg-card/60 backdrop-blur-sm border border-border flex items-center justify-center text-foreground hover:bg-card transition-all duration-300"
          aria-label="Next slide"
        >
          <ChevronRight className="w-4 h-4" />
        </button>

        {/* Dots */}
        <div className="absolute bottom-[0.625rem] left-1/2 -translate-x-1/2 z-10 flex gap-[0.5rem]">
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={() => goTo(i)}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                current === i
                  ? "bg-primary scale-125 shadow-[0_0_8px_hsl(var(--voltage-blue)/0.6)]"
                  : "bg-muted-foreground/40 hover:bg-muted-foreground/70"
              }`}
              aria-label={`Go to slide ${i + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default HeroSlider;
