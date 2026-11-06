<img width="1894" height="895" alt="image" src="https://github.com/user-attachments/assets/557624e4-eebe-46b3-bc4c-b6443e67c378" />

# ozaycank.dev

Personal portfolio and engineering blog of **Özay Can Kırlı**, a full-stack software developer focused on maintainable products, backend systems, and practical software architecture.

- **Website:** https://ozaycank.dev
- **GitHub:** https://github.com/ozaycank
- **LinkedIn:** https://linkedin.com/in/ozaycankirli

## Overview

This repository contains the source code for my personal portfolio. It is built with the Next.js App Router and presents my professional experience, selected projects, technical skills, engineering writing, résumé, and contact information.

The home page is statically rendered and configured to revalidate every hour. Selected GitHub project information is retrieved through the GitHub REST API and displayed alongside project-specific descriptions and technology tags.

## Features

- **Profile and introduction** — overview, professional focus, social links, and résumé access.
- **Professional experience** — an animated timeline of roles, organizations, dates, and responsibilities.
- **Selected projects** — a curated list of GitHub repositories, including repository links, stars, technology tags, optional live-site links, and README-derived preview images.
- **Technology stack** — skills grouped into languages, frontend, backend, databases/ORMs, and infrastructure.
- **Engineering blog** — locally defined articles displayed in accessible, animated dialogs, with Web Share API and clipboard fallbacks.
- **Contact form** — client-side validation with React Hook Form and Zod, a honeypot field, and message delivery through Web3Forms.
- **Theme support** — light/dark theme switching with dark mode as the default and system-theme support.
- **Responsive interface** — Tailwind CSS styling, Framer Motion transitions, and Lucide icons.

## Tech stack

| Area                 | Technologies                                |
| -------------------- | ------------------------------------------- |
| Framework            | Next.js 16.2.11 (App Router)                |
| UI                   | React 19.2.4, TypeScript 5                  |
| Styling              | Tailwind CSS 4                              |
| Animation and icons  | Framer Motion, Lucide React                 |
| Forms and validation | React Hook Form, Zod, `@hookform/resolvers` |
| GitHub integration   | Octokit REST (`@octokit/rest`)              |
| Theme                | `next-themes`                               |
| Utilities            | `clsx`, `tailwind-merge`                    |
| Hosting              | Vercel                                      |
| Contact delivery     | Web3Forms                                   |

The repository includes `pnpm-lock.yaml`; use pnpm to install the exact dependency versions recorded in the lockfile.

## Getting started

### Requirements

- Node.js **20.9 or later**
- pnpm (Corepack can enable the package manager bundled with supported Node.js installations)
- A Web3Forms access key to use the contact form locally

### Installation

```bash
git clone https://github.com/ozaycank/ozaycank.dev.git
cd ozaycank.dev

corepack enable
pnpm install --frozen-lockfile
```

### Environment variables

Create a `.env.local` file in the project root:

```dotenv
# Required for contact-form submissions
NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY=your_web3forms_access_key

# Optional: defaults to "ozaycank"
GITHUB_USERNAME=ozaycank

# Optional: valid GitHub token for authenticated API requests
# Leave unset when public repository access is sufficient.
GITHUB_TOKEN=your_github_token
```

#### Variable reference

| Variable                           | Required                  | Purpose                                                                                                                                      |
| ---------------------------------- | ------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------- |
| `NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY` | Yes, for the contact form | Web3Forms access key used by the browser when submitting the contact form. This is a Web3Forms client-side key, not a private server secret. |
| `GITHUB_USERNAME`                  | No                        | GitHub account whose repositories are queried. Defaults to `ozaycank`.                                                                       |
| `GITHUB_TOKEN`                     | No                        | Optional GitHub Personal Access Token used by Octokit for authenticated API requests.                                                        |

**Important:** Do not commit `.env.local` or any real token. Environment files are excluded by `.gitignore`. Variables prefixed with `NEXT_PUBLIC_` are included in the browser bundle; only use the Web3Forms key intended for client-side use there. Never put a private GitHub token in a `NEXT_PUBLIC_` variable.

