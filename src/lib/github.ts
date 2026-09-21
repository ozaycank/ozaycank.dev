import { Octokit } from "@octokit/rest";

const octokit = new Octokit({
    auth: process.env.GITHUB_TOKEN,
});

const USERNAME = process.env.GITHUB_USERNAME || "ozaycank";

interface GithubRepoResponse {
    id: number;
    name: string;
    full_name: string;
    description: string | null;
    html_url: string;
    homepage: string | null;
    stargazers_count: number;
    created_at: string | null;
    fork: boolean;
    default_branch: string;
}

export interface GithubProject {
    id: number;
    name: string;
    fullName: string;
    description: string | null;
    htmlUrl: string;
    homepage: string | null;
    stargazersCount: number;
    topics: string[];
    coverImage: string | null;
    createdAt: string;
}

interface FeaturedProjectConfig {
    name: string;
    description: string;
    topics: readonly string[];
}

const FEATURED_PROJECTS: readonly FeaturedProjectConfig[] = [
    {
        name: "Velyo",
        description:
            "A multi-tenant Agile workspace combining project management, documentation, real-time collaboration, analytics, and role-based access.",
        topics: [
            ".NET 8",
            "Next.js",
            "PostgreSQL",
            "SignalR",
            "CQRS",
            "Clean Architecture",
        ],
    },
    {
        name: "ogretmen-busra",
        description:
            "A serverless education platform for publishing, moderating, and securely distributing classroom materials with object storage and edge rate limiting.",
        topics: [
            "Next.js",
            "TypeScript",
            "PostgreSQL",
            "Prisma",
            "Cloudflare R2",
            "Upstash Redis",
        ],
    },
    {
        name: "fanX",
        description:
            "A full-stack sports social platform with feeds, voting, direct messaging, moderation, and visibility-aware polling to reduce unnecessary network requests.",
        topics: [
            "React",
            "Node.js",
            "PostgreSQL",
            "Prisma",
            "Zustand",
            "JWT",
        ],
    },
];

const FEATURED_PROJECT_MAP = new Map<
    string,
    FeaturedProjectConfig & { order: number }
>(
    FEATURED_PROJECTS.map((project, order) => [
        project.name,
        {
            ...project,
            order,
        },
    ])
);

function extractFirstImage(
    markdownContent: string | null,
    repoFullName: string,
    defaultBranch: string
): string | null {
    if (!markdownContent) return null;

    const markdownImageRegex = /!\[.*?\]\((.*?)\)/;
    const htmlImageRegex = /<img.*?src=["'](.*?)["'].*?>/i;

    const markdownMatch = markdownContent.match(markdownImageRegex);

    if (markdownMatch?.[1]) {
        return normalizeImageUrl(
            markdownMatch[1],
            repoFullName,
            defaultBranch
        );
    }

    const htmlMatch = markdownContent.match(htmlImageRegex);

    if (htmlMatch?.[1]) {
        return normalizeImageUrl(
            htmlMatch[1],
            repoFullName,
            defaultBranch
        );
    }

    return null;
}

function normalizeImageUrl(
    url: string,
    repoFullName: string,
    defaultBranch: string
): string {
    if (/^https?:\/\//i.test(url)) {
        return url;
    }

    const cleanUrl = url
        .replace(/\\/g, "/")
        .replace(/^\.?\//, "");

    return `https://raw.githubusercontent.com/${repoFullName}/${defaultBranch}/${cleanUrl}`;
}

export async function fetchGithubProjects(): Promise<GithubProject[]> {
    try {
        const { data: repos } = await octokit.repos.listForUser({
            username: USERNAME,
            sort: "updated",
            per_page: 100,
            type: "owner",
        });

        const filteredRepos = (repos as GithubRepoResponse[]).filter(
            (repo) =>
                !repo.fork &&
                FEATURED_PROJECT_MAP.has(repo.name)
        );

        const projectPromises = filteredRepos.map(async (repo) => {
            const projectConfig = FEATURED_PROJECT_MAP.get(repo.name)!;

            let coverImage: string | null = null;

            try {
                const { data: readme } = await octokit.repos.getReadme({
                    owner: USERNAME,
                    repo: repo.name,
                    mediaType: {
                        format: "raw",
                    },
                });

                const readmeContent = readme as unknown as string;

                coverImage = extractFirstImage(
                    readmeContent,
                    repo.full_name,
                    repo.default_branch
                );
            } catch {
                // A missing README image must not prevent the project from rendering.
            }

            return {
                id: repo.id,
                name: repo.name,
                fullName: repo.full_name,
                description: projectConfig.description,
                htmlUrl: repo.html_url,
                homepage: repo.homepage,
                stargazersCount: repo.stargazers_count,
                topics: [...projectConfig.topics],
                coverImage,
                createdAt: repo.created_at || "",
            };
        });

        const projects = await Promise.all(projectPromises);

        return projects.sort((a, b) => {
            const aOrder =
                FEATURED_PROJECT_MAP.get(a.name)?.order ??
                Number.MAX_SAFE_INTEGER;

            const bOrder =
                FEATURED_PROJECT_MAP.get(b.name)?.order ??
                Number.MAX_SAFE_INTEGER;

            return aOrder - bOrder;
        });
    } catch (error) {
        console.error("Error fetching GitHub projects:", error);
        return [];
    }
}