import React from "react";
import { Instagram, Linkedin, Github } from "lucide-react";
import { motion } from "framer-motion";

// Link Data Configuration
const footerLinks = {
  product: [
    { label: "Features", href: "/coming-soon" },
    { label: "Pricing", href: "/coming-soon" },
    { label: "Integrations", href: "/coming-soon" },
    { label: "Changelog", href: "/coming-soon" },
  ],
  resources: [
    { label: "Documentation", href: "/coming-soon" },
    { label: "Tutorials", href: "/coming-soon" },
    { label: "Blog", href: "/coming-soon" },
    { label: "Support", href: "/coming-soon" },
  ],
  company: [
    { label: "About", href: "/about" },
    { label: "Careers", href: "/coming-soon" },
    { label: "Contact", href: "/coming-soon" },
    { label: "Partners", href: "/coming-soon" },
  ],
};

const Footer: React.FC = () => {
  return (
    <div className="relative min-h-screen flex items-center justify-center p-4 overflow-hidden font-sans">
      <style>{`
        @keyframes float {
          0%, 100% { transform: translate(-50%, 0px); }
          50% { transform: translate(-50%, -20px); }
        }
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
      `}</style>

      {/* Main Footer Card */}
      <div className="relative z-10 w-full max-w-[1200px] bg-black shadow-white rounded-[2.5rem] shadow-xl p-8 md:p-12 lg:p-16">
        {/* Background Watermark */}
        <div className="absolute top-[200px] left-1/2 -translate-x-1/2 -translate-y-1/2 select-none pointer-events-none z-0 hidden md:block ">
          <span className="text-[20vw] font-bold text-gray-200/20 tracking-tighter mix-blend-overlay">
            AnToAnt
          </span>
        </div>
        {/* Top Section */}
        <div className="flex flex-col lg:flex-row justify-between gap-12 lg:gap-24">
          {/* Brand Column */}
          <div className="flex flex-col max-w-sm">
            {/* Logo */}
            <div className="flex items-center gap-3 mb-6">
              {/* Logo Icon  */}
              <div className="flex flex-row items-center gap-3">
                <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white via-gray-200 to-gray-400 group-hover:from-white group-hover:via-blue-200 group-hover:to-blue-400 transition-all duration-300 tracking-tight">
                  AnToAnt
                </span>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/20 backdrop-blur-sm"
                >
                  <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                  <span className="text-sm font-medium text-white/80">
                    beta v1.0.0 Release
                  </span>
                </motion.div>
              </div>
            </div>

            <p className="text-gray-500 text-[15px] leading-relaxed mb-8">
              we are a team of passionate developers and designers who are
              dedicated to creating innovative and user-friendly solutions for
              our clients.
            </p>

            {/* Social Icons */}
            <div className="flex items-center gap-5 text-gray-400">
              {/* X / Twitter Icon */}
              <a
                href="/coming-soon"
                className="hover:text-white hover:scale-125 transition-all duration-300 ease-out hover:drop-shadow-[0_0_8px_rgba(255,255,255,0.5)]"
              >
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M18.244 2.25H21.552L14.325 10.51L22.827 21.75H16.17L10.956 14.933L4.99003 21.75H1.68003L9.41003 12.515L1.25403 2.25H8.08003L12.793 8.48101L18.244 2.25ZM17.083 19.77H18.916L7.08403 4.126H5.11703L17.083 19.77Z" />
                </svg>
              </a>
              <a
                href="/coming-soon"
                className="hover:text-white hover:scale-125 transition-all duration-300 ease-out hover:drop-shadow-[0_0_8px_rgba(255,255,255,0.5)]"
              >
                <Instagram size={20} strokeWidth={2.2} />
              </a>
              <a
                href="/coming-soon"
                className="hover:text-white hover:scale-125 transition-all duration-300 ease-out hover:drop-shadow-[0_0_8px_rgba(255,255,255,0.5)]"
              >
                <Linkedin
                  size={20}
                  strokeWidth={2.2}
                  fill="currentColor"
                  className="stroke-none"
                />
              </a>
              <a
                href="/coming-soon"
                className="hover:text-white hover:scale-125 transition-all duration-300 ease-out hover:drop-shadow-[0_0_8px_rgba(255,255,255,0.5)]"
              >
                <Github size={20} strokeWidth={2.2} />
              </a>
            </div>
          </div>

          {/* Links Section */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-10 lg:gap-20 flex-1 lg:justify-end">
            {/* Product */}
            <div>
              <h3 className="font-semibold text-white mb-5">Product</h3>
              <ul className="flex flex-col gap-3.5">
                {footerLinks.product.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="text-gray-500 hover:text-white hover:translate-x-2 inline-block transition-all duration-300 text-[15px]"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Resources */}
            <div>
              <h3 className="font-semibold text-white mb-5">Resources</h3>
              <ul className="flex flex-col gap-3.5">
                {footerLinks.resources.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="text-gray-500 hover:text-white hover:translate-x-2 inline-block transition-all duration-300 text-[15px]"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Company */}
            <div>
              <h3 className="font-semibold text-white mb-5">Company</h3>
              <ul className="flex flex-col gap-3.5">
                {footerLinks.company.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="text-gray-500 hover:text-white hover:translate-x-2 inline-block transition-all duration-300 text-[15px]"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="w-full h-px bg-gradient-to-r from-transparent via-gray-700 to-transparent my-10" />

        {/* Bottom Section */}
        <div className="flex flex-col-reverse md:flex-row justify-between items-center gap-6 text-sm text-gray-500">
          <p>© 2026 AnToAnt. All rights reserved.</p>

          <div className="flex items-center gap-8">
            <a
              href="/coming-soon"
              className="hover:text-white hover:underline underline-offset-4 transition-all"
            >
              Privacy Policy
            </a>
            <a
              href="/coming-soon"
              className="hover:text-white hover:underline underline-offset-4 transition-all"
            >
              Terms of Service
            </a>
            <a
              href="/coming-soon"
              className="hover:text-white hover:underline underline-offset-4 transition-all"
            >
              Cookies Settings
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
