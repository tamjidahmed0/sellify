

const singleProduct = async (slug: string) => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/product/${slug}`);
    if (!res.ok) throw new Error("Fetch failed");
    return res.json();
}

export default singleProduct