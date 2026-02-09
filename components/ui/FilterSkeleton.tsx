'use client';
import { Skeleton } from 'antd';






const FilterSkeleton = () => {
    return (
        <div className="hidden lg:block lg:w-64">
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 sticky top-20 lg:top-24">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Filters</h3>
                <div className="space-y-6">
                    {/* Category Skeleton */}
                    <div>
                        <Skeleton.Input active size="small" style={{ width: 120, marginBottom: 12 }} />

                        <div className="space-y-3">
                            {Array.from({ length: 6 }).map((_, i) => (
                                <div key={i} className="flex items-center gap-2">
                                    <Skeleton.Avatar active size="small" shape="square" />
                                    <Skeleton.Input active size="small" style={{ width: 120 }} />
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Price Range Skeleton */}
                    <div>
                        <Skeleton.Input active size="small" style={{ width: 140, marginBottom: 16 }} />
                        <Skeleton active paragraph={false} title={{ width: '100%', }} />
                    </div>

                    {/* Button Skeleton */}
                    <Skeleton.Button active block style={{ height: 40 }} />
                </div>
            </div>
        </div>
    )
}

export default FilterSkeleton