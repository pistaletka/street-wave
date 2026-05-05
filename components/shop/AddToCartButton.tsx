"use client";

import { useState } from "react";
import Link from "next/link";
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
  const [showAdded, setShowAdded] = useState(false);

  return (
    <>
      {isSold ? (
        <button
          disabled
          className="sw-btn h-12 w-full border border-border px-8 text-muted cursor-not-allowed"
        >
          Продано
        </button>
      ) : inCart ? (
        <button
          onClick={() => removeItem(product.slug)}
          className="sw-btn h-12 w-full border border-accent px-8 text-accent transition-colors hover:bg-accent hover:text-accent-foreground"
        >
          В корзине - убрать
        </button>
      ) : (
        <button
          onClick={() => {
            reachGoal(GOALS.ADD_TO_CART, { product_name: product.title, price: String(product.price) });
            addItem(product);
            setShowAdded(true);
          }}
          className="sw-btn h-12 w-full border border-accent bg-accent px-8 text-accent-foreground transition-colors hover:bg-transparent hover:text-accent"
        >
          В корзину
        </button>
      )}

      {showAdded && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 p-6 backdrop-blur-sm"
          onClick={(e) => {
            if (e.target === e.currentTarget) setShowAdded(false);
          }}
        >
          <div className="relative w-full max-w-md border border-border bg-background p-8 text-center">
            <p className="sw-label mb-3 text-accent">{product.title}</p>
            <h3 className="sw-h2 mb-8 text-2xl">Товар добавлен в корзину</h3>
            <div className="flex flex-col gap-3">
              <Link
                href="/cart"
                onClick={() => setShowAdded(false)}
                className="sw-btn inline-flex h-12 items-center justify-center border border-accent bg-accent px-8 text-accent-foreground transition-colors hover:bg-transparent hover:text-accent"
              >
                Перейти в корзину
              </Link>
              <button
                onClick={() => setShowAdded(false)}
                className="sw-btn inline-flex h-12 items-center justify-center border border-border px-8 text-foreground transition-colors hover:border-accent hover:text-accent"
              >
                Продолжить покупки
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
