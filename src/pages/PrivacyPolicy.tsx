import { useEffect } from "react";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import { AntRoad } from "../components/ui/AntRoad";

const PrivacyPolicy = () => {
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
          {/* Background Image */}
          <div
            className="absolute inset-0 bg-cover bg-center bg-no-repeat transform scale-105"
            style={{
              backgroundImage: 'url("/privacy-hero-bg.png")',
            }}
          />

          {/* Gradient Overlay for Text Readability */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/60" />
          <div className="absolute inset-0 bg-gradient-to-r from-blue-900/20 to-purple-900/20 mix-blend-overlay" />

          {/* Hero Content */}
          <div className="absolute inset-0 flex flex-col justify-center items-center text-center px-6 max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight text-white mb-6 drop-shadow-xl">
              We care about your privacy
            </h1>
            <p className="text-lg md:text-xl text-gray-200/90 font-light max-w-2xl leading-relaxed drop-shadow-md">
              Your privacy is important to us at Antoant. We respect your
              privacy regarding any information we may collect from you across
              our website.
            </p>
          </div>
        </div>

        {/* Content Section */}
        <div className="max-w-[900px] mx-auto px-4 md:px-0 pb-20">
          <div className="space-y-16 text-gray-300">
            {/* Introduction - Lead Text */}
            <div className="prose prose-lg prose-invert max-w-none">
              <p className="text-xl text-gray-400 leading-relaxed font-light">
                Welcome to Antoant. This Privacy Policy explains how we collect,
                use, disclose, and protect your information when you use our
                platform. By accessing or using Antoant, you agree to this
                Privacy Policy.
              </p>
            </div>

            {/* Sections Loop */}
            <div className="space-y-16">
              <PolicySection title="Information We Collect">
                <p className="mb-6 text-gray-400">
                  We collect information that you provide directly to us, such
                  as when you create an account, update your profile, or
                  communicate with us. This may include:
                </p>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="bg-white/5 p-6 rounded-2xl border border-white/5 hover:border-white/10 transition-colors">
                    <h4 className="text-white font-semibold mb-3">
                      Personal Information
                    </h4>
                    <ul className="space-y-2 text-sm text-gray-400">
                      <li className="flex items-center gap-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                        Name and email address
                      </li>
                      <li className="flex items-center gap-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                        Phone number
                      </li>
                      <li className="flex items-center gap-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                        Profile information
                      </li>
                    </ul>
                  </div>
                  <div className="bg-white/5 p-6 rounded-2xl border border-white/5 hover:border-white/10 transition-colors">
                    <h4 className="text-white font-semibold mb-3">
                      Technical Data
                    </h4>
                    <ul className="space-y-2 text-sm text-gray-400">
                      <li className="flex items-center gap-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-purple-500" />
                        IP address & device info
                      </li>
                      <li className="flex items-center gap-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-purple-500" />
                        Session duration & logs
                      </li>
                      <li className="flex items-center gap-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-purple-500" />
                        Cookies & usage data
                      </li>
                    </ul>
                  </div>
                </div>
              </PolicySection>

              <PolicySection title="How We Use Your Information">
                <p className="mb-6 text-gray-400">
                  We use the information we collect to provide, maintain, and
                  improve our services, including but not limited to:
                </p>
                <ul className="space-y-4">
                  {[
                    "Creating and managing your user account",
                    "Authenticating your identity securely",
                    "Providing customer support and responding to inquiries",
                    "Sending service-related updates and notifications",
                    "Detecting and preventing fraud or abuse",
                  ].map((item, i) => (
                    <li
                      key={i}
                      className="flex items-start gap-3 text-gray-400 group"
                    >
                      <span className="mt-1.5 w-5 h-[1px] bg-gray-600 group-hover:bg-white transition-colors" />
                      {item}
                    </li>
                  ))}
                </ul>
              </PolicySection>

              <PolicySection title="Data Sharing & Disclosure">
                <p className="text-gray-400 mb-6">
                  We do <span className="text-white font-semibold">not</span>{" "}
                  sell your personal data. We may share your information only in
                  specific circumstances:
                </p>
                <div className="pl-6 border-l w-full border-gray-800 space-y-6">
                  <div>
                    <h4 className="text-white font-medium mb-1">
                      Service Providers
                    </h4>
                    <p className="text-sm text-gray-500">
                      We may share data with trusted third-party vendors (e.g.,
                      AWS, Email Services) who assist in operating our platform.
                    </p>
                  </div>
                  <div>
                    <h4 className="text-white font-medium mb-1">
                      Legal Requirements
                    </h4>
                    <p className="text-sm text-gray-500">
                      We may disclose information if required by law or in
                      response to valid requests by public authorities.
                    </p>
                  </div>
                </div>
              </PolicySection>

              <PolicySection title="Cookies & Tracking">
                <p className="text-gray-400 mb-4">
                  We use cookies and similar technologies to authenticate users,
                  maintain sessions, and prevent unauthorized access.
                </p>
                <p className="text-gray-400">
                  You can control cookies through your browser settings, though
                  some features of the platform may not function correctly
                  without them.
                </p>
              </PolicySection>

              <PolicySection title="Your Rights">
                <p className="text-gray-400 mb-6">
                  Depending on your location, you may have specific rights
                  regarding your personal data:
                </p>
                <div className="grid grid-cols-2 gap-4">
                  {[
                    "Access Personal Data",
                    "Request Deletion",
                    "Correct Inaccuracies",
                    "Withdraw Consent",
                  ].map((right) => (
                    <div
                      key={right}
                      className="p-4 bg-white/[0.03] rounded-lg text-center text-sm font-medium text-gray-300 hover:bg-white/[0.06] hover:text-white transition-all cursor-default"
                    >
                      {right}
                    </div>
                  ))}
                </div>
              </PolicySection>

              <PolicySection title="Contact Us">
                <p className="text-gray-400">
                  If you have any questions about this Privacy Policy, please
                  contact us at:
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

export default PrivacyPolicy;
