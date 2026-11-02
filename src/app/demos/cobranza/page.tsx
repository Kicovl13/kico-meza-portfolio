"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowLeft,
  Building2,
  Calendar,
  CheckCircle2,
  ChevronRight,
  Clock,
  DollarSign,
  Download,
  FileCheck2,
  FileCode2,
  FileSpreadsheet,
  FileText,
  Filter,
  Landmark,
  Layers,
  Link2,
  MessageCircle,
  Plus,
  RefreshCw,
  Search,
  Send,
  ShieldCheck,
  TrendingDown,
  TrendingUp,
  Upload,
  X,
} from "lucide-react";
import Link from "next/link";

type Tab = "dashboard" | "facturas" | "conciliacion" | "rep" | "bancos";

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

interface MovimientoBancario {
  id: string;
  banco: "BBVA" | "Banorte" | "Santander";
  referencia: string;
  fecha: string;
  monto: number;
  emisor: string;
  conciliado: boolean;
  facturaAsignada?: string;
}

interface ReciboREP {
  id: string;
  uuidRep: string;
  facturaFolio: string;
  uuidFactura: string;
  cliente: string;
  montoPago: number;
  saldoAnterior: number;
  saldoInsoluto: number;
  parcialidad: number;
  formaPago: string;
  fechaPago: string;
}

