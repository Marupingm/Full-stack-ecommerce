"use client";

import { CartProvider } from "use-shopping-cart";

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <CartProvider
      mode="payment"
      cartMode="client-only"
      currency="ZAR"
      shouldPersist={true}
      successUrl={`${process.env.NEXT_PUBLIC_API_URL || window.location.origin}/success`}
      cancelUrl={`${process.env.NEXT_PUBLIC_API_URL || window.location.origin}/cancel`}
      language="en-US"
      stripe=""
    >
      {children}
    </CartProvider>
  );
}
// Modified on 2025-02-19 00:50:48
// Modified on 2025-02-19 00:52:37
