"use client";

import { PORTFOLIO_DATA } from "@/lib/data";
import { Mail, ArrowUpRight } from "lucide-react";
import Link from "next/link";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-950">
      <div className="container mx-auto px-4 md:px-8 py-12 md:py-16">
        
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8 mb-12">
          <div>
            <Link href="/" className="font-semibold text-xl tracking-tight">
              özaycank<span className="text-neutral-500">.dev</span>
            </Link>
            <p className="text-sm text-neutral-600 dark:text-neutral-400 mt-2 max-w-md">
              {PORTFOLIO_DATA.personal.objective}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-6 text-sm font-medium">
            <a
              href={PORTFOLIO_DATA.personal.links.github}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1 text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white transition-colors"
            >
              <span>GitHub</span>
              <ArrowUpRight className="h-3.5 w-3.5" />
            </a>
            <a
              href={PORTFOLIO_DATA.personal.links.linkedin}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1 text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white transition-colors"
            >
              <span>LinkedIn</span>
              <ArrowUpRight className="h-3.5 w-3.5" />
            </a>
            <a
              href={`mailto:${PORTFOLIO_DATA.personal.email}`}
              className="inline-flex items-center gap-1 text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white transition-colors"
            >
              <Mail className="h-4 w-4 mr-0.5" />
              <span>Contact</span>
            </a>
          </div>
        </div>

        <div className="pt-8 border-t border-neutral-100 dark:border-neutral-900 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-neutral-500">
          <p>© {currentYear} Özay Can Kırlı. All rights reserved.</p>
          <p className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-500" />
            Based in {PORTFOLIO_DATA.personal.location}
          </p>
        </div>

      </div>
    </footer>
  );
}