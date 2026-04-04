"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { reachGoal } from "@/lib/analytics";
import { GOALS } from "@/lib/goals";
import SectionHeader from "../../components/shared/SectionHeader";
import PlaceholderImage from "../../components/shared/PlaceholderImage";
import ModalForm from "../../components/shared/ModalForm";

interface ProjectsPageClientProps {
  projectsContent: any;
  casesIndex: any;
}

export default function ProjectsPageClient({ projectsContent, casesIndex }: ProjectsPageClientProps) {
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => { reachGoal(GOALS.VISIT_PROJECTS); }, []);

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Hero + Banner */}
      <section className="relative overflow-hidden">
        <div className="relative">
          <Image
            src="/banner_desktop.jpg"
            alt="Кастомизированные кроссовки Puma - streetwave x бренд-проект"
            width={1920}
            height={540}
            className="h-[180px] w-full object-cover object-[center_70%] sm:h-[220px] md:h-[260px]"
            priority
          />
          <div className="absolute inset-0 bg-black/50" />
          <div className="absolute inset-0 flex flex-col items-center justify-center px-6 text-center">
            <p className="sw-label mb-3 text-accent">{projectsContent.hero.badge}</p>
            <h1 className="sw-h1 text-2xl text-white sm:text-3xl md:text-4xl whitespace-nowrap">
              {projectsContent.hero.title}
            </h1>
            <p className="mt-3 sw-body text-sm text-white/80">
              {projectsContent.hero.subtitle}
            </p>
            <button
              onClick={() => { reachGoal(GOALS.OPEN_MODAL_PROJECT); setModalOpen(true); }}
              className="sw-btn mt-6 inline-flex h-10 items-center justify-center border border-accent bg-accent px-8 text-sm text-accent-foreground transition-colors hover:bg-transparent hover:text-accent"
            >
              {projectsContent.hero?.ctaButton || "Обсудить проект"}
            </button>
          </div>
        </div>
      </section>

      {/* Manifesto */}
      <section className="px-6 pt-12 pb-0">
        <div className="mx-auto max-w-7xl">
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
      <section className="px-6 py-12">
        <div className="mx-auto max-w-7xl">
          <SectionHeader
            badge={projectsContent.cases.badge}
            title={projectsContent.cases.title}
          />

          {/* Featured case - No Concept */}
          {casesIndex.cases
            .filter((c: any) => c.category === "brand" && c.featured)
            .map((c: any) => (
              <Link
                key={c.slug}
                href={`/projects/${c.slug}`}
                className="group mb-12 block border border-border bg-surface transition-colors hover:border-accent/20"
              >
                <div className="grid md:grid-cols-2">
                  {"coverImage" in c && c.coverImage ? (
                    <div className="relative" style={{ aspectRatio: "16/10" }}>
                      <Image
                        src={c.coverImage}
                        alt={c.title}
                        fill
                        className="object-cover"
                      />
                    </div>
                  ) : (
                    <PlaceholderImage aspectRatio="16/10" />
                  )}
                  <div className="flex flex-col justify-center p-8 md:p-12">
                    <p className="sw-label mb-2 text-accent">{projectsContent.cases?.featuredLabel || "Флагманский проект"}</p>
                    <h3 className="sw-h2 mb-4 text-2xl sm:text-3xl">{c.title}</h3>
                    <p className="mb-2 text-xs text-muted">
                      {c.client} - {c.year}
                    </p>
                    <p className="sw-body-sm text-text-secondary">
                      {c.shortDesc}
                    </p>
                    <span className="mt-6 inline-flex items-center gap-1 text-xs uppercase tracking-widest text-accent opacity-70 transition-opacity group-hover:opacity-100">
                      {projectsContent.cases?.viewLabel || "Смотреть"} &rarr;
                    </span>
                  </div>
                </div>
              </Link>
            ))}

          {/* 4 cases in a row */}
          <div className="grid gap-6 grid-cols-2 lg:grid-cols-4">
            {["vk", "offwhite-xiaomi", "superstep", "cska", "christmas-balls", "sport-theme", "agama"]
              .map((slug: string) => casesIndex.cases.find((c: any) => c.slug === slug))
              .filter(Boolean)
              .map((c: any) => (
                <Link
                  key={c.slug}
                  href={`/projects/${c.slug}`}
                  className="group"
                >
                  <div className="relative overflow-hidden" style={{ aspectRatio: "4/5" }}>
                    {"coverImage" in c && c.coverImage ? (
                      <Image
                        src={c.coverImage}
                        alt={c.title}
                        fill
                        className="object-cover"
                      />
                    ) : (
                      <PlaceholderImage aspectRatio="4/5" />
                    )}
                    <div className="absolute inset-0 flex items-center justify-center bg-black/0 transition-colors group-hover:bg-black/40">
                      <span className="text-xs uppercase tracking-widest text-white opacity-0 transition-opacity group-hover:opacity-100">
                        {projectsContent.cases?.viewLabel || "Смотреть"} &rarr;
                      </span>
                    </div>
                  </div>
                  <div className="mt-4">
                    <h3 className="sw-h3 text-sm">{c.title}</h3>
                    <p className="mt-1 text-xs text-muted">
                      {c.client} - {c.year}
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
      <section className="px-6 py-12">
        <div className="mx-auto max-w-7xl">
          <SectionHeader
            badge={projectsContent.process.badge}
            title={projectsContent.process.title}
          />
          <div className="grid gap-px md:grid-cols-5">
            {projectsContent.process.steps.map((item: any) => (
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
      <section className="px-6 py-12">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="sw-h2 mb-6 text-3xl sm:text-4xl">{projectsContent.cta.title}</h2>
          <p className="mb-10 sw-body text-text-secondary">{projectsContent.cta.subtitle}</p>
          <button
            onClick={() => { reachGoal(GOALS.OPEN_MODAL_PROJECT); setModalOpen(true); }}
            className="sw-btn inline-flex h-12 items-center justify-center border border-accent bg-accent px-8 text-accent-foreground transition-colors hover:bg-transparent hover:text-accent"
          >
            {projectsContent.hero?.ctaButton || "Обсудить проект"}
          </button>
        </div>
      </section>

      <ModalForm
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        variant="brand-project"
        title={projectsContent.hero?.ctaButton || "Обсудить проект"}
      />
    </div>
  );
}
