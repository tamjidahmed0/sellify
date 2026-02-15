export interface CartItem {
  id: string;
  cartId: string;
  productId: string;
  quantity: number;
  price: string;
  productName: string;
  image?: string;
  product: {
    slug: string;
  };
}

export interface Cart {
  id: string;
  userId: string;
  items: CartItem[];
  total: number;
}
