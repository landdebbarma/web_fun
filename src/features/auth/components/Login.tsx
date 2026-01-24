import React, { useState, useEffect } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { useAuth } from "@/app/providers/useAuth";
import { authService } from "@/services/auth";
import { ROUTES } from "@/constants/routes";
import { FloatingPaths } from "@/components/ui/BackgroundPaths";
// import { motion } from "framer-motion";
import { InteractiveCharacterPolished } from "@/components/ui/InteractiveCharacter";

// --- 1. greeting messages (unchanged) ---
const GREETING_MESSAGES = [
  "Welcome Back!",
  "Hello Again!",
  "Missed You!",
  "Good to See You!",
  "Ready to Start?",
  "Let's Get Going",
  "Welcome Home",
  "Greetings, Hero",
];

const GoogleIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="16"
    fill="currentColor"
    className="bi bi-google"
    viewBox="0 0 16 16"
  >
    <path d="M15.545 6.558a9.4 9.4 0 0 1 .139 1.626c0 2.434-.87 4.492-2.384 5.885h.002C11.978 15.292 10.158 16 8 16A8 8 0 1 1 8 0a7.7 7.7 0 0 1 5.352 2.082l-2.284 2.284A4.35 4.35 0 0 0 8 3.166c-2.087 0-3.86 1.408-4.492 3.304a4.8 4.8 0 0 0 0 3.063h.003c.635 1.893 2.405 3.301 4.492 3.301 1.078 0 2.004-.276 2.722-.764h-.003a3.7 3.7 0 0 0 1.599-2.431H8v-3.08z" />
  </svg>
);
const AppleIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="16"
    fill="currentColor"
    className="bi bi-apple"
    viewBox="0 0 16 16"
  >
    <path d="M11.182.008C11.148-.03 9.923.023 8.857 1.18c-1.066 1.156-.902 2.482-.878 2.516s1.52.087 2.475-1.258.762-2.391.728-2.43m3.314 11.733c-.048-.096-2.325-1.234-2.113-3.422s1.675-2.789 1.698-2.854-.597-.79-1.254-1.157a3.7 3.7 0 0 0-1.563-.434c-.108-.003-.483-.095-1.254.116-.508.139-1.653.589-1.968.607-.316.018-1.256-.522-2.267-.665-.647-.125-1.333.131-1.824.328-.49.196-1.422.754-2.074 2.237-.652 1.482-.311 3.83-.067 4.56s.625 1.924 1.273 2.796c.576.984 1.34 1.667 1.659 1.899s1.219.386 1.843.067c.502-.308 1.408-.485 1.766-.472.357.013 1.061.154 1.782.539.571.197 1.111.115 1.652-.105.541-.221 1.324-1.059 2.238-2.758q.52-1.185.473-1.282" />
    <path d="M11.182.008C11.148-.03 9.923.023 8.857 1.18c-1.066 1.156-.902 2.482-.878 2.516s1.52.087 2.475-1.258.762-2.391.728-2.43m3.314 11.733c-.048-.096-2.325-1.234-2.113-3.422s1.675-2.789 1.698-2.854-.597-.79-1.254-1.157a3.7 3.7 0 0 0-1.563-.434c-.108-.003-.483-.095-1.254.116-.508.139-1.653.589-1.968.607-.316.018-1.256-.522-2.267-.665-.647-.125-1.333.131-1.824.328-.49.196-1.422.754-2.074 2.237-.652 1.482-.311 3.83-.067 4.56s.625 1.924 1.273 2.796c.576.984 1.34 1.667 1.659 1.899s1.219.386 1.843.067c.502-.308 1.408-.485 1.766-.472.357.013 1.061.154 1.782.539.571.197 1.111.115 1.652-.105.541-.221 1.324-1.059 2.238-2.758q.52-1.185.473-1.282" />
  </svg>
);

