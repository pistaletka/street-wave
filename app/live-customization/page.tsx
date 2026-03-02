"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import liveContent from "../../content/live-customization.json";
import casesIndex from "../../content/cases/index.json";
import SectionHeader from "../../components/shared/SectionHeader";
import PlaceholderImage from "../../components/shared/PlaceholderImage";
import ModalForm from "../../components/shared/ModalForm";

export default function LiveCustomizationPage() {
  const [modalOpen, setModalOpen] = useState(false);

  const eventCases = casesIndex.cases.filter((c) => c.category === "event");

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Hero */}
      <section className="relative flex min-h-[70vh] flex-col items-center justify-center px-6 text-center overflow-hidden">
        <Image
          src="/live-hero-events.png"
          alt=""
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/60" />
        <div className="relative z-10 flex flex-col items-center">
          <p className="sw-label mb-6 text-accent">{liveContent.hero.badge}</p>
          <h1 className="sw-h1 max-w-3xl text-4xl sm:text-5xl md:text-6xl text-white">
            {liveContent.hero.title}
          </h1>
          <p className="mt-6 max-w-xl sw-body text-white/80">
            {liveContent.hero.subtitle}
          </p>
          <button
            onClick={() => setModalOpen(true)}
            className="sw-btn mt-10 inline-flex h-12 items-center justify-center border border-accent bg-accent px-8 text-accent-foreground transition-colors hover:bg-transparent hover:text-accent"
          >
            Обсудить проект
          </button>
        </div>
      </section>

      {/* Formats */}
      <section className="px-6 py-24">
        <div className="mx-auto max-w-7xl">
          <SectionHeader badge={liveContent.formats.badge} title={liveContent.formats.title} />
          <div className="grid gap-6 md:grid-cols-3">
            {liveContent.formats.items.map((fmt, idx) => {
              const bgImages = ["/live-custom-zone.png", "/live-limited-series.png", "/live-interactive.png"];
              const hasBg = idx < bgImages.length;
              return (
                <div
                  key={fmt.title}
                  className={`relative overflow-hidden border border-border p-8 ${hasBg ? "min-h-[320px]" : "bg-surface"}`}
                >
                  {hasBg && (
                    <>
                      <Image
                        src={bgImages[idx]}
                        alt=""
                        fill
                        className="object-cover"
                      />
                      <div className="absolute inset-0 bg-black/60" />
                    </>
                  )}
                  <div className={hasBg ? "relative z-10" : ""}>
                    <h3 className={`sw-h3 mb-4 text-lg ${hasBg ? "text-white" : ""}`}>{fmt.title}</h3>
                    <p className={`mb-6 sw-body-sm ${hasBg ? "text-white/80" : "text-text-secondary"}`}>
                      {fmt.desc}
                    </p>
                    <ul className="space-y-3">
                      {fmt.features.map((f) => (
                        <li
                          key={f}
                          className={`flex items-start gap-3 sw-body-sm ${hasBg ? "text-white/80" : "text-text-secondary"}`}
                        >
                          <span className="mt-1.5 block h-px w-3 shrink-0 bg-accent/40" />
                          {f}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Event cases */}
      <section className="px-6 py-24">
        <div className="mx-auto max-w-7xl">
          <SectionHeader
            badge={liveContent.cases.badge}
            title={liveContent.cases.title}
          />
          <div className="grid gap-6 grid-cols-2 lg:grid-cols-4">
            {eventCases.map((item) => (
              <Link
                key={item.slug}
                href={`/live-customization/${item.slug}`}
                className="group"
              >
                <div className="relative aspect-[4/5] border border-border bg-surface overflow-hidden transition-all duration-300 group-hover:border-accent">
                  {item.coverImage ? (
                    <Image
                      src={item.coverImage}
                      alt={item.title}
                      fill
                      className="object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                  ) : (
                    <PlaceholderImage aspectRatio="4/5" />
                  )}
                </div>
                <div className="mt-4">
                  <h3 className="sw-h3 text-sm transition-colors group-hover:text-accent">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-xs leading-relaxed text-text-secondary">
                    {item.shortDesc}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="px-6 py-24">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="sw-h2 mb-6 text-3xl sm:text-4xl">{liveContent.cta.title}</h2>
          <p className="mb-10 sw-body text-text-secondary">{liveContent.cta.subtitle}</p>
          <button
            onClick={() => setModalOpen(true)}
            className="sw-btn inline-flex h-12 items-center justify-center border border-accent bg-accent px-8 text-accent-foreground transition-colors hover:bg-transparent hover:text-accent"
          >
            Обсудить проект
          </button>
        </div>
      </section>

      <ModalForm
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        variant="brand-project"
        title="Обсудить проект"
      />
    </div>
  );
}
