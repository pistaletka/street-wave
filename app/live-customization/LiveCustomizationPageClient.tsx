"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { reachGoal } from "@/lib/analytics";
import { GOALS } from "@/lib/goals";
import SectionHeader from "../../components/shared/SectionHeader";
import PlaceholderImage from "../../components/shared/PlaceholderImage";
import ModalForm from "../../components/shared/ModalForm";

interface LiveCustomizationPageClientProps {
  liveContent: any;
  casesIndex: any;
}

export default function LiveCustomizationPageClient({ liveContent, casesIndex }: LiveCustomizationPageClientProps) {
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => { reachGoal(GOALS.VISIT_LIVE_CUSTOMIZATION); }, []);

  const eventCases = casesIndex.cases.filter((c: any) => c.category === "event");

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Hero */}
      <section className="relative flex min-h-[50vh] flex-col items-center justify-center px-6 text-center overflow-hidden">
        <Image
          src="/live-hero-events.jpg"
          alt=""
          fill
          sizes="100vw"
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/60" />
        <div className="relative z-10 flex flex-col items-center">
          <p className="sw-label mb-6 text-accent">{liveContent.hero.badge}</p>
          <h1 className="sw-h1 max-w-3xl text-4xl sm:text-5xl md:text-6xl text-white">
            {liveContent.hero.title}
          </h1>
          <p className="mt-6 max-w-2xl sw-body text-white/80">
            {liveContent.hero.subtitle.split(". ").map((s: string, i: number, arr: string[]) => (
              <span key={i} className="block">{s}{i < arr.length - 1 ? "." : ""}</span>
            ))}
          </p>
          <button
            onClick={() => { reachGoal(GOALS.OPEN_MODAL_EVENT); setModalOpen(true); }}
            className="sw-btn mt-10 inline-flex h-12 items-center justify-center border border-accent bg-accent px-8 text-accent-foreground transition-colors hover:bg-transparent hover:text-accent"
          >
            {liveContent.cta?.button || "Обсудить ивент"}
          </button>
        </div>
      </section>

      {/* Formats */}
      <section className="px-6 py-6">
        <div className="mx-auto max-w-7xl">
          <SectionHeader badge={liveContent.formats.badge} title={liveContent.formats.title} />
          <div className="grid gap-6 md:grid-cols-3">
            {liveContent.formats.items.map((fmt: any, idx: number) => {
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
                        sizes="(max-width: 768px) 100vw, 33vw"
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
                      {fmt.features.map((f: string) => (
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
      <section className="px-6 py-6">
        <div className="mx-auto max-w-7xl">
          <SectionHeader
            badge={liveContent.cases.badge}
            title={liveContent.cases.title}
          />
          <div className="grid gap-6 grid-cols-2 lg:grid-cols-4">
            {eventCases.map((item: any) => (
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
                      sizes="(max-width: 640px) 50vw, 25vw"
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
      <section className="px-6 py-6">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="sw-h2 mb-6 text-3xl sm:text-4xl">{liveContent.cta.title}</h2>
          <p className="mb-10 sw-body text-text-secondary">{liveContent.cta.subtitle}</p>
          <button
            onClick={() => { reachGoal(GOALS.OPEN_MODAL_EVENT); setModalOpen(true); }}
            className="sw-btn inline-flex h-12 items-center justify-center border border-accent bg-accent px-8 text-accent-foreground transition-colors hover:bg-transparent hover:text-accent"
          >
            {liveContent.cta?.button || "Обсудить ивент"}
          </button>
        </div>
      </section>

      <ModalForm
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        variant="brand-project"
        title={liveContent.cta?.button || "Обсудить ивент"}
        sourceOverride="live-event"
      />
    </div>
  );
}
