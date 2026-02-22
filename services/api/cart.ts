import getCookie from "@/lib/getCookie";


const cart = async () => {
    const token = getCookie("token");
    if (!token) throw new Error("No token found");
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/cart`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
        },
    });
    if (!res.ok) throw new Error("Fetch failed");
    return res.json();
}

export default cart