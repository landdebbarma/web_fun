"use client";
import { motion } from "framer-motion";
import { MovingBorder } from "./MovingBorder";

import {
  AlertTriangle,
  Code,
  Rocket,
  Lightbulb,
  Target,
  Sparkles,
} from "lucide-react";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const problems = [
  {
    icon: Code,
    title: "No System Design",
    description:
      "No clear system design before coding begins, leading to structural issues later.",
    className: "md:col-span-1 md:row-span-1",
  },
  {
    icon: AlertTriangle,
    title: "Blind Boilerplate",
    description:
      "Boilerplate copied without understanding why, creating technical debt from day one.",
    className: "md:col-span-1 md:row-span-1",
  },
  {
    icon: Rocket,
    title: "Late Deployment",
    description:
      "Deployment figured out at the very end, causing last-minute scrambles and failures.",
    className: "md:col-span-2 md:row-span-1",
  },
  {
    icon: Target,
    title: "Unclear Requirements",
    description:
      "Building without knowing exactly what to build, resulting in wasted effort.",
    className: "md:col-span-1 md:row-span-1",
  },
];

const solutions = [
  {
    icon: Lightbulb,
    title: "No Guesswork",
    description:
      "Understand exactly what to build and why, before writing a single line of code.",
    className: "md:col-span-1 md:row-span-1",
  },
  {
    icon: Sparkles,
    title: "No Messy Refactors",
    description:
      "Get the architecture right from the start, eliminating painful rewrites.",
    className: "md:col-span-1 md:row-span-1",
  },
  {
    icon: Rocket,
    title: "Production Ready",
    description:
      "Be deployment-ready before even starting the project, not after.",
    className: "md:col-span-2 md:row-span-1",
  },
  {
    icon: Target,
    title: "Clear Direction",
    description:
      "Every decision is informed, every path is mapped out before you begin.",
    className: "md:col-span-1 md:row-span-1",
  },
];

const BentoCard = ({
  children,
  className,
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.95 }}
    whileInView={{ opacity: 1, scale: 1 }}
    viewport={{ once: true }}
    transition={{ duration: 0.5, delay }}
    className={cn(
      "group relative overflow-hidden rounded-3xl bg-neutral-900/50 border border-white/10 p-5 md:p-6 hover:bg-neutral-900/80 transition-colors duration-300",
      className
    )}
  >
    {children}
  </motion.div>
);

