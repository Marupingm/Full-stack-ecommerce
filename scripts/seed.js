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

// Import Product model
const Product = require('../app/models/Product');

const products = [
  {
    name: "Nike Air VaporMax 2023 Flyknit",
    description: "Elevate your sneaker game to new heights with the latest evolution of the iconic Air VaporMax series. The 2023 Flyknit combines cutting-edge technology, exceptional comfort, and bold style. Its innovative Flyknit upper offers a second-skin fit, ensuring a snug yet breathable feel with every step. The renowned VaporMax sole unit delivers unparalleled cushioning and responsiveness, providing a smooth ride that's perfect for both athletic performance and street-style fashion.",
    price: 20000,
    category: "Men",
    images: [
      "/ProductOne/air-vapormax-2023-flyknit-herrenschuh-xgCQsr.jpeg",
      "/ProductOne/3ee3420f-0395-47e9-b852-65c9e04a877d.webp",
      "/ProductOne/600e6348-ab0e-4de4-9936-60a98594254f.webp"
    ],
    sizes: ["US 7", "US 8", "US 9", "US 10", "US 11"]
  },
  {
    name: "Nike Sportswear Phoenix Fleece",
    description: "Crafted with a blend of warmth and style, the Phoenix Fleece is a versatile addition to your wardrobe. Its soft and cozy fleece fabric offers a perfect balance of comfort and durability, making it ideal for cool days and relaxed outings. With a modern, sporty design and the iconic Nike Swoosh, this fleece adds a touch of urban flair to your look. Whether you're hitting the gym or hanging out with friends, the Nike Sportswear Phoenix Fleece keeps you both cozy and stylish.",
    price: 3500,
    category: "Women",
    images: [
      "/ProductTwo/795c66fd-1efc-4fb3-95c8-455ae2d390e9.png",
      "/ProductTwo/af318846-4fcb-4b8f-b13c-f7ddfe17d519.webp"
    ],
    sizes: ["XS", "S", "M", "L", "XL"]
  },
  {
    name: "Nike Air Force 1 '07",
    description: "The Nike Air Force 1 '07 represents a legend in the world of sneakers. With a design that transcends generations, this classic silhouette has remained a symbol of street-style culture for over three decades. Its white leather upper and clean lines are a canvas for self-expression, allowing you to pair it with any outfit, from casual to chic.",
    price: 8500,
    category: "Teens",
    images: [
      "/ProductThree/0453f3b6-c33b-44a6-bd68-3732ac2b8bf2.jpg",
      "/ProductThree/72a3b44a-3e4c-44b7-b614-835b9d28bcc9.webp",
      "/ProductThree/3811255b-206e-4fd2-9477-1739c97ecc80.webp"
    ],
    sizes: ["US 6", "US 7", "US 8", "US 9", "US 10"]
  },
  {
    name: "Nike Windrunner",
    description: "The Nike Windrunner is more than just a jacket; it's a symbol of enduring style and performance. With a design that has stood the test of time, this lightweight and versatile outerwear piece is your go-to choice for brisk mornings, breezy afternoons, and everything in between. Its distinctive chevron design on the chest pays homage to its heritage, while the modern materials and construction ensure it's ready for the demands of today.",
    price: 20000,
    category: "Men",
    images: [
      "/ProductFour/windrunner-herren-laufjacke-k4q9TV (1).jpeg",
      "/ProductFour/939da2cf-40ac-4963-ae88-a9098fd32929.jpg",
      "/ProductFour/2214184d-d5ab-4ac6-aac8-5670a08bb373.webp"
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