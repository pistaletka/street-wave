"use client";

import Link from "next/link";
import { useCart } from "@/context/CartContext";
import { useLocale } from "next-intl";

export default function CartBadge() {
  const { count } = useCart();
  const locale = useLocale();
  const label = locale === "en" ? "Cart" : "Корзина";

  return (
    <Link
      href="/cart"
      className="relative flex items-center text-sm text-text-secondary transition-colors hover:text-foreground sw-nav"
      aria-label={`${label}: ${count}`}
    >
      {label}
      {count > 0 && (
        <span className="ml-1.5 flex h-5 w-5 items-center justify-center bg-accent text-[10px] font-bold text-accent-foreground rounded-full">
          {count}
        </span>
      )}
    </Link>
  );
}
