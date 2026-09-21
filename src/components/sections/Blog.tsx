"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { BLOG_POSTS, type BlogPost } from "@/lib/blogData";
import { PORTFOLIO_DATA } from "@/lib/data";
import { ArrowUpRight, BookOpen, Check, Share2, X } from "lucide-react";
import Image from "next/image";

export function Blog() {
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);
  const [copiedSlug, setCopiedSlug] = useState<string | null>(null);

  const dialogRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!selectedPost) {
      return;
    }

    const previouslyFocusedElement =
      document.activeElement instanceof HTMLElement
        ? document.activeElement
        : null;

    const previousOverflow = document.body.style.overflow;

    document.body.style.overflow = "hidden";

    const frameId = window.requestAnimationFrame(() => {
      dialogRef.current?.focus();
    });

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setSelectedPost(null);
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      window.cancelAnimationFrame(frameId);
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = previousOverflow;
      previouslyFocusedElement?.focus();
    };
  }, [selectedPost]);

  const handleShare = async (post: BlogPost) => {
    const url = `${window.location.origin}/#blog-${post.slug}`;

    if (navigator.share) {
      try {
        await navigator.share({
          title: post.title,
          text: post.subtitle,
          url,
        });

        return;
      } catch (error) {
        if (error instanceof DOMException && error.name === "AbortError") {
          return;
        }
      }
    }

    try {
      await navigator.clipboard.writeText(url);

      setCopiedSlug(post.slug);

      window.setTimeout(() => {
        setCopiedSlug((currentSlug) =>
          currentSlug === post.slug ? null : currentSlug,
        );
      }, 2000);
    } catch {
      // Clipboard access may be unavailable in restricted browser contexts.
    }
  };

  const openPost = (post: BlogPost) => {
    setSelectedPost(post);
  };

  return (
    <section id="blog" className="py-24 relative">
      <div className="container mx-auto px-4 md:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5 }}
          className="mb-16 md:mb-20"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-neutral-100 dark:bg-neutral-800/50 text-xs font-medium text-neutral-600 dark:text-neutral-400 mb-4">
            <BookOpen className="h-3.5 w-3.5 text-emerald-500" />
            <span>Engineering Notes & Thoughts</span>
          </div>

          <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-4">
            Writings.
          </h2>

          <p className="text-neutral-600 dark:text-neutral-400 text-lg max-w-2xl">
            Notes on software architecture, web development, and engineering
            practice.
          </p>
        </motion.div>

        <div className="space-y-12 max-w-4xl">
          {BLOG_POSTS.map((post, index) => (
            <motion.article
              id={`blog-${post.slug}`}
              key={post.slug}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.5,
                delay: index * 0.1,
              }}
              role="button"
              tabIndex={0}
              aria-haspopup="dialog"
              aria-label={`Read ${post.title}`}
              onClick={() => openPost(post)}
              onKeyDown={(event) => {
                if (event.key === "Enter" || event.key === " ") {
                  event.preventDefault();
                  openPost(post);
                }
              }}
              className="group cursor-pointer border-b border-neutral-200 dark:border-neutral-800 pb-10 flex flex-col md:flex-row gap-8 justify-between items-start hover:border-neutral-400 dark:hover:border-neutral-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-400 dark:focus-visible:ring-neutral-600 focus-visible:ring-offset-4 dark:focus-visible:ring-offset-neutral-950 transition-colors"
            >
              <div className="flex-1 space-y-3">
                <div className="flex items-center gap-2 text-xs font-medium text-neutral-500">
                  <div className="w-5 h-5 rounded-full overflow-hidden relative bg-neutral-200 dark:bg-neutral-800">
                    <Image
                      src="/images/profile.png"
                      alt=""
                      fill
                      sizes="20px"
                      className="object-cover"
                    />
                  </div>

                  <span className="text-neutral-900 dark:text-neutral-300">
                    {PORTFOLIO_DATA.personal.name}
                  </span>

                  <span aria-hidden="true">·</span>

                  <span>{post.date}</span>
                </div>

                <h3 className="text-2xl md:text-3xl font-bold text-neutral-900 dark:text-white group-hover:text-emerald-500 transition-colors">
                  {post.title}
                </h3>

                <p className="text-neutral-600 dark:text-neutral-400 leading-relaxed line-clamp-2">
                  {post.subtitle}
                </p>

                <div className="flex flex-wrap items-center gap-4 pt-2 text-xs text-neutral-500">
                  <span className="font-semibold text-neutral-700 dark:text-neutral-300">
                    {post.readTime}
                  </span>

                  <div className="hidden sm:flex items-center gap-1.5 ml-auto">
                    {post.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-2.5 py-0.5 rounded-full bg-neutral-100 dark:bg-neutral-800/80 text-neutral-600 dark:text-neutral-400 font-normal"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div
                className="self-center md:self-start p-3 rounded-full bg-neutral-100 dark:bg-neutral-800 group-hover:bg-neutral-900 group-hover:text-white dark:group-hover:bg-white dark:group-hover:text-neutral-900 transition-all"
                aria-hidden="true"
              >
                <ArrowUpRight className="h-5 w-5" />
              </div>
            </motion.article>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {selectedPost && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onMouseDown={() => setSelectedPost(null)}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-10 bg-black/60 backdrop-blur-sm"
          >
            <motion.div
              ref={dialogRef}
              role="dialog"
              aria-modal="true"
              aria-labelledby={`blog-dialog-title-${selectedPost.slug}`}
              tabIndex={-1}
              initial={{
                opacity: 0,
                scale: 0.95,
                y: 20,
              }}
              animate={{
                opacity: 1,
                scale: 1,
                y: 0,
              }}
              exit={{
                opacity: 0,
                scale: 0.95,
                y: 20,
              }}
              transition={{ duration: 0.3 }}
              onMouseDown={(event) => event.stopPropagation()}
              className="relative w-full max-w-3xl max-h-[85vh] overflow-y-auto bg-white dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 rounded-2xl shadow-2xl p-6 md:p-12 focus:outline-none"
            >
              <button
                type="button"
                onClick={() => setSelectedPost(null)}
                aria-label="Close article"
                className="sticky top-0 float-right p-2 rounded-full bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-300 hover:bg-neutral-200 dark:hover:bg-neutral-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-400 dark:focus-visible:ring-neutral-600 transition-colors"
              >
                <X className="h-5 w-5" />
              </button>

              <div className="flex items-center gap-3 mb-8">
                <div className="w-10 h-10 rounded-full overflow-hidden relative bg-neutral-200 dark:bg-neutral-800">
                  <Image
                    src="/images/profile.png"
                    alt=""
                    fill
                    sizes="40px"
                    className="object-cover"
                  />
                </div>

                <div>
                  <h4 className="font-semibold text-sm text-neutral-900 dark:text-white">
                    {PORTFOLIO_DATA.personal.name}
                  </h4>

                  <p className="text-xs text-neutral-500">
                    {selectedPost.date} · {selectedPost.readTime}
                  </p>
                </div>
              </div>

              <h2
                id={`blog-dialog-title-${selectedPost.slug}`}
                className="text-3xl md:text-4xl font-extrabold text-neutral-900 dark:text-white mb-4 leading-tight"
              >
                {selectedPost.title}
              </h2>

              <p className="text-lg text-neutral-500 dark:text-neutral-400 mb-8 border-b border-neutral-200 dark:border-neutral-800 pb-8 font-serif italic">
                {selectedPost.subtitle}
              </p>

              <div className="space-y-6 text-neutral-800 dark:text-neutral-300 leading-relaxed text-base md:text-lg font-serif">
                {selectedPost.content.map((paragraph, index) => (
                  <p key={index}>{paragraph}</p>
                ))}
              </div>

              <div className="mt-12 pt-6 border-t border-neutral-200 dark:border-neutral-800 flex items-center justify-end text-sm text-neutral-500">
                <button
                  type="button"
                  onClick={() => handleShare(selectedPost)}
                  className="flex items-center gap-2 px-4 py-2 rounded-full bg-neutral-100 dark:bg-neutral-800 hover:bg-neutral-200 dark:hover:bg-neutral-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-400 dark:focus-visible:ring-neutral-600 font-medium transition-colors text-neutral-700 dark:text-neutral-300"
                >
                  {copiedSlug === selectedPost.slug ? (
                    <>
                      <Check className="h-4 w-4 text-emerald-500" />
                      <span className="text-emerald-500">Copied!</span>
                    </>
                  ) : (
                    <>
                      <Share2 className="h-4 w-4" />
                      <span>Share</span>
                    </>
                  )}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
