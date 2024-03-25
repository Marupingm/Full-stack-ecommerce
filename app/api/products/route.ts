import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Product, { IProduct } from '@/models/Product';

export async function GET() {
  try {
    await connectDB();
    const products = await Product.find({}).lean();
    return NextResponse.json(products);
  } catch (error) {
    console.error('Failed to fetch products:', error);
    return NextResponse.json(
      { error: 'Failed to fetch products' },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    await connectDB();
    const data = await request.json();
    const product = await Product.create(data);
    return NextResponse.json(product, { status: 201 });
  } catch (error) {
    console.error('Failed to create product:', error);
    return NextResponse.json(
      { error: 'Failed to create product' },
      { status: 500 }
    );
  }
} // Modified on 2025-02-19 00:50:45
