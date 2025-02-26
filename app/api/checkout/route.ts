import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Order from '@/app/models/Order';

export async function POST(req: Request) {
  try {
    const { cartDetails, shippingDetails, totalAmount } = await req.json();

    // Connect to database
    await connectDB();

    // PayFast merchant details from environment variables
    const merchantId = process.env.NEXT_PUBLIC_PAYFAST_MERCHANT_ID;
    const merchantKey = process.env.NEXT_PUBLIC_PAYFAST_MERCHANT_KEY;
    const passPhrase = process.env.PAYFAST_PASSPHRASE; // Optional but recommended

    // Create a unique payment ID
    const orderId = `ORDER-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`;

    // Store order details in database
    const order = await Order.create({
      orderId,
      cartDetails,
      shippingDetails,
      totalAmount,
      status: 'pending'
    });

    // Base PayFast URL (sandbox or production)
    const baseUrl = process.env.NODE_ENV === 'production'
      ? 'https://www.payfast.co.za/eng/process'
      : 'https://sandbox.payfast.co.za/eng/process';

    // Construct the payment data with minimal custom data
    const data = {
      merchant_id: merchantId,
      merchant_key: merchantKey,
      return_url: `${process.env.NEXT_PUBLIC_API_URL}/success`,
      cancel_url: `${process.env.NEXT_PUBLIC_API_URL}/cart`,
      notify_url: `${process.env.NEXT_PUBLIC_API_URL}/api/payfast-webhook`,
      name_first: shippingDetails.firstName,
      name_last: shippingDetails.lastName,
      email_address: shippingDetails.email,
      m_payment_id: orderId,
      amount: totalAmount,
      item_name: `Order ${orderId}`,
      custom_str1: orderId // Only send the order ID
    };

    // Convert the data object to a query string
    const queryString = Object.entries(data)
      .map(([key, value]) => `${key}=${encodeURIComponent(value)}`)
      .join('&');

    // Construct the full PayFast URL
    const payFastUrl = `${baseUrl}?${queryString}`;

    return NextResponse.json({ url: payFastUrl });
  } catch (error) {
    console.error('Checkout error:', error);
    return NextResponse.json(
      { error: 'Error processing checkout' },
      { status: 500 }
    );
  }
} 