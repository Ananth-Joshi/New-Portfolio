export interface Experience {
  year: string;
  company: string;
  role: string;
  description: string;
}

export const experiences: Experience[] = [
  {
    year: "2024 — Present",
    company: "Acme Corp",
    role: "Senior Software Engineer",
    description: "Leading the core platform team. Architected a micro-frontend migration that improved load times by 40%. Mentoring junior engineers and establishing frontend standards."
  },
  {
    year: "2021 — 2024",
    company: "Nebula Systems",
    role: "Software Engineer",
    description: "Developed robust backend microservices using Node.js and Go. Implemented real-time feature flags and managed complex state migrations across distributed databases."
  },
  {
    year: "2019 — 2021",
    company: "Creative Digital",
    role: "Frontend Developer",
    description: "Built interactive web applications for high-profile clients. Focused on responsive design, accessibility, and smooth animations."
  }
];
