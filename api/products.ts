

const products = async (skip: number = 0, take: number = 10) => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/product/?skip=${skip}&take=${take}`);
    if (!res.ok) throw new Error("Fetch failed");
    return res.json();
}

export default products