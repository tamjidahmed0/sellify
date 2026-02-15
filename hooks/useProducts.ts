import { useQuery } from "@tanstack/react-query"
import products from "@/api/products"


const useProducts = (skip?: number, take?: number, categories?: string[], priceRange?: [number, number]) => {
    return useQuery({
        queryKey: ['products', skip ?? null, take ?? null, categories ?? [], priceRange??[]],
        queryFn: () => products(skip, take, categories, priceRange),

    })
}
export default useProducts