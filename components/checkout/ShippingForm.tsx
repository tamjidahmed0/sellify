'use client';

import { Card, Button, Form, Input, Select, Checkbox } from 'antd';
import { Truck } from 'lucide-react';
import Link from 'next/link';

interface ShippingStepProps {
  form: any;
  handleNextStep: () => void;
}

export default function ShippingStep({ form, handleNextStep }: ShippingStepProps) {
  return (
    <Card className="mb-6 rounded-xl shadow-sm">
      <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-6 flex items-center space-x-2">
        <Truck className="h-5 w-5 md:h-6 md:w-6 shrink-0" />
        <span>Shipping Address</span>
      </h2>

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

        <Checkbox>Save this address for future use</Checkbox>
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
          onClick={handleNextStep}
        >
          Continue to Payment
        </Button>
      </div>
    </Card>
  );
}
