import { useQuery } from "@tanstack/react-query"
import products from "@/api/products"

const useProducts = (skip?: number, take?: number) => {
    return useQuery({
        queryKey: ['products', skip ?? null, take ?? null],
        queryFn: () => products(skip, take),

    })
}
export default useProducts