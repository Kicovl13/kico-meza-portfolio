"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  AlertCircle,
  ArrowLeft,
  ArrowRight,
  BarChart2,
  Calendar,
  CheckCircle2,
  ChevronDown,
  ChevronRight,
  Circle,
  Clock,
  Code2,
  DollarSign,
  Filter,
  Flame,
  Kanban,
  Layers,
  MoreHorizontal,
  Pause,
  Play,
  Plus,
  Search,
  Sparkles,
  Square,
  StopCircle,
  Tag,
  Timer,
  User,
  Users,
  X,
  Zap,
} from "lucide-react";
import Link from "next/link";
import { DemoSystemHeader } from "@/components/demos/demo-system-header";
import { mvcShowcases } from "@/lib/data";

const rootworkProject = mvcShowcases.find((s) => s.id === "rootwork")!;

type TaskStatus = "backlog" | "in_progress" | "review" | "done";

interface ProjectTask {
  id: string;
  code: string;
  title: string;
  project: "Core API v2" | "Frontend SaaS" | "DevOps & Docker";
  priority: "urgente" | "alta" | "media";
  points: number;
  horasEstimadas: number;
  horasRegistradas: number;
  asignado: {
    nombre: string;
    avatar: string;
  };
  status: TaskStatus;
}

const initialTasks: ProjectTask[] = [
  {
    id: "T-1",
    code: "RW-101",
    title: "Optimización de consultas SQL en reporte de facturación",
    project: "Core API v2",
    priority: "alta",
    points: 5,
    horasEstimadas: 8,
    horasRegistradas: 5.5,
    asignado: { nombre: "Federico M.", avatar: "FM" },
    status: "in_progress",
  },
  {
    id: "T-2",
    code: "RW-102",
    title: "Implementación de Webhooks con reintentos exponenciales",
    project: "Core API v2",
    priority: "urgente",
    points: 8,
    horasEstimadas: 12,
    horasRegistradas: 12,
    asignado: { nombre: "José M.", avatar: "JM" },
    status: "review",
  },
  {
    id: "T-3",
    code: "RW-103",
    title: "Rediseño de componentes de tabla con virtual scrolling",
    project: "Frontend SaaS",
    priority: "media",
    points: 3,
    horasEstimadas: 6,
    horasRegistradas: 0,
    asignado: { nombre: "Laura J.", avatar: "LJ" },
    status: "backlog",
  },
  {
    id: "T-4",
    code: "RW-104",
    title: "Pipeline de CI/CD para despliegues automáticos a Vercel",
    project: "DevOps & Docker",
    priority: "alta",
    points: 5,
    horasEstimadas: 10,
    horasRegistradas: 10,
    asignado: { nombre: "Federico M.", avatar: "FM" },
    status: "done",
  },
  {
    id: "T-5",
    code: "RW-105",
    title: "Migración de autenticación a JWT con Refresh Tokens",
    project: "Core API v2",
    priority: "urgente",
    points: 8,
    horasEstimadas: 14,
    horasRegistradas: 6.2,
    asignado: { nombre: "Federico M.", avatar: "FM" },
    status: "in_progress",
  },
  {
    id: "T-6",
    code: "RW-106",
    title: "Integración de métricas con OpenTelemetry y Grafana",
    project: "DevOps & Docker",
    priority: "media",
    points: 5,
    horasEstimadas: 8,
    horasRegistradas: 0,
    asignado: { nombre: "José M.", avatar: "JM" },
    status: "backlog",
  },
];

