"use client";

import Link from "next/link";
import { useCart } from "@/context/CartContext";
import { formatPrice } from "@/lib/formatPrice";
import CartItemRow from "@/components/shop/CartItemRow";

export default function CartPage() {
  const { items, total, count } = useCart();

  return (
    <section className="px-6 py-24">
      <div className="mx-auto max-w-3xl">
        <Link
          href="/shop"
          className="sw-label mb-8 inline-block text-muted transition-colors hover:text-foreground"
        >
          &larr; Продолжить покупки
        </Link>

        <h1 className="sw-h1 mb-12 text-3xl sm:text-4xl">Корзина</h1>

        {count === 0 ? (
          <div className="py-20 text-center">
            <p className="sw-body text-muted mb-6">Корзина пуста</p>
            <Link
              href="/shop"
              className="sw-btn inline-block h-12 border border-accent bg-accent px-8 leading-[48px] text-accent-foreground transition-colors hover:bg-transparent hover:text-accent"
            >
              В магазин
            </Link>
          </div>
        ) : (
          <>
            <div>
              {items.map((item) => (
                <CartItemRow key={item.slug} item={item} />
              ))}
            </div>

            <div className="mt-8 flex flex-col items-end gap-6">
              <div className="flex items-center gap-4">
                <span className="sw-label text-muted">Итого</span>
                <span className="sw-h2 text-2xl text-accent">
                  {formatPrice(total)}
                </span>
              </div>
              <Link
                href="/checkout"
                className="sw-btn inline-block h-12 border border-accent bg-accent px-8 leading-[48px] text-accent-foreground transition-colors hover:bg-transparent hover:text-accent"
              >
                Оформить заказ
              </Link>
            </div>
          </>
        )}
      </div>
    </section>
  );
}
