"use client";

import { Button } from "@/components/ui/button";

interface CheckoutNowProps {
  name: string;
  description: string;
  price: number;
  image: string;
  id: string;
}

export default function CheckoutNow({
  name,
  description,
  price,
  image,
  id,
}: CheckoutNowProps) {
  const handlePayFastCheckout = () => {
    try {
      const timestamp = new Date().toISOString().replace(/[-:.]/g, '');
      const paymentId = `PF_${timestamp}_${id}`;

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
      const formattedPrice = Number(price).toFixed(2);

      // Add PayFast required fields
      const fields = {
        merchant_id: merchantId,
        merchant_key: merchantKey,
        amount: formattedPrice,
        item_name: name,
        item_description: description,
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
    <Button
      variant="outline"
      onClick={handlePayFastCheckout}
    >
      Buy Now
    </Button>
  );
}
