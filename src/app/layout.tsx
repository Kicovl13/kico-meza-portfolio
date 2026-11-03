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
  title: "Federico Meza · Senior Software Engineer & Tech Lead",
  description:
    "+7 años de experiencia diseñando y liderando sistemas transaccionales críticos, ERPs multi-tenant, motores de cumplimiento fiscal SAT CFDI 4.0 y arquitecturas distribuidas con cero margen de error.",
  keywords: [
    "Federico Meza",
    "Senior Software Engineer",
    "Tech Lead",
    "Full Stack Engineer",
    "Arquitectura de Software",
    "Laravel",
    "Node.js",
    "TypeScript",
    "PostgreSQL",
    "Docker",
    "CFDI 4.0 SAT",
    "Sistemas ERP",
    "Fintech",
    "Zapopan",
    "Guadalajara",
    "Jalisco",
  ],
  authors: [{ name: "Federico Meza", url: "https://github.com/Kicovl13" }],
  creator: "Federico Meza",
  openGraph: {
    title: "Federico Meza · Senior Software Engineer & Tech Lead",
    description:
      "Arquitectura sólida para sistemas críticos. +7 años en producción liderando plataformas ERP, facturación SAT y arquitecturas resilientes.",
    siteName: "FEDERICOMEZA.DEV",
    locale: "es_MX",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Federico Meza · Senior Software Engineer & Tech Lead",
    description:
      "Sistemas transaccionales de misión crítica, facturación SAT CFDI 4.0 y arquitecturas escalables con Laravel, TypeScript, Node.js y PostgreSQL.",
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
