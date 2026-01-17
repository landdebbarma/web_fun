import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

interface GlitchSwapProps {
  text: string;
  logoSrc: string;
  className?: string;
  logoClassName?: string;
}

export const GlitchSwap: React.FC<GlitchSwapProps> = ({
  text,
  logoSrc,
  className,
  logoClassName,
}) => {
  const [isLogo, setIsLogo] = useState(false);
  const [isGlitching, setIsGlitching] = useState(false);

  useEffect(() => {
    const swapInterval = setInterval(() => {
      triggerGlitchSwap();
    }, 4000);

    return () => clearInterval(swapInterval);
  }, []);

  const triggerGlitchSwap = () => {
    setIsGlitching(true);

    // Swap content mid-glitch
    setTimeout(() => {
      setIsLogo((prev) => !prev);
    }, 300); // Halfway through the 600ms glitch

    // End glitch
    setTimeout(() => {
      setIsGlitching(false);
    }, 600);
  };

  return (
    <div className="relative flex items-center justify-center w-full h-full">
      {/* Main Content */}
      <div className={`relative z-10 ${isGlitching ? "invisible" : "visible"}`}>
        {isLogo ? (
          <div className={logoClassName}>
            <img
              src={logoSrc}
              alt="Logo"
              className="w-full h-full object-contain"
            />
          </div>
        ) : (
          <div className={className}>{text}</div>
        )}
      </div>

      {/* Glitch Layers - Only visible during glitching */}
      {isGlitching && (
        <>
          {/* Main Glitch Layer - heavily distorted composite */}
          <motion.div
            className={`absolute inset-0 z-20 flex items-center justify-center ${
              isLogo ? logoClassName : className
            }`} // Use NEXT state style roughly? No, use current or mix.
            // Actually, purely visual chaos is better. We'll render the "Target" state mostly.
          >
            {/* We render PREV state briefly, then NEXT state. 
                    But to simplify, let's just render the "Next" state distorted.
                 */}
            {/* To make it look like a transform, we can render BOTH for a split second or just the "Next" one aggressively sliced. */}
            {!isLogo ? ( // If we are switching TO text (currently Logo mid-swap), render Text
              <div className={className}>{text}</div>
            ) : (
              <div className={logoClassName}>
                <img
                  src={logoSrc}
                  alt="Logo"
                  className="w-full h-full object-contain"
                />
              </div>
            )}
          </motion.div>

          {/* RGB Split Layers */}
          <GlitchLayer
            offset={-5}
            color="text-red-500"
            role={isLogo ? "logo" : "text"}
            text={text}
            logoSrc={logoSrc}
            textClass={className}
            logoClass={logoClassName}
          />
          <GlitchLayer
            offset={5}
            color="text-blue-500"
            role={isLogo ? "logo" : "text"}
            text={text}
            logoSrc={logoSrc}
            textClass={className}
            logoClass={logoClassName}
          />
          <GlitchLayer
            offset={-3}
            color="text-green-500"
            role={isLogo ? "logo" : "text"}
            text={text}
            logoSrc={logoSrc}
            textClass={className}
            logoClass={logoClassName}
          />
        </>
      )}
    </div>
  );
};

// Helper for the chaotic layers
const GlitchLayer = ({
  offset,
  color,
  role,
  text,
  logoSrc,
  textClass,
  logoClass,
}: {
  offset: number;
  color: string;
  role: "text" | "logo";
  text: string;
  logoSrc: string;
  textClass?: string;
  logoClass?: string;
}) => {
  return (
    <motion.div
      className={`absolute inset-0 z-20 mix-blend-screen opacity-70 flex items-center justify-center ${color}`}
      initial={{ x: 0, y: 0 }}
      animate={{
        x: [0, offset, -offset, offset / 2, 0],
        y: [0, offset / 2, -offset, 0],
        clipPath: [
          "inset(0 0 0 0)",
          "inset(20% 0 10% 0)",
          "inset(0 0 50% 0)",
          "inset(60% 0 20% 0)",
          "inset(0 0 0 0)",
        ],
      }}
      transition={{ duration: 0.3, repeat: 1 }}
    >
      {role === "text" ? (
        // Note: We need to force color for text to match the layer color for RGB effect
        // However, the input className has colors. We might need to override.
        // For simplicity, we just use the shape. The 'color' prop is for container text color.
        <div
          className={`${textClass} text-inherit bg-clip-text text-transparent`}
        >
          {text}
        </div>
      ) : (
        <div className={logoClass}>
          <img src={logoSrc} alt="" className="w-full h-full object-contain" />
        </div>
      )}
    </motion.div>
  );
};
