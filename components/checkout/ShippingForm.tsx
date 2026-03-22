'use client';
import { useEffect, useState } from 'react';
import { Card, Button, Form, Input, Select, Checkbox, Spin } from 'antd';
import { Truck, MapPin, ChevronDown } from 'lucide-react';
import Link from 'next/link';
import getCookie from '@/lib/getCookie';

const API_URL = process.env.NEXT_PUBLIC_BASE_URL;

interface SavedAddress {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    addressLine: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
    isDefault: boolean;
}

interface AddressData {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    addressLine: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
}

interface ShippingStepProps {
    form: any;
    handleNextStep: () => void;
    onAddressSubmit: (address: AddressData) => void;
}

export default function ShippingStep({ form, handleNextStep, onAddressSubmit }: ShippingStepProps) {
    const [savedAddresses, setSavedAddresses] = useState<SavedAddress[]>([]);
    const [loadingAddresses, setLoadingAddresses] = useState(false);
    const [selectedAddressId, setSelectedAddressId] = useState<string | null>(null);
    const [saveForFuture, setSaveForFuture] = useState(false);

    // Fetch saved addresses on mount — only if user is logged in (token exists)
    useEffect(() => {
        const token = getCookie('token')
        if (!token) return;

        setLoadingAddresses(true);
        fetch(`${API_URL}/user-address`, {
            headers: { Authorization: `Bearer ${token}` },
        })
            .then((r) => r.json())
            .then((data: SavedAddress[]) => {
                setSavedAddresses(data ?? []);

                // Auto-fill default address if exists
                const defaultAddr = data?.find((a) => a.isDefault);
                if (defaultAddr) {
                    fillForm(defaultAddr);
                    setSelectedAddressId(defaultAddr.id);
                }
            })
            .catch(() => { }) // silent fail — user just fills manually
            .finally(() => setLoadingAddresses(false));
    }, []);

    // Fill antd form with a saved address
    const fillForm = (addr: SavedAddress) => {
        form.setFieldsValue({
            firstName: addr.firstName,
            lastName: addr.lastName,
            email: addr.email,
            phone: addr.phone,
            address: addr.addressLine,
            city: addr.city,
            state: addr.state,
            zip: addr.zipCode,
            country: addr.country,
        });
    };

    const handleSelectAddress = (addr: SavedAddress) => {
        fillForm(addr);
        setSelectedAddressId(addr.id);
    };

    const handleContinue = async () => {
        const values = await form.validateFields();

        const addressData: AddressData = {
            firstName: values.firstName,
            lastName: values.lastName,
            email: values.email,
            phone: values.phone,
            addressLine: values.address,
            city: values.city,
            state: values.state,
            zipCode: values.zip,
            country: values.country,
        };

        // Pass address to parent — used when creating payment intent
        onAddressSubmit(addressData);

        // Save address for future use if checkbox is checked
        if (saveForFuture) {
            const token = getCookie('token')
            if (token) {
                fetch(`${API_URL}/user-address`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${token}`,
                    },
                    body: JSON.stringify({
                        ...addressData,
                        isDefault: savedAddresses.length === 0,
                    }),
                }).catch(() => { }); // silent fail
            }
        }

        handleNextStep();
    };

    return (
        <Card className="mb-6 rounded-xl shadow-sm">
            <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-6 flex items-center space-x-2">
                <Truck className="h-5 w-5 md:h-6 md:w-6 shrink-0" />
                <span>Shipping Address</span>
            </h2>

            {/* Saved addresses — only shown if user has any */}
            {loadingAddresses && (
                <div className="flex items-center gap-2 text-sm text-gray-400 mb-4">
                    <Spin size="small" />
                    <span>Loading saved addresses…</span>
                </div>
            )}

            {!loadingAddresses && savedAddresses.length > 0 && (
                <div className="mb-6">
                    <p className="text-sm font-semibold text-gray-600 mb-3 flex items-center gap-1.5">
                        <MapPin className="w-4 h-4" />
                        Saved Addresses
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {savedAddresses.map((addr) => (
                            <button
                                key={addr.id}
                                type="button"
                                onClick={() => handleSelectAddress(addr)}
                                className={`text-left p-4 rounded-xl border-2 transition-all ${selectedAddressId === addr.id
                                        ? 'border-blue-500 bg-blue-50'
                                        : 'border-gray-200 hover:border-gray-300 bg-white'
                                    }`}
                            >
                                <div className="flex items-start justify-between gap-2">
                                    <div className="min-w-0">
                                        <p className="font-semibold text-gray-900 text-sm truncate">
                                            {addr.firstName} {addr.lastName}
                                        </p>
                                        <p className="text-xs text-gray-500 mt-0.5 truncate">{addr.addressLine}</p>
                                        <p className="text-xs text-gray-500 truncate">
                                            {addr.city}, {addr.state} {addr.zipCode}
                                        </p>
                                        <p className="text-xs text-gray-500">{addr.country}</p>
                                    </div>
                                    {addr.isDefault && (
                                        <span className="text-[10px] font-bold bg-blue-100 text-blue-600 px-2 py-0.5 rounded-full shrink-0">
                                            Default
                                        </span>
                                    )}
                                </div>
                            </button>
                        ))}
                    </div>

                    <button
                        type="button"
                        onClick={() => {
                            form.resetFields();
                            setSelectedAddressId(null);
                        }}
                        className="text-xs text-blue-600 hover:text-blue-700 font-medium mt-3 flex items-center gap-1"
                    >
                        <ChevronDown className="w-3 h-3" />
                        Use a different address
                    </button>
                </div>
            )}

            {/* Address form */}
            <Form form={form} layout="vertical">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <Form.Item
                        label="First Name"
                        name="firstName"
                        rules={[{ required: true, message: 'Please enter first name' }]}
                    >
                        <Input placeholder="John" size="large" />
                    </Form.Item>
                    <Form.Item
                        label="Last Name"
                        name="lastName"
                        rules={[{ required: true, message: 'Please enter last name' }]}
                    >
                        <Input placeholder="Doe" size="large" />
                    </Form.Item>
                </div>

                <Form.Item
                    label="Email Address"
                    name="email"
                    rules={[
                        { required: true, message: 'Please enter email' },
                        { type: 'email', message: 'Invalid email' },
                    ]}
                >
                    <Input placeholder="john@example.com" size="large" />
                </Form.Item>

                <Form.Item
                    label="Phone Number"
                    name="phone"
                    rules={[{ required: true, message: 'Please enter phone number' }]}
                >
                    <Input placeholder="+1 (555) 000-0000" size="large" />
                </Form.Item>

                <Form.Item
                    label="Street Address"
                    name="address"
                    rules={[{ required: true, message: 'Please enter address' }]}
                >
                    <Input placeholder="123 Main Street" size="large" />
                </Form.Item>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <Form.Item
                        label="City"
                        name="city"
                        rules={[{ required: true, message: 'Please enter city' }]}
                    >
                        <Input placeholder="New York" size="large" />
                    </Form.Item>
                    <Form.Item
                        label="State"
                        name="state"
                        rules={[{ required: true, message: 'Please enter state' }]}
                    >
                        <Input placeholder="NY" size="large" />
                    </Form.Item>
                    <Form.Item
                        label="ZIP Code"
                        name="zip"
                        rules={[{ required: true, message: 'Please enter ZIP code' }]}
                    >
                        <Input placeholder="10001" size="large" />
                    </Form.Item>
                </div>

                <Form.Item
                    label="Country"
                    name="country"
                    rules={[{ required: true, message: 'Please select country' }]}
                >
                    <Select
                        placeholder="Select your country"
                        size="large"
                        options={[
                            { label: 'United States', value: 'us' },
                            { label: 'Canada', value: 'ca' },
                            { label: 'United Kingdom', value: 'uk' },
                            { label: 'Australia', value: 'au' },
                        ]}
                    />
                </Form.Item>

                {/* Save address checkbox — only shown if user is logged in */}
                {typeof window !== 'undefined' && getCookie('token') && (
                    <Checkbox
                        checked={saveForFuture}
                        onChange={(e) => setSaveForFuture(e.target.checked)}
                    >
                        Save this address for future use
                    </Checkbox>
                )}
            </Form>

            <div className="flex flex-col-reverse sm:flex-row justify-between gap-3 mt-8">
                <Link href="/cart" className="w-full sm:w-auto">
                    <Button size="large" className="h-12 w-full sm:w-auto">
                        Back to Cart
                    </Button>
                </Link>
                <Button
                    htmlType="button"
                    type="primary"
                    size="large"
                    className="h-12 px-8 bg-blue-600 hover:bg-blue-700 border-none font-semibold w-full sm:w-auto"
                    onClick={handleContinue}
                >
                    Continue to Payment
                </Button>
            </div>
        </Card>
    );
}