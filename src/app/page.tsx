'use client';
import {useGetProducts} from "@/app/queryHooks";
import {ProductListSkeleton} from "@/app/components/loading";
import {ErrorScreen} from "@/app/components/error";
import {ProductCard} from "@/app/components/product";

export default function Home() {
    const {data, isLoading, isError, refetch} = useGetProducts();

    if (isError) {
        return <ErrorScreen retry={refetch}/>;
    }

    if (isLoading) {
        return <ProductListSkeleton />;
    }

    if (data) {
        return  <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4">
            {data.map((p) => (
                <ProductCard key={p.id} product={p} onAddToCart={()=>{}} />
            ))}
        </div>
    }
}
