"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowLeft,
  Building2,
  Calendar,
  Check,
  CheckCircle2,
  Clock,
  DollarSign,
  GripVertical,
  Plus,
  Timer,
  Users,
  X,
  Zap,
} from "lucide-react";
import Link from "next/link";

type Column = "backlog" | "progreso" | "revision" | "completada";
type Tab = "kanban" | "proyectos" | "tiempo" | "facturacion";

interface Task {
  id: number;
  title: string;
  project: string;
  assignee: string;
  priority: "alta" | "media" | "baja";
  hours: number;
  column: Column;
  color: string;
}

interface Project {
  id: number;
  name: string;
  client: string;
  budget: number;
  spent: number;
  tasks: number;
  done: number;
  color: string;
  deadline: string;
}

const priorityColors = { alta: "#ef4444", media: "#f97316", baja: "#22c55e" };

const initTasks: Task[] = [
  { id: 1, title: "Diseño del módulo de pagos", project: "Leex SaaS", assignee: "JM", priority: "alta", hours: 8, column: "progreso", color: "#a855f7" },
  { id: 2, title: "API REST de notificaciones", project: "SysAdmin", assignee: "JM", priority: "alta", hours: 5, column: "revision", color: "#3b82f6" },
  { id: 3, title: "Testing unitario del CRM", project: "SysAdmin", assignee: "ST", priority: "media", hours: 4, column: "backlog", color: "#3b82f6" },
  { id: 4, title: "Migración de base de datos", project: "RootWork", assignee: "LR", priority: "alta", hours: 12, column: "backlog", color: "#22c55e" },
  { id: 5, title: "UI del tablero Kanban", project: "RootWork", assignee: "JM", priority: "media", hours: 6, column: "completada", color: "#22c55e" },
  { id: 6, title: "Módulo de reportes PDF", project: "Leex SaaS", assignee: "ST", priority: "baja", hours: 3, column: "completada", color: "#a855f7" },
  { id: 7, title: "Integración Stripe", project: "Leex SaaS", assignee: "JM", priority: "alta", hours: 10, column: "backlog", color: "#a855f7" },
];

const initProjects: Project[] = [
  { id: 1, name: "Leex SaaS", client: "Startup PropTech", budget: 85000, spent: 42000, tasks: 12, done: 5, color: "#a855f7", deadline: "15 Dic 2026" },
  { id: 2, name: "SysAdmin CRM", client: "Distribuidora Norte", budget: 60000, spent: 38000, tasks: 9, done: 6, color: "#3b82f6", deadline: "30 Nov 2026" },
  { id: 3, name: "RootWork v2", client: "Interno", budget: 40000, spent: 12000, tasks: 8, done: 2, color: "#22c55e", deadline: "28 Feb 2027" },
];

const timeEntries = [
  { task: "Diseño del módulo de pagos", project: "Leex SaaS", date: "Hoy", hours: 3.5, rate: 850, total: 2975 },
  { task: "API REST de notificaciones", project: "SysAdmin", date: "Hoy", hours: 2.0, rate: 850, total: 1700 },
  { task: "Migración de base de datos", project: "RootWork", date: "Ayer", hours: 4.0, rate: 850, total: 3400 },
  { task: "Testing unitario del CRM", project: "SysAdmin", date: "Ayer", hours: 1.5, rate: 850, total: 1275 },
  { task: "UI del tablero Kanban", project: "RootWork", date: "29 Oct", hours: 6.0, rate: 850, total: 5100 },
];

const cols: { id: Column; label: string; color: string }[] = [
  { id: "backlog", label: "Backlog", color: "#64748b" },
  { id: "progreso", label: "En Progreso", color: "#3b82f6" },
  { id: "revision", label: "Revisión", color: "#f97316" },
  { id: "completada", label: "Completada", color: "#22c55e" },
];

function fmt(n: number) { return `$${n.toLocaleString("es-MX")}`; }

