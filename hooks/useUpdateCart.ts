import { useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateQuantityApi } from '@/services/api/updateQuantity';
import { message } from 'antd';


export default function useUpdateCart() {
    const queryClient = useQueryClient();

    // Track loading per item
    const [loadingItems, setLoadingItems] = useState<Record<string, boolean>>({});

    const mutation = useMutation({
        mutationFn: ({ cartItemId, quantity }: { cartItemId: string; quantity: number }) =>
            updateQuantityApi(cartItemId, quantity),

        onMutate: async ({ cartItemId }) => {
            // prevent double click
            setLoadingItems((prev) => ({ ...prev, [cartItemId]: true }));

            // cancel previous queries
            await queryClient.cancelQueries({ queryKey: ['cart'] });
        },

        onSuccess: (_, { cartItemId, quantity }) => {
            // update cart after success
            queryClient.setQueryData(['cart'], (old: any) => {
                if (!old) return old;
                return {
                    ...old,
                    items: old.items.map((item: any) =>
                        item.id === cartItemId ? { ...item, quantity } : item
                    ),
                };
            });
        },

        onError: (error: any) => {
            // show error
           message.error(error.message || 'Failed to update quantity');
        },

        onSettled: (_, __, { cartItemId }) => {
            // remove loading state
            setLoadingItems((prev) => ({ ...prev, [cartItemId]: false }));
            queryClient.invalidateQueries({ queryKey: ['cart'] });
        },
    });

    return { ...mutation, loadingItems };
}
