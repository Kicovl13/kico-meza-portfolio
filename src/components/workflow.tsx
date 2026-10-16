"use client";

import { motion } from "framer-motion";
import { Bot, Box, Code2, Workflow as WorkflowIcon } from "lucide-react";
import { workflow } from "@/lib/data";

const icons = {
  code: Code2,
  box: Box,
  workflow: WorkflowIcon,
  bot: Bot,
};

export function Workflow() {
  return (
    <section id="workflow" className="relative scroll-mt-24 py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.45 }}
          className="max-w-2xl"
        >
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-primary">
            How I work
          </p>
          <h2
            className="mt-3 text-3xl tracking-tight text-foreground sm:text-4xl"
            style={{ fontWeight: 700 }}
          >
            Experience / Workflow
          </h2>
          <p className="mt-3 text-muted-foreground">
            Practical habits that keep shipping fast: clean code, containers,
            automation, and AI-native tooling.
          </p>
        </motion.div>

        <div className="mt-12 grid gap-6 sm:grid-cols-2">
          {workflow.map((item, index) => {
            const Icon = icons[item.icon];
            return (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, x: index % 2 === 0 ? -16 : 16 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.45, delay: index * 0.05 }}
                className="relative border-l border-primary/30 pl-5"
              >
                <div className="absolute -left-[9px] top-1 size-4 rounded-full border border-primary/50 bg-background">
                  <div className="absolute inset-1 rounded-full bg-primary" />
                </div>
                <div className="mb-2 flex items-center gap-2 text-primary">
                  <Icon className="size-4" />
                  <h3
                    className="text-lg tracking-tight text-foreground"
                    style={{ fontWeight: 650 }}
                  >
                    {item.title}
                  </h3>
                </div>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  {item.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
