export const site = {
  name: "Federico Meza",
  brand: "Federico Meza",
  role: "Desarrollador de Software Full Stack / Backend",
  email: "hello@federicomeza.dev",
  github: "https://github.com/",
  linkedin: "https://linkedin.com/in/",
  headline: "Hola, soy Federico Meza",
  subtitle:
    "Diseño arquitectura backend sólida, aplicaciones web modernas y sistemas automatizados — desde APIs en Laravel hasta bots de trading en Python.",
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
    title: "IA y herramientas",
    items: ["Cursor", "Claude Code", "Sistemas agénticos", "MCP"],
    icon: "sparkles" as const,
  },
] as const;

export const projects = [
  {
    title: "Bot de trading automatizado de alta frecuencia",
    description:
      "Sistema de trading en Python conectado a APIs financieras con lógica de señales CRSI/LRC, logging estructurado y controles de riesgo para sesiones en vivo.",
    tags: ["Python", "APIs financieras", "CRSI/LRC", "Logging"],
    github: "https://github.com/",
    live: "#",
  },
  {
    title: "Aplicación web empresarial",
    description:
      "Plataforma full-stack con servicios Laravel, workers en Node.js y entornos Dockerizados para despliegues fiables en desarrollo y producción.",
    tags: ["Laravel", "Node.js", "Docker"],
    github: "https://github.com/",
    live: "#",
  },
  {
    title: "Dashboards frontend modernos",
    description:
      "Dashboards en Angular que muestran datos de APIs en tiempo real, con jerarquía clara, interacciones rápidas e integraciones orientadas a flujos operativos.",
    tags: ["Angular", "Integraciones API"],
    github: "https://github.com/",
    live: "#",
  },
] as const;

export const workflow = [
  {
    title: "Código limpio y mantenible",
    description:
      "Estructura legible, límites claros y APIs fáciles de extender a medida que el producto crece.",
    icon: "code" as const,
  },
  {
    title: "Entornos Dockerizados",
    description:
      "Setups reproducibles en local y producción para que todo el equipo parta de la misma base.",
    icon: "box" as const,
  },
  {
    title: "Flujos automatizados",
    description:
      "Scripts, pipelines y bucles agénticos que reducen trabajo repetitivo y mantienen una entrega consistente.",
    icon: "workflow" as const,
  },
  {
    title: "Herramientas impulsadas por IA",
    description:
      "Cursor, Claude Code y flujos con MCP para avanzar más rápido sin sacrificar calidad.",
    icon: "bot" as const,
  },
] as const;
