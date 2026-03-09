'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Empty, Tabs, Select, Rate, Modal, Input, Form } from 'antd';
import {
    Star,
    ChevronRight,
    MessageSquare,
    Pencil,
    Trash2,
    Search,
    ThumbsUp,
    Package,
} from 'lucide-react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

const { Search: AntSearch } = Input;
const { TextArea } = Input;

// ─── Types ───────────────────────────────────────────────────────────────────

type ReviewStatus = 'published' | 'pending' | 'rejected';

interface Review {
    id: string;
    productId: string;
    productName: string;
    productImage: string;
    orderId: string;
    rating: number;
    title: string;
    body: string;
    date: string;
    status: ReviewStatus;
    helpful: number;
    images?: string[];
}

// ─── Mock Data ────────────────────────────────────────────────────────────────

const MOCK_REVIEWS: Review[] = [
    {
        id: 'rv-001',
        productId: 'p1',
        productName: 'Wireless Noise-Cancelling Headphones',
        productImage:
            'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=80&h=80&fit=crop',
        orderId: 'ORD-10041',
        rating: 5,
        title: 'Absolutely love these headphones!',
        body: 'The noise cancellation is incredible. I use them daily for work calls and music. Battery life is also great — lasts me 2 full days without charging.',
        date: '2025-02-20',
        status: 'published',
        helpful: 14,
        images: [
            'https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?w=120&h=120&fit=crop',
            'https://images.unsplash.com/photo-1546435770-a3e426bf472b?w=120&h=120&fit=crop',
        ],
    },
    {
        id: 'rv-002',
        productId: 'p2',
        productName: 'USB-C Fast Charging Cable (2m)',
        productImage:
            'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=80&h=80&fit=crop',
        orderId: 'ORD-10041',
        rating: 4,
        title: 'Good cable, charges fast',
        body: 'Does exactly what it says. Charges my laptop and phone quickly. The braided design feels durable. Only minor complaint is the plug is a bit stiff.',
        date: '2025-02-21',
        status: 'published',
        helpful: 3,
    },
    {
        id: 'rv-003',
        productId: 'p3',
        productName: 'Mechanical Keyboard TKL RGB',
        productImage:
            'https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=80&h=80&fit=crop',
        orderId: 'ORD-10038',
        rating: 3,
        title: 'Decent but RGB software is buggy',
        body: 'The typing feel is satisfying and the build quality is solid. However the companion app for RGB control crashes frequently on Windows 11.',
        date: '2025-02-16',
        status: 'pending',
        helpful: 0,
    },
    {
        id: 'rv-004',
        productId: 'p6',
        productName: 'Ergonomic Mouse Pad XL',
        productImage:
            'https://images.unsplash.com/photo-1527814050087-3793815479db?w=80&h=80&fit=crop',
        orderId: 'ORD-10019',
        rating: 2,
        title: 'Edges started peeling after 2 weeks',
        body: 'The surface is smooth and tracking is good but the stitched edges began unraveling very quickly. Not great for the price.',
        date: '2025-01-22',
        status: 'rejected',
        helpful: 1,
    },
];

// ─── Status Config ────────────────────────────────────────────────────────────

const STATUS_CONFIG: Record<
    ReviewStatus,
    { label: string; color: string }
> = {
    published: {
        label: 'Published',
        color: 'text-emerald-600 bg-emerald-50 border-emerald-200',
    },
    pending: {
        label: 'Under Review',
        color: 'text-amber-600 bg-amber-50 border-amber-200',
    },
    rejected: {
        label: 'Rejected',
        color: 'text-red-500 bg-red-50 border-red-200',
    },
};

// ─── Star color helper ────────────────────────────────────────────────────────

function ratingColor(rating: number) {
    if (rating >= 4) return 'text-emerald-600';
    if (rating === 3) return 'text-amber-500';
    return 'text-red-500';
}

// ─── Edit Modal ───────────────────────────────────────────────────────────────

