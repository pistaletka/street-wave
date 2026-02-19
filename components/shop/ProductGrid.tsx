"use client";

import { useState } from "react";
import type { Product } from "@/types/product";
import ProductCard from "./ProductCard";
import CategoryFilter from "./CategoryFilter";
import shopContent from "@/content/shop.json";

interface ProductGridProps {
  products: Product[];
}

export default function ProductGrid({ products }: ProductGridProps) {
  const [category, setCategory] = useState("all");

  const filtered =
    category === "all"
      ? products
      : products.filter((p) => p.category === category);

  return (
    <div>
      <div className="mb-10">
        <CategoryFilter current={category} onChange={setCategory} />
      </div>
      {filtered.length === 0 ? (
        <p className="sw-body text-muted py-20 text-center">
          {shopContent.emptyState}
        </p>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((product) => (
            <ProductCard key={product.slug} product={product} />
          ))}
        </div>
      )}
    </div>
  );
}
