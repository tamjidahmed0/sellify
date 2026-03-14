import { useQuery } from "@tanstack/react-query"
import getSlides from "@/services/api/getSlides"
import { SlidesResponse } from "@/types/slides.types"


const useGetslides = () => {
    return useQuery<SlidesResponse[]>({
        queryKey: ['slides'],
        queryFn: () => getSlides()

    })
}
export default useGetslides