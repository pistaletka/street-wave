import { getContent } from "../../lib/getContent";

type FaqTab = { items: { q: string; a: string }[] };

export default async function FaqJsonLd() {
  const faqContent = await getContent<any>("faq");

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
