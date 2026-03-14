import { useQuery } from '@tanstack/react-query';
import fetchSuggestions from '@/services/api/fetchSuggestions';


export const useProductSuggestions = (q: string) => {
  return useQuery({
    queryKey: ['suggestions', q],
    queryFn: () => fetchSuggestions(q),
    enabled: q.length >= 1,
    staleTime: 1000 * 30,
    placeholderData: [],
  });
};