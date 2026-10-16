"use client";

import { FormEvent, useState } from "react";
import { motion } from "framer-motion";
import { FolderGit2, Link2, Mail, Send } from "lucide-react";
import { site } from "@/lib/data";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export function Contact() {
  const [status, setStatus] = useState<"idle" | "sent">("idle");

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    const name = String(data.get("name") || "").trim();
    const email = String(data.get("email") || "").trim();
    const message = String(data.get("message") || "").trim();

    const subject = encodeURIComponent(`Portfolio inquiry from ${name || "visitor"}`);
    const body = encodeURIComponent(
      `Name: ${name}\nEmail: ${email}\n\n${message}`,
    );
    window.location.href = `mailto:${site.email}?subject=${subject}&body=${body}`;
    setStatus("sent");
    form.reset();
  }

  return (
    <section id="contact" className="relative scroll-mt-24 py-20 sm:py-28">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-border to-transparent" />
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="grid gap-12 lg:grid-cols-[1fr_1.1fr]">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.45 }}
          >
            <p className="font-mono text-xs uppercase tracking-[0.2em] text-primary">
              Contact
            </p>
            <h2
              className="mt-3 text-3xl tracking-tight text-foreground sm:text-4xl"
              style={{ fontWeight: 700 }}
            >
              Let&apos;s build something solid
            </h2>
            <p className="mt-3 max-w-md text-muted-foreground">
              Open to backend systems, full-stack product work, and automation
              projects. Reach out directly or use the form — it opens your email
              client, no backend required.
            </p>

            <div className="mt-8 flex flex-col gap-3">
              <a
                href={`mailto:${site.email}`}
                className="inline-flex items-center gap-3 rounded-xl border border-border/70 bg-card/40 px-4 py-3 text-sm text-foreground transition-colors hover:border-primary/40"
              >
                <Mail className="size-4 text-primary" />
                {site.email}
              </a>
              <a
                href={site.github}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 rounded-xl border border-border/70 bg-card/40 px-4 py-3 text-sm text-foreground transition-colors hover:border-primary/40"
              >
                <FolderGit2 className="size-4 text-primary" />
                GitHub
              </a>
              <a
                href={site.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 rounded-xl border border-border/70 bg-card/40 px-4 py-3 text-sm text-foreground transition-colors hover:border-primary/40"
              >
                <Link2 className="size-4 text-primary" />
                LinkedIn
              </a>
            </div>
          </motion.div>

          <motion.form
            onSubmit={onSubmit}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.5, delay: 0.08 }}
            className="glass rounded-2xl p-6 sm:p-8"
          >
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  name="name"
                  placeholder="Your name"
                  required
                  className="h-10 bg-background/40"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="you@company.com"
                  required
                  className="h-10 bg-background/40"
                />
              </div>
            </div>
            <div className="mt-4 space-y-2">
              <Label htmlFor="message">Message</Label>
              <Textarea
                id="message"
                name="message"
                placeholder="What are you building?"
                required
                rows={5}
                className="resize-none bg-background/40"
              />
            </div>
            <div className="mt-5 flex flex-wrap items-center gap-3">
              <Button type="submit" size="lg" className="h-11 px-5">
                Send message
                <Send data-icon="inline-end" />
              </Button>
              {status === "sent" && (
                <p className="text-sm text-primary">
                  Opening your mail client…
                </p>
              )}
            </div>
          </motion.form>
        </div>
      </div>
    </section>
  );
}
