'use client';

import React from 'react';
import { Card, Button, Radio, Form, Input, Checkbox } from 'antd';
import { CreditCard } from 'lucide-react';

export type PaymentMethod = 'card' | 'paypal' | 'applepay' | 'googlepay';

interface PaymentStepProps {
  paymentMethod: string;
  setPaymentMethod: (method: PaymentMethod) => void;
  handleNextStep: () => void;
  handlePrevStep: () => void;
}

const paymentOptions = [
  {
    value: 'card' as PaymentMethod,
    label: 'Credit or Debit Card',
    desc: 'Visa, Mastercard, American Express',
  },
  {
    value: 'paypal' as PaymentMethod,
    label: 'PayPal',
    desc: 'Fast and secure payment with PayPal',
  },
  {
    value: 'applepay' as PaymentMethod,
    label: 'Apple Pay',
    desc: 'Quick checkout with Apple Pay',
  },
  {
    value: 'googlepay' as PaymentMethod,
    label: 'Google Pay',
    desc: 'Secure payment with Google Pay',
  },
];

const PaymentStep: React.FC<PaymentStepProps> = ({
  paymentMethod,
  setPaymentMethod,
  handleNextStep,
  handlePrevStep,
}) => {
  return (
    <Card className="mb-6 rounded-xl shadow-sm">
      <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-6 flex items-center space-x-2">
        <CreditCard className="h-5 w-5 md:h-6 md:w-6 shrink-0" />
        <span>Payment Method</span>
      </h2>

      <Radio.Group
        value={paymentMethod}
        onChange={(e) => setPaymentMethod(e.target.value)}
        className="w-full"
      >
        <div className="space-y-3">
          {paymentOptions.map((option) => (
            <Card
              key={option.value}
              className={`cursor-pointer transition-colors ${
                paymentMethod === option.value
                  ? 'border-blue-500 bg-blue-50'
                  : 'hover:border-gray-400'
              }`}
              onClick={() => setPaymentMethod(option.value)}
            >
              <Radio value={option.value} className="w-full">
                <div className="ml-2">
                  <p className="font-semibold text-gray-900 text-sm md:text-base">
                    {option.label}
                  </p>
                  <p className="text-xs md:text-sm text-gray-600">
                    {option.desc}
                  </p>
                </div>
              </Radio>
            </Card>
          ))}
        </div>
      </Radio.Group>

      {paymentMethod === 'card' && (
        <div className="mt-6 p-4 md:p-6 bg-gray-50 rounded-lg">
          <Form layout="vertical">
            <Form.Item label="Card Holder Name">
              <Input placeholder="John Doe" size="large" />
            </Form.Item>

            <Form.Item label="Card Number">
              <Input placeholder="1234 5678 9012 3456" size="large" />
            </Form.Item>

            <div className="grid grid-cols-2 gap-4">
              <Form.Item label="Expiry Date">
                <Input placeholder="MM/YY" size="large" />
              </Form.Item>

              <Form.Item label="CVV">
                <Input placeholder="123" size="large" />
              </Form.Item>
            </div>

            <Checkbox>Save this card for future purchases</Checkbox>
          </Form>
        </div>
      )}

      <div className="flex flex-col-reverse sm:flex-row justify-between gap-3 mt-8">
        <Button
          size="large"
          className="h-12 w-full sm:w-auto"
          onClick={handlePrevStep}
        >
          Back
        </Button>

        <Button
          type="primary"
          size="large"
          className="h-12 px-8 bg-blue-600 hover:bg-blue-700 border-none font-semibold w-full sm:w-auto"
          onClick={handleNextStep}
        >
          Review Order
        </Button>
      </div>
    </Card>
  );
};

export default PaymentStep;
