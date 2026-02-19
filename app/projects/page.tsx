"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import projectsContent from "../../content/projects.json";
import casesIndex from "../../content/cases/index.json";
import SectionHeader from "../../components/shared/SectionHeader";
import PlaceholderImage from "../../components/shared/PlaceholderImage";
import ModalForm from "../../components/shared/ModalForm";

export default function ProjectsPage() {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Hero + Banner */}
      <section className="px-6 pt-0 pb-0">
        <div className="relative mx-auto max-w-7xl overflow-hidden">
          <Image
            src="/projects-banner.png"
            alt="Кастомизированные кроссовки Puma — streetwave x бренд-проект"
            width={1920}
            height={540}
            className="h-[210px] w-full object-cover sm:h-[265px] md:h-[320px]"
            priority
          />
          <div className="absolute inset-0 bg-black/50" />
          <div className="absolute inset-0 flex flex-col items-center justify-center px-6 text-center">
            <p className="sw-label mb-4 text-accent">{projectsContent.hero.badge}</p>
            <h1 className="sw-h1 max-w-3xl text-3xl text-white sm:text-4xl md:text-5xl">
              {projectsContent.hero.title}
            </h1>
            <p className="mt-4 max-w-xl sw-body text-sm text-white/80">
              {projectsContent.hero.subtitle}
            </p>
            <button
              onClick={() => setModalOpen(true)}
              className="sw-btn mt-6 inline-flex h-10 items-center justify-center border border-accent bg-accent px-8 text-sm text-accent-foreground transition-colors hover:bg-transparent hover:text-accent"
            >
              Обсудить проект
            </button>
          </div>
        </div>
      </section>

      {/* Manifesto */}
      <section className="px-6 py-24">
        <div className="mx-auto max-w-3xl">
          <SectionHeader
            badge={projectsContent.manifesto.badge}
            title={projectsContent.manifesto.title}
          />
          <p className="sw-body text-text-secondary">
            {projectsContent.manifesto.text}
          </p>
        </div>
      </section>

      {/* Cases */}
      <section className="px-6 py-24">
        <div className="mx-auto max-w-7xl">
          <SectionHeader
            badge={projectsContent.cases.badge}
            title={projectsContent.cases.title}
          />

          {/* Featured case (first) */}
          {casesIndex.cases
            .filter((c) => c.featured)
            .map((c) => (
              <Link
                key={c.slug}
                href={`/projects/${c.slug}`}
                className="group mb-12 block border border-border bg-surface transition-colors hover:border-accent/20"
              >
                <div className="grid md:grid-cols-2">
                  <PlaceholderImage aspectRatio="16/10" />
                  <div className="flex flex-col justify-center p-8 md:p-12">
                    <p className="sw-label mb-2 text-accent">Флагманский проект</p>
                    <h3 className="sw-h2 mb-4 text-2xl sm:text-3xl">{c.title}</h3>
                    <p className="mb-2 text-xs text-muted">
                      {c.client} — {c.year}
                    </p>
                    <p className="sw-body-sm text-text-secondary">
                      {c.shortDesc}
                    </p>
                    <div className="mt-6 h-px w-8 bg-accent/20 transition-all group-hover:w-16 group-hover:bg-accent/60" />
                  </div>
                </div>
              </Link>
            ))}

          {/* Other cases */}
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {casesIndex.cases
              .filter((c) => !c.featured)
              .map((c) => (
                <Link
                  key={c.slug}
                  href={`/projects/${c.slug}`}
                  className="group"
                >
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
                </Link>
              ))}
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="px-6 py-24">
        <div className="mx-auto max-w-7xl">
          <SectionHeader
            badge={projectsContent.process.badge}
            title={projectsContent.process.title}
          />
          <div className="grid gap-px md:grid-cols-5">
            {projectsContent.process.steps.map((item) => (
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

      {/* CTA */}
      <section className="px-6 py-24">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="sw-h2 mb-6 text-3xl sm:text-4xl">{projectsContent.cta.title}</h2>
          <p className="mb-10 sw-body text-text-secondary">{projectsContent.cta.subtitle}</p>
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
