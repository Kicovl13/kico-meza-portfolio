"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  AlertCircle,
  ArrowLeft,
  BookOpen,
  Calendar,
  CheckCircle2,
  ChevronRight,
  Clock,
  FileText,
  Gavel,
  Plus,
  Scale,
  Search,
  User,
  X,
} from "lucide-react";
import Link from "next/link";

type Tab = "expedientes" | "audiencias" | "terminos";
type Stage = "list" | "detail";

interface Deadline {
  label: string;
  daysLeft: number;
  type: "amparo" | "contestacion" | "recurso" | "prueba";
}

interface Hearing {
  date: string;
  time: string;
  sala: string;
  juez: string;
  type: string;
}

interface CaseFile {
  id: string;
  numero: string;
  tipo: string;
  cliente: string;
  juzgado: string;
  etapa: string;
  urgencia: "alta" | "media" | "baja";
  deadlines: Deadline[];
  hearings: Hearing[];
  acuerdos: string[];
}

const typeColors: Record<string, string> = {
  amparo: "#f97316",
  contestacion: "#3b82f6",
  recurso: "#a855f7",
  prueba: "#22c55e",
};

const urgencyConfig = {
  alta: { label: "Urgente", color: "#ef4444", bg: "rgba(239,68,68,0.12)" },
  media: { label: "Próximo", color: "#f97316", bg: "rgba(249,115,22,0.12)" },
  baja: { label: "Al día", color: "#22c55e", bg: "rgba(34,197,94,0.12)" },
};

const cases: CaseFile[] = [
  {
    id: "1",
    numero: "842/2026",
    tipo: "Civil · Divorcio necesario",
    cliente: "Ramírez Gutiérrez, María Elena",
    juzgado: "Juzgado 3° de lo Civil · Zapopan",
    etapa: "Período probatorio",
    urgencia: "alta",
    deadlines: [
      { label: "Ofrecimiento de pruebas", daysLeft: 2, type: "prueba" },
      { label: "Contestación de demanda", daysLeft: 8, type: "contestacion" },
      { label: "Recurso de apelación", daysLeft: 21, type: "recurso" },
    ],
    hearings: [
      { date: "4 Nov 2026", time: "10:30", sala: "Sala B", juez: "Lic. García Morales", type: "Audiencia de Desahogo de Pruebas" },
      { date: "19 Nov 2026", time: "9:00", sala: "Sala A", juez: "Lic. García Morales", type: "Audiencia Final" },
    ],
    acuerdos: [
      "Acuerdo 28-Oct-2026: Se admitió la demanda y se citó a las partes",
      "Acuerdo 15-Oct-2026: Se tuvo por recibida la contestación de demanda",
      "Acuerdo 02-Oct-2026: Auto de radicación. Se integró el expediente.",
    ],
  },
  {
    id: "2",
    numero: "1203/2026",
    tipo: "Mercantil · Cobro de pesos",
    cliente: "Distribuidora del Bajío S.A. de C.V.",
    juzgado: "Juzgado 1° Mercantil · Guadalajara",
    etapa: "Ejecución de sentencia",
    urgencia: "media",
    deadlines: [
      { label: "Interposición de amparo", daysLeft: 12, type: "amparo" },
      { label: "Liquidación de condena", daysLeft: 18, type: "contestacion" },
    ],
    hearings: [
      { date: "14 Nov 2026", time: "11:00", sala: "Sala C", juez: "Lic. Torres Vargas", type: "Audiencia de Liquidación" },
    ],
    acuerdos: [
      "Acuerdo 30-Oct-2026: Se dictó sentencia a favor del actor por $485,000 MXN.",
      "Acuerdo 20-Oct-2026: Cierre de instrucción. Alegatos por escrito presentados.",
    ],
  },
  {
    id: "3",
    numero: "377/2026",
    tipo: "Laboral · Reinstalación",
    cliente: "Acevedo Hernández, Juan Carlos",
    juzgado: "Junta Local de Conciliación · Zapopan",
    etapa: "Conciliación",
    urgencia: "baja",
    deadlines: [
      { label: "Contestación de reconvención", daysLeft: 30, type: "contestacion" },
      { label: "Exhibición de pruebas documentales", daysLeft: 45, type: "prueba" },
    ],
    hearings: [
      { date: "25 Nov 2026", time: "12:00", sala: "Sala 2", juez: "Conciliador Hdez.", type: "Junta de Conciliación" },
    ],
    acuerdos: [
      "Acuerdo 27-Oct-2026: Se señaló fecha de conciliación para 25-Nov-2026.",
      "Acuerdo 12-Oct-2026: Se radicó la demanda y se emplazó a la empresa.",
    ],
  },
];

