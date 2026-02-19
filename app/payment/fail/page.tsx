import Link from "next/link";

export const metadata = {
  title: "Ошибка оплаты — streetwave®",
};

export default function PaymentFailPage() {
  return (
    <section className="px-6 py-24">
      <div className="mx-auto max-w-2xl text-center">
        <p className="sw-label mb-4 text-red-400">Ошибка</p>
        <h1 className="sw-h1 mb-6 text-3xl sm:text-4xl">Оплата не прошла</h1>
        <p className="sw-body text-text-secondary mb-10">
          Что-то пошло не так. Попробуйте ещё раз или свяжитесь с нами.
        </p>
        <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
          <Link
            href="/checkout"
            className="sw-btn inline-block h-12 border border-accent bg-accent px-8 leading-[48px] text-accent-foreground transition-colors hover:bg-transparent hover:text-accent"
          >
            Попробовать снова
          </Link>
          <Link
            href="/contacts"
            className="sw-btn inline-block h-12 border border-border px-8 leading-[48px] text-text-secondary transition-colors hover:border-foreground hover:text-foreground"
          >
            Связаться с нами
          </Link>
        </div>
      </div>
    </section>
  );
}
