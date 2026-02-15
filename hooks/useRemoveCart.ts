import { useMutation, useQueryClient } from '@tanstack/react-query';
import removeCartItem from '@/api/removeCartItem';
import { message } from 'antd';

export default function useRemoveCart() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: removeCartItem,

    onSuccess: () => {
      message.success('Item removed from cart');
      queryClient.invalidateQueries({ queryKey: ['cart'] });
    },

    onError: () => {
      message.error('Failed to remove item');
    },
  });
}
