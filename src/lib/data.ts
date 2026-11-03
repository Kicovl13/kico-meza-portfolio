export const site = {
  name: "Federico Meza",
  brand: "Federico Meza",
  role: "Ingeniero de Software Full Stack & Líder Técnico",
  age: 29,
  yearsExperience: "+7",
  location: "Zapopan, Jalisco · Remoto / Híbrido",
  email: "federicojmr13@gmail.com",
  phone: "+52 33 2026 8920",
  phoneHref: "tel:+523320268920",
  whatsappUrl:
    "https://wa.me/523320268920?text=Hola%20Federico,%20vi%20tu%20portafolio%20y%20me%20gustar%C3%ADa%20conversar%20sobre%20una%20oportunidad%20profesional.",
  linkedin:
    "https://www.linkedin.com/in/federico-de-jes%C3%BAs-meza-ramos-2b829b173",
  github: "https://github.com/Kicovl13",
  headline: "Arquitectura de software escalable, sistemas críticos y liderazgo técnico.",
  subtitle:
    "Ingeniero en Sistemas con +7 años diseñando e implementando ERPs, plataformas de negocio, conciliación fiscal SAT y APIs de alto rendimiento con Laravel, Node.js, TypeScript y Angular. Especialista en migración de sistemas legacy y dirección técnica de equipos.",
};

export const impactMetrics = [
  { value: "+7 Años", label: "Experiencia en Producción", sub: "Sistemas continuos en operación" },
  { value: "5 Sistemas", label: "Plataformas en Vivo", sub: "Soluciones de negocio interactivas" },
  { value: "SAT 4.0", label: "Cumplimiento Fiscal", sub: "CFDI, PPD/REP, Nómina IMSS/ISR" },
  { value: "0% Caídas", label: "Migración de Sistemas", sub: "Informix 4GL a Web moderna" },
] as const;

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

export interface MvcShowcase {
  id: string;
  title: string;
  repoName: string;
  githubUrl: string;
  isPrivate: boolean;
  tagline: string;
  category: string;
  stack: string[];
  description: string;
  metrics: { label: string; value: string }[];
  mvcArchitecture: {
    model: string[];
    controller: string[];
    view: string[];
  };
  keyFeatures: string[];
  dockerStack: string[];
  demoType: "cobranza" | "arrendamiento" | "whatsapp" | "legal" | "sysadmin" | "leex" | "rootwork";
  demoUrl: string;
  challenge?: string;
  solution?: string;
  accentColor?: string;
  filterTag?: "laravel" | "node" | "angular" | "other";
}

