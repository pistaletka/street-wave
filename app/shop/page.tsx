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
    <section className="px-6 py-24">
      <div className="mx-auto max-w-7xl">
        <SectionHeader
          badge={shopContent.hero.badge}
          title={shopContent.hero.title}
          description={shopContent.hero.description}
        />
        <ProductGrid products={products as Product[]} />
      </div>
    </section>
  );
}
