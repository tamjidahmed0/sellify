'use client';

import { Package, MapPin, Clock, ChevronDown, ChevronUp, Star, Truck, CheckCircle, XCircle, Loader2, LucideIcon } from 'lucide-react';
import { useState } from 'react';
import { ApiOrder, ApiOrderItem, OrderStatus } from '@/components/orders/types/Order.types';

// ─── Status Config (UPPERCASE — matches backend) ──────────────────────────────

const STATUS_CONFIG: Record<
    OrderStatus,
    { label: string; bgClass: string; textClass: string; borderClass: string; dot: string; Icon: LucideIcon }
> = {
    PENDING: {
        label: 'Pending',
        bgClass: 'bg-yellow-50',
        textClass: 'text-yellow-700',
        borderClass: 'border-yellow-200',
        dot: 'bg-yellow-400',
        Icon: Clock,
    },
    PROCESSING: {
        label: 'Processing',
        bgClass: 'bg-blue-50',
        textClass: 'text-blue-700',
        borderClass: 'border-blue-200',
        dot: 'bg-blue-400',
        Icon: Loader2,
    },
    SHIPPED: {
        label: 'Shipped',
        bgClass: 'bg-purple-50',
        textClass: 'text-purple-700',
        borderClass: 'border-purple-200',
        dot: 'bg-purple-400',
        Icon: Truck,
    },
    DELIVERED: {
        label: 'Delivered',
        bgClass: 'bg-green-50',
        textClass: 'text-green-700',
        borderClass: 'border-green-200',
        dot: 'bg-green-400',
        Icon: CheckCircle,
    },
    CANCELLED: {
        label: 'Cancelled',
        bgClass: 'bg-red-50',
        textClass: 'text-red-700',
        borderClass: 'border-red-200',
        dot: 'bg-red-400',
        Icon: XCircle,
    },
};

// ─── Props ────────────────────────────────────────────────────────────────────

interface OrderCardProps {
    order: ApiOrder;
    onWriteReview: (item: ApiOrderItem) => void;
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

function formatDate(iso: string) {
    return new Date(iso).toLocaleDateString('en-GB', {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
    });
}

function formatPrice(value: string | number) {
    return '৳' + parseFloat(String(value)).toLocaleString();
}

// ─── Component ────────────────────────────────────────────────────────────────

export default function OrderCard({ order, onWriteReview }: OrderCardProps) {
    const cfg = STATUS_CONFIG[order.status] ?? STATUS_CONFIG['PENDING'];
    const StatusIcon = cfg.Icon;
    const [expanded, setExpanded] = useState(false);

    const previewItems = expanded ? order.items : order.items.slice(0, 2);
    const hasMore = order.items.length > 2;

    return (
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow duration-200 overflow-hidden">

            {/* ── Header ── */}
            <div className="flex flex-wrap items-center justify-between gap-3 px-5 py-4 border-b border-gray-50">
                <div className="flex items-center gap-3">
                    <div className="p-2 bg-gray-50 rounded-xl">
                        <Package className="h-4 w-4 text-gray-500" />
                    </div>
                    <div>
                        <p className="text-sm font-semibold text-gray-800">{order.id.slice(0, 8).toUpperCase()}</p>
                        <p className="text-xs text-gray-400 flex items-center gap-1 mt-0.5">
                            <Clock className="h-3 w-3" />
                            {formatDate(order.createdAt)}
                        </p>
                    </div>
                </div>

                {/* Status Badge */}
                <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold border ${cfg.bgClass} ${cfg.textClass} ${cfg.borderClass}`}>
                    <StatusIcon className="h-3.5 w-3.5" />
                    {cfg.label}
                </span>
            </div>

            {/* ── Items ── */}
            <div className="px-5 py-4 space-y-3">
                {previewItems.map((item) => (
                    <div key={item.id} className="flex items-center gap-3">
                        <img
                            src={item.product.image ?? '/placeholder.png'}
                            alt={item.product.name}
                            className="w-14 h-14 rounded-xl object-cover border border-gray-100 shrink-0"
                        />
                        <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium text-gray-800 truncate">
                                {item.product.name}
                            </p>
                            <p className="text-xs text-gray-400 mt-0.5">
                                Qty: {item.quantity} · {formatPrice(item.price)}
                            </p>
                        </div>

                        {/* Write Review — only for delivered orders */}
                        {order.status === 'DELIVERED' && (
                            <button
                                onClick={() => onWriteReview(item)}
                                className="flex items-center gap-1 text-xs font-medium text-amber-600 hover:text-amber-700 bg-amber-50 hover:bg-amber-100 px-2.5 py-1.5 rounded-lg transition-colors shrink-0"
                            >
                                <Star className="h-3.5 w-3.5" />
                                Review
                            </button>
                        )}
                    </div>
                ))}

                {/* Show more/less toggle */}
                {hasMore && (
                    <button
                        onClick={() => setExpanded(!expanded)}
                        className="flex items-center gap-1 text-xs text-blue-600 hover:text-blue-700 font-medium mt-1"
                    >
                        {expanded ? (
                            <><ChevronUp className="h-3.5 w-3.5" /> Show less</>
                        ) : (
                            <><ChevronDown className="h-3.5 w-3.5" /> +{order.items.length - 2} more items</>
                        )}
                    </button>
                )}
            </div>

            {/* ── Footer ── */}
            <div className="flex flex-wrap items-center justify-between gap-3 px-5 py-3 bg-gray-50 border-t border-gray-100">
                <div className="flex items-center gap-4">
                    <p className="text-sm text-gray-500">
                        Total:{' '}
                        <span className="font-bold text-gray-800">
                            {formatPrice(order.totalPrice)}
                        </span>
                    </p>
                    {order.trackingNumber && (
                        <p className="text-xs text-gray-400 flex items-center gap-1">
                            <MapPin className="h-3 w-3" />
                            {order.trackingNumber}
                        </p>
                    )}
                </div>
                <p className="text-xs text-gray-400">
                    {order.items.length} item{order.items.length > 1 ? 's' : ''}
                </p>
            </div>
        </div>
    );
}