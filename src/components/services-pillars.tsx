"use client";

import { useLanguage } from "@/context/language-context";

export function ServicesPillars() {
  const { lang } = useLanguage();

  const pillars = [
    {
      num: "01",
      title: lang === "es" ? "Backend de Misión Crítica & APIs" : "Mission-Critical Backend & APIs",
      desc:
        lang === "es"
          ? "Servicios robustos, APIs RESTful de alto rendimiento, procesamiento de colas asíncronas con Redis y lógica empresarial diseñada para crecer sin cuellos de botella."
          : "Robust services, high-throughput RESTful APIs, asynchronous Redis background queues, and domain logic engineered to scale without bottlenecks.",
      tags: ["Laravel 13", "PHP 8.3+", "Node.js", "TypeScript", "APIs REST", "Redis", "Docker"],
    },
    {
      num: "02",
      title: lang === "es" ? "Frontend Reactivo & Aplicaciones Móvil" : "Reactive Frontend & Mobile Apps",
      desc:
        lang === "es"
          ? "Interfaces fluidas, dashboards administrativos responsivos y aplicaciones móviles híbridas con alta fidelidad y velocidad de respuesta en cualquier pantalla."
          : "Polished interfaces, responsive admin dashboards, and cross-platform mobile applications optimized for low latency and smooth user experience.",
      tags: ["Angular 20", "Next.js", "TypeScript", "Ionic 8", "Capacitor 7", "Tailwind CSS", "Livewire 4"],
    },
    {
      num: "03",
      title: lang === "es" ? "ERPs, CRM & Cumplimiento SAT CFDI 4.0" : "Enterprise ERP, CRM & SAT Fiscal Compliance",
      desc:
        lang === "es"
          ? "Automatización de cobranza B2B, conciliación de comprobantes de pago (PPD/REP), dispersión de nómina de ley (IMSS e ISR) y bitácoras inmutables de auditoría."
          : "Automated B2B collections, payment receipt reconciliation (PPD/REP), statutory payroll tax withholding (IMSS/ISR), and tamper-evident audit logs.",
      tags: ["CFDI 4.0", "Conciliación SPEI", "PPD / REP", "Nómina IMSS/ISR", "MySQL 8.4 LTS", "ACID Transactions"],
    },
    {
      num: "04",
      title: lang === "es" ? "Migración Legacy & Ciberseguridad" : "Zero-Downtime Migration & Cybersecurity",
      desc:
        lang === "es"
          ? "Transición fluida de arquitecturas heredadas (como Informix 4GL a Web moderna) sin cortar la operación diaria, con estándares de seguridad avalados por Google."
          : "Seamless transition of legacy codebases (such as Informix 4GL to modern cloud web stacks) with zero downtime, backed by Google Cybersecurity certification.",
      tags: ["Informix 4GL Migration", "Zero Downtime", "Google Cybersecurity Certified", "Linux Servers", "OAuth2 / JWT"],
    },
  ];

  return (
    <section id="servicios" className="py-16 sm:py-24 lg:py-32 relative border-t border-white/[0.08]">
      <div className="wrap">
        {/* Section Header estilo danhermes.dev */}
        <div className="max-w-[840px] mb-12 sm:mb-16 md:mb-20">
          <p className="eyebrow">{lang === "es" ? "Qué hago" : "What I do"}</p>
          <h2 className="text-2xl xs:text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[#f4f4f2] leading-[1.12] sm:leading-[1.08]">
            {lang === "es"
              ? "Un solo ingeniero para toda la arquitectura."
              : "Unified engineering ownership from backend to UI."}
          </h2>
          <p className="mt-4 sm:mt-6 text-sm sm:text-base md:text-lg leading-relaxed text-[#9a9aa2] max-w-[680px]">
            {lang === "es"
              ? "Sin pasar el proyecto de mano en mano. La misma persona que diseña la arquitectura de base de datos escribe la API, programa la interfaz reactiva y la deja funcionando en producción."
              : "No handing projects off across silos. The same engineer who models relational schemas builds the API, crafts the reactive interface, and deploys it live on your server."}
          </p>
        </div>

        {/* Numbered Pillars List estilo danhermes.dev */}
        <div className="border-t border-white/[0.08]">
          {pillars.map((pillar) => (
            <article
              key={pillar.num}
              className="group grid grid-cols-1 md:grid-cols-[70px_1.1fr_1.3fr] gap-3 sm:gap-6 md:gap-10 py-7 sm:py-10 md:py-12 border-b border-white/[0.08] transition-colors"
            >
              <div className="flex items-center gap-3 md:block">
                <p className="font-mono text-xs sm:text-sm font-bold text-[#6e6e76] group-hover:text-[#99ff99] transition-colors pt-1">
                  {pillar.num}
                </p>
                <div className="h-px bg-white/10 flex-1 md:hidden" />
              </div>
              <h3 className="text-lg sm:text-xl md:text-2xl font-bold tracking-tight text-[#f4f4f2] leading-snug">
                {pillar.title}
              </h3>
              <div>
                <p className="text-xs sm:text-sm md:text-base leading-relaxed text-[#9a9aa2]">
                  {pillar.desc}
                </p>
                <div className="flex flex-wrap gap-1.5 sm:gap-2 mt-4 sm:mt-5">
                  {pillar.tags.map((tag) => (
                    <span
                      key={tag}
                      className="inline-flex items-center px-2.5 py-0.5 sm:px-3 sm:py-1 rounded-full text-[11px] sm:text-xs font-medium text-[#c6c6ce] border border-white/[0.1] bg-white/[0.03]"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
