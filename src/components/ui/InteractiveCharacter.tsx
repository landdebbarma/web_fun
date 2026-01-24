"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";

export const InteractiveCharacterPolished = ({
  isPasswordVisible = false,
  isPasswordFocused = false,
}: {
  isPasswordVisible?: boolean;
  isPasswordFocused?: boolean;
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isClicking, setIsClicking] = useState(false);
  const [blink, setBlink] = useState(false);

  // Idle Emotion State: "neutral", "happy", "suspicious", "surprised", "funny"
  const [idleEmotion, setIdleEmotion] = useState("neutral");

  // Mouse Tracking
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const centerX = window.innerWidth / 2;
      const centerY = window.innerHeight / 2;
      const x = (e.clientX - centerX) / (window.innerWidth / 2);
      const y = (e.clientY - centerY) / (window.innerHeight / 2);
      setMousePosition({ x, y });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  // Blinking Logic
  useEffect(() => {
    const blinkLoop = () => {
      setBlink(true);
      setTimeout(() => setBlink(false), 150);
      const nextBlink = Math.random() * 4000 + 2000;
      setTimeout(blinkLoop, nextBlink);
    };
    const timeoutId = setTimeout(blinkLoop, 2000);
    return () => clearTimeout(timeoutId);
  }, []);

  // Idle Emotion Cycling
  useEffect(() => {
    if (isHovered || isPasswordFocused || isPasswordVisible) return;

    const emotions = ["neutral", "suspicious", "surprised", "happy", "funny"];
    const cycleEmotions = () => {
      const randomEmotion =
        emotions[Math.floor(Math.random() * emotions.length)];
      setIdleEmotion(randomEmotion);

      const nextChange = Math.random() * 5000 + 3000;
      setTimeout(cycleEmotions, nextChange);
    };

    const timeoutId = setTimeout(cycleEmotions, 3000);
    return () => clearTimeout(timeoutId);
  }, [isHovered, isPasswordFocused, isPasswordVisible]);

  // Determine Effective Emotion
  let emotion = idleEmotion;
  if (isPasswordVisible) emotion = "innocent";
  else if (isPasswordFocused) emotion = "nosy";
  else if (isClicking) emotion = "surprised";
  else if (isHovered) emotion = "love";

  // Movement & Positioning Logic
  let headX = mousePosition.x * 15;
  let headY = mousePosition.y * 10;
  let eyeX = mousePosition.x * 20;
  let eyeY = mousePosition.y * 15;

  // Modify positions based on emotion
  if (emotion === "nosy") {
    // Lean in / Move head down and towards the cursor more aggressively
    headY = headY + 15; // Move closer
    headX = headX * 1.5; // Exaggerate X movement to "peek" around
    eyeY = eyeY + 10;
  } else if (emotion === "innocent") {
    // Look away (Up and Left)
    eyeX = -25;
    eyeY = -25;
    headX = -10;
    headY = -15; // Tilt head up
  }

  return (
    <div className="flex flex-col items-center justify-center h-full w-full bg-[#050505] overflow-hidden font-sans">
      <motion.div
        className="relative transition-transform duration-500 ease-out cursor-pointer"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onMouseDown={() => setIsClicking(true)}
        onMouseUp={() => setIsClicking(false)}
        animate={{
          scale: isClicking ? 0.95 : emotion === "nosy" ? 1.05 : 1,
        }}
        transition={{ duration: 0.3 }}
      >
        <svg
          viewBox="0 0 400 400"
          className="w-[400px] h-[400px] drop-shadow-[0_0_30px_rgba(255,255,255,0.1)]"
          style={{ overflow: "visible" }}
        >
          {/* --- DEFS --- */}
          <defs>
            <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="3" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
          </defs>

          {/* --- ANTENNA --- */}
          <motion.g
            animate={{
              x: headX,
              y: headY,
              rotate:
                emotion === "happy" || emotion === "love"
                  ? [0, -10, 5, -5, 0]
                  : emotion === "funny"
                    ? [0, 20, -20, 10, -10, 0]
                    : emotion === "nosy"
                      ? [0, 5, -5, 0] // Twitching antenna when nosy
                      : 0,
            }}
            style={{ originX: "100px", originY: "100px" }}
            transition={{
              rotate: {
                duration: emotion === "funny" ? 0.5 : 2,
                repeat: Infinity,
                repeatDelay: emotion === "funny" ? 0 : 0.5,
              },
            }}
          >
            <path
              d="M105 105 L90 80 L90 60 L75 45"
              fill="none"
              stroke="#E5E5E5"
              strokeWidth="8"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <motion.circle
              cx="75"
              cy="40"
              r="7"
              animate={{
                fill:
                  emotion === "love"
                    ? "#ec4899"
                    : emotion === "suspicious" || emotion === "nosy"
                      ? "#f59e0b"
                      : emotion === "funny"
                        ? "#8b5cf6"
                        : "#E5E5E5",
              }}
            />
          </motion.g>

          {/* --- SIDE BUMPERS (Ears) --- */}
          <motion.g
            animate={{ x: headX * 0.5, y: headY * 0.5 }}
            transition={{ type: "spring", stiffness: 200, damping: 20 }}
          >
            <path
              d="M50 160 L50 210"
              stroke="#525252"
              strokeWidth="14"
              strokeLinecap="round"
              fill="none"
            />
            <path
              d="M350 160 L350 210"
              stroke="#525252"
              strokeWidth="14"
              strokeLinecap="round"
              fill="none"
            />
          </motion.g>

          {/* --- MAIN HEAD SHAPE --- */}
          <motion.path
            d="M120 100 L280 100 L320 140 L320 240 L280 280 L120 280 L80 240 L80 140 Z"
            fill="#0a0a0a"
            stroke="#E5E5E5"
            strokeWidth="16"
            strokeLinejoin="round"
            animate={{ x: headX, y: headY }}
            transition={{ type: "spring", stiffness: 200, damping: 20 }}
          />

          {/* --- EYES CONTAINER --- */}
          <motion.g
            animate={{ x: eyeX, y: eyeY }}
            transition={{ type: "spring", stiffness: 250, damping: 25 }}
          >
            {/* 1. LEFT EYE PATCH */}
            <path
              d="M110 150 L160 140 L190 150 L195 210 L180 240 L120 250 L100 200 Z"
              fill="#262626"
              stroke="none"
            />

            {/* 2. THE 'X' EYE (Animated) */}
            <g transform="translate(145, 195)">
              <motion.g
                animate={{
                  rotate:
                    emotion === "love"
                      ? 45
                      : emotion === "suspicious"
                        ? 15
                        : emotion === "innocent"
                          ? -15
                          : emotion === "funny"
                            ? [0, 360]
                            : 0,
                  scale:
                    emotion === "surprised" || emotion === "nosy" ? 1.2 : 1,
                }}
                transition={
                  emotion === "funny"
                    ? { duration: 1, repeat: Infinity, ease: "linear" }
                    : { duration: 0.3 }
                }
              >
                <line
                  x1="-15"
                  y1="-15"
                  x2="15"
                  y2="15"
                  stroke={
                    emotion === "love"
                      ? "#ec4899"
                      : emotion === "funny"
                        ? "#8b5cf6"
                        : "#E5E5E5"
                  }
                  strokeWidth="8"
                  strokeLinecap="round"
                />
                <line
                  x1="15"
                  y1="-15"
                  x2="-15"
                  y2="15"
                  stroke={
                    emotion === "love"
                      ? "#ec4899"
                      : emotion === "funny"
                        ? "#8b5cf6"
                        : "#E5E5E5"
                  }
                  strokeWidth="8"
                  strokeLinecap="round"
                />
              </motion.g>
            </g>

            {/* 3. RIGHT EYE (The Expressive One) */}
            <g transform="translate(230, 170)">
              <motion.rect
                width="25"
                height="40"
                rx="4"
                x="-2.5"
                y="-2.5"
                fill={
                  emotion === "love"
                    ? "#ec4899"
                    : emotion === "funny"
                      ? "#8b5cf6"
                      : "#3b82f6"
                }
                className="opacity-20"
              />

              {emotion === "love" ? (
                <motion.path
                  d="M10 5 Q15 0 20 5 T20 20 L10 32 L0 20 Q0 0 10 5"
                  fill="#ec4899"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                />
              ) : (
                <motion.path
                  fill={
                    emotion === "suspicious" || emotion === "nosy"
                      ? "#f59e0b"
                      : emotion === "funny"
                        ? "#8b5cf6"
                        : "#3b82f6"
                  }
                  animate={{
                    d:
                      emotion === "nosy"
                        ? "M0 10 Q10 0 20 10 V35 H0 Z" // Wide open curious eye
                        : emotion === "innocent"
                          ? "M0 15 Q10 25 20 15 V35 H0 Z" // Looking UP/Away (pupil feels shifted)
                          : emotion === "happy"
                            ? "M0 15 Q10 5 20 15 V35 H0 Z"
                            : emotion === "suspicious"
                              ? "M0 12 H20 V22 H0 Z"
                              : emotion === "surprised"
                                ? "M10 0 A10 10 0 0 1 10 35 A10 10 0 0 1 10 0"
                                : emotion === "funny"
                                  ? "M5 0 A10 10 0 0 1 5 35 A5 10 0 0 1 5 0"
                                  : "M0 0 H20 V35 H0 Z",
                    scaleY: blink && emotion !== "nosy" ? 0.1 : 1, // Don't blink when nosy/peeking!
                    y: emotion === "funny" ? [0, -5, 0] : 0,
                  }}
                  transition={{
                    d: { duration: 0.3 },
                    scaleY: { duration: 0.1 },
                    y: { duration: 0.5, repeat: Infinity },
                  }}
                />
              )}
            </g>
          </motion.g>

          {/* --- MOUTH --- */}
          <motion.path
            fill={emotion === "funny" ? "#ef4444" : "none"}
            stroke={emotion === "funny" ? "none" : "#E5E5E5"}
            strokeWidth={emotion === "funny" ? "0" : "6"}
            strokeLinecap="round"
            animate={{
              x: headX,
              y: headY,
              d:
                emotion === "nosy"
                  ? "M190 250 Q200 260 210 250" // Small 'o' mouth (curious)
                  : emotion === "innocent"
                    ? "M180 250 Q190 245 200 250" // Small whistle side mouth
                    : emotion === "happy" || emotion === "love"
                      ? "M160 245 Q200 270 240 245"
                      : emotion === "surprised"
                        ? "M190 245 Q200 260 210 245"
                        : emotion === "suspicious"
                          ? "M170 250 L230 245"
                          : emotion === "funny"
                            ? "M180 250 Q200 280 220 250"
                            : "M160 250 Q200 250 240 250",
            }}
            transition={{ duration: 0.3 }}
          />
        </svg>

        {/* --- STATUS UI --- */}
        <motion.div
          className="absolute -bottom-16 left-0 right-0 flex justify-center"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="flex items-center gap-3">
            <motion.span
              className={`w-2 h-2 rounded-full`}
              animate={{
                backgroundColor:
                  emotion === "innocent"
                    ? "#3b82f6" // Blue for innocent
                    : emotion === "nosy"
                      ? "#f59e0b" // Orange/Amber
                      : emotion === "love"
                        ? "#ec4899"
                        : emotion === "funny"
                          ? "#8b5cf6"
                          : "#22c55e",
                opacity: [1, 0.5, 1],
              }}
              transition={{ duration: 2, repeat: Infinity }}
            />
            <span className="font-mono text-gray-400 text-sm tracking-[0.2em] uppercase">
              {emotion === "innocent"
                ? "DIDN'T_SEE_IT"
                : emotion === "nosy"
                  ? "TRYING_TO_LOOK"
                  : emotion === "love"
                    ? "LOVE_MODE"
                    : emotion === "suspicious"
                      ? "ANALYZING"
                      : emotion === "surprised"
                        ? "ALERT"
                        : emotion === "funny"
                          ? "BRAIN_FREEZE"
                          : "SYSTEM_ONLINE"}
            </span>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};
