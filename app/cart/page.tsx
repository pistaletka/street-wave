"use client";

import Link from "next/link";
import { useCart } from "@/context/CartContext";
import { formatPrice } from "@/lib/formatPrice";
import CartItemRow from "@/components/shop/CartItemRow";
import { useLocale } from "next-intl";

export default function CartPage() {
  const { items, total, count } = useCart();
  const locale = useLocale();
  const en = locale === "en";

  return (
    <section className="px-6 py-6">
      <div className="mx-auto max-w-3xl">
        <Link
          href="/shop"
          className="sw-label mb-8 inline-block text-muted transition-colors hover:text-foreground"
        >
          &larr; {en ? "Continue shopping" : "Продолжить покупки"}
        </Link>

        <h1 className="sw-h1 mb-12 text-3xl sm:text-4xl">{en ? "Cart" : "Корзина"}</h1>

        {count === 0 ? (
          <div className="py-20 text-center">
            <p className="sw-body text-muted mb-6">{en ? "Cart is empty" : "Корзина пуста"}</p>
            <Link
              href="/shop"
              className="sw-btn inline-block h-12 border border-accent bg-accent px-8 leading-[48px] text-accent-foreground transition-colors hover:bg-transparent hover:text-accent"
            >
              {en ? "To Shop" : "В магазин"}
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
                <span className="sw-label text-muted">{en ? "Total" : "Итого"}</span>
                <span className="sw-h2 text-2xl text-accent">
                  {formatPrice(total)}
                </span>
              </div>
              <Link
                href="/checkout"
                className="sw-btn inline-block h-12 border border-accent bg-accent px-8 leading-[48px] text-accent-foreground transition-colors hover:bg-transparent hover:text-accent"
              >
                {en ? "Checkout" : "Оформить заказ"}
              </Link>
            </div>
          </>
        )}
      </div>
    </section>
  );
}
