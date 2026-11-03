"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  BadgeAlert,
  BarChart3,
  Bell,
  Building,
  Calendar,
  CheckCircle,
  CheckSquare,
  ChevronDown,
  ChevronRight,
  Clock,
  Download,
  Edit2,
  FileSpreadsheet,
  FileText,
  Filter,
  HelpCircle,
  Layers,
  Lock,
  LogOut,
  Mail,
  MoreHorizontal,
  Phone,
  Plus,
  Printer,
  RefreshCw,
  Search,
  Settings,
  Shield,
  Square,
  Trash2,
  User,
  UserCheck,
  UserPlus,
  Users,
  Wallet,
  X,
} from "lucide-react";
import Link from "next/link";
import { DemoSystemHeader } from "@/components/demos/demo-system-header";
import { mvcShowcases } from "@/lib/data";

const sysadminProject = mvcShowcases.find((s) => s.id === "sysadministrador")!;

type ERPModule = "dashboard" | "clientes" | "empleados" | "nomina" | "auditoria";

interface ClienteERP {
  id: number;
  codigo: string;
  nombre: string;
  empresa: string;
  rfc: string;
  email: string;
  telefono: string;
  creditoLimite: number;
  saldoPendiente: number;
  status: "activo" | "suspendido" | "prospecto";
  sucursal: "GDL Centro" | "Zapopan Norte" | "CDMX";
}

interface EmpleadoERP {
  id: number;
  numEmpleado: string;
  nombre: string;
  puesto: string;
  departamento: "Comercial" | "TI" | "Finanzas" | "Operaciones";
  salarioMensual: number;
  status: "activo" | "baja";
  curp: string;
  nss: string;
  fechaIngreso: string;
}

interface AuditoriaEntry {
  id: number;
  fecha: string;
  usuario: string;
  ip: string;
  modulo: string;
  accion: string;
  severidad: "info" | "alerta" | "critica";
}

const clientesData: ClienteERP[] = [
  { id: 1, codigo: "CLI-0104", nombre: "Ing. Carlos Rodríguez", empresa: "Distribuidora del Norte S.A.", rfc: "DNO190412KJ8", email: "carlos.r@dnor.mx", telefono: "(33) 3648-9921", creditoLimite: 150000, saldoPendiente: 48500, status: "activo", sucursal: "GDL Centro" },
  { id: 2, codigo: "CLI-0105", nombre: "Lic. Laura Jiménez", empresa: "Manufacturas Jalisco S.A. de C.V.", rfc: "MJA210811TR3", email: "ljimenez@mfgjal.mx", telefono: "(33) 3812-4400", creditoLimite: 200000, saldoPendiente: 0, status: "activo", sucursal: "Zapopan Norte" },
  { id: 3, codigo: "CLI-0106", nombre: "Roberto Sánchez", empresa: "Importadora Occidente S. de R.L.", rfc: "IOC170519HY2", email: "rsanchez@impoc.com", telefono: "(33) 3122-8800", creditoLimite: 80000, saldoPendiente: 12000, status: "suspendido", sucursal: "GDL Centro" },
  { id: 4, codigo: "CLI-0107", nombre: "C.P. Ana García", empresa: "Servicios Logísticos GDL", rfc: "SLG200214PL9", email: "ana.garcia@slgdl.mx", telefono: "(33) 3630-1122", creditoLimite: 120000, saldoPendiente: 29750, status: "activo", sucursal: "CDMX" },
  { id: 5, codigo: "CLI-0108", nombre: "Arq. Mauricio Peña", empresa: "Diseño y Construcción Urbana", rfc: "DCU190930RQ1", email: "mpena@durbana.com", telefono: "(33) 3845-0019", creditoLimite: 300000, saldoPendiente: 0, status: "prospecto", sucursal: "Zapopan Norte" },
];

