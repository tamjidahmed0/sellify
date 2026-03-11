// ─── Backend API Types (exact match from API response) ───────────────────────

export type OrderStatus =
    | 'PENDING'
    | 'PROCESSING'
    | 'SHIPPED'
    | 'DELIVERED'
    | 'CANCELLED';

export interface ApiOrderProduct {
    id: string;
    name: string;
    image: string | null;
    slug: string;
}

export interface ApiOrderItem {
    id: string;
    orderId: string;
    productId: string;
    quantity: number;
    price: string;
    product: ApiOrderProduct;
    hasReviewed: boolean;
}

export interface ApiOrder {
    id: string;
    userId: string;
    totalPrice: string;
    createdAt: string;
    status: OrderStatus;
    items: ApiOrderItem[];
    trackingNumber?: string;
}

export interface ApiOrdersResponse {
    data: ApiOrder[];
    meta: {
        total: number;
        page: number;
        limit: number;
        totalPages: number;
    };
}

// ─── Review Modal ─────────────────────────────────────────────────────────────

export interface ReviewTarget {
    orderId: string;
    item: ApiOrderItem;
}