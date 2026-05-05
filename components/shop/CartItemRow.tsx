"use client";

import Image from "next/image";
import { useCart, type CartItem } from "@/context/CartContext";
import { formatPrice } from "@/lib/formatPrice";
import PlaceholderImage from "@/components/shared/PlaceholderImage";

interface CartItemRowProps {
  item: CartItem;
}

export default function CartItemRow({ item }: CartItemRowProps) {
  const { removeItem } = useCart();

  return (
    <div className="flex items-center gap-6 border-b border-border py-6">
      <div className="relative h-20 w-20 shrink-0 overflow-hidden bg-surface">
        {item.image ? (
          <Image
            src={item.image}
            alt={item.title}
            fill
            sizes="80px"
            className="object-cover"
          />
        ) : (
          <PlaceholderImage aspectRatio="1/1" label={item.title} />
        )}
      </div>
      <div className="flex flex-1 flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h3 className="sw-body-sm text-foreground">{item.title}</h3>
          <p className="sw-body-sm text-accent">{formatPrice(item.price)}</p>
        </div>
        <button
          onClick={() => removeItem(item.slug)}
          className="sw-caption text-muted transition-colors hover:text-foreground self-start sm:self-center"
        >
          Удалить
        </button>
      </div>
    </div>
  );
}
