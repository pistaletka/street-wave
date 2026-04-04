import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import SectionHeader from "../../../components/shared/SectionHeader";
import GalleryWithLightbox from "../../../components/shared/GalleryWithLightbox";
import { getContent } from "../../../lib/getContent";

export async function generateMetadata(): Promise<Metadata> {
  const content = await getContent<any>("stereoboogie");
  return {
    title: content.meta.title,
    description: content.meta.description,
    openGraph: {
      title: content.meta.ogTitle ?? "StereoBoogie - streetwave®",
      description: content.meta.description,
      images: [{ url: "/og-image.jpg", width: 1200, height: 630 }],
    },
    alternates: { canonical: "/art/stereoboogie" },
  };
}

const paintings = [
  { src: "/art/paintings/1.jpg", caption: "Change, смешанная техника, холст, акрил, 100x100 см, 2020" },
  { src: "/art/paintings/2.jpg", caption: "Lemon Haze" },
  { src: "/art/paintings/3.jpg", caption: "Raspad" },
  { src: "/art/paintings/4.jpg", caption: "Cash Only" },
  { src: "/art/paintings/5.jpg", caption: "Cicada 3302" },
  { src: "/art/paintings/6.jpg", caption: "Crystal 33" },
  { src: "/art/paintings/7.jpg", caption: "Shib2Face" },
  { src: "/art/paintings/8.jpg", caption: "Enjoy" },
  { src: "/art/paintings/9.jpg", caption: "Stereo Nature" },
  { src: "/art/paintings/10.jpg", caption: "Neutron Noisy" },
  { src: "/art/paintings/11.jpg", caption: "Stereo Setup" },
  { src: "/art/paintings/12.jpg", caption: "Fireboy" },
  { src: "/art/paintings/13.jpg", caption: "No Title" },
  { src: "/art/paintings/14.jpg", caption: "Playgerl, 2025" },
  { src: "/art/paintings/15.jpg", caption: "NAS, 2025" },
  { src: "/art/paintings/16.jpg", caption: "На коне, 2026" },
  { src: "/art/paintings/17.jpg", caption: "РМЧС" },
  { src: "/art/paintings/18.jpg", caption: "Ловушка разума" },
  { src: "/art/paintings/19.jpg", caption: "Ловушка разума II" },
  { src: "/art/paintings/20.jpg", caption: "Replace Error, 2022" },
  { src: "/art/paintings/21.jpg", caption: "Future Doubts, 120x100 см, 2022" },
  { src: "/art/paintings/22.jpg", caption: "Elastic Dreams, 2025" },
  { src: "/art/paintings/23.jpg", caption: "Soft Armor, 2025" },
  { src: "/art/paintings/24.jpg", caption: "Сон, летящей на осе" },
  { src: "/art/paintings/25.jpg", caption: "Слушатель нейтронных звёзд" },
  { src: "/art/paintings/26.jpg", caption: "Selfie 644" },
];
const prints = Array.from({ length: 25 }, (_, i) => `/art/prints/${i + 1}.jpg`);
const figures = Array.from({ length: 14 }, (_, i) => `/art/figures/${i + 1}.jpeg`);
const hovers = Array.from({ length: 3 }, (_, i) => `/art/hovers/${i + 1}.png`);

