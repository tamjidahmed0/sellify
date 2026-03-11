
export type Rating = 0 | 1 | 2 | 3 | 4 | 5;

type Image = {
    id: string;
    url: string;
    productId: string;
};

export interface Product {
    id: string;
    name: string;
    image: string;
    slug: string;
    images: Image[];
}

export interface Review {
    id: string;
    productId: string;
    userId: string;
    rating: Rating;
    comment: string;
    createdAt: string;
    product: Product;
}

export interface PaginationMeta {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
}

export interface ReviewResponse {
    data: Review[];
    meta: PaginationMeta;
}