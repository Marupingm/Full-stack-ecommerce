import Image from "next/image";
import Link from "next/link";
import connectDB from "@/lib/mongodb";
import Product from "@/models/Product";

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
              <div className="aspect-square w-full overflow-hidden rounded-md bg-gray-200 group-hover:opacity-75 lg:h-80">
                <Image
                  src={product.images[0]}
                  alt={product.name}
                  className="w-full h-full object-cover object-center lg:h-full lg:w-full"
                  width={300}
                  height={300}
                />
              </div>

              <div className="mt-4 flex justify-between">
                <div>
                  <h3 className="text-sm text-gray-700">
                    <Link href={`/product/${product._id}`}>
                      {product.name}
                    </Link>
                  </h3>
                  <p className="mt-1 text-sm text-gray-500">
                    {product.category}
                  </p>
                </div>
                <p className="text-sm font-medium text-gray-900">
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
