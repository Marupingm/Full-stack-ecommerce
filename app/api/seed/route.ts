import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Product from '@/app/models/Product';

const products = [
  // Men's Products (10)
  {
    name: "Nike Air VaporMax 2023 Flyknit",
    description: "Elevate your sneaker game with the latest evolution of the iconic Air VaporMax series.",
    price: 20000,
    category: "Men",
    images: ["https://images.unsplash.com/photo-1542291026-7eec264c27ff", "https://images.unsplash.com/photo-1600185365483-26d7a4cc7519"],
    sizes: ["US 7", "US 8", "US 9", "US 10", "US 11"]
  },
  {
    name: "Nike Windrunner Jacket",
    description: "A lightweight and versatile outerwear piece for any weather condition.",
    price: 12000,
    category: "Men",
    images: ["https://images.unsplash.com/photo-1551028719-00167b16eac5", "https://images.unsplash.com/photo-1617952236317-0bd127407984"],
    sizes: ["S", "M", "L", "XL", "XXL"]
  },
  {
    name: "Nike Dri-FIT Training Shirt",
    description: "Stay cool and dry during intense workouts with this premium training shirt.",
    price: 3500,
    category: "Men",
    images: ["https://images.unsplash.com/photo-1581655353564-df123a1eb820", "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a"],
    sizes: ["S", "M", "L", "XL"]
  },
  {
    name: "Nike Tech Fleece Pants",
    description: "Premium comfort meets modern style in these innovative fleece pants.",
    price: 8500,
    category: "Men",
    images: ["https://images.unsplash.com/photo-1624006389438-c03488175975", "https://images.unsplash.com/photo-1605518216938-7c31b7b14ad0"],
    sizes: ["S", "M", "L", "XL"]
  },
  {
    name: "Nike Metcon 8",
    description: "The ultimate training shoe for CrossFit and high-intensity workouts.",
    price: 13000,
    category: "Men",
    images: ["https://images.unsplash.com/photo-1539185441755-769473a23570", "https://images.unsplash.com/photo-1579338559194-a162d19bf842"],
    sizes: ["US 7", "US 8", "US 9", "US 10", "US 11"]
  },
  {
    name: "Nike Dri-FIT Basketball Jersey",
    description: "Professional-grade basketball jersey with moisture-wicking technology.",
    price: 5500,
    category: "Men",
    images: ["https://images.unsplash.com/photo-1519861531473-9200262188bf", "https://images.unsplash.com/photo-1519861531473-9200262188bf"],
    sizes: ["S", "M", "L", "XL"]
  },
  {
    name: "Nike ACG Hiking Boots",
    description: "Durable and comfortable boots for all your outdoor adventures.",
    price: 16000,
    category: "Men",
    images: ["https://images.unsplash.com/photo-1520639888713-7851133b1ed0", "https://images.unsplash.com/photo-1460353581641-37baddab0fa2"],
    sizes: ["US 7", "US 8", "US 9", "US 10", "US 11"]
  },
  {
    name: "Nike Pro Compression Tights",
    description: "Maximum support and comfort for intense training sessions.",
    price: 6000,
    category: "Men",
    images: ["https://images.unsplash.com/photo-1618354691792-d1d42acfd860", "https://images.unsplash.com/photo-1617113930975-f9c7243ae527"],
    sizes: ["S", "M", "L", "XL"]
  },
  {
    name: "Nike Golf Polo",
    description: "Classic style meets modern performance in this premium golf polo.",
    price: 7000,
    category: "Men",
    images: ["https://images.unsplash.com/photo-1593079831268-3381b0db4a77", "https://images.unsplash.com/photo-1576566588028-4147f3842f27"],
    sizes: ["S", "M", "L", "XL"]
  },
  {
    name: "Nike SB Skate Shoes",
    description: "Professional-grade skate shoes with enhanced durability.",
    price: 9000,
    category: "Men",
    images: ["https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77", "https://images.unsplash.com/photo-1600269452121-4f2416e55c28"],
    sizes: ["US 7", "US 8", "US 9", "US 10", "US 11"]
  },

  // Women's Products (10)
  {
    name: "Nike Air Zoom Pegasus",
    description: "The perfect running companion with responsive cushioning.",
    price: 12000,
    category: "Women",
    images: ["https://images.unsplash.com/photo-1560769629-975ec94e6a86", "https://images.unsplash.com/photo-1582588678413-dbf45f4823e9"],
    sizes: ["US 6", "US 7", "US 8", "US 9", "US 10"]
  },
  {
    name: "Nike One Leggings",
    description: "Versatile leggings for training and everyday wear.",
    price: 5500,
    category: "Women",
    images: ["https://images.unsplash.com/photo-1506629082955-511b1aa562c8", "https://images.unsplash.com/photo-1604644401890-0bd678c83788"],
    sizes: ["XS", "S", "M", "L", "XL"]
  },
  {
    name: "Nike Sports Bra",
    description: "High-support sports bra for intense workouts.",
    price: 4000,
    category: "Women",
    images: ["https://images.unsplash.com/photo-1571945153237-4929e783af4a", "https://images.unsplash.com/photo-1620799140408-edc6dcb6d633"],
    sizes: ["XS", "S", "M", "L", "XL"]
  },
  {
    name: "Nike Yoga Flow Top",
    description: "Soft and breathable top perfect for yoga sessions.",
    price: 3500,
    category: "Women",
    images: ["https://images.unsplash.com/photo-1515775356328-747517ee6cd4", "https://images.unsplash.com/photo-1518459031867-a89b944bffe4"],
    sizes: ["XS", "S", "M", "L", "XL"]
  },
  {
    name: "Nike Running Shorts",
    description: "Lightweight shorts with built-in compression.",
    price: 4500,
    category: "Women",
    images: ["https://images.unsplash.com/photo-1539008835657-9e8e9680c956", "https://images.unsplash.com/photo-1606902965551-dce093cda6e7"],
    sizes: ["XS", "S", "M", "L", "XL"]
  },
  {
    name: "Nike Training Jacket",
    description: "Versatile jacket for pre and post-workout coverage.",
    price: 8000,
    category: "Women",
    images: ["https://images.unsplash.com/photo-1544367567-0f2fcb009e0b", "https://images.unsplash.com/photo-1618354691438-25bc04584c23"],
    sizes: ["XS", "S", "M", "L", "XL"]
  },
  {
    name: "Nike Free Run",
    description: "Natural running feel with flexible cushioning.",
    price: 11000,
    category: "Women",
    images: ["https://images.unsplash.com/photo-1600185365926-3a2ce3cdb9eb", "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a"],
    sizes: ["US 6", "US 7", "US 8", "US 9", "US 10"]
  },
  {
    name: "Nike Tennis Dress",
    description: "Performance dress with built-in shorts for court coverage.",
    price: 7500,
    category: "Women",
    images: ["https://images.unsplash.com/photo-1618354691373-d851c5c3a990", "https://images.unsplash.com/photo-1617113930975-f9c7243ae527"],
    sizes: ["XS", "S", "M", "L", "XL"]
  },
  {
    name: "Nike Fleece Hoodie",
    description: "Cozy hoodie for cool-weather comfort.",
    price: 6500,
    category: "Women",
    images: ["https://images.unsplash.com/photo-1556821840-3a63f95609a7", "https://images.unsplash.com/photo-1572495641004-28288cb6d4d3"],
    sizes: ["XS", "S", "M", "L", "XL"]
  },
  {
    name: "Nike Studio Shoes",
    description: "Versatile training shoes for studio workouts.",
    price: 9500,
    category: "Women",
    images: ["https://images.unsplash.com/photo-1595341888016-a392ef81b7de", "https://images.unsplash.com/photo-1584735175315-9d5df23860e6"],
    sizes: ["US 6", "US 7", "US 8", "US 9", "US 10"]
  },

  // Teens Products (10)
  {
    name: "Nike Air Force 1",
    description: "Classic style reimagined for the next generation.",
    price: 8500,
    category: "Teens",
    images: ["https://images.unsplash.com/photo-1600269452121-4f2416e55c28", "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a"],
    sizes: ["US 3.5", "US 4", "US 4.5", "US 5", "US 5.5"]
  },
  {
    name: "Nike Graphic Tee",
    description: "Bold graphics on soft, comfortable cotton.",
    price: 2500,
    category: "Teens",
    images: ["https://images.unsplash.com/photo-1576566588028-4147f3842f27", "https://images.unsplash.com/photo-1529374255404-311a2a4f1fd9"],
    sizes: ["XS", "S", "M", "L"]
  },
  {
    name: "Nike Tech Fleece Hoodie",
    description: "Warm and stylish hoodie for everyday wear.",
    price: 7000,
    category: "Teens",
    images: ["https://images.unsplash.com/photo-1556821840-3a63f95609a7", "https://images.unsplash.com/photo-1572495641004-28288cb6d4d3"],
    sizes: ["XS", "S", "M", "L"]
  },
  {
    name: "Nike Training Shorts",
    description: "Comfortable shorts for sports and casual wear.",
    price: 3500,
    category: "Teens",
    images: ["https://images.unsplash.com/photo-1539008835657-9e8e9680c956", "https://images.unsplash.com/photo-1606902965551-dce093cda6e7"],
    sizes: ["XS", "S", "M", "L"]
  },
  {
    name: "Nike Zoom Basketball Shoes",
    description: "Responsive cushioning for the court.",
    price: 9500,
    category: "Teens",
    images: ["https://images.unsplash.com/photo-1542291026-7eec264c27ff", "https://images.unsplash.com/photo-1607522370275-f14206abe5d3"],
    sizes: ["US 3.5", "US 4", "US 4.5", "US 5", "US 5.5"]
  },
  {
    name: "Nike Backpack",
    description: "Durable backpack with plenty of storage.",
    price: 4500,
    category: "Teens",
    images: ["https://images.unsplash.com/photo-1553062407-98eeb64c6a62", "https://images.unsplash.com/photo-1622560480605-d83c853bc5c3"],
    sizes: ["One Size"]
  },
  {
    name: "Nike Soccer Cleats",
    description: "Lightweight cleats for optimal field performance.",
    price: 8000,
    category: "Teens",
    images: ["https://images.unsplash.com/photo-1511886929837-354d827aae26", "https://images.unsplash.com/photo-1628351721795-d5f2e86c289c"],
    sizes: ["US 3.5", "US 4", "US 4.5", "US 5", "US 5.5"]
  },
  {
    name: "Nike Training Pants",
    description: "Comfortable pants for training and casual wear.",
    price: 5500,
    category: "Teens",
    images: ["https://images.unsplash.com/photo-1624006389438-c03488175975", "https://images.unsplash.com/photo-1605518216938-7c31b7b14ad0"],
    sizes: ["XS", "S", "M", "L"]
  },
  {
    name: "Nike Running Shoes",
    description: "Lightweight and comfortable for daily runs.",
    price: 8500,
    category: "Teens",
    images: ["https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a", "https://images.unsplash.com/photo-1584735175315-9d5df23860e6"],
    sizes: ["US 3.5", "US 4", "US 4.5", "US 5", "US 5.5"]
  },
  {
    name: "Nike Sports Bag",
    description: "Spacious bag for all your sports gear.",
    price: 4000,
    category: "Teens",
    images: ["https://images.unsplash.com/photo-1553062407-98eeb64c6a62", "https://images.unsplash.com/photo-1622560480605-d83c853bc5c3"],
    sizes: ["One Size"]
  }
];

export async function GET() {
  try {
    console.log('Starting database seeding...');
    await connectDB();
    
    // Clear existing products
    const deleteResult = await Product.deleteMany({});
    console.log('Cleared existing products:', deleteResult);

    // Insert new products
    const insertedProducts = await Product.insertMany(products);
    console.log(`Successfully seeded ${insertedProducts.length} products`);

    return NextResponse.json({
      success: true,
      message: `Successfully seeded ${insertedProducts.length} products`,
      products: insertedProducts.map(p => ({ id: p._id, name: p.name }))
    });
  } catch (error) {
    console.error('Error seeding database:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: error instanceof Error ? error.message : 'Unknown error occurred' 
      },
      { status: 500 }
    );
  }
} 
