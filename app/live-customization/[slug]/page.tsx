import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getLocale } from "next-intl/server";
import { getLocaleCasesIndex, getLocaleCase } from "../../../lib/getContent";
import GalleryWithLightbox from "../../../components/shared/GalleryWithLightbox";
import PlaceholderImage from "../../../components/shared/PlaceholderImage";
import SectionHeader from "../../../components/shared/SectionHeader";
import EventCaseCta from "./EventCaseCta";

export async function generateStaticParams() {
  // Use the default (ru) locale for static params generation
  const casesIndex = (await import("../../../content/ru/cases/index.json")).default;
  return casesIndex.cases
    .filter((c: any) => c.category === "event")
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

export default async function EventCasePage({ params }: Props) {
  const { slug } = await params;

  let caseData: any;
  try {
    caseData = await getLocaleCase(slug);
  } catch {
    notFound();
  }

  if (!caseData) {
    notFound();
  }

  const locale = await getLocale();
  const isRu = locale === "ru";

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Hero */}
      <section className="px-6 py-6">
        <div className="mx-auto max-w-7xl">
          <Link
            href="/live-customization"
            className="sw-label mb-8 inline-flex items-center gap-2 text-text-secondary transition-colors hover:text-foreground"
          >
            &larr; {isRu ? "Все ивенты" : "All Events"}
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
        <section className="px-6 pb-6">
          <div className="mx-auto max-w-3xl">
            <SectionHeader badge={isRu ? "Детали" : "Details"} title={isRu ? "Об ивенте" : "About the Event"} />
            <div className="space-y-8">
              <div>
                <h3 className="sw-h3 mb-3 text-sm">Задача</h3>
                <p className="sw-body-sm text-text-secondary">
                  {caseData.details.task}
                </p>
              </div>
              <div>
                <h3 className="sw-h3 mb-3 text-sm">Решение</h3>
                <p className="sw-body-sm text-text-secondary">
                  {caseData.details.solution}
                </p>
              </div>
              <div>
                <h3 className="sw-h3 mb-3 text-sm">Результат</h3>
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
        <div className="mx-auto max-w-3xl text-center">
          <EventCaseCta />
        </div>
      </section>
    </div>
  );
}
