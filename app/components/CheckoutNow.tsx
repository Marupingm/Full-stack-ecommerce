"use client";

import { Button } from "@/components/ui/button";

interface CheckoutNowProps {
  name: string;
  description: string;
  price: number;
  image: string;
  id: string;
}

// Helper function to generate MD5 hash
const generateSignature = async (data: Record<string, string>, passPhrase: string = '') => {
  // Create parameter string
  const paramString = Object.entries(data)
    .sort(([keyA], [keyB]) => keyA.localeCompare(keyB)) // Sort keys alphabetically
    .map(([key, value]) => `${key}=${encodeURIComponent(value.trim())}`)
    .join('&');

  // Add passphrase if it exists
  const stringToHash = `${paramString}${passPhrase ? `&passphrase=${encodeURIComponent(passPhrase)}` : ''}`;
  
  // Use TextEncoder and crypto.subtle to create MD5 hash
  const encoder = new TextEncoder();
  const data_buffer = encoder.encode(stringToHash);
  const hash_buffer = await crypto.subtle.digest('SHA-512', data_buffer);
  const hash_array = Array.from(new Uint8Array(hash_buffer));
  const hash_hex = hash_array.map(b => b.toString(16).padStart(2, '0')).join('');
  
  return hash_hex;
};

export default function CheckoutNow({
  name,
  description,
  price,
  image,
  id,
}: CheckoutNowProps) {
  const handlePayFastCheckout = async () => {
    try {
      const timestamp = new Date().toISOString().replace(/[-:.]/g, '');
      const paymentId = `PF_${timestamp}_${id}`;

      // Create form and submit it
      const form = document.createElement('form');
      form.method = 'POST';
      form.action = 'https://sandbox.payfast.co.za/eng/process';

      const merchantId = process.env.NEXT_PUBLIC_PAYFAST_MERCHANT_ID;
      const merchantKey = process.env.NEXT_PUBLIC_PAYFAST_MERCHANT_KEY;

      if (!merchantId || !merchantKey) {
        console.error('PayFast credentials are not properly configured');
        return;
      }

      // Format price to 2 decimal places without currency symbol
      const formattedPrice = (price / 100).toFixed(2);

      // Add PayFast required fields
      const fields = {
        merchant_id: merchantId,
        merchant_key: merchantKey,
        return_url: `${window.location.origin}/success`,
        cancel_url: `${window.location.origin}/cancel`,
        notify_url: `${window.location.origin}/api/payfast/notify`,
        amount: formattedPrice,
        item_name: name.substring(0, 100),
        m_payment_id: paymentId,
        // Use a different email for customer (not the same as merchant email)
        email_address: 'customer@example.com',
        name_first: 'Test',
        name_last: 'Customer',
        cell_number: '0821234567',
        custom_str1: id,
        // Sandbox testing parameters
        testing: 'true'
      };

      // Remove merchant_key before generating signature (it should not be included in the signature)
      const signatureFields = { ...fields } as Record<string, string>;
      delete signatureFields.merchant_key;

      // Generate signature
      const signature = await generateSignature(signatureFields);
      const updatedFields = { ...fields, signature };

      // Add fields to form (excluding merchant_key)
      Object.entries(updatedFields).forEach(([key, value]) => {
        if (key !== 'merchant_key') { // Don't include merchant_key in the form
          const input = document.createElement('input');
          input.type = 'hidden';
          input.name = key;
          input.value = value.toString();
          form.appendChild(input);
        }
      });

      // Debug form data before submission
      console.log('PayFast checkout fields:', { ...updatedFields, merchant_key: '[HIDDEN]' });

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
// Modified on 2025-02-19 00:50:45
// Modified on 2025-02-19 00:52:32
