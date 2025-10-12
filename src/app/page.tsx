'use client';
import {useGetProducts} from "@/app/queryHooks";
import {ProductListSkeleton} from "@/app/components/loading";

export default function Home() {
    const {data, isLoading, isError} = useGetProducts();

    if (isLoading) {
        return <ProductListSkeleton />;
    }

  return <div className="text-3xl font-bold underline">
      hello world cbus eshop
  </div>;
}
