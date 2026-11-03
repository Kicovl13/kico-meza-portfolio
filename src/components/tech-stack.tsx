"use client";

import { Cpu } from "lucide-react";
import { useLanguage } from "@/context/language-context";

export function TechStack() {
  const { lang } = useLanguage();

  const stackCards = [
    {
      title: "Backend & Arquitectura",
      desc:
        lang === "es"
          ? "Arquitectura orientada a dominio, microservicios, APIs REST de alto throughput y colas asíncronas con Redis."
          : "Domain-driven architecture, microservices, high-throughput REST APIs, and async Redis queues.",
      tags: ["Laravel 13", "PHP 8.3+", "Node.js", "Express", "TypeScript", "REST APIs", "Redis"],
    },
    {
      title: "Frontend & Aplicaciones Móvil",
      desc:
        lang === "es"
          ? "Interfaces reactivas, componentes modulares y aplicaciones móviles fluidas con Angular 20, Next.js y Capacitor."
          : "Reactive interfaces, modular components, and smooth cross-platform mobile apps with Angular 20, Next.js, and Capacitor.",
      tags: ["Angular 20", "Next.js", "React", "Ionic 8", "Capacitor 7", "Tailwind CSS", "Livewire 4"],
    },
    {
      title: "Bases de Datos & Consistencia",
      desc:
        lang === "es"
          ? "Modelado relacional, consultas SQL optimizadas, transacciones ACID estrictas y particionamiento multi-tenant."
          : "Relational data modeling, optimized SQL indexing, strict ACID transactions, and multi-tenant partitioning.",
      tags: ["MySQL 8.4 LTS", "MariaDB", "Oracle DB", "Optimización SQL", "Transacciones ACID", "Redis"],
    },
    {
      title: "DevOps & Ciberseguridad",
      desc:
        lang === "es"
          ? "Contenedores Docker predecibles, administración de servidores Linux y estándares de seguridad certificados por Google."
          : "Predictable Docker containers, Linux server administration, CI/CD, and Google-certified security.",
      tags: ["Docker", "Linux Servers", "Google Cybersecurity", "OAuth2 / JWT", "CI/CD", "SAT CFDI 4.0"],
    },
  ];

  const principles = [
    {
      label: lang === "es" ? "Idempotencia Transaccional" : "Transactional Idempotency",
      desc: lang === "es" ? "Prevención de duplicidad en pagos y timbrados fiscales" : "Preventing duplicate payments and tax operations",
    },
    {
      label: lang === "es" ? "Aislamiento Multi-Tenant" : "Multi-Tenant Isolation",
      desc: lang === "es" ? "Segregación estricta de datos por empresa a nivel BD" : "Strict database-level tenant data segregation",
    },
    {
      label: lang === "es" ? "Arquitectura Modular" : "Modular Architecture",
      desc: lang === "es" ? "Desacoplamiento de componentes para mantenimiento a largo plazo" : "Decoupled component design for long-term maintainability",
    },
    {
      label: lang === "es" ? "Cero Caídas en Migraciones" : "Zero-Downtime Migrations",
      desc: lang === "es" ? "Transición fluida de sistemas legacy a plataformas modernas" : "Seamless transition from legacy systems to modern stacks",
    },
  ];

  return (
    <section id="stack" className="py-16 sm:py-24 lg:py-32 relative zone-light border-t border-white/[0.08]">
      <div className="wrap">
        {/* Header estilo danhermes.dev con .center */}
        <div className="max-w-[840px] mx-auto text-center mb-12 sm:mb-16 md:mb-20">
          <p className="eyebrow justify-center">Stack</p>
          <h2 className="text-2xl xs:text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[#f4f4f2] leading-[1.12] sm:leading-[1.08]">
            {lang === "es"
              ? "Las herramientas cambian. El criterio no."
              : "Tools evolve. Engineering judgment remains."}
          </h2>
          <p className="mt-4 sm:mt-6 text-sm sm:text-base md:text-lg leading-relaxed text-[#9a9aa2] max-w-[680px] mx-auto">
            {lang === "es"
              ? "Trabajo con la tecnología que mejor le queda al proyecto y garantiza escalabilidad a largo plazo, no con la que está de moda."
              : "I build with technologies that best serve the business problem and guarantee long-term maintainability, not hype."}
          </p>
        </div>

        {/* Stack Grid con Glass Cards estilo danhermes.dev */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
          {stackCards.map((card) => (
            <article
              key={card.title}
              className="glass-dh p-6 sm:p-7 lg:p-8 flex flex-col justify-between transition-all duration-300 hover:-translate-y-1 hover:border-white/[0.22]"
            >
              <div>
                <span className="w-8 h-0.5 bg-[#99ff99] block mb-3 sm:mb-4" aria-hidden="true" />
                <h3 className="text-lg sm:text-xl font-bold tracking-tight text-[#f4f4f2] mb-2">
                  {card.title}
                </h3>
                <p className="text-xs sm:text-sm text-[#9a9aa2] leading-relaxed mb-5 sm:mb-6">
                  {card.desc}
                </p>
              </div>

              <div className="flex flex-wrap gap-1.5 sm:gap-2 pt-4 border-t border-white/[0.06]">
                {card.tags.map((tag) => (
                  <span
                    key={tag}
                    className="inline-flex items-center px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-full text-[11px] sm:text-xs font-medium text-[#c6c6ce] border border-white/[0.1] bg-white/[0.03]"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </article>
          ))}
        </div>

        {/* Principles Strip */}
        <div className="mt-8 sm:mt-10 glass-dh p-5 sm:p-7 lg:p-8 rounded-2xl">
          <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-[#99ff99] mb-4 sm:mb-5 font-semibold">
            <Cpu size={15} />
            <span>
              {lang === "es"
                ? "Principios de Ingeniería en Producción:"
                : "Production Engineering Principles:"}
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 text-xs">
            {principles.map((p) => (
              <div key={p.label} className="border-l border-white/[0.14] pl-3.5">
                <p className="font-bold text-[#f4f4f2] text-xs sm:text-sm">{p.label}</p>
                <p className="text-[#9a9aa2] mt-1 text-[11px] sm:text-xs leading-relaxed">
                  {p.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
