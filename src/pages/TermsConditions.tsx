import { useEffect } from "react";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import { AntRoad } from "../components/ui/AntRoad";

const TermsConditions = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="relative min-h-screen bg-black text-white font-sans selection:bg-blue-500/30">
      <AntRoad />
      {/* Navigation Bar (Simple) */}
      <div className="fixed top-0 left-0 right-0 z-50 px-6 py-4 flex items-center bg-black/50 backdrop-blur-md">
        <Link
          to="/"
          className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors group"
        >
          <div className="p-2 rounded-full bg-white/5 group-hover:bg-white/10 transition-colors">
            <ArrowLeft size={20} />
          </div>
          <span className="font-medium">Back to Home</span>
        </Link>
      </div>

      <div className="w-full max-w-[1400px] mx-auto p-4 md:p-6 pt-24">
        {/* Rounded Hero Section */}
        <div className="relative w-full h-[400px] md:h-[500px] rounded-[30px] md:rounded-[48px] overflow-hidden mb-16 md:mb-24 shadow-2xl shadow-blue-900/10">
          {/* Background Image - re-using privacy hero bg for consistency or we could use another one if available, but I'll stick to a similar style */}
          <div
            className="absolute inset-0 bg-cover bg-center bg-no-repeat transform scale-105"
            style={{
              backgroundImage: 'url("/privacy-hero-bg.png")', // Using same BG as privacy policy for now
            }}
          />

          {/* Gradient Overlay for Text Readability */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/60" />
          <div className="absolute inset-0 bg-gradient-to-r from-blue-900/20 to-purple-900/20 mix-blend-overlay" />

          {/* Hero Content */}
          <div className="absolute inset-0 flex flex-col justify-center items-center text-center px-6 max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight text-white mb-6 drop-shadow-xl">
              Terms & Conditions
            </h1>
            <p className="text-lg md:text-xl text-gray-200/90 font-light max-w-2xl leading-relaxed drop-shadow-md">
              Please read these terms carefully before creating your account. By
              accessing or using Antoant, you agree to be bound by these Terms &
              Conditions.
            </p>
          </div>
        </div>

        {/* Content Section */}
        <div className="max-w-[900px] mx-auto px-4 md:px-0 pb-20">
          <div className="space-y-16 text-gray-300">
            {/* Introduction - Lead Text */}
            <div className="prose prose-lg prose-invert max-w-none">
              <p className="text-xl text-gray-400 leading-relaxed font-light">
                Terms & Conditions
                <br />
                Last updated: January 21, 2026
              </p>
            </div>

            {/* Sections Loop */}
            <div className="space-y-16">
              <PolicySection title="1. Acceptance of Terms">
                <p className="mb-6 text-gray-400">
                  By accessing or using Antoant, you agree to these Terms &
                  Conditions. If you do not agree, you must not use the
                  platform.
                </p>
              </PolicySection>

              <PolicySection title="2. Eligibility">
                <p className="mb-6 text-gray-400">
                  You must be at least 13 years old.
                  <br />
                  You must provide accurate and complete account information.
                </p>
              </PolicySection>

              <PolicySection title="3. Account Responsibilities">
                <p className="mb-6 text-gray-400">You are responsible for:</p>
                <ul className="space-y-2 text-sm text-gray-400">
                  <li className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                    Maintaining the confidentiality of your credentials
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                    All activities under your account
                  </li>
                </ul>
                <p className="mt-4 text-gray-400">
                  Antoant is not liable for unauthorized access caused by your
                  failure to secure your account.
                </p>
              </PolicySection>

              <PolicySection title="4. Acceptable Use">
                <p className="mb-6 text-gray-400">You agree not to:</p>
                <ul className="space-y-2 text-sm text-gray-400">
                  <li className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-purple-500" />
                    Use the platform for illegal activities
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-purple-500" />
                    Upload malicious or harmful content
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-purple-500" />
                    Attempt to hack, exploit, or reverse-engineer the system
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-purple-500" />
                    Interfere with platform functionality or security
                  </li>
                </ul>
              </PolicySection>

              <PolicySection title="5. User Content">
                <p className="mb-6 text-gray-400">
                  You retain ownership of your content.
                  <br />
                  You grant Antoant a limited, non-exclusive license to store,
                  process, and display content solely to operate the service.
                </p>
              </PolicySection>

              <PolicySection title="6. AI Features">
                <p className="mb-6 text-gray-400">
                  AI-powered features are provided “as is” and may produce
                  inaccurate or incomplete results.
                  <br />
                  You are solely responsible for verifying AI-generated outputs
                  before relying on them.
                </p>
              </PolicySection>

              <PolicySection title="7. Pre-Beta Disclaimer">
                <p className="mb-6 text-gray-400">
                  Antoant is currently in pre-beta:
                </p>
                <ul className="space-y-2 text-sm text-gray-400">
                  <li className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                    Features may change without notice
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                    Downtime or data loss may occur
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                    Performance is not guaranteed
                  </li>
                </ul>
              </PolicySection>

              <PolicySection title="8. Account Termination">
                <p className="mb-6 text-gray-400">
                  We reserve the right to suspend or terminate accounts:
                </p>
                <ul className="space-y-2 text-sm text-gray-400">
                  <li className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-purple-500" />
                    For violation of these terms
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-purple-500" />
                    For security or legal reasons
                  </li>
                </ul>
                <p className="mt-4 text-gray-400">
                  You may stop using the service at any time.
                </p>
              </PolicySection>

              <PolicySection title="9. Intellectual Property">
                <p className="mb-6 text-gray-400">
                  All platform code, branding, designs, and trademarks belong to
                  Antoant.
                  <br />
                  You may not copy, distribute, or reproduce any part without
                  written permission.
                </p>
              </PolicySection>

              <PolicySection title="10. Disclaimer of Warranties">
                <p className="mb-6 text-gray-400">
                  Antoant is provided “AS IS” without warranties of any kind,
                  including implied warranties of accuracy, reliability, or
                  fitness for a particular purpose.
                </p>
              </PolicySection>

              <PolicySection title="11. Limitation of Liability">
                <p className="mb-6 text-gray-400">
                  To the maximum extent permitted by law:
                </p>
                <ul className="space-y-2 text-sm text-gray-400">
                  <li className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                    Antoant is not liable for indirect, incidental, or
                    consequential damages
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                    Total liability shall not exceed any amount paid by you (if
                    applicable)
                  </li>
                </ul>
              </PolicySection>

              <PolicySection title="12. Governing Law">
                <p className="mb-6 text-gray-400">
                  These Terms & Conditions are governed by the laws of India.
                </p>
              </PolicySection>

              <PolicySection title="13. Changes to Terms">
                <p className="mb-6 text-gray-400">
                  We may modify these terms at any time. Continued use of the
                  platform constitutes acceptance of the updated terms.
                </p>
              </PolicySection>

              <PolicySection title="14. Contact">
                <p className="text-gray-400">
                  If you have any questions, please contact us at:
                </p>
                <a
                  href="mailto:hr@antoant.com"
                  className="inline-block mt-4 text-xl font-medium text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400 hover:from-blue-300 hover:to-purple-300 transition-all border-b border-gray-700 pb-1"
                >
                  hr@antoant.com
                </a>
              </PolicySection>

              <div className="pt-12 border-t border-gray-800 text-sm text-gray-500">
                <p>Last updated: January 21, 2026</p>
                <p className="mt-2">© 2026 Antoant. All rights reserved.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Helper Component for consistency
const PolicySection = ({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) => (
  <section className="group">
    <h2 className="text-3xl font-bold text-white mb-6 group-hover:text-blue-200 transition-colors">
      {title}
    </h2>
    <div className="text-lg leading-relaxed">{children}</div>
  </section>
);

export default TermsConditions;
