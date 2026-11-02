"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowLeft,
  Bot,
  Calendar,
  Check,
  ChevronRight,
  Clock,
  MessageCircle,
  Phone,
  Send,
  User,
  X,
  Zap,
} from "lucide-react";
import Link from "next/link";

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

const services = ["Consulta General", "Seguimiento de Expediente", "Cita con Especialista", "Asesoría Exprés (30 min)"];

function formatTime(date: Date) {
  return date.toLocaleTimeString("es-MX", { hour: "2-digit", minute: "2-digit" });
}

function getBotReply(state: BotState, userInput?: string): { text: string; nextState: BotState } {
  switch (state) {
    case "ask_service":
      return { text: `Perfecto, anotado ✅\n\n¿Me puedes dar tu nombre completo para registrar la cita?`, nextState: "ask_name" };
    case "ask_name":
      return { text: `Hola ${userInput?.split(" ")[0] ?? ""}! 😊\n\nAhora elige el día y hora que mejor te convenga de nuestros horarios disponibles.`, nextState: "ask_date" };
    case "ask_date":
      return { text: `¡Excelente elección! ⏰\n\nTu cita está casi lista. Permíteme confirmar los datos finales.`, nextState: "confirming" };
    default:
      return { text: "Entendido.", nextState: "idle" };
  }
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

export default function WhatsAppBotMvp() {
  const [messages, setMessages] = useState<Message[]>([
    { id: 1, from: "bot", text: "¡Hola! 👋 Bienvenido/a al servicio de citas automático.\n\nSoy el asistente virtual del despacho. Puedo ayudarte a *agendar una cita* sin esperar a un asesor.\n\n¿Cómo te puedo ayudar hoy?", time: "--:--" },
  ]);
  const [botState, setBotState] = useState<BotState>("greeting");
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const [appointment, setAppointment] = useState<{ service?: string; name?: string; day?: string; time?: string }>({});
  const [showSlots, setShowSlots] = useState(false);
  const [selectedDay, setSelectedDay] = useState<string | null>(null);
  const messagesEnd = useRef<HTMLDivElement>(null);

  // Fix initial timestamp after mount (avoids prerender mismatch)
  useEffect(() => {
    setMessages((prev) =>
      prev.map((m) => (m.time === "--:--" ? { ...m, time: formatTime(new Date()) } : m))
    );
  }, []);

  useEffect(() => {
    messagesEnd.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, typing]);

  const addBotMessage = (text: string, delay = 1200) => {
    setTyping(true);
    setTimeout(() => {
      setTyping(false);
      setMessages((prev) => [...prev, { id: Date.now(), from: "bot", text, time: formatTime(new Date()) }]);
    }, delay);
  };

  const addUserMessage = (text: string) => {
    setMessages((prev) => [...prev, { id: Date.now(), from: "user", text, time: formatTime(new Date()) }]);
  };

  const handleQuickReply = (reply: string) => {
    addUserMessage(reply);

    if (reply.includes("asesor") || reply.includes("humano") || reply.includes("Hablar")) {
      setBotState("human_transfer");
      addBotMessage("Perfecto, te estoy transfiriendo con un asesor humano. En breve alguien se pondrá en contacto contigo. 🙏\n\nEl tiempo de espera estimado es de *5–10 minutos*.", 1200);
      return;
    }

    if (reply.includes("Agendar") || reply.includes("disponibilidad")) {
      setBotState("ask_service");
      addBotMessage("¡Claro! Con gusto te ayudo. 😊\n\n¿Qué tipo de servicio necesitas?", 1000);
      return;
    }

    if (botState === "ask_service") {
      setAppointment((a) => ({ ...a, service: reply }));
      const { text, nextState } = getBotReply("ask_service");
      setBotState(nextState);
      addBotMessage(text, 1000);
      return;
    }

    if (botState === "confirming") {
      if (reply.includes("Confirmar")) {
        setBotState("confirmed");
        addBotMessage(`✅ ¡Cita confirmada con éxito!\n\n📋 *Resumen:*\n• Servicio: ${appointment.service}\n• Nombre: ${appointment.name}\n• Fecha: ${appointment.day} a las ${appointment.time}\n\n📧 Recibirás un enlace de Google Calendar en tu correo. ¡Hasta pronto!`, 1400);
      } else if (reply.includes("Cambiar")) {
        setBotState("ask_service");
        setAppointment({});
        addBotMessage("Sin problema, empecemos de nuevo. ¿Qué tipo de servicio necesitas?", 800);
      } else {
        setBotState("idle");
        addBotMessage("Entendido, tu solicitud fue cancelada. Escríbeme cuando quieras agendar. 👋", 800);
      }
    }
  };

  const handleSend = () => {
    if (!input.trim()) return;
    const text = input.trim();
    setInput("");
    addUserMessage(text);

    if (botState === "ask_name") {
      setAppointment((a) => ({ ...a, name: text }));
      const { text: reply, nextState } = getBotReply("ask_name", text);
      setBotState(nextState);
      setTimeout(() => {
        setTyping(true);
        setTimeout(() => {
          setTyping(false);
          setShowSlots(true);
          setMessages((prev) => [...prev, { id: Date.now(), from: "bot", text: reply, time: formatTime(new Date()) }]);
        }, 1200);
      }, 200);
      return;
    }

    addBotMessage("Entendido. ¿En qué más te puedo ayudar?");
  };

  const handleSlotSelect = (day: string, time: string) => {
    setAppointment((a) => ({ ...a, day, time }));
    setShowSlots(false);
    setSelectedDay(null);
    addUserMessage(`${day} a las ${time}`);
    setBotState("confirming");
    addBotMessage(
      `Perfecto, reservaré para ti:\n\n📋 *Resumen de tu cita:*\n• Servicio: *${appointment.service}*\n• Nombre: *${appointment.name}*\n• Fecha: *${day} a las ${time}*\n\n¿Todo correcto?`,
      1300
    );
  };

  const formatMessage = (text: string) => {
    return text.split("\n").map((line, i) => {
      const parts = line.split(/(\*[^*]+\*)/g);
      return (
        <span key={i}>
          {parts.map((p, j) =>
            p.startsWith("*") && p.endsWith("*") ? (
              <strong key={j} className="font-semibold text-white">{p.slice(1, -1)}</strong>
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
    <div className="min-h-screen flex flex-col" style={{ background: "linear-gradient(135deg, #0d1117 0%, #111827 100%)" }}>
      {/* Portafolio back link */}
      <div className="max-w-2xl mx-auto w-full px-4 pt-4">
        <Link href="/" className="flex items-center gap-2 text-sm mb-3" style={{ color: "rgba(255,255,255,0.4)" }}>
          <ArrowLeft size={14} /> Portafolio
        </Link>
      </div>

      {/* Phone frame */}
      <div className="flex-1 flex items-start justify-center px-4 pb-8">
        <div className="w-full max-w-md flex flex-col rounded-3xl overflow-hidden shadow-2xl" style={{ background: "#111b21", border: "1px solid rgba(255,255,255,0.1)", minHeight: "85vh", maxHeight: "90vh" }}>
          {/* WhatsApp Header */}
          <div className="flex items-center gap-3 px-4 py-3" style={{ background: "#202c33", borderBottom: "1px solid rgba(255,255,255,0.08)" }}>
            <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ background: "linear-gradient(135deg, #25d366, #128c7e)" }}>
              <Bot size={20} className="text-white" />
            </div>
            <div className="flex-1">
              <p className="text-white font-semibold text-sm">Asistente de Citas</p>
              <p className="text-xs flex items-center gap-1" style={{ color: "#25d366" }}>
                <span className="w-1.5 h-1.5 rounded-full bg-green-400 inline-block" />
                En línea · Bot 24/7
              </p>
            </div>
            <div className="flex gap-3">
              <Phone size={18} style={{ color: "rgba(255,255,255,0.5)" }} />
              <MessageCircle size={18} style={{ color: "rgba(255,255,255,0.5)" }} />
            </div>
          </div>

          {/* Demo badge */}
          <div className="px-4 py-2 flex items-center gap-2" style={{ background: "rgba(37,211,102,0.08)", borderBottom: "1px solid rgba(37,211,102,0.15)" }}>
            <Zap size={12} style={{ color: "#25d366" }} />
            <p className="text-xs" style={{ color: "#25d366" }}>Simulador del Bot de WhatsApp · MVP Demo</p>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto px-3 py-4 space-y-2" style={{ background: "#0b141a", backgroundImage: "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.02'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")" }}>
            <AnimatePresence initial={false}>
              {messages.map((msg) => (
                <motion.div key={msg.id} initial={{ opacity: 0, y: 10, scale: 0.97 }} animate={{ opacity: 1, y: 0, scale: 1 }} className={`flex ${msg.from === "user" ? "justify-end" : "justify-start"}`}>
                  <div className="max-w-[80%] px-3 py-2 rounded-lg text-sm leading-relaxed relative" style={{ background: msg.from === "user" ? "#005c4b" : "#202c33", color: "#e9edef", borderRadius: msg.from === "user" ? "12px 12px 2px 12px" : "12px 12px 12px 2px" }}>
                    {formatMessage(msg.text)}
                    <div className="flex items-center justify-end gap-1 mt-1">
                      <span className="text-xs" style={{ color: "rgba(255,255,255,0.4)", fontSize: "10px" }}>{msg.time}</span>
                      {msg.from === "user" && <Check size={12} style={{ color: "#53bdeb" }} />}
                    </div>
                  </div>
                </motion.div>
              ))}

              {/* Typing indicator */}
              {typing && (
                <motion.div key="typing" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex justify-start">
                  <div className="px-4 py-3 rounded-lg" style={{ background: "#202c33", borderRadius: "12px 12px 12px 2px" }}>
                    <div className="flex gap-1">
                      {[0, 1, 2].map((i) => (
                        <motion.span key={i} animate={{ y: [0, -4, 0] }} transition={{ repeat: Infinity, duration: 0.8, delay: i * 0.15 }} className="w-2 h-2 rounded-full" style={{ background: "#8696a0" }} />
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Slot picker */}
            {showSlots && (
              <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} className="rounded-xl overflow-hidden" style={{ background: "#202c33", border: "1px solid rgba(255,255,255,0.08)" }}>
                <div className="px-4 py-3" style={{ borderBottom: "1px solid rgba(255,255,255,0.07)" }}>
                  <p className="text-white text-sm font-semibold flex items-center gap-2"><Calendar size={14} style={{ color: "#25d366" }} />Selecciona día y hora</p>
                </div>
                <div className="p-3 space-y-2">
                  {slots.map((slot) => (
                    <div key={slot.day}>
                      <button onClick={() => setSelectedDay(selectedDay === slot.day ? null : slot.day)} className="w-full flex items-center justify-between px-3 py-2 rounded-lg text-left text-sm transition-all" style={{ background: selectedDay === slot.day ? "rgba(37,211,102,0.15)" : "rgba(255,255,255,0.05)", color: selectedDay === slot.day ? "#25d366" : "rgba(255,255,255,0.8)" }}>
                        {slot.day}
                        <ChevronRight size={14} className={`transition-transform ${selectedDay === slot.day ? "rotate-90" : ""}`} />
                      </button>
                      <AnimatePresence>
                        {selectedDay === slot.day && (
                          <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden">
                            <div className="flex flex-wrap gap-2 px-3 py-2">
                              {slot.times.map((t) => (
                                <button key={t} onClick={() => handleSlotSelect(slot.day, t)} className="px-3 py-1.5 rounded-lg text-xs font-semibold transition-all hover:scale-105" style={{ background: "rgba(37,211,102,0.2)", color: "#25d366", border: "1px solid rgba(37,211,102,0.3)" }}>
                                  <Clock size={10} className="inline mr-1" />{t}
                                </button>
                              ))}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}

            <div ref={messagesEnd} />
          </div>

          {/* Quick replies */}
          {quickReplies.length > 0 && (
            <div className="px-3 py-2 flex flex-wrap gap-2" style={{ background: "#111b21", borderTop: "1px solid rgba(255,255,255,0.06)" }}>
              {quickReplies.map((r) => (
                <button key={r} onClick={() => handleQuickReply(r)} className="px-3 py-1.5 rounded-full text-xs transition-all hover:scale-105" style={{ background: "rgba(37,211,102,0.12)", color: "#25d366", border: "1px solid rgba(37,211,102,0.3)" }}>
                  {r}
                </button>
              ))}
            </div>
          )}

          {/* Input */}
          <div className="flex items-center gap-2 px-3 py-2" style={{ background: "#202c33" }}>
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSend()}
              placeholder="Escribe un mensaje..."
              className="flex-1 px-4 py-2 rounded-full text-sm outline-none"
              style={{ background: "#2a3942", color: "#e9edef", border: "none" }}
            />
            <button onClick={handleSend} disabled={!input.trim()} className="w-9 h-9 rounded-full flex items-center justify-center transition-all" style={{ background: input.trim() ? "#25d366" : "rgba(255,255,255,0.1)" }}>
              <Send size={15} style={{ color: input.trim() ? "#fff" : "rgba(255,255,255,0.4)" }} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
