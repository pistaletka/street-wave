import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { NextIntlClientProvider } from "next-intl";
import { getLocale, getMessages } from "next-intl/server";
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

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();
  const isRu = locale === "ru";

  const baseUrl = isRu
    ? "https://street-wave.ru"
    : "https://street-wave.com";

  return {
    metadataBase: new URL(baseUrl),
    title: {
      default: isRu
        ? "streetwave® — Студия арт-кастомизации кроссовок и одежды в Москве"
        : "streetwave® — Art Customization Studio for Sneakers & Apparel",
      template: "%s | streetwave®",
    },
    description: isRu
      ? "Студия арт-кастомизации streetwave® — кастомные кроссовки, одежда и арт-объекты. Персональные проекты и лимитированные коллекции для брендов. Москва, доставка по всей России."
      : "streetwave® art customization studio — custom sneakers, apparel and art objects. Personal projects and limited collections for brands. Worldwide shipping.",
    keywords: isRu
      ? [
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
        ]
      : [
          "custom sneakers",
          "sneaker customization",
          "art customization",
          "custom shoes",
          "custom apparel",
          "hand-painted sneakers",
          "streetwave",
          "custom zone event",
          "brand customization",
          "limited edition sneakers",
          "custom Nike",
          "custom Air Force",
          "art objects",
        ],
    authors: [{ name: "streetwave®" }],
    creator: "streetwave®",
    openGraph: {
      type: "website",
      locale: isRu ? "ru_RU" : "en_US",
      url: baseUrl,
      siteName: "streetwave®",
      title: isRu
        ? "streetwave® — Студия art-кастомизации"
        : "streetwave® — Art Customization Studio",
      description: isRu
        ? "Кастомные кроссовки, одежда, арт-объекты. Эст. 2014"
        : "Custom sneakers, apparel, art objects. Est. 2014",
      images: [
        {
          url: "/og-image.png",
          width: 1200,
          height: 630,
          alt: isRu
            ? "streetwave® — Студия art-кастомизации"
            : "streetwave® — Art Customization Studio",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: isRu
        ? "streetwave® — Студия art-кастомизации"
        : "streetwave® — Art Customization Studio",
      description: isRu
        ? "Кастомные кроссовки, одежда, арт-объекты. Эст. 2014"
        : "Custom sneakers, apparel, art objects. Est. 2014",
      images: ["/og-image.png"],
    },
    alternates: {
      canonical: baseUrl,
      languages: {
        ru: "https://street-wave.ru",
        en: "https://street-wave.com",
      },
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
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const locale = await getLocale();
  const messages = await getMessages();

  return (
    <html lang={locale}>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <NextIntlClientProvider messages={messages}>
          <OrganizationJsonLd />
          <Providers>
            <Navbar />
            <main className="pt-[73px]">{children}</main>
            <Footer />
          </Providers>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
