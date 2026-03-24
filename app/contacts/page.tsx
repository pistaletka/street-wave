import type { Metadata } from "next";
import { getContent } from "../../lib/getContent";
import SectionHeader from "../../components/shared/SectionHeader";
import ContactForm from "../../components/shared/ContactForm";

export async function generateMetadata(): Promise<Metadata> {
  const content = await getContent<any>("contacts");
  return {
    title: content.meta?.title ?? "Контакты студии арт-кастомизации streetwave®",
    description:
      content.meta?.description ?? "Свяжитесь со студией streetwave® — Telegram, WhatsApp, email. Москва. Ответим в течение 24 часов.",
    openGraph: {
      title: content.meta?.ogTitle ?? "Контакты — streetwave®",
      description: content.meta?.ogDescription ?? "Telegram, WhatsApp, email. Ответим в течение 24 часов.",
      images: [{ url: "/opengraph-image", width: 1200, height: 630 }],
    },
    alternates: { canonical: "/contacts" },
  };
}

export default async function ContactsPage() {
  const content = await getContent<any>("contacts");
  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Hero */}
      <section className="px-6 py-6">
        <div className="mx-auto max-w-3xl">
          <SectionHeader
            badge={content.hero.badge}
            title={content.hero.title}
            description={content.hero.subtitle}
          />
        </div>
      </section>

      {/* Channels */}
      <section className="px-6 pb-6">
        <div className="mx-auto max-w-3xl">
          <div className="mb-16 grid gap-6 sm:grid-cols-2">
            {content.channels.map((ch: any) => (
              <a
                key={ch.label}
                href={ch.href}
                className="border border-border bg-surface p-6 transition-colors hover:border-accent/20"
              >
                <p className="sw-label mb-2 text-muted">{ch.label}</p>
                <p className="text-foreground">{ch.value}</p>
              </a>
            ))}
          </div>

          {content.address && (
            <div className="mb-16 border border-border bg-surface p-6">
              <p className="sw-label mb-2 text-muted">{content.address.label}</p>
              <p className="text-foreground">
                {content.address.value}
                {" ("}
                <a
                  href={content.address.navHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-accent underline hover:text-accent/80"
                >
                  {content.address.navLabel}
                </a>
                {")"}
              </p>
            </div>
          )}

          {/* Form */}
          <h2 className="sw-h2 mb-8 text-2xl sm:text-3xl">Отправить сообщение</h2>
          <ContactForm variant="general" />
        </div>
      </section>
    </div>
  );
}
