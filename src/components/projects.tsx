"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  Building2,
  CheckCircle2,
  Sparkles,
} from "lucide-react";
import { mvcShowcases, projects, type MvcShowcase } from "@/lib/data";
import { ProjectDemoModal } from "@/components/project-demo-modal";

export function Projects() {
  const [selectedMvc, setSelectedMvc] = useState<MvcShowcase | null>(null);
  const [filterTab, setFilterTab] = useState<"mvc" | "production">("mvc");

  return (
    <section id="projects" className="relative scroll-mt-24 py-20 sm:py-28">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent" />
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.45 }}
          className="flex flex-col sm:flex-row sm:items-end justify-between gap-6"
        >
          <div>
            <p className="font-mono text-xs uppercase tracking-[0.2em] text-primary">
              Portafolio Técnico
            </p>
            <h2
              className="mt-3 text-3xl tracking-tight text-foreground sm:text-4xl"
              style={{ fontWeight: 700 }}
            >
              Proyectos y Sistemas MVC
            </h2>
            <p className="mt-3 max-w-2xl text-muted-foreground text-sm sm:text-base leading-relaxed">
              Soluciones empresariales diseñadas con el patrón Modelo-Vista-Controlador,
              arquitectura escalable, contenedores Docker y código limpio.
            </p>
          </div>

          {/* Filter Tab Switcher */}
          <div className="flex rounded-xl border border-border/80 bg-card/60 p-1 text-xs self-start sm:self-auto shrink-0">
            <button
              type="button"
              onClick={() => setFilterTab("mvc")}
              className={`flex items-center gap-1.5 rounded-lg px-3 py-2 font-semibold transition-all ${
                filterTab === "mvc"
                  ? "bg-primary text-primary-foreground shadow-md"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <Sparkles className="size-3.5" />
              4 Sistemas MVC (Demos)
            </button>
            <button
              type="button"
              onClick={() => setFilterTab("production")}
              className={`flex items-center gap-1.5 rounded-lg px-3 py-2 font-semibold transition-all ${
                filterTab === "production"
                  ? "bg-primary text-primary-foreground shadow-md"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <Building2 className="size-3.5" />
              En Producción
            </button>
          </div>
        </motion.div>

        {/* Tab 1: 4 MVC SHOWCASE PROJECTS WITH INTERACTIVE DEMOS */}
        {filterTab === "mvc" && (
          <div className="mt-12 grid gap-6 md:grid-cols-2">
            {mvcShowcases.map((showcase, index) => (
              <motion.article
                key={showcase.id}
                initial={{ opacity: 0, y: 22 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.45, delay: index * 0.08 }}
                className="group relative flex flex-col justify-between rounded-3xl border border-border/70 bg-card/60 p-6 sm:p-7 transition-all duration-300 hover:border-primary/45 hover:shadow-2xl hover:shadow-primary/5"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-4">
                    <span className="rounded-full border border-primary/30 bg-primary/10 px-3 py-1 font-mono text-xs text-primary font-semibold">
                      {showcase.category}
                    </span>
                    <span className="font-mono text-[11px] text-muted-foreground uppercase tracking-wider">
                      Patrón MVC
                    </span>
                  </div>

                  <h3
                    className="text-xl font-bold tracking-tight text-foreground group-hover:text-primary transition-colors"
                    style={{ fontWeight: 700 }}
                  >
                    {showcase.title}
                  </h3>
                  <p className="mt-1 font-mono text-xs text-primary/80">
                    {showcase.tagline}
                  </p>

                  <p className="mt-3 text-xs sm:text-sm text-muted-foreground leading-relaxed">
                    {showcase.description}
                  </p>

                  {/* Metrics preview */}
                  <div className="mt-5 grid grid-cols-3 gap-2 rounded-2xl border border-border/60 bg-background/40 p-3 text-center">
                    {showcase.metrics.map((m) => (
                      <div key={m.label}>
                        <p className="font-mono text-sm font-bold text-foreground">
                          {m.value}
                        </p>
                        <p className="text-[10px] text-muted-foreground">{m.label}</p>
                      </div>
                    ))}
                  </div>

                  {/* Highlights list */}
                  <ul className="mt-5 space-y-2 text-xs text-foreground/80">
                    {showcase.keyFeatures.slice(0, 3).map((f) => (
                      <li key={f} className="flex items-start gap-2">
                        <CheckCircle2 className="size-3.5 text-primary shrink-0 mt-0.5" />
                        <span>{f}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mt-7 pt-5 border-t border-border/60 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div className="flex flex-wrap gap-1.5">
                    {showcase.stack.slice(0, 3).map((tag) => (
                      <span
                        key={tag}
                        className="rounded-md border border-border/80 bg-background/50 px-2 py-0.5 font-mono text-[11px] text-muted-foreground"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  <button
                    type="button"
                    onClick={() => setSelectedMvc(showcase)}
                    className="inline-flex items-center justify-center gap-1.5 rounded-xl bg-primary px-3.5 py-2 text-xs font-semibold text-primary-foreground shadow-sm transition-transform hover:scale-105 active:scale-95"
                  >
                    <Sparkles className="size-3.5" />
                    Probar Demo Interactivo
                  </button>
                </div>
              </motion.article>
            ))}
          </div>
        )}

        {/* Tab 2: ENTERPRISE PRODUCTION PROJECTS */}
        {filterTab === "production" && (
          <div className="mt-12 grid gap-5 lg:grid-cols-3">
            {projects.map((project, index) => (
              <motion.article
                key={project.title}
                initial={{ opacity: 0, y: 22 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.45, delay: index * 0.08 }}
                className="group flex flex-col rounded-2xl border border-border/70 bg-card/60 p-6 transition-colors hover:border-primary/35"
              >
                <div className="mb-4 h-1 w-12 rounded-full bg-primary/70 transition-all group-hover:w-16" />
                <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-primary">
                  {project.period}
                </p>
                <h3
                  className="mt-2 text-xl leading-snug tracking-tight text-foreground"
                  style={{ fontWeight: 700 }}
                >
                  {project.title}
                </h3>
                <p className="mt-1 text-sm text-foreground/80">{project.role}</p>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                  {project.description}
                </p>
                <ul className="mt-4 flex flex-1 flex-col gap-2 text-sm leading-relaxed text-muted-foreground">
                  {project.points.map((point) => (
                    <li key={point} className="flex gap-2">
                      <span className="mt-2 size-1 shrink-0 rounded-full bg-primary" />
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
                <div className="mt-5 flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-md border border-primary/20 bg-primary/8 px-2 py-1 font-mono text-[11px] text-primary"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </motion.article>
            ))}
          </div>
        )}
      </div>

      {/* Interactive Modal */}
      <ProjectDemoModal
        project={selectedMvc}
        onClose={() => setSelectedMvc(null)}
      />
    </section>
  );
}
