import AddToBag from "@/app/components/AddToBag";
import ImageGallery from "@/app/components/ImageGallery";
import SimilarProducts from "@/app/components/SimilarProducts";
import connectDB from "@/lib/mongodb";
import Product from "@/models/Product";
import { Document } from 'mongoose';

interface ProductType extends Document {
  _id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  sizes: string[];
  images: string[];
}

// Helper function to format price in ZAR
function formatPrice(price: number) {
  return new Intl.NumberFormat('en-ZA', {
    style: 'currency',
    currency: 'ZAR',
  }).format(price);
}

async function getData(id: string) {
  try {
    await connectDB();
    const product = await Product.findById(id).lean() as ProductType | null;
    
    if (!product) {
      return { product: null, similarProducts: [] };
    }

    // Fetch similar products (same category, different ID)
    const similarProducts = await Product.find({
      category: product.category,
      _id: { $ne: id }
    })
    .limit(8)
    .lean() as ProductType[];

    return {
      product: JSON.parse(JSON.stringify(product)),
      similarProducts: JSON.parse(JSON.stringify(similarProducts))
    };
  } catch (error) {
    console.error("Error fetching product:", error);
    return { product: null, similarProducts: [] };
  }
}

export default async function ProductPage({
  params,
}: {
  params: { id: string };
}) {
  const { product, similarProducts } = await getData(params.id);

  if (!product) {
    return (
      <div className="flex justify-center items-center h-96">
        <p className="text-gray-500">Product not found.</p>
      </div>
    );
  }

  return (
    <div className="bg-white">
      <div className="mx-auto max-w-screen-xl px-4 md:px-8">
        <div className="grid gap-8 md:grid-cols-2">
          <ImageGallery images={product.images} />

          <div className="md:py-8">
            <div className="mb-2 md:mb-3">
              <span className="mb-0.5 inline-block text-gray-500">
                {product.category}
              </span>
              <h2 className="text-2xl font-bold text-gray-800 lg:text-3xl">
                {product.name}
              </h2>
            </div>

            <div className="mb-6">
              <div className="flex items-end gap-2">
                <span className="text-xl font-bold text-gray-800 md:text-2xl">
                  {formatPrice(product.price)}
                </span>
              </div>
            </div>

            <div className="mb-6">
              <div className="flex items-end gap-2">
                <span className="text-gray-800 text-sm">
                  {product.description}
                </span>
              </div>
            </div>

            <div className="w-full">
              <AddToBag
                key={product._id}
                id={product._id}
                name={product.name}
                description={product.description}
                price={product.price}
                image={product.images[0]}
              />
            </div>
          </div>
        </div>

        {/* Similar Products Section */}
        <div className="mt-16 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Similar Products</h2>
          <SimilarProducts products={similarProducts} currentProductId={product._id} />
        </div>
      </div>
    </div>
  );
} // Modified on 2025-02-19 00:50:51
// Modified on 2025-02-19 00:52:31
