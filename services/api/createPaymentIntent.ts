import getCookie from "@/lib/getCookie";

const createPaymentIntent = async () => {
    const token = getCookie('token')
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/stripe/create-payment-intent`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
    });
    // const { clientSecret, paymentIntentId } = await res.json();
    const data = await res.json()
    return data
    // setClientSecret(clientSecret);
    // setPaymentIntentId(paymentIntentId)
};

export default createPaymentIntent