export default async function removeCartItem(cartItemId: string) {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/cart/remove/${cartItemId}`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
    });

    if (!res.ok) {
        throw new Error('Failed to remove item');
    }

    return res.json();
}
