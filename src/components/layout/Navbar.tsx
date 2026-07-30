"use client";

import Link from "next/link";
import { useTheme } from "next-themes";
import { Moon, Sun, Download } from "lucide-react";
import { motion } from "framer-motion";

export function Navbar() {
  const { theme, setTheme } = useTheme();

  return (
    <header className="sticky top-0 z-50 w-full border-b border-neutral-200 dark:border-neutral-800 bg-white/50 dark:bg-neutral-950/50 backdrop-blur-md">
      <div className="container mx-auto flex h-16 items-center justify-between px-4 md:px-8">
        <Link href="/" className="font-semibold text-lg tracking-tight hover:opacity-80 transition-opacity">
          ozaycank<span className="text-neutral-500">.dev</span>
        </Link>

        <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-neutral-600 dark:text-neutral-400">
          {['Experience', 'Projects', 'Tech Stack'].map((item) => (
            <Link key={item} href={`#${item.toLowerCase().replace(' ', '-')}`} className="hover:text-neutral-900 dark:hover:text-neutral-50 transition-colors">
              {item}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-4">
          <button
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="relative p-2 rounded-full hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
            aria-label="Toggle theme"
          >
            <Sun className="h-4 w-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
            <Moon className="absolute left-2 top-2 h-4 w-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
          </button>
          
          <motion.a
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            href="/resume.pdf"
            target="_blank"
            className="hidden md:flex items-center gap-2 bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 px-4 py-2 rounded-full text-sm font-medium hover:opacity-90 transition-opacity"
          >
            <Download className="h-4 w-4" />
            <span>Resume</span>
          </motion.a>
        </div>
      </div>
    </header>
  );
}