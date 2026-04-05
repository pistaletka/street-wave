import Link from "next/link";
import { getLocale } from "next-intl/server";

export async function generateMetadata() {
  const locale = await getLocale();
  return {
    title: locale === "ru" ? "Заявка отправлена - streetwave®" : "Request Submitted - streetwave®",
  };
}

export default async function PlaceOrderSuccessPage() {
  const locale = await getLocale();
  const isRu = locale === "ru";

  return (
    <section className="px-6 py-6">
      <div className="mx-auto max-w-2xl text-center">
        <p className="sw-label mb-4 text-accent">{isRu ? "Готово" : "Done"}</p>
        <h1 className="sw-h1 mb-6 text-3xl sm:text-4xl">{isRu ? "Заявка отправлена" : "Request Submitted"}</h1>
        <p className="sw-body text-text-secondary mb-10">
          {isRu
            ? "Спасибо! Мы свяжемся с вами в ближайшее время для обсуждения деталей."
            : "Thank you! We'll contact you shortly to discuss the details."}
        </p>
        <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
          <Link
            href="/"
            className="sw-btn inline-block h-12 border border-accent bg-accent px-8 leading-[48px] text-accent-foreground transition-colors hover:bg-transparent hover:text-accent"
          >
            {isRu ? "На главную" : "Home"}
          </Link>
          <Link
            href="/place-order"
            className="sw-btn inline-block h-12 border border-border px-8 leading-[48px] text-text-secondary transition-colors hover:border-foreground hover:text-foreground"
          >
            {isRu ? "Заказать ещё" : "Order More"}
          </Link>
        </div>
      </div>
    </section>
  );
}
