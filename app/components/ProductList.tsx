import Link from "next/link";
import Image from "next/image";
import connectDB from "@/lib/mongodb";
import Product from "@/models/Product";
import AddToCartButton from "./AddToCartButton";

export const dynamic = "force-dynamic";

interface ProductType {
  _id: string;
  name: string;
  price: number;
  category: string;
  images: string[];
  description: string;
}

// Helper function to format price in ZAR
function formatPrice(price: number) {
  return new Intl.NumberFormat('en-ZA', {
    style: 'currency',
    currency: 'ZAR',
  }).format(price);
}

async function getData() {
  try {
    console.log('Connecting to database...');
    await connectDB();
    console.log('Connected to database, fetching products...');
    
    const products = await Product.find({})
      .sort({ createdAt: -1 })
      .limit(20)
      .lean();

    console.log(`Found ${products.length} products`);
    
    if (products.length === 0) {
      console.log('No products found in database');
    } else {
      console.log('Sample product:', products[0]);
    }

    return JSON.parse(JSON.stringify(products));
  } catch (error) {
    console.error("Error fetching products:", {
      name: error instanceof Error ? error.name : 'Unknown Error',
      message: error instanceof Error ? error.message : 'An unknown error occurred',
      stack: error instanceof Error ? error.stack : undefined
    });
    return [];
  }
}

export default async function ProductList() {
  const products = await getData();

  if (!products || products.length === 0) {
    return (
      <div className="flex flex-col justify-center items-center h-96">
        <p className="text-gray-500 mb-4">No products found.</p>
        <p className="text-sm text-gray-400">Please ensure the database is properly seeded.</p>
      </div>
    );
  }

  return (
    <div className="bg-white">
      <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
        <h2 className="text-2xl font-bold tracking-tight text-gray-900 mb-8">
          Our Latest Collection
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-10">
          {products.map((product: ProductType) => (
            <div key={product._id} className="group relative">
              <Link href={`/product/${product._id}`} className="block">
                <div className="aspect-square w-full overflow-hidden rounded-xl bg-gray-100 relative">
                  <Image
                    src={product.images[0] || "https://via.placeholder.com/400x400?text=No+Image"}
                    alt={product.name}
                    className="h-full w-full object-cover object-center transition-transform duration-300 group-hover:scale-105"
                    width={400}
                    height={400}
                  />
                  <div className="absolute inset-0 bg-black opacity-0 transition-opacity duration-300 group-hover:opacity-20" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <AddToCartButton product={product} />
                  </div>
                </div>
              </Link>

              <div className="mt-4 space-y-2">
                <Link href={`/product/${product._id}`}>
                  <h3 className="text-sm font-medium text-blue-600 hover:text-blue-800 transition-colors line-clamp-1">
                    {product.name}
                  </h3>
                </Link>
                <p className="text-lg font-semibold text-gray-900">
                  {formatPrice(product.price)}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
} 