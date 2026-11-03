"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowRight,
  Bot,
  Briefcase,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  Code2,
  Compass,
  Layers,
  Mail,
  RotateCcw,
  Send,
  Sparkles,
  X,
} from "lucide-react";
import { site } from "@/lib/data";

interface TourStep {
  id: string;
  targetId: string;
  badge: string;
  navLabel: string;
  title: string;
  description: string;
  highlights: string[];
  ctaLabel?: string;
  icon: typeof Sparkles;
}

const tourSteps: TourStep[] = [
  {
    id: "hero",
    targetId: "top",
    badge: "Paso 1 de 5 · Inicio",
    navLabel: "Inicio",
    title: "¡Hola! Te presento a Federico Meza",
    description:
      "Federico es Ingeniero en Sistemas Full Stack especializado en llevar plataformas críticas, CRMs y APIs a producción. Cuenta con más de 7 años de experiencia construyendo arquitectura sólida.",
    highlights: [
      "📍 Zapopan, Jalisco",
      "🚀 Enfoque en sistemas de negocio escalables",
      "💼 Liderazgo de equipos técnicos",
    ],
    ctaLabel: "Ver stack tecnológico",
    icon: Sparkles,
  },
  {
    id: "stack",
    targetId: "stack",
    badge: "Paso 2 de 5 · Stack",
    navLabel: "Stack",
    title: "Capacidades y Stack Tecnológico",
    description:
      "Su fortaleza combina desarrollo backend con Laravel, Node.js y TypeScript, interfaces web con Angular y Tailwind CSS, gestión de bases de datos (MySQL, Oracle) y despliegue reproducible en Docker.",
    highlights: [
      "Backend: Laravel, Node.js, Express, Python",
      "Frontend: Angular, TypeScript, Tailwind",
      "Infraestructura: Docker, APIs REST, SQL",
    ],
    ctaLabel: "Explorar proyectos",
    icon: Code2,
  },
  {
    id: "projects",
    targetId: "projects",
    badge: "Paso 3 de 5 · Proyectos",
    navLabel: "Proyectos",
    title: "Sistemas en Operación Real",
    description:
      "Federico ha liderado el sistema integral para 26 Grados (administración, finanzas y apps móviles), migraciones complejas desde Informix 4GL a web moderna sin parar operaciones, y aplicaciones modulares en Start.",
    highlights: [
      "Plataforma completa de 26 Grados",
      "Migración de CRM masivo con nómina y pagos",
      "Arquitecturas modulares para Start",
    ],
    ctaLabel: "Ver trayectoria",
    icon: Layers,
  },
  {
    id: "experience",
    targetId: "experience",
    badge: "Paso 4 de 5 · Experiencia",
    navLabel: "Experiencia",
    title: "Trayectoria y Liderazgo",
    description:
      "De desarrollador a Gerente del Área de Sistemas. Ha dirigido equipos multidisciplinarios de desarrollo, planificado arquitecturas y cuenta con certificación en Ciberseguridad otorgada por Google.",
    highlights: [
      "Gerente de Sistemas en 26 Grados (3+ años)",
      "Full Stack Developer en Start",
      "Certificación en Ciberseguridad por Google",
    ],
    ctaLabel: "Conectar con Federico",
    icon: Briefcase,
  },
  {
    id: "contact",
    targetId: "contact",
    badge: "Paso 5 de 5 · Final",
    navLabel: "Contacto",
    title: "¿Construimos algo juntos?",
    description:
      "Federico está disponible para oportunidades de tiempo completo (Full Stack / Backend) y consultoría en proyectos de software. Escríbele directo para agendar una llamada o conversar sobre tu proyecto.",
    highlights: [
      `✉️ ${site.email}`,
      `📞 ${site.phone}`,
      "📍 Modalidad remota o híbrida",
    ],
    ctaLabel: "Enviar mensaje directo",
    icon: Mail,
  },
];

interface ChatMessage {
  id: string;
  role: "assistant" | "user";
  content: string;
  actionTarget?: string;
  actionLabel?: string;
}

const suggestedPrompts = [
  "¿Cuáles son sus proyectos principales?",
  "¿Qué tecnologías domina más?",
  "¿Ha liderado equipos de desarrollo?",
  "¿Cómo puedo contactarlo o agendar?",
];

