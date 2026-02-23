import getCookie from "@/lib/getCookie";

export async function updateQuantityApi(cartItemId: string, quantity: number) {
  const token = getCookie("token");
  if (!token) throw new Error("No token found");
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/cart/quantity`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ cartItemId, quantity }),
  });

  const data = await res.json();

  if (!res.ok) {
    const errorMessage = data?.message || 'Failed to update quantity';
    throw new Error(errorMessage);
  }

  return data;
}
