import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateReview } from "@/services/api/updateReview";

type UpdateReviewPayload = {
    id: string;
    rating: number;
    comment?: string;
};

const useUpdateReview = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({ id, rating, comment }: UpdateReviewPayload) =>
            updateReview({ id, rating, comment }),

        onSuccess: () => {
            // review list refresh
            queryClient.invalidateQueries({ queryKey: ["review"] });
        },
    });
};

export default useUpdateReview;