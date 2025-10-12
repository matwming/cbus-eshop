import {useQuery} from "@tanstack/react-query";

const apiRoot = process.env.NEXT_PUBLIC_API_ROOT;

const productsPath = '/products';

export const useGetProducts = () => {
    const {data, isLoading, isError} = useQuery({
        queryKey: ['products'],
        queryFn: () => {
            return fetch(`${apiRoot}${productsPath}`).then(res => res.json())
        }
    });
    return {data, isLoading, isError};
}
