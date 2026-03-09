import { Input, Select } from 'antd';
import { Search } from 'lucide-react';

const { Search: AntSearch } = Input;

type SortBy = 'newest' | 'oldest' | 'total';

interface OrderFiltersProps {
    search: string;
    sortBy: SortBy;
    onSearchChange: (value: string) => void;
    onSortChange: (value: SortBy) => void;
}

export default function OrderFilters({
    search,
    sortBy,
    onSearchChange,
    onSortChange,
}: OrderFiltersProps) {
    return (
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4 mb-4">
            <div className="flex flex-col sm:flex-row gap-3">
                <AntSearch
                    placeholder="Search by order ID or product..."
                    value={search}
                    onChange={(e) => onSearchChange(e.target.value)}
                    prefix={<Search className="h-4 w-4 text-gray-400" />}
                    className="flex-1"
                    allowClear
                />
                <Select
                    value={sortBy}
                    onChange={onSortChange}
                    className="w-full sm:w-44"
                    options={[
                        { value: 'newest', label: 'Newest First' },
                        { value: 'oldest', label: 'Oldest First' },
                        { value: 'total', label: 'Highest Total' },
                    ]}
                />
            </div>
        </div>
    );
}