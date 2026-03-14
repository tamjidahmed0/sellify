const fetchSuggestions = async (q: string) => {
    if (!q || q.length < 1) return [];
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/product/suggestions?q=${q}`);
    if (!res.ok) throw new Error('Failed');
    return res.json();
};

export default fetchSuggestions