import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

const ComingSoon = () => {
  const navigate = useNavigate();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Trigger animation start after mount
    const timer = setTimeout(() => setIsVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen w-full bg-black flex flex-col items-center justify-center overflow-hidden relative selection:bg-white selection:text-black">
      {/* Eclipse Container */}
      <div
        className={`relative z-10 transition-opacity duration-1000 ease-in-out ${
          isVisible ? "opacity-100" : "opacity-0"
        }`}
      >
        {/* The Solar Eclipse */}
        <div className="relative w-64 h-64 md:w-80 md:h-80 lg:w-96 lg:h-96 flex items-center justify-center mx-auto mb-16">
          {/* Outer Glow (Corona) */}
          <div className="absolute inset-0 rounded-full bg-white blur-xl opacity-20 animate-pulse-slow"></div>

          {/* Inner Light Ring */}
          <div className="absolute inset-0 rounded-full shadow-[0_0_50px_10px_rgba(255,255,255,0.4)] animate-ring-breathing"></div>

          {/* The Moon (Blocking Object) */}
          <div className="relative w-full h-full bg-black rounded-full z-20 shadow-[0_0_15px_2px_rgba(255,255,255,0.3)]"></div>

          {/* Asymmetric Flare (Diamond Ring Effect hint) */}
          <div className="absolute -top-1 -right-1 w-full h-full rounded-full z-10 shadow-[10px_-10px_60px_0px_rgba(255,255,240,0.2)] opacity-60"></div>
        </div>

        {/* Text Content */}
        <div className="text-center z-30 relative px-4">
          <h1
            className="text-white text-3xl md:text-5xl lg:text-7xl font-bold tracking-[0.4em] md:tracking-[0.6em] mb-6 ml-4 md:ml-8 animate-fade-in-up"
            style={{ fontFamily: '"Funnel Display", sans-serif' }}
          >
            COMING SOON
          </h1>
          <p
            className="text-neutral-400 text-sm md:text-base tracking-[0.8em] md:tracking-[1.2em] uppercase ml-2 md:ml-4 animate-fade-in-up-delay"
            style={{ fontFamily: '"Funnel Sans", sans-serif' }}
          >
            ANTOANT
          </p>
        </div>
      </div>

      {/* Minimal Navigation Buttons */}
      <div
        className={`absolute bottom-12 flex gap-8 z-30 transition-all duration-1000 delay-500 ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
        }`}
      >
        <button
          onClick={() => navigate(-1)}
          className="text-neutral-500 hover:text-white text-xs md:text-sm tracking-widest uppercase transition-colors duration-300 flex items-center gap-2 group"
        >
          <span className="transform group-hover:-translate-x-1 transition-transform inline-block">
            ←
          </span>{" "}
          Back
        </button>
        <button
          onClick={() => navigate("/")}
          className="text-neutral-500 hover:text-white text-xs md:text-sm tracking-widest uppercase transition-colors duration-300 flex items-center gap-2 group"
        >
          Home{" "}
          <span className="transform group-hover:translate-x-1 transition-transform inline-block">
            →
          </span>
        </button>
      </div>

      {/* Subtle Fog/Grain Overlay */}
      <div className="absolute inset-0 z-0 bg-noise opacity-[0.03] pointer-events-none"></div>

      <style>{`
        @keyframes ring-breathing {
          0%, 100% { box-shadow: 0 0 25px 5px rgba(255, 255, 255, 0.4); }
          50% { box-shadow: 0 0 45px 10px rgba(255, 255, 255, 0.5); }
        }
        .animate-ring-breathing {
          animation: ring-breathing 4s ease-in-out infinite;
        }
        .animate-pulse-slow {
          animation: pulse 6s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in-up {
          animation: fadeIn 1.5s ease-out forwards;
        }
        .animate-fade-in-up-delay {
          animation: fadeIn 1.5s ease-out 0.3s forwards;
          opacity: 0; /* Starts hidden */
        }
        .bg-noise {
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E");
        }
      `}</style>
    </div>
  );
};

export default ComingSoon;
