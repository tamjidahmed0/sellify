import { useQuery } from "@tanstack/react-query"
import categories from "@/api/categories"
import { CategoryResponse } from "@/lib/data/products"


const useCategories = () => {
    return useQuery<CategoryResponse>({
        queryKey: ['categories'],
        queryFn: () => categories(),

    })
}
export default useCategories