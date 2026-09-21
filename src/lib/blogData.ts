export interface BlogPost {
    slug: string;
    title: string;
    subtitle: string;
    date: string;
    readTime: string;
    tags: string[];
    coverImage?: string;
    content: string[];
}

export const BLOG_POSTS: BlogPost[] = [
    {
        slug: "is-web-development-a-good-career-in-2026",
        title: "Is Web Development a Good Career in 2026?",
        subtitle: "Web development is not dead. But the easy version of it probably is.",
        date: "Jun 3, 2026",
        readTime: "5 min read",
        tags: ["Web Development", "Career", "AI", "Software Engineering"],
        coverImage: "/images/profile.png",
        content: [
            "So 2026 is basically here now, and honestly, a lot of people in tech look confused.",
            "Some people are wondering if their current job will even exist in the next few years. Others are jumping from one AI trend to another trying to figure out what skill is “safe.” Every week someone on YouTube declares a field dead, then another person says it’s the future. It’s exhausting.",
            "And web development is sitting right in the middle of this mess.",
            "If you’re currently learning web development or already working as a web developer, the question is pretty simple now: Is this still a good career?",
            "I think the answer is yes. But not in the same way it was a few years ago.",
            "Web development is still alive. The path is not. People love saying “webdev is dead” because AI can generate websites now.",
            "Okay. Sure. AI can also generate terrible codebases filled with random dependencies, broken logic, fake security, and enough hallucinated code to create future architectural nightmares.",
            "What companies actually need in 2026 are software architects and engineers who understand systems, database boundaries, clean architecture, and how to glue complex distributed infrastructure together.",
        ],
    },
];