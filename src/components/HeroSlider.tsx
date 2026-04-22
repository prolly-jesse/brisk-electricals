import { useState, useEffect, useCallback } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const slides = [
  {
    image:
      "https://res.cloudinary.com/dcpqn8ecp/image/upload/v1776804402/slide-voltage-blue_cla5tb.jpg",
    title: "SHOP WITH US",
    subtitle: "Premium Electrical Supplies for your Home & Office",
    shopId: "decorative-lights",
  },
  {
    image:
      "https://res.cloudinary.com/dcpqn8ecp/image/upload/v1776804416/slide-instant-power_ma0erh.jpg",
    title: "HOT DEALS",
    subtitle: "Save big on our Instant Shower collection this month",
    shopId: "decorative-lights",
  },
  {
    image:
      "https://res.cloudinary.com/dcpqn8ecp/image/upload/v1776804463/slide-solar_k2z2eg.jpg",
    title: "Solar Solutions",
    subtitle: "Reliable green energy for uninterrupted power",
    shopId: "outdoor-lighting",
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
                href={`#${slide.shopId}`}
                onClick={(e) => {
                  e.preventDefault();
                  const el = document.getElementById(slide.shopId);
                  if (el) {
                    const top =
                      el.getBoundingClientRect().top + window.scrollY - 80;
                    window.scrollTo({ top, behavior: "smooth" });
                  }
                }}
                className="inline-flex items-center gap-1.5 bg-white/15 hover:bg-white/25 backdrop-blur-md border border-white/30 text-white text-[9px] sm:text-[10px] font-bold uppercase tracking-widest px-3 py-1.5 rounded-full transition-all active:scale-95"
              >
                Shop Now <ChevronRight className="w-3 h-3" />
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
