import { useEffect, useMemo, useRef, useState } from "react";

export default function FAQWithSpiral() {
  const spiralRef = useRef<HTMLDivElement | null>(null);
  const [panelOpen, setPanelOpen] = useState(false);
  const [query, setQuery] = useState("");

  // Spiral configuration
  const [cfg, setCfg] = useState({
    points: 700,
    dotRadius: 1.8,
    duration: 3.0,
    color: "#ffffff",
    gradient: "none" as
      | "none"
      | "rainbow"
      | "sunset"
      | "ocean"
      | "fire"
      | "neon"
      | "pastel"
      | "grayscale",
    pulseEffect: true,
    opacityMin: 0.25,
    opacityMax: 0.9,
    sizeMin: 0.5,
    sizeMax: 1.4,
    background: "#000000",
  });

  // Gradient presets
  const gradients: Record<string, string[]> = useMemo(
    () => ({
      none: [],
      rainbow: [
        "#ff0000",
        "#ff9900",
        "#ffff00",
        "#00ff00",
        "#0099ff",
        "#6633ff",
      ],
      sunset: ["#ff0000", "#ff9900", "#ffcc00"],
      ocean: ["#0066ff", "#00ccff", "#00ffcc"],
      fire: ["#ff0000", "#ff6600", "#ffcc00"],
      neon: ["#ff00ff", "#00ffff", "#ffff00"],
      pastel: ["#ffcccc", "#ccffcc", "#ccccff"],
      grayscale: ["#ffffff", "#999999", "#333333"],
    }),
    []
  );

  // --- Dev "tests" (runtime assertions) ------------------------------------
  // These are lightweight checks of key invariants; they don't affect users.
  useEffect(() => {
    try {
      console.assert(
        Array.isArray(gradients.none) && gradients.none.length === 0,
        "Gradient 'none' must be an empty array"
      );
      console.assert(
        cfg.sizeMin <= cfg.sizeMax,
        "sizeMin should be <= sizeMax"
      );
      console.assert(
        cfg.opacityMin <= cfg.opacityMax,
        "opacityMin should be <= opacityMax"
      );
      // Search filter sanity check
      const sample = [
        { q: "Alpha", a: "Lorem" },
        { q: "Beta", a: "Ipsum yes" },
      ];
      const filtered = sample.filter(({ q, a }) =>
        (q + a).toLowerCase().includes("yes")
      );
      console.assert(
        filtered.length === 1,
        "Filter should match one item containing 'yes'"
      );
    } catch {
      // ignore
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Keyboard shortcuts
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const k = e.key.toLowerCase();
      if (k === "h") setPanelOpen((v) => !v);
      if (k === "r") randomize();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  // Generate spiral SVG and mount
  useEffect(() => {
    if (!spiralRef.current) return;

    const SIZE = 560; // larger presence
    const GOLDEN_ANGLE = Math.PI * (3 - Math.sqrt(5));
    const N = cfg.points;
    const DOT = cfg.dotRadius;
    const CENTER = SIZE / 2;
    const PADDING = 4;
    const MAX_R = CENTER - PADDING - DOT;

    const svgNS = "http://www.w3.org/2000/svg";
    const svg = document.createElementNS(svgNS, "svg");
    svg.setAttribute("width", String(SIZE));
    svg.setAttribute("height", String(SIZE));
    svg.setAttribute("viewBox", `0 0 ${SIZE} ${SIZE}`);

    // Gradient
    if (cfg.gradient !== "none") {
      const defs = document.createElementNS(svgNS, "defs");
      const g = document.createElementNS(svgNS, "linearGradient");
      g.setAttribute("id", "spiralGradient");
      g.setAttribute("gradientUnits", "userSpaceOnUse");
      g.setAttribute("x1", "0%");
      g.setAttribute("y1", "0%");
      g.setAttribute("x2", "100%");
      g.setAttribute("y2", "100%");
      gradients[cfg.gradient].forEach((color, idx, arr) => {
        const stop = document.createElementNS(svgNS, "stop");
        stop.setAttribute("offset", `${(idx * 100) / (arr.length - 1)}%`);
        stop.setAttribute("stop-color", color);
        g.appendChild(stop);
      });
      defs.appendChild(g);
      svg.appendChild(defs);
    }

    for (let i = 0; i < N; i++) {
      const idx = i + 0.5;
      const frac = idx / N;
      const r = Math.sqrt(frac) * MAX_R;
      const theta = idx * GOLDEN_ANGLE;
      const x = CENTER + r * Math.cos(theta);
      const y = CENTER + r * Math.sin(theta);

      const c = document.createElementNS(svgNS, "circle");
      c.setAttribute("cx", x.toFixed(3));
      c.setAttribute("cy", y.toFixed(3));
      c.setAttribute("r", String(DOT));
      c.setAttribute(
        "fill",
        cfg.gradient === "none" ? cfg.color : "url(#spiralGradient)"
      );
      c.setAttribute("opacity", "0.6");

      if (cfg.pulseEffect) {
        const animR = document.createElementNS(svgNS, "animate");
        animR.setAttribute("attributeName", "r");
        animR.setAttribute(
          "values",
          `${DOT * cfg.sizeMin};${DOT * cfg.sizeMax};${DOT * cfg.sizeMin}`
        );
        animR.setAttribute("dur", `${cfg.duration}s`);
        animR.setAttribute("begin", `${(frac * cfg.duration).toFixed(3)}s`);
        animR.setAttribute("repeatCount", "indefinite");
        animR.setAttribute("calcMode", "spline");
        animR.setAttribute("keySplines", "0.4 0 0.6 1;0.4 0 0.6 1");
        c.appendChild(animR);

        const animO = document.createElementNS(svgNS, "animate");
        animO.setAttribute("attributeName", "opacity");
        animO.setAttribute(
          "values",
          `${cfg.opacityMin};${cfg.opacityMax};${cfg.opacityMin}`
        );
        animO.setAttribute("dur", `${cfg.duration}s`);
        animO.setAttribute("begin", `${(frac * cfg.duration).toFixed(3)}s`);
        animO.setAttribute("repeatCount", "indefinite");
        animO.setAttribute("calcMode", "spline");
        animO.setAttribute("keySplines", "0.4 0 0.6 1;0.4 0 0.6 1");
        c.appendChild(animO);
      }

      svg.appendChild(c);
    }

    spiralRef.current.innerHTML = "";
    spiralRef.current.appendChild(svg);
  }, [cfg, gradients]);

  // Randomizer with contrast awareness (b/w forward)
  const randomize = () => {
    const rand = (min: number, max: number) =>
      Math.random() * (max - min) + min;
    const lightColors = ["#ffffff"];
    const darkColors = ["#222222", "#111111"];
    const useLightBg = Math.random() > 0.5;

    setCfg((c) => ({
      ...c,
      points: Math.floor(rand(300, 1600)),
      dotRadius: rand(0.8, 3.2),
      duration: rand(1.2, 7.5),
      pulseEffect: Math.random() > 0.35,
      opacityMin: rand(0.1, 0.4),
      opacityMax: rand(0.6, 1.0),
      sizeMin: rand(0.4, 0.9),
      sizeMax: rand(1.2, 2.2),
      background: useLightBg ? "#f5f5f5" : "#000000",
      color: useLightBg
        ? darkColors[Math.floor(Math.random() * darkColors.length)]
        : lightColors[Math.floor(Math.random() * lightColors.length)],
      gradient:
        Math.random() > 0.6
          ? (["rainbow", "ocean", "grayscale", "neon"] as const)[
              Math.floor(Math.random() * 4)
            ]
          : "none",
    }));
  };

  // FAQ content (edit freely)
  const faqs = [
    {
      q: "Is this AI generated?",
      a: "Yes. AnToAnt uses AI to generate system design, architecture structure, and supporting guides However, the output is designed to be practical, structured, and understandable — not random or black-box content.",
    },
    {
      q: "Can I edit the system design?",
      a: "Yes. Paid plans allow you to edit, refine, and evolve your system design over time.The free tier lets you explore and view a complete project, but editing is locked.",
    },
    {
      q: "Is this beginner-friendly?",
      a: "Absolutely.AnToAnt is built to help beginners understand why a system is designed a certain way — not just give code. At the same time, it’s structured enough to be useful for experienced developers..",
    },
    {
      q: "Can I use this for client projects?",
      a: "Yes.You can use AnToAnt-generated designs and code for commercial and client work without restrictions.",
    },
    {
      q: "Will more stacks be added?",
      a: "Yes.AnToAnt currently supports a limited set of stacks, and more frontend, backend, and database stacks will be added over time.",
    },
    {
      q: "What happens after the free tier?",
      a: "The free tier gives you one non-editable project to explore AnToAnt.If you want to create more projects, edit designs, or access advanced features, you can upgrade anytime.",
    },
    {
      q: "Do I need to be good at system design to use AnToAnt?",
      a: "No.AnToAnt is meant to guide you through system design, even if you’re new to it.",
    },
    {
      q: "Is this a code generator or a learning tool?",
      a: "Both.AnToAnt helps you generate a working foundation and understand the architectural decisions behind it.",
    },
    {
      q: "Can I download the generated project?",
      a: "Yes.You can download the full project — including code, diagrams, and guides — as a ZIP file (paid plans).",
    },
    {
      q: "Is AnToAnt meant to replace developers?",
      a: "No.AnToAnt supports developers by improving clarity and decision-making — it doesn’t replace problem-solving or customization.",
    },
  ];

  const filtered = query
    ? faqs.filter(({ q, a }) =>
        (q + a).toLowerCase().includes(query.toLowerCase())
      )
    : faqs;

  return (
    <div
      className="relative min-h-screen w-full overflow-hidden text-white"
      style={{ backgroundColor: cfg.background }}
    >
      {/* Background Spiral */}
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
        <div
          ref={spiralRef}
          className="flex items-center justify-center"
          style={{
            width: "560px",
            height: "560px",
            opacity: 0.3,
            marginTop: "-100px",
          }}
        />
      </div>

      {/* Layout */}
      <div className="relative mx-auto max-w-5xl px-6 py-16">
        {/* Header */}
        <header className="mb-10 flex items-end justify-between border-b border-white/20 pb-6">
          <div>
            <h1 className="text-4xl md:text-6xl font-black tracking-tight">
              FAQ
            </h1>
            <p className="mt-2 text-sm md:text-base text-white/70">
              Frequently Asked Questions at AnToAnt.com
            </p>
          </div>
          <div className="flex items-center gap-3">
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search questions…"
              className="h-10 w-56 rounded-xl border border-white/20 bg-transparent px-3 text-sm outline-none transition focus:border-white/60"
            />
          </div>
        </header>

        {/* Content */}
        <section className="relative">
          <div className="grid grid-cols-1 gap-3 md:grid-cols-2 items-start">
            {filtered.map((item, i) => (
              <FAQItem key={i} q={item.q} a={item.a} index={i + 1} />
            ))}
          </div>
        </section>
      </div>

      {/* Control Panel */}
      {panelOpen && (
        <aside className="fixed right-4 top-4 z-20 w-[320px] rounded-2xl border border-white/15 bg-black/70 p-4 backdrop-blur">
          <h3 className="mb-3 text-sm font-semibold tracking-wide text-white/80">
            Spiral Controls
          </h3>
          <div className="space-y-3 text-xs">
            <Slider
              label="Points"
              min={100}
              max={2000}
              step={50}
              value={cfg.points}
              onChange={(v) => setCfg({ ...cfg, points: v })}
            />
            <Slider
              label="Dot radius"
              min={0.5}
              max={5}
              step={0.1}
              value={cfg.dotRadius}
              onChange={(v) => setCfg({ ...cfg, dotRadius: v })}
            />
            <Slider
              label="Duration"
              min={1}
              max={10}
              step={0.1}
              value={cfg.duration}
              onChange={(v) => setCfg({ ...cfg, duration: v })}
            />

            <Toggle
              label="Pulse"
              value={cfg.pulseEffect}
              onChange={(v) => setCfg({ ...cfg, pulseEffect: v })}
            />
            <Slider
              label="Opacity min"
              min={0}
              max={1}
              step={0.05}
              value={cfg.opacityMin}
              onChange={(v) => setCfg({ ...cfg, opacityMin: v })}
            />
            <Slider
              label="Opacity max"
              min={0}
              max={1}
              step={0.05}
              value={cfg.opacityMax}
              onChange={(v) => setCfg({ ...cfg, opacityMax: v })}
            />
            <Slider
              label="Size min"
              min={0.1}
              max={2}
              step={0.1}
              value={cfg.sizeMin}
              onChange={(v) => setCfg({ ...cfg, sizeMin: v })}
            />
            <Slider
              label="Size max"
              min={0.1}
              max={3}
              step={0.1}
              value={cfg.sizeMax}
              onChange={(v) => setCfg({ ...cfg, sizeMax: v })}
            />

            <Select
              label="Gradient"
              value={cfg.gradient}
              options={[
                { label: "None", value: "none" },
                { label: "Rainbow", value: "rainbow" },
                { label: "Sunset", value: "sunset" },
                { label: "Ocean", value: "ocean" },
                { label: "Fire", value: "fire" },
                { label: "Neon", value: "neon" },
                { label: "Pastel", value: "pastel" },
                { label: "Grayscale", value: "grayscale" },
              ]}
              onChange={(v) =>
                setCfg({ ...cfg, gradient: v as typeof cfg.gradient })
              }
            />

            <div className="flex gap-2">
              <button
                onClick={randomize}
                className="w-full rounded-xl border border-white/20 px-3 py-2 text-xs hover:border-white/50"
              >
                Randomize (R)
              </button>
              <button
                onClick={() => setPanelOpen(false)}
                className="rounded-xl border border-white/20 px-3 py-2 text-xs hover:border-white/50"
              >
                Close (H)
              </button>
            </div>
          </div>
        </aside>
      )}
    </div>
  );
}

function FAQItem({ q, a, index }: { q: string; a: string; index: number }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="group relative overflow-hidden rounded-2xl border border-white/15 bg-black/40 p-5 transition hover:border-white/40">
      <button
        onClick={() => setOpen((v) => !v)}
        className="flex w-full items-center justify-between text-left"
        aria-expanded={open}
      >
        <div className="flex items-baseline gap-3">
          <span className="text-xs text-white/40">
            {String(index).padStart(2, "0")}
          </span>
          <h3 className="text-base md:text-lg font-semibold leading-tight">
            {q}
          </h3>
        </div>
        <span className="ml-4 text-white/60 transition group-hover:text-white">
          {open ? "–" : "+"}
        </span>
      </button>
      <div
        className={`grid transition-[grid-template-rows] duration-300 ease-[cubic-bezier(.4,0,.2,1)] ${
          open ? "mt-3 grid-rows-[1fr]" : "grid-rows-[0fr]"
        }`}
      >
        <div className="min-h-0 overflow-hidden">
          <p className="text-sm text-white/70">{a}</p>
        </div>
      </div>
      {/* Hover halo */}
      <div className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100">
        <div
          className="absolute -inset-1 rounded-2xl border border-white/10"
          style={{
            maskImage:
              "radial-gradient(180px_180px_at_var(--x,50%)_var(--y,50%),white,transparent)",
          }}
        />
      </div>
    </div>
  );
}

function Slider({
  label,
  min,
  max,
  step,
  value,
  onChange,
}: {
  label: string;
  min: number;
  max: number;
  step: number;
  value: number;
  onChange: (v: number) => void;
}) {
  return (
    <label className="block">
      <div className="mb-1 flex items-center justify-between">
        <span>{label}</span>
        <span className="tabular-nums text-white/50">{value.toFixed(2)}</span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(parseFloat(e.target.value))}
        className="w-full"
      />
    </label>
  );
}

function Toggle({
  label,
  value,
  onChange,
}: {
  label: string;
  value: boolean;
  onChange: (v: boolean) => void;
}) {
  return (
    <label className="flex items-center justify-between">
      <span>{label}</span>
      <button
        onClick={() => onChange(!value)}
        className={`h-6 w-10 rounded-full border border-white/20 transition ${
          value ? "bg-white" : "bg-transparent"
        }`}
        aria-pressed={value}
      >
        <span
          className={`block h-5 w-5 translate-x-0.5 rounded-full bg-black transition ${
            value ? "translate-x-4" : "translate-x-0"
          }`}
        />
      </button>
    </label>
  );
}

function Select({
  label,
  value,
  options,
  onChange,
}: {
  label: string;
  value: string;
  options: { label: string; value: string }[];
  onChange: (v: string) => void;
}) {
  return (
    <label className="block">
      <div className="mb-1">{label}</div>
      <div className="relative">
        <select
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full appearance-none rounded-xl border border-white/20 bg-black px-3 py-2 text-xs outline-none"
        >
          {options.map((o) => (
            <option key={o.value} value={o.value}>
              {o.label}
            </option>
          ))}
        </select>
        <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-white/50">
          ▾
        </span>
      </div>
    </label>
  );
}
