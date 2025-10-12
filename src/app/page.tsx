'use client';
import {useGetProducts} from "@/app/queryHooks";
import {ProductListSkeleton} from "@/app/components/loading";
import {ErrorScreen} from "@/app/components/error";
import {ProductCard} from "@/app/components/product";
import {Checkbox} from "@/app/components/ui/checkbox";
import {cartAtom, selectCategoryAtom} from "@/app/components/states";
import {useAtom} from "jotai";

export default function Home() {
    const [selectedCategory] = useAtom(selectCategoryAtom);
    const [cart, setCart] = useAtom(cartAtom);

    const {data, isLoading, isError, refetch} = useGetProducts();
    const filteredProducts = data?.filter(p => {
        if(selectedCategory.length === 0){
            return true;
        } else {
            return selectedCategory.includes(p.category)
        }
    });

    if (isError) {
        return <ErrorScreen retry={refetch}/>;
    }

    if (isLoading) {
        return <ProductListSkeleton />;
    }

    if (data) {
        return  <div>
            <Checkbox/>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4">
                {filteredProducts?.map((p) => (
                    <ProductCard key={p.id} product={p} onAddToCart={(p)=>{
                        const result = (new Map([...cart])).set(p.id, { ...p, quantity: 1 });
                        setCart(()=>result);
                    }} />
                ))}
            </div>
        </div>


    }
}
