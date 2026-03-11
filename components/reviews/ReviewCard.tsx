'use client';

import Link from 'next/link';
import { Rate } from 'antd';
import { Package, Pencil, Trash2 } from 'lucide-react';
import { Review } from './types/review.Types';
import { ratingColor, formatDate } from './utils/reviewUtils';

interface ReviewCardProps {
    review: Review;
    onEdit: (review: Review) => void;
    onDelete: (id: string) => void;
}

export default function ReviewCard({ review, onEdit, onDelete }: ReviewCardProps) {

    return (
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow duration-200 overflow-hidden">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 px-5 py-4 border-b border-gray-100 bg-gray-50/60">
                <div className="flex items-center gap-3">
                    <img
                        src={review.product.image}
                        alt={review.product.name}
                        className="w-11 h-11 rounded-xl object-cover border border-gray-100 shrink-0"
                    />
                    <div className="min-w-0">
                        <Link
                            href={`/products/${review.product.slug}`}
                            className="text-sm font-semibold text-gray-800 hover:text-blue-600 transition-colors truncate block"
                        >
                            {review.product.name}
                        </Link>
                        <div className="flex items-center gap-2 mt-0.5">
                            <Package className="h-3 w-3 text-gray-400" />
                            <span className="text-xs text-gray-400">{review.id}</span>
                        </div>
                    </div>
                </div>

                <span
                    className={`inline-flex items-center text-xs font-semibold px-3 py-1 rounded-full border self-start sm:self-auto shrink-0 text-emerald-600 bg-emerald-50 border-emerald-200`}
                >
                    published
                </span>
            </div>

            {/* Body */}
            <div className="px-5 py-4">
                <div className="flex flex-wrap items-center gap-3 mb-3">
                    <Rate disabled value={review.rating} className="text-base" />
                    <span className={`text-sm font-bold ${ratingColor(review.rating)}`}>
                        {review.rating}.0
                    </span>
                    <span className="text-xs text-gray-400 ml-auto">
                        {formatDate(review.createdAt)}
                    </span>
                </div>

                {/* <p className="text-sm font-semibold text-gray-800 mb-1">{review.product.name}</p> */}
                <p className="text-sm text-gray-500 leading-relaxed">{review.comment}</p>

                {review.product.images && review.product.images.length > 0 && (
                    <div className="flex gap-2 mt-3">
                        {review?.product.images.map((img, i) => (

                            <img
                                key={i}
                                src={img?.url}
                                alt={`review-img-${i}`}
                                className="w-16 h-16 rounded-xl object-cover border border-gray-100 cursor-pointer hover:opacity-90 transition-opacity"
                            />
                        ))}
                    </div>
                )}
            </div>

            {/* Footer */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 px-5 py-3 border-t border-gray-100 bg-gray-50/40">


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