"use client";

import { useEffect, useState, useCallback } from "react";
import { AnimatePresence, MotionConfig, motion } from "framer-motion";
import { ArrowDown } from "lucide-react";

type Props = { threshold?: number };

export const ScrollToBottom = ({ threshold = 80 }: Props) => {
  const [visible, setVisible] = useState(false);

  const check = useCallback(() => {
    const doc = document.documentElement;
    const atBottom =
      window.scrollY + window.innerHeight >= doc.scrollHeight - threshold;
    setVisible(!atBottom);
  }, [threshold]);

  useEffect(() => {
    check();
    window.addEventListener("scroll", check, { passive: true });
    window.addEventListener("resize", check);
    return () => {
      window.removeEventListener("scroll", check);
      window.removeEventListener("resize", check);
    };
  }, [check]);

  const scrollToBottom = () => {
    const doc = document.documentElement;
    window.scrollTo({ top: doc.scrollHeight, behavior: "smooth" });
  };

  return (
    <MotionConfig reducedMotion="user">
      <AnimatePresence>
        {visible && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className={"fixed bottom-3"}
          >
            <motion.button
              key="scroll-bottom"
              type="button"
              onClick={scrollToBottom}
              initial={{ opacity: 0, y: 12, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 8, scale: 0.98 }}
              transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
              aria-label="Scroll to bottom"
              className="
              inline-flex items-center justify-center
              rounded-full px-3 py-2
              bg-zinc-600 text-white shadow-lg ring-1 ring-black/10
              hover:bg-zinc-800 active:bg-zinc-900
              focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-400
            "
            >
              <ArrowDown className="h-5 w-5" aria-hidden="true" />
              <span className="sr-only">Scroll to bottom</span>
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </MotionConfig>
  );
};
