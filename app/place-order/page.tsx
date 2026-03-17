import type { Metadata } from "next";
import Image from "next/image";
import content from "../../content/place-order.json";
import SectionHeader from "../../components/shared/SectionHeader";
import ContactForm from "../../components/shared/ContactForm";
import TariffSelectButton from "../../components/shared/TariffSelectButton";
import PlaceholderImage from "../../components/shared/PlaceholderImage";
import ImageCarousel from "../../components/shared/ImageCarousel";

export const metadata: Metadata = {
  title: "Заказать кастомизацию кроссовок и одежды — тарифы от 10 000 ₽",
  description:
    "Закажите уникальную кастомизацию кроссовок, одежды или арт-объектов в streetwave®. Тарифы от 10 000 ₽. Доставка по всей России.",
  openGraph: {
    title: "Персональный кастом — streetwave®",
    description: "Закажите уникальную кастомизацию. Тарифы от 10 000 ₽.",
    images: [{ url: "/opengraph-image", width: 1200, height: 630 }],
  },
  alternates: { canonical: "/place-order" },
};

export default function PlaceOrderPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Hero */}
      <section className="px-6 pt-0 pb-0">
        {/* Banner */}
        <div className="relative mx-auto max-w-7xl overflow-hidden">
          <Image
            src="/desktop.png"
            alt="Кастомизированные кроссовки — примеры работ streetwave"
            width={1920}
            height={360}
            className="h-[210px] w-full object-cover sm:h-[265px] md:h-[320px]"
            priority
          />
          <div className="absolute inset-0 bg-black/50" />
          <div className="absolute inset-0 flex flex-col items-center justify-center px-6 text-center">
            <p className="sw-label mb-4 text-accent">{content.hero.badge}</p>
            <h1 className="sw-h1 max-w-3xl text-3xl text-white sm:text-4xl md:text-5xl">
              {content.hero.title}
            </h1>
            <p className="mt-4 max-w-xl sw-body text-sm text-white/80">
              {content.hero.subtitle}
            </p>
          </div>
        </div>
      </section>

      {/* Form (top) */}
      <section id="order-form" className="px-6 pt-10 pb-8">
        <div className="mx-auto max-w-3xl">
          <h2 className="sw-h2 mb-8 text-2xl sm:text-3xl">Оставить заявку</h2>
          <ContactForm variant="place-order" successUrl="/place-order/success" />
        </div>
      </section>

      {/* Tariffs */}
      <section id="tariffs" className="px-6 pt-8 pb-8">
        <div className="mx-auto max-w-7xl">
          <SectionHeader badge={content.tariffs.badge} title={content.tariffs.title} />
          <div className="grid gap-6 md:grid-cols-3">
            {content.tariffs.items.map((tariff) => (
              <div
                key={tariff.name}
                className={`flex flex-col border p-8 ${
                  tariff.highlighted
                    ? "border-accent bg-accent/5"
                    : "border-border bg-surface"
                }`}
              >
                <div className="flex items-center gap-3 mb-2">
                  <h3 className="sw-h3 text-xl">{tariff.name}</h3>
                  {tariff.highlighted && (
                    <span className="sw-label text-[10px] text-accent border border-accent/30 px-2 py-0.5">Популярный</span>
                  )}
                </div>
                <p className="mb-6 text-2xl font-medium text-foreground">{tariff.price}</p>
                <ul className="space-y-3">
                  {tariff.features.map((feat) => (
                    <li
                      key={feat}
                      className="flex items-start gap-3 sw-body-sm text-text-secondary"
                    >
                      <span className="mt-1.5 block h-px w-3 shrink-0 bg-accent/40" />
                      {feat}
                    </li>
                  ))}
                </ul>
                <div className="mt-auto">
                  {"format" in tariff && (
                    <p className="mt-6 pt-4 border-t border-border text-xs tracking-wide uppercase text-accent">
                      {tariff.format}
                    </p>
                  )}
                  <TariffSelectButton tariffValue={tariff.value} />
                </div>
              </div>
            ))}
          </div>
          <p className="mt-8 text-xs text-muted leading-relaxed">{content.tariffs.disclaimer}</p>
        </div>
      </section>

      {/* Process */}
      <section className="px-6 pt-8 pb-8">
        <div className="mx-auto max-w-7xl">
          <SectionHeader badge={content.process.badge} title={content.process.title} />
          <div className="grid gap-px md:grid-cols-5">
            {content.process.steps.map((item) => (
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

      {/* FAQ */}
      <section className="px-6 pt-8 pb-8">
        <div className="mx-auto max-w-3xl">
          <SectionHeader badge={content.faq.badge} title={content.faq.title} />
          <div className="divide-y divide-border">
            {content.faq.items.map((item) => (
              <div key={item.q} className="py-6">
                <h3 className="sw-h3 text-sm">{item.q}</h3>
                <p className="mt-3 sw-body-sm text-text-secondary">{item.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Tariff gallery */}
      <section className="px-6 pt-8 pb-8">
        <div className="mx-auto max-w-7xl">
          <SectionHeader badge={content.gallery.badge} title={content.gallery.title} />
          <div className="grid gap-6 md:grid-cols-3">
            {content.gallery.tariffs.map((tariff) => (
              <div key={tariff.name}>
                <div className="mb-4">
                  <h3 className="sw-h3 text-xl">{tariff.name}</h3>
                  <p className="mt-1 text-xs tracking-wide uppercase text-accent">
                    {tariff.subtitle}
                  </p>
                </div>
                <ImageCarousel images={tariff.images} label={tariff.name} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Emotional closer + Contact form */}
      <section className="px-6 pt-8 pb-6">
        <div className="mx-auto max-w-3xl">
          <p className="mb-12 text-center text-lg italic text-text-secondary">
            {content.closer.text}
          </p>
          <h2 className="sw-h2 mb-8 text-2xl sm:text-3xl">Связаться с нами</h2>
          <ContactForm variant="general" successUrl="/place-order/success" />
        </div>
      </section>
    </div>
  );
}
