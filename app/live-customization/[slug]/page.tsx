import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import casesIndex from "../../../content/cases/index.json";
import PlaceholderImage from "../../../components/shared/PlaceholderImage";
import SectionHeader from "../../../components/shared/SectionHeader";
import EventCaseCta from "./EventCaseCta";

// Import event case data
import agama from "../../../content/cases/agama.json";
import customTruck from "../../../content/cases/custom-truck.json";
import dolceGabbanaEvent from "../../../content/cases/dolce-gabbana-event.json";
import pinkoEvent from "../../../content/cases/pinko-event.json";
import superstepEvent from "../../../content/cases/superstep-event.json";
import yandexNetworking from "../../../content/cases/yandex-networking.json";

type CaseData = Omit<typeof agama, "gallery" | "coverImage"> & {
  gallery: (string | null)[];
  coverImage?: string;
};

const caseDataMap: Record<string, CaseData> = {
  agama,
  "custom-truck": customTruck,
  "dolce-gabbana-event": dolceGabbanaEvent,
  "pinko-event": pinkoEvent,
  "superstep-event": superstepEvent,
  "yandex-networking": yandexNetworking,
};

const eventSlugs = casesIndex.cases
  .filter((c) => c.category === "event")
  .map((c) => c.slug);

export function generateStaticParams() {
  return eventSlugs.map((slug) => ({ slug }));
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

export default async function EventCasePage({ params }: Props) {
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
            href="/live-customization"
            className="sw-label mb-8 inline-flex items-center gap-2 text-text-secondary transition-colors hover:text-foreground"
          >
            &larr; Все ивенты
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

      {/* Gallery — 8 photos, 4 columns × 2 rows */}
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
            <SectionHeader badge="Детали" title="Об ивенте" />
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
      <section className="px-6 pb-24">
        <div className="mx-auto max-w-3xl text-center">
          <EventCaseCta />
        </div>
      </section>
    </div>
  );
}
