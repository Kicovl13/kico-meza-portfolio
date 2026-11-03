"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Activity,
  ArrowLeft,
  Bot,
  Calendar,
  Check,
  CheckCircle2,
  ChevronRight,
  Clock,
  Cpu,
  Database,
  ExternalLink,
  Flame,
  MessageCircle,
  Phone,
  Radio,
  RefreshCw,
  Send,
  Server,
  ShieldCheck,
  Sparkles,
  User,
  Users,
  Wifi,
  X,
  Zap,
} from "lucide-react";
import Link from "next/link";
import { DemoSystemHeader } from "@/components/demos/demo-system-header";
import { mvcShowcases } from "@/lib/data";

const whatsappProject = mvcShowcases.find((s) => s.id === "bot-whatsapp-citas")!;

interface Message {
  id: number;
  from: "bot" | "user";
  text: string;
  time: string;
}

type BotState =
  | "greeting"
  | "ask_service"
  | "ask_name"
  | "ask_date"
  | "ask_time"
  | "confirming"
  | "confirmed"
  | "human_transfer"
  | "idle";

const slots = [
  { day: "Lunes 4 Nov", times: ["9:00", "10:30", "12:00", "16:00"] },
  { day: "Martes 5 Nov", times: ["9:30", "11:00", "15:30", "17:00"] },
  { day: "Miércoles 6 Nov", times: ["10:00", "12:30", "16:30"] },
  { day: "Jueves 7 Nov", times: ["9:00", "11:30", "14:00", "17:30"] },
];

const services = [
  "Consulta General",
  "Seguimiento de Expediente",
  "Cita con Especialista",
  "Asesoría Exprés (30 min)",
];

const initialBookings = [
  { id: "CIT-801", cliente: "Dra. Andrea Morales", servicio: "Consulta General", fecha: "Hoy 16:30", calSync: "OK", status: "Confirmada" },
  { id: "CIT-802", cliente: "Lic. Carlos Méndez", servicio: "Seguimiento de Expediente", fecha: "Mañana 10:00", calSync: "OK", status: "Confirmada" },
  { id: "CIT-803", cliente: "Ing. Sofía Ramos", servicio: "Asesoría Exprés", fecha: "Jueves 11:30", calSync: "OK", status: "Confirmada" },
];

function formatTime(date: Date) {
  return date.toLocaleTimeString("es-MX", { hour: "2-digit", minute: "2-digit" });
}

const QUICK_REPLIES: Record<BotState, string[]> = {
  greeting: ["📅 Agendar una cita", "🔎 Ver disponibilidad", "👤 Hablar con un asesor"],
  ask_service: services,
  ask_name: [],
  ask_date: [],
  ask_time: [],
  confirming: ["✅ Confirmar cita", "✏️ Cambiar datos", "❌ Cancelar"],
  confirmed: ["📅 Agendar otra cita", "👤 Hablar con un asesor"],
  human_transfer: [],
  idle: ["📅 Agendar una cita"],
};

