import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Product from '@/models/Product';

export async function GET() {
  try {
    await connectDB();
    
    // Test product data
    const testProduct = {
      name: "Test Product",
      description: "This is a test product to verify MongoDB connection",
      price: 99.99,
      category: "Test",
      images: ["https://example.com/test-image.jpg"],
      sizes: ["S", "M", "L"],
      inStock: true
    };

    // Try to create a test product
    const product = await Product.create(testProduct);

    return NextResponse.json({ 
      message: "MongoDB connection successful", 
      product 
    });
  } catch (error: any) {
    console.error('MongoDB connection error:', error);
    return NextResponse.json(
      { 
        error: 'Failed to connect to MongoDB', 
        details: error?.message || 'Unknown error'
      },
      { status: 500 }
    );
  }
} 