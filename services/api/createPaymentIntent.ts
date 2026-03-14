import getCookie from "@/lib/getCookie";

const createPaymentIntent = async () => {
    const token = getCookie('token')
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/stripe/create-payment-intent`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
    });
    const data = await res.json()
    return data
};

export default createPaymentIntent