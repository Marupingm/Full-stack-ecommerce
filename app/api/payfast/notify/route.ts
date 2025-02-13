import { NextResponse } from 'next/server';
import { headers } from 'next/headers';

export async function POST(request: Request) {
  try {
    const headersList = headers();
    const data = await request.formData();
    
    // Convert formData to object for easier handling
    const payload = Object.fromEntries(data.entries());
    
    console.log('PayFast notification received:', payload);

    // Verify the payment status
    if (payload.payment_status === 'COMPLETE') {
      // Payment was successful
      // Here you would typically:
      // 1. Verify the signature (in production)
      // 2. Update your database with the order status
      // 3. Fulfill the order
      
      console.log('Payment successful:', {
        merchantPaymentId: payload.m_payment_id,
        payFastPaymentId: payload.pf_payment_id,
        amount: payload.amount_gross
      });
      
      return new NextResponse('OK', {
        status: 200,
        headers: {
          'Content-Type': 'text/plain',
        },
      });
    } else {
      console.log('Payment failed or status unknown:', payload);
      
      return new NextResponse('Payment status not complete', {
        status: 400,
        headers: {
          'Content-Type': 'text/plain',
        },
      });
    }
  } catch (error) {
    console.error('Error processing PayFast notification:', error);
    
    return new NextResponse('Error processing payment notification', {
      status: 500,
      headers: {
        'Content-Type': 'text/plain',
      },
    });
  }
} 