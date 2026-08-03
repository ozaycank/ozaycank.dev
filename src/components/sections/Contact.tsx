"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { contactFormSchema, type ContactFormData } from "@/lib/validations/contact";
import { PORTFOLIO_DATA } from "@/lib/data";
import {
  Mail,
  MapPin,
  Send,
  CheckCircle2,
  AlertCircle,
  Download,
  ArrowUpRight,
  Loader2,
  Sparkles,
} from "lucide-react";

export function Contact() {
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState<string>("");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      fullName: "",
      email: "",
      company: "",
      subject: "",
      message: "",
      botcheck: false,
    },
  });

  const onSubmit = async (data: ContactFormData) => {
    setSubmitStatus("idle");
    setErrorMessage("");

    // Honeypot kontrolü: Bot gizli checkbox'ı işaretlediyse işlemi sessizce durdur
    if (data.botcheck) return;

    try {
      const accessKey = process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY;
      
      if (!accessKey) {
        throw new Error("Web3Forms Access Key is missing in environment variables.");
      }

      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          access_key: accessKey,
          name: data.fullName,
          email: data.email,
          company: data.company || "Not Specified",
          subject: data.subject,
          message: data.message,
          from_name: "ozaycank.dev Portfolio Contact",
        }),
      });

      const result = await response.json();

      if (response.ok && result.success) {
        setSubmitStatus("success");
        reset();
        // 5 saniye sonra Toast mesajını gizle
        setTimeout(() => setSubmitStatus("idle"), 5000);
      } else {
        throw new Error(result.message || "Failed to send message. Please try again.");
      }
    } catch (error) {
      setSubmitStatus("error");
      setErrorMessage(
        error instanceof Error ? error.message : "An unexpected error occurred."
      );
    }
  };

  return (
    <section id="contact" className="py-24 relative overflow-hidden">
      {/* Arka plan yumuşak ışık efekti */}
      <div className="absolute top-1/2 right-0 -translate-y-1/2 w-[500px] h-[500px] bg-emerald-500/5 dark:bg-emerald-500/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="container mx-auto px-4 md:px-8 relative z-10">
        
        {/* Başlık */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5 }}
          className="mb-16 md:mb-20"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-neutral-100 dark:bg-neutral-800/50 text-xs font-medium text-neutral-600 dark:text-neutral-400 mb-4">
            <Sparkles className="h-3.5 w-3.5 text-emerald-500" />
            <span>Get in Touch</span>
          </div>
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-4">
            Let&apos;s Build Together.
          </h2>
          <p className="text-neutral-600 dark:text-neutral-400 text-lg max-w-2xl">
            Have a project in mind, an architectural challenge, or an opportunity to discuss? Send me a message and let&apos;s talk.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* SOL KOLON: İletişim Bilgileri & Durum */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-5 space-y-8"
          >
            {/* Open To Work Kartı */}
            <div className="p-6 rounded-2xl bg-neutral-50 dark:bg-neutral-900/50 border border-neutral-200 dark:border-neutral-800 space-y-4">
              <div className="flex items-center gap-3">
                <span className="relative flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500" />
                </span>
                <span className="text-sm font-semibold text-neutral-900 dark:text-white">
                  Open to Work & Opportunities
                </span>
              </div>
              <p className="text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed">
                Available for full-time engineering roles, solutions architecture consulting, and high-impact full-stack collaborations.
              </p>
            </div>

            {/* İletişim Kanalları */}
            <div className="space-y-4">
              <a
                href={`mailto:${PORTFOLIO_DATA.personal.email}`}
                className="flex items-center gap-4 p-4 rounded-xl border border-neutral-200 dark:border-neutral-800 hover:border-neutral-300 dark:hover:border-neutral-700 hover:bg-neutral-50 dark:hover:bg-neutral-900/40 transition-all group"
              >
                <div className="p-3 rounded-lg bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 group-hover:bg-neutral-900 group-hover:text-white dark:group-hover:bg-white dark:group-hover:text-neutral-900 transition-colors">
                  <Mail className="h-5 w-5" />
                </div>
                <div>
                  <div className="text-xs font-medium text-neutral-500">Direct Email</div>
                  <div className="text-sm font-semibold text-neutral-900 dark:text-white">
                    {PORTFOLIO_DATA.personal.email}
                  </div>
                </div>
              </a>

              <div className="flex items-center gap-4 p-4 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-transparent">
                <div className="p-3 rounded-lg bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300">
                  <MapPin className="h-5 w-5" />
                </div>
                <div>
                  <div className="text-xs font-medium text-neutral-500">Location & Mode</div>
                  <div className="text-sm font-semibold text-neutral-900 dark:text-white">
                    {PORTFOLIO_DATA.personal.location}
                  </div>
                </div>
              </div>
            </div>

            {/* Sosyal Linkler & CV İndirme Butonu */}
            <div className="pt-2 flex flex-wrap items-center gap-3">
              <a
                href={PORTFOLIO_DATA.personal.links.github}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl border border-neutral-200 dark:border-neutral-800 text-xs font-semibold text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
              >
                <span>GitHub</span>
                <ArrowUpRight className="h-3.5 w-3.5" />
              </a>
              <a
                href={PORTFOLIO_DATA.personal.links.linkedin}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl border border-neutral-200 dark:border-neutral-800 text-xs font-semibold text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
              >
                <span>LinkedIn</span>
                <ArrowUpRight className="h-3.5 w-3.5" />
              </a>
              <a
                href="/resume.pdf"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 text-xs font-bold hover:opacity-90 transition-opacity ml-auto"
              >
                <Download className="h-3.5 w-3.5" />
                <span>Download CV</span>
              </a>
            </div>
          </motion.div>

          {/* SAĞ KOLON: İletişim Form Kartı */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-7"
          >
            <div className="p-6 sm:p-8 md:p-10 rounded-2xl bg-neutral-50/80 dark:bg-neutral-900/40 border border-neutral-200 dark:border-neutral-800 shadow-xl relative">
              
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6" noValidate>
                
                {/* Honeypot Field (Bot Koruması) - Ekrandan Gizlidir */}
                <div className="hidden" aria-hidden="true">
                  <input
                    type="checkbox"
                    tabIndex={-1}
                    autoComplete="off"
                    {...register("botcheck")}
                  />
                </div>

                {/* Name & Email Satırı */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label
                      htmlFor="fullName"
                      className="block text-xs font-semibold uppercase tracking-wider text-neutral-600 dark:text-neutral-400 mb-2"
                    >
                      Full Name <span className="text-rose-500">*</span>
                    </label>
                    <input
                      id="fullName"
                      type="text"
                      placeholder="John Doe"
                      aria-invalid={!!errors.fullName}
                      aria-describedby={errors.fullName ? "fullName-error" : undefined}
                      className="w-full px-4 py-3 rounded-xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 text-sm text-neutral-900 dark:text-white placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-neutral-400 dark:focus:ring-neutral-600 transition-all"
                      {...register("fullName")}
                    />
                    {errors.fullName && (
                      <p id="fullName-error" className="mt-1.5 text-xs text-rose-500 font-medium">
                        {errors.fullName.message}
                      </p>
                    )}
                  </div>

                  <div>
                    <label
                      htmlFor="email"
                      className="block text-xs font-semibold uppercase tracking-wider text-neutral-600 dark:text-neutral-400 mb-2"
                    >
                      Email Address <span className="text-rose-500">*</span>
                    </label>
                    <input
                      id="email"
                      type="email"
                      placeholder="john@example.com"
                      aria-invalid={!!errors.email}
                      aria-describedby={errors.email ? "email-error" : undefined}
                      className="w-full px-4 py-3 rounded-xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 text-sm text-neutral-900 dark:text-white placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-neutral-400 dark:focus:ring-neutral-600 transition-all"
                      {...register("email")}
                    />
                    {errors.email && (
                      <p id="email-error" className="mt-1.5 text-xs text-rose-500 font-medium">
                        {errors.email.message}
                      </p>
                    )}
                  </div>
                </div>

                {/* Company & Subject Satırı */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label
                      htmlFor="company"
                      className="block text-xs font-semibold uppercase tracking-wider text-neutral-600 dark:text-neutral-400 mb-2"
                    >
                      Company <span className="text-neutral-400 font-normal">(Optional)</span>
                    </label>
                    <input
                      id="company"
                      type="text"
                      placeholder="Acme Corp"
                      aria-invalid={!!errors.company}
                      className="w-full px-4 py-3 rounded-xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 text-sm text-neutral-900 dark:text-white placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-neutral-400 dark:focus:ring-neutral-600 transition-all"
                      {...register("company")}
                    />
                    {errors.company && (
                      <p className="mt-1.5 text-xs text-rose-500 font-medium">
                        {errors.company.message}
                      </p>
                    )}
                  </div>

                  <div>
                    <label
                      htmlFor="subject"
                      className="block text-xs font-semibold uppercase tracking-wider text-neutral-600 dark:text-neutral-400 mb-2"
                    >
                      Subject <span className="text-rose-500">*</span>
                    </label>
                    <input
                      id="subject"
                      type="text"
                      placeholder="Project Collaboration / Consultation"
                      aria-invalid={!!errors.subject}
                      aria-describedby={errors.subject ? "subject-error" : undefined}
                      className="w-full px-4 py-3 rounded-xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 text-sm text-neutral-900 dark:text-white placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-neutral-400 dark:focus:ring-neutral-600 transition-all"
                      {...register("subject")}
                    />
                    {errors.subject && (
                      <p id="subject-error" className="mt-1.5 text-xs text-rose-500 font-medium">
                        {errors.subject.message}
                      </p>
                    )}
                  </div>
                </div>

                {/* Message Field */}
                <div>
                  <label
                    htmlFor="message"
                    className="block text-xs font-semibold uppercase tracking-wider text-neutral-600 dark:text-neutral-400 mb-2"
                  >
                    Message <span className="text-rose-500">*</span>
                  </label>
                  <textarea
                    id="message"
                    rows={5}
                    placeholder="Tell me about your project, architecture needs, or open positions..."
                    aria-invalid={!!errors.message}
                    aria-describedby={errors.message ? "message-error" : undefined}
                    className="w-full px-4 py-3 rounded-xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 text-sm text-neutral-900 dark:text-white placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-neutral-400 dark:focus:ring-neutral-600 transition-all resize-none"
                    {...register("message")}
                  />
                  {errors.message && (
                    <p id="message-error" className="mt-1.5 text-xs text-rose-500 font-medium">
                      {errors.message.message}
                    </p>
                  )}
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 text-sm font-bold hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-md"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" />
                      <span>Sending Message...</span>
                    </>
                  ) : (
                    <>
                      <span>Send Message</span>
                      <Send className="h-4 w-4" />
                    </>
                  )}
                </button>
              </form>

              {/* Toast Bildirimleri (Success & Error states) */}
              <AnimatePresence>
                {submitStatus === "success" && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className="mt-6 p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400 flex items-center gap-3 text-sm font-medium"
                    role="status"
                    aria-live="polite"
                  >
                    <CheckCircle2 className="h-5 w-5 shrink-0" />
                    <span>Message sent successfully! I will get back to you soon.</span>
                  </motion.div>
                )}

                {submitStatus === "error" && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className="mt-6 p-4 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-600 dark:text-rose-400 flex items-center gap-3 text-sm font-medium"
                    role="alert"
                    aria-live="assertive"
                  >
                    <AlertCircle className="h-5 w-5 shrink-0" />
                    <span>
                      {errorMessage || "Failed to send message. Please try again later."}
                    </span>
                  </motion.div>
                )}
              </AnimatePresence>

            </div>
          </motion.div>

        </div>

      </div>
    </section>
  );
}