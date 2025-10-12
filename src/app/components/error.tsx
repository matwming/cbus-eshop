'use client';
import React from 'react'
import { motion, MotionConfig } from 'framer-motion'
import Link from "next/link";

export const ErrorScreen=({retry}: { retry: () => void})=>{
    return (
        <MotionConfig reducedMotion="user">
            <main
                role="main"
                aria-labelledby="error-title"
                className="relative min-h-screen w-full overflow-hidden bg-gradient-to-b from-slate-50 to-white dark:from-slate-950 dark:to-slate-900 text-slate-900 dark:text-slate-100 flex items-center justify-center p-6"
            >
                <motion.div
                    aria-hidden
                    className="pointer-events-none absolute -top-24 -left-24 h-72 w-72 rounded-full bg-rose-400/20 blur-3xl dark:bg-rose-500/15"
                    initial={{ opacity: 0, scale: 0.8, x: -40, y: -40 }}
                    animate={{ opacity: 1, scale: 1, x: 0, y: 0 }}
                    transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
                />
                <motion.div
                    aria-hidden
                    className="pointer-events-none absolute -bottom-24 -right-24 h-72 w-72 rounded-full bg-indigo-400/20 blur-3xl dark:bg-indigo-500/15"
                    initial={{ opacity: 0, scale: 0.8, x: 40, y: 40 }}
                    animate={{ opacity: 1, scale: 1, x: 0, y: 0 }}
                    transition={{ duration: 1.0, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
                />

                <motion.section
                    role="alert"
                    aria-live="polite"
                    className="relative w-full max-w-xl rounded-2xl border border-slate-200/80 dark:border-slate-800/80 bg-white/70 dark:bg-slate-900/60 backdrop-blur shadow-xl"
                    initial={{ opacity: 0, y: 24, scale: 0.98 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
                >
                    <div className="px-6 pt-6 pb-4">
                        <motion.div
                            className="inline-flex items-center gap-2 rounded-full border border-red-200 dark:border-red-900/60 bg-red-50 dark:bg-red-950 px-3 py-1 text-sm font-medium text-red-700 dark:text-red-300"
                            initial={{ opacity: 0, y: -8 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.4, delay: 0.15 }}
                        >
                            <svg aria-hidden viewBox="0 0 24 24" className="h-4 w-4"><path className="fill-current" d="M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20Zm1 14H11v-2h2v2Zm0-4H11V6h2v6Z"/></svg>
                            Error
                        </motion.div>

                        <motion.h1
                            id="error-title"
                            data-testid="error-title"
                            className="mt-4 text-2xl sm:text-3xl font-bold tracking-tight"
                            initial={{ opacity: 0, y: 8 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.45, delay: 0.25 }}
                        >
                            Something went wrong
                        </motion.h1>
                        <motion.p
                            className="mt-2 text-slate-600 dark:text-slate-300"
                            initial={{ opacity: 0, y: 8 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.45, delay: 0.35 }}
                            data-testid="error-message"
                        >
                            An unexpected error occurred. Try again, or go back home.
                        </motion.p>
                    </div>

                    <div className="px-6 pb-6 flex flex-wrap gap-3" data-testid="try-again-button">
                        <motion.button
                            type="button"
                            onClick={retry}
                            className="inline-flex items-center gap-2 rounded-xl bg-slate-900 text-white dark:bg-white dark:text-slate-900 px-4 py-2 text-sm font-semibold shadow hover:shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-slate-400 dark:focus-visible:ring-white/40"
                            whileHover={{ y: -1 }}
                            whileTap={{ scale: 0.98 }}
                            initial={{ opacity: 0, y: 8 }}
                            animate={{ opacity: 1, y: 0 }}
                        >
                            <svg aria-hidden className="h-4 w-4" viewBox="0 0 24 24"><path className="fill-current" d="M12 5v2a5 5 0 1 1-4.546 2.916l-1.79-.895A7 7 0 1 0 12 5Zm7-2h-6v2h3.586L14 7.586 15.414 9 20 4.414 18.586 3 16 5.586V2Z"/></svg>
                            Try again
                        </motion.button>

                        <Link href={'/'} data-testid="home-button">
                            <motion.span
                                whileHover={{ y: -1 }}
                                whileTap={{ scale: 0.98 }}
                                initial={{ opacity: 0, y: 8 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="inline-flex items-center gap-2 rounded-xl border border-slate-300 dark:border-slate-700 px-4 py-2 text-sm font-semibold hover:bg-slate-50 dark:hover:bg-slate-800 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-slate-400 dark:focus-visible:ring-white/40"
                            >
                                <svg aria-hidden className="h-4 w-4" viewBox="0 0 24 24"><path className="fill-current" d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"/></svg>
                                Home
                            </motion.span>
                        </Link>

                    </div>

                    <motion.div
                        className="px-6 pb-6"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.6, delay: 0.4 }}
                        data-testid="contact-support"
                    >
                        <div className="relative isolate overflow-hidden rounded-2xl border border-slate-200 dark:border-slate-800 bg-gradient-to-r from-rose-100 via-fuchsia-100 to-indigo-100 dark:from-rose-950 dark:via-fuchsia-900/30 dark:to-indigo-950/20 p-6">
                            <p className="text-sm text-slate-700/80 dark:text-slate-200/80">
                                If the issue continues, please contact support.
                            </p>
                        </div>
                    </motion.div>
                </motion.section>
            </main>
        </MotionConfig>
    )
}
