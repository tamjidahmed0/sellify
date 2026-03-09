'use client';

import React from 'react';
import { Card, Button } from 'antd';
import { CreditCard } from 'lucide-react';
import { PaymentElement } from '@stripe/react-stripe-js';
import { Stripe } from '@stripe/stripe-js';



interface PaymentStepProps {
  clientSecret: string
  stripePromise: Promise<Stripe | null>
  handleNextStep: () => void;
  handlePrevStep: () => void;
}





const PaymentStep: React.FC<PaymentStepProps> = ({
  handleNextStep,
  handlePrevStep,
}) => {




  return (
    <Card className="mb-6 rounded-xl shadow-sm">
      <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-6 flex items-center space-x-2">
        <CreditCard className="h-5 w-5 md:h-6 md:w-6 shrink-0" />
        <span>Payment Method</span>
      </h2>

      <PaymentElement />


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
