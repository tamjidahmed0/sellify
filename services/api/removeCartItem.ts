import getCookie from "@/lib/getCookie";

export default async function removeCartItem(cartItemId: string) {
    const token = getCookie("token");
    if (!token) throw new Error("No token found");
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/cart/remove/${cartItemId}`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
    });

    if (!res.ok) {
        throw new Error('Failed to remove item');
    }

    return res.json();
}
