import { useMutation, useQueryClient } from '@tanstack/react-query';
import removeCartItem from '@/api/removeCartItem';
import { message } from 'antd';
import { useState } from 'react';

export default function useRemoveCart() {
  const queryClient = useQueryClient();
  const [loadingItems, setLoadingItems] = useState<Record<string, boolean>>({});

  const mutation = useMutation({
    mutationFn: async (cartItemId: string) => {
      setLoadingItems((prev) => ({ ...prev, [cartItemId]: true }));
      await removeCartItem(cartItemId);
      setLoadingItems((prev) => ({ ...prev, [cartItemId]: false }));
    },

    onSuccess: () => {
      message.success('Item removed from cart');
      queryClient.invalidateQueries({ queryKey: ['cart'] });
    },

    onError: () => {
      message.error('Failed to remove item');
    },
  });

  return { ...mutation, loadingItems };
}
