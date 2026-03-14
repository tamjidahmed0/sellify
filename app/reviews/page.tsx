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
import isCookieAvailable from '@/lib/isCookieAvailable';
import AuthModal from '@/components/ui/AuthModal';
import { Star } from 'lucide-react';

type SortOption = 'newest' | 'oldest' | 'highest' | 'lowest';

export default function MyReviewsPage() {
    const [search, setSearch] = useState('');
    const [sortBy, setSortBy] = useState<SortOption>('newest');
    const [editingReview, setEditingReview] = useState<Review | null>(null);
    const [editModalOpen, setEditModalOpen] = useState(false);
    const [authModalOpen, setAuthModalOpen] = useState(false);

    const isTokenAvailable = isCookieAvailable('token');

    const { data, isLoading } = useGetReview();
    const { mutate: deleteReview } = useDeleteReview();

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
                deleteReview(id);
            },
        });
    };

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

                {!isTokenAvailable ? (
                    <div className="flex flex-col items-center justify-center py-24 bg-white rounded-2xl border border-gray-100 shadow-sm">
                        <div className="bg-yellow-50 p-5 rounded-full mb-5">
                            <Star className="h-10 w-10 text-yellow-400" />
                        </div>
                        <h2 className="text-xl font-semibold text-gray-800 mb-2">
                            Sign in to view your reviews
                        </h2>
                        <p className="text-sm text-gray-400 mb-6">
                            You need to be signed in to see your review history.
                        </p>
                        <button
                            onClick={() => setAuthModalOpen(true)}
                            className="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-lg transition-colors"
                        >
                            Sign In
                        </button>
                    </div>
                ) : (
                    <>
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
                            onChange={() => { }}
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
                    </>
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

            <AuthModal open={authModalOpen} onClose={() => setAuthModalOpen(false)} />

            <Footer />
        </div>
    );
}