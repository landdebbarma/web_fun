import React, { useState, useEffect } from "react";
import {
  X,
  User,
  Settings,
  Crown,
  Mail,
  Calendar,
  Shield,
  LogOut,
  Bell,
  Lock,
  Sun,
  Moon,
  Globe,
  Check,
  ChevronDown,
  Loader2,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useDarkMode } from "./useDarkMode";
import { authService } from "@/services/auth";

interface ProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  activeTab: "profile" | "settings" | "upgrade";
  onTabChange: (tab: "profile" | "settings" | "upgrade") => void;
  onSignOut: () => void;
}

interface UserData {
  id?: string;
  name?: string;
  email?: string;
  created_at?: string;
  plan?: string;
  verified?: boolean;
  verifiedDate?: string;
  [key: string]: unknown;
}

const ProfileModal: React.FC<ProfileModalProps> = ({
  isOpen,
  onClose,
  activeTab,
  onTabChange,
  onSignOut,
}) => {
  const { isDarkMode, toggleDarkMode } = useDarkMode();

  // User data from API
  const [user, setUser] = useState<UserData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string>("");

  // Form state for profile editing
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  // Fetch user data when modal opens
  useEffect(() => {
    const fetchUserData = async () => {
      if (!isOpen) return;

      try {
        setLoading(true);
        setError("");

        // Get token from localStorage or cookies
        const token =
          localStorage.getItem("auth_token") ||
          document.cookie
            .split("; ")
            .find((row) => row.startsWith("auth_token="))
            ?.split("=")[1];

        if (!token) {
          setError("Not authenticated");
          return;
        }

        const userData = await authService.getCurrentUser(token);
        setUser(userData);

        // Update form fields
        const fullName = userData.name || "";
        const nameParts = fullName.split(" ");
        setFirstName(nameParts[0] || "");
        setLastName(nameParts.slice(1).join(" ") || "");
      } catch (err) {
        console.error("Failed to fetch user data:", err);
        setError("Failed to load user data");
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [isOpen]);

  // Format join date
  const formatJoinDate = (dateString?: string) => {
    if (!dateString) return "N/A";
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString("en-US", {
        month: "long",
        year: "numeric",
      });
    } catch {
      return "N/A";
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100]"
            onClick={onClose}
          />

          {/* Modal Container */}
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 pointer-events-none">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="w-full max-w-xl max-h-[90vh] bg-[#0d0d0d] rounded-2xl border border-white/10 shadow-2xl overflow-hidden flex flex-col pointer-events-auto"
            >
              {/* Gradient Header Banner */}
              <div className="relative h-24 overflow-hidden">
                <div
                  className="absolute inset-0"
                  style={{
                    background:
                      "linear-gradient(135deg, #a78bfa 0%, #f0abfc 25%, #fcd34d 50%, #fb923c 75%, #a78bfa 100%)",
                    backgroundSize: "200% 200%",
                  }}
                />
                {/* Cloud overlay effect */}
                <div className="absolute inset-0 opacity-40">
                  <div className="absolute top-2 left-10 w-20 h-8 bg-white/60 rounded-full blur-xl" />
                  <div className="absolute top-4 left-32 w-24 h-10 bg-white/50 rounded-full blur-xl" />
                  <div className="absolute top-1 right-20 w-28 h-8 bg-white/60 rounded-full blur-xl" />
                  <div className="absolute bottom-2 left-20 w-16 h-6 bg-white/40 rounded-full blur-lg" />
                  <div className="absolute bottom-4 right-32 w-20 h-8 bg-white/50 rounded-full blur-xl" />
                </div>

                {/* Close button */}
                <button
                  onClick={onClose}
                  className="absolute top-3 right-3 p-2 rounded-full bg-black/20 hover:bg-black/40 transition-colors"
                >
                  <X size={18} className="text-white" />
                </button>
              </div>

              {/* Profile Info Section */}
              <div className="px-6 pb-4 -mt-10 relative z-10">
                {loading ? (
                  <div className="flex items-center justify-center py-8">
                    <Loader2 className="w-8 h-8 text-white animate-spin" />
                  </div>
                ) : error ? (
                  <div className="bg-red-500/10 border border-red-500/20 text-red-200 rounded-lg py-3 px-4 text-sm">
                    {error}
                  </div>
                ) : (
                  <>
                    <div className="flex items-end justify-between">
                      {/* Avatar with badge */}
                      <div className="relative">
                        <div className="w-20 h-20 rounded-full bg-gradient-to-br from-gray-700 to-gray-800 border-4 border-[#0d0d0d] flex items-center justify-center overflow-hidden">
                          <User size={36} className="text-gray-400" />
                        </div>
                        {user?.verified && (
                          <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center border-2 border-[#0d0d0d]">
                            <Check
                              size={12}
                              className="text-white"
                              strokeWidth={3}
                            />
                          </div>
                        )}
                      </div>

                      {/* Action buttons */}
                      <div className="flex gap-2 mb-1">
                        <button
                          onClick={() => onTabChange("settings")}
                          className="px-4 py-1.5 bg-transparent border border-white/20 text-white text-xs font-medium rounded-lg hover:bg-white/5 transition-all flex items-center gap-2"
                        >
                          <Settings size={14} />
                          Settings
                        </button>
                        <button
                          onClick={() => onTabChange("upgrade")}
                          className="px-4 py-1.5 bg-transparent border border-white/20 text-white text-xs font-medium rounded-lg hover:bg-white/5 transition-all flex items-center gap-2"
                        >
                          <Crown size={14} />
                          Upgrade
                        </button>
                      </div>
                    </div>

                    {/* Name and status */}
                    <div className="mt-3 flex items-center gap-3">
                      <h2 className="text-white font-semibold text-xl capitalize">
                        {user?.name || "User"}
                      </h2>
                      <span className="px-2.5 py-0.5 bg-green-500/20 text-green-400 text-xs font-medium rounded-full flex items-center gap-1">
                        <span className="w-1.5 h-1.5 bg-green-400 rounded-full" />
                        {user?.plan || "Free Plan"}
                      </span>
                    </div>
                    <p className="text-gray-400 text-sm mt-0.5">
                      {user?.email}
                    </p>

                    {/* Stats row */}
                    <div className="flex items-center gap-6 mt-4 pt-4 border-t border-white/10">
                      <div>
                        <p className="text-gray-500 text-xs">Member since</p>
                        <p className="text-white font-medium text-sm">
                          {formatJoinDate(user?.created_at)}
                        </p>
                      </div>
                      <div className="w-px h-8 bg-white/10" />
                      <div>
                        <p className="text-gray-500 text-xs">Current plan</p>
                        <p className="text-white font-medium text-sm">
                          {user?.plan || "Free Plan"}
                        </p>
                      </div>
                      <div className="w-px h-8 bg-white/10" />
                      <div>
                        <p className="text-gray-500 text-xs">User ID</p>
                        <p className="text-white font-medium text-sm">
                          {user?.id
                            ? `#${String(user.id).substring(0, 8)}`
                            : "N/A"}
                        </p>
                      </div>
                    </div>
                  </>
                )}
              </div>

              {/* Content Area */}
              <div className="flex-1 overflow-y-auto px-6 pb-4">
                {activeTab === "profile" && (
                  <div className="space-y-5">
                    {/* Name fields */}
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="text-gray-400 text-xs font-medium mb-2 block">
                          First name
                        </label>
                        <input
                          type="text"
                          value={firstName}
                          onChange={(e) => setFirstName(e.target.value)}
                          className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white text-sm placeholder-gray-500 focus:outline-none focus:border-white/30 transition-colors"
                        />
                      </div>
                      <div>
                        <label className="text-gray-400 text-xs font-medium mb-2 block">
                          Last name
                        </label>
                        <input
                          type="text"
                          value={lastName}
                          onChange={(e) => setLastName(e.target.value)}
                          className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white text-sm placeholder-gray-500 focus:outline-none focus:border-white/30 transition-colors"
                        />
                      </div>
                    </div>

                    {/* Email field */}
                    <div>
                      <label className="text-gray-400 text-xs font-medium mb-2 block">
                        Email address
                      </label>
                      <div className="relative">
                        <div className="absolute left-4 top-1/2 -translate-y-1/2">
                          <Mail size={16} className="text-gray-500" />
                        </div>
                        <input
                          type="email"
                          value={user?.email || ""}
                          readOnly
                          className="w-full pl-11 pr-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white text-sm focus:outline-none cursor-not-allowed opacity-70"
                        />
                      </div>
                      {user?.verified && (
                        <div className="flex items-center gap-2 mt-2">
                          <div className="w-4 h-4 bg-blue-500 rounded-full flex items-center justify-center">
                            <Check
                              size={10}
                              className="text-white"
                              strokeWidth={3}
                            />
                          </div>
                          <span className="text-blue-400 text-xs font-medium uppercase tracking-wide">
                            Verified {user?.verifiedDate || ""}
                          </span>
                        </div>
                      )}
                    </div>

                    {/* Plan field */}
                    <div>
                      <label className="text-gray-400 text-xs font-medium mb-2 block">
                        Current Plan
                      </label>
                      <div className="flex items-center gap-3">
                        <div className="flex-1 px-4 py-3 bg-white/5 border border-white/10 rounded-lg flex items-center gap-3">
                          <Shield size={16} className="text-gray-400" />
                          <span className="text-white text-sm">
                            {user?.plan || "Free Plan"}
                          </span>
                        </div>
                        <button
                          onClick={() => onTabChange("upgrade")}
                          className="px-4 py-3 bg-white text-black text-sm font-medium rounded-lg hover:bg-gray-200 transition-all"
                        >
                          Upgrade
                        </button>
                      </div>
                    </div>

                    {/* Member since */}
                    <div>
                      <label className="text-gray-400 text-xs font-medium mb-2 block">
                        Member since
                      </label>
                      <div className="px-4 py-3 bg-white/5 border border-white/10 rounded-lg flex items-center gap-3">
                        <Calendar size={16} className="text-gray-400" />
                        <span className="text-white text-sm">
                          {formatJoinDate(user?.created_at)}
                        </span>
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === "settings" && (
                  <div className="space-y-4">
                    {/* Notifications */}
                    <div className="bg-white/5 border border-white/10 rounded-xl p-4 flex items-center gap-4">
                      <div className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center">
                        <Bell size={20} className="text-white" />
                      </div>
                      <div className="flex-1">
                        <p className="text-white font-medium">Notifications</p>
                        <p className="text-gray-400 text-xs">
                          Manage email and push notifications
                        </p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          className="sr-only peer"
                          defaultChecked
                        />
                        <div className="w-11 h-6 bg-white/10 peer-checked:bg-white rounded-full transition-all">
                          <div className="absolute top-0.5 left-0.5 w-5 h-5 bg-gray-400 peer-checked:bg-black rounded-full transition-all peer-checked:translate-x-5" />
                        </div>
                      </label>
                    </div>

                    {/* Privacy */}
                    <div className="bg-white/5 border border-white/10 rounded-xl p-4 flex items-center gap-4">
                      <div className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center">
                        <Lock size={20} className="text-white" />
                      </div>
                      <div className="flex-1">
                        <p className="text-white font-medium">Privacy</p>
                        <p className="text-gray-400 text-xs">
                          Control your data and privacy settings
                        </p>
                      </div>
                      <button className="px-3 py-1.5 bg-white/10 text-white text-xs font-medium rounded-lg hover:bg-white/20 transition-all">
                        Manage
                      </button>
                    </div>

                    {/* Dark Mode */}
                    <div className="bg-white/5 border border-white/10 rounded-xl p-4 flex items-center gap-4">
                      <div className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center">
                        {isDarkMode ? (
                          <Moon size={20} className="text-white" />
                        ) : (
                          <Sun size={20} className="text-white" />
                        )}
                      </div>
                      <div className="flex-1">
                        <p className="text-white font-medium">Dark Mode</p>
                        <p className="text-gray-400 text-xs">
                          {isDarkMode
                            ? "Dark theme enabled"
                            : "Light theme enabled"}
                        </p>
                      </div>
                      <button
                        onClick={toggleDarkMode}
                        className={`relative w-11 h-6 rounded-full transition-all ${
                          isDarkMode ? "bg-white" : "bg-white/10"
                        }`}
                      >
                        <div
                          className={`absolute top-0.5 w-5 h-5 rounded-full transition-all ${
                            isDarkMode
                              ? "left-[22px] bg-black"
                              : "left-0.5 bg-gray-400"
                          }`}
                        />
                      </button>
                    </div>

                    {/* Language */}
                    <div className="bg-white/5 border border-white/10 rounded-xl p-4 flex items-center gap-4">
                      <div className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center">
                        <Globe size={20} className="text-white" />
                      </div>
                      <div className="flex-1">
                        <p className="text-white font-medium">Language</p>
                        <p className="text-gray-400 text-xs">English (US)</p>
                      </div>
                      <button className="px-3 py-1.5 bg-white/10 text-white text-xs font-medium rounded-lg hover:bg-white/20 transition-all flex items-center gap-1">
                        Change
                        <ChevronDown size={14} />
                      </button>
                    </div>
                  </div>
                )}

                {activeTab === "upgrade" && (
                  <div className="space-y-6">
                    <div className="text-center mb-6">
                      <div className="w-14 h-14 mx-auto bg-gradient-to-br from-yellow-400/20 to-orange-500/20 rounded-2xl flex items-center justify-center mb-3 border border-yellow-500/20">
                        <Crown size={28} className="text-yellow-400" />
                      </div>
                      <h3 className="text-white font-bold text-lg">
                        Upgrade to Pro
                      </h3>
                      <p className="text-gray-400 text-sm mt-1">
                        Unlock all features and get unlimited access
                      </p>
                    </div>

                    {/* Pricing Cards */}
                    <div className="grid grid-cols-2 gap-4">
                      {/* Free Plan */}
                      <div className="bg-white/5 border border-white/10 rounded-xl p-4">
                        <h4 className="text-white font-semibold mb-1">Free</h4>
                        <p className="text-gray-400 text-xs mb-3">
                          Current Plan
                        </p>
                        <div className="flex items-baseline gap-1 mb-3">
                          <span className="text-2xl font-bold text-white">
                            $0
                          </span>
                          <span className="text-gray-400 text-xs">/month</span>
                        </div>
                        <ul className="space-y-2 text-xs text-gray-300">
                          <li className="flex items-center gap-2">
                            <div className="w-1 h-1 rounded-full bg-gray-500" />
                            5 projects
                          </li>
                          <li className="flex items-center gap-2">
                            <div className="w-1 h-1 rounded-full bg-gray-500" />
                            Basic features
                          </li>
                          <li className="flex items-center gap-2">
                            <div className="w-1 h-1 rounded-full bg-gray-500" />
                            Community support
                          </li>
                        </ul>
                      </div>

                      {/* Pro Plan */}
                      <div className="bg-gradient-to-br from-white/10 to-white/5 border border-white/20 rounded-xl p-4 relative">
                        <div className="absolute top-2 right-2 px-2 py-0.5 bg-white text-black text-[9px] font-bold rounded-full uppercase">
                          Popular
                        </div>
                        <h4 className="text-white font-semibold mb-1">Pro</h4>
                        <p className="text-gray-300 text-xs mb-3">
                          Best for pros
                        </p>
                        <div className="flex items-baseline gap-1 mb-3">
                          <span className="text-2xl font-bold text-white">
                            $19
                          </span>
                          <span className="text-gray-400 text-xs">/month</span>
                        </div>
                        <ul className="space-y-2 text-xs text-gray-300">
                          <li className="flex items-center gap-2">
                            <div className="w-1 h-1 rounded-full bg-white" />
                            Unlimited projects
                          </li>
                          <li className="flex items-center gap-2">
                            <div className="w-1 h-1 rounded-full bg-white" />
                            All features
                          </li>
                          <li className="flex items-center gap-2">
                            <div className="w-1 h-1 rounded-full bg-white" />
                            Priority support
                          </li>
                        </ul>
                        <button className="w-full mt-3 py-2 bg-white text-black text-sm font-medium rounded-lg hover:bg-gray-200 transition-all">
                          Upgrade Now
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Footer */}
              <div className="px-6 py-4 border-t border-white/10 bg-white/5 flex items-center justify-end gap-3">
                <button
                  onClick={onClose}
                  className="px-5 py-2 bg-transparent border border-white/20 text-white text-sm font-medium rounded-lg hover:bg-white/5 transition-all"
                >
                  Cancel
                </button>
                {activeTab === "profile" ? (
                  <button
                    onClick={onClose}
                    className="px-5 py-2 bg-white/10 text-white text-sm font-medium rounded-lg hover:bg-white/20 transition-all"
                  >
                    Save changes
                  </button>
                ) : (
                  <button
                    onClick={onSignOut}
                    className="px-5 py-2 bg-red-500/20 text-red-400 text-sm font-medium rounded-lg hover:bg-red-500/30 transition-all flex items-center gap-2"
                  >
                    <LogOut size={16} />
                    Sign Out
                  </button>
                )}
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
};

export default ProfileModal;
