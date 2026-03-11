import { useQuery } from "@tanstack/react-query"
import getReviews from "@/services/api/getReviews"
import { Review, ReviewResponse } from "@/components/reviews/types/review.Types"

const useGetReview = () => {
    return useQuery<ReviewResponse>({
        queryKey: ['review'],
        queryFn: () => getReviews()

    })
}
export default useGetReview