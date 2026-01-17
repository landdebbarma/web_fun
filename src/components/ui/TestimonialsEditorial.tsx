import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const testimonials = [
  {
    id: 1,
    quote:
      "AnToAnt's AI technology has transformed how we handle complex workflows.",
    author: "Monir",
    role: "Co-Founder & CEO",
    company: "AnToAnt",
    image: "",
  },
  {
    id: 2,
    quote:
      "The platform's intuitive design and powerful capabilities have exceeded our expectations.",
    author: "Land",
    role: "Co-Founder & CTO",
    company: "AnToAnt",
    image: "",
  },
];

export default function TestimonialsEditorial() {
  const [active, setActive] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  // Auto-slide every 3 seconds
  useEffect(() => {
    if (isPaused) return;

    const interval = setInterval(() => {
      const newIndex = active === testimonials.length - 1 ? 0 : active + 1;
      setIsTransitioning(true);
      setTimeout(() => {
        setActive(newIndex);
        setTimeout(() => setIsTransitioning(false), 50);
      }, 300);
    }, 3000);

    return () => clearInterval(interval);
  }, [active, isPaused]);

  const handleChange = (index: number) => {
    if (index === active || isTransitioning) return;
    setIsTransitioning(true);
    setTimeout(() => {
      setActive(index);
      setTimeout(() => setIsTransitioning(false), 50);
    }, 300);
  };

  const handlePrev = () => {
    setIsPaused(true);
    const newIndex = active === 0 ? testimonials.length - 1 : active - 1;
    handleChange(newIndex);
    // Resume auto-play after 5 seconds
    setTimeout(() => setIsPaused(false), 5000);
  };

  const handleNext = () => {
    setIsPaused(true);
    const newIndex = active === testimonials.length - 1 ? 0 : active + 1;
    handleChange(newIndex);
    // Resume auto-play after 5 seconds
    setTimeout(() => setIsPaused(false), 5000);
  };

  const handleManualChange = (index: number) => {
    setIsPaused(true);
    handleChange(index);
    // Resume auto-play after 5 seconds
    setTimeout(() => setIsPaused(false), 5000);
  };

  const current = testimonials[active];

  return (
    <div className="w-full max-w-2xl mx-auto px-4 sm:px-6 py-8 sm:py-16">
      {/* Large index number */}
      <div className="flex items-start gap-4 sm:gap-8">
        <span
          className="hidden md:block text-[80px] lg:text-[120px] font-light leading-none text-white/10 select-none transition-all duration-500"
          style={{ fontFeatureSettings: '"tnum"' }}
        >
          {String(active + 1).padStart(2, "0")}
        </span>

        <div className="flex-1 pt-0 md:pt-6">
          {/* Quote */}
          <blockquote
            className={`text-xl sm:text-2xl md:text-3xl font-light leading-relaxed text-white tracking-tight transition-all duration-300 ${
              isTransitioning
                ? "opacity-0 translate-x-4"
                : "opacity-100 translate-x-0"
            }`}
          >
            {current.quote}
          </blockquote>

          {/* Author info with hover reveal */}
          <div
            className={`mt-6 sm:mt-10 group cursor-default transition-all duration-300 delay-100 ${
              isTransitioning ? "opacity-0" : "opacity-100"
            }`}
          >
            <div className="flex items-center gap-3 sm:gap-4">
              <div className="relative w-10 h-10 sm:w-12 sm:h-12 rounded-full overflow-hidden ring-2 ring-white/10 group-hover:ring-white/30 transition-all duration-300 flex-shrink-0">
                <img
                  src={current.image}
                  alt={current.author}
                  className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
                />
              </div>
              <div>
                <p className="font-medium text-white text-sm sm:text-base">
                  {current.author}
                </p>
                <p className="text-xs sm:text-sm text-gray-400">
                  {current.role}
                  <span className="mx-1 sm:mx-2 text-white/20">/</span>
                  <span className="group-hover:text-white transition-colors duration-300">
                    {current.company}
                  </span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation - vertical line selector */}
      <div className="mt-8 sm:mt-16 flex flex-col sm:flex-row items-center justify-between gap-4 sm:gap-0">
        <div className="flex items-center gap-4 sm:gap-6">
          <div className="flex items-center gap-2 sm:gap-3">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => handleManualChange(index)}
                className="group relative py-3 sm:py-4"
              >
                <span
                  className={`block h-px transition-all duration-500 ease-out ${
                    index === active
                      ? "w-8 sm:w-12 bg-white"
                      : "w-4 sm:w-6 bg-white/20 group-hover:w-6 sm:group-hover:w-8 group-hover:bg-white/40"
                  }`}
                />
              </button>
            ))}
          </div>
          <span className="text-[10px] sm:text-xs text-gray-400 tracking-widest uppercase">
            {String(active + 1).padStart(2, "0")} /{" "}
            {String(testimonials.length).padStart(2, "0")}
          </span>
        </div>

        <div className="flex items-center gap-1">
          <button
            onClick={handlePrev}
            className="p-2 rounded-full text-white/40 hover:text-white hover:bg-white/5 transition-all duration-300"
            aria-label="Previous testimonial"
          >
            <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5" />
          </button>
          <button
            onClick={handleNext}
            className="p-2 rounded-full text-white/40 hover:text-white hover:bg-white/5 transition-all duration-300"
            aria-label="Next testimonial"
          >
            <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5" />
          </button>
        </div>
      </div>
    </div>
  );
}
