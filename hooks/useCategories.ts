import { useQuery } from "@tanstack/react-query"
import categories from "@/api/categories"

const useCategories = () => {
    return useQuery({
        queryKey: ['categories'],
        queryFn: () => categories(),

    })
}
export default useCategories