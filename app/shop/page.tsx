import ShopPageClient from "./ShopPageClient";
import products from "@/content/products/index.json";
import type { Product } from "@/types/product";

export const metadata = {
  title: "Магазин кастомных кроссовок и одежды",
  description:
    "Купить кастомные кроссовки и одежду от streetwave®. Готовые работы в единственном экземпляре. Доставка по России.",
  openGraph: {
    title: "Магазин — streetwave®",
    description: "Кастомные кроссовки и одежда. Каждая вещь уникальна.",
    images: [{ url: "/opengraph-image", width: 1200, height: 630 }],
  },
  alternates: { canonical: "/shop" },
};

export default function ShopPage() {
  return <ShopPageClient products={products as Product[]} />;
}
