"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowDownRight, FileText, MessageCircle, Sparkles } from "lucide-react";
import { site } from "@/lib/data";
import { useLanguage } from "@/context/language-context";

const codeLines = [
  { cls: "text-[#6e6e76]", text: "// app/Services/CobranzaSatService.php" },
  { cls: "text-[#f4f4f2]", text: "class CobranzaSatService {" },
  { cls: "text-[#a9bdd1]", text: "    public function conciliarSPEI(FacturaPPD $factura, Pago $pago): ReciboREP {" },
  { cls: "text-[#f4f4f2]", text: "        $this->validateIdempotency($factura->uuid, $pago->clave_rastreo);" },
  { cls: "text-[#99ff99]", text: "        $cfdi = $this->satClient->timbrarComplementoPago([" },
  { cls: "text-[#c6c6ce]", text: "            'uuid_origen' => $factura->uuid," },
  { cls: "text-[#c6c6ce]", text: "            'monto' => $pago->monto," },
  { cls: "text-[#c6c6ce]", text: "            'forma_pago' => FormasPago::SPEI" },
  { cls: "text-[#99ff99]", text: "        ]);" },
  { cls: "text-[#a9bdd1]", text: "        return ReciboREP::createFromSAT($cfdi);" },
  { cls: "text-[#f4f4f2]", text: "    }" },
  { cls: "text-[#f4f4f2]", text: "}" },
  { cls: "text-[#6e6e76]", text: "" },
  { cls: "text-[#6e6e76]", text: "// Dockerfile · PHP 8.3-fpm & Nginx Alpine" },
  { cls: "text-[#a9bdd1]", text: "FROM php:8.3-fpm-alpine AS production" },
  { cls: "text-[#99ff99]", text: "RUN docker-php-ext-install pdo pdo_mysql redis opcache" },
];

