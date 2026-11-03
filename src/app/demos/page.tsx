"use client";

import { motion } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  Building2,
  ExternalLink,
  Landmark,
  LayoutGrid,
  MessageCircle,
  Scale,
  Sparkles,
  Users,
  Zap,
} from "lucide-react";
import Link from "next/link";

const demos = [
  {
    id: "cobranza",
    href: "/demos/cobranza",
    icon: Landmark,
    color: "#10b981",
    border: "rgba(16,185,129,0.3)",
    label: "Cobranza B2B · Conciliación PPD/REP",
    category: "Fintech & Fiscal SAT",
    description:
      "SaaS de cuentas por cobrar, conciliación de depósitos bancarios SPEI con facturas PPD y timbrado automático de complementos REP.",
    features: ["Conciliación PPD / REP", "Match de depósitos SPEI", "Semáforo de mora"],
    stack: ["Laravel 13", "Livewire 4", "MySQL 8.4"],
  },
  {
    id: "sysadmin",
    href: "/demos/sysadmin",
    icon: Users,
    color: "#22c55e",
    border: "rgba(34,197,94,0.3)",
    label: "SysAdministrador · CRM/ERP",
    category: "CRM & ERP",
    description:
      "Sistema integral con módulos de clientes, empleados, nómina con cálculo IMSS/ISR, facturación y bitácora de auditoría.",
    features: ["CRUD de clientes", "Cálculo nómina IMSS/ISR", "Bitácora de auditoría"],
    stack: ["PHP", "Laravel", "MySQL"],
  },
  {
    id: "leex",
    href: "/demos/leex",
    icon: Building2,
    color: "#f97316",
    border: "rgba(249,115,22,0.3)",
    label: "Leex SaaS · Arrendamiento",
    category: "PropTech & SaaS",
    description:
      "Administración de propiedades en arrendamiento: contratos, pagos con validación de comprobantes y solicitudes de mantenimiento.",
    features: ["Mapa de unidades", "Validación pagos 1-clic", "Solicitudes mantenimiento"],
    stack: ["Laravel", "Livewire", "Tailwind CSS"],
  },
  {
    id: "legalflow",
    href: "/demos/legalflow",
    icon: Scale,
    color: "#a855f7",
    border: "rgba(168,85,247,0.3)",
    label: "LegalFlow · Expedientes",
    category: "LegalTech",
    description:
      "Sistema de gestión para despachos jurídicos. Términos procesales con cuenta regresiva, audiencias y acuerdos judiciales.",
    features: ["Términos con countdown", "Semáforo de urgencias", "Historial de acuerdos"],
    stack: ["Angular 20", "Ionic 8", "TypeScript"],
  },
  {
    id: "rootwork",
    href: "/demos/rootwork",
    icon: LayoutGrid,
    color: "#60a5fa",
    border: "rgba(96,165,250,0.3)",
    label: "RootWork · Project Manager",
    category: "Project Management",
    description:
      "Tablero Kanban drag-and-drop, seguimiento de tiempo con timer en vivo, presupuesto por proyecto y facturación de horas.",
    features: ["Kanban drag-and-drop", "Timer en vivo", "Facturación de horas"],
    stack: ["Node.js", "TypeScript", "Angular"],
  },
  {
    id: "whatsapp-bot",
    href: "/demos/whatsapp-bot",
    icon: MessageCircle,
    color: "#25d366",
    border: "rgba(37,211,102,0.3)",
    label: "Bot de Citas · WhatsApp",
    category: "Automatización",
    description:
      "Simulador del bot conversacional que agenda citas sin intervención humana. NLP para fechas y slots de disponibilidad.",
    features: ["Flujo conversacional", "Slots de disponibilidad", "Transferencia a asesor"],
    stack: ["Node.js", "Baileys", "Google Calendar API"],
  },
];