const empleadosData: EmpleadoERP[] = [
  { id: 1, numEmpleado: "EMP-041", nombre: "María López Solís", puesto: "Gerente de Ventas Corporativas", departamento: "Comercial", salarioMensual: 28500, status: "activo", curp: "LOSM890412MJCL02", nss: "3498-12-0941", fechaIngreso: "15/Mar/2023" },
  { id: 2, numEmpleado: "EMP-042", nombre: "José Martínez Ortega", puesto: "Desarrollador Full Stack Sr", departamento: "TI", salarioMensual: 36000, status: "activo", curp: "MAOJ920815HJCL09", nss: "1289-44-8821", fechaIngreso: "10/Ene/2024" },
  { id: 3, numEmpleado: "EMP-043", nombre: "Sofía Torres Navarro", puesto: "Coordinadora de Finanzas & SAT", departamento: "Finanzas", salarioMensual: 24000, status: "activo", curp: "TONS940120MJCL04", nss: "7721-09-5512", fechaIngreso: "01/Jun/2022" },
  { id: 4, numEmpleado: "EMP-044", nombre: "Luis Ramírez Vega", puesto: "Soporte y Mesa de Ayuda", departamento: "TI", salarioMensual: 18000, status: "baja", curp: "RAVL971104HJCL01", nss: "5512-33-0192", fechaIngreso: "20/Sep/2021" },
  { id: 5, numEmpleado: "EMP-045", nombre: "Claudia Valencia R.", puesto: "Supervisora de Operaciones", departamento: "Operaciones", salarioMensual: 22000, status: "activo", curp: "VARC910608MJCL08", nss: "9012-77-3341", fechaIngreso: "05/May/2024" },
];

const auditoriaData: AuditoriaEntry[] = [
  { id: 101, fecha: "03 Nov 10:14:22", usuario: "admin_root", ip: "192.168.1.45", modulo: "Clientes", accion: "Actualización de límite de crédito: CLI-0104 ($120k → $150k)", severidad: "info" },
  { id: 102, fecha: "03 Nov 09:48:10", usuario: "storres_fin", ip: "192.168.1.18", modulo: "Nómina", accion: "Cálculo de dispersión quincenal Quincena 21-2026", severidad: "info" },
  { id: 103, fecha: "02 Nov 18:22:05", usuario: "mlopez_com", ip: "187.190.22.10", modulo: "Clientes", accion: "Modificación de estado CLI-0106 → 'Suspendido por mora'", severidad: "alerta" },
  { id: 104, fecha: "02 Nov 14:05:40", usuario: "system_cron", ip: "127.0.0.1", modulo: "Seguridad", accion: "3 intentos fallidos de autenticación desde IP externa 201.144.12.9", severidad: "critica" },
  { id: 105, fecha: "01 Nov 12:00:00", usuario: "admin_root", ip: "192.168.1.45", modulo: "Nómina", accion: "Cierre contable de mes Octubre 2026", severidad: "info" },
];

