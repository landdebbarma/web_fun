import { motion } from "framer-motion";
import { Lightbulb, Users, Target, Heart } from "lucide-react";
import { cn } from "@/lib/utils";

const values = [
  {
    icon: <Lightbulb className="w-8 h-8" />,
    title: "Innovation",
    description:
      "Pushing boundaries and exploring new possibilities in AI technology. We continuously experiment with emerging models to stay ahead of the curve.",
    className: "md:col-span-2",
    gradient: "from-blue-500/20 to-cyan-500/20",
  },
  {
    icon: <Users className="w-8 h-8" />,
    title: "Collaboration",
    description:
      "Building together with our community and partners. We believe that open dialogue and shared goals lead to the most robust solutions.",
    className: "md:col-span-1",
    gradient: "from-purple-500/20 to-pink-500/20",
  },
  {
    icon: <Target className="w-8 h-8" />,
    title: "Excellence",
    description:
      "Delivering quality and reliability in everything we create. From the first line of code to the final deployment, we refuse to compromise on standards.",
    className: "md:col-span-1",
    gradient: "from-amber-500/20 to-orange-500/20",
  },
  {
    icon: <Heart className="w-8 h-8" />,
    title: "Passion",
    description:
      "Driven by our love for technology and making an impact. Our enthusiasm fuels our work, inspiring us to solve complex challenges with creativity.",
    className: "md:col-span-2",
    gradient: "from-red-500/20 to-rose-500/20",
  },
];

export const ValuesBento = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-5 max-w-5xl mx-auto">
      {values.map((value, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
          whileHover={{ scale: 1.02 }}
          className={cn(
            "group relative overflow-hidden rounded-2xl border border-gray-800 bg-black backdrop-blur-sm p-6 hover:border-gray-700 transition-all duration-500 min-h-[180px] flex flex-col justify-between",
            value.className
          )}
        >
          {/* Gradient Background */}
          <div
            className={cn(
              "absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-br",
              value.gradient
            )}
          />

          {/* Grid Pattern Overlay */}
          <div
            className="absolute inset-0 opacity-20 pointer-events-none"
            style={{
              backgroundImage: `radial-gradient(circle at 1px 1px, rgba(255,255,255,0.15) 1px, transparent 0)`,
              backgroundSize: "22px 22px",
            }}
          />

          {/* Large Faded Icon Background */}
          <div className="absolute -right-3 -bottom-3 opacity-5 group-hover:opacity-10 transition-opacity duration-500 scale-125 pointer-events-none">
            {value.icon}
          </div>

          <div className="relative z-10">
            <div className="mb-4 text-white/80 group-hover:text-white transition-colors">
              <div className="p-3 bg-white/5 rounded-xl w-fit group-hover:bg-white/10 transition-colors duration-300 border border-white/5">
                {value.icon}
              </div>
            </div>

            <div className="space-y-2">
              <h3 className="text-xl font-bold text-white group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-white/80 transition-all">
                {value.title}
              </h3>
              <p className="text-sm text-gray-400 group-hover:text-gray-300 transition-colors leading-relaxed">
                {value.description}
              </p>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
};
