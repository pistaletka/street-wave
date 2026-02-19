"use client";

import Link from "next/link";
import { useCart } from "@/context/CartContext";
import CheckoutForm from "@/components/shop/CheckoutForm";
import OrderSummary from "@/components/shop/OrderSummary";

export default function CheckoutPage() {
  const { count } = useCart();

  return (
    <section className="px-6 py-24">
      <div className="mx-auto max-w-5xl">
        <Link
          href="/cart"
          className="sw-label mb-8 inline-block text-muted transition-colors hover:text-foreground"
        >
          &larr; Назад в корзину
        </Link>

        <h1 className="sw-h1 mb-12 text-3xl sm:text-4xl">Оформление заказа</h1>

        {count === 0 ? (
          <div className="py-20 text-center">
            <p className="sw-body text-muted mb-6">Корзина пуста — нечего оформлять</p>
            <Link
              href="/shop"
              className="sw-btn inline-block h-12 border border-accent bg-accent px-8 leading-[48px] text-accent-foreground transition-colors hover:bg-transparent hover:text-accent"
            >
              В магазин
            </Link>
          </div>
        ) : (
          <div className="grid gap-12 lg:grid-cols-[1fr_380px]">
            <CheckoutForm />
            <OrderSummary />
          </div>
        )}
      </div>
    </section>
  );
}
