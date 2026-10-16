"use client";

import { motion } from "framer-motion";
import { ExternalLink, FolderGit2 } from "lucide-react";
import { projects } from "@/lib/data";
import { Button } from "@/components/ui/button";

export function Projects() {
  return (
    <section id="projects" className="relative scroll-mt-24 py-20 sm:py-28">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent" />
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.45 }}
        >
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-primary">
            Selected work
          </p>
          <h2
            className="mt-3 text-3xl tracking-tight text-foreground sm:text-4xl"
            style={{ fontWeight: 700 }}
          >
            Projects
          </h2>
          <p className="mt-3 max-w-xl text-muted-foreground">
            Systems that combine backend reliability, automation, and clear
            product interfaces.
          </p>
        </motion.div>

        <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
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
              <h3
                className="text-xl leading-snug tracking-tight text-foreground"
                style={{ fontWeight: 700 }}
              >
                {project.title}
              </h3>
              <p className="mt-3 flex-1 text-sm leading-relaxed text-muted-foreground">
                {project.description}
              </p>
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
              <div className="mt-6 flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  nativeButton={false}
                  render={
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                    />
                  }
                >
                  <FolderGit2 data-icon="inline-start" />
                  GitHub
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  nativeButton={false}
                  render={
                    <a
                      href={project.live}
                      target="_blank"
                      rel="noopener noreferrer"
                    />
                  }
                >
                  Live
                  <ExternalLink data-icon="inline-end" />
                </Button>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
