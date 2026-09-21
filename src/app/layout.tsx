import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { ThemeProvider } from "@/components/ThemeProvider";
import { Navbar } from "@/components/layout/Navbar";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://ozaycank.dev"),

  title: {
    default: "Özay Can Kırlı | Full-Stack Software Developer",
    template: "%s | Özay Can Kırlı",
  },

  description:
    "Portfolio of Özay Can Kırlı, a full-stack software developer building modern web applications and backend systems with Next.js, React, TypeScript, .NET, and PostgreSQL.",

  keywords: [
    "Özay Can Kırlı",
    "Full-Stack Software Developer",
    "Software Developer",
    "Solution Architecture",
    "Next.js",
    "React",
    "TypeScript",
    ".NET 8",
    "PostgreSQL",
    "Turkey",
  ],

  authors: [
    {
      name: "Özay Can Kırlı",
      url: "https://ozaycank.dev",
    },
  ],

  creator: "Özay Can Kırlı",

  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://ozaycank.dev",
    title: "Özay Can Kırlı | Full-Stack Software Developer",
    description:
      "Selected projects and professional experience across full-stack development, software architecture, and enterprise systems.",
    siteName: "Özay Can Kırlı Portfolio",
    images: [
      {
        url: "/images/profile.png",
        width: 1200,
        height: 630,
        alt: "Özay Can Kırlı - Full-Stack Software Developer",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "Özay Can Kırlı | Full-Stack Software Developer",
    description:
      "Selected projects and professional experience across full-stack development and software architecture.",
    images: ["/images/profile.png"],
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning className="scroll-smooth">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen bg-white dark:bg-neutral-950 text-neutral-900 dark:text-neutral-50`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <div className="relative flex min-h-screen flex-col">
            <Navbar />
            <main className="flex-1">{children}</main>
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}