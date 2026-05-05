"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import type { Product } from "@/types/product";
import { reachGoal } from "@/lib/analytics";
import { GOALS } from "@/lib/goals";
import CategoryFilter from "@/components/shop/CategoryFilter";
import ProductCard from "@/components/shop/ProductCard";

interface ShopPageClientProps {
  products: Product[];
  shopContent: any;
}

export default function ShopPageClient({ products, shopContent }: ShopPageClientProps) {
  const [category, setCategory] = useState("all");

  useEffect(() => { reachGoal(GOALS.VISIT_SHOP); }, []);

  const filtered =
    category === "all"
      ? products
      : products.filter((p) => p.category === category);

  return (
    <>
      <div className="relative w-full overflow-hidden h-[380px] sm:h-[55vh] md:h-[50vh]">
        <picture>
          <source media="(max-width: 639px)" srcSet="/shop-banner-mobile.jpg" />
          <source media="(max-width: 1023px)" srcSet="/shop-banner-tablet.jpg" />
          <Image
            src="/shop-banner-desktop.jpg"
            alt="streetwave® - магазин"
            width={1600}
            height={900}
            className="h-full w-full object-cover"
            priority
          />
        </picture>
        <div className="absolute inset-0 bg-black/50" />
        <div className="absolute top-0 left-0 right-0 px-6 pt-10">
          <div className="mx-auto max-w-7xl">
            <p className="sw-label mb-2 text-accent">{shopContent.hero.badge}</p>
            <h1 className="sw-h1 text-3xl sm:text-5xl">{shopContent.hero.title}</h1>
            <p className="mt-4 max-w-2xl sw-body text-text-secondary">
              {shopContent.hero.description}
            </p>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 px-6 pb-6">
          <div className="mx-auto max-w-7xl">
            <CategoryFilter current={category} onChange={setCategory} />
          </div>
        </div>
      </div>
      <section className="px-6 py-6">
        <div className="mx-auto max-w-7xl">
          {filtered.length === 0 ? (
            <p className="sw-body py-12 text-center text-text-secondary">
              {shopContent.emptyState || "В этой категории пока нет товаров"}
            </p>
          ) : (
            <div className="grid grid-cols-2 gap-6 lg:grid-cols-4">
              {filtered.map((product) => (
                <ProductCard key={product.slug} product={product} />
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