const WhyAnToAnt = () => {
  return (
    <section className="relative w-full bg-black py-20 md:py-24 overflow-hidden px-4 md:px-6">
      <div className="max-w-6xl mx-auto relative">
        {/* Intersection Connector - Desktop Only */}
        <div className="hidden md:block absolute left-[66.66%] top-1/2 -translate-x-1/2 -translate-y-1/2 w-24 h-24 pointer-events-none z-20">
          <div className="absolute inset-0 flex items-center justify-center">
            {/* ... SVG ... */}
            <svg
              width="100"
              height="100"
              viewBox="0 0 100 100"
              className="overflow-visible opacity-80"
            >
              <defs>
                <linearGradient
                  id="corner-grad"
                  x1="0%"
                  y1="0%"
                  x2="100%"
                  y2="100%"
                >
                  <stop offset="0%" stopColor="#555" stopOpacity="0" />
                  <stop offset="40%" stopColor="#fff" stopOpacity="0.5" />
                  <stop offset="60%" stopColor="#fff" stopOpacity="0.5" />
                  <stop offset="100%" stopColor="#555" stopOpacity="0" />
                </linearGradient>
              </defs>
              <path
                d="M 0,0 Q 50,0 50,50 Q 50,100 100,100"
                fill="none"
                stroke="url(#corner-grad)"
                strokeWidth="2"
                className="drop-shadow-[0_0_5px_rgba(255,255,255,0.3)]"
              />

              <circle
                cx="100"
                cy="100"
                r="4"
                fill="#fff"
                className="animate-pulse"
              />
              <circle
                cx="100"
                cy="100"
                r="8"
                fill="none"
                stroke="#fff"
                strokeOpacity="0.2"
                className="animate-ping-slow"
              />
            </svg>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 auto-rows-[minmax(140px,auto)] relative z-10">
          {/* 1. Pros Card - Large (2x2) - AnToAnt Advantage */}
          <BentoCard className="md:col-span-2 md:row-span-2 bg-gradient-to-br from-neutral-800/50 to-neutral-900/50">
            <div className="h-full flex flex-col">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center border border-white/20">
                  <Sparkles className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-white leading-tight">
                    AnToAnt <span className="text-white">Advantage</span>
                  </h2>
                  <p className="text-sm text-white/50">
                    Clarity before complexity
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 flex-1">
                {solutions.map((item, i) => (
                  <div
                    key={i}
                    className="bg-white/5 rounded-xl p-3 border border-white/5 flex gap-3 items-start hover:bg-white/10 transition-colors"
                  >
                    <item.icon className="w-5 h-5 text-white/80 mt-0.5 shrink-0" />
                    <div>
                      <h3 className="text-white font-medium text-sm">
                        {item.title}
                      </h3>
                      <p className="text-white/40 text-xs mt-1">
                        {item.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </BentoCard>

          {/* 2. Highlight Card - The "Mess" (1x1) */}
          <BentoCard className="md:col-span-1 md:row-span-1 flex flex-col justify-center items-center text-center bg-white/5 border-white/10">
            <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center mb-3 border border-white/20">
              <Target className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-white font-bold mb-1">Missed Targets</h3>
            <p className="text-white/40 text-xs">
              Without structure, you build the wrong thing.
            </p>
          </BentoCard>

          {/* 3. Highlight Card - The "Delay" (1x1) */}
          <BentoCard className="md:col-span-1 md:row-span-1 flex flex-col justify-center items-center text-center bg-white/5 border-white/10">
            <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center mb-3 border border-white/20">
              <Rocket className="w-6 h-6 text-white transform rotate-90" />
            </div>
            <h3 className="text-white font-bold mb-1">Late Launch</h3>
            <p className="text-white/40 text-xs">
              Last minute chaos delays your deployment.
            </p>
          </BentoCard>

          {/* 4. Cons Card - Large (2x2) with Moving Border - Why Projects Fail */}
          <MovingBorder
            as="div"
            containerClassName="md:col-span-2 md:row-span-2 w-full h-full p-0 bg-transparent rounded-3xl"
            className="bg-neutral-900/50 border-neutral-800 p-6 items-start justify-start flex-col"
          >
            <div className="h-full flex flex-col w-full">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center border border-white/20">
                  <AlertTriangle className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-white leading-tight">
                    Why Projects <span className="text-white/60">Fail</span>
                  </h2>
                  <p className="text-sm text-white/50">
                    Common pitfalls to avoid
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 flex-1 w-full">
                {problems.map((item, i) => (
                  <div
                    key={i}
                    className="bg-white/5 rounded-xl p-3 border border-white/5 flex gap-3 items-start hover:bg-white/10 transition-colors"
                  >
                    <item.icon className="w-5 h-5 text-white/80 mt-0.5 shrink-0" />
                    <div>
                      <h3 className="text-white font-medium text-sm">
                        {item.title}
                      </h3>
                      <p className="text-white/40 text-xs mt-1">
                        {item.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Connection Point Anchor if needed */}
            <div className="absolute top-4 right-4 w-3 h-3 rounded-full bg-neutral-700 border border-neutral-500 hidden md:block ring-4 ring-black" />
          </MovingBorder>

          {/* 5. Highlight Card - The "Win" (1x2) - Tall graphic or summary */}
          <BentoCard className="md:col-span-1 md:row-span-2 flex flex-col justify-center items-center text-center bg-white/5 border-white/10">
            <div className="mb-6 relative">
              <div className="w-20 h-20 rounded-full bg-white/10 flex items-center justify-center animate-pulse border border-white/10">
                <Lightbulb className="w-10 h-10 text-white" />
              </div>
              <div className="absolute -top-2 -right-2 bg-white text-black text-[10px] px-2 py-0.5 rounded-full font-bold">
                RESULT
              </div>
            </div>
            <h3 className="text-white font-bold text-xl mb-2">
              Production Ready
            </h3>
            <p className="text-white/50 text-sm px-4">
              Skip the setup, the boilerplate, and the confusion. Start shipping
              immediately.
            </p>
          </BentoCard>
        </div>
      </div>
    </section>
  );
};

export default WhyAnToAnt;
