"use client";
import React, { forwardRef } from "react";
import { clsx } from "clsx";
import useEmblaCarousel, {
  type UseEmblaCarouselType,
} from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import img1 from "@/assets/images/img1.png";

const MdOutlineFormatQuote = ({ className }: { className?: string }) => (
  <svg
    className={className}
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="currentColor"
  >
    <path d="M9.99 12.15l-1.42 1.42L7.15 12 0 19.15 7.15 24 14.3 16.85 14.3 0H0v12.15h9.99zM24 0v12.15l-1.42-1.42-1.42 1.42L16.85 12 9.7 19.15 16.85 24 24 16.85V0h-9.7v12.15L24 0z" />
  </svg>
);

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
          className
        )}
        {...props}
      />
    );
  }
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
      setApi,
      plugins,
      className,
      children,
      ...props
    },
    ref
  ) => {
    const [carouselRef, api] = useEmblaCarousel(
      {
        ...opts,
        axis: orientation === "horizontal" ? "x" : "y",
      },
      plugins
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
  }
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
          className
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
        className
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
  return (
    <Section title="What Our Users Say">
      <Carousel
        opts={{ loop: true }}
        plugins={[
          Autoplay({
            delay: 1000,
            stopOnInteraction: false,
            stopOnMouseEnter: true,
          }),
        ]}
      >
        <div className="relative mx-auto max-w-2xl">
          <CarouselContent>
            {Array.from({ length: 7 }).map((_, index) => (
              <CarouselItem key={index}>
                <div className="p-2 pb-5">
                  <div className="text-center">
                    <MdOutlineFormatQuote className="text-themeDarkGray mx-auto my-4 text-4xl" />

                    <h4 className="text-1xl mx-auto max-w-lg px-10 font-semibold">
                      {getTestimonialQuote(index)}
                    </h4>

                    <div className="mt-8">
                      <img
                        width={0}
                        height={40}
                        src={companies[index % companies.length].url}
                        alt={`${companies[index % companies.length].name} Logo`}
                        className="mx-auto h-[40px] w-auto"
                      />
                    </div>

                    <h4 className="text-1xl my-2 font-semibold">
                      {getTestimonialName(index)}
                    </h4>

                    <span className="text-themeDarkGray text-sm">
                      {getTestimonialRole(index)}
                    </span>
                  </div>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>

          {/* gradient edges */}
          <div className="pointer-events-none absolute inset-y-0 left-0 h-full w-2/12 bg-gradient-to-r from-background" />
          <div className="pointer-events-none absolute inset-y-0 right-0 h-full w-2/12 bg-gradient-to-l from-background" />
        </div>
      </Carousel>
    </Section>
  );
}
