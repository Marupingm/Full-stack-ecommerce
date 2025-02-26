"use client";

import { CartProvider } from "use-shopping-cart";
import { ReactNode } from "react";
import { Toaster } from "sonner";
import { CheckCircle2, XCircle } from "lucide-react";

export default function Providers({ children }: { children: ReactNode }) {
  return (
    <CartProvider
      mode="payment"
      cartMode="client-only"
      stripe={process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!}
      successUrl="http://localhost:3000/success"
      cancelUrl="http://localhost:3000/cart"
      currency="ZAR"
      billingAddressCollection={false}
      shouldPersist={true}
      language="en-US"
    >
      <Toaster 
        position="top-right" 
        closeButton
        theme="light"
        className="!bg-white !border !border-gray-100"
        toastOptions={{
          style: {
            background: 'white',
            border: '1px solid #f3f4f6',
            color: '#111827',
          },
          success: {
            icon: <CheckCircle2 className="text-green-500 h-5 w-5" />,
          },
          error: {
            icon: <XCircle className="text-red-500 h-5 w-5" />,
          },
        }}
      />
      {children}
    </CartProvider>
  );
}
// Modified on 2025-02-19 00:50:48
// Modified on 2025-02-19 00:52:37
