import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import type { ProductDetail } from "@/types/product";
import { formatPrice } from "@/lib/formatPrice";
import ProductGallery from "@/components/shop/ProductGallery";
import AddToCartButton from "@/components/shop/AddToCartButton";
import { getLocaleProductsIndex, getLocaleProduct } from "@/lib/getContent";

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
    const product = await getLocaleProduct(slug) as ProductDetail;
    return {
      title: product.seo?.title ?? `${product.title} - streetwave®`,
      description: product.seo?.metaDescription ?? product.description,
    };
  } catch {
    return { title: "Товар не найден - streetwave®" };
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

  return (
    <section className="px-6 py-6">
      <div className="mx-auto max-w-7xl">
        <Link
          href="/shop"
          className="sw-label mb-8 inline-block text-muted transition-colors hover:text-foreground"
        >
          &larr; Назад в магазин
        </Link>

        <div className="grid gap-12 lg:grid-cols-2">
          <ProductGallery
            images={product.images}
            title={product.title}
            imageAlt={product.imageAlt}
          />

          <div className="flex flex-col gap-3 sm:gap-6">
            <div>
              <p className="sw-label mb-2 text-accent">{{"sneakers":"Кроссовки","clothing":"Одежда","accessories":"Аксессуары","art-objects":"Арт-объекты","art":"Арт","certificates":"Сертификаты"}[product.category]}</p>
              <h1 className="sw-h1 text-2xl sm:text-4xl">{product.title}</h1>
            </div>

            <p className="sw-h2 text-xl text-accent sm:text-2xl">{formatPrice(product.price)}</p>

            <p className="sw-body text-sm text-text-secondary leading-relaxed sm:text-base">
              {product.description}
            </p>

            {product.longDescription && (
              <a
                href="#full-description"
                className="sw-label inline-flex items-center gap-1 self-start text-accent transition-colors hover:text-foreground"
              >
                Подробнее <span aria-hidden="true">&darr;</span>
              </a>
            )}

            {product.specs && product.specs.length > 0 && (
              <div className="space-y-2 border-t border-border pt-3 sm:space-y-3 sm:pt-6">
                {product.specs.map((spec) => (
                  <div key={spec.label} className="flex justify-between">
                    <span className="sw-caption text-muted">{spec.label}</span>
                    <span className="sw-body-sm text-foreground">{spec.value}</span>
                  </div>
                ))}
              </div>
            )}

            <AddToCartButton product={product} />
          </div>
        </div>

        {(product.longDescription || product.disclaimer) && (
          <div
            id="full-description"
            className="mx-auto mt-12 max-w-3xl space-y-6 scroll-mt-24"
          >
            {product.longDescription && (
              <div className="sw-body whitespace-pre-line text-text-secondary leading-relaxed">
                {product.longDescription}
              </div>
            )}
            {product.disclaimer && (
              <p className="sw-caption text-xs leading-relaxed text-muted">
                {product.disclaimer}
              </p>
            )}
          </div>
        )}
      </div>
    </section>
  );
}