function EditReviewModal({
    review,
    open,
    onClose,
}: {
    review: Review | null;
    open: boolean;
    onClose: () => void;
}) {
    const [form] = Form.useForm();

    if (!review) return null;

    const handleSave = () => {
        form.validateFields().then((values) => {
            console.log('Updated review:', values);
            onClose();
        });
    };

    return (
        <Modal
            open={open}
            onCancel={onClose}
            onOk={handleSave}
            okText="Save Changes"
            okButtonProps={{ className: 'bg-blue-600' }}
            title={
                <div className="flex items-center gap-2">
                    <Pencil className="h-4 w-4 text-blue-600" />
                    <span>Edit Review</span>
                </div>
            }
        >
            <div className="flex items-center gap-3 py-3 mb-2 border-b border-gray-100">
                <img
                    src={review.productImage}
                    alt={review.productName}
                    className="w-12 h-12 rounded-xl object-cover border border-gray-100"
                />
                <div>
                    <p className="text-sm font-semibold text-gray-800">{review.productName}</p>
                    <p className="text-xs text-gray-400">{review.orderId}</p>
                </div>
            </div>

            <Form
                form={form}
                layout="vertical"
                initialValues={{
                    rating: review.rating,
                    title: review.title,
                    body: review.body,
                }}
            >
                <Form.Item label="Your Rating" name="rating" rules={[{ required: true }]}>
                    <Rate allowHalf />
                </Form.Item>
                <Form.Item
                    label="Review Title"
                    name="title"
                    rules={[{ required: true, message: 'Please add a title' }]}
                >
                    <Input placeholder="Summarize your experience" />
                </Form.Item>
                <Form.Item
                    label="Review Details"
                    name="body"
                    rules={[{ required: true, message: 'Please write your review' }]}
                >
                    <TextArea rows={4} placeholder="Tell others what you think..." />
                </Form.Item>
            </Form>
        </Modal>
    );
}

// ─── Review Card ──────────────────────────────────────────────────────────────

