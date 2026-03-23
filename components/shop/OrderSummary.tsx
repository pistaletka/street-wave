"use client";

import { useCart } from "@/context/CartContext";
import { formatPrice } from "@/lib/formatPrice";
import { useMessages } from "next-intl";

export default function OrderSummary() {
  const messages = useMessages();
  const checkoutContent = messages.checkout as any;
  const { items, total } = useCart();

  return (
    <div className="border border-border p-6">
      <h2 className="sw-h3 text-lg mb-6">{checkoutContent.summary.title}</h2>
      <div className="space-y-3 border-b border-border pb-6">
        {items.map((item) => (
          <div key={item.slug} className="flex justify-between">
            <span className="sw-caption text-text-secondary">{item.title}</span>
            <span className="sw-body-sm text-foreground">{formatPrice(item.price)}</span>
          </div>
        ))}
      </div>
      <div className="flex justify-between pt-6">
        <span className="sw-label text-muted">{checkoutContent.summary.total}</span>
        <span className="sw-h3 text-xl text-accent">{formatPrice(total)}</span>
      </div>
    </div>
  );
}
