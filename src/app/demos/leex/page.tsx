"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  AlertCircle,
  ArrowLeft,
  Building2,
  CheckCircle2,
  ChevronRight,
  DollarSign,
  FileText,
  Home,
  Plus,
  Settings,
  TrendingUp,
  Upload,
  User,
  Wrench,
  X,
} from "lucide-react";
import Link from "next/link";

type Tab = "dashboard" | "propiedades" | "contratos" | "pagos" | "mantenimiento";

interface Unit {
  id: string;
  tipo: string;
  area: string;
  piso: number;
  inquilino: string | null;
  renta: number;
  status: "ocupado" | "disponible" | "mantenimiento";
  vencimiento: string | null;
  saldo: number;
}

interface MaintenanceReq {
  id: number;
  unit: string;
  tipo: string;
  descripcion: string;
  prioridad: "urgente" | "normal" | "baja";
  status: "abierta" | "en_progreso" | "resuelta";
  fecha: string;
}

const units: Unit[] = [
  { id: "101", tipo: "Depto 2 Rec", area: "75 m²", piso: 1, inquilino: "Elena Vargas", renta: 12500, status: "ocupado", vencimiento: "31 Ene 2027", saldo: 0 },
  { id: "102", tipo: "Depto 1 Rec", area: "55 m²", piso: 1, inquilino: "Marco Ruiz", renta: 9800, status: "ocupado", vencimiento: "28 Feb 2027", saldo: 9800 },
  { id: "201", tipo: "Depto 3 Rec", area: "95 m²", piso: 2, inquilino: "Familia Gómez", renta: 18000, status: "ocupado", vencimiento: "30 Nov 2026", saldo: 0 },
  { id: "202", tipo: "Depto 2 Rec", area: "75 m²", piso: 2, inquilino: null, renta: 13000, status: "disponible", vencimiento: null, saldo: 0 },
  { id: "301", tipo: "Penthouse", area: "140 m²", piso: 3, inquilino: null, renta: 28000, status: "mantenimiento", vencimiento: null, saldo: 0 },
  { id: "302", tipo: "Depto 2 Rec", area: "78 m²", piso: 3, inquilino: "Dr. Herrera", renta: 14500, status: "ocupado", vencimiento: "15 Dic 2026", saldo: 14500 },
];

const maintenanceReqs: MaintenanceReq[] = [
  { id: 1, unit: "301", tipo: "Plomería", descripcion: "Fuga en baño principal, requiere atención urgente", prioridad: "urgente", status: "en_progreso", fecha: "31 Oct" },
  { id: 2, unit: "102", tipo: "Electricidad", descripcion: "Foco quemado en cocina y sala", prioridad: "normal", status: "abierta", fecha: "30 Oct" },
  { id: 3, unit: "201", tipo: "Pintura", descripcion: "Manchas de humedad en pared norte", prioridad: "baja", status: "abierta", fecha: "28 Oct" },
  { id: 4, unit: "101", tipo: "Cerrajería", descripcion: "Llave de puerta trasera difícil de girar", prioridad: "normal", status: "resuelta", fecha: "25 Oct" },
];

const statusU = {
  ocupado: { label: "Ocupado", color: "#22c55e", bg: "rgba(34,197,94,0.12)" },
  disponible: { label: "Disponible", color: "#3b82f6", bg: "rgba(59,130,246,0.12)" },
  mantenimiento: { label: "Mantenimiento", color: "#f97316", bg: "rgba(249,115,22,0.12)" },
};

const prioColors = { urgente: "#ef4444", normal: "#f97316", baja: "#22c55e" };
const mStatus = {
  abierta: { label: "Abierta", color: "#f97316" },
  en_progreso: { label: "En Progreso", color: "#3b82f6" },
  resuelta: { label: "Resuelta", color: "#22c55e" },
};

function fmt(n: number) { return `$${n.toLocaleString("es-MX")}`; }

const tabs: { id: Tab; label: string; icon: React.ElementType }[] = [
  { id: "dashboard", label: "Dashboard", icon: TrendingUp },
  { id: "propiedades", label: "Unidades", icon: Home },
  { id: "contratos", label: "Contratos", icon: FileText },
  { id: "pagos", label: "Pagos", icon: DollarSign },
  { id: "mantenimiento", label: "Mantenimiento", icon: Wrench },
];

