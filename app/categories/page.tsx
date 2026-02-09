'use client';

import Link from 'next/link';
import { Card, Button, Breadcrumb } from 'antd';
import { Home, ArrowRight } from 'lucide-react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { categories, products } from '@/lib/data/products';

export default function CategoriesPage() {
  const getCategoryCount = (categoryName: string) => {
    return products.filter((p) => p.category === categoryName).length;
  };

  return (
    <div className="min-h-screen bg-linear-to-b from-gray-50 to-white">
      <Header />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Breadcrumb
          items={[
            {
              title: (
                <a href="/" className="flex items-center">
                  <Home className="h-4 w-4" />
                </a>
              ),
            },
            { title: 'Categories' },
          ]}
          className="mb-8"
        />

        <div className="mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Shop by Category
          </h1>
          <p className="text-xl text-gray-600">
            Explore our wide range of products across different categories
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {categories.map((category) => {
            const count = getCategoryCount(category.name);
            return (
              <Link key={category.id} href={`/products?category=${category.name}`}>
                <Card
                  className="h-full cursor-pointer hover:shadow-xl transition-all duration-300 transform hover:scale-105"
                  hoverable
                >
                  <div className={`${category.color} rounded-lg p-16 text-center mb-4`}>
                    <div className="text-6xl mb-4">{category.icon}</div>
                  </div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">
                    {category.name}
                  </h2>
                  <p className="text-gray-600 mb-4">
                    {count} product{count !== 1 ? 's' : ''}
                  </p>
                  <Button
                    type="primary"
                    block
                    icon={<ArrowRight className="h-4 w-4" />}
                    className="h-10"
                  >
                    Shop Now
                  </Button>
                </Card>
              </Link>
            );
          })}
        </div>

        <div className="bg-linear-to-r from-blue-50 to-cyan-50 rounded-2xl p-12 mb-12">
          <div className="max-w-2xl">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Browse All Categories
            </h2>
            <p className="text-gray-600 mb-8">
              Find exactly what you're looking for with our organized category system.
              Each category contains carefully curated products to meet your needs.
            </p>
            <Link href="/products">
              <Button type="primary" size="large" className="h-12">
                View All Products
              </Button>
            </Link>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center">
            <div className="bg-blue-100 rounded-full p-6 inline-flex mb-4">
              <span className="text-4xl">🛍️</span>
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">Wide Selection</h3>
            <p className="text-gray-600">
              Thousands of products across all categories
            </p>
          </div>

          <div className="text-center">
            <div className="bg-green-100 rounded-full p-6 inline-flex mb-4">
              <span className="text-4xl">✨</span>
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">Curated Collections</h3>
            <p className="text-gray-600">
              Hand-picked items for the best shopping experience
            </p>
          </div>

          <div className="text-center">
            <div className="bg-orange-100 rounded-full p-6 inline-flex mb-4">
              <span className="text-4xl">🚀</span>
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">Latest Trends</h3>
            <p className="text-gray-600">
              Always updated with newest products and trends
            </p>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
