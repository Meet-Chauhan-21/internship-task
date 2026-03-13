import { useQuery } from "@tanstack/react-query";

export const useProduct = () => {
    const fetchProducts = async ()=>{
        const product = await fetch("https://jsonplaceholder.typicode.com/users")
        return product.json()
    }
    const {data,isPending,error,isError} = useQuery({
        queryKey:['products'],
        queryFn:fetchProducts
    })

    return {
        data,isPending,error,isError
    }
};
