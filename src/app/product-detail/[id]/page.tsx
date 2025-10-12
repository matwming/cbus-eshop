'use client';
import {useParams} from "next/navigation";
import {useGetProductDetail} from "@/app/queryHooks";
import {ErrorScreen} from "@/app/components/error";
import {ProductDetailsPage} from './component/productDetail';
import {useAtom} from "jotai";
import {cartAtom} from "@/app/components/states";
import {Cart} from "@/app/components/ui/cart";
import {ProductListSkeleton} from "@/app/components/loading";
export default function ProductDetail() {
    const params = useParams<{id:string}>();
    const [cart] = useAtom(cartAtom);
    const hasCart = cart.size > 0;
    const {data, isLoading, isError, refetch} = useGetProductDetail(params.id)

    if (isError) {
        return <ErrorScreen retry={refetch}/>;
    }

    if (isLoading) {
        return <ProductListSkeleton count={1}/>;
    }

    if(data){
        return <div className={`grid min-h-svh gap-6 ${
            hasCart
                ? 'grid-cols-[minmax(0,1fr)_320px] md:grid-cols-[minmax(0,1fr)_360px]'
                : 'grid-cols-1'
        }`}>
            <ProductDetailsPage product={data}/>
            { cart.size > 0 && <Cart/>}
        </div>


    }

}
