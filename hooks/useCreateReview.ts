import { useMutation, useQueryClient } from '@tanstack/react-query';
import createReview from '@/services/api/createReview';
import { message } from 'antd';

export default function useCreateReview() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: createReview,
        onSuccess: (data) => {
            message.success(data?.message ?? 'Review submitted!');
            queryClient.invalidateQueries({ queryKey: ['orders'] });
        },
        onError: (error: Error) => {
            message.error(error.message ?? 'Something went wrong');
        },
    });
}