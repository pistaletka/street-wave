import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Выездная кастомизация на мероприятиях",
  description:
    "Живая кастомизация на вашем ивенте — кастом-зона с мастерами, оборудованием и брендированием. Dolce & Gabbana, Adidas, Яндекс, SuperStep и другие.",
  openGraph: {
    title: "Выездная кастомизация — streetwave®",
    description:
      "Кастом-зона на мероприятии: мастера, оборудование, WOW-эффект для гостей.",
    images: [{ url: "/og-image.png", width: 1200, height: 630 }],
  },
  alternates: {
    canonical: "/live-customization",
  },
};

export default function LiveCustomizationLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
