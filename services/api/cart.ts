

const cart = async () => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/cart`);
    if (!res.ok) throw new Error("Fetch failed");
    return res.json();
}

export default cart