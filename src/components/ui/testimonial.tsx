"use client";
import React, { forwardRef } from "react";
import { clsx } from "clsx";
import useEmblaCarousel, {
  type UseEmblaCarouselType,
} from "embla-carousel-react";

import Autoplay from "embla-carousel-autoplay";
import { Heart } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import img1 from "@/assets/images/img1.png";

interface ButtonProps extends React.ComponentPropsWithoutRef<"button"> {
  variant?: "outline" | "default";
  size?: "icon" | "default";
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={clsx(
          "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50",
          variant === "outline" &&
            "border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground",
          size === "icon" && "h-9 w-9",
          className,
        )}
        {...props}
      />
    );
  },
);
Button.displayName = "Button";

interface SectionProps {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
}

const Section = ({ title, subtitle, children }: SectionProps) => {
  return (
    <section className="py-12 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl font-bold tracking-tight text-white/90 sm:text-4xl">
          {title}
        </h2>
        {subtitle && <p className="mt-4 text-lg text-gray-600">{subtitle}</p>}
        <div className="mt-12">{children}</div>
      </div>
    </section>
  );
};

type CarouselApi = UseEmblaCarouselType[1];
type UseCarouselParameters = Parameters<typeof useEmblaCarousel>;
type CarouselOptions = UseCarouselParameters[0];
type CarouselPlugin = UseCarouselParameters[1];

interface CarouselProps {
  opts?: CarouselOptions;
  plugins?: CarouselPlugin;
  orientation?: "horizontal" | "vertical";
  setApi?: (api: CarouselApi) => void;
}

type CarouselContextProps = {
  carouselRef: ReturnType<typeof useEmblaCarousel>[0];
  api: ReturnType<typeof useEmblaCarousel>[1];
  scrollPrev: () => void;
  scrollNext: () => void;
  canScrollPrev: boolean;
  canScrollNext: boolean;
} & CarouselProps;

const CarouselContext = React.createContext<CarouselContextProps | null>(null);

function useCarousel() {
  const context = React.useContext(CarouselContext);
  if (!context) {
    throw new Error("useCarousel must be used within a <Carousel />");
  }
  return context;
}

const Carousel = forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & CarouselProps
>(
  (
    {
      orientation = "horizontal",
      opts,
      // setApi,
      plugins,
      className,
      children,
      ...props
    },
    ref,
  ) => {
    const [carouselRef, api] = useEmblaCarousel(
      {
        ...opts,
        axis: orientation === "horizontal" ? "x" : "y",
      },
      plugins,
    );
    const [canScrollPrev, setCanScrollPrev] = React.useState(false);
    const [canScrollNext, setCanScrollNext] = React.useState(false);

    const onSelect = React.useCallback((api: CarouselApi) => {
      if (!api) return;
      setCanScrollPrev(api.canScrollPrev());
      setCanScrollNext(api.canScrollNext());
    }, []);

    const scrollPrev = React.useCallback(() => {
      api?.scrollPrev();
    }, [api]);

    const scrollNext = React.useCallback(() => {
      api?.scrollNext();
    }, [api]);

    React.useEffect(() => {
      if (!api) return;
      onSelect(api);
      api.on("reInit", onSelect);
      api.on("select", onSelect);
      return () => {
        api?.off("select", onSelect);
      };
    }, [api, onSelect]);

    return (
      <CarouselContext.Provider
        value={{
          carouselRef,
          api,
          opts,
          orientation:
            orientation || (opts?.axis === "y" ? "vertical" : "horizontal"),
          scrollPrev,
          scrollNext,
          canScrollPrev,
          canScrollNext,
        }}
      >
        <div
          ref={ref}
          className={clsx("relative", className)}
          role="region"
          aria-roledescription="carousel"
          {...props}
        >
          {children}
        </div>
      </CarouselContext.Provider>
    );
  },
);
Carousel.displayName = "Carousel";

const CarouselContent = forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
  const { carouselRef, orientation } = useCarousel();
  return (
    <div ref={carouselRef} className="overflow-hidden">
      <div
        ref={ref}
        className={clsx(
          "flex",
          orientation === "horizontal" ? "-ml-4" : "-mt-4 flex-col",
          className,
        )}
        {...props}
      />
    </div>
  );
});
CarouselContent.displayName = "CarouselContent";

const CarouselItem = forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
  const { orientation } = useCarousel();
  return (
    <div
      ref={ref}
      role="group"
      aria-roledescription="slide"
      className={clsx(
        "min-w-0 shrink-0 grow-0 basis-full",
        orientation === "horizontal" ? "pl-4" : "pt-4",
        className,
      )}
      {...props}
    />
  );
});
CarouselItem.displayName = "CarouselItem";

//
// TESTIMONIALS + COMPANIES
//

const companies = [
  {
    name: "Google",
    url: img1,
  },
  {
    name: "GitHub",
    url: "https://res.cloudinary.com/eldoraui/img/upload/v1734066341/GitHub_honend.svg",
  },
  {
    name: "Amazon",
    url: "https://res.cloudinary.com/eldoraui/img/upload/v1734066178/Amazon_wckqtv.svg",
  },
  {
    name: "Netflix",
    url: "https://res.cloudinary.com/eldoraui/img/upload/v1734066179/Netflix_skrjyn.svg",
  },
  {
    name: "YouTube",
    url: "https://res.cloudinary.com/eldoraui/img/upload/v1734066180/YouTube_wknngk.svg",
  },
  {
    name: "Instagram",
    url: "https://res.cloudinary.com/eldoraui/img/upload/v1734066178/Instagram_mo5ttl.svg",
  },
  {
    name: "Spotify",
    url: "https://res.cloudinary.com/eldoraui/img/upload/v1734066180/Spotify_ocrrnm.svg",
  },
];

