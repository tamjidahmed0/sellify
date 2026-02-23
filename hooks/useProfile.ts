import { useQuery } from "@tanstack/react-query"
import profile from "@/services/api/profile"

const useProfile = () => {
    return useQuery({
        queryKey: ['profile'],
        queryFn: () => profile()

    })
}
export default useProfile