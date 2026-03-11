import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteReview } from "@/services/api/deleteReview";
import { message } from "antd";

const useDeleteReview = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => deleteReview(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["review"] });
      message.success('Review deleted')
    },
  });
};

export default useDeleteReview;