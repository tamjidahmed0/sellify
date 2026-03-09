'use client';

import { useState } from 'react';
import { Empty, Skeleton } from 'antd';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import OrderCard from '@/components/orders/OrderCard';
import OrdersPageHeader from '@/components/orders/Orderspageheader';
import OrderFilters from '@/components/orders/Orderfilters';
import OrderTabs from '@/components/orders/Ordertabs';
import WriteReviewModal from '@/components/orders/Writereviewmodal';
import { ApiOrder, ApiOrderItem, ReviewTarget } from '@/components/orders/types/Order.types'
import useGetOrders from '@/hooks/useGetOrders';

export default function MyOrdersPage() {
    const [search, setSearch]       = useState('');
    const [sortBy, setSortBy]       = useState<'newest' | 'oldest' | 'total'>('newest');
    const [activeTab, setActiveTab] = useState('all');

    const [reviewTarget, setReviewTarget]       = useState<ReviewTarget | null>(null);
    const [reviewModalOpen, setReviewModalOpen] = useState(false);

    const { data, isLoading } = useGetOrders();
    const orders: ApiOrder[] = data?.data ?? [];

    const openReviewModal = (orderId: string, item: ApiOrderItem) => {
        setReviewTarget({ orderId, item });
        setReviewModalOpen(true);
    };

    const filtered = orders
        .filter((o) => activeTab === 'all' || o.status === activeTab)
        .filter(
            (o) =>
                o.id.toLowerCase().includes(search.toLowerCase()) ||
                o.items.some((i) =>
                    i.product.name.toLowerCase().includes(search.toLowerCase())
                )
        )
        .sort((a, b) => {
            if (sortBy === 'newest')
                return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
            if (sortBy === 'oldest')
                return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
            return parseFloat(b.totalPrice) - parseFloat(a.totalPrice);
        });

    return (
        <div className="min-h-screen bg-gray-50">
            <Header />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <OrdersPageHeader />

                <OrderFilters
                    search={search}
                    sortBy={sortBy}
                    onSearchChange={setSearch}
                    onSortChange={setSortBy}
                />

                <OrderTabs
                    orders={orders}
                    activeTab={activeTab}
                    onChange={setActiveTab}
                />

                {isLoading && (
                    <div className="space-y-4">
                        {[1, 2, 3].map((i) => (
                            <div key={i} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
                                <Skeleton active avatar paragraph={{ rows: 2 }} />
                            </div>
                        ))}
                    </div>
                )}

                {!isLoading && filtered.length === 0 && (
                    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm py-16">
                        <Empty
                            image={Empty.PRESENTED_IMAGE_SIMPLE}
                            description={<span className="text-gray-400 text-sm">No orders found</span>}
                        />
                    </div>
                )}

                {!isLoading && filtered.length > 0 && (
                    <div className="space-y-4">
                        {filtered.map((order) => (
                            <OrderCard
                                key={order.id}
                                order={order}
                                onWriteReview={(item) => openReviewModal(order.id, item)}
                            />
                        ))}
                    </div>
                )}
            </div>

            <Footer />

            <WriteReviewModal
                target={reviewTarget}
                open={reviewModalOpen}
                onClose={() => {
                    setReviewModalOpen(false);
                    setReviewTarget(null);
                }}
            />
        </div>
    );
}