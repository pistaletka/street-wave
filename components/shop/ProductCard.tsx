import Link from "next/link";
import type { Product } from "@/types/product";
import { formatPrice } from "@/lib/formatPrice";
import PlaceholderImage from "@/components/shared/PlaceholderImage";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const isSold = product.status === "sold";

  return (
    <Link
      href={`/shop/${product.slug}`}
      className={`group block ${isSold ? "pointer-events-none" : ""}`}
    >
      <div className="relative overflow-hidden bg-surface">
        <PlaceholderImage
          aspectRatio="1/1"
          label={product.title}
          className={isSold ? "opacity-40 grayscale" : "transition-transform duration-500 group-hover:scale-105"}
        />
        {isSold && (
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="sw-label bg-background/80 px-4 py-2 text-muted">
              Продано
            </span>
          </div>
        )}
      </div>
      <div className="mt-4 space-y-1">
        <h3 className="sw-body-sm text-foreground">{product.title}</h3>
        <p className={`sw-body-sm ${isSold ? "text-muted line-through" : "text-accent"}`}>
          {formatPrice(product.price)}
        </p>
      </div>
    </Link>
  );
}