function fmt(n: number) {
  return `$${n.toLocaleString("es-MX", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
}

export default function SysAdminPage() {
  const [activeModule, setActiveModule] = useState<ERPModule>("dashboard");
  const [sucursal, setSucursal] = useState("Todas las Sucursales");
  const [clientes, setClientes] = useState<ClienteERP[]>(clientesData);
  const [empleados, setEmpleados] = useState<EmpleadoERP[]>(empleadosData);
  const [search, setSearch] = useState("");

  // Modal Recibo de Nómina
  const [reciboEmpleado, setReciboEmpleado] = useState<EmpleadoERP | null>(null);

  // Modal Nuevo Cliente
  const [modalNuevoCliente, setModalNuevoCliente] = useState(false);
  const [nuevoNombre, setNuevoNombre] = useState("");
  const [nuevaEmpresa, setNuevaEmpresa] = useState("");
  const [nuevoRFC, setNuevoRFC] = useState("");
  const [nuevoCredito, setNuevoCredito] = useState(100000);

  const guardarNuevoCliente = (e: React.FormEvent) => {
    e.preventDefault();
    if (!nuevoNombre || !nuevaEmpresa) return;
    const nuevo: ClienteERP = {
      id: clientes.length + 1,
      codigo: `CLI-010${clientes.length + 1}`,
      nombre: nuevoNombre,
      empresa: nuevaEmpresa,
      rfc: nuevoRFC || "XAXX010101000",
      email: `${nuevoNombre.toLowerCase().replace(/\s+/g, ".")}@empresa.mx`,
      telefono: "(33) 3000-0000",
      creditoLimite: Number(nuevoCredito),
      saldoPendiente: 0,
      status: "activo",
      sucursal: "GDL Centro",
    };
    setClientes([nuevo, ...clientes]);
    setModalNuevoCliente(false);
    setNuevoNombre("");
    setNuevaEmpresa("");
    setNuevoRFC("");
  };

  return (
    <div className="min-h-screen bg-[#0f172a] text-slate-200 flex flex-col font-sans selection:bg-blue-600 selection:text-white">
      {/* Top Application Header with Ficha Técnica (5 Puntos) */}
      <DemoSystemHeader project={sysadminProject} />

      <div className="flex-1 flex overflow-hidden">
        {/* Left Classic ERP Sidebar */}
        <aside className="w-64 bg-[#111827] border-r border-slate-800 flex flex-col justify-between shrink-0 hidden md:flex">
          <div>
            {/* System Info */}
            <div className="p-4 border-b border-slate-800 bg-[#0d1527]">
              <div className="flex items-center gap-2.5">
                <div className="size-8 rounded-lg bg-blue-600 flex items-center justify-center font-bold text-white shadow-md">
                  SA
                </div>
                <div>
                  <h2 className="text-xs font-bold text-white leading-tight">Panel Administrativo</h2>
                  <p className="text-[10px] text-slate-400 font-mono">ERP & Gestión Integral</p>
                </div>
              </div>

              <div className="mt-3">
                <label className="text-[10px] uppercase font-mono text-slate-400 block mb-1">
                  Sucursal Activa:
                </label>
                <select
                  value={sucursal}
                  onChange={(e) => setSucursal(e.target.value)}
                  className="w-full bg-[#1e293b] border border-slate-700 rounded-lg px-2.5 py-1 text-xs text-slate-200 focus:outline-none focus:border-blue-500"
                >
                  <option value="Todas las Sucursales">Todas las Sucursales</option>
                  <option value="GDL Centro">GDL Centro</option>
                  <option value="Zapopan Norte">Zapopan Norte</option>
                  <option value="CDMX">CDMX</option>
                </select>
              </div>
            </div>

            {/* Menu Items */}
            <div className="p-3 space-y-1 text-xs font-medium">
              {[
                { id: "dashboard", label: "Dashboard Ejecutivo", icon: BarChart3 },
                { id: "clientes", label: "Catálogo de Clientes", icon: Users, count: clientes.length },
                { id: "empleados", label: "Recursos Humanos", icon: UserCheck, count: empleados.length },
                { id: "nomina", label: "Cálculo de Nómina SAT", icon: Wallet },
                { id: "auditoria", label: "Bitácora de Auditoría", icon: Shield, count: auditoriaData.length },
              ].map((m) => {
                const Icon = m.icon;
                const active = activeModule === m.id;
                return (
                  <button
                    key={m.id}
                    onClick={() => setActiveModule(m.id as ERPModule)}
                    className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl transition ${
                      active
                        ? "bg-blue-600 text-white font-semibold shadow-md shadow-blue-900/30"
                        : "text-slate-400 hover:text-slate-200 hover:bg-slate-800/60"
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <Icon className="size-4" />
                      <span>{m.label}</span>
                    </div>
                    {m.count !== undefined && (
                      <span
                        className={`font-mono text-[10px] px-1.5 py-0.5 rounded ${
                          active ? "bg-blue-800 text-blue-100" : "bg-slate-800 text-slate-400"
                        }`}
                      >
                        {m.count}
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* User Profile Bar */}
          <div className="p-3 border-t border-slate-800 bg-[#0d1527] flex items-center justify-between text-xs">
            <div className="flex items-center gap-2.5">
              <div className="size-8 rounded-full bg-slate-700 flex items-center justify-center font-bold text-white text-xs">
                AD
              </div>
              <div>
                <p className="font-semibold text-white leading-tight">Admin Principal</p>
                <p className="text-[10px] text-emerald-400 font-mono">Rol: SuperAdmin</p>
              </div>
            </div>
            <button className="text-slate-400 hover:text-rose-400 transition" title="Cerrar sesión">
              <LogOut className="size-4" />
            </button>
          </div>
        </aside>

        {/* Main Content Workspace */}
        <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8 space-y-6">
          {/* Top Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-700">
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                  {activeModule === "dashboard" && "Resumen Operativo & Finanzas"}
                  {activeModule === "clientes" && "Directorio de Clientes & Límites de Crédito"}
                  {activeModule === "empleados" && "Plantilla de Personal & Departamentos"}
                  {activeModule === "nomina" && "Dispersión de Nómina e Impuestos (IMSS / ISR)"}
                  {activeModule === "auditoria" && "Registro de Seguridad & Eventos del Sistema"}
                </h1>
                <span className="rounded bg-slate-800 border border-slate-700 px-2 py-0.5 font-mono text-[10px] text-slate-300">
                  {sucursal}
                </span>
              </div>
              <p className="text-xs text-slate-400 mt-1">
                Plataforma Empresarial en PHP: Modelo de datos relacional con integridad referencial y auditoría estricta.
              </p>
            </div>

            {activeModule === "clientes" && (
              <button
                onClick={() => setModalNuevoCliente(true)}
                className="inline-flex items-center gap-1.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 text-xs font-semibold shadow-md transition active:scale-95"
              >
                <Plus className="size-4" />
                <span>Registrar Cliente</span>
              </button>
            )}

            {activeModule === "nomina" && (
              <div className="text-xs font-mono text-slate-300 bg-slate-800 border border-slate-700 px-3 py-1.5 rounded-xl">
                Periodo: <strong className="text-emerald-400">Quincena 21 (Noviembre 2026)</strong>
              </div>
            )}
          </div>

          {/* DASHBOARD MODULE */}
          {activeModule === "dashboard" && (
            <div className="space-y-6">
              {/* Metric Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="rounded-2xl border border-slate-800 bg-[#1e293b] p-4">
                  <div className="flex justify-between items-center text-xs text-slate-400">
                    <span className="font-mono uppercase text-[10px]">Cuentas por Cobrar</span>
                    <BarChart3 className="size-4 text-blue-400" />
                  </div>
                  <p className="mt-2 text-2xl font-bold font-mono text-white">
                    {fmt(clientes.reduce((acc, c) => acc + c.saldoPendiente, 0))}
                  </p>
                  <p className="text-[11px] text-slate-400 mt-1">
                    {clientes.filter((c) => c.saldoPendiente > 0).length} clientes con balance activo
                  </p>
                </div>

                <div className="rounded-2xl border border-slate-800 bg-[#1e293b] p-4">
                  <div className="flex justify-between items-center text-xs text-slate-400">
                    <span className="font-mono uppercase text-[10px]">Costo Nómina Quincenal</span>
                    <Wallet className="size-4 text-emerald-400" />
                  </div>
                  <p className="mt-2 text-2xl font-bold font-mono text-emerald-400">
                    {fmt(empleados.filter((e) => e.status === "activo").reduce((acc, e) => acc + e.salarioMensual, 0) / 2)}
                  </p>
                  <p className="text-[11px] text-slate-400 mt-1">
                    {empleados.filter((e) => e.status === "activo").length} empleados activos
                  </p>
                </div>

                <div className="rounded-2xl border border-slate-800 bg-[#1e293b] p-4">
                  <div className="flex justify-between items-center text-xs text-slate-400">
                    <span className="font-mono uppercase text-[10px]">Clientes Registrados</span>
                    <Users className="size-4 text-indigo-400" />
                  </div>
                  <p className="mt-2 text-2xl font-bold font-mono text-white">
                    {clientes.length}
                  </p>
                  <p className="text-[11px] text-emerald-400 mt-1">
                    {clientes.filter((c) => c.status === "activo").length} con estatus activo
                  </p>
                </div>

                <div className="rounded-2xl border border-slate-800 bg-[#1e293b] p-4">
                  <div className="flex justify-between items-center text-xs text-slate-400">
                    <span className="font-mono uppercase text-[10px]">Eventos de Auditoría</span>
                    <Shield className="size-4 text-amber-400" />
                  </div>
                  <p className="mt-2 text-2xl font-bold font-mono text-amber-400">
                    {auditoriaData.length}
                  </p>
                  <p className="text-[11px] text-slate-400 mt-1">
                    1 evento crítico registrado
                  </p>
                </div>
              </div>

              {/* Quick Actions Panel */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="rounded-2xl border border-slate-800 bg-[#1e293b] p-5">
                  <h3 className="text-sm font-bold text-white mb-3">Módulos Administrativos Rápidos</h3>
                  <div className="grid grid-cols-2 gap-3 text-xs">
                    <button
                      onClick={() => setActiveModule("clientes")}
                      className="p-3.5 rounded-xl border border-slate-700 bg-[#0f172a] hover:border-blue-500 hover:bg-blue-950/20 transition text-left"
                    >
                      <Users className="size-5 text-blue-400 mb-2" />
                      <p className="font-bold text-white">Gestión Clientes</p>
                      <p className="text-[11px] text-slate-400">Límites de crédito & facturación</p>
                    </button>
                    <button
                      onClick={() => setActiveModule("nomina")}
                      className="p-3.5 rounded-xl border border-slate-700 bg-[#0f172a] hover:border-emerald-500 hover:bg-emerald-950/20 transition text-left"
                    >
                      <Wallet className="size-5 text-emerald-400 mb-2" />
                      <p className="font-bold text-white">Nómina Quincenal</p>
                      <p className="text-[11px] text-slate-400">Recibos, IMSS, ISR e Infonavit</p>
                    </button>
                  </div>
                </div>

                <div className="rounded-2xl border border-slate-800 bg-[#1e293b] p-5">
                  <h3 className="text-sm font-bold text-white mb-3">Últimas Acciones Registradas</h3>
                  <div className="space-y-2 text-xs">
                    {auditoriaData.slice(0, 3).map((item) => (
                      <div key={item.id} className="p-2.5 rounded-xl bg-[#0f172a] border border-slate-800 flex justify-between items-center">
                        <div>
                          <p className="font-semibold text-slate-200">{item.accion}</p>
                          <p className="text-[10px] text-slate-400 font-mono">{item.usuario} · {item.fecha}</p>
                        </div>
                        <span className="font-mono text-[10px] uppercase px-2 py-0.5 rounded bg-slate-800 text-slate-300">
                          {item.modulo}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* CLIENTES MODULE */}
          {activeModule === "clientes" && (
            <div className="space-y-4">
              <div className="rounded-2xl border border-slate-800 bg-[#1e293b] overflow-hidden">
                <div className="p-4 border-b border-slate-800 flex flex-col sm:flex-row gap-3 items-center justify-between">
                  <div className="relative w-full sm:w-80">
                    <Search className="absolute left-3.5 top-2.5 size-4 text-slate-400" />
                    <input
                      type="text"
                      placeholder="Buscar por cliente, empresa o RFC..."
                      value={search}
                      onChange={(e) => setSearch(e.target.value)}
                      className="w-full bg-[#0f172a] border border-slate-700 rounded-xl pl-9 pr-3 py-1.5 text-xs text-white placeholder:text-slate-500 focus:outline-none focus:border-blue-500"
                    />
                  </div>

                  <div className="flex items-center gap-2 self-end sm:self-auto text-xs">
                    <button
                      onClick={() => alert("Exportando catálogo a CSV/Excel...")}
                      className="inline-flex items-center gap-1.5 border border-slate-700 bg-slate-800 px-3 py-1.5 rounded-lg text-slate-300 hover:text-white transition"
                    >
                      <Download className="size-3.5" />
                      <span>Exportar CSV</span>
                    </button>
                  </div>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead>
                      <tr className="border-b border-slate-800 bg-[#0f172a] font-mono text-[10px] text-slate-400 uppercase">
                        <th className="py-3 px-4">Código / RFC</th>
                        <th className="py-3 px-4">Razón Social & Contacto</th>
                        <th className="py-3 px-4">Sucursal</th>
                        <th className="py-3 px-4 text-right">Límite Crédito</th>
                        <th className="py-3 px-4 text-right">Saldo Deudor</th>
                        <th className="py-3 px-4 text-center">Estado</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-800/80">
                      {clientes
                        .filter(
                          (c) =>
                            c.nombre.toLowerCase().includes(search.toLowerCase()) ||
                            c.empresa.toLowerCase().includes(search.toLowerCase()) ||
                            c.rfc.toLowerCase().includes(search.toLowerCase())
                        )
                        .map((c) => (
                          <tr key={c.id} className="hover:bg-slate-800/40 transition">
                            <td className="py-3 px-4 font-mono">
                              <span className="font-bold text-white">{c.codigo}</span>
                              <div className="text-[10px] text-blue-400">{c.rfc}</div>
                            </td>
                            <td className="py-3 px-4">
                              <div className="font-bold text-white">{c.empresa}</div>
                              <div className="text-[11px] text-slate-400">{c.nombre} · {c.telefono}</div>
                            </td>
                            <td className="py-3 px-4 font-mono text-slate-300">
                              {c.sucursal}
                            </td>
                            <td className="py-3 px-4 text-right font-mono text-slate-300">
                              {fmt(c.creditoLimite)}
                            </td>
                            <td className="py-3 px-4 text-right font-mono font-bold">
                              <span className={c.saldoPendiente > 0 ? "text-amber-400" : "text-emerald-400"}>
                                {fmt(c.saldoPendiente)}
                              </span>
                            </td>
                            <td className="py-3 px-4 text-center">
                              <span
                                className={`inline-block px-2 py-0.5 rounded-full text-[10px] font-mono uppercase font-semibold ${
                                  c.status === "activo"
                                    ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/30"
                                    : c.status === "suspendido"
                                    ? "bg-rose-500/10 text-rose-400 border border-rose-500/30"
                                    : "bg-blue-500/10 text-blue-400 border border-blue-500/30"
                                }`}
                              >
                                {c.status}
                              </span>
                            </td>
                          </tr>
                        ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* NOMINA MODULE WITH PAYSLIP GENERATION */}
          {activeModule === "nomina" && (
            <div className="space-y-4">
              <div className="rounded-2xl border border-slate-800 bg-[#1e293b] p-5">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-800">
                  <div>
                    <h2 className="text-sm font-bold text-white flex items-center gap-2">
                      <Wallet className="size-4 text-emerald-400" />
                      Planilla de Nómina Quincenal & Deducciones de Ley (México)
                    </h2>
                    <p className="text-xs text-slate-400 mt-0.5">
                      Cálculo automatizado de cuotas obrero-patronales del IMSS, retención ISR según tablas y aportación Infonavit.
                    </p>
                  </div>
                  <div className="font-mono text-xs text-slate-300">
                    Haz clic en <strong className="text-blue-400">"Ver Recibo"</strong> para generar el talón oficial de nómina.
                  </div>
                </div>

                <div className="mt-4 overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead>
                      <tr className="border-b border-slate-800 bg-[#0f172a] font-mono text-[10px] text-slate-400 uppercase">
                        <th className="py-3 px-4">Empleado</th>
                        <th className="py-3 px-4">Depto / Puesto</th>
                        <th className="py-3 px-4 text-right">Sueldo Quincenal</th>
                        <th className="py-3 px-4 text-right">IMSS (3.15%)</th>
                        <th className="py-3 px-4 text-right">ISR Retenido</th>
                        <th className="py-3 px-4 text-right">Infonavit</th>
                        <th className="py-3 px-4 text-right">Neto a Pagar</th>
                        <th className="py-3 px-4 text-center">Talón Fiscal</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-800/80">
                      {empleados.filter(e => e.status === "activo").map((emp) => {
                        const quincenal = emp.salarioMensual / 2;
                        const imss = Math.round(quincenal * 0.0315);
                        const isr = Math.round(quincenal * 0.108);
                        const infonavit = Math.round(quincenal * 0.05);
                        const neto = quincenal - imss - isr - infonavit;

                        return (
                          <tr key={emp.id} className="hover:bg-slate-800/40 transition">
                            <td className="py-3 px-4">
                              <div className="font-bold text-white">{emp.nombre}</div>
                              <div className="font-mono text-[10px] text-slate-400">{emp.numEmpleado}</div>
                            </td>
                            <td className="py-3 px-4">
                              <div className="text-slate-300 font-medium">{emp.puesto}</div>
                              <div className="text-[10px] text-slate-500 font-mono">{emp.departamento}</div>
                            </td>
                            <td className="py-3 px-4 text-right font-mono font-bold text-white">
                              {fmt(quincenal)}
                            </td>
                            <td className="py-3 px-4 text-right font-mono text-rose-400">
                              -{fmt(imss)}
                            </td>
                            <td className="py-3 px-4 text-right font-mono text-rose-400">
                              -{fmt(isr)}
                            </td>
                            <td className="py-3 px-4 text-right font-mono text-rose-400">
                              -{fmt(infonavit)}
                            </td>
                            <td className="py-3 px-4 text-right font-mono font-bold text-emerald-400 text-sm">
                              {fmt(neto)}
                            </td>
                            <td className="py-3 px-4 text-center">
                              <button
                                onClick={() => setReciboEmpleado(emp)}
                                className="inline-flex items-center gap-1.5 rounded-lg border border-blue-500/30 bg-blue-500/10 hover:bg-blue-500/20 text-blue-400 px-2.5 py-1 text-xs font-semibold transition"
                              >
                                <Printer className="size-3" />
                                <span>Ver Recibo</span>
                              </button>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* AUDITORIA MODULE */}
          {activeModule === "auditoria" && (
            <div className="space-y-4">
              <div className="rounded-2xl border border-slate-800 bg-[#1e293b] p-5">
                <div className="flex items-center justify-between pb-4 border-b border-slate-800 mb-4">
                  <div>
                    <h2 className="text-sm font-bold text-white flex items-center gap-2">
                      <Shield className="size-4 text-amber-400" />
                      Bitácora de Trazabilidad & Accesos de Usuarios
                    </h2>
                    <p className="text-xs text-slate-400 mt-0.5">
                      Registro de todas las mutaciones en base de datos para cumplimiento de auditoría interna y SOX.
                    </p>
                  </div>
                  <span className="font-mono text-xs text-slate-400">
                    Eventos registrados: <strong>{auditoriaData.length}</strong>
                  </span>
                </div>

                <div className="space-y-2.5 font-mono text-xs">
                  {auditoriaData.map((a) => (
                    <div
                      key={a.id}
                      className="p-3.5 rounded-xl border border-slate-800 bg-[#0f172a] flex flex-col sm:flex-row sm:items-center justify-between gap-2"
                    >
                      <div className="flex items-start gap-3">
                        <span
                          className={`size-2.5 rounded-full mt-1.5 shrink-0 ${
                            a.severidad === "critica"
                              ? "bg-rose-500 shadow-sm shadow-rose-500/50"
                              : a.severidad === "alerta"
                              ? "bg-amber-500"
                              : "bg-blue-500"
                          }`}
                        />
                        <div>
                          <p className="text-slate-200 font-semibold">{a.accion}</p>
                          <div className="text-[10px] text-slate-500 mt-0.5 space-x-3">
                            <span>Usuario: <strong className="text-slate-400">{a.usuario}</strong></span>
                            <span>IP: {a.ip}</span>
                            <span>Módulo: {a.modulo}</span>
                          </div>
                        </div>
                      </div>
                      <span className="text-[10px] text-slate-400 self-end sm:self-auto shrink-0">
                        {a.fecha}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </main>
      </div>

      {/* MODAL RECIBO DE NÓMINA OFICIAL */}
      <AnimatePresence>
        {reciboEmpleado && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="w-full max-w-xl rounded-3xl border border-slate-700 bg-white text-slate-900 p-6 shadow-2xl relative font-sans"
            >
              <button
                onClick={() => setReciboEmpleado(null)}
                className="absolute top-5 right-5 text-slate-400 hover:text-slate-700 p-1"
              >
                <X className="size-5" />
              </button>

              <div className="border-b border-slate-200 pb-3 mb-4 flex justify-between items-start">
                <div>
                  <h3 className="text-base font-extrabold text-slate-900 tracking-tight">
                    SERVICIOS OPERATIVOS START S.A. DE C.V.
                  </h3>
                  <p className="text-xs text-slate-600 font-mono">RFC: SOS190101XYZ · Registro Patronal: Y88-1920-10</p>
                  <p className="text-xs font-bold text-blue-700 mt-1">RECIBO DE PAGO DE NÓMINA (CFDI NÓMINA 1.2)</p>
                </div>
                <div className="text-right text-xs font-mono">
                  <p className="text-slate-500">Folio: <strong className="text-slate-900">NOM-2026-0819</strong></p>
                  <p className="text-slate-500">Periodo: Nov 2026</p>
                </div>
              </div>

              {/* Employee Information */}
              <div className="bg-slate-50 border border-slate-200 rounded-xl p-3 text-xs mb-4 grid grid-cols-2 gap-2 font-mono">
                <div>
                  <span className="text-slate-500 block">Colaborador:</span>
                  <strong className="text-slate-900">{reciboEmpleado.nombre}</strong>
                </div>
                <div>
                  <span className="text-slate-500 block">No. Empleado:</span>
                  <strong className="text-slate-900">{reciboEmpleado.numEmpleado}</strong>
                </div>
                <div>
                  <span className="text-slate-500 block">CURP / NSS:</span>
                  <span className="text-slate-700">{reciboEmpleado.curp}</span>
                </div>
                <div>
                  <span className="text-slate-500 block">Puesto / Depto:</span>
                  <span className="text-slate-700">{reciboEmpleado.puesto} ({reciboEmpleado.departamento})</span>
                </div>
              </div>

              {/* Percepciones vs Deducciones Table */}
              <div className="border border-slate-200 rounded-xl overflow-hidden text-xs mb-4">
                <div className="grid grid-cols-2 bg-slate-100 font-bold text-slate-700 border-b border-slate-200 text-center py-1.5 font-mono">
                  <div>PERCEPCIONES</div>
                  <div className="border-l border-slate-200">DEDUCCIONES</div>
                </div>
                <div className="grid grid-cols-2 divide-x divide-slate-200 p-3 font-mono text-[11px]">
                  <div className="space-y-1.5 pr-2">
                    <div className="flex justify-between">
                      <span>001 Sueldo Quincenal:</span>
                      <strong>{fmt(reciboEmpleado.salarioMensual / 2)}</strong>
                    </div>
                    <div className="flex justify-between text-slate-500">
                      <span>038 Bono Despensa:</span>
                      <span>$0.00</span>
                    </div>
                  </div>
                  <div className="space-y-1.5 pl-2">
                    <div className="flex justify-between text-rose-700">
                      <span>001 IMSS Obrero:</span>
                      <span>-{fmt((reciboEmpleado.salarioMensual / 2) * 0.0315)}</span>
                    </div>
                    <div className="flex justify-between text-rose-700">
                      <span>002 Retención ISR:</span>
                      <span>-{fmt((reciboEmpleado.salarioMensual / 2) * 0.108)}</span>
                    </div>
                    <div className="flex justify-between text-rose-700">
                      <span>010 Amortización Infonavit:</span>
                      <span>-{fmt((reciboEmpleado.salarioMensual / 2) * 0.05)}</span>
                    </div>
                  </div>
                </div>
                <div className="bg-slate-50 border-t border-slate-200 p-3 flex justify-between items-center font-mono">
                  <span className="font-bold text-slate-700">NETO A DEPOSITAR:</span>
                  <span className="text-base font-extrabold text-emerald-700">
                    {fmt(
                      (reciboEmpleado.salarioMensual / 2) -
                        ((reciboEmpleado.salarioMensual / 2) * 0.0315) -
                        ((reciboEmpleado.salarioMensual / 2) * 0.108) -
                        ((reciboEmpleado.salarioMensual / 2) * 0.05)
                    )}
                  </span>
                </div>
              </div>

              <div className="flex justify-between items-center text-xs pt-2">
                <span className="text-slate-500 font-mono text-[10px]">
                  Firma Electrónica: SHA-256 Validado SAT
                </span>
                <div className="flex gap-2">
                  <button
                    onClick={() => alert("Imprimiendo recibo oficial...")}
                    className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg border border-slate-300 text-slate-700 font-semibold hover:bg-slate-100 transition"
                  >
                    <Printer className="size-3.5" />
                    <span>Imprimir</span>
                  </button>
                  <button
                    onClick={() => setReciboEmpleado(null)}
                    className="px-4 py-1.5 rounded-lg bg-blue-600 text-white font-semibold hover:bg-blue-700 transition"
                  >
                    Cerrar
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* MODAL NUEVO CLIENTE */}
      <AnimatePresence>
        {modalNuevoCliente && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="w-full max-w-md rounded-3xl border border-slate-700 bg-[#1e293b] p-6 shadow-2xl relative text-white"
            >
              <button
                onClick={() => setModalNuevoCliente(false)}
                className="absolute top-5 right-5 text-slate-400 hover:text-white p-1"
              >
                <X className="size-5" />
              </button>

              <h3 className="text-base font-bold text-white mb-1">Registrar Nuevo Cliente en ERP</h3>
              <p className="text-xs text-slate-400 mb-4">
                El cliente se integrará a la base de datos de facturación y límite de crédito.
              </p>

              <form onSubmit={guardarNuevoCliente} className="space-y-3 text-xs">
                <div>
                  <label className="block text-slate-300 mb-1">Nombre o Contacto:</label>
                  <input
                    type="text"
                    required
                    value={nuevoNombre}
                    onChange={(e) => setNuevoNombre(e.target.value)}
                    placeholder="Ej. Ing. Miguel Mendoza"
                    className="w-full bg-[#0f172a] border border-slate-700 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-slate-300 mb-1">Razón Social / Empresa:</label>
                  <input
                    type="text"
                    required
                    value={nuevaEmpresa}
                    onChange={(e) => setNuevaEmpresa(e.target.value)}
                    placeholder="Ej. Tecnología y Redes de Jalisco S.A."
                    className="w-full bg-[#0f172a] border border-slate-700 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-blue-500"
                  />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-slate-300 mb-1">RFC Fiscal:</label>
                    <input
                      type="text"
                      value={nuevoRFC}
                      onChange={(e) => setNuevoRFC(e.target.value)}
                      placeholder="TRJ200115PL0"
                      className="w-full bg-[#0f172a] border border-slate-700 rounded-xl px-3 py-2 font-mono text-white focus:outline-none focus:border-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-300 mb-1">Límite de Crédito:</label>
                    <input
                      type="number"
                      value={nuevoCredito}
                      onChange={(e) => setNuevoCredito(Number(e.target.value))}
                      className="w-full bg-[#0f172a] border border-slate-700 rounded-xl px-3 py-2 font-mono text-white focus:outline-none focus:border-blue-500"
                    />
                  </div>
                </div>

                <div className="mt-5 flex justify-end gap-2 pt-2">
                  <button
                    type="button"
                    onClick={() => setModalNuevoCliente(false)}
                    className="px-4 py-2 rounded-xl bg-slate-800 text-slate-300 font-semibold hover:bg-slate-700 transition"
                  >
                    Cancelar
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-semibold shadow-md transition"
                  >
                    Guardar Cliente
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
