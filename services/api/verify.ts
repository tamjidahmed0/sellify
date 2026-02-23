const verify = async (token: string) => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/auth/verify`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ token }),
    });

    if (!res.ok) throw new Error("Invalid token");

    return res.json();
};

export default verify;