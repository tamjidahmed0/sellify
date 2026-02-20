import { useMutation, useQueryClient } from '@tanstack/react-query';
import order from '@/services/api/order';
import { message } from 'antd';



export default function useCreateOrder() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: order,

        onSuccess: () => {
            message.success('Order created successfully');
            queryClient.invalidateQueries({ queryKey: ['order'] });
            queryClient.invalidateQueries({ queryKey: ['cart'] });
        },

        onError: (error: any) => {

            message.error('Failed to create order');
        }
    });
}
