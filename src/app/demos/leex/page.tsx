"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  AlertCircle,
  AlertTriangle,
  ArrowLeft,
  ArrowRight,
  BadgePercent,
  Building,
  Building2,
  Calendar,
  CheckCircle2,
  ChevronDown,
  Clock,
  Coins,
  DollarSign,
  Download,
  Eye,
  FileCheck,
  FileSignature,
  FileText,
  Filter,
  Flame,
  Home,
  Layers,
  MapPin,
  MessageCircle,
  Phone,
  Plus,
  RefreshCw,
  Search,
  Send,
  Sparkles,
  Tag,
  User,
  Users,
  Wrench,
  X,
  Zap,
} from "lucide-react";
import Link from "next/link";

interface Unit {
  id: string;
  floor: number;
  label: string;
  type: "Local Comercial" | "Departamento" | "Penthouse" | "Oficina";
  area: string;
  renta: number;
  mantenimiento: number;
  status: "al_dia" | "adeudo" | "disponible" | "mantenimiento";
  inquilino: string | null;
  telefono: string | null;
  contratoVence: string | null;
  diasRestantesContrato: number | null;
  adeudoMonto: number;
}

interface SolicitudMantenimiento {
  id: number;
  unidad: string;
  categoria: "Plomería" | "Electricidad" | "Cerrajería" | "Clima";
  descripcion: string;
  urgencia: "alta" | "media" | "baja";
  estado: "pendiente" | "en_proceso" | "completado";
  fecha: string;
}

const unidadesData: Unit[] = [
  // Piso 1 (Comercial)
  { id: "L-101", floor: 1, label: "Local 101 (Planta Baja)", type: "Local Comercial", area: "85 m²", renta: 22000, mantenimiento: 2500, status: "al_dia", inquilino: "Cafetería La Selva S.A.", telefono: "33-1234-5678", contratoVence: "31 Ene 2027", diasRestantesContrato: 454, adeudoMonto: 0 },
  { id: "L-102", floor: 1, label: "Local 102 (Planta Baja)", type: "Local Comercial", area: "60 m²", renta: 16500, mantenimiento: 1800, status: "adeudo", inquilino: "Boutique & Moda Urbana", telefono: "33-8765-4321", contratoVence: "15 Dic 2026", diasRestantesContrato: 42, adeudoMonto: 16500 },
  { id: "L-103", floor: 1, label: "Local 103 (Esquina)", type: "Local Comercial", area: "110 m²", renta: 28000, mantenimiento: 3000, status: "disponible", inquilino: null, telefono: null, contratoVence: null, diasRestantesContrato: null, adeudoMonto: 0 },

  // Piso 2 (Oficinas / Deptos)
  { id: "D-201", floor: 2, label: "Depto 201 (Balcón)", type: "Departamento", area: "90 m²", renta: 14500, mantenimiento: 1500, status: "al_dia", inquilino: "Dra. Marcela Fuentes", telefono: "33-4455-6677", contratoVence: "30 Mar 2027", diasRestantesContrato: 512, adeudoMonto: 0 },
  { id: "D-202", floor: 2, label: "Depto 202 (Interior)", type: "Departamento", area: "75 m²", renta: 12000, mantenimiento: 1500, status: "adeudo", inquilino: "Ing. Jorge Villaseñor", telefono: "33-9988-7766", contratoVence: "28 Feb 2027", diasRestantesContrato: 482, adeudoMonto: 12000 },
  { id: "O-203", floor: 2, label: "Oficina 203 (Cowork)", type: "Oficina", area: "120 m²", renta: 24000, mantenimiento: 2800, status: "al_dia", inquilino: "Studio Digital Nexus", telefono: "33-5566-7788", contratoVence: "10 Ago 2027", diasRestantesContrato: 645, adeudoMonto: 0 },

  // Piso 3 (Residencial & Penthouse)
  { id: "P-301", floor: 3, label: "Penthouse 301 (Terraza)", type: "Penthouse", area: "160 m²", renta: 32000, mantenimiento: 3500, status: "mantenimiento", inquilino: null, telefono: null, contratoVence: null, diasRestantesContrato: null, adeudoMonto: 0 },
  { id: "D-302", floor: 3, label: "Depto 302 (Vista Parque)", type: "Departamento", area: "95 m²", renta: 15500, mantenimiento: 1600, status: "al_dia", inquilino: "Familia Navarro Ruiz", telefono: "33-2233-4455", contratoVence: "15 Ene 2027", diasRestantesContrato: 438, adeudoMonto: 0 },
];

