import React from "react";
import { motion, Variants } from "framer-motion";

type Props = {
  count?: number;
  className?: string;
};

const container: Variants = {
  hidden: { opacity: 1 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.15,
    },
  },
};

const item: Variants = {
  hidden: { opacity: 0, y: 8 },
  visible: { opacity: 1, y: 0 },
};

export function ProductListSkeleton({ count = 10, className = "" }: Props) {
  const items = Array.from({ length: count });

  return (
    <section className="container mx-auto max-w-screen-2xl px-3 sm:px-4 lg:px-6">
      <motion.div
        role="status"
        aria-live="polite"
        className={`grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 sm:gap-5 lg:gap-6 ${className}`}
        variants={container}
        initial="hidden"
        animate="visible"
      >
        <span className="sr-only">Loading products…</span>

        {items.map((_, i) => (
          <motion.div
            key={i}
            variants={item}
            data-testid="product-card"
            className="rounded-lg border border-gray-200 dark:border-gray-100 p-3 sm:p-4 bg-white/40 dark:bg-black/20"
          >
            <div className="w-full rounded-md bg-gray-200 dark:bg-gray-800 animate-pulse aspect-[4/5] md:aspect-square" />

            <div className="mt-4 space-y-3">
              <div className="h-4 w-3/5 rounded bg-gray-200 dark:bg-gray-800 animate-pulse" />
              <div className="h-4 w-4/5 rounded bg-gray-200 dark:bg-gray-800 animate-pulse" />
            </div>

            <div className="mt-4 flex items-center gap-3">
              <div className="h-5 w-16 rounded bg-gray-300 dark:bg-gray-700 animate-pulse" />
              <div className="h-9 flex-1 rounded bg-gray-200 dark:bg-gray-800 animate-pulse" />
            </div>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
