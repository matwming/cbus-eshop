import {useQuery} from "@tanstack/react-query";

const apiRoot = process.env.NEXT_PUBLIC_API_ROOT;

const productsPath = '/products';

export const useGetProducts = () => {
    const {data, isLoading, isError, refetch} = useQuery({
        queryKey: ['products'],
        queryFn: async () => {
            const res = await fetch(`${apiRoot}${productsPath}`);
            if (!res.ok) {
                throw new Error(`Failed /products: ${res.status}`);
            }
            return res.json();
        }
    });
    return {data, isLoading, isError, refetch};
}
