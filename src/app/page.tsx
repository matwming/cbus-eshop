'use client';
import {useGetProducts} from "@/app/queryHooks";
import {ProductListSkeleton} from "@/app/components/loading";
import {ErrorScreen} from "@/app/components/error";

export default function Home() {
    const {data, isLoading, isError, refetch} = useGetProducts();

    if (isError) {
        return <ErrorScreen retry={refetch}/>;
    }

    if (isLoading) {
        return <ProductListSkeleton />;
    }

    if (data) {
        return <div className="text-3xl font-bold underline">
            hello world cbus eshop
        </div>;
    }
}