export function Hero() {
  const { lang, t } = useLanguage();
  const [typedLineIndex, setTypedLineIndex] = useState(codeLines.length);

  useEffect(() => {
    // Typewriter effect looping
    let current = 0;
    const interval = setInterval(() => {
      current++;
      if (current > codeLines.length) {
        current = codeLines.length;
      }
      setTypedLineIndex(current);
    }, 180);
    return () => clearInterval(interval);
  }, []);

  return (
    <section
      id="top"
      className="relative min-h-[100svh] flex flex-col justify-center items-center overflow-hidden pt-24 pb-16 sm:pt-28 sm:pb-24"
      style={{
        background:
          "radial-gradient(60% 50% at 50% 38%, rgba(153, 255, 153, 0.05), transparent 70%), linear-gradient(180deg, #000000 0%, #060608 55%, #1a1a20 130%)",
      }}
    >
      {/* Background repeating vertical grid lines */}
      <div
        className="pointer-events-none absolute inset-0 opacity-40"
        style={{
          backgroundImage:
            "repeating-linear-gradient(90deg, rgba(255, 255, 255, 0.035) 0 1px, transparent 1px 96px)",
          maskImage: "linear-gradient(180deg, transparent, #000 15%, #000 70%, transparent)",
          WebkitMaskImage: "linear-gradient(180deg, transparent, #000 15%, #000 70%, transparent)",
        }}
      />

      {/* 3D Floating Code Window (Desktop only - floating) estilo danhermes.dev */}
      <div
        className="hidden lg:block absolute -right-4 xl:right-2 bottom-12 w-[420px] xl:w-[440px] pointer-events-none z-10 hero-code-box rounded-xl overflow-hidden"
        aria-hidden="true"
      >
        <div className="flex items-center gap-2 px-3.5 py-2.5 bg-[#111116] border-b border-white/[0.06]">
          <span className="size-2 rounded-full bg-[#2e2e38]" />
          <span className="size-2 rounded-full bg-[#2e2e38]" />
          <span className="size-2 rounded-full bg-[#2e2e38]" />
          <span className="ml-2 font-mono text-[11px] text-[#6e6e76]">
            ~/federicomeza.dev
          </span>
          <span className="ml-auto text-[10px] font-mono text-[#99ff99] bg-[#99ff99]/10 px-1.5 py-0.5 rounded">
            prod
          </span>
        </div>
        <div className="p-4 font-mono text-[12px] leading-relaxed bg-[#0b0b0f]/95 min-h-[260px]">
          {codeLines.slice(0, typedLineIndex).map((line, i) => (
            <div key={i} className={line.cls}>
              {line.text}
            </div>
          ))}
          <span className="caret-pulse" />
        </div>
      </div>

      {/* Hero Content Container */}
      <div className="relative z-10 mx-auto w-full max-w-[1040px] px-4 sm:px-6 text-center">
        {/* Badge with pulsing neon green dot */}
        <div className="mb-6 sm:mb-8 inline-block max-w-full">
          <p className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/[0.03] border border-white/[0.08] text-[10px] sm:text-xs font-semibold uppercase tracking-[0.16em] sm:tracking-[0.32em] text-[#9a9aa2]">
            <span className="relative flex size-2 shrink-0">
              <span className="absolute inline-flex h-full w-full animate-pulse-dot rounded-full bg-[#99ff99] opacity-75" />
              <span className="relative inline-flex size-2 rounded-full bg-[#99ff99] shadow-[0_0_9px_rgba(153,255,153,0.7)]" />
            </span>
            <span className="truncate">{lang === "es" ? "Desarrollador web full stack & Líder Técnico" : "Senior Full Stack Engineer & Tech Lead"}</span>
          </p>
        </div>

        {/* Headline estilo danhermes.dev con tipografía grande y gradiente .dim */}
        <h1 className="text-3xl xs:text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-[-0.03em] sm:tracking-[-0.045em] leading-[1.06] sm:leading-[1.02] text-[#f4f4f2] text-balance">
          {lang === "es" ? (
            <>
              <span>Código que sostiene</span>
              <br />
              <span>sistemas </span>
              <span className="dim">críticos.</span>
            </>
          ) : (
            <>
              <span>Architecture behind</span>
              <br />
              <span>critical </span>
              <span className="dim">systems.</span>
            </>
          )}
        </h1>

        {/* Lead paragraph */}
        <p className="mt-5 sm:mt-8 max-w-[660px] mx-auto text-sm sm:text-base md:text-lg leading-relaxed text-[#9a9aa2] text-pretty px-2">
          {lang === "es"
            ? "Del diseño de arquitectura al servidor en producción. Laravel, Node.js, TypeScript y Angular bajo una sola responsabilidad técnica, para plataformas empresariales que no se pueden permitir fallar."
            : "From system architecture to production servers. Laravel, Node.js, TypeScript, and Angular under unified technical ownership, for enterprise platforms that cannot afford downtime."}
        </p>

        {/* Call to Action Buttons (Full width on mobile, inline on desktop) */}
        <div className="mt-8 sm:mt-10 flex flex-col sm:flex-row justify-center items-stretch sm:items-center gap-3 sm:gap-4 max-w-sm sm:max-w-none mx-auto">
          <a href="#contacto" className="btn-dh-light text-center justify-center">
            {lang === "es" ? "Hablemos de tu proyecto" : "Let's talk about your project"}
          </a>
          <a href="#proyectos" className="btn-dh-ghost text-center justify-center">
            {lang === "es" ? "Ver sistemas en vivo" : "Explore live systems"}
          </a>
          <Link href="/cv" className="btn-dh-ghost flex items-center justify-center gap-2">
            <FileText size={15} className="text-[#99ff99]" />
            <span>{lang === "es" ? "Ver CV Ejecutivo" : "Executive Resume"}</span>
          </Link>
        </div>

        {/* Mobile & Tablet Terminal Preview */}
        <div className="lg:hidden mt-8 max-w-[480px] mx-auto text-left rounded-xl overflow-hidden border border-white/[0.09] bg-[#0c0c10]/95 shadow-2xl">
          <div className="flex items-center gap-2 px-3 py-2 bg-[#111116] border-b border-white/[0.06]">
            <span className="size-2 rounded-full bg-[#2e2e38]" />
            <span className="size-2 rounded-full bg-[#2e2e38]" />
            <span className="size-2 rounded-full bg-[#2e2e38]" />
            <span className="ml-2 font-mono text-[10px] text-[#6e6e76]">
              ~/federicomeza.dev
            </span>
            <span className="ml-auto text-[9px] font-mono text-[#99ff99] bg-[#99ff99]/10 px-1.5 py-0.5 rounded">
              prod
            </span>
          </div>
          <div className="p-3.5 font-mono text-[11px] leading-relaxed bg-[#0b0b0f] max-h-[160px] overflow-hidden">
            {codeLines.slice(0, Math.min(typedLineIndex, 8)).map((line, i) => (
              <div key={i} className={`${line.cls} truncate`}>
                {line.text}
              </div>
            ))}
            <span className="caret-pulse" />
          </div>
        </div>

        {/* CTA Note */}
        <p className="mt-6 text-[11px] sm:text-xs text-[#6e6e76] font-mono tracking-normal sm:tracking-wide">
          26 Grados S.A. de C.V. · Administración de Servicios Start · SAT CFDI 4.0
        </p>
      </div>

      {/* Vertical Scroll Cue estilo danhermes.dev */}
      <a
        href="#marcas-strip"
        className="hidden md:flex absolute bottom-8 inset-x-0 mx-auto w-max flex-col items-center gap-3 text-[11px] font-semibold tracking-[0.3em] uppercase text-[#6e6e76] hover:text-[#f4f4f2] transition-colors"
      >
        <span>{lang === "es" ? "Desliza" : "Scroll"}</span>
        <i className="relative w-px h-16 bg-white/10 overflow-hidden">
          <span className="absolute left-0 top-0 w-px h-6 bg-[#f4f4f2] animate-cue-run" />
        </i>
      </a>
    </section>
  );
}
