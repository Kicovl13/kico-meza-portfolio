import type { Metadata } from "next";
import { JetBrains_Mono, Outfit, Syne } from "next/font/google";
import "./globals.css";

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
});

const syne = Syne({
  variable: "--font-syne",
  subsets: ["latin"],
  weight: ["500", "600", "700", "800"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
});

export const metadata: Metadata = {
  title: "Federico Meza — Ingeniero en Sistemas · Full Stack",
  description:
    "Federico Meza, ingeniero en sistemas en Zapopan. Construye CRMs, plataformas de negocio y APIs con Laravel, Node.js, TypeScript, Angular y MySQL.",
  openGraph: {
    title: "Federico Meza — Ingeniero en Sistemas · Full Stack",
    description:
      "CRMs, plataformas de negocio y APIs con Laravel, Node.js, TypeScript y Angular.",
    type: "website",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="es"
      className={`dark ${outfit.variable} ${syne.variable} ${jetbrainsMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col font-sans">{children}</body>
    </html>
  );
}