const mantenimientosData: SolicitudMantenimiento[] = [
  { id: 1, unidad: "P-301", categoria: "Clima", descripcion: "Instalación de compresor inverter para recámara principal", urgencia: "alta", estado: "en_proceso", fecha: "02 Nov 2026" },
  { id: 2, unidad: "L-102", categoria: "Electricidad", descripcion: "Falla en breakers de iluminación de vitrina", urgencia: "media", estado: "pendiente", fecha: "01 Nov 2026" },
  { id: 3, unidad: "D-202", categoria: "Plomería", descripcion: "Presión baja de agua en regadera secundaria", urgencia: "baja", estado: "completado", fecha: "29 Oct 2026" },
];

function fmt(n: number) {
  return `$${n.toLocaleString("es-MX")}`;
}

export default function LeexSaaSPage() {
  const [unidades, setUnidades] = useState<Unit[]>(unidadesData);
  const [selectedUnit, setSelectedUnit] = useState<Unit>(unidadesData[1]); // Default L-102 (adeudo)
  const [filterFloor, setFilterFloor] = useState<number | "todos">("todos");
  const [propiedadActiva, setPropiedadActiva] = useState("Torre Providencia & Plaza");

  // Modal Pago
  const [modalPago, setModalPago] = useState(false);
  const [notif, setNotif] = useState<string | null>(null);

  const totalRentaMensual = unidades.filter(u => u.status === "al_dia" || u.status === "adeudo").reduce((acc, u) => acc + u.renta, 0);
  const totalAdeudo = unidades.reduce((acc, u) => acc + u.adeudoMonto, 0);
  const ocupacion = Math.round((unidades.filter(u => u.inquilino !== null).length / unidades.length) * 100);

  const registrarPago = () => {
    if (!selectedUnit) return;
    setUnidades(prev =>
      prev.map(u => (u.id === selectedUnit.id ? { ...u, status: "al_dia", adeudoMonto: 0 } : u))
    );
    setSelectedUnit(prev => ({ ...prev, status: "al_dia", adeudoMonto: 0 }));
    setModalPago(false);
    setNotif(`Pago de renta registrado para ${selectedUnit.label}. Comprobante fiscal generado.`);
    setTimeout(() => setNotif(null), 4000);
  };

  return (
    <div className="min-h-screen bg-[#0c0a09] text-stone-200 flex flex-col font-sans selection:bg-orange-500/30 selection:text-orange-200">
      {/* Toast Notification */}
      <AnimatePresence>
        {notif && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed top-4 right-6 z-50 flex items-center gap-2 rounded-xl border border-orange-500/40 bg-stone-900/95 px-4 py-3 text-xs font-medium text-orange-200 shadow-2xl backdrop-blur-md"
          >
            <CheckCircle2 className="size-4 text-orange-400 shrink-0" />
            <span>{notif}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Top Banner */}
      <header className="h-12 bg-[#1c1917] border-b border-stone-800 px-4 sm:px-6 flex items-center justify-between text-xs">
        <div className="flex items-center gap-3">
          <Link
            href="/demos"
            className="flex items-center gap-1.5 text-orange-400 hover:text-orange-300 font-semibold transition"
          >
            <ArrowLeft className="size-3.5" />
            <span>Hub de Demos</span>
          </Link>
          <span className="text-stone-700">|</span>
          <div className="flex items-center gap-2">
            <span className="size-2 rounded-full bg-orange-500" />
            <strong className="text-stone-100 font-mono tracking-tight">LEEX SAAS</strong>
            <span className="text-stone-400">· Plataforma de Arrendamiento & PropTech</span>
          </div>
        </div>

        <div className="flex items-center gap-4 text-stone-400 text-[11px] font-mono">
          <span className="hidden sm:inline">Multi-Tenant · Livewire 4 + Tailwind</span>
          <span className="bg-orange-500/10 text-orange-400 border border-orange-500/30 px-2 py-0.5 rounded">
            Versión Producción
          </span>
        </div>
      </header>

      {/* PropTech Property Bar */}
      <div className="bg-[#141210] border-b border-stone-800/80 px-4 sm:px-6 py-3 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="size-10 rounded-xl bg-gradient-to-br from-orange-500 to-amber-600 flex items-center justify-center font-bold text-white shadow-md shadow-orange-900/30">
            <Building2 className="size-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-sm font-bold text-white">{propiedadActiva}</h2>
              <span className="text-[10px] font-mono bg-stone-800 text-stone-300 px-2 py-0.5 rounded">
                8 Unidades
              </span>
            </div>
            <p className="text-xs text-stone-400 flex items-center gap-1 mt-0.5">
              <MapPin className="size-3 text-orange-400" />
              Av. Providencia 2450, Col. Providencia, Guadalajara
            </p>
          </div>
        </div>

        <div className="flex items-center gap-4 text-xs font-mono">
          <div className="text-right">
            <p className="text-[10px] text-stone-400 uppercase">Tasa de Ocupación</p>
            <p className="text-base font-bold text-orange-400">{ocupacion}%</p>
          </div>
          <div className="h-8 w-px bg-stone-800" />
          <div className="text-right">
            <p className="text-[10px] text-stone-400 uppercase">Renta Facturada</p>
            <p className="text-base font-bold text-white">{fmt(totalRentaMensual)}</p>
          </div>
          <div className="h-8 w-px bg-stone-800" />
          <div className="text-right">
            <p className="text-[10px] text-stone-400 uppercase">Cartera Vencida</p>
            <p className="text-base font-bold text-rose-400">{fmt(totalAdeudo)}</p>
          </div>
        </div>
      </div>

      {/* Main PropTech Content: Spatial Blueprint & Tenant Details */}
      <main className="flex-1 p-4 sm:p-6 max-w-7xl mx-auto w-full space-y-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Spatial Building Blueprint Floor Grid */}
          <div className="lg:col-span-2 space-y-4">
            <div className="rounded-2xl border border-stone-800 bg-[#171412] p-5 shadow-xl">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-stone-800">
                <div>
                  <h3 className="text-sm font-bold text-white flex items-center gap-2">
                    <Layers className="size-4 text-orange-400" />
                    Plano Espacial de Ocupación por Pisos
                  </h3>
                  <p className="text-xs text-stone-400 mt-0.5">
                    Selecciona cualquier local o departamento para ver el contrato, saldo y ficha del inquilino.
                  </p>
                </div>

                {/* Floor filter */}
                <div className="flex items-center gap-1 text-xs">
                  {(["todos", 3, 2, 1] as const).map(f => (
                    <button
                      key={String(f)}
                      onClick={() => setFilterFloor(f)}
                      className={`px-2.5 py-1 rounded-lg font-mono text-[11px] transition ${
                        filterFloor === f
                          ? "bg-orange-500/20 text-orange-300 border border-orange-500/40 font-bold"
                          : "text-stone-400 hover:text-white hover:bg-stone-800"
                      }`}
                    >
                      {f === "todos" ? "Todos" : `Piso ${f}`}
                    </button>
                  ))}
                </div>
              </div>

              {/* Status Legend */}
              <div className="flex flex-wrap items-center gap-3 py-3 text-[11px] font-mono text-stone-400 border-b border-stone-800/60">
                <span className="flex items-center gap-1.5">
                  <span className="size-2 rounded-full bg-emerald-500" />
                  Al Día
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="size-2 rounded-full bg-orange-500" />
                  Renta Vencida (Adeudo)
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="size-2 rounded-full bg-stone-500" />
                  Disponible
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="size-2 rounded-full bg-rose-500" />
                  Mantenimiento
                </span>
              </div>

              {/* Architectural Unit Grid */}
              <div className="mt-4 space-y-4">
                {[3, 2, 1]
                  .filter(floor => filterFloor === "todos" || filterFloor === floor)
                  .map(floor => (
                    <div key={floor} className="rounded-xl border border-stone-800/80 bg-stone-900/50 p-3.5">
                      <div className="flex items-center justify-between text-xs font-mono text-stone-400 mb-2.5">
                        <span className="font-bold text-stone-300">
                          {floor === 3 && "NIVEL 3 · RESIDENCIAL & ROOFTOP"}
                          {floor === 2 && "NIVEL 2 · OFICINAS & SUITES"}
                          {floor === 1 && "NIVEL 1 · ZONA COMERCIAL & RETAIL"}
                        </span>
                        <span className="text-[10px]">
                          {unidades.filter(u => u.floor === floor).length} Unidades
                        </span>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                        {unidades
                          .filter(u => u.floor === floor)
                          .map(u => {
                            const isSelected = selectedUnit.id === u.id;
                            const isAdeudo = u.status === "adeudo";
                            const isAlDia = u.status === "al_dia";
                            const isDisponible = u.status === "disponible";

                            return (
                              <button
                                key={u.id}
                                onClick={() => setSelectedUnit(u)}
                                className={`text-left p-3 rounded-xl border transition-all relative overflow-hidden ${
                                  isSelected
                                    ? "border-orange-500 bg-orange-950/20 shadow-lg shadow-orange-950/40 ring-1 ring-orange-500"
                                    : "border-stone-800 bg-[#12100e] hover:border-stone-700"
                                }`}
                              >
                                <div className="flex justify-between items-start mb-2">
                                  <span className="font-mono text-xs font-bold text-white">{u.id}</span>
                                  <span
                                    className={`size-2 rounded-full ${
                                      isAlDia
                                        ? "bg-emerald-500"
                                        : isAdeudo
                                        ? "bg-orange-500 animate-pulse"
                                        : isDisponible
                                        ? "bg-stone-600"
                                        : "bg-rose-500"
                                    }`}
                                  />
                                </div>

                                <p className="text-xs font-semibold text-stone-200 truncate">{u.type}</p>
                                <p className="text-[10px] text-stone-400 font-mono mt-0.5">{u.area}</p>

                                <div className="mt-3 pt-2 border-t border-stone-800/80 flex items-baseline justify-between">
                                  <span className="font-mono text-xs font-bold text-white">
                                    {fmt(u.renta)}
                                  </span>
                                  <span className="text-[10px] font-mono text-stone-500">/mes</span>
                                </div>

                                {isAdeudo && (
                                  <div className="mt-1.5 text-[10px] font-mono text-orange-400 font-bold bg-orange-950/40 px-1.5 py-0.5 rounded border border-orange-800/40">
                                    Adeudo: {fmt(u.adeudoMonto)}
                                  </div>
                                )}
                              </button>
                            );
                          })}
                      </div>
                    </div>
                  ))}
              </div>
            </div>

            {/* Mantenimiento Ticket Module */}
            <div className="rounded-2xl border border-stone-800 bg-[#171412] p-5 shadow-xl">
              <h3 className="text-sm font-bold text-white flex items-center gap-2 mb-3">
                <Wrench className="size-4 text-orange-400" />
                Mesa de Ayuda & Mantenimiento de Inmuebles
              </h3>
              <div className="space-y-2.5">
                {mantenimientosData.map(m => (
                  <div
                    key={m.id}
                    className="p-3 rounded-xl border border-stone-800 bg-[#12100e] flex items-center justify-between text-xs"
                  >
                    <div className="flex items-center gap-3">
                      <span className="font-mono text-xs font-bold text-orange-400 bg-orange-950/40 px-2 py-0.5 rounded border border-orange-900/40">
                        {m.unidad}
                      </span>
                      <div>
                        <p className="font-semibold text-stone-200">{m.descripcion}</p>
                        <p className="text-[10px] text-stone-500 font-mono">
                          Cat: {m.categoria} · {m.fecha}
                        </p>
                      </div>
                    </div>
                    <span
                      className={`text-[10px] font-mono uppercase px-2 py-0.5 rounded ${
                        m.estado === "en_proceso"
                          ? "bg-amber-950/40 text-amber-400 border border-amber-800/40"
                          : m.estado === "completado"
                          ? "bg-emerald-950/40 text-emerald-400 border border-emerald-800/40"
                          : "bg-stone-800 text-stone-400"
                      }`}
                    >
                      {m.estado.replace("_", " ")}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Tenant Card & Action Center */}
          <div className="space-y-4">
            <div className="rounded-2xl border border-stone-800 bg-[#171412] p-5 shadow-xl sticky top-4">
              <div className="flex items-start justify-between pb-3 border-b border-stone-800">
                <div>
                  <span className="font-mono text-[10px] uppercase tracking-wider text-orange-400 font-bold">
                    Ficha de la Unidad
                  </span>
                  <h3 className="text-lg font-bold text-white">{selectedUnit.label}</h3>
                  <p className="text-xs text-stone-400">{selectedUnit.type} · {selectedUnit.area}</p>
                </div>

                <span
                  className={`text-[10px] font-mono uppercase px-2 py-1 rounded font-semibold ${
                    selectedUnit.status === "al_dia"
                      ? "bg-emerald-950/60 text-emerald-400 border border-emerald-800/40"
                      : selectedUnit.status === "adeudo"
                      ? "bg-orange-950/60 text-orange-400 border border-orange-800/40"
                      : "bg-stone-800 text-stone-400"
                  }`}
                >
                  {selectedUnit.status === "al_dia" && "Renta al Día"}
                  {selectedUnit.status === "adeudo" && "Pago Pendiente"}
                  {selectedUnit.status === "disponible" && "Disponible"}
                  {selectedUnit.status === "mantenimiento" && "En Mantenimiento"}
                </span>
              </div>

              {/* Tenant Profile */}
              {selectedUnit.inquilino ? (
                <div className="mt-4 space-y-4 text-xs font-mono">
                  <div className="p-3.5 rounded-xl border border-stone-800 bg-[#100e0c]">
                    <span className="text-[10px] text-stone-500 uppercase block mb-1">Arrendatario:</span>
                    <p className="text-sm font-bold text-white font-sans">{selectedUnit.inquilino}</p>
                    <p className="text-stone-400 text-xs mt-0.5">{selectedUnit.telefono}</p>

                    <div className="mt-3 pt-2.5 border-t border-stone-800 flex justify-between text-[11px]">
                      <span className="text-stone-500">Vigencia Contrato:</span>
                      <span className="text-stone-300 font-bold">{selectedUnit.contratoVence}</span>
                    </div>
                    <div className="flex justify-between text-[11px] mt-1">
                      <span className="text-stone-500">Días restantes:</span>
                      <span className="text-orange-400 font-bold">{selectedUnit.diasRestantesContrato} días</span>
                    </div>
                  </div>

                  {/* Financial Breakdown */}
                  <div className="p-3.5 rounded-xl border border-stone-800 bg-[#100e0c] space-y-2">
                    <div className="flex justify-between">
                      <span className="text-stone-400 font-sans">Renta Mensual:</span>
                      <strong className="text-white">{fmt(selectedUnit.renta)}</strong>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-stone-400 font-sans">Cuota Mantenimiento:</span>
                      <strong className="text-stone-300">{fmt(selectedUnit.mantenimiento)}</strong>
                    </div>
                    <div className="flex justify-between border-t border-stone-800 pt-2 text-sm">
                      <span className="font-bold text-stone-200 font-sans">Total por Cobrar:</span>
                      <strong className={selectedUnit.adeudoMonto > 0 ? "text-orange-400 font-extrabold" : "text-emerald-400 font-extrabold"}>
                        {selectedUnit.adeudoMonto > 0 ? fmt(selectedUnit.adeudoMonto) : "$0.00 (Saldado)"}
                      </strong>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="space-y-2 font-sans pt-1">
                    {selectedUnit.adeudoMonto > 0 ? (
                      <>
                        <button
                          onClick={() => setModalPago(true)}
                          className="w-full flex items-center justify-center gap-2 rounded-xl bg-orange-600 hover:bg-orange-500 text-white font-bold py-2.5 text-xs shadow-lg shadow-orange-950/40 transition active:scale-95"
                        >
                          <DollarSign className="size-4" />
                          <span>Registrar Pago de Renta</span>
                        </button>
                        <button
                          onClick={() => alert(`Enviando recordatorio de renta por WhatsApp a ${selectedUnit.telefono}...`)}
                          className="w-full flex items-center justify-center gap-2 rounded-xl border border-stone-700 bg-stone-800 hover:bg-stone-750 text-stone-200 font-semibold py-2 text-xs transition"
                        >
                          <MessageCircle className="size-4 text-emerald-400" />
                          <span>Enviar Recordatorio WhatsApp</span>
                        </button>
                      </>
                    ) : (
                      <div className="p-3 rounded-xl bg-emerald-950/20 border border-emerald-800/40 text-center text-xs text-emerald-400 font-mono flex items-center justify-center gap-1.5">
                        <CheckCircle2 className="size-4" />
                        <span>Renta del mes liquidada</span>
                      </div>
                    )}
                  </div>
                </div>
              ) : (
                <div className="py-10 text-center text-xs text-stone-500 font-mono">
                  <p>Unidad sin contrato activo.</p>
                  <button
                    onClick={() => alert("Abriendo módulo de nuevo contrato de arrendamiento...")}
                    className="mt-3 inline-flex items-center gap-1.5 rounded-xl bg-orange-600 text-white px-3.5 py-1.5 font-bold font-sans text-xs"
                  >
                    <Plus className="size-3.5" />
                    <span>Crear Nuevo Contrato</span>
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>

      {/* MODAL REGISTRAR PAGO */}
      <AnimatePresence>
        {modalPago && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="w-full max-w-md rounded-3xl border border-stone-700 bg-[#171412] p-6 shadow-2xl relative text-stone-100"
            >
              <button
                onClick={() => setModalPago(false)}
                className="absolute top-5 right-5 text-stone-400 hover:text-white p-1"
              >
                <X className="size-5" />
              </button>

              <h3 className="text-base font-bold text-white mb-1">Registrar Cobro de Arrendamiento</h3>
              <p className="text-xs text-stone-400 mb-4">
                Confirmación de pago para la unidad {selectedUnit.label}.
              </p>

              <div className="bg-[#100e0c] p-4 rounded-xl border border-stone-800 text-xs font-mono mb-4 space-y-1.5">
                <div className="flex justify-between">
                  <span className="text-stone-500">Inquilino:</span>
                  <span className="text-white font-bold">{selectedUnit.inquilino}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-stone-500">Importe a liquidar:</span>
                  <span className="text-orange-400 font-bold">{fmt(selectedUnit.adeudoMonto)}</span>
                </div>
              </div>

              <div className="space-y-3 text-xs">
                <div>
                  <label className="block text-stone-400 mb-1">Forma de Pago:</label>
                  <select className="w-full bg-[#100e0c] border border-stone-700 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-orange-500">
                    <option>Transferencia SPEI (Comprobante verificado)</option>
                    <option>Depósito en cuenta concentradora</option>
                    <option>Tarjeta de débito/crédito en oficina</option>
                  </select>
                </div>
                <div>
                  <label className="block text-stone-400 mb-1">Referencia o Autorización:</label>
                  <input
                    type="text"
                    defaultValue="SPEI-884920412"
                    className="w-full bg-[#100e0c] border border-stone-700 rounded-xl px-3 py-2 font-mono text-white focus:outline-none focus:border-orange-500"
                  />
                </div>
              </div>

              <div className="mt-6 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setModalPago(false)}
                  className="px-4 py-2 rounded-xl bg-stone-800 text-stone-300 font-semibold hover:bg-stone-700 transition"
                >
                  Cancelar
                </button>
                <button
                  type="button"
                  onClick={registrarPago}
                  className="px-5 py-2 rounded-xl bg-orange-600 hover:bg-orange-500 text-white font-bold shadow-md transition active:scale-95"
                >
                  Confirmar Pago y Recibo
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
