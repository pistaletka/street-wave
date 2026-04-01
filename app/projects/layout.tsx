import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Бренд-проекты — кастомные коллекции для компаний",
  description:
    "Лимитированные коллекции, коллаборации и брендированные кастомы для кампаний и подарков. Клиенты: Dolce & Gabbana, Reebok, Яндекс, SuperStep.",
  openGraph: {
    title: "Бренд-проекты — streetwave®",
    description:
      "Лимитированные коллекции и коллаборации с брендами. От концепта до логистики.",
    images: [{ url: "/og-image.png", width: 1200, height: 630 }],
  },
  alternates: {
    canonical: "/projects",
  },
};

export default function ProjectsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
