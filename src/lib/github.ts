import { Octokit } from "@octokit/rest";

const octokit = new Octokit({
    auth: process.env.GITHUB_TOKEN,
});

const USERNAME = process.env.GITHUB_USERNAME || 'ozaycank';

interface GithubRepoResponse {
    id: number;
    name: string;
    full_name: string;
    description: string | null;
    html_url: string;
    homepage: string | null;
    stargazers_count: number;
    topics?: string[];
    created_at: string | null;
    fork: boolean;
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

// SADECE GÖRÜNMESİNİ İSTEDİĞİN 5 ÖZEL REPO
const ALLOWED_OLD_REPOS: readonly string[] = [
    "Velyo",
    "ogretmen-busra",
    "fanX",
    "ozaycank.dev",
    "pomodoro",
];

// BUGÜNDEN (29 Temmuz 2026) SONRA AÇILAN YENİ REPOLAR OTOMATİK EKLENİR
const AUTO_ACCEPT_DATE = new Date("2026-07-29T00:00:00Z");

function extractFirstImage(markdownContent: string | null, repoFullName: string): string | null {
    if (!markdownContent) return null;

    const markdownImageRegex = /!\[.*?\]\((.*?)\)/;
    const htmlImageRegex = /<img.*?src="(.*?)".*?>/;

    const markdownMatch = markdownContent.match(markdownImageRegex);
    if (markdownMatch && markdownMatch[1]) {
        return normalizeImageUrl(markdownMatch[1], repoFullName);
    }

    const htmlMatch = markdownContent.match(htmlImageRegex);
    if (htmlMatch && htmlMatch[1]) {
        return normalizeImageUrl(htmlMatch[1], repoFullName);
    }

    return null;
}

function normalizeImageUrl(url: string, repoFullName: string): string {
    if (url.startsWith('http')) return url;
    const cleanUrl = url.startsWith('/') ? url.substring(1) : url;
    return `https://raw.githubusercontent.com/${repoFullName}/main/${cleanUrl}`;
}

export async function fetchGithubProjects(): Promise<GithubProject[]> {
    try {
        const { data: repos } = await octokit.repos.listForUser({
            username: USERNAME,
            sort: "updated",
            per_page: 100,
            type: "owner",
        });

        // Filtre: Sadece 5 beyaz listeli repo VEYA bugünden sonra oluşturulanlar
        const filteredRepos = (repos as GithubRepoResponse[]).filter((repo) => {
            if (repo.fork) return false;

            const repoDate = repo.created_at ? new Date(repo.created_at) : new Date(0);
            return ALLOWED_OLD_REPOS.includes(repo.name) || repoDate > AUTO_ACCEPT_DATE;
        });

        const projectPromises = filteredRepos.map(async (repo) => {
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
                coverImage = extractFirstImage(readmeContent, repo.full_name);
            } catch {
                // README bulunamazsa sessizce geç
            }

            return {
                id: repo.id,
                name: repo.name,
                fullName: repo.full_name,
                description: repo.description,
                htmlUrl: repo.html_url,
                homepage: repo.homepage,
                stargazersCount: repo.stargazers_count,
                topics: repo.topics || [],
                coverImage: coverImage,
                createdAt: repo.created_at || '',
            };
        });

        return await Promise.all(projectPromises);
    } catch (error) {
        console.error("Error fetching GitHub projects:", error);
        return [];
    }
}