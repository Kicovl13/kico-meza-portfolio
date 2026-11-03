"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Globe, Mail, MapPin, Phone, Printer, ShieldCheck } from "lucide-react";
import { site, experience, education, extras, heroStack, mvcShowcases } from "@/lib/data";
import { useLanguage } from "@/context/language-context";

export function CvContent() {
  const { lang, toggleLang, t } = useLanguage();

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="min-h-screen bg-[#060608] text-[#f4f4f2] py-8 px-4 sm:px-6 font-sans print:bg-white print:text-black print:p-0">
      {/* Top Action Bar (Hidden when printing) */}
      <div className="max-w-4xl mx-auto mb-6 flex flex-wrap items-center justify-between gap-3 print:hidden">
        <Link
          href="/"
          className="btn-dh-ghost btn-dh-sm flex items-center gap-2 text-xs"
        >
          <ArrowLeft size={14} />
          <span>{t.cv.backToPortfolio}</span>
        </Link>

        <div className="flex items-center gap-2">
          {/* Language Switcher */}
          <button
            type="button"
            onClick={toggleLang}
            className="btn-dh-ghost btn-dh-sm flex items-center gap-2 text-xs cursor-pointer font-mono"
            title="Toggle Language (ES / EN)"
          >
            <Globe size={14} className="text-[#99ff99]" />
            <span>{lang === "es" ? "English Version" : "Versión en Español"}</span>
          </button>

          {/* Print Button */}
          <button
            onClick={handlePrint}
            className="btn-dh-light btn-dh-sm flex items-center gap-2 text-xs font-bold cursor-pointer"
          >
            <Printer size={14} />
            <span>{t.cv.printPdf}</span>
          </button>
        </div>
      </div>

      {/* Main Resume Sheet */}
      <main className="max-w-4xl mx-auto bg-[#0d0d12] border border-white/[0.1] rounded-2xl sm:rounded-3xl p-5 sm:p-12 shadow-2xl print:border-none print:shadow-none print:p-6 print:bg-white print:text-black">
        {/* Header with Photo Avatar */}
        <header className="border-b border-white/[0.1] print:border-slate-300 pb-6 mb-6">
          <div className="flex flex-col sm:flex-row sm:items-center gap-6">
            {/* Executive Portrait */}
            <div className="relative size-24 sm:size-28 rounded-2xl overflow-hidden border border-white/[0.16] print:border-slate-400 shrink-0 shadow-md bg-[#060608]">
              <Image
                src="/federico-meza.png"
                alt="Ing. Federico de Jesús Meza Ramos"
                fill
                priority
                className="object-cover object-top"
              />
            </div>

            <div className="flex-1">
              <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1">
                <h1 className="text-2xl sm:text-3xl font-extrabold text-[#f4f4f2] print:text-black tracking-tight">
                  Federico de Jesús Meza Ramos
                </h1>
                <p className="font-mono text-xs text-[#9a9aa2] print:text-slate-600">
                  {t.cv.locationYears}
                </p>
              </div>

              <p className="text-sm sm:text-base font-semibold text-[#99ff99] print:text-slate-700 mt-1">
                {t.cv.role}
              </p>

              <div className="mt-3 flex flex-wrap gap-x-4 gap-y-2 text-xs font-mono text-[#9a9aa2] print:text-slate-700">
                <span className="flex items-center gap-1.5">
                  <Mail className="size-3.5 text-[#99ff99] print:text-slate-600" />
                  {site.email}
                </span>
                <span className="flex items-center gap-1.5">
                  <Phone className="size-3.5 text-[#99ff99] print:text-slate-600" />
                  {site.phone}
                </span>
                <a
                  href={site.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#99ff99] hover:underline print:text-slate-800"
                >
                  LinkedIn
                </a>
                <a
                  href={site.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#99ff99] hover:underline print:text-slate-800"
                >
                  GitHub
                </a>
              </div>
            </div>
          </div>
        </header>

        {/* Perfil Profesional */}
        <section className="mb-6">
          <h2 className="text-xs font-mono uppercase tracking-wider text-[#99ff99] print:text-slate-800 font-bold mb-2">
            {t.cv.profileTitle}
          </h2>
          <p className="text-xs sm:text-sm text-[#c6c6ce] print:text-slate-800 leading-relaxed">
            {t.cv.profileText}
          </p>
        </section>

        {/* Competencias Técnicas Clave */}
        <section className="mb-6">
          <h2 className="text-xs font-mono uppercase tracking-wider text-[#99ff99] print:text-slate-800 font-bold mb-2">
            {t.cv.skillsTitle}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-[#c6c6ce] print:text-slate-800 font-mono">
            <div className="bg-white/[0.02] print:bg-slate-50 p-3 rounded-xl border border-white/[0.08] print:border-slate-300">
              <strong className="text-[#f4f4f2] print:text-black block mb-1">
                {lang === "es" ? "Backend & Arquitectura:" : "Backend & Architecture:"}
              </strong>
              PHP (Laravel 11/13), Node.js, TypeScript, Express, REST APIs, Microservicios, Colas Redis, Facturación SAT CFDI 4.0.
            </div>
            <div className="bg-white/[0.02] print:bg-slate-50 p-3 rounded-xl border border-white/[0.08] print:border-slate-300">
              <strong className="text-[#f4f4f2] print:text-black block mb-1">
                {lang === "es" ? "Frontend & Móvil:" : "Frontend & Mobile:"}
              </strong>
              Angular (v18/20), Next.js, React, Ionic 8, Capacitor 7, Tailwind CSS, Livewire 4, RxJS / Signals.
            </div>
            <div className="bg-white/[0.02] print:bg-slate-50 p-3 rounded-xl border border-white/[0.08] print:border-slate-300">
              <strong className="text-[#f4f4f2] print:text-black block mb-1">
                {lang === "es" ? "Bases de Datos:" : "Databases & Storage:"}
              </strong>
              MySQL 8.4 LTS, MariaDB, Oracle, Modelado Relacional, Optimización de Consultas SQL, Índices y Transacciones ACID.
            </div>
            <div className="bg-white/[0.02] print:bg-slate-50 p-3 rounded-xl border border-white/[0.08] print:border-slate-300">
              <strong className="text-[#f4f4f2] print:text-black block mb-1">
                {lang === "es" ? "DevOps & Seguridad:" : "DevOps & Security:"}
              </strong>
              Docker, Docker Compose, Linux Server Administration, Git CI/CD, Certificación Ciberseguridad (Google 2023).
            </div>
          </div>
        </section>

        {/* Experiencia Laboral */}
        <section className="mb-6">
          <h2 className="text-xs font-mono uppercase tracking-wider text-[#99ff99] print:text-slate-800 font-bold mb-3">
            {t.cv.experienceTitle}
          </h2>

          <div className="space-y-5">
            <div>
              <div className="flex justify-between items-baseline text-xs">
                <div>
                  <strong className="text-sm font-bold text-[#f4f4f2] print:text-black">Full Stack Developer</strong>
                  <span className="text-[#9a9aa2] print:text-slate-700"> · Administración de Servicios Start</span>
                </div>
                <span className="font-mono text-[#99ff99] print:text-slate-700 font-semibold">Oct 2024 — Oct 2026</span>
              </div>
              <ul className="mt-2 space-y-1 text-xs text-[#c6c6ce] print:text-slate-800 list-disc list-inside leading-relaxed">
                <li>{lang === "es" ? "Diseño y desarrollo de servicios escalables y APIs REST seguras con Laravel, Node.js y Angular." : "Architected scalable microservices and secure REST APIs using Laravel, Node.js, TypeScript, and Angular."}</li>
                <li>{lang === "es" ? "Estandarización de entornos mediante contenedores Docker para desarrollo ágil y despliegues reproducibles." : "Standardized multi-environment setups via Docker containers for reproducible staging and production deploys."}</li>
                <li>{lang === "es" ? "Optimización de consultas SQL complejas en MySQL y automatización de flujos contables." : "Optimized complex MySQL relational queries, indexing strategies, and automated internal workflows."}</li>
              </ul>
            </div>

            <div>
              <div className="flex justify-between items-baseline text-xs">
                <div>
                  <strong className="text-sm font-bold text-[#f4f4f2] print:text-black">
                    {lang === "es" ? "Gerente del Área de Sistemas" : "Engineering / Systems Manager"}
                  </strong>
                  <span className="text-[#9a9aa2] print:text-slate-700"> · 26 Grados S.A. de C.V. (Zapopan, Jal.)</span>
                </div>
                <span className="font-mono text-[#99ff99] print:text-slate-700 font-semibold">Ene 2021 — Abr 2024</span>
              </div>
              <ul className="mt-2 space-y-1 text-xs text-[#c6c6ce] print:text-slate-800 list-disc list-inside leading-relaxed">
                <li>{lang === "es" ? "Lideré el departamento de ingeniería y diseñé la arquitectura integral del sistema ERP/CRM central." : "Led the software engineering team and architected the comprehensive enterprise ERP/CRM platform."}</li>
                <li>{lang === "es" ? "Supervisé el desarrollo sincronizado de aplicaciones móviles nativas en Swift (iOS) y Kotlin (Android)." : "Managed synchronized mobile application development in native Swift (iOS) and Kotlin (Android) over shared databases."}</li>
                <li>{lang === "es" ? "Módulos implementados: Finanzas, CRM de usuarios, facturación CFDI, auditoría administrativa y seguridad." : "Delivered mission-critical modules: finance, customer CRM, fiscal tax invoicing, and immutable security audit logs."}</li>
              </ul>
            </div>

            <div>
              <div className="flex justify-between items-baseline text-xs">
                <div>
                  <strong className="text-sm font-bold text-[#f4f4f2] print:text-black">
                    {lang === "es" ? "Desarrollador de Software" : "Software Engineer"}
                  </strong>
                  <span className="text-[#9a9aa2] print:text-slate-700"> · Administración de Integrantes (Zapopan, Jal.)</span>
                </div>
                <span className="font-mono text-[#99ff99] print:text-slate-700 font-semibold">Ene 2019 — Dic 2021</span>
              </div>
              <ul className="mt-2 space-y-1 text-xs text-[#c6c6ce] print:text-slate-800 list-disc list-inside leading-relaxed">
                <li>{lang === "es" ? "Migración exitosa del sistema operativo de la compañía desde Informix 4GL hacia plataforma web en PHP y MySQL sin interrupción de operaciones." : "Successfully led zero-downtime legacy migration from Informix 4GL to a modern PHP and MySQL web architecture."}</li>
                <li>{lang === "es" ? "Desarrollo de módulos de cálculo de nómina, timbrado fiscal, autenticación por roles y pasarelas de pago." : "Engineered payroll calculation engines, tax compliance stamps, multi-role authorization, and payment gateways."}</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Proyectos y Sistemas Destacados */}
        <section className="mb-6">
          <h2 className="text-xs font-mono uppercase tracking-wider text-[#99ff99] print:text-slate-800 font-bold mb-2">
            {t.cv.projectsTitle}
          </h2>
          <div className="space-y-2 text-xs text-[#c6c6ce] print:text-slate-800 leading-relaxed">
            <p>
              <strong className="text-[#f4f4f2] print:text-black">Cobranza B2B & Conciliación PPD/REP:</strong> {lang === "es" ? "SaaS multiempresa en Laravel 13 y MySQL 8.4 para conciliación bancaria SPEI contra facturas PPD y timbrado automático de recibos REP del SAT." : "Multi-tenant B2B SaaS in Laravel 13 and MySQL 8.4 for automated SPEI bank reconciliation and SAT CFDI 4.0 tax receipt stamping."}
            </p>
            <p>
              <strong className="text-[#f4f4f2] print:text-black">SysAdministrador ERP:</strong> {lang === "es" ? "Plataforma integral de gestión de clientes, recursos humanos con nómina de ley (IMSS, ISR, Infonavit) y bitácora inmutable de auditoría." : "Comprehensive ERP/CRM system managing clients, human resources, statutory payroll deductions (IMSS, ISR), and immutable audit logs."}
            </p>
            <p>
              <strong className="text-[#f4f4f2] print:text-black">Leex SaaS PropTech:</strong> {lang === "es" ? "Sistema de administración de arrendamiento con mapa de ocupación por niveles, control de vigencia de contratos y validación de transferencias." : "Commercial property management platform with interactive occupancy floor maps, lease lifecycle tracking, and 1-click payment verification."}
            </p>
            <p>
              <strong className="text-[#f4f4f2] print:text-black">LegalFlow Despacho Jurídico:</strong> {lang === "es" ? "Aplicación multiplataforma en Angular 20 e Ionic 8 para control de expedientes judiciales y términos procesales con cuenta regresiva." : "Cross-platform LegalTech system built with Angular 20 and Ionic 8 for judicial case tracking and procedural deadline alerts."}
            </p>
            <p>
              <strong className="text-[#f4f4f2] print:text-black">RootWork Project Tracker:</strong> {lang === "es" ? "Plataforma de gestión ágil con tablero Kanban interactivo, estimaciones y cronómetro de horas facturables en tiempo real." : "Agile project tracking platform featuring interactive drag-and-drop Kanban, real-time billable hour timers, and budget analytics."}
            </p>
          </div>
        </section>

        {/* Educación y Certificaciones */}
        <section className="border-t border-white/[0.1] print:border-slate-300 pt-4 grid sm:grid-cols-2 gap-4 text-xs">
          <div>
            <h3 className="font-mono uppercase tracking-wider text-[#99ff99] print:text-slate-800 font-bold mb-1">
              {t.cv.educationTitle}
            </h3>
            <p className="font-bold text-[#f4f4f2] print:text-black">{education.degree}</p>
            <p className="text-[#9a9aa2] print:text-slate-700">{education.school} · {education.period}</p>
          </div>
          <div>
            <h3 className="font-mono uppercase tracking-wider text-[#99ff99] print:text-slate-800 font-bold mb-1">
              {t.cv.certTitle}
            </h3>
            <p className="text-[#c6c6ce] print:text-slate-800">Certificación en Ciberseguridad · Google (2023)</p>
            <p className="text-[#9a9aa2] print:text-slate-700">{t.cv.languagesVal}</p>
          </div>
        </section>
      </main>
    </div>
  );
}
