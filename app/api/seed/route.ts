import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Product from '@/models/Product';
import mongoose from 'mongoose';

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
  },
  {
    name: "Tailored Suit Blazer",
    description: "Sophisticated suit blazer perfect for formal occasions and business meetings.",
    price: 249.99,
    category: "Men",
    images: ["https://images.unsplash.com/photo-1507679799987-c73779587ccf?q=80&w=1000&auto=format&fit=crop"],
    sizes: ["S", "M", "L", "XL"],
    inStock: true
  },
  {
    name: "Athletic Performance Shorts",
    description: "Breathable and flexible shorts designed for maximum comfort during workouts.",
    price: 34.99,
    category: "Men",
    images: ["https://images.unsplash.com/photo-1562886877-77a1cb370d5b?q=80&w=1000&auto=format&fit=crop"],
    sizes: ["S", "M", "L", "XL"],
    inStock: true
  },
  {
    name: "Casual Oxford Shirt",
    description: "Classic Oxford button-down shirt suitable for both casual and semi-formal wear.",
    price: 54.99,
    category: "Men",
    images: ["https://images.unsplash.com/photo-1598032895397-b9472444bf93?q=80&w=1000&auto=format&fit=crop"],
    sizes: ["S", "M", "L", "XL"],
    inStock: true
  },
  {
    name: "Quilted Winter Vest",
    description: "Lightweight yet warm quilted vest perfect for layering in cold weather.",
    price: 69.99,
    category: "Men",
    images: ["https://images.unsplash.com/photo-1557771884-709f5996687c?q=80&w=1000&auto=format&fit=crop"],
    sizes: ["M", "L", "XL"],
    inStock: true
  },
  {
    name: "Cargo Pants",
    description: "Versatile cargo pants with multiple pockets for practical everyday wear.",
    price: 64.99,
    category: "Men",
    images: ["https://images.unsplash.com/photo-1517940310602-26535839fe84?q=80&w=1000&auto=format&fit=crop"],
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
  },
  {
    name: "Pleated Midi Skirt",
    description: "Elegant pleated midi skirt perfect for any occasion.",
    price: 59.99,
    category: "Women",
    images: ["https://images.unsplash.com/photo-1583496661160-029a0a18b917?q=80&w=1000&auto=format&fit=crop"],
    sizes: ["XS", "S", "M", "L"],
    inStock: true
  },
  {
    name: "Blazer Dress",
    description: "Sophisticated blazer dress for a powerful professional look.",
    price: 119.99,
    category: "Women",
    images: ["https://images.unsplash.com/photo-1548624149-f20a5fa4d685?q=80&w=1000&auto=format&fit=crop"],
    sizes: ["S", "M", "L"],
    inStock: true
  },
  {
    name: "Yoga Leggings",
    description: "High-performance yoga leggings with moisture-wicking fabric.",
    price: 49.99,
    category: "Women",
    images: ["https://images.unsplash.com/photo-1506629082955-511b1aa562c8?q=80&w=1000&auto=format&fit=crop"],
    sizes: ["XS", "S", "M", "L"],
    inStock: true
  },
  {
    name: "Bohemian Maxi Dress",
    description: "Flowing bohemian maxi dress with intricate patterns.",
    price: 89.99,
    category: "Women",
    images: ["https://images.unsplash.com/photo-1496747611176-843222e1e57c?q=80&w=1000&auto=format&fit=crop"],
    sizes: ["S", "M", "L"],
    inStock: true
  },
  {
    name: "Cropped Denim Jacket",
    description: "Trendy cropped denim jacket perfect for layering.",
    price: 69.99,
    category: "Women",
    images: ["https://images.unsplash.com/photo-1523205771623-e0faa4d2813d?q=80&w=1000&auto=format&fit=crop"],
    sizes: ["XS", "S", "M", "L"],
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
  },
  {
    name: "Oversized Denim Jacket",
    description: "Trendy oversized denim jacket with distressed details.",
    price: 79.99,
    category: "Teens",
    images: ["https://images.unsplash.com/photo-1544642899-f0d6e5f6ed6f?q=80&w=1000&auto=format&fit=crop"],
    sizes: ["S", "M", "L"],
    inStock: true
  },
  {
    name: "Cargo Joggers",
    description: "Comfortable cargo joggers with multiple pockets.",
    price: 44.99,
    category: "Teens",
    images: ["https://images.unsplash.com/photo-1552902865-b72c031ac5ea?q=80&w=1000&auto=format&fit=crop"],
    sizes: ["XS", "S", "M", "L"],
    inStock: true
  },
  {
    name: "Tie-Dye Crop Top",
    description: "Colorful tie-dye crop top for a fun summer look.",
    price: 29.99,
    category: "Teens",
    images: ["https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?q=80&w=1000&auto=format&fit=crop"],
    sizes: ["S", "M", "L"],
    inStock: true
  },
  {
    name: "High-Top Canvas Shoes",
    description: "Classic high-top canvas shoes with modern details.",
    price: 54.99,
    category: "Teens",
    images: ["https://images.unsplash.com/photo-1542280756-74b2f55e73ab?q=80&w=1000&auto=format&fit=crop"],
    sizes: ["EU36", "EU37", "EU38", "EU39", "EU40"],
    inStock: true
  },
  {
    name: "Bucket Hat",
    description: "Trendy bucket hat with embroidered details.",
    price: 24.99,
    category: "Teens",
    images: ["https://images.unsplash.com/photo-1556306535-0f09a537f0a3?q=80&w=1000&auto=format&fit=crop"],
    sizes: ["One Size"],
    inStock: true
  }
];

