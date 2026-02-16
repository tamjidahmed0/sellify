'use client';

import Link from 'next/link';
import { Card } from 'antd';
import { ArrowRight } from 'lucide-react';
import useCategories from '@/hooks/useCategories';


export default function Categories() {

  const { data } = useCategories()


  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Shop by Category
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Browse our wide selection of products across different categories
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {data?.categories.map((item) => (
            <Link key={item.id} href={`/products?category=${item.name}`}>
              <Card
                hoverable
                className="text-center border-2 border-transparent hover:border-blue-500 transition-all duration-300 h-full"
              >
                <div
                  className={`w-20 h-20 mx-auto rounded-full flex items-center justify-center text-4xl mb-4`}
                >
                  <img src={item?.image} alt={item?.name} />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2 capitalize">
                  {item.name}
                </h3>
                <div className="flex items-center justify-center text-blue-600 text-sm font-medium">
                  <span>Explore</span>
                  <ArrowRight className="h-4 w-4 ml-1" />
                </div>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
