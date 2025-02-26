import Image from "next/image";
import Link from "next/link";
import connectDB from "@/lib/mongodb";
import Product from "@/models/Product";
import AddToCartButton from "@/app/components/AddToCartButton";

interface ProductType {
  _id: string;
  name: string;
  price: number;
  category: string;
  images: string[];
}

// Helper function to format price in ZAR
function formatPrice(price: number) {
  return new Intl.NumberFormat('en-ZA', {
    style: 'currency',
    currency: 'ZAR',
  }).format(price);
}

async function getData(category: string) {
  try {
    await connectDB();
    const products = await Product.find({ category })
      .sort({ createdAt: -1 })
      .lean();

    return JSON.parse(JSON.stringify(products));
  } catch (error) {
    console.error("Error fetching products:", error);
    return [];
  }
}

export const dynamic = "force-dynamic";

export default async function CategoryPage({
  params,
}: {
  params: { category: string };
}) {
  const products = await getData(params.category);

  if (!products || products.length === 0) {
    return (
      <div className="flex justify-center items-center h-96">
        <p className="text-gray-500">No products found in this category.</p>
      </div>
    );
  }

  return (
    <div className="bg-white">
      <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold tracking-tight text-gray-900">
            {params.category} Products
          </h2>
        </div>

        <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
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
// Modified on 2025-02-19 00:50:50
// Modified on 2025-02-19 00:52:36
