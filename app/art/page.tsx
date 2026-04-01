import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import SectionHeader from "../../components/shared/SectionHeader";
import { getContent } from "../../lib/getContent";

export async function generateMetadata(): Promise<Metadata> {
  const content = await getContent<any>("art");
  return {
    title: content.meta.title,
    description: content.meta.description,
    openGraph: {
      title: content.meta.ogTitle ?? "Арт / Картины — streetwave®",
      description: content.meta.description,
      images: [{ url: "/og-image.jpg", width: 1200, height: 630 }],
    },
    alternates: { canonical: "/art" },
  };
}

export default async function ArtPage() {
  const content = await getContent<any>("art");
  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Hero Banner */}
      <section className="relative">
        <div className="relative mx-auto max-w-7xl overflow-hidden">
          <picture>
            <source media="(max-width: 639px)" srcSet="/art/mobile.png" />
            <source media="(max-width: 1023px)" srcSet="/art/tablet.png" />
            <Image
              src="/art/desktop.png"
              alt={content.hero.title}
              width={1920}
              height={540}
              className="h-auto w-full object-cover"
              priority
            />
          </picture>
          <div className="absolute inset-0 bg-black/40" />
          <div className="absolute inset-0 flex flex-col items-center justify-center px-6 text-center">
            <p className="sw-label mb-6 text-accent">{content.hero.badge}</p>
            <h1 className="sw-h1 max-w-3xl text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-white">
              {content.hero.title}
            </h1>
            <p className="sw-body mt-6 max-w-xl text-white/70">
              {content.hero.subtitle}
            </p>
          </div>
        </div>
      </section>

      {/* Manifesto */}
      <section className="px-6 py-6">
        <div className="mx-auto max-w-7xl">
          <SectionHeader
            badge={content.manifesto.badge}
            title={content.manifesto.title}
          />
          <div className="mx-auto max-w-3xl">
            {content.manifesto.text.split("\n\n").map((p: string, i: number) => (
              <p
                key={i}
                className="sw-body mb-6 text-text-secondary leading-relaxed"
              >
                {p}
              </p>
            ))}
          </div>
        </div>
      </section>

      {/* Lead Artist — StereoBoogie */}
      <section className="px-6 py-6 border-t border-border">
        <div className="mx-auto max-w-7xl">
          <SectionHeader badge={content.artist.badge} title="" />
          <div className="grid gap-12 md:grid-cols-2 items-center">
            <div className="relative aspect-[4/5] overflow-hidden bg-surface">
              <Image
                src="/IMG_1415.JPG"
                alt="StereoBoogie"
                fill
                className="object-cover"
              />
            </div>
            <div>
              <h2 className="sw-h2 text-3xl sm:text-4xl md:text-5xl mb-2">
                {content.artist.name}
              </h2>
              <p className="sw-label text-accent mb-8">
                {content.artist.role}
              </p>
              <p className="sw-body text-text-secondary leading-relaxed mb-10">
                {content.artist.bio}
              </p>
              <Link
                href="/art/stereoboogie"
                className="sw-btn inline-flex h-12 items-center justify-center border border-accent bg-accent px-8 text-accent-foreground transition-colors hover:bg-transparent hover:text-accent"
              >
                {content.artist.cta}
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Paintings in Interiors */}
      <section className="px-6 py-6 border-t border-border">
        <div className="mx-auto max-w-7xl">
          <SectionHeader
            badge={content.gallery.badge}
            title={content.gallery.interiorsTitle}
          />
          <div className="grid gap-4 grid-cols-2 sm:grid-cols-3 lg:grid-cols-5">
            {Array.from({ length: 10 }).map((_, i) => {
              const ext = i === 2 ? "jpeg" : "jpg";
              return (
                <div key={i} className="group">
                  <div className="relative aspect-[4/5] overflow-hidden bg-surface border border-border transition-colors group-hover:border-accent">
                    <Image
                      src={`/art/interiors/${i + 1}.${ext}`}
                      alt={`Картина в интерьере ${i + 1}`}
                      fill
                      className="object-cover"
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Art Services */}
      <section className="px-6 py-6 border-t border-border">
        <div className="mx-auto max-w-7xl">
          <SectionHeader
            badge={content.services.badge}
            title={content.services.title}
          />
          <div className="grid gap-px md:grid-cols-5">
            {content.services.items.map((item: any, i: number) => (
              <div
                key={i}
                className="border border-border p-8 transition-colors hover:border-accent"
              >
                <h3 className="sw-h3 mb-3">{item.title}</h3>
                <p className="sw-caption text-text-secondary">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="px-6 py-6 border-t border-border">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="sw-h2 mb-4 text-2xl sm:text-3xl">
            {content.cta.title}
          </h2>
          <p className="sw-body mb-10 text-text-secondary">
            {content.cta.subtitle}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/place-order"
              className="sw-btn inline-flex h-12 items-center justify-center border border-accent bg-accent px-8 text-accent-foreground transition-colors hover:bg-transparent hover:text-accent"
            >
              {content.cta.primary}
            </Link>
            <Link
              href="/contacts"
              className="sw-btn inline-flex h-12 items-center justify-center border border-border bg-background px-8 text-foreground transition-colors hover:border-accent"
            >
              {content.cta.secondary}
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
