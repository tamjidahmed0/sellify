import {  Cart } from '@/types/cart'



interface OrderSummaryProps {
  data: Cart;
  subtotal: number;
  shipping: number;
  tax: number;
  total: number;
}



const OrderSummary = ({ data, subtotal, shipping, tax, total }: OrderSummaryProps) => {
  console.log(data, 'ok ok')

  return (
    <>
      <h3 className="text-xl font-bold text-gray-900 mb-6">Order Summary</h3>

      <div className="space-y-3 mb-6 pb-6 border-b">
        {data?.items.map((item) => (
          <div
            key={item.id}
            className="flex justify-between text-sm text-gray-600"
          >
            <span className="pr-2 flex-1 min-w-0 truncate">
              {item.productName} x {item.quantity}
            </span>
            <span className="font-medium whitespace-nowrap">
              ${(Number(item.price) * item.quantity).toFixed(2)}
            </span>
          </div>
        ))}
      </div>

      <div className="space-y-3 mb-6">
        <div className="flex justify-between text-gray-600">
          <span>Subtotal</span>
          <span className="font-semibold text-gray-900">
            ${subtotal?.toFixed(2)}
          </span>
        </div>
        <div className="flex justify-between text-gray-600">
          <span>Shipping</span>
          <span className="font-semibold text-gray-900">
            ${shipping?.toFixed(2)}
          </span>
        </div>
        <div className="flex justify-between text-gray-600">
          <span>Tax</span>
          <span className="font-semibold text-gray-900">
            ${tax?.toFixed(2)}
          </span>
        </div>
      </div>

      <div className="border-t pt-4 flex justify-between">
        <span className="text-lg font-bold text-gray-900">Total</span>
        <span className="text-2xl font-bold text-blue-600">
          ${total?.toFixed(2)}
        </span>
      </div>


    </>
  )
}

export default OrderSummary