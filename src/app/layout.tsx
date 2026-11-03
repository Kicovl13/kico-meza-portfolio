import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { LanguageProvider } from "@/context/language-context";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
});

export const metadata: Metadata = {
  title: "FEDERICOMEZA.DEV · Ingeniero Full Stack & Líder Técnico",
  description:
    "Del diseño de arquitectura al servidor en producción. Desarrollo web full stack y plataformas empresariales críticas con Laravel, Node.js, TypeScript y Angular.",
  keywords: [
    "Federico Meza",
    "Ingeniero Full Stack",
    "Tech Lead",
    "Laravel",
    "Node.js",
    "TypeScript",
    "Angular",
    "Zapopan",
    "Jalisco",
    "Sistemas ERP",
    "Plataformas Críticas",
    "CFDI 4.0 SAT",
    "Docker",
    "Arquitectura de Software",
  ],
  authors: [{ name: "Federico Meza", url: "https://github.com/Kicovl13" }],
  creator: "Federico Meza",
  openGraph: {
    title: "FEDERICOMEZA.DEV · Ingeniero Full Stack & Líder Técnico",
    description:
      "Del diseño de arquitectura al servidor en producción. Desarrollo web full stack para empresas y plataformas que no pueden fallar.",
    siteName: "FEDERICOMEZA.DEV",
    locale: "es_MX",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "FEDERICOMEZA.DEV · Ingeniero Full Stack & Líder Técnico",
    description:
      "ERPs, CRMs, facturación fiscal SAT y APIs escalables a producción con Laravel, Node.js, TypeScript y Angular.",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="es"
      className={`dark ${inter.variable} ${jetbrainsMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col font-sans bg-[#060608] text-[#f4f4f2]">
        <LanguageProvider>{children}</LanguageProvider>
      </body>
    </html>
  );
}
