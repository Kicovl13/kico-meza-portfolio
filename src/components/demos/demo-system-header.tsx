"use client";

import { useState } from "react";
import Link from "next/link";
import {
  AlertCircle,
  ArrowLeft,
  ArrowRight,
  Check,
  CheckCircle2,
  ChevronDown,
  ChevronUp,
  Cpu,
  ExternalLink,
  FileText,
  HelpCircle,
  Info,
  Layers,
  Play,
  Share2,
  Sparkles,
  UserCheck,
  X,
} from "lucide-react";
import { type MvcShowcase } from "@/lib/data";

interface DemoSystemHeaderProps {
  project: MvcShowcase;
  activeTabLabel?: string;
}

export function DemoSystemHeader({ project, activeTabLabel }: DemoSystemHeaderProps) {
  const [showDrawer, setShowDrawer] = useState(false);
  const [showHintBanner, setShowHintBanner] = useState(true);

  return (
    <>
      {/* Top Application Bar */}
      <header className="sticky top-0 z-40 border-b border-white/[0.08] bg-[#060608]/95 backdrop-blur-md">
        <div className="mx-auto flex h-14 sm:h-16 max-w-7xl items-center justify-between px-3 sm:px-6">
          {/* Left: Back & Identity */}
          <div className="flex items-center gap-2 sm:gap-4 min-w-0">
            <Link
              href="/demos"
              className="inline-flex items-center gap-1.5 rounded-lg border border-white/[0.1] bg-white/[0.03] px-2.5 py-1 text-xs font-mono text-[#9a9aa2] hover:border-white/[0.2] hover:text-[#f4f4f2] transition shrink-0"
              title="Volver al catálogo de demos"
            >
              <ArrowLeft size={13} />
              <span className="hidden sm:inline">Demos</span>
            </Link>

            <div className="h-4 w-px bg-white/[0.1] hidden sm:block" />

            <div className="min-w-0">
              <div className="flex items-center gap-2">
                <span
                  className="size-2 rounded-full animate-pulse shrink-0"
                  style={{ backgroundColor: project.brandTheme.primary }}
                />
                <h1 className="text-xs sm:text-sm font-bold text-[#f4f4f2] truncate">
                  {project.title}
                </h1>
              </div>
              <p className="font-mono text-[10px] text-[#6e6e76] truncate hidden md:block">
                {project.category} · {project.stack.slice(0, 3).join(", ")}
              </p>
            </div>
          </div>

          {/* Right: Status & Ficha Técnica Drawer Trigger */}
          <div className="flex items-center gap-2 shrink-0">
            {/* System Status Pill */}
            <span
              className={`hidden lg:inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-mono font-semibold border ${project.brandTheme.badge}`}
            >
              <span>{project.systemStatus}</span>
            </span>

            {/* Ficha Técnica Trigger Button */}
            <button
              type="button"
              onClick={() => setShowDrawer(true)}
              className="inline-flex items-center gap-1.5 rounded-xl border border-[#99ff99]/30 bg-[#99ff99]/10 px-3 py-1.5 text-xs font-bold text-[#99ff99] hover:bg-[#99ff99]/20 transition shadow-[0_0_15px_rgba(153,255,153,0.15)] cursor-pointer"
            >
              <FileText size={13} />
              <span>Ficha Técnica (5 Puntos)</span>
            </button>

            {/* Link to portfolio */}
            <Link
              href="/"
              className="hidden sm:inline-flex items-center gap-1 rounded-lg border border-white/[0.08] px-2.5 py-1.5 text-xs text-[#9a9aa2] hover:text-[#f4f4f2] transition"
              title="Portafolio de Federico Meza"
            >
              <span>FEDERICOMEZA.DEV</span>
            </Link>
          </div>
        </div>

        {/* Quick Recruiter Hint Bar */}
        {showHintBanner && (
          <div className="border-t border-white/[0.05] bg-gradient-to-r from-white/[0.02] via-white/[0.04] to-white/[0.02] px-3 sm:px-6 py-2 text-xs">
            <div className="mx-auto max-w-7xl flex items-center justify-between gap-3">
              <div className="flex items-center gap-2 min-w-0">
                <span className="flex size-4 items-center justify-center rounded-full bg-[#99ff99]/20 text-[#99ff99] font-mono text-[10px] shrink-0">
                  i
                </span>
                <p className="text-[11px] sm:text-xs text-[#c6c6ce] truncate">
                  <strong className="text-[#f4f4f2]">Guía de prueba:</strong>{" "}
                  {project.projectPresentation.interactiveGuide[0]}
                </p>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <button
                  type="button"
                  onClick={() => setShowDrawer(true)}
                  className="text-[11px] font-semibold text-[#99ff99] hover:underline"
                >
                  Ver qué probar (4 pasos) →
                </button>
                <button
                  type="button"
                  onClick={() => setShowHintBanner(false)}
                  className="text-[#6e6e76] hover:text-[#f4f4f2] p-0.5"
                  aria-label="Ocultar aviso"
                >
                  <X size={12} />
                </button>
              </div>
            </div>
          </div>
        )}
      </header>

      {/* Slide-over Drawer: Ficha Técnica (Los 5 Puntos) */}
      {showDrawer && (
        <div className="fixed inset-0 z-50 flex justify-end">
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black/80 backdrop-blur-sm transition-opacity"
            onClick={() => setShowDrawer(false)}
          />

          {/* Drawer Panel */}
          <div className="relative z-10 w-full max-w-xl bg-[#0b0c10] border-l border-white/[0.12] shadow-2xl h-full flex flex-col overflow-hidden animate-in slide-in-from-right duration-300">
            {/* Header */}
            <div className="p-5 sm:p-6 border-b border-white/[0.08] flex items-center justify-between">
              <div>
                <div className="flex items-center gap-2">
                  <span
                    className="size-2 rounded-full"
                    style={{ backgroundColor: project.brandTheme.primary }}
                  />
                  <span className="font-mono text-[11px] uppercase tracking-wider text-[#9a9aa2]">
                    Ficha Técnica & Arquitectura
                  </span>
                </div>
                <h2 className="text-lg sm:text-xl font-bold text-[#f4f4f2] mt-1">
                  {project.title}
                </h2>
              </div>

              <button
                type="button"
                onClick={() => setShowDrawer(false)}
                className="size-8 rounded-lg border border-white/[0.1] flex items-center justify-center text-[#9a9aa2] hover:text-[#f4f4f2] hover:bg-white/[0.05] transition"
              >
                <X size={16} />
              </button>
            </div>

            {/* Scrollable Content: The 5 Requested Dimensions */}
            <div className="flex-1 overflow-y-auto p-5 sm:p-6 space-y-6 scrollbar-thin">
              {/* Status Badge */}
              <div className="flex items-center justify-between p-3 rounded-xl border border-white/[0.08] bg-white/[0.02]">
                <span className="text-xs font-mono text-[#9a9aa2]">Estado del software:</span>
                <span
                  className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-mono font-semibold border ${project.brandTheme.badge}`}
                >
                  <span className="size-1.5 rounded-full bg-current animate-pulse" />
                  <span>{project.systemStatus}</span>
                </span>
              </div>

              {/* 1. Qué problema resuelve */}
              <div className="rounded-xl border border-amber-500/20 bg-amber-500/[0.04] p-4 sm:p-5">
                <div className="flex items-center gap-2 text-amber-400 mb-2">
                  <AlertCircle size={16} className="shrink-0" />
                  <h3 className="text-xs font-mono font-bold tracking-wider uppercase">
                    1. ¿Qué problema resuelve?
                  </h3>
                </div>
                <p className="text-xs sm:text-sm text-[#f4f4f2]/90 leading-relaxed">
                  {project.projectPresentation.problem}
                </p>
              </div>

              {/* 2. Qué hace el sistema */}
              <div className="rounded-xl border border-white/[0.08] bg-white/[0.02] p-4 sm:p-5">
                <div className="flex items-center gap-2 text-[#f4f4f2] mb-2">
                  <CheckCircle2 size={16} className="text-[#99ff99] shrink-0" />
                  <h3 className="text-xs font-mono font-bold tracking-wider uppercase text-[#9a9aa2]">
                    2. ¿Qué hace el sistema y cómo opera?
                  </h3>
                </div>
                <p className="text-xs sm:text-sm text-[#c6c6ce] leading-relaxed">
                  {project.projectPresentation.overview}
                </p>

                <div className="mt-3 space-y-1.5 pt-3 border-t border-white/[0.06]">
                  {project.keyFeatures.map((feat) => (
                    <div key={feat} className="flex items-start gap-2 text-xs text-[#9a9aa2]">
                      <span className="text-[#99ff99] font-bold">•</span>
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* 3. Qué tecnologías utiliza */}
              <div className="rounded-xl border border-white/[0.08] bg-white/[0.02] p-4 sm:p-5">
                <div className="flex items-center gap-2 text-[#f4f4f2] mb-2">
                  <Cpu size={16} className="text-[#38bdf8] shrink-0" />
                  <h3 className="text-xs font-mono font-bold tracking-wider uppercase text-[#9a9aa2]">
                    3. ¿Qué tecnologías utiliza?
                  </h3>
                </div>
                <p className="text-xs sm:text-sm text-[#c6c6ce] leading-relaxed mb-3">
                  {project.projectPresentation.techArchitecture}
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {project.stack.map((t) => (
                    <span
                      key={t}
                      className="px-2.5 py-0.5 rounded-full text-[11px] font-mono text-[#9a9aa2] border border-white/[0.08] bg-white/[0.03]"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              {/* 4. Qué responsabilidad tuviste en su desarrollo */}
              <div className="rounded-xl border border-sky-500/20 bg-sky-500/[0.04] p-4 sm:p-5">
                <div className="flex items-center gap-2 text-sky-400 mb-2">
                  <UserCheck size={16} className="shrink-0" />
                  <h3 className="text-xs font-mono font-bold tracking-wider uppercase">
                    4. ¿Qué responsabilidad tuvo Federico Meza?
                  </h3>
                </div>
                <p className="text-xs sm:text-sm text-[#f4f4f2]/95 leading-relaxed font-medium">
                  {project.projectPresentation.myRole}
                </p>
              </div>

              {/* 5. Qué funcionalidades puede probar el visitante */}
              <div className="rounded-xl border border-[#99ff99]/20 bg-[#99ff99]/[0.03] p-4 sm:p-5">
                <div className="flex items-center justify-between gap-2 text-[#99ff99] mb-3">
                  <div className="flex items-center gap-2">
                    <Play size={16} className="shrink-0" />
                    <h3 className="text-xs font-mono font-bold tracking-wider uppercase">
                      5. ¿Qué funcionalidades puedes probar aquí?
                    </h3>
                  </div>
                  <span className="text-[10px] font-mono text-[#99ff99]/70">Paso a paso</span>
                </div>

                <div className="space-y-2.5">
                  {project.projectPresentation.interactiveGuide.map((step, idx) => (
                    <div
                      key={step}
                      className="flex items-start gap-3 rounded-lg border border-[#99ff99]/10 bg-black/40 p-2.5 text-xs text-[#f4f4f2]"
                    >
                      <span className="flex size-5 shrink-0 items-center justify-center rounded-full bg-[#99ff99]/20 font-mono text-[10px] font-bold text-[#99ff99]">
                        {idx + 1}
                      </span>
                      <span className="leading-relaxed">{step}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Drawer Footer */}
            <div className="p-4 sm:p-5 border-t border-white/[0.08] bg-[#060608] flex items-center justify-between gap-3">
              <span className="font-mono text-[11px] text-[#6e6e76]">
                Demostración con datos ficticios.
              </span>
              <button
                type="button"
                onClick={() => setShowDrawer(false)}
                className="btn-dh-light btn-dh-sm text-xs font-bold"
              >
                Cerrar e interactuar
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
