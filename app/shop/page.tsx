import type { Metadata } from "next";
import ShopPageClient from "./ShopPageClient";
import { getContent, getLocaleProductsIndex } from "@/lib/getContent";
import type { Product } from "@/types/product";

export async function generateMetadata(): Promise<Metadata> {
  const content = await getContent<any>("shop");
  return {
    title: content?.meta?.title ?? "Магазин кастомных кроссовок и одежды",
    description:
      content?.meta?.description ?? "Купить кастомные кроссовки и одежду от streetwave®. Готовые работы в единственном экземпляре. Доставка по России.",
    openGraph: {
      title: content?.meta?.ogTitle ?? "Магазин — streetwave®",
      description: content?.meta?.ogDescription ?? "Кастомные кроссовки и одежда. Каждая вещь уникальна.",
      images: [{ url: "/og-image.jpg", width: 1200, height: 630 }],
    },
    alternates: { canonical: "/shop" },
  };
}

export default async function ShopPage() {
  const products = await getLocaleProductsIndex();
  const shopContent = await getContent<any>("shop");
  return <ShopPageClient products={products as Product[]} shopContent={shopContent} />;
}
