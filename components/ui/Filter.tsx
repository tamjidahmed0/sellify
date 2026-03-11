'use client';
import { useEffect, useState } from 'react';
import { Slider, Checkbox, Button } from 'antd';
import { useFilterStore } from '@/store/useFilterStore';

const FilterContent = ({data} : any) => {
    const [showFilters, setShowFilters] = useState(false);
    // const [priceRange, setPriceRange] = useState<[number, number]>([0, 500]);
    // const { data, isLoading } = useCategories();

    const selectedCategories = useFilterStore((s) => s.selectedCategories);
    const setCategories = useFilterStore((s) => s.setCategories);

    const priceRange = useFilterStore((s) => s.priceRange);
    const setPriceRange = useFilterStore((s) => s.setPriceRange);

    const clearFilters = useFilterStore((s) => s.clearFilters);




    useEffect(() => {
        if (data?.minPrice !== undefined && data?.maxPrice !== undefined) {
            setPriceRange([data.minPrice, data.maxPrice]);
        }
    }, [data]);


 
    return (
        <div className="space-y-6">
            {/* CATEGORY */}
            <div>
                <h4 className="font-medium text-gray-900 mb-3">Category</h4>
                <div className="space-y-2">
                    {data?.categories?.map((category: any) => (
                        <Checkbox
                        className='capitalize'
                            key={category.id}
                            checked={selectedCategories.includes(category.name)}
                            onChange={(e) => {
                                if (e.target.checked) {
                                    setCategories([...selectedCategories, category.name]);
                                } else {
                                    setCategories(
                                        selectedCategories.filter((c) => c !== category.name)
                                    );
                                }
                            }}
                        >
                            {category.name}
                        </Checkbox>
                    ))}
                </div>
            </div>

            {/* PRICE */}
            <div>
                <h4 className="font-medium text-gray-900 mb-3">Price Range</h4>

                <Slider
                    range
                    min={Number(data?.minPrice) ?? 0}
                    max={Number(data?.maxPrice) ?? 500}
                    value={priceRange}
                    onChange={(value) => setPriceRange(value as [number, number])}
                />

                <div className="flex justify-between text-sm text-gray-600">
                    <span>${priceRange[0]}</span>
                    <span>${priceRange[1]}</span>
                </div>
            </div>

            {/* CLEAR */}
            <Button
                block
                onClick={() => {
                    clearFilters();
                    setShowFilters(false);
                }}
            >
                Clear Filters
            </Button>
        </div>
    );
};

export default FilterContent;

