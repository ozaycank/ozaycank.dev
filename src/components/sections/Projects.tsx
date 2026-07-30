"use client";

import { motion } from "framer-motion";
import { GithubProject } from "@/lib/github";
import Image from "next/image";
import { ExternalLink, Star, AlertCircle } from "lucide-react";
import { PORTFOLIO_DATA } from "@/lib/data";

interface ProjectsProps {
  projects: GithubProject[];
}

export function Projects({ projects }: ProjectsProps) {
  const hasProjects = projects && projects.length > 0;

  return (
    <section id="projects" className="py-24 relative overflow-hidden">
      <div className="container mx-auto px-4 md:px-8">
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5 }}
          className="mb-16 md:mb-24"
        >
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-4">
            Case Studies.
          </h2>
          <p className="text-neutral-600 dark:text-neutral-400 text-lg max-w-2xl">
            Automated deep dive into the architecture, challenges, and solutions of my core repositories.
          </p>
        </motion.div>

        {/* Fallback / Empty State (API kesintisi veya 0 proje durumunda çalışır) */}
        {!hasProjects ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
            className="flex flex-col items-center justify-center text-center p-12 md:p-16 rounded-2xl bg-neutral-50 dark:bg-neutral-900/50 border border-neutral-200 dark:border-neutral-800 max-w-2xl mx-auto"
          >
            <div className="p-4 rounded-full bg-amber-500/10 text-amber-500 mb-6">
              <AlertCircle className="h-10 w-10" />
            </div>
            <h3 className="text-2xl font-bold text-neutral-900 dark:text-white mb-3">
              Case Studies Currently Unavailable
            </h3>
            <p className="text-neutral-600 dark:text-neutral-400 mb-8 leading-relaxed">
              We couldn&apos;t automatically load repository data from GitHub at this moment. You can still explore all my open-source projects, enterprise solutions, and architectures directly on my GitHub profile.
            </p>
            <a
              href={PORTFOLIO_DATA.personal.links.github}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 font-medium rounded-full hover:opacity-90 transition-opacity shadow-lg"
            >
              <span>Explore GitHub Repositories</span>
              <ExternalLink className="h-4 w-4" />
            </a>
          </motion.div>
        ) : (
          /* Normal Proje Listeleme */
          <div className="space-y-24 md:space-y-32">
            {projects.map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.7 }}
                className="flex flex-col lg:flex-row gap-8 lg:gap-16 items-center"
              >
                {/* Image Section */}
                <div className={`w-full lg:w-1/2 ${index % 2 !== 0 ? 'lg:order-2' : 'lg:order-1'}`}>
                  <div className="relative aspect-video rounded-xl overflow-hidden bg-neutral-100 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 shadow-2xl group">
                    <div className="absolute inset-0 bg-neutral-900/10 dark:bg-black/20 group-hover:bg-transparent transition-colors z-10 duration-500" />
                    
                    {project.coverImage ? (
                       <Image 
                         src={project.coverImage} 
                         alt={project.name} 
                         fill 
                         sizes="(max-width: 1024px) 100vw, 50vw"
                         className="object-cover group-hover:scale-105 transition-transform duration-700" 
                         unoptimized={true}
                       />
                    ) : (
                       <div className="w-full h-full flex flex-col gap-2 items-center justify-center text-neutral-400 font-mono text-sm bg-neutral-100 dark:bg-neutral-900">
                         <svg viewBox="0 0 24 24" fill="currentColor" className="h-12 w-12 text-neutral-300 dark:text-neutral-700">
                           <path d="M12 2A10 10 0 002 12c0 4.42 2.87 8.17 6.84 9.5.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34-.45-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.87 1.52 2.34 1.07 2.91.83.09-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.92 0-1.11.38-2 1.03-2.71-.1-.25-.45-1.29.1-2.64 0 0 .84-.27 2.75 1.02.79-.22 1.65-.33 2.5-.33.85 0 1.71.11 2.5.33 1.91-1.29 2.75-1.02 2.75-1.02.55 1.35.2 2.39.1 2.64.65.71 1.03 1.6 1.03 2.71 0 3.82-2.34 4.66-4.57 4.91.36.31.69.92.69 1.85V21c0 .27.16.59.67.5C19.14 20.16 22 16.42 22 12A10 10 0 0012 2z" />
                         </svg>
                         [No image in README.md]
                       </div>
                    )}
                  </div>
                </div>

                {/* Content Section */}
                <div className={`w-full lg:w-1/2 flex flex-col space-y-6 ${index % 2 !== 0 ? 'lg:order-1' : 'lg:order-2'}`}>
                  
                  <div>
                    <div className="flex items-center gap-4 text-sm font-semibold tracking-wider text-neutral-500 uppercase mb-2">
                      {project.fullName.split('/')[0]}
                      {project.stargazersCount > 0 && (
                        <span className="flex items-center gap-1 normal-case text-amber-500">
                          <Star className="h-4 w-4 fill-amber-400" /> {project.stargazersCount}
                        </span>
                      )}
                    </div>
                    <h3 className="text-3xl font-bold text-neutral-900 dark:text-white mb-4">
                      {project.name}
                    </h3>
                    <p className="text-neutral-600 dark:text-neutral-400 leading-relaxed text-lg">
                      {project.description || "No description provided."}
                    </p>
                  </div>

                  {/* Tech Stack Tags */}
                  <div className="flex flex-wrap gap-2 pt-4">
                    {project.topics.map((tech, i) => (
                      <span 
                        key={i} 
                        className="px-3 py-1 text-xs font-medium bg-neutral-100 dark:bg-neutral-800/50 text-neutral-800 dark:text-neutral-300 rounded-md border border-neutral-200 dark:border-neutral-700"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-4 pt-2">
                    <a 
                      href={project.htmlUrl} 
                      target="_blank" 
                      rel="noreferrer"
                      className="inline-flex items-center gap-2 px-5 py-2.5 bg-transparent border border-neutral-300 dark:border-neutral-700 text-neutral-900 dark:text-white font-medium rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
                    >
                      View Source 
                      <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4">
                        <path d="M12 2A10 10 0 002 12c0 4.42 2.87 8.17 6.84 9.5.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34-.45-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.87 1.52 2.34 1.07 2.91.83.09-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.92 0-1.11.38-2 1.03-2.71-.1-.25-.45-1.29.1-2.64 0 0 .84-.27 2.75 1.02.79-.22 1.65-.33 2.5-.33.85 0 1.71.11 2.5.33 1.91-1.29 2.75-1.02 2.75-1.02.55 1.35.2 2.39.1 2.64.65.71 1.03 1.6 1.03 2.71 0 3.82-2.34 4.66-4.57 4.91.36.31.69.92.69 1.85V21c0 .27.16.59.67.5C19.14 20.16 22 16.42 22 12A10 10 0 0012 2z" />
                      </svg>
                    </a>
                    {project.homepage && (
                      <a 
                        href={project.homepage} 
                        target="_blank" 
                        rel="noreferrer"
                        className="inline-flex items-center gap-2 px-5 py-2.5 bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 font-medium rounded-lg hover:opacity-90 transition-opacity"
                      >
                        Visit Live Site <ExternalLink className="h-4 w-4" />
                      </a>
                    )}
                  </div>

                </div>
              </motion.div>
            ))}
          </div>
        )}

      </div>
    </section>
  );
}