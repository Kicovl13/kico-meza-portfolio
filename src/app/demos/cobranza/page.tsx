"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  Banknote,
  Building2,
  Calendar,
  CheckCircle2,
  ChevronDown,
  ChevronRight,
  Clock,
  Copy,
  CreditCard,
  DollarSign,
  Download,
  ExternalLink,
  Eye,
  FileCheck2,
  FileCode2,
  FileSpreadsheet,
  FileText,
  Filter,
  Landmark,
  Layers,
  Link2,
  Mail,
  Maximize2,
  MessageCircle,
  MoreVertical,
  Percent,
  Plus,
  QrCode,
  RefreshCw,
  Search,
  Send,
  ShieldCheck,
  TrendingDown,
  TrendingUp,
  Upload,
  X,
  Zap,
} from "lucide-react";
import Link from "next/link";

interface FacturaPPD {
  id: string;
  uuid: string;
  serieFolio: string;
  cliente: string;
  rfc: string;
  fechaEmision: string;
  fechaVencimiento: string;
  total: number;
  saldoInsoluto: number;
  diasVencido: number;
  status: "pendiente" | "parcial" | "pagada";
  parcialidad: number;
}

interface MovimientoSPEI {
  id: string;
  banco: "BBVA" | "Banorte" | "Santander";
  claveRastreo: string;
  cuenta: string;
  fecha: string;
  monto: number;
  emisor: string;
  rfcEmisor: string;
  conciliado: boolean;
  facturaVinculada?: string;
}

interface ReciboREP {
  id: string;
  uuidRep: string;
  facturaFolio: string;
  uuidFactura: string;
  cliente: string;
  rfc: string;
  montoPago: number;
  saldoAnterior: number;
  saldoInsoluto: number;
  parcialidad: number;
  formaPago: string;
  fechaPago: string;
  cadenaOriginal: string;
  selloSAT: string;
}

const facturasIniciales: FacturaPPD[] = [
  {
    id: "FAC-1001",
    uuid: "4A8E91B2-7C3D-4E5F-A1B2-C3D4E5F60001",
    serieFolio: "A-1042",
    cliente: "Constructora del Bajío S.A. de C.V.",
    rfc: "CBA190412KJ8",
    fechaEmision: "2026-10-05",
    fechaVencimiento: "2026-11-04",
    total: 145000,
    saldoInsoluto: 85000,
    diasVencido: 0,
    status: "parcial",
    parcialidad: 1,
  },
  {
    id: "FAC-1002",
    uuid: "8B1F23C4-9D5E-4F6A-B2C3-D4E5F6A70002",
    serieFolio: "A-1038",
    cliente: "Logística y Fletes del Pacífico S.A.",
    rfc: "LFP210820MN2",
    fechaEmision: "2026-09-15",
    fechaVencimiento: "2026-10-15",
    total: 62400,
    saldoInsoluto: 62400,
    diasVencido: 19,
    status: "pendiente",
    parcialidad: 0,
  },
  {
    id: "FAC-1003",
    uuid: "1C2D3E4F-5A6B-7C8D-9E0F-1A2B3C4D0003",
    serieFolio: "B-205",
    cliente: "Comercializadora Agroindustrial de Occidente",
    rfc: "CAO180315TX9",
    fechaEmision: "2026-08-20",
    fechaVencimiento: "2026-09-20",
    total: 218500,
    saldoInsoluto: 218500,
    diasVencido: 44,
    status: "pendiente",
    parcialidad: 0,
  },
  {
    id: "FAC-1004",
    uuid: "7E8F9A0B-1C2D-3E4F-5A6B-7C8D9E0F0004",
    serieFolio: "A-1050",
    cliente: "Aceros y Perfiles de Jalisco S.A.",
    rfc: "APJ200214HY1",
    fechaEmision: "2026-10-22",
    fechaVencimiento: "2026-11-21",
    total: 94800,
    saldoInsoluto: 94800,
    diasVencido: 0,
    status: "pendiente",
    parcialidad: 0,
  },
  {
    id: "FAC-1005",
    uuid: "3D4E5F6A-7B8C-9D0E-1F2A-3B4C5D6E0005",
    serieFolio: "A-1025",
    cliente: "Inmobiliaria Valle Verde S.A.P.I.",
    rfc: "IVV170930RQ4",
    fechaEmision: "2026-09-01",
    fechaVencimiento: "2026-10-01",
    total: 120000,
    saldoInsoluto: 0,
    diasVencido: 0,
    status: "pagada",
    parcialidad: 2,
  },
];

const movimientosIniciales: MovimientoSPEI[] = [
  {
    id: "MOV-901",
    banco: "BBVA",
    claveRastreo: "2026110140014B38190029",
    cuenta: "•••• 4412",
    fecha: "2026-11-01",
    monto: 85000,
    emisor: "CONSTRUCTORA DEL BAJIO SA DE CV",
    rfcEmisor: "CBA190412KJ8",
    conciliado: false,
  },
  {
    id: "MOV-902",
    banco: "Banorte",
    claveRastreo: "2026103172008A19003841",
    cuenta: "•••• 8901",
    fecha: "2026-10-31",
    monto: 30000,
    emisor: "LOGISTICA Y FLETES DEL PACIFICO",
    rfcEmisor: "LFP210820MN2",
    conciliado: false,
  },
  {
    id: "MOV-903",
    banco: "Santander",
    claveRastreo: "2026102811002C99182301",
    cuenta: "•••• 1277",
    fecha: "2026-10-28",
    monto: 60000,
    emisor: "INMOBILIARIA VALLE VERDE SAPI",
    rfcEmisor: "IVV170930RQ4",
    conciliado: true,
    facturaVinculada: "A-1025",
  },
  {
    id: "MOV-904",
    banco: "BBVA",
    claveRastreo: "2026103040014D88291044",
    cuenta: "•••• 4412",
    fecha: "2026-10-30",
    monto: 15000,
    emisor: "DEPOSITO EN EFECTIVO VENTANILLA",
    rfcEmisor: "XAXX010101000",
    conciliado: false,
  },
];

