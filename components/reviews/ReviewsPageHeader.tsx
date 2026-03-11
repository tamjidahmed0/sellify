'use client';

import Link from 'next/link';
import { Star, ChevronRight } from 'lucide-react';

export default function ReviewsPageHeader() {
    return (
        <div className="mb-6">
            <div className="flex items-center gap-2 text-sm text-gray-400 mb-2">
                <Link href="/" className="hover:text-blue-600 transition-colors">
                    Home
                </Link>
                <ChevronRight className="h-3.5 w-3.5" />
                <Link href="/orders" className="hover:text-blue-600 transition-colors">
                    My Orders
                </Link>
                <ChevronRight className="h-3.5 w-3.5" />
                <span className="text-gray-600 font-medium">My Reviews</span>
            </div>
            <div className="flex items-center gap-3">
                <div className="p-2.5 bg-amber-500 rounded-xl">
                    <Star className="h-5 w-5 text-white" />
                </div>
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">My Reviews</h1>
                    <p className="text-sm text-gray-400">Manage your product reviews</p>
                </div>
            </div>
        </div>
    );
}