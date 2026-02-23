import SectionHeader from "@/components/shared/SectionHeader";
import ProductGrid from "@/components/shop/ProductGrid";
import shopContent from "@/content/shop.json";
import products from "@/content/products/index.json";
import type { Product } from "@/types/product";

export const metadata = {
  title: "Магазин — streetwave®",
  description: "Готовые кастомизированные работы. Каждая вещь в единственном экземпляре.",
};

export default function ShopPage() {
  return (
    <>
      <div className="relative w-full overflow-hidden">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/shop-banner.png"
          alt="streetwave® — магазин"
          className="w-full h-auto object-cover"
        />
        <div className="absolute inset-0 bg-black/50" />
        <div className="absolute bottom-0 left-0 right-0 px-6 pb-10">
          <div className="mx-auto max-w-7xl">
            <p className="sw-label mb-2 text-accent">{shopContent.hero.badge}</p>
            <h1 className="sw-h1 text-3xl sm:text-5xl">{shopContent.hero.title}</h1>
            <p className="mt-4 max-w-2xl sw-body text-text-secondary">
              {shopContent.hero.description}
            </p>
          </div>
        </div>
      </div>
      <section className="px-6 pt-8 pb-24">
        <div className="mx-auto max-w-7xl">
          <ProductGrid products={products as Product[]} />
        </div>
      </section>
    </>
  );
}
