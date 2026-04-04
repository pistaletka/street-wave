"use client";

import { useCart } from "@/context/CartContext";
import { reachGoal } from "@/lib/analytics";
import { GOALS } from "@/lib/goals";
import type { Product } from "@/types/product";

interface AddToCartButtonProps {
  product: Product;
}

export default function AddToCartButton({ product }: AddToCartButtonProps) {
  const { addItem, removeItem, isInCart } = useCart();
  const inCart = isInCart(product.slug);
  const isSold = product.status === "sold";

  if (isSold) {
    return (
      <button
        disabled
        className="sw-btn h-12 w-full border border-border px-8 text-muted cursor-not-allowed"
      >
        Продано
      </button>
    );
  }

  if (inCart) {
    return (
      <button
        onClick={() => removeItem(product.slug)}
        className="sw-btn h-12 w-full border border-accent px-8 text-accent transition-colors hover:bg-accent hover:text-accent-foreground"
      >
        В корзине - убрать
      </button>
    );
  }

  return (
    <button
      onClick={() => { reachGoal(GOALS.ADD_TO_CART, { product_name: product.title, price: String(product.price) }); addItem(product); }}
      className="sw-btn h-12 w-full border border-accent bg-accent px-8 text-accent-foreground transition-colors hover:bg-transparent hover:text-accent"
    >
      В корзину
    </button>
  );
}
