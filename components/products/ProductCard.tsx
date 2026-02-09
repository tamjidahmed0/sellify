// 'use client';

// import Link from 'next/link';
// import { Card, Button, Rate, Tag } from 'antd';
// import { ShoppingCart, Heart } from 'lucide-react';
// import { Product } from '@/lib/data/products';

// interface ProductCardProps {
//   product: Product;
// }

// export default function ProductCard({ product }: ProductCardProps) {
//   const discount = product.originalPrice
//     ? Math.round(
//         ((product.originalPrice - product.price) / product.originalPrice) * 100
//       )
//     : 0;

//   return (
//     <Card
//       hoverable
//       className="overflow-hidden group border border-gray-200 hover:shadow-xl transition-all duration-300"
//       cover={
//         <Link href={`/products/${product.id}`}>
//           <div className="relative h-64 overflow-hidden bg-gray-100">
//             <img
//               src={product.image}
//               alt={product.name}
//               className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
//             />
//             {discount > 0 && (
//               <Tag
//                 color="red"
//                 className="absolute top-4 right-4 text-sm font-bold px-3 py-1"
//               >
//                 -{discount}%
//               </Tag>
//             )}
//             <button className="absolute top-4 left-4 bg-white p-2 rounded-full shadow-md opacity-0 group-hover:opacity-100 transition-opacity hover:bg-gray-100">
//               <Heart className="h-5 w-5 text-gray-700" />
//             </button>
//           </div>
//         </Link>
//       }
//     >
//       <Link href={`/products/${product.id}`}>
//         <div className="mb-3">
//           <Tag color="blue" className="mb-2">
//             {product.category}
//           </Tag>
//           <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2 hover:text-blue-600 transition-colors">
//             {product.name}
//           </h3>
//           <div className="flex items-center space-x-2 mb-3">
//             <Rate disabled defaultValue={product.rating} className="text-sm" />
//             <span className="text-sm text-gray-600">
//               ({product.reviews})
//             </span>
//           </div>
//         </div>
//       </Link>

//       <div className="flex items-center justify-between">
//         <div>
//           <div className="flex items-center space-x-2">
//             <span className="text-2xl font-bold text-gray-900">
//               ${product.price}
//             </span>
//             {product.originalPrice && (
//               <span className="text-sm text-gray-500 line-through">
//                 ${product.originalPrice}
//               </span>
//             )}
//           </div>
//           {!product.inStock && (
//             <span className="text-xs text-red-600 font-medium">
//               Out of Stock
//             </span>
//           )}
//         </div>
//         <Button
//           type="primary"
//           icon={<ShoppingCart className="h-4 w-4" />}
//           className="bg-blue-600 hover:bg-blue-700 border-none"
//           disabled={!product.inStock}
//         >
//           Add
//         </Button>
//       </div>
//     </Card>
//   );
// }








'use client';
import Link from 'next/link';
import { Card, Button, Rate, Tag, Skeleton } from 'antd';
import { ShoppingCart, Heart } from 'lucide-react';
import { Category, Product } from '@/lib/data/products';

interface ProductCardProps {
  product: Product;
  loading?: boolean;
}

export default function ProductCard({ product, loading = false }: ProductCardProps) {
  const discount = product.originalPrice
    ? Math.round(
      ((product.originalPrice - product.price) / product.originalPrice) * 100
    )
    : 0;

  if (loading) {
    return (
      <Card
        className="overflow-hidden border border-gray-200"
        cover={
          <div className="relative h-64 bg-gray-100" />

        }
      >
        <div className="mb-3">
          <Skeleton.Input active size="small" className="mb-2" style={{ width: 80 }} />
          <Skeleton active paragraph={{ rows: 1 }} />
          <div className="flex items-center space-x-2 mb-3 mt-2">
            <Skeleton.Input active size="small" style={{ width: 120 }} />
          </div>
        </div>
        <div className="flex items-center justify-between">
          <div>
            <Skeleton.Input active size="small" style={{ width: 100 }} />
          </div>
          <Skeleton.Button active size="default" />
        </div>
      </Card>
    );
  }

  return (
    <Card
      hoverable
      className="overflow-hidden group border border-gray-200 hover:shadow-xl transition-all duration-300"
      cover={
        <Link href={`/products/${product.slug}`}>
          <div className="relative h-64 overflow-hidden bg-gray-100">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
            />
            {discount > 0 && (
              <Tag
                color="red"
                className="absolute top-4 right-4 text-sm font-bold px-3 py-1"
              >
                -{discount}%
              </Tag>
            )}
            <button className="absolute top-4 left-4 bg-white p-2 rounded-full shadow-md opacity-0 group-hover:opacity-100 transition-opacity hover:bg-gray-100">
              <Heart className="h-5 w-5 text-gray-700" />
            </button>
          </div>
        </Link>
      }
    >
      <Link href={`/products/${product.slug}`}>
        <div className="mb-3">
          {product.categories.map((item: Category, index) => (
            <Tag color="blue" className="mb-2" key={index}>
              {item.name}
            </Tag>
          ))}

          <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2 hover:text-blue-600 transition-colors">
            {product.name}
          </h3>
          <div className="flex items-center space-x-2 mb-3">
            <Rate disabled defaultValue={product.rating} className="text-sm" />
            <span className="text-sm text-gray-600">
              ({product.reviewsCount})
            </span>
          </div>
        </div>
      </Link>
      <div className="flex items-center justify-between">
        <div>
          <div className="flex items-center space-x-2">
            <span className="text-2xl font-bold text-gray-900">
              ${product.price}
            </span>
            {product.originalPrice && (
              <span className="text-sm text-gray-500 line-through">
                ${product.originalPrice}
              </span>
            )}
          </div>
          {!product.inStock && (
            <span className="text-xs text-red-600 font-medium">
              Out of Stock
            </span>
          )}
        </div>
        <Button
          type="primary"
          icon={<ShoppingCart className="h-4 w-4" />}
          className="bg-blue-600 hover:bg-blue-700 border-none"
          disabled={!product.inStock}
        >
          Add
        </Button>
      </div>
    </Card>
  );
}