export default function DemosIndex() {
  return (
    <div
      className="min-h-screen"
      style={{
        background:
          "linear-gradient(135deg, #0a0f1e 0%, #0f172a 50%, #0c1220 100%)",
      }}
    >
      {/* Header */}
      <header
        className="sticky top-0 z-50"
        style={{
          background: "rgba(10,15,30,0.95)",
          borderBottom: "1px solid rgba(255,255,255,0.07)",
          backdropFilter: "blur(16px)",
        }}
      >
        <div className="max-w-5xl mx-auto px-4 py-3 flex items-center gap-4">
          <Link
            href="/"
            className="flex items-center gap-2 text-sm"
            style={{ color: "rgba(255,255,255,0.5)" }}
          >
            <ArrowLeft size={16} />
            Portafolio
          </Link>
          <div className="h-4 w-px" style={{ background: "rgba(255,255,255,0.15)" }} />
          <div className="flex items-center gap-2">
            <Sparkles size={14} style={{ color: "#60a5fa" }} />
            <span className="text-white font-semibold text-sm">Demos Interactivos</span>
          </div>
        </div>
      </header>

      <div className="max-w-5xl mx-auto px-4 py-12">
        {/* Hero */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-14"
        >
          <div
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full mb-5 text-xs font-medium"
            style={{
              background: "rgba(96,165,250,0.12)",
              color: "#60a5fa",
              border: "1px solid rgba(96,165,250,0.25)",
            }}
          >
            <Zap size={11} />
            Plataformas en Vivo · Demostraciones Interactivas
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-white mb-4 tracking-tight">
            Sistemas Empresariales en
            <span
              className="ml-3"
              style={{
                background: "linear-gradient(135deg, #60a5fa, #a855f7)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              Acción
            </span>
          </h1>
          <p
            className="text-base sm:text-lg max-w-2xl mx-auto leading-relaxed"
            style={{ color: "rgba(255,255,255,0.65)" }}
          >
            Demostraciones interactivas de sistemas desarrollados y llevados a producción. Cada plataforma
            permite interactuar con los flujos de negocio, reglas fiscales y paneles de control operativos.
          </p>
        </motion.div>

        {/* Demo cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {demos.map((demo, i) => (
            <motion.div
              key={demo.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
            >
              <Link href={demo.href} className="block group h-full">
                <motion.div
                  whileHover={{ y: -6, scale: 1.01 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  className="h-full rounded-2xl p-6 flex flex-col relative overflow-hidden"
                  style={{
                    background: "rgba(255,255,255,0.04)",
                    border: `1px solid ${demo.border}`,
                  }}
                >
                  {/* Glow bg */}
                  <div
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                    style={{
                      background: `radial-gradient(ellipse at top left, ${demo.color}15, transparent 70%)`,
                    }}
                  />

                  {/* Category */}
                  <div className="flex items-center justify-between mb-5 relative z-10">
                    <span
                      className="text-xs px-2.5 py-1 rounded-full font-medium"
                      style={{
                        background: `${demo.color}18`,
                        color: demo.color,
                        border: `1px solid ${demo.color}33`,
                      }}
                    >
                      {demo.category}
                    </span>
                    <ExternalLink
                      size={14}
                      className="opacity-0 group-hover:opacity-100 transition-opacity"
                      style={{ color: demo.color }}
                    />
                  </div>

                  {/* Icon */}
                  <div
                    className="w-14 h-14 rounded-2xl flex items-center justify-center mb-5 relative z-10"
                    style={{
                      background: `${demo.color}18`,
                      border: `1px solid ${demo.color}33`,
                    }}
                  >
                    <demo.icon size={26} style={{ color: demo.color }} />
                  </div>

                  {/* Content */}
                  <h2 className="text-white font-bold text-lg mb-2 relative z-10">
                    {demo.label}
                  </h2>
                  <p
                    className="text-sm flex-1 mb-5 leading-relaxed relative z-10"
                    style={{ color: "rgba(255,255,255,0.55)" }}
                  >
                    {demo.description}
                  </p>

                  {/* Features */}
                  <div className="space-y-1.5 mb-5 relative z-10">
                    {demo.features.map((f) => (
                      <div key={f} className="flex items-center gap-2">
                        <div
                          className="w-1.5 h-1.5 rounded-full flex-shrink-0"
                          style={{ background: demo.color }}
                        />
                        <p className="text-xs" style={{ color: "rgba(255,255,255,0.5)" }}>
                          {f}
                        </p>
                      </div>
                    ))}
                  </div>

                  {/* Stack tags */}
                  <div className="flex flex-wrap gap-1.5 mb-5 relative z-10">
                    {demo.stack.map((s) => (
                      <span
                        key={s}
                        className="text-xs px-2 py-0.5 rounded-md"
                        style={{
                          background: "rgba(255,255,255,0.07)",
                          color: "rgba(255,255,255,0.5)",
                          border: "1px solid rgba(255,255,255,0.1)",
                        }}
                      >
                        {s}
                      </span>
                    ))}
                  </div>

                  {/* CTA */}
                  <div
                    className="flex items-center gap-2 text-sm font-semibold relative z-10 group-hover:gap-3 transition-all"
                    style={{ color: demo.color }}
                  >
                    Abrir Demo <ArrowRight size={15} />
                  </div>
                </motion.div>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* Footer note */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-center mt-12 text-sm"
          style={{ color: "rgba(255,255,255,0.25)" }}
        >
          Todos los demos son funcionales con datos de muestra · Sin backend real necesario
        </motion.p>
      </div>
    </div>
  );
}
