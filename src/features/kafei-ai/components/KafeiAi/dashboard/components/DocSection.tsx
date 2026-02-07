import React from "react";
import { useSmoothStreaming } from "@/hooks/useSmoothStreaming";
import { motion } from "framer-motion";

interface DocSectionProps {
  title: string;
  content: string;
  isDarkMode: boolean;
  isStreaming?: boolean;
}

export const DocSection: React.FC<DocSectionProps> = ({
  title,
  content,
  isDarkMode,
  isStreaming = false,
}) => {
  const displayedContent = useSmoothStreaming(content, 5, isStreaming);
  const isTyping = displayedContent.length < content.length;

  return (
    <div className="space-y-3 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <h3
        className={`text-lg font-semibold flex items-center gap-2 ${
          isDarkMode ? "text-white" : "text-black"
        }`}
      >
        {title}
        {isTyping && (
          <span className="flex h-2 w-2 relative">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-purple-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-purple-500"></span>
          </span>
        )}
      </h3>
      <div
        className={`p-5 rounded-xl border leading-relaxed text-sm whitespace-pre-wrap ${
          isDarkMode
            ? "bg-[#111] border-white/5 text-gray-300"
            : "bg-white border-gray-100 text-gray-700 shadow-sm"
        }`}
      >
        {displayedContent}
        {isTyping && (
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{
              repeat: Infinity,
              duration: 0.8,
              repeatType: "reverse",
            }}
            className={`inline-block w-1.5 h-4 ml-1 align-middle ${
              isDarkMode ? "bg-purple-400" : "bg-purple-600"
            }`}
          />
        )}
      </div>
    </div>
  );
};
