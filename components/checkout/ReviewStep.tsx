import { Card, Button, Checkbox } from 'antd';
import { CreditCard, Edit2, ShoppingBag, Truck } from 'lucide-react';
import { Cart } from '@/types/cart';
import useCreateOrder from '@/hooks/useCreateOrder';

interface ReviewStepProps {
  data?: Cart;
  agreeTerms: boolean;
  setAgreeTerms: (v: boolean) => void;
  handlePrevStep: () => void;
  setCurrentStep: (step: 'shipping' | 'payment' | 'review') => void;
  paymentMethod: string;
}


export default function ReviewStep({
  data,
  agreeTerms,
  setAgreeTerms,
  handlePrevStep,
  setCurrentStep,
  paymentMethod,
}: ReviewStepProps) {
  if (!data) return null;


  const { mutate, isPending } = useCreateOrder()



  const handleOrder = () => {
    mutate({
      userId: '1',
      items: data.items.map((item) => ({
        productId: item.productId,
        quantity: item.quantity,
      }))
    })




  }



  return (
    <Card className="mb-6 rounded-xl shadow-sm">
      <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-6">
        Order Review
      </h2>

      <div className="space-y-6">
        {/* Shipping */}
        <div>
          <h3 className="font-semibold text-gray-900 mb-3 flex items-center space-x-2">
            <Truck className="h-5 w-5 shrink-0" />
            <span>Shipping Address</span>
            <button
              onClick={() => setCurrentStep('shipping')}
              className="ml-auto p-1"
            >
              <Edit2 className="h-4 w-4 text-blue-600" />
            </button>
          </h3>

          <p className="text-gray-700 text-sm">John Doe</p>
          <p className="text-gray-600 text-xs">
            123 Main Street, New York, NY 10001, United States
          </p>
          <p className="text-gray-600 text-xs">
            john@example.com • +1 (555) 000-0000
          </p>
        </div>

        {/* Payment */}
        <div className="border-t pt-6">
          <h3 className="font-semibold text-gray-900 mb-3 flex items-center space-x-2">
            <CreditCard className="h-5 w-5 shrink-0" />
            <span>Payment Method</span>
            <button
              onClick={() => setCurrentStep('payment')}
              className="ml-auto p-1"
            >
              <Edit2 className="h-4 w-4 text-blue-600" />
            </button>
          </h3>

          <p className="text-gray-700 text-sm">
            {paymentMethod === 'card' && 'Credit Card ending in 3456'}
            {paymentMethod === 'paypal' && 'PayPal'}
            {paymentMethod === 'applepay' && 'Apple Pay'}
            {paymentMethod === 'googlepay' && 'Google Pay'}
          </p>
        </div>

        {/* Items */}
        <div className="border-t pt-6">
          <h3 className="font-semibold text-gray-900 mb-3 flex items-center space-x-2">
            <ShoppingBag className="h-5 w-5 shrink-0" />
            <span>Items ({data.items.length})</span>
          </h3>

          <div className="space-y-3">
            {data.items.map((item) => (
              <div
                key={item.id}
                className="flex items-center justify-between p-3 bg-gray-50 rounded-lg gap-3"
              >
                <div className="flex items-center space-x-3 min-w-0">
                  <img
                    src={item.image || '/placeholder.png'}
                    alt={item.productName}
                    className="w-10 h-10 rounded object-cover"
                  />
                  <div className="min-w-0">
                    <p className="font-medium text-gray-900 text-sm truncate">
                      {item.productName}
                    </p>
                    <p className="text-xs text-gray-600">
                      Qty: {item.quantity}
                    </p>
                  </div>
                </div>

                <p className="font-semibold text-gray-900 text-sm">
                  ${(Number(item.price) * item.quantity).toFixed(2)}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Terms */}
      <Checkbox
        checked={agreeTerms}
        onChange={(e) => setAgreeTerms(e.target.checked)}
        className="mt-8"
      >
        I agree to the Terms & Conditions and Privacy Policy
      </Checkbox>

      {/* Actions */}
      <div className="flex flex-col-reverse sm:flex-row justify-between gap-3 mt-8">
        <Button
          size="large"
          className="h-12 w-full sm:w-auto"
          onClick={handlePrevStep}
        >
          Back
        </Button>


        <Button
          onClick={handleOrder}
          type="primary"
          size="large"
          loading={isPending}
          disabled={!agreeTerms || isPending}
          className="h-12 px-8 bg-green-600 hover:bg-green-700 border-none font-semibold w-full sm:w-auto"
        >
          {isPending ? "Placing Order..." : "Place Order"}
        </Button>




      </div>
    </Card>
  );
}
