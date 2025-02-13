"use client";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";

import Image from "next/image";
import { useShoppingCart } from "use-shopping-cart";

// Helper function to format price in ZAR
function formatPrice(price: number) {
  return new Intl.NumberFormat('en-ZA', {
    style: 'currency',
    currency: 'ZAR',
  }).format(price);
}

export default function ShoppingCartModal() {
  const {
    cartCount,
    shouldDisplayCart,
    handleCartClick,
    cartDetails,
    removeItem,
    totalPrice = 0,
  } = useShoppingCart();

  const handleCheckout = () => {
    try {
      const timestamp = new Date().toISOString().replace(/[-:.]/g, '');
      const paymentId = `PF_CART_${timestamp}`;
      const cartCount = Object.values(cartDetails ?? {}).length;

      // Create form and submit it
      const form = document.createElement('form');
      form.method = 'POST';
      form.action = 'https://sandbox.payfast.co.za/eng/process';

      const merchantId = process.env.NEXT_PUBLIC_PAYFAST_MERCHANT_ID;
      const merchantKey = process.env.NEXT_PUBLIC_PAYFAST_MERCHANT_KEY;

      // Debug log for credentials
      console.log('PayFast Credentials:', {
        merchantId: merchantId || 'Not set',
        merchantKeyLength: merchantKey ? merchantKey.length : 0
      });

      if (!merchantId || !merchantKey) {
        console.error('PayFast credentials are not properly configured');
        return;
      }

      // Format price to 2 decimal places
      const formattedPrice = Number(totalPrice).toFixed(2);

      // Add PayFast required fields
      const fields = {
        merchant_id: merchantId,
        merchant_key: merchantKey,
        amount: formattedPrice,
        item_name: `Order #${paymentId}`,
        item_description: `Cart order with ${cartCount} items`,
        return_url: `${window.location.origin}/success`,
        cancel_url: `${window.location.origin}/cancel`,
        notify_url: `${window.location.origin}/api/payfast/notify`,
        m_payment_id: paymentId,
        email_confirmation: '1',
        confirmation_address: 'test@example.com',
        name_first: 'Test',
        name_last: 'Customer',
        email_address: 'test@example.com'
      };

      console.log('PayFast checkout fields:', fields);

      // Add fields to form
      Object.entries(fields).forEach(([key, value]) => {
        const input = document.createElement('input');
        input.type = 'hidden';
        input.name = key;
        input.value = value.toString();
        form.appendChild(input);
      });

      // Debug form data before submission
      const formData = new FormData(form);
      console.log('Form data before submission:');
      Array.from(formData.entries()).forEach(([key, value]) => {
        console.log(`${key}: ${value}`);
      });

      // Add form to body and submit
      document.body.appendChild(form);
      form.submit();
      document.body.removeChild(form);
    } catch (error) {
      console.error('PayFast checkout error:', error);
    }
  };

  return (
    <Sheet open={shouldDisplayCart} onOpenChange={() => handleCartClick()}>
      <SheetContent className="sm:max-w-lg w-[90vw]">
        <SheetHeader>
          <SheetTitle>Shopping Cart</SheetTitle>
        </SheetHeader>

        <div className="h-full flex flex-col justify-between">
          <div className="mt-8 flex-1 overflow-y-auto">
            <ul className="-my-6 divide-y divide-gray-200">
              {cartCount === 0 ? (
                <h1 className="py-6">You don't have any items</h1>
              ) : (
                <>
                  {Object.values(cartDetails ?? {}).map((entry) => (
                    <li key={entry.id} className="flex py-6">
                      <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                        <Image
                          src={entry.image as string}
                          alt="Product image"
                          width={100}
                          height={100}
                        />
                      </div>

                      <div className="ml-4 flex flex-1 flex-col">
                        <div>
                          <div className="flex justify-between text-base font-medium text-gray-900">
                            <h3>{entry.name}</h3>
                            <p className="ml-4">{formatPrice(entry.price)}</p>
                          </div>
                          <p className="mt-1 text-sm text-gray-500 line-clamp-2">
                            {entry.description}
                          </p>
                        </div>

                        <div className="flex flex-1 items-end justify-between text-sm">
                          <p className="text-gray-500">QTY: {entry.quantity}</p>

                          <div className="flex">
                            <button
                              type="button"
                              onClick={() => removeItem(entry.id)}
                              className="font-medium text-primary hover:text-primary/80"
                            >
                              Remove
                            </button>
                          </div>
                        </div>
                      </div>
                    </li>
                  ))}
                </>
              )}
            </ul>
          </div>

          <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
            <div className="flex justify-between text-base font-medium text-gray-900">
              <p>Subtotal:</p>
              <p>{formatPrice(totalPrice)}</p>
            </div>
            <p className="mt-0.5 text-sm text-gray-500">
              Shipping and taxes are calculated at checkout.
            </p>

            <div className="mt-6">
              <Button 
                onClick={handleCheckout} 
                className="w-full"
                disabled={cartCount === 0}
              >
                Checkout with PayFast
              </Button>
            </div>

            <div className="mt-6 flex justify-center text-center text-sm text-gray-500">
              <p>
                OR{" "}
                <button
                  onClick={() => handleCartClick()}
                  className="font-medium text-primary hover:text-primary/80"
                >
                  Continue Shopping
                </button>
              </p>
            </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
