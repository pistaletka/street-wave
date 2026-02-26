import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import casesIndex from "../../../content/cases/index.json";
import PlaceholderImage from "../../../components/shared/PlaceholderImage";
import SectionHeader from "../../../components/shared/SectionHeader";

// Import all case data
import newConcept from "../../../content/cases/new-concept.json";
import superstep from "../../../content/cases/superstep.json";
import reebokZivert from "../../../content/cases/reebok-zivert.json";
import agama from "../../../content/cases/agama.json";
import yandexMarket from "../../../content/cases/yandex-market.json";
import dolceGabbana from "../../../content/cases/dolce-gabbana.json";
import pinko from "../../../content/cases/pinko.json";
import offwhiteXiaomi from "../../../content/cases/offwhite-xiaomi.json";

type CaseData = Omit<typeof newConcept, "gallery" | "coverImage"> & {
  gallery: (string | null)[];
  coverImage?: string;
};

const caseDataMap: Record<string, CaseData> = {
  "new-concept": newConcept,
  superstep,
  "reebok-zivert": reebokZivert,
  agama,
  "yandex-market": yandexMarket,
  "dolce-gabbana": dolceGabbana,
  pinko,
  "offwhite-xiaomi": offwhiteXiaomi,
};

export function generateStaticParams() {
  return casesIndex.cases.map((c) => ({ slug: c.slug }));
}

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const caseData = caseDataMap[slug];
  if (!caseData) return {};
  return {
    title: `${caseData.title} — streetwave®`,
    description: caseData.description,
  };
}

export default async function CasePage({ params }: Props) {
  const { slug } = await params;
  const caseData = caseDataMap[slug];

  if (!caseData) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Hero */}
      <section className="px-6 py-24">
        <div className="mx-auto max-w-7xl">
          <Link
            href="/projects"
            className="sw-label mb-8 inline-flex items-center gap-2 text-text-secondary transition-colors hover:text-foreground"
          >
            &larr; Все проекты
          </Link>
          <p className="sw-label mb-2 text-accent">
            {caseData.client} — {caseData.year}
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
        <section className="px-6 pb-24">
          <div className="mx-auto max-w-7xl">
            <div className="grid gap-6 sm:grid-cols-3">
              {caseData.stats.map((stat) => (
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
      <section className="px-6 pb-24">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-6 grid-cols-2 lg:grid-cols-4">
            {caseData.gallery.map((item, i) =>
              item ? (
                <div key={i} className="relative" style={{ aspectRatio: "4/5" }}>
                  <Image
                    src={item}
                    alt={`${caseData.title} — фото ${i + 1}`}
                    fill
                    className="object-cover"
                  />
                </div>
              ) : (
                <PlaceholderImage key={i} aspectRatio="4/5" />
              )
            )}
          </div>
        </div>
      </section>

      {/* Details */}
      {caseData.details && (
        <section className="px-6 pb-24">
          <div className="mx-auto max-w-3xl">
            <SectionHeader badge="Детали" title="О проекте" />
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

      {/* Back to projects */}
      <section className="px-6 pb-24">
        <div className="mx-auto max-w-3xl text-center">
          <Link
            href="/projects"
            className="sw-btn inline-flex h-12 items-center justify-center border border-border px-8 text-foreground transition-colors hover:border-accent hover:text-accent"
          >
            Все проекты
          </Link>
        </div>
      </section>
    </div>
  );
}