export default function WhatsAppBotPage() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      from: "bot",
      text: "¡Hola! 👋 Bienvenido/a al servicio de citas automatizado.\n\nSoy el asistente virtual desatendido. Puedo interpretar fechas en español y consultar disponibilidad en *Google Calendar* en tiempo real sin esperas.\n\n¿Cómo te puedo ayudar hoy?",
      time: "--:--",
    },
  ]);
  const [botState, setBotState] = useState<BotState>("greeting");
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const [appointment, setAppointment] = useState<{
    service?: string;
    name?: string;
    day?: string;
    time?: string;
  }>({
    service: "Consulta General",
  });
  const [showSlots, setShowSlots] = useState(false);
  const [selectedDay, setSelectedDay] = useState<string | null>(null);
  const [bookings, setBookings] = useState(initialBookings);

  // Inspector Logs
  const [lastPayload, setLastPayload] = useState<any>({
    event: "messages.upsert",
    type: "notify",
    messageType: "conversation",
    pushName: "Visitante Web",
    senderJid: "5213318928371@s.whatsapp.net",
    nlpIntent: "greeting",
    confidence: 0.99,
  });

  const messagesEnd = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMessages((prev) =>
      prev.map((m) => (m.time === "--:--" ? { ...m, time: formatTime(new Date()) } : m))
    );
  }, []);

  useEffect(() => {
    messagesEnd.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, typing]);

  const addBotMessage = (text: string, delay = 900) => {
    setTyping(true);
    setTimeout(() => {
      setTyping(false);
      setMessages((prev) => [
        ...prev,
        { id: Date.now(), from: "bot", text, time: formatTime(new Date()) },
      ]);
    }, delay);
  };

  const addUserMessage = (text: string) => {
    setMessages((prev) => [
      ...prev,
      { id: Date.now(), from: "user", text, time: formatTime(new Date()) },
    ]);
  };

  const handleQuickReply = (reply: string) => {
    addUserMessage(reply);

    setLastPayload({
      event: "messages.upsert",
      messageType: "interactiveQuickReply",
      text: reply,
      currentState: botState,
      timestamp: new Date().toISOString(),
    });

    if (reply.includes("asesor") || reply.includes("humano") || reply.includes("Hablar")) {
      setBotState("human_transfer");
      addBotMessage(
        "Perfecto, te estoy transfiriendo con un asesor humano. El sistema guardó tu historial y alguien te responderá en breve. 🙏\n\nTiempo estimado: *3 a 5 minutos*.",
        1000
      );
      return;
    }

    if (reply.includes("Agendar") || reply.includes("disponibilidad")) {
      setBotState("ask_service");
      addBotMessage(
        "¡Excelente! Con gusto agendamos tu espacio sin empalmes. 📅\n\n¿Qué tipo de servicio o consulta necesitas?",
        900
      );
      return;
    }

    if (botState === "ask_service") {
      setAppointment((a) => ({ ...a, service: reply }));
      setBotState("ask_name");
      addBotMessage(
        `Anotado: *${reply}* ✅\n\n¿Cuál es tu nombre completo para emitir el boleto de confirmación?`,
        900
      );
      return;
    }

    if (botState === "confirming") {
      if (reply.includes("Confirmar")) {
        setBotState("confirmed");
        const newBooking = {
          id: `CIT-${800 + bookings.length + 1}`,
          cliente: appointment.name || "Usuario WhatsApp",
          servicio: appointment.service || "Consulta General",
          fecha: `${appointment.day || "Hoy"} ${appointment.time || "16:00"}`,
          calSync: "OK",
          status: "Confirmada",
        };
        setBookings([newBooking, ...bookings]);

        setLastPayload({
          event: "calendar.events.insert",
          status: "confirmed",
          eventId: `gcal_${Date.now()}`,
          summary: `${newBooking.servicio} - ${newBooking.cliente}`,
          calendarSynced: true,
          sheetsPersisted: true,
        });

        addBotMessage(
          `🎉 ¡Cita confirmada y sincronizada!\n\n📋 *Resumen final:*\n• Servicio: *${appointment.service}*\n• Titular: *${appointment.name}*\n• Horario: *${appointment.day} a las ${appointment.time}*\n• Evento Google Calendar: *ID #${newBooking.id}*\n\nTe hemos enviado un recordatorio a tu número. ¡Hasta pronto! 👋`,
          1200
        );
      } else if (reply.includes("Cambiar")) {
        setBotState("ask_service");
        addBotMessage("Sin problema. ¿Qué servicio deseas seleccionar?", 800);
      } else {
        setBotState("idle");
        addBotMessage("Proceso cancelado. Si deseas comenzar de nuevo, escribe *Hola*.", 700);
      }
      return;
    }

    if (botState === "confirmed") {
      if (reply.includes("otra")) {
        setAppointment({});
        setBotState("ask_service");
        addBotMessage("¡Con gusto! Elige el servicio para tu nueva cita:", 800);
      } else {
        setBotState("human_transfer");
        addBotMessage("Te comunicamos con un asesor. Espera un momento.", 800);
      }
    }
  };

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const text = input.trim();
    setInput("");
    addUserMessage(text);

    // Update real-time NLP payload inspector
    const isDatePhrase =
      text.toLowerCase().includes("mañana") ||
      text.toLowerCase().includes("hoy") ||
      text.toLowerCase().includes("jueves") ||
      text.toLowerCase().includes("viernes") ||
      text.toLowerCase().includes("pm") ||
      text.toLowerCase().includes("am");

    setLastPayload({
      event: "messages.upsert",
      messageType: "conversation",
      text,
      nlpExtracted: isDatePhrase
        ? { entity: "DATE_TIME", parsedString: text, library: "chrono-node/es" }
        : null,
      timestamp: new Date().toISOString(),
    });

    if (text.toLowerCase().includes("asesor") || text.toLowerCase().includes("humano")) {
      setBotState("human_transfer");
      addBotMessage(
        "Te he transferido con un asesor humano. El bot pausó el flujo para no interrumpir tu atención. 🙏",
        1000
      );
      return;
    }

    if (botState === "ask_name") {
      setAppointment((a) => ({ ...a, name: text }));
      setBotState("ask_date");
      addBotMessage(
        `¡Mucho gusto, *${text.split(" ")[0]}*! 👋\n\nAquí tienes nuestros horarios disponibles sin colisión en Google Calendar. Selecciona el que mejor se adapte:`,
        900
      );
      setShowSlots(true);
      return;
    }

    // Natural Language fallback
    if (botState === "greeting" || botState === "idle") {
      setBotState("ask_service");
      addBotMessage(
        "¡Hola! He detectado tu mensaje. Por favor selecciona el tipo de servicio que requieres:",
        800
      );
      return;
    }

    addBotMessage(
      "He recibido tu mensaje. Por favor utiliza los botones interactivos para continuar con la agenda o escribe *asesor* si requieres ayuda personalizada.",
      1000
    );
  };

  const handleSelectSlot = (day: string, time: string) => {
    setShowSlots(false);
    setAppointment((a) => ({ ...a, day, time }));
    addUserMessage(`${day} a las ${time}`);
    setBotState("confirming");

    setLastPayload({
      event: "calendar.freebusy.query",
      slotQueried: `${day} ${time}`,
      isAvailable: true,
      timeZone: "America/Mexico_City",
    });

    addBotMessage(
      `Verificando espacio en Google Calendar... ⏳\n\n✅ Horario *${time}* disponible para el *${day}*.\n\n📋 *Resumen:*\n• Servicio: *${appointment.service}*\n• Nombre: *${appointment.name}*\n• Cita: *${day} — ${time}*\n\n¿Deseas confirmar la cita?`,
      1100
    );
  };

  const formatMessage = (text: string) => {
    return text.split("\n").map((line, i) => {
      const parts = line.split(/(\*[^*]+\*)/g);
      return (
        <span key={i}>
          {parts.map((p, j) =>
            p.startsWith("*") && p.endsWith("*") ? (
              <strong key={j} className="font-semibold text-white">
                {p.slice(1, -1)}
              </strong>
            ) : (
              <span key={j}>{p}</span>
            )
          )}
          {i < text.split("\n").length - 1 && <br />}
        </span>
      );
    });
  };

  const quickReplies = QUICK_REPLIES[botState] ?? [];

  return (
    <div className="min-h-screen bg-[#070d10] text-[#e9edef] flex flex-col font-sans selection:bg-emerald-500/30 selection:text-emerald-200">
      {/* Top Application Header with Ficha Técnica (5 Puntos) */}
      <DemoSystemHeader project={whatsappProject} />

      {/* Main Studio Viewport */}
      <div className="flex-1 flex flex-col lg:flex-row overflow-hidden max-w-7xl mx-auto w-full p-3 sm:p-6 gap-6">
        {/* Left Side: Realistic WhatsApp Phone / Web Simulator */}
        <div className="flex-1 flex flex-col items-center justify-center">
          <div className="w-full max-w-md bg-[#111b21] rounded-3xl border border-white/[0.12] shadow-2xl overflow-hidden flex flex-col h-[650px] sm:h-[720px]">
            {/* WhatsApp Contact Header */}
            <div className="flex items-center gap-3 px-4 py-3 bg-[#202c33] border-b border-white/[0.08]">
              <div className="size-10 rounded-full bg-gradient-to-br from-emerald-500 to-teal-700 flex items-center justify-center text-white shadow-md">
                <Bot size={20} />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-white font-semibold text-sm truncate">Asistente de Citas</p>
                <p className="text-xs flex items-center gap-1.5 text-emerald-400 font-mono">
                  <span className="size-2 rounded-full bg-emerald-400 animate-pulse" />
                  <span>En línea · Bot 24/7 NLP</span>
                </p>
              </div>
              <div className="flex items-center gap-3 text-white/50">
                <Phone size={17} />
                <MessageCircle size={17} />
              </div>
            </div>

            {/* Chat Body */}
            <div
              className="flex-1 overflow-y-auto p-4 space-y-2.5 bg-[#0b141a]"
              style={{
                backgroundImage:
                  "radial-gradient(circle at center, rgba(255,255,255,0.03) 1px, transparent 1px)",
                backgroundSize: "20px 20px",
              }}
            >
              <AnimatePresence initial={false}>
                {messages.map((msg) => (
                  <motion.div
                    key={msg.id}
                    initial={{ opacity: 0, y: 10, scale: 0.98 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    className={`flex ${msg.from === "user" ? "justify-end" : "justify-start"}`}
                  >
                    <div
                      className={`max-w-[85%] px-3.5 py-2.5 text-xs sm:text-sm leading-relaxed relative rounded-2xl ${
                        msg.from === "user"
                          ? "bg-[#005c4b] text-[#e9edef] rounded-br-xs"
                          : "bg-[#202c33] text-[#e9edef] rounded-bl-xs shadow-md border border-white/[0.04]"
                      }`}
                    >
                      {formatMessage(msg.text)}
                      <div className="flex items-center justify-end gap-1 mt-1 text-[10px] text-white/40 font-mono">
                        <span>{msg.time}</span>
                        {msg.from === "user" && <Check size={12} className="text-[#53bdeb]" />}
                      </div>
                    </div>
                  </motion.div>
                ))}

                {/* Typing Indicator */}
                {typing && (
                  <motion.div
                    key="typing"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="flex justify-start"
                  >
                    <div className="px-4 py-2.5 rounded-2xl bg-[#202c33] rounded-bl-xs flex items-center gap-1.5 text-xs text-white/60">
                      <span className="size-1.5 rounded-full bg-emerald-400 animate-bounce" />
                      <span
                        className="size-1.5 rounded-full bg-emerald-400 animate-bounce"
                        style={{ animationDelay: "150ms" }}
                      />
                      <span
                        className="size-1.5 rounded-full bg-emerald-400 animate-bounce"
                        style={{ animationDelay: "300ms" }}
                      />
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Slot Picker Component */}
              {showSlots && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="rounded-2xl border border-emerald-500/30 bg-[#182229] p-3 space-y-2 text-xs"
                >
                  <p className="font-semibold text-emerald-300 flex items-center gap-1.5">
                    <Calendar size={14} />
                    <span>Selecciona tu día y horario disponible:</span>
                  </p>
                  <div className="grid grid-cols-2 gap-1.5">
                    {slots.map((s) => (
                      <button
                        key={s.day}
                        type="button"
                        onClick={() => setSelectedDay(s.day)}
                        className={`p-2 rounded-xl text-left border text-[11px] transition ${
                          selectedDay === s.day
                            ? "bg-emerald-600/30 border-emerald-500 text-white font-bold"
                            : "bg-[#202c33] border-white/[0.08] text-white/80 hover:bg-[#2a3942]"
                        }`}
                      >
                        {s.day}
                      </button>
                    ))}
                  </div>

                  {selectedDay && (
                    <div className="pt-2 border-t border-white/[0.08]">
                      <p className="text-[11px] text-white/60 mb-1.5">Horas disponibles para {selectedDay}:</p>
                      <div className="flex flex-wrap gap-1.5">
                        {slots
                          .find((s) => s.day === selectedDay)
                          ?.times.map((t) => (
                            <button
                              key={t}
                              type="button"
                              onClick={() => handleSelectSlot(selectedDay, t)}
                              className="px-2.5 py-1 rounded-lg bg-emerald-500 text-white font-bold text-xs hover:bg-emerald-400 transition cursor-pointer"
                            >
                              {t} hrs
                            </button>
                          ))}
                      </div>
                    </div>
                  )}
                </motion.div>
              )}

              <div ref={messagesEnd} />
            </div>

            {/* Quick Replies Bar */}
            {quickReplies.length > 0 && (
              <div className="p-2.5 bg-[#182229] border-t border-white/[0.06] flex flex-wrap gap-1.5 max-h-28 overflow-y-auto">
                {quickReplies.map((r) => (
                  <button
                    key={r}
                    type="button"
                    onClick={() => handleQuickReply(r)}
                    className="px-3 py-1.5 rounded-full text-xs font-medium bg-[#202c33] text-emerald-300 border border-emerald-500/30 hover:bg-emerald-500/20 hover:text-white transition cursor-pointer"
                  >
                    {r}
                  </button>
                ))}
              </div>
            )}

            {/* Input Bar */}
            <form
              onSubmit={handleSend}
              className="p-3 bg-[#202c33] border-t border-white/[0.08] flex items-center gap-2"
            >
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Escribe un mensaje o fecha..."
                className="flex-1 bg-[#2a3942] border-none rounded-xl px-4 py-2.5 text-xs sm:text-sm text-white placeholder-white/40 focus:outline-none focus:ring-1 focus:ring-emerald-500"
              />
              <button
                type="submit"
                disabled={!input.trim()}
                className="size-9 rounded-xl bg-emerald-500 flex items-center justify-center text-white disabled:opacity-40 hover:bg-emerald-400 transition"
              >
                <Send size={15} />
              </button>
            </form>
          </div>
        </div>

        {/* Right Side: Cloud Studio, Architecture & Live Event Inspector */}
        <div className="w-full lg:w-96 flex flex-col gap-4">
          {/* Engine Status Grid */}
          <div className="rounded-2xl border border-white/[0.1] bg-[#111b21] p-4">
            <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-[#9a9aa2] mb-3 flex items-center justify-between">
              <span>Estado del Motor Cloud</span>
              <span className="flex items-center gap-1.5 text-emerald-400 text-[10px]">
                <span className="size-1.5 rounded-full bg-emerald-400 animate-ping" />
                Live
              </span>
            </h3>

            <div className="grid grid-cols-2 gap-2 text-xs font-mono">
              <div className="p-2.5 rounded-xl border border-white/[0.06] bg-black/40">
                <span className="text-[10px] text-white/50 block">Socket WhatsApp</span>
                <span className="text-emerald-400 font-bold">Baileys v6.7 ✓</span>
              </div>
              <div className="p-2.5 rounded-xl border border-white/[0.06] bg-black/40">
                <span className="text-[10px] text-white/50 block">Parser NLP</span>
                <span className="text-sky-400 font-bold">chrono-node (ES)</span>
              </div>
              <div className="p-2.5 rounded-xl border border-white/[0.06] bg-black/40">
                <span className="text-[10px] text-white/50 block">Sincronización</span>
                <span className="text-amber-400 font-bold">Google Calendar</span>
              </div>
              <div className="p-2.5 rounded-xl border border-white/[0.06] bg-black/40">
                <span className="text-[10px] text-white/50 block">Latencia Media</span>
                <span className="text-emerald-400 font-bold">38 ms</span>
              </div>
            </div>
          </div>

          {/* Real-time Socket & NLP Payload Inspector */}
          <div className="rounded-2xl border border-white/[0.1] bg-[#111b21] p-4 flex-1 flex flex-col min-h-[220px]">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-sky-400 flex items-center gap-1.5">
                <Cpu size={14} />
                <span>Payload Inspector (JSON)</span>
              </span>
              <span className="text-[10px] font-mono text-white/40">Webhooks v2</span>
            </div>

            <pre className="flex-1 p-3 rounded-xl bg-black/60 border border-white/[0.06] text-[11px] font-mono text-emerald-400 overflow-x-auto max-h-48 scrollbar-thin">
              {JSON.stringify(lastPayload, null, 2)}
            </pre>
          </div>

          {/* Bookings Sincronizadas Table (Datos Ficticios Creíbles) */}
          <div className="rounded-2xl border border-white/[0.1] bg-[#111b21] p-4">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#9a9aa2] flex items-center gap-1.5">
                <Calendar size={14} />
                <span>Citas Agendadas Hoy ({bookings.length})</span>
              </span>
              <span className="text-[10px] font-mono text-emerald-400">Google Calendar Sync</span>
            </div>

            <div className="space-y-2">
              {bookings.slice(0, 3).map((b) => (
                <div
                  key={b.id}
                  className="p-2.5 rounded-xl border border-white/[0.06] bg-black/30 flex items-center justify-between text-xs"
                >
                  <div>
                    <p className="font-semibold text-white truncate max-w-[140px]">{b.cliente}</p>
                    <p className="text-[10px] text-white/50">{b.servicio}</p>
                  </div>
                  <div className="text-right font-mono">
                    <span className="text-[11px] text-emerald-400 block font-bold">{b.fecha}</span>
                    <span className="text-[9px] text-white/40">ID: {b.id}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
