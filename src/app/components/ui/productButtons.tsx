import {useAtom} from "jotai";
import {cartAtom} from "@/app/components/states";
import {Quantity} from "@/app/components/ui/quantity";
import {motion} from "framer-motion";
import * as React from "react";
import {currency} from "@/app/components/product";
import {Product} from "@/app/components/types";
import { ShoppingCart } from "lucide-react";

export const ProductButtons = ({product}:{product:Product}) => {
    const [cart, setCart] = useAtom(cartAtom);
    if(cart.has(product.id)){
       return <Quantity productId={product.id}/>
    }
    return <motion.button
        whileTap={{ scale: 0.98 }}
        whileHover={{ y: -1 }}
        onClick={() => {
            const result = (new Map([...cart])).set(product.id, { ...product, quantity: 1 });
            setCart(()=>result);
        }}
        className="inline-flex flex-center gap-2 w-full rounded-xl bg-zinc-900 px-4 py-2.5 text-sm font-medium text-white shadow-sm transition-colors hover:bg-zinc-800 active:bg-zinc-900/90 dark:bg-white dark:text-zinc-900 dark:hover:bg-zinc-200"
        aria-label={`Add ${product.title} to cart for ${currency.format(product.price)}`}
    >
        <ShoppingCart className="h-5 w-5" aria-hidden />
        Add to cart
    </motion.button>
}
