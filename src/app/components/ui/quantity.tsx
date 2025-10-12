import {useAtom} from "jotai";
import {cartAtom} from "@/app/components/states";

export const Quantity = ({productId}:{productId:number}) => {
    const [cart, setCart] = useAtom(cartAtom);
    const quantity = cart.get(productId)?.quantity ?? 0;

    const decrease = () => {
        setCart((prev) => {
            const next = new Map([...prev]);
            const current = next.get(productId) ?? { quantity: 0 };
            next.set(productId, { ...current, quantity: Math.max(0, current.quantity -1) });
            if(next.get(productId)?.quantity === 0){
                next.delete(productId);
            }
            return next;
        });
    };

    const increase = () => {
        setCart((prev) => {
            const next = new Map(prev);
            const current = next.get(productId) ?? { quantity: 0 };
            next.set(productId, { ...current, quantity: current.quantity +1 });
            return next;
        });
    };
    return <div
        className="inline-flex items-stretch rounded-xl border border-zinc-300 bg-white overflow-hidden">
        <button
            onClick={decrease}
            type="button"
            aria-label="Decrease quantity"
            className="w-10 h-10 grid place-items-center select-none hover:bg-zinc-100 dark:hover:bg-zinc-800 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-zinc-400"
        >−
        </button>

        <div
            className="min-w-14 h-10 grid place-items-center px-3 text-sm font-semibold tabular-nums bg-white">
            {quantity}
        </div>

        <button
            onClick={increase}
            type="button"
            aria-label="Increase quantity"
            className="w-10 h-10 grid place-items-center select-none hover:bg-zinc-100 dark:hover:bg-zinc-800 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-zinc-400"
        >+
        </button>
    </div>
}
