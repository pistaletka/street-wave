"use client";

import { useState } from "react";
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
      <section className="flex min-h-[50vh] flex-col items-center justify-center px-6 text-center">
        <p className="sw-label mb-6 text-accent">{liveContent.hero.badge}</p>
        <h1 className="sw-h1 max-w-3xl text-4xl sm:text-5xl md:text-6xl">
          {liveContent.hero.title}
        </h1>
        <p className="mt-6 max-w-xl sw-body text-text-secondary">
          {liveContent.hero.subtitle}
        </p>
        <button
          onClick={() => setModalOpen(true)}
          className="sw-btn mt-10 inline-flex h-12 items-center justify-center border border-accent bg-accent px-8 text-accent-foreground transition-colors hover:bg-transparent hover:text-accent"
        >
          Обсудить проект
        </button>
      </section>

      {/* Formats */}
      <section className="px-6 py-24">
        <div className="mx-auto max-w-7xl">
          <SectionHeader badge={liveContent.formats.badge} title={liveContent.formats.title} />
          <div className="grid gap-6 md:grid-cols-3">
            {liveContent.formats.items.map((fmt) => (
              <div
                key={fmt.title}
                className="border border-border bg-surface p-8"
              >
                <h3 className="sw-h3 mb-4 text-lg">{fmt.title}</h3>
                <p className="mb-6 sw-body-sm text-text-secondary">
                  {fmt.desc}
                </p>
                <ul className="space-y-3">
                  {fmt.features.map((f) => (
                    <li
                      key={f}
                      className="flex items-start gap-3 sw-body-sm text-text-secondary"
                    >
                      <span className="mt-1.5 block h-px w-3 shrink-0 bg-accent/40" />
                      {f}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Event cases */}
      {eventCases.length > 0 && (
        <section className="px-6 py-24">
          <div className="mx-auto max-w-7xl">
            <SectionHeader
              badge={liveContent.cases.badge}
              title={liveContent.cases.title}
            />
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {eventCases.map((c) => (
                <div key={c.slug} className="group">
                  <PlaceholderImage aspectRatio="4/5" />
                  <div className="mt-4">
                    <h3 className="sw-h3 text-sm">{c.title}</h3>
                    <p className="mt-1 text-xs text-muted">
                      {c.client} — {c.year}
                    </p>
                    <p className="mt-2 text-xs leading-relaxed text-text-secondary">
                      {c.shortDesc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

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