export default function RootWorkPage() {
  const [tasks, setTasks] = useState<ProjectTask[]>(initialTasks);
  const [projectFilter, setProjectFilter] = useState<string>("todos");
  const [search, setSearch] = useState("");

  // Live Timer State (Toggl Style)
  const [timerRunning, setTimerRunning] = useState(true);
  const [timerSeconds, setTimerSeconds] = useState(3845); // 01:04:05
  const [activeTaskTimer, setActiveTaskTimer] = useState("RW-101: Optimización de consultas SQL");
  const [hourlyRate, setHourlyRate] = useState(45); // USD / hora

  // Modal Nueva Tarea
  const [modalNewTask, setModalNewTask] = useState(false);
  const [newTitle, setNewTitle] = useState("");
  const [newProject, setNewProject] = useState<ProjectTask["project"]>("Core API v2");
  const [newPriority, setNewPriority] = useState<ProjectTask["priority"]>("media");
  const [newHours, setNewHours] = useState(6);

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    if (timerRunning) {
      interval = setInterval(() => {
        setTimerSeconds(s => s + 1);
      }, 1000);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [timerRunning]);

  const formatTimer = (totalSec: number) => {
    const hrs = Math.floor(totalSec / 3600);
    const mins = Math.floor((totalSec % 3600) / 60);
    const secs = totalSec % 60;
    return `${hrs.toString().padStart(2, "0")}:${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  const moveTask = (taskId: string, targetStatus: TaskStatus) => {
    setTasks(prev =>
      prev.map(t => (t.id === taskId ? { ...t, status: targetStatus } : t))
    );
  };

  const handleCreateTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle) return;
    const newTask: ProjectTask = {
      id: `T-${tasks.length + 1}`,
      code: `RW-${100 + tasks.length + 1}`,
      title: newTitle,
      project: newProject,
      priority: newPriority,
      points: 5,
      horasEstimadas: Number(newHours),
      horasRegistradas: 0,
      asignado: { nombre: "Federico M.", avatar: "FM" },
      status: "backlog",
    };
    setTasks([newTask, ...tasks]);
    setModalNewTask(false);
    setNewTitle("");
  };

  const totalHorasRegistradas = tasks.reduce((acc, t) => acc + t.horasRegistradas, 0);
  const totalFacturable = totalHorasRegistradas * hourlyRate;

  const filteredTasks = tasks.filter(t => {
    const matchProj = projectFilter === "todos" || t.project === projectFilter;
    const matchText = t.title.toLowerCase().includes(search.toLowerCase()) || t.code.toLowerCase().includes(search.toLowerCase());
    return matchProj && matchText;
  });

  return (
    <div className="min-h-screen bg-[#090a0f] text-slate-100 flex flex-col font-sans selection:bg-indigo-500/30 selection:text-indigo-200">
      {/* Top Application Header with Ficha Técnica (5 Puntos) */}
      <DemoSystemHeader project={rootworkProject} />

      {/* Toggl-Style Live Time Tracker Bar */}
      <div className="bg-[#12141e] border-b border-white/[0.08] px-4 sm:px-6 py-2.5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-md">
        <div className="flex items-center gap-3">
          <div className="size-8 rounded-lg bg-indigo-600/20 border border-indigo-500/30 flex items-center justify-center text-indigo-400">
            <Timer className="size-4" />
          </div>
          <div>
            <p className="text-[10px] uppercase font-mono tracking-wider text-slate-500">
              Timer de Tarea en Vivo (Facturable)
            </p>
            <p className="text-xs font-bold text-white truncate max-w-sm">
              {activeTaskTimer}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-4 self-end sm:self-auto">
          {/* Digital Timer */}
          <div className="font-mono text-lg font-bold text-indigo-300 tracking-wider bg-black/40 px-3 py-1 rounded-xl border border-white/[0.06]">
            {formatTimer(timerSeconds)}
          </div>

          <button
            onClick={() => setTimerRunning(!timerRunning)}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl font-mono text-xs font-bold transition ${
              timerRunning
                ? "bg-amber-500/20 text-amber-300 border border-amber-500/40 hover:bg-amber-500/30"
                : "bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 hover:bg-emerald-500/30"
            }`}
          >
            {timerRunning ? <Pause className="size-3.5" /> : <Play className="size-3.5" />}
            <span>{timerRunning ? "Pausar" : "Reanudar"}</span>
          </button>

          <div className="hidden lg:flex items-center gap-2 border-l border-white/[0.08] pl-4 font-mono text-xs">
            <span className="text-slate-500">Total Facturable:</span>
            <span className="font-bold text-emerald-400">${totalFacturable.toFixed(2)} USD</span>
            <span className="text-[10px] text-slate-500">({totalHorasRegistradas.toFixed(1)}h a ${hourlyRate}/h)</span>
          </div>
        </div>
      </div>

      {/* Main Kanban Workspace */}
      <main className="flex-1 p-4 sm:p-6 max-w-7xl mx-auto w-full space-y-6 overflow-x-auto">
        {/* Project Filters & Actions */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-[#11131c] p-3 rounded-2xl border border-white/[0.08]">
          <div className="flex items-center gap-2 overflow-x-auto text-xs font-mono">
            <span className="text-slate-500 text-[11px] mr-1 hidden sm:inline">Proyecto:</span>
            {(["todos", "Core API v2", "Frontend SaaS", "DevOps & Docker"] as const).map(proj => (
              <button
                key={proj}
                onClick={() => setProjectFilter(proj)}
                className={`px-3 py-1.5 rounded-xl transition whitespace-nowrap ${
                  projectFilter === proj
                    ? "bg-indigo-600 text-white font-bold shadow-md shadow-indigo-900/30"
                    : "text-slate-400 hover:text-white hover:bg-white/[0.04]"
                }`}
              >
                {proj === "todos" ? "Todos los Proyectos" : proj}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-2">
            <div className="relative">
              <Search className="absolute left-3 top-2 size-3.5 text-slate-500" />
              <input
                type="text"
                placeholder="Buscar ticket..."
                value={search}
                onChange={e => setSearch(e.target.value)}
                className="bg-[#090a0f] border border-white/[0.08] rounded-xl pl-8 pr-3 py-1.5 text-xs text-white placeholder:text-slate-500 focus:outline-none focus:border-indigo-500 w-36 sm:w-48"
              />
            </div>
            <button
              onClick={() => setModalNewTask(true)}
              className="inline-flex items-center gap-1.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold px-3.5 py-1.5 text-xs shadow-md transition active:scale-95"
            >
              <Plus className="size-3.5" />
              <span>Nueva Tarea</span>
            </button>
          </div>
        </div>

        {/* Linear 4-Column Board */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 items-start">
          {[
            { id: "backlog", label: "Backlog", dot: "bg-slate-500" },
            { id: "in_progress", label: "En Progreso", dot: "bg-indigo-400" },
            { id: "review", label: "En Revisión", dot: "bg-amber-400" },
            { id: "done", label: "Completado", dot: "bg-emerald-400" },
          ].map(col => {
            const colTasks = filteredTasks.filter(t => t.status === col.id);
            return (
              <div
                key={col.id}
                className="rounded-2xl border border-white/[0.08] bg-[#11131c]/80 p-3.5 flex flex-col min-h-[500px]"
              >
                {/* Column Header */}
                <div className="flex items-center justify-between pb-3 border-b border-white/[0.06] mb-3">
                  <div className="flex items-center gap-2">
                    <span className={`size-2 rounded-full ${col.dot}`} />
                    <span className="font-mono text-xs font-bold text-white">{col.label}</span>
                  </div>
                  <span className="font-mono text-[11px] text-slate-500 bg-white/[0.04] px-2 py-0.5 rounded-md">
                    {colTasks.length}
                  </span>
                </div>

                {/* Column Cards */}
                <div className="space-y-3 flex-1">
                  {colTasks.map(task => (
                    <div
                      key={task.id}
                      className="p-3.5 rounded-xl border border-white/[0.08] bg-[#161824] hover:border-indigo-500/40 transition group relative"
                    >
                      <div className="flex items-center justify-between text-[10px] font-mono mb-1.5">
                        <span className="text-indigo-400 font-bold">{task.code}</span>
                        <span
                          className={`px-1.5 py-0.2 rounded font-semibold uppercase ${
                            task.priority === "urgente"
                              ? "bg-rose-500/20 text-rose-400 border border-rose-500/30"
                              : task.priority === "alta"
                              ? "bg-amber-500/20 text-amber-400 border border-amber-500/30"
                              : "bg-blue-500/20 text-blue-400 border border-blue-500/30"
                          }`}
                        >
                          {task.priority}
                        </span>
                      </div>

                      <h4 className="text-xs font-semibold text-slate-200 group-hover:text-white transition">
                        {task.title}
                      </h4>

                      <div className="mt-2.5 flex items-center gap-1.5 text-[10px] font-mono text-slate-400">
                        <span className="px-1.5 py-0.5 rounded bg-white/[0.04] text-slate-300">
                          {task.project}
                        </span>
                        <span>· {task.points} pts</span>
                      </div>

                      {/* Hours tracker progress */}
                      <div className="mt-3 pt-2.5 border-t border-white/[0.06] flex items-center justify-between text-[11px] font-mono">
                        <div className="flex items-center gap-1.5 text-slate-400">
                          <Clock className="size-3 text-indigo-400" />
                          <span>{task.horasRegistradas}h / {task.horasEstimadas}h</span>
                        </div>
                        <div className="size-6 rounded-full bg-indigo-900/60 border border-indigo-700/50 flex items-center justify-center font-bold text-[10px] text-indigo-300">
                          {task.asignado.avatar}
                        </div>
                      </div>

                      {/* Move Column Actions */}
                      <div className="mt-3 pt-2 border-t border-white/[0.04] flex items-center justify-between gap-1 text-[10px] font-mono">
                        {col.id !== "backlog" && (
                          <button
                            onClick={() => {
                              const prevMap: Record<TaskStatus, TaskStatus> = {
                                backlog: "backlog",
                                in_progress: "backlog",
                                review: "in_progress",
                                done: "review",
                              };
                              moveTask(task.id, prevMap[task.status]);
                            }}
                            className="text-slate-500 hover:text-white transition"
                          >
                            ← Anterior
                          </button>
                        )}
                        {col.id !== "done" && (
                          <button
                            onClick={() => {
                              const nextMap: Record<TaskStatus, TaskStatus> = {
                                backlog: "in_progress",
                                in_progress: "review",
                                review: "done",
                                done: "done",
                              };
                              moveTask(task.id, nextMap[task.status]);
                            }}
                            className="ml-auto text-indigo-400 hover:text-indigo-300 font-bold transition"
                          >
                            Avanzar →
                          </button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </main>

      {/* MODAL NUEVA TAREA */}
      <AnimatePresence>
        {modalNewTask && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="w-full max-w-md rounded-3xl border border-white/[0.1] bg-[#12141e] p-6 shadow-2xl relative text-slate-100"
            >
              <button
                onClick={() => setModalNewTask(false)}
                className="absolute top-5 right-5 text-slate-500 hover:text-white p-1"
              >
                <X className="size-5" />
              </button>

              <h3 className="text-base font-bold text-white mb-1">Crear Ticket en RootWork</h3>
              <p className="text-xs text-slate-400 mb-4">
                La tarea se asignará al tablero Kanban para seguimiento de horas.
              </p>

              <form onSubmit={handleCreateTask} className="space-y-3 text-xs">
                <div>
                  <label className="block text-slate-300 mb-1">Título de la Tarea:</label>
                  <input
                    type="text"
                    required
                    value={newTitle}
                    onChange={e => setNewTitle(e.target.value)}
                    placeholder="Ej. Refactorización del controlador de pagos"
                    className="w-full bg-[#090a0f] border border-white/[0.08] rounded-xl px-3 py-2 text-white focus:outline-none focus:border-indigo-500"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-slate-300 mb-1">Proyecto:</label>
                    <select
                      value={newProject}
                      onChange={e => setNewProject(e.target.value as any)}
                      className="w-full bg-[#090a0f] border border-white/[0.08] rounded-xl px-3 py-2 text-white focus:outline-none focus:border-indigo-500"
                    >
                      <option value="Core API v2">Core API v2</option>
                      <option value="Frontend SaaS">Frontend SaaS</option>
                      <option value="DevOps & Docker">DevOps & Docker</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-slate-300 mb-1">Prioridad:</label>
                    <select
                      value={newPriority}
                      onChange={e => setNewPriority(e.target.value as any)}
                      className="w-full bg-[#090a0f] border border-white/[0.08] rounded-xl px-3 py-2 text-white focus:outline-none focus:border-indigo-500"
                    >
                      <option value="media">Media</option>
                      <option value="alta">Alta</option>
                      <option value="urgente">Urgente</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-slate-300 mb-1">Horas Estimadas:</label>
                  <input
                    type="number"
                    value={newHours}
                    onChange={e => setNewHours(Number(e.target.value))}
                    className="w-full bg-[#090a0f] border border-white/[0.08] rounded-xl px-3 py-2 font-mono text-white focus:outline-none focus:border-indigo-500"
                  />
                </div>

                <div className="mt-5 flex justify-end gap-2 pt-2">
                  <button
                    type="button"
                    onClick={() => setModalNewTask(false)}
                    className="px-4 py-2 rounded-xl bg-white/[0.04] text-slate-300 font-semibold hover:bg-white/[0.08] transition"
                  >
                    Cancelar
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold shadow-md transition"
                  >
                    Crear Tarea
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
