import { useState, useEffect, useCallback } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import slideVoltage from "@/assets/slide-voltage-blue.jpg";
import slideShower from "@/assets/slide-instant-power.jpg";
import slideSolar from "@/assets/slide-solar.jpg";

const slides = [
  {
    image: slideVoltage,
    title: "SHOP WITH US",
    subtitle: "Premium Electrical Supplies for your Home & Office",
  },
  {
    image: slideShower,
    title: "HOT DEALS",
    subtitle: "Save big on our Instant Shower collection this month",
  },
  {
    image: slideSolar,
    title: "Solar Solutions",
    subtitle: "Reliable green energy for uninterrupted power",
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
      {/* Container - Using 100% width on mobile for a cleaner look */}
      <div className="relative w-full md:w-[96%] mx-auto mt-2 h-[25vh] md:h-[350px] overflow-hidden rounded-2xl shadow-xl bg-neutral-900">
        {slides.map((slide, i) => (
          <div
            key={i}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
              current === i ? "opacity-100 z-10" : "opacity-0 z-0"
            }`}
          >
            {/* Image with subtle zoom effect when active */}
            <img
              src={slide.image}
              alt={slide.title}
              className={`w-full h-full object-cover transition-transform duration-[6000ms] ease-linear ${
                current === i ? "scale-110" : "scale-100"
              }`}
            />

            {/* Premium Gradient Overlay: Darker at bottom for text legibility */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent z-10" />

            {/* Text & Action Button */}
            <div
              className="absolute bottom-[1.5rem] left-[1.2rem] md:left-[3rem] z-20 transition-all duration-700 delay-100"
              style={{
                opacity: current === i ? 1 : 0,
                transform: current === i ? "translateY(0)" : "translateY(20px)",
              }}
            >
              <h2 className="text-xl md:text-4xl font-black text-white uppercase tracking-tighter mb-1 drop-shadow-lg">
                {slide.title}
              </h2>
              <p className="text-[10px] md:text-sm text-gray-200 font-medium mb-4 max-w-[250px] md:max-w-md line-clamp-1">
                {slide.subtitle}
              </p>

              <a
                href="#shop"
                onClick={(e) => {
                  e.preventDefault();
                  document
                    .getElementById("shop")
                    ?.scrollIntoView({ behavior: "smooth" });
                }}
                className="inline-flex items-center gap-2 bg-blue-600 hover:bg-white hover:text-blue-600 text-white text-[10px] md:text-xs font-black uppercase tracking-widest px-5 py-2.5 rounded-sm transition-all active:scale-95 shadow-lg"
              >
                Shop Now <ChevronRight className="w-4 h-4" />
              </a>
            </div>
          </div>
        ))}

        {/* Navigation Arrows */}
        <button
          onClick={prev}
          className="absolute left-4 top-1/2 -translate-y-1/2 z-30 w-10 h-10 rounded-full bg-black/20 hover:bg-white/20 backdrop-blur-md border border-white/10 flex items-center justify-center text-white transition-all hidden md:flex"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
        <button
          onClick={next}
          className="absolute right-4 top-1/2 -translate-y-1/2 z-30 w-10 h-10 rounded-full bg-black/20 hover:bg-white/20 backdrop-blur-md border border-white/10 flex items-center justify-center text-white transition-all hidden md:flex"
        >
          <ChevronRight className="w-5 h-5" />
        </button>

        {/* Dots */}
        <div className="absolute bottom-4 right-8 z-30 flex gap-2">
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={() => goTo(i)}
              className={`h-1 rounded-full transition-all duration-500 ${
                current === i ? "w-8 bg-blue-600" : "w-2 bg-white/40"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default HeroSlider;
