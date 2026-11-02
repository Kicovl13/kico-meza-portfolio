"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  AlertTriangle,
  ArrowLeft,
  Building2,
  Camera,
  CheckCircle2,
  ChevronRight,
  Clock,
  FileText,
  Lightbulb,
  MapPin,
  Phone,
  Search,
  Send,
  Shield,
  Trash2,
  Waves,
} from "lucide-react";
import Link from "next/link";

type View = "home" | "report" | "track" | "directory" | "success";
type Category = "bache" | "luminaria" | "agua" | "parque" | "basura" | "seguridad";

interface Report {
  category: Category;
  description: string;
  address: string;
  folio: string;
  status: "recibido" | "en_proceso" | "resuelto";
  createdAt: string;
  department: string;
  progress: number;
}

const categoryConfig: Record<Category, { label: string; icon: React.ElementType; color: string; dept: string }> = {
  bache: { label: "Bache / Pavimento", icon: AlertTriangle, color: "#f97316", dept: "Obras Públicas" },
  luminaria: { label: "Luminaria Dañada", icon: Lightbulb, color: "#eab308", dept: "Alumbrado Público" },
  agua: { label: "Fuga de Agua", icon: Waves, color: "#3b82f6", dept: "Agua y Saneamiento" },
  parque: { label: "Mantenimiento Parque", icon: MapPin, color: "#22c55e", dept: "Parques y Jardines" },
  basura: { label: "Acumulación de Basura", icon: Trash2, color: "#a855f7", dept: "Limpia Pública" },
  seguridad: { label: "Seguridad Pública", icon: Shield, color: "#ef4444", dept: "Seguridad Pública" },
};

const mockReports: Report[] = [
  {
    category: "bache",
    description: "Bache de gran tamaño en esquina de Av. López Mateos y Mariano Otero, representa peligro para vehículos",
    address: "Av. López Mateos 2000, Zapopan",
    folio: "ZAP-2026-04721",
    status: "en_proceso",
    createdAt: "29 Oct 2026",
    department: "Obras Públicas",
    progress: 55,
  },
  {
    category: "luminaria",
    description: "Poste de alumbrado sin funcionar desde hace 3 semanas, zona muy oscura en las noches",
    address: "Calle Moctezuma 145, Colonia Jardines",
    folio: "ZAP-2026-04698",
    status: "resuelto",
    createdAt: "22 Oct 2026",
    department: "Alumbrado Público",
    progress: 100,
  },
  {
    category: "agua",
    description: "Fuga de agua potable en banqueta, lleva 5 días activa",
    address: "Calle Independencia 890, Col. Centro",
    folio: "ZAP-2026-04801",
    status: "recibido",
    createdAt: "31 Oct 2026",
    department: "Agua y Saneamiento",
    progress: 15,
  },
];

function generateFolio(): string {
  const num = Math.floor(Math.random() * 9000) + 1000;
  return `ZAP-2026-0${num}`;
}

const statusConfig = {
  recibido: { label: "Recibido", color: "#3b82f6", bg: "rgba(59,130,246,0.15)" },
  en_proceso: { label: "En Proceso", color: "#f97316", bg: "rgba(249,115,22,0.15)" },
  resuelto: { label: "Resuelto", color: "#22c55e", bg: "rgba(34,197,94,0.15)" },
};

const departments = [
  { name: "Obras Públicas", phone: "33-3134-0000", hours: "Lun–Vie 8:00–17:00", icon: Building2 },
  { name: "Alumbrado Público", phone: "33-3134-0010", hours: "24 hrs", icon: Lightbulb },
  { name: "Agua y Saneamiento", phone: "33-3134-0020", hours: "24 hrs", icon: Waves },
  { name: "Parques y Jardines", phone: "33-3134-0030", hours: "Lun–Sáb 7:00–16:00", icon: MapPin },
  { name: "Limpia Pública", phone: "33-3134-0040", hours: "Lun–Dom 6:00–22:00", icon: Trash2 },
  { name: "Seguridad Pública", phone: "33-3134-9000", hours: "24 hrs", icon: Shield },
];

