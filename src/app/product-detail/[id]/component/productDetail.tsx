'use client'

import React from 'react'
import {motion, MotionConfig} from 'framer-motion'
import Rating from '@/app/components/ui/rating'
import {useRouter} from 'next/navigation'
import {Product} from "@/app/components/types";
import {currency} from "@/app/components/product";

export const ProductDetailsPage = ({product}: {product:Product}) => {
    const router = useRouter()
    const goBack = () => router.back()

    return (
        <MotionConfig reducedMotion="user">
            <main
                role="main"
                aria-labelledby="product-title"
                className="
          min-h-screen
          bg-[var(--color-zinc-900)]
          text-zinc-900 dark:text-zinc-50
        "
            >
                <section className="relative isolate px-4 pt-8 pb-4 sm:px-6 md:px-10 md:pt-10">
                    <motion.div
                        initial={{opacity: 0, y: 12}}
                        animate={{opacity: 1, y: 0}}
                        transition={{duration: 0.5, ease: [0.22, 1, 0.36, 1]}}
                        className="mx-auto w-full max-w-5xl flex flex-col"
                    >
                        <motion.button
                            type="button"
                            onClick={goBack}
                            whileHover={{y: -1}}
                            whileTap={{scale: 0.98}}
                            className="
                inline-flex items-center gap-2 rounded-xl max-w-[100px]
                border border-indigo-300/70 bg-white/70 px-3 py-1.5 text-sm font-semibold  text-zinc-900 dark:text-zinc-50
                shadow-sm transition-colors hover:bg-indigo-50
                focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400 focus-visible:ring-offset-2
                dark:border-slate-700 dark:bg-white/5 dark:text-indigo-200 dark:hover:bg-white/10 dark:focus-visible:ring-offset-0
              "
                            aria-label="Go back"
                            data-testid='back-button'
                        >
                            <svg aria-hidden className="h-4 w-4" viewBox="0 0 24 24">
                                <path className="fill-current" d="M15.5 5.5 9 12l6.5 6.5L14 20 6 12l8-8 1.5 1.5Z"/>
                            </svg>
                            Back
                        </motion.button>

                        <div
                            className="
                mt-4 inline-flex items-center gap-2 rounded-full
                border border-indigo-200/70 bg-indigo-100/60 px-3 py-1 text-xs font-medium text-indigo-800
                dark:border-slate-700 dark:bg-white/5 dark:text-indigo-200
              "
                            data-testid='product-category'
                        >
                            <span aria-hidden>●</span> {product.category}
                        </div>

                        <h1 id="product-title"
                            data-testid='product-title'
                            className="mt-3 text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight">
                            {product.title}
                        </h1>
                    </motion.div>
                </section>

                {/* Content */}
                <section className="px-4 pb-14 sm:px-6 md:px-10">
                    <div className="mx-auto grid w-full max-w-5xl grid-cols-1 gap-6 md:grid-cols-2 md:gap-8">
                        <motion.div
                            className="md:sticky md:top-6"
                            initial={{opacity: 0, y: 12}}
                            animate={{opacity: 1, y: 0}}
                            transition={{duration: 0.5, delay: 0.05}}
                        >
                            <div
                                className="
                  relative overflow-hidden rounded-3xl
                  border border-indigo-200/60 bg-white/70 p-3 sm:p-4
                  shadow-xl ring-1 ring-black/5 backdrop-blur
                  dark:border-slate-700 dark:bg-white/5
                "
                            >
                                <motion.div
                                    className="relative aspect-[4/3]"
                                    initial={{scale: 0.98, opacity: 0}}
                                    animate={{scale: 1, opacity: 1}}
                                    transition={{type: 'spring', stiffness: 140, damping: 18}}
                                >
                                    <img
                                        src={product.image}
                                        alt={product.title}
                                        className="h-full w-full object-contain p-4 sm:p-6"
                                        loading="eager"
                                    />
                                </motion.div>
                            </div>
                        </motion.div>

                        {/* Details */}
                        <motion.div
                            initial={{opacity: 0, y: 16}}
                            animate={{opacity: 1, y: 0}}
                            transition={{duration: 0.55, ease: [0.22, 1, 0.36, 1]}}
                            className="flex flex-col gap-5 sm:gap-6"
                        >
                            <div
                                className="
                  rounded-3xl border border-indigo-200/60 bg-white/70 p-5 sm:p-6
                  shadow-lg ring-1 ring-black/5 backdrop-blur
                  dark:border-slate-700 dark:bg-white/5
                "
                            >
                                <div className="flex flex-wrap items-center justify-between gap-3">
                                    <p className="text-2xl sm:text-3xl font-extrabold tabular-nums text-indigo-900 dark:text-indigo-200">
                                        {currency.format(product.price)}
                                    </p>
                                    <div className="flex items-center gap-3" data-testid='rating'>
                                        <Rating rate={product.rating.rate} count={product.rating.count}/>
                                        <span className="text-xs sm:text-sm text-indigo-700/80 dark:text-indigo-300/80">
                      ({product.rating.count} reviews)
                    </span>
                                    </div>
                                </div>
                            </div>

                            {/* Description */}
                            <div
                                className="
                  rounded-3xl border border-indigo-200/60 bg-white/70 p-5 sm:p-6
                  shadow-lg ring-1 ring-black/5 backdrop-blur
                  dark:border-slate-700 dark:bg-white/5
                "
                                data-testid='description'
                            >
                                <h2 className="text-base sm:text-lg font-semibold tracking-tight">Description</h2>
                                <p className="mt-2 text-sm sm:text-[15px] leading-7 text-zinc-700 dark:text-zinc-300">
                                    {product.description}
                                </p>
                            </div>

                            {/* Actions */}
                            <div className="flex flex-col gap-3 sm:flex-row" data-testid='add-to-cart'>
                                <motion.button
                                    whileHover={{y: -1}}
                                    whileTap={{scale: 0.98}}
                                    className="w-full rounded-xl bg-zinc-900 px-4 py-2.5 text-sm font-medium text-white shadow-sm transition-colors hover:bg-zinc-800 active:bg-zinc-900/90 dark:bg-white dark:text-zinc-900 dark:hover:bg-zinc-200"
                                    aria-label={`Add ${product.title} to cart for ${currency.format(product.price)}`}
                                    onClick={() =>{}}
                                >
                                    Add to cart
                                </motion.button>
                            </div>
                        </motion.div>
                    </div>
                </section>
            </main>
        </MotionConfig>
    )
}