const targetSectionNames: Record<string, string> = {
  top: "Inicio",
  stack: "Stack Tecnológico",
  projects: "Proyectos",
  experience: "Experiencia",
  contact: "Contacto",
};

export function PortfolioGuideBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [showInvite, setShowInvite] = useState(false);
  const [activeTab, setActiveTab] = useState<"tour" | "chat">("tour");
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const msgCounterRef = useRef(1);

  // Chat State
  const [chatInput, setChatInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "initial-msg",
      role: "assistant",
      content:
        "¡Hola! Soy KicoBot, el asistente con IA de Federico Meza. Puedes preguntarme con total libertad sobre su experiencia, proyectos, stack técnico o cómo coordinar una entrevista. ¡Incluso puedo llevarte directamente a las secciones de la página!",
    },
  ]);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const botRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Proactive subtle invite after 3.5 seconds
  useEffect(() => {
    const hasSeenInvite = sessionStorage.getItem("kico_tour_dismissed");
    if (hasSeenInvite) return;

    const timer = setTimeout(() => {
      setShowInvite(true);
    }, 3500);

    return () => clearTimeout(timer);
  }, []);

  // Auto scroll chat to bottom
  useEffect(() => {
    if (activeTab === "chat") {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, activeTab, isLoading]);

  // Focus input when switching to chat
  useEffect(() => {
    if (isOpen && activeTab === "chat") {
      setTimeout(() => inputRef.current?.focus(), 150);
    }
  }, [isOpen, activeTab]);

  // Highlight and scroll to active section
  const highlightSection = (targetId: string) => {
    document.querySelectorAll(".tour-highlight").forEach((el) => {
      el.classList.remove("tour-highlight");
    });

    const cleanId = targetId.replace("#", "");
    const element = document.getElementById(cleanId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
      element.classList.add("tour-highlight");
    }
  };

  // Close cleanup
  const handleClose = () => {
    setIsOpen(false);
    setShowInvite(false);
    sessionStorage.setItem("kico_tour_dismissed", "true");
    document.querySelectorAll(".tour-highlight").forEach((el) => {
      el.classList.remove("tour-highlight");
    });
  };

  const handleStartTour = (step = 0) => {
    setShowInvite(false);
    setIsOpen(true);
    setActiveTab("tour");
    setCurrentStepIndex(step);
    highlightSection(tourSteps[step].targetId);
  };

  const handleNextStep = () => {
    if (currentStepIndex < tourSteps.length - 1) {
      const nextIndex = currentStepIndex + 1;
      setCurrentStepIndex(nextIndex);
      highlightSection(tourSteps[nextIndex].targetId);
    } else {
      highlightSection("contact");
    }
  };

  const handlePrevStep = () => {
    if (currentStepIndex > 0) {
      const prevIndex = currentStepIndex - 1;
      setCurrentStepIndex(prevIndex);
      highlightSection(tourSteps[prevIndex].targetId);
    }
  };

  const handleJumpToStep = (index: number) => {
    setCurrentStepIndex(index);
    highlightSection(tourSteps[index].targetId);
  };

  // Send message to AI endpoint
  const handleSendMessage = async (textToSend?: string) => {
    const text = (textToSend ?? chatInput).trim();
    if (!text || isLoading) return;

    msgCounterRef.current += 1;
    const userMessage: ChatMessage = {
      id: `user-${msgCounterRef.current}`,
      role: "user",
      content: text,
    };

    const newMessages = [...messages, userMessage];
    setMessages(newMessages);
    setChatInput("");
    setIsLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: newMessages.map((m) => ({
            role: m.role,
            content: m.content,
          })),
        }),
      });

      const data = await res.json();
      const rawReply: string = data.reply || "";

      // Check for navigation action tags like [ACTION:NAVIGATE:#projects]
      const actionMatch = rawReply.match(/\[ACTION:NAVIGATE:(#[a-z0-9_-]+)\]/i);
      const cleanReply = rawReply.replace(/\[ACTION:NAVIGATE:#[a-z0-9_-]+\]/gi, "").trim();

      let targetId: string | undefined;
      let targetLabel: string | undefined;

      if (actionMatch && actionMatch[1]) {
        targetId = actionMatch[1].replace("#", "");
        targetLabel = targetSectionNames[targetId] || targetId;
        highlightSection(targetId);
      }

      msgCounterRef.current += 1;
      const botMessage: ChatMessage = {
        id: `bot-${msgCounterRef.current}`,
        role: "assistant",
        content: cleanReply,
        actionTarget: targetId,
        actionLabel: targetLabel,
      };

      setMessages((prev) => [...prev, botMessage]);
    } catch (err) {
      console.error("Error al consultar KicoBot:", err);
      msgCounterRef.current += 1;
      setMessages((prev) => [
        ...prev,
        {
          id: `bot-${msgCounterRef.current}`,
          role: "assistant",
          content:
            "Disculpa, hubo un detalle de conexión. Puedes contactar a Federico directamente por correo a " +
            site.email,
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const currentStep = tourSteps[currentStepIndex];
  const StepIcon = currentStep.icon;
  const progressPercent = ((currentStepIndex + 1) / tourSteps.length) * 100;

  return (
    <>
      {/* Proactive Floating Invite Bubble */}
      <AnimatePresence>
        {showInvite && !isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 16, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.95 }}
            transition={{ duration: 0.35 }}
            className="fixed bottom-20 sm:bottom-24 right-3 sm:right-7 z-50 w-[calc(100vw-1.5rem)] max-w-[340px] rounded-2xl border border-primary/30 bg-card/95 p-4 shadow-2xl backdrop-blur-xl"
          >
            <div className="flex items-start justify-between gap-2">
              <div className="flex items-center gap-2">
                <span className="flex size-7 items-center justify-center rounded-lg border border-primary/30 bg-primary/10 text-primary">
                  <Bot className="size-4" />
                </span>
                <div>
                  <p className="font-mono text-[11px] font-semibold text-primary">
                    KicoBot · IA
                  </p>
                  <p className="text-xs text-muted-foreground">En línea</p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => {
                  setShowInvite(false);
                  sessionStorage.setItem("kico_tour_dismissed", "true");
                }}
                className="text-muted-foreground transition-colors hover:text-foreground"
                aria-label="Cerrar invitación"
              >
                <X className="size-4" />
              </button>
            </div>
            <p className="mt-2.5 text-xs leading-relaxed text-foreground/90">
              ¡Hola! 👋 Soy KicoBot. ¿Quieres un recorrido guiado o preguntarme cualquier duda sobre Federico Meza?
            </p>
            <div className="mt-3 flex items-center gap-2">
              <button
                type="button"
                onClick={() => handleStartTour(0)}
                className="inline-flex flex-1 items-center justify-center gap-1.5 rounded-lg bg-primary px-3 py-1.5 text-xs font-semibold text-primary-foreground shadow-sm transition-transform hover:scale-[1.02] active:scale-[0.98]"
              >
                <Sparkles className="size-3.5" />
                Comenzar tour
              </button>
              <button
                type="button"
                onClick={() => {
                  setShowInvite(false);
                  setIsOpen(true);
                  setActiveTab("chat");
                }}
                className="rounded-lg border border-border/80 px-2.5 py-1.5 text-xs text-foreground transition-colors hover:bg-muted"
              >
                Preguntar con IA
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Panel (Tour + Live AI Chat) */}
      <AnimatePresence>
        {isOpen && (
          <motion.aside
            ref={botRef}
            initial={{ opacity: 0, y: 24, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.96 }}
            transition={{ type: "spring", damping: 25, stiffness: 280 }}
            className="fixed bottom-18 right-3 z-50 flex h-[580px] max-h-[82vh] w-[calc(100vw-1.5rem)] max-w-[420px] flex-col overflow-hidden rounded-3xl border border-primary/25 bg-card/95 shadow-2xl backdrop-blur-2xl sm:bottom-24 sm:right-6"
            aria-label="Asistente de IA y recorrido del portafolio"
          >
            {/* Top Glow & Progress Bar (when in Tour mode) */}
            <div className="relative h-1 w-full bg-muted">
              {activeTab === "tour" ? (
                <motion.div
                  className="h-full bg-gradient-to-r from-primary/70 via-primary to-emerald-400"
                  initial={{ width: 0 }}
                  animate={{ width: `${progressPercent}%` }}
                  transition={{ duration: 0.35 }}
                />
              ) : (
                <div className="h-full bg-gradient-to-r from-primary/40 via-primary to-emerald-400" />
              )}
            </div>

            {/* Header */}
            <header className="flex items-center justify-between border-b border-border/70 px-4 py-3">
              <div className="flex items-center gap-2.5">
                <div className="relative flex size-9 items-center justify-center rounded-xl border border-primary/30 bg-primary/10 text-primary shadow-inner">
                  <Bot className="size-5" />
                  <span className="absolute -right-0.5 -top-0.5 size-2.5 rounded-full border-2 border-card bg-emerald-400" />
                </div>
                <div>
                  <div className="flex items-center gap-1.5">
                    <h2 className="text-sm font-semibold tracking-tight text-foreground">
                      KicoBot
                    </h2>
                    <span className="rounded-full border border-primary/25 bg-primary/10 px-1.5 py-0.2 font-mono text-[10px] text-primary">
                      IA Gemini
                    </span>
                  </div>
                  <p className="text-[11px] text-muted-foreground">
                    Asistente de Federico Meza
                  </p>
                </div>
              </div>

              {/* Mode switch (Tour vs Chat IA) & Close */}
              <div className="flex items-center gap-1.5">
                <div className="flex rounded-lg border border-border/80 bg-background/50 p-0.5 text-xs">
                  <button
                    type="button"
                    onClick={() => setActiveTab("tour")}
                    className={`flex items-center gap-1 rounded-md px-2 py-1 text-[11px] font-medium transition-colors ${activeTab === "tour"
                      ? "bg-primary text-primary-foreground shadow-sm"
                      : "text-muted-foreground hover:text-foreground"
                      }`}
                  >
                    <Compass className="size-3" />
                    Tour
                  </button>
                  <button
                    type="button"
                    onClick={() => setActiveTab("chat")}
                    className={`flex items-center gap-1 rounded-md px-2 py-1 text-[11px] font-medium transition-colors ${activeTab === "chat"
                      ? "bg-primary text-primary-foreground shadow-sm"
                      : "text-muted-foreground hover:text-foreground"
                      }`}
                  >
                    <Sparkles className="size-3" />
                    Chat IA
                  </button>
                </div>

                <button
                  type="button"
                  onClick={handleClose}
                  className="rounded-lg p-1.5 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                  aria-label="Cerrar asistente"
                >
                  <X className="size-4" />
                </button>
              </div>
            </header>

            {/* Content Body */}
            {activeTab === "tour" ? (
              /* TOUR MODE */
              <div className="flex flex-1 flex-col justify-between overflow-y-auto px-4 py-4 scrollbar-thin">
                <div>
                  {/* Step Selector Pills */}
                  <div className="mb-4 flex items-center justify-between gap-1 overflow-x-auto pb-1">
                    {tourSteps.map((step, idx) => (
                      <button
                        key={step.id}
                        type="button"
                        onClick={() => handleJumpToStep(idx)}
                        className={`flex items-center gap-1 rounded-full px-2.5 py-1 font-mono text-[10px] transition-all ${idx === currentStepIndex
                          ? "border border-primary/40 bg-primary/20 text-primary font-semibold shadow-xs"
                          : "border border-transparent text-muted-foreground hover:border-border hover:bg-muted/50"
                          }`}
                      >
                        <span>{idx + 1}.</span>
                        <span>{step.navLabel}</span>
                      </button>
                    ))}
                  </div>

                  {/* Active Step Content */}
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={currentStep.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.2 }}
                      className="space-y-3"
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-mono text-[11px] font-medium uppercase tracking-wider text-primary">
                          {currentStep.badge}
                        </span>
                        <span className="flex size-6 items-center justify-center rounded-lg bg-primary/10 text-primary">
                          <StepIcon className="size-3.5" />
                        </span>
                      </div>

                      <h3 className="text-base font-bold leading-tight tracking-tight text-foreground">
                        {currentStep.title}
                      </h3>

                      <p className="text-xs leading-relaxed text-muted-foreground">
                        {currentStep.description}
                      </p>

                      {/* Highlights box */}
                      <div className="rounded-xl border border-border/80 bg-background/50 p-3">
                        <p className="mb-2 font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
                          Puntos clave
                        </p>
                        <ul className="space-y-1.5 text-xs text-foreground/90">
                          {currentStep.highlights.map((h) => (
                            <li key={h} className="flex items-center gap-2">
                              <CheckCircle2 className="size-3.5 shrink-0 text-primary" />
                              <span>{h}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </motion.div>
                  </AnimatePresence>
                </div>

                {/* Prompt to try AI Chat */}
                <div className="mt-4 rounded-xl border border-primary/20 bg-primary/5 p-2.5 text-center">
                  <p className="text-xs text-foreground">
                    ¿Tienes dudas específicas o una propuesta?
                  </p>
                  <button
                    type="button"
                    onClick={() => setActiveTab("chat")}
                    className="mt-1.5 inline-flex items-center gap-1 font-mono text-xs font-semibold text-primary hover:underline"
                  >
                    Preguntar a la IA sobre Federico
                    <ArrowRight className="size-3" />
                  </button>
                </div>
              </div>
            ) : (
              /* LIVE AI CHAT MODE */
              <div className="flex flex-1 flex-col justify-between overflow-hidden">
                {/* Messages Feed */}
                <div className="flex-1 overflow-y-auto px-4 py-3 space-y-3 scrollbar-thin">
                  {messages.map((m) => (
                    <motion.div
                      key={m.id}
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      className={`flex flex-col ${m.role === "user" ? "items-end" : "items-start"
                        }`}
                    >
                      <div
                        className={`max-w-[85%] rounded-2xl px-3.5 py-2.5 text-xs leading-relaxed ${m.role === "user"
                          ? "bg-primary text-primary-foreground font-medium rounded-br-xs"
                          : "border border-border/80 bg-background/60 text-foreground rounded-bl-xs shadow-xs"
                          }`}
                      >
                        <p className="whitespace-pre-line">{m.content}</p>

                        {/* Interactive Navigation Badge if section was navigated */}
                        {m.actionTarget && (
                          <button
                            type="button"
                            onClick={() => highlightSection(m.actionTarget!)}
                            className="mt-2.5 flex items-center gap-1.5 rounded-lg border border-primary/30 bg-primary/10 px-2.5 py-1 font-mono text-[11px] text-primary transition-colors hover:bg-primary/20"
                          >
                            <Compass className="size-3 shrink-0" />
                            <span>Enfocando: {m.actionLabel}</span>
                            <ArrowRight className="size-3" />
                          </button>
                        )}
                      </div>
                    </motion.div>
                  ))}

                  {/* Typing Indicator */}
                  {isLoading && (
                    <div className="flex items-center gap-1.5 rounded-2xl border border-border/70 bg-background/50 px-3.5 py-2 w-fit">
                      <span className="size-1.5 rounded-full bg-primary animate-bounce [animation-delay:-0.3s]" />
                      <span className="size-1.5 rounded-full bg-primary animate-bounce [animation-delay:-0.15s]" />
                      <span className="size-1.5 rounded-full bg-primary animate-bounce" />
                      <span className="ml-1 text-[11px] text-muted-foreground">
                        KicoBot está pensando…
                      </span>
                    </div>
                  )}

                  <div ref={messagesEndRef} />
                </div>

                {/* Suggested Prompts Pills */}
                {messages.length <= 2 && !isLoading && (
                  <div className="border-t border-border/50 px-3 py-2 bg-background/30">
                    <p className="mb-1.5 text-[10px] uppercase font-mono tracking-wider text-muted-foreground">
                      Sugerencias rápidas:
                    </p>
                    <div className="flex gap-1.5 overflow-x-auto pb-1 scrollbar-none">
                      {suggestedPrompts.map((prompt) => (
                        <button
                          key={prompt}
                          type="button"
                          onClick={() => handleSendMessage(prompt)}
                          className="shrink-0 rounded-full border border-border/80 bg-background/70 px-2.5 py-1 text-[11px] text-foreground transition-colors hover:border-primary/50 hover:bg-primary/10 hover:text-primary"
                        >
                          {prompt}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Input Area */}
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    handleSendMessage();
                  }}
                  className="flex items-center gap-2 border-t border-border/70 bg-card/60 p-2.5"
                >
                  <input
                    ref={inputRef}
                    type="text"
                    value={chatInput}
                    onChange={(e) => setChatInput(e.target.value)}
                    placeholder="Pregúntale a la IA sobre Federico…"
                    disabled={isLoading}
                    className="flex-1 rounded-xl border border-border/80 bg-background/80 px-3 py-2 text-xs text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none disabled:opacity-50"
                  />
                  <button
                    type="submit"
                    disabled={!chatInput.trim() || isLoading}
                    className="inline-flex size-8 shrink-0 items-center justify-center rounded-xl bg-primary text-primary-foreground shadow-sm transition-transform hover:scale-105 active:scale-95 disabled:pointer-events-none disabled:opacity-40"
                    aria-label="Enviar mensaje"
                  >
                    <Send className="size-3.5" />
                  </button>
                </form>
              </div>
            )}

            {/* Footer Navigation Bar (Only in Tour mode) */}
            {activeTab === "tour" && (
              <footer className="flex items-center justify-between border-t border-border/70 bg-card/50 px-4 py-3">
                <div className="flex items-center gap-1">
                  <button
                    type="button"
                    disabled={currentStepIndex === 0}
                    onClick={handlePrevStep}
                    className="inline-flex size-8 items-center justify-center rounded-lg border border-border/80 text-foreground transition-colors hover:bg-muted disabled:pointer-events-none disabled:opacity-30"
                    aria-label="Paso anterior"
                  >
                    <ChevronLeft className="size-4" />
                  </button>
                  <button
                    type="button"
                    onClick={() => handleJumpToStep(0)}
                    className="inline-flex size-8 items-center justify-center rounded-lg border border-border/80 text-foreground transition-colors hover:bg-muted"
                    title="Reiniciar tour"
                    aria-label="Reiniciar tour"
                  >
                    <RotateCcw className="size-3.5 text-muted-foreground" />
                  </button>
                </div>

                <span className="font-mono text-xs text-muted-foreground">
                  {currentStepIndex + 1} de {tourSteps.length}
                </span>

                {currentStepIndex < tourSteps.length - 1 ? (
                  <button
                    type="button"
                    onClick={handleNextStep}
                    className="inline-flex items-center gap-1.5 rounded-lg bg-primary px-3 py-1.5 text-xs font-semibold text-primary-foreground shadow-sm transition-transform hover:scale-[1.02] active:scale-[0.98]"
                  >
                    Siguiente
                    <ChevronRight className="size-3.5" />
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={() => {
                      highlightSection("contact");
                      handleClose();
                    }}
                    className="inline-flex items-center gap-1.5 rounded-lg bg-primary px-3 py-1.5 text-xs font-semibold text-primary-foreground shadow-sm transition-transform hover:scale-[1.02] active:scale-[0.98]"
                  >
                    Finalizar
                    <CheckCircle2 className="size-3.5" />
                  </button>
                )}
              </footer>
            )}
          </motion.aside>
        )}
      </AnimatePresence>

      {/* Floating Trigger Button (Bottom Right) */}
      <div className="fixed bottom-4 right-3 z-50 sm:bottom-6 sm:right-7">
        <motion.button
          type="button"
          onClick={() => {
            if (isOpen) {
              handleClose();
            } else {
              handleStartTour(currentStepIndex);
            }
          }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className={`group flex items-center gap-2.5 rounded-full p-2.5 pr-4 shadow-2xl transition-all duration-300 ${isOpen
            ? "border border-primary bg-primary text-primary-foreground shadow-primary/30"
            : "border border-primary/40 bg-card/90 text-foreground backdrop-blur-xl hover:border-primary hover:shadow-primary/20"
            }`}
          aria-label={
            isOpen ? "Cerrar guía del portafolio" : "Abrir guía del portafolio"
          }
        >
          {/* Animated bot avatar icon */}
          <div className="relative flex size-9 items-center justify-center rounded-full bg-primary/15 text-primary">
            <Bot
              className={`size-5 transition-transform duration-300 ${isOpen ? "rotate-12 text-primary-foreground" : "group-hover:scale-110"
                }`}
            />
            {/* Pulsing indicator */}
            <span className="absolute -right-0.5 -top-0.5 flex size-3">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex size-3 rounded-full bg-emerald-500" />
            </span>
          </div>

          <div className="flex flex-col text-left">
            <span className="font-[family-name:var(--font-syne)] text-xs font-bold leading-none">
              {isOpen ? "Cerrar KicoBot" : "KicoBot · IA"}
            </span>
            <span className="font-mono text-[10px] text-muted-foreground group-hover:text-primary">
              {isOpen ? "Minimizar" : "Tour & Chat"}
            </span>
          </div>
        </motion.button>
      </div>
    </>
  );
}
