// 'use client'
// import { useState } from 'react';
// import { Select, Slider, Checkbox, Button, Breadcrumb, Drawer } from 'antd';
// import { Home, SlidersHorizontal } from 'lucide-react';
// import Header from '@/components/layout/Header';
// import Footer from '@/components/layout/Footer';
// import ProductCard from '@/components/products/ProductCard';
// import { categories, Category } from '@/lib/data/products';
// import useProducts from '@/hooks/products';
// import useCategories from '@/hooks/useCategories';
// import { useFilterStore } from '@/store/useFilterStore';


// const FilterContent = () => {

// //    const [priceRange, setPriceRange] = useState<[number, number]>([0, 500]);
// //     const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
//     const [sortBy, setSortBy] = useState('featured');
//     const [showFilters, setShowFilters] = useState(false);


//     const { data: categories } = useCategories()


//     const selectedCategories = useFilterStore(s => s.selectedCategories);
// const setCategories = useFilterStore(s => s.setCategories);
// const priceRange = useFilterStore(s => s.priceRange);
// const setPriceRange = useFilterStore(s => s.setPriceRange);
// const clearFilters = useFilterStore(s => s.clearFilters);


//     console.log(selectedCategories, 'selected')


//     return (
//         <div className="space-y-6">
//             <div>
//                 <h4 className="font-medium text-gray-900 mb-3">Category</h4>
//                 <div className="space-y-2">
//                     {categories?.map((category: Category) => (
//                         <Checkbox
//                             key={category.id}
//                             checked={selectedCategories.includes(category.name)}
//                             onChange={(e) => {
//                                 if (e.target.checked) {
//                                     setSelectedCategories([
//                                         ...selectedCategories,
//                                         category.name,
//                                     ]);
//                                 } else {
//                                     setSelectedCategories(
//                                         selectedCategories.filter(
//                                             (c) => c !== category.name
//                                         )
//                                     );
//                                 }
//                             }}
//                         >
//                             {category.name}
//                         </Checkbox>
//                     ))}
//                 </div>
//             </div>

//             <div>
//                 <h4 className="font-medium text-gray-900 mb-3">
//                     Price Range
//                 </h4>
//                 <Slider
//                     range
//                     min={0}
//                     max={500}
//                     value={priceRange}
//                     onChange={(value) => setPriceRange(value as [number, number])}
//                     className="mb-2"
//                 />
//                 <div className="flex justify-between text-sm text-gray-600">
//                     <span>${priceRange[0]}</span>
//                     <span>${priceRange[1]}</span>
//                 </div>
//             </div>

//             <Button
//                 block
//                 onClick={() => {
//                     setPriceRange([0, 500]);
//                     setSelectedCategories([]);
//                     setShowFilters(false);
//                 }}
//             >
//                 Clear Filters
//             </Button>
//         </div>
//     )



// };

//     export default FilterContent











'use client';
import { useEffect, useState } from 'react';
import { Slider, Checkbox, Button } from 'antd';
import useCategories from '@/hooks/useCategories';
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

    console.log(data)



    useEffect(() => {
        if (data?.minPrice !== undefined && data?.maxPrice !== undefined) {
            setPriceRange([data.minPrice, data.maxPrice]);
        }
    }, [data]);


    // if (isLoading) return <FilterContent />





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

