export async function updateQuantityApi(cartItemId: string, quantity: number) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/cart/quantity`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ cartItemId, quantity }),
  });

  if (!res.ok) {
    throw new Error('Failed to update quantity');
  }

  return res.json();
}