const repsIniciales: ReciboREP[] = [
  {
    id: "REP-2026-0041",
    uuidRep: "E9A8B7C6-D5E4-4F3A-8B1C-0D9E8F7A6B5C",
    facturaFolio: "A-1042",
    uuidFactura: "4A8E91B2-7C3D-4E5F-A1B2-C3D4E5F60001",
    cliente: "Constructora del Bajío S.A. de C.V.",
    rfc: "CBA190412KJ8",
    montoPago: 60000,
    saldoAnterior: 145000,
    saldoInsoluto: 85000,
    parcialidad: 1,
    formaPago: "03 Transferencia electrónica (SPEI)",
    fechaPago: "2026-10-18T14:32:00",
    cadenaOriginal: "||4.0|REP|2026-0041|2026-10-18T14:32:00|03|60000.00|MXN|...||",
    selloSAT: "kZ8Q8xP+L7uM1k...v9xQw==",
  },
  {
    id: "REP-2026-0040",
    uuidRep: "F1A2B3C4-D5E6-4A8B-9C0D-E1F2A3B4C5D6",
    facturaFolio: "A-1025",
    uuidFactura: "3D4E5F6A-7B8C-9D0E-1F2A-3B4C5D6E0005",
    cliente: "Inmobiliaria Valle Verde S.A.P.I.",
    rfc: "IVV170930RQ4",
    montoPago: 60000,
    saldoAnterior: 120000,
    saldoInsoluto: 60000,
    parcialidad: 1,
    formaPago: "03 Transferencia electrónica (SPEI)",
    fechaPago: "2026-10-08T11:15:20",
    cadenaOriginal: "||4.0|REP|2026-0040|2026-10-08T11:15:20|03|60000.00|MXN|...||",
    selloSAT: "mN2b9VxL1wP0q...y8vRt==",
  },
  {
    id: "REP-2026-0039",
    uuidRep: "C8D7E6F5-A4B3-4C2D-8E0F-9A8B7C6D5E4F",
    facturaFolio: "A-1025",
    uuidFactura: "3D4E5F6A-7B8C-9D0E-1F2A-3B4C5D6E0005",
    cliente: "Inmobiliaria Valle Verde S.A.P.I.",
    rfc: "IVV170930RQ4",
    montoPago: 60000,
    saldoAnterior: 60000,
    saldoInsoluto: 0,
    parcialidad: 2,
    formaPago: "03 Transferencia electrónica (SPEI)",
    fechaPago: "2026-10-28T16:45:10",
    cadenaOriginal: "||4.0|REP|2026-0039|2026-10-28T16:45:10|03|60000.00|MXN|...||",
    selloSAT: "pL8z1WxQ9uV4b...c3mJk==",
  },
];

