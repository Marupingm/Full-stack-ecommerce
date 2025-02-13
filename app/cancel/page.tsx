import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function PaymentCancelled() {
  return (
    <div className="h-screen flex flex-col items-center justify-center">
      <div className="bg-white p-6 md:mx-auto">
        <svg viewBox="0 0 24 24" className="text-red-600 w-16 h-16 mx-auto my-6">
          <path
            fill="currentColor"
            d="M12,0A12,12,0,1,0,24,12,12.014,12.014,0,0,0,12,0Zm0,22A10,10,0,1,1,22,12,10.011,10.011,0,0,1,12,22Zm3.536-14.536a1,1,0,0,1,0,1.414L13.414,12l2.122,2.122a1,1,0,1,1-1.414,1.414L12,13.414,9.878,15.536a1,1,0,0,1-1.414-1.414L10.586,12,8.464,9.878A1,1,0,0,1,9.878,8.464L12,10.586l2.122-2.122a1,1,0,0,1,1.414,0Z"
          ></path>
        </svg>
        <div className="text-center">
          <h3 className="md:text-2xl text-base text-gray-900 font-semibold text-center">
            Payment Cancelled
          </h3>
          <p className="text-gray-600 my-2">
            Your payment has been cancelled.
          </p>
          <p className="text-gray-600 mb-8">
            Feel free to try again when you're ready.
          </p>
          <Button asChild>
            <Link href="/">Return to Shopping</Link>
          </Button>
        </div>
      </div>
    </div>
  );
} 