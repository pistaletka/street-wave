"use client";

import { useEffect } from "react";
import Link from "next/link";
import { useCart } from "@/context/CartContext";
import { useLocale } from "next-intl";
import { reachGoal } from "@/lib/analytics";
import { GOALS } from "@/lib/goals";
import CheckoutForm from "@/components/shop/CheckoutForm";
import OrderSummary from "@/components/shop/OrderSummary";

export default function CheckoutPage() {
  const { count } = useCart();
  const locale = useLocale();
  const isRu = locale === "ru";

  useEffect(() => {
    if (count > 0) reachGoal(GOALS.CHECKOUT_START);
  }, [count]);

  return (
    <section className="px-6 py-6">
      <div className="mx-auto max-w-5xl">
        <Link
          href="/cart"
          className="sw-label mb-8 inline-block text-muted transition-colors hover:text-foreground"
        >
          &larr; {isRu ? "Назад в корзину" : "Back to cart"}
        </Link>

        <h1 className="sw-h1 mb-12 text-3xl sm:text-4xl">{isRu ? "Оформление заказа" : "Checkout"}</h1>

        {count === 0 ? (
          <div className="py-20 text-center">
            <p className="sw-body text-muted mb-6">{isRu ? "Корзина пуста - нечего оформлять" : "Cart is empty"}</p>
            <Link
              href="/shop"
              className="sw-btn inline-block h-12 border border-accent bg-accent px-8 leading-[48px] text-accent-foreground transition-colors hover:bg-transparent hover:text-accent"
            >
              {isRu ? "В магазин" : "To Shop"}
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
