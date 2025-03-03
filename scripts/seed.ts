import connectDB from '../lib/mongodb';
import Product from '../app/models/Product';

const products = [
  {
    name: "Nike Air VaporMax 2023 Flyknit",
    description: "Elevate your sneaker game to new heights with the latest evolution of the iconic Air VaporMax series. The 2023 Flyknit combines cutting-edge technology, exceptional comfort, and bold style. Its innovative Flyknit upper offers a second-skin fit, ensuring a snug yet breathable feel with every step. The renowned VaporMax sole unit delivers unparalleled cushioning and responsiveness, providing a smooth ride that's perfect for both athletic performance and street-style fashion.",
    price: 20000, // $200 in cents
    category: "Men",
    images: [
      "/ProductOne/1.png",
      "/ProductOne/2.png",
      "/ProductOne/3.png",
      "/ProductOne/4.png"
    ]
  },
  {
    name: "Nike Sportswear Phoenix Fleece",
    description: "Crafted with a blend of warmth and style, the Phoenix Fleece is a versatile addition to your wardrobe. Its soft and cozy fleece fabric offers a perfect balance of comfort and durability, making it ideal for cool days and relaxed outings. With a modern, sporty design and the iconic Nike Swoosh, this fleece adds a touch of urban flair to your look. Whether you're hitting the gym or hanging out with friends, the Nike Sportswear Phoenix Fleece keeps you both cozy and stylish.",
    price: 3500, // $35 in cents
    category: "Women",
    images: [
      "/ProductTwo/1.png",
      "/ProductTwo/2.png",
      "/ProductTwo/3.png",
      "/ProductTwo/4.png"
    ]
  },
  {
    name: "Nike Air Force 1 '07",
    description: "The Nike Air Force 1 '07 represents a legend in the world of sneakers. With a design that transcends generations, this classic silhouette has remained a symbol of street-style culture for over three decades. Its white leather upper and clean lines are a canvas for self-expression, allowing you to pair it with any outfit, from casual to chic.",
    price: 8500, // $85 in cents
    category: "Teens",
    images: [
      "/ProductThree/1.png",
      "/ProductThree/2.png",
      "/ProductThree/3.png",
      "/ProductThree/4.png"
    ]
  },
  {
    name: "Nike Windrunner",
    description: "The Nike Windrunner is more than just a jacket; it's a symbol of enduring style and performance. With a design that has stood the test of time, this lightweight and versatile outerwear piece is your go-to choice for brisk mornings, breezy afternoons, and everything in between. Its distinctive chevron design on the chest pays homage to its heritage, while the modern materials and construction ensure it's ready for the demands of today.",
    price: 20000, // $200 in cents
    category: "Men",
    images: [
      "/ProductFour/1.png",
      "/ProductFour/2.png",
      "/ProductFour/3.png",
      "/ProductFour/4.png"
    ]
  }
];

async function seedProducts() {
  try {
    await connectDB();

    // Clear existing products
    await Product.deleteMany({});
    console.log('Cleared existing products');

    // Insert new products
    const insertedProducts = await Product.insertMany(products);
    console.log(`Successfully seeded ${insertedProducts.length} products`);

    // Log the inserted products
    console.log('Seeded products:', insertedProducts.map(p => ({ id: p._id, name: p.name })));

  } catch (error) {
    console.error('Error seeding products:', error);
  } finally {
    // Disconnect from database
    await mongoose.disconnect();
  }
}

// Run the seed function
seedProducts(); 