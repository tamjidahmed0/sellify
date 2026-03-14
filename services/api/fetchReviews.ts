const fetchReviews = async (slug: string, page: number, limit: number) => {
    const res = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/review/public/${slug}?page=${page}&limit=${limit}`
    );
    if (!res.ok) throw new Error('Failed to fetch reviews');
    return res.json();
};

export default fetchReviews