import type { Metadata } from "next";
import FaqJsonLd from "../../components/seo/FaqJsonLd";

export const metadata: Metadata = {
  title: "FAQ — Частые вопросы о кастомизации",
  description:
    "Ответы на частые вопросы о кастомизации кроссовок и одежды: сроки, цены, оплата, доставка. Информация для частных клиентов и брендов.",
  openGraph: {
    title: "FAQ — streetwave®",
    description:
      "Ответы на частые вопросы о кастомизации: сроки, цены, доставка.",
    images: [{ url: "/og-image.png", width: 1200, height: 630 }],
  },
  alternates: {
    canonical: "/faq",
  },
};

export default function FaqLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <FaqJsonLd />
      {children}
    </>
  );
}