export default function RootWorkMvp() {
  const [tab, setTab] = useState<Tab>("kanban");
  const [tasks, setTasks] = useState(initTasks);
  const [dragId, setDragId] = useState<number | null>(null);
  const [dragOver, setDragOver] = useState<Column | null>(null);
  const [timerActive, setTimerActive] = useState(false);
  const [timerTask, setTimerTask] = useState("Diseño del módulo de pagos");
  const [seconds, setSeconds] = useState(0);
  const [timerRef, setTimerRef] = useState<ReturnType<typeof setInterval> | null>(null);

  const moveTask = (taskId: number, newCol: Column) => {
    setTasks(prev => prev.map(t => t.id === taskId ? { ...t, column: newCol } : t));
  };

  const startTimer = () => {
    if (timerActive) {
      clearInterval(timerRef!);
      setTimerActive(false);
    } else {
      const ref = setInterval(() => setSeconds(s => s + 1), 1000);
      setTimerRef(ref);
      setTimerActive(true);
    }
  };

  const formatSeconds = (s: number) => {
    const h = Math.floor(s / 3600);
    const m = Math.floor((s % 3600) / 60);
    const sec = s % 60;
    return `${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}:${String(sec).padStart(2, "0")}`;
  };

  const totalHours = timeEntries.reduce((s, e) => s + e.hours, 0);
  const totalBilled = timeEntries.reduce((s, e) => s + e.total, 0);

  return (
    <div className="min-h-screen flex flex-col" style={{ background: "#0d1117" }}>
      <header className="flex items-center gap-4 px-4 py-3 border-b sticky top-0 z-40" style={{ background: "#161b22", borderColor: "rgba(255,255,255,0.08)" }}>
        <Link href="/" className="flex items-center gap-2 text-sm" style={{ color: "rgba(255,255,255,0.4)" }}>
          <ArrowLeft size={14} /> Portafolio
        </Link>
        <div className="h-4 w-px" style={{ background: "rgba(255,255,255,0.1)" }} />
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg flex items-center justify-center" style={{ background: "linear-gradient(135deg, #22c55e, #059669)" }}>
            <Zap size={14} className="text-white" />
          </div>
          <span className="text-white font-semibold text-sm">RootWork</span>
        </div>
        {/* Timer pill */}
        <div className="ml-4 flex items-center gap-2 px-3 py-1.5 rounded-full" style={{ background: timerActive ? "rgba(34,197,94,0.15)" : "rgba(255,255,255,0.07)", border: `1px solid ${timerActive ? "rgba(34,197,94,0.4)" : "rgba(255,255,255,0.12)"}` }}>
          <Timer size={12} style={{ color: timerActive ? "#22c55e" : "rgba(255,255,255,0.4)" }} />
          <span className="font-mono text-sm" style={{ color: timerActive ? "#22c55e" : "rgba(255,255,255,0.5)" }}>{formatSeconds(seconds)}</span>
          <button onClick={startTimer} className="text-xs px-2 py-0.5 rounded-full ml-1" style={{ background: timerActive ? "rgba(239,68,68,0.2)" : "rgba(34,197,94,0.2)", color: timerActive ? "#ef4444" : "#22c55e" }}>
            {timerActive ? "Parar" : "Iniciar"}
          </button>
        </div>
        <span className="ml-auto text-xs px-2 py-1 rounded-full" style={{ background: "rgba(34,197,94,0.12)", color: "#22c55e", border: "1px solid rgba(34,197,94,0.25)" }}>
          MVP Demo
        </span>
      </header>

      {/* Tabs */}
      <div className="flex gap-1 px-4 py-2 border-b" style={{ background: "#161b22", borderColor: "rgba(255,255,255,0.07)" }}>
        {([
          { id: "kanban", label: "Kanban" },
          { id: "proyectos", label: "Proyectos" },
          { id: "tiempo", label: "Tiempo" },
          { id: "facturacion", label: "Facturación" },
        ] as { id: Tab; label: string }[]).map(t => (
          <button key={t.id} onClick={() => setTab(t.id)} className="px-4 py-1.5 rounded-lg text-sm transition-all" style={{ background: tab === t.id ? "rgba(34,197,94,0.15)" : "transparent", color: tab === t.id ? "#22c55e" : "rgba(255,255,255,0.5)", border: tab === t.id ? "1px solid rgba(34,197,94,0.3)" : "1px solid transparent" }}>
            {t.label}
          </button>
        ))}
      </div>

      <div className="flex-1 overflow-auto p-6">
        <AnimatePresence mode="wait">
          {/* KANBAN */}
          {tab === "kanban" && (
            <motion.div key="kanban" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              <p className="text-sm mb-4" style={{ color: "rgba(255,255,255,0.4)" }}>Arrastra las tarjetas entre columnas para mover tareas</p>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 min-h-[500px]">
                {cols.map(col => (
                  <div
                    key={col.id}
                    onDragOver={e => { e.preventDefault(); setDragOver(col.id); }}
                    onDrop={() => { if (dragId) moveTask(dragId, col.id); setDragOver(null); setDragId(null); }}
                    className="rounded-2xl p-3 flex flex-col gap-2 transition-all"
                    style={{ background: dragOver === col.id ? `${col.color}12` : "rgba(255,255,255,0.03)", border: `1px solid ${dragOver === col.id ? col.color + "44" : "rgba(255,255,255,0.08)"}`, minHeight: "200px" }}
                  >
                    <div className="flex items-center gap-2 mb-2 px-1">
                      <div className="w-2 h-2 rounded-full" style={{ background: col.color }} />
                      <p className="text-xs font-semibold text-white">{col.label}</p>
                      <span className="ml-auto text-xs rounded-full px-1.5 py-0.5" style={{ background: "rgba(255,255,255,0.08)", color: "rgba(255,255,255,0.5)" }}>
                        {tasks.filter(t => t.column === col.id).length}
                      </span>
                    </div>
                    {tasks.filter(t => t.column === col.id).map(task => (
                      <motion.div
                        key={task.id}
                        draggable
                        onDragStart={() => setDragId(task.id)}
                        onDragEnd={() => { setDragId(null); setDragOver(null); }}
                        layout
                        className="p-3 rounded-xl cursor-grab active:cursor-grabbing select-none"
                        style={{ background: "#1c2128", border: "1px solid rgba(255,255,255,0.1)", opacity: dragId === task.id ? 0.5 : 1 }}
                      >
                        <div className="flex items-start justify-between gap-2 mb-2">
                          <p className="text-white text-xs font-medium leading-tight">{task.title}</p>
                          <GripVertical size={12} style={{ color: "rgba(255,255,255,0.3)", flexShrink: 0 }} />
                        </div>
                        <p className="text-xs mb-2" style={{ color: task.color }}>{task.project}</p>
                        <div className="flex items-center justify-between">
                          <span className="text-xs px-1.5 py-0.5 rounded" style={{ background: `${priorityColors[task.priority]}15`, color: priorityColors[task.priority] }}>
                            {task.priority}
                          </span>
                          <div className="flex items-center gap-1">
                            <Clock size={10} style={{ color: "rgba(255,255,255,0.35)" }} />
                            <span className="text-xs" style={{ color: "rgba(255,255,255,0.35)" }}>{task.hours}h</span>
                            <div className="w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold ml-1" style={{ background: "rgba(255,255,255,0.1)", color: "rgba(255,255,255,0.6)" }}>{task.assignee}</div>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {/* PROYECTOS */}
          {tab === "proyectos" && (
            <motion.div key="proj" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="space-y-4">
              {initProjects.map(p => {
                const pct = Math.round((p.spent / p.budget) * 100);
                const taskPct = Math.round((p.done / p.tasks) * 100);
                return (
                  <div key={p.id} className="p-5 rounded-2xl" style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }}>
                    <div className="flex items-start justify-between gap-4 mb-4">
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <div className="w-3 h-3 rounded-full" style={{ background: p.color }} />
                          <h3 className="text-white font-bold">{p.name}</h3>
                        </div>
                        <p className="text-sm" style={{ color: "rgba(255,255,255,0.45)" }}>{p.client} · Entrega: {p.deadline}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-white font-mono">{fmt(p.spent)}<span className="text-xs ml-1" style={{ color: "rgba(255,255,255,0.35)" }}>/ {fmt(p.budget)}</span></p>
                        <p className="text-xs" style={{ color: pct > 80 ? "#ef4444" : "rgba(255,255,255,0.35)" }}>{pct}% del presupuesto</p>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <div className="flex justify-between text-xs mb-1.5" style={{ color: "rgba(255,255,255,0.45)" }}>
                          <span>Presupuesto usado</span><span>{pct}%</span>
                        </div>
                        <div className="h-1.5 rounded-full" style={{ background: "rgba(255,255,255,0.1)" }}>
                          <motion.div initial={{ width: 0 }} animate={{ width: `${pct}%` }} transition={{ duration: 1 }} className="h-full rounded-full" style={{ background: pct > 80 ? "#ef4444" : p.color }} />
                        </div>
                      </div>
                      <div>
                        <div className="flex justify-between text-xs mb-1.5" style={{ color: "rgba(255,255,255,0.45)" }}>
                          <span>Tareas completadas</span><span>{p.done}/{p.tasks}</span>
                        </div>
                        <div className="h-1.5 rounded-full" style={{ background: "rgba(255,255,255,0.1)" }}>
                          <motion.div initial={{ width: 0 }} animate={{ width: `${taskPct}%` }} transition={{ duration: 1, delay: 0.2 }} className="h-full rounded-full" style={{ background: p.color }} />
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </motion.div>
          )}

          {/* TIEMPO */}
          {tab === "tiempo" && (
            <motion.div key="time" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              <div className="grid grid-cols-3 gap-4 mb-6">
                {[
                  { label: "Horas esta semana", value: `${totalHours}h`, color: "#3b82f6" },
                  { label: "Total facturado", value: fmt(totalBilled), color: "#22c55e" },
                  { label: "Tarifa promedio", value: "$850/hr", color: "#a855f7" },
                ].map(s => (
                  <div key={s.label} className="p-4 rounded-2xl" style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }}>
                    <p className="text-xs mb-2" style={{ color: "rgba(255,255,255,0.4)" }}>{s.label}</p>
                    <p className="text-xl font-bold" style={{ color: s.color }}>{s.value}</p>
                  </div>
                ))}
              </div>
              <div className="rounded-2xl overflow-hidden" style={{ border: "1px solid rgba(255,255,255,0.08)" }}>
                <table className="w-full text-sm">
                  <thead>
                    <tr style={{ background: "rgba(255,255,255,0.05)", borderBottom: "1px solid rgba(255,255,255,0.08)" }}>
                      {["Tarea", "Proyecto", "Fecha", "Horas", "Total"].map(h => (
                        <th key={h} className="px-4 py-3 text-left text-xs font-semibold" style={{ color: "rgba(255,255,255,0.5)" }}>{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {timeEntries.map((e, i) => (
                      <tr key={i} style={{ borderBottom: "1px solid rgba(255,255,255,0.05)", background: i % 2 === 0 ? "rgba(255,255,255,0.02)" : "transparent" }}>
                        <td className="px-4 py-3 text-white">{e.task}</td>
                        <td className="px-4 py-3 text-sm" style={{ color: "rgba(255,255,255,0.5)" }}>{e.project}</td>
                        <td className="px-4 py-3 text-sm" style={{ color: "rgba(255,255,255,0.4)" }}>{e.date}</td>
                        <td className="px-4 py-3 font-mono" style={{ color: "#60a5fa" }}>{e.hours}h</td>
                        <td className="px-4 py-3 font-mono font-bold" style={{ color: "#22c55e" }}>{fmt(e.total)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </motion.div>
          )}

          {/* FACTURACIÓN */}
          {tab === "facturacion" && (
            <motion.div key="fact" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-white">Facturación de Horas</h2>
                <button className="px-4 py-2 rounded-xl text-sm font-semibold" style={{ background: "rgba(34,197,94,0.15)", color: "#22c55e", border: "1px solid rgba(34,197,94,0.3)" }}>
                  Generar Factura
                </button>
              </div>
              <div className="space-y-4">
                {initProjects.map(p => {
                  const projectTime = timeEntries.filter(e => e.project === p.name);
                  const hours = projectTime.reduce((s, e) => s + e.hours, 0);
                  const total = projectTime.reduce((s, e) => s + e.total, 0);
                  return (
                    <div key={p.id} className="p-5 rounded-2xl" style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }}>
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-2">
                          <div className="w-3 h-3 rounded-full" style={{ background: p.color }} />
                          <p className="text-white font-semibold">{p.name}</p>
                        </div>
                        <p className="font-mono font-bold text-white">{fmt(total)}</p>
                      </div>
                      <p className="text-sm" style={{ color: "rgba(255,255,255,0.45)" }}>{hours}h registradas · Tarifa $850/hr</p>
                      <div className="mt-3 space-y-1">
                        {projectTime.map((e, i) => (
                          <div key={i} className="flex items-center justify-between text-xs py-1">
                            <span style={{ color: "rgba(255,255,255,0.5)" }}>{e.task}</span>
                            <span className="font-mono" style={{ color: "rgba(255,255,255,0.6)" }}>{e.hours}h = {fmt(e.total)}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
