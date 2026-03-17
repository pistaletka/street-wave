import type { Metadata } from "next";
import Link from "next/link";
import content from "../content/home.json";
import SectionHeader from "../components/shared/SectionHeader";
import Image from "next/image";
import PlaceholderImage from "../components/shared/PlaceholderImage";
import HeroSlider from "../components/HeroSlider";


export const metadata: Metadata = {
  title: content.meta.title,
  description: content.meta.description,
};

export default function Home() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* 1. Hero */}
      <HeroSlider
        badge={content.hero.badge}
        badgeSub={content.hero.badgeSub}
        title={content.hero.title}
        subtitle={content.hero.subtitle}
        cta1={content.hero.cta1}
        cta2={content.hero.cta2}
      />

      {/* 2. About */}
      <section className="px-6 py-6">
        <div className="mx-auto max-w-7xl">
          <SectionHeader badge={content.about.badge} title={content.about.title} />
          <div className="grid gap-12 md:grid-cols-2">
            <div className="relative aspect-[16/9] overflow-hidden">
              <Image
                src="/team.png"
                alt="Команда Street Wave"
                fill
                className="object-cover"
              />
            </div>
            <div className="flex flex-col justify-center">
              <p className="sw-body text-text-secondary whitespace-pre-line">
                {content.about.text}
              </p>
              <Link
                href={content.about.cta.href}
                className="sw-btn mt-8 inline-flex h-12 w-fit items-center justify-center border border-border px-8 text-foreground transition-colors hover:border-accent hover:text-accent"
              >
                {content.about.cta.label}
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Directions */}
      <section className="px-6 pt-6 pb-8">
        <div className="mx-auto max-w-7xl">
          <SectionHeader badge={content.directions.badge} title={content.directions.title} />
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {content.directions.items.map((dir) => (
              <Link
                key={dir.title}
                href={dir.href}
                className="group relative overflow-hidden border border-border aspect-[4/3] flex flex-col justify-end transition-colors hover:border-accent/20"
              >
                <Image
                  src={dir.image}
                  alt={dir.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/50" />
                <div className="absolute inset-x-0 bottom-0 z-10 p-8">
                  <h3 className="sw-h3 text-lg text-white h-[3.5rem]">{dir.title}</h3>
                  <p className="sw-body-sm text-white/70 h-[4.5rem]">{dir.desc}</p>
                  <div className="mt-4 h-px w-8 bg-accent/20 transition-all group-hover:w-16 group-hover:bg-accent/60" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Process */}
      <section className="px-6 pt-8 pb-8">
        <div className="mx-auto max-w-7xl">
          <SectionHeader badge={content.process.badge} title={content.process.title} />
          <div className="grid gap-px md:grid-cols-4">
            {content.process.steps.map((item) => (
              <div key={item.step} className="border border-border bg-surface p-8">
                <span className="font-mono text-xs tracking-widest text-accent">
                  {item.step}
                </span>
                <h3 className="sw-h3 mt-3 mb-3 text-lg">{item.title}</h3>
                <p className="sw-body-sm text-text-secondary">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. Clients */}
      <section className="px-6 pt-8 pb-6">
        <div className="mx-auto max-w-7xl">
          <SectionHeader badge={content.clients.badge} title={content.clients.title} />
          <div className="grid grid-cols-3 gap-px sm:grid-cols-4 lg:grid-cols-7">
            {content.clients.logos.map((logo: { name: string; src: string }) => (
              <div
                key={logo.name}
                className="flex h-20 items-center justify-center border border-border bg-surface px-5"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={logo.src}
                  alt={logo.name}
                  className="h-6 w-auto max-w-[120px] object-contain opacity-60 transition-opacity hover:opacity-100"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. Why us */}
      <section className="px-6 py-6">
        <div className="mx-auto max-w-7xl">
          <SectionHeader badge={content.whyUs.badge} title={content.whyUs.title} />
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {content.whyUs.items.map((item) => (
              <div key={item.title} className="border border-border bg-surface p-8">
                <h3 className="sw-h3 mb-4 text-sm">{item.title}</h3>
                <p className="sw-body-sm text-text-secondary">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 7. Shop teaser */}
      <section className="px-6 py-6">
        <div className="mx-auto max-w-3xl text-center">
          <p className="sw-label mb-2 text-accent">{content.shop.badge}</p>
          <h2 className="sw-h2 mb-6 text-3xl sm:text-4xl">{content.shop.title}</h2>
          <p className="sw-body text-text-secondary">{content.shop.text}</p>
        </div>
      </section>

      {/* 8. Geo */}
      <section className="px-6 py-6">
        <div className="mx-auto max-w-3xl">
          <SectionHeader badge={content.geo.badge} title={content.geo.title} />
          <p className="sw-body text-text-secondary">{content.geo.text}</p>
        </div>
      </section>

      {/* 9. Final CTA */}
      <section className="px-6 py-6">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="sw-h2 mb-6 text-3xl sm:text-4xl">{content.finalCta.title}</h2>
          <p className="mb-10 text-base text-text-secondary">{content.finalCta.subtitle}</p>
          <div className="flex flex-col justify-center gap-4 sm:flex-row">
            <Link
              href={content.finalCta.cta1.href}
              className="sw-btn inline-flex h-12 items-center justify-center border border-accent bg-accent px-8 text-accent-foreground transition-colors hover:bg-transparent hover:text-accent"
            >
              {content.finalCta.cta1.label}
            </Link>
            <Link
              href={content.finalCta.cta2.href}
              className="sw-btn inline-flex h-12 items-center justify-center border border-border px-8 text-foreground transition-colors hover:border-accent hover:text-accent"
            >
              {content.finalCta.cta2.label}
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