For public repositories, the GitHub integration can make unauthenticated requests, so `GITHUB_TOKEN` may be omitted. If a token is configured, it must be valid. An expired, revoked, or incorrectly copied token causes GitHub API responses such as `401 Bad credentials`; the portfolio catches the request error and renders its projects-unavailable fallback state.

### Run locally

```bash
pnpm dev
```

Open http://localhost:3000.

## Available scripts

| Command      | Description                                                              |
| ------------ | ------------------------------------------------------------------------ |
| `pnpm dev`   | Starts the Next.js development server.                                   |
| `pnpm build` | Creates an optimized production build.                                   |
| `pnpm start` | Starts the production server after a successful build.                   |
| `pnpm lint`  | Runs ESLint using the repository's Next.js and TypeScript configuration. |

## Project structure

```text
.
├── public/
│   ├── images/
│   │   └── profile.png
│   └── resume.pdf
├── src/
│   ├── app/
│   │   ├── globals.css
│   │   ├── layout.tsx
│   │   └── page.tsx
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Footer.tsx
│   │   │   └── Navbar.tsx
│   │   ├── sections/
│   │   │   ├── Blog.tsx
│   │   │   ├── Contact.tsx
│   │   │   ├── Experience.tsx
│   │   │   ├── Hero.tsx
│   │   │   ├── Projects.tsx
│   │   │   └── TechStack.tsx
│   │   └── ThemeProvider.tsx
│   └── lib/
│       ├── blogData.ts
│       ├── data.ts
│       ├── github.ts
│       └── validations/
│           └── contact.ts
├── next.config.ts
├── package.json
├── pnpm-lock.yaml
├── postcss.config.mjs
├── eslint.config.mjs
└── tsconfig.json
```

### Where to update content

- **Profile, social links, skills, and experience:** `src/lib/data.ts`
- **Blog entries:** `src/lib/blogData.ts`
- **Featured GitHub projects and their descriptions/technology tags:** `src/lib/github.ts` (`FEATURED_PROJECTS`)
- **Contact form validation:** `src/lib/validations/contact.ts`
- **Page composition and SEO metadata:** `src/app/page.tsx` and `src/app/layout.tsx`
- **Profile image and résumé:** `public/images/profile.png` and `public/resume.pdf`

## GitHub projects integration

The project list is intentionally curated rather than showing every repository on the account. The current allowlist in `src/lib/github.ts` contains:

- `Velyo`
- `ogretmen-busra`
- `fanX`

A repository is included only when its name matches a featured-project entry and it is not a fork. Repository metadata is retrieved through Octokit. The integration also reads each repository's README and uses its first Markdown or HTML image as the project cover when one is available. Project descriptions and technology tags are maintained in `FEATURED_PROJECTS` in `src/lib/github.ts`.

The home page uses `dynamic = "force-static"` and `revalidate = 3600`. After changing featured-project configuration or GitHub credentials in Vercel, redeploy or wait for the configured revalidation cycle before expecting the rendered project list to reflect the change.

## Contact form

The contact form validates the name, email, subject, and message in the browser with Zod and React Hook Form. It posts directly to the Web3Forms submission endpoint using `NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY`. A hidden honeypot field is included as a basic bot filter.

The form does not use a custom Next.js API route. Configure the Web3Forms key in `.env.local` for local development and in the Vercel project settings for each environment where the form should work.

## Deployment

The project is configured for deployment on Vercel:

1. Import `ozaycank/ozaycank.dev` into Vercel.
2. Use the repository's pnpm lockfile for dependency installation.
3. Add the required `NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY` environment variable and any optional GitHub variables in Vercel Project Settings.
4. Make sure the variables are assigned to the intended environments (Production, Preview, and/or Development).
5. Deploy the project.

When changing environment variables in Vercel, create a new deployment for the changes to take effect. Keep deployment protection settings separate from the public production domain configuration.

## Notes

- The portfolio content is maintained in source files; updating `src/lib/data.ts` or `src/lib/blogData.ts` does not require a CMS.
- The project currently defines the scripts listed above; no automated test script is configured in `package.json`.
- Keep access tokens and other credentials out of source control and issue descriptions.

---

Built and maintained by [Özay Can Kırlı](https://github.com/ozaycank).