function getTestimonialQuote(index: number): string {
  const quotes = [
    "nexus.ai has revolutionized our security testing process. We're now able to identify and address vulnerabilities faster than ever before.",
    "With nexus.ai, we've significantly improved our security posture. It's like having an AI-powered ethical hacker working around the clock.",
    "The AI-driven insights from nexus.ai have transformed how we approach cybersecurity. It's a game-changer for our platform's security.",
    "nexus.ai's automated penetration testing has saved us countless hours and dramatically enhanced our security measures.",
    "Implementing nexus.ai was seamless, and the results were immediate. We're now proactively addressing potential security issues before they become threats.",
    "The continuous monitoring capabilities of nexus.ai give us peace of mind. We're always one step ahead in protecting our users' data.",
    "nexus.ai's compliance mapping feature has streamlined our security audit processes. It's an essential tool for maintaining trust with our users.",
  ];
  return quotes[index % quotes.length];
}

function getTestimonialName(index: number): string {
  const names = [
    "Nishan Barua",
    "Shafru Mog",
    "Samridha Barua",
    "Bishal Paul",
    "jebin Barma",
    "Rima Barma",
    "karnilian debbarma",
  ];
  return names[index % names.length];
}

function getTestimonialRole(index: number): string {
  const roles = [
    "Freelancer Developer",
    "Collage Student",
    "Frontend Developer",
    "Backend Developer",
    "Full Stack Developer",
    "Backend Developer",
    "Collage Student",
  ];
  return roles[index % roles.length];
}

//
// COMPONENT
//

export function Component() {
  const [likedItems, setLikedItems] = React.useState<Set<number>>(new Set());
  const [showNotification, setShowNotification] = React.useState(false);

  const handleLike = (index: number) => {
    setLikedItems((prev) => {
      const next = new Set(prev);
      if (next.has(index)) {
        next.delete(index);
      } else {
        next.add(index);
        setShowNotification(true);
        setTimeout(() => setShowNotification(false), 2000);
      }
      return next;
    });
  };

  return (
    <Section title="What Our Users Say">
      <Carousel
        opts={{ loop: true, align: "start" }}
        plugins={[
          Autoplay({
            delay: 3000,
            stopOnInteraction: false,
            stopOnMouseEnter: true,
          }),
        ]}
      >
        <div className="relative mx-auto w-full px-4">
          <CarouselContent className="-ml-4">
            {Array.from({ length: 7 }).map((_, index) => {
              const isLiked = likedItems.has(index);
              return (
                <CarouselItem
                  key={index}
                  className="pl-4 md:basis-1/2 lg:basis-1/3"
                >
                  <div className="h-full">
                    {/* Notification Card */}
                    <div className="h-full relative overflow-hidden rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 shadow-2xl transition-all duration-300 hover:bg-white/10 group select-none">
                      {/* Apps Store / iOS Notification Header */}
                      <div className="flex items-center justify-between px-4 py-3 bg-white/5 border-b border-white/5">
                        <div className="flex items-center gap-2">
                          <div className="w-5 h-5 rounded-[5px] overflow-hidden bg-black/20 p-0.5">
                            <img
                              src={companies[index % companies.length].url}
                              alt="App Icon"
                              className="w-full h-full object-contain"
                            />
                          </div>
                          <span className="text-[10px] font-semibold text-white/70 uppercase tracking-wider">
                            {companies[index % companies.length].name}
                          </span>
                        </div>
                        <span className="text-[10px] text-white/40 font-medium">
                          now
                        </span>
                      </div>

                      {/* Content */}
                      <div className="p-4 flex flex-col gap-2 relative">
                        <div className="flex justify-between items-start">
                          <h4 className="text-sm font-bold text-white leading-none">
                            {getTestimonialName(index)}
                          </h4>

                          {/* Like Button */}
                          <button
                            onClick={() => handleLike(index)}
                            className="p-1.5 rounded-full hover:bg-white/10 transition-colors -mr-2 -mt-1"
                          >
                            <Heart
                              className={clsx(
                                "w-4 h-4 transition-all duration-300",
                                isLiked
                                  ? "fill-red-500 text-red-500"
                                  : "text-white/20 group-hover:text-white/40",
                              )}
                            />
                          </button>
                        </div>

                        <p className="text-sm text-gray-300 font-light leading-relaxed line-clamp-4">
                          {getTestimonialQuote(index)}
                        </p>

                        <span className="text-[10px] text-white/40 pt-2">
                          {getTestimonialRole(index)}
                        </span>
                      </div>
                    </div>
                  </div>
                </CarouselItem>
              );
            })}
          </CarouselContent>
        </div>
      </Carousel>

      {/* Like Notification Overlay */}
      <AnimatePresence>
        {showNotification && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ type: "spring", stiffness: 400, damping: 30 }}
            className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50 flex items-center gap-3 px-6 py-3 bg-white/10 backdrop-blur-md border border-white/10 rounded-full shadow-2xl"
          >
            <div className="p-1.5 bg-red-500/20 rounded-full">
              <Heart className="w-4 h-4 text-red-500 fill-current" />
            </div>
            <span className="text-sm font-medium text-white">
              You liked this feedback!
            </span>
          </motion.div>
        )}
      </AnimatePresence>
    </Section>
  );
}
