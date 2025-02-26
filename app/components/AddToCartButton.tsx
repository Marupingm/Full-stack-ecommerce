'use client';

import { ShoppingCart } from "lucide-react";
import { useShoppingCart } from "use-shopping-cart";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

interface ProductType {
  _id: string;
  name: string;
  price: number;
  images: string[];
}

export default function AddToCartButton({ product }: { product: ProductType }) {
  const { addItem } = useShoppingCart();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault(); // Prevent navigation when clicking the cart button
    
    try {
      addItem({
        id: product._id,
        name: product.name,
        price: product.price * 100, // Convert to cents for Stripe
        currency: "ZAR",
        image: product.images[0],
      });
      
      toast.success('Added to Cart', {
        description: `${product.name} has been added to your cart`,
        action: {
          label: 'View Cart',
          onClick: () => document.getElementById('cart-modal-trigger')?.click(),
        },
      });
    } catch (error) {
      toast.error('Failed to add item', {
        description: 'There was an error adding this item to your cart',
      });
    }
  };

  return (
    <Button
      onClick={handleAddToCart}
      className="bg-white hover:bg-gray-100 text-gray-900 rounded-full p-2 transform transition-all duration-300 translate-y-8 opacity-0 group-hover:translate-y-0 group-hover:opacity-100"
    >
      <ShoppingCart className="h-6 w-6" />
    </Button>
  );
} 