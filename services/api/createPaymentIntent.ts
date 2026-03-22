import type { AddressData } from '@/app/checkout/page';
import getCookie from '@/lib/getCookie';

const API_URL = process.env.NEXT_PUBLIC_BASE_URL;

const createPaymentIntent = async (address: AddressData) => {
    const token = getCookie('token')

    const response = await fetch(`${API_URL}/stripe/create-payment-intent`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            ...(token && { Authorization: `Bearer ${token}` }),
        },

        body: JSON.stringify({ address }),
    });

    if (!response.ok) throw new Error('Failed to create payment intent');

    return response.json() as Promise<{
        clientSecret: string;
        paymentIntentId: string;
    }>;
};

export default createPaymentIntent;