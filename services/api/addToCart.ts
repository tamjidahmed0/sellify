interface AddToCartPayload {
    productId: string;
    quantity: number;
}

export default async function addToCart(payload: AddToCartPayload) {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/cart/add`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
    });

    const data = await res.json();

    if (!res.ok) {
        const errorMessage = data?.message || 'Failed to add to cart';
        throw new Error(errorMessage);
    }

    return data;
}
