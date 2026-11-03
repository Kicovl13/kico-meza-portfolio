"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  Building2,
  CheckCircle2,
  Cpu,
  ExternalLink,
  FileText,
  Landmark,
  LayoutGrid,
  MessageCircle,
  Play,
  Scale,
  Sparkles,
  UserCheck,
  Users,
  Zap,
} from "lucide-react";
import Link from "next/link";
import { mvcShowcases, type MvcShowcase } from "@/lib/data";

const iconMap: Record<string, any> = {
  "cobranza-b2b": Landmark,
  "bot-whatsapp-citas": MessageCircle,
  "despacho-legal": Scale,
  "sysadministrador": Users,
  "leex-saas": Building2,
  "rootwork": LayoutGrid,
};

export default function DemosIndex() {
  const [filter, setFilter] = useState<string>("all");

  const filtered = mvcShowcases.filter((s) => {
    if (filter === "all") return true;
    if (filter === "produccion") return s.statusType === "produccion";
    if (filter === "mvp") return s.statusType === "mvp";
    if (filter === "laravel") return s.stack.some((x) => x.toLowerCase().includes("laravel"));
    if (filter === "node") return s.stack.some((x) => x.toLowerCase().includes("node"));
    return true;
  });

  return (
    <div className="min-h-screen bg-[#060608] text-[#f4f4f2] selection:bg-[#99ff99]/30 selection:text-[#99ff99]">
      {/* Top Application Header */}
      <header className="sticky top-0 z-50 border-b border-white/[0.08] bg-[#060608]/95 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-xs font-mono text-[#9a9aa2] hover:text-[#f4f4f2] transition py-1 px-2.5 rounded-lg border border-white/[0.1] bg-white/[0.03]"
            >
              <ArrowLeft size={14} />
              <span>Portafolio Principal</span>
            </Link>
            <div className="h-4 w-px bg-white/[0.12]" />
            <div className="flex items-center gap-2">
              <Sparkles size={14} className="text-[#99ff99]" />
              <span className="text-xs sm:text-sm font-bold tracking-tight text-[#f4f4f2]">
                Catálogo de Sistemas & Demos
              </span>
            </div>
          </div>

          <Link
            href="/cv"
            className="hidden sm:inline-flex items-center gap-1.5 text-xs font-mono text-[#a9bdd1] hover:text-white transition"
          >
            <FileText size={13} className="text-[#99ff99]" />
            <span>Ver CV Ejecutivo (PDF)</span>
          </Link>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-12 sm:py-16">
        {/* Hero Section */}
        <div className="max-w-3xl mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full mb-4 text-xs font-mono font-medium border border-[#99ff99]/30 bg-[#99ff99]/10 text-[#99ff99]">
            <span className="size-1.5 rounded-full bg-[#99ff99] animate-pulse" />
            <span>Demostraciones Interactivas de Software</span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[#f4f4f2] leading-[1.12]">
            Sistemas reales con flujos de producción,{" "}
            <span className="text-[#9a9aa2]">no solo pantallas de prueba.</span>
          </h1>
          <p className="mt-4 text-sm sm:text-base leading-relaxed text-[#9a9aa2]">
            Cada sistema a continuación representa una arquitectura construida para resolver un problema de negocio real: conciliación fiscal SAT, cálculo de nómina de ley, expedientes judiciales con términos por días hábiles, arrendamiento inmobiliario multi-tenant y bots desatendidos con NLP.
          </p>

          {/* Filter Pills */}
          <div className="mt-8 flex items-center gap-2 overflow-x-auto no-scrollbar pb-2">
            {[
              { id: "all", label: "Todos los Sistemas" },
              { id: "produccion", label: "Sistemas en Producción" },
              { id: "mvp", label: "MVPs & Prototipos" },
              { id: "laravel", label: "Laravel & PHP" },
              { id: "node", label: "Node.js & TS" },
            ].map((tab) => (
              <button
                key={tab.id}
                type="button"
                onClick={() => setFilter(tab.id)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-mono transition cursor-pointer whitespace-nowrap shrink-0 ${
                  filter === tab.id
                    ? "bg-[#f4f4f2] text-[#060608] font-bold"
                    : "text-[#9a9aa2] border border-white/[0.1] bg-white/[0.02] hover:text-[#f4f4f2] hover:border-white/[0.2]"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Systems Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((showcase) => {
            const Icon = iconMap[showcase.id] || Sparkles;
            return (
              <article
                key={showcase.id}
                className="glass-dh p-6 sm:p-7 flex flex-col justify-between transition-all duration-300 hover:-translate-y-1 hover:border-white/[0.22] group relative overflow-hidden"
              >
                {/* Accent top gradient glow */}
                <div
                  className="absolute top-0 inset-x-0 h-1 opacity-80"
                  style={{ backgroundColor: showcase.brandTheme.primary }}
                />

                <div>
                  {/* Category & Status */}
                  <div className="flex items-center justify-between gap-2 mb-4">
                    <span className="font-mono text-[10px] uppercase font-bold tracking-wider text-[#99ff99]">
                      {showcase.category}
                    </span>
                    <span
                      className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[10px] font-mono border ${showcase.brandTheme.badge}`}
                    >
                      <span className="size-1 rounded-full bg-current animate-pulse" />
                      <span>{showcase.systemStatus.split("·")[0]}</span>
                    </span>
                  </div>

                  {/* Icon & Title */}
                  <div className="flex items-start gap-3 mb-3">
                    <div
                      className="size-10 rounded-xl flex items-center justify-center shrink-0 border border-white/[0.1] bg-white/[0.03]"
                      style={{ color: showcase.brandTheme.primary }}
                    >
                      <Icon size={20} />
                    </div>
                    <div>
                      <h2 className="text-lg font-bold text-[#f4f4f2] leading-snug group-hover:text-white transition">
                        {showcase.title}
                      </h2>
                      <p className="font-mono text-[11px] text-[#a9bdd1] mt-0.5">
                        {showcase.tagline.split("con")[0]}
                      </p>
                    </div>
                  </div>

                  {/* Federico's Role Badge */}
                  <div className="mb-4 inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-[#a9bdd1]/10 border border-[#a9bdd1]/20 text-[11px] font-mono text-[#a9bdd1]">
                    <UserCheck size={12} className="text-[#99ff99]" />
                    <span className="font-semibold text-[#f4f4f2] truncate">
                      {showcase.projectPresentation.myRole.split(":")[0]}
                    </span>
                  </div>

                  {/* 1. Problema que resuelve */}
                  <div className="mb-4 rounded-xl border border-white/[0.06] bg-white/[0.02] p-3 text-xs leading-relaxed">
                    <span className="font-mono text-[10px] uppercase font-bold text-amber-400 block mb-1">
                      1. Problema que resuelve:
                    </span>
                    <p className="text-[#9a9aa2] line-clamp-3">
                      {showcase.projectPresentation.problem}
                    </p>
                  </div>

                  {/* 5. Qué puedes probar */}
                  <div className="mb-4 rounded-xl border border-[#99ff99]/15 bg-[#99ff99]/[0.02] p-3 text-xs leading-relaxed">
                    <span className="font-mono text-[10px] uppercase font-bold text-[#99ff99] block mb-1 flex items-center gap-1">
                      <Play size={10} />
                      <span>Qué probar en el demo:</span>
                    </span>
                    <p className="text-[#c6c6ce] line-clamp-2">
                      {showcase.projectPresentation.interactiveGuide[0]}
                    </p>
                  </div>

                  {/* Key Metrics */}
                  <div className="grid grid-cols-3 gap-1.5 p-2 rounded-lg bg-black/40 border border-white/[0.06] text-center mb-4">
                    {showcase.metrics.map((m) => (
                      <div key={m.label}>
                        <p className="font-mono text-xs font-bold text-[#f4f4f2]">{m.value}</p>
                        <p className="text-[9px] text-[#6e6e76] truncate">{m.label}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Footer with Stack and Primary CTA */}
                <div className="pt-4 border-t border-white/[0.08] flex items-center justify-between gap-3">
                  <div className="flex flex-wrap gap-1">
                    {showcase.stack.slice(0, 2).map((s) => (
                      <span
                        key={s}
                        className="text-[10px] font-mono px-2 py-0.5 rounded bg-white/[0.03] border border-white/[0.08] text-[#9a9aa2]"
                      >
                        {s}
                      </span>
                    ))}
                  </div>

                  <Link
                    href={showcase.demoUrl}
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-[#99ff99] hover:text-white transition group-hover:translate-x-0.5 shrink-0"
                  >
                    <span>Probar Demo</span>
                    <ArrowRight size={13} />
                  </Link>
                </div>
              </article>
            );
          })}
        </div>

        {/* Recruiter Assurance Note */}
        <div className="mt-16 p-6 rounded-2xl border border-white/[0.08] bg-white/[0.02] text-center max-w-2xl mx-auto">
          <p className="text-xs sm:text-sm text-[#9a9aa2] leading-relaxed">
            <strong className="text-[#f4f4f2]">Nota de confidencialidad y datos:</strong> Todas las demostraciones emplean información simulada con personas morales y físicas ficticias. Ningún dato real de clientes, sellos privados o RFCs reales se exponen en este entorno.
          </p>
        </div>
      </main>
    </div>
  );
}
