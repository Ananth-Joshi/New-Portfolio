export interface Project {
  id: string;
  title: string;
  description: string;
  image: string;
  technologies: string[];
  link: string;
  color?: string;
}

export const featuredProjects: Project[] = [
  {
    id: "01",
    title: "Aura E-Commerce",
    description: "A headless commerce experience blending brutalist design with high-performance edge rendering. Built to handle rapid checkout flows and dynamic inventory constraints.",
    image: "https://picsum.photos/seed/project1/1200/800",
    technologies: ["Next.js", "TypeScript", "Stripe", "Sanity"],
    link: "#",
    color: "bg-blue-500/10",
  },
  {
    id: "02",
    title: "Nimbus Analytics",
    description: "Real-time dashboard for atmospheric data visualization. Synthesizes millions of data points into calm, digestible visual metrics without overwhelming the user.",
    image: "https://picsum.photos/seed/project2/800/1000",
    technologies: ["React", "D3.js", "PostgreSQL", "Node.js"],
    link: "#",
    color: "bg-orange-500/10",
  },
  {
    id: "03",
    title: "Vela Studio",
    description: "A collaborative canvas for remote creative teams. Features real-time cursors, persistent websocket connections, and conflict-free data replication.",
    image: "https://picsum.photos/seed/project3/1000/700",
    technologies: ["TypeScript", "WebSockets", "Zustand", "Tailwind CSS"],
    link: "#",
    color: "bg-green-500/10",
  },
  {
    id: "04",
    title: "Ozone API",
    description: "A robust developer API for integrating localized air quality indices. Designed with strict rate-limiting, comprehensive SDKs, and beautiful documentation.",
    image: "https://picsum.photos/seed/project4/1200/900",
    technologies: ["Go", "Redis", "Docker", "GraphQL"],
    link: "#",
    color: "bg-purple-500/10",
  },
];

export const otherProjects = [
  {
    title: "Minimalist Note",
    description: "A local-first markdown editor.",
    technologies: ["React", "IndexedDB"],
  },
  {
    title: "Chroma CLI",
    description: "Terminal tool for generating color palettes.",
    technologies: ["Node.js", "Chalk"],
  },
  {
    title: "Echo Server",
    description: "Lightweight reverse proxy.",
    technologies: ["Go", "Networking"],
  }
];
