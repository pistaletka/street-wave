import Link from "next/link";
import { getLocale } from "next-intl/server";

export async function generateMetadata() {
  const locale = await getLocale();
  return {
    title: locale === "ru" ? "Ошибка оплаты - streetwave®" : "Payment Failed - streetwave®",
  };
}

export default async function PaymentFailPage() {
  const locale = await getLocale();
  const isRu = locale === "ru";

  return (
    <section className="px-6 py-6">
      <div className="mx-auto max-w-2xl text-center">
        <p className="sw-label mb-4 text-red-400">{isRu ? "Ошибка" : "Error"}</p>
        <h1 className="sw-h1 mb-6 text-3xl sm:text-4xl">{isRu ? "Оплата не прошла" : "Payment Failed"}</h1>
        <p className="sw-body text-text-secondary mb-10">
          {isRu
            ? "Что-то пошло не так. Попробуйте ещё раз или свяжитесь с нами."
            : "Something went wrong. Please try again or contact us."}
        </p>
        <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
          <Link
            href="/checkout"
            className="sw-btn inline-block h-12 border border-accent bg-accent px-8 leading-[48px] text-accent-foreground transition-colors hover:bg-transparent hover:text-accent"
          >
            {isRu ? "Попробовать снова" : "Try Again"}
          </Link>
          <Link
            href="/contacts"
            className="sw-btn inline-block h-12 border border-border px-8 leading-[48px] text-text-secondary transition-colors hover:border-foreground hover:text-foreground"
          >
            {isRu ? "Связаться с нами" : "Contact Us"}
          </Link>
        </div>
      </div>
    </section>
  );
}
