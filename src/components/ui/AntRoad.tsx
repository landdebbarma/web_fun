import { useEffect, useRef, useState } from "react";
import {
  motion,
  useScroll,
  useSpring,
  useMotionValue,
  useAnimationFrame,
  MotionValue,
} from "framer-motion";

export const AntRoad = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const pathRef = useRef<SVGPathElement>(null);
  const [pathLength, setPathLength] = useState(0);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  // Track window scroll for the whole page/container
  const { scrollYProgress } = useScroll();

  // Smooth out the scroll progress
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 13,
    damping: 15,
    mass: 1,
    restDelta: 0.001,
  });

  // Update dimensions on resize
  useEffect(() => {
    const updateDimensions = () => {
      if (containerRef.current) {
        const { clientWidth, clientHeight } = containerRef.current;
        setDimensions({ width: clientWidth, height: clientHeight });
      }
    };

    window.addEventListener("resize", updateDimensions);
    updateDimensions();

    return () => window.removeEventListener("resize", updateDimensions);
  }, []);

  // Effect to calculate path length
  useEffect(() => {
    if (pathRef.current) {
      setPathLength(pathRef.current.getTotalLength());
    }
  }, [dimensions]);

  // Generate a path that swings from left to right border
  const generatePath = (width: number, height: number) => {
    if (width === 0 || height === 0) return "";

    const padding = 80;
    const maxLeft = padding;
    const maxRight = width - padding;
    const centerX = width / 2;

    let d = `M ${centerX} 0`;
    let currentY = 0;
    let currentX = centerX;

    const swingHeight = 800;
    let goingRight = true;

    while (currentY < height) {
      const targetX = goingRight ? maxRight : maxLeft;
      const targetY = currentY + swingHeight;

      const cp1x = currentX;
      const cp1y = currentY + swingHeight * 0.5;
      const cp2x = targetX;
      const cp2y = targetY - swingHeight * 0.5;

      d += ` C ${cp1x} ${cp1y}, ${cp2x} ${cp2y}, ${targetX} ${targetY}`;

      currentX = targetX;
      currentY = targetY;
      goingRight = !goingRight;
    }

    return d;
  };

  const pathD = generatePath(dimensions.width, dimensions.height);

  // Number of ants and their spacing (as a percentage of path, approximated here)
  // For better spacing, we can use a small percentage offset since pathLength varies.
  const ants = [0, 0.012, 0.024, 0.036, 0.048];

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 pointer-events-none z-0 overflow-hidden"
    >
      <svg className="w-full h-full" preserveAspectRatio="none">
        {/* The Curve Line */}
        <path
          ref={pathRef}
          d={pathD}
          fill="none"
          stroke="rgba(255, 255, 255, 0.2)"
          strokeWidth="3"
          strokeLinecap="round"
        />
      </svg>

      {/* Render Multiple Ants */}
      {ants.map((offset, index) => {
        const cargoTypes = ["none", "sugar", "leaf", "cookie", "berry"];
        const cargo = cargoTypes[index % cargoTypes.length] as
          | "none"
          | "sugar"
          | "leaf"
          | "cookie"
          | "berry";

        return (
          <WalkingAnt
            key={index}
            offset={offset}
            progress={smoothProgress}
            pathRef={pathRef}
            pathLength={pathLength}
            cargo={cargo}
          />
        );
      })}
    </div>
  );
};

// Sub-component for individual ant movement
const WalkingAnt = ({
  offset,
  progress,
  pathRef,
  pathLength,
  cargo,
}: {
  offset: number;
  progress: MotionValue<number>;
  pathRef: React.RefObject<SVGPathElement | null>;
  pathLength: number;
  cargo: "none" | "sugar" | "leaf" | "cookie" | "berry";
}) => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotate = useMotionValue(0);
  const opacity = useMotionValue(0); // Start hidden until position is valid

  useAnimationFrame(() => {
    if (!pathRef.current || pathLength === 0) return;

    // Calculate effective progress with offset (lag)
    let currentP = progress.get() - offset;

    // Only show if started
    if (currentP < 0) {
      opacity.set(0);
      return;
    }

    // Clamp to end
    if (currentP > 1) currentP = 1;

    opacity.set(1);

    const distance = currentP * pathLength;
    const point = pathRef.current.getPointAtLength(distance);

    const lookAhead = Math.min(distance + 10, pathLength);
    const nextPoint = pathRef.current.getPointAtLength(lookAhead);

    const angle =
      Math.atan2(nextPoint.y - point.y, nextPoint.x - point.x) *
      (180 / Math.PI);

    x.set(point.x);
    y.set(point.y);
    rotate.set(angle + 90);
  });

  return (
    <motion.div
      style={{
        x,
        y,
        rotate,
        opacity,
        position: "absolute",
        top: 0,
        left: 0,
        width: 0,
        height: 0,
        zIndex: 10, // Ensure on top of line
      }}
    >
      <div className="relative -ml-5 -mt-5 w-10 h-10 flex items-center justify-center filter drop-shadow-[0_0_5px_rgba(255,255,255,0.3)]">
        <AntIcon cargo={cargo} />
      </div>
    </motion.div>
  );
};

