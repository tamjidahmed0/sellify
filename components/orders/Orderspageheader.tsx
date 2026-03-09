import Link from 'next/link';
import { Package, ChevronRight } from 'lucide-react';

export default function OrdersPageHeader() {
    return (
        <div className="mb-6">
            {/* Breadcrumb */}
            <div className="flex items-center gap-2 text-sm text-gray-400 mb-2">
                <Link href="/" className="hover:text-blue-600 transition-colors">
                    Home
                </Link>
                <ChevronRight className="h-3.5 w-3.5" />
                <span className="text-gray-600 font-medium">My Orders</span>
            </div>

            {/* Title */}
            <div className="flex items-center gap-3">
                <div className="p-2.5 bg-blue-600 rounded-xl">
                    <Package className="h-5 w-5 text-white" />
                </div>
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">My Orders</h1>
                    <p className="text-sm text-gray-400">Track and manage your orders</p>
                </div>
            </div>
        </div>
    );
}