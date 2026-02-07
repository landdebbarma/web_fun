import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ROUTES } from "@/constants/routes";
import { FloatingPaths } from "@/components/ui/BackgroundPaths";
import { ChevronLeft, Eye, EyeOff, ArrowLeft } from "lucide-react";
import { authService } from "@/services/auth";

type Step = "email" | "otp" | "password" | "success";

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

const LoadingSpinner = () => (
  <svg
    className="animate-spin h-5 w-5 text-white"
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
    />
    <path
      className="opacity-75"
      fill="currentColor"
      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
    />
  </svg>
);

const ForgotPasswordPage = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState<Step>("email");
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [resetToken, setResetToken] = useState("");

  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) {
      setError("Please enter your email address");
      return;
    }

    setLoading(true);
    setError("");

    try {
      await authService.forgotPassword(email.trim());
      setStep("otp");
    } catch (err: unknown) {
      const errorObj = err as { message?: string };
      setError(errorObj?.message || "Failed to send OTP. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleOtpSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!otp.trim()) {
      setError("Please enter the OTP");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const response = await authService.verifyOtp(email.trim(), otp.trim());
      // console.log("verify-otp response:", response);
      // Check multiple possible token field names
      const tokenValue =
        response.token ||
        (response as any).reset_token ||
        (response as any).access_token;
      if (tokenValue) {
        setResetToken(tokenValue);
        // console.log("Token captured");
      } else {
        console.warn("No token found in response!");
      }
      setStep("password");
    } catch (err: unknown) {
      const errorObj = err as { message?: string };
      setError(errorObj?.message || "Invalid OTP. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handlePasswordSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!password.trim()) {
      setError("Please enter a new password");
      return;
    }
    if (password.length < 8) {
      setError("Password must be at least 8 characters");
      return;
    }
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    setLoading(true);
    setError("");

    try {
      // console.log("Sending change-password:", { ... });
      await authService.changePassword(resetToken, password);
      setStep("success");
    } catch (err: unknown) {
      const errorObj = err as { message?: string };
      setError(
        errorObj?.message || "Failed to change password. Please try again.",
      );
    } finally {
      setLoading(false);
    }
  };

  const handleBack = () => {
    setError("");
    if (step === "otp") {
      setStep("email");
      setOtp("");
    } else if (step === "password") {
      setStep("otp");
      setPassword("");
      setConfirmPassword("");
    }
  };

  const getStepTitle = () => {
    switch (step) {
      case "email":
        return "Forgot Password?";
      case "otp":
        return "Verify OTP";
      case "password":
        return "Create New Password";
      case "success":
        return "Password Changed!";
    }
  };

  const getStepDescription = () => {
    switch (step) {
      case "email":
        return "Enter your email address and we'll send you an OTP to reset your password.";
      case "otp":
        return `We've sent a verification code to ${email}. Please enter it below.`;
      case "password":
        return "Create a strong new password for your account.";
      case "success":
        return "Your password has been successfully changed. You can now login with your new password.";
    }
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-black p-4 md:p-6 font-sans relative overflow-hidden">
      <div className="absolute inset-0 opacity-40">
        <FloatingPaths position={1} />
        <FloatingPaths position={-1} />
      </div>

      <div className="relative w-full max-w-md bg-white rounded-[32px] shadow-2xl p-8 md:p-12 z-10 flex flex-col">
        <Logo />

        <div className="mb-8 mt-4">
          {step !== "success" && (
            <button
              onClick={
                step === "email" ? () => navigate(ROUTES.LOGIN) : handleBack
              }
              className="inline-flex items-center text-gray-500 hover:text-black mb-6 transition-colors text-sm font-medium"
            >
              {step === "email" ? (
                <>
                  <ChevronLeft size={16} className="mr-1" />
                  Back to Login
                </>
              ) : (
                <>
                  <ArrowLeft size={16} className="mr-1" />
                  Back
                </>
              )}
            </button>
          )}

          <h1 className="text-3xl font-bold text-black mb-3 tracking-tight">
            {getStepTitle()}
          </h1>
          <p className="text-gray-600">{getStepDescription()}</p>
        </div>

        {error && (
          <div className="mb-6 bg-red-500/10 border border-red-500/20 text-red-700 rounded-2xl py-3 px-5 text-sm flex items-center gap-2">
            <span className="block w-1.5 h-1.5 rounded-full bg-red-500" />
            {error}
          </div>
        )}

        {/* Step 1: Email Form */}
        {step === "email" && (
          <form onSubmit={handleEmailSubmit} className="flex flex-col gap-5">
            <input
              type="email"
              required
              placeholder="Email Address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={loading}
              className="w-full bg-gray-50 border border-black/10 text-black rounded-2xl py-4 px-6 text-base outline-none focus:border-[#0b3c47] focus:ring-4 focus:ring-[#0b3c47]/10 transition-all duration-200 placeholder-gray-500 disabled:opacity-50 hover:bg-gray-100"
            />
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-black text-white rounded-2xl py-4 font-semibold text-lg hover:shadow-lg hover:shadow-[#0b3c47]/20 hover:scale-[1.01] active:scale-[0.98] transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <LoadingSpinner />
                  Sending OTP...
                </span>
              ) : (
                "Send OTP"
              )}
            </button>
          </form>
        )}

        {/* Step 2: OTP Form */}
        {step === "otp" && (
          <form onSubmit={handleOtpSubmit} className="flex flex-col gap-5">
            <input
              type="text"
              required
              placeholder="Enter OTP"
              value={otp}
              onChange={(e) =>
                setOtp(e.target.value.replace(/\D/g, "").slice(0, 6))
              }
              disabled={loading}
              maxLength={6}
              className="w-full bg-gray-50 border border-black/10 text-black rounded-2xl py-4 px-6 text-base text-center tracking-[0.5em] font-mono outline-none focus:border-[#0b3c47] focus:ring-4 focus:ring-[#0b3c47]/10 transition-all duration-200 placeholder-gray-500 disabled:opacity-50 hover:bg-gray-100"
            />
            <button
              type="submit"
              disabled={loading || otp.length < 4}
              className="w-full bg-black text-white rounded-2xl py-4 font-semibold text-lg hover:shadow-lg hover:shadow-[#0b3c47]/20 hover:scale-[1.01] active:scale-[0.98] transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <LoadingSpinner />
                  Verifying...
                </span>
              ) : (
                "Verify OTP"
              )}
            </button>
            <button
              type="button"
              onClick={handleEmailSubmit}
              disabled={loading}
              className="text-sm text-gray-500 hover:text-black transition-colors"
            >
              Didn't receive the code? Resend OTP
            </button>
          </form>
        )}

        {/* Step 3: New Password Form */}
        {step === "password" && (
          <form onSubmit={handlePasswordSubmit} className="flex flex-col gap-5">
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                required
                placeholder="New Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={loading}
                className="w-full bg-gray-50 border border-black/10 text-black rounded-2xl py-4 px-6 pr-12 text-base outline-none focus:border-[#0b3c47] focus:ring-4 focus:ring-[#0b3c47]/10 transition-all duration-200 placeholder-gray-500 disabled:opacity-50 hover:bg-gray-100"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-black transition-colors"
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
            <div className="relative">
              <input
                type={showConfirmPassword ? "text" : "password"}
                required
                placeholder="Confirm Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                disabled={loading}
                className="w-full bg-gray-50 border border-black/10 text-black rounded-2xl py-4 px-6 pr-12 text-base outline-none focus:border-[#0b3c47] focus:ring-4 focus:ring-[#0b3c47]/10 transition-all duration-200 placeholder-gray-500 disabled:opacity-50 hover:bg-gray-100"
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-black transition-colors"
              >
                {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
            <p className="text-xs text-gray-500">
              Password must be at least 8 characters long
            </p>
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-black text-white rounded-2xl py-4 font-semibold text-lg hover:shadow-lg hover:shadow-[#0b3c47]/20 hover:scale-[1.01] active:scale-[0.98] transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <LoadingSpinner />
                  Changing Password...
                </span>
              ) : (
                "Change Password"
              )}
            </button>
          </form>
        )}

        {/* Step 4: Success */}
        {step === "success" && (
          <div className="flex flex-col gap-6">
            <div className="bg-green-500/10 border border-green-500/20 text-green-700 rounded-2xl p-6 text-center">
              <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2}
                  stroke="white"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4.5 12.75l6 6 9-13.5"
                  />
                </svg>
              </div>
              <h3 className="font-semibold text-lg mb-2">Success!</h3>
              <p className="text-sm">
                Your password has been changed successfully.
              </p>
            </div>
            <Link
              to={ROUTES.LOGIN}
              className="w-full bg-black text-white rounded-2xl py-4 font-semibold text-lg text-center hover:shadow-lg hover:shadow-[#0b3c47]/20 hover:scale-[1.01] active:scale-[0.98] transition-all duration-200"
            >
              Back to Login
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default ForgotPasswordPage;
