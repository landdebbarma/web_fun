"use client";
import {
  motion,
  useScroll,
  useTransform,
  useMotionValueEvent,
} from "framer-motion";
import React, { useRef, useState } from "react";

interface TimelineEntry {
  title: string;
  content: React.ReactNode;
}

export const Timeline = ({ data }: { data: TimelineEntry[] }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 20%", "end 80%"], // smoother scroll effect
  });

  // Animate line growth
  const heightTransform = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);
  const opacityTransform = useTransform(scrollYProgress, [0, 0.05], [0, 1]);

  // Track active section
  useMotionValueEvent(scrollYProgress, "change", () => {
    if (!containerRef.current) return;
    const sections = containerRef.current.querySelectorAll(".timeline-section");
    let found = 0;
    sections.forEach((section, index) => {
      const rect = section.getBoundingClientRect();
      if (rect.top < window.innerHeight / 2) {
        found = index;
      }
    });
    setActiveIndex(found);
  });

  return (
    <div
      ref={containerRef}
      className="relative w-full font-sans md:px-10 overflow-hidden 
              backdrop-blur-
             rounded-2xl shadow-[0_0_1px_rgba(0,0,0,0.1)]"
    >
      {/* Header */}
      <div className="max-w-7xl mx-auto py-20 px-4 md:px-8 lg:px-10">
        <h2 className="text-lg md:text-4xl mb-4 text-white dark:text-white max-w-4xl">
          AnToAnt is built to solve real problems.
        </h2>
        <p className="text-white dark:text-neutral-300 text-sm md:text-base max-w-sm">
          We're actively expanding the features that matter in real-world
          projects. Features that developers need.
        </p>
      </div>

      {/* Timeline */}
      <div className="relative max-w-7xl mx-auto pb-20">
        {/* Animated Line — stays within box now */}
        <div className="absolute md:left-8 left-8 top-0 bottom-0 w-[2px] overflow-hidden">
          <motion.div
            style={{
              height: heightTransform,
              opacity: opacityTransform,
            }}
            className="absolute top-0 w-[2px] bg-gradient-to-t from-gray-100 via-gray-700 to-transparent rounded-full"
          />
        </div>

        {/* Timeline Items */}
        {data.map((item, index) => (
          <div
            key={index}
            className="timeline-section flex justify-start pt-10 md:pt-40 md:gap-10"
          >
            {/* Left side (circle + title) */}
            <div className="sticky flex flex-col md:flex-row z-40 items-center top-40 self-start max-w-xs lg:max-w-sm md:w-full">
              <div className="h-10 absolute left-3 md:left-3 w-10 rounded-full flex items-center justify-center">
                {/* Small Circle */}
                <motion.div
                  animate={{
                    backgroundColor: index <= activeIndex ? "#fff" : "#171717",
                    boxShadow:
                      index === activeIndex
                        ? "0 0 12px 2px rgba(96,165,250,0.6)"
                        : "none",
                    scale: index === activeIndex ? 1.3 : 1,
                  }}
                  transition={{ duration: 0.3 }}
                  className="h-4 w-4 rounded-full border border-neutral-400 dark:border-neutral-700"
                />
              </div>
              <h3 className="hidden md:block text-xl md:pl-20 md:text-5xl font-bold text-neutral-500 dark:text-neutral-500 ">
                {item.title}
              </h3>
            </div>

            {/* Right side content */}
            <div className="relative pl-20 pr-4 md:pl-4 w-full">
              <h3 className="md:hidden block text-2xl mb-4 text-left font-bold text-neutral-500 dark:text-neutral-500">
                {item.title}
              </h3>
              {item.content}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
