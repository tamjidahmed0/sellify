'use client';

import { useState } from 'react';
import { Breadcrumb, Drawer } from 'antd';
import { Home } from 'lucide-react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import ProductCard from '@/components/products/ProductCard';
import useProducts from '@/hooks/useProducts';
import useCategories from '@/hooks/useCategories';
import FilterContent from '@/components/ui/Filter';
import FilterSkeleton from '@/components/ui/FilterSkeleton';
import { useFilterStore } from '@/store/useFilterStore';
import { useSearchParams } from 'next/navigation';



export default function ProductsPage() {


    const searchParams = useSearchParams()
    const categoryFromQuery = searchParams.get('category');
    const searchFromQueryRaw = searchParams.get('search');
    const searchFromQuery = searchFromQueryRaw === null ? undefined : searchFromQueryRaw;
    const [showFilters, setShowFilters] = useState(false);
    const selectedCategories = useFilterStore((s) => s.selectedCategories);
    const priceRange = useFilterStore((s) => s.priceRange);



    const effectiveCategories = categoryFromQuery
        ? [categoryFromQuery]
        : selectedCategories;

    const { data, isLoading } = useProducts(0, 20, effectiveCategories, priceRange, searchFromQuery);
    const { data: categories, isLoading: categoryLoading } = useCategories();




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

                    </div>

                </div>

                <div className="flex flex-col lg:flex-row gap-6 lg:gap-8">

                    {/* Desktop Filters Sidebar */}
                    {categoryLoading ? (
                        <FilterSkeleton />
                    ) :

                        (
                            <aside className="hidden lg:block lg:w-64">
                                <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 sticky top-20 lg:top-24">
                                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Filters</h3>
                                    <FilterContent data={categories} />
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
                        <FilterContent data={categories} />
                    </Drawer>

                    {/* Products Grid */}
                    <div className="flex-1 w-full">

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
                        ) : data?.length > 0 ? (
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                                {data?.map((product: any) => (
                                    <ProductCard key={product.id} product={product} loading={false} />
                                ))}
                            </div>
                        ) : (
                            <div className="text-center py-12">
                                <p className="text-gray-500">No products found</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            <Footer />
        </div>
    );
}