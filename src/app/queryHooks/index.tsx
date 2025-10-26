import { useQuery, UseQueryResult } from "@tanstack/react-query";
import { Product } from "@/app/components/types";

const apiRoot = process.env.NEXT_PUBLIC_API_ROOT;

if (!apiRoot) {
  throw new Error("NEXT_PUBLIC_API_ROOT is not defined");
}

const productsPath = "/products";

export const useGetProducts = (): UseQueryResult<Product[], Error> => {
  const result = useQuery<Product[]>({
    queryKey: ["products"],
    queryFn: async () => {
      const res = await fetch(`${apiRoot}${productsPath}`);
      if (!res.ok) {
        throw new Error(`Failed /products: ${res.status}`);
      }
      return res.json();
    },
  });
  return result;
};

export const useGetProductDetail = (
  id: string,
): UseQueryResult<Product, Error> => {
  const result = useQuery<Product>({
    queryKey: ["product_id", id],
    enabled: Boolean(id),
    queryFn: async () => {
      const res = await fetch(`${apiRoot}${productsPath}/${id}`);
      if (!res.ok) {
        throw new Error(`Failed /products: ${res.status}`);
      }
      return res.json();
    },
  });
  return result;
};
