import { useMutation, useQueryClient } from '@tanstack/react-query';
import addToCart from '@/api/addToCart';
import { message } from 'antd';



export default function useAddToCart() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: addToCart,

        onSuccess: () => {
            message.success('Added to cart');
            queryClient.invalidateQueries({ queryKey: ['cart'] });
        },
    });
}
