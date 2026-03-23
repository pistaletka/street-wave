import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import SectionHeader from "../../../components/shared/SectionHeader";
import { getContent } from "../../../lib/getContent";

export async function generateMetadata(): Promise<Metadata> {
  const content = await getContent<any>("stereoboogie");
  return {
    title: content.meta.title,
    description: content.meta.description,
    openGraph: {
      title: content.meta.ogTitle ?? "StereoBoogie — streetwave®",
      description: content.meta.description,
      images: [{ url: "/opengraph-image", width: 1200, height: 630 }],
    },
    alternates: { canonical: "/art/stereoboogie" },
  };
}

export default async function StereoBoogiePage() {
  const content = await getContent<any>("stereoboogie");
  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Hero */}
      <section className="relative">
        <div className="relative mx-auto max-w-7xl overflow-hidden">
          <Image
            src="/art/desktop.png"
            alt="StereoBoogie"
            width={1920}
            height={800}
            className="h-[55vh] w-full object-cover sm:h-[60vh] md:h-[70vh]"
            priority
          />
          <div className="absolute inset-0 bg-black/50" />
          <div className="absolute inset-0 flex flex-col items-center justify-end px-6 pb-16 text-center">
            <p className="sw-label mb-4 text-accent">{content.hero.badge}</p>
            <h1 className="sw-h1 text-5xl sm:text-6xl md:text-7xl lg:text-8xl text-white">
              {content.hero.name}
            </h1>
            <p className="sw-body mt-4 text-white/60">{content.hero.subtitle}</p>
          </div>
        </div>
      </section>

      {/* Short Bio */}
      <section className="px-6 py-24 md:py-32">
        <div className="mx-auto max-w-7xl">
          <SectionHeader badge={content.bio.badge} title="" />
          <p className="sw-body mx-auto max-w-3xl text-text-secondary text-lg leading-relaxed">
            {content.bio.text}
          </p>
        </div>
      </section>

      {/* Artist Statement */}
      <section className="px-6 py-24 md:py-32 border-t border-border">
        <div className="mx-auto max-w-7xl">
          <SectionHeader
            badge={content.statement.badge}
            title={content.statement.title}
          />
          <div className="mx-auto max-w-3xl">
            {content.statement.paragraphs.map((p, i) => (
              <p
                key={i}
                className="sw-body mb-8 text-text-secondary leading-relaxed last:mb-0"
              >
                {p}
              </p>
            ))}
          </div>
        </div>
      </section>

      {/* Visual Language */}
      <section className="px-6 py-24 md:py-32 border-t border-border">
        <div className="mx-auto max-w-7xl">
          <SectionHeader
            badge={content.visualLanguage.badge}
            title={content.visualLanguage.title}
          />
          <div className="grid gap-px md:grid-cols-5">
            {content.visualLanguage.items.map((item, i) => (
              <div
                key={i}
                className="border border-border p-8 transition-colors hover:border-accent"
              >
                <p className="sw-label text-accent mb-4">0{i + 1}</p>
                <h3 className="sw-h3 mb-3">{item.title}</h3>
                <p className="sw-caption text-text-secondary">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Series */}
      <section className="px-6 py-24 md:py-32 border-t border-border">
        <div className="mx-auto max-w-7xl">
          <SectionHeader
            badge={content.series.badge}
            title={content.series.title}
          />
          <div className="grid gap-12 md:grid-cols-2">
            {content.series.items.map((series, i) => (
              <div key={i} className="border border-border p-10">
                <p className="sw-label text-accent mb-4">{series.years}</p>
                <h3 className="sw-h2 text-2xl sm:text-3xl mb-6">
                  {series.title}
                </h3>
                <p className="sw-body text-text-secondary leading-relaxed">
                  {series.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery */}
      <section className="px-6 py-24 md:py-32 border-t border-border">
        <div className="mx-auto max-w-7xl">
          <SectionHeader badge="Работы" title="Галерея" />
          <div className="grid gap-6 grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="group">
                <div className="relative aspect-[4/5] overflow-hidden bg-surface border border-border transition-colors group-hover:border-accent">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="sw-caption text-muted/40">Скоро</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Media & Practice */}
      <section className="px-6 py-24 md:py-32 border-t border-border">
        <div className="mx-auto max-w-7xl">
          <SectionHeader
            badge={content.media.badge}
            title={content.media.title}
          />
          <div className="grid gap-px md:grid-cols-5">
            {content.media.items.map((item, i) => (
              <div
                key={i}
                className="border border-border p-8 flex items-center"
              >
                <p className="sw-body-sm text-foreground">{item}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Street Wave Role */}
      <section className="px-6 py-24 md:py-32 border-t border-border">
        <div className="mx-auto max-w-7xl">
          <SectionHeader badge={content.role.badge} title={content.role.title} />
          <p className="sw-body mx-auto max-w-3xl text-text-secondary leading-relaxed">
            {content.role.text}
          </p>
        </div>
      </section>

      {/* CTA */}
      <section className="px-6 py-24 md:py-32 border-t border-border">
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
              Запросить сотрудничество
            </Link>
            <Link
              href="/contacts"
              className="sw-btn inline-flex h-12 items-center justify-center border border-border bg-background px-8 text-foreground transition-colors hover:border-accent"
            >
              Связаться
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