function ReviewCard({
    review,
    onEdit,
    onDelete,
}: {
    review: Review;
    onEdit: (r: Review) => void;
    onDelete: (id: string) => void;
}) {
    const cfg = STATUS_CONFIG[review.status];

    return (
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow duration-200 overflow-hidden">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 px-5 py-4 border-b border-gray-100 bg-gray-50/60">
                <div className="flex items-center gap-3">
                    <img
                        src={review.productImage}
                        alt={review.productName}
                        className="w-11 h-11 rounded-xl object-cover border border-gray-100 shrink-0"
                    />
                    <div className="min-w-0">
                        <Link
                            href={`/products/${review.productId}`}
                            className="text-sm font-semibold text-gray-800 hover:text-blue-600 transition-colors truncate block"
                        >
                            {review.productName}
                        </Link>
                        <div className="flex items-center gap-2 mt-0.5">
                            <Package className="h-3 w-3 text-gray-400" />
                            <span className="text-xs text-gray-400">{review.orderId}</span>
                        </div>
                    </div>
                </div>

                <span
                    className={`inline-flex items-center text-xs font-semibold px-3 py-1 rounded-full border self-start sm:self-auto shrink-0 ${cfg.color}`}
                >
                    {cfg.label}
                </span>
            </div>

            {/* Body */}
            <div className="px-5 py-4">
                {/* Rating row */}
                <div className="flex flex-wrap items-center gap-3 mb-3">
                    <Rate disabled value={review.rating} className="text-base" />
                    <span className={`text-sm font-bold ${ratingColor(review.rating)}`}>
                        {review.rating}.0
                    </span>
                    <span className="text-xs text-gray-400 ml-auto">
                        {new Date(review.date).toLocaleDateString('en-GB', {
                            day: '2-digit',
                            month: 'short',
                            year: 'numeric',
                        })}
                    </span>
                </div>

                <p className="text-sm font-semibold text-gray-800 mb-1">{review.title}</p>
                <p className="text-sm text-gray-500 leading-relaxed">{review.body}</p>

                {/* Review images */}
                {review.images && review.images.length > 0 && (
                    <div className="flex gap-2 mt-3">
                        {review.images.map((img, i) => (
                            <img
                                key={i}
                                src={img}
                                alt={`review-img-${i}`}
                                className="w-16 h-16 rounded-xl object-cover border border-gray-100 cursor-pointer hover:opacity-90 transition-opacity"
                            />
                        ))}
                    </div>
                )}
            </div>

            {/* Footer */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 px-5 py-3 border-t border-gray-100 bg-gray-50/40">
                <div className="flex items-center gap-1.5 text-xs text-gray-400">
                    <ThumbsUp className="h-3.5 w-3.5" />
                    <span>
                        <span className="font-semibold text-gray-600">{review.helpful}</span>{' '}
                        people found this helpful
                    </span>
                </div>

                <div className="flex items-center gap-2">
                    <button
                        onClick={() => onEdit(review)}
                        className="inline-flex items-center gap-1.5 text-xs font-medium text-blue-600 bg-blue-50 hover:bg-blue-100 border border-blue-200 rounded-lg px-3 py-1.5 transition-colors"
                    >
                        <Pencil className="h-3.5 w-3.5" />
                        Edit
                    </button>
                    <button
                        onClick={() => onDelete(review.id)}
                        className="inline-flex items-center gap-1.5 text-xs font-medium text-red-500 bg-red-50 hover:bg-red-100 border border-red-200 rounded-lg px-3 py-1.5 transition-colors"
                    >
                        <Trash2 className="h-3.5 w-3.5" />
                        Delete
                    </button>
                </div>
            </div>
        </div>
    );
}

// ─── Main Page ────────────────────────────────────────────────────────────────

export default function MyReviewsPage() {
    const [reviews, setReviews] = useState<Review[]>(MOCK_REVIEWS);
    const [search, setSearch] = useState('');
    const [sortBy, setSortBy] = useState<'newest' | 'oldest' | 'highest' | 'lowest'>('newest');
    const [activeTab, setActiveTab] = useState('all');
    const [editingReview, setEditingReview] = useState<Review | null>(null);
    const [editModalOpen, setEditModalOpen] = useState(false);

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
            onOk: () => setReviews((prev) => prev.filter((r) => r.id !== id)),
        });
    };

    const tabCounts = {
        all: reviews.length,
        published: reviews.filter((r) => r.status === 'published').length,
        pending: reviews.filter((r) => r.status === 'pending').length,
        rejected: reviews.filter((r) => r.status === 'rejected').length,
    };

    const avgRating =
        reviews.length > 0
            ? (reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length).toFixed(1)
            : '0';

    const filtered = reviews
        .filter((r) => activeTab === 'all' || r.status === activeTab)
        .filter(
            (r) =>
                r.productName.toLowerCase().includes(search.toLowerCase()) ||
                r.title.toLowerCase().includes(search.toLowerCase())
        )
        .sort((a, b) => {
            if (sortBy === 'newest') return new Date(b.date).getTime() - new Date(a.date).getTime();
            if (sortBy === 'oldest') return new Date(a.date).getTime() - new Date(b.date).getTime();
            if (sortBy === 'highest') return b.rating - a.rating;
            return a.rating - b.rating;
        });

    const tabItems = [
        { key: 'all', label: `All (${tabCounts.all})` },
        { key: 'published', label: `Published (${tabCounts.published})` },
        { key: 'pending', label: `Under Review (${tabCounts.pending})` },
        { key: 'rejected', label: `Rejected (${tabCounts.rejected})` },
    ];

    return (
        <div className="min-h-screen bg-gray-50">
            <Header />
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

                {/* Breadcrumb + Title */}
                <div className="mb-6">
                    <div className="flex items-center gap-2 text-sm text-gray-400 mb-2">
                        <Link href="/" className="hover:text-blue-600 transition-colors">Home</Link>
                        <ChevronRight className="h-3.5 w-3.5" />
                        <Link href="/orders" className="hover:text-blue-600 transition-colors">My Orders</Link>
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



                {/* Filters */}
                <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4 mb-4">
                    <div className="flex flex-col sm:flex-row gap-3">
                        <AntSearch
                            placeholder="Search by product or review title..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            prefix={<Search className="h-4 w-4 text-gray-400" />}
                            className="flex-1"
                            allowClear
                        />
                        <Select
                            value={sortBy}
                            onChange={setSortBy}
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

                {/* Tabs */}
                <div className="bg-white rounded-2xl border border-gray-100 shadow-sm mb-4 overflow-x-auto">
                    <Tabs
                        activeKey={activeTab}
                        onChange={setActiveTab}
                        items={tabItems}
                        className="px-4"
                        tabBarStyle={{ marginBottom: 0 }}
                    />
                </div>

                {/* Reviews List */}
                {filtered.length === 0 ? (
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
                        {filtered.map((review) => (
                            <ReviewCard
                                key={review.id}
                                review={review}
                                onEdit={handleEdit}
                                onDelete={handleDelete}
                            />
                        ))}
                    </div>
                )}

                {/* Helpful note for rejected */}
                {activeTab === 'rejected' && tabCounts.rejected > 0 && (
                    <div className="mt-4 flex items-start gap-3 bg-red-50 border border-red-100 rounded-2xl px-5 py-4">
                        <MessageSquare className="h-4 w-4 text-red-400 mt-0.5 shrink-0" />
                        <p className="text-xs text-red-500 leading-relaxed">
                            Rejected reviews did not meet our community guidelines. You can edit and
                            resubmit them for review.
                        </p>
                    </div>
                )}
            </div>

            {/* Edit Modal */}
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