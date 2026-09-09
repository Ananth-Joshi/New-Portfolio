export interface Skill {
  name: string;
  iconSlug: string;
}

export const skills: Record<string, Skill[]> = {
  frontend: [
    { name: "React", iconSlug: "react" },
    { name: "Next.js", iconSlug: "nextdotjs" },
    { name: "TypeScript", iconSlug: "typescript" },
    { name: "Tailwind CSS", iconSlug: "tailwindcss" },
    { name: "Framer Motion", iconSlug: "framer" },
  ],
  backend: [
    { name: "Node.js", iconSlug: "nodedotjs" },
    { name: "Express", iconSlug: "express" },
    { name: "Python", iconSlug: "python" },
    { name: "Go", iconSlug: "go" },
    { name: "Laravel", iconSlug: "laravel" },
  ],
  languages: [
    { name: "JavaScript", iconSlug: "javascript" },
    { name: "TypeScript", iconSlug: "typescript" },
    { name: "Python", iconSlug: "python" },
    { name: "Go", iconSlug: "go" },
    { name: "PHP", iconSlug: "php" },
    { name: "Java", iconSlug: "java" },
    { name: "Kotlin", iconSlug: "kotlin" },
  ],
  data: [
    { name: "PostgreSQL", iconSlug: "postgresql" },
    { name: "MySQL", iconSlug: "mysql" },
    { name: "MongoDB", iconSlug: "mongodb" },
    { name: "Redis", iconSlug: "redis" },
  ],
  tools: [
    { name: "Git", iconSlug: "git" },
    { name: "Docker", iconSlug: "docker" },
    { name: "Linux", iconSlug: "linux" },
    { name: "Figma", iconSlug: "figma" },
    { name: "AWS", iconSlug: "amazonaws" },
  ]
};
