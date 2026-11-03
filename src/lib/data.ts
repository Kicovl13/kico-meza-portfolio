export const site = {
  name: "Federico Meza",
  brand: "Federico Meza",
  role: "Senior Software Engineer & Tech Lead",
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
  headline: "Arquitectura de software escalable, plataformas transaccionales y liderazgo técnico.",
  subtitle:
    "Ingeniero de software con +7 años diseñando e implementando plataformas empresariales de misión crítica: ERPs multiempresa, conciliación fiscal SAT CFDI 4.0, APIs RESTful de alto rendimiento y modernización de código legacy con Laravel, Node.js, TypeScript y Angular. Especialista en arquitectura resiliente, integridad transaccional y dirección técnica de equipos.",
};

export const impactMetrics = [
  { value: "+7 Años", label: "Ingeniería en Producción", sub: "Sistemas transaccionales de alta disponibilidad" },
  { value: "5 Sistemas", label: "Plataformas en Vivo", sub: "Demos interactivos con lógica de negocio real" },
  { value: "SAT CFDI 4.0", label: "Cumplimiento Fiscal", sub: "Conciliación PPD/REP, SPEI y Nómina de Ley" },
  { value: "Cero Caídas", label: "Migración Legacy", sub: "Informix 4GL a Web moderna sin pérdida de datos" },
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
    title: "Backend & Arquitectura",
    items: ["PHP 8.3+", "Laravel 13", "Node.js", "TypeScript", "Express", "REST APIs", "Redis", "Colas Asíncronas"],
    icon: "server" as const,
  },
  {
    title: "Frontend & Aplicaciones",
    items: ["Angular 20", "Next.js", "TypeScript", "Tailwind CSS", "RxJS", "Signals", "Ionic 8", "Capacitor 7"],
    icon: "layout" as const,
  },
  {
    title: "Bases de Datos & Consistencia",
    items: ["MySQL 8.4 LTS", "Transacciones ACID", "Optimización SQL", "Multi-Tenancy", "Oracle DB", "Redis Cache"],
    icon: "database" as const,
  },
  {
    title: "DevOps & Ciberseguridad",
    items: ["Docker", "Linux Servers", "Google Cybersecurity Certified", "OAuth2 / JWT", "CI/CD", "SAT CFDI 4.0"],
    icon: "container" as const,
  },
] as const;

export const projects = [
  {
    title: "Sistema Integral ERP / CRM para 26 Grados",
    role: "Gerente del Área de Sistemas / Tech Lead",
    period: "2021 — 2024",
    description:
      "Dirección técnica y arquitectura integral del ecosistema ERP/CRM operativo de la empresa: finanzas, facturación, control de accesos y aplicaciones móviles sincronizadas bajo una sola base relacional.",
    points: [
      "Lideré el equipo multidisciplinario de desarrollo (backend, frontend y móvil) definiendo la arquitectura orientada a servicios.",
      "Diseño del módulo financiero con conciliación de cobranza, emisión de CFDI y bitácoras inmutables de auditoría.",
      "Sincronización en tiempo real de aplicaciones móviles nativas en Swift (iOS) y Kotlin (Android) con la base de datos central.",
      "Garantía de alta disponibilidad (99.9% uptime) y asesoría técnica directa a la dirección general en decisiones de infraestructura.",
    ],
    tags: ["Node.js", "TypeScript", "Express", "MySQL", "Swift", "Kotlin", "Docker"],
  },
  {
    title: "Modernización Legacy & CRM en Administración de Integrantes",
    role: "Software Engineer / Lead de Migración",
    period: "2019 — 2021",
    description:
      "Modernización tecnológica y migración completa de misión crítica desde Informix 4GL hacia arquitectura web moderna con cero minutos de indisponibilidad y sin interrumpir la operación comercial.",
    points: [
      "Migración exitosa de base de datos relacional y lógica de negocio desde Informix 4GL sin pérdida de datos ni corte operativo.",
      "Motor algorítmico automatizado para cálculo de nómina con retenciones fiscales de ley (ISR) y aportaciones de seguridad social (IMSS).",
      "Implementación de bitácoras de auditoría y controles de seguridad para prevención de fraudes y trazabilidad contable.",
      "Módulos de facturación electrónica CFDI, roles de acceso granulares e integración de dispersión de pagos.",
    ],
    tags: ["PHP", "MySQL", "JavaScript", "Bootstrap", "Informix 4GL"],
  },
  {
    title: "Microservicios & Aplicaciones Modulares en Start",
    role: "Senior Full Stack Developer",
    period: "2024 — 2026",
    description:
      "Diseño y despliegue de servicios modulares de alto rendimiento y APIs REST seguras para Administración de Servicios Start, integrando frontend reactivo en Angular con backends en Laravel y Node.js.",
    points: [
      "Servicios escalables en Laravel 13, Node.js y TypeScript integrados con colas de procesamiento asíncrono en Redis.",
      "Optimización de consultas SQL complejas en bases de datos relacionales MySQL 8.4 LTS, reduciendo latencias hasta en un 75%.",
      "Estandarización de entornos mediante Docker para ciclos de despliegue predecibles, continuos y libres de discrepancias.",
      "Frontend reactivo desarrollado en Angular con Signals y RxJS, optimizado para dashboards administrativos de alta concurrencia.",
    ],
    tags: ["Laravel 13", "Node.js", "TypeScript", "Angular 20", "Docker", "MySQL 8.4"],
  },
] as const;

