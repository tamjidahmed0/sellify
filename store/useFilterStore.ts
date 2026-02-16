import { create } from 'zustand';

interface FilterState {
    selectedCategories: string[];
    priceRange: [number, number];
    // sortBy: string;

    setCategories: (c: string[]) => void;
    setPriceRange: (p: [number, number]) => void;
    // setSortBy: (s: string) => void;
    clearFilters: () => void;
}

export const useFilterStore = create<FilterState>((set) => ({
    selectedCategories: [],
    priceRange: [0, 500],
    // sortBy: 'featured',

    setCategories: (c) => set({ selectedCategories: c }),
    setPriceRange: (p) => set({ priceRange: p }),
    // setSortBy: (s) => set({ sortBy: s }),

    clearFilters: () =>
        set({
            selectedCategories: [],
            priceRange: [0, 500],
            // sortBy: 'featured',
        }),
}));