// Ant Icon Component
const AntIcon = ({
  cargo,
}: {
  cargo: "none" | "sugar" | "leaf" | "cookie" | "berry";
}) => {
  const legTransition = {
    repeat: Infinity,
    repeatType: "mirror" as const,
    duration: 0.15,
    ease: "linear" as const, // Fix type inference
  };

  const antennaTransition = {
    repeat: Infinity,
    repeatType: "mirror" as const,
    duration: 0.4,
    ease: "easeInOut" as const, // Fix type inference
  };

  const renderCargo = () => {
    switch (cargo) {
      case "sugar":
        // A jagged crystal chunk
        return (
          <g transform="translate(50, 20) rotate(15)">
            <path
              d="M-8 0 L0 -8 L10 -2 L8 8 L-2 10 Z"
              fill="#f9fafb"
              stroke="#e5e7eb"
              strokeWidth="0.5"
              fillOpacity="0.9"
              className="drop-shadow-sm"
            />
            <path
              d="M0 -8 L2 -2 L8 8"
              stroke="#e5e7eb"
              strokeWidth="0.5"
              fill="none"
            />
          </g>
        );
      case "leaf":
        // A natural leaf shape covering the ant slightly (behind mandibles visually)
        return (
          <g transform="translate(50, 28) rotate(-20)">
            <path
              d="M0 0 Q-15 -30 0 -50 Q15 -30 0 0"
              fill="#4ade80"
              stroke="#22c55e"
              strokeWidth="1"
            />
            <path
              d="M0 0 Q0 -25 0 -48"
              stroke="#15803d"
              strokeWidth="0.5"
              fill="none"
            />
          </g>
        );
      case "cookie":
        // An irregular crumb
        return (
          <g transform="translate(50, 22)">
            <path
              d="M-8 0 Q-12 -10 0 -14 Q10 -12 12 -2 Q10 8 0 8 Q-6 6 -8 0"
              fill="#d97706"
              stroke="#92400e"
              strokeWidth="0.5"
            />
            {/* Choco chips */}
            <circle cx="-3" cy="-5" r="1.5" fill="#451a03" />
            <circle cx="4" cy="-2" r="1.5" fill="#451a03" />
            <circle cx="0" cy="3" r="1" fill="#451a03" />
          </g>
        );
      case "berry":
        // A shiny round berry
        return (
          <g transform="translate(50, 20)">
            <circle
              cx="0"
              cy="0"
              r="9"
              fill="#be185d"
              stroke="#831843"
              strokeWidth="0.5"
            />
            {/* Highlight */}
            <ellipse
              cx="-3"
              cy="-3"
              rx="3"
              ry="2"
              fill="white"
              fillOpacity="0.4"
              transform="rotate(-45)"
            />
          </g>
        );
      default:
        return null;
    }
  };

  return (
    <svg
      width="40"
      height="40"
      viewBox="0 0 100 100"
      xmlns="http://www.w3.org/2000/svg"
      className="drop-shadow-lg"
    >
      {/* Cargo Payload (Rendered below jaws/in front of head) */}
      {renderCargo()}

      {/* Body: Head, Thorax, Abdomen */}
      <circle cx="50" cy="35" r="8" fill="white" />
      <ellipse cx="50" cy="52" rx="7" ry="9" fill="white" />
      <ellipse cx="50" cy="75" rx="10" ry="14" fill="white" />

      {/* Legs Animation Groups (Tripod Gait) */}

      {/* Group A: L1, R2, L3 */}
      <motion.g
        initial={{ rotate: -8 }}
        animate={{ rotate: 8 }}
        transition={legTransition}
        style={{ originX: "50px", originY: "50px" }}
      >
        {/* Left Front (L1) */}
        <path d="M43,48 L30,45" stroke="white" strokeWidth="2" fill="none" />
        {/* Right Mid (R2) */}
        <path d="M57,55 L70,60" stroke="white" strokeWidth="2" fill="none" />
        {/* Left Back (L3) */}
        <path d="M43,62 L30,75" stroke="white" strokeWidth="2" fill="none" />
      </motion.g>

      {/* Group B: R1, L2, R3 */}
      <motion.g
        initial={{ rotate: 8 }}
        animate={{ rotate: -8 }}
        transition={legTransition}
        style={{ originX: "50px", originY: "50px" }}
      >
        {/* Right Front (R1) */}
        <path d="M57,48 L70,45" stroke="white" strokeWidth="2" fill="none" />
        {/* Left Mid (L2) */}
        <path d="M43,55 L30,60" stroke="white" strokeWidth="2" fill="none" />
        {/* Right Back (R3) */}
        <path d="M57,62 L70,75" stroke="white" strokeWidth="2" fill="none" />
      </motion.g>

      {/* Antennae (Wiggle) */}
      <motion.g
        initial={{ rotate: 5 }}
        animate={{ rotate: -5 }}
        transition={antennaTransition}
        style={{ originX: "50px", originY: "35px" }}
      >
        <path
          d="M46,28 Q40,20 35,22"
          stroke="white"
          strokeWidth="1.5"
          fill="none"
        />
        <path
          d="M54,28 Q60,20 65,22"
          stroke="white"
          strokeWidth="1.5"
          fill="none"
        />
      </motion.g>
    </svg>
  );
};
