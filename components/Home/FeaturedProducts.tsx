'use client';

import Link from 'next/link';
import { Button } from 'antd';
import { ArrowRight } from 'lucide-react';
// import { products } from '@/lib/data/products';
import ProductCard from '@/components/products/ProductCard';
import useProducts from '@/hooks/useProducts';
import { Product } from '@/lib/data/products';

export default function FeaturedProducts() {
  const { data, isLoading } = useProducts(0, 4);




  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-12">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
              Featured Products
            </h2>
            <p className="text-lg text-gray-600">
              Handpicked items just for you
            </p>
          </div>
          <Link href="/products">
            <Button
              size="large"
              type="default"
              icon={<ArrowRight className="h-5 w-5" />}
              className="hidden md:flex items-center"
            >
              View All
            </Button>
          </Link>
        </div>

        {/* <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div> */}


        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {[...Array(6)].map((_, index) => (
              <ProductCard
                key={index}
                product={{} as Product}
                loading={true}
              />
            ))}
          </div>
        ) : data.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {data.map((product: Product) => (
              <ProductCard key={product.id} product={product} loading={false} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-500">No products found</p>
          </div>
        )}

        <div className="text-center mt-8 md:hidden">
          <Link href="/products">
            <Button
              size="large"
              type="default"
              icon={<ArrowRight className="h-5 w-5" />}
            >
              View All Products
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}







