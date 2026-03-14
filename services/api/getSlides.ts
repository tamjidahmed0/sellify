
const getSlides = async () => {

    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/slides`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    });
    if (!res.ok) throw new Error("Fetch failed");
    return res.json();
}

export default getSlides