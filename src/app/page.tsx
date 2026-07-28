import { Hero } from "@/components/sections/Hero";
import { Experience } from "@/components/sections/Experience";
import { Projects } from "@/components/sections/Projects";
import { fetchGithubProjects } from "@/lib/github";

export const dynamic = 'force-static';
export const revalidate = 3600; // Opsiyonel: Veriyi her saat başı arka planda yenile (ISR)


export default async function Home() {
  const githubProjects = await fetchGithubProjects();

  return (
    <div className="flex flex-col gap-20 pb-20">
      <Hero />
      <Experience />
      <Projects projects={githubProjects} />
    </div>
  );
}