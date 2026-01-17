import React, { useState } from "react";
import {
  SquarePen,
  History,
  X,
  User,
  LogOut,
  Crown,
  Settings,
  MessageSquare,
  Loader2,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import ProfileModal from "./ProfileModal";
import { authService } from "@/services/auth";
import { useDarkMode } from "./useDarkMode";
import { projectService, type Conversation } from "@/services/project";

interface SlidebarProps {
  open: boolean;
  setOpen: (value: boolean) => void;
}

const Slidebar: React.FC<SlidebarProps> = ({ open, setOpen }) => {
  const navigate = useNavigate();
  const { isDarkMode } = useDarkMode();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [activeModal, setActiveModal] = useState<
    "profile" | "settings" | "upgrade" | null
  >(null);

  // History state
  const [showHistory, setShowHistory] = useState(false);
  const [historyLoading, setHistoryLoading] = useState(false);
  const [conversations, setConversations] = useState<Conversation[]>([]);

  // Fetch history when History button is clicked
  const fetchHistory = async () => {
    // If sidebar is collapsed, open it first
    if (!open) {
      setOpen(true);
      // If history is already active (but was hidden), just returning is enough to show it
      if (showHistory) return;
    } else if (showHistory) {
      // If sidebar is open and history is showing, toggle it off
      setShowHistory(false);
      return;
    }

    setHistoryLoading(true);
    setShowHistory(true);

    try {
      // Get all projects
      const projectList = await projectService.getProjects();

      // Get conversations for all projects
      const allConversations: Conversation[] = [];
      for (const project of projectList) {
        try {
          const convList = await projectService.getConversations(project.id);
          allConversations.push(...convList);
        } catch (err) {
          console.error(
            `Failed to fetch conversations for project ${project.id}:`,
            err
          );
        }
      }
      setConversations(allConversations);
    } catch (error) {
      console.error("Failed to fetch history:", error);
    } finally {
      setHistoryLoading(false);
    }
  };

  const handleSignOut = async () => {
    // Get token before clearing
    const token =
      localStorage.getItem("auth_token") ||
      document.cookie
        .split("; ")
        .find((row) => row.startsWith("auth_token="))
        ?.split("=")[1];

    let logoutMessage = "You have been logged out";

    // Call logout API and capture response message
    try {
      if (token) {
        const response = await authService.logout(token);
        // Use backend message if provided
        if (response?.message) {
          logoutMessage = response.message;
        }
      }
    } catch (err) {
      console.error("Logout API error:", err);
    }

    // Clear local state
    localStorage.removeItem("auth_token");
    localStorage.removeItem("user_data");
    document.cookie =
      "auth_token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";

    // Navigate to login with message
    navigate(`/login?message=${encodeURIComponent(logoutMessage)}`);
  };

  const handleDropdownItemClick = (
    item: "profile" | "settings" | "upgrade"
  ) => {
    setActiveModal(item);
    setDropdownOpen(false);
  };

  const closeModal = () => {
    setActiveModal(null);
  };

  const handleProfileClick = () => {
    if (open) {
      // Sidebar is expanded - toggle dropdown
      setDropdownOpen(!dropdownOpen);
    } else {
      // Sidebar is collapsed - open modal directly
      setActiveModal("profile");
    }
  };

  return (
    <>
      {/* BACKDROP */}
      <div
        className={`
          fixed inset-0 backdrop-blur-sm z-100 md:hidden
          transition-opacity duration-300
          ${
            open
              ? "opacity-100 pointer-events-auto"
              : "opacity-0 pointer-events-none"
          }
        `}
        onClick={() => setOpen(false)}
      />

      {/* SIDEBAR */}
      <aside
        className={`
          fixed md:static top-0 left-0 z-40
          h-full backdrop-blur-2xl
          shadow-xl overflow-hidden
          ${isDarkMode ? "bg-black" : "bg-white border-r border-gray-200"}

          transition-[transform,width] duration-500 ease-[cubic-bezier(0.4,0,0.2,1)]
          will-change-[transform,width]

          /* MOBILE: slide in */
          ${open ? "translate-x-0" : "-translate-x-full"}

          /* DESKTOP width */
          md:translate-x-0 
          ${open ? "md:w-45" : "md:w-20"}

          w-64
        `}
      >
        {/* CLOSE BUTTON FOR MOBILE */}
        <div className="md:hidden flex justify-end p-4">
          <button
            onClick={() => setOpen(false)}
            className={`p-2 rounded-full transition ${
              isDarkMode
                ? "text-white bg-white/10 hover:bg-white/20"
                : "text-gray-700 bg-gray-100 hover:bg-gray-200"
            }`}
          >
            <X size={20} />
          </button>
        </div>

        {/* LOGO */}
        <div className="flex items-center gap-3 mb-10 p-6">
          <div
            className={`w-7 h-7 rounded-2xl flex items-center justify-center font-bold shadow-md flex-shrink-0 ${
              isDarkMode ? "bg-white text-black" : "bg-black text-white"
            }`}
          >
            A
          </div>

          <h2
            className={`font-semibold text-xl tracking-wide whitespace-nowrap transition-all duration-500 ease-[cubic-bezier(0.4,0,0.2,1)] ${
              isDarkMode ? "text-white" : "text-gray-900"
            } ${
              open ? "opacity-100 w-auto delay-200" : "opacity-0 w-0 delay-0"
            }`}
          >
            AnToAnt
          </h2>
        </div>

        {/* NAVIGATION */}
        <nav className="flex flex-col gap-2 px-4 mt-4">
          {/* Overview button */}
          <a
            href="/AnToAntAi"
            className={`
              flex items-center gap-4 px-4 py-3 rounded-xl
              transition-all duration-300
              ${
                isDarkMode
                  ? "text-white/80 hover:bg-white/10 hover:text-white"
                  : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
              }
              ${open ? "justify-start" : "justify-center"}
            `}
            onClick={() => setOpen(false)}
          >
            <SquarePen size={20} className="flex-shrink-0" />
            <span
              className={`whitespace-nowrap transition-all duration-500 ease-[cubic-bezier(0.4,0,0.2,1)] ${
                open ? "opacity-100 w-auto delay-200" : "opacity-0 w-0 delay-0"
              }`}
            >
              Overview
            </span>
          </a>

          {/* History button */}
          <button
            onClick={(e) => {
              e.preventDefault();
              fetchHistory();
            }}
            className={`
              flex items-center gap-4 px-4 py-3 rounded-xl
              transition-all duration-300 w-full
              ${
                showHistory
                  ? isDarkMode
                    ? "bg-white/10 text-white"
                    : "bg-gray-100 text-gray-900"
                  : isDarkMode
                  ? "text-white/80 hover:bg-white/10 hover:text-white"
                  : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
              }
              ${open ? "justify-start" : "justify-center"}
            `}
          >
            <History size={20} className="flex-shrink-0" />
            <span
              className={`whitespace-nowrap transition-all duration-500 ease-[cubic-bezier(0.4,0,0.2,1)] ${
                open ? "opacity-100 w-auto delay-200" : "opacity-0 w-0 delay-0"
              }`}
            >
              History
            </span>
          </button>
        </nav>

        {/* HISTORY PANEL - Shows below navigation when expanded */}
        {showHistory && open && (
          <div
            className={`mx-4 mt-2 rounded-xl border overflow-hidden transition-all duration-300 max-h-[60vh] flex flex-col ${
              isDarkMode
                ? "bg-white/5 border-white/10 shadow-lg shadow-black/20"
                : "bg-white border-gray-200 shadow-lg shadow-gray-200/50"
            }`}
          >
            {/* Header */}
            <div
              className={`px-4 py-3 border-b flex items-center justify-between ${
                isDarkMode
                  ? "border-white/10 bg-white/5"
                  : "border-gray-100 bg-gray-50/50"
              }`}
            >
              <h3
                className={`text-xs font-semibold uppercase tracking-wider ${
                  isDarkMode ? "text-white/60" : "text-gray-500"
                }`}
              >
                Recent Chats
              </h3>
              <button
                onClick={() => setShowHistory(false)}
                className={`p-1 rounded-md transition-colors ${
                  isDarkMode
                    ? "hover:bg-white/10 text-white/40 hover:text-white"
                    : "hover:bg-gray-200 text-gray-400 hover:text-gray-600"
                }`}
              >
                <X size={14} />
              </button>
            </div>

            {/* Content */}
            <div className="overflow-y-auto hide-scrollbar flex-1">
              {historyLoading ? (
                <div className="flex flex-col items-center justify-center py-12 gap-3">
                  <Loader2
                    size={24}
                    className={`animate-spin ${
                      isDarkMode ? "text-white/40" : "text-gray-400"
                    }`}
                  />
                  <p
                    className={`text-xs ${
                      isDarkMode ? "text-white/40" : "text-gray-400"
                    }`}
                  >
                    Loading history...
                  </p>
                </div>
              ) : conversations.length === 0 ? (
                <div
                  className={`flex flex-col items-center justify-center py-12 px-6 text-center ${
                    isDarkMode ? "text-white/40" : "text-gray-400"
                  }`}
                >
                  <div
                    className={`p-3 rounded-full mb-3 ${
                      isDarkMode ? "bg-white/5" : "bg-gray-100"
                    }`}
                  >
                    <MessageSquare size={20} className="opacity-50" />
                  </div>
                  <p className="text-sm font-medium mb-1">No chats yet</p>
                  <p className="text-xs opacity-70">
                    Start a new conversation to see it here.
                  </p>
                </div>
              ) : (
                <div className="py-2 px-2 space-y-1">
                  {[...conversations].reverse().map((conv) => (
                    <button
                      key={conv.id}
                      onClick={() => {
                        // TODO: Load conversation when clicked
                        console.log("Load conversation:", conv.id);
                        setShowHistory(false);
                      }}
                      className={`w-full flex items-start gap-3 px-3 py-3 rounded-lg transition-all text-left group border border-transparent ${
                        isDarkMode
                          ? "hover:bg-white/10 text-white/90 hover:border-white/5"
                          : "hover:bg-gray-50 text-gray-700 hover:border-gray-200/50"
                      }`}
                    >
                      <MessageSquare
                        size={16}
                        className={`flex-shrink-0 mt-0.5 transition-colors ${
                          isDarkMode
                            ? "text-white/40 group-hover:text-white/80"
                            : "text-gray-400 group-hover:text-gray-600"
                        }`}
                      />
                      <div className="flex-1 min-w-0">
                        <span className="text-sm font-medium block truncate">
                          {conv.title || "Untitled Conversation"}
                        </span>
                      </div>
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        {/* PROFILE BUTTON AT BOTTOM */}
        <div
          className={`absolute bottom-0 left-0 right-0 border-t ${
            isDarkMode ? "border-white/10 bg-black" : "border-gray-200 bg-white"
          } ${open ? "p-4" : "py-4 left-5 flex justify-center items-center"}`}
        >
          {/* Dropdown Menu - Only show when sidebar is expanded */}
          {open && (
            <div
              className={`overflow-hidden transition-all duration-300 ease-out ${
                dropdownOpen ? "max-h-60 opacity-100 mb-3" : "max-h-0 opacity-0"
              }`}
            >
              <div
                className={`backdrop-blur-xl rounded-xl border overflow-hidden ${
                  isDarkMode
                    ? "bg-white/5 border-white/10"
                    : "bg-gray-50 border-gray-200"
                }`}
              >
                {/* Profile Option */}
                <button
                  onClick={() => handleDropdownItemClick("profile")}
                  className={`w-full flex items-center gap-3 px-4 py-3 transition-all border-b justify-start ${
                    isDarkMode
                      ? "text-white/80 hover:bg-white/10 hover:text-white border-white/5"
                      : "text-gray-600 hover:bg-gray-100 hover:text-gray-900 border-gray-200"
                  }`}
                >
                  <User size={18} />
                  <span className="text-sm font-medium">My Profile</span>
                </button>

                {/* Settings Option */}
                <button
                  onClick={() => handleDropdownItemClick("settings")}
                  className={`w-full flex items-center gap-3 px-4 py-3 transition-all border-b justify-start ${
                    isDarkMode
                      ? "text-white/80 hover:bg-white/10 hover:text-white border-white/5"
                      : "text-gray-600 hover:bg-gray-100 hover:text-gray-900 border-gray-200"
                  }`}
                >
                  <Settings size={18} />
                  <span className="text-sm font-medium">Settings</span>
                </button>

                {/* Upgrade Plan Option */}
                <button
                  onClick={() => handleDropdownItemClick("upgrade")}
                  className={`w-full flex items-center gap-3 px-4 py-3 text-purple-500 hover:bg-purple-500/10 hover:text-purple-400 transition-all border-b justify-start ${
                    isDarkMode ? "border-white/5" : "border-gray-200"
                  }`}
                >
                  <Crown size={18} />
                  <span className="text-sm font-medium">Upgrade Plan</span>
                </button>

                {/* Sign Out Option */}
                <button
                  onClick={handleSignOut}
                  className="w-full flex items-center gap-3 px-4 py-3 text-red-500 hover:bg-red-500/10 hover:text-red-400 transition-all justify-start"
                >
                  <LogOut size={18} />
                  <span className="text-sm font-medium">Sign Out</span>
                </button>
              </div>
            </div>
          )}

          {/* Profile Button */}
          <button
            onClick={handleProfileClick}
            className={`
              flex items-center transition-all flex-shrink-0
              ${isDarkMode ? "hover:bg-white/10" : "hover:bg-gray-100"}
              ${
                dropdownOpen && open
                  ? isDarkMode
                    ? "bg-white/10"
                    : "bg-gray-100"
                  : ""
              }
              ${
                open
                  ? "w-full px-3 py-3 rounded-xl justify-between gap-3"
                  : "w-12 h-12 rounded-full justify-center"
              }
            `}
          >
            <div className="flex items-center gap-3">
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${
                  isDarkMode
                    ? "bg-gradient-to-br from-gray-700 to-gray-400"
                    : "bg-gradient-to-br from-gray-300 to-gray-500"
                }`}
              >
                <User size={20} className="text-white" />
              </div>
              <div
                className={`flex-1 min-w-0 text-left transition-all duration-500 ease-[cubic-bezier(0.4,0,0.2,1)] ${
                  open
                    ? "opacity-100 w-auto delay-200"
                    : "opacity-0 w-0 delay-0"
                }`}
              >
                <p
                  className={`text-sm font-semibold truncate ${
                    isDarkMode ? "text-white" : "text-gray-900"
                  }`}
                >
                  Account
                </p>
                <p
                  className={`text-xs truncate ${
                    isDarkMode ? "text-white/60" : "text-gray-500"
                  }`}
                >
                  Free Plan
                </p>
              </div>
            </div>
            <svg
              className={`w-4 h-4 flex-shrink-0 transition-all duration-500 ease-[cubic-bezier(0.4,0,0.2,1)] ${
                dropdownOpen ? "rotate-180" : "rotate-0"
              } ${isDarkMode ? "text-white/50" : "text-gray-400"} ${
                open ? "opacity-100 delay-200" : "opacity-0 delay-0"
              }`}
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </button>
        </div>
      </aside>

      {/* Profile Modal */}
      <ProfileModal
        isOpen={activeModal !== null}
        onClose={closeModal}
        activeTab={activeModal || "profile"}
        onTabChange={(tab: "profile" | "settings" | "upgrade") =>
          setActiveModal(tab)
        }
        onSignOut={handleSignOut}
      />
    </>
  );
};

export default Slidebar;
