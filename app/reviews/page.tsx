'use client';

import { useState } from 'react';
import { Empty, Modal, Spin } from 'antd';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

import { Review } from '@/components/reviews/types/review.Types';
import ReviewsPageHeader from '@/components/reviews/ReviewsPageHeader';
import ReviewFilters from '@/components/reviews/ReviewFilters';
import ReviewTabs from '@/components/reviews/ReviewTabs';
import ReviewCard from '@/components/reviews/ReviewCard';
import EditReviewModal from '@/components/reviews/EditReviewModal';
import useGetReview from '@/hooks/useGetReview';
import useDeleteReview from '@/hooks/useDeleteReview';

type SortOption = 'newest' | 'oldest' | 'highest' | 'lowest';

export default function MyReviewsPage() {
    const [search, setSearch] = useState('');
    const [sortBy, setSortBy] = useState<SortOption>('newest');
    const [editingReview, setEditingReview] = useState<Review | null>(null);
    const [editModalOpen, setEditModalOpen] = useState(false);

    const { data, isLoading } = useGetReview();
    const { mutate: deleteReview, isPending } = useDeleteReview();
 


    // ─── Handlers 
    const handleEdit = (review: Review) => {
        setEditingReview(review);
        setEditModalOpen(true);
    };

    const handleDelete = (id: string) => {
        Modal.confirm({
            title: 'Delete Review',
            content: 'Are you sure you want to delete this review? This action cannot be undone.',
            okText: 'Delete',
            okButtonProps: { danger: true },
            cancelText: 'Cancel',
            onOk: async () => {
                deleteReview(id)
            },
        });
    };

    // ─── Filter + Sort
    const filtered = (data?.data ?? [])
        .filter((r: Review) =>
            r.product.name.toLowerCase().includes(search.toLowerCase()) ||
            r.comment.toLowerCase().includes(search.toLowerCase())
        )
        .sort((a: Review, b: Review) => {
            if (sortBy === 'newest') return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
            if (sortBy === 'oldest') return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
            if (sortBy === 'highest') return b.rating - a.rating;
            return a.rating - b.rating;
        });

    return (
        <div className="min-h-screen bg-gray-50">
            <Header />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <ReviewsPageHeader />

                <ReviewFilters
                    search={search}
                    sortBy={sortBy}
                    onSearchChange={setSearch}
                    onSortChange={setSortBy}
                />

                <ReviewTabs
                    activeTab="all"
                    tabCounts={{ all: data?.data.length ?? 0 }}
                    onChange={() => {}}
                />

                {isLoading ? (
                    <div className="flex justify-center py-16">
                        <Spin size="large" />
                    </div>
                ) : filtered.length === 0 ? (
                    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm py-16">
                        <Empty
                            image={Empty.PRESENTED_IMAGE_SIMPLE}
                            description={
                                <span className="text-gray-400 text-sm">No reviews found</span>
                            }
                        />
                    </div>
                ) : (
                    <div className="space-y-4">
                        {filtered.map((review: Review) => (
                            <ReviewCard
                                key={review.id}
                                review={review}
                                onEdit={handleEdit}
                                onDelete={handleDelete}
                            />
                        ))}
                    </div>
                )}
            </div>

            <EditReviewModal
                review={editingReview}
                open={editModalOpen}
                onClose={() => {
                    setEditModalOpen(false);
                    setEditingReview(null);
                }}
            />

            <Footer />
        </div>
    );
}