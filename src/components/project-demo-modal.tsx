"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  Activity,
  ArrowRight,
  Boxes,
  Check,
  CheckCircle2,
  Code2,
  Container,
  Database,
  ExternalLink,
  Layers,
  Phone,
  Send,
  Server,
  Terminal,
  X,
} from "lucide-react";
import { type MvcShowcase } from "@/lib/data";

function GithubIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
    </svg>
  );
}

interface ProjectDemoModalProps {
  project: MvcShowcase | null;
  onClose: () => void;
}

export function ProjectDemoModal({ project, onClose }: ProjectDemoModalProps) {
  const [activeTab, setActiveTab] = useState<"demo" | "mvc" | "docker">("demo");

  // State 1: Cobranza PPD/REP
  const [cobranzaInvoices, setCobranzaInvoices] = useState([
    {
      uuid: "f47ac10b-58cc-4372-a567-0e02b2c3d479",
      client: "Distribuidora Industrial de Occidente S.A.",
      totalPPD: 48500,
      saldoInsoluto: 48500,
      status: "Pendiente REP",
      folio: "A-492",
      fecha: "28 Oct 2026",
    },
    {
      uuid: "3c9a12e4-98fa-410a-b34e-89a1c2d3e4f5",
      client: "Manufacturas y Logística del Bajío",
      totalPPD: 22800,
      saldoInsoluto: 0,
      status: "Conciliado con REP",
      folio: "A-489",
      fecha: "25 Oct 2026",
    },
    {
      uuid: "7b1c3d5e-12ab-4cd8-90ef-123456789abc",
      client: "Soluciones Comerciales de Zapopan",
      totalPPD: 15400,
      saldoInsoluto: 15400,
      status: "Pendiente REP",
      folio: "A-493",
      fecha: "30 Oct 2026",
    },
  ]);

  // State 2: Arrendamiento Plazas
  const [plazas, setPlazas] = useState([
    {
      id: "LOC-A102",
      nombre: "Local A-102",
      arrendatario: "Boutique Elegance",
      renta: 16500,
      diasAtraso: 7,
      mora: 1155,
      estado: "Mora Activa",
      comprobante: false,
    },
    {
      id: "ISL-B04",
      nombre: "Isla B-04",
      arrendatario: "SmartPhone Accessories",
      renta: 8200,
      diasAtraso: 0,
      mora: 0,
      estado: "Al Corriente",
      comprobante: false,
    },
    {
      id: "LOC-C205",
      nombre: "Local C-205",
      arrendatario: "Cafetería & Crepas Gourmet",
      renta: 24000,
      diasAtraso: 3,
      mora: 480,
      estado: "Comprobante Pendiente",
      comprobante: true,
    },
  ]);

  // State 3: WhatsApp Bot Chat Simulator
  const [waMessages, setWaMessages] = useState<
    { id: string; sender: "bot" | "user"; text: string; time: string }[]
  >([
    {
      id: "1",
      sender: "bot",
      text: "¡Hola! 👋 Soy el asistente virtual automatizado de citas. ¿En qué te puedo ayudar hoy?",
      time: "13:00",
    },
    {
      id: "2",
      sender: "bot",
      text: "Puedes decirme cosas como:\n• 'Ver horarios disponibles'\n• 'Agendar cita para mañana a las 4pm'\n• 'Hablar con un asesor'",
      time: "13:00",
    },
  ]);
  const [waInput, setWaInput] = useState("");
  const [waTyping, setWaTyping] = useState(false);

  // State 4: LegalFlow
  const [legalCases, setLegalCases] = useState([
    {
      exp: "428/2026",
      tipo: "Juicio Mercantil Ejecutivo",
      juzgado: "Juzgado 3ro de lo Mercantil",
      cliente: "Inmobiliaria Tapatía",
      terminoDias: 2,
      fase: "Contestación de Demanda",
      urgente: true,
    },
    {
      exp: "159/2025",
      tipo: "Ordinario Civil - Nulidad",
      juzgado: "Juzgado 5to de lo Civil",
      cliente: "Grupo Constructora Sol",
      terminoDias: 14,
      fase: "Desahogo de Pruebas",
      urgente: false,
    },
    {
      exp: "812/2026",
      tipo: "Amparo Indirecto",
      juzgado: "Juzgado 1ro de Distrito",
      cliente: "Corporativo Logix",
      terminoDias: 1,
      fase: "Recurso de Queja",
      urgente: true,
    },
  ]);

  // State 5: Municipal Citizen Reports
  const [citizenReports, setCitizenReports] = useState([
    {
      folio: "REP-2026-8941",
      categoria: "Alumbrado Público",
      ubicación: "Av. Vallarta esq. Rafael Sanzio",
      fecha: "01 Nov 2026",
      estatus: "En Cuadrilla",
    },
    {
      folio: "REP-2026-8910",
      categoria: "Bacheo y Pavimento",
      ubicación: "Colonia La Estancia, Calle Beethoven",
      fecha: "28 Oct 2026",
      estatus: "Resuelto ✓",
    },
  ]);
  const [newReportCategory, setNewReportCategory] = useState("Bacheo y Pavimento");
  const [newReportAddress, setNewReportAddress] = useState("");

  if (!project) return null;

  // Handlers for Cobranza PPD
  const handleConciliarRep = (uuid: string) => {
    setCobranzaInvoices((prev) =>
      prev.map((inv) =>
        inv.uuid === uuid
          ? {
              ...inv,
              saldoInsoluto: 0,
              status: "Conciliado con REP",
            }
          : inv
      )
    );
  };

  // Handlers for Arrendamiento
  const handleAprobarPagoPlaza = (id: string) => {
    setPlazas((prev) =>
      prev.map((p) =>
        p.id === id
          ? {
              ...p,
              diasAtraso: 0,
              mora: 0,
              estado: "Al Corriente",
              comprobante: false,
            }
          : p
      )
    );
  };

  // Handlers for WhatsApp Simulator
  const handleSendWa = (customText?: string) => {
    const text = (customText ?? waInput).trim();
    if (!text || waTyping) return;

    const time = new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
    const userMsg = { id: String(Date.now()), sender: "user" as const, text, time };
    setWaMessages((prev) => [...prev, userMsg]);
    setWaInput("");
    setWaTyping(true);

    setTimeout(() => {
      let reply = "";
      const lower = text.toLowerCase();
      if (lower.includes("horario") || lower.includes("disponib") || lower.includes("cuando")) {
        reply = "📅 Consultando Google Calendar en tiempo real...\n\nHorarios disponibles esta semana:\n• Mañana: 11:00 AM, 3:00 PM, 5:00 PM\n• Pasado mañana: 10:00 AM, 4:00 PM\n\n¿Cuál horario te acomoda mejor?";
      } else if (lower.includes("agend") || lower.includes("cita") || lower.includes("mañana") || lower.includes("pm") || lower.includes("am")) {
        reply = "✅ ¡Cita registrada exitosamente con Google Calendar!\n\n📅 Fecha: Mañana a las 4:00 PM\n👤 Paciente/Cliente: Registrado\n📊 Sincronizado en Google Sheets.\n\nTe enviamos recordatorio 2 horas antes de tu cita.";
      } else if (lower.includes("asesor") || lower.includes("humano") || lower.includes("hablar")) {
        reply = "👤 Entendido. Transfiriendo la conversación al WhatsApp personal de Federico (+52 33 2026 8920). En breve se pondrá en contacto contigo.";
      } else {
        reply = "Recibido. Nuestro sistema procesó tu mensaje con chrono-node y Google APIs. ¿Deseas confirmar la cita o revisar disponibilidad?";
      }

      setWaMessages((prev) => [
        ...prev,
        { id: String(Date.now() + 1), sender: "bot", text: reply, time },
      ]);
      setWaTyping(false);
    }, 900);
  };

  // Handlers for LegalFlow
  const handleCumplirTermino = (exp: string) => {
    setLegalCases((prev) =>
      prev.map((c) =>
        c.exp === exp
          ? { ...c, urgente: false, fase: "Escrito Presentado ✓", terminoDias: 0 }
          : c
      )
    );
  };

  // Handlers for Municipal
  const handleCreateCitizenReport = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newReportAddress.trim()) return;
    const nextFolio = `REP-2026-${Math.floor(Math.random() * 8000) + 1000}`;
    setCitizenReports([
      {
        folio: nextFolio,
        categoria: newReportCategory,
        ubicación: newReportAddress,
        fecha: "Hoy",
        estatus: "Recibido",
      },
      ...citizenReports,
    ]);
    setNewReportAddress("");
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto backdrop-blur-md bg-background/80">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          transition={{ duration: 0.25 }}
          className="relative flex flex-col w-full max-w-4xl max-h-[92vh] rounded-3xl border border-primary/30 bg-card/95 shadow-2xl overflow-hidden"
        >
          {/* Header */}
          <div className="border-b border-border/70 p-5 sm:p-6 bg-gradient-to-r from-card via-card to-primary/5">
            <div className="flex items-start justify-between gap-4">
              <div>
                <div className="flex flex-wrap items-center gap-2">
                  <span className="rounded-full border border-primary/30 bg-primary/10 px-2.5 py-0.5 font-mono text-xs text-primary font-semibold">
                    {project.category}
                  </span>
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 rounded-full border border-border/80 bg-background/60 px-2.5 py-0.5 font-mono text-xs text-foreground hover:border-primary/50 transition-colors"
                  >
                    <GithubIcon className="size-3" />
                    <span>{project.repoName}</span>
                    <ExternalLink className="size-2.5 text-muted-foreground" />
                  </a>
                  <span
                    className={`rounded-full px-2 py-0.5 font-mono text-[10px] font-semibold ${
                      project.isPrivate
                        ? "border border-amber-500/30 bg-amber-500/10 text-amber-400"
                        : "border border-emerald-500/30 bg-emerald-500/10 text-emerald-400"
                    }`}
                  >
                    {project.isPrivate ? "Repo Privado" : "Repo Público"}
                  </span>
                </div>

                <h2 className="mt-2 text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
                  {project.title}
                </h2>
                <p className="mt-1 text-xs sm:text-sm text-primary/80 font-mono">
                  {project.tagline}
                </p>
              </div>

              <button
                type="button"
                onClick={onClose}
                className="rounded-xl border border-border/80 p-2 text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
                aria-label="Cerrar modal"
              >
                <X className="size-5" />
              </button>
            </div>

            {/* Metrics */}
            <div className="mt-4 grid grid-cols-3 gap-2 sm:gap-4">
              {project.metrics.map((m) => (
                <div
                  key={m.label}
                  className="rounded-xl border border-border/60 bg-background/40 p-2.5 text-center"
                >
                  <p className="text-base sm:text-lg font-bold text-primary font-mono">
                    {m.value}
                  </p>
                  <p className="text-[11px] text-muted-foreground">{m.label}</p>
                </div>
              ))}
            </div>

            {/* Tab Selector */}
            <div className="mt-5 flex gap-2 border-b border-border/50 pb-1">
              <button
                type="button"
                onClick={() => setActiveTab("demo")}
                className={`flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-semibold transition-colors ${
                  activeTab === "demo"
                    ? "bg-primary text-primary-foreground shadow-sm"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted"
                }`}
              >
                <Activity className="size-3.5" />
                Demo Funcional (Alpha/Beta)
              </button>
              <button
                type="button"
                onClick={() => setActiveTab("mvc")}
                className={`flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-semibold transition-colors ${
                  activeTab === "mvc"
                    ? "bg-primary text-primary-foreground shadow-sm"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted"
                }`}
              >
                <Code2 className="size-3.5" />
                Arquitectura MVC
              </button>
              <button
                type="button"
                onClick={() => setActiveTab("docker")}
                className={`flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-semibold transition-colors ${
                  activeTab === "docker"
                    ? "bg-primary text-primary-foreground shadow-sm"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted"
                }`}
              >
                <Container className="size-3.5" />
                Docker & Despliegue
              </button>
            </div>
          </div>

          {/* Modal Body */}
          <div className="flex-1 overflow-y-auto p-5 sm:p-6 scrollbar-thin">
            {activeTab === "demo" && (
              <div className="space-y-4">
                {/* 1. COBRANZA B2B DEMO */}
                {project.demoType === "cobranza" && (
                  <div className="space-y-4">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <div>
                        <h4 className="text-sm font-semibold text-foreground">
                          Módulo de Conciliación PPD / REP (CFDI 4.0)
                        </h4>
                        <p className="text-xs text-muted-foreground">
                          Simula la vinculación automática de un Complemento de Recepción de Pagos (REP) a una factura PPD.
                        </p>
                      </div>
                      <span className="font-mono text-xs text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2.5 py-1 rounded-lg">
                        Idempotencia SAT Verificada ✓
                      </span>
                    </div>

                    <div className="overflow-x-auto rounded-xl border border-border/70 bg-background/50">
                      <table className="w-full text-left text-xs">
                        <thead className="border-b border-border/70 bg-card/60 font-mono text-[11px] text-muted-foreground">
                          <tr>
                            <th className="p-3">Folio</th>
                            <th className="p-3">Razón Social</th>
                            <th className="p-3">Importe PPD</th>
                            <th className="p-3">Saldo Insoluto</th>
                            <th className="p-3">Estatus Fiscal</th>
                            <th className="p-3 text-right">Acción</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-border/50">
                          {cobranzaInvoices.map((inv) => (
                            <tr key={inv.uuid} className="hover:bg-muted/40 transition-colors">
                              <td className="p-3 font-mono font-bold text-primary">
                                {inv.folio}
                              </td>
                              <td className="p-3 text-foreground font-medium">
                                {inv.client}
                              </td>
                              <td className="p-3 font-mono text-foreground">
                                ${inv.totalPPD.toLocaleString()} MXN
                              </td>
                              <td className="p-3 font-mono font-semibold">
                                {inv.saldoInsoluto === 0 ? (
                                  <span className="text-emerald-400">$0.00 MXN</span>
                                ) : (
                                  <span className="text-amber-400">
                                    ${inv.saldoInsoluto.toLocaleString()} MXN
                                  </span>
                                )}
                              </td>
                              <td className="p-3">
                                <span
                                  className={`rounded-full px-2 py-0.5 font-mono text-[10px] font-semibold ${
                                    inv.status === "Conciliado con REP"
                                      ? "border border-emerald-500/30 bg-emerald-500/10 text-emerald-400"
                                      : "border border-amber-500/30 bg-amber-500/10 text-amber-400"
                                  }`}
                                >
                                  {inv.status}
                                </span>
                              </td>
                              <td className="p-3 text-right">
                                {inv.saldoInsoluto > 0 ? (
                                  <button
                                    type="button"
                                    onClick={() => handleConciliarRep(inv.uuid)}
                                    className="rounded-lg bg-primary px-2.5 py-1 text-[11px] font-semibold text-primary-foreground hover:scale-105 active:scale-95 transition-transform"
                                  >
                                    Conciliar con REP
                                  </button>
                                ) : (
                                  <span className="font-mono text-[11px] text-emerald-400">
                                    Complemento Timbrado ✓
                                  </span>
                                )}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}

                {/* 2. ARRENDAMIENTO PLAZAS DEMO */}
                {project.demoType === "arrendamiento" && (
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="text-sm font-semibold text-foreground">
                          Consola de Cobranza de Plaza Comercial
                        </h4>
                        <p className="text-xs text-muted-foreground">
                          Detección inmediata de inquilinos con mora, cálculo de penalización diaria y validación de transferencias.
                        </p>
                      </div>
                    </div>

                    <div className="grid gap-3 sm:grid-cols-3">
                      {plazas.map((p) => (
                        <div
                          key={p.id}
                          className="rounded-2xl border border-border/70 bg-background/50 p-4 flex flex-col justify-between"
                        >
                          <div>
                            <div className="flex items-center justify-between">
                              <span className="font-mono font-bold text-primary text-xs">
                                {p.nombre}
                              </span>
                              <span
                                className={`rounded px-1.5 py-0.5 text-[9px] font-mono font-bold ${
                                  p.estado === "Al Corriente"
                                    ? "bg-emerald-500/20 text-emerald-400"
                                    : p.estado === "Comprobante Pendiente"
                                    ? "bg-amber-500/20 text-amber-400"
                                    : "bg-red-500/20 text-red-400"
                                }`}
                              >
                                {p.estado}
                              </span>
                            </div>
                            <p className="mt-2 text-sm font-bold text-foreground">
                              {p.arrendatario}
                            </p>
                            <p className="font-mono text-xs text-muted-foreground mt-1">
                              Renta: ${p.renta.toLocaleString()} MXN
                            </p>
                            {p.mora > 0 && (
                              <p className="font-mono text-xs text-red-400 font-semibold mt-1">
                                + Mora ({p.diasAtraso} días): ${p.mora.toLocaleString()} MXN
                              </p>
                            )}
                          </div>

                          <div className="mt-4 pt-3 border-t border-border/50">
                            {p.comprobante ? (
                              <button
                                type="button"
                                onClick={() => handleAprobarPagoPlaza(p.id)}
                                className="w-full inline-flex items-center justify-center gap-1.5 rounded-lg bg-emerald-500 text-black font-bold text-xs py-1.5 hover:bg-emerald-400 transition-colors"
                              >
                                <Check className="size-3.5" />
                                Validar Comprobante
                              </button>
                            ) : p.diasAtraso > 0 ? (
                              <button
                                type="button"
                                onClick={() => handleAprobarPagoPlaza(p.id)}
                                className="w-full inline-flex items-center justify-center gap-1 rounded-lg border border-primary/40 bg-primary/10 text-primary text-xs py-1.5 hover:bg-primary hover:text-primary-foreground transition-colors"
                              >
                                Registrar Cobro Manual
                              </button>
                            ) : (
                              <p className="text-center font-mono text-xs text-emerald-400">
                                Sin adeudo este mes ✓
                              </p>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* 3. WHATSAPP BOT DEMO (AUTHENTIC SIMULATOR) */}
                {project.demoType === "whatsapp" && (
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="text-sm font-semibold text-foreground">
                          Simulador en Vivo del Bot de WhatsApp (@whiskeysockets/baileys)
                        </h4>
                        <p className="text-xs text-muted-foreground">
                          Prueba la detección de intenciones en lenguaje natural y sincronización con Google Calendar.
                        </p>
                      </div>
                    </div>

                    {/* WhatsApp Window */}
                    <div className="mx-auto max-w-md rounded-2xl border border-border/80 bg-[#0b141a] overflow-hidden shadow-xl">
                      {/* WhatsApp Header */}
                      <div className="bg-[#202c33] px-4 py-2.5 flex items-center justify-between text-white border-b border-[#2a3942]">
                        <div className="flex items-center gap-2.5">
                          <div className="flex size-8 items-center justify-center rounded-full bg-emerald-600 text-white font-bold text-xs">
                            K
                          </div>
                          <div>
                            <p className="text-xs font-semibold leading-tight">
                              Federico Meza · Citas Bot
                            </p>
                            <p className="text-[10px] text-emerald-400">en línea</p>
                          </div>
                        </div>
                        <Phone className="size-4 text-muted-foreground" />
                      </div>

                      {/* Messages Area */}
                      <div className="h-64 overflow-y-auto p-3 space-y-2 bg-[radial-gradient(#202c33_1px,transparent_1px)] [background-size:16px_16px] bg-[#0b141a] scrollbar-thin">
                        {waMessages.map((m) => (
                          <div
                            key={m.id}
                            className={`flex ${
                              m.sender === "user" ? "justify-end" : "justify-start"
                            }`}
                          >
                            <div
                              className={`max-w-[85%] rounded-lg px-3 py-1.5 text-xs shadow-xs ${
                                m.sender === "user"
                                  ? "bg-[#005c4b] text-white rounded-tr-none"
                                  : "bg-[#202c33] text-gray-100 rounded-tl-none border border-[#2a3942]"
                              }`}
                            >
                              <p className="whitespace-pre-line leading-relaxed">
                                {m.text}
                              </p>
                              <p className="text-[9px] text-right mt-1 text-gray-400">
                                {m.time}
                              </p>
                            </div>
                          </div>
                        ))}

                        {waTyping && (
                          <div className="flex justify-start">
                            <div className="rounded-lg bg-[#202c33] px-3 py-1.5 text-xs text-gray-400 flex items-center gap-1 border border-[#2a3942]">
                              <span className="size-1 rounded-full bg-emerald-400 animate-ping" />
                              <span>escribiendo...</span>
                            </div>
                          </div>
                        )}
                      </div>

                      {/* Quick Chips */}
                      <div className="bg-[#202c33]/70 px-2 py-1.5 border-t border-[#2a3942] flex gap-1.5 overflow-x-auto">
                        <button
                          type="button"
                          onClick={() =>
                            handleSendWa("¿Qué horarios tienen disponibles?")
                          }
                          className="shrink-0 rounded-full border border-emerald-500/40 bg-emerald-500/10 px-2 py-0.5 text-[10px] text-emerald-300 hover:bg-emerald-500/20"
                        >
                          Ver horarios
                        </button>
                        <button
                          type="button"
                          onClick={() =>
                            handleSendWa("Quiero agendar cita para mañana a las 4pm")
                          }
                          className="shrink-0 rounded-full border border-emerald-500/40 bg-emerald-500/10 px-2 py-0.5 text-[10px] text-emerald-300 hover:bg-emerald-500/20"
                        >
                          Agendar mañana 4pm
                        </button>
                        <button
                          type="button"
                          onClick={() => handleSendWa("Hablar con un asesor")}
                          className="shrink-0 rounded-full border border-gray-600 bg-gray-700/50 px-2 py-0.5 text-[10px] text-gray-300 hover:bg-gray-700"
                        >
                          Hablar con asesor
                        </button>
                      </div>

                      {/* WhatsApp Input */}
                      <form
                        onSubmit={(e) => {
                          e.preventDefault();
                          handleSendWa();
                        }}
                        className="bg-[#202c33] p-2 flex items-center gap-2"
                      >
                        <input
                          type="text"
                          value={waInput}
                          onChange={(e) => setWaInput(e.target.value)}
                          placeholder="Escribe un mensaje por WhatsApp..."
                          className="flex-1 rounded-lg bg-[#2a3942] px-3 py-1.5 text-xs text-white placeholder:text-gray-400 focus:outline-none"
                        />
                        <button
                          type="submit"
                          className="rounded-lg bg-emerald-600 p-2 text-white hover:bg-emerald-500 transition-colors"
                        >
                          <Send className="size-3.5" />
                        </button>
                      </form>
                    </div>
                  </div>
                )}

                {/* 4. LEGALFLOW DEMO */}
                {project.demoType === "legal" && (
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="text-sm font-semibold text-foreground">
                          Control de Expedientes y Términos Judiciales
                        </h4>
                        <p className="text-xs text-muted-foreground">
                          Gestor para despachos de abogados con semáforos procesales para contestaciones y amparos.
                        </p>
                      </div>
                    </div>

                    <div className="space-y-2.5">
                      {legalCases.map((c) => (
                        <div
                          key={c.exp}
                          className="rounded-xl border border-border/70 bg-background/50 p-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-3"
                        >
                          <div>
                            <div className="flex items-center gap-2">
                              <span className="font-mono font-bold text-primary text-sm">
                                Exp. {c.exp}
                              </span>
                              <span className="rounded bg-muted px-2 py-0.5 font-mono text-[10px] text-muted-foreground">
                                {c.tipo}
                              </span>
                              {c.urgente && (
                                <span className="rounded bg-red-500/20 text-red-400 border border-red-500/30 px-1.5 py-0.2 font-mono text-[10px] font-bold">
                                  Término Crítico
                                </span>
                              )}
                            </div>
                            <p className="text-xs font-semibold text-foreground mt-1">
                              {c.juzgado} · Cliente: {c.cliente}
                            </p>
                            <p className="text-xs text-muted-foreground mt-0.5">
                              Fase actual: <span className="text-foreground">{c.fase}</span>
                            </p>
                          </div>

                          <div className="flex items-center gap-3">
                            {c.terminoDias > 0 ? (
                              <div className="text-right">
                                <p className="font-mono text-xs font-bold text-amber-400">
                                  {c.terminoDias} días restantes
                                </p>
                                <button
                                  type="button"
                                  onClick={() => handleCumplirTermino(c.exp)}
                                  className="mt-1 rounded-md bg-primary px-2.5 py-1 text-[11px] font-semibold text-primary-foreground hover:scale-105 active:scale-95 transition-transform"
                                >
                                  Presentar Escrito
                                </button>
                              </div>
                            ) : (
                              <span className="font-mono text-xs text-emerald-400">
                                Al corriente ✓
                              </span>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* 5. MUNICIPAL DEMO */}
                {project.demoType === "municipal" && (
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="text-sm font-semibold text-foreground">
                          Ventanilla Única de Trámites e Incidencias Ciudadanas
                        </h4>
                        <p className="text-xs text-muted-foreground">
                          Genera un reporte público con folio digital para seguimiento en tiempo real.
                        </p>
                      </div>
                    </div>

                    <form
                      onSubmit={handleCreateCitizenReport}
                      className="rounded-2xl border border-border/70 bg-background/50 p-4 space-y-3"
                    >
                      <div className="grid sm:grid-cols-2 gap-3">
                        <div>
                          <label className="text-[11px] font-mono text-muted-foreground">
                            Categoría del Servicio
                          </label>
                          <select
                            value={newReportCategory}
                            onChange={(e) => setNewReportCategory(e.target.value)}
                            className="mt-1 w-full rounded-lg border border-border/80 bg-card px-3 py-1.5 text-xs text-foreground focus:outline-none focus:border-primary"
                          >
                            <option>Bacheo y Pavimento</option>
                            <option>Alumbrado Público</option>
                            <option>Fuga de Agua Potable</option>
                            <option>Parques y Jardines</option>
                          </select>
                        </div>
                        <div>
                          <label className="text-[11px] font-mono text-muted-foreground">
                            Ubicación de la Incidencia
                          </label>
                          <input
                            type="text"
                            value={newReportAddress}
                            onChange={(e) => setNewReportAddress(e.target.value)}
                            placeholder="Ej. Calle Hidalgo #142, Col. Centro"
                            required
                            className="mt-1 w-full rounded-lg border border-border/80 bg-card px-3 py-1.5 text-xs text-foreground focus:outline-none focus:border-primary"
                          >
                          </input>
                        </div>
                      </div>

                      <div className="flex justify-end">
                        <button
                          type="submit"
                          className="rounded-lg bg-primary px-3 py-1.5 text-xs font-semibold text-primary-foreground hover:scale-105 active:scale-95 transition-transform"
                        >
                          Generar Folio de Atención
                        </button>
                      </div>
                    </form>

                    {/* Reports List */}
                    <div className="rounded-xl border border-border/70 bg-card/60 p-3 space-y-2">
                      <p className="font-mono text-xs font-semibold text-primary">
                        Folios en Seguimiento Activo:
                      </p>
                      <div className="space-y-1.5">
                        {citizenReports.map((r) => (
                          <div
                            key={r.folio}
                            className="flex items-center justify-between p-2 rounded-lg bg-background/50 text-xs border border-border/50"
                          >
                            <div>
                              <span className="font-mono font-bold text-foreground">
                                {r.folio}
                              </span>
                              <span className="ml-2 text-muted-foreground">
                                {r.categoria} · {r.ubicación}
                              </span>
                            </div>
                            <span
                              className={`rounded px-2 py-0.5 font-mono text-[10px] font-semibold ${
                                r.estatus.includes("Resuelto")
                                  ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/30"
                                  : "bg-blue-500/10 text-blue-400 border border-blue-500/30"
                              }`}
                            >
                              {r.estatus}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* TAB: MVC Architecture */}
            {activeTab === "mvc" && (
              <div className="space-y-4">
                <p className="text-xs text-muted-foreground leading-relaxed">
                  Desglose formal del patrón Modelo-Vista-Controlador implementado en el repositorio{" "}
                  <code className="text-primary font-mono font-bold">{project.repoName}</code>:
                </p>

                <div className="grid gap-4 sm:grid-cols-3">
                  {/* Model */}
                  <div className="rounded-2xl border border-primary/25 bg-background/50 p-4">
                    <div className="flex items-center gap-2 text-primary font-mono text-xs font-bold uppercase tracking-wider mb-2">
                      <Database className="size-4" />
                      Modelo (Model)
                    </div>
                    <ul className="space-y-2 text-xs text-foreground/85">
                      {project.mvcArchitecture.model.map((m, i) => (
                        <li key={i} className="flex items-start gap-1.5">
                          <span className="text-primary mt-0.5">•</span>
                          <span>{m}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Controller */}
                  <div className="rounded-2xl border border-primary/25 bg-background/50 p-4">
                    <div className="flex items-center gap-2 text-primary font-mono text-xs font-bold uppercase tracking-wider mb-2">
                      <Server className="size-4" />
                      Controlador (Controller)
                    </div>
                    <ul className="space-y-2 text-xs text-foreground/85">
                      {project.mvcArchitecture.controller.map((c, i) => (
                        <li key={i} className="flex items-start gap-1.5">
                          <span className="text-primary mt-0.5">•</span>
                          <span>{c}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* View */}
                  <div className="rounded-2xl border border-primary/25 bg-background/50 p-4">
                    <div className="flex items-center gap-2 text-primary font-mono text-xs font-bold uppercase tracking-wider mb-2">
                      <Layers className="size-4" />
                      Vista (View)
                    </div>
                    <ul className="space-y-2 text-xs text-foreground/85">
                      {project.mvcArchitecture.view.map((v, i) => (
                        <li key={i} className="flex items-start gap-1.5">
                          <span className="text-primary mt-0.5">•</span>
                          <span>{v}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="rounded-xl border border-border/80 bg-card/60 p-4 mt-3">
                  <h5 className="font-mono text-xs font-semibold text-primary uppercase tracking-wider">
                    Capacidades Técnicas del Sistema:
                  </h5>
                  <div className="mt-2 grid sm:grid-cols-2 gap-2 text-xs text-foreground/90">
                    {project.keyFeatures.map((f, i) => (
                      <div key={i} className="flex items-center gap-2">
                        <CheckCircle2 className="size-3.5 text-primary shrink-0" />
                        <span>{f}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* TAB: Docker & Deployment */}
            {activeTab === "docker" && (
              <div className="space-y-4">
                <p className="text-xs text-muted-foreground leading-relaxed">
                  Configuración de infraestructura y contenedores Docker para este proyecto:
                </p>

                <div className="rounded-xl border border-border/80 bg-background/80 p-4 font-mono text-xs">
                  <div className="flex items-center justify-between border-b border-border/60 pb-2 mb-3 text-muted-foreground text-[11px]">
                    <span className="flex items-center gap-1.5">
                      <Terminal className="size-3.5 text-primary" />
                      docker-compose.yml / Entorno
                    </span>
                    <span className="text-emerald-400">Producción & Desarrollo</span>
                  </div>

                  <div className="space-y-2">
                    {project.dockerStack.map((service, index) => (
                      <div
                        key={service}
                        className="flex items-center justify-between rounded-lg bg-card/60 p-2.5 border border-border/50"
                      >
                        <div className="flex items-center gap-2 text-foreground">
                          <Boxes className="size-4 text-primary" />
                          <span className="font-bold">Servicio #{index + 1}:</span>
                          <span className="text-primary">{service}</span>
                        </div>
                        <span className="rounded bg-emerald-500/10 px-2 py-0.5 text-[10px] text-emerald-400 font-semibold">
                          Orquestado ✓
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="rounded-xl border border-primary/25 bg-primary/5 p-4 text-xs space-y-1.5 text-foreground/90">
                  <p className="font-semibold text-primary font-mono text-[11px] uppercase tracking-wider">
                    Estrategia de Despliegue de Federico:
                  </p>
                  <p>
                    • Multi-stage builds en Dockerfile para minimizar vulnerabilidades y tamaño de imágenes.
                  </p>
                  <p>
                    • Aislamiento de redes internas entre base de datos y proxy público Nginx.
                  </p>
                  <p>
                    • Variables de entorno protegidas y healthchecks continuos de servicios.
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="border-t border-border/70 bg-card/70 px-5 py-3 sm:px-6 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-xs text-foreground hover:text-primary font-mono transition-colors"
            >
              <GithubIcon className="size-3.5" />
              <span>Ver repositorio github.com/Kicovl13/{project.repoName}</span>
              <ExternalLink className="size-3 text-muted-foreground" />
            </a>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={onClose}
                className="rounded-lg border border-border/80 px-3 py-1.5 text-xs text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
              >
                Cerrar
              </button>
              <a
                href="#contact"
                onClick={onClose}
                className="inline-flex items-center gap-1.5 rounded-lg bg-primary px-3.5 py-1.5 text-xs font-semibold text-primary-foreground hover:scale-105 active:scale-95 transition-transform"
              >
                Contactar a Federico
                <ArrowRight className="size-3.5" />
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
