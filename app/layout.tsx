import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import Providers from "../components/providers/Providers";
import OrganizationJsonLd from "../components/seo/OrganizationJsonLd";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin", "latin-ext"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://streetwave-site.vercel.app"),
  title: {
    default: "streetwave® — Студия арт-кастомизации кроссовок и одежды в Москве",
    template: "%s | streetwave®",
  },
  description:
    "Студия арт-кастомизации streetwave® — кастомные кроссовки, одежда и арт-объекты. Персональные проекты и лимитированные коллекции для брендов. Москва, доставка по всей России.",
  keywords: [
    "кастомизация кроссовок",
    "кастомные кроссовки",
    "арт-кастомизация",
    "кастом обувь Москва",
    "кастомизация одежды",
    "роспись кроссовок",
    "streetwave",
    "кастом зона на ивент",
    "кастомизация для брендов",
    "лимитированные кроссовки",
    "кастомные Nike",
    "кастомные Air Force",
    "арт объекты на заказ",
  ],
  authors: [{ name: "streetwave®" }],
  creator: "streetwave®",
  openGraph: {
    type: "website",
    locale: "ru_RU",
    url: "https://streetwave-site.vercel.app",
    siteName: "streetwave®",
    title: "streetwave® — Студия арт-кастомизации кроссовок и одежды",
    description:
      "Кастомные кроссовки, одежда и арт-объекты. Персональные проекты и лимитированные коллекции для брендов. С 2014 года.",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "streetwave® — Студия арт-кастомизации",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "streetwave® — Студия арт-кастомизации",
    description:
      "Кастомные кроссовки, одежда и арт-объекты. Персональные проекты и коллекции для брендов.",
    images: ["/opengraph-image"],
  },
  alternates: {
    canonical: "https://streetwave-site.vercel.app",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <OrganizationJsonLd />
        <Providers>
          <Navbar />
          <main className="pt-[73px]">{children}</main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
