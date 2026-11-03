"use client";

import Image from "next/image";
import { CheckCircle2, GraduationCap, MapPin, ShieldCheck } from "lucide-react";
import { education, site } from "@/lib/data";
import { useLanguage } from "@/context/language-context";

export function Workflow() {
  const { lang } = useLanguage();

  const careerRoles = [
    {
      role: lang === "es" ? "Full Stack Developer" : "Senior Full Stack Developer",
      company: "Administración de Servicios Start",
      place: lang === "es" ? "Remoto · Jalisco" : "Remote · Mexico",
      period: "Oct 2024 — Oct 2026",
      badge: lang === "es" ? "Arquitectura & APIs" : "Architecture & APIs",
      description:
        lang === "es"
          ? "Diseño y desarrollo de servicios web modulares de alto tráfico, APIs REST seguras y microservicios contenerizados en Docker con frontend en Angular."
          : "Architected high-throughput modular web services, secure REST APIs, and Dockerized microservices paired with reactive Angular frontends.",
      achievements: [
        lang === "es"
          ? "Desarrollo de servicios escalables con Laravel, Node.js y TypeScript integrados con Angular."
          : "Delivered scalable microservices with Laravel, Node.js, and TypeScript integrated with Angular.",
        lang === "es"
          ? "Estandarización de entornos mediante Docker para despliegues reproducibles sin discrepancias."
          : "Standardized environments with Docker for predictable, reproducible production deployments.",
        lang === "es"
          ? "Optimización de consultas SQL complejas en bases de datos relacionales MySQL."
          : "Optimized complex SQL queries and automated business-critical accounting workflows.",
      ],
      stack: ["Laravel 13", "Node.js", "TypeScript", "Angular", "Docker", "MySQL"],
    },
    {
      role: lang === "es" ? "Gerente del Área de Sistemas" : "Engineering / Systems Manager",
      company: "26 Grados S.A. de C.V.",
      place: "Zapopan, Jalisco",
      period: "Ene 2021 — Abr 2024",
      badge: lang === "es" ? "Liderazgo Técnico" : "Technical Leadership",
      description:
        lang === "es"
          ? "Dirección estratégica del departamento de tecnología y arquitectura del sistema integral ERP/CRM, coordinando desarrolladores backend, frontend y móvil."
          : "Strategic leadership of the engineering department and core ERP/CRM architecture, managing backend, frontend, and mobile engineers.",
      achievements: [
        lang === "es"
          ? "Lideré el equipo de desarrollo y definí la arquitectura integral: finanzas, CRM, reservas y auditoría."
          : "Led engineering team and defined company-wide architecture: finance, CRM, bookings, and audit logs.",
        lang === "es"
          ? "Supervisé el desarrollo sincronizado de aplicaciones móviles nativas en Swift (iOS) y Kotlin (Android)."
          : "Managed synchronized native mobile apps in Swift (iOS) and Kotlin (Android) backed by unified DB.",
        lang === "es"
          ? "Garantía de alta disponibilidad y soporte directo a la dirección general en decisiones de infraestructura."
          : "Guaranteed high availability and provided direct counsel to executive leadership on tech strategy.",
      ],
      stack: ["Node.js", "TypeScript", "Express", "MySQL", "Swift", "Kotlin", "Docker"],
    },
    {
      role: lang === "es" ? "Desarrollador de Software" : "Software Engineer",
      company: "Administración de Integrantes",
      place: "Zapopan, Jalisco",
      period: "Ene 2019 — Dic 2021",
      badge: lang === "es" ? "Migración de Misión Crítica" : "Mission-Critical Migration",
      description:
        lang === "es"
          ? "Liderazgo en la modernización tecnológica y migración completa de los sistemas operativos y de nómina de la empresa desde Informix 4GL hacia arquitectura web moderna."
          : "Spearheaded technical modernization and zero-downtime migration of company operational and payroll systems from Informix 4GL to modern web stack.",
      achievements: [
        lang === "es"
          ? "Migración exitosa desde Informix 4GL sin interrupción de la operación diaria del negocio ni pérdidas de datos."
          : "Executed zero-downtime migration from legacy Informix 4GL with zero data loss and uninterrupted operations.",
        lang === "es"
          ? "Desarrollo de módulos de cálculo de nómina, facturación electrónica, roles y pasarelas de pago."
          : "Engineered payroll engines, electronic invoicing, role-based security, and payment gateways.",
        lang === "es"
          ? "Implementación de bitácoras de auditoría y controles de seguridad para prevención de fraudes contables."
          : "Implemented tamper-evident security audit trails and accounting controls preventing unauthorized alterations.",
      ],
      stack: ["PHP", "MySQL", "JavaScript", "Bootstrap", "Informix 4GL"],
    },
  ];

  return (
    <>
      {/* 1. TRAYECTORIA EMPRESARIAL */}
      <section id="trayectoria" className="py-16 sm:py-24 lg:py-32 relative border-t border-white/[0.08]">
        <div className="wrap">
          <div className="max-w-[840px] mb-12 sm:mb-16 md:mb-20">
            <p className="eyebrow">{lang === "es" ? "Trayectoria" : "Career Track"}</p>
            <h2 className="text-2xl xs:text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[#f4f4f2] leading-[1.12] sm:leading-[1.08]">
              {lang === "es"
                ? "Experiencia en producción y liderazgo de equipos."
                : "Production track record and engineering leadership."}
            </h2>
            <p className="mt-4 sm:mt-5 text-sm sm:text-base md:text-lg leading-relaxed text-[#9a9aa2] max-w-[680px]">
              {lang === "es"
                ? "Más de 7 años diseñando e implementando sistemas de misión crítica, dirigiendo equipos técnicos y asegurando continuidad operativa en sectores inmobiliario, financiero y corporativo."
                : "Over 7 years architecting mission-critical platforms, directing engineering teams, and ensuring operational continuity across real estate, financial, and corporate domains."}
            </p>
          </div>

          {/* Roles Cards estilo danhermes.dev */}
          <div className="space-y-4 sm:space-y-6">
            {careerRoles.map((job) => (
              <article
                key={job.company}
                className="glass-dh p-6 sm:p-8 lg:p-10 transition-all duration-300 hover:border-white/[0.22]"
              >
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3 sm:gap-4 pb-4 sm:pb-5 border-b border-white/[0.08]">
                  <div>
                    <div className="flex flex-wrap items-center gap-2 mb-2">
                      <span className="px-2.5 sm:px-3 py-0.5 rounded-full text-[10px] sm:text-[11px] font-mono font-bold text-[#99ff99] bg-[#99ff99]/10 border border-[#99ff99]/20">
                        {job.badge}
                      </span>
                      <span className="text-xs text-[#6e6e76]">·</span>
                      <span className="text-xs font-mono text-[#a9bdd1] flex items-center gap-1">
                        <MapPin size={12} />
                        {job.place}
                      </span>
                    </div>

                    <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-[#f4f4f2]">
                      {job.role}
                    </h3>
                    <p className="text-xs sm:text-sm font-semibold text-[#c6c6ce] mt-1">
                      {job.company}
                    </p>
                  </div>

                  <div className="font-mono text-xs font-semibold text-[#f4f4f2] bg-white/[0.04] border border-white/[0.1] px-3 sm:px-3.5 py-1 sm:py-1.5 rounded-full self-start sm:self-auto shrink-0">
                    {job.period}
                  </div>
                </div>

                <p className="mt-4 sm:mt-5 text-xs sm:text-sm md:text-base leading-relaxed text-[#9a9aa2]">
                  {job.description}
                </p>

                <ul className="mt-4 sm:mt-5 space-y-2 text-xs sm:text-sm text-[#c6c6ce]">
                  {job.achievements.map((ach) => (
                    <li key={ach} className="flex items-start gap-2.5">
                      <CheckCircle2 size={15} className="text-[#99ff99] shrink-0 mt-0.5" />
                      <span>{ach}</span>
                    </li>
                  ))}
                </ul>

                <div className="mt-5 sm:mt-6 pt-4 sm:pt-5 border-t border-white/[0.06] flex flex-wrap gap-1.5 sm:gap-2">
                  {job.stack.map((t) => (
                    <span
                      key={t}
                      className="px-2 sm:px-2.5 py-0.5 rounded-full text-[10px] sm:text-[11px] font-mono text-[#9a9aa2] border border-white/[0.08] bg-white/[0.02]"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* 2. SOBRE MÍ / QUIÉN ESTÁ DETRÁS (Estilo idéntico a danhermes.dev) */}
      <section id="sobre-mi" className="py-16 sm:py-24 lg:py-32 relative zone-light border-t border-white/[0.08]">
        <div className="wrap">
          <div className="grid grid-cols-1 lg:grid-cols-[1.15fr_0.85fr] gap-10 sm:gap-12 lg:gap-16 items-center">
            {/* Left Column: Narrative */}
            <div>
              <p className="eyebrow">{lang === "es" ? "Quién está detrás" : "Who's behind this"}</p>
              <h2 className="text-2xl xs:text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[#f4f4f2] leading-[1.12] sm:leading-[1.08] mb-5 sm:mb-6">
                {lang === "es" ? (
                  <>
                    Detrás de FEDERICOMEZA.DEV <br />
                    <span className="dim">hay un ingeniero.</span>
                  </>
                ) : (
                  <>
                    Behind FEDERICOMEZA.DEV <br />
                    <span className="dim">is an engineer.</span>
                  </>
                )}
              </h2>

              <div className="space-y-4 text-sm sm:text-base md:text-lg leading-relaxed text-[#9a9aa2]">
                <p>
                  {lang === "es" ? (
                    <>
                      Me llamo <strong className="text-[#f4f4f2]">Federico Meza</strong> y soy{" "}
                      <strong className="text-[#f4f4f2]">ingeniero de software full stack y líder técnico</strong>.
                      Diseño la arquitectura, programo el backend y pongo sistemas críticos en producción.
                    </>
                  ) : (
                    <>
                      My name is <strong className="text-[#f4f4f2]">Federico Meza</strong>, and I am a{" "}
                      <strong className="text-[#f4f4f2]">senior full stack software engineer and tech lead</strong>.
                      I design system architecture, build secure backends, and deliver critical platforms to production.
                    </>
                  )}
                </p>

                <p>
                  {lang === "es" ? (
                    <>
                      He sido <strong>Gerente del Área de Sistemas en 26 Grados</strong> dirigiendo equipos multidisciplinarios,
                      he liderado la modernización de sistemas heredados de <strong>Informix 4GL a Web sin un solo segundo de inactividad</strong>,
                      y he construido plataformas con <strong>cumplimiento fiscal SAT CFDI 4.0</strong> y nómina de ley.
                    </>
                  ) : (
                    <>
                      I have served as <strong>Systems / Engineering Manager at 26 Grados</strong> directing cross-functional teams,
                      led zero-downtime migrations from legacy <strong>Informix 4GL to modern web</strong> architectures, and engineered platforms with strict <strong>Mexican SAT CFDI 4.0 fiscal compliance</strong>.
                    </>
                  )}
                </p>

                <p>
                  {lang === "es"
                    ? "Ahí aprendí que un buen software no solo se ve bien: aguanta la concurrencia, garantiza que el dinero concilie al centavo y es fácil de mantener a lo largo de los años."
                    : "I learned that reliable software doesn't just look clean: it survives high traffic, reconciles every single dollar to the penny, and remains maintainable across years."}
                </p>
              </div>

              {/* Credentials Badges */}
              <div className="mt-6 sm:mt-8 pt-5 sm:pt-6 border-t border-white/[0.08] flex flex-col sm:flex-row flex-wrap gap-3 sm:gap-4 text-xs font-mono text-[#c6c6ce]">
                <div className="flex items-center gap-2">
                  <ShieldCheck size={16} className="text-[#99ff99] shrink-0" />
                  <span>Google Cybersecurity Certified (2023)</span>
                </div>
                <div className="flex items-center gap-2">
                  <GraduationCap size={16} className="text-[#99ff99] shrink-0" />
                  <span>Ingeniería en Sistemas Computacionales (Honores)</span>
                </div>
              </div>
            </div>

            {/* Right Column: Editorial Photo Frame estilo danhermes.dev */}
            <div className="relative mx-auto w-full max-w-[340px] sm:max-w-[420px]">
              <div className="glass-dh p-3 sm:p-4 rounded-2xl relative group overflow-hidden">
                <div className="relative aspect-[4/4.8] w-full rounded-xl overflow-hidden bg-[#111116] border border-white/[0.1]">
                  <Image
                    src="/federico-meza.png"
                    alt="Ing. Federico de Jesús Meza Ramos"
                    fill
                    sizes="(max-width: 768px) 100vw, 420px"
                    className="object-cover object-top transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#060608]/85 via-transparent to-transparent pointer-events-none" />

                  <div className="absolute bottom-3 inset-x-3 sm:bottom-4 sm:inset-x-4 p-2.5 sm:p-3 rounded-xl bg-[#060608]/90 border border-white/[0.1] backdrop-blur-md">
                    <p className="text-xs sm:text-sm font-bold text-[#f4f4f2]">Ing. Federico Meza Ramos</p>
                    <p className="text-[11px] sm:text-xs font-mono text-[#99ff99]">Full Stack Lead · Zapopan, Jal.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
