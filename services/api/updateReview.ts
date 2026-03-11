import getCookie from "@/lib/getCookie";

export async function updateReview({ id, rating, comment }: { id: string, rating: number, comment?: string }) {
    const token = getCookie("token");
    if (!token) throw new Error("No token found");
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/review/${id}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
            rating,
            comment
        }),
    });

    const data = await res.json();

    if (!res.ok) {
        const errorMessage = data?.message || 'Failed';
        throw new Error(errorMessage);
    }

    return data;
}
