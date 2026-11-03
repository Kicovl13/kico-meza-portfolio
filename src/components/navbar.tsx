"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { FileText, Sparkles } from "lucide-react";
import { site } from "@/lib/data";
import { useLanguage } from "@/context/language-context";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const { lang, setLang, toggleLang, t } = useLanguage();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const navLinks = [
    { href: "#servicios", label: lang === "es" ? "Servicios" : "Services" },
    { href: "#stack", label: "Stack" },
    { href: "#proyectos", label: lang === "es" ? "Sistemas" : "Systems" },
    { href: "#trayectoria", label: lang === "es" ? "Trayectoria" : "Experience" },
    { href: "#sobre-mi", label: lang === "es" ? "Sobre mí" : "About" },
  ];

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 h-[68px] sm:h-[72px] transition-all duration-300 border-b ${
        scrolled || open
          ? "bg-[#060608]/95 border-white/[0.12] backdrop-blur-md"
          : "bg-[#060608]/85 border-white/[0.08] backdrop-blur-md"
      }`}
    >
      <div className="mx-auto flex h-full max-w-[1180px] items-center justify-between px-3.5 sm:px-8">
        {/* Brand Logo estilo danhermes.dev */}
        <a
          href="#top"
          className="flex items-center gap-2 sm:gap-3 text-xs sm:text-sm md:text-base font-bold tracking-[0.06em] sm:tracking-[0.08em] uppercase text-[#f4f4f2] hover:opacity-90 transition-opacity shrink-0"
        >
          <div className="relative size-6 sm:size-7 rounded-full overflow-hidden border border-white/20 shrink-0">
            <Image
              src="/federico-meza.png"
              alt="Federico Meza"
              fill
              className="object-cover object-top"
              priority
            />
          </div>
          <span>
            FEDERICOMEZA<b className="text-[#99ff99] font-bold">.</b>DEV
          </span>
        </a>

        {/* Desktop Links */}
        <nav className="hidden items-center gap-1 md:flex" aria-label="Principal">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="px-3.5 py-2 text-sm text-[#9a9aa2] hover:text-[#f4f4f2] transition-colors"
            >
              {link.label}
            </a>
          ))}

          {/* Demos en Vivo pill */}
          <Link
            href="/demos"
            className="ml-2 flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold text-[#a9bdd1] bg-white/[0.04] border border-white/[0.12] hover:border-white/[0.24] hover:text-[#f4f4f2] transition"
          >
            <Sparkles size={12} className="text-[#99ff99]" />
            <span>{lang === "es" ? "5 Demos en Vivo" : "5 Live Demos"}</span>
          </Link>

          {/* CV Link */}
          <Link
            href="/cv"
            className="px-3 py-2 text-sm text-[#9a9aa2] hover:text-[#f4f4f2] transition-colors flex items-center gap-1"
          >
            <FileText size={13} className="text-[#99ff99]" />
            <span>CV</span>
          </Link>
        </nav>

        {/* Right Action Bar */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Language Switcher Pill estilo danhermes.dev */}
          <div className="flex items-center p-0.5 sm:p-1 gap-0.5 sm:gap-1 rounded-full border border-white/[0.12] bg-white/[0.03]">
            <button
              type="button"
              onClick={() => setLang("es")}
              className={`px-2 sm:px-2.5 py-0.5 rounded-full text-[10px] sm:text-[11px] font-semibold tracking-wider transition-colors cursor-pointer ${
                lang === "es"
                  ? "bg-[#1a1a20] text-[#f4f4f2]"
                  : "text-[#6e6e76] hover:text-[#9a9aa2]"
              }`}
            >
              ES
            </button>
            <button
              type="button"
              onClick={() => setLang("en")}
              className={`px-2 sm:px-2.5 py-0.5 rounded-full text-[10px] sm:text-[11px] font-semibold tracking-wider transition-colors cursor-pointer ${
                lang === "en"
                  ? "bg-[#1a1a20] text-[#f4f4f2]"
                  : "text-[#6e6e76] hover:text-[#9a9aa2]"
              }`}
            >
              EN
            </button>
          </div>

          {/* Primary CTA */}
          <a
            href="#contacto"
            className="hidden sm:inline-flex btn-dh-light btn-dh-sm"
          >
            {lang === "es" ? "Hablemos" : "Let's Talk"}
          </a>

          {/* Mobile Hamburger */}
          <button
            type="button"
            className="md:hidden flex flex-col justify-center items-center size-9 sm:size-10 rounded-lg border border-white/[0.14] text-[#f4f4f2] bg-white/[0.02]"
            onClick={() => setOpen((v) => !v)}
            aria-label="Toggle menu"
          >
            <span
              className={`block w-4 h-0.5 bg-current transition-transform duration-300 ${
                open ? "translate-y-1 rotate-45" : "-translate-y-0.5"
              }`}
            />
            <span
              className={`block w-4 h-0.5 bg-current transition-opacity duration-300 my-1 ${
                open ? "opacity-0" : "opacity-100"
              }`}
            />
            <span
              className={`block w-4 h-0.5 bg-current transition-transform duration-300 ${
                open ? "-translate-y-1 -rotate-45" : "translate-y-0.5"
              }`}
            />
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {open && (
        <div className="md:hidden border-b border-white/[0.1] bg-[#060608]/98 backdrop-blur-xl px-5 py-6 shadow-2xl animate-in slide-in-from-top-2 duration-200">
          <div className="flex flex-col gap-1">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="py-3 text-base font-medium text-[#c6c6ce] hover:text-[#f4f4f2] border-t border-white/[0.06] first:border-none flex items-center justify-between"
              >
                <span>{link.label}</span>
                <span className="text-[#6e6e76] font-mono text-xs">→</span>
              </a>
            ))}
            <Link
              href="/cv"
              onClick={() => setOpen(false)}
              className="py-3 text-base font-medium text-[#c6c6ce] border-t border-white/[0.06] flex items-center justify-between"
            >
              <div className="flex items-center gap-2">
                <FileText size={16} className="text-[#99ff99]" />
                <span>{lang === "es" ? "Ver CV Ejecutivo" : "Executive Resume"}</span>
              </div>
              <span className="text-xs font-mono text-[#99ff99]">PDF</span>
            </Link>
            <Link
              href="/demos"
              onClick={() => setOpen(false)}
              className="py-3 text-base font-medium text-[#99ff99] border-t border-white/[0.06] flex items-center justify-between"
            >
              <div className="flex items-center gap-2">
                <Sparkles size={16} />
                <span>{lang === "es" ? "5 Demos en Vivo" : "5 Live Demos"}</span>
              </div>
              <span className="text-xs font-mono bg-[#99ff99]/10 text-[#99ff99] px-2 py-0.5 rounded-full">
                Interactive
              </span>
            </Link>
            <div className="pt-4 border-t border-white/[0.08] mt-2 flex flex-col gap-2">
              <a
                href="#contacto"
                onClick={() => setOpen(false)}
                className="btn-dh-light w-full text-center"
              >
                {lang === "es" ? "Hablemos de tu proyecto" : "Let's Talk"}
              </a>
              <a
                href={site.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setOpen(false)}
                className="btn-dh-ghost w-full text-center text-[#99ff99]"
              >
                WhatsApp Directo
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
