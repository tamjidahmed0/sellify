'use client';

import { Select, Input } from 'antd';
import { Search } from 'lucide-react';

const { Search: AntSearch } = Input;

type SortOption = 'newest' | 'oldest' | 'highest' | 'lowest';

interface ReviewFiltersProps {
    search: string;
    sortBy: SortOption;
    onSearchChange: (value: string) => void;
    onSortChange: (value: SortOption) => void;
}

export default function ReviewFilters({
    search,
    sortBy,
    onSearchChange,
    onSortChange,
}: ReviewFiltersProps) {
    return (
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4 mb-4">
            <div className="flex flex-col sm:flex-row gap-3">
                <AntSearch
                    placeholder="Search by product or review title..."
                    value={search}
                    onChange={(e) => onSearchChange(e.target.value)}
                    prefix={<Search className="h-4 w-4 text-gray-400" />}
                    className="flex-1"
                    allowClear
                />
                <Select
                    value={sortBy}
                    onChange={onSortChange}
                    className="w-full sm:w-48"
                    options={[
                        { value: 'newest', label: 'Newest First' },
                        { value: 'oldest', label: 'Oldest First' },
                        { value: 'highest', label: 'Highest Rating' },
                        { value: 'lowest', label: 'Lowest Rating' },
                    ]}
                />
            </div>
        </div>
    );
}