import type { Metadata } from "next";
import { CvContent } from "@/components/cv-content";

export const metadata: Metadata = {
  title: "Curículum Vitae Ejecutivo · Federico Meza | Ingeniero Full Stack & Líder Técnico",
  description:
    "CV Ejecutivo de Federico de Jesús Meza Ramos. Ingeniero en Sistemas con +7 años de experiencia liderando desarrollo de ERPs, facturación fiscal SAT CFDI 4.0 y plataformas en Laravel, Node.js, TypeScript y Angular.",
};

export default function CvPage() {
  return <CvContent />;
}
