import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export const UserGuideToggle: React.FC = () => {
  const [enabled, setEnabled] = useState(true);
  const [step, setStep] = useState(0);

  const STEPS = [
    {
      title: "Interactive System Graph",
      content:
        "Welcome! This interactive graph visualizes your project structure dynamically.",
      icon: "👋",
    },
    {
      title: "Expand & Collapse",
      content:
        "Click on any folder node (colored box) to reveal or hide its contents. It helps keep the view clean.",
      icon: "📂",
    },
    {
      title: "Color Coded",
      content:
        "Nodes are automatically colored by type: Violet for Backend, Blue for Frontend, Emerald for DB, etc.",
      icon: "🎨",
    },
  ];

  const handleNext = () => {
    if (step < STEPS.length - 1) {
      setStep(step + 1);
    } else {
      setEnabled(false);
      setStep(0); // Reset for next time
    }
  };

  return (
    <div className="flex flex-col items-end gap-2 relative z-50">
      {/* Toggle Button */}
      <button
        onClick={() => setEnabled(!enabled)}
        className={`flex items-center gap-2 px-3 py-1.5 rounded-full border transition-all duration-300 ${
          enabled
            ? "bg-black border-white/20 text-white"
            : "bg-white/80 dark:bg-black/50 border-gray-200 dark:border-white/10 text-gray-600 dark:text-gray-300 backdrop-blur-sm"
        }`}
      >
        <span className="text-xs font-semibold tracking-wide uppercase">
          Guide
        </span>
        <div
          className={`w-8 h-4 rounded-full relative transition-colors duration-300 ${
            enabled ? "bg-white/20" : "bg-gray-300 dark:bg-white/10"
          }`}
        >
          <motion.div
            layout
            initial={false}
            animate={{ x: enabled ? 16 : 2 }}
            className={`absolute top-0.5 w-3 h-3 rounded-full shadow-sm transition-colors duration-300 ${
              enabled ? "bg-white" : "bg-white"
            }`}
          />
        </div>
      </button>

      {/* Guide Popup - Step by Step Wizard */}
      <AnimatePresence mode="wait">
        {enabled && (
          <motion.div
            key={step}
            initial={{ opacity: 0, x: 20, scale: 0.95 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: -20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="fixed top-28 right-6 w-80 bg-white/95 dark:bg-[#111]/95 backdrop-blur-xl border border-gray-200 dark:border-white/10 rounded-2xl p-6 shadow-2xl text-left z-[100]"
          >
            <div className="flex items-start gap-4 mb-4">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-blue-500/10 to-purple-500/10 border border-white/10 flex items-center justify-center flex-shrink-0 text-2xl">
                {STEPS[step].icon}
              </div>
              <div className="space-y-1">
                <span className="text-[10px] font-bold uppercase tracking-widest text-blue-500">
                  Step {step + 1}/{STEPS.length}
                </span>
                <h4 className="text-base font-bold text-gray-900 dark:text-white leading-tight">
                  {STEPS[step].title}
                </h4>
              </div>
            </div>

            <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed mb-6">
              {STEPS[step].content}
            </p>

            <div className="flex items-center justify-between pt-4 border-t border-gray-100 dark:border-white/5">
              <button
                onClick={() => setEnabled(false)}
                className="text-xs font-medium text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors"
              >
                Skip
              </button>
              <button
                onClick={handleNext}
                className="bg-black dark:bg-white text-white dark:text-black text-xs font-bold px-4 py-2 rounded-full hover:scale-105 active:scale-95 transition-transform"
              >
                {step === STEPS.length - 1 ? "Finish" : "Next"}
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
