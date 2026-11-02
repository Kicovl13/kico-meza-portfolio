"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowLeft,
  BarChart3,
  Building2,
  CheckCircle2,
  ChevronRight,
  FileText,
  Plus,
  Search,
  Settings,
  Trash2,
  User,
  Users,
  Wallet,
  X,
} from "lucide-react";
import Link from "next/link";

type Module = "dashboard" | "clientes" | "empleados" | "nomina" | "facturacion" | "auditoria";

interface Cliente {
  id: number;
  nombre: string;
  empresa: string;
  email: string;
  telefono: string;
  status: "activo" | "inactivo";
  saldo: number;
  ultimaInteraccion: string;
}

interface Empleado {
  id: number;
  nombre: string;
  puesto: string;
  departamento: string;
  salario: number;
  status: "activo" | "baja";
  ingreso: string;
}

const clientes: Cliente[] = [
  { id: 1, nombre: "Carlos Rodríguez", empresa: "Distribuidora del Norte S.A.", email: "carlos@norte.com", telefono: "33-1234-5678", status: "activo", saldo: 48500, ultimaInteraccion: "30 Oct 2026" },
  { id: 2, nombre: "Laura Jiménez", empresa: "Manufacturas Jalisco", email: "laura@mfgjal.mx", telefono: "33-8765-4321", status: "activo", saldo: 0, ultimaInteraccion: "28 Oct 2026" },
  { id: 3, nombre: "Roberto Sánchez", empresa: "Importadora Occidente", email: "rsanchez@impoc.com", telefono: "33-5555-0000", status: "inactivo", saldo: 12000, ultimaInteraccion: "15 Oct 2026" },
  { id: 4, nombre: "Ana García", empresa: "Servicios Logísticos GDL", email: "ana@slgdl.mx", telefono: "33-3344-5566", status: "activo", saldo: 29750, ultimaInteraccion: "31 Oct 2026" },
];

const empleados: Empleado[] = [
  { id: 1, nombre: "María López", puesto: "Gerente de Ventas", departamento: "Comercial", salario: 28000, status: "activo", ingreso: "Mar 2023" },
  { id: 2, nombre: "José Martínez", puesto: "Desarrollador Backend", departamento: "TI", salario: 35000, status: "activo", ingreso: "Ene 2024" },
  { id: 3, nombre: "Sofía Torres", puesto: "Contadora", departamento: "Finanzas", salario: 22000, status: "activo", ingreso: "Jun 2022" },
  { id: 4, nombre: "Luis Ramírez", puesto: "Soporte Técnico", departamento: "TI", salario: 18000, status: "baja", ingreso: "Sep 2021" },
];

const nominaBase = empleados.filter(e => e.status === "activo").map(e => {
  const imss = Math.round(e.salario * 0.0315);
  const isr = Math.round(e.salario * 0.108);
  const infonavit = Math.round(e.salario * 0.05);
  const neto = e.salario - imss - isr - infonavit;
  return {
    ...e,
    imss,
    isr,
    infonavit,
    neto,
  };
});

const auditLog = [
  { user: "Admin", action: "Creó cliente: Distribuidora del Norte S.A.", time: "31 Oct 11:42", tipo: "create" },
  { user: "María López", action: "Editó empleado: Luis Ramírez → Baja", time: "30 Oct 17:05", tipo: "edit" },
  { user: "Admin", action: "Generó nómina Octubre 2026", time: "30 Oct 10:00", tipo: "system" },
  { user: "Sofía Torres", action: "Factura F-2026-0492 emitida: $48,500", time: "29 Oct 14:30", tipo: "create" },
  { user: "José Martínez", action: "Inicio de sesión exitoso", time: "29 Oct 9:01", tipo: "login" },
];

const tipoColors: Record<string, string> = {
  create: "#22c55e", edit: "#f97316", system: "#3b82f6", login: "#a855f7",
};

const modules: { id: Module; label: string; icon: React.ElementType }[] = [
  { id: "dashboard", label: "Dashboard", icon: BarChart3 },
  { id: "clientes", label: "Clientes", icon: Users },
  { id: "empleados", label: "Empleados", icon: User },
  { id: "nomina", label: "Nómina", icon: Wallet },
  { id: "facturacion", label: "Facturación", icon: FileText },
  { id: "auditoria", label: "Auditoría", icon: Settings },
];

function fmt(n: number) {
  return `$${n.toLocaleString("es-MX")}`;
}

