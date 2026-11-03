import { NextResponse } from "next/server";
import { education, experience, extras, heroStack, mvcShowcases, projects, site, skillGroups } from "@/lib/data";

interface ChatMessage {
  role: "user" | "assistant" | "system";
  content: string;
}

const SYSTEM_PROMPT = `
Eres "KicoBot", el asistente personal de Inteligencia Artificial en el portafolio de Federico Meza ("Kico").
Tu personalidad es la de un compañero de equipo senior: sumamente humano, cálido, carismático, empático y con gran criterio técnico. No suenas como un bot acartonado, corporativo aburrido ni como un menú telefónico; hablas como una persona real con quien da gusto platicar.

INFORMACIÓN COMPLETA DE FEDERICO MEZA:
- Nombre: ${site.name} ("Kico")
- Rol: ${site.role}
- Ubicación: ${site.location}
- Correo: ${site.email} | Teléfono: ${site.phone} | LinkedIn: ${site.linkedin}
- Edad y tiempo en la industria: Nació en 1997 (tiene 29 años). Estudió Ingeniería en Sistemas de 2015 a 2019 e inició en desarrollo en 2016. Suma más de 7 años construyendo software en producción.
- Lo que define a Federico: Lleva sistemas críticos a producción (ERPs, CRMs, facturación, pasarelas de pago, auditoría), ha sido desarrollador Full Stack y Gerente de Sistemas liderando equipos multidisciplinarios.

STACK TECNOLÓGICO:
- Stack principal: ${heroStack.join(", ")}
${skillGroups.map((g) => `- ${g.title}: ${g.items.join(", ")}`).join("\n")}

SISTEMAS EMPRESARIALES DE ALTO IMPACTO (CON DEMOS INTERACTIVOS):
${mvcShowcases
  .map(
    (s, i) => `${i + 1}. ${s.title} (${s.category})
   - Arquitectura & Capas: Datos (${s.mvcArchitecture.model[0]}), Lógica (${s.mvcArchitecture.controller[0]}), Presentación (${s.mvcArchitecture.view[0]})
   - Stack: ${s.stack.join(", ")} | Docker: ${s.dockerStack.join(", ")}
   - Métricas: ${s.metrics.map((m) => `${m.label}: ${m.value}`).join(" | ")}
   - Funcionalidades: ${s.keyFeatures.join("; ")}`
  )
  .join("\n\n")}

PROYECTOS CLAVE EN EMPRESAS:
${projects
  .map(
    (p, i) => `${i + 1}. ${p.title} (${p.period}) - ${p.role}:
   - Resumen: ${p.description}
   - Puntos clave: ${p.points.join(" | ")}
   - Tecnologías: ${p.tags.join(", ")}`
  )
  .join("\n\n")}

TRAYECTORIA LABORAL:
${experience
  .map(
    (e, i) => `${i + 1}. ${e.role} en ${e.company} (${e.period}, ${e.place}):
   - Logros: ${e.points.join(" | ")}`
  )
  .join("\n\n")}

Educación: ${education.degree} en ${education.school} (${education.period}).
Certificaciones y extras: ${extras.join(" | ")}.

CÓMO DEBES CONVERSAR (AUTÉNTICAMENTE HUMANO Y VERSÁTIL):
1. PUEDES RESPONDER CUALQUIER PREGUNTA:
   - Preguntas sobre Federico: su edad (29 años), experiencia, anécdotas profesionales, proyectos, cómo trabaja en equipo, disponibilidad y salario/contacto.
   - Preguntas técnicas de programación: si te preguntan sobre cualquier tema de ingeniería (ej. "¿Cuándo usar Laravel vs Node?", "¿Cómo estructurar una API REST escalable?", "¿Por qué usar Docker?", "¿Cómo optimizar bases de datos?"), responde con criterio sólido, pedagogía y buenas prácticas.
   - Preguntas generales, casuales o curiosas: desde "¿cómo estás?", "¿qué opinas de la IA?", consejos de carrera, o preguntas típicas de entrevista. Responde con soltura, calidez y buen humor.
2. TONO Y LENGUAJE NATURAL:
   - Habla en español latinoamericano natural, fluido y fresco (ej. "¡Hola! Con gusto...", "Mira, Federico...", "Fíjate que en ese proyecto...", "Desde el punto de vista técnico...", "Totalmente").
   - Ajusta la extensión: si es una pregunta breve y directa (como su edad o dónde vive), responde directo y al grano en 1 o 2 oraciones. Si te piden una explicación técnica detallada, ofrece una respuesta bien estructurada y clara.
   - NUNCA uses frases robóticas como "Como modelo de lenguaje de IA...", "No tengo sentimientos...". Eres KicoBot, el aliado y asistente de Federico.
3. NAVEGACIÓN ACTIVA EN EL PORTAFOLIO:
   Cuando tu respuesta hable o se beneficie de ver una sección del sitio, agrega al final de tu mensaje una etiqueta para que la pantalla del usuario se desplace con foco luminoso:
   - Para stack o tecnologías: [ACTION:NAVIGATE:#stack]
   - Para proyectos y sistemas: [ACTION:NAVIGATE:#projects]
   - Para experiencia laboral, trayectoria o edad: [ACTION:NAVIGATE:#experience]
   - Para contacto, llamadas, correo o contrataciones: [ACTION:NAVIGATE:#contact]
   - Para inicio o presentación: [ACTION:NAVIGATE:#top]
`.trim();

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const messages: ChatMessage[] = body.messages || [];

    if (!Array.isArray(messages) || messages.length === 0) {
      return NextResponse.json(
        { error: "Mensajes no válidos" },
        { status: 400 }
      );
    }

    const lastUserMessage = messages[messages.length - 1]?.content || "";
    const apiKey = (
      process.env.GEMINI_API_KEY ||
      process.env.GOOGLE_API_KEY ||
      process.env.NEXT_PUBLIC_GEMINI_API_KEY
    )?.trim();

    // If no API key configured yet, use an intelligent local knowledge engine
    if (!apiKey) {
      const fallbackResponse = generateLocalFallback(lastUserMessage);
      return NextResponse.json({
        reply: fallbackResponse,
        provider: "local-fallback",
        setupNeeded: true,
      });
    }

    // Call Google Gemini API (tries gemini-flash-latest, gemini-2.5-flash, gemini-1.5-flash)
    const geminiPayload = {
      system_instruction: {
        parts: [{ text: SYSTEM_PROMPT }],
      },
      contents: messages.map((m) => ({
        role: m.role === "assistant" ? "model" : "user",
        parts: [{ text: m.content }],
      })),
      generationConfig: {
        temperature: 0.8,
        maxOutputTokens: 700,
      },
    };

    const modelsToTry = [
      "gemini-flash-lite-latest",
      "gemini-3.5-flash",
      "gemini-3.1-flash-lite",
      "gemini-flash-latest",
    ];
    let generatedText: string | null = null;
    let successfulModel: string | null = null;

    for (const model of modelsToTry) {
      try {
        const response = await fetch(
          `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(geminiPayload),
          }
        );

        if (response.ok) {
          const data = await response.json();
          const text = data.candidates?.[0]?.content?.parts?.[0]?.text?.trim();
          if (text) {
            generatedText = text;
            successfulModel = model;
            break;
          }
        } else {
          const errText = await response.text();
          console.warn(`Gemini (${model}) ${response.status}:`, errText);
        }
      } catch (err) {
        console.warn(`Error llamando a ${model}:`, err);
      }
    }

    if (generatedText) {
      return NextResponse.json({
        reply: generatedText,
        provider: successfulModel,
      });
    }

    // Fallback if API key had quota/billing issues (e.g. 402 depleted credits)
    const fallback = generateLocalFallback(lastUserMessage);
    return NextResponse.json({
      reply: fallback,
      provider: "fallback-resilient",
    });
  } catch (error) {
    console.error("Error en /api/chat:", error);
    return NextResponse.json(
      {
        reply:
          "¡Hola! Tuvimos un pequeño detalle de red temporal, pero con gusto te cuento: Federico está disponible y puedes escribirle directo a " +
          site.email +
          " [ACTION:NAVIGATE:#contact]",
      },
      { status: 200 }
    );
  }
}

// Intelligent, ultra-human local responder for when API is unavailable or depleted
function generateLocalFallback(query: string): string {
  const q = query.toLowerCase();

  if (q.includes("edad") || q.includes("año") || q.includes("cuanto") || q.includes("nac")) {
    return `Federico tiene 29 años. Estudió Ingeniería en Sistemas de 2015 a 2019 e inició en desarrollo en 2016, por lo que suma ya más de 7 años de experiencia construyendo y liderando software en producción. [ACTION:NAVIGATE:#experience]`;
  }

  if (q.includes("proyecto") || q.includes("sistema") || q.includes("crm") || q.includes("26 grado")) {
    return `¡Claro! Federico ha liderado sistemas clave en producción: principalmente la plataforma integral de 26 Grados (administración, finanzas y apps móviles en Swift/Kotlin), y la migración crítica de un CRM en Informix 4GL a web sin cortar operaciones. [ACTION:NAVIGATE:#projects]`;
  }

  if (
    q.includes("tecnolog") ||
    q.includes("stack") ||
    q.includes("lenguaje") ||
    q.includes("laravel") ||
    q.includes("node") ||
    q.includes("angular") ||
    q.includes("backend") ||
    q.includes("frontend")
  ) {
    return `Su stack principal combina backend en Laravel, Node.js y TypeScript, frontend en Angular y Tailwind CSS, bases de datos como MySQL y Oracle, y despliegues reproducibles en Docker. [ACTION:NAVIGATE:#stack]`;
  }

  if (
    q.includes("experiencia") ||
    q.includes("trabaj") ||
    q.includes("lider") ||
    q.includes("geren") ||
    q.includes("trayectoria") ||
    q.includes("estudi") ||
    q.includes("ciberseguridad")
  ) {
    return `Federico cuenta con más de 7 años de experiencia en la industria. Se desempeñó como Gerente de Sistemas en 26 Grados durante más de 3 años y como Full Stack Developer en Start. Además cuenta con certificación en Ciberseguridad por Google. [ACTION:NAVIGATE:#experience]`;
  }

  if (
    q.includes("contact") ||
    q.includes("correo") ||
    q.includes("telefono") ||
    q.includes("email") ||
    q.includes("llam") ||
    q.includes("contrat") ||
    q.includes("disponib")
  ) {
    return `Federico está disponible para oportunidades Full Stack, Backend y consultoría técnica. Puedes escribirle a ${site.email} o llamarle directamente al ${site.phone}. [ACTION:NAVIGATE:#contact]`;
  }

  return `Federico Meza es Ingeniero en Sistemas Full Stack especializado en Laravel, Node.js, TypeScript y Angular con experiencia en gerencia y arquitectura. Pregúntame lo que gustes sobre sus proyectos, stack o cómo contactarlo. [ACTION:NAVIGATE:#top]`;
}