export const experience = [
  {
    role: "Senior Full Stack Developer",
    company: "Administración de Servicios Start",
    place: "Remoto · Jalisco, México",
    period: "Oct 2024 — Oct 2026",
    points: [
      "Arquitectura y desarrollo de servicios web modulares de alto tráfico con Laravel, Node.js, TypeScript y Angular.",
      "Procesamiento asíncrono en colas de Redis y estandarización de contenedores Docker para desarrollo y producción.",
      "Optimización de consultas SQL en MySQL 8.4 LTS reduciendo tiempos de respuesta en reportes críticos de negocio.",
    ],
  },
  {
    role: "Gerente del Área de Sistemas",
    company: "26 Grados S.A. de C.V.",
    place: "Zapopan, Jalisco",
    period: "Ene 2021 — Abr 2024",
    points: [
      "Dirección técnica del departamento de tecnología y definición integral de la arquitectura del ERP/CRM corporativo.",
      "Liderazgo de ingenieros backend, frontend y móvil; módulos de finanzas, facturación, control de accesos y auditoría.",
      "Supervisión del desarrollo sincronizado de aplicaciones nativas en Swift (iOS) y Kotlin (Android) sobre MySQL.",
    ],
  },
  {
    role: "Desarrollador de Software",
    company: "Administración de Integrantes",
    place: "Zapopan, Jalisco",
    period: "Ene 2019 — Dic 2021",
    points: [
      "Liderazgo técnico en la migración completa desde Informix 4GL hacia arquitectura web moderna con cero caídas.",
      "Desarrollo del motor de cálculo de nómina de ley (IMSS e ISR), facturación electrónica y pasarelas de pago.",
      "Implementación de bitácoras inmutables de auditoría y controles de seguridad para prevención de fraudes contables.",
    ],
  },
  {
    role: "Desarrollador Web y Mantenimiento",
    company: "Codemo y Universidad Tecnológica de la Costa",
    place: "Nayarit, México",
    period: "Jun 2017 — Dic 2018",
    points: [
      "Desarrollo del portal institucional de Codemo y mantenimiento del sistema académico interno de la universidad.",
      "Implementación en CodeIgniter, Java Server Pages (JSP) y modelado de bases de datos relacionales.",
    ],
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
  systemStatus: string;
  statusType: "produccion" | "mvp" | "prototipo";
  brandTheme: {
    primary: string;
    accent: string;
    badge: string;
    bgDark: string;
  };
  projectPresentation: {
    problem: string; // 1. Qué problema resuelve
    overview: string; // 2. Qué hace el sistema
    techArchitecture: string; // 3. Qué tecnologías utiliza
    myRole: string; // 4. Qué responsabilidad tuviste en su desarrollo
    interactiveGuide: string[]; // 5. Qué funcionalidades puede probar el visitante
  };
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
    title: "Cobranza B2B & Conciliación Fiscal SAT (PPD / REP)",
    repoName: "cobranza",
    githubUrl: "https://github.com/Kicovl13/cobranza",
    isPrivate: true,
    tagline: "Plataforma Financiera Transaccional en Laravel 13, MySQL 8.4 LTS y Livewire 4",
    category: "Fintech B2B & Fiscal SAT",
    systemStatus: "Producción · Sistema Empresarial",
    statusType: "produccion",
    brandTheme: {
      primary: "#10b981",
      accent: "#34d399",
      badge: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
      bgDark: "#06130d",
    },
    projectPresentation: {
      problem:
        "En México, emitir facturas en parcialidades (PPD) obliga a conciliar depósitos bancarios SPEI y timbrar un Complemento de Recepción de Pagos (REP) Anexo 20 antes del día 10 del mes siguiente. Gestionarlo manual en hojas de cálculo causa descontrol de saldos insolutos, desfases con el SAT y multas fiscales severas.",
      overview:
        "Plataforma financiera transaccional B2B que importa CFDI 4.0, rastrea depósitos bancarios SPEI en tiempo real, concilia facturas con abonos parciales y emite comprobantes REP con trazabilidad inmutable y semáforo de morosidad.",
      techArchitecture:
        "Laravel 13 y PHP 8.3 en arquitectura desacoplada, base de datos relacional MySQL 8.4 LTS con transacciones ACID e idempotencia para evitar doble timbrado, Redis para colas asíncronas de XMLs y Docker.",
      myRole:
        "Tech Lead & Arquitecto Backend: Modelé el esquema de datos transaccional (Invoices, REPs, BankMovements), diseñé la lógica de conciliación algorítmica y aseguré el cumplimiento normativo con el estándar Anexo 20 del SAT.",
      interactiveGuide: [
        "Explora el tablero de cartera CxC y filtra facturas por estado (Pendiente, Parcial, Pagada).",
        "Haz clic en 'Conciliar Abono' en cualquier factura para registrar un pago SPEI y generar su folio REP.",
        "Entra a 'Conciliador SPEI' para vincular depósitos bancarios pendientes con facturas vivas.",
        "Abre la pestaña 'Complementos REP' e inspecciona el XML Anexo 20 y el Sello Digital SAT generado.",
      ],
    },
    stack: [
      "Laravel 13",
      "PHP 8.3",
      "MySQL 8.4 LTS",
      "Livewire 4",
      "Redis",
      "Docker",
    ],
    description:
      "SaaS financiero multiempresa de alta disponibilidad para la automatización integral de cuentas por cobrar B2B en México. Realiza la conciliación algorítmica de depósitos bancarios SPEI contra facturas en parcialidades (PPD), timbrado masivo automatizado de Complementos de Recepción de Pagos (REP) bajo estándar Anexo 20 del SAT, y control estricto de saldos insolutos con prevención de doble timbrado mediante idempotencia transaccional.",
    metrics: [
      { label: "Auditoría Fiscal", value: "100% Trazable" },
      { label: "Reglas SAT", value: "CFDI 4.0 PPD/REP" },
      { label: "Tiempo Conciliación", value: "-80% Manual" },
    ],
    mvcArchitecture: {
      model: [
        "Entidades: Invoice (CFDI PPD), PaymentReceipt (REP), Customer, BankMovement, AuditEntry",
        "Aislamiento multiempresa estricto mediante Tenant Scopes y UUIDs v4",
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
      "Conciliación algorítmica de pagos PPD con Complementos de Pago REP",
      "Importación masiva de CFDI con verificación de integridad criptográfica",
      "Trazabilidad inmutable y auditoría de notas de crédito y saldos",
      "Arquitectura modular desacoplada con aislamiento multi-tenant en base de datos",
    ],
    dockerStack: ["php:8.3-fpm", "mysql:8.4", "redis:7-alpine", "nginx:alpine"],
    demoType: "cobranza",
    demoUrl: "/demos/cobranza",
  },
  {
    id: "bot-whatsapp-citas",
    title: "Agendamiento Autónomo WhatsApp con NLP & Google Cloud",
    repoName: "bot-whatsapp-citas",
    githubUrl: "https://github.com/Kicovl13/bot-whatsapp-citas",
    isPrivate: false,
    tagline: "Bot Transaccional Conversacional con Baileys, Chrono NLP y Google APIs",
    category: "Automatización & Cloud",
    systemStatus: "Producción · Bot Autónomo 24/7",
    statusType: "produccion",
    brandTheme: {
      primary: "#22c55e",
      accent: "#4ade80",
      badge: "bg-green-500/10 text-green-400 border-green-500/20",
      bgDark: "#06130b",
    },
    projectPresentation: {
      problem:
        "Las clínicas, notarías y despachos pierden hasta el 40% de prospectos fuera de horario de oficina por tardanza al contestar en WhatsApp, y sufren frecuentes empalmes de citas al coordinar agendas manualmente en calendarios no integrados.",
      overview:
        "Asistente conversacional desatendido para WhatsApp Business que procesa intenciones y fechas en español natural, consulta disponibilidad en tiempo real en Google Calendar sin empalmes, agenda citas y almacena registros en base de datos.",
      techArchitecture:
        "Node.js 20 con protocolo Baileys (@whiskeysockets/baileys) para socket persistente, motor chrono-node para NLP semántico de fechas, APIs de Google Calendar y Google Sheets, y arquitectura de máquina de estados finitos (FSM).",
      myRole:
        "Ingeniero Full Stack & Especialista en Automatización: Diseñé la máquina de estados conversacional, el parser de lenguaje natural en español, la sincronización bidireccional con Google Calendar y los webhooks resilientes con reintentos.",
      interactiveGuide: [
        "Escribe en el chat o haz clic en respuestas rápidas como '📅 Agendar una cita'.",
        "Prueba escribir frases naturales como 'Mañana a las 4pm' o 'El jueves por la mañana' para ver cómo el NLP extrae la fecha.",
        "Completa el flujo seleccionando el servicio y tu nombre para ver cómo se genera la cita confirmada.",
        "Observa el panel lateral del inspector técnico para ver el payload JSON y la sincronización con Google Calendar.",
      ],
    },
    stack: [
      "Node.js",
      "Baileys (@whiskeysockets/baileys)",
      "Google Calendar API",
      "Google Sheets API",
      "chrono-node",
    ],
    description:
      "Asistente virtual desatendido para WhatsApp empresarial que automatiza el embudo de citas sin intervención humana. Procesa intenciones y fechas en lenguaje natural mediante parsing cronológico en español, consulta disponibilidad en tiempo real contra Google Calendar previniendo colisiones de horario, reserva slots con confirmación bidireccional y persiste registros sincronizados en Google Sheets y bases de datos relacionales.",
    metrics: [
      { label: "Disponibilidad", value: "24/7 Desatendido" },
      { label: "NLP Semántico", value: "chrono-node" },
      { label: "Integración Cloud", value: "Google Calendar" },
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
    title: "LegalFlow · ERP Jurídico & Alertas de Términos Procesales",
    repoName: "despacho-legal",
    githubUrl: "https://github.com/Kicovl13/despacho-legal",
    isPrivate: true,
    tagline: "Plataforma Web y Móvil con Angular 20, Ionic 8 y Capacitor 7",
    category: "LegalTech & Móvil",
    systemStatus: "MVP Operativo · Multiplataforma",
    statusType: "mvp",
    brandTheme: {
      primary: "#a855f7",
      accent: "#c084fc",
      badge: "bg-purple-500/10 text-purple-400 border-purple-500/20",
      bgDark: "#100619",
    },
    projectPresentation: {
      problem:
        "En un despacho de litigio corporativo, omitir un término judicial (plazo fijado por el juzgado para contestar o aportar pruebas) provoca la pérdida irremediable del juicio por preclusión. Las agendas en papel no contemplan inhábiles judiciales ni horas críticas fatales.",
      overview:
        "ERP y aplicación multiplataforma de gestión procesal para firmas jurídicas. Centraliza expedientes de materias Civil, Mercantil, Laboral y Amparo, cuenta regresiva de términos procesales calculada con calendario judicial oficial, agenda de audiencias y expediente digital offline.",
      techArchitecture:
        "Angular 20 y TypeScript con componentes desacoplados, Ionic 8 UI, Capacitor 7 para empaquetado nativo en iOS y Android, y almacenamiento local con sincronización offline-first.",
      myRole:
        "Tech Lead & Desarrollador Frontend / Mobile: Diseñé la interfaz multiplataforma reactiva, el motor de cálculo de términos procesales con reglas de días hábiles de juzgados y el pipeline de empaquetado con Capacitor.",
      interactiveGuide: [
        "Filtra expedientes por materia (Mercantil, Civil, Laboral) o busca por número de juicio.",
        "Revisa la tarjeta de 'Términos Urgentes' con cuenta regresiva en vivo y semáforo de criticidad.",
        "Haz clic en cualquier expediente para desplegar el acuerdo judicial, juzgado y etapa procesal.",
        "Alterna entre la vista de escritorio y el simulador móvil para comprobar la experiencia responsiva en juzgados.",
      ],
    },
    stack: [
      "Angular 20",
      "Ionic 8",
      "Capacitor 7",
      "TypeScript",
      "RxJS / Signals",
    ],
    description:
      "Sistema de gestión procesal de misión crítica para firmas y despachos jurídicos corporativos. Centraliza el ciclo de vida de juicios civiles, mercantiles y laborales, incorpora un motor de cálculo de términos procesales con cuenta regresiva basada en días hábiles judiciales (excluyendo inhábiles y festivos), agenda sincronizada de audiencias por juzgado y expediente digital con sincronización offline-first.",
    metrics: [
      { label: "Arquitectura", value: "Web / iOS / Android" },
      { label: "Términos Procesales", value: "Días Hábiles" },
      { label: "Sincronización", value: "Offline-First" },
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
    title: "SysAdministrador · ERP Empresarial & Motor de Nómina de Ley",
    repoName: "sysadministrador",
    githubUrl: "https://github.com/Kicovl13/sysadministrador",
    isPrivate: true,
    tagline: "Suite Integral de Operaciones con PHP 8.3, Laravel, MySQL y Arquitectura Modular",
    category: "CRM & ERP",
    systemStatus: "Producción · Suite Modular",
    statusType: "produccion",
    brandTheme: {
      primary: "#0ea5e9",
      accent: "#38bdf8",
      badge: "bg-sky-500/10 text-sky-400 border-sky-500/20",
      bgDark: "#06101a",
    },
    projectPresentation: {
      problem:
        "Empresas en expansión sufren dispersión operativa al emplear herramientas separadas para cotizaciones, empleados y nómina en Excel, lo que genera descuadres contables, multas del IMSS por retenciones erróneas y falta de auditoría interna.",
      overview:
        "ERP corporativo integral que unifica el ciclo comercial (clientes, cotizaciones y facturas), gestión de personal con cálculo automático de nómina de ley (retención de ISR y cuotas IMSS obrero-patronales) y bitácora de auditoría inmutable de todas las acciones.",
      techArchitecture:
        "PHP 8.3 con Laravel en el backend, base de datos relacional MySQL con integridad referencial estricta, arquitectura MVC, control de acceso basado en roles (RBAC) y suite de auditoría forense con trazabilidad por IP y usuario.",
      myRole:
        "Líder Técnico de Sistemas: Lideré el diseño arquitectónico, el modelado entidad-relación de la base de datos, el algoritmo matemático de cálculo de retenciones ISR / IMSS conforme a las tablas de ley mexicanas y la seguridad de perfiles de usuario.",
      interactiveGuide: [
        "Navega entre los módulos en el menú lateral: Dashboard, Clientes, Empleados, Nómina y Auditoría.",
        "En 'Nómina', revisa el desglose automático de percepciones brutas, deducción IMSS, retención ISR y salario neto.",
        "En 'Clientes', prueba agregar o editar un cliente y observa la actualización instantánea de saldos y créditos.",
        "Visita 'Auditoría' para verificar el registro forense en tiempo real de cada acción ejecutada en el sistema.",
      ],
    },
    stack: ["PHP", "MySQL", "Bootstrap", "JavaScript", "Laravel"],
    description:
      "ERP corporativo y CRM operativo modular diseñado para centralizar la administración comercial y financiera de empresas de servicios. Integra gestión de clientes, emisión de comprobantes fiscales CFDI, control de cobranza, bitácoras inmutables de auditoría forense y un motor algorítmico automatizado para el cálculo exacto de nómina con retenciones fiscales de ley (ISR) y aportaciones de seguridad social (IMSS).",
    metrics: [
      { label: "Módulos Core", value: "8+ Integrados" },
      { label: "Cálculo Nómina", value: "IMSS / ISR Ley" },
      { label: "Seguridad", value: "RBAC Granular" },
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
    title: "Leex SaaS · Plataforma PropTech de Arrendamiento Inmobiliario",
    repoName: "leex-saas",
    githubUrl: "https://github.com/Kicovl13/leex-saas",
    isPrivate: false,
    tagline: "SaaS Multi-Tenant para Administración de Plazas y Bienes Raíces",
    category: "PropTech & SaaS",
    systemStatus: "MVP Funcional · SaaS PropTech",
    statusType: "mvp",
    brandTheme: {
      primary: "#f59e0b",
      accent: "#fbbf24",
      badge: "bg-amber-500/10 text-amber-400 border-amber-500/20",
      bgDark: "#181005",
    },
    projectPresentation: {
      problem:
        "Los administradores de plazas comerciales y complejos residenciales enfrentan caos cada fin de mes para saber qué inquilinos deben renta o mantenimiento, aplicar penalizaciones por morosidad y dar seguimiento a reparaciones de plomería y electricidad.",
      overview:
        "Plataforma SaaS multiempresa de gestión patrimonial. Ofrece un mapa visual e interactivo de unidades por piso (locales, departamentos, penthouses), contratos con vigencias y renovaciones, validación rápida de pagos y módulo de tickets de mantenimiento categorizados por urgencia.",
      techArchitecture:
        "Laravel con Livewire y Tailwind CSS para una interfaz reactiva sin recargas de página, MySQL multi-tenant con aislamiento de datos, colas asíncronas para generación de estados de cuenta y facturación recurrente programada.",
      myRole:
        "Full Stack Engineer & Arquitecto: Diseñé el modelo de datos multi-inquilino, el tablero interactivo de unidades por piso con semáforo de morosidad, el motor de penalizaciones automáticas y la gestión de tickets de servicio.",
      interactiveGuide: [
        "Interactúa con el selector de pisos (PB Comercial, Piso 2 Departamentos, Piso 3) para ver el estado de ocupación.",
        "Haz clic en cualquier unidad (ej. Local 102 con adeudo) para consultar el contrato, teléfono del inquilino y monto pendiente.",
        "Usa el botón 'Validar Pago' para simular la recepción del comprobante bancario y saldar la unidad en tiempo real.",
        "Revisa la pestaña de 'Mantenimiento' para ver solicitudes de plomería o clima y cambiar su estado de resolución.",
      ],
    },
    stack: ["Laravel", "PHP", "MySQL", "Livewire", "Tailwind CSS", "Alpine.js"],
    description:
      "Plataforma SaaS multiempresa de gestión patrimonial y arrendamiento inmobiliario comercial y habitacional. Automatiza el ciclo mensual de cobros recurrentes de rentas y cuotas de mantenimiento, cálculo automático de penalizaciones por mora, generación de estados de cuenta detallados, portal autoservicio para arrendatarios con validación de transferencias bancarias y gestión de tickets de mantenimiento.",
    metrics: [
      { label: "Multi-Tenancy", value: "Aislamiento BD" },
      { label: "Facturación", value: "Recurrente Auto" },
      { label: "Morosidad", value: "Cálculo Automático" },
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
    title: "RootWork · Tracker de Proyectos, Horas Facturables & Rentabilidad",
    repoName: "rootwork",
    githubUrl: "https://github.com/Kicovl13/rootwork",
    isPrivate: true,
    tagline: "Plataforma de Ingeniería de Proyectos con Node.js, TypeScript y Angular",
    category: "Project Management & SaaS",
    systemStatus: "Producción · Tracker de Horas",
    statusType: "produccion",
    brandTheme: {
      primary: "#14b8a6",
      accent: "#2dd4bf",
      badge: "bg-teal-500/10 text-teal-400 border-teal-500/20",
      bgDark: "#051614",
    },
    projectPresentation: {
      problem:
        "En agencias de desarrollo y firmas de consultoría, no llevar un control riguroso de horas dedicadas por tarea produce fugas financieras: se facturan precios fijos por proyectos que tomaron el doble de tiempo presupuestado.",
      overview:
        "Sistema de gestión ágil de proyectos y control de rentabilidad financiera. Integra un tablero Kanban interactivo con estados de flujo de trabajo, un temporizador en vivo para registrar horas dedicadas con un clic y métricas de rentabilidad que comparan horas estimadas vs. facturables.",
      techArchitecture:
        "Node.js y TypeScript con Express en backend RESTful, frontend reactivo con Angular / React, base de datos relacional MySQL con relaciones de tareas y colaboradores, y Docker para despliegue containerizado.",
      myRole:
        "Full Stack Developer: Implementé el cronómetro de tiempo en memoria con persistencia en segundo plano, la sincronización de estados del tablero Kanban y el módulo analítico de balance financiero por proyecto.",
      interactiveGuide: [
        "Inicia el temporizador en vivo en la barra superior o en cualquier tarjeta para ver el cronómetro correr en tiempo real.",
        "Mueve o cambia de estado tareas entre 'Backlog', 'En Progreso', 'Revisión' y 'Completado'.",
        "Filtra las tareas por proyecto ('Core API v2', 'Frontend SaaS', 'DevOps & Docker').",
        "Revisa el panel de rentabilidad para comprobar el porcentaje de horas consumidas respecto al presupuesto cotizado.",
      ],
    },
    stack: ["Node.js", "TypeScript", "Express", "MySQL", "Angular", "Docker"],
    description:
      "Sistema integral de gestión operativa y control de rentabilidad para equipos de ingeniería y firmas de servicios profesionales. Combina tableros Kanban reactivos con límites WIP, temporizador de precisión en tiempo real para registro de horas hombre invertidas por tarea, cálculo algorítmico de costo vs. facturación y liquidación automática de horas facturables al cierre de cada ciclo comercial.",
    metrics: [
      { label: "Tablero Kanban", value: "Drag & Drop" },
      { label: "Precisión Tiempo", value: "Timer en Vivo" },
      { label: "Rentabilidad", value: "Horas vs Presupuesto" },
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
