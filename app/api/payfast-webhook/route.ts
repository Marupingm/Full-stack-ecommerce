import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Order from '../../../models/Order';

export async function POST(req: Request) {
  try {
    const data = await req.formData();
    const payment_status = data.get('payment_status');
    const m_payment_id = data.get('m_payment_id');
    
    if (!m_payment_id) {
      return NextResponse.json({ error: 'No order ID provided' }, { status: 400 });
    }

    await connectDB();

    // Update order status based on PayFast payment status
    const status = payment_status === 'COMPLETE' ? 'paid' : 'failed';
    
    await Order.findOneAndUpdate(
      { orderId: m_payment_id },
      { status },
      { new: true }
    );

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('PayFast webhook error:', error);
    return NextResponse.json(
      { error: 'Error processing webhook' },
      { status: 500 }
    );
  }
} 