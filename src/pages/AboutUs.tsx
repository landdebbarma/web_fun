import { Navbar, Footer } from "@/components/layout";
import { SEO } from "@/components/common";
import { ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import TestimonialsEditorial from "@/components/ui/TestimonialsEditorial";
import { motion } from "framer-motion";
import { ValuesBento } from "@/components/ui/ValuesBento";
import { FeedbackInput } from "@/components/ui/FeedbackInput";

const AboutUs = () => {
  const navigate = useNavigate();

  const stats = [
    { value: "100+", label: "Projects Delivered" },
    { value: "50K+", label: "API Calls Daily" },
    { value: "99.9%", label: "Uptime" },
    { value: "24/7", label: "Support" },
  ];

  return (
    <>
      <SEO
        title="About Us"
        description="Learn about AnToAnt's mission to revolutionize commerce with AI. Meet our team, discover our values, and join us in building the future."
        canonical="/about"
      />
      <div className="relative w-full min-h-screen bg-black text-white overflow-hidden">
        {/* Subtle grid pattern */}
        <div
          className="absolute inset-0 opacity-20 pointer-events-none"
          style={{
            backgroundImage: `linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px),
                           linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)`,
            backgroundSize: "60px 60px",
          }}
        />

        <header className="fixed top-0 left-0 w-full z-50 h-20 bg-black/80 backdrop-blur-md border-b border-gray-900">
          <Navbar />
        </header>

        <main className="pt-32 pb-20 relative z-10">
          {/* Hero Section */}
          <section className="max-w-7xl mx-auto px-6 mb-32">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center"
            >
              <h1 className="text-6xl md:text-8xl font-bold mb-6 text-white">
                About <span className="text-gray-500">AnToAnt</span>
              </h1>
              <p className="text-xl md:text-2xl text-gray-500 max-w-3xl mx-auto">
                Building the future of AI-powered solutions, one innovation at a
                time
              </p>
            </motion.div>
          </section>

          {/* Mission Section */}
          <section className="max-w-7xl mx-auto px-6 mb-32">
            <div className="grid md:grid-cols-2 gap-16 items-center">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                <h2 className="text-5xl font-bold mb-6 text-white">
                  Our Mission
                </h2>
                <p className="text-lg text-gray-500 mb-6">
                  At AnToAnt, we're revolutionizing the way businesses interact
                  with AI technology. Our mission is to make advanced AI
                  accessible, intuitive, and powerful for everyone.
                </p>
                <p className="text-lg text-gray-500">
                  We believe in creating tools that empower developers,
                  businesses, and innovators to build the future without
                  limitations.
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
                className="relative"
              >
                <div className="absolute -inset-1 bg-gray-800 rounded-3xl blur-2xl opacity-50" />
                <div className="relative bg-black border border-gray-800 rounded-3xl p-12">
                  <div className="grid grid-cols-2 gap-8">
                    {stats.map((stat, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
                        className="text-center"
                      >
                        <div className="text-5xl font-bold text-white mb-2">
                          {stat.value}
                        </div>
                        <div className="text-sm text-gray-500">
                          {stat.label}
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </motion.div>
            </div>
          </section>

          {/* Values Section */}
          <section className="max-w-7xl mx-auto px-6 mb-32">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-5xl font-bold text-center mb-16 text-white"
            >
              Our Values
            </motion.h2>
            <ValuesBento />
          </section>

          {/* Team Section */}
          <section className="max-w-7xl mx-auto px-6 mb-32">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center"
            >
              <h2 className="text-5xl font-bold mb-6 text-white">
                Our Founders
              </h2>
            </motion.div>

            <div className="w-full">
              <TestimonialsEditorial />
            </div>
          </section>

          {/* CTA Section */}
          <section className="max-w-7xl mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="relative"
            >
              <div className="absolute -inset-1 bg-gray-800 rounded-3xl blur-2xl opacity-40" />
              <div className="relative bg-gray-900 border border-gray-800 rounded-3xl p-16 text-center">
                <h2 className="text-5xl font-bold mb-6 text-white">
                  Ready to Start Building?
                </h2>
                <p className="text-xl text-gray-500 mb-8 max-w-2xl mx-auto">
                  Join thousands of developers already using AnToAnt to power
                  their AI applications
                </p>
                <motion.button
                  onClick={() => navigate("/login")}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.98 }}
                  className="bg-white text-black px-10 py-4 rounded-full font-semibold hover:bg-gray-200 transition-colors duration-300 inline-flex items-center gap-2"
                >
                  Get Started
                  <ArrowRight className="w-5 h-5" />
                </motion.button>
              </div>
            </motion.div>
          </section>

          <FeedbackInput />
        </main>

        <Footer />
      </div>
    </>
  );
};

export default AboutUs;
