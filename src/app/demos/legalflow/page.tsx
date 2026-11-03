"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  AlertCircle,
  AlertTriangle,
  ArrowLeft,
  Bell,
  Bookmark,
  Calendar,
  CheckCircle2,
  ChevronDown,
  ChevronRight,
  Clock,
  Compass,
  FileCheck,
  FileText,
  Filter,
  Gavel,
  HelpCircle,
  Hourglass,
  Layers,
  MapPin,
  Maximize2,
  Phone,
  Plus,
  Scale,
  Search,
  Send,
  ShieldAlert,
  Smartphone,
  Star,
  Tablet,
  Tag,
  User,
  X,
  Zap,
} from "lucide-react";
import Link from "next/link";
import { DemoSystemHeader } from "@/components/demos/demo-system-header";
import { mvcShowcases } from "@/lib/data";

const legalProject = mvcShowcases.find((s) => s.id === "despacho-legal")!;

interface JuicioExpediente {
  id: string;
  numExpediente: string;
  materia: "Mercantil" | "Civil" | "Laboral" | "Amparo";
  juzgado: string;
  actor: string;
  demandado: string;
  cuantia: number;
  etapaProcesal: "Radicación" | "Emplazamiento" | "Pruebas" | "Alegatos" | "Sentencia";
  terminoUrgente: {
    concepto: string;
    vencimiento: string;
    horasRestantes: number;
    severidad: "rojo" | "amarillo" | "verde";
  } | null;
  audienciaProxima: {
    fecha: string;
    tipo: string;
    sala: string;
  } | null;
  acuerdosRecientes: {
    fecha: string;
    sintesis: string;
  }[];
}

const expedientesData: JuicioExpediente[] = [
  {
    id: "EXP-801",
    numExpediente: "1042/2026",
    materia: "Mercantil",
    juzgado: "Juzgado 3° de lo Mercantil GDL",
    actor: "Distribuidora del Norte S.A.",
    demandado: "Comercializadora Bajío S.A. de C.V.",
    cuantia: 850000,
    etapaProcesal: "Pruebas",
    terminoUrgente: {
      concepto: "Desahogo de Prueba Pericial Contable",
      vencimiento: "04 Nov 2026 23:59",
      horasRestantes: 28,
      severidad: "rojo",
    },
    audienciaProxima: {
      fecha: "12 Nov 10:30",
      tipo: "Audiencia de Juicio Oral",
      sala: "Sala de Juicios Orales 2",
    },
    acuerdosRecientes: [
      { fecha: "31 Oct", sintesis: "Se tiene por rendido dictamen pericial en materia contable. Vista a las partes por 3 días." },
      { fecha: "24 Oct", sintesis: "Auto que admite documentales supervenientes presentadas por la actora." },
    ],
  },
  {
    id: "EXP-802",
    numExpediente: "450/2026-II",
    materia: "Amparo",
    juzgado: "Juzgado 2° de Distrito en Materia Administrativa",
    actor: "Desarrollos Urbanos Providencia S.A.",
    demandado: "Secretaría de Obras Públicas de Zapopan",
    cuantia: 0,
    etapaProcesal: "Alegatos",
    terminoUrgente: {
      concepto: "Contestación de Requerimiento de Informe Previo",
      vencimiento: "06 Nov 2026 14:00",
      horasRestantes: 72,
      severidad: "amarillo",
    },
    audienciaProxima: {
      fecha: "18 Nov 11:00",
      tipo: "Audiencia Constitucional",
      sala: "Juzgado Segundo de Distrito",
    },
    acuerdosRecientes: [
      { fecha: "01 Nov", sintesis: "Se concede suspensión provisional para efecto de conservar el estado que guardan las cosas." },
    ],
  },
  {
    id: "EXP-803",
    numExpediente: "789/2025",
    materia: "Civil",
    juzgado: "Juzgado 5° de lo Civil de Primera Instancia",
    actor: "Familia Morales Gutiérrez",
    demandado: "Constructora del Valle Residencial",
    cuantia: 1450000,
    etapaProcesal: "Sentencia",
    terminoUrgente: null,
    audienciaProxima: null,
    acuerdosRecientes: [
      { fecha: "28 Oct", sintesis: "Se turnan los autos al C. Juez para el dictado de la sentencia definitiva correspondiente." },
    ],
  },
  {
    id: "EXP-804",
    numExpediente: "112/2026",
    materia: "Laboral",
    juzgado: "Tribunal Laboral Federal de Asuntos Individuales",
    actor: "Lic. Javier Orozco",
    demandado: "Tecnología Logística S.A.",
    cuantia: 320000,
    etapaProcesal: "Emplazamiento",
    terminoUrgente: {
      concepto: "Manifestaciones a Contestación de Demanda",
      vencimiento: "10 Nov 2026",
      horasRestantes: 168,
      severidad: "verde",
    },
    audienciaProxima: {
      fecha: "24 Nov 09:30",
      tipo: "Audiencia Preliminar",
      sala: "Sala A Tribunal Laboral",
    },
    acuerdosRecientes: [
      { fecha: "29 Oct", sintesis: "Se notifica contestación de demanda de la parte patronal. Se corre traslado." },
    ],
  },
];

