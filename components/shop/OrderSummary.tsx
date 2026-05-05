"use client";

import { useCart } from "@/context/CartContext";
import { formatPrice } from "@/lib/formatPrice";
import { useMessages } from "next-intl";
import type { DeliveryZone } from "@/app/checkout/page";

interface OrderSummaryProps {
  zone?: DeliveryZone;
}

const DELIVERY_COST: Record<DeliveryZone, number> = {
  pickup: 0,
  moscow: 1000,
  russia: 2000,
};

export default function OrderSummary({ zone = "pickup" }: OrderSummaryProps) {
  const messages = useMessages();
  const checkoutContent = messages.checkout as any;
  const { items, total } = useCart();
  const deliveryCost = DELIVERY_COST[zone];
  const grandTotal = total + deliveryCost;

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
      <div className="space-y-2 border-b border-border py-4">
        <div className="flex justify-between">
          <span className="sw-caption text-muted">{checkoutContent.summary.subtotal}</span>
          <span className="sw-body-sm text-foreground">{formatPrice(total)}</span>
        </div>
        <div className="flex justify-between">
          <span className="sw-caption text-muted">{checkoutContent.summary.deliveryLabel}</span>
          <span className="sw-body-sm text-foreground">
            {deliveryCost === 0 ? "0 ₽" : formatPrice(deliveryCost)}
          </span>
        </div>
      </div>
      <div className="flex justify-between pt-4">
        <span className="sw-label text-muted">{checkoutContent.summary.total}</span>
        <span className="sw-h3 text-xl text-accent">{formatPrice(grandTotal)}</span>
      </div>
    </div>
  );
}
