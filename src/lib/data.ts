export const site = {
  name: "Federico Meza",
  brand: "Federico Meza",
  role: "Ingeniero en Sistemas · Full Stack",
  location: "Zapopan, Jalisco",
  email: "federicojmr13@gmail.com",
  phone: "+52 33 2026 8920",
  phoneHref: "tel:+523320268920",
  linkedin:
    "https://www.linkedin.com/in/federico-de-jes%C3%BAs-meza-ramos-2b829b173",
  headline: "Hola, soy Federico Meza",
  subtitle:
    "Llevo CRMs, plataformas de negocio y APIs a producción. He construido sistemas con Laravel, Node.js, TypeScript y Angular, y he liderado equipos de desarrollo.",
};

export const heroStack = [
  "Laravel",
  "Node.js",
  "TypeScript",
  "Angular",
  "MySQL",
  "Docker",
] as const;

export const skillGroups = [
  {
    title: "Backend",
    items: ["PHP", "Laravel", "Node.js", "TypeScript", "Express", "Python"],
    icon: "server" as const,
  },
  {
    title: "Frontend",
    items: ["Angular", "JavaScript", "Tailwind CSS", "Bootstrap"],
    icon: "layout" as const,
  },
  {
    title: "Datos y móvil",
    items: ["MySQL", "Oracle", "Swift", "Kotlin"],
    icon: "database" as const,
  },
  {
    title: "Entrega",
    items: ["Docker", "APIs REST", "CodeIgniter", "Django", "Flask"],
    icon: "container" as const,
  },
] as const;

export const projects = [
  {
    title: "Sistema integral para 26 Grados",
    role: "Gerente del Área de Sistemas",
    period: "2021 — 2024",
    description:
      "Lideré el equipo que construyó la plataforma operativa de la empresa: finanzas, comunidad, seguridad y administración en un solo sistema.",
    points: [
      "Estados financieros, facturación y auditoría administrativa",
      "CRM de colonos, reservas, censo y red de negocios",
      "Mesa directiva, comités, bitácoras de mantenimiento y checkpoints de seguridad",
      "Apps móviles en Swift y Kotlin sobre la misma base de datos",
    ],
    tags: ["Node.js", "TypeScript", "Express", "MySQL", "Swift", "Kotlin"],
  },
  {
    title: "CRM de Administración de Integrantes",
    role: "Desarrollador de Software",
    period: "2019 — 2021",
    description:
      "Reconstruí el CRM de la empresa y migré la operación que vivía en Informix 4GL a una aplicación web con autenticación, nómina y pagos.",
    points: [
      "Migración desde Informix 4GL sin cortar la operación",
      "Empresas, empleados, facturación, nómina e informes",
      "Autenticación, historial, auditoría e integración de pagos",
    ],
    tags: ["PHP", "MySQL", "JavaScript", "Bootstrap"],
  },
  {
    title: "Aplicaciones web en Start",
    role: "Full Stack Developer",
    period: "2024 — 2026",
    description:
      "Diseñé y mantuve aplicaciones web modulares para Administración de Servicios Start, con APIs, autenticación y despliegues reproducibles.",
    points: [
      "Servicios en Laravel, Node.js y TypeScript con interfaz en Angular",
      "APIs REST entre backend y pantallas responsivas",
      "Docker en desarrollo y producción, consultas SQL y procesos automatizados",
    ],
    tags: ["Laravel", "Node.js", "TypeScript", "Angular", "Docker"],
  },
] as const;

export const experience = [
  {
    role: "Full Stack Developer",
    company: "Administración de Servicios Start",
    place: "Home office",
    period: "Oct 2024 — Oct 2026",
    points: [
      "Aplicaciones web escalables con Laravel, Node.js, TypeScript y Angular.",
      "Contenedores Docker para desarrollo y producción.",
      "APIs REST, autenticación, bases relacionales y procesos automatizados.",
    ],
  },
  {
    role: "Gerente del Área de Sistemas",
    company: "26 Grados",
    place: "Zapopan, Jal.",
    period: "Ene 2021 — Abr 2024",
    points: [
      "Lideré al equipo de desarrollo y definí el sistema integral de la operación.",
      "Cubrí finanzas, CRM, reservas, seguridad, facturación y auditoría.",
      "Stack: Node.js, TypeScript, Express, MySQL, Swift y Kotlin.",
    ],
  },
  {
    role: "Desarrollador de Software",
    company: "Administración de Integrantes",
    place: "Zapopan, Jal.",
    period: "Ene 2019 — Dic 2021",
    points: [
      "CRM en PHP, MySQL, Bootstrap y JavaScript.",
      "Migración desde Informix 4GL.",
      "Auth, nómina, facturación, reportes y pagos.",
    ],
  },
  {
    role: "Desarrollador web y mantenimiento",
    company: "Codemo y Universidad Tecnológica de la Costa",
    place: "Tepic y Santiago Ixcuintla, Nay.",
    period: "Jun 2017 — Dic 2018",
    points: [
      "Sitio de Codemo y mantenimiento del sistema interno de la universidad.",
      "CodeIgniter y JSP.",
    ],
  },
  {
    role: "Prácticas · apps móviles",
    company: "Expertis",
    place: "Tepic, Nay.",
    period: "Jul 2016 — May 2017",
    points: ["Desarrollo de una aplicación móvil durante las prácticas profesionales."],
  },
] as const;

export const education = {
  degree: "Ingeniería en Sistemas",
  school: "Universidad Tecnológica de la Costa",
  place: "Santiago Ixcuintla, Nay.",
  period: "Ago 2015 — May 2019",
};

export const extras = [
  "Español nativo · Inglés intermedio",
  "Certificación en ciberseguridad · Google, 2023",
] as const;
