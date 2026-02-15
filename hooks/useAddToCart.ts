import { useMutation } from '@tanstack/react-query';
import addToCart from '@/api/addToCart';
import { message } from 'antd';



export default function useAddToCart() {


    return useMutation({
        mutationFn: addToCart,

        onSuccess: () => {
            message.success('Added to cart');
        },
    });
}
