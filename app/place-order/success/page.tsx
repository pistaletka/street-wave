import Link from "next/link";

export const metadata = {
  title: "Заявка отправлена - streetwave®",
};

export default function PlaceOrderSuccessPage() {
  return (
    <section className="px-6 py-6">
      <div className="mx-auto max-w-2xl text-center">
        <p className="sw-label mb-4 text-accent">Готово</p>
        <h1 className="sw-h1 mb-6 text-3xl sm:text-4xl">Заявка отправлена</h1>
        <p className="sw-body text-text-secondary mb-10">
          Спасибо! Мы свяжемся с вами в ближайшее время для обсуждения деталей.
        </p>
        <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
          <Link
            href="/"
            className="sw-btn inline-block h-12 border border-accent bg-accent px-8 leading-[48px] text-accent-foreground transition-colors hover:bg-transparent hover:text-accent"
          >
            На главную
          </Link>
          <Link
            href="/place-order"
            className="sw-btn inline-block h-12 border border-border px-8 leading-[48px] text-text-secondary transition-colors hover:border-foreground hover:text-foreground"
          >
            Заказать ещё
          </Link>
        </div>
      </div>
    </section>
  );
}
