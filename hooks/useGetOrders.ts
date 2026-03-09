import { useQuery } from "@tanstack/react-query"
import getOrders from "@/services/api/getOrders"

const useGetOrders = () => {
    return useQuery({
        queryKey: ['orders'],
        queryFn: () => getOrders()

    })
}
export default useGetOrders