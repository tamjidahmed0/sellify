import { useQuery } from "@tanstack/react-query"
import products from "@/services/api/products"


const useProducts = (skip?: number, take?: number, categories?: string[], priceRange?: [number, number], search?: string) => {
    return useQuery({
        queryKey: ['products', skip ?? null, take ?? null, categories ?? [], priceRange ?? [], search ?? null],
        queryFn: () => products(skip, take, categories, priceRange, search),

    })
}
export default useProducts