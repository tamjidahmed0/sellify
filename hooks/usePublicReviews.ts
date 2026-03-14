import { useQuery } from '@tanstack/react-query';
import fetchReviews from '@/services/api/fetchReviews';


export const usePublicReviews = (slug: string, page: number = 1, limit: number = 10) => {
    return useQuery({
        queryKey: ['reviews', slug, page],
        queryFn: () => fetchReviews(slug, page, limit),
        enabled: !!slug,
    });
};