import getCookie from "@/lib/getCookie";

export interface CreateOrderItem {
    productId: string;
    quantity: number;
}

export interface CreateOrderPayload {
    // userId: string;
    items: CreateOrderItem[];
}


export default async function order(payload: CreateOrderPayload) {
    const token = getCookie("token");
    if (!token) throw new Error("No token found");
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/orders/create`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
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
