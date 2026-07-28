"use client";

import { motion } from "framer-motion";
import { PORTFOLIO_DATA } from "@/lib/data";
import { Briefcase, Calendar, MapPin } from "lucide-react";

export function Experience() {
  return (
    <section id="experience" className="py-24 relative">
      <div className="container mx-auto px-4 md:px-8">
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5 }}
          className="mb-16 md:mb-24"
        >
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-4">
            Experience.
          </h2>
          <p className="text-neutral-600 dark:text-neutral-400 text-lg max-w-2xl">
            My professional journey in software engineering and architecture.
          </p>
        </motion.div>

        <div className="relative border-l border-neutral-200 dark:border-neutral-800 ml-3 md:ml-6 space-y-12 md:space-y-20">
          {PORTFOLIO_DATA.experience.map((exp, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="relative pl-8 md:pl-12"
            >
              {/* Timeline Dot */}
              <div className="absolute -left-1.5 md:-left-[7px] top-1.5 h-3 w-3 md:h-3.5 md:w-3.5 rounded-full bg-white dark:bg-neutral-950 border-2 border-neutral-900 dark:border-white shadow-[0_0_0_4px_rgba(255,255,255,1)] dark:shadow-[0_0_0_4px_rgba(10,10,10,1)]" />

              <div className="flex flex-col md:flex-row md:items-baseline justify-between gap-2 mb-4">
                <div>
                  <h3 className="text-xl md:text-2xl font-bold text-neutral-900 dark:text-white">
                    {exp.title}
                  </h3>
                  <div className="flex items-center gap-2 mt-2 text-neutral-600 dark:text-neutral-400 font-medium">
                    <Briefcase className="h-4 w-4" />
                    <span>{exp.company}</span>
                  </div>
                </div>
                
                <div className="flex flex-col items-start md:items-end gap-1 text-sm text-neutral-500 dark:text-neutral-500 mt-2 md:mt-0">
                  <div className="flex items-center gap-1.5">
                    <Calendar className="h-4 w-4" />
                    <span>{exp.date}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <MapPin className="h-4 w-4" />
                    <span>{exp.location}</span>
                  </div>
                </div>
              </div>

              <p className="text-neutral-600 dark:text-neutral-400 leading-relaxed mt-4">
                {exp.description}
              </p>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}