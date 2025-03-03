"use client";

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import confetti from "canvas-confetti";
import { useShoppingCart } from "use-shopping-cart";
import { CheckCircle } from "lucide-react";

export default function PaymentSuccess() {
  const router = useRouter();
  const { clearCart } = useShoppingCart();

  useEffect(() => {
    // Clear the cart on successful payment
    clearCart();

    // Trigger confetti animation when component mounts
    const end = Date.now() + 3 * 1000; // 3 seconds
    const colors = ["#a786ff", "#fd8bbc", "#eca184", "#f8deb1"];

    const frame = () => {
      if (Date.now() > end) return;

      confetti({
        particleCount: 2,
        angle: 60,
        spread: 55,
        startVelocity: 60,
        origin: { x: 0, y: 0.5 },
        colors: colors,
      });
      confetti({
        particleCount: 2,
        angle: 120,
        spread: 55,
        startVelocity: 60,
        origin: { x: 1, y: 0.5 },
        colors: colors,
      });

      requestAnimationFrame(frame);
    };

    frame();
  }, [clearCart]);

  const handleContinueShopping = () => {
    router.push('/');
    router.refresh();
  };

  return (
    <div className="h-screen flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg shadow-lg text-center max-w-md mx-auto">
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <CheckCircle className="h-8 w-8 text-green-500" />
        </div>
        <h1 className="text-2xl font-bold text-gray-900 mb-4">
          Thank you for your purchase!
        </h1>
        <p className="text-gray-600 mb-8">
          Your order has been successfully processed. You will receive a confirmation email shortly.
        </p>
        <Button 
          onClick={handleContinueShopping}
          className="bg-[#0f172a] hover:bg-[#1e293b]"
        >
          Continue Shopping
        </Button>
      </div>
    </div>
  );
} // Modified on 2025-02-19 00:50:48
// Modified on 2025-02-19 00:52:37
