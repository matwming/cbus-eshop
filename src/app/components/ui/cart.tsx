'use client';

import { useAtom } from 'jotai';
import { cartAtom } from '@/app/components/states';
import {ProductButtons} from "@/app/components/ui/productButtons";
import {Product} from "@/app/components/types";
import {currency} from "@/app/components/product";

export const Cart = () => {
    const [cart, setCart] = useAtom(cartAtom);
    const items = Array.from(cart.entries()) as [number, Product][];
    const clear = () => setCart(() => new Map());

    const subtotal = (Array.from(cart.values()) as Product[]).reduce((sum, p) => {
        return sum + (p.price ?? 0) * (p.quantity ?? 0);
    }, 0);

    return (
        <aside>
            <div className="sticky top-0 h-svh">
                <div className="flex h-full flex-col rounded-2xl border border-zinc-800 bg-zinc-900/80 backdrop-blur p-4">
                    <header className="mb-3 flex items-center justify-between">
                        <h2 className="text-base font-semibold text-zinc-50">Your Cart</h2>
                        <button
                            onClick={clear}
                            className="rounded-lg border border-zinc-700 px-2 py-1 text-xs text-zinc-200 hover:bg-zinc-800"
                        >
                            Clear
                        </button>
                    </header>

                    {/* Items */}
                    <div className="flex-1 overflow-y-auto space-y-3 pr-1">
                        {items.length === 0 && (
                            <p className="text-sm text-zinc-400">Your cart is empty.</p>
                        )}

                        {items.map(([id, p]) => (
                            <div
                                key={id}
                                className="flex gap-3 rounded-xl border border-zinc-800 bg-zinc-900 p-3"
                            >
                                <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-lg bg-zinc-800">
                                    <img
                                        src={p.image}
                                        alt={p.title}
                                        className="object-contain p-1.5"
                                    />
                                </div>

                                <div className="min-w-0 flex-1">
                                    <p className="truncate text-sm font-medium text-zinc-100">
                                        {p.title}
                                    </p>
                                    <p className="text-xs text-zinc-400" data-testid={`unit-${id}-price`}>
                                        {currency.format(p.price)}
                                    </p>

                                    <div className="mt-2 flex items-center gap-2">
                                        <ProductButtons product={p}/>
                                    </div>
                                </div>

                                <div className="ml-2 self-start text-sm font-semibold text-zinc-100" data-testid={`total-${id}-price`}>
                                    {currency.format((p.price ?? 0) * (p.quantity ?? 0))}
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Footer */}
                    <footer className="mt-3 border-t border-zinc-800 pt-3">
                        <div className="mb-3 flex items-center justify-between text-sm text-zinc-200">
                            <span>Subtotal</span>
                            <span className="font-semibold" data-testid="total-price">{currency.format(subtotal)}</span>
                        </div>
                        <button className="w-full rounded-xl bg-amber-500 px-4 py-2.5 text-sm font-semibold text-black shadow hover:bg-amber-400">
                            Checkout
                        </button>
                    </footer>
                </div>
            </div>
        </aside>
    );
};
