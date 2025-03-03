"use client";

import { Button } from "@/components/ui/button";
import { useShoppingCart } from "use-shopping-cart";
import { toast } from "sonner";

interface AddToBagProps {
  name: string;
  description: string;
  price: number;
  image: string;
  id: string;
}

export default function AddToBag({
  name,
  description,
  price,
  image,
  id,
}: AddToBagProps) {
  const { addItem, handleCartClick } = useShoppingCart();

  const product = {
    name,
    description,
    price,
    currency: 'ZAR',
    image,
    id,
  };

  const handleAddToCart = () => {
    addItem(product);
    toast.success('Added to Cart', {
      description: `${name} has been added to your cart`,
      action: {
        label: 'View Cart',
        onClick: () => handleCartClick(),
      },
    });
  };

  return (
    <Button
      onClick={handleAddToCart}
      className="w-full py-6 text-lg bg-black hover:bg-gray-800 text-white rounded-full"
    >
      Add To Cart
    </Button>
  );
}
// Modified on 2025-02-19 00:50:50
// Modified on 2025-02-19 00:52:38
