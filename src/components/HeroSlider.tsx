import { useState, useEffect, useCallback } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import slideVoltage from "@/assets/slide-voltage-blue.jpg";
import slideShower from "@/assets/slide-instant-power.jpg";
import slideSolar from "@/assets/slide-solar.jpg";

const slides = [
  {
    image: slideVoltage,
    title: "SHOP WITH US",
  },
  {
    image: slideShower,
    title: "HOT DEALS",
  },
  {
    image: slideSolar,
    title: "Solar Solutions",
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
    <section className="px-4 sm:px-6 lg:px-8 py-2">
      <div className="relative w-[94%] mx-auto mt-2 h-[22vh] md:h-[300px] lg:h-[300px] overflow-hidden rounded-2xl shadow-md bg-muted">
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
              // h- values now perfectly match the parent container
              className="w-full h-full object-cover object-center object-contain  rounded-2xl"
              width={1920}
              height={700}
              {...(i === 0 ? {} : { loading: "lazy" as const })}
            />

            {/* Overlay - Rounded to match image */}
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-t from-black/75 via-black/20 to-transparent" /> 

            {/* Text - Scaled down for the shorter banner height */}
            <div
  className="absolute bottom-[1rem] sm:bottom-[1.5rem] left-[1rem] sm:left-[1.5rem] lg:left-[2.5rem] max-w-xl transition-all duration-500 ease-out z-20"
  style={{
    opacity: current === i ? 1 : 0,
    transform: current === i ? "translateY(0)" : "translateY(1rem)",
  }}
>
  <h2 className="font-display text-lg sm:text-2xl lg:text-3xl font-bold text-white mb-1 drop-shadow-md">
    {slide.title}
  </h2>
  <p className="text-[10px] sm:text-xs text-gray-200 max-w-md line-clamp-1 mb-2">
    {slide.subtitle}
  </p>
  
    href="#shop"
    onClick={(e) => {
      e.preventDefault();
      document.getElementById("shop")?.scrollIntoView({ behavior: "smooth" });
    }}
    className="inline-flex items-center gap-1.5 bg-white/15 hover:bg-white/25 backdrop-blur-md border border-white/30 text-white text-[9px] sm:text-[10px] font-bold uppercase tracking-widest px-3 py-1.5 rounded-full transition-all active:scale-95"
  >
    Shop Now <ChevronRight className="w-3 h-3" />
  </a>
</div>
          </div>
        ))}

        {/* Arrows - Smaller and more subtle for a premium look */}
        <button
          onClick={prev}
          className="absolute left-[0.5rem] top-1/2 -translate-y-1/2 z-30 w-8 h-8 rounded-full bg-white/20 backdrop-blur-md border border-white/30 flex items-center justify-center text-white hover:bg-white/40 transition-all"
          aria-label="Previous slide"
        >
          <ChevronLeft className="w-4 h-4" />
        </button>
        <button
          onClick={next}
          className="absolute right-[0.5rem] top-1/2 -translate-y-1/2 z-30 w-8 h-8 rounded-full bg-white/20 backdrop-blur-md border border-white/30 flex items-center justify-center text-white hover:bg-white/40 transition-all"
          aria-label="Next slide"
        >
          <ChevronRight className="w-4 h-4" />
        </button>

        {/* Dots */}
        <div className="absolute bottom-[0.5rem] left-1/2 -translate-x-1/2 z-30 flex gap-2">
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={() => goTo(i)}
              className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${
                current === i
                  ? "bg-white scale-125 shadow-lg"
                  : "bg-white/40 hover:bg-white/60"
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