function fmt(n: number) {
  return `$${n.toLocaleString("es-MX", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
}

export default function CobranzaPage() {
  const [navSection, setNavSection] = useState<"cxc" | "reconciler" | "rep_log" | "reports">("cxc");
  const [facturas, setFacturas] = useState<FacturaPPD[]>(facturasIniciales);
  const [movimientos, setMovimientos] = useState<MovimientoSPEI[]>(movimientosIniciales);
  const [reps, setReps] = useState<ReciboREP[]>(repsIniciales);

  // Filtros
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<"all" | "pendiente" | "parcial" | "pagada">("all");

  // State Modal Conciliar REP
  const [selectedFactura, setSelectedFactura] = useState<FacturaPPD | null>(null);
  const [montoAbono, setMontoAbono] = useState<number>(0);
  const [formaPago, setFormaPago] = useState("03 Transferencia electrónica (SPEI)");
  const [fechaPago, setFechaPago] = useState("2026-11-03");

  // State Inspección Fiscal Modal (XML / SAT Preview)
  const [repInspector, setRepInspector] = useState<ReciboREP | null>(null);

  // Alerta Toast
  const [toastMsg, setToastMsg] = useState<string | null>(null);
  const [isSimulatingXML, setIsSimulatingXML] = useState(false);

  const showToast = (msg: string) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(null), 3800);
  };

  // KPIs
  const totalCartera = facturas.reduce((acc, f) => acc + f.saldoInsoluto, 0);
  const totalCobradoMes = reps.reduce((acc, r) => acc + r.montoPago, 0);
  const vencidas = facturas.filter((f) => f.diasVencido > 0 && f.saldoInsoluto > 0);
  const montoVencido = vencidas.reduce((acc, f) => acc + f.saldoInsoluto, 0);

  const facturasFiltradas = facturas.filter((f) => {
    const matchSearch =
      f.serieFolio.toLowerCase().includes(search.toLowerCase()) ||
      f.cliente.toLowerCase().includes(search.toLowerCase()) ||
      f.rfc.toLowerCase().includes(search.toLowerCase());
    const matchStatus = statusFilter === "all" || f.status === statusFilter;
    return matchSearch && matchStatus;
  });

  const ejecutarConciliacionREP = () => {
    if (!selectedFactura || montoAbono <= 0) return;
    const abono = Math.min(montoAbono, selectedFactura.saldoInsoluto);
    const nuevoSaldo = selectedFactura.saldoInsoluto - abono;
    const nuevaParcialidad = selectedFactura.parcialidad + 1;
    const nuevoStatus: FacturaPPD["status"] = nuevoSaldo === 0 ? "pagada" : "parcial";

    setFacturas((prev) =>
      prev.map((f) =>
        f.id === selectedFactura.id
          ? {
              ...f,
              saldoInsoluto: nuevoSaldo,
              status: nuevoStatus,
              parcialidad: nuevaParcialidad,
            }
          : f
      )
    );

    const nuevoREP: ReciboREP = {
      id: `REP-2026-00${reps.length + 42}`,
      uuidRep: `${Math.random().toString(16).substring(2, 10).toUpperCase()}-5A8B-4C2D-9E1F-${Math.random().toString(16).substring(2, 14).toUpperCase()}`,
      facturaFolio: selectedFactura.serieFolio,
      uuidFactura: selectedFactura.uuid,
      cliente: selectedFactura.cliente,
      rfc: selectedFactura.rfc,
      montoPago: abono,
      saldoAnterior: selectedFactura.saldoInsoluto,
      saldoInsoluto: nuevoSaldo,
      parcialidad: nuevaParcialidad,
      formaPago,
      fechaPago: `${fechaPago}T${new Date().toLocaleTimeString("es-MX", { hour12: false })}`,
      cadenaOriginal: `||4.0|REP|${reps.length + 42}|${fechaPago}|03|${abono.toFixed(2)}|MXN|...||`,
      selloSAT: `${Math.random().toString(36).substring(2, 18)}==`,
    };

    setReps([nuevoREP, ...reps]);
    setSelectedFactura(null);
    showToast(`✅ Complemento REP timbrado: ${nuevoREP.id} por ${fmt(abono)} emitido al SAT.`);
  };

  const autoMatchSPEI = (mov: MovimientoSPEI) => {
    const candidata = facturas.find(
      (f) => f.saldoInsoluto > 0 && Math.abs(f.saldoInsoluto - mov.monto) <= 1000
    );
    if (!candidata) {
      alert("No se encontró factura PPD que coincida con el importe exacto.");
      return;
    }

    setSelectedFactura(candidata);
    setMontoAbono(Math.min(mov.monto, candidata.saldoInsoluto));
    setMovimientos((prev) =>
      prev.map((m) =>
        m.id === mov.id
          ? { ...m, conciliado: true, facturaVinculada: candidata.serieFolio }
          : m
      )
    );
  };

  const simularCargaCFDI = () => {
    setIsSimulatingXML(true);
    setTimeout(() => {
      const nuevaFac: FacturaPPD = {
        id: `FAC-${1000 + facturas.length + 1}`,
        uuid: `3B9E${Math.random().toString(16).substring(2, 6).toUpperCase()}-7C1D-4E8F-A2B3-${Math.random().toString(16).substring(2, 14).toUpperCase()}`,
        serieFolio: `A-10${52 + facturas.length}`,
        cliente: "Tequilera y Destiladora Los Altos S.A. de C.V.",
        rfc: "TLA180620HY4",
        fechaEmision: "2026-11-03",
        fechaVencimiento: "2026-12-03",
        total: 178500,
        saldoInsoluto: 178500,
        diasVencido: 0,
        status: "pendiente",
        parcialidad: 0,
      };

      setFacturas([nuevaFac, ...facturas]);
      setIsSimulatingXML(false);
      showToast(`⚡ CFDI 4.0 PPD Importado: ${nuevaFac.serieFolio} (${fmt(nuevaFac.total)}) agregado a cartera.`);
    }, 700);
  };

  return (
    <div className="min-h-screen bg-[#070b12] text-slate-100 flex flex-col font-sans selection:bg-emerald-500/30 selection:text-emerald-200">
      {/* Toast Notification */}
      <AnimatePresence>
        {toastMsg && (
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            className="fixed top-4 right-6 z-50 flex items-center gap-3 rounded-xl border border-emerald-500/40 bg-emerald-950/95 px-4 py-3 text-xs font-medium text-emerald-200 shadow-2xl backdrop-blur-md"
          >
            <ShieldCheck className="size-4 text-emerald-400 shrink-0" />
            <span>{toastMsg}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Top Ledger Strip */}
      <div className="h-10 bg-[#0c121e] border-b border-slate-800/80 px-4 flex items-center justify-between text-xs font-mono text-slate-400">
        <div className="flex items-center gap-4">
          <Link
            href="/demos"
            className="flex items-center gap-1.5 text-emerald-400 hover:text-emerald-300 font-semibold transition"
          >
            <ArrowLeft className="size-3.5" />
            <span>Hub de Proyectos</span>
          </Link>
          <span className="text-slate-700">|</span>
          <span className="flex items-center gap-2">
            <span className="size-2 rounded-full bg-emerald-500 animate-pulse" />
            <strong className="text-slate-200">COBRANZA B2B</strong> · SAT CFDI 4.0 & Complementos REP
          </span>
        </div>
        <div className="flex items-center gap-4">
          <span className="hidden sm:inline-flex items-center gap-1.5 text-[11px] text-emerald-400/90 bg-emerald-950/40 border border-emerald-800/40 px-2 py-0.5 rounded">
            <ShieldCheck className="size-3" />
            Webhooks SAT: En Línea
          </span>
          <span className="text-slate-500 text-[11px]">Ejercicio Fiscal 2026</span>
        </div>
      </div>

      <div className="flex-1 flex overflow-hidden">
        {/* Left Dark Sidebar with Financial Corporate Identity */}
        <aside className="w-64 bg-[#0a0f1a] border-r border-slate-800/80 flex flex-col justify-between shrink-0 hidden md:flex">
          <div>
            {/* Empresa Selector */}
            <div className="p-4 border-b border-slate-800/60 bg-[#0d1424]/50">
              <div className="flex items-center gap-3">
                <div className="size-9 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-700 flex items-center justify-center font-bold text-white shadow-lg shadow-emerald-900/30">
                  <Landmark className="size-4" />
                </div>
                <div className="overflow-hidden">
                  <h2 className="text-xs font-bold text-slate-100 truncate">
                    Grupo Industrial del Norte
                  </h2>
                  <p className="font-mono text-[10px] text-emerald-400 tracking-wider">
                    RFC: GIN180410XX1
                  </p>
                </div>
              </div>
            </div>

            {/* Navigation Ledger Links */}
            <nav className="p-3 space-y-1 text-xs">
              <button
                onClick={() => setNavSection("cxc")}
                className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl font-medium transition ${
                  navSection === "cxc"
                    ? "bg-emerald-500/15 text-emerald-300 border border-emerald-500/30"
                    : "text-slate-400 hover:text-slate-200 hover:bg-slate-800/40"
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <FileText className="size-4" />
                  <span>Cartera CxC (PPD)</span>
                </div>
                <span className="font-mono text-[10px] bg-slate-800 px-1.5 py-0.5 rounded text-slate-300">
                  {facturas.length}
                </span>
              </button>

              <button
                onClick={() => setNavSection("reconciler")}
                className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl font-medium transition ${
                  navSection === "reconciler"
                    ? "bg-emerald-500/15 text-emerald-300 border border-emerald-500/30"
                    : "text-slate-400 hover:text-slate-200 hover:bg-slate-800/40"
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <Link2 className="size-4" />
                  <span>Conciliador SPEI</span>
                </div>
                <span className="font-mono text-[10px] bg-emerald-900/60 text-emerald-300 px-1.5 py-0.5 rounded">
                  {movimientos.filter((m) => !m.conciliado).length} pend.
                </span>
              </button>

              <button
                onClick={() => setNavSection("rep_log")}
                className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl font-medium transition ${
                  navSection === "rep_log"
                    ? "bg-emerald-500/15 text-emerald-300 border border-emerald-500/30"
                    : "text-slate-400 hover:text-slate-200 hover:bg-slate-800/40"
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <ShieldCheck className="size-4" />
                  <span>Complementos REP</span>
                </div>
                <span className="font-mono text-[10px] bg-slate-800 px-1.5 py-0.5 rounded text-slate-300">
                  {reps.length}
                </span>
              </button>

              <button
                onClick={() => setNavSection("reports")}
                className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl font-medium transition ${
                  navSection === "reports"
                    ? "bg-emerald-500/15 text-emerald-300 border border-emerald-500/30"
                    : "text-slate-400 hover:text-slate-200 hover:bg-slate-800/40"
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <FileSpreadsheet className="size-4" />
                  <span>Auditoría & SAT</span>
                </div>
              </button>
            </nav>

            {/* Quick Metrics in Sidebar */}
            <div className="p-3 mx-3 my-2 rounded-2xl border border-slate-800 bg-[#0e1626]/60 text-xs">
              <p className="text-[10px] font-mono uppercase text-slate-400 tracking-wider">
                Resumen de Saldos
              </p>
              <div className="mt-2 space-y-1.5 font-mono">
                <div className="flex justify-between">
                  <span className="text-slate-500">Cartera viva:</span>
                  <span className="text-slate-200 font-bold">{fmt(totalCartera)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Mora crítica:</span>
                  <span className="text-rose-400 font-bold">{fmt(montoVencido)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Cobrado (mes):</span>
                  <span className="text-emerald-400 font-bold">{fmt(totalCobradoMes)}</span>
                </div>
              </div>
            </div>
          </div>

          <div className="p-4 border-t border-slate-800/80 text-[11px] text-slate-500 space-y-1">
            <p className="font-medium text-slate-400">Stack Nativo:</p>
            <p className="font-mono text-[10px]">Laravel 13 · MySQL 8.4 · Livewire 4</p>
            <p className="text-[10px] text-emerald-400/80">Aislamiento Multi-Tenant</p>
          </div>
        </aside>

        {/* Main Financial Workspace */}
        <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8 space-y-6">
          {/* Header Bar with Action Controls */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800/80">
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-white">
                  {navSection === "cxc" && "Cartera de Clientes & Cuentas por Cobrar (PPD)"}
                  {navSection === "reconciler" && "Conciliador Bancario SPEI vs Facturas"}
                  {navSection === "rep_log" && "Bitácora Fiscal de Recibos Electrónicos (REP)"}
                  {navSection === "reports" && "Auditoría Fiscal & Trazabilidad SAT"}
                </h1>
                <span className="rounded-full bg-emerald-500/10 border border-emerald-500/30 px-2 py-0.5 text-[10px] font-mono text-emerald-400">
                  CFDI 4.0
                </span>
              </div>
              <p className="text-xs text-slate-400 mt-1">
                Acreditación fiscal de IVA con Complemento de Recepción de Pagos en tiempo y forma.
              </p>
            </div>

            <div className="flex items-center gap-2.5">
              <button
                onClick={simularCargaCFDI}
                disabled={isSimulatingXML}
                className="inline-flex items-center gap-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700/80 text-slate-200 px-3.5 py-2 text-xs font-semibold shadow-sm transition active:scale-95 disabled:opacity-50"
              >
                <Upload className="size-3.5 text-emerald-400" />
                <span>{isSimulatingXML ? "Extrayendo XML..." : "Cargar XML CFDI 4.0"}</span>
              </button>

              <button
                onClick={() => setNavSection("reconciler")}
                className="inline-flex items-center gap-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white px-4 py-2 text-xs font-semibold shadow-lg shadow-emerald-900/30 transition active:scale-95"
              >
                <Zap className="size-3.5" />
                <span>Conciliar SPEI</span>
              </button>
            </div>
          </div>

          {/* KPI Financial Overview Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="rounded-2xl border border-slate-800 bg-[#0d1424] p-4 relative overflow-hidden">
              <div className="flex justify-between items-start">
                <span className="text-[11px] font-mono uppercase tracking-wider text-slate-400">
                  Total Cartera CxC
                </span>
                <span className="p-1.5 rounded-lg bg-blue-500/10 text-blue-400">
                  <Banknote className="size-4" />
                </span>
              </div>
              <p className="mt-2 text-2xl font-bold font-mono text-white">
                {fmt(totalCartera)}
              </p>
              <div className="mt-2 flex items-center gap-1.5 text-[11px] text-slate-400">
                <span className="text-blue-400 font-semibold">{facturas.length} Facturas PPD</span>
                <span>emitidas</span>
              </div>
            </div>

            <div className="rounded-2xl border border-rose-900/40 bg-[#160c14] p-4 relative overflow-hidden">
              <div className="flex justify-between items-start">
                <span className="text-[11px] font-mono uppercase tracking-wider text-rose-300">
                  Cartera Vencida (+30d)
                </span>
                <span className="p-1.5 rounded-lg bg-rose-500/10 text-rose-400">
                  <Clock className="size-4" />
                </span>
              </div>
              <p className="mt-2 text-2xl font-bold font-mono text-rose-400">
                {fmt(montoVencido)}
              </p>
              <div className="mt-2 flex items-center gap-1.5 text-[11px] text-rose-300/80">
                <span>{vencidas.length} clientes en mora activa</span>
              </div>
            </div>

            <div className="rounded-2xl border border-emerald-900/40 bg-[#0a1816] p-4 relative overflow-hidden">
              <div className="flex justify-between items-start">
                <span className="text-[11px] font-mono uppercase tracking-wider text-emerald-300">
                  Cobranza Aplicada (Mes)
                </span>
                <span className="p-1.5 rounded-lg bg-emerald-500/10 text-emerald-400">
                  <FileCheck2 className="size-4" />
                </span>
              </div>
              <p className="mt-2 text-2xl font-bold font-mono text-emerald-400">
                {fmt(totalCobradoMes)}
              </p>
              <div className="mt-2 flex items-center gap-1.5 text-[11px] text-emerald-300/80">
                <span>{reps.length} Recibos REP timbrados</span>
              </div>
            </div>

            <div className="rounded-2xl border border-slate-800 bg-[#0d1424] p-4 relative overflow-hidden">
              <div className="flex justify-between items-start">
                <span className="text-[11px] font-mono uppercase tracking-wider text-slate-400">
                  SPEI por Identificar
                </span>
                <span className="p-1.5 rounded-lg bg-amber-500/10 text-amber-400">
                  <Landmark className="size-4" />
                </span>
              </div>
              <p className="mt-2 text-2xl font-bold font-mono text-amber-400">
                {fmt(
                  movimientos
                    .filter((m) => !m.conciliado)
                    .reduce((acc, m) => acc + m.monto, 0)
                )}
              </p>
              <div className="mt-2 flex items-center gap-1.5 text-[11px] text-amber-300/80">
                <span>{movimientos.filter((m) => !m.conciliado).length} depósitos en cuenta</span>
              </div>
            </div>
          </div>

          {/* VIEW 1: CARTERA CXC (PPD) */}
          {navSection === "cxc" && (
            <div className="space-y-4">
              {/* Filter controls */}
              <div className="flex flex-col sm:flex-row items-center justify-between gap-3 bg-[#0d1424] p-3 rounded-2xl border border-slate-800">
                <div className="relative w-full sm:w-96">
                  <Search className="absolute left-3.5 top-2.5 size-4 text-slate-500" />
                  <input
                    type="text"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Buscar por RFC, cliente, serie o UUID fiscal..."
                    className="w-full bg-[#070b12] border border-slate-700/80 rounded-xl pl-10 pr-4 py-1.5 text-xs text-white placeholder:text-slate-500 focus:outline-none focus:border-emerald-500"
                  />
                </div>

                <div className="flex items-center gap-1.5 self-end sm:self-auto overflow-x-auto text-xs">
                  <span className="text-slate-500 text-[11px] mr-1 hidden sm:inline">Estatus:</span>
                  {(["all", "pendiente", "parcial", "pagada"] as const).map((st) => (
                    <button
                      key={st}
                      onClick={() => setStatusFilter(st)}
                      className={`px-3 py-1 rounded-lg font-mono capitalize transition ${
                        statusFilter === st
                          ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/40"
                          : "text-slate-400 hover:text-white hover:bg-slate-800/40"
                      }`}
                    >
                      {st === "all" ? "Todos" : st}
                    </button>
                  ))}
                </div>
              </div>

              {/* Ledger Table */}
              <div className="overflow-x-auto rounded-2xl border border-slate-800 bg-[#0d1424]">
                <table className="w-full text-left text-xs">
                  <thead>
                    <tr className="border-b border-slate-800 bg-[#090e1a] font-mono text-[10px] text-slate-400 uppercase tracking-wider">
                      <th className="py-3 px-4">Folio / UUID Fiscal</th>
                      <th className="py-3 px-4">Razón Social Receptor</th>
                      <th className="py-3 px-4">Emisión / Vencimiento</th>
                      <th className="py-3 px-4 text-right">Importe Facturado</th>
                      <th className="py-3 px-4 text-right">Saldo Insoluto</th>
                      <th className="py-3 px-4 text-center">Estatus SAT</th>
                      <th className="py-3 px-4 text-right">Acción</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/60">
                    {facturasFiltradas.map((fac) => (
                      <tr key={fac.id} className="hover:bg-slate-800/30 transition-colors">
                        <td className="py-3 px-4">
                          <div className="font-mono font-bold text-white text-xs">{fac.serieFolio}</div>
                          <div className="font-mono text-[10px] text-slate-500 truncate max-w-[140px]" title={fac.uuid}>
                            {fac.uuid}
                          </div>
                        </td>
                        <td className="py-3 px-4">
                          <div className="font-medium text-slate-200 text-xs">{fac.cliente}</div>
                          <div className="font-mono text-[10px] text-emerald-400">{fac.rfc}</div>
                        </td>
                        <td className="py-3 px-4 font-mono text-[11px] text-slate-400">
                          <div>{fac.fechaEmision}</div>
                          <div className={fac.diasVencido > 0 && fac.saldoInsoluto > 0 ? "text-rose-400 font-bold" : "text-slate-500"}>
                            {fac.fechaVencimiento}
                            {fac.diasVencido > 0 && fac.saldoInsoluto > 0 && ` (${fac.diasVencido}d mora)`}
                          </div>
                        </td>
                        <td className="py-3 px-4 text-right font-mono text-slate-300 font-medium">
                          {fmt(fac.total)}
                        </td>
                        <td className="py-3 px-4 text-right font-mono font-bold">
                          <span className={fac.saldoInsoluto > 0 ? (fac.diasVencido > 0 ? "text-rose-400" : "text-amber-400") : "text-slate-500 line-through"}>
                            {fmt(fac.saldoInsoluto)}
                          </span>
                        </td>
                        <td className="py-3 px-4 text-center">
                          <span
                            className={`inline-flex items-center px-2 py-0.5 rounded-md text-[10px] font-mono uppercase font-semibold ${
                              fac.status === "pagada"
                                ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/30"
                                : fac.status === "parcial"
                                ? "bg-blue-500/10 text-blue-400 border border-blue-500/30"
                                : fac.diasVencido > 0
                                ? "bg-rose-500/10 text-rose-400 border border-rose-500/30"
                                : "bg-amber-500/10 text-amber-400 border border-amber-500/30"
                            }`}
                          >
                            {fac.status === "pagada" ? "Liquidada" : fac.status === "parcial" ? `Parcial (#${fac.parcialidad})` : "Pendiente"}
                          </span>
                        </td>
                        <td className="py-3 px-4 text-right">
                          {fac.saldoInsoluto > 0 ? (
                            <button
                              onClick={() => {
                                setSelectedFactura(fac);
                                setMontoAbono(fac.saldoInsoluto);
                              }}
                              className="inline-flex items-center gap-1 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white px-2.5 py-1 text-xs font-semibold shadow-sm transition active:scale-95"
                            >
                              <DollarSign className="size-3" />
                              Aplicar REP
                            </button>
                          ) : (
                            <span className="text-[11px] font-mono text-emerald-400 flex items-center justify-end gap-1">
                              <CheckCircle2 className="size-3.5" />
                              Saldada
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

          {/* VIEW 2: CONCILIADOR BANCARIO SPEI */}
          {navSection === "reconciler" && (
            <div className="space-y-6">
              <div className="rounded-2xl border border-slate-800 bg-[#0d1424] p-5">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
                  <div>
                    <h2 className="text-sm font-bold text-white flex items-center gap-2">
                      <Link2 className="size-4 text-emerald-400" />
                      Módulo de Conciliación de Pagos & Algoritmo de Coincidencia
                    </h2>
                    <p className="text-xs text-slate-400 mt-0.5">
                      Vincula los abonos bancarios de tu cuenta de cheques directamente con las facturas emitidas para generar el recibo REP sin errores.
                    </p>
                  </div>
                  <div className="font-mono text-xs text-slate-300">
                    Cuentas monitoreadas: <span className="text-emerald-400 font-bold">BBVA, Banorte, Santander</span>
                  </div>
                </div>

                <div className="mt-5 space-y-3">
                  {movimientos.map((mov) => (
                    <div
                      key={mov.id}
                      className={`rounded-2xl border p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4 transition ${
                        mov.conciliado
                          ? "border-emerald-500/20 bg-emerald-950/10 opacity-75"
                          : "border-slate-800 bg-[#090e1a] hover:border-slate-700"
                      }`}
                    >
                      <div className="flex items-start gap-3.5">
                        <div
                          className={`size-10 rounded-xl flex items-center justify-center shrink-0 font-bold text-xs ${
                            mov.conciliado
                              ? "bg-emerald-500/20 text-emerald-400"
                              : "bg-blue-500/20 text-blue-400"
                          }`}
                        >
                          {mov.banco}
                        </div>
                        <div>
                          <div className="flex items-center gap-2 font-mono text-xs">
                            <span className="font-bold text-white">{mov.emisor}</span>
                            <span className="text-slate-500 text-[10px]">· {mov.cuenta}</span>
                            <span className="text-slate-400 text-[10px]">{mov.fecha}</span>
                          </div>
                          <p className="font-mono text-[11px] text-slate-400 mt-0.5">
                            Clave Rastreo SPEI: <strong className="text-slate-300">{mov.claveRastreo}</strong>
                          </p>
                          <p className="font-mono text-[10px] text-emerald-400 mt-0.5">
                            RFC Emisor: {mov.rfcEmisor}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center justify-between sm:justify-end gap-5 border-t sm:border-t-0 pt-3 sm:pt-0 border-slate-800">
                        <div className="text-right">
                          <p className="text-[10px] uppercase font-mono text-slate-400">Importe Depósito</p>
                          <p className="font-mono text-base font-bold text-emerald-400">{fmt(mov.monto)}</p>
                        </div>

                        {!mov.conciliado ? (
                          <button
                            onClick={() => autoMatchSPEI(mov)}
                            className="inline-flex items-center gap-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white px-3.5 py-2 text-xs font-semibold shadow-md transition active:scale-95"
                          >
                            <Link2 className="size-3.5" />
                            <span>Vincular & Emitir REP</span>
                          </button>
                        ) : (
                          <div className="flex items-center gap-1.5 text-xs text-emerald-400 font-mono bg-emerald-950/40 border border-emerald-800/40 px-3 py-1.5 rounded-xl">
                            <CheckCircle2 className="size-4" />
                            <span>REP Vinculado: {mov.facturaVinculada}</span>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* VIEW 3: COMPLEMENTOS REP */}
          {navSection === "rep_log" && (
            <div className="space-y-4">
              <div className="rounded-2xl border border-slate-800 bg-[#0d1424] p-5">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-800">
                  <div>
                    <h2 className="text-sm font-bold text-white flex items-center gap-2">
                      <ShieldCheck className="size-4 text-emerald-400" />
                      Comprobantes Fiscales Digitales tipo Pago (CFDI 4.0 con Complemento de Recepción de Pagos)
                    </h2>
                    <p className="text-xs text-slate-400 mt-0.5">
                      Registro inmutable con sello digital SAT, cadena original y desglose de parcialidades.
                    </p>
                  </div>
                  <div className="font-mono text-xs text-emerald-400">
                    Total Timbrado: <strong className="text-white">{fmt(totalCobradoMes)}</strong>
                  </div>
                </div>

                <div className="mt-4 overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead>
                      <tr className="border-b border-slate-800 bg-[#090e1a] font-mono text-[10px] text-slate-400 uppercase">
                        <th className="py-3 px-4">Folio REP / UUID</th>
                        <th className="py-3 px-4">Factura PPD</th>
                        <th className="py-3 px-4">Cliente Receptor</th>
                        <th className="py-3 px-4 text-center">Parcialidad</th>
                        <th className="py-3 px-4 text-right">Saldo Ant.</th>
                        <th className="py-3 px-4 text-right">Pago Aplicado</th>
                        <th className="py-3 px-4 text-right">Saldo Insoluto</th>
                        <th className="py-3 px-4 text-center">Comprobante</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-800/60">
                      {reps.map((rep) => (
                        <tr key={rep.id} className="hover:bg-slate-800/30 transition-colors">
                          <td className="py-3.5 px-4">
                            <div className="font-mono font-bold text-white text-xs">{rep.id}</div>
                            <div className="font-mono text-[10px] text-slate-500 truncate max-w-[130px]" title={rep.uuidRep}>
                              {rep.uuidRep}
                            </div>
                          </td>
                          <td className="py-3.5 px-4 font-mono font-bold text-emerald-400">
                            {rep.facturaFolio}
                          </td>
                          <td className="py-3.5 px-4">
                            <div className="text-slate-200 font-medium text-xs">{rep.cliente}</div>
                            <div className="font-mono text-[10px] text-slate-500">{rep.fechaPago}</div>
                          </td>
                          <td className="py-3.5 px-4 text-center">
                            <span className="font-mono text-xs px-2 py-0.5 rounded bg-slate-800 text-slate-300">
                              #{rep.parcialidad}
                            </span>
                          </td>
                          <td className="py-3.5 px-4 text-right font-mono text-slate-400">
                            {fmt(rep.saldoAnterior)}
                          </td>
                          <td className="py-3.5 px-4 text-right font-mono font-bold text-emerald-400">
                            {fmt(rep.montoPago)}
                          </td>
                          <td className="py-3.5 px-4 text-right font-mono font-semibold">
                            <span className={rep.saldoInsoluto === 0 ? "text-emerald-400" : "text-amber-400"}>
                              {fmt(rep.saldoInsoluto)}
                            </span>
                          </td>
                          <td className="py-3.5 px-4 text-center">
                            <button
                              onClick={() => setRepInspector(rep)}
                              className="inline-flex items-center gap-1 rounded-lg border border-slate-700 bg-slate-800/80 hover:bg-slate-700 px-2.5 py-1 text-xs text-slate-200 transition"
                            >
                              <Eye className="size-3 text-emerald-400" />
                              <span>Inspeccionar</span>
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* VIEW 4: AUDITORÍA & REPORTE SAT */}
          {navSection === "reports" && (
            <div className="space-y-6">
              <div className="rounded-2xl border border-slate-800 bg-[#0d1424] p-6">
                <h2 className="text-base font-bold text-white flex items-center gap-2">
                  <FileSpreadsheet className="size-5 text-emerald-400" />
                  Matriz de Control Fiscal SAT · Anexo 20 CFDI 4.0
                </h2>
                <p className="text-xs text-slate-400 mt-1">
                  Verificación de congruencia entre facturas emitidas, complementos de recepción de pagos y estados de cuenta bancarios para evitar discrepancias ante el SAT.
                </p>

                <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="p-4 rounded-xl border border-slate-800 bg-[#090e1a]">
                    <div className="flex items-center justify-between text-xs mb-2">
                      <span className="font-bold text-slate-200">Conciliación SAT vs Bancos</span>
                      <span className="text-emerald-400 font-mono text-[10px]">99.4% Match</span>
                    </div>
                    <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
                      <div className="bg-emerald-500 h-full rounded-full" style={{ width: "99.4%" }} />
                    </div>
                    <p className="text-[11px] text-slate-500 mt-2">
                      Sin discrepancias de importe en los complementos de pago emitidos.
                    </p>
                  </div>

                  <div className="p-4 rounded-xl border border-slate-800 bg-[#090e1a]">
                    <div className="flex items-center justify-between text-xs mb-2">
                      <span className="font-bold text-slate-200">Emisión dentro de plazo legal</span>
                      <span className="text-emerald-400 font-mono text-[10px]">100% en Término</span>
                    </div>
                    <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
                      <div className="bg-emerald-500 h-full rounded-full" style={{ width: "100%" }} />
                    </div>
                    <p className="text-[11px] text-slate-500 mt-2">
                      Emitidos antes del quinto día natural del mes siguiente al cobro.
                    </p>
                  </div>

                  <div className="p-4 rounded-xl border border-slate-800 bg-[#090e1a]">
                    <div className="flex items-center justify-between text-xs mb-2">
                      <span className="font-bold text-slate-200">Idempotencia de Timbrado</span>
                      <span className="text-blue-400 font-mono text-[10px]">Cero duplicados</span>
                    </div>
                    <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
                      <div className="bg-blue-500 h-full rounded-full" style={{ width: "100%" }} />
                    </div>
                    <p className="text-[11px] text-slate-500 mt-2">
                      Algoritmo con hash SHA-256 para prevenir doble timbrado de parcialidades.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </main>
      </div>

      {/* MODAL CONCILIAR & EMITIR REP */}
      <AnimatePresence>
        {selectedFactura && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="w-full max-w-lg rounded-3xl border border-emerald-500/30 bg-[#0d1424] p-6 shadow-2xl relative text-slate-100"
            >
              <button
                onClick={() => setSelectedFactura(null)}
                className="absolute top-5 right-5 text-slate-400 hover:text-white p-1"
              >
                <X className="size-5" />
              </button>

              <div className="flex items-center gap-2 mb-1">
                <span className="p-1.5 rounded-lg bg-emerald-500/10 text-emerald-400">
                  <ShieldCheck className="size-5" />
                </span>
                <h3 className="text-lg font-bold text-white">Generar Complemento de Pago (REP)</h3>
              </div>
              <p className="text-xs text-slate-400 mb-4">
                El timbrado actualiza el saldo insoluto en la base de datos y genera el CFDI 4.0 de Pago.
              </p>

              <div className="rounded-2xl border border-slate-800 bg-[#070b12] p-4 mb-4 space-y-2 text-xs font-mono">
                <div className="flex justify-between">
                  <span className="text-slate-400">Factura Relacionada:</span>
                  <span className="text-white font-bold">{selectedFactura.serieFolio}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Cliente / RFC:</span>
                  <span className="text-emerald-400 truncate max-w-[240px]">
                    {selectedFactura.cliente} ({selectedFactura.rfc})
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Saldo Insoluto Anterior:</span>
                  <span className="text-amber-400 font-bold">{fmt(selectedFactura.saldoInsoluto)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Número de Parcialidad:</span>
                  <span className="text-blue-400 font-bold">#{selectedFactura.parcialidad + 1}</span>
                </div>
              </div>

              <div className="space-y-3 text-xs">
                <div>
                  <label className="block text-slate-400 mb-1 font-medium">Monto del Pago (MXN):</label>
                  <input
                    type="number"
                    value={montoAbono}
                    onChange={(e) => setMontoAbono(Number(e.target.value))}
                    max={selectedFactura.saldoInsoluto}
                    min={1}
                    className="w-full rounded-xl border border-slate-700 bg-[#070b12] px-3.5 py-2 text-sm font-mono font-bold text-emerald-400 focus:border-emerald-500 focus:outline-none"
                  />
                  <div className="flex justify-between text-[11px] text-slate-400 mt-1">
                    <span>
                      Nuevo saldo insoluto:{" "}
                      <strong className="text-white">
                        {fmt(Math.max(0, selectedFactura.saldoInsoluto - (Number(montoAbono) || 0)))}
                      </strong>
                    </span>
                    <button
                      type="button"
                      onClick={() => setMontoAbono(selectedFactura.saldoInsoluto)}
                      className="text-emerald-400 underline font-semibold"
                    >
                      Liquidar Saldo Total
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-slate-400 mb-1 font-medium">Fecha y Hora de Pago:</label>
                    <input
                      type="date"
                      value={fechaPago}
                      onChange={(e) => setFechaPago(e.target.value)}
                      className="w-full rounded-xl border border-slate-700 bg-[#070b12] px-3 py-2 font-mono text-xs text-white focus:border-emerald-500 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-400 mb-1 font-medium">Forma de Pago SAT:</label>
                    <select
                      value={formaPago}
                      onChange={(e) => setFormaPago(e.target.value)}
                      className="w-full rounded-xl border border-slate-700 bg-[#070b12] px-3 py-2 text-xs text-white focus:border-emerald-500 focus:outline-none"
                    >
                      <option value="03 Transferencia electrónica (SPEI)">03 · Transferencia SPEI</option>
                      <option value="01 Efectivo">01 · Efectivo</option>
                      <option value="02 Cheque nominativo">02 · Cheque</option>
                      <option value="04 Tarjeta de crédito">04 · Tarjeta de Crédito</option>
                    </select>
                  </div>
                </div>
              </div>

              <div className="mt-6 flex justify-end gap-2.5">
                <button
                  type="button"
                  onClick={() => setSelectedFactura(null)}
                  className="rounded-xl border border-slate-700 bg-slate-800 px-4 py-2 text-xs font-semibold text-slate-300 hover:text-white transition"
                >
                  Cancelar
                </button>
                <button
                  type="button"
                  onClick={ejecutarConciliacionREP}
                  disabled={montoAbono <= 0}
                  className="rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white px-5 py-2 text-xs font-semibold shadow-lg shadow-emerald-900/30 transition active:scale-95 disabled:opacity-50"
                >
                  Confirmar y Timbrar al SAT
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* MODAL INSPECTOR FISCAL SAT */}
      <AnimatePresence>
        {repInspector && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="w-full max-w-2xl rounded-3xl border border-slate-700 bg-[#0d1424] p-6 shadow-2xl relative text-slate-100 max-h-[90vh] overflow-y-auto"
            >
              <button
                onClick={() => setRepInspector(null)}
                className="absolute top-5 right-5 text-slate-400 hover:text-white p-1"
              >
                <X className="size-5" />
              </button>

              <div className="flex items-center gap-2 mb-1">
                <span className="p-1.5 rounded-lg bg-emerald-500/10 text-emerald-400">
                  <FileCode2 className="size-5" />
                </span>
                <h3 className="text-lg font-bold text-white">Inspección de CFDI 4.0 con Complemento REP</h3>
              </div>
              <p className="text-xs text-slate-400 mb-4 font-mono">
                Folio: {repInspector.id} · UUID: {repInspector.uuidRep}
              </p>

              {/* Fiscal Document Preview Card */}
              <div className="rounded-2xl border border-slate-800 bg-[#070b12] p-5 space-y-4 font-mono text-xs">
                <div className="flex justify-between border-b border-slate-800 pb-3">
                  <div>
                    <p className="text-[10px] text-slate-500 uppercase">Emisor</p>
                    <p className="font-bold text-white">Grupo Industrial del Norte S.A. de C.V.</p>
                    <p className="text-emerald-400">GIN180410XX1 · Régimen 601 General de Ley</p>
                  </div>
                  <div className="text-right">
                    <p className="text-[10px] text-slate-500 uppercase">Receptor</p>
                    <p className="font-bold text-white">{repInspector.cliente}</p>
                    <p className="text-emerald-400">{repInspector.rfc}</p>
                  </div>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 py-2 border-b border-slate-800">
                  <div>
                    <span className="text-slate-500 text-[10px] block">Tipo Comprobante</span>
                    <strong className="text-white">P - Pago</strong>
                  </div>
                  <div>
                    <span className="text-slate-500 text-[10px] block">Fecha Aplicación</span>
                    <strong className="text-white">{repInspector.fechaPago}</strong>
                  </div>
                  <div>
                    <span className="text-slate-500 text-[10px] block">Monto Pagado</span>
                    <strong className="text-emerald-400">{fmt(repInspector.montoPago)}</strong>
                  </div>
                  <div>
                    <span className="text-slate-500 text-[10px] block">Parcialidad</span>
                    <strong className="text-blue-400">#{repInspector.parcialidad}</strong>
                  </div>
                </div>

                <div>
                  <p className="text-[10px] text-slate-500 uppercase mb-1">Cadena Original del Timbre Fiscal Digital</p>
                  <p className="p-2.5 rounded-lg bg-slate-900 border border-slate-800 text-[10px] text-slate-400 break-all leading-relaxed">
                    {repInspector.cadenaOriginal}
                  </p>
                </div>

                <div>
                  <p className="text-[10px] text-slate-500 uppercase mb-1">Sello Digital del SAT</p>
                  <p className="p-2.5 rounded-lg bg-slate-900 border border-slate-800 text-[10px] text-emerald-400/90 break-all">
                    {repInspector.selloSAT}
                  </p>
                </div>
              </div>

              <div className="mt-5 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => alert(`Descarga de XML: ${repInspector.uuidRep}.xml`)}
                  className="inline-flex items-center gap-1.5 rounded-xl border border-slate-700 bg-slate-800 px-3.5 py-2 text-xs font-semibold text-slate-200 hover:text-white transition"
                >
                  <Download className="size-3.5" />
                  <span>Descargar XML</span>
                </button>
                <button
                  type="button"
                  onClick={() => setRepInspector(null)}
                  className="rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white px-4 py-2 text-xs font-semibold transition"
                >
                  Cerrar
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
