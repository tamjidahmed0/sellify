
export interface Category {
  id: string;
  name: string;
  createdAt: string;
}
interface Images {
  id: string;
  url: string;
  productId: string;
}

export interface Product {
  id: string;
  slug: string;
  name: string;
  price: number;
  originalPrice?: number;
  rating: number;
  reviewsCount: number;
  image: string;
  images: Images[];
  categories: Category[];
  description: string;
  inStock: boolean;
  featured?: boolean;
}

export const categories = [
  { id: 1, name: 'Electronics', icon: '💻', color: 'bg-blue-100' },
  { id: 2, name: 'Fashion', icon: '👗', color: 'bg-pink-100' },
  { id: 3, name: 'Home & Living', icon: '🏠', color: 'bg-green-100' },
  { id: 4, name: 'Sports', icon: '⚽', color: 'bg-orange-100' },
  { id: 5, name: 'Books', icon: '📚', color: 'bg-yellow-100' },
  { id: 6, name: 'Beauty', icon: '💄', color: 'bg-red-100' },
];

// export const products: Product[] = [
//   {
//     id: 1,
//     name: 'Wireless Bluetooth Headphones',
//     price: 89.99,
//     originalPrice: 129.99,
//     rating: 4.5,
//     reviewsCount: 328,
//     image: 'https://images.pexels.com/photos/3825517/pexels-photo-3825517.jpeg',
//     category: 'Electronics',
//     description: 'Premium wireless headphones with active noise cancellation and 30-hour battery life.',
//     inStock: true,
//     slug: '',
//     featured: true,
//   },
//   {
//     id: 2,
//     name: 'Smart Watch Pro',
//     price: 299.99,
//     originalPrice: 399.99,
//     rating: 4.7,
//     reviewsCount: 512,
//     image: 'https://images.pexels.com/photos/437037/pexels-photo-437037.jpeg',
//     category: 'Electronics',
//     description: 'Advanced smartwatch with fitness tracking, heart rate monitor, and GPS.',
//     inStock: true,
//     slug: '',
//     featured: true,
//   },
//   {
//     id: 3,
//     name: 'Designer Leather Bag',
//     price: 159.99,
//     rating: 4.8,
//     reviewsCount: 204,
//     image: 'https://images.pexels.com/photos/1152077/pexels-photo-1152077.jpeg',
//     category: 'Fashion',
//     description: 'Elegant leather handbag with multiple compartments and adjustable strap.',
//     inStock: true,
//     slug: '',
//     featured: true,
//   },
//   {
//     id: 4,
//     name: 'Running Shoes Ultra',
//     price: 129.99,
//     originalPrice: 179.99,
//     rating: 4.6,
//     reviewsCount: 445,
//     image: 'https://images.pexels.com/photos/2529148/pexels-photo-2529148.jpeg',
//     category: 'Sports',
//     description: 'Lightweight running shoes with superior cushioning and breathable mesh.',
//     inStock: true,
//     slug: '',
//     featured: true,
//   },
//   {
//     id: 5,
//     name: 'Modern Table Lamp',
//     price: 49.99,
//     rating: 4.4,
//     reviewsCount: 156,
//     image: 'https://images.pexels.com/photos/1112598/pexels-photo-1112598.jpeg',
//     category: 'Home & Living',
//     description: 'Contemporary table lamp with adjustable brightness and USB charging port.',
//     inStock: true,
//     slug: '',
//   },
//   {
//     id: 6,
//     name: 'Organic Skincare Set',
//     price: 79.99,
//     rating: 4.9,
//     reviewsCount: 623,
//     image: 'https://images.pexels.com/photos/4465124/pexels-photo-4465124.jpeg',
//     category: 'Beauty',
//     description: 'Complete skincare routine with natural ingredients and cruelty-free formula.',
//     inStock: true,
//     slug: '',
//   },
//   {
//     id: 7,
//     name: 'Wireless Charging Pad',
//     price: 39.99,
//     originalPrice: 59.99,
//     rating: 4.3,
//     reviewsCount: 287,
//     image: 'https://images.pexels.com/photos/4246120/pexels-photo-4246120.jpeg',
//     category: 'Electronics',
//     description: 'Fast wireless charging pad compatible with all Qi-enabled devices.',
//     inStock: true,
//     slug: '',
//   },
//   {
//     id: 8,
//     name: 'Yoga Mat Premium',
//     price: 34.99,
//     rating: 4.7,
//     reviewsCount: 391,
//     image: 'https://images.pexels.com/photos/4056535/pexels-photo-4056535.jpeg',
//     category: 'Sports',
//     description: 'Extra thick yoga mat with non-slip surface and carrying strap.',
//     inStock: true,
//     slug: '',
//   },
// ];
