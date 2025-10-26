import { useAtom } from "jotai";
import { cartAtom } from "@/app/components/states";
import { Minus, Plus } from "lucide-react";
import { useEffect, useRef } from "react";

export const Quantity = ({ productId }: { productId: number }) => {
  const [cart, setCart] = useAtom(cartAtom);
  const quantity = cart.get(productId)?.quantity ?? 0;
  const increaseBtnRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (increaseBtnRef.current) {
      increaseBtnRef.current.focus();
    }
  }, []);
  const decrease = () => {
    setCart((prev) => {
      const next = new Map([...prev]);
      const current = next.get(productId) ?? { quantity: 0 };
      const qty = (current.quantity ?? 0) - 1;
      next.set(productId, { ...current, quantity: Math.max(0, qty) });
      if (next.get(productId)?.quantity === 0) {
        next.delete(productId);
      }
      return next;
    });
  };

  const increase = () => {
    setCart((prev) => {
      const next = new Map(prev);
      const current = next.get(productId) ?? { quantity: 0 };
      const qty = (current.quantity ?? 0) + 1;
      next.set(productId, { ...current, quantity: qty });
      return next;
    });
  };
  return (
    <div className="inline-flex items-stretch rounded-xl border border-zinc-300 bg-white overflow-hidden">
      <button
        onClick={decrease}
        type="button"
        aria-label="Decrease quantity"
        className="w-10 h-10 grid place-items-center select-none hover:bg-zinc-100 dark:hover:bg-zinc-800 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-zinc-400"
      >
        <Minus className="h-4 w-4" aria-hidden />
      </button>

      <div className="min-w-14 h-10 grid place-items-center px-3 text-sm font-semibold tabular-nums bg-white">
        {quantity}
      </div>

      <button
        onClick={increase}
        ref={increaseBtnRef}
        type="button"
        aria-label="Increase quantity"
        className="w-10 h-10 grid place-items-center select-none hover:bg-zinc-100 dark:hover:bg-zinc-800 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-zinc-400"
      >
        <Plus className="h-4 w-4" aria-hidden />
      </button>
    </div>
  );
};
