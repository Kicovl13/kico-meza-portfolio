"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight, CheckCircle2, Sparkles } from "lucide-react";
import { mvcShowcases, projects, type MvcShowcase } from "@/lib/data";
import { ProjectDemoModal } from "@/components/project-demo-modal";
import { useLanguage } from "@/context/language-context";

type FilterCategory = "all" | "laravel" | "node" | "angular" | "production";

export function Projects() {
  const [selectedMvc, setSelectedMvc] = useState<MvcShowcase | null>(null);
  const [activeFilter, setActiveFilter] = useState<FilterCategory>("all");
  const { lang } = useLanguage();

  const filteredMvcs = mvcShowcases.filter((showcase) => {
    if (activeFilter === "all") return true;
    if (activeFilter === "laravel") {
      return showcase.stack.some((s) => s.toLowerCase().includes("laravel") || s.toLowerCase().includes("php"));
    }
    if (activeFilter === "node") {
      return showcase.stack.some((s) => s.toLowerCase().includes("node") || s.toLowerCase().includes("typescript"));
    }
    if (activeFilter === "angular") {
      return showcase.stack.some((s) => s.toLowerCase().includes("angular") || s.toLowerCase().includes("ionic"));
    }
    return true;
  });

  const filterTabs = [
    { id: "all", label: lang === "es" ? "Todos los Sistemas" : "All Systems" },
    { id: "laravel", label: "Laravel & PHP" },
    { id: "node", label: "Node.js & TypeScript" },
    { id: "angular", label: "Angular & Mobile" },
    { id: "production", label: lang === "es" ? "Trayectoria Empresarial" : "Corporate Track" },
  ];

  return (
    <section id="proyectos" className="py-16 sm:py-24 lg:py-32 relative border-t border-white/[0.08]">
      <div className="wrap">
        {/* Header estilo danhermes.dev */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 md:gap-8 mb-10 sm:mb-14">
          <div className="max-w-[800px]">
            <p className="eyebrow">{lang === "es" ? "Sistemas & Plataformas" : "Systems & Platforms"}</p>
            <h2 className="text-2xl xs:text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[#f4f4f2] leading-[1.12] sm:leading-[1.08]">
              {lang === "es" ? (
                <>
                  Sistemas donde un error <br />
                  <span className="dim">se nota y se paga.</span>
                </>
              ) : (
                <>
                  Systems where failure <br />
                  <span className="dim">is not an option.</span>
                </>
              )}
            </h2>
            <p className="mt-4 sm:mt-5 text-sm sm:text-base md:text-lg leading-relaxed text-[#9a9aa2]">
              {lang === "es"
                ? "Plataformas de conciliación fiscal SAT, dispersión de nómina, ERPs comerciales y aplicaciones de misión crítica. Cada sistema cuenta con una demostración interactiva en vivo."
                : "Mission-critical platforms spanning SAT tax compliance, automated payroll, enterprise ERPs, and real-time operations. Each system features an interactive live demo."}
            </p>
          </div>

          <Link
            href="/demos"
            className="btn-dh-ghost btn-dh-sm self-start md:self-auto shrink-0 flex items-center gap-2"
          >
            <Sparkles size={14} className="text-[#99ff99]" />
            <span>{lang === "es" ? "Hub de 5 Demos en Vivo" : "5 Live Demos Hub"}</span>
            <ArrowRight size={14} />
          </Link>
        </div>

        {/* Filter Pills estilo danhermes.dev (Swipeable on mobile) */}
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-3 sm:pb-4 sm:flex-wrap -mx-4 px-4 sm:mx-0 sm:px-0 mb-8 sm:mb-10 border-b border-white/[0.06]">
          {filterTabs.map((tab) => {
            const active = activeFilter === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveFilter(tab.id as FilterCategory)}
                className={`px-3.5 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs font-semibold tracking-wide transition-all cursor-pointer whitespace-nowrap shrink-0 ${
                  active
                    ? "bg-[#f4f4f2] text-[#060608] shadow-[0_8px_24px_rgba(244,244,242,0.14)]"
                    : "text-[#9a9aa2] border border-white/[0.1] bg-white/[0.02] hover:text-[#f4f4f2] hover:border-white/[0.2]"
                }`}
              >
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* System Cards Grid estilo danhermes.dev */}
        {activeFilter !== "production" ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6">
            {filteredMvcs.map((showcase) => (
              <article
                key={showcase.id}
                className="glass-dh p-6 sm:p-8 lg:p-9 flex flex-col justify-between transition-all duration-300 hover:-translate-y-1 hover:border-white/[0.24]"
              >
                <div>
                  {/* Category & Status */}
                  <div className="flex items-center justify-between gap-3 mb-4 sm:mb-5">
                    <span className="font-mono text-[10px] sm:text-[11px] font-bold tracking-[0.16em] uppercase text-[#99ff99]">
                      {showcase.category}
                    </span>
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-mono text-[#a9bdd1] bg-white/[0.04] border border-white/[0.1]">
                      <span className="size-1.5 rounded-full bg-[#99ff99] animate-pulse" />
                      <span>{lang === "es" ? "Demo Activa" : "Live Demo"}</span>
                    </span>
                  </div>

                  {/* Title & Tagline */}
                  <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-[#f4f4f2] mb-1">
                    {showcase.title}
                  </h3>
                  <p className="font-mono text-xs text-[#a9bdd1] mb-3 sm:mb-4">
                    {showcase.tagline}
                  </p>

                  <p className="text-xs sm:text-sm leading-relaxed text-[#9a9aa2] mb-5 sm:mb-6">
                    {showcase.description}
                  </p>

                  {/* Key Metrics */}
                  <div className="grid grid-cols-3 gap-1.5 sm:gap-2 p-2.5 sm:p-3 rounded-xl bg-white/[0.03] border border-white/[0.08] text-center mb-5 sm:mb-6">
                    {showcase.metrics.map((m) => (
                      <div key={m.label}>
                        <p className="font-mono text-xs sm:text-sm font-bold text-[#f4f4f2]">
                          {m.value}
                        </p>
                        <p className="text-[9px] sm:text-[10px] text-[#6e6e76] mt-0.5 font-medium truncate">
                          {m.label}
                        </p>
                      </div>
                    ))}
                  </div>

                  {/* Features list */}
                  <ul className="space-y-2 text-xs text-[#c6c6ce]">
                    {showcase.keyFeatures.slice(0, 3).map((f) => (
                      <li key={f} className="flex items-start gap-2.5">
                        <CheckCircle2 size={14} className="text-[#99ff99] shrink-0 mt-0.5" />
                        <span>{f}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Footer with Actions */}
                <div className="mt-6 sm:mt-8 pt-5 sm:pt-6 border-t border-white/[0.08] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="flex flex-wrap gap-1.5">
                    {showcase.stack.slice(0, 3).map((tag) => (
                      <span
                        key={tag}
                        className="inline-flex items-center px-2 sm:px-2.5 py-0.5 rounded-full text-[10px] sm:text-[11px] font-mono text-[#9a9aa2] border border-white/[0.08] bg-white/[0.02]"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  <div className="flex items-center gap-2 shrink-0 w-full sm:w-auto">
                    <button
                      type="button"
                      onClick={() => setSelectedMvc(showcase)}
                      className="btn-dh-ghost btn-dh-sm text-xs cursor-pointer flex-1 sm:flex-initial text-center justify-center"
                    >
                      {lang === "es" ? "Arquitectura" : "Architecture"}
                    </button>
                    <Link
                      href={showcase.demoUrl}
                      className="btn-dh-light btn-dh-sm text-xs font-bold flex-1 sm:flex-initial text-center justify-center flex items-center gap-1.5"
                    >
                      <Sparkles size={13} />
                      <span>{lang === "es" ? "Abrir Demo" : "Open Demo"}</span>
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>
        ) : (
          /* Corporate Production Projects */
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {projects.map((proj) => (
              <article
                key={proj.title}
                className="glass-dh p-8 flex flex-col justify-between transition-all duration-300 hover:-translate-y-1"
              >
                <div>
                  <div className="flex items-center justify-between text-xs font-mono text-[#9a9aa2] mb-4">
                    <span className="text-[#99ff99] font-semibold">{proj.period}</span>
                    <span className="px-2 py-0.5 rounded-full bg-white/[0.04] border border-white/[0.1] text-[10px]">
                      {proj.role}
                    </span>
                  </div>

                  <h3 className="text-xl font-bold tracking-tight text-[#f4f4f2] mb-3">
                    {proj.title}
                  </h3>

                  <p className="text-sm text-[#9a9aa2] leading-relaxed mb-6">
                    {proj.description}
                  </p>

                  <ul className="space-y-2 text-xs text-[#c6c6ce]">
                    {proj.points.map((p) => (
                      <li key={p} className="flex items-start gap-2">
                        <span className="text-[#99ff99] mt-0.5">•</span>
                        <span>{p}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mt-8 pt-5 border-t border-white/[0.08] flex flex-wrap gap-1.5">
                  {proj.tags.map((t) => (
                    <span
                      key={t}
                      className="px-2.5 py-0.5 rounded-full text-[10px] font-mono text-[#9a9aa2] border border-white/[0.08] bg-white/[0.02]"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </article>
            ))}
          </div>
        )}
      </div>

      {/* Architecture Modal */}
      <ProjectDemoModal
        project={selectedMvc}
        onClose={() => setSelectedMvc(null)}
      />
    </section>
  );
}