// Function to get a random fashion image URL
function getRandomFashionImage(category: string): string {
  const images = {
    Men: [
      "https://images.unsplash.com/photo-1516257984-b1b4d707412e",
      "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab",
      "https://images.unsplash.com/photo-1507679799987-c73779587ccf",
      "https://images.unsplash.com/photo-1617137968427-85924c800a22",
      "https://images.unsplash.com/photo-1617127365659-c47fa864d8bc"
    ],
    Women: [
      "https://images.unsplash.com/photo-1515372039744-b8f02a3ae446",
      "https://images.unsplash.com/photo-1604336755604-65f1d8a675c3",
      "https://images.unsplash.com/photo-1583496661160-029a0a18b917",
      "https://images.unsplash.com/photo-1548624149-f20a5fa4d685",
      "https://images.unsplash.com/photo-1506629082955-511b1aa562c8"
    ],
    Teens: [
      "https://images.unsplash.com/photo-1556821840-3a63f95609a7",
      "https://images.unsplash.com/photo-1503342394128-c104d54dba01",
      "https://images.unsplash.com/photo-1552902865-b72c031ac5ea",
      "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c",
      "https://images.unsplash.com/photo-1542280756-74b2f55e73ab"
    ]
  };

  const categoryImages = images[category as keyof typeof images] || images.Men;
  return `${categoryImages[Math.floor(Math.random() * categoryImages.length)]}?q=80&w=1000&auto=format&fit=crop`;
}

export async function GET() {
  try {
    console.log('Starting database seeding process...');
    
    // Connect to MongoDB
    await connectDB();
    console.log('Connected to MongoDB, starting seeding...');
    
    // Clear existing products
    console.log('Clearing existing products...');
    await Product.deleteMany({});
    console.log('Cleared existing products');
    
    // Process products to ensure they have valid images
    const allProducts = [...menProducts, ...womenProducts, ...teensProducts].map(product => ({
      ...product,
      images: product.images && product.images.length > 0 && product.images[0]
        ? product.images
        : [getRandomFashionImage(product.category)]
    }));
    
    // Insert all products
    console.log('Inserting new products...');
    const insertResult = await Product.insertMany(allProducts);
    console.log('Inserted products:', insertResult.length);
    
    return NextResponse.json({ 
      message: 'Database seeded successfully',
      productCount: insertResult.length
    });
  } catch (error) {
    console.error('Error seeding database:', {
      name: error instanceof Error ? error.name : 'Unknown error',
      message: error instanceof Error ? error.message : 'Unknown error message',
      stack: error instanceof Error ? error.stack : undefined
    });
    
    return NextResponse.json(
      { 
        error: 'Failed to seed database', 
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
} 
