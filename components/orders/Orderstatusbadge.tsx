import { OrderStatus } from './types/Order.types';

const STATUS_CONFIG: Record<
    OrderStatus,
    { label: string; className: string; dot: string }
> = {
    PENDING: {
        label: 'Pending',
        className: 'bg-yellow-50 text-yellow-700 border border-yellow-200',
        dot: 'bg-yellow-400',
    },
    PROCESSING: {
        label: 'Processing',
        className: 'bg-blue-50 text-blue-700 border border-blue-200',
        dot: 'bg-blue-400',
    },
    SHIPPED: {
        label: 'Shipped',
        className: 'bg-purple-50 text-purple-700 border border-purple-200',
        dot: 'bg-purple-400',
    },
    DELIVERED: {
        label: 'Delivered',
        className: 'bg-green-50 text-green-700 border border-green-200',
        dot: 'bg-green-400',
    },
    CANCELLED: {
        label: 'Cancelled',
        className: 'bg-red-50 text-red-700 border border-red-200',
        dot: 'bg-red-400',
    },
};

interface OrderStatusBadgeProps {
    status: OrderStatus;
}

export default function OrderStatusBadge({ status }: OrderStatusBadgeProps) {
    const config = STATUS_CONFIG[status];

    return (
        <span
            className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold ${config.className}`}
        >
            <span className={`w-1.5 h-1.5 rounded-full ${config.dot}`} />
            {config.label}
        </span>
    );
}