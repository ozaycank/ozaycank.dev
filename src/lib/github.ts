// src/lib/github.ts
import { Octokit } from "@octokit/rest";

const octokit = new Octokit({
    auth: process.env.GITHUB_TOKEN,
});

const USERNAME = process.env.GITHUB_USERNAME || 'ozaycank';

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

// GÖSTERİLMESİNİ İSTEDİĞİN ESKİ (Spesifik) REPOLAR
const ALLOWED_OLD_REPOS = [
    "Velyo",
    "ogretmen-busra",
    "fanX",
    "ozaycank.dev",
    "pomodoro"
];

// BU TARİHTEN SONRA OLUŞTURULAN TÜM YENİ REPOLARI OTOMATİK KABUL ET
// (Tarihi bugünün veya projeyi oluşturmaya başladığın bir tarih yapabilirsin)
const AUTO_ACCEPT_DATE = new Date("2024-01-01T00:00:00Z");

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
            type: "owner"
        });

        // AKILLI FİLTRELEME BURADA YAPILIYOR
        const filteredRepos = repos.filter((repo: any) => {
            if (repo.fork) return false; // Forkları her zaman gizle

            const repoDate = new Date(repo.created_at);

            // Eğer repo ALLOWED listesindeyse VEYA Auto-Accept tarihinden yeniyse GÖSTER
            return ALLOWED_OLD_REPOS.includes(repo.name) || repoDate > AUTO_ACCEPT_DATE;
        });

        const projectPromises = filteredRepos.map(async (repo: any) => {
            let coverImage: string | null = null;
            let readmeContent: string | null = null;

            try {
                const { data: readme } = await octokit.repos.getReadme({
                    owner: USERNAME,
                    repo: repo.name,
                    mediaType: {
                        format: "raw",
                    },
                });

                readmeContent = readme as unknown as string;
                coverImage = extractFirstImage(readmeContent, repo.full_name);

            } catch (readmeError) {
                // Readme yoksa atla
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

        const projects = await Promise.all(projectPromises);

        // Repoları oluşturulma tarihine göre yeniden eskiye (veya güncellenme tarihine göre) sıralayabilirsin.
        // Şu an varsayılan olarak "updated" (son güncellenene) göre geliyor.
        return projects;

    } catch (error) {
        console.error("Error fetching GitHub projects:", error);
        return [];
    }
}