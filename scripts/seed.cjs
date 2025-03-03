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

// Define Product Schema
const ProductSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  category: {
    type: String,
    required: true,
    enum: ['Men', 'Women', 'Teens']
  },
  images: {
    type: [String],
    required: true,
  },
  sizes: {
    type: [String],
    required: true,
    validate: {
      validator: function(v) {
        return v.length > 0;
      },
      message: 'At least one size is required'
    }
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  }
});

// Update the updatedAt field on save
ProductSchema.pre('save', function(next) {
  this.updatedAt = new Date();
  next();
});

// Create Product model
const Product = mongoose.models.Product || mongoose.model('Product', ProductSchema);

const products = [
  {
    name: "Nike Air VaporMax 2023 Flyknit",
    description: "Elevate your sneaker game to new heights with the latest evolution of the iconic Air VaporMax series. The 2023 Flyknit combines cutting-edge technology, exceptional comfort, and bold style.",
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
    description: "Crafted with a blend of warmth and style, the Phoenix Fleece is a versatile addition to your wardrobe.",
    price: 3500,
    category: "Women",
    images: [
      "/ProductTwo/af318846-4fcb-4b8f-b13c-f7ddfe17d519.webp",
      "/ProductTwo/795c66fd-1efc-4fb3-95c8-455ae2d390e9.png"
    ],
    sizes: ["XS", "S", "M", "L", "XL"]
  },
  {
    name: "Nike Air Force 1 '07",
    description: "The Nike Air Force 1 '07 represents a legend in the world of sneakers.",
    price: 8500,
    category: "Teens",
    images: [
      "/ProductThree/72a3b44a-3e4c-44b7-b614-835b9d28bcc9.webp",
      "/ProductThree/0453f3b6-c33b-44a6-bd68-3732ac2b8bf2.jpg",
      "/ProductThree/3811255b-206e-4fd2-9477-1739c97ecc80.webp"
    ],
    sizes: ["US 6", "US 7", "US 8", "US 9", "US 10"]
  },
  {
    name: "Nike Windrunner",
    description: "The Nike Windrunner is more than just a jacket; it's a symbol of enduring style and performance.",
    price: 20000,
    category: "Men",
    images: [
      "/ProductFour/windrunner-herren-laufjacke-k4q9TV (1).jpeg",
      "/ProductFour/939da2cf-40ac-4963-ae88-a9098fd32929.jpg",
      "/ProductFour/2214184d-d5ab-4ac6-aac8-5670a08bb373.webp"
    ],
    sizes: ["S", "M", "L", "XL", "XXL"]
  },
  {
    name: "Nike Dri-FIT Element",
    description: "A versatile running top that keeps you cool and comfortable during your workouts.",
    price: 4500,
    category: "Men",
    images: [
      "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=800",
      "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=500"
    ],
    sizes: ["S", "M", "L", "XL"]
  },
  {
    name: "Nike Tech Fleece Joggers",
    description: "Premium comfort meets modern style in these innovative Tech Fleece pants.",
    price: 7500,
    category: "Men",
    images: [
      "https://images.unsplash.com/photo-1584539696499-bff0b4768e4e?w=800",
      "https://images.unsplash.com/photo-1584539696499-bff0b4768e4e?w=500"
    ],
    sizes: ["S", "M", "L", "XL"]
  },
  {
    name: "Nike ZoomX Vaporfly",
    description: "Elite racing shoes designed for marathon runners and competitive athletes.",
    price: 25000,
    category: "Men",
    images: [
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800",
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500"
    ],
    sizes: ["US 7", "US 8", "US 9", "US 10", "US 11"]
  },
  {
    name: "Nike One Luxe Leggings",
    description: "Premium training tights with a buttery-soft feel and supportive fit.",
    price: 6500,
    category: "Women",
    images: [
      "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=800",
      "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=500"
    ],
    sizes: ["XS", "S", "M", "L"]
  },
  {
    name: "Nike Infinity Sports Bra",
    description: "High-support sports bra for intense training sessions.",
    price: 4500,
    category: "Women",
    images: [
      "https://images.unsplash.com/photo-1571945153237-4929e783af4a?w=800",
      "https://images.unsplash.com/photo-1571945153237-4929e783af4a?w=500"
    ],
    sizes: ["XS", "S", "M", "L", "XL"]
  },
  {
    name: "Nike React Infinity Run",
    description: "Women's running shoes designed for maximum comfort on long distances.",
    price: 18000,
    category: "Women",
    images: [
      "https://images.unsplash.com/photo-1579338559194-a162d19bf842?w=800",
      "https://images.unsplash.com/photo-1579338559194-a162d19bf842?w=500"
    ],
    sizes: ["US 6", "US 7", "US 8", "US 9"]
  },
  {
    name: "Nike Dunk Low",
    description: "Classic basketball shoes turned streetwear icon.",
    price: 9500,
    category: "Teens",
    images: [
      "https://images.unsplash.com/photo-1597248881519-db089d3744a5?w=800",
      "https://images.unsplash.com/photo-1597248881519-db089d3744a5?w=500"
    ],
    sizes: ["US 4", "US 5", "US 6", "US 7"]
  },
  {
    name: "Nike Club Fleece Hoodie",
    description: "Cozy everyday hoodie with classic Nike branding.",
    price: 5500,
    category: "Teens",
    images: [
      "https://images.unsplash.com/photo-1554568218-0f1715e72254?w=800",
      "https://images.unsplash.com/photo-1554568218-0f1715e72254?w=500"
    ],
    sizes: ["XS", "S", "M", "L"]
  },
  {
    name: "Nike Air Zoom Pegasus 39",
    description: "The latest iteration of the legendary Pegasus line, perfect for daily training.",
    price: 12000,
    category: "Men",
    images: [
      "https://images.unsplash.com/photo-1606890658317-7d14490b76fd?w=800",
      "https://images.unsplash.com/photo-1606890658317-7d14490b76fd?w=500"
    ],
    sizes: ["US 7", "US 8", "US 9", "US 10", "US 11"]
  },
  {
    name: "Nike Pro Training Top",
    description: "Compression fit training top for intense workout sessions.",
    price: 3500,
    category: "Women",
    images: [
      "https://images.unsplash.com/photo-1519689373023-dd07c7988603?w=800",
      "https://images.unsplash.com/photo-1519689373023-dd07c7988603?w=500"
    ],
    sizes: ["XS", "S", "M", "L"]
  },
  {
    name: "Nike SB Chron 2",
    description: "Versatile skateboarding shoes with excellent board feel.",
    price: 6500,
    category: "Teens",
    images: [
      "https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?w=800",
      "https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?w=500"
    ],
    sizes: ["US 6", "US 7", "US 8", "US 9"]
  },
  {
    name: "Nike Metcon 8",
    description: "Ultimate training shoes for CrossFit and gym workouts.",
    price: 13000,
    category: "Men",
    images: [
      "https://images.unsplash.com/photo-1605348532760-6753d2c43329?w=800",
      "https://images.unsplash.com/photo-1605348532760-6753d2c43329?w=500"
    ],
    sizes: ["US 8", "US 9", "US 10", "US 11"]
  },
  {
    name: "Nike Tempo Shorts",
    description: "Classic running shorts with built-in brief for maximum comfort.",
    price: 3000,
    category: "Women",
    images: [
      "https://images.unsplash.com/photo-1539109136881-3be0616acf4b?w=800",
      "https://images.unsplash.com/photo-1539109136881-3be0616acf4b?w=500"
    ],
    sizes: ["XS", "S", "M", "L"]
  },
  {
    name: "Nike Revolution 6",
    description: "Entry-level running shoes perfect for beginners.",
    price: 5500,
    category: "Teens",
    images: [
      "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=800",
      "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=500"
    ],
    sizes: ["US 5", "US 6", "US 7", "US 8"]
  },
  {
    name: "Nike Yoga Luxe Tank",
    description: "Premium yoga tank with Infinalon fabric technology.",
    price: 4000,
    category: "Women",
    images: [
      "https://images.unsplash.com/photo-1518459031867-a89b944bffe4?w=800",
      "https://images.unsplash.com/photo-1518459031867-a89b944bffe4?w=500"
    ],
    sizes: ["XS", "S", "M", "L"]
  },
  {
    name: "Nike Court Vision",
    description: "Classic tennis-inspired sneakers for everyday wear.",
    price: 7000,
    category: "Women",
    images: [
      "https://images.unsplash.com/photo-1529810313688-44ea1c2d81d3?w=800",
      "https://images.unsplash.com/photo-1529810313688-44ea1c2d81d3?w=500"
    ],
    sizes: ["US 6", "US 7", "US 8", "US 9"]
  },
  {
    name: "Nike Therma-FIT ADV",
    description: "Premium winter training jacket with advanced thermal technology.",
    price: 15000,
    category: "Men",
    images: [
      "https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=800",
      "https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=500"
    ],
    sizes: ["S", "M", "L", "XL"]
  },
  {
    name: "Nike Free Run 5.0",
    description: "Natural running feel with excellent flexibility.",
    price: 11000,
    category: "Men",
    images: [
      "https://images.unsplash.com/photo-1562183241-b937e95585b6?w=800",
      "https://images.unsplash.com/photo-1562183241-b937e95585b6?w=500"
    ],
    sizes: ["US 8", "US 9", "US 10", "US 11"]
  },
  {
    name: "Nike Team Hustle D 11",
    description: "Basketball shoes designed for young athletes.",
    price: 6000,
    category: "Teens",
    images: [
      "https://images.unsplash.com/photo-1608231387042-66d1773070a5?w=800",
      "https://images.unsplash.com/photo-1608231387042-66d1773070a5?w=500"
    ],
    sizes: ["US 4", "US 5", "US 6", "US 7"]
  },
  {
    name: "Nike Sportswear Club",
    description: "Essential t-shirt with classic Nike branding.",
    price: 2500,
    category: "Teens",
    images: [
      "https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=800",
      "https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=500"
    ],
    sizes: ["XS", "S", "M", "L"]
  },
  {
    name: "Nike Air Zoom Alphafly",
    description: "Elite marathon racing shoes with ZoomX foam.",
    price: 28000,
    category: "Men",
    images: [
      "https://images.unsplash.com/photo-1491553895911-0055eca6402d?w=800",
      "https://images.unsplash.com/photo-1491553895911-0055eca6402d?w=500"
    ],
    sizes: ["US 7", "US 8", "US 9", "US 10", "US 11"]
  },
  {
    name: "Nike Zoom Fly 5",
    description: "Training companion to the Alphafly for everyday runs.",
    price: 16000,
    category: "Women",
    images: [
      "https://images.unsplash.com/photo-1560769629-975ec94e6a86?w=800",
      "https://images.unsplash.com/photo-1560769629-975ec94e6a86?w=500"
    ],
    sizes: ["US 6", "US 7", "US 8", "US 9"]
  },
  {
    name: "Nike Blazer Mid '77",
    description: "Vintage-inspired basketball shoes turned lifestyle icon.",
    price: 9500,
    category: "Teens",
    images: [
      "https://images.unsplash.com/photo-1597045566677-8cf032ed6634?w=800",
      "https://images.unsplash.com/photo-1597045566677-8cf032ed6634?w=500"
    ],
    sizes: ["US 5", "US 6", "US 7", "US 8"]
  },
  {
    name: "Nike SuperRep Go 3",
    description: "Versatile training shoes for HIIT and studio workouts.",
    price: 10000,
    category: "Women",
    images: [
      "https://images.unsplash.com/photo-1562183241-b937e95585b6?w=800",
      "https://images.unsplash.com/photo-1562183241-b937e95585b6?w=500"
    ],
    sizes: ["US 6", "US 7", "US 8", "US 9"]
  },
  {
    name: "Nike SuperRep Go 3",
    description: "Versatile training shoes for HIIT and studio workouts.",
    price: 10000,
    category: "Women",
    images: [
      "https://images.unsplash.com/photo-1579338559194-a162d19bf842?w=800",
      "https://images.unsplash.com/photo-1579338559194-a162d19bf842?w=500"
    ],
    sizes: ["US 6", "US 7", "US 8", "US 9"]
  },
  {
    name: "Nike Pro Dri-FIT Tights",
    description: "Compression tights with sweat-wicking technology.",
    price: 5500,
    category: "Teens",
    images: [
      "https://images.unsplash.com/photo-1506152983158-b4a74a01c721?w=800",
      "https://images.unsplash.com/photo-1506152983158-b4a74a01c721?w=500"
    ],
    sizes: ["XS", "S", "M", "L"]
  },
  {
    name: "Nike KD 16",
    description: "Kevin Durant's latest signature basketball shoes.",
    price: 15500,
    category: "Men",
    images: [
      "https://images.unsplash.com/photo-1579338908476-3a3a1d71a706?w=800",
      "https://images.unsplash.com/photo-1579338908476-3a3a1d71a706?w=500"
    ],
    sizes: ["US 8", "US 9", "US 10", "US 11"]
  },
  {
    name: "Nike Zoom GT Jump",
    description: "Performance basketball shoes with responsive cushioning.",
    price: 14000,
    category: "Teens",
    images: [
      "https://images.unsplash.com/photo-1605348532760-6753d2c43329?w=800",
      "https://images.unsplash.com/photo-1605348532760-6753d2c43329?w=500"
    ],
    sizes: ["US 6", "US 7", "US 8", "US 9"]
  }
];

async function seedProducts() {
  try {
    console.log('Starting database connection...');
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