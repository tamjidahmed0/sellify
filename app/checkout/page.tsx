'use client';

import { useState } from 'react';
import {
    Card,
    Form,
    Steps,
    Breadcrumb,
} from 'antd';
import {
    Home,
    ShoppingBag,
} from 'lucide-react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import useCart from '@/hooks/useCart';
import OrderSummaryContent from '@/components/checkout/OrderSummary';
import ReviewStep from '@/components/checkout/ReviewStep';
import PaymentStep from '@/components/checkout/PaymentForm';
import ShippingStep from '@/components/checkout/ShippingForm';

type StepKey = 'shipping' | 'payment' | 'review';

export default function CheckoutPage() {
    const [form] = Form.useForm();
    const [currentStep, setCurrentStep] = useState<StepKey>('shipping');
    const [paymentMethod, setPaymentMethod] = useState('card');
    const [agreeTerms, setAgreeTerms] = useState(false);
    const [showOrderSummary, setShowOrderSummary] = useState(false);

    const { data, isLoading } = useCart();






    const subtotal = data?.items.reduce(
        (sum, item) => sum + Number(item.price) * item.quantity,
        0
    ) ?? 0;
    const shipping = 0;
    const tax = subtotal * 0.08;
    const total = subtotal + shipping + tax;

    const steps = [
        { title: 'Shipping', key: 'shipping' },
        { title: 'Payment', key: 'payment' },
        { title: 'Review', key: 'review' },
    ];

    const handleNextStep = () => {
        if (currentStep === 'shipping') {
            setCurrentStep('payment');
        } else if (currentStep === 'payment') {
            setCurrentStep('review');
        }
    };

    const handlePrevStep = () => {
        if (currentStep === 'payment') {
            setCurrentStep('shipping');
        } else if (currentStep === 'review') {
            setCurrentStep('payment');
        }
    };


    return (
        <div className="min-h-screen bg-linear-to-b from-gray-50 to-white">
            <Header />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 md:py-8">
                <Breadcrumb
                    items={[
                        {
                            title: (
                                <a href="/" className="flex items-center">
                                    <Home className="h-4 w-4" />
                                </a>
                            ),
                        },
                        { title: <a href="/cart">Cart</a> },
                        { title: 'Checkout' },
                    ]}
                    className="mb-6 md:mb-8"
                />

                <div className="mb-6 md:mb-8">
                    <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-1 md:mb-2">
                        Checkout
                    </h1>
                    <p className="text-gray-600 text-sm md:text-base">
                        Complete your purchase securely
                    </p>
                </div>

                {/* Mobile: collapsible Order Summary toggle */}
                <div className="lg:hidden mb-4">
                    <button
                        onClick={() => setShowOrderSummary((prev) => !prev)}
                        className="w-full flex items-center justify-between bg-white border border-gray-200 rounded-xl px-4 py-3 shadow-sm"
                    >
                        <div className="flex items-center space-x-2 text-blue-600 font-semibold text-sm">
                            <ShoppingBag className="h-4 w-4" />
                            <span>
                                {showOrderSummary ? 'Hide' : 'Show'} order summary (
                                {data?.items.length} items)
                            </span>
                        </div>
                        <span className="text-lg font-bold text-blue-600">
                            ${total.toFixed(2)}
                        </span>
                    </button>

                    {showOrderSummary && (
                        <Card className="mt-2 rounded-xl border border-gray-200 shadow-sm">
                            {data && (
                                <OrderSummaryContent
                                    data={data}
                                    subtotal={subtotal}
                                    tax={tax}
                                    shipping={shipping}
                                    total={total}
                                />
                            )}

                        </Card>
                    )}
                </div>

                <div className='mb-6 md:mb-8'>
                    <Steps
                        current={steps.findIndex((s) => s.key === currentStep)}
                        items={steps.map((s) => ({ title: s.title }))}
                        size="small"
                        responsive={false}
                    />
                </div>


                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8 items-start">
                    {/* Main Content */}
                    <div className="lg:col-span-2 w-full min-w-0">
                        {/* Shipping Step */}
                        {currentStep === 'shipping' && (
                            <ShippingStep form={form} handleNextStep={handleNextStep} />
                        )}

                        {/* Payment Step */}
                        {currentStep === 'payment' && (
                            <PaymentStep
                                paymentMethod={paymentMethod}
                                setPaymentMethod={setPaymentMethod}
                                handleNextStep={handleNextStep}
                                handlePrevStep={handlePrevStep}
                            />
                        )}

                        {/* Review Step */}
                        {currentStep === 'review' && (
                            <ReviewStep
                                data={data}
                                agreeTerms={agreeTerms}
                                setAgreeTerms={setAgreeTerms}
                                handlePrevStep={handlePrevStep}
                                setCurrentStep={setCurrentStep}
                                paymentMethod={paymentMethod}
                            />

                        )}
                    </div>

                    {/* Sidebar - Order Summary (Desktop only, sticky) */}
                    <div className="hidden lg:block lg:col-span-1">
                        <div className="sticky top-24">
                            <Card className="rounded-xl shadow-sm">
                                {/* <OrderSummaryContent /> */}

                                {data && (
                                    <OrderSummaryContent
                                        data={data}
                                        subtotal={subtotal}
                                        tax={tax}
                                        shipping={shipping}
                                        total={total}
                                    />
                                )}
                            </Card>
                        </div>
                    </div>
                </div>
            </div>

            <Footer />
        </div>
    );
}










