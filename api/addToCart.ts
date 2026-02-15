export interface AddToCartPayload {
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

    if (!res.ok) {
        throw new Error('Failed to add to cart');
    }

    return res.json(); 
}