export default function MunicipalMvp() {
  const [view, setView] = useState<View>("home");
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);
  const [description, setDescription] = useState("");
  const [address, setAddress] = useState("");
  const [trackFolio, setTrackFolio] = useState("");
  const [trackResult, setTrackResult] = useState<Report | null>(null);
  const [trackError, setTrackError] = useState(false);
  const [newFolio, setNewFolio] = useState("");

  const handleSubmitReport = () => {
    if (!selectedCategory || !description || !address) return;
    const folio = generateFolio();
    setNewFolio(folio);
    setView("success");
  };

  const handleTrack = () => {
    const found = mockReports.find((r) => r.folio === trackFolio.trim().toUpperCase());
    if (found) {
      setTrackResult(found);
      setTrackError(false);
    } else {
      setTrackResult(null);
      setTrackError(true);
    }
  };

  const resetReport = () => {
    setSelectedCategory(null);
    setDescription("");
    setAddress("");
    setView("home");
  };

  return (
    <div className="min-h-screen" style={{ background: "linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #0f2027 100%)" }}>
      {/* Header */}
      <header style={{ background: "rgba(15,23,42,0.95)", borderBottom: "1px solid rgba(255,255,255,0.08)", backdropFilter: "blur(16px)" }} className="sticky top-0 z-50">
        <div className="max-w-5xl mx-auto px-4 py-3 flex items-center gap-4">
          <Link href="/" className="flex items-center gap-2 text-sm" style={{ color: "rgba(255,255,255,0.5)" }}>
            <ArrowLeft size={16} />
            Portafolio
          </Link>
          <div className="flex items-center gap-3 ml-2">
            <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: "linear-gradient(135deg, #3b82f6, #1d4ed8)" }}>
              <Building2 size={16} className="text-white" />
            </div>
            <div>
              <p className="text-white font-semibold text-sm leading-none">Portal Ciudadano · Zapopan</p>
              <p className="text-xs mt-0.5" style={{ color: "rgba(255,255,255,0.4)" }}>Municipio de Zapopan, Jalisco</p>
            </div>
          </div>
          <span className="ml-auto text-xs px-2 py-1 rounded-full font-medium" style={{ background: "rgba(34,197,94,0.15)", color: "#22c55e", border: "1px solid rgba(34,197,94,0.3)" }}>
            MVP Demo
          </span>
        </div>
      </header>

      <div className="max-w-5xl mx-auto px-4 py-8">
        <AnimatePresence mode="wait">
          {/* HOME */}
          {view === "home" && (
            <motion.div key="home" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}>
              {/* Hero */}
              <div className="text-center mb-10">
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full mb-4 text-xs font-medium" style={{ background: "rgba(59,130,246,0.15)", color: "#60a5fa", border: "1px solid rgba(59,130,246,0.3)" }}>
                  <Shield size={12} />
                  Servicios Digitales Municipales
                </div>
                <h1 className="text-4xl font-bold text-white mb-3">Portal de Atención Ciudadana</h1>
                <p className="text-lg max-w-2xl mx-auto" style={{ color: "rgba(255,255,255,0.6)" }}>
                  Reporta incidencias, consulta tu folio o encuentra las dependencias municipales. Rápido, seguro y sin filas.
                </p>
              </div>

              {/* Cards principales */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                {[
                  { id: "report", label: "Reportar Incidencia", desc: "Baches, luminarias, fugas y más", icon: Send, color: "#3b82f6", gradient: "from-blue-600 to-blue-800" },
                  { id: "track", label: "Consultar Folio", desc: "Rastrea el estatus de tu reporte", icon: Search, color: "#22c55e", gradient: "from-green-600 to-emerald-800" },
                  { id: "directory", label: "Directorio Municipal", desc: "Dependencias, teléfonos y horarios", icon: Phone, color: "#a855f7", gradient: "from-purple-600 to-purple-800" },
                ].map((item) => (
                  <motion.button
                    key={item.id}
                    whileHover={{ scale: 1.02, y: -2 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setView(item.id as View)}
                    className="relative overflow-hidden rounded-2xl p-6 text-left group"
                    style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)" }}
                  >
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity" style={{ background: `linear-gradient(135deg, ${item.color}22, transparent)` }} />
                    <div className="relative z-10">
                      <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-4" style={{ background: `${item.color}22`, border: `1px solid ${item.color}44` }}>
                        <item.icon size={22} style={{ color: item.color }} />
                      </div>
                      <h3 className="text-white font-semibold text-lg mb-1">{item.label}</h3>
                      <p className="text-sm" style={{ color: "rgba(255,255,255,0.5)" }}>{item.desc}</p>
                      <div className="flex items-center gap-1 mt-4 text-sm font-medium" style={{ color: item.color }}>
                        Acceder <ChevronRight size={14} />
                      </div>
                    </div>
                  </motion.button>
                ))}
              </div>

              {/* Reportes recientes */}
              <div className="rounded-2xl p-6" style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }}>
                <h2 className="text-white font-semibold mb-4 flex items-center gap-2">
                  <Clock size={16} style={{ color: "#60a5fa" }} />
                  Reportes de Ejemplo
                </h2>
                <div className="space-y-3">
                  {mockReports.map((r) => {
                    const cat = categoryConfig[r.category];
                    const st = statusConfig[r.status];
                    return (
                      <div key={r.folio} className="flex items-center gap-4 rounded-xl p-3" style={{ background: "rgba(255,255,255,0.04)" }}>
                        <div className="w-9 h-9 rounded-lg flex-shrink-0 flex items-center justify-center" style={{ background: `${cat.color}22` }}>
                          <cat.icon size={16} style={{ color: cat.color }} />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-white text-sm font-medium truncate">{cat.label}</p>
                          <p className="text-xs truncate" style={{ color: "rgba(255,255,255,0.4)" }}>{r.folio} · {r.createdAt}</p>
                        </div>
                        <span className="text-xs px-2 py-1 rounded-full flex-shrink-0" style={{ background: st.bg, color: st.color }}>
                          {st.label}
                        </span>
                      </div>
                    );
                  })}
                </div>
                <p className="text-xs mt-3" style={{ color: "rgba(255,255,255,0.3)" }}>
                  Usa los folios anteriores en "Consultar Folio" para ver el seguimiento en vivo.
                </p>
              </div>
            </motion.div>
          )}

          {/* REPORT */}
          {view === "report" && (
            <motion.div key="report" initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -30 }}>
              <button onClick={() => setView("home")} className="flex items-center gap-2 mb-6 text-sm" style={{ color: "rgba(255,255,255,0.5)" }}>
                <ArrowLeft size={16} /> Volver
              </button>
              <h2 className="text-3xl font-bold text-white mb-2">Reportar Incidencia</h2>
              <p className="mb-8" style={{ color: "rgba(255,255,255,0.5)" }}>Selecciona la categoría y describe el problema con tu ubicación.</p>

              <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mb-6">
                {(Object.keys(categoryConfig) as Category[]).map((cat) => {
                  const c = categoryConfig[cat];
                  return (
                    <motion.button
                      key={cat}
                      whileTap={{ scale: 0.97 }}
                      onClick={() => setSelectedCategory(cat)}
                      className="p-4 rounded-xl text-left transition-all"
                      style={{
                        background: selectedCategory === cat ? `${c.color}22` : "rgba(255,255,255,0.04)",
                        border: `1px solid ${selectedCategory === cat ? c.color + "66" : "rgba(255,255,255,0.08)"}`,
                      }}
                    >
                      <c.icon size={20} style={{ color: c.color }} className="mb-2" />
                      <p className="text-white text-sm font-medium">{c.label}</p>
                      <p className="text-xs mt-0.5" style={{ color: "rgba(255,255,255,0.4)" }}>{c.dept}</p>
                    </motion.button>
                  );
                })}
              </div>

              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium mb-2 block" style={{ color: "rgba(255,255,255,0.7)" }}>Dirección o referencia</label>
                  <div className="relative">
                    <MapPin size={16} className="absolute left-3 top-1/2 -translate-y-1/2" style={{ color: "rgba(255,255,255,0.4)" }} />
                    <input
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      placeholder="Ej: Av. López Mateos 1200, esquina con Mariano Otero"
                      className="w-full pl-10 pr-4 py-3 rounded-xl text-sm outline-none"
                      style={{ background: "rgba(255,255,255,0.07)", border: "1px solid rgba(255,255,255,0.12)", color: "#fff" }}
                    />
                  </div>
                </div>
                <div>
                  <label className="text-sm font-medium mb-2 block" style={{ color: "rgba(255,255,255,0.7)" }}>Descripción del problema</label>
                  <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    rows={3}
                    placeholder="Describe con detalle el problema. Entre más información, más rápida será la atención."
                    className="w-full px-4 py-3 rounded-xl text-sm outline-none resize-none"
                    style={{ background: "rgba(255,255,255,0.07)", border: "1px solid rgba(255,255,255,0.12)", color: "#fff" }}
                  />
                </div>
                <div className="flex items-center gap-3 p-3 rounded-xl" style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }}>
                  <Camera size={18} style={{ color: "rgba(255,255,255,0.4)" }} />
                  <span className="text-sm" style={{ color: "rgba(255,255,255,0.5)" }}>Adjuntar foto (máx. 3, opcionales)</span>
                  <button className="ml-auto text-xs px-3 py-1.5 rounded-lg" style={{ background: "rgba(255,255,255,0.1)", color: "rgba(255,255,255,0.7)" }}>
                    Seleccionar
                  </button>
                </div>
                <motion.button
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.99 }}
                  onClick={handleSubmitReport}
                  disabled={!selectedCategory || !description || !address}
                  className="w-full py-3.5 rounded-xl font-semibold text-white flex items-center justify-center gap-2 transition-all"
                  style={{
                    background: selectedCategory && description && address
                      ? "linear-gradient(135deg, #3b82f6, #1d4ed8)"
                      : "rgba(255,255,255,0.08)",
                    cursor: selectedCategory && description && address ? "pointer" : "not-allowed",
                  }}
                >
                  <Send size={16} />
                  Enviar Reporte
                </motion.button>
              </div>
            </motion.div>
          )}

          {/* SUCCESS */}
          {view === "success" && (
            <motion.div key="success" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="text-center py-16">
              <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.2, type: "spring" }} className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6" style={{ background: "rgba(34,197,94,0.2)", border: "2px solid #22c55e" }}>
                <CheckCircle2 size={36} style={{ color: "#22c55e" }} />
              </motion.div>
              <h2 className="text-3xl font-bold text-white mb-3">¡Reporte Enviado!</h2>
              <p className="mb-6" style={{ color: "rgba(255,255,255,0.6)" }}>Tu reporte fue recibido y será atendido a la brevedad.</p>
              <div className="inline-block px-6 py-4 rounded-2xl mb-8" style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)" }}>
                <p className="text-xs mb-1" style={{ color: "rgba(255,255,255,0.5)" }}>Tu número de folio</p>
                <p className="text-2xl font-bold text-white font-mono">{newFolio}</p>
                <p className="text-xs mt-1" style={{ color: "rgba(255,255,255,0.4)" }}>Guárdalo para rastrear tu reporte</p>
              </div>
              <div className="flex gap-3 justify-center">
                <button onClick={() => { setTrackFolio(newFolio); setView("track"); }} className="px-5 py-2.5 rounded-xl text-sm font-medium" style={{ background: "rgba(34,197,94,0.2)", color: "#22c55e", border: "1px solid rgba(34,197,94,0.3)" }}>
                  Rastrear Folio
                </button>
                <button onClick={resetReport} className="px-5 py-2.5 rounded-xl text-sm font-medium" style={{ background: "rgba(255,255,255,0.08)", color: "rgba(255,255,255,0.7)" }}>
                  Nuevo Reporte
                </button>
              </div>
            </motion.div>
          )}

          {/* TRACK */}
          {view === "track" && (
            <motion.div key="track" initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -30 }}>
              <button onClick={() => setView("home")} className="flex items-center gap-2 mb-6 text-sm" style={{ color: "rgba(255,255,255,0.5)" }}>
                <ArrowLeft size={16} /> Volver
              </button>
              <h2 className="text-3xl font-bold text-white mb-2">Consultar Folio</h2>
              <p className="mb-8" style={{ color: "rgba(255,255,255,0.5)" }}>Ingresa tu número de folio para ver el estado de tu reporte.</p>

              <div className="flex gap-3 mb-4">
                <div className="relative flex-1">
                  <FileText size={16} className="absolute left-3 top-1/2 -translate-y-1/2" style={{ color: "rgba(255,255,255,0.4)" }} />
                  <input
                    value={trackFolio}
                    onChange={(e) => setTrackFolio(e.target.value.toUpperCase())}
                    placeholder="ZAP-2026-04721"
                    className="w-full pl-10 pr-4 py-3 rounded-xl text-sm outline-none font-mono"
                    style={{ background: "rgba(255,255,255,0.07)", border: "1px solid rgba(255,255,255,0.12)", color: "#fff" }}
                  />
                </div>
                <button onClick={handleTrack} className="px-5 py-3 rounded-xl font-semibold text-white" style={{ background: "linear-gradient(135deg, #22c55e, #16a34a)" }}>
                  Buscar
                </button>
              </div>

              <p className="text-xs mb-6" style={{ color: "rgba(255,255,255,0.35)" }}>
                Folios de ejemplo: <span className="font-mono">ZAP-2026-04721</span> · <span className="font-mono">ZAP-2026-04698</span> · <span className="font-mono">ZAP-2026-04801</span>
              </p>

              {trackError && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="p-4 rounded-xl mb-4" style={{ background: "rgba(239,68,68,0.1)", border: "1px solid rgba(239,68,68,0.3)" }}>
                  <p className="text-sm" style={{ color: "#f87171" }}>No se encontró ningún reporte con ese folio. Verifica el número e intenta de nuevo.</p>
                </motion.div>
              )}

              {trackResult && (
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="rounded-2xl overflow-hidden" style={{ border: "1px solid rgba(255,255,255,0.1)" }}>
                  {/* Header del resultado */}
                  <div className="p-5" style={{ background: "rgba(255,255,255,0.06)" }}>
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <p className="text-xs mb-1 font-mono" style={{ color: "rgba(255,255,255,0.5)" }}>{trackResult.folio}</p>
                        <h3 className="text-white font-semibold text-lg">{categoryConfig[trackResult.category].label}</h3>
                        <p className="text-sm mt-1" style={{ color: "rgba(255,255,255,0.5)" }}>{trackResult.department}</p>
                      </div>
                      <span className="text-xs px-3 py-1.5 rounded-full flex-shrink-0 font-medium" style={{ background: statusConfig[trackResult.status].bg, color: statusConfig[trackResult.status].color, border: `1px solid ${statusConfig[trackResult.status].color}44` }}>
                        {statusConfig[trackResult.status].label}
                      </span>
                    </div>
                  </div>
                  {/* Barra de progreso */}
                  <div className="px-5 py-4" style={{ background: "rgba(255,255,255,0.03)" }}>
                    <div className="flex justify-between text-xs mb-2" style={{ color: "rgba(255,255,255,0.5)" }}>
                      <span>Progreso de atención</span>
                      <span>{trackResult.progress}%</span>
                    </div>
                    <div className="h-2 rounded-full overflow-hidden" style={{ background: "rgba(255,255,255,0.1)" }}>
                      <motion.div initial={{ width: 0 }} animate={{ width: `${trackResult.progress}%` }} transition={{ duration: 1.2, ease: "easeOut" }} className="h-full rounded-full" style={{ background: `linear-gradient(90deg, ${statusConfig[trackResult.status].color}, ${statusConfig[trackResult.status].color}aa)` }} />
                    </div>
                    <div className="flex justify-between text-xs mt-3" style={{ color: "rgba(255,255,255,0.4)" }}>
                      <span>Reportado: {trackResult.createdAt}</span>
                      <span>{trackResult.address}</span>
                    </div>
                  </div>
                  {/* Descripción */}
                  <div className="px-5 py-4" style={{ background: "rgba(255,255,255,0.02)" }}>
                    <p className="text-sm" style={{ color: "rgba(255,255,255,0.6)" }}>{trackResult.description}</p>
                  </div>
                  {/* Steps */}
                  <div className="px-5 py-4 space-y-3">
                    {[
                      { label: "Reporte recibido", done: true },
                      { label: "Asignado a dependencia", done: trackResult.progress >= 30 },
                      { label: "En campo / atención activa", done: trackResult.progress >= 60 },
                      { label: "Resuelto y verificado", done: trackResult.progress >= 100 },
                    ].map((step, i) => (
                      <div key={i} className="flex items-center gap-3">
                        <div className="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0" style={{ background: step.done ? "rgba(34,197,94,0.2)" : "rgba(255,255,255,0.08)", border: `1px solid ${step.done ? "#22c55e" : "rgba(255,255,255,0.15)"}` }}>
                          {step.done && <CheckCircle2 size={12} style={{ color: "#22c55e" }} />}
                        </div>
                        <p className="text-sm" style={{ color: step.done ? "#fff" : "rgba(255,255,255,0.4)" }}>{step.label}</p>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}
            </motion.div>
          )}

          {/* DIRECTORY */}
          {view === "directory" && (
            <motion.div key="directory" initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -30 }}>
              <button onClick={() => setView("home")} className="flex items-center gap-2 mb-6 text-sm" style={{ color: "rgba(255,255,255,0.5)" }}>
                <ArrowLeft size={16} /> Volver
              </button>
              <h2 className="text-3xl font-bold text-white mb-2">Directorio Municipal</h2>
              <p className="mb-8" style={{ color: "rgba(255,255,255,0.5)" }}>Dependencias municipales, teléfonos y horarios de atención.</p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {departments.map((dept, i) => (
                  <motion.div key={i} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.08 }} className="p-5 rounded-2xl" style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.09)" }}>
                    <div className="flex items-start gap-4">
                      <div className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: "rgba(59,130,246,0.15)", border: "1px solid rgba(59,130,246,0.3)" }}>
                        <dept.icon size={20} style={{ color: "#60a5fa" }} />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-white font-semibold">{dept.name}</h3>
                        <p className="text-sm mt-1 font-mono" style={{ color: "#60a5fa" }}>{dept.phone}</p>
                        <div className="flex items-center gap-1 mt-1">
                          <Clock size={11} style={{ color: "rgba(255,255,255,0.35)" }} />
                          <p className="text-xs" style={{ color: "rgba(255,255,255,0.4)" }}>{dept.hours}</p>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
