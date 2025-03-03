const mongoose = require('mongoose');
const dotenv = require('dotenv');
const path = require('path');

// Load environment variables
const envPath = path.join(__dirname, '..', '.env');

try {
  const envConfig = dotenv.config({ path: envPath });
  if (envConfig.error) {
    throw new Error(`Error loading .env file: ${envConfig.error.message}`);
  }
  console.log('Environment variables loaded successfully');
} catch (error) {
  console.error('Error loading environment variables:', error);
  process.exit(1);
}

// Verify MongoDB URI is available
const MONGODB_URI = process.env.MONGODB_URI;
if (!MONGODB_URI) {
  console.error('MONGODB_URI environment variable is not defined');
  process.exit(1);
}

// Import Product model after environment variables are loaded
const Product = require('../app/models/Product');

const products = [
  {
    name: "Nike Air VaporMax 2023 Flyknit",
    description: "Elevate your sneaker game to new heights with the latest evolution of the iconic Air VaporMax series. The 2023 Flyknit combines cutting-edge technology, exceptional comfort, and bold style. Its innovative Flyknit upper offers a second-skin fit, ensuring a snug yet breathable feel with every step. The renowned VaporMax sole unit delivers unparalleled cushioning and responsiveness, providing a smooth ride that's perfect for both athletic performance and street-style fashion.",
    price: 20000,
    category: "Men",
    images: [
      "/ProductOne/1.png",
      "/ProductOne/2.png",
      "/ProductOne/3.png",
      "/ProductOne/4.png"
    ],
    sizes: ["US 7", "US 8", "US 9", "US 10", "US 11"]
  },
  {
    name: "Nike Sportswear Phoenix Fleece",
    description: "Crafted with a blend of warmth and style, the Phoenix Fleece is a versatile addition to your wardrobe. Its soft and cozy fleece fabric offers a perfect balance of comfort and durability, making it ideal for cool days and relaxed outings. With a modern, sporty design and the iconic Nike Swoosh, this fleece adds a touch of urban flair to your look. Whether you're hitting the gym or hanging out with friends, the Nike Sportswear Phoenix Fleece keeps you both cozy and stylish.",
    price: 3500,
    category: "Women",
    images: [
      "/ProductTwo/1.png",
      "/ProductTwo/2.png",
      "/ProductTwo/3.png",
      "/ProductTwo/4.png"
    ],
    sizes: ["XS", "S", "M", "L", "XL"]
  },
  {
    name: "Nike Air Force 1 '07",
    description: "The Nike Air Force 1 '07 represents a legend in the world of sneakers. With a design that transcends generations, this classic silhouette has remained a symbol of street-style culture for over three decades. Its white leather upper and clean lines are a canvas for self-expression, allowing you to pair it with any outfit, from casual to chic.",
    price: 8500,
    category: "Teens",
    images: [
      "/ProductThree/1.png",
      "/ProductThree/2.png",
      "/ProductThree/3.png",
      "/ProductThree/4.png"
    ],
    sizes: ["US 6", "US 7", "US 8", "US 9", "US 10"]
  },
  {
    name: "Nike Windrunner",
    description: "The Nike Windrunner is more than just a jacket; it's a symbol of enduring style and performance. With a design that has stood the test of time, this lightweight and versatile outerwear piece is your go-to choice for brisk mornings, breezy afternoons, and everything in between. Its distinctive chevron design on the chest pays homage to its heritage, while the modern materials and construction ensure it's ready for the demands of today.",
    price: 20000,
    category: "Men",
    images: [
      "/ProductFour/1.png",
      "/ProductFour/2.png",
      "/ProductFour/3.png",
      "/ProductFour/4.png"
    ],
    sizes: ["S", "M", "L", "XL", "XXL"]
  }
];

async function seedProducts() {
  try {
    console.log('Starting database connection...');
    // Connect directly using mongoose
    await mongoose.connect(MONGODB_URI);
    console.log('Database connected successfully');

    // Clear existing products
    const deleteResult = await Product.deleteMany({});
    console.log('Cleared existing products:', deleteResult);

    // Insert new products
    const insertedProducts = await Product.insertMany(products);
    console.log(`Successfully seeded ${insertedProducts.length} products`);

    // Log the inserted products
    console.log('Seeded products:', insertedProducts.map(p => ({ id: p._id, name: p.name })));

    // Verify products were inserted
    const count = await Product.countDocuments();
    console.log(`Total products in database: ${count}`);

    return true;
  } catch (error) {
    if (error instanceof Error) {
      console.error('Error details:', {
        name: error.name,
        message: error.message,
        stack: error.stack
      });
    } else {
      console.error('An unknown error occurred:', error);
    }
    throw error;
  } finally {
    // Ensure we close the connection
    if (mongoose.connection.readyState === 1) {
      console.log('Closing database connection...');
      await mongoose.disconnect();
      console.log('Database connection closed');
    }
    process.exit(0);
  }
}

// Run the seed function
seedProducts()
  .catch((error) => {
    console.error('Seeding failed:', error);
    process.exit(1);
  }); 