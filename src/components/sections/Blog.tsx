"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { BLOG_POSTS, BlogPost } from "@/lib/blogData";
import { PORTFOLIO_DATA } from "@/lib/data";
import { BookOpen, ThumbsUp, Share2, X, ArrowUpRight, Check } from "lucide-react";
import Image from "next/image";

export function Blog() {
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);
  const [clapsMap, setClapsMap] = useState<Record<string, number>>({});
  const [copiedSlug, setCopiedSlug] = useState<string | null>(null);

  // Sayfa yüklendiğinde hafızadaki claps (alkış) verilerini çek
  useEffect(() => {
    const initialMap: Record<string, number> = {};

    BLOG_POSTS.forEach((post) => {
      const saved = localStorage.getItem(`claps_${post.slug}`);

      initialMap[post.slug] = saved ? Number.parseInt(saved, 10) : post.claps;
    });

    const frameId = window.requestAnimationFrame(() => {
      setClapsMap(initialMap);
    });

    return () => {
      window.cancelAnimationFrame(frameId);
    };
  }, []);

  // Tıklamada alkış sayısını artır ve LocalStorage'a yaz
  const handleClap = (slug: string, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setClapsMap((prev) => {
      const nextVal = (prev[slug] || 0) + 1;
      localStorage.setItem(`claps_${slug}`, nextVal.toString());
      return { ...prev, [slug]: nextVal };
    });
  };

  // Gerçek Paylaşım Logic'i (Web Share API veya Clipboard)
  const handleShare = async (post: BlogPost) => {
    const url = `${window.location.origin}/#blog-${post.slug}`;
    if (navigator.share) {
      try {
        await navigator.share({
          title: post.title,
          text: post.subtitle,
          url: url,
        });
      } catch {
        // Kullanıcı paylaşımı iptal ettiyse sessizce geç
      }
    } else {
      // Masaüstünde linki panoya kopyala
      navigator.clipboard.writeText(url);
      setCopiedSlug(post.slug);
      setTimeout(() => setCopiedSlug(null), 2000);
    }
  };

  return (
    <section id="blog" className="py-24 relative">
      <div className="container mx-auto px-4 md:px-8">
        
        {/* Başlık Alanı */}
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
            My personal thoughts on software architecture, the evolution of web development, and engineering leadership.
          </p>
        </motion.div>

        {/* Medium Tarzı Makale Listesi */}
        <div className="space-y-12 max-w-4xl">
          {BLOG_POSTS.map((post, index) => {
            const currentClaps = clapsMap[post.slug] ?? post.claps;

            return (
              <motion.article
                key={post.slug}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                onClick={() => setSelectedPost(post)}
                className="group cursor-pointer border-b border-neutral-200 dark:border-neutral-800 pb-10 flex flex-col md:flex-row gap-8 justify-between items-start hover:border-neutral-400 dark:hover:border-neutral-600 transition-colors"
              >
                <div className="flex-1 space-y-3">
                  {/* Yazar Bilgisi */}
                  <div className="flex items-center gap-2 text-xs font-medium text-neutral-500">
                    <div className="w-5 h-5 rounded-full overflow-hidden relative bg-neutral-200 dark:bg-neutral-800">
                      <Image
                        src="/images/profile.png"
                        alt={PORTFOLIO_DATA.personal.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <span className="text-neutral-900 dark:text-neutral-300">
                      {PORTFOLIO_DATA.personal.name}
                    </span>
                    <span>·</span>
                    <span>{post.date}</span>
                  </div>

                  {/* Başlık ve Alt Başlık */}
                  <h3 className="text-2xl md:text-3xl font-bold text-neutral-900 dark:text-white group-hover:text-emerald-500 transition-colors">
                    {post.title}
                  </h3>
                  <p className="text-neutral-600 dark:text-neutral-400 leading-relaxed line-clamp-2">
                    {post.subtitle}
                  </p>

                  {/* Alt Bilgiler: Read Time, Canlı Claps, Tags */}
                  <div className="flex flex-wrap items-center gap-4 pt-2 text-xs text-neutral-500">
                    <span className="font-semibold text-neutral-700 dark:text-neutral-300">
                      {post.readTime}
                    </span>
                    <span>·</span>
                    <button
                      type="button"
                      onClick={(e) => handleClap(post.slug, e)}
                      className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-neutral-100 dark:bg-neutral-800/80 hover:bg-emerald-500/10 hover:text-emerald-500 transition-colors"
                    >
                      <ThumbsUp className="h-3.5 w-3.5" />
                      <span className="font-medium">{currentClaps}</span>
                    </button>
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

                {/* Okuma Ok İkonu */}
                <div className="self-center md:self-start p-3 rounded-full bg-neutral-100 dark:bg-neutral-800 group-hover:bg-neutral-900 group-hover:text-white dark:group-hover:bg-white dark:group-hover:text-neutral-900 transition-all">
                  <ArrowUpRight className="h-5 w-5" />
                </div>
              </motion.article>
            );
          })}
        </div>

      </div>

      {/* Makale Okuma Ekranı (Medium Reader Modal) */}
      <AnimatePresence>
        {selectedPost && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-10 bg-black/60 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.3 }}
              className="relative w-full max-w-3xl max-h-[85vh] overflow-y-auto bg-white dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 rounded-2xl shadow-2xl p-6 md:p-12"
            >
              {/* Kapat Butonu */}
              <button
                onClick={() => setSelectedPost(null)}
                className="sticky top-0 float-right p-2 rounded-full bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-300 hover:opacity-80 transition-opacity"
              >
                <X className="h-5 w-5" />
              </button>

              {/* Yazar Künyesi */}
              <div className="flex items-center gap-3 mb-8">
                <div className="w-10 h-10 rounded-full overflow-hidden relative bg-neutral-200 dark:bg-neutral-800">
                  <Image
                    src="/images/profile.png"
                    alt={PORTFOLIO_DATA.personal.name}
                    fill
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

              {/* Başlık */}
              <h1 className="text-3xl md:text-4xl font-extrabold text-neutral-900 dark:text-white mb-4 leading-tight">
                {selectedPost.title}
              </h1>
              <p className="text-lg text-neutral-500 dark:text-neutral-400 mb-8 border-b border-neutral-200 dark:border-neutral-800 pb-8 font-serif italic">
                {selectedPost.subtitle}
              </p>

              {/* Zengin Metin İçeriği */}
              <div className="space-y-6 text-neutral-800 dark:text-neutral-300 leading-relaxed text-base md:text-lg font-serif">
                {selectedPost.content.map((paragraph, idx) => (
                  <p key={idx}>{paragraph}</p>
                ))}
              </div>

              {/* Medium Tarzı Canlı Alkış & Gerçek Paylaşım Barı */}
              <div className="mt-12 pt-6 border-t border-neutral-200 dark:border-neutral-800 flex items-center justify-between text-sm text-neutral-500">
                <div className="flex items-center gap-6">
                  <button
                    type="button"
                    onClick={() => handleClap(selectedPost.slug)}
                    className="flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/10 text-emerald-500 hover:bg-emerald-500/20 font-medium transition-colors"
                  >
                    <ThumbsUp className="h-4 w-4" />
                    <span>{clapsMap[selectedPost.slug] ?? selectedPost.claps} Claps</span>
                  </button>
                </div>
                <button
                  type="button"
                  onClick={() => handleShare(selectedPost)}
                  className="flex items-center gap-2 px-4 py-2 rounded-full bg-neutral-100 dark:bg-neutral-800 hover:bg-neutral-200 dark:hover:bg-neutral-700 font-medium transition-colors text-neutral-700 dark:text-neutral-300"
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
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}