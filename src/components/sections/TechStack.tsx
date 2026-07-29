"use client";

import { motion } from "framer-motion";
import { PORTFOLIO_DATA } from "@/lib/data";
import { Code2, Layout, Server, Database, Cloud } from "lucide-react";

export function TechStack() {
  const categories = [
    {
      title: "Languages",
      icon: <Code2 className="h-5 w-5 text-amber-500" />,
      skills: PORTFOLIO_DATA.skills.languages,
    },
    {
      title: "Frontend & UI",
      icon: <Layout className="h-5 w-5 text-sky-500" />,
      skills: PORTFOLIO_DATA.skills.frontend,
    },
    {
      title: "Backend & Systems",
      icon: <Server className="h-5 w-5 text-emerald-500" />,
      skills: PORTFOLIO_DATA.skills.backend,
    },
    {
      title: "Database & ORM",
      icon: <Database className="h-5 w-5 text-purple-500" />,
      skills: PORTFOLIO_DATA.skills.database,
    },
    {
      title: "Cloud & Architecture",
      icon: <Cloud className="h-5 w-5 text-rose-500" />,
      skills: PORTFOLIO_DATA.skills.infrastructure,
    },
  ];

  return (
    <section id="tech-stack" className="py-24 relative">
      <div className="container mx-auto px-4 md:px-8">
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5 }}
          className="mb-16 md:mb-24"
        >
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-4">
            Tech Stack.
          </h2>
          <p className="text-neutral-600 dark:text-neutral-400 text-lg max-w-2xl">
            The core technologies, frameworks, and architectural tools I use to build production-ready systems.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {categories.map((category, index) => (
            <motion.div
              key={category.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="p-6 md:p-8 rounded-2xl bg-neutral-50 dark:bg-neutral-900/50 border border-neutral-200 dark:border-neutral-800 hover:border-neutral-300 dark:hover:border-neutral-700 transition-colors"
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2.5 rounded-xl bg-white dark:bg-neutral-800 border border-neutral-200/80 dark:border-neutral-700 shadow-sm">
                  {category.icon}
                </div>
                <h3 className="font-bold text-lg text-neutral-900 dark:text-white">
                  {category.title}
                </h3>
              </div>

              <div className="flex flex-wrap gap-2">
                {category.skills.map((skill) => (
                  <span
                    key={skill}
                    className="px-3.5 py-1.5 text-xs font-medium rounded-lg bg-white dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 border border-neutral-200 dark:border-neutral-700 shadow-2xs hover:scale-105 transition-transform"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}