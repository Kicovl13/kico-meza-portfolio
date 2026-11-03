import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sistemas en Producción · Demos en Vivo | Federico Meza",
  description:
    "Demostraciones interactivas de plataformas empresariales desarrolladas por Federico Meza: Cobranza B2B SAT, SysAdministrador ERP, Leex PropTech, LegalFlow y RootWork.",
};

export default function DemosLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
