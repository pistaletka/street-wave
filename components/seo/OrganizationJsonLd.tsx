import { getLocale } from "next-intl/server";

const ORG_BASE_URL = "https://street-wave.ru";

export default async function OrganizationJsonLd() {
  const locale = await getLocale();
  const isRu = locale === "ru";

  const siteUrl = isRu ? "https://street-wave.ru" : "https://street-wave.com";

  const description = isRu
    ? "Студия арт-кастомизации кроссовок, одежды и арт-объектов. Персональные проекты и лимитированные коллекции для брендов с 2014 года."
    : "Art customization studio for sneakers, apparel and art objects. Personal projects and limited collections for brands. Est. 2014.";

  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": ["Organization", "LocalBusiness"],
        "@id": `${ORG_BASE_URL}/#organization`,
        name: "streetwave®",
        alternateName: "STREET WAVE",
        url: ORG_BASE_URL,
        logo: `${ORG_BASE_URL}/logo.svg`,
        image: `${ORG_BASE_URL}/og-image.jpg`,
        description,
        foundingDate: "2014",
        address: {
          "@type": "PostalAddress",
          addressLocality: "Москва",
          addressCountry: "RU",
        },
        areaServed: [
          { "@type": "Country", name: "Россия" },
          { "@type": "AdministrativeArea", name: "Весь мир" },
        ],
        contactPoint: {
          "@type": "ContactPoint",
          email: "order@street-wave.com",
          contactType: "customer service",
          availableLanguage: ["Russian", "English"],
        },
        sameAs: [
          "https://t.me/streetwavecustom",
          "https://www.instagram.com/streetwave.studio",
        ],
        knowsAbout: [
          "кастомизация кроссовок",
          "арт-кастомизация",
          "роспись обуви",
          "кастомная одежда",
          "лимитированные коллекции",
          "выездная кастомизация",
          "кастом-зона на мероприятии",
          "арт-объекты на заказ",
        ],
        makesOffer: [
          {
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: "Персональная кастомизация кроссовок",
              description:
                "Индивидуальная роспись и кастомизация кроссовок Nike, Adidas, Jordan и других брендов.",
            },
          },
          {
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: "Кастомизация одежды",
              description:
                "Кастом курток, джинсовок, худи и других предметов одежды.",
            },
          },
          {
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: "Лимитированные коллекции для брендов",
              description:
                "Создание кастомных лимитированных серий для маркетинговых кампаний и коллабораций.",
            },
          },
          {
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: "Выездная кастомизация на мероприятиях",
              description:
                "Кастом-зона с мастерами и оборудованием на ивентах, корпоративах и поп-ап магазинах.",
            },
          },
          {
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: "Арт-объекты и картины",
              description:
                "Авторские картины и арт-объекты в стиле уличной культуры для интерьеров.",
            },
          },
        ],
      },
      {
        "@type": "WebSite",
        "@id": `${siteUrl}/#website`,
        url: siteUrl,
        name: "streetwave®",
        publisher: {
          "@id": `${ORG_BASE_URL}/#organization`,
        },
        inLanguage: isRu ? "ru" : "en",
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
