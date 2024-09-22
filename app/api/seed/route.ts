import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Product from '@/models/Product';

const menProducts = [
  {
    name: "Classic Denim Jacket",
    description: "A timeless denim jacket perfect for any casual outfit. Made with high-quality cotton denim.",
    price: 89.99,
    category: "Men",
    images: ["https://images.unsplash.com/photo-1516257984-b1b4d707412e?q=80&w=1000&auto=format&fit=crop"],
    sizes: ["S", "M", "L", "XL"],
    inStock: true
  },
  {
    name: "Premium Cotton T-Shirt",
    description: "Soft and comfortable cotton t-shirt with a modern fit.",
    price: 29.99,
    category: "Men",
    images: ["https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?q=80&w=1000&auto=format&fit=crop"],
    sizes: ["S", "M", "L", "XL", "XXL"],
    inStock: true
  },
  {
    name: "Slim Fit Chinos",
    description: "Modern slim fit chinos perfect for both casual and semi-formal occasions.",
    price: 59.99,
    category: "Men",
    images: ["https://images.unsplash.com/photo-1473966968600-fa801b869a1a?q=80&w=1000&auto=format&fit=crop"],
    sizes: ["S", "M", "L", "XL"],
    inStock: true
  },
  {
    name: "Leather Bomber Jacket",
    description: "Classic leather bomber jacket with a modern twist.",
    price: 199.99,
    category: "Men",
    images: ["https://images.unsplash.com/photo-1520975954732-35dd22299614?q=80&w=1000&auto=format&fit=crop"],
    sizes: ["M", "L", "XL"],
    inStock: true
  },
  {
    name: "Wool Blend Sweater",
    description: "Warm and stylish wool blend sweater perfect for cold weather.",
    price: 79.99,
    category: "Men",
    images: ["https://images.unsplash.com/photo-1614031679232-0dae776a72ee?q=80&w=1000&auto=format&fit=crop"],
    sizes: ["S", "M", "L", "XL"],
    inStock: true
  }
];

const womenProducts = [
  {
    name: "Floral Summer Dress",
    description: "Light and breezy floral dress perfect for summer days.",
    price: 69.99,
    category: "Women",
    images: ["https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?q=80&w=1000&auto=format&fit=crop"],
    sizes: ["XS", "S", "M", "L"],
    inStock: true
  },
  {
    name: "High-Waisted Jeans",
    description: "Comfortable high-waisted jeans with a perfect fit.",
    price: 79.99,
    category: "Women",
    images: ["https://images.unsplash.com/photo-1541099649105-f69ad21f3246?q=80&w=1000&auto=format&fit=crop"],
    sizes: ["XS", "S", "M", "L", "XL"],
    inStock: true
  },
  {
    name: "Silk Blouse",
    description: "Elegant silk blouse suitable for both office and evening wear.",
    price: 89.99,
    category: "Women",
    images: ["https://images.unsplash.com/photo-1604336755604-65f1d8a675c3?q=80&w=1000&auto=format&fit=crop"],
    sizes: ["S", "M", "L"],
    inStock: true
  },
  {
    name: "Leather Tote Bag",
    description: "Spacious leather tote bag with multiple compartments.",
    price: 129.99,
    category: "Women",
    images: ["https://images.unsplash.com/photo-1590874103328-eac38a683ce7?q=80&w=1000&auto=format&fit=crop"],
    sizes: ["Regular"],
    inStock: true
  },
  {
    name: "Cashmere Cardigan",
    description: "Luxurious cashmere cardigan for ultimate comfort and style.",
    price: 149.99,
    category: "Women",
    images: ["https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?q=80&w=1000&auto=format&fit=crop"],
    sizes: ["S", "M", "L"],
    inStock: true
  }
];

const teensProducts = [
  {
    name: "Graphic Hoodie",
    description: "Cool and comfortable hoodie with trendy graphic design.",
    price: 49.99,
    category: "Teens",
    images: ["https://images.unsplash.com/photo-1556821840-3a63f95609a7?q=80&w=1000&auto=format&fit=crop"],
    sizes: ["S", "M", "L"],
    inStock: true
  },
  {
    name: "Ripped Skinny Jeans",
    description: "Stylish ripped skinny jeans for a modern look.",
    price: 59.99,
    category: "Teens",
    images: ["https://images.unsplash.com/photo-1541099649105-f69ad21f3246?q=80&w=1000&auto=format&fit=crop"],
    sizes: ["XS", "S", "M", "L"],
    inStock: true
  },
  {
    name: "Vintage Band T-Shirt",
    description: "Cool vintage-style band t-shirt for music lovers.",
    price: 34.99,
    category: "Teens",
    images: ["https://images.unsplash.com/photo-1503342394128-c104d54dba01?q=80&w=1000&auto=format&fit=crop"],
    sizes: ["S", "M", "L"],
    inStock: true
  },
  {
    name: "Canvas Backpack",
    description: "Durable canvas backpack with laptop compartment.",
    price: 45.99,
    category: "Teens",
    images: ["https://images.unsplash.com/photo-1553062407-98eeb64c6a62?q=80&w=1000&auto=format&fit=crop"],
    sizes: ["Regular"],
    inStock: true
  },
  {
    name: "Platform Sneakers",
    description: "Trendy platform sneakers for a bold look.",
    price: 69.99,
    category: "Teens",
    images: ["https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?q=80&w=1000&auto=format&fit=crop"],
    sizes: ["EU36", "EU37", "EU38", "EU39", "EU40"],
    inStock: true
  }
];

export async function GET() {
  try {
    await connectDB();
    
    // Clear existing products
    await Product.deleteMany({});
    
    // Insert all products
    const allProducts = [...menProducts, ...womenProducts, ...teensProducts];
    await Product.insertMany(allProducts);
    
    return NextResponse.json({ 
      message: 'Database seeded successfully',
      productCount: allProducts.length
    });
  } catch (error) {
    console.error('Error seeding database:', error);
    return NextResponse.json(
      { error: 'Failed to seed database', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
} // Modified on 2025-02-19 00:50:49
// Modified on 2025-02-19 00:52:39