function DaysLeftBadge({ days }: { days: number }) {
  const color = days <= 2 ? "#ef4444" : days <= 7 ? "#f97316" : "#22c55e";
  const bg = days <= 2 ? "rgba(239,68,68,0.12)" : days <= 7 ? "rgba(249,115,22,0.12)" : "rgba(34,197,94,0.12)";
  return (
    <span className="text-xs px-2 py-0.5 rounded-full font-semibold" style={{ background: bg, color, border: `1px solid ${color}33` }}>
      {days <= 0 ? "VENCIDO" : `${days}d`}
    </span>
  );
}

function CountdownClock({ days }: { days: number }) {
  const hours = days * 24;
  return (
    <div className="flex gap-2">
      {[{ v: Math.floor(days), u: "días" }, { v: hours % 24, u: "hrs" }].map((item) => (
        <div key={item.u} className="text-center">
          <div className="text-lg font-bold text-white px-3 py-1.5 rounded-lg" style={{ background: "rgba(255,255,255,0.08)" }}>
            {String(item.v).padStart(2, "0")}
          </div>
          <p className="text-xs mt-1" style={{ color: "rgba(255,255,255,0.4)" }}>{item.u}</p>
        </div>
      ))}
    </div>
  );
}

export default function LegalFlowMvp() {
  const [tab, setTab] = useState<Tab>("expedientes");
  const [stage, setStage] = useState<Stage>("list");
  const [selected, setSelected] = useState<CaseFile | null>(null);
  const [search, setSearch] = useState("");
  const [tick, setTick] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => setTick((t) => t + 1), 1000);
    return () => clearInterval(interval);
  }, []);

  const filtered = cases.filter(
    (c) =>
      c.numero.toLowerCase().includes(search.toLowerCase()) ||
      c.cliente.toLowerCase().includes(search.toLowerCase()) ||
      c.tipo.toLowerCase().includes(search.toLowerCase())
  );

  const allDeadlines = cases.flatMap((c) => c.deadlines.map((d) => ({ ...d, case: c }))).sort((a, b) => a.daysLeft - b.daysLeft);
  const allHearings = cases.flatMap((c) => c.hearings.map((h) => ({ ...h, case: c }))).sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

  return (
    <div className="min-h-screen" style={{ background: "linear-gradient(135deg, #0c0f1a 0%, #111827 60%, #0a0f1e 100%)" }}>
      {/* Header */}
      <header className="sticky top-0 z-50" style={{ background: "rgba(10,15,30,0.95)", borderBottom: "1px solid rgba(255,255,255,0.07)", backdropFilter: "blur(16px)" }}>
        <div className="max-w-5xl mx-auto px-4 py-3 flex items-center gap-4">
          <Link href="/" className="flex items-center gap-2 text-sm" style={{ color: "rgba(255,255,255,0.5)" }}>
            <ArrowLeft size={16} />
            Portafolio
          </Link>
          <div className="flex items-center gap-3 ml-2">
            <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: "linear-gradient(135deg, #a855f7, #7c3aed)" }}>
              <Scale size={16} className="text-white" />
            </div>
            <div>
              <p className="text-white font-semibold text-sm leading-none">LegalFlow</p>
              <p className="text-xs mt-0.5" style={{ color: "rgba(255,255,255,0.4)" }}>Gestión de Expedientes Judiciales</p>
            </div>
          </div>
          <span className="ml-auto text-xs px-2 py-1 rounded-full font-medium" style={{ background: "rgba(168,85,247,0.15)", color: "#c084fc", border: "1px solid rgba(168,85,247,0.3)" }}>
            MVP Demo
          </span>
        </div>
      </header>

      <div className="max-w-5xl mx-auto px-4 py-8">
        {stage === "list" ? (
          <>
            {/* Stats */}
            <div className="grid grid-cols-3 gap-4 mb-8">
              {[
                { label: "Expedientes", value: cases.length, icon: FileText, color: "#a855f7" },
                { label: "Términos Activos", value: allDeadlines.length, icon: Clock, color: "#f97316" },
                { label: "Próximas Audiencias", value: allHearings.length, icon: Calendar, color: "#3b82f6" },
              ].map((s) => (
                <div key={s.label} className="p-5 rounded-2xl" style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }}>
                  <div className="flex items-center gap-2 mb-2">
                    <s.icon size={14} style={{ color: s.color }} />
                    <p className="text-xs" style={{ color: "rgba(255,255,255,0.5)" }}>{s.label}</p>
                  </div>
                  <p className="text-3xl font-bold text-white">{s.value}</p>
                </div>
              ))}
            </div>

            {/* Tabs */}
            <div className="flex gap-1 p-1 rounded-xl mb-6 w-fit" style={{ background: "rgba(255,255,255,0.06)" }}>
              {(["expedientes", "audiencias", "terminos"] as Tab[]).map((t) => (
                <button key={t} onClick={() => setTab(t)} className="px-4 py-2 rounded-lg text-sm font-medium capitalize transition-all" style={{ background: tab === t ? "rgba(168,85,247,0.25)" : "transparent", color: tab === t ? "#c084fc" : "rgba(255,255,255,0.5)", border: tab === t ? "1px solid rgba(168,85,247,0.4)" : "1px solid transparent" }}>
                  {t === "expedientes" ? "Expedientes" : t === "audiencias" ? "Audiencias" : "Términos"}
                </button>
              ))}
            </div>

            <AnimatePresence mode="wait">
              {/* EXPEDIENTES */}
              {tab === "expedientes" && (
                <motion.div key="exp" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                  <div className="relative mb-4">
                    <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2" style={{ color: "rgba(255,255,255,0.4)" }} />
                    <input
                      value={search}
                      onChange={(e) => setSearch(e.target.value)}
                      placeholder="Buscar por expediente, cliente o tipo..."
                      className="w-full pl-10 pr-4 py-2.5 rounded-xl text-sm outline-none"
                      style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)", color: "#fff" }}
                    />
                  </div>
                  <div className="space-y-3">
                    {filtered.map((c) => (
                      <motion.button key={c.id} whileHover={{ x: 3 }} onClick={() => { setSelected(c); setStage("detail"); }} className="w-full p-4 rounded-2xl text-left flex items-center gap-4 group" style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }}>
                        <div className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: "rgba(168,85,247,0.15)", border: "1px solid rgba(168,85,247,0.25)" }}>
                          <Gavel size={18} style={{ color: "#a855f7" }} />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-0.5">
                            <p className="text-white font-semibold text-sm">{c.numero}</p>
                            <span className="text-xs px-2 py-0.5 rounded-full" style={{ background: urgencyConfig[c.urgencia].bg, color: urgencyConfig[c.urgencia].color }}>
                              {urgencyConfig[c.urgencia].label}
                            </span>
                          </div>
                          <p className="text-xs truncate" style={{ color: "rgba(255,255,255,0.6)" }}>{c.tipo}</p>
                          <p className="text-xs truncate mt-0.5" style={{ color: "rgba(255,255,255,0.35)" }}>{c.cliente}</p>
                        </div>
                        <div className="text-right flex-shrink-0">
                          <p className="text-xs mb-1" style={{ color: "rgba(255,255,255,0.4)" }}>{c.etapa}</p>
                          <DaysLeftBadge days={c.deadlines[0]?.daysLeft ?? 99} />
                        </div>
                        <ChevronRight size={16} style={{ color: "rgba(255,255,255,0.3)" }} className="group-hover:translate-x-1 transition-transform" />
                      </motion.button>
                    ))}
                  </div>
                </motion.div>
              )}

              {/* AUDIENCIAS */}
              {tab === "audiencias" && (
                <motion.div key="aud" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="space-y-3">
                  {allHearings.map((h, i) => (
                    <motion.div key={i} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.08 }} className="p-5 rounded-2xl" style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }}>
                      <div className="flex items-start gap-4">
                        <div className="w-12 h-12 rounded-xl flex flex-col items-center justify-center flex-shrink-0" style={{ background: "rgba(59,130,246,0.15)", border: "1px solid rgba(59,130,246,0.3)" }}>
                          <p className="text-xs font-bold" style={{ color: "#60a5fa" }}>{h.date.split(" ")[0]}</p>
                          <p className="text-xs" style={{ color: "rgba(255,255,255,0.5)" }}>{h.date.split(" ")[1]}</p>
                        </div>
                        <div className="flex-1">
                          <p className="text-white font-semibold">{h.type}</p>
                          <p className="text-sm mt-1" style={{ color: "#60a5fa" }}>{h.case.numero} · {h.case.cliente.split(",")[0]}</p>
                          <div className="flex gap-4 mt-2">
                            <p className="text-xs" style={{ color: "rgba(255,255,255,0.4)" }}>🕐 {h.time} · {h.sala}</p>
                            <p className="text-xs" style={{ color: "rgba(255,255,255,0.4)" }}>⚖️ {h.juez}</p>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </motion.div>
              )}

              {/* TÉRMINOS */}
              {tab === "terminos" && (
                <motion.div key="ter" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="space-y-3">
                  {allDeadlines.map((d, i) => (
                    <motion.div key={i} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.07 }} className="p-5 rounded-2xl" style={{ background: "rgba(255,255,255,0.04)", border: `1px solid ${d.daysLeft <= 2 ? "rgba(239,68,68,0.3)" : d.daysLeft <= 7 ? "rgba(249,115,22,0.2)" : "rgba(255,255,255,0.08)"}` }}>
                      <div className="flex items-center justify-between gap-4">
                        <div className="flex items-center gap-3">
                          <div className="w-2 h-2 rounded-full flex-shrink-0" style={{ background: typeColors[d.type] }} />
                          <div>
                            <p className="text-white font-medium text-sm">{d.label}</p>
                            <p className="text-xs mt-0.5" style={{ color: "rgba(255,255,255,0.4)" }}>{d.case.numero} · {d.case.cliente.split(",")[0]}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          <CountdownClock days={d.daysLeft} key={tick} />
                          <DaysLeftBadge days={d.daysLeft} />
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </>
        ) : (
          /* DETAIL */
          selected && (
            <motion.div initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }}>
              <button onClick={() => setStage("list")} className="flex items-center gap-2 mb-6 text-sm" style={{ color: "rgba(255,255,255,0.5)" }}>
                <ArrowLeft size={16} /> Volver a expedientes
              </button>
              {/* Header del expediente */}
              <div className="p-6 rounded-2xl mb-6" style={{ background: "rgba(168,85,247,0.08)", border: "1px solid rgba(168,85,247,0.25)" }}>
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="text-xs mb-1" style={{ color: "rgba(168,85,247,0.8)" }}>Expediente No.</p>
                    <h2 className="text-3xl font-bold text-white mb-1">{selected.numero}</h2>
                    <p style={{ color: "rgba(255,255,255,0.7)" }}>{selected.tipo}</p>
                    <div className="flex items-center gap-2 mt-3">
                      <User size={13} style={{ color: "rgba(255,255,255,0.4)" }} />
                      <p className="text-sm" style={{ color: "rgba(255,255,255,0.6)" }}>{selected.cliente}</p>
                    </div>
                    <div className="flex items-center gap-2 mt-1">
                      <Gavel size={13} style={{ color: "rgba(255,255,255,0.4)" }} />
                      <p className="text-sm" style={{ color: "rgba(255,255,255,0.6)" }}>{selected.juzgado}</p>
                    </div>
                  </div>
                  <span className="text-sm px-3 py-1.5 rounded-full font-medium flex-shrink-0" style={{ background: urgencyConfig[selected.urgencia].bg, color: urgencyConfig[selected.urgencia].color, border: `1px solid ${urgencyConfig[selected.urgencia].color}44` }}>
                    {urgencyConfig[selected.urgencia].label}
                  </span>
                </div>
                <div className="mt-4 px-3 py-2 rounded-lg inline-block" style={{ background: "rgba(255,255,255,0.06)" }}>
                  <p className="text-xs" style={{ color: "rgba(255,255,255,0.5)" }}>Etapa procesal: <span className="text-white font-medium">{selected.etapa}</span></p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Términos */}
                <div className="rounded-2xl overflow-hidden" style={{ border: "1px solid rgba(255,255,255,0.08)" }}>
                  <div className="px-5 py-4" style={{ background: "rgba(255,255,255,0.05)", borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
                    <h3 className="text-white font-semibold flex items-center gap-2"><Clock size={15} style={{ color: "#f97316" }} />Términos Procesales</h3>
                  </div>
                  <div className="p-4 space-y-3">
                    {selected.deadlines.map((d, i) => (
                      <div key={i} className="flex items-center justify-between gap-3 p-3 rounded-xl" style={{ background: "rgba(255,255,255,0.04)" }}>
                        <div className="flex items-center gap-2">
                          <div className="w-2 h-2 rounded-full" style={{ background: typeColors[d.type] }} />
                          <p className="text-sm text-white">{d.label}</p>
                        </div>
                        <DaysLeftBadge days={d.daysLeft} />
                      </div>
                    ))}
                  </div>
                </div>

                {/* Audiencias */}
                <div className="rounded-2xl overflow-hidden" style={{ border: "1px solid rgba(255,255,255,0.08)" }}>
                  <div className="px-5 py-4" style={{ background: "rgba(255,255,255,0.05)", borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
                    <h3 className="text-white font-semibold flex items-center gap-2"><Calendar size={15} style={{ color: "#3b82f6" }} />Audiencias Programadas</h3>
                  </div>
                  <div className="p-4 space-y-3">
                    {selected.hearings.map((h, i) => (
                      <div key={i} className="p-3 rounded-xl" style={{ background: "rgba(255,255,255,0.04)" }}>
                        <p className="text-white text-sm font-medium">{h.type}</p>
                        <p className="text-xs mt-1" style={{ color: "#60a5fa" }}>{h.date} · {h.time}</p>
                        <p className="text-xs mt-0.5" style={{ color: "rgba(255,255,255,0.4)" }}>{h.sala} · {h.juez}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Acuerdos */}
                <div className="md:col-span-2 rounded-2xl overflow-hidden" style={{ border: "1px solid rgba(255,255,255,0.08)" }}>
                  <div className="px-5 py-4" style={{ background: "rgba(255,255,255,0.05)", borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
                    <h3 className="text-white font-semibold flex items-center gap-2"><BookOpen size={15} style={{ color: "#a855f7" }} />Acuerdos del Expediente</h3>
                  </div>
                  <div className="p-4 space-y-2">
                    {selected.acuerdos.map((a, i) => (
                      <div key={i} className="flex items-start gap-3 p-3 rounded-xl" style={{ background: "rgba(255,255,255,0.03)" }}>
                        <div className="w-1.5 h-1.5 rounded-full mt-2 flex-shrink-0" style={{ background: "#a855f7" }} />
                        <p className="text-sm" style={{ color: "rgba(255,255,255,0.7)" }}>{a}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          )
        )}
      </div>
    </div>
  );
}
