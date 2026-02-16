type PriceRange = [number, number];

const products = async (
    skip: number = 0,
    take: number = 20,
    categories: string[] = [],
    priceRange?: PriceRange
) => {
    const params = new URLSearchParams();

    params.append('skip', String(skip));
    params.append('take', String(take));


    categories.forEach((c) => params.append('category', c));

    if (priceRange) {
        params.append('minPrice', String(priceRange[0]));
        params.append('maxPrice', String(priceRange[1]));
    }

    const res = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/product?${params.toString()}`
    );

    if (!res.ok) throw new Error("Fetch failed");

    return res.json();
};

export default products;
