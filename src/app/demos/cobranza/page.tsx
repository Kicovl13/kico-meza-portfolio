"use client";

import { useState, useId } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  AlertCircle,
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  Banknote,
  Building2,
  Calendar,
  Check,
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
  Menu,
  MessageCircle,
  MoreVertical,
  Percent,
  Plus,
  QrCode,
  RefreshCw,
  Search,
  Send,
  ShieldAlert,
  ShieldCheck,
  SlidersHorizontal,
  TrendingDown,
  TrendingUp,
  Upload,
  UserCheck,
  X,
  Zap,
} from "lucide-react";
import Link from "next/link";
import { DemoSystemHeader } from "@/components/demos/demo-system-header";
import { mvcShowcases } from "@/lib/data";

const cobranzaProject = mvcShowcases.find((s) => s.id === "cobranza-b2b")!;

// ---------------------------------------------------------------------------
// Modelos de datos
// ---------------------------------------------------------------------------
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

interface AuditLogEvent {
  id: string;
  timestamp: string;
  tipo: "TIMBRADO_REP" | "CONCILIACION_SPEI" | "CARGA_XML" | "VALIDACION_HASH";
  descripcion: string;
  uuidFiscal: string;
  severidad: "exito" | "info" | "alerta";
  hashSha256: string;
}

// ---------------------------------------------------------------------------
// Datos iniciales
// ---------------------------------------------------------------------------
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
    selloSAT: "kZ8Q8xP+L7uM1k8Y2eN4wT1pA9r...v9xQw==",
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
    selloSAT: "mN2b9VxL1wP0q3Z7tC4mK8jR5...y8vRt==",
  },
  {
    id: "REP-2026-0039",
    uuidRep: "A5B6C7D8-E9F0-4A1B-2C3D-4E5F6A7B8C9D",
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
    selloSAT: "pL8z1WxQ9uV4b6A2c8E1mT3k7...c3mJk==",
  },
];

const auditLogsIniciales: AuditLogEvent[] = [
  {
    id: "AUD-104",
    timestamp: "2026-11-03 14:12:05",
    tipo: "TIMBRADO_REP",
    descripcion: "Timbrado exitoso Complemento REP #REP-2026-0041 por $60,000.00 MXN.",
    uuidFiscal: "E9A8B7C6-D5E4-4F3A-8B1C-0D9E8F7A6B5C",
    severidad: "exito",
    hashSha256: "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855",
  },
  {
    id: "AUD-103",
    timestamp: "2026-11-02 09:30:18",
    tipo: "CONCILIACION_SPEI",
    descripcion: "Coincidencia algorítmica SPEI BBVA $60,000.00 vinculada a factura A-1025.",
    uuidFiscal: "3D4E5F6A-7B8C-9D0E-1F2A-3B4C5D6E0005",
    severidad: "info",
    hashSha256: "8f434346648f6b96df89dda901c5176b10a6d83961dd3c1ac88b59b2dc327aa4",
  },
  {
    id: "AUD-102",
    timestamp: "2026-10-28 16:45:11",
    tipo: "VALIDACION_HASH",
    descripcion: "Verificación de idempotencia de timbrado: sin duplicidad de CFDI.",
    uuidFiscal: "A5B6C7D8-E9F0-4A1B-2C3D-4E5F6A7B8C9D",
    severidad: "exito",
    hashSha256: "ca978112ca1bbdcafac231b39a23dc4da786eff8147c4e72b9807785afee48bb",
  },
  {
    id: "AUD-101",
    timestamp: "2026-10-22 11:04:40",
    tipo: "CARGA_XML",
    descripcion: "Ingesta CFDI 4.0 tipo I (Ingreso) serie A-1050 por $94,800.00 MXN.",
    uuidFiscal: "7E8F9A0B-1C2D-3E4F-5A6B-7C8D9E0F0004",
    severidad: "info",
    hashSha256: "4e07408562bedb8b60ce05c1decfe3ad16b72230967de01f640b7e4729b49fce",
  },
];

function fmt(n: number) {
  return `$${n.toLocaleString("es-MX", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
}

// ---------------------------------------------------------------------------
// Componente Principal
// ---------------------------------------------------------------------------
export default function CobranzaPage() {
  const [navSection, setNavSection] = useState<"cxc" | "reconciler" | "rep_log" | "reports">("cxc");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const [facturas, setFacturas] = useState<FacturaPPD[]>(facturasIniciales);
  const [movimientos, setMovimientos] = useState<MovimientoSPEI[]>(movimientosIniciales);
  const [reps, setReps] = useState<ReciboREP[]>(repsIniciales);
  const [auditLogs, setAuditLogs] = useState<AuditLogEvent[]>(auditLogsIniciales);

  // Filtros de Cartera
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<"all" | "pendiente" | "parcial" | "pagada">("all");

  // State Modal Conciliar REP
  const [selectedFactura, setSelectedFactura] = useState<FacturaPPD | null>(null);
  const [montoAbono, setMontoAbono] = useState<number>(0);
  const [formaPago, setFormaPago] = useState("03 Transferencia electrónica (SPEI)");
  const [fechaPago, setFechaPago] = useState("2026-11-03");

  // State Inspección Fiscal Modal (XML / SAT Preview)
  const [repInspector, setRepInspector] = useState<ReciboREP | null>(null);
  const [inspectorTab, setInspectorTab] = useState<"visual" | "xml">("visual");

  // Alerta Toast
  const [toastMsg, setToastMsg] = useState<{ text: string; type: "success" | "info" | "warning" } | null>(null);
  const [isSimulatingXML, setIsSimulatingXML] = useState(false);

  const showToast = (text: string, type: "success" | "info" | "warning" = "success") => {
    setToastMsg({ text, type });
    setTimeout(() => setToastMsg(null), 3800);
  };

  // KPIs Financieros
  const totalCartera = facturas.reduce((acc, f) => acc + f.saldoInsoluto, 0);
  const totalCobradoMes = reps.reduce((acc, r) => acc + r.montoPago, 0);
  const vencidas = facturas.filter((f) => f.diasVencido > 0 && f.saldoInsoluto > 0);
  const montoVencido = vencidas.reduce((acc, f) => acc + f.saldoInsoluto, 0);
  const speiPendientes = movimientos.filter((m) => !m.conciliado);
  const totalSpeiPendiente = speiPendientes.reduce((acc, m) => acc + m.monto, 0);

  // Filtro de facturas
  const facturasFiltradas = facturas.filter((f) => {
    const matchSearch =
      f.serieFolio.toLowerCase().includes(search.toLowerCase()) ||
      f.cliente.toLowerCase().includes(search.toLowerCase()) ||
      f.rfc.toLowerCase().includes(search.toLowerCase()) ||
      f.uuid.toLowerCase().includes(search.toLowerCase());
    const matchStatus = statusFilter === "all" || f.status === statusFilter;
    return matchSearch && matchStatus;
  });

  // Acciones y Handlers
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

    const nuevoUuidRep = `${Math.random().toString(16).substring(2, 10).toUpperCase()}-5A8B-4C2D-9E1F-${Math.random().toString(16).substring(2, 14).toUpperCase()}`;
    const nuevoREP: ReciboREP = {
      id: `REP-2026-00${reps.length + 42}`,
      uuidRep: nuevoUuidRep,
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
      selloSAT: `${Math.random().toString(36).substring(2, 18).toUpperCase()}==`,
    };

    setReps([nuevoREP, ...reps]);

    // Registro inmutable en auditoría
    const nuevoLog: AuditLogEvent = {
      id: `AUD-${100 + auditLogs.length + 5}`,
      timestamp: new Date().toISOString().replace("T", " ").substring(0, 19),
      tipo: "TIMBRADO_REP",
      descripcion: `Emisión de Complemento de Pago ${nuevoREP.id} por ${fmt(abono)} para factura ${selectedFactura.serieFolio}.`,
      uuidFiscal: nuevoUuidRep,
      severidad: "exito",
      hashSha256: Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15),
    };
    setAuditLogs([nuevoLog, ...auditLogs]);

    setSelectedFactura(null);
    showToast(`✅ Complemento REP ${nuevoREP.id} timbrado por ${fmt(abono)}. Saldo insoluto actualizado.`, "success");
  };

  const autoMatchSPEI = (mov: MovimientoSPEI) => {
    const candidata = facturas.find(
      (f) => f.saldoInsoluto > 0 && Math.abs(f.saldoInsoluto - mov.monto) <= 1000
    );
    if (!candidata) {
      showToast("⚠️ No se encontró factura PPD con saldo pendiente coincidente para este importe.", "warning");
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
    showToast(`⚡ Depósito SPEI ${mov.banco} (${fmt(mov.monto)}) vinculado con factura ${candidata.serieFolio}. Procede a confirmar el REP.`, "info");
  };

  const simularCargaCFDI = () => {
    setIsSimulatingXML(true);
    setTimeout(() => {
      const nuevoFolioNum = 1052 + facturas.length;
      const nuevoUuid = `3B9E${Math.random().toString(16).substring(2, 6).toUpperCase()}-7C1D-4E8F-A2B3-${Math.random().toString(16).substring(2, 14).toUpperCase()}`;
      const nuevaFac: FacturaPPD = {
        id: `FAC-${1000 + facturas.length + 1}`,
        uuid: nuevoUuid,
        serieFolio: `A-${nuevoFolioNum}`,
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

      // Registro en auditoría
      const nuevoLog: AuditLogEvent = {
        id: `AUD-${100 + auditLogs.length + 5}`,
        timestamp: new Date().toISOString().replace("T", " ").substring(0, 19),
        tipo: "CARGA_XML",
        descripcion: `Parseo e ingesta de CFDI 4.0 tipo I serie ${nuevaFac.serieFolio} por ${fmt(nuevaFac.total)}.`,
        uuidFiscal: nuevoUuid,
        severidad: "info",
        hashSha256: Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15),
      };
      setAuditLogs([nuevoLog, ...auditLogs]);

      setIsSimulatingXML(false);
      showToast(`⚡ CFDI 4.0 PPD Importado: ${nuevaFac.serieFolio} (${fmt(nuevaFac.total)}) agregado a cartera activa.`, "success");
    }, 700);
  };

  const navItems = [
    {
      id: "cxc" as const,
      label: "Cartera CxC (PPD)",
      icon: FileText,
      badge: facturas.length.toString(),
      hint: "Facturas en parcialidades",
    },
    {
      id: "reconciler" as const,
      label: "Conciliador SPEI",
      icon: Link2,
      badge: `${speiPendientes.length} pend.`,
      badgeHighlight: speiPendientes.length > 0,
      hint: "Depósitos por vincular",
    },
    {
      id: "rep_log" as const,
      label: "Complementos REP",
      icon: ShieldCheck,
      badge: reps.length.toString(),
      hint: "Recibos de Pago SAT",
    },
    {
      id: "reports" as const,
      label: "Auditoría Fiscal & SAT",
      icon: FileSpreadsheet,
      badge: `${auditLogs.length} logs`,
      hint: "Trazabilidad inmutable",
    },
  ];

  return (
    <div className="min-h-screen bg-[#060910] text-[#f8fafc] flex flex-col font-sans selection:bg-[#10b981]/30 selection:text-[#34d399]">
      {/* Top Application Header Compartido */}
      <DemoSystemHeader project={cobranzaProject} />

      {/* Toast Notification */}
      <AnimatePresence>
        {toastMsg && (
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            className={`fixed top-18 right-4 sm:right-6 z-50 flex items-center gap-3 rounded-xl px-4 py-3 text-xs font-mono font-medium shadow-2xl backdrop-blur-md border ${
              toastMsg.type === "success"
                ? "bg-[#061e14]/95 border-[#10b981]/40 text-[#a7f3d0]"
                : toastMsg.type === "warning"
                ? "bg-[#251506]/95 border-[#f59e0b]/40 text-[#fde68a]"
                : "bg-[#091b2c]/95 border-[#38bdf8]/40 text-[#bae6fd]"
            }`}
          >
            {toastMsg.type === "success" && <ShieldCheck className="size-4 text-[#10b981] shrink-0" />}
            {toastMsg.type === "warning" && <AlertCircle className="size-4 text-[#f59e0b] shrink-0" />}
            {toastMsg.type === "info" && <Link2 className="size-4 text-[#38bdf8] shrink-0" />}
            <span>{toastMsg.text}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main App Layout */}
      <div className="flex-1 flex overflow-hidden">
        {/* =========================================================================
            DESKTOP SIDEBAR
        ========================================================================= */}
        <aside className="w-64 lg:w-72 bg-[#090d16] border-r border-slate-800/80 flex-col justify-between shrink-0 hidden md:flex">
          <div>
            {/* Emisor Fiscal Identity Card */}
            <div className="p-4 border-b border-slate-800/70 bg-[#0d1422]">
              <div className="flex items-center gap-3">
                <div className="size-9 rounded-xl bg-gradient-to-br from-[#10b981] to-[#047857] flex items-center justify-center font-bold text-white shadow-md shadow-[#10b981]/20">
                  <Landmark className="size-4 text-white" />
                </div>
                <div className="overflow-hidden min-w-0">
                  <h2 className="text-xs font-bold text-slate-100 truncate tracking-tight">
                    Grupo Industrial del Norte
                  </h2>
                  <p className="font-mono text-[10px] text-[#34d399] tracking-wider truncate">
                    RFC: GIN180410XX1
                  </p>
                </div>
              </div>
              <div className="mt-2.5 flex items-center justify-between text-[10px] font-mono text-slate-400 pt-2 border-t border-slate-800/60">
                <span>Régimen: 601 General</span>
                <span className="text-emerald-400 font-semibold flex items-center gap-1">
                  <span className="size-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  SAT Online
                </span>
              </div>
            </div>

            {/* Navigation Ledger Links */}
            <nav className="p-3 space-y-1 text-xs" aria-label="Módulos de Cobranza">
              {navItems.map((item) => {
                const Icon = item.icon;
                const active = navSection === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => setNavSection(item.id)}
                    className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl font-medium transition cursor-pointer text-left ${
                      active
                        ? "bg-[#10b981]/15 text-[#34d399] border border-[#10b981]/30 shadow-sm"
                        : "text-slate-400 hover:text-slate-200 hover:bg-slate-800/40"
                    }`}
                  >
                    <div className="flex items-center gap-2.5 min-w-0">
                      <Icon className={`size-4 shrink-0 ${active ? "text-[#34d399]" : "text-slate-400"}`} />
                      <div className="truncate">
                        <span className="block leading-tight">{item.label}</span>
                        <span className="text-[10px] font-mono text-slate-500 block leading-none mt-0.5">
                          {item.hint}
                        </span>
                      </div>
                    </div>
                    <span
                      className={`font-mono text-[10px] px-1.5 py-0.5 rounded shrink-0 ${
                        item.badgeHighlight
                          ? "bg-amber-500/20 text-amber-300 border border-amber-500/30"
                          : active
                          ? "bg-[#10b981]/20 text-[#34d399]"
                          : "bg-slate-800/80 text-slate-400"
                      }`}
                    >
                      {item.badge}
                    </span>
                  </button>
                );
              })}
            </nav>

            {/* Quick Ledger Balances in Sidebar */}
            <div className="mx-3 my-2 p-3 rounded-2xl border border-slate-800/90 bg-[#0d1422]/70 text-xs">
              <p className="text-[10px] font-mono uppercase text-slate-400 tracking-wider font-semibold">
                Resumen Contable
              </p>
              <div className="mt-2 space-y-1.5 font-mono text-[11px]">
                <div className="flex justify-between">
                  <span className="text-slate-500">Cartera viva:</span>
                  <span className="text-slate-200 font-bold">{fmt(totalCartera)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Mora (+30d):</span>
                  <span className="text-rose-400 font-bold">{fmt(montoVencido)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Cobrado (mes):</span>
                  <span className="text-emerald-400 font-bold">{fmt(totalCobradoMes)}</span>
                </div>
                <div className="flex justify-between pt-1 border-t border-slate-800 text-[10px]">
                  <span className="text-slate-500">SPEI pendientes:</span>
                  <span className="text-amber-400 font-bold">{fmt(totalSpeiPendiente)}</span>
                </div>
              </div>
            </div>
          </div>

          {/* User / Accountant Demo Profile in Sidebar */}
          <div className="p-3 border-t border-slate-800/70 bg-[#0a0e18] flex items-center justify-between text-xs">
            <div className="flex items-center gap-2.5 min-w-0">
              <div className="size-7 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center font-mono font-bold text-slate-300 text-[11px] shrink-0">
                FM
              </div>
              <div className="truncate">
                <p className="font-semibold text-slate-200 truncate leading-tight">Federico Meza</p>
                <p className="text-[10px] text-emerald-400 font-mono truncate">Tech Lead / Finanzas</p>
              </div>
            </div>
            <span className="text-[10px] font-mono text-slate-500 bg-slate-900 border border-slate-800 px-1.5 py-0.5 rounded">
              Demo
            </span>
          </div>
        </aside>

        {/* =========================================================================
            MAIN WORKSPACE AREA
        ========================================================================= */}
        <div className="flex-1 flex flex-col overflow-y-auto">
          {/* Sub-Header Contextual & Mobile Navigation Trigger */}
          <div className="sticky top-0 z-30 bg-[#0a0e18]/95 backdrop-blur-md border-b border-slate-800/80 px-4 sm:px-6 py-3 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="flex items-center justify-between sm:justify-start gap-3">
              {/* Mobile Drawer Trigger */}
              <button
                type="button"
                onClick={() => setMobileMenuOpen(true)}
                className="md:hidden inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl border border-slate-700 bg-slate-800/90 text-xs font-medium text-slate-200 hover:text-white"
                aria-label="Abrir navegación de módulos"
              >
                <Menu className="size-4 text-[#34d399]" />
                <span>Módulos ({navItems.find((n) => n.id === navSection)?.label.split(" ")[0]})</span>
              </button>

              <div>
                <div className="flex items-center gap-2">
                  <h1 className="text-sm sm:text-base font-bold text-white tracking-tight">
                    {navSection === "cxc" && "Cartera de Cuentas por Cobrar (Facturas PPD)"}
                    {navSection === "reconciler" && "Conciliación de Depósitos Bancarios SPEI"}
                    {navSection === "rep_log" && "Bitácora Fiscal de Recibos Electrónicos de Pago (REP)"}
                    {navSection === "reports" && "Matriz de Auditoría Fiscal & Cumplimiento SAT Anexo 20"}
                  </h1>
                  <span className="rounded-full bg-emerald-500/10 border border-emerald-500/30 px-2 py-0.5 text-[10px] font-mono text-emerald-400 shrink-0 hidden sm:inline-block">
                    CFDI 4.0
                  </span>
                </div>
                <p className="text-[11px] sm:text-xs text-slate-400">
                  {navSection === "cxc" && "Seguimiento de comprobantes en parcialidades, mora e imputación de abonos."}
                  {navSection === "reconciler" && "Algoritmo de vinculación automática entre estados de cuenta y facturas."}
                  {navSection === "rep_log" && "Acreditación de IVA y timbrado inmutable bajo estándar Anexo 20."}
                  {navSection === "reports" && "Trazabilidad forense, congruencia bancaria e idempotencia de timbrado."}
                </p>
              </div>
            </div>

            {/* Contextual Actions */}
            <div className="flex items-center gap-2 self-end sm:self-auto">
              <button
                type="button"
                onClick={simularCargaCFDI}
                disabled={isSimulatingXML}
                className="inline-flex items-center gap-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700/80 text-slate-200 px-3 py-1.5 text-xs font-semibold shadow-sm transition active:scale-95 disabled:opacity-50 cursor-pointer"
                title="Simula la ingesta y extracción de un archivo XML CFDI 4.0"
              >
                <Upload className="size-3.5 text-[#34d399]" />
                <span>{isSimulatingXML ? "Extrayendo XML..." : "Cargar XML CFDI 4.0"}</span>
              </button>

              {navSection !== "reconciler" ? (
                <button
                  type="button"
                  onClick={() => setNavSection("reconciler")}
                  className="inline-flex items-center gap-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white px-3.5 py-1.5 text-xs font-semibold shadow-md shadow-emerald-900/30 transition active:scale-95 cursor-pointer"
                >
                  <Zap className="size-3.5" />
                  <span>Conciliar SPEI</span>
                </button>
              ) : (
                <button
                  type="button"
                  onClick={() => setNavSection("cxc")}
                  className="inline-flex items-center gap-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-200 px-3 py-1.5 text-xs font-semibold transition active:scale-95 cursor-pointer"
                >
                  <FileText className="size-3.5 text-[#34d399]" />
                  <span>Ver Cartera CxC</span>
                </button>
              )}
            </div>
          </div>

          {/* Workspace Body */}
          <main className="flex-1 p-4 sm:p-6 lg:p-8 space-y-6">
            {/* KPI Financial Overview Cards */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
              {/* Card 1: Total Cartera */}
              <div className="rounded-2xl border border-slate-800 bg-[#0d1422] p-3.5 sm:p-4 relative overflow-hidden">
                <div className="flex justify-between items-start">
                  <span className="text-[10px] sm:text-[11px] font-mono uppercase tracking-wider text-slate-400 font-semibold">
                    Total Cartera CxC
                  </span>
                  <span className="p-1.5 rounded-lg bg-blue-500/10 text-blue-400">
                    <Banknote className="size-3.5 sm:size-4" />
                  </span>
                </div>
                <p className="mt-1.5 sm:mt-2 text-lg sm:text-2xl font-bold font-mono text-white tracking-tight">
                  {fmt(totalCartera)}
                </p>
                <div className="mt-1 sm:mt-2 flex items-center gap-1.5 text-[10px] sm:text-[11px] text-slate-400 font-mono truncate">
                  <span className="text-blue-400 font-bold">{facturas.length} Facturas PPD</span>
                  <span>en balance</span>
                </div>
              </div>

              {/* Card 2: Cartera Vencida */}
              <div className="rounded-2xl border border-rose-900/30 bg-[#160b13] p-3.5 sm:p-4 relative overflow-hidden">
                <div className="flex justify-between items-start">
                  <span className="text-[10px] sm:text-[11px] font-mono uppercase tracking-wider text-rose-300 font-semibold">
                    Mora Crítica (+30d)
                  </span>
                  <span className="p-1.5 rounded-lg bg-rose-500/10 text-rose-400">
                    <Clock className="size-3.5 sm:size-4" />
                  </span>
                </div>
                <p className="mt-1.5 sm:mt-2 text-lg sm:text-2xl font-bold font-mono text-rose-400 tracking-tight">
                  {fmt(montoVencido)}
                </p>
                <div className="mt-1 sm:mt-2 flex items-center gap-1.5 text-[10px] sm:text-[11px] text-rose-300/80 font-mono truncate">
                  <span className="font-bold text-rose-400">{vencidas.length} clientes</span>
                  <span>en mora</span>
                </div>
              </div>

              {/* Card 3: Cobranza Aplicada */}
              <div className="rounded-2xl border border-emerald-900/30 bg-[#071713] p-3.5 sm:p-4 relative overflow-hidden">
                <div className="flex justify-between items-start">
                  <span className="text-[10px] sm:text-[11px] font-mono uppercase tracking-wider text-emerald-300 font-semibold">
                    Cobrado en el Mes
                  </span>
                  <span className="p-1.5 rounded-lg bg-emerald-500/10 text-emerald-400">
                    <FileCheck2 className="size-3.5 sm:size-4" />
                  </span>
                </div>
                <p className="mt-1.5 sm:mt-2 text-lg sm:text-2xl font-bold font-mono text-emerald-400 tracking-tight">
                  {fmt(totalCobradoMes)}
                </p>
                <div className="mt-1 sm:mt-2 flex items-center gap-1.5 text-[10px] sm:text-[11px] text-emerald-300/80 font-mono truncate">
                  <span className="font-bold text-emerald-400">{reps.length} Recibos REP</span>
                  <span>timbrados</span>
                </div>
              </div>

              {/* Card 4: SPEI por Conciliar */}
              <div className="rounded-2xl border border-amber-900/30 bg-[#161208] p-3.5 sm:p-4 relative overflow-hidden">
                <div className="flex justify-between items-start">
                  <span className="text-[10px] sm:text-[11px] font-mono uppercase tracking-wider text-amber-300 font-semibold">
                    SPEI por Identificar
                  </span>
                  <span className="p-1.5 rounded-lg bg-amber-500/10 text-amber-400">
                    <Landmark className="size-3.5 sm:size-4" />
                  </span>
                </div>
                <p className="mt-1.5 sm:mt-2 text-lg sm:text-2xl font-bold font-mono text-amber-400 tracking-tight">
                  {fmt(totalSpeiPendiente)}
                </p>
                <div className="mt-1 sm:mt-2 flex items-center gap-1.5 text-[10px] sm:text-[11px] text-amber-300/80 font-mono truncate">
                  <span className="font-bold text-amber-400">{speiPendientes.length} depósitos</span>
                  <span>en bancos</span>
                </div>
              </div>
            </div>

            {/* =========================================================================
                VISTA 1: CARTERA CXC (PPD)
            ========================================================================= */}
            {navSection === "cxc" && (
              <div className="space-y-4">
                {/* Search & Filter Controls */}
                <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 bg-[#0d1422] p-3 rounded-2xl border border-slate-800">
                  <div className="relative flex-1 max-w-md">
                    <Search className="absolute left-3.5 top-2.5 size-4 text-slate-500" />
                    <input
                      type="text"
                      value={search}
                      onChange={(e) => setSearch(e.target.value)}
                      placeholder="Buscar por RFC, cliente, serie o UUID fiscal..."
                      className="w-full bg-[#060910] border border-slate-700/80 rounded-xl pl-10 pr-8 py-2 text-xs text-white placeholder:text-slate-500 focus:outline-none focus:border-emerald-500 font-mono"
                    />
                    {search && (
                      <button
                        type="button"
                        onClick={() => setSearch("")}
                        className="absolute right-2.5 top-2.5 text-slate-500 hover:text-white"
                      >
                        <X className="size-3.5" />
                      </button>
                    )}
                  </div>

                  <div className="flex items-center gap-1.5 overflow-x-auto text-xs no-scrollbar">
                    <span className="text-slate-500 text-[11px] font-mono mr-1 hidden sm:inline">Estatus:</span>
                    {(["all", "pendiente", "parcial", "pagada"] as const).map((st) => (
                      <button
                        key={st}
                        onClick={() => setStatusFilter(st)}
                        className={`px-3 py-1.5 rounded-xl font-mono text-xs transition cursor-pointer whitespace-nowrap ${
                          statusFilter === st
                            ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 font-bold shadow-sm"
                            : "text-slate-400 hover:text-white hover:bg-slate-800/60"
                        }`}
                      >
                        {st === "all" ? "Todos" : st === "pagada" ? "Liquidadas" : st.charAt(0).toUpperCase() + st.slice(1)}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Empty State */}
                {facturasFiltradas.length === 0 ? (
                  <div className="rounded-2xl border border-slate-800 bg-[#0d1422] p-10 text-center space-y-3">
                    <div className="size-12 rounded-2xl bg-slate-800 flex items-center justify-center mx-auto text-slate-400">
                      <Search className="size-6" />
                    </div>
                    <h3 className="text-sm font-bold text-white">No se encontraron facturas</h3>
                    <p className="text-xs text-slate-400 max-w-sm mx-auto">
                      Ningún registro coincide con el criterio de búsqueda "{search}" o el filtro seleccionado.
                    </p>
                    <button
                      type="button"
                      onClick={() => {
                        setSearch("");
                        setStatusFilter("all");
                      }}
                      className="px-4 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-slate-200"
                    >
                      Restablecer filtros
                    </button>
                  </div>
                ) : (
                  <>
                    {/* DESKTOP TABLE VIEW (>=640px) */}
                    <div className="hidden sm:block overflow-x-auto rounded-2xl border border-slate-800 bg-[#0d1422] shadow-xl">
                      <table className="w-full text-left text-xs">
                        <thead>
                          <tr className="border-b border-slate-800 bg-[#080d16] font-mono text-[10px] text-slate-400 uppercase tracking-wider">
                            <th className="py-3.5 px-4 font-semibold">Folio / UUID Fiscal</th>
                            <th className="py-3.5 px-4 font-semibold">Razón Social Receptor</th>
                            <th className="py-3.5 px-4 font-semibold">Emisión / Vto.</th>
                            <th className="py-3.5 px-4 text-right font-semibold">Total CFDI</th>
                            <th className="py-3.5 px-4 text-right font-semibold">Saldo Insoluto</th>
                            <th className="py-3.5 px-4 text-center font-semibold">Estatus SAT</th>
                            <th className="py-3.5 px-4 text-right font-semibold">Acción</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-800/60 font-mono">
                          {facturasFiltradas.map((fac) => (
                            <tr key={fac.id} className="hover:bg-slate-800/30 transition-colors">
                              <td className="py-3 px-4">
                                <div className="font-bold text-white text-xs">{fac.serieFolio}</div>
                                <div className="text-[10px] text-slate-500 truncate max-w-[130px]" title={fac.uuid}>
                                  {fac.uuid}
                                </div>
                              </td>
                              <td className="py-3 px-4 font-sans">
                                <div className="font-medium text-slate-200 text-xs truncate max-w-[220px]" title={fac.cliente}>
                                  {fac.cliente}
                                </div>
                                <div className="font-mono text-[10px] text-emerald-400 font-semibold">{fac.rfc}</div>
                              </td>
                              <td className="py-3 px-4 text-[11px] text-slate-400">
                                <div>{fac.fechaEmision}</div>
                                <div className={fac.diasVencido > 0 && fac.saldoInsoluto > 0 ? "text-rose-400 font-bold" : "text-slate-500"}>
                                  {fac.fechaVencimiento}
                                  {fac.diasVencido > 0 && fac.saldoInsoluto > 0 && ` (${fac.diasVencido}d mora)`}
                                </div>
                              </td>
                              <td className="py-3 px-4 text-right text-slate-300 font-medium">
                                {fmt(fac.total)}
                              </td>
                              <td className="py-3 px-4 text-right font-bold">
                                <span className={fac.saldoInsoluto > 0 ? (fac.diasVencido > 0 ? "text-rose-400" : "text-amber-400") : "text-slate-500 line-through"}>
                                  {fmt(fac.saldoInsoluto)}
                                </span>
                              </td>
                              <td className="py-3 px-4 text-center">
                                <span
                                  className={`inline-flex items-center px-2 py-0.5 rounded-md text-[10px] uppercase font-semibold border ${
                                    fac.status === "pagada"
                                      ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/30"
                                      : fac.status === "parcial"
                                      ? "bg-blue-500/10 text-blue-400 border-blue-500/30"
                                      : fac.diasVencido > 0
                                      ? "bg-rose-500/10 text-rose-400 border-rose-500/30"
                                      : "bg-amber-500/10 text-amber-400 border-amber-500/30"
                                  }`}
                                >
                                  {fac.status === "pagada" ? "Liquidada" : fac.status === "parcial" ? `Parcial #${fac.parcialidad}` : "Pendiente"}
                                </span>
                              </td>
                              <td className="py-3 px-4 text-right">
                                {fac.saldoInsoluto > 0 ? (
                                  <button
                                    onClick={() => {
                                      setSelectedFactura(fac);
                                      setMontoAbono(fac.saldoInsoluto);
                                    }}
                                    className="inline-flex items-center gap-1 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white px-3 py-1.5 text-xs font-semibold shadow-sm transition active:scale-95 cursor-pointer font-sans"
                                  >
                                    <DollarSign className="size-3" />
                                    <span>Aplicar REP</span>
                                  </button>
                                ) : (
                                  <span className="text-[11px] text-emerald-400 flex items-center justify-end gap-1 font-sans">
                                    <CheckCircle2 className="size-3.5" />
                                    <span>Saldada</span>
                                  </span>
                                )}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>

                    {/* MOBILE CARD VIEW (<640px) */}
                    <div className="sm:hidden space-y-3">
                      {facturasFiltradas.map((fac) => (
                        <div
                          key={fac.id}
                          className="rounded-2xl border border-slate-800 bg-[#0d1422] p-4 space-y-3 shadow-md"
                        >
                          <div className="flex items-start justify-between gap-2">
                            <div>
                              <div className="flex items-center gap-2">
                                <span className="font-mono text-sm font-bold text-white">{fac.serieFolio}</span>
                                <span
                                  className={`inline-flex items-center px-2 py-0.5 rounded text-[10px] font-mono uppercase font-semibold border ${
                                    fac.status === "pagada"
                                      ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/30"
                                      : fac.status === "parcial"
                                      ? "bg-blue-500/10 text-blue-400 border-blue-500/30"
                                      : fac.diasVencido > 0
                                      ? "bg-rose-500/10 text-rose-400 border-rose-500/30"
                                      : "bg-amber-500/10 text-amber-400 border-amber-500/30"
                                  }`}
                                >
                                  {fac.status === "pagada" ? "Liquidada" : fac.status === "parcial" ? `Parcial #${fac.parcialidad}` : "Pendiente"}
                                </span>
                              </div>
                              <p className="font-mono text-[10px] text-slate-500 truncate max-w-[200px] mt-0.5">
                                UUID: {fac.uuid}
                              </p>
                            </div>

                            {fac.diasVencido > 0 && fac.saldoInsoluto > 0 && (
                              <span className="text-[10px] font-mono text-rose-400 bg-rose-950/40 border border-rose-800/40 px-2 py-0.5 rounded font-bold">
                                {fac.diasVencido}d mora
                              </span>
                            )}
                          </div>

                          <div className="pt-2 border-t border-slate-800/60">
                            <p className="text-xs font-semibold text-slate-200 truncate">{fac.cliente}</p>
                            <p className="font-mono text-[11px] text-emerald-400 font-bold mt-0.5">RFC: {fac.rfc}</p>
                          </div>

                          <div className="grid grid-cols-2 gap-2 p-2.5 rounded-xl bg-[#070b12] border border-slate-800 font-mono text-xs">
                            <div>
                              <span className="text-[10px] text-slate-500 block">Total Facturado</span>
                              <span className="text-slate-300 font-medium">{fmt(fac.total)}</span>
                            </div>
                            <div className="text-right">
                              <span className="text-[10px] text-slate-500 block">Saldo Insoluto</span>
                              <span className={`font-bold ${fac.saldoInsoluto > 0 ? "text-amber-400" : "text-emerald-400"}`}>
                                {fmt(fac.saldoInsoluto)}
                              </span>
                            </div>
                          </div>

                          <div className="pt-1 flex items-center justify-between">
                            <span className="text-[10px] font-mono text-slate-400">
                              Vto: {fac.fechaVencimiento}
                            </span>

                            {fac.saldoInsoluto > 0 ? (
                              <button
                                onClick={() => {
                                  setSelectedFactura(fac);
                                  setMontoAbono(fac.saldoInsoluto);
                                }}
                                className="inline-flex items-center gap-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white px-3.5 py-1.5 text-xs font-semibold shadow-sm transition active:scale-95 cursor-pointer font-sans"
                              >
                                <DollarSign className="size-3.5" />
                                <span>Aplicar REP</span>
                              </button>
                            ) : (
                              <span className="text-xs text-emerald-400 font-mono flex items-center gap-1">
                                <CheckCircle2 className="size-3.5" />
                                <span>Liquidada</span>
                              </span>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </>
                )}
              </div>
            )}

            {/* =========================================================================
                VISTA 2: CONCILIADOR BANCARIO SPEI
            ========================================================================= */}
            {navSection === "reconciler" && (
              <div className="space-y-6">
                <div className="rounded-2xl border border-slate-800 bg-[#0d1422] p-5 shadow-xl">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
                    <div>
                      <h2 className="text-sm sm:text-base font-bold text-white flex items-center gap-2">
                        <Link2 className="size-4 text-[#34d399]" />
                        <span>Módulo de Conciliación SPEI & Algoritmo de Matching</span>
                      </h2>
                      <p className="text-xs text-slate-400 mt-1">
                        Vincula depósitos bancarios de tus cuentas de cheques directamente con facturas PPD vivas para emitir el complemento sin discrepancias con el SAT.
                      </p>
                    </div>
                    <div className="font-mono text-xs text-slate-300 bg-slate-900 border border-slate-800 px-3 py-1.5 rounded-xl shrink-0">
                      Cuentas conectadas: <strong className="text-emerald-400">BBVA, Banorte, Santander</strong>
                    </div>
                  </div>

                  <div className="mt-5 space-y-3">
                    {movimientos.map((mov) => (
                      <div
                        key={mov.id}
                        className={`rounded-2xl border p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4 transition ${
                          mov.conciliado
                            ? "border-emerald-500/20 bg-emerald-950/10 opacity-80"
                            : "border-slate-800 bg-[#080d16] hover:border-slate-700 shadow-md"
                        }`}
                      >
                        <div className="flex items-start gap-3.5 min-w-0">
                          <div
                            className={`size-10 rounded-xl flex items-center justify-center shrink-0 font-bold text-xs font-mono shadow-sm ${
                              mov.banco === "BBVA"
                                ? "bg-blue-600/20 text-blue-400 border border-blue-500/30"
                                : mov.banco === "Banorte"
                                ? "bg-red-600/20 text-red-400 border border-red-500/30"
                                : "bg-rose-600/20 text-rose-400 border border-rose-500/30"
                            }`}
                          >
                            {mov.banco}
                          </div>
                          <div className="min-w-0">
                            <div className="flex flex-wrap items-center gap-2 font-mono text-xs">
                              <span className="font-bold text-white">{mov.emisor}</span>
                              <span className="text-slate-500 text-[11px]">· {mov.cuenta}</span>
                              <span className="text-slate-400 text-[11px]">({mov.fecha})</span>
                            </div>
                            <p className="font-mono text-[11px] text-slate-400 mt-0.5 truncate">
                              Clave de Rastreo: <strong className="text-slate-300">{mov.claveRastreo}</strong>
                            </p>
                            <p className="font-mono text-[10px] text-emerald-400 mt-0.5">
                              RFC Emisor: {mov.rfcEmisor}
                            </p>
                          </div>
                        </div>

                        <div className="flex items-center justify-between sm:justify-end gap-5 border-t sm:border-t-0 pt-3 sm:pt-0 border-slate-800/80 shrink-0">
                          <div className="text-right">
                            <p className="text-[10px] uppercase font-mono text-slate-400">Importe SPEI</p>
                            <p className="font-mono text-base sm:text-lg font-bold text-emerald-400">{fmt(mov.monto)}</p>
                          </div>

                          {!mov.conciliado ? (
                            <button
                              type="button"
                              onClick={() => autoMatchSPEI(mov)}
                              className="inline-flex items-center gap-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white px-3.5 py-2 text-xs font-semibold shadow-md transition active:scale-95 cursor-pointer"
                            >
                              <Link2 className="size-3.5" />
                              <span>Vincular & Emitir REP</span>
                            </button>
                          ) : (
                            <div className="flex items-center gap-1.5 text-xs text-emerald-400 font-mono bg-emerald-950/40 border border-emerald-800/40 px-3 py-1.5 rounded-xl">
                              <CheckCircle2 className="size-4" />
                              <span>Vinculado con Factura {mov.facturaVinculada}</span>
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* =========================================================================
                VISTA 3: COMPLEMENTOS REP
            ========================================================================= */}
            {navSection === "rep_log" && (
              <div className="space-y-4">
                <div className="rounded-2xl border border-slate-800 bg-[#0d1422] p-5 shadow-xl">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-800">
                    <div>
                      <h2 className="text-sm sm:text-base font-bold text-white flex items-center gap-2">
                        <ShieldCheck className="size-4 text-[#34d399]" />
                        <span>Comprobantes Fiscales Digitales (CFDI 4.0 tipo Pago con Complemento REP)</span>
                      </h2>
                      <p className="text-xs text-slate-400 mt-1">
                        Pólizas digitales inmutables con Sello Digital del SAT, Cadena Original y acreditación de IVA en parcialidades.
                      </p>
                    </div>
                    <div className="font-mono text-xs text-emerald-400 bg-slate-900 border border-slate-800 px-3 py-1.5 rounded-xl shrink-0">
                      Total Cobrado Timbrado: <strong className="text-white">{fmt(totalCobradoMes)}</strong>
                    </div>
                  </div>

                  <div className="mt-4 overflow-x-auto">
                    <table className="w-full text-left text-xs font-mono">
                      <thead>
                        <tr className="border-b border-slate-800 bg-[#080d16] text-[10px] text-slate-400 uppercase tracking-wider">
                          <th className="py-3.5 px-4 font-semibold">Folio REP / UUID</th>
                          <th className="py-3.5 px-4 font-semibold">Factura PPD</th>
                          <th className="py-3.5 px-4 font-semibold">Cliente Receptor</th>
                          <th className="py-3.5 px-4 text-center font-semibold">Parcialidad</th>
                          <th className="py-3.5 px-4 text-right font-semibold">Saldo Ant.</th>
                          <th className="py-3.5 px-4 text-right font-semibold">Abono Aplicado</th>
                          <th className="py-3.5 px-4 text-right font-semibold">Saldo Insoluto</th>
                          <th className="py-3.5 px-4 text-center font-semibold">Comprobante</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-800/60">
                        {reps.map((rep) => (
                          <tr key={rep.id} className="hover:bg-slate-800/30 transition-colors">
                            <td className="py-3.5 px-4">
                              <div className="font-bold text-white text-xs">{rep.id}</div>
                              <div className="text-[10px] text-slate-500 truncate max-w-[120px]" title={rep.uuidRep}>
                                {rep.uuidRep}
                              </div>
                            </td>
                            <td className="py-3.5 px-4 font-bold text-emerald-400">
                              {rep.facturaFolio}
                            </td>
                            <td className="py-3.5 px-4 font-sans">
                              <div className="text-slate-200 font-medium text-xs truncate max-w-[180px]">{rep.cliente}</div>
                              <div className="font-mono text-[10px] text-slate-500">{rep.fechaPago}</div>
                            </td>
                            <td className="py-3.5 px-4 text-center">
                              <span className="text-xs px-2 py-0.5 rounded bg-slate-800 text-slate-300 font-bold">
                                #{rep.parcialidad}
                              </span>
                            </td>
                            <td className="py-3.5 px-4 text-right text-slate-400">
                              {fmt(rep.saldoAnterior)}
                            </td>
                            <td className="py-3.5 px-4 text-right font-bold text-emerald-400">
                              {fmt(rep.montoPago)}
                            </td>
                            <td className="py-3.5 px-4 text-right font-semibold">
                              <span className={rep.saldoInsoluto === 0 ? "text-emerald-400" : "text-amber-400"}>
                                {fmt(rep.saldoInsoluto)}
                              </span>
                            </td>
                            <td className="py-3.5 px-4 text-center">
                              <button
                                type="button"
                                onClick={() => setRepInspector(rep)}
                                className="inline-flex items-center gap-1 rounded-lg border border-slate-700 bg-slate-800/80 hover:bg-slate-700 px-2.5 py-1 text-xs text-slate-200 transition cursor-pointer font-sans"
                              >
                                <Eye className="size-3 text-[#34d399]" />
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

            {/* =========================================================================
                VISTA 4: AUDITORÍA & REPORTE SAT
            ========================================================================= */}
            {navSection === "reports" && (
              <div className="space-y-6">
                <div className="rounded-2xl border border-slate-800 bg-[#0d1422] p-5 sm:p-6 shadow-xl">
                  <div className="border-b border-slate-800 pb-4">
                    <h2 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
                      <FileSpreadsheet className="size-5 text-[#34d399]" />
                      <span>Matriz de Control Fiscal SAT · Anexo 20 CFDI 4.0</span>
                    </h2>
                    <p className="text-xs text-slate-400 mt-1">
                      Verificación de congruencia entre facturas emitidas, complementos de recepción de pagos y depósitos bancarios para prevenir discrepancias en auditorías fiscales.
                    </p>
                  </div>

                  {/* Compliance Indicators */}
                  <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="p-4 rounded-2xl border border-slate-800 bg-[#080d16]">
                      <div className="flex items-center justify-between text-xs mb-2">
                        <span className="font-bold text-slate-200">Conciliación SAT vs Bancos</span>
                        <span className="text-emerald-400 font-mono text-[10px] font-bold">99.4% Match</span>
                      </div>
                      <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
                        <div className="bg-emerald-500 h-full rounded-full" style={{ width: "99.4%" }} />
                      </div>
                      <p className="text-[11px] text-slate-400 mt-2 font-mono">
                        Sin discrepancias de importe en los complementos de pago emitidos.
                      </p>
                    </div>

                    <div className="p-4 rounded-2xl border border-slate-800 bg-[#080d16]">
                      <div className="flex items-center justify-between text-xs mb-2">
                        <span className="font-bold text-slate-200">Emisión dentro de Plazo CFF</span>
                        <span className="text-emerald-400 font-mono text-[10px] font-bold">100% en Término</span>
                      </div>
                      <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
                        <div className="bg-emerald-500 h-full rounded-full" style={{ width: "100%" }} />
                      </div>
                      <p className="text-[11px] text-slate-400 mt-2 font-mono">
                        Emitidos antes del quinto día natural del mes siguiente al cobro.
                      </p>
                    </div>

                    <div className="p-4 rounded-2xl border border-slate-800 bg-[#080d16]">
                      <div className="flex items-center justify-between text-xs mb-2">
                        <span className="font-bold text-slate-200">Idempotencia de Timbrado</span>
                        <span className="text-blue-400 font-mono text-[10px] font-bold">0 duplicidades</span>
                      </div>
                      <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
                        <div className="bg-blue-500 h-full rounded-full" style={{ width: "100%" }} />
                      </div>
                      <p className="text-[11px] text-slate-400 mt-2 font-mono">
                        Hash SHA-256 único por parcialidad para prevenir doble timbrado.
                      </p>
                    </div>
                  </div>

                  {/* Audit Log Table */}
                  <div className="mt-6 pt-5 border-t border-slate-800">
                    <h3 className="text-xs font-mono uppercase font-bold text-slate-400 tracking-wider mb-3">
                      Bitácora de Eventos Transaccionales Recientes ({auditLogs.length})
                    </h3>

                    <div className="space-y-2">
                      {auditLogs.map((log) => (
                        <div
                          key={log.id}
                          className="p-3 rounded-xl border border-slate-800/80 bg-[#080d16] flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs font-mono"
                        >
                          <div className="flex items-start gap-2.5 min-w-0">
                            <span
                              className={`size-2 rounded-full mt-1.5 shrink-0 ${
                                log.severidad === "exito"
                                  ? "bg-emerald-400"
                                  : log.severidad === "alerta"
                                  ? "bg-amber-400"
                                  : "bg-blue-400"
                              }`}
                            />
                            <div className="min-w-0">
                              <p className="text-slate-200 font-medium font-sans truncate">{log.descripcion}</p>
                              <p className="text-[10px] text-slate-500 truncate">
                                UUID: {log.uuidFiscal} · SHA-256: {log.hashSha256.substring(0, 18)}...
                              </p>
                            </div>
                          </div>

                          <span className="text-[10px] text-slate-400 shrink-0 self-end sm:self-auto">
                            {log.timestamp}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </main>
        </div>
      </div>

      {/* =========================================================================
          MOBILE SLIDE-OVER DRAWER DE MÓDULOS
      ========================================================================= */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <div className="fixed inset-0 z-50 flex md:hidden">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/80 backdrop-blur-sm"
              onClick={() => setMobileMenuOpen(false)}
            />

            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 250 }}
              className="relative w-4/5 max-w-xs bg-[#090d16] border-r border-slate-800 flex flex-col justify-between p-5 z-10"
            >
              <div>
                <div className="flex items-center justify-between pb-4 border-b border-slate-800">
                  <div className="flex items-center gap-2.5">
                    <div className="size-8 rounded-xl bg-emerald-600 flex items-center justify-center text-white">
                      <Landmark className="size-4" />
                    </div>
                    <div>
                      <h3 className="text-xs font-bold text-white">Cobranza B2B</h3>
                      <p className="text-[10px] font-mono text-emerald-400">SAT CFDI 4.0</p>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => setMobileMenuOpen(false)}
                    className="size-8 rounded-lg border border-slate-800 flex items-center justify-center text-slate-400 hover:text-white"
                  >
                    <X className="size-4" />
                  </button>
                </div>

                <div className="mt-4 space-y-1">
                  {navItems.map((item) => {
                    const Icon = item.icon;
                    const active = navSection === item.id;
                    return (
                      <button
                        key={item.id}
                        type="button"
                        onClick={() => {
                          setNavSection(item.id);
                          setMobileMenuOpen(false);
                        }}
                        className={`w-full flex items-center justify-between px-3 py-3 rounded-xl font-medium text-xs transition ${
                          active
                            ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/30"
                            : "text-slate-400 hover:text-white hover:bg-slate-800/40"
                        }`}
                      >
                        <div className="flex items-center gap-2.5">
                          <Icon className="size-4 text-emerald-400" />
                          <span>{item.label}</span>
                        </div>
                        <span className="font-mono text-[10px] bg-slate-800 px-2 py-0.5 rounded text-slate-300">
                          {item.badge}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="p-3 rounded-xl border border-slate-800 bg-[#0d1422] text-[11px] font-mono text-slate-400 space-y-1">
                <p className="text-[10px] uppercase text-emerald-400 font-bold">Cartera Viva Total</p>
                <p className="text-sm font-bold text-white">{fmt(totalCartera)}</p>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* =========================================================================
          MODAL CONCILIAR & EMITIR REP
      ========================================================================= */}
      <AnimatePresence>
        {selectedFactura && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="w-full max-w-lg rounded-3xl border border-emerald-500/30 bg-[#0d1422] p-5 sm:p-6 shadow-2xl relative text-slate-100 max-h-[92vh] overflow-y-auto"
            >
              <button
                type="button"
                onClick={() => setSelectedFactura(null)}
                className="absolute top-5 right-5 text-slate-400 hover:text-white p-1"
                aria-label="Cerrar modal"
              >
                <X className="size-5" />
              </button>

              <div className="flex items-center gap-2.5 mb-1">
                <span className="p-2 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                  <ShieldCheck className="size-5" />
                </span>
                <div>
                  <h3 className="text-base sm:text-lg font-bold text-white">Generar Complemento de Pago (REP)</h3>
                  <p className="text-[11px] font-mono text-emerald-400">CFDI 4.0 con Reglas Anexo 20 SAT</p>
                </div>
              </div>

              <div className="mt-4 rounded-2xl border border-slate-800 bg-[#060910] p-4 space-y-2 text-xs font-mono">
                <div className="flex justify-between">
                  <span className="text-slate-400">Factura Relacionada:</span>
                  <span className="text-white font-bold">{selectedFactura.serieFolio}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Cliente / RFC:</span>
                  <span className="text-emerald-400 truncate max-w-[220px]">
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

              <div className="mt-4 space-y-3.5 text-xs font-sans">
                <div>
                  <label className="block text-slate-300 mb-1 font-semibold">Monto del Abono / Pago (MXN):</label>
                  <input
                    type="number"
                    value={montoAbono}
                    onChange={(e) => setMontoAbono(Number(e.target.value))}
                    max={selectedFactura.saldoInsoluto}
                    min={1}
                    className="w-full rounded-xl border border-slate-700 bg-[#060910] px-3.5 py-2.5 text-sm font-mono font-bold text-emerald-400 focus:border-emerald-500 focus:outline-none"
                  />
                  <div className="flex justify-between text-[11px] text-slate-400 mt-1.5 font-mono">
                    <span>
                      Nuevo saldo insoluto:{" "}
                      <strong className="text-white">
                        {fmt(Math.max(0, selectedFactura.saldoInsoluto - (Number(montoAbono) || 0)))}
                      </strong>
                    </span>
                    <button
                      type="button"
                      onClick={() => setMontoAbono(selectedFactura.saldoInsoluto)}
                      className="text-emerald-400 underline font-semibold cursor-pointer"
                    >
                      Liquidar Saldo Total
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-slate-300 mb-1 font-semibold">Fecha y Hora de Pago:</label>
                    <input
                      type="date"
                      value={fechaPago}
                      onChange={(e) => setFechaPago(e.target.value)}
                      className="w-full rounded-xl border border-slate-700 bg-[#060910] px-3 py-2 font-mono text-xs text-white focus:border-emerald-500 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-300 mb-1 font-semibold">Forma de Pago SAT:</label>
                    <select
                      value={formaPago}
                      onChange={(e) => setFormaPago(e.target.value)}
                      className="w-full rounded-xl border border-slate-700 bg-[#060910] px-3 py-2 text-xs text-white focus:border-emerald-500 focus:outline-none"
                    >
                      <option value="03 Transferencia electrónica (SPEI)">03 · Transferencia SPEI</option>
                      <option value="01 Efectivo">01 · Efectivo</option>
                      <option value="02 Cheque nominativo">02 · Cheque Nominativo</option>
                      <option value="04 Tarjeta de crédito">04 · Tarjeta de Crédito</option>
                    </select>
                  </div>
                </div>
              </div>

              <div className="mt-6 flex justify-end gap-2.5 font-sans">
                <button
                  type="button"
                  onClick={() => setSelectedFactura(null)}
                  className="rounded-xl border border-slate-700 bg-slate-800 px-4 py-2 text-xs font-semibold text-slate-300 hover:text-white transition cursor-pointer"
                >
                  Cancelar
                </button>
                <button
                  type="button"
                  onClick={ejecutarConciliacionREP}
                  disabled={montoAbono <= 0}
                  className="rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white px-5 py-2 text-xs font-semibold shadow-lg shadow-emerald-900/30 transition active:scale-95 disabled:opacity-50 cursor-pointer"
                >
                  Confirmar y Timbrar al SAT
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* =========================================================================
          MODAL INSPECTOR FISCAL SAT & XML
      ========================================================================= */}
      <AnimatePresence>
        {repInspector && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="w-full max-w-2xl rounded-3xl border border-slate-700 bg-[#0d1422] p-5 sm:p-6 shadow-2xl relative text-slate-100 max-h-[90vh] overflow-y-auto"
            >
              <button
                type="button"
                onClick={() => setRepInspector(null)}
                className="absolute top-5 right-5 text-slate-400 hover:text-white p-1"
                aria-label="Cerrar modal de inspección"
              >
                <X className="size-5" />
              </button>

              <div className="flex items-center gap-2.5 mb-1">
                <span className="p-2 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                  <FileCode2 className="size-5" />
                </span>
                <div>
                  <h3 className="text-base sm:text-lg font-bold text-white">Inspección de CFDI 4.0 con Complemento REP</h3>
                  <p className="text-[11px] font-mono text-slate-400">
                    Folio: {repInspector.id} · UUID: {repInspector.uuidRep}
                  </p>
                </div>
              </div>

              {/* Inspector View Tabs */}
              <div className="mt-4 flex gap-2 border-b border-slate-800 pb-1">
                <button
                  type="button"
                  onClick={() => setInspectorTab("visual")}
                  className={`px-3 py-1.5 rounded-lg text-xs font-mono font-semibold transition ${
                    inspectorTab === "visual"
                      ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/30"
                      : "text-slate-400 hover:text-white"
                  }`}
                >
                  Vista Fiscal Estructurada
                </button>
                <button
                  type="button"
                  onClick={() => setInspectorTab("xml")}
                  className={`px-3 py-1.5 rounded-lg text-xs font-mono font-semibold transition ${
                    inspectorTab === "xml"
                      ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/30"
                      : "text-slate-400 hover:text-white"
                  }`}
                >
                  Estructura XML Anexo 20
                </button>
              </div>

              {inspectorTab === "visual" ? (
                <div className="mt-4 rounded-2xl border border-slate-800 bg-[#060910] p-4 sm:p-5 space-y-4 font-mono text-xs">
                  <div className="flex flex-col sm:flex-row justify-between gap-2 border-b border-slate-800 pb-3">
                    <div>
                      <p className="text-[10px] text-slate-500 uppercase font-bold">Emisor</p>
                      <p className="font-bold text-white">Grupo Industrial del Norte S.A. de C.V.</p>
                      <p className="text-emerald-400">GIN180410XX1 · 601 General de Ley</p>
                    </div>
                    <div className="sm:text-right">
                      <p className="text-[10px] text-slate-500 uppercase font-bold">Receptor</p>
                      <p className="font-bold text-white">{repInspector.cliente}</p>
                      <p className="text-emerald-400">{repInspector.rfc}</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 py-2 border-b border-slate-800 text-[11px]">
                    <div>
                      <span className="text-slate-500 text-[10px] block">Tipo Comprobante</span>
                      <strong className="text-white">P - Pago</strong>
                    </div>
                    <div>
                      <span className="text-slate-500 text-[10px] block">Fecha Aplicación</span>
                      <strong className="text-white">{repInspector.fechaPago.replace("T", " ")}</strong>
                    </div>
                    <div>
                      <span className="text-slate-500 text-[10px] block">Abono Aplicado</span>
                      <strong className="text-emerald-400">{fmt(repInspector.montoPago)}</strong>
                    </div>
                    <div>
                      <span className="text-slate-500 text-[10px] block">Parcialidad</span>
                      <strong className="text-blue-400">#{repInspector.parcialidad}</strong>
                    </div>
                  </div>

                  <div>
                    <p className="text-[10px] text-slate-500 uppercase mb-1 font-bold">Cadena Original del Timbre Fiscal</p>
                    <p className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 text-[10px] text-slate-300 break-all leading-relaxed">
                      {repInspector.cadenaOriginal}
                    </p>
                  </div>

                  <div>
                    <p className="text-[10px] text-slate-500 uppercase mb-1 font-bold">Sello Digital del SAT (Verificado ✓)</p>
                    <p className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 text-[10px] text-emerald-400 break-all">
                      {repInspector.selloSAT}
                    </p>
                  </div>
                </div>
              ) : (
                <div className="mt-4">
                  <pre className="p-4 rounded-2xl bg-black/80 border border-slate-800 text-[11px] font-mono text-emerald-400 overflow-x-auto max-h-72 scrollbar-thin leading-relaxed">
{`<?xml version="1.0" encoding="UTF-8"?>
<cfdi:Comprobante xmlns:cfdi="http://www.sat.gob.mx/cfd/4"
  xmlns:pago20="http://www.sat.gob.mx/Pagos20"
  Version="4.0" Serie="REP" Folio="${repInspector.id}"
  Fecha="${repInspector.fechaPago}" SubTotal="0" Total="0" TipoDeComprobante="P"
  LugarExpedicion="45040" Sello="${repInspector.selloSAT}">
  <cfdi:Emisor Rfc="GIN180410XX1" Nombre="GRUPO INDUSTRIAL DEL NORTE SA DE CV" RegimenFiscal="601"/>
  <cfdi:Receptor Rfc="${repInspector.rfc}" Nombre="${repInspector.cliente.toUpperCase()}" UsoCFDI="CP01"/>
  <cfdi:Conceptos>
    <cfdi:Concepto ClaveProdServ="84111506" Cantidad="1" ClaveUnidad="ACT" Descripcion="Pago" ValorUnitario="0" Importe="0"/>
  </cfdi:Conceptos>
  <cfdi:Complemento>
    <pago20:Pagos Version="2.0">
      <pago20:Totales MontoTotalPagos="${repInspector.montoPago.toFixed(2)}"/>
      <pago20:Pago FechaPago="${repInspector.fechaPago}" FormaDePagoP="03" MonedaP="MXN" Monto="${repInspector.montoPago.toFixed(2)}">
        <pago20:DoctoRelacionado IdDocumento="${repInspector.uuidFactura}"
          Serie="${repInspector.facturaFolio.split("-")[0]}" Folio="${repInspector.facturaFolio.split("-")[1]}"
          MonedaDR="MXN" NumParcialidad="${repInspector.parcialidad}"
          ImpSaldoAnt="${repInspector.saldoAnterior.toFixed(2)}"
          ImpPagado="${repInspector.montoPago.toFixed(2)}"
          ImpSaldoInsoluto="${repInspector.saldoInsoluto.toFixed(2)}"
          ObjetoImpDR="02"/>
      </pago20:Pago>
    </pago20:Pagos>
  </cfdi:Complemento>
</cfdi:Comprobante>`}
                  </pre>
                </div>
              )}

              <div className="mt-5 flex justify-end gap-2 font-sans">
                <button
                  type="button"
                  onClick={() => {
                    showToast(`📥 Descarga simulada de CFDI: ${repInspector.uuidRep}.xml listo en carpeta local.`, "info");
                  }}
                  className="inline-flex items-center gap-1.5 rounded-xl border border-slate-700 bg-slate-800 px-3.5 py-2 text-xs font-semibold text-slate-200 hover:text-white transition cursor-pointer"
                >
                  <Download className="size-3.5" />
                  <span>Descargar XML CFDI</span>
                </button>
                <button
                  type="button"
                  onClick={() => setRepInspector(null)}
                  className="rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white px-4 py-2 text-xs font-semibold transition cursor-pointer"
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
