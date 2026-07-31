import { Hero } from "@/components/sections/Hero";
import { Experience } from "@/components/sections/Experience";
import { Projects } from "@/components/sections/Projects";
import { TechStack } from "@/components/sections/TechStack";
import { Blog } from "@/components/sections/Blog";
import { Footer } from "@/components/layout/Footer";
import { fetchGithubProjects } from "@/lib/github";

export const dynamic = 'force-static';
export const revalidate = 3600;


export default async function Home() {
  const githubProjects = await fetchGithubProjects();

  return (
    <div className="flex flex-col gap-20 pb-20">
      <Hero />
      <Experience />
      <Projects projects={githubProjects} />
      <TechStack />
      <Blog />
      <Footer />
    </div>
  );
}