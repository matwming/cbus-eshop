"use client";
import * as React from "react";
import { motion } from "framer-motion";
import { Product } from "@/app/components/types";
import Rating from "@/app/components/ui/rating";
import Link from "next/link";
import { useAtom } from "jotai";
import { cartAtom } from "@/app/components/states";
import { ProductButtons } from "@/app/components/ui/productButtons";

type Props = {
  product: Product;
};

export const currency = new Intl.NumberFormat("en-AU", {
  style: "currency",
  currency: "AUD",
  maximumFractionDigits: 2,
});

export const ProductCard = ({ product }: Props) => {
  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -4 }}
      className="group relative overflow-hidden rounded-2xl border border-zinc-200/60 bg-white p-4 shadow-sm transition-shadow hover:shadow-xl dark:border-zinc-800 dark:bg-zinc-900"
      aria-labelledby={`product-title-${product.id}`}
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-0 blur-2xl transition-opacity group-hover:opacity-60"
        style={{
          background:
            "radial-gradient(600px circle at var(--x,50%) var(--y,50%), rgba(59,130,246,0.15), transparent 40%)",
        }}
      />

      <motion.div
        className="relative aspect-[4/3] overflow-hidden rounded-xl bg-zinc-100 dark:bg-zinc-800"
        whileHover={{ scale: 1.01 }}
        transition={{ type: "spring", stiffness: 200, damping: 20 }}
      >
        <Link href={`/product-detail/${product.id}`} data-testid="product-link">
          <img
            src={product.image}
            alt={product.title}
            className="h-full w-full object-contain p-4 transition-transform duration-300 group-hover:scale-[1.03]"
            loading="lazy"
          />
        </Link>
        <span
          className="absolute left-3 top-3 rounded-full bg-zinc-900/80 px-3 py-1 text-xs font-medium text-white backdrop-blur-sm dark:bg-zinc-100/10"
          aria-label={`Category ${product.category}`}
        >
          {product.category}
        </span>
      </motion.div>

      <div className="mt-4 space-y-2">
        <p
          id={`product-title-${product.id}`}
          className="line-clamp-2 text-base font-semibold tracking-tight text-zinc-900 dark:text-zinc-100"
          title={product.title}
          data-testid="product-title"
        >
          {product.title}
        </p>

        <div className="flex items-center justify-between">
          <p
            className="text-lg font-bold tabular-nums text-zinc-900 dark:text-zinc-100"
            data-testid="product-price"
          >
            {currency.format(product.price)}
          </p>
          <div className="flex items-center gap-2" data-testid="product-rating">
            <Rating rate={product.rating.rate} count={product.rating.count} />
          </div>
        </div>

        <p
          className="line-clamp-3 text-sm leading-6 text-zinc-600 dark:text-zinc-400"
          title={product.description}
          data-testid="product-description"
        >
          {product.description}
        </p>

        <div className="pt-2">
          <ProductButtons product={product} />
        </div>
      </div>
    </motion.article>
  );
};
