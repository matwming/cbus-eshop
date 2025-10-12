'use client';
import {useParams} from "next/navigation";
import {useGetProductDetail} from "@/app/queryHooks";
import {ErrorScreen} from "@/app/components/error";
import {ProductDetailsPage} from './component/productDetail';
export default function ProductDetail() {
    const params = useParams<{id:string}>();
    const {data, isLoading, isError, refetch} = useGetProductDetail(params.id)

    if (isError) {
        return <ErrorScreen retry={refetch}/>;
    }

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if(data){
        return <ProductDetailsPage product={data}/>;
    }

}
