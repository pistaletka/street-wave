import Link from "next/link";

export const metadata = {
  title: "Оплата прошла успешно — streetwave®",
};

export default function PaymentSuccessPage() {
  return (
    <section className="px-6 py-24">
      <div className="mx-auto max-w-2xl text-center">
        <p className="sw-label mb-4 text-accent">Готово</p>
        <h1 className="sw-h1 mb-6 text-3xl sm:text-4xl">Оплата прошла успешно</h1>
        <p className="sw-body text-text-secondary mb-10">
          Спасибо за заказ! Мы свяжемся с вами для уточнения деталей доставки.
        </p>
        <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
          <Link
            href="/shop"
            className="sw-btn inline-block h-12 border border-accent bg-accent px-8 leading-[48px] text-accent-foreground transition-colors hover:bg-transparent hover:text-accent"
          >
            Вернуться в магазин
          </Link>
          <Link
            href="/"
            className="sw-btn inline-block h-12 border border-border px-8 leading-[48px] text-text-secondary transition-colors hover:border-foreground hover:text-foreground"
          >
            На главную
          </Link>
        </div>
      </div>
    </section>
  );
}
