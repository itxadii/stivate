"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Cookie, X } from "lucide-react";

export default function CookiePopup() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem("cookie-consent");
    if (!consent) {
      const timer = setTimeout(() => {
        setIsVisible(true);
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, []);

  const acceptCookies = () => {
    localStorage.setItem("cookie-consent", "true");
    setIsVisible(false);
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: 50, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 50, scale: 0.9 }}
          className="fixed bottom-6 left-6 right-6 md:left-auto md:right-10 md:max-w-md z-[100] pointer-events-auto"
        >
          <div className="bg-white/90 backdrop-blur-xl border border-slate-400 shadow-2xl rounded-[32px] p-6 md:p-8 flex flex-col md:flex-row items-start gap-6 relative overflow-hidden">
            {/* Background accent */}
            <div className="absolute -top-10 -right-10 w-32 h-32 bg-background rounded-full filter blur-3xl opacity-50" />
            
            <div className="w-12 h-12 rounded-2xl bg-zinc-900 text-white flex items-center justify-center flex-shrink-0 relative z-10">
              <Cookie size={24} />
            </div>

            <div className="space-y-4 relative z-10">
              <div>
                <h4 className="text-lg font-bold text-zinc-900 mb-1">We value your privacy</h4>
                <p className="text-zinc-500 text-sm leading-relaxed">
                  We use cookies to enhance your experience and analyze our traffic. 
                  By clicking "Accept All", you consent to our use of cookies.
                </p>
              </div>

              <div className="flex items-center gap-3">
                <button
                  onClick={acceptCookies}
                  className="flex-1 bg-zinc-900 text-white text-sm font-bold py-3 px-6 rounded-xl hover:scale-[1.02] active:scale-[0.98] transition-all duration-200"
                >
                  Accept All
                </button>
                <button
                  onClick={() => setIsVisible(false)}
                  className="px-4 py-3 text-zinc-400 hover:text-zinc-900 transition-colors"
                >
                  <X size={20} />
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