export default async function StereoBoogiePage() {
  const content = await getContent<any>("stereoboogie");
  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Hero + Photo */}
      <section className="px-6 py-6">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-12 md:grid-cols-2 items-start">
            <div>
              <p className="sw-label mb-2 text-accent">{content.hero.badge}</p>
              <h1 className="sw-h1 mb-2 text-4xl sm:text-5xl md:text-6xl">
                {content.hero.name}
              </h1>
              <p className="sw-body text-text-secondary mb-10">{content.hero.subtitle}</p>
              {content.bio.text.split("\n\n").map((p: string, i: number) => (
                <p key={i} className="sw-body text-text-secondary text-lg leading-relaxed mb-4 last:mb-0">
                  {p}
                </p>
              ))}
            </div>
            <div className="relative aspect-[4/5] overflow-hidden bg-surface">
              <Image
                src="/art/photos/3.jpeg"
                alt="StereoBoogie в студии"
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Artist Statement */}
      <section className="px-6 py-6 border-t border-border">
        <div className="mx-auto max-w-7xl">
          <SectionHeader
            badge={content.statement.badge}
            title={content.statement.title}
          />
          <div className="mx-auto max-w-3xl">
            {content.statement.paragraphs.map((p: any, i: number) => (
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
      <section className="px-6 py-6 border-t border-border">
        <div className="mx-auto max-w-7xl">
          <SectionHeader
            badge={content.visualLanguage.badge}
            title={content.visualLanguage.title}
          />
          <div className="grid gap-px md:grid-cols-5">
            {content.visualLanguage.items.map((item: any, i: number) => (
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

      {/* Paintings Gallery */}
      <section className="px-6 py-6 border-t border-border">
        <div className="mx-auto max-w-7xl">
          <SectionHeader badge={content.galleries.paintingsBadge} title={content.galleries.paintingsTitle} />
          <GalleryWithLightbox images={paintings} title="Картины StereoBoogie" />
        </div>
      </section>

      {/* Prints Gallery */}
      <section className="px-6 py-6 border-t border-border">
        <div className="mx-auto max-w-7xl">
          <SectionHeader badge={content.galleries.printsBadge} title={content.galleries.printsTitle} />
          <GalleryWithLightbox images={prints} title="Принты StereoBoogie" />
        </div>
      </section>

      {/* Art Toys with Brisko */}
      <section className="px-6 py-6 border-t border-border">
        <div className="mx-auto max-w-7xl">
          <SectionHeader badge={content.galleries.figuresBadge} title={content.galleries.figuresTitle} />
          <GalleryWithLightbox images={figures} title="Фигурки StereoBoogie × Brisko" />
        </div>
      </section>

      {/* Hovers Collaboration */}
      <section className="px-6 py-6 border-t border-border">
        <div className="mx-auto max-w-7xl">
          <SectionHeader badge={content.galleries.hoversBadge} title={content.galleries.hoversTitle} />
          <GalleryWithLightbox images={hovers} title="StereoBoogie × Hovers" />
        </div>
      </section>

      {/* Series */}
      <section className="px-6 py-6 border-t border-border">
        <div className="mx-auto max-w-7xl">
          <SectionHeader
            badge={content.series.badge}
            title={content.series.title}
          />
          <div className="grid gap-12 md:grid-cols-2">
            {content.series.items.map((series: any, i: number) => (
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

      {/* Key Projects & Collaborations */}
      <section className="px-6 py-6 border-t border-border">
        <div className="mx-auto max-w-7xl">
          <SectionHeader
            badge={content.projects.badge}
            title={content.projects.title}
          />
          <div className="grid gap-6 md:grid-cols-2">
            {content.projects.items.map((project: any, i: number) => (
              <div key={i} className="border border-border p-10 transition-colors hover:border-accent">
                <p className="sw-label text-accent mb-4">{project.year}</p>
                <h3 className="sw-h2 text-xl sm:text-2xl mb-4">
                  {project.title}
                </h3>
                <p className="sw-body text-text-secondary leading-relaxed">
                  {project.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Exhibitions */}
      <section className="px-6 py-6 border-t border-border">
        <div className="mx-auto max-w-7xl">
          <SectionHeader
            badge={content.exhibitions.badge}
            title={content.exhibitions.title}
          />
          <div className="mx-auto max-w-3xl">
            {content.exhibitions.items.map((item: any, i: number) => (
              <div
                key={i}
                className="flex gap-6 border-b border-border py-6 last:border-b-0"
              >
                <p className="sw-label text-accent min-w-[100px] pt-1">
                  {item.year}
                </p>
                <div>
                  <p className="sw-body text-foreground">{item.title}</p>
                  <p className="sw-caption text-text-secondary mt-1">
                    {item.venue}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Media & Practice */}
      <section className="px-6 py-6 border-t border-border">
        <div className="mx-auto max-w-7xl">
          <SectionHeader
            badge={content.media.badge}
            title={content.media.title}
          />
          <div className="grid gap-px md:grid-cols-5">
            {content.media.items.map((item: any, i: number) => (
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
      <section className="px-6 py-6 border-t border-border">
        <div className="mx-auto max-w-7xl">
          <SectionHeader badge={content.role.badge} title={content.role.title} />
          <p className="sw-body mx-auto max-w-3xl text-text-secondary leading-relaxed">
            {content.role.text}
          </p>
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
              {content.cta.buttons?.primary || "Запросить сотрудничество"}
            </Link>
            <Link
              href="/contacts"
              className="sw-btn inline-flex h-12 items-center justify-center border border-border bg-background px-8 text-foreground transition-colors hover:border-accent"
            >
              {content.cta.buttons?.secondary || "Связаться"}
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
