"use client";

import { Button } from "@/components/ui/button";
import { useShoppingCart } from "use-shopping-cart";

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

  return (
    <Button
      onClick={() => {
        addItem(product);
        handleCartClick();
      }}
    >
      Add To Cart
    </Button>
  );
}
