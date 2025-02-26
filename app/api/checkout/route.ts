import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Order from '@/app/models/Order';

export async function POST(req: Request) {
  try {
    const { cartDetails, shippingDetails, totalAmount } = await req.json();

    // Validate required fields
    if (!cartDetails || !shippingDetails || !totalAmount) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Connect to database
    await connectDB();

    // PayFast merchant details from environment variables
    const merchantId = process.env.NEXT_PUBLIC_PAYFAST_MERCHANT_ID;
    const merchantKey = process.env.NEXT_PUBLIC_PAYFAST_MERCHANT_KEY;

    if (!merchantId || !merchantKey) {
      console.error('Missing PayFast credentials');
      return NextResponse.json(
        { error: 'Payment gateway configuration error' },
        { status: 500 }
      );
    }

    // Create a unique payment ID
    const orderId = `ORDER-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`;

    // Calculate the amount in Rand (converting from cents)
    const amountInRand = Number((totalAmount / 100).toFixed(2));

    // Store order details in database
    const order = await Order.create({
      orderId,
      cartDetails,
      shippingDetails,
      totalAmount: amountInRand,
      status: 'pending'
    });

    // Always use sandbox URL for testing
    const baseUrl = 'https://sandbox.payfast.co.za/eng/process';

    // Get the item names from cart
    const itemNames = Object.values(cartDetails)
      .map(item => item.name)
      .join(', ');

    // Get the base URL for the application
    const appBaseUrl = process.env.NEXT_PUBLIC_API_URL || process.env.VERCEL_URL || 'http://localhost:3000';
    const apiUrl = appBaseUrl.startsWith('http') ? appBaseUrl : `https://${appBaseUrl}`;

    // Construct the payment data with all required fields
    const data = {
      merchant_id: merchantId,
      merchant_key: merchantKey,
      return_url: `${apiUrl}/success`,
      cancel_url: `${apiUrl}/cart`,
      notify_url: `${apiUrl}/api/payfast-webhook`,
      
      // Customer details
      name_first: shippingDetails.firstName,
      name_last: shippingDetails.lastName,
      email_address: shippingDetails.email,
      cell_number: '', // Optional
      
      // Transaction details
      m_payment_id: orderId,
      amount: amountInRand.toFixed(2),
      item_name: itemNames.substring(0, 100), // PayFast limits item_name to 100 characters
      item_description: `Order ${orderId}`,
      custom_str1: orderId,
      
      // Address details
      custom_str2: shippingDetails.address,
      custom_str3: shippingDetails.postalCode,
      
      // Test mode
      payment_method: 'cc',
    };

    // Log the PayFast request for debugging
    console.log('PayFast Request:', {
      baseUrl,
      ...data,
    });

    // Convert the data object to a query string
    const queryString = Object.entries(data)
      .filter(([_, value]) => value !== undefined && value !== null && value !== '')
      .map(([key, value]) => `${key}=${encodeURIComponent(String(value))}`)
      .join('&');

    // Construct the full PayFast URL
    const payFastUrl = `${baseUrl}?${queryString}`;

    return NextResponse.json({ 
      url: payFastUrl,
      orderId: orderId,
      amount: amountInRand
    });
  } catch (error) {
    console.error('Checkout error:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Error processing checkout' },
      { status: 500 }
    );
  }
} 