const facturasIniciales: FacturaPPD[] = [
  {
    id: "FAC-1001",
    uuid: "4a8e91b2-7c3d-4e5f-a1b2-c3d4e5f60001",
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
    uuid: "8b1f23c4-9d5e-4f6a-b2c3-d4e5f6a70002",
    serieFolio: "A-1038",
    cliente: "Logística y Fletes del Pacífico S.A.",
    rfc: "LFP210820MN2",
    fechaEmision: "2026-09-15",
    fechaVencimiento: "2026-10-15",
    total: 62400,
    saldoInsoluto: 62400,
    diasVencido: 18,
    status: "pendiente",
    parcialidad: 0,
  },
  {
    id: "FAC-1003",
    uuid: "1c2d3e4f-5a6b-7c8d-9e0f-1a2b3c4d0003",
    serieFolio: "B-205",
    cliente: "Comercializadora Agroindustrial de Occidente",
    rfc: "CAO180315TX9",
    fechaEmision: "2026-08-20",
    fechaVencimiento: "2026-09-20",
    total: 218500,
    saldoInsoluto: 218500,
    diasVencido: 43,
    status: "pendiente",
    parcialidad: 0,
  },
  {
    id: "FAC-1004",
    uuid: "7e8f9a0b-1c2d-3e4f-5a6b-7c8d9e0f0004",
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
    uuid: "3d4e5f6a-7b8c-9d0e-1f2a-3b4c5d6e0005",
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

const movimientosIniciales: MovimientoBancario[] = [
  {
    id: "MOV-901",
    banco: "BBVA",
    referencia: "SPEI 008492048 CONSTRUCTORA BAJIO",
    fecha: "2026-11-01",
    monto: 85000,
    emisor: "Constructora del Bajío S.A.",
    conciliado: false,
  },
  {
    id: "MOV-902",
    banco: "Banorte",
    referencia: "TRANSF 773190 LOGISTICA PACIFICO",
    fecha: "2026-10-31",
    monto: 30000,
    emisor: "Logística y Fletes del Pacífico",
    conciliado: false,
  },
  {
    id: "MOV-903",
    banco: "Santander",
    referencia: "SPEI 992014 VALLE VERDE FINIQUITO",
    fecha: "2026-10-28",
    monto: 60000,
    emisor: "Inmobiliaria Valle Verde",
    conciliado: true,
    facturaAsignada: "A-1025",
  },
  {
    id: "MOV-904",
    banco: "BBVA",
    referencia: "DEP EFECTIVO REF 551928",
    fecha: "2026-10-30",
    monto: 15000,
    emisor: "Desconocido (Por Aclarar)",
    conciliado: false,
  },
];

const repsIniciales: ReciboREP[] = [
  {
    id: "REP-001",
    uuidRep: "e9a8b7c6-d5e4-f3a2-b1c0-d9e8f7a6b5c4",
    facturaFolio: "A-1042",
    uuidFactura: "4a8e91b2-7c3d-4e5f-a1b2-c3d4e5f60001",
    cliente: "Constructora del Bajío S.A. de C.V.",
    montoPago: 60000,
    saldoAnterior: 145000,
    saldoInsoluto: 85000,
    parcialidad: 1,
    formaPago: "03 Transferencia electrónica",
    fechaPago: "2026-10-18",
  },
  {
    id: "REP-002",
    uuidRep: "f1a2b3c4-d5e6-7a8b-9c0d-e1f2a3b4c5d6",
    facturaFolio: "A-1025",
    uuidFactura: "3d4e5f6a-7b8c-9d0e-1f2a-3b4c5d6e0005",
    cliente: "Inmobiliaria Valle Verde S.A.P.I.",
    montoPago: 60000,
    saldoAnterior: 120000,
    saldoInsoluto: 60000,
    parcialidad: 1,
    formaPago: "03 Transferencia electrónica",
    fechaPago: "2026-10-08",
  },
  {
    id: "REP-003",
    uuidRep: "c8d7e6f5-a4b3-c2d1-e0f9-a8b7c6d5e4f3",
    facturaFolio: "A-1025",
    uuidFactura: "3d4e5f6a-7b8c-9d0e-1f2a-3b4c5d6e0005",
    cliente: "Inmobiliaria Valle Verde S.A.P.I.",
    montoPago: 60000,
    saldoAnterior: 60000,
    saldoInsoluto: 0,
    parcialidad: 2,
    formaPago: "03 Transferencia electrónica",
    fechaPago: "2026-10-28",
  },
];

function fmt(n: number) {
  return `$${n.toLocaleString("es-MX", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
}

export default function CobranzaDemo() {
  const [activeTab, setActiveTab] = useState<Tab>("dashboard");
  const [facturas, setFacturas] = useState<FacturaPPD[]>(facturasIniciales);
  const [movimientos, setMovimientos] = useState<MovimientoBancario[]>(movimientosIniciales);
  const [reps, setReps] = useState<ReciboREP[]>(repsIniciales);

  // Filtros
  const [search, setSearch] = useState("");
  const [filtroStatus, setFiltroStatus] = useState<"todos" | "pendiente" | "parcial" | "pagada">("todos");

  // Modal Conciliar REP
  const [modalFactura, setModalFactura] = useState<FacturaPPD | null>(null);
  const [montoPago, setMontoPago] = useState<number>(0);
  const [formaPago, setFormaPago] = useState("03 Transferencia electrónica (SPEI)");
  const [fechaPago, setFechaPago] = useState("2026-11-02");
  const [notifSuccess, setNotifSuccess] = useState<string | null>(null);

  // Modal Enviar Notificación
  const [cobranzaModal, setCobranzaModal] = useState<FacturaPPD | null>(null);
  const [canalEnvio, setCanalEnvio] = useState<"whatsapp" | "email">("whatsapp");

  // Simular Subida XML CFDI
  const [xmlLoading, setXmlLoading] = useState(false);

  // Cálculos KPIs
  const totalCartera = facturas.reduce((sum, f) => sum + f.saldoInsoluto, 0);
  const facturasVencidas = facturas.filter((f) => f.diasVencido > 0 && f.saldoInsoluto > 0);
  const montoVencido = facturasVencidas.reduce((sum, f) => sum + f.saldoInsoluto, 0);
  const totalRecuperado = reps.reduce((sum, r) => sum + r.montoPago, 0);
  const tasaCobranza = Math.round((totalRecuperado / (totalCartera + totalRecuperado)) * 100);

  const facturasFiltradas = facturas.filter((f) => {
    const matchText =
      f.serieFolio.toLowerCase().includes(search.toLowerCase()) ||
      f.cliente.toLowerCase().includes(search.toLowerCase()) ||
      f.rfc.toLowerCase().includes(search.toLowerCase());
    const matchStatus = filtroStatus === "todos" || f.status === filtroStatus;
    return matchText && matchStatus;
  });

  const abrirModalConciliar = (fac: FacturaPPD) => {
    setModalFactura(fac);
    setMontoPago(fac.saldoInsoluto);
  };

  const aplicarPagoREP = () => {
    if (!modalFactura || montoPago <= 0) return;

    const abono = Math.min(montoPago, modalFactura.saldoInsoluto);
    const nuevoSaldo = modalFactura.saldoInsoluto - abono;
    const nuevaParcialidad = modalFactura.parcialidad + 1;
    const nuevoStatus: FacturaPPD["status"] = nuevoSaldo === 0 ? "pagada" : "parcial";

    // Actualizar factura
    setFacturas((prev) =>
      prev.map((f) =>
        f.id === modalFactura.id
          ? {
              ...f,
              saldoInsoluto: nuevoSaldo,
              status: nuevoStatus,
              parcialidad: nuevaParcialidad,
            }
          : f
      )
    );

    // Crear Complemento de Pago REP
    const nuevoRep: ReciboREP = {
      id: `REP-00${reps.length + 1}`,
      uuidRep: `${Math.random().toString(16).substring(2, 10)}-${Math.random().toString(16).substring(2, 6)}-4f9b-9c2d-${Math.random().toString(16).substring(2, 14)}`,
      facturaFolio: modalFactura.serieFolio,
      uuidFactura: modalFactura.uuid,
      cliente: modalFactura.cliente,
      montoPago: abono,
      saldoAnterior: modalFactura.saldoInsoluto,
      saldoInsoluto: nuevoSaldo,
      parcialidad: nuevaParcialidad,
      formaPago: formaPago,
      fechaPago: fechaPago,
    };

    setReps([nuevoRep, ...reps]);
    setModalFactura(null);
    setNotifSuccess(`Complemento REP timbrado exitosamente para ${modalFactura.serieFolio} por ${fmt(abono)}`);
    setTimeout(() => setNotifSuccess(null), 4000);
  };

  const simularMatchBancario = (mov: MovimientoBancario) => {
    // Buscar factura candidata con saldo parecido
    const candidata = facturas.find((f) => f.saldoInsoluto > 0 && f.saldoInsoluto <= mov.monto + 5000);
    if (!candidata) {
      alert("No se encontró factura pendiente con saldo coincidente.");
      return;
    }

    abrirModalConciliar(candidata);
    setMontoPago(Math.min(mov.monto, candidata.saldoInsoluto));
    setMovimientos((prev) =>
      prev.map((m) => (m.id === mov.id ? { ...m, conciliado: true, facturaAsignada: candidata.serieFolio } : m))
    );
  };

  const simularImportarCFDI = () => {
    setXmlLoading(true);
    setTimeout(() => {
      const nuevaFac: FacturaPPD = {
        id: `FAC-${1000 + facturas.length + 1}`,
        uuid: `e8f1${Math.random().toString(16).substring(2, 6)}-3b4c-4e5f-9a1b-c3d4e5f6${facturas.length + 10}`,
        serieFolio: `A-10${55 + facturas.length}`,
        cliente: "Distribuidora Médica de Occidente S.A.",
        rfc: "DMO190710PL3",
        fechaEmision: "2026-11-02",
        fechaVencimiento: "2026-12-02",
        total: 184500,
        saldoInsoluto: 184500,
        diasVencido: 0,
        status: "pendiente",
        parcialidad: 0,
      };

      setFacturas([nuevaFac, ...facturas]);
      setXmlLoading(false);
      setNotifSuccess("CFDI 4.0 XML parseado y agregado a Cartera PPD: Factura A-1056");
      setTimeout(() => setNotifSuccess(null), 4000);
    }, 900);
  };

  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-emerald-500/20">
      {/* Top Banner / Breadcrumb */}
      <div className="border-b border-border/60 bg-card/40 backdrop-blur-md sticky top-0 z-40">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6">
          <div className="flex items-center gap-3">
            <Link
              href="/demos"
              className="inline-flex items-center gap-1.5 rounded-lg border border-border/80 bg-background/60 px-3 py-1.5 text-xs font-medium text-muted-foreground transition hover:text-foreground hover:border-emerald-500/40"
            >
              <ArrowLeft className="size-3.5" />
              Volver al Hub
            </Link>
            <div className="h-4 w-px bg-border/60" />
            <div className="flex items-center gap-2">
              <span className="flex size-2 rounded-full bg-emerald-500 animate-pulse" />
              <span className="font-mono text-xs font-semibold text-emerald-400">
                Cobranza B2B · Conciliación PPD / REP
              </span>
              <span className="hidden sm:inline-block rounded border border-emerald-500/30 bg-emerald-500/10 px-2 py-0.5 font-mono text-[10px] text-emerald-400">
                CFDI 4.0 SAT · Sin Base de Datos
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={simularImportarCFDI}
              disabled={xmlLoading}
              className="inline-flex items-center gap-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white px-3 py-1.5 text-xs font-semibold shadow-sm transition active:scale-95 disabled:opacity-60"
            >
              <Upload className="size-3.5" />
              {xmlLoading ? "Parseando XML..." : "Simular XML CFDI"}
            </button>
          </div>
        </div>
      </div>

      {/* Toast Notification */}
      <AnimatePresence>
        {notifSuccess && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed top-16 right-6 z-50 flex items-center gap-2 rounded-xl border border-emerald-500/40 bg-emerald-950/90 text-emerald-200 px-4 py-3 shadow-xl backdrop-blur-md text-xs font-medium"
          >
            <CheckCircle2 className="size-4 text-emerald-400 shrink-0" />
            <span>{notifSuccess}</span>
          </motion.div>
        )}
      </AnimatePresence>

      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
        {/* Hero Banner */}
        <div className="relative overflow-hidden rounded-3xl border border-emerald-500/20 bg-gradient-to-br from-emerald-950/40 via-card/80 to-background p-6 sm:p-8 mb-8 shadow-2xl">
          <div className="absolute top-0 right-0 -mt-12 -mr-12 size-64 rounded-full bg-emerald-500/10 blur-3xl pointer-events-none" />

          <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-0.5 font-mono text-[11px] text-emerald-400 font-semibold">
                  Fintech B2B & Fiscal SAT
                </span>
                <span className="font-mono text-xs text-muted-foreground">
                  Repo: Kicovl13/cobranza
                </span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-foreground tracking-tight">
                Cartera de Cuentas por Cobrar & Complementos REP
              </h1>
              <p className="mt-2 max-w-2xl text-xs sm:text-sm text-muted-foreground leading-relaxed">
                Automatización de cobranza B2B en México: concilia facturas emitidas en modalidad
                PPD (Pago en Parcialidades o Diferido) con Complementos de Recepción de Pagos (REP)
                y movimientos bancarios SPEI con trazabilidad fiscal SAT 4.0.
              </p>
            </div>

            {/* Live Quick Stats */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 self-stretch md:self-auto shrink-0">
              <div className="rounded-2xl border border-border/80 bg-background/60 p-3.5 backdrop-blur-sm">
                <p className="text-[11px] text-muted-foreground uppercase tracking-wider font-mono">
                  Saldo Total CxC
                </p>
                <p className="mt-1 text-lg font-bold font-mono text-foreground">
                  {fmt(totalCartera)}
                </p>
                <span className="text-[10px] text-emerald-400 flex items-center gap-0.5 mt-0.5">
                  <Layers className="size-3" />
                  {facturas.filter((f) => f.saldoInsoluto > 0).length} facturas vivas
                </span>
              </div>

              <div className="rounded-2xl border border-border/80 bg-background/60 p-3.5 backdrop-blur-sm">
                <p className="text-[11px] text-muted-foreground uppercase tracking-wider font-mono">
                  Saldo Vencido
                </p>
                <p className="mt-1 text-lg font-bold font-mono text-rose-400">
                  {fmt(montoVencido)}
                </p>
                <span className="text-[10px] text-rose-400/80 flex items-center gap-0.5 mt-0.5">
                  <Clock className="size-3" />
                  {facturasVencidas.length} facturas morosas
                </span>
              </div>

              <div className="col-span-2 sm:col-span-1 rounded-2xl border border-border/80 bg-background/60 p-3.5 backdrop-blur-sm">
                <p className="text-[11px] text-muted-foreground uppercase tracking-wider font-mono">
                  Cobrado (Mes)
                </p>
                <p className="mt-1 text-lg font-bold font-mono text-emerald-400">
                  {fmt(totalRecuperado)}
                </p>
                <span className="text-[10px] text-muted-foreground flex items-center gap-0.5 mt-0.5">
                  <FileCheck2 className="size-3 text-emerald-400" />
                  {reps.length} REPs emitidos
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex border-b border-border/60 mb-6 gap-2 overflow-x-auto pb-1">
          {[
            { id: "dashboard", label: "Dashboard Ejecutivo", icon: TrendingUp },
            { id: "facturas", label: "Facturas PPD (Cartera)", icon: FileText, count: facturas.length },
            { id: "conciliacion", label: "Conciliación Bancaria SPEI", icon: Landmark, count: movimientos.filter((m) => !m.conciliado).length },
            { id: "rep", label: "Complementos de Pago (REP)", icon: ShieldCheck, count: reps.length },
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as Tab)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-medium text-xs sm:text-sm transition-all whitespace-nowrap ${
                  isActive
                    ? "bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 shadow-sm"
                    : "text-muted-foreground hover:text-foreground hover:bg-card/60"
                }`}
              >
                <Icon className="size-4" />
                <span>{tab.label}</span>
                {tab.count !== undefined && (
                  <span
                    className={`rounded-full px-2 py-0.5 text-[10px] font-mono ${
                      isActive ? "bg-emerald-500/25 text-emerald-300" : "bg-card text-muted-foreground"
                    }`}
                  >
                    {tab.count}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* TAB 1: DASHBOARD EJECUTIVO */}
        {activeTab === "dashboard" && (
          <div className="space-y-6">
            {/* Aging of Accounts (Antigüedad de Saldos) */}
            <div className="rounded-2xl border border-border/70 bg-card/60 p-6">
              <h2 className="text-base font-bold text-foreground flex items-center gap-2">
                <Clock className="size-4 text-emerald-400" />
                Semáforo de Antigüedad de Saldos (Aging de Cartera)
              </h2>
              <p className="text-xs text-muted-foreground mt-1">
                Monitoreo continuo de vencimientos para mitigar riesgo de incobrabilidad B2B.
              </p>

              <div className="mt-5 grid grid-cols-1 sm:grid-cols-4 gap-4">
                <div className="rounded-xl border border-emerald-500/30 bg-emerald-950/20 p-4">
                  <div className="flex justify-between items-center text-xs">
                    <span className="font-semibold text-emerald-400">Por Vencer (Al Corriente)</span>
                    <span className="text-[10px] font-mono bg-emerald-500/10 text-emerald-300 px-1.5 py-0.5 rounded">0 a 30 días</span>
                  </div>
                  <p className="mt-2 text-xl font-bold font-mono text-emerald-300">
                    {fmt(facturas.filter((f) => f.diasVencido === 0 && f.saldoInsoluto > 0).reduce((s, f) => s + f.saldoInsoluto, 0))}
                  </p>
                  <p className="mt-1 text-[11px] text-muted-foreground">Riesgo Bajo · Flujo proyectado</p>
                </div>

                <div className="rounded-xl border border-amber-500/30 bg-amber-950/20 p-4">
                  <div className="flex justify-between items-center text-xs">
                    <span className="font-semibold text-amber-400">Vencimiento Corto</span>
                    <span className="text-[10px] font-mono bg-amber-500/10 text-amber-300 px-1.5 py-0.5 rounded">1 a 30 días mora</span>
                  </div>
                  <p className="mt-2 text-xl font-bold font-mono text-amber-300">
                    {fmt(facturas.filter((f) => f.diasVencido > 0 && f.diasVencido <= 30 && f.saldoInsoluto > 0).reduce((s, f) => s + f.saldoInsoluto, 0))}
                  </p>
                  <p className="mt-1 text-[11px] text-muted-foreground">Recordatorios preventivos</p>
                </div>

                <div className="rounded-xl border border-rose-500/30 bg-rose-950/20 p-4">
                  <div className="flex justify-between items-center text-xs">
                    <span className="font-semibold text-rose-400">Mora Crítica</span>
                    <span className="text-[10px] font-mono bg-rose-500/10 text-rose-300 px-1.5 py-0.5 rounded">31 a 90 días</span>
                  </div>
                  <p className="mt-2 text-xl font-bold font-mono text-rose-300">
                    {fmt(facturas.filter((f) => f.diasVencido > 30 && f.saldoInsoluto > 0).reduce((s, f) => s + f.saldoInsoluto, 0))}
                  </p>
                  <p className="mt-1 text-[11px] text-muted-foreground">Escalamiento a gerencia / legal</p>
                </div>

                <div className="rounded-xl border border-blue-500/30 bg-blue-950/20 p-4">
                  <div className="flex justify-between items-center text-xs">
                    <span className="font-semibold text-blue-400">Tasa de Recuperación</span>
                    <span className="text-[10px] font-mono bg-blue-500/10 text-blue-300 px-1.5 py-0.5 rounded">Mes actual</span>
                  </div>
                  <p className="mt-2 text-xl font-bold font-mono text-blue-300">
                    {tasaCobranza}%
                  </p>
                  <div className="mt-2 h-1.5 w-full bg-blue-950 rounded-full overflow-hidden">
                    <div className="h-full bg-blue-500 rounded-full" style={{ width: `${tasaCobranza}%` }} />
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Actions & Recent Activity */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Acciones Rápidas */}
              <div className="rounded-2xl border border-border/70 bg-card/60 p-6 flex flex-col justify-between">
                <div>
                  <h3 className="text-sm font-bold text-foreground">Flujos Automatizados de Cobranza</h3>
                  <p className="text-xs text-muted-foreground mt-1">
                    Operaciones disponibles de acuerdo con los lineamientos del anexo 20 del SAT.
                  </p>

                  <div className="mt-4 space-y-2.5">
                    <button
                      onClick={() => setActiveTab("conciliacion")}
                      className="w-full flex items-center justify-between p-3 rounded-xl border border-border/60 bg-background/50 hover:border-emerald-500/40 hover:bg-emerald-950/10 transition text-left"
                    >
                      <div className="flex items-center gap-3">
                        <div className="p-2 rounded-lg bg-emerald-500/10 text-emerald-400">
                          <Landmark className="size-4" />
                        </div>
                        <div>
                          <p className="text-xs font-semibold text-foreground">Conciliar Depósitos Bancarios SPEI</p>
                          <p className="text-[11px] text-muted-foreground">3 movimientos pendientes de cruzar con factura</p>
                        </div>
                      </div>
                      <ChevronRight className="size-4 text-muted-foreground" />
                    </button>

                    <button
                      onClick={() => setActiveTab("facturas")}
                      className="w-full flex items-center justify-between p-3 rounded-xl border border-border/60 bg-background/50 hover:border-emerald-500/40 hover:bg-emerald-950/10 transition text-left"
                    >
                      <div className="flex items-center gap-3">
                        <div className="p-2 rounded-lg bg-blue-500/10 text-blue-400">
                          <FileText className="size-4" />
                        </div>
                        <div>
                          <p className="text-xs font-semibold text-foreground">Ver Cartera PPD & Generar REP</p>
                          <p className="text-[11px] text-muted-foreground">Emitir recibo de pago con folio fiscal</p>
                        </div>
                      </div>
                      <ChevronRight className="size-4 text-muted-foreground" />
                    </button>

                    <button
                      onClick={simularImportarCFDI}
                      className="w-full flex items-center justify-between p-3 rounded-xl border border-border/60 bg-background/50 hover:border-emerald-500/40 hover:bg-emerald-950/10 transition text-left"
                    >
                      <div className="flex items-center gap-3">
                        <div className="p-2 rounded-lg bg-purple-500/10 text-purple-400">
                          <Upload className="size-4" />
                        </div>
                        <div>
                          <p className="text-xs font-semibold text-foreground">Importar CFDI 4.0 XML</p>
                          <p className="text-[11px] text-muted-foreground">Extracción automática de datos fiscales</p>
                        </div>
                      </div>
                      <ChevronRight className="size-4 text-muted-foreground" />
                    </button>
                  </div>
                </div>

                <div className="mt-5 pt-4 border-t border-border/60 flex items-center justify-between text-xs text-muted-foreground">
                  <span>Arquitectura: Monolito modular</span>
                  <span className="font-mono text-emerald-400">Laravel 13 + Livewire 4</span>
                </div>
              </div>

              {/* Últimos Complementos REP emitidos */}
              <div className="rounded-2xl border border-border/70 bg-card/60 p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-sm font-bold text-foreground">Últimos Complementos REP Timbrados</h3>
                  <button
                    onClick={() => setActiveTab("rep")}
                    className="text-xs text-emerald-400 hover:underline"
                  >
                    Ver todos ({reps.length})
                  </button>
                </div>

                <div className="space-y-3">
                  {reps.slice(0, 3).map((rep) => (
                    <div
                      key={rep.id}
                      className="rounded-xl border border-border/60 bg-background/40 p-3 flex items-center justify-between"
                    >
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-mono text-xs font-bold text-foreground">{rep.id}</span>
                          <span className="text-[11px] text-muted-foreground">· Factura {rep.facturaFolio}</span>
                          <span className="text-[10px] font-mono bg-emerald-500/10 text-emerald-400 px-1.5 py-0.2 rounded">
                            Parc. {rep.parcialidad}
                          </span>
                        </div>
                        <p className="text-xs text-foreground/80 mt-1 truncate max-w-[200px] sm:max-w-xs">
                          {rep.cliente}
                        </p>
                        <p className="text-[10px] font-mono text-muted-foreground mt-0.5">
                          UUID: {rep.uuidRep.substring(0, 16)}...
                        </p>
                      </div>

                      <div className="text-right">
                        <p className="font-mono text-xs font-bold text-emerald-400">
                          {fmt(rep.montoPago)}
                        </p>
                        <p className="text-[10px] text-muted-foreground mt-0.5">{rep.fechaPago}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: FACTURAS PPD (CARTERA) */}
        {activeTab === "facturas" && (
          <div className="space-y-4">
            {/* Toolbar */}
            <div className="flex flex-col sm:flex-row gap-3 items-center justify-between bg-card/40 p-3 rounded-2xl border border-border/60">
              <div className="relative w-full sm:w-80">
                <Search className="absolute left-3 top-2.5 size-4 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="Buscar folio, cliente o RFC..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full rounded-xl border border-border/80 bg-background/60 pl-9 pr-3 py-1.5 text-xs text-foreground placeholder:text-muted-foreground focus:border-emerald-500 focus:outline-none"
                />
              </div>

              <div className="flex items-center gap-2 w-full sm:w-auto overflow-x-auto">
                <span className="text-xs text-muted-foreground hidden sm:inline">Estatus:</span>
                {(["todos", "pendiente", "parcial", "pagada"] as const).map((st) => (
                  <button
                    key={st}
                    onClick={() => setFiltroStatus(st)}
                    className={`px-3 py-1 rounded-lg text-xs font-medium capitalize transition ${
                      filtroStatus === st
                        ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/40"
                        : "text-muted-foreground hover:bg-card"
                    }`}
                  >
                    {st}
                  </button>
                ))}
              </div>
            </div>

            {/* Facturas Table */}
            <div className="overflow-x-auto rounded-2xl border border-border/70 bg-card/60">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-border/60 bg-background/40 font-mono text-muted-foreground uppercase text-[10px]">
                    <th className="py-3 px-4">Folio / UUID</th>
                    <th className="py-3 px-4">Cliente / RFC</th>
                    <th className="py-3 px-4">Emisión / Vence</th>
                    <th className="py-3 px-4 text-right">Monto Total</th>
                    <th className="py-3 px-4 text-right">Saldo Insoluto</th>
                    <th className="py-3 px-4 text-center">Estatus</th>
                    <th className="py-3 px-4 text-right">Acciones</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border/40">
                  {facturasFiltradas.map((fac) => (
                    <tr key={fac.id} className="hover:bg-card/80 transition-colors">
                      <td className="py-3.5 px-4">
                        <div className="font-mono font-bold text-foreground text-xs">{fac.serieFolio}</div>
                        <div className="font-mono text-[10px] text-muted-foreground truncate max-w-[120px]" title={fac.uuid}>
                          {fac.uuid.substring(0, 13)}...
                        </div>
                      </td>
                      <td className="py-3.5 px-4">
                        <div className="font-medium text-foreground text-xs">{fac.cliente}</div>
                        <div className="font-mono text-[10px] text-muted-foreground">{fac.rfc}</div>
                      </td>
                      <td className="py-3.5 px-4 font-mono text-[11px] text-muted-foreground">
                        <div>{fac.fechaEmision}</div>
                        <div className={fac.diasVencido > 0 && fac.saldoInsoluto > 0 ? "text-rose-400 font-semibold" : ""}>
                          {fac.fechaVencimiento}
                          {fac.diasVencido > 0 && fac.saldoInsoluto > 0 && ` (${fac.diasVencido}d mora)`}
                        </div>
                      </td>
                      <td className="py-3.5 px-4 text-right font-mono font-medium text-foreground">
                        {fmt(fac.total)}
                      </td>
                      <td className="py-3.5 px-4 text-right font-mono font-bold">
                        <span className={fac.saldoInsoluto > 0 ? (fac.diasVencido > 0 ? "text-rose-400" : "text-amber-400") : "text-muted-foreground line-through"}>
                          {fmt(fac.saldoInsoluto)}
                        </span>
                      </td>
                      <td className="py-3.5 px-4 text-center">
                        <span
                          className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-semibold uppercase font-mono ${
                            fac.status === "pagada"
                              ? "bg-emerald-500/15 text-emerald-400 border border-emerald-500/30"
                              : fac.status === "parcial"
                              ? "bg-blue-500/15 text-blue-400 border border-blue-500/30"
                              : fac.diasVencido > 0
                              ? "bg-rose-500/15 text-rose-400 border border-rose-500/30"
                              : "bg-amber-500/15 text-amber-400 border border-amber-500/30"
                          }`}
                        >
                          {fac.status === "pagada" ? "Liquidada" : fac.status === "parcial" ? `Parcial (${fac.parcialidad})` : "Pendiente"}
                        </span>
                      </td>
                      <td className="py-3.5 px-4 text-right">
                        <div className="flex items-center justify-end gap-1.5">
                          {fac.saldoInsoluto > 0 ? (
                            <>
                              <button
                                onClick={() => abrirModalConciliar(fac)}
                                className="inline-flex items-center gap-1 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white px-2.5 py-1 text-xs font-semibold shadow-sm transition active:scale-95"
                              >
                                <DollarSign className="size-3" />
                                Conciliar REP
                              </button>
                              <button
                                onClick={() => setCobranzaModal(fac)}
                                title="Enviar recordatorio de cobranza"
                                className="rounded-lg border border-border/80 bg-background/50 hover:bg-card p-1 text-muted-foreground hover:text-foreground transition"
                              >
                                <Send className="size-3.5" />
                              </button>
                            </>
                          ) : (
                            <span className="text-[11px] text-emerald-400 font-mono flex items-center justify-end gap-1">
                              <CheckCircle2 className="size-3.5" />
                              Pagada
                            </span>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* TAB 3: CONCILIACIÓN BANCARIA SPEI */}
        {activeTab === "conciliacion" && (
          <div className="space-y-6">
            <div className="rounded-2xl border border-border/70 bg-card/60 p-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h2 className="text-base font-bold text-foreground flex items-center gap-2">
                    <Landmark className="size-4 text-emerald-400" />
                    Bandeja de Depósitos SPEI para Vincular con CFDI PPD
                  </h2>
                  <p className="text-xs text-muted-foreground mt-1">
                    Cruce inteligente por importe, RFC y referencia bancaria para automatizar la emisión del recibo REP.
                  </p>
                </div>
                <div className="text-xs font-mono text-emerald-400 border border-emerald-500/30 bg-emerald-500/10 px-3 py-1.5 rounded-xl">
                  {movimientos.filter((m) => !m.conciliado).length} SPEIs sin conciliar
                </div>
              </div>

              <div className="mt-6 space-y-3">
                {movimientos.map((mov) => (
                  <div
                    key={mov.id}
                    className={`rounded-2xl border p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4 transition ${
                      mov.conciliado
                        ? "border-emerald-500/30 bg-emerald-950/10 opacity-75"
                        : "border-border/80 bg-background/50 hover:border-emerald-500/40"
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <div
                        className={`p-2.5 rounded-xl shrink-0 ${
                          mov.conciliado
                            ? "bg-emerald-500/20 text-emerald-400"
                            : "bg-blue-500/20 text-blue-400"
                        }`}
                      >
                        <Landmark className="size-5" />
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-mono text-xs font-bold text-foreground">{mov.banco}</span>
                          <span className="font-mono text-[11px] text-muted-foreground">{mov.fecha}</span>
                          {mov.conciliado ? (
                            <span className="rounded-full bg-emerald-500/20 text-emerald-400 px-2 py-0.5 text-[10px] font-mono font-semibold">
                              Conciliado · Factura {mov.facturaAsignada}
                            </span>
                          ) : (
                            <span className="rounded-full bg-amber-500/20 text-amber-400 px-2 py-0.5 text-[10px] font-mono font-semibold">
                              Por Conciliar
                            </span>
                          )}
                        </div>
                        <p className="text-xs font-medium text-foreground mt-1">{mov.referencia}</p>
                        <p className="text-[11px] text-muted-foreground mt-0.5">Emisor: {mov.emisor}</p>
                      </div>
                    </div>

                    <div className="flex items-center justify-between sm:justify-end gap-4 border-t sm:border-t-0 pt-3 sm:pt-0 border-border/40">
                      <div className="text-right">
                        <p className="text-xs text-muted-foreground">Monto recibido</p>
                        <p className="font-mono text-base font-bold text-emerald-400">{fmt(mov.monto)}</p>
                      </div>

                      {!mov.conciliado ? (
                        <button
                          onClick={() => simularMatchBancario(mov)}
                          className="inline-flex items-center gap-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white px-3.5 py-2 text-xs font-semibold shadow-sm transition active:scale-95"
                        >
                          <Link2 className="size-3.5" />
                          Match con PPD
                        </button>
                      ) : (
                        <div className="flex items-center gap-1 text-xs text-emerald-400 font-mono">
                          <CheckCircle2 className="size-4" />
                          <span>REP Generado</span>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* TAB 4: COMPLEMENTOS DE PAGO (REP) */}
        {activeTab === "rep" && (
          <div className="space-y-4">
            <div className="rounded-2xl border border-border/70 bg-card/60 p-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
                <div>
                  <h2 className="text-base font-bold text-foreground flex items-center gap-2">
                    <ShieldCheck className="size-4 text-emerald-400" />
                    Bitácora de Complementos de Recepción de Pagos (REP)
                  </h2>
                  <p className="text-xs text-muted-foreground mt-1">
                    Comprobantes fiscales tipo Pago emitidos bajo el estándar CFDI 4.0 del SAT.
                  </p>
                </div>
                <div className="text-xs font-mono text-muted-foreground">
                  Total Recaudado: <span className="font-bold text-emerald-400">{fmt(totalRecuperado)}</span>
                </div>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead>
                    <tr className="border-b border-border/60 bg-background/40 font-mono text-muted-foreground uppercase text-[10px]">
                      <th className="py-3 px-4">Folio REP / UUID</th>
                      <th className="py-3 px-4">Factura Relacionada</th>
                      <th className="py-3 px-4">Cliente Receptor</th>
                      <th className="py-3 px-4 text-center">Parcialidad</th>
                      <th className="py-3 px-4 text-right">Saldo Anterior</th>
                      <th className="py-3 px-4 text-right">Importe Pagado</th>
                      <th className="py-3 px-4 text-right">Saldo Insoluto</th>
                      <th className="py-3 px-4 text-center">XML / PDF</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border/40">
                    {reps.map((rep) => (
                      <tr key={rep.id} className="hover:bg-card/80 transition-colors">
                        <td className="py-3.5 px-4">
                          <div className="font-mono font-bold text-foreground text-xs">{rep.id}</div>
                          <div className="font-mono text-[10px] text-muted-foreground truncate max-w-[130px]" title={rep.uuidRep}>
                            {rep.uuidRep.substring(0, 16)}...
                          </div>
                        </td>
                        <td className="py-3.5 px-4 font-mono font-medium text-emerald-400">
                          {rep.facturaFolio}
                        </td>
                        <td className="py-3.5 px-4">
                          <div className="text-foreground font-medium text-xs truncate max-w-[180px]">{rep.cliente}</div>
                          <div className="font-mono text-[10px] text-muted-foreground">{rep.fechaPago}</div>
                        </td>
                        <td className="py-3.5 px-4 text-center">
                          <span className="font-mono text-xs px-2 py-0.5 rounded bg-card border border-border/60">
                            #{rep.parcialidad}
                          </span>
                        </td>
                        <td className="py-3.5 px-4 text-right font-mono text-muted-foreground">
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
                          <div className="flex items-center justify-center gap-1">
                            <button
                              onClick={() => alert(`Descarga simulada de XML REP: ${rep.uuidRep}.xml`)}
                              className="p-1 rounded hover:bg-card text-muted-foreground hover:text-emerald-400 transition"
                              title="Descargar XML"
                            >
                              <FileCode2 className="size-4" />
                            </button>
                            <button
                              onClick={() => alert(`Visualización de representación impresa PDF REP: ${rep.id}`)}
                              className="p-1 rounded hover:bg-card text-muted-foreground hover:text-blue-400 transition"
                              title="Descargar PDF"
                            >
                              <FileText className="size-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* MODAL CONCILIAR & EMITIR REP */}
      <AnimatePresence>
        {modalFactura && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="w-full max-w-lg rounded-3xl border border-emerald-500/30 bg-card p-6 shadow-2xl relative"
            >
              <button
                onClick={() => setModalFactura(null)}
                className="absolute top-5 right-5 text-muted-foreground hover:text-foreground p-1"
              >
                <X className="size-5" />
              </button>

              <div className="flex items-center gap-2 mb-1">
                <span className="p-1.5 rounded-lg bg-emerald-500/10 text-emerald-400">
                  <ShieldCheck className="size-5" />
                </span>
                <h3 className="text-lg font-bold text-foreground">Emitir Complemento REP (SAT)</h3>
              </div>
              <p className="text-xs text-muted-foreground mb-4">
                Genera el documento fiscal para registrar el pago y reducir el saldo insoluto.
              </p>

              <div className="rounded-2xl border border-border/80 bg-background/60 p-4 mb-4 space-y-2 text-xs font-mono">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Factura:</span>
                  <span className="text-foreground font-bold">{modalFactura.serieFolio}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Cliente:</span>
                  <span className="text-foreground truncate max-w-[220px]">{modalFactura.cliente}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Saldo Insoluto Actual:</span>
                  <span className="text-amber-400 font-bold">{fmt(modalFactura.saldoInsoluto)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Parcialidad a Timbrar:</span>
                  <span className="text-blue-400 font-bold">#{modalFactura.parcialidad + 1}</span>
                </div>
              </div>

              <div className="space-y-3 text-xs">
                <div>
                  <label className="block text-muted-foreground mb-1 font-medium">Monto a Abonar (MXN):</label>
                  <input
                    type="number"
                    value={montoPago}
                    onChange={(e) => setMontoPago(Number(e.target.value))}
                    max={modalFactura.saldoInsoluto}
                    min={1}
                    className="w-full rounded-xl border border-border/80 bg-background px-3 py-2 text-sm font-mono font-bold text-emerald-400 focus:border-emerald-500 focus:outline-none"
                  />
                  <div className="flex justify-between text-[11px] text-muted-foreground mt-1">
                    <span>
                      Nuevo saldo insoluto:{" "}
                      <strong className="text-foreground">
                        {fmt(Math.max(0, modalFactura.saldoInsoluto - (Number(montoPago) || 0)))}
                      </strong>
                    </span>
                    <button
                      type="button"
                      onClick={() => setMontoPago(modalFactura.saldoInsoluto)}
                      className="text-emerald-400 underline"
                    >
                      Liquidar total
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-muted-foreground mb-1 font-medium">Fecha de Pago:</label>
                    <input
                      type="date"
                      value={fechaPago}
                      onChange={(e) => setFechaPago(e.target.value)}
                      className="w-full rounded-xl border border-border/80 bg-background px-3 py-2 font-mono text-xs text-foreground focus:border-emerald-500 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-muted-foreground mb-1 font-medium">Forma de Pago SAT:</label>
                    <select
                      value={formaPago}
                      onChange={(e) => setFormaPago(e.target.value)}
                      className="w-full rounded-xl border border-border/80 bg-background px-3 py-2 text-xs text-foreground focus:border-emerald-500 focus:outline-none"
                    >
                      <option value="03 Transferencia electrónica (SPEI)">03 - SPEI Transferencia</option>
                      <option value="01 Efectivo">01 - Efectivo</option>
                      <option value="02 Cheque nominativo">02 - Cheque</option>
                      <option value="04 Tarjeta de crédito">04 - Tarjeta Crédito</option>
                    </select>
                  </div>
                </div>
              </div>

              <div className="mt-6 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setModalFactura(null)}
                  className="rounded-xl border border-border/80 bg-background/50 px-4 py-2 text-xs font-semibold text-muted-foreground hover:text-foreground transition"
                >
                  Cancelar
                </button>
                <button
                  type="button"
                  onClick={aplicarPagoREP}
                  disabled={montoPago <= 0}
                  className="rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white px-5 py-2 text-xs font-semibold shadow-md transition active:scale-95 disabled:opacity-50"
                >
                  Timbrar y Aplicar Pago
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* MODAL RECORDATORIO DE COBRANZA */}
      <AnimatePresence>
        {cobranzaModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="w-full max-w-md rounded-3xl border border-border/80 bg-card p-6 shadow-2xl relative"
            >
              <button
                onClick={() => setCobranzaModal(null)}
                className="absolute top-5 right-5 text-muted-foreground hover:text-foreground p-1"
              >
                <X className="size-5" />
              </button>

              <div className="flex items-center gap-2 mb-2">
                <span className="p-1.5 rounded-lg bg-blue-500/10 text-blue-400">
                  <Send className="size-5" />
                </span>
                <h3 className="text-base font-bold text-foreground">Recordatorio de Cobranza</h3>
              </div>
              <p className="text-xs text-muted-foreground mb-4">
                Envía una notificación formal de estado de cuenta para la factura {cobranzaModal.serieFolio}.
              </p>

              <div className="space-y-3 text-xs">
                <div>
                  <label className="block text-muted-foreground mb-1">Canal de Envío:</label>
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      type="button"
                      onClick={() => setCanalEnvio("whatsapp")}
                      className={`flex items-center justify-center gap-1.5 py-2 rounded-xl font-medium border text-xs transition ${
                        canalEnvio === "whatsapp"
                          ? "border-emerald-500 bg-emerald-500/10 text-emerald-400"
                          : "border-border/80 bg-background text-muted-foreground"
                      }`}
                    >
                      <MessageCircle className="size-4 text-emerald-500" />
                      WhatsApp B2B
                    </button>
                    <button
                      type="button"
                      onClick={() => setCanalEnvio("email")}
                      className={`flex items-center justify-center gap-1.5 py-2 rounded-xl font-medium border text-xs transition ${
                        canalEnvio === "email"
                          ? "border-blue-500 bg-blue-500/10 text-blue-400"
                          : "border-border/80 bg-background text-muted-foreground"
                      }`}
                    >
                      <Send className="size-4 text-blue-500" />
                      Email Corporativo
                    </button>
                  </div>
                </div>

                <div>
                  <label className="block text-muted-foreground mb-1">Previsualización del Mensaje:</label>
                  <div className="rounded-xl border border-border/80 bg-background/60 p-3 font-mono text-[11px] text-foreground leading-relaxed">
                    Estimado cliente <strong>{cobranzaModal.cliente}</strong>, le recordamos que la factura{" "}
                    <strong>{cobranzaModal.serieFolio}</strong> con saldo insoluto de{" "}
                    <strong className="text-emerald-400">{fmt(cobranzaModal.saldoInsoluto)}</strong> presenta fecha de
                    vencimiento al <strong>{cobranzaModal.fechaVencimiento}</strong>. Favor de remitir su comprobante SPEI
                    para la emisión de su Complemento REP correspondiente.
                  </div>
                </div>
              </div>

              <div className="mt-5 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setCobranzaModal(null)}
                  className="rounded-xl border border-border/80 bg-background/50 px-3.5 py-2 text-xs font-semibold text-muted-foreground hover:text-foreground transition"
                >
                  Cerrar
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setCobranzaModal(null);
                    setNotifSuccess(`Recordatorio enviado con éxito vía ${canalEnvio.toUpperCase()}`);
                    setTimeout(() => setNotifSuccess(null), 3500);
                  }}
                  className="rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white px-4 py-2 text-xs font-semibold shadow-md transition active:scale-95"
                >
                  Enviar Notificación
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
