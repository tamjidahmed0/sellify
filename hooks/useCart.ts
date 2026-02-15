import { useQuery } from "@tanstack/react-query"
import cart from "@/api/cart"
import { Cart } from "@/types/cart"

const useCart = () => {
    return useQuery<Cart>({
        queryKey: ['cart'],
        queryFn: () => cart(),

    })
}
export default useCart