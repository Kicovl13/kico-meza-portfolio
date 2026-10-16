"use client";

import { motion } from "framer-motion";
import { ArrowDownRight, Mail } from "lucide-react";
import { heroStack, site } from "@/lib/data";
import { Button } from "@/components/ui/button";

export function Hero() {
  return (
    <section
      id="top"
      className="relative flex min-h-[100svh] flex-col justify-end overflow-hidden pb-16 pt-28 sm:pb-20 sm:pt-32"
    >
      <div className="pointer-events-none absolute inset-0 grid-atmosphere" />
      <div className="pointer-events-none absolute inset-0 dot-pattern opacity-40" />
      <div className="pointer-events-none absolute -left-24 top-1/3 h-72 w-72 rounded-full bg-primary/20 blur-3xl" />
      <div className="pointer-events-none absolute -right-16 top-24 h-80 w-80 rounded-full bg-primary/10 blur-3xl" />

      <div className="relative mx-auto w-full max-w-6xl px-4 sm:px-6">
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-4 font-mono text-xs uppercase tracking-[0.24em] text-primary sm:text-sm"
        >
          {site.role}
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, delay: 0.08 }}
          className="max-w-4xl text-balance text-5xl font-800 leading-[0.95] tracking-tight text-foreground sm:text-6xl md:text-7xl lg:text-8xl"
          style={{ fontWeight: 800 }}
        >
          {site.headline}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.2 }}
          className="mt-6 max-w-2xl text-pretty text-base leading-relaxed text-muted-foreground sm:text-lg"
        >
          {site.subtitle}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.32 }}
          className="mt-8 flex flex-wrap items-center gap-3"
        >
          <Button
            size="lg"
            className="h-11 px-5 text-sm"
            nativeButton={false}
            render={<a href="#projects" />}
          >
            View Work / Projects
            <ArrowDownRight data-icon="inline-end" />
          </Button>
          <Button
            variant="outline"
            size="lg"
            className="h-11 border-border/80 bg-background/30 px-5 text-sm backdrop-blur-sm"
            nativeButton={false}
            render={<a href="#contact" />}
          >
            <Mail data-icon="inline-start" />
            Contact Me
          </Button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.45 }}
          className="mt-10 flex flex-wrap gap-2"
        >
          {heroStack.map((tech, i) => (
            <motion.span
              key={tech}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, delay: 0.5 + i * 0.05 }}
              className="rounded-full border border-primary/25 bg-primary/10 px-3 py-1.5 font-mono text-xs text-primary"
            >
              {tech}
            </motion.span>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
