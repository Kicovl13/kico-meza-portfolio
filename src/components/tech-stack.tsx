"use client";

import { motion } from "framer-motion";
import { Boxes, LayoutDashboard, Server, Sparkles } from "lucide-react";
import { skillGroups } from "@/lib/data";

const icons = {
  server: Server,
  layout: LayoutDashboard,
  container: Boxes,
  sparkles: Sparkles,
};

export function TechStack() {
  return (
    <section id="stack" className="relative scroll-mt-24 py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.45 }}
        >
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-primary">
            Capabilities
          </p>
          <h2
            className="mt-3 text-3xl tracking-tight text-foreground sm:text-4xl"
            style={{ fontWeight: 700 }}
          >
            Tech Stack & Skills
          </h2>
          <p className="mt-3 max-w-xl text-muted-foreground">
            A focused toolkit for backend systems, web interfaces, containerized
            delivery, and AI-assisted development.
          </p>
        </motion.div>

        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {skillGroups.map((group, index) => {
            const Icon = icons[group.icon];
            return (
              <motion.div
                key={group.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.4, delay: index * 0.06 }}
                className="glass rounded-2xl p-5"
              >
                <div className="mb-4 flex size-10 items-center justify-center rounded-xl border border-primary/20 bg-primary/10 text-primary">
                  <Icon className="size-5" />
                </div>
                <h3
                  className="text-lg tracking-tight text-foreground"
                  style={{ fontWeight: 650 }}
                >
                  {group.title}
                </h3>
                <ul className="mt-4 flex flex-wrap gap-2">
                  {group.items.map((item) => (
                    <li
                      key={item}
                      className="rounded-md border border-border/70 bg-secondary/50 px-2.5 py-1 font-mono text-xs text-muted-foreground"
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