export const mvcShowcases: MvcShowcase[] = [
  {
    id: "cobranza-b2b",
    title: "Cobranza B2B & Conciliación PPD/REP",
    repoName: "cobranza",
    githubUrl: "https://github.com/Kicovl13/cobranza",
    isPrivate: true,
    tagline: "SaaS Multiempresa en Laravel 13, MySQL 8.4 y Livewire 4",
    category: "Fintech B2B & Fiscal SAT",
    stack: [
      "Laravel 13",
      "PHP 8.3",
      "MySQL 8.4 LTS",
      "Livewire 4",
      "Redis",
      "Docker",
    ],
    description:
      "SaaS comercial multiempresa para automatizar la cobranza B2B en México y conciliar comprobantes de pago (PPD) con Complementos de Recepción de Pagos (REP), estados de cuenta y trazabilidad financiera.",
    metrics: [
      { label: "Trazabilidad", value: "100% Audit" },
      { label: "Conciliación", value: "PPD / REP" },
      { label: "Motor", value: "Laravel 13" },
    ],
    mvcArchitecture: {
      model: [
        "Entidades: Invoice (CFDI PPD), PaymentReceipt (REP), Customer, BankMovement, AuditEntry",
        "Aislamiento multiempresa estricto mediante Tenant Scopes y UUIDs",
        "Diseño con idempotencia en importaciones para evitar duplicidad de comprobantes",
      ],
      controller: [
        "ReconciliationController, CFDIParserController, BankMatchingController",
        "Validación con FormRequests asegurando sumatorias e importes fiscales",
        "Jobs asíncronos en colas de Laravel/Redis para procesamiento batch de XMLs",
      ],
      view: [
        "Tablero de cuentas por cobrar en Livewire 4 y Bootstrap 5",
        "Buscador instantáneo de facturas y vinculación drag-and-drop con REP",
        "Semáforos de saldos insolutos y reportes fiscales exportables",
      ],
    },
    keyFeatures: [
      "Conciliación de pagos PPD con Complementos de Pago REP",
      "Importación masiva de CFDI con verificación de integridad",
      "Trazabilidad y auditoría de notas de crédito y ajustes",
      "Monolito modular con soporte multiempresa en base de datos",
    ],
    dockerStack: ["php:8.3-fpm", "mysql:8.4", "redis:7-alpine", "nginx:alpine"],
    demoType: "cobranza",
    demoUrl: "/demos/cobranza",
  },
  {
    id: "bot-whatsapp-citas",
    title: "Bot de WhatsApp para Citas & Google Calendar",
    repoName: "bot-whatsapp-citas",
    githubUrl: "https://github.com/Kicovl13/bot-whatsapp-citas",
    isPrivate: false,
    tagline: "Automatización de Agenda con Baileys, Chrono NLP y Google APIs",
    category: "Automatización & Asistente",
    stack: [
      "Node.js",
      "Baileys (@whiskeysockets/baileys)",
      "Google Calendar API",
      "Google Sheets API",
      "chrono-node",
    ],
    description:
      "Bot conversacional conectado a WhatsApp que comprende solicitudes de citas en lenguaje natural, consulta disponibilidad en Google Calendar, reserva el evento y sincroniza el registro en Google Sheets.",
    metrics: [
      { label: "Disponibilidad", value: "24/7 Auto" },
      { label: "NLP Fechas", value: "chrono-node" },
      { label: "Sincronización", value: "Google APIs" },
    ],
    mvcArchitecture: {
      model: [
        "Entidades: UserSession, AppointmentSlot, CalendarEvent, BusinessHours",
        "Gestor de sesiones persistentes con MultiFileAuthState en Baileys",
        "Estructura de Google Sheets como base de datos ligera para respaldo",
      ],
      controller: [
        "WhatsAppMessageHandler, CalendarSyncController, SlotAvailabilityService",
        "Parser de lenguaje natural con chrono-node para extraer fechas ('mañana a las 4pm')",
        "Filtros de bloqueo para transferir a asesor humano si el cliente lo solicita",
      ],
      view: [
        "Mensajes interactivos con formato nativo de WhatsApp (emojis, listas y negritas)",
        "Confirmación de cita con enlace directo al evento de Google Calendar",
        "Alertas automáticas al WhatsApp del administrador ante nuevas reservas",
      ],
    },
    keyFeatures: [
      "Interpretación inteligente de fechas en español sin comandos rígidos",
      "Prevención de empalmes con consulta en tiempo real a Google Calendar",
      "Registro automático de paciente/cliente en Google Sheets",
      "Detección de palabras de transferencia para atención con asesor humano",
    ],
    dockerStack: ["node:20-alpine", "pm2", "baileys-session-storage"],
    demoType: "whatsapp",
    demoUrl: "/demos/whatsapp-bot",
  },
  {
    id: "despacho-legal",
    title: "LegalFlow · Gestión de Despachos & Juicios",
    repoName: "despacho-legal",
    githubUrl: "https://github.com/Kicovl13/despacho-legal",
    isPrivate: true,
    tagline: "App Web y Móvil con Angular 20, Ionic 8 y Capacitor 7",
    category: "LegalTech & Móvil",
    stack: [
      "Angular 20",
      "Ionic 8",
      "Capacitor 7",
      "TypeScript",
      "RxJS / Signals",
    ],
    description:
      "Aplicación multiplataforma para abogados y despachos jurídicos: control de expedientes judiciales, términos procesales con cuenta regresiva, audiencias, clientes y directorio de juzgados.",
    metrics: [
      { label: "Multiplataforma", value: "Web / iOS / Android" },
      { label: "Framework", value: "Angular 20 + Ionic" },
      { label: "Términos", value: "Alertas Activas" },
    ],
    mvcArchitecture: {
      model: [
        "Entidades: CaseFile (Expediente), CourtHearing, LegalDeadline, Client, Court",
        "Modelos fuertemente tipados en TypeScript con validación de estados procesales",
        "Almacenamiento offline-first con Capacitor Storage para juzgados sin señal",
      ],
      controller: [
        "CaseService, DeadlineCalculatorService, HearingSchedulerController",
        "Lógica de cálculo de días hábiles judiciales excluyendo festivos",
        "Integración nativa con Capacitor Haptics y notificaciones push de audiencias",
      ],
      view: [
        "Componentes Ionic 8 optimizados con diseño nativo de iOS y Android",
        "Semáforo de términos procesales urgentes (Rojo <48h, Amarillo <5 días)",
        "Expediente digital con visualizador de acuerdos y acuerdos del boletín judicial",
      ],
    },
    keyFeatures: [
      "Seguimiento de juicios civiles, mercantiles y laborales por número de expediente",
      "Temporizador de términos procesales para contestaciones y amparos",
      "Agenda de audiencias con juzgado, sala y juez asignado",
      "Empaquetado listo para App Store y Google Play mediante Capacitor",
    ],
    dockerStack: ["node:20-alpine", "nginx:alpine (web build)"],
    demoType: "legal",
    demoUrl: "/demos/legalflow",
  },
  {
    id: "sysadministrador",
    title: "SysAdministrador · CRM & ERP Operativo",
    repoName: "sysadministrador",
    githubUrl: "https://github.com/Kicovl13/sysadministrador",
    isPrivate: true,
    tagline: "Sistema Integral de Administración con PHP, MySQL y Bootstrap",
    category: "CRM & ERP",
    stack: ["PHP", "MySQL", "Bootstrap", "JavaScript", "Laravel"],
    description:
      "CRM y ERP operativo para gestión de clientes, empleados, facturación, nómina, reportes y auditoría. Diseñado con una arquitectura modular desacoplada, autenticación estricta por roles y módulos independientes.",
    metrics: [
      { label: "Módulos", value: "8+ Activos" },
      { label: "Roles", value: "Multi-Rol" },
      { label: "Reportes", value: "Exportables" },
    ],
    mvcArchitecture: {
      model: [
        "Entidades: Cliente, Empleado, Factura, Pago, NominaEntry, AuditLog",
        "Relaciones uno-a-muchos con integridad referencial en MySQL",
        "Soft deletes y timestamps para auditoría completa de cambios",
      ],
      controller: [
        "ClienteController, EmpleadoController, FacturacionController, NominaController",
        "Middleware de autenticación y autorización por rol (admin, supervisor, operador)",
        "Exportación de reportes a PDF y Excel desde controladores dedicados",
      ],
      view: [
        "Dashboards con métricas clave por módulo en Bootstrap 5",
        "Tablas paginadas con búsqueda en tiempo real y filtros avanzados",
        "Formularios reactivos con validación server-side y feedback visual",
      ],
    },
    keyFeatures: [
      "Gestión completa de clientes con historial de interacciones",
      "Nómina automatizada con cálculo de deducciones e IMSS",
      "Facturación con generación de CFDI y seguimiento de cobros",
      "Panel de auditoría con bitácora de acciones por usuario",
    ],
    dockerStack: ["php:8.2-fpm", "mysql:8", "nginx:alpine"],
    demoType: "sysadmin",
    demoUrl: "/demos/sysadmin",
  },
  {
    id: "leex-saas",
    title: "Leex SaaS · Plataforma de Arrendamiento",
    repoName: "leex-saas",
    githubUrl: "https://github.com/Kicovl13/leex-saas",
    isPrivate: false,
    tagline: "SaaS Multiempresa para Administración de Bienes Raíces",
    category: "PropTech & SaaS",
    stack: ["Laravel", "PHP", "MySQL", "Livewire", "Tailwind CSS", "Alpine.js"],
    description:
      "Plataforma SaaS multiempresa para la administración integral de propiedades en arrendamiento: contratos, pagos recurrentes, estados de cuenta, mantenimientos y comunicación con inquilinos.",
    metrics: [
      { label: "Modelo", value: "Multi-Tenant" },
      { label: "Pagos", value: "Recurrentes" },
      { label: "Propiedades", value: "Ilimitadas" },
    ],
    mvcArchitecture: {
      model: [
        "Entidades: Property, Unit, LeaseContract, Tenant, RecurringCharge, MaintenanceRequest",
        "Multi-tenancy con aislamiento por empresa usando Tenant middleware",
        "Ciclo de facturación mensual automatizado con cálculo de penalizaciones",
      ],
      controller: [
        "PropertyController, ContractController, PaymentController, MaintenanceController",
        "Job scheduler para generación automática de cargos mensuales",
        "Notificaciones por email a inquilinos con estados de cuenta adjuntos",
      ],
      view: [
        "Panel de propietario con ocupación, ingresos y alertas en Livewire",
        "Portal del inquilino para ver estado de cuenta y subir comprobantes",
        "Módulo de mantenimiento con seguimiento de solicitudes y prioridades",
      ],
    },
    keyFeatures: [
      "Contratos digitales con vigencias, renovaciones y terminaciones",
      "Cargos recurrentes automáticos: renta, mantenimiento, servicios",
      "Portal de inquilino para pagos y solicitudes de mantenimiento",
      "Reportes financieros por propiedad, unidad y período",
    ],
    dockerStack: ["php:8.3-fpm", "mysql:8", "redis:alpine", "nginx:alpine"],
    demoType: "leex",
    demoUrl: "/demos/leex",
  },
  {
    id: "rootwork",
    title: "RootWork · Gestión de Proyectos & Freelancers",
    repoName: "rootwork",
    githubUrl: "https://github.com/Kicovl13/rootwork",
    isPrivate: true,
    tagline: "Plataforma de Administración de Proyectos con Node.js y TypeScript",
    category: "Project Management & SaaS",
    stack: ["Node.js", "TypeScript", "Express", "MySQL", "Angular", "Docker"],
    description:
      "Plataforma de gestión de proyectos para equipos y freelancers: tablero Kanban, seguimiento de tiempo, asignación de tareas, entregables y facturación de horas trabajadas por proyecto.",
    metrics: [
      { label: "Kanban", value: "Drag & Drop" },
      { label: "Time Track", value: "Por Tarea" },
      { label: "Facturación", value: "Automática" },
    ],
    mvcArchitecture: {
      model: [
        "Entidades: Project, Task, TimeEntry, Team, Deliverable, Invoice",
        "Estados de tarea: Backlog → En Progreso → Revisión → Completada",
        "Relaciones de dependencia entre tareas y cálculo de ruta crítica",
      ],
      controller: [
        "ProjectController, TaskController, TimeTrackingController, InvoiceController",
        "WebSocket para actualizaciones en tiempo real del tablero Kanban",
        "API REST documentada con Swagger para integración con clientes externos",
      ],
      view: [
        "Tablero Kanban interactivo con drag-and-drop en Angular",
        "Timer de seguimiento de tiempo integrado en cada tarjeta de tarea",
        "Dashboard de rentabilidad: horas estimadas vs reales por proyecto",
      ],
    },
    keyFeatures: [
      "Kanban visual con columnas configurables y límites WIP",
      "Registro de tiempo por tarea con inicio/pausa/stop",
      "Facturación automática de horas al cierre del período",
      "Asignación de colaboradores con control de permisos por proyecto",
    ],
    dockerStack: ["node:20-alpine", "mysql:8", "nginx:alpine"],
    demoType: "rootwork",
    demoUrl: "/demos/rootwork",
  },
];
