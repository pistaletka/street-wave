import { getContent, getLocaleCasesIndex } from "../../lib/getContent";
import ProjectsPageClient from "./ProjectsPageClient";

export default async function ProjectsPage() {
  const projectsContent = await getContent<any>("projects");
  const casesIndex = await getLocaleCasesIndex();

  return <ProjectsPageClient projectsContent={projectsContent} casesIndex={casesIndex} />;
}
