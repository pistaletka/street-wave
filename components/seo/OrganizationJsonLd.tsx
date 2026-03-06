export default function OrganizationJsonLd() {
  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": ["Organization", "LocalBusiness"],
        "@id": "https://streetwave-site.vercel.app/#organization",
        name: "streetwave®",
        alternateName: "STREET WAVE",
        url: "https://streetwave-site.vercel.app",
        logo: "https://streetwave-site.vercel.app/logo.svg",
        image: "https://streetwave-site.vercel.app/og-image.png",
        description:
          "Студия арт-кастомизации кроссовок, одежды и арт-объектов. Персональные проекты и лимитированные коллекции для брендов с 2014 года.",
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
          email: "hello@streetwave.studio",
          contactType: "customer service",
          availableLanguage: ["Russian", "English"],
        },
        sameAs: [
          "https://t.me/streetwave",
          "https://www.instagram.com/street_wave",
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
        "@id": "https://streetwave-site.vercel.app/#website",
        url: "https://streetwave-site.vercel.app",
        name: "streetwave®",
        publisher: {
          "@id": "https://streetwave-site.vercel.app/#organization",
        },
        inLanguage: "ru",
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
