import { CreateReviewDto } from "@/components/orders/types/review.type";
import getCookie from "@/lib/getCookie";

const createReview = async ({ productId, comment, rating }: CreateReviewDto) => {
    const token = getCookie("token");
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/review`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
        credentials: "include",
        body: JSON.stringify({
            productId,
            comment,
            rating
        }),
    });

    const data = await res.json(); 

    if (!res.ok) {
        throw new Error(data?.message ?? 'Something went wrong'); 
    }

    return data;
};

export default createReview;