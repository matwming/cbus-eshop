"use client";
import { useGetProducts } from "@/app/queryHooks";
import { ProductListSkeleton } from "@/app/components/loading";
import { ErrorScreen } from "@/app/components/error";
import { ProductCard } from "@/app/components/product";
import { Checkbox } from "@/app/components/ui/checkbox";
import { cartAtom, selectCategoryAtom } from "@/app/components/states";
import { useAtom } from "jotai";
import { Cart } from "@/app/components/ui/cart";
import { ScrollToBottom } from "@/app/components/utils/scrollToBottom";

export default function Home() {
  const [selectedCategory] = useAtom(selectCategoryAtom);
  const [cart] = useAtom(cartAtom);
  const hasCart = cart.size > 0;
  const { data, isLoading, isError, refetch } = useGetProducts();
  const filteredProducts = data?.filter((p) => {
    if (selectedCategory.length === 0) {
      return true;
    } else {
      return selectedCategory.includes(p.category);
    }
  });

  if (isError) {
    return <ErrorScreen retry={refetch} />;
  }

  if (isLoading) {
    return <ProductListSkeleton />;
  }

  if (data) {
    return (
      <div
        className={`grid min-h-svh gap-6 ${
          hasCart
            ? "grid-cols-[minmax(0,1fr)_320px] md:grid-cols-[minmax(0,1fr)_360px]"
            : "grid-cols-1"
        }`}
      >
        <div className={"space-y-6 relative"}>
          <Checkbox />
          <div
            className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4"
            data-testid="product-list"
          >
            {filteredProducts?.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
          <ScrollToBottom />
        </div>
        {cart.size > 0 && <Cart />}
      </div>
    );
  }
}
