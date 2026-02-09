'use client';

import { useState } from 'react';
import { Select, Slider, Checkbox, Button, Breadcrumb, Drawer } from 'antd';
import { Home, SlidersHorizontal } from 'lucide-react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import ProductCard from '@/components/products/ProductCard';
import { categories, Category } from '@/lib/data/products';
import useProducts from '@/hooks/products';
import useCategories from '@/hooks/useCategories';

import { Skeleton } from 'antd';
import FilterContent from '@/components/ui/Filter';
import FilterSkeleton from '@/components/ui/FilterSkeleton';



const { Option } = Select;

export default function ProductsPage() {
    const [priceRange, setPriceRange] = useState<[number, number]>([0, 500]);
    const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
    const [sortBy, setSortBy] = useState('featured');
    const [showFilters, setShowFilters] = useState(false);

    const { data, isLoading } = useProducts();





    console.log(data, 'ddd')





    return (
        <div className="min-h-screen bg-gray-50">
            <Header />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-8">
                <Breadcrumb
                    items={[
                        {
                            title: (
                                <a href="/" className="flex items-center">
                                    <Home className="h-4 w-4" />
                                </a>
                            ),
                        },
                        { title: 'Products' },
                    ]}
                    className="mb-4 sm:mb-6"
                />

                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 sm:mb-8 gap-4">
                    <div>
                        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-2">
                            All Products
                        </h1>
                        <p className="text-sm sm:text-base text-gray-600">
                            {/* Showing {filteredProducts.length} of {products.length} products */}
                        </p>
                    </div>


                    <div className='lg:hidden w-full'>
                        <Button
                            icon={<SlidersHorizontal className="h-4 w-4" />}
                            onClick={() => setShowFilters(!showFilters)}
                            className="w-full sm:w-auto"
                            size="large"
                        >
                            Filters
                        </Button>
                    </div>

                </div>

                <div className="flex flex-col lg:flex-row gap-6 lg:gap-8">

                    {/* Desktop Filters Sidebar */}
                    {isLoading ? (
                        <FilterSkeleton />
                    ) :

                        (
                            <aside className="hidden lg:block lg:w-64">
                                <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 sticky top-20 lg:top-24">
                                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Filters</h3>
                                    <FilterContent />
                                </div>
                            </aside>

                        )

                    }


                    {/* Mobile Filters Drawer */}
                    <Drawer
                        title="Filters"
                        placement="left"
                        onClose={() => setShowFilters(false)}
                        open={showFilters}
                        className="lg:hidden"
                    >
                        <FilterContent />
                    </Drawer>

                    {/* Products Grid */}
                    <div className="flex-1 w-full">
                        <div className="bg-white p-3 sm:p-4 rounded-lg shadow-sm border border-gray-200 mb-4 sm:mb-6">
                            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-4">
                                <span className="text-sm sm:text-base text-gray-700 font-medium">Sort by:</span>
                                <Select
                                    value={sortBy}
                                    onChange={setSortBy}
                                    className="w-full sm:w-auto"
                                    style={{ minWidth: '200px' }}
                                    size="large"
                                >
                                    <Option value="featured">Featured</Option>
                                    <Option value="price-low">Price: Low to High</Option>
                                    <Option value="price-high">Price: High to Low</Option>
                                    <Option value="rating">Highest Rated</Option>
                                </Select>
                            </div>
                        </div>

                        {isLoading ? (
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                                {[...Array(6)].map((_, index) => (
                                    <ProductCard
                                        key={index}
                                        product={{} as any}
                                        loading={true}
                                    />
                                ))}
                            </div>
                        ) : data.length > 0 ? (
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                                {data.map((product: any) => (
                                    <ProductCard key={product.id} product={product} loading={false} />
                                ))}
                            </div>
                        ) : (
                            <div className="text-center py-12">
                                <p className="text-gray-500">No products found</p>
                            </div>
                        )}



                        {/* {filteredProducts.length > 0 ? (
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                                {data.map((product: any) => (
                                    <ProductCard key={product.id} product={product} loading = {isLoading} />
                                ))}
                            </div>
                        ) : (
                            <div className="bg-white p-8 sm:p-12 rounded-lg shadow-sm border border-gray-200 text-center">
                                <p className="text-gray-600 text-base sm:text-lg">
                                    No products found matching your filters.
                                </p>
                                <Button
                                    type="primary"
                                    className="mt-4"
                                    onClick={() => {
                                        setPriceRange([0, 500]);
                                        setSelectedCategories([]);
                                    }}
                                >
                                    Clear Filters
                                </Button>
                            </div>
                        )} */}
                    </div>
                </div>
            </div>

            <Footer />
        </div>
    );
}