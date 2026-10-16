export const site = {
  name: "Federico Meza",
  brand: "Kico Meza",
  role: "Full Stack / Backend Software Developer",
  email: "hello@kicomeza.dev",
  github: "https://github.com/",
  linkedin: "https://linkedin.com/in/",
  headline: "Hi, I'm Kico Meza",
  subtitle:
    "I design robust backend architecture, modern web apps, and automated systems — from Laravel APIs to Python trading bots.",
};

export const heroStack = [
  "Laravel",
  "Node.js",
  "Angular",
  "Docker",
  "Python",
] as const;

export const skillGroups = [
  {
    title: "Backend",
    items: ["Laravel", "Node.js", "Python"],
    icon: "server" as const,
  },
  {
    title: "Frontend",
    items: ["Angular"],
    icon: "layout" as const,
  },
  {
    title: "DevOps",
    items: ["Docker", "macOS", "Linux"],
    icon: "container" as const,
  },
  {
    title: "AI & Tools",
    items: ["Cursor", "Claude Code", "Agentic Systems", "MCP"],
    icon: "sparkles" as const,
  },
] as const;

export const projects = [
  {
    title: "High-Frequency Automated Trading Bot",
    description:
      "Python trading system wired to financial APIs with CRSI/LRC signal logic, custom structured logging, and disciplined risk controls for live market sessions.",
    tags: ["Python", "Financial APIs", "CRSI/LRC", "Custom Logging"],
    github: "https://github.com/",
    live: "#",
  },
  {
    title: "Enterprise Web Application",
    description:
      "Full-stack business platform with Laravel services, Node.js workers, and Dockerized environments for reliable deploys across development and production.",
    tags: ["Laravel", "Node.js", "Docker"],
    github: "https://github.com/",
    live: "#",
  },
  {
    title: "Modern Frontend Dashboards",
    description:
      "Angular dashboards that surface live API data with clear information hierarchy, fast interactions, and integrations tailored to operational workflows.",
    tags: ["Angular", "API Integrations"],
    github: "https://github.com/",
    live: "#",
  },
] as const;

export const workflow = [
  {
    title: "Clean, maintainable code",
    description:
      "Readable structure, clear boundaries, and APIs that stay easy to extend as products grow.",
    icon: "code" as const,
  },
  {
    title: "Dockerized environments",
    description:
      "Reproducible local and production setups so every teammate ships from the same baseline.",
    icon: "box" as const,
  },
  {
    title: "Automated workflows",
    description:
      "Scripts, pipelines, and agentic loops that cut busywork and keep delivery consistent.",
    icon: "workflow" as const,
  },
  {
    title: "AI-driven tooling",
    description:
      "Cursor, Claude Code, and MCP-backed workflows to move faster without sacrificing quality.",
    icon: "bot" as const,
  },
] as const;
