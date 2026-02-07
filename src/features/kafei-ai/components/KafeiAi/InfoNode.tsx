import { memo, useMemo } from "react";
import { Handle, Position, type NodeProps } from "reactflow";
import { motion } from "framer-motion";

interface InfoNodeData {
  label: string;
  icon?: string;
  description?: string;
  role?: string;
  fullPath?: string;
}

// Vibrant but professional color palette
const COLORS = [
  "bg-blue-600", // Frontend/UI
  "bg-violet-600", // Backend/API
  "bg-emerald-600", // Database/Store
  "bg-rose-600", // Auth/Security
  "bg-amber-600", // Utils/Common
  "bg-cyan-600", // Networking
  "bg-fuchsia-600", // Services
  "bg-slate-800", // Default/Core
];

// Map common keywords to specific colors for consistency
const getKeywordColor = (label: string): string | null => {
  const lower = label.toLowerCase();

  if (
    lower.includes("front") ||
    lower.includes("ui") ||
    lower.includes("client") ||
    lower.includes("page")
  )
    return "bg-blue-600";
  if (
    lower.includes("back") ||
    lower.includes("api") ||
    lower.includes("server") ||
    lower.includes("route")
  )
    return "bg-violet-600";
  if (
    lower.includes("data") ||
    lower.includes("store") ||
    lower.includes("db") ||
    lower.includes("sql") ||
    lower.includes("prisma")
  )
    return "bg-emerald-600";
  if (
    lower.includes("auth") ||
    lower.includes("login") ||
    lower.includes("user") ||
    lower.includes("guard")
  )
    return "bg-rose-600";
  if (
    lower.includes("util") ||
    lower.includes("lib") ||
    lower.includes("common") ||
    lower.includes("shared")
  )
    return "bg-amber-600";
  if (
    lower.includes("net") ||
    lower.includes("http") ||
    lower.includes("fetch")
  )
    return "bg-cyan-600";
  if (
    lower.includes("service") ||
    lower.includes("worker") ||
    lower.includes("job")
  )
    return "bg-fuchsia-600";
  if (
    lower.includes("github") ||
    lower.includes("docker") ||
    lower.includes("config") ||
    lower === "src"
  )
    return "bg-slate-800";

  return null;
};

const InfoNode = ({ data }: NodeProps<InfoNodeData>) => {
  const bgColor = useMemo(() => {
    if (!data.label) return "bg-slate-900";

    // 1. Try keyword match
    const keywordColor = getKeywordColor(data.label);
    if (keywordColor) return keywordColor;

    // 2. Fallback to hash-based consistent color
    let hash = 0;
    for (let i = 0; i < data.label.length; i++) {
      hash = data.label.charCodeAt(i) + ((hash << 5) - hash);
    }
    const index = Math.abs(hash) % COLORS.length;
    return COLORS[index];
  }, [data.label]);

  return (
    <motion.div
      initial={{ scale: 0.9, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      className={`min-w-[180px] min-h-[160px] rounded-3xl p-5 flex flex-col items-center justify-between ${bgColor} border border-white/10 shadow-[0_8px_30px_rgb(0,0,0,0.12)] hover:shadow-[0_20px_40px_rgb(0,0,0,0.2)] transition-all duration-300 group`}
    >
      {/* Target Handle */}
      <Handle
        type="target"
        position={Position.Top}
        className="!w-4 !h-1.5 !rounded-full !bg-white !border-none transition-colors opacity-0 group-hover:opacity-100"
      />

      {/* Connection Indicator (Visual Top) */}
      <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-6 h-6 rounded-full bg-black/20 backdrop-blur-sm border border-white/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
        <div className="w-1.5 h-1.5 rounded-full bg-white" />
      </div>

      {/* Icon Area */}
      <div className="w-14 h-14 rounded-2xl flex items-center justify-center p-3 mb-3 bg-white/10 backdrop-blur-md shadow-inner border border-white/20">
        {data.icon ? (
          <img
            src={data.icon}
            alt=""
            className="w-full h-full object-contain brightness-0 invert"
          />
        ) : (
          <span className="text-xl font-bold text-white">
            {data.label?.charAt(0).toUpperCase()}
          </span>
        )}
      </div>

      {/* Content Area */}
      <div className="text-center w-full">
        <h3 className="text-sm font-bold leading-tight mb-1 text-white drop-shadow-sm">
          {data.label}
        </h3>
        <p className="text-[10px] uppercase tracking-wider font-semibold text-white/60 truncate">
          {data.role || data.description?.slice(0, 20) || "Component"}
        </p>
      </div>

      {/* Source Handle */}
      <Handle
        type="source"
        position={Position.Bottom}
        className="!w-4 !h-1.5 !rounded-full !bg-white !border-none transition-colors opacity-0 group-hover:opacity-100"
      />

      {/* Auxiliary Handles for routing */}
      <Handle
        type="source"
        position={Position.Right}
        id="right"
        className="!opacity-0"
      />
      <Handle
        type="source"
        position={Position.Left}
        id="left"
        className="!opacity-0"
      />
    </motion.div>
  );
};

export default memo(InfoNode);
