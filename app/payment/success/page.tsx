import Link from "next/link";
import { getLocale } from "next-intl/server";
import PageGoal from "@/components/shared/PageGoal";
import { GOALS } from "@/lib/goals";

export async function generateMetadata() {
  const locale = await getLocale();
  return {
    title: locale === "ru" ? "Оплата прошла успешно - streetwave®" : "Payment Successful - streetwave®",
  };
}

export default async function PaymentSuccessPage() {
  const locale = await getLocale();
  const isRu = locale === "ru";

  return (
    <section className="px-6 py-6">
      <PageGoal goal={GOALS.PAYMENT_SUCCESS} />
      <div className="mx-auto max-w-2xl text-center">
        <p className="sw-label mb-4 text-accent">{isRu ? "Готово" : "Done"}</p>
        <h1 className="sw-h1 mb-6 text-3xl sm:text-4xl">{isRu ? "Оплата прошла успешно" : "Payment Successful"}</h1>
        <p className="sw-body text-text-secondary mb-10">
          {isRu
            ? "Спасибо за заказ! Мы свяжемся с вами для уточнения деталей доставки."
            : "Thank you for your order! We'll contact you to confirm shipping details."}
        </p>
        <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
          <Link
            href="/shop"
            className="sw-btn inline-block h-12 border border-accent bg-accent px-8 leading-[48px] text-accent-foreground transition-colors hover:bg-transparent hover:text-accent"
          >
            {isRu ? "Вернуться в магазин" : "Back to Shop"}
          </Link>
          <Link
            href="/"
            className="sw-btn inline-block h-12 border border-border px-8 leading-[48px] text-text-secondary transition-colors hover:border-foreground hover:text-foreground"
          >
            {isRu ? "На главную" : "Home"}
          </Link>
        </div>
      </div>
    </section>
  );
}