export default function LeexMvp() {
  const [tab, setTab] = useState<Tab>("dashboard");
  const [payModal, setPayModal] = useState<Unit | null>(null);
  const [unitsList, setUnitsList] = useState(units);
  const [reqs, setReqs] = useState(maintenanceReqs);

  const occupied = unitsList.filter(u => u.status === "ocupado").length;
  const available = unitsList.filter(u => u.status === "disponible").length;
  const totalRenta = unitsList.filter(u => u.status === "ocupado").reduce((s, u) => s + u.renta, 0);
  const pendiente = unitsList.reduce((s, u) => s + u.saldo, 0);

  const markPaid = (unitId: string) => {
    setUnitsList(prev => prev.map(u => u.id === unitId ? { ...u, saldo: 0 } : u));
    setPayModal(null);
  };

  return (
    <div className="min-h-screen flex flex-col" style={{ background: "#0a0f1e" }}>
      {/* Header */}
      <header className="sticky top-0 z-50 border-b" style={{ background: "rgba(10,15,30,0.95)", borderColor: "rgba(255,255,255,0.08)", backdropFilter: "blur(16px)" }}>
        <div className="flex items-center gap-4 px-4 py-3">
          <Link href="/" className="flex items-center gap-2 text-sm" style={{ color: "rgba(255,255,255,0.4)" }}>
            <ArrowLeft size={14} /> Portafolio
          </Link>
          <div className="h-4 w-px" style={{ background: "rgba(255,255,255,0.1)" }} />
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg flex items-center justify-center" style={{ background: "linear-gradient(135deg, #a855f7, #7c3aed)" }}>
              <Building2 size={14} className="text-white" />
            </div>
            <div>
              <span className="text-white font-semibold text-sm">Leex</span>
              <span className="text-xs ml-1.5" style={{ color: "rgba(255,255,255,0.35)" }}>· Torre Residencial Arcos</span>
            </div>
          </div>
          <span className="ml-auto text-xs px-2 py-1 rounded-full" style={{ background: "rgba(168,85,247,0.12)", color: "#c084fc", border: "1px solid rgba(168,85,247,0.25)" }}>
            PropTech · MVP Demo
          </span>
        </div>
        {/* Tabs */}
        <div className="flex gap-1 px-4 pb-2">
          {tabs.map(t => (
            <button key={t.id} onClick={() => setTab(t.id)} className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs transition-all" style={{ background: tab === t.id ? "rgba(168,85,247,0.2)" : "transparent", color: tab === t.id ? "#c084fc" : "rgba(255,255,255,0.45)", border: tab === t.id ? "1px solid rgba(168,85,247,0.35)" : "1px solid transparent" }}>
              <t.icon size={12} />{t.label}
            </button>
          ))}
        </div>
      </header>

      <div className="flex-1 overflow-auto p-6 max-w-6xl mx-auto w-full">
        <AnimatePresence mode="wait">
          {/* DASHBOARD */}
          {tab === "dashboard" && (
            <motion.div key="dash" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                {[
                  { label: "Unidades Ocupadas", value: `${occupied}/6`, color: "#22c55e" },
                  { label: "Disponibles", value: available, color: "#3b82f6" },
                  { label: "Renta Mensual", value: fmt(totalRenta), color: "#a855f7" },
                  { label: "Saldo Pendiente", value: fmt(pendiente), color: "#f97316" },
                ].map(s => (
                  <div key={s.label} className="p-5 rounded-2xl" style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }}>
                    <p className="text-xs mb-2" style={{ color: "rgba(255,255,255,0.45)" }}>{s.label}</p>
                    <p className="text-2xl font-bold" style={{ color: s.color }}>{s.value}</p>
                  </div>
                ))}
              </div>
              {/* Ocupación visual */}
              <div className="p-5 rounded-2xl mb-5" style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }}>
                <h3 className="text-white font-semibold mb-4 text-sm">Mapa de Unidades</h3>
                <div className="grid grid-cols-3 md:grid-cols-6 gap-3">
                  {unitsList.map(u => (
                    <div key={u.id} className="text-center p-3 rounded-xl" style={{ background: `${statusU[u.status].color}12`, border: `1px solid ${statusU[u.status].color}30` }}>
                      <p className="font-bold text-white text-sm">{u.id}</p>
                      <p className="text-xs mt-0.5" style={{ color: statusU[u.status].color }}>{statusU[u.status].label}</p>
                      {u.saldo > 0 && <p className="text-xs mt-1 font-mono" style={{ color: "#f97316" }}>⚠ {fmt(u.saldo)}</p>}
                    </div>
                  ))}
                </div>
              </div>
              {/* Solicitudes urgentes */}
              <div className="p-5 rounded-2xl" style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }}>
                <h3 className="text-white font-semibold mb-3 text-sm">Mantenimiento Urgente</h3>
                {reqs.filter(r => r.prioridad === "urgente" || r.status === "en_progreso").map(r => (
                  <div key={r.id} className="flex items-center gap-3 py-2 border-b" style={{ borderColor: "rgba(255,255,255,0.06)" }}>
                    <div className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: prioColors[r.prioridad] }} />
                    <p className="text-white text-sm flex-1">{r.descripcion.slice(0, 50)}...</p>
                    <span className="text-xs" style={{ color: "rgba(255,255,255,0.4)" }}>Unidad {r.unit}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {/* PROPIEDADES */}
          {tab === "propiedades" && (
            <motion.div key="prop" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="space-y-3">
              {unitsList.map(u => (
                <div key={u.id} className="p-5 rounded-2xl" style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }}>
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 font-bold text-white" style={{ background: `${statusU[u.status].color}20` }}>
                        {u.id}
                      </div>
                      <div>
                        <p className="text-white font-semibold">{u.tipo} · Piso {u.piso}</p>
                        <p className="text-xs" style={{ color: "rgba(255,255,255,0.45)" }}>{u.area}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="text-right">
                        <p className="text-white font-mono">{fmt(u.renta)}<span className="text-xs" style={{ color: "rgba(255,255,255,0.35)" }}>/mes</span></p>
                        {u.inquilino && <p className="text-xs" style={{ color: "rgba(255,255,255,0.45)" }}>{u.inquilino}</p>}
                      </div>
                      <span className="text-xs px-2 py-1 rounded-full flex-shrink-0" style={{ background: statusU[u.status].bg, color: statusU[u.status].color }}>
                        {statusU[u.status].label}
                      </span>
                    </div>
                  </div>
                  {u.saldo > 0 && (
                    <div className="mt-3 flex items-center justify-between p-3 rounded-xl" style={{ background: "rgba(249,115,22,0.1)", border: "1px solid rgba(249,115,22,0.25)" }}>
                      <div className="flex items-center gap-2">
                        <AlertCircle size={14} style={{ color: "#f97316" }} />
                        <p className="text-sm" style={{ color: "#f97316" }}>Pago pendiente: <strong className="font-mono">{fmt(u.saldo)}</strong></p>
                      </div>
                      <button onClick={() => setPayModal(u)} className="text-xs px-3 py-1.5 rounded-lg font-semibold" style={{ background: "rgba(249,115,22,0.2)", color: "#f97316", border: "1px solid rgba(249,115,22,0.3)" }}>
                        Registrar Pago
                      </button>
                    </div>
                  )}
                </div>
              ))}
            </motion.div>
          )}

          {/* CONTRATOS */}
          {tab === "contratos" && (
            <motion.div key="cont" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="space-y-3">
              {unitsList.filter(u => u.inquilino).map(u => {
                const daysLeft = u.vencimiento ? Math.ceil((new Date(u.vencimiento).getTime() - Date.now()) / 86400000) : 0;
                return (
                  <div key={u.id} className="p-5 rounded-2xl" style={{ background: "rgba(255,255,255,0.04)", border: `1px solid ${daysLeft < 45 ? "rgba(249,115,22,0.3)" : "rgba(255,255,255,0.08)"}` }}>
                    <div className="flex items-center justify-between gap-4">
                      <div>
                        <p className="text-white font-semibold">{u.inquilino}</p>
                        <p className="text-xs mt-0.5" style={{ color: "rgba(255,255,255,0.45)" }}>Unidad {u.id} · {u.tipo} · {u.area}</p>
                      </div>
                      <div className="text-right flex-shrink-0">
                        <p className="text-white font-mono text-sm">{fmt(u.renta)}/mes</p>
                        <p className="text-xs mt-0.5" style={{ color: daysLeft < 45 ? "#f97316" : "rgba(255,255,255,0.4)" }}>
                          Vence: {u.vencimiento} ({daysLeft}d)
                        </p>
                      </div>
                    </div>
                    {daysLeft < 45 && (
                      <div className="mt-3 flex items-center gap-2 text-xs" style={{ color: "#f97316" }}>
                        <AlertCircle size={12} />
                        Contrato próximo a vencer — considera renovación
                      </div>
                    )}
                  </div>
                );
              })}
            </motion.div>
          )}

          {/* PAGOS */}
          {tab === "pagos" && (
            <motion.div key="pagos" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              <h2 className="text-xl font-bold text-white mb-5">Estado de Cuenta — Noviembre 2026</h2>
              <div className="space-y-3">
                {unitsList.filter(u => u.inquilino).map(u => (
                  <div key={u.id} className="flex items-center gap-4 p-4 rounded-2xl" style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }}>
                    <div className="w-9 h-9 rounded-xl flex items-center justify-center font-bold text-white flex-shrink-0" style={{ background: "rgba(168,85,247,0.2)" }}>{u.id}</div>
                    <div className="flex-1">
                      <p className="text-white font-medium">{u.inquilino}</p>
                      <p className="text-xs" style={{ color: "rgba(255,255,255,0.4)" }}>Renta: {fmt(u.renta)}/mes</p>
                    </div>
                    <div className="text-right">
                      <p className="font-mono font-bold" style={{ color: u.saldo > 0 ? "#f97316" : "#22c55e" }}>
                        {u.saldo > 0 ? fmt(u.saldo) : "Al corriente"}
                      </p>
                    </div>
                    {u.saldo > 0 ? (
                      <button onClick={() => setPayModal(u)} className="text-xs px-3 py-1.5 rounded-lg flex-shrink-0" style={{ background: "rgba(34,197,94,0.15)", color: "#22c55e", border: "1px solid rgba(34,197,94,0.3)" }}>
                        Validar pago
                      </button>
                    ) : (
                      <CheckCircle2 size={18} style={{ color: "#22c55e" }} />
                    )}
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {/* MANTENIMIENTO */}
          {tab === "mantenimiento" && (
            <motion.div key="mant" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="space-y-3">
              {reqs.map(r => (
                <div key={r.id} className="p-5 rounded-2xl" style={{ background: "rgba(255,255,255,0.04)", border: `1px solid ${r.prioridad === "urgente" ? "rgba(239,68,68,0.3)" : "rgba(255,255,255,0.08)"}` }}>
                  <div className="flex items-start justify-between gap-4 mb-2">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-xs px-2 py-0.5 rounded-full" style={{ background: `${prioColors[r.prioridad]}15`, color: prioColors[r.prioridad] }}>{r.prioridad}</span>
                        <span className="text-xs" style={{ color: mStatus[r.status].color }}>● {mStatus[r.status].label}</span>
                      </div>
                      <p className="text-white font-medium">{r.tipo} · Unidad {r.unit}</p>
                      <p className="text-sm mt-1" style={{ color: "rgba(255,255,255,0.55)" }}>{r.descripcion}</p>
                    </div>
                    <div className="text-right flex-shrink-0">
                      <p className="text-xs" style={{ color: "rgba(255,255,255,0.35)" }}>{r.fecha}</p>
                      {r.status !== "resuelta" && (
                        <button onClick={() => setReqs(prev => prev.map(req => req.id === r.id ? { ...req, status: req.status === "abierta" ? "en_progreso" : "resuelta" } : req))} className="mt-2 text-xs px-3 py-1 rounded-lg" style={{ background: "rgba(59,130,246,0.15)", color: "#60a5fa", border: "1px solid rgba(59,130,246,0.3)" }}>
                          {r.status === "abierta" ? "Iniciar" : "Resolver"}
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Pay Modal */}
      <AnimatePresence>
        {payModal && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ background: "rgba(0,0,0,0.75)" }}>
            <motion.div initial={{ scale: 0.9 }} animate={{ scale: 1 }} className="w-full max-w-sm p-6 rounded-2xl" style={{ background: "#1c2128", border: "1px solid rgba(255,255,255,0.1)" }}>
              <div className="flex items-center justify-between mb-5">
                <h3 className="text-white font-bold">Registrar Pago</h3>
                <button onClick={() => setPayModal(null)}><X size={18} style={{ color: "rgba(255,255,255,0.4)" }} /></button>
              </div>
              <div className="p-4 rounded-xl mb-4" style={{ background: "rgba(255,255,255,0.05)" }}>
                <p className="text-xs mb-1" style={{ color: "rgba(255,255,255,0.45)" }}>Inquilino</p>
                <p className="text-white font-semibold">{payModal.inquilino}</p>
                <p className="text-xs mt-2" style={{ color: "rgba(255,255,255,0.45)" }}>Monto a validar</p>
                <p className="text-2xl font-bold mt-1" style={{ color: "#22c55e" }}>{fmt(payModal.saldo)}</p>
              </div>
              <div className="flex items-center gap-3 p-3 mb-4 rounded-xl" style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }}>
                <Upload size={16} style={{ color: "rgba(255,255,255,0.4)" }} />
                <span className="text-sm" style={{ color: "rgba(255,255,255,0.4)" }}>Comprobante adjunto (simulado)</span>
                <span className="ml-auto text-xs" style={{ color: "#22c55e" }}>✓ recibo.pdf</span>
              </div>
              <button onClick={() => markPaid(payModal.id)} className="w-full py-3 rounded-xl text-white font-semibold" style={{ background: "linear-gradient(135deg, #22c55e, #16a34a)" }}>
                Confirmar Pago Recibido
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
