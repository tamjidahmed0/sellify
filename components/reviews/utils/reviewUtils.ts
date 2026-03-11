export function ratingColor(rating: number): string {
    if (rating >= 4) return 'text-emerald-600';
    if (rating === 3) return 'text-amber-500';
    return 'text-red-500';
}

export function formatDate(dateStr: string): string {
    return new Date(dateStr).toLocaleDateString('en-GB', {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
    });
}