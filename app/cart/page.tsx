'use client';

import Link from 'next/link';
import { Button, InputNumber, Card, Breadcrumb, Empty } from 'antd';
import { Trash2, ShoppingBag, Home, ArrowRight } from 'lucide-react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import useCart from '@/hooks/useCart';
import useUpdateCart from '@/hooks/useUpdateCart';
import useRemoveCart from '@/hooks/useRemoveCart';
import CartSkeleton from './CartSkeleton';


export default function CartPage() {
    const { data, isLoading } = useCart();
    const { mutate: updateCartQty, loadingItems } = useUpdateCart();
    const { mutate: removeCartItem, isPending } = useRemoveCart();





    // Order summary calculation
    const subtotal =
        data?.items?.reduce(
            (sum: number, item: any) => sum + item.price * item.quantity,
            0
        ) ?? 0;
    const shipping = subtotal > 50 ? 0 : 10;
    const tax = subtotal * 0.08;
    const total = subtotal + shipping + tax;

    return (
        <div className="flex flex-col min-h-screen bg-gray-50">
            <Header />

            <div className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <Breadcrumb
                    items={[
                        {
                            title: (
                                <a href="/" className="flex items-center">
                                    <Home className="h-4 w-4" />
                                </a>
                            ),
                        },
                        { title: 'Shopping Cart' },
                    ]}
                    className="mb-6"
                />

                <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8">
                    Shopping Cart
                </h1>

                {isLoading ? (
                    <CartSkeleton />
                ) :
                    data?.items.length === 0 ? (
                        <Card className="text-center py-16">
                            <Empty
                                image={Empty.PRESENTED_IMAGE_SIMPLE}
                                description={<span className="text-gray-600">Your cart is empty</span>}
                            >
                                <Link href="/products">
                                    <Button type="primary" size="large" className="mt-4">
                                        Continue Shopping
                                    </Button>
                                </Link>
                            </Empty>
                        </Card>
                    ) : (
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                            {/* Cart Items */}
                            <div className="lg:col-span-2 space-y-4">
                                {data?.items.map((item) => (
                                    <Card key={item.id}>
                                        <div className="flex flex-col sm:flex-row gap-4">
                                            <Link href={`/products/${item.product.slug}`} className="shrink-0">
                                                <img
                                                    src={item.image}
                                                    alt={item.productName}
                                                    className="w-full sm:w-32 h-32 object-cover rounded-lg"
                                                />
                                            </Link>

                                            <div className="flex-1 flex flex-col justify-between">
                                                <div>
                                                    <Link href={`/products/${item.product.slug}`}>
                                                        <h3 className="text-lg font-semibold text-gray-900 hover:text-blue-600 transition-colors">
                                                            {item.productName}
                                                        </h3>
                                                    </Link>
                                                </div>

                                                <div className="flex flex-wrap items-center justify-between gap-4 mt-4">
                                                    <div className="flex items-center space-x-4">
                                                        <span className="text-gray-700 font-medium">Qty:</span>
                                                        <InputNumber
                                                            min={1}
                                                            max={10}
                                                            value={item.quantity}
                                                            disabled={loadingItems[item.id]}
                                                            onChange={(value) =>
                                                                updateCartQty({
                                                                    cartItemId: item.id,
                                                                    quantity: value || 1,
                                                                })
                                                            }
                                                        />
                                                    </div>

                                                    <div className="flex items-center space-x-4">
                                                        <span className="text-2xl font-bold text-gray-900">
                                                            ${(Number(item.price) * item.quantity).toFixed(2)}
                                                        </span>
                                                        <Button
                                                            danger
                                                            icon={<Trash2 className="h-4 w-4" />}
                                                            onClick={() => removeCartItem(item.id)}
                                                            loading={isPending}
                                                        >
                                                            Remove
                                                        </Button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </Card>
                                ))}
                            </div>

                            {/* Sticky Order Summary */}
                            <div className="lg:col-span-1">
                                <div className="sticky top-20 lg:top-24">
                                    <Card>
                                        <h2 className="text-xl font-bold text-gray-900 mb-6">
                                            Order Summary
                                        </h2>

                                        <div className="space-y-4 mb-6">
                                            <div className="flex justify-between">
                                                <span className="text-gray-600">Subtotal</span>
                                                <span className="font-semibold text-gray-900">
                                                    ${subtotal.toFixed(2)}
                                                </span>
                                            </div>

                                            <div className="flex justify-between">
                                                <span className="text-gray-600">Shipping</span>
                                                <span className="font-semibold text-gray-900">
                                                    {shipping === 0 ? (
                                                        <span className="text-green-600">Free</span>
                                                    ) : (
                                                        `$${shipping.toFixed(2)}`
                                                    )}
                                                </span>
                                            </div>

                                            <div className="flex justify-between">
                                                <span className="text-gray-600">Tax</span>
                                                <span className="font-semibold text-gray-900">
                                                    ${tax.toFixed(2)}
                                                </span>
                                            </div>

                                            <div className="border-t border-gray-200 pt-4">
                                                <div className="flex justify-between">
                                                    <span className="text-lg font-bold text-gray-900">Total</span>
                                                    <span className="text-2xl font-bold text-gray-900">
                                                        ${total.toFixed(2)}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>

                                        <Button
                                            type="primary"
                                            size="large"
                                            block
                                            icon={<ShoppingBag className="h-5 w-5" />}
                                            className="h-12 bg-blue-600 hover:bg-blue-700 border-none font-semibold mb-4"
                                        >
                                            Proceed to Checkout
                                        </Button>

                                        <Link href="/products">
                                            <Button
                                                size="large"
                                                block
                                                icon={<ArrowRight className="h-5 w-5" />}
                                                className="h-12"
                                            >
                                                Continue Shopping
                                            </Button>
                                        </Link>

                                        {shipping > 0 && (
                                            <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                                                <p className="text-sm text-blue-800">
                                                    Add ${(50 - subtotal).toFixed(2)} more to get free shipping!
                                                </p>
                                            </div>
                                        )}
                                    </Card>
                                </div>
                            </div>
                        </div>
                    )

                }


            </div>

            <Footer />
        </div>
    );
}
