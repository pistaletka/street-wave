import type { Metadata } from "next";
import Link from "next/link";
import SectionHeader from "../../components/shared/SectionHeader";
import PlaceholderImage from "../../components/shared/PlaceholderImage";

export const metadata: Metadata = {
  title: "Арт / Картины — streetwave®",
  description: "Авторские картины и арт-объекты. Уличная эстетика, перенесённая на холст и в интерьер.",
};

export default function ArtPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <section className="flex min-h-[45vh] flex-col items-center justify-center px-6 text-center">
        <p className="sw-label mb-6 text-accent">Арт-направление</p>
        <h1 className="sw-h1 max-w-3xl text-4xl sm:text-5xl md:text-6xl">
          Арт / Картины
        </h1>
        <p className="mt-6 max-w-xl text-base text-text-secondary leading-relaxed">
          Авторские картины и арт-объекты. Уличное искусство, перенесённое на холст.
          Раздел в разработке.
        </p>
      </section>

      <section className="px-6 pb-6">
        <div className="mx-auto max-w-7xl">
          <SectionHeader badge="Галерея" title="Примеры картин" />
          <div className="grid gap-6 grid-cols-2 lg:grid-cols-4">
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="group">
                <PlaceholderImage aspectRatio="4/5" />
                <div className="mt-4">
                  <div className="h-4 w-32 bg-surface" />
                  <div className="mt-2 h-3 w-48 bg-surface" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-6 pb-6">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="sw-h2 mb-6 text-3xl">Хотите заказать картину?</h2>
          <p className="mb-10 text-base text-text-secondary">
            Напишите нам — обсудим формат, размер и стиль.
          </p>
          <Link
            href="/contacts"
            className="sw-btn inline-flex h-12 items-center justify-center border border-accent bg-accent px-8 text-accent-foreground transition-colors hover:bg-transparent hover:text-accent"
          >
            Связаться
          </Link>
        </div>
      </section>
    </div>
  );
}
