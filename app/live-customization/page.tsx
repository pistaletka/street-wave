import { getContent, getLocaleCasesIndex } from "../../lib/getContent";
import LiveCustomizationPageClient from "./LiveCustomizationPageClient";

export default async function LiveCustomizationPage() {
  const liveContent = await getContent<any>("liveCustomization");
  const casesIndex = await getLocaleCasesIndex();

  return <LiveCustomizationPageClient liveContent={liveContent} casesIndex={casesIndex} />;
}
