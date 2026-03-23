import { getContent } from "../../lib/getContent";
import FaqPageClient from "./FaqPageClient";

export default async function FaqPage() {
  const faqContent = await getContent<any>("faq");

  return <FaqPageClient faqContent={faqContent} />;
}
