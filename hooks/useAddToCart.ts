import { useMutation, useQueryClient } from '@tanstack/react-query';
import addToCart from '@/services/api/addToCart';
import { message } from 'antd';



export default function useAddToCart() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: addToCart,

        onSuccess: () => {
            message.success('Added to cart');
            queryClient.invalidateQueries({ queryKey: ['cart'] });
        },

        onError: (error: any) => {
            console.log(error, 'from erro')
            
            message.error('Not enough stock');
        }
    });
}