export default function SysAdminMvp() {
  const [module, setModule] = useState<Module>("dashboard");
  const [search, setSearch] = useState("");
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [newClienteModal, setNewClienteModal] = useState(false);
  const [clientesList, setClientesList] = useState(clientes);
  const [form, setForm] = useState({ nombre: "", empresa: "", email: "", telefono: "" });

  const filteredClientes = clientesList.filter(c =>
    c.nombre.toLowerCase().includes(search.toLowerCase()) ||
    c.empresa.toLowerCase().includes(search.toLowerCase())
  );

  const addCliente = () => {
    if (!form.nombre || !form.empresa) return;
    setClientesList(prev => [...prev, {
      id: prev.length + 1, ...form, status: "activo", saldo: 0, ultimaInteraccion: "Hoy",
    }]);
    setForm({ nombre: "", empresa: "", email: "", telefono: "" });
    setNewClienteModal(false);
  };

  return (
    <div className="min-h-screen flex flex-col" style={{ background: "#0d1117" }}>
      {/* Top bar */}
      <header className="flex items-center gap-4 px-4 py-3 border-b" style={{ background: "#161b22", borderColor: "rgba(255,255,255,0.08)" }}>
        <Link href="/" className="flex items-center gap-2 text-sm" style={{ color: "rgba(255,255,255,0.4)" }}>
          <ArrowLeft size={14} /> Portafolio
        </Link>
        <div className="h-4 w-px" style={{ background: "rgba(255,255,255,0.1)" }} />
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg flex items-center justify-center" style={{ background: "linear-gradient(135deg, #22c55e, #16a34a)" }}>
            <Building2 size={14} className="text-white" />
          </div>
          <span className="text-white font-semibold text-sm">SysAdministrador</span>
        </div>
        <span className="ml-auto text-xs px-2 py-1 rounded-full" style={{ background: "rgba(34,197,94,0.12)", color: "#22c55e", border: "1px solid rgba(34,197,94,0.25)" }}>
          CRM · MVP Demo
        </span>
      </header>

      <div className="flex flex-1 overflow-hidden" style={{ minHeight: "calc(100vh - 52px)" }}>
        {/* Sidebar */}
        <aside className="w-52 flex-shrink-0 border-r flex flex-col" style={{ background: "#161b22", borderColor: "rgba(255,255,255,0.07)" }}>
          <nav className="flex-1 p-3 space-y-1">
            {modules.map(m => (
              <button
                key={m.id}
                onClick={() => setModule(m.id)}
                className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-all text-left"
                style={{ background: module === m.id ? "rgba(34,197,94,0.15)" : "transparent", color: module === m.id ? "#22c55e" : "rgba(255,255,255,0.55)", border: module === m.id ? "1px solid rgba(34,197,94,0.3)" : "1px solid transparent" }}
              >
                <m.icon size={15} />
                {m.label}
              </button>
            ))}
          </nav>
          <div className="p-3 border-t" style={{ borderColor: "rgba(255,255,255,0.07)" }}>
            <div className="flex items-center gap-2 px-3 py-2">
              <div className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold text-white" style={{ background: "#22c55e" }}>A</div>
              <div>
                <p className="text-white text-xs font-medium">Admin</p>
                <p className="text-xs" style={{ color: "rgba(255,255,255,0.35)" }}>Super Admin</p>
              </div>
            </div>
          </div>
        </aside>

        {/* Main */}
        <main className="flex-1 overflow-auto p-6">
          <AnimatePresence mode="wait">
            {/* DASHBOARD */}
            {module === "dashboard" && (
              <motion.div key="dash" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                <h1 className="text-2xl font-bold text-white mb-6">Dashboard General</h1>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                  {[
                    { label: "Clientes Activos", value: "3", sub: "1 inactivo", color: "#22c55e" },
                    { label: "Empleados", value: "3", sub: "1 de baja", color: "#3b82f6" },
                    { label: "Facturación Oct", value: fmt(124750), sub: "+12% vs Sep", color: "#a855f7" },
                    { label: "Saldo Pendiente", value: fmt(90250), sub: "3 facturas", color: "#f97316" },
                  ].map(s => (
                    <div key={s.label} className="p-5 rounded-2xl" style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }}>
                      <p className="text-xs mb-3" style={{ color: "rgba(255,255,255,0.5)" }}>{s.label}</p>
                      <p className="text-2xl font-bold" style={{ color: s.color }}>{s.value}</p>
                      <p className="text-xs mt-1" style={{ color: "rgba(255,255,255,0.3)" }}>{s.sub}</p>
                    </div>
                  ))}
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div className="p-5 rounded-2xl" style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }}>
                    <h3 className="text-white font-semibold mb-4 text-sm">Últimas Interacciones</h3>
                    {clientesList.slice(0, 3).map(c => (
                      <div key={c.id} className="flex items-center gap-3 py-2 border-b" style={{ borderColor: "rgba(255,255,255,0.06)" }}>
                        <div className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold text-white" style={{ background: "rgba(34,197,94,0.2)" }}>{c.nombre[0]}</div>
                        <div className="flex-1">
                          <p className="text-white text-xs font-medium">{c.nombre}</p>
                          <p className="text-xs" style={{ color: "rgba(255,255,255,0.35)" }}>{c.empresa}</p>
                        </div>
                        <p className="text-xs" style={{ color: "rgba(255,255,255,0.35)" }}>{c.ultimaInteraccion}</p>
                      </div>
                    ))}
                  </div>
                  <div className="p-5 rounded-2xl" style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }}>
                    <h3 className="text-white font-semibold mb-4 text-sm">Actividad Reciente</h3>
                    {auditLog.slice(0, 4).map((log, i) => (
                      <div key={i} className="flex items-start gap-2 py-1.5">
                        <div className="w-1.5 h-1.5 rounded-full mt-1.5 flex-shrink-0" style={{ background: tipoColors[log.tipo] }} />
                        <div>
                          <p className="text-xs text-white">{log.action}</p>
                          <p className="text-xs" style={{ color: "rgba(255,255,255,0.3)" }}>{log.user} · {log.time}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}

            {/* CLIENTES */}
            {module === "clientes" && (
              <motion.div key="clientes" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                <div className="flex items-center justify-between mb-6">
                  <h1 className="text-2xl font-bold text-white">Clientes</h1>
                  <button onClick={() => setNewClienteModal(true)} className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold text-white" style={{ background: "linear-gradient(135deg, #22c55e, #16a34a)" }}>
                    <Plus size={15} /> Nuevo Cliente
                  </button>
                </div>
                <div className="relative mb-4">
                  <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2" style={{ color: "rgba(255,255,255,0.35)" }} />
                  <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Buscar por nombre o empresa..." className="w-full pl-9 pr-4 py-2.5 rounded-xl text-sm outline-none" style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)", color: "#fff" }} />
                </div>
                <div className="rounded-2xl overflow-hidden" style={{ border: "1px solid rgba(255,255,255,0.08)" }}>
                  <table className="w-full text-sm">
                    <thead>
                      <tr style={{ background: "rgba(255,255,255,0.05)", borderBottom: "1px solid rgba(255,255,255,0.08)" }}>
                        {["Cliente", "Empresa", "Contacto", "Saldo Pendiente", "Status"].map(h => (
                          <th key={h} className="px-4 py-3 text-left text-xs font-semibold" style={{ color: "rgba(255,255,255,0.5)" }}>{h}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {filteredClientes.map((c, i) => (
                        <tr key={c.id} style={{ borderBottom: "1px solid rgba(255,255,255,0.05)", background: i % 2 === 0 ? "rgba(255,255,255,0.02)" : "transparent" }}>
                          <td className="px-4 py-3">
                            <div className="flex items-center gap-2">
                              <div className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold text-white" style={{ background: "rgba(34,197,94,0.2)" }}>{c.nombre[0]}</div>
                              <span className="text-white">{c.nombre}</span>
                            </div>
                          </td>
                          <td className="px-4 py-3 text-sm" style={{ color: "rgba(255,255,255,0.6)" }}>{c.empresa}</td>
                          <td className="px-4 py-3 text-xs" style={{ color: "rgba(255,255,255,0.4)" }}>{c.email}</td>
                          <td className="px-4 py-3 font-mono text-sm" style={{ color: c.saldo > 0 ? "#f97316" : "#22c55e" }}>{fmt(c.saldo)}</td>
                          <td className="px-4 py-3">
                            <span className="text-xs px-2 py-1 rounded-full" style={{ background: c.status === "activo" ? "rgba(34,197,94,0.12)" : "rgba(255,255,255,0.08)", color: c.status === "activo" ? "#22c55e" : "rgba(255,255,255,0.4)" }}>
                              {c.status}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <AnimatePresence>
                  {newClienteModal && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ background: "rgba(0,0,0,0.7)" }}>
                      <motion.div initial={{ scale: 0.9 }} animate={{ scale: 1 }} className="w-full max-w-md p-6 rounded-2xl" style={{ background: "#1c2128", border: "1px solid rgba(255,255,255,0.1)" }}>
                        <div className="flex items-center justify-between mb-5">
                          <h3 className="text-white font-bold text-lg">Nuevo Cliente</h3>
                          <button onClick={() => setNewClienteModal(false)}><X size={18} style={{ color: "rgba(255,255,255,0.5)" }} /></button>
                        </div>
                        <div className="space-y-3">
                          {[{ key: "nombre", label: "Nombre completo*" }, { key: "empresa", label: "Empresa*" }, { key: "email", label: "Email" }, { key: "telefono", label: "Teléfono" }].map(f => (
                            <div key={f.key}>
                              <label className="text-xs mb-1 block" style={{ color: "rgba(255,255,255,0.6)" }}>{f.label}</label>
                              <input value={(form as Record<string, string>)[f.key]} onChange={e => setForm(prev => ({ ...prev, [f.key]: e.target.value }))} className="w-full px-3 py-2.5 rounded-xl text-sm outline-none" style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)", color: "#fff" }} />
                            </div>
                          ))}
                        </div>
                        <button onClick={addCliente} className="w-full mt-5 py-3 rounded-xl text-white font-semibold text-sm" style={{ background: "linear-gradient(135deg, #22c55e, #16a34a)" }}>
                          Guardar Cliente
                        </button>
                      </motion.div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            )}

            {/* EMPLEADOS */}
            {module === "empleados" && (
              <motion.div key="emp" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                <h1 className="text-2xl font-bold text-white mb-6">Empleados</h1>
                <div className="grid gap-4">
                  {empleados.map(e => (
                    <div key={e.id} className="flex items-center gap-4 p-4 rounded-2xl" style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }}>
                      <div className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold text-white flex-shrink-0" style={{ background: e.status === "activo" ? "rgba(59,130,246,0.25)" : "rgba(255,255,255,0.08)" }}>{e.nombre.split(" ").map(n => n[0]).join("")}</div>
                      <div className="flex-1">
                        <p className="text-white font-semibold">{e.nombre}</p>
                        <p className="text-xs" style={{ color: "rgba(255,255,255,0.45)" }}>{e.puesto} · {e.departamento}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-white font-mono text-sm">{fmt(e.salario)}/mes</p>
                        <p className="text-xs" style={{ color: "rgba(255,255,255,0.35)" }}>Desde {e.ingreso}</p>
                      </div>
                      <span className="text-xs px-2 py-1 rounded-full" style={{ background: e.status === "activo" ? "rgba(59,130,246,0.12)" : "rgba(255,255,255,0.06)", color: e.status === "activo" ? "#60a5fa" : "rgba(255,255,255,0.4)" }}>
                        {e.status}
                      </span>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}

            {/* NÓMINA */}
            {module === "nomina" && (
              <motion.div key="nom" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h1 className="text-2xl font-bold text-white">Nómina — Octubre 2026</h1>
                    <p className="text-sm mt-1" style={{ color: "rgba(255,255,255,0.4)" }}>Cálculo automático de deducciones IMSS, ISR e INFONAVIT</p>
                  </div>
                  <button className="px-4 py-2 rounded-xl text-sm font-semibold" style={{ background: "rgba(34,197,94,0.15)", color: "#22c55e", border: "1px solid rgba(34,197,94,0.3)" }}>
                    Exportar PDF
                  </button>
                </div>
                <div className="rounded-2xl overflow-hidden mb-6" style={{ border: "1px solid rgba(255,255,255,0.08)" }}>
                  <table className="w-full text-sm">
                    <thead>
                      <tr style={{ background: "rgba(255,255,255,0.05)", borderBottom: "1px solid rgba(255,255,255,0.08)" }}>
                        {["Empleado", "Sueldo Bruto", "IMSS", "ISR", "INFONAVIT", "Neto a Pagar"].map(h => (
                          <th key={h} className="px-4 py-3 text-left text-xs font-semibold" style={{ color: "rgba(255,255,255,0.5)" }}>{h}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {nominaBase.map((e, i) => (
                        <tr key={e.id} style={{ borderBottom: "1px solid rgba(255,255,255,0.05)", background: i % 2 === 0 ? "rgba(255,255,255,0.02)" : "transparent" }}>
                          <td className="px-4 py-3 text-white">{e.nombre}</td>
                          <td className="px-4 py-3 font-mono" style={{ color: "rgba(255,255,255,0.7)" }}>{fmt(e.salario)}</td>
                          <td className="px-4 py-3 font-mono text-red-400">-{fmt(e.imss)}</td>
                          <td className="px-4 py-3 font-mono text-red-400">-{fmt(e.isr)}</td>
                          <td className="px-4 py-3 font-mono text-red-400">-{fmt(e.infonavit)}</td>
                          <td className="px-4 py-3 font-mono font-bold" style={{ color: "#22c55e" }}>{fmt(e.neto)}</td>
                        </tr>
                      ))}
                    </tbody>
                    <tfoot>
                      <tr style={{ background: "rgba(34,197,94,0.08)", borderTop: "1px solid rgba(34,197,94,0.2)" }}>
                        <td className="px-4 py-3 text-white font-bold">Total</td>
                        <td className="px-4 py-3 font-mono font-bold text-white">{fmt(nominaBase.reduce((s, e) => s + e.salario, 0))}</td>
                        <td className="px-4 py-3 font-mono text-red-400">-{fmt(nominaBase.reduce((s, e) => s + e.imss, 0))}</td>
                        <td className="px-4 py-3 font-mono text-red-400">-{fmt(nominaBase.reduce((s, e) => s + e.isr, 0))}</td>
                        <td className="px-4 py-3 font-mono text-red-400">-{fmt(nominaBase.reduce((s, e) => s + e.infonavit, 0))}</td>
                        <td className="px-4 py-3 font-mono font-bold" style={{ color: "#22c55e" }}>{fmt(nominaBase.reduce((s, e) => s + e.neto, 0))}</td>
                      </tr>
                    </tfoot>
                  </table>
                </div>
              </motion.div>
            )}

            {/* FACTURACIÓN */}
            {module === "facturacion" && (
              <motion.div key="fact" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                <h1 className="text-2xl font-bold text-white mb-6">Facturación</h1>
                <div className="space-y-3">
                  {[
                    { folio: "F-2026-0494", cliente: "Distribuidora del Norte S.A.", monto: 48500, fecha: "31 Oct 2026", status: "Pendiente", uuid: "f47ac10b-..." },
                    { folio: "F-2026-0493", cliente: "Servicios Logísticos GDL", monto: 29750, fecha: "30 Oct 2026", status: "Pendiente", uuid: "3c9a12e4-..." },
                    { folio: "F-2026-0491", cliente: "Manufacturas Jalisco", monto: 46500, fecha: "22 Oct 2026", status: "Pagada", uuid: "7b1c3d5e-..." },
                    { folio: "F-2026-0490", cliente: "Importadora Occidente", monto: 12000, fecha: "10 Oct 2026", status: "Vencida", uuid: "9d2e4f6a-..." },
                  ].map((f, i) => (
                    <div key={i} className="flex items-center gap-4 p-4 rounded-2xl" style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }}>
                      <div className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: "rgba(168,85,247,0.15)" }}>
                        <FileText size={16} style={{ color: "#a855f7" }} />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <p className="text-white font-mono text-sm font-semibold">{f.folio}</p>
                          <span className="text-xs px-2 py-0.5 rounded-full" style={{ background: f.status === "Pagada" ? "rgba(34,197,94,0.12)" : f.status === "Vencida" ? "rgba(239,68,68,0.12)" : "rgba(249,115,22,0.12)", color: f.status === "Pagada" ? "#22c55e" : f.status === "Vencida" ? "#ef4444" : "#f97316" }}>
                            {f.status}
                          </span>
                        </div>
                        <p className="text-sm" style={{ color: "rgba(255,255,255,0.5)" }}>{f.cliente} · {f.fecha}</p>
                      </div>
                      <p className="font-mono font-bold text-white">{fmt(f.monto)}</p>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}

            {/* AUDITORÍA */}
            {module === "auditoria" && (
              <motion.div key="aud" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                <h1 className="text-2xl font-bold text-white mb-6">Bitácora de Auditoría</h1>
                <div className="space-y-2">
                  {auditLog.map((log, i) => (
                    <motion.div key={i} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.07 }} className="flex items-start gap-3 p-4 rounded-xl" style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)" }}>
                      <div className="w-2 h-2 rounded-full mt-1.5 flex-shrink-0" style={{ background: tipoColors[log.tipo] }} />
                      <div className="flex-1">
                        <p className="text-white text-sm">{log.action}</p>
                        <p className="text-xs mt-0.5" style={{ color: "rgba(255,255,255,0.35)" }}>{log.user} · {log.time}</p>
                      </div>
                      <span className="text-xs px-2 py-0.5 rounded-md" style={{ background: `${tipoColors[log.tipo]}15`, color: tipoColors[log.tipo] }}>
                        {log.tipo}
                      </span>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </main>
      </div>
    </div>
  );
}
