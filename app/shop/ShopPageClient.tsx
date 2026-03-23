"use client";

import { useState } from "react";
import type { Product } from "@/types/product";
import CategoryFilter from "@/components/shop/CategoryFilter";
import ProductCard from "@/components/shop/ProductCard";

interface ShopPageClientProps {
  products: Product[];
  shopContent: any;
}

export default function ShopPageClient({ products, shopContent }: ShopPageClientProps) {
  const [category, setCategory] = useState("all");

  const filtered =
    category === "all"
      ? products
      : products.filter((p) => p.category === category);

  return (
    <>
      <div className="relative w-full overflow-hidden">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/shop-banner.jpg"
          alt="streetwave® — магазин"
          className="w-full h-auto object-cover"
          style={{ marginTop: "-10%", marginBottom: "-10%" }}
        />
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
      <section className="px-6 py-20">
        <div className="mx-auto max-w-2xl text-center">
          <p className="sw-label mb-4 text-accent">coming soon</p>
          <h2 className="sw-h2 text-2xl sm:text-3xl mb-6">Раздел в разработке</h2>
          <p className="sw-body text-text-secondary">
            Мы готовим карточки каждой работы — чтобы вы могли рассмотреть детали, узнать историю и забрать понравившуюся вещь в пару кликов. Скоро объявим об открытии онлайн-магазина.
          </p>
        </div>
      </section>
    </>
  );
}
