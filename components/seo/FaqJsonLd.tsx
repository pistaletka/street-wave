import faqContent from "../../content/faq.json";

type FaqTab = { items: { q: string; a: string }[] };

export default function FaqJsonLd() {
  const allItems = [
    ...faqContent.tabs.private.items,
    ...faqContent.tabs.brands.items,
    ...faqContent.tabs.general.items,
  ];

  const schema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: allItems.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.a,
      },
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