const Logo = () => (
  <div
    className="absolute top-6 right-6 md:top-6 md:right-6 bg-gradient-to-br from-[#0b3c47] to-[#062128] rounded-2xl shadow-2xl p-3 flex items-center justify-center z-20 border border-white/10"
    style={{ width: 56, height: 56 }}
  >
    <svg width="28" height="28" viewBox="0 0 32 32" fill="none">
      <circle cx="16" cy="16" r="16" fill="#fff" fillOpacity="0.95" />
      <path
        d="M10 16c0-3.314 2.686-6 6-6s6 2.686 6 6-2.686 6-6 6-6-2.686-6-6z"
        stroke="#0b3c47"
        strokeWidth="2.5"
      />
      <path
        d="M16 10v12"
        stroke="#0b3c47"
        strokeWidth="2.5"
        strokeLinecap="round"
      />
      <path
        d="M10 16h12"
        stroke="#0b3c47"
        strokeWidth="2.5"
        strokeLinecap="round"
      />
    </svg>
  </div>
);

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isPasswordFocused, setIsPasswordFocused] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const navigate = useNavigate();
  const { login } = useAuth();
  const [searchParams, setSearchParams] = useSearchParams();

  // Read logout message from URL params
  useEffect(() => {
    const message = searchParams.get("message");
    if (message) {
      setSuccessMessage(message);
      // Clear the URL param without navigation
      setSearchParams({}, { replace: true });
      // Auto-clear success message after 5 seconds
      const timer = setTimeout(() => setSuccessMessage(""), 5000);
      return () => clearTimeout(timer);
    }
  }, [searchParams, setSearchParams]);

  // --- 2. Initialize State with a Random Greeting ---
  const [greeting] = useState(() => {
    const randomIndex = Math.floor(Math.random() * GREETING_MESSAGES.length);
    return GREETING_MESSAGES[randomIndex];
  });

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate form
    if (!email.trim() || !password.trim()) {
      setError("Please enter both email and password");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const data = await authService.login({
        email: email.trim(),
        password: password.trim(),
      });

      const authToken =
        data?.token ||
        data?.access_token ||
        data?.accessToken ||
        data?.data?.token ||
        null;

      if (!authToken) {
        // If server didn't return a token but returned user, we can proceed cautiously
        if (data?.user) {
          login(null, data.user);
          navigate(ROUTES.DASHBOARD);
          return;
        }
        throw new Error(
          "No auth token returned from server. Please try logging in again.",
        );
      }

      // Verify token with /users/me and store user via AuthProvider
      try {
        const meData = await authService.getCurrentUser(authToken);
        login(authToken, meData);
        navigate(ROUTES.DASHBOARD);
        return;
      } catch (meError: unknown) {
        const errorObj = meError as {
          data?: { detail?: string };
          message?: string;
        };
        const detail = errorObj?.data?.detail || errorObj?.message || null;

        // Clean up any stale token if backend reports invalid/expired token
        if (
          detail &&
          /invalid|expired|not authenticated/i.test(String(detail))
        ) {
          localStorage.removeItem("auth_token");
        }

        if (detail === "Not authenticated") {
          throw new Error(
            "User not authenticated. Please register or check credentials.",
          );
        }

        throw new Error(
          String(data?.message || detail || "Login failed to validate user"),
        );
      }
    } catch (err: unknown) {
      const errorObj = err as { message?: string };
      const errorMessage = errorObj?.message || "Login failed";
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  // Listen for postMessage from Google OAuth callback
  useEffect(() => {
    const handleMessage = async (event: MessageEvent) => {
      // Only accept messages from our own origin
      if (event.origin !== window.location.origin) return;

      if (event.data?.type === "GOOGLE_AUTH_SUCCESS") {
        const token = event.data.token;
        if (token) {
          try {
            // Store token in cookie
            const Cookies = await import("js-cookie");
            Cookies.default.set("auth_token", token, {
              expires: 7,
              secure: window.location.protocol === "https:",
              sameSite: "strict",
            });

            // Get user data and redirect
            const userData = await authService.getCurrentUser(token);
            login(token, userData);
            navigate(ROUTES.DASHBOARD, { replace: true });
          } catch (err) {
            console.error("Failed to complete Google login:", err);
            setError("Login failed. Please try again.");
          }
        }
      } else if (event.data?.type === "GOOGLE_AUTH_ERROR") {
        setError(event.data.error || "Google login failed");
      }
    };

    window.addEventListener("message", handleMessage);
    return () => window.removeEventListener("message", handleMessage);
  }, [login, navigate]);

  const handleGoogleLogin = () => {
    const width = 500;
    const height = 600;
    const left = window.screen.width / 2 - width / 2;
    const top = window.screen.height / 2 - height / 2;

    const popup = window.open(
      "/auth/google/login",
      "google_login",
      `width=${width},height=${height},left=${left},top=${top}`,
    );

    if (!popup) {
      setError("Please allow popups to login with Google");
      return;
    }
  };

  return (
    // UI Update: Added deep gradient background with FloatingPaths
    <div className="min-h-screen w-full flex items-center justify-center bg-black p-4 md:p-6 font-sans relative overflow-hidden">
      <div className="absolute inset-0 opacity-40">
        <FloatingPaths position={1} />
        <FloatingPaths position={-1} />
      </div>
      {/* UI Update: Enhanced card shadow and border */}
      <div className="relative w-full max-w-[1000px] min-h-[700px] bg-gray-900/40 backdrop-blur-xl border border-white/10 rounded-[32px] shadow-2xl flex flex-col md:flex-row overflow-hidden ring-1 ring-white/5">
        {/* Left Side: Illustration Panel */}
        <div className="w-full md:w-5/12 relative flex flex-col">
          <InteractiveCharacterPolished
            isPasswordVisible={showPassword}
            isPasswordFocused={isPasswordFocused}
          />
        </div>

        {/* Right Side: Form */}
        <div className="w-full md:w-7/12 flex flex-col justify-center px-8 py-10 md:px-16 md:py-12 relative bg-white">
          <Logo />

          <div className="mb-8">
            {/* --- 3. Use the state variable here --- */}
            <h1 className="text-3xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-black  mb-3 tracking-tight">
              {greeting}
            </h1>
            <p className="text-base md:text-lg text-black">
              Please login to continue
            </p>
          </div>

          <form onSubmit={handleLogin} className="flex flex-col gap-5">
            {successMessage && (
              <div className="w-full bg-green-500/10 border border-green-500/20 text-green-700 rounded-2xl py-3 px-5 text-sm flex items-center gap-2">
                <span className="block w-1.5 h-1.5 rounded-full bg-green-500" />
                {successMessage}
              </div>
            )}
            {error && (
              <div className="w-full bg-red-500/10 border border-red-500/20 text-red-200 rounded-2xl py-3 px-5 text-sm flex items-center gap-2 animate-pulse">
                <span className="block w-1.5 h-1.5 rounded-full bg-red-400" />
                {error}
              </div>
            )}

            <div className="space-y-4">
              <input
                type="email"
                required
                placeholder="Email Address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={loading}
                className="w-full bg-white/5 border border-black/10 text-black rounded-2xl py-4 px-6 text-base outline-none focus:border-[#0b3c47] focus:ring-4 focus:ring-[#0b3c47]/10 transition-all duration-200 placeholder-gray-500 disabled:opacity-50 hover:bg-white/[0.07]"
              />
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  required
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  onFocus={() => setIsPasswordFocused(true)}
                  onBlur={() => setIsPasswordFocused(false)}
                  disabled={loading}
                  className="w-full bg-white/5 border border-black/10 text-black rounded-2xl py-4 px-6 pr-12 text-base outline-none focus:border-[#0b3c47] focus:ring-4 focus:ring-[#0b3c47]/10 transition-all duration-200 placeholder-gray-500 disabled:opacity-50 hover:bg-white/[0.07]"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-black transition-colors"
                >
                  {showPassword ? (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-5 h-5"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88"
                      />
                    </svg>
                  ) : (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-5 h-5"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                    </svg>
                  )}
                </button>
              </div>
            </div>
            <div className="flex justify-between items-center mt-2">
              <label className="flex items-center gap-2 cursor-pointer group select-none">
                <input
                  type="checkbox"
                  className="w-4 h-4 rounded border-gray-300 text-black focus:ring-black/20 cursor-pointer accent-black"
                />
                <span className="text-sm text-gray-400 group-hover:text-black transition-colors">
                  Remember me
                </span>
              </label>
              <Link
                to={ROUTES.FORGOT_PASSWORD}
                className="text-sm text-gray-400 hover:text-black transition-colors"
              >
                Forgot Password?
              </Link>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-black text-white rounded-2xl py-4 font-semibold text-lg mt-4 hover:shadow-lg hover:shadow-[#0b3c47]/20 hover:scale-[1.01] active:scale-[0.98] transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <svg
                    className="animate-spin h-5 w-5 text-black"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Processing...
                </span>
              ) : (
                "Login"
              )}
            </button>
          </form>

          <div className="flex items-center my-8">
            <div className="flex-1 h-px bg-gradient-to-r from-transparent via-gray-700 to-transparent" />
            <span className="mx-4 text-gray-500 text-xs uppercase tracking-wider font-medium">
              Or continue with
            </span>
            <div className="flex-1 h-px bg-gradient-to-r from-transparent via-gray-700 to-transparent" />
          </div>

          <div className="flex items-center gap-4 justify-center">
            <button
              type="button"
              onClick={handleGoogleLogin}
              className="flex-1 flex items-center justify-center gap-3 bg-white/5 border border-black rounded-xl py-3 hover:bg-white/10 transition-colors group"
            >
              <div className="group-hover:scale-110 transition-transform duration-200">
                <GoogleIcon />
              </div>
            </button>
            <button className="flex-1 flex items-center justify-center gap-3 bg-white/5 border border-black rounded-xl py-3 hover:bg-white/10 transition-colors group">
              <div className="text-black group-hover:scale-110 transition-transform duration-200">
                <AppleIcon />
              </div>
            </button>
          </div>

          <div className="mt-8 text-center text-black text-sm md:text-base">
            Don't have an account?{" "}
            <Link
              to="/signup"
              className="text-black/80 font-medium hover:text-[#2a9db3] transition-colors relative after:content-[''] after:absolute after:w-full after:h-px after:bg-[#2a9db3] after:bottom-0 after:left-0 after:scale-x-0 hover:after:scale-x-100 after:transition-transform"
            >
              Register here
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
