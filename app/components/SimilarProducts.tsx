"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import AddToCartButton from "./AddToCartButton";

interface ProductType {
  _id: string;
  name: string;
  price: number;
  images: string[];
  category: string;
}

// Helper function to format price in ZAR
function formatPrice(price: number) {
  return new Intl.NumberFormat('en-ZA', {
    style: 'currency',
    currency: 'ZAR',
  }).format(price);
}

export default function SimilarProducts({ 
  products,
  currentProductId
}: { 
  products: ProductType[];
  currentProductId: string;
}) {
  const router = useRouter();

  if (!products || products.length === 0) {
    return null;
  }

  return (
    <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
      {products.map((product) => (
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
  );
} 