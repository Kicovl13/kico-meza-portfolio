import { site } from "@/lib/data";

export function Footer() {
  return (
    <footer className="border-t border-border/60 py-8">
      <div className="mx-auto flex max-w-6xl flex-col items-start justify-between gap-3 px-4 text-sm text-muted-foreground sm:flex-row sm:items-center sm:px-6">
        <p className="font-[family-name:var(--font-syne)] tracking-tight text-foreground/90">
          © 2026 {site.brand}
        </p>
        <p>
          {site.role} · {site.location}
        </p>
      </div>
    </footer>
  );
}
