'use client';

import { useState } from 'react';
import { useParams } from 'next/navigation';
import { Button, Rate, InputNumber, Tabs, Breadcrumb, Tag, Skeleton } from 'antd';
import {
  ShoppingCart,
  Heart,
  Share2,
  Truck,
  ShieldCheck,
  RotateCcw,
  Home,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import ProductCard from '@/components/products/ProductCard';
import useSingleProduct from '@/hooks/useSingleProduct';
import { Category, Product } from '@/lib/data/products';

export default function ProductDetailPage() {
  const params = useParams();
  const slug = params.slug;
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);

  const { data, isLoading } = useSingleProduct(slug as string);

  const product: Product = data;

  // All images (main + additional images)
  const allImages = product?.image
    ? [product.image, ...(product?.images?.map(img => img.url) || [])]
    : [];

  const handlePrevImage = () => {
    setSelectedImage((prev) => (prev === 0 ? allImages.length - 1 : prev - 1));
  };

  const handleNextImage = () => {
    setSelectedImage((prev) => (prev === allImages.length - 1 ? 0 : prev + 1));
  };

  const features = [
    {
      icon: Truck,
      title: 'Free Delivery',
      description: 'For orders over $50',
    },
    {
      icon: ShieldCheck,
      title: 'Secure Payment',
      description: '100% secure',
    },
    {
      icon: RotateCcw,
      title: 'Easy Returns',
      description: '30 days return',
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-8">
        {isLoading ? (
          <Skeleton.Input active size="small" style={{ width: 300, marginBottom: 24 }} />
        ) : (
          <Breadcrumb
            items={[
              {
                title: (
                  <a href="/" className="flex items-center">
                    <Home className="h-4 w-4" />
                  </a>
                ),
              },
              { title: <a href="/products">Products</a> },
              { title: product?.name },
            ]}
            className="mb-4 sm:mb-6"
          />
        )}

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 p-4 sm:p-6 lg:p-10">
            {/* Image Section */}
            <div>
              {isLoading ? (
                <>
                  <Skeleton.Image active className="w-full h-64 sm:h-96 lg:h-125 mb-4" />
                  <div className="grid grid-cols-4 gap-2 sm:gap-4">
                    {[...Array(4)].map((_, index) => (
                      <Skeleton.Image key={index} active className="w-full h-16 sm:h-20 lg:h-24" />
                    ))}
                  </div>
                </>
              ) : (
                <>
                  {/* Main Image with Navigation */}
                  <div className="relative mb-4 rounded-lg overflow-hidden border border-gray-200 group">
                    <img
                      src={allImages[selectedImage]}
                      alt={product?.name}
                      className="w-full h-64 sm:h-96 lg:h-125 object-cover"
                    />

                    {/* Navigation Arrows */}
                    {allImages.length > 1 && (
                      <>
                        <button
                          onClick={handlePrevImage}
                          className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white p-2 rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          <ChevronLeft className="h-5 w-5 text-gray-800" />
                        </button>
                        <button
                          onClick={handleNextImage}
                          className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white p-2 rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          <ChevronRight className="h-5 w-5 text-gray-800" />
                        </button>
                      </>
                    )}

                    {/* Image Counter */}
                    {allImages.length > 1 && (
                      <div className="absolute bottom-4 right-4 bg-black/60 text-white px-3 py-1 rounded-full text-sm">
                        {selectedImage + 1} / {allImages.length}
                      </div>
                    )}
                  </div>

                  {/* Thumbnail Images */}
                  <div className="grid grid-cols-4 gap-2 sm:gap-4">
                    {allImages.map((image, index) => (
                      <button
                        key={index}
                        onClick={() => setSelectedImage(index)}
                        className={`rounded-lg overflow-hidden border-2 ${selectedImage === index
                          ? 'border-blue-600'
                          : 'border-gray-200'
                          } hover:border-blue-400 transition-colors`}
                      >
                        <img
                          src={image}
                          alt={`${product?.name} ${index + 1}`}
                          className="w-full h-16 sm:h-20 lg:h-24 object-cover"
                        />
                      </button>
                    ))}
                  </div>
                </>
              )}
            </div>

            {/* Product Info Section */}
            <div className="space-y-4 sm:space-y-6">
              {isLoading ? (
                <>
                  <div>
                    <Skeleton.Input active size="small" style={{ width: 80, marginBottom: 12 }} />
                    <Skeleton active paragraph={{ rows: 1 }} />
                    <div className="flex items-center space-x-4 mt-4">
                      <Skeleton.Input active size="small" style={{ width: 120 }} />
                      <Skeleton.Input active size="small" style={{ width: 80 }} />
                    </div>
                  </div>

                  <div className="border-t border-b border-gray-200 py-4 sm:py-6">
                    <Skeleton.Input active size="large" style={{ width: 200, marginBottom: 8 }} />
                    <Skeleton.Input active size="small" style={{ width: 100 }} />
                  </div>

                  <Skeleton active paragraph={{ rows: 3 }} />

                  <div className="space-y-4">
                    <Skeleton.Input active size="large" style={{ width: 150 }} />
                    <div className="flex gap-4">
                      <Skeleton.Button active size="large" style={{ width: 200 }} />
                      <Skeleton.Button active size="large" />
                      <Skeleton.Button active size="large" />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 pt-4 sm:pt-6">
                    {[...Array(3)].map((_, index) => (
                      <div key={index} className="p-3 sm:p-4 rounded-lg bg-gray-50">
                        <Skeleton active paragraph={{ rows: 2 }} />
                      </div>
                    ))}
                  </div>
                </>
              ) : (
                <>
                  <div>
                    {product?.categories.map((item, index) => (
                      <Tag color="blue" className="mb-3" key={index}>
                        {item.name}
                      </Tag>
                    ))}

                    <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                      {product?.name}
                    </h1>
                    <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-4 space-y-2 sm:space-y-0 mb-4">
                      <Rate disabled defaultValue={product?.rating} className="text-sm sm:text-base" />
                      <span className="text-sm sm:text-base text-gray-600">
                        {product?.reviewsCount} reviews
                      </span>
                    </div>
                  </div>

                  <div className="border-t border-b border-gray-200 py-4 sm:py-6">
                    <div className="flex flex-wrap items-baseline gap-2 sm:gap-4 mb-2">
                      <span className="text-3xl sm:text-4xl font-bold text-gray-900">
                        ${product?.price}
                      </span>
                      {product?.originalPrice && (
                        <>
                          <span className="text-lg sm:text-xl text-gray-500 line-through">
                            ${product?.originalPrice}
                          </span>
                          <Tag color="red">
                            Save $
                            {(product?.originalPrice - product?.price).toFixed(2)}
                          </Tag>
                        </>
                      )}
                    </div>
                    {product?.inStock ? (
                      <span className="text-sm sm:text-base text-green-600 font-medium">In Stock</span>
                    ) : (
                      <span className="text-sm sm:text-base text-red-600 font-medium">Out of Stock</span>
                    )}
                  </div>

                  <div>
                    <p className="text-sm sm:text-base text-gray-700 leading-relaxed">
                      {product?.description}
                    </p>
                  </div>

                  <div className="space-y-4">
                    <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4">
                      <span className="text-sm sm:text-base text-gray-700 font-medium">Quantity:</span>
                      <InputNumber
                        min={1}
                        max={10}
                        value={Number(quantity)}
                        onChange={(value) => setQuantity(value || 1)}
                        size="large"
                        className="w-full sm:w-auto"
                        type="number"
                      />
                    </div>

                    <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                      <Button
                        type="primary"
                        size="large"
                        icon={<ShoppingCart className="h-4 w-4 sm:h-5 sm:w-5" />}
                        className="flex-1 h-11 sm:h-12 bg-blue-600 hover:bg-blue-700 border-none font-semibold text-sm sm:text-base"
                        disabled={!product?.inStock}
                      >
                        Add to Cart
                      </Button>
                      <Button
                        size="large"
                        icon={<Heart className="h-4 w-4 sm:h-5 sm:w-5" />}
                        className="h-11 sm:h-12 px-4 sm:px-6 text-sm sm:text-base"
                      >
                        <span className="hidden sm:inline">Wishlist</span>
                      </Button>
                      <Button
                        size="large"
                        icon={<Share2 className="h-4 w-4 sm:h-5 sm:w-5" />}
                        className="h-11 sm:h-12 px-4 sm:px-6 text-sm sm:text-base"
                      >
                        <span className="hidden sm:inline">Share</span>
                      </Button>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 pt-4 sm:pt-6">
                    {features.map((feature, index) => (
                      <div
                        key={index}
                        className="flex items-start space-x-3 p-3 sm:p-4 rounded-lg bg-gray-50"
                      >
                        <div className="bg-blue-100 p-2 rounded-lg shrink-0">
                          <feature.icon className="h-4 w-4 sm:h-5 sm:w-5 text-blue-600" />
                        </div>
                        <div>
                          <p className="font-medium text-gray-900 text-xs sm:text-sm">
                            {feature.title}
                          </p>
                          <p className="text-xs text-gray-600">
                            {feature.description}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </>
              )}
            </div>
          </div>

          {/* Tabs Section */}
          <div className="border-t border-gray-200 p-4 sm:p-6 lg:p-10">
            {isLoading ? (
              <Skeleton active paragraph={{ rows: 5 }} />
            ) : (
              <Tabs
                defaultActiveKey="1"
                size="large"
                items={[
                  {
                    key: '1',
                    label: 'Description',
                    children: (
                      <div className="prose max-w-none">
                        <p className="text-sm sm:text-base text-gray-700 leading-relaxed">
                          {product?.description}
                        </p>
                        <p className="text-sm sm:text-base text-gray-700 leading-relaxed mt-4">
                          This premium product is crafted with attention to detail
                          and quality materials. Perfect for everyday use and
                          designed to last. Experience the difference with our
                          carefully curated selection.
                        </p>
                      </div>
                    ),
                  },
                  {
                    key: '2',
                    label: 'Specifications',
                    children: (
                      <div className="space-y-2">
                        <div className="grid grid-cols-2 py-3 border-b gap-2">
                          <span className="font-medium text-gray-900 text-sm sm:text-base">
                            Category
                          </span>
                          <span className="text-gray-700 text-sm sm:text-base">
                            {product?.categories?.[0]?.name}
                          </span>
                        </div>
                        <div className="grid grid-cols-2 py-3 border-b gap-2">
                          <span className="font-medium text-gray-900 text-sm sm:text-base">
                            Brand
                          </span>
                          <span className="text-gray-700 text-sm sm:text-base">ShopHub Premium</span>
                        </div>
                        <div className="grid grid-cols-2 py-3 border-b gap-2">
                          <span className="font-medium text-gray-900 text-sm sm:text-base">
                            Availability
                          </span>
                          <span className="text-gray-700 text-sm sm:text-base">
                            {product?.inStock ? 'In Stock' : 'Out of Stock'}
                          </span>
                        </div>
                      </div>
                    ),
                  },
                  {
                    key: '3',
                    label: `Reviews (${product?.reviewsCount})`,
                    children: (
                      <div className="space-y-6">
                        <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-8 space-y-4 sm:space-y-0">
                          <div className="text-center">
                            <div className="text-4xl sm:text-5xl font-bold text-gray-900 mb-2">
                              {product?.rating}
                            </div>
                            <Rate disabled defaultValue={product?.rating} className="text-sm sm:text-base" />
                            <p className="text-sm sm:text-base text-gray-600 mt-2">
                              {product?.reviewsCount} reviews
                            </p>
                          </div>
                        </div>
                        <p className="text-sm sm:text-base text-gray-600">
                          Customer reviews will appear here.
                        </p>
                      </div>
                    ),
                  },
                ]}
              />
            )}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}