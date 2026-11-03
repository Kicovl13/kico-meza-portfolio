"use client";

import Link from "next/link";
import { site } from "@/lib/data";
import { useLanguage } from "@/context/language-context";

export function Footer() {
  const { lang } = useLanguage();

  return (
    <footer className="border-t border-white/[0.08] bg-[#060608] py-10 sm:py-16 text-sm text-[#9a9aa2]">
      <div className="wrap">
        <div className="flex flex-col md:flex-row md:items-start justify-between gap-8 sm:gap-10 pb-8 sm:pb-12 border-b border-white/[0.08]">
          <div>
            <a
              href="#top"
              className="text-base font-bold tracking-[0.08em] uppercase text-[#f4f4f2] inline-block mb-2"
            >
              FEDERICOMEZA<b className="text-[#99ff99]">.</b>DEV
            </a>
            <p className="text-xs sm:text-sm text-[#6e6e76] max-w-sm">
              {lang === "es"
                ? "Senior Software Engineer & Tech Lead · Arquitectura backend, bases de datos transaccionales y plataformas críticas."
                : "Senior Software Engineer & Tech Lead · Backend architecture, transactional data & mission-critical systems."}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:flex md:flex-row gap-3 sm:gap-6 lg:gap-10 text-xs sm:text-sm font-mono text-[#c6c6ce]">
            <a href={`mailto:${site.email}`} className="hover:text-[#f4f4f2] transition-colors truncate">
              {site.email}
            </a>
            <a
              href={site.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[#99ff99] transition-colors"
            >
              WhatsApp · {site.phone}
            </a>
            <a
              href={site.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[#f4f4f2] transition-colors"
            >
              LinkedIn
            </a>
            <a
              href={site.github}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[#f4f4f2] transition-colors"
            >
              GitHub
            </a>
          </div>
        </div>

        {/* Legal Disclaimer & Copyright estilo danhermes.dev */}
        <p className="mt-6 sm:mt-8 text-[11px] leading-relaxed text-[#6e6e76]">
          {lang === "es"
            ? "Las marcas, dependencias y nombres comerciales mencionados pertenecen a sus respectivos titulares. Se mencionan únicamente como referencia técnica de sistemas y proyectos en los que he participado profesionalmente."
            : "All trademarks and brand names referenced belong to their respective owners. They are mentioned solely as technical reference of systems engineered in production."}
        </p>

        <div className="mt-6 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs text-[#6e6e76]">
          <span>© 2026 FEDERICOMEZA.DEV · {lang === "es" ? "Todos los derechos reservados." : "All rights reserved."}</span>
          <span className="font-mono text-[#99ff99]">
            {lang === "es" ? "Arquitectura sólida, línea por línea." : "Solid architecture, line by line."}
          </span>
        </div>
      </div>
    </footer>
  );
}
