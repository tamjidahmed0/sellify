import { useQuery } from "@tanstack/react-query"
import singleProduct from "@/api/singleProduct"

const useSingleProduct = (slug: string) => {
    return useQuery({
        queryKey: ['products', slug],
        queryFn: () => singleProduct(slug),

    })
}
export default useSingleProduct