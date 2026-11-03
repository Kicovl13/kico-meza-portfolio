"use client";

import Image from "next/image";
import { CheckCircle2, GraduationCap, MapPin, ShieldCheck } from "lucide-react";
import { education, site } from "@/lib/data";
import { useLanguage } from "@/context/language-context";

export function Workflow() {
  const { lang } = useLanguage();

  const careerRoles = [
    {
      role: lang === "es" ? "Senior Full Stack Developer" : "Senior Full Stack Developer",
      company: "Administración de Servicios Start",
      place: lang === "es" ? "Remoto · Jalisco, México" : "Remote · Mexico",
      period: "Oct 2024 — Oct 2026",
      badge: lang === "es" ? "Arquitectura & APIs" : "Architecture & APIs",
      description:
        lang === "es"
          ? "Diseño y desarrollo de microservicios contenerizados en Docker, APIs RESTful de alto throughput y colas asíncronas con Redis para plataformas empresariales integradas con Angular."
          : "Architected high-throughput modular web services, secure REST APIs, and Dockerized microservices paired with reactive Angular frontends and Redis queues.",
      achievements: [
        lang === "es"
          ? "Servicios modulares con Laravel 13, Node.js y TypeScript integrados con colas Redis para procesamiento batch."
          : "Engineered scalable microservices with Laravel 13, Node.js, and TypeScript integrated with async Redis queues.",
        lang === "es"
          ? "Optimización profunda de consultas SQL complejas en MySQL 8.4 LTS reduciendo latencias hasta un 75% en reportes críticos."
          : "Deep SQL query and indexing optimization on MySQL 8.4 LTS, reducing latency by up to 75% on critical business reports.",
        lang === "es"
          ? "Estandarización de ciclos de despliegue reproducible en producción con Docker y Linux."
          : "Standardized predictable production deployment workflows with Docker containers and Linux environments.",
      ],
      stack: ["Laravel 13", "Node.js", "TypeScript", "Angular 20", "Docker", "MySQL 8.4", "Redis"],
    },
    {
      role: lang === "es" ? "Gerente del Área de Sistemas / Tech Lead" : "Engineering / Systems Manager & Tech Lead",
      company: "26 Grados S.A. de C.V.",
      place: "Zapopan, Jalisco",
      period: "Ene 2021 — Abr 2024",
      badge: lang === "es" ? "Liderazgo Técnico" : "Technical Leadership",
      description:
        lang === "es"
          ? "Dirección técnica y arquitectónica del ecosistema integral ERP/CRM corporativo: finanzas, facturación, control de accesos, auditoría y aplicaciones móviles nativas sincronizadas."
          : "Strategic leadership of the engineering department and core ERP/CRM architecture, managing backend, frontend, and native mobile engineers.",
      achievements: [
        lang === "es"
          ? "Lideré al equipo de ingeniería (backend, frontend, iOS/Swift y Android/Kotlin) bajo una sola fuente de verdad relacional."
          : "Directed cross-functional engineering team (backend, frontend, iOS/Swift, Android/Kotlin) backed by unified DB.",
        lang === "es"
          ? "Diseño del módulo financiero con conciliación de cobranza, emisión de CFDI y bitácoras inmutables de auditoría forense."
          : "Architected core financial module: accounts receivable reconciliation, electronic invoicing, and tamper-evident audit trails.",
        lang === "es"
          ? "Garantía de alta disponibilidad (99.9% uptime) y asesoría técnica directa al consejo directivo en infraestructura cloud."
          : "Guaranteed 99.9% uptime and provided direct counsel to executive leadership on cloud infrastructure and data security.",
      ],
      stack: ["Node.js", "TypeScript", "Express", "MySQL", "Swift", "Kotlin", "Docker"],
    },
    {
      role: lang === "es" ? "Software Engineer / Lead de Migración" : "Software Engineer / Migration Lead",
      company: "Administración de Integrantes",
      place: "Zapopan, Jalisco",
      period: "Ene 2019 — Dic 2021",
      badge: lang === "es" ? "Migración de Misión Crítica" : "Mission-Critical Migration",
      description:
        lang === "es"
          ? "Liderazgo técnico en la modernización tecnológica y migración completa de misión crítica de los sistemas operativos y de nómina de la empresa desde Informix 4GL hacia arquitectura web moderna con cero caídas."
          : "Spearheaded technical modernization and zero-downtime migration of company operational and payroll systems from Informix 4GL to modern web stack.",
      achievements: [
        lang === "es"
          ? "Migración exitosa desde Informix 4GL hacia MySQL y arquitectura web sin un solo minuto de interrupción operativa ni pérdida de datos."
          : "Executed zero-downtime migration from legacy Informix 4GL with zero data loss and uninterrupted operations.",
        lang === "es"
          ? "Diseño y programación del motor de cálculo de nómina de ley con retenciones fiscales (ISR) y cuotas obrero-patronales (IMSS)."
          : "Engineered automated payroll math engine, statutory tax withholding (IMSS/ISR), and payment gateway integrations.",
        lang === "es"
          ? "Implementación de bitácoras de auditoría forense y controles de seguridad para prevención de fraudes contables."
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
            <p className="eyebrow">{lang === "es" ? "Trayectoria Profesional" : "Career Track Record"}</p>
            <h2 className="text-2xl xs:text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[#f4f4f2] leading-[1.12] sm:leading-[1.08]">
              {lang === "es"
                ? "Experiencia en producción y liderazgo de equipos."
                : "Production track record and engineering leadership."}
            </h2>
            <p className="mt-4 sm:mt-5 text-sm sm:text-base md:text-lg leading-relaxed text-[#9a9aa2] max-w-[680px]">
              {lang === "es"
                ? "Más de 7 años asumiendo responsabilidad técnica integral: dirigiendo equipos multidisciplinarios de ingeniería, diseñando esquemas de datos relacionales y modernizando sistemas core sin un solo segundo de corte operativo."
                : "Over 7 years owning unified technical responsibility: leading cross-functional engineering teams, architecting relational data schemas, and modernizing legacy codebases with zero downtime."}
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
                    <span className="dim">hay un ingeniero senior.</span>
                  </>
                ) : (
                  <>
                    Behind FEDERICOMEZA.DEV <br />
                    <span className="dim">is a senior engineer.</span>
                  </>
                )}
              </h2>

              <div className="space-y-4 text-sm sm:text-base md:text-lg leading-relaxed text-[#9a9aa2]">
                <p>
                  {lang === "es" ? (
                    <>
                      Me llamo <strong className="text-[#f4f4f2]">Federico Meza</strong> y soy{" "}
                      <strong className="text-[#f4f4f2]">Senior Software Engineer & Tech Lead</strong>.
                      Diseño la arquitectura de bases de datos, programo el backend transaccional y pongo sistemas críticos en producción.
                    </>
                  ) : (
                    <>
                      My name is <strong className="text-[#f4f4f2]">Federico Meza</strong>, and I am a{" "}
                      <strong className="text-[#f4f4f2]">Senior Software Engineer & Tech Lead</strong>.
                      I design relational data architectures, engineer secure backends, and deliver mission-critical platforms to production.
                    </>
                  )}
                </p>

                <p>
                  {lang === "es" ? (
                    <>
                      He sido <strong>Gerente del Área de Sistemas en 26 Grados</strong> dirigiendo equipos multidisciplinarios de ingeniería,
                      he liderado la modernización de sistemas de misión crítica de <strong>Informix 4GL a Web sin un solo segundo de inactividad operativa</strong>,
                      y he construido plataformas empresariales con estricto <strong>cumplimiento fiscal SAT CFDI 4.0</strong>, conciliación SPEI y nómina de ley.
                    </>
                  ) : (
                    <>
                      I have served as <strong>Systems / Engineering Manager at 26 Grados</strong> directing cross-functional teams,
                      led zero-downtime legacy migrations from <strong>Informix 4GL to modern web</strong> architectures, and engineered platforms with strict <strong>Mexican SAT CFDI 4.0 fiscal compliance</strong>, SPEI reconciliation, and statutory payroll.
                    </>
                  )}
                </p>

                <p>
                  {lang === "es"
                    ? "Mi criterio técnico es simple: un buen software no solo se ve limpio; resiste alta concurrencia, garantiza que el dinero y los comprobantes fiscales concilien al centavo, y se mantiene predecible y robusto con los años."
                    : "My engineering philosophy is straightforward: reliable software doesn't just look polished; it survives high traffic, reconciles every dollar and tax stamp to the penny, and remains predictable and robust over years."}
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
