import { useEffect, useState } from "react";
import { useNavigate, useSearchParams, useLocation } from "react-router-dom";
import { useAuth } from "@/app/providers/useAuth";
import { authService } from "@/services/auth";
import Cookies from "js-cookie";

const GoogleCallback = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [searchParams] = useSearchParams();
  const { login } = useAuth();
  const [error, setError] = useState<string | null>(null);
  const [processing, setProcessing] = useState(true);

  useEffect(() => {
    const handleCallback = async () => {
      try {
        let token: string | null = null;

        // Method 1: Check URL query parameters
        token =
          searchParams.get("token") ||
          searchParams.get("access_token") ||
          searchParams.get("accessToken");

        // Method 2: Check URL hash fragment (some OAuth flows use this)
        if (!token && location.hash) {
          const hashParams = new URLSearchParams(location.hash.substring(1));
          token =
            hashParams.get("token") ||
            hashParams.get("access_token") ||
            hashParams.get("accessToken");
        }

        // Method 3: Check if token was passed via state or stored temporarily
        if (!token) {
          token = sessionStorage.getItem("pending_google_token");
          if (token) {
            sessionStorage.removeItem("pending_google_token");
          }
        }

        if (!token) {
          throw new Error("No token received from authentication");
        }

        // If opened as popup, send token to opener via postMessage
        if (window.opener && !window.opener.closed) {
          window.opener.postMessage(
            { type: "GOOGLE_AUTH_SUCCESS", token },
            window.location.origin
          );
          window.close();
          return;
        }

        // Not a popup - handle normally (direct navigation)
        Cookies.set("auth_token", token, {
          expires: 7,
          secure: window.location.protocol === "https:",
          sameSite: "strict",
        });

        const userData = await authService.getCurrentUser(token);
        login(token, userData);
        setProcessing(false);
        navigate("/dashboard", { replace: true });
      } catch (err) {
        console.error("Callback error:", err);

        // If popup, send error to opener
        if (window.opener && !window.opener.closed) {
          window.opener.postMessage(
            { type: "GOOGLE_AUTH_ERROR", error: "Authentication failed" },
            window.location.origin
          );
          window.close();
          return;
        }

        setProcessing(false);
        setError("Authentication failed. Redirecting to login...");
        setTimeout(() => navigate("/login", { replace: true }), 2000);
      }
    };

    handleCallback();
  }, [navigate, login, searchParams, location.hash]);

  // Show minimal loading UI - never expose token
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900">
      <div className="text-white text-center">
        {error ? (
          <p className="text-red-400">{error}</p>
        ) : processing ? (
          <>
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto mb-4"></div>
            <p>Signing you in...</p>
          </>
        ) : null}
      </div>
    </div>
  );
};

export default GoogleCallback;