function fmt(n: number) {
  return `$${n.toLocaleString("es-MX")}`;
}

export default function LegalFlowPage() {
  const [viewMode, setViewMode] = useState<"mobile" | "desktop">("mobile");
  const [activeSegment, setActiveSegment] = useState<"expedientes" | "terminos" | "audiencias">("expedientes");
  const [expedientes, setExpedientes] = useState<JuicioExpediente[]>(expedientesData);
  const [selectedExp, setSelectedExp] = useState<JuicioExpediente>(expedientesData[0]);
  const [materiaFilter, setMateriaFilter] = useState<string>("Todas");

  // Modal Nuevo Término
  const [modalNuevoAcuerdo, setModalNuevoAcuerdo] = useState(false);
  const [sintesisTexto, setSintesisTexto] = useState("");

  const terminosUrgentes = expedientes.filter(e => e.terminoUrgente !== null);

  const agregarAcuerdo = () => {
    if (!sintesisTexto || !selectedExp) return;
    const nuevo = { fecha: "Hoy", sintesis: sintesisTexto };
    setExpedientes(prev =>
      prev.map(e => (e.id === selectedExp.id ? { ...e, acuerdosRecientes: [nuevo, ...e.acuerdosRecientes] } : e))
    );
    setSelectedExp(prev => ({ ...prev, acuerdosRecientes: [nuevo, ...prev.acuerdosRecientes] }));
    setModalNuevoAcuerdo(false);
    setSintesisTexto("");
  };

  return (
    <div className="min-h-screen bg-[#1a050d] text-rose-100 flex flex-col font-sans selection:bg-rose-600 selection:text-white">
      {/* Top Application Header with Ficha Técnica (5 Puntos) */}
      <DemoSystemHeader project={legalProject} />

      {/* Sub-toolbar with View Switcher */}
      <div className="bg-[#240612] border-b border-rose-900/60 px-4 py-2 flex items-center justify-between text-xs">
        <div className="flex items-center gap-2 font-mono text-[11px] text-rose-300">
          <Scale className="size-3.5 text-amber-400" />
          <span>Simulador de Entorno Judicial (GDL / CDMX)</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-[11px] font-mono text-rose-400 hidden sm:inline">Modo de Vista:</span>
          <div className="flex items-center rounded-lg border border-rose-800/80 bg-rose-950/60 p-0.5 text-xs">
            <button
              onClick={() => setViewMode("mobile")}
              className={`flex items-center gap-1 px-2.5 py-1 rounded-md transition ${
                viewMode === "mobile"
                  ? "bg-rose-700 text-white font-bold shadow"
                  : "text-rose-400 hover:text-white"
              }`}
            >
              <Smartphone className="size-3" />
              <span>Ionic App</span>
            </button>
            <button
              onClick={() => setViewMode("desktop")}
              className={`flex items-center gap-1 px-2.5 py-1 rounded-md transition ${
                viewMode === "desktop"
                  ? "bg-rose-700 text-white font-bold shadow"
                  : "text-rose-400 hover:text-white"
              }`}
            >
              <Tablet className="size-3" />
              <span>Consola Despacho</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Judicial Area */}
      <main className="flex-1 flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
        {viewMode === "mobile" ? (
          /* IONIC 8 MOBILE DEVICE CONTAINER */
          <div className="w-full max-w-sm rounded-[40px] border-[6px] border-rose-950 bg-[#250713] shadow-2xl shadow-rose-950/80 overflow-hidden flex flex-col h-[740px] relative ring-1 ring-rose-800/50">
            {/* iOS Dynamic Island & Status Bar */}
            <div className="bg-[#1e050f] pt-3 pb-2 px-6 flex justify-between items-center text-[11px] font-mono text-rose-300 select-none">
              <span>9:41</span>
              <div className="w-20 h-4 bg-black rounded-full" />
              <div className="flex items-center gap-1">
                <span>5G</span>
                <span className="text-xs">100%</span>
              </div>
            </div>

            {/* Ionic App Header */}
            <div className="bg-gradient-to-r from-rose-900 to-[#3d091e] px-4 py-3 text-white border-b border-rose-800/60 shadow-md">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-[10px] uppercase tracking-widest text-amber-300 font-mono font-bold">
                    Despacho Jurídico
                  </p>
                  <h2 className="text-base font-bold font-serif">LegalFlow Mobile</h2>
                </div>
                <div className="size-8 rounded-full bg-rose-950/60 border border-amber-400/40 flex items-center justify-center text-amber-400">
                  <Gavel className="size-4" />
                </div>
              </div>

              {/* Ionic Segmented Control (ion-segment) */}
              <div className="mt-3 flex rounded-xl bg-rose-950/80 p-0.5 text-xs font-mono">
                {(["expedientes", "terminos", "audiencias"] as const).map(tab => (
                  <button
                    key={tab}
                    onClick={() => setActiveSegment(tab)}
                    className={`flex-1 py-1.5 text-center rounded-lg capitalize transition text-[11px] ${
                      activeSegment === tab
                        ? "bg-rose-700 text-white font-bold shadow"
                        : "text-rose-300 hover:text-white"
                    }`}
                  >
                    {tab === "expedientes" ? "Juicios" : tab === "terminos" ? "Términos" : "Citas"}
                  </button>
                ))}
              </div>
            </div>

            {/* Ionic Content Scrollable Body */}
            <div className="flex-1 overflow-y-auto p-3 space-y-3">
              {activeSegment === "expedientes" && (
                <div className="space-y-2.5">
                  <div className="text-[11px] font-mono text-rose-400 flex justify-between px-1">
                    <span>{expedientes.length} Expedientes en Trámite</span>
                    <span className="text-amber-400">Jalisco / Federal</span>
                  </div>

                  {expedientes.map(exp => (
                    <div
                      key={exp.id}
                      onClick={() => setSelectedExp(exp)}
                      className={`p-3 rounded-2xl border transition-all cursor-pointer ${
                        selectedExp.id === exp.id
                          ? "bg-rose-900/40 border-amber-500/60 shadow-lg shadow-rose-950/60"
                          : "bg-[#2d0817] border-rose-900/60 hover:border-rose-700"
                      }`}
                    >
                      <div className="flex justify-between items-start mb-1">
                        <span className="font-mono text-xs font-bold text-amber-300">
                          {exp.numExpediente}
                        </span>
                        <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-rose-950 text-rose-300 border border-rose-800">
                          {exp.materia}
                        </span>
                      </div>

                      <p className="text-xs font-bold text-white line-clamp-1">{exp.actor}</p>
                      <p className="text-[11px] text-rose-300/80 line-clamp-1">vs {exp.demandado}</p>

                      <div className="mt-2.5 pt-2 border-t border-rose-900/60 flex items-center justify-between text-[10px] font-mono">
                        <span className="text-rose-400 truncate max-w-[170px]">{exp.juzgado}</span>
                        <span className="font-bold text-amber-400 bg-rose-950 px-1.5 py-0.5 rounded">
                          {exp.etapaProcesal}
                        </span>
                      </div>

                      {exp.terminoUrgente && (
                        <div className="mt-2 bg-rose-950/80 border border-rose-700/60 p-1.5 rounded-lg flex items-center gap-1.5 text-[10px] text-rose-200">
                          <Hourglass className="size-3 text-amber-400 animate-spin" />
                          <span className="truncate">{exp.terminoUrgente.concepto}</span>
                          <strong className="text-amber-400 ml-auto shrink-0">
                            {exp.terminoUrgente.horasRestantes}h
                          </strong>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}

              {activeSegment === "terminos" && (
                <div className="space-y-2.5">
                  <div className="text-[11px] font-mono text-rose-400 px-1">
                    Semáforo de Términos Procesales
                  </div>

                  {terminosUrgentes.map(exp => (
                    <div
                      key={exp.id}
                      className="p-3.5 rounded-2xl bg-gradient-to-br from-rose-950 to-[#2c0818] border border-rose-800 space-y-2"
                    >
                      <div className="flex justify-between items-center text-xs">
                        <span className="font-mono font-bold text-amber-300">{exp.numExpediente}</span>
                        <span className="font-mono text-[10px] text-rose-400">{exp.materia}</span>
                      </div>

                      <p className="text-xs font-semibold text-white">
                        {exp.terminoUrgente?.concepto}
                      </p>

                      <div className="flex items-center justify-between pt-2 border-t border-rose-900 text-[11px] font-mono">
                        <span className="text-rose-400">Vence: {exp.terminoUrgente?.vencimiento}</span>
                        <span className="font-bold text-amber-400 flex items-center gap-1">
                          <Clock className="size-3" />
                          {exp.terminoUrgente?.horasRestantes} horas
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {activeSegment === "audiencias" && (
                <div className="space-y-2.5">
                  <div className="text-[11px] font-mono text-rose-400 px-1">
                    Agenda de Audiencias Judiciales
                  </div>

                  {expedientes.filter(e => e.audienciaProxima).map(exp => (
                    <div
                      key={exp.id}
                      className="p-3.5 rounded-2xl bg-[#2d0817] border border-rose-800 space-y-2"
                    >
                      <div className="flex justify-between items-center text-xs">
                        <span className="font-mono font-bold text-amber-300">{exp.numExpediente}</span>
                        <span className="font-mono text-[10px] text-emerald-400 bg-emerald-950 px-2 py-0.5 rounded">
                          {exp.audienciaProxima?.fecha}
                        </span>
                      </div>

                      <p className="text-xs font-bold text-white">
                        {exp.audienciaProxima?.tipo}
                      </p>
                      <p className="text-[11px] text-rose-300 flex items-center gap-1">
                        <MapPin className="size-3 text-rose-400" />
                        {exp.audienciaProxima?.sala}
                      </p>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Ionic Bottom Tab Bar (ion-tab-bar) */}
            <div className="bg-[#1e050f] border-t border-rose-900/60 p-2 flex justify-around items-center text-xs font-mono text-rose-400">
              <button
                onClick={() => setActiveSegment("expedientes")}
                className="flex flex-col items-center gap-0.5 text-amber-400"
              >
                <FileText className="size-4" />
                <span className="text-[10px]">Juicios</span>
              </button>
              <button
                onClick={() => setActiveSegment("terminos")}
                className="flex flex-col items-center gap-0.5 hover:text-white"
              >
                <Clock className="size-4" />
                <span className="text-[10px]">Términos</span>
              </button>
              <button
                onClick={() => setModalNuevoAcuerdo(true)}
                className="size-10 rounded-full bg-amber-500 hover:bg-amber-400 text-stone-900 flex items-center justify-center shadow-lg -mt-4 shadow-amber-950"
              >
                <Plus className="size-5" />
              </button>
              <button
                onClick={() => setActiveSegment("audiencias")}
                className="flex flex-col items-center gap-0.5 hover:text-white"
              >
                <Calendar className="size-4" />
                <span className="text-[10px]">Agenda</span>
              </button>
              <button
                onClick={() => alert(`Directorio de Juzgados de Jalisco y Salas Federales.`)}
                className="flex flex-col items-center gap-0.5 hover:text-white"
              >
                <Compass className="size-4" />
                <span className="text-[10px]">Juzgados</span>
              </button>
            </div>
          </div>
        ) : (
          /* DESKTOP DESPACHO TABLE VIEW */
          <div className="w-full max-w-5xl rounded-3xl border border-rose-900 bg-[#250713] p-6 shadow-2xl space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-rose-900">
              <div>
                <h2 className="text-xl font-bold font-serif text-white">Consola de Expedientes Judiciales</h2>
                <p className="text-xs text-rose-400">Control de plazos, acuerdos del boletín judicial y audiencias.</p>
              </div>

              <button
                onClick={() => setModalNuevoAcuerdo(true)}
                className="inline-flex items-center gap-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-900 font-bold px-4 py-2 text-xs transition"
              >
                <Plus className="size-4" />
                <span>Agregar Auto / Acuerdo</span>
              </button>
            </div>

            <div className="overflow-x-auto rounded-2xl border border-rose-900 bg-[#1e050f]">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-rose-900 bg-[#2a0816] font-mono text-[10px] text-rose-400 uppercase">
                    <th className="py-3 px-4">Expediente</th>
                    <th className="py-3 px-4">Partes Procesales</th>
                    <th className="py-3 px-4">Juzgado</th>
                    <th className="py-3 px-4">Etapa</th>
                    <th className="py-3 px-4">Término Próximo</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-rose-950">
                  {expedientes.map(exp => (
                    <tr key={exp.id} className="hover:bg-rose-900/20 transition">
                      <td className="py-3 px-4 font-mono font-bold text-amber-300">
                        {exp.numExpediente}
                        <div className="text-[10px] text-rose-400">{exp.materia}</div>
                      </td>
                      <td className="py-3 px-4">
                        <div className="font-bold text-white">{exp.actor}</div>
                        <div className="text-[11px] text-rose-400">vs {exp.demandado}</div>
                      </td>
                      <td className="py-3 px-4 text-rose-300 text-[11px]">{exp.juzgado}</td>
                      <td className="py-3 px-4">
                        <span className="font-mono text-[10px] bg-rose-950 text-amber-300 border border-rose-800 px-2 py-0.5 rounded">
                          {exp.etapaProcesal}
                        </span>
                      </td>
                      <td className="py-3 px-4">
                        {exp.terminoUrgente ? (
                          <div className="font-mono text-xs text-rose-200">
                            <strong>{exp.terminoUrgente.horasRestantes}h restantes</strong>
                            <div className="text-[10px] text-rose-400">{exp.terminoUrgente.concepto}</div>
                          </div>
                        ) : (
                          <span className="text-rose-500 font-mono text-[11px]">Sin término activo</span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </main>

      {/* MODAL AGREGAR ACUERDO DEL BOLETÍN */}
      <AnimatePresence>
        {modalNuevoAcuerdo && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="w-full max-w-md rounded-3xl border border-rose-800 bg-[#250713] p-6 shadow-2xl relative text-rose-100"
            >
              <button
                onClick={() => setModalNuevoAcuerdo(false)}
                className="absolute top-5 right-5 text-rose-400 hover:text-white p-1"
              >
                <X className="size-5" />
              </button>

              <h3 className="text-base font-bold font-serif text-white mb-1">Registrar Acuerdo Judicial</h3>
              <p className="text-xs text-rose-400 mb-4 font-mono">
                Expediente: {selectedExp.numExpediente} · {selectedExp.juzgado}
              </p>

              <div className="space-y-3 text-xs">
                <div>
                  <label className="block text-rose-300 mb-1">Síntesis del Boletín Judicial:</label>
                  <textarea
                    rows={4}
                    value={sintesisTexto}
                    onChange={e => setSintesisTexto(e.target.value)}
                    placeholder="Ej. Auto que tiene por admitidas las pruebas periciales ofrecidas y se requiere a la contraparte..."
                    className="w-full bg-[#18040d] border border-rose-800 rounded-xl p-3 text-white focus:outline-none focus:border-amber-400 font-mono text-xs leading-relaxed"
                  />
                </div>
              </div>

              <div className="mt-5 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setModalNuevoAcuerdo(false)}
                  className="px-4 py-2 rounded-xl bg-rose-950 text-rose-300 font-semibold hover:bg-rose-900 transition"
                >
                  Cancelar
                </button>
                <button
                  type="button"
                  onClick={agregarAcuerdo}
                  className="px-5 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-900 font-bold shadow-md transition"
                >
                  Guardar en Expediente
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
