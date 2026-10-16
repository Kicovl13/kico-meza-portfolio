"use client";

import { motion } from "framer-motion";
import { education, experience, extras } from "@/lib/data";

export function Workflow() {
  return (
    <section id="experience" className="relative scroll-mt-24 py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.45 }}
          className="max-w-2xl"
        >
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-primary">
            Trayectoria
          </p>
          <h2
            className="mt-3 text-3xl tracking-tight text-foreground sm:text-4xl"
            style={{ fontWeight: 700 }}
          >
            Experiencia
          </h2>
          <p className="mt-3 text-muted-foreground">
            De prácticas en Nayarit a liderar el área de sistemas y construir
            plataformas que la operación usa todos los días.
          </p>
        </motion.div>

        <div className="mt-12 grid gap-8">
          {experience.map((job, index) => (
            <motion.article
              key={`${job.company}-${job.period}`}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.4, delay: index * 0.04 }}
              className="relative border-l border-primary/30 pl-5"
            >
              <div className="absolute -left-[9px] top-1 size-4 rounded-full border border-primary/50 bg-background">
                <div className="absolute inset-1 rounded-full bg-primary" />
              </div>
              <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between">
                <h3
                  className="text-lg tracking-tight text-foreground"
                  style={{ fontWeight: 650 }}
                >
                  {job.role}
                </h3>
                <p className="font-mono text-xs text-primary">{job.period}</p>
              </div>
              <p className="mt-1 text-sm text-foreground/80">
                {job.company}
                <span className="text-muted-foreground"> · {job.place}</span>
              </p>
              <ul className="mt-3 flex flex-col gap-1.5 text-sm leading-relaxed text-muted-foreground">
                {job.points.map((point) => (
                  <li key={point}>{point}</li>
                ))}
              </ul>
            </motion.article>
          ))}
        </div>

        <div className="mt-12 grid gap-4 rounded-2xl border border-border/70 bg-card/40 p-6 sm:grid-cols-2">
          <div>
            <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-primary">
              Educación
            </p>
            <p className="mt-2 text-foreground" style={{ fontWeight: 650 }}>
              {education.degree}
            </p>
            <p className="mt-1 text-sm text-muted-foreground">
              {education.school} · {education.place}
            </p>
            <p className="mt-1 font-mono text-xs text-primary">{education.period}</p>
          </div>
          <div>
            <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-primary">
              Idioma y certificación
            </p>
            <ul className="mt-2 flex flex-col gap-1.5 text-sm text-muted-foreground">
              {extras.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
