import { Hero } from "@/components/sections/Hero";
import { Experience } from "@/components/sections/Experience";

export default function Home() {
  return (
    <div className="flex flex-col gap-20 pb-20">
      <Hero />
      <Experience />
    </div>
  );
}