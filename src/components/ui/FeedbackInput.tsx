import React, { useState } from "react";
import { Frown, Meh, Smile, Heart, ThumbsUp } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import clsx from "clsx";

export const FeedbackInput = () => {
  const [rating, setRating] = useState<number | null>(null);
  const [feedback, setFeedback] = useState("");
  const [contact, setContact] = useState(false);
  const [research, setResearch] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  // Add notification state
  const [showToast, setShowToast] = useState(false);

  const ratings = [
    { icon: Frown, label: "Terrible", value: 1 },
    { icon: Meh, label: "Bad", value: 2 },
    { icon: ThumbsUp, label: "Okay", value: 3 },
    { icon: Smile, label: "Good", value: 4 },
    { icon: Heart, label: "Amazing", value: 5 },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!rating) return;

    setIsSubmitting(true);
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
      // Trigger toast
      setShowToast(true);

      setFeedback("");
      setRating(null);
      setContact(false);
      setResearch(false);

      setTimeout(() => {
        setSubmitted(false);
        setShowToast(false);
      }, 3000);
    }, 1500);
  };

  return (
    <section className="w-full flex justify-center px-4 mb-16 relative z-20">
      <div className="relative w-full max-w-[1200px] mx-auto">
        {/* Refined Glow Effect */}
        <div className="absolute -inset-[1px] bg-gradient-to-r from-transparent via-green-500/20 to-transparent rounded-[20px] blur-sm opacity-60" />

        <div className="relative bg-black/80 border border-white/5 rounded-[20px] p-6 md:p-8 backdrop-blur-2xl shadow-2xl overflow-hidden">
          {/* Decorative Elements */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-green-500/5 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2" />

          <div className="relative z-10 max-w-lg mx-auto">
            <h3 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-500 mb-2 text-center">
              We value your opinion
            </h3>
            <p className="text-gray-400 mb-6 text-base font-light leading-relaxed text-center">
              How was your experience using AnToAnt?
            </p>

            {submitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-green-500/5 border border-green-500/10 rounded-2xl p-8 flex flex-col items-center justify-center text-center gap-4"
              >
                <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center ring-1 ring-green-500/30">
                  <Heart className="text-green-400 fill-current" size={32} />
                </div>
                <div>
                  <h4 className="text-xl font-bold text-white mb-1">
                    Thank you!
                  </h4>
                  <p className="text-gray-400 text-sm">
                    We truly appreciate your feedback.
                  </p>
                </div>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                {/* Rating Selection */}
                <div className="grid grid-cols-5 gap-2 md:gap-3">
                  {ratings.map((item) => {
                    const Icon = item.icon;
                    const isSelected = rating === item.value;
                    return (
                      <button
                        key={item.value}
                        type="button"
                        onClick={() => setRating(item.value)}
                        className={clsx(
                          "relative flex flex-col items-center gap-2 p-3 rounded-xl border transition-all duration-300 group overflow-hidden",
                          isSelected
                            ? "bg-green-500/10 border-green-500/50 text-green-400 shadow-[0_0_20px_-5px_rgba(34,197,94,0.3)]"
                            : "bg-white/5 border-white/5 text-gray-500 hover:bg-white/10 hover:border-white/10 hover:text-white hover:-translate-y-1",
                        )}
                      >
                        {/* Selection Indicator */}
                        {isSelected && (
                          <motion.div
                            layoutId="activeRating"
                            className="absolute inset-0 bg-green-500/5"
                            initial={false}
                            transition={{
                              type: "spring",
                              stiffness: 300,
                              damping: 30,
                            }}
                          />
                        )}

                        <Icon
                          size={24}
                          className={clsx(
                            "relative z-10 transition-transform duration-300",
                            isSelected
                              ? "scale-110 drop-shadow-[0_0_8px_rgba(34,197,94,0.5)]"
                              : "group-hover:scale-110",
                          )}
                          strokeWidth={1.5}
                        />
                        <span className="relative z-10 text-[10px] md:text-xs font-medium tracking-wide">
                          {item.label}
                        </span>
                      </button>
                    );
                  })}
                </div>

                {/* Textarea */}
                <div className="space-y-3">
                  <label className="text-xs font-medium text-gray-300 uppercase tracking-wider ml-1">
                    What are the main reasons for your rating?
                  </label>
                  <textarea
                    value={feedback}
                    onChange={(e) => setFeedback(e.target.value)}
                    placeholder="Tell us about your experience..."
                    className="w-full h-32 bg-white/[0.03] border border-white/10 rounded-xl p-4 text-sm text-white placeholder:text-gray-700 focus:outline-none focus:border-green-500/40 focus:bg-white/[0.05] focus:ring-1 focus:ring-green-500/40 transition-all resize-none font-light leading-relaxed shadow-inner"
                  />
                </div>

                {/* Checkboxes */}
                <div className="space-y-3 pt-1 w-fit mx-auto">
                  <label className="flex items-center gap-3 text-gray-400 hover:text-white transition-colors cursor-pointer group select-none">
                    <div
                      className={clsx(
                        "w-5 h-5 rounded border flex items-center justify-center transition-all duration-200",
                        contact
                          ? "bg-green-500 border-green-500 shadow-lg shadow-green-500/20"
                          : "border-gray-700 group-hover:border-gray-500 bg-white/5",
                      )}
                    >
                      {contact && (
                        <motion.svg
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          className="w-3.5 h-3.5 text-black"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          strokeWidth={3}
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M5 13l4 4L19 7"
                          />
                        </motion.svg>
                      )}
                    </div>
                    <input
                      type="checkbox"
                      className="hidden"
                      checked={contact}
                      onChange={(e) => setContact(e.target.checked)}
                    />
                    <span className="text-xs md:text-sm font-light">
                      I may be contacted about this feedback.{" "}
                      <span className="text-green-400/80 hover:text-green-400 hover:underline decoration-green-400/30 underline-offset-4 transition-all">
                        Privacy Policy
                      </span>
                    </span>
                  </label>

                  <label className="flex items-center gap-3 text-gray-400 hover:text-white transition-colors cursor-pointer group select-none">
                    <div
                      className={clsx(
                        "w-5 h-5 rounded border flex items-center justify-center transition-all duration-200",
                        research
                          ? "bg-green-500 border-green-500 shadow-lg shadow-green-500/20"
                          : "border-gray-700 group-hover:border-gray-500 bg-white/5",
                      )}
                    >
                      {research && (
                        <motion.svg
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          className="w-3.5 h-3.5 text-black"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          strokeWidth={3}
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M5 13l4 4L19 7"
                          />
                        </motion.svg>
                      )}
                    </div>
                    <input
                      type="checkbox"
                      className="hidden"
                      checked={research}
                      onChange={(e) => setResearch(e.target.checked)}
                    />
                    <span className="text-xs md:text-sm font-light">
                      I'd like to help improve by joining the Research Group.
                    </span>
                  </label>
                </div>

                {/* Actions */}
                <div className="flex items-center mx-auto gap-3 pt-4">
                  <button
                    type="submit"
                    disabled={isSubmitting || !rating}
                    className="flex-1 md:flex-none px-6 py-2.5 bg-black/50 text-white text-sm font-semibold rounded-lg hover:bg-green-400 hover:scale-[1.02] active:scale-[0.98] transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 shadow-[0_0_20px_-5px_rgba(34,197,94,0.4)] hover:shadow-[0_0_30px_-5px_rgba(34,197,94,0.6)]"
                  >
                    {isSubmitting ? (
                      <div className="flex items-center gap-2">
                        <span className="w-3 h-3 border-2 border-black/30 border-t-black rounded-full animate-spin" />
                        <span>Sending...</span>
                      </div>
                    ) : (
                      "Submit Feedback"
                    )}
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setFeedback("");
                      setRating(null);
                      setContact(false);
                      setResearch(false);
                    }}
                    className="px-6 py-2.5 bg-transparent border border-white/10 text-gray-400 text-sm font-medium rounded-lg hover:bg-white/5 hover:text-white hover:border-white/20 transition-all"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>

      {/* Toast Notification */}
      <AnimatePresence>
        {showToast && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ type: "spring", stiffness: 400, damping: 30 }}
            className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50 flex items-center gap-3 px-6 py-3 bg-white/10 backdrop-blur-md border border-white/10 rounded-full shadow-2xl"
          >
            <div className="p-1.5 bg-green-500/20 rounded-full">
              <Heart className="w-4 h-4 text-green-500 fill-current" />
            </div>
            <span className="text-sm font-medium text-white">
              Thanks for your feedback!
            </span>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};
