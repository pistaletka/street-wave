import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getLocaleCasesIndex, getLocaleCase } from "../../../lib/getContent";
import GalleryWithLightbox from "../../../components/shared/GalleryWithLightbox";
import SectionHeader from "../../../components/shared/SectionHeader";
import ProjectCta from "./ProjectCta";

export async function generateStaticParams() {
  // Use the default (ru) locale for static params generation
  const casesIndex = (await import("../../../content/ru/cases/index.json")).default;
  return casesIndex.cases
    .filter((c: any) => c.category === "brand")
    .map((c: any) => ({ slug: c.slug }));
}

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  try {
    const caseData = await getLocaleCase(slug);
    return {
      title: `${caseData.title} - streetwave®`,
      description: caseData.description,
    };
  } catch {
    return {};
  }
}

export default async function CasePage({ params }: Props) {
  const { slug } = await params;
  const locale = (await import("next-intl/server")).getLocale;
  const currentLocale = await locale();
  const en = currentLocale === "en";

  let caseData: any;
  try {
    caseData = await getLocaleCase(slug);
  } catch {
    notFound();
  }

  if (!caseData) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Hero */}
      <section className="px-6 py-6">
        <div className="mx-auto max-w-7xl">
          <Link
            href="/projects"
            className="sw-label mb-8 inline-flex items-center gap-2 text-text-secondary transition-colors hover:text-foreground"
          >
            &larr; {en ? "All projects" : "Все проекты"}
          </Link>
          <p className="sw-label mb-2 text-accent">
            {caseData.client} - {caseData.year}
          </p>
          <h1 className="sw-h1 mb-6 text-4xl sm:text-5xl md:text-6xl">
            {caseData.title}
          </h1>
          <p className="max-w-2xl sw-body text-text-secondary">
            {caseData.description}
          </p>
          {caseData.details && (
            <a
              href="#details"
              className="mt-6 inline-flex items-center gap-1 text-xs uppercase tracking-widest text-accent transition-opacity hover:opacity-70"
            >
              {en ? "About the project" : "О проекте"} &darr;
            </a>
          )}
        </div>
      </section>

      {/* Stats */}
      {caseData.stats && caseData.stats.length > 0 && (
        <section className="px-6 pb-6">
          <div className="mx-auto max-w-7xl">
            <div className="grid gap-6 sm:grid-cols-3">
              {caseData.stats.map((stat: any) => (
                <div
                  key={stat.label}
                  className="border border-border bg-surface p-8 text-center"
                >
                  <p className="text-3xl font-medium text-foreground">{stat.value}</p>
                  <p className="mt-2 sw-label text-muted">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Gallery */}
      <section className="px-6 pb-6">
        <div className="mx-auto max-w-7xl">
          <GalleryWithLightbox
            images={caseData.gallery}
            title={caseData.title}
          />
        </div>
      </section>

      {/* Details */}
      {caseData.details && (
        <section id="details" className="px-6 pb-6 scroll-mt-6">
          <div className="mx-auto max-w-3xl">
            <SectionHeader badge={en ? "Details" : "Детали"} title={en ? "About the project" : "О проекте"} />
            <div className="space-y-8">
              <div>
                <h3 className="sw-h3 mb-3 text-sm">{en ? "Task" : "Задача"}</h3>
                <p className="sw-body-sm text-text-secondary">
                  {caseData.details.task}
                </p>
              </div>
              <div>
                <h3 className="sw-h3 mb-3 text-sm">{en ? "Solution" : "Решение"}</h3>
                <p className="sw-body-sm text-text-secondary">
                  {caseData.details.solution}
                </p>
              </div>
              <div>
                <h3 className="sw-h3 mb-3 text-sm">{en ? "Result" : "Результат"}</h3>
                <p className="sw-body-sm text-text-secondary">
                  {caseData.details.result}
                </p>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* CTA */}
      <section className="px-6 pb-6">
        <div className="mx-auto max-w-3xl flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href="/projects"
            className="sw-btn inline-flex h-12 items-center justify-center border border-border px-8 text-foreground transition-colors hover:border-accent hover:text-accent"
          >
            Все проекты
          </Link>
          <ProjectCta />
        </div>
      </section>
    </div>
  );
}
