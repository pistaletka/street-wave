import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import type { ProductDetail } from "@/types/product";
import { formatPrice } from "@/lib/formatPrice";
import ProductGallery from "@/components/shop/ProductGallery";
import AddToCartButton from "@/components/shop/AddToCartButton";
import { getContent, getLocaleProduct } from "@/lib/getContent";

interface ShopContent {
  categories: { value: string; label: string }[];
  backToShop: string;
  productNotFound: string;
}

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  // Use the default (ru) locale for static params generation
  const productsIndex = (await import("../../../content/ru/products/index.json")).default;
  return productsIndex.map((p: any) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  try {
    const product = await getLocaleProduct(slug);
    return {
      title: `${product.title} - streetwave®`,
      description: product.description,
    };
  } catch {
    const shopContent = await getContent<ShopContent>("shop");
    return { title: `${shopContent.productNotFound} - streetwave®` };
  }
}

export default async function ProductPage({ params }: PageProps) {
  const { slug } = await params;
  let product: ProductDetail;
  try {
    product = await getLocaleProduct(slug) as ProductDetail;
  } catch {
    notFound();
  }

  const shopContent = await getContent<ShopContent>("shop");
  const categoryLabel =
    shopContent.categories.find((c) => c.value === product.category)?.label ?? product.category;

  return (
    <section className="px-6 py-6">
      <div className="mx-auto max-w-7xl">
        <Link
          href="/shop"
          className="sw-label mb-8 inline-block text-muted transition-colors hover:text-foreground"
        >
          {shopContent.backToShop}
        </Link>

        <div className="grid gap-12 lg:grid-cols-2">
          <ProductGallery images={product.images} title={product.title} />

          <div className="flex flex-col gap-6">
            <div>
              <p className="sw-label mb-2 text-accent">{categoryLabel}</p>
              <h1 className="sw-h1 text-3xl sm:text-4xl">{product.title}</h1>
            </div>

            <p className="sw-h2 text-2xl text-accent">{formatPrice(product.price)}</p>

            <p className="sw-body text-text-secondary leading-relaxed">
              {product.description}
            </p>

            {product.specs && product.specs.length > 0 && (
              <div className="space-y-3 border-t border-border pt-6">
                {product.specs.map((spec) => (
                  <div key={spec.label} className="flex justify-between">
                    <span className="sw-caption text-muted">{spec.label}</span>
                    <span className="sw-body-sm text-foreground">{spec.value}</span>
                  </div>
                ))}
              </div>
            )}

            <div className="mt-2">
              <AddToCartButton product={product} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
