"use client";

import { useLanguage } from "@/context/language-context";

const items = [
  "26 Grados S.A. de C.V.",
  "Administración de Servicios Start",
  "Administración de Integrantes",
  "SAT CFDI 4.0 & Anexo 20",
  "Informix 4GL Zero-Downtime Migration",
  "Laravel 13 & PHP 8.3",
  "MySQL 8.4 LTS Relational Core",
  "Angular 20 & TypeScript",
  "Docker & Linux Server Administration",
  "Google Cybersecurity Professional",
  "Cobranza B2B & Conciliación PPD/REP",
  "SysAdministrador ERP Enterprise",
  "Leex SaaS PropTech",
  "LegalFlow Despacho Jurídico",
  "RootWork Project Tracker",
];

export function MarqueeStrip() {
  const { lang } = useLanguage();

  return (
    <div
      id="marcas-strip"
      className="border-y border-white/[0.08] bg-[#0a0a0c] py-3.5 sm:py-5 overflow-hidden relative"
      aria-label={lang === "es" ? "Empresas y tecnologías clave" : "Key companies and technologies"}
      style={{
        maskImage:
          "linear-gradient(90deg, transparent 0%, #000 6%, #000 94%, transparent 100%)",
        WebkitMaskImage:
          "linear-gradient(90deg, transparent 0%, #000 6%, #000 94%, transparent 100%)",
      }}
    >
      <div className="animate-marquee flex items-center">
        {/* First track */}
        <div className="flex items-center shrink-0">
          {items.map((item, i) => (
            <span
              key={`a-${i}`}
              className="flex items-center gap-4 sm:gap-6 px-4 sm:px-8 text-xs sm:text-sm font-semibold tracking-[0.06em] sm:tracking-[0.08em] uppercase text-[#9a9aa2] whitespace-nowrap"
            >
              <span>{item}</span>
              <span className="size-1 rounded-full bg-[#2e2e38] ml-2 sm:ml-4" />
            </span>
          ))}
        </div>
        {/* Duplicated track for infinite seamless loop */}
        <div className="flex items-center shrink-0" aria-hidden="true">
          {items.map((item, i) => (
            <span
              key={`b-${i}`}
              className="flex items-center gap-4 sm:gap-6 px-4 sm:px-8 text-xs sm:text-sm font-semibold tracking-[0.06em] sm:tracking-[0.08em] uppercase text-[#9a9aa2] whitespace-nowrap"
            >
              <span>{item}</span>
              <span className="size-1 rounded-full bg-[#2e2e38] ml-2 sm:ml-4" />
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
