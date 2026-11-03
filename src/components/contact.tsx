"use client";

import { FormEvent, useState } from "react";
import { Check, Copy, ExternalLink, Mail, MessageCircle, Phone, Send } from "lucide-react";
import { site } from "@/lib/data";
import { useLanguage } from "@/context/language-context";

export function Contact() {
  const { lang } = useLanguage();
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [status, setStatus] = useState<"idle" | "sent">("idle");

  const copyEmail = () => {
    navigator.clipboard.writeText(site.email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2500);
  };

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    const name = String(data.get("name") || "").trim();
    const email = String(data.get("email") || "").trim();
    const message = String(data.get("message") || "").trim();

    const subject = encodeURIComponent(`Consulta técnica / vacante de ${name || "Visitante"}`);
    const body = encodeURIComponent(
      `Nombre: ${name}\nEmail: ${email}\n\nMensaje:\n${message}`
    );
    window.location.href = `mailto:${site.email}?subject=${subject}&body=${body}`;
    setStatus("sent");
  }

  return (
    <section id="contacto" className="py-16 sm:py-24 lg:py-32 relative border-t border-white/[0.08]">
      <div className="wrap">
        {/* Final Card estilo danhermes.dev */}
        <div className="glass-dh p-6 sm:p-12 lg:p-16 text-center max-w-[920px] mx-auto rounded-2xl sm:rounded-3xl relative overflow-hidden">
          {/* Subtle glow */}
          <div className="pointer-events-none absolute -top-24 inset-x-0 mx-auto w-96 h-48 bg-[#99ff99]/10 rounded-full blur-3xl" />

          <p className="eyebrow justify-center mb-5 sm:mb-6">
            {lang === "es" ? "Contacto" : "Contact"}
          </p>

          <h2 className="text-2xl xs:text-3xl sm:text-5xl md:text-6xl font-bold tracking-tight text-[#f4f4f2] leading-[1.1] sm:leading-[1.08] mb-4 sm:mb-6">
            {lang === "es" ? (
              <>
                ¿Tienes un sistema crítico por construir o liderar? <br />
                <span className="dim">Hablemos.</span>
              </>
            ) : (
              <>
                Have a critical system to build or lead? <br />
                <span className="dim">Let&apos;s talk.</span>
              </>
            )}
          </h2>

          <p className="text-sm sm:text-base md:text-lg leading-relaxed text-[#9a9aa2] max-w-[660px] mx-auto mb-8 sm:mb-10 px-2">
            {lang === "es"
              ? "Disponible para roles de Senior Software Engineer, Tech Lead o consultoría de arquitectura en proyectos de alta complejidad técnica. Escríbeme y analicemos tu necesidad técnica con una propuesta concreta."
              : "Available for Senior Software Engineer, Tech Lead roles, or software architecture advisory for complex technical platforms. Reach out and let's discuss your requirements with a clear roadmap."}
          </p>

          {/* Direct CTA Buttons (Stacked on mobile, inline on sm+) */}
          <div className="flex flex-col sm:flex-row justify-center items-stretch sm:items-center gap-3 sm:gap-4 max-w-sm sm:max-w-none mx-auto mb-8 sm:mb-10">
            {/* Primary Email */}
            <a
              href={`mailto:${site.email}`}
              className="btn-dh-light flex items-center justify-center gap-2.5"
            >
              <Mail size={18} />
              <span>{site.email}</span>
            </a>

            {/* Direct WhatsApp */}
            <a
              href={site.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-dh-ghost flex items-center justify-center gap-2.5 text-[#99ff99] border-[#99ff99]/30 hover:border-[#99ff99]"
            >
              <MessageCircle size={18} />
              <span>{lang === "es" ? "WhatsApp Directo" : "Direct WhatsApp"}</span>
            </a>

            {/* Copy Button */}
            <button
              type="button"
              onClick={copyEmail}
              className="btn-dh-ghost flex items-center justify-center gap-2 cursor-pointer"
            >
              {copiedEmail ? (
                <>
                  <Check size={16} className="text-[#99ff99]" />
                  <span className="text-[#99ff99] font-mono text-xs">
                    {lang === "es" ? "Copiado" : "Copied"}
                  </span>
                </>
              ) : (
                <>
                  <Copy size={16} />
                  <span>{lang === "es" ? "Copiar correo directo" : "Copy direct email"}</span>
                </>
              )}
            </button>
          </div>

          {/* Quick contact list */}
          <div className="pt-6 sm:pt-8 border-t border-white/[0.08] flex flex-col sm:flex-row flex-wrap justify-center items-center gap-3 sm:gap-8 text-xs sm:text-sm font-mono text-[#9a9aa2]">
            <a
              href={site.phoneHref}
              className="hover:text-[#f4f4f2] transition-colors flex items-center gap-1.5"
            >
              <Phone size={14} className="text-[#99ff99]" />
              <span>{site.phone}</span>
            </a>
            <span className="hidden sm:inline text-white/20">·</span>
            <a
              href={site.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[#f4f4f2] transition-colors"
            >
              linkedin.com/in/federico-meza
            </a>
            <span className="hidden sm:inline text-white/20">·</span>
            <a
              href={site.github}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[#f4f4f2] transition-colors"
            >
              github.com/Kicovl13
            </a>
          </div>

          {/* Toggle form button */}
          <div className="mt-6 sm:mt-8">
            <button
              type="button"
              onClick={() => setShowForm((v) => !v)}
              className="text-xs text-[#6e6e76] hover:text-[#f4f4f2] underline underline-offset-4 cursor-pointer transition"
            >
              {showForm
                ? (lang === "es" ? "Ocultar formulario de mensaje" : "Hide message form")
                : (lang === "es" ? "¿Prefieres enviar un mensaje directo desde aquí?" : "Prefer sending a message from here?")}
            </button>
          </div>

          {/* Embedded Form if opened */}
          {showForm && (
            <form onSubmit={onSubmit} className="mt-6 sm:mt-8 text-left max-w-lg mx-auto space-y-4 pt-6 border-t border-white/[0.08]">
              <div>
                <label className="block text-xs font-mono text-[#9a9aa2] mb-1">
                  {lang === "es" ? "Tu Nombre / Empresa:" : "Your Name / Company:"}
                </label>
                <input
                  name="name"
                  required
                  placeholder={lang === "es" ? "Ej. Ing. Laura Gómez" : "E.g. Laura Gomez"}
                  className="w-full h-11 px-4 rounded-xl bg-white/[0.04] border border-white/[0.12] text-base sm:text-sm text-[#f4f4f2] focus:outline-none focus:border-[#99ff99]"
                />
              </div>
              <div>
                <label className="block text-xs font-mono text-[#9a9aa2] mb-1">
                  {lang === "es" ? "Tu Correo Electrónico:" : "Your Email:"}
                </label>
                <input
                  name="email"
                  type="email"
                  required
                  placeholder="laura@empresa.com"
                  className="w-full h-11 px-4 rounded-xl bg-white/[0.04] border border-white/[0.12] text-base sm:text-sm text-[#f4f4f2] focus:outline-none focus:border-[#99ff99]"
                />
              </div>
              <div>
                <label className="block text-xs font-mono text-[#9a9aa2] mb-1">
                  {lang === "es" ? "Detalles del Proyecto o Vacante:" : "Project or Role Details:"}
                </label>
                <textarea
                  name="message"
                  required
                  rows={4}
                  placeholder={lang === "es" ? "Cuéntame sobre el stack, el reto de negocio o el equipo..." : "Tell me about the stack, business challenge, or team..."}
                  className="w-full p-4 rounded-xl bg-white/[0.04] border border-white/[0.12] text-base sm:text-sm text-[#f4f4f2] focus:outline-none focus:border-[#99ff99] resize-none"
                />
              </div>
              <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2">
                <button type="submit" className="btn-dh-light btn-dh-sm w-full sm:w-auto">
                  <span>{lang === "es" ? "Enviar Mensaje" : "Send Message"}</span>
                  <Send size={14} />
                </button>
                {status === "sent" && (
                  <span className="text-xs text-[#99ff99] font-mono">
                    {lang === "es" ? "Abriendo cliente de correo..." : "Opening email client..."}
                  </span>
                )}
              </div>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
