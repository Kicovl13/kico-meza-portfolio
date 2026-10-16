"use client";

import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { site } from "@/lib/data";
import { Button } from "@/components/ui/button";
import { cn } from "cn";

const links = [
  { href: "#stack", label: "Stack" },
  { href: "#projects", label: "Projects" },
  { href: "#workflow", label: "Workflow" },
  { href: "#contact", label: "Contact" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-300",
        scrolled || open
          ? "border-b border-border/60 bg-background/75 backdrop-blur-xl"
          : "bg-transparent",
      )}
    >
      <nav className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
        <a
          href="#top"
          className="font-[family-name:var(--font-syne)] text-lg font-700 tracking-tight text-foreground"
          style={{ fontWeight: 700 }}
        >
          {site.brand}
        </a>

        <div className="hidden items-center gap-1 md:flex">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="rounded-md px-3 py-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              {link.label}
            </a>
          ))}
          <Button
            size="sm"
            className="ml-2"
            nativeButton={false}
            render={<a href="#contact" />}
          >
            Hire me
          </Button>
        </div>

        <Button
          variant="ghost"
          size="icon"
          className="md:hidden"
          onClick={() => setOpen((v) => !v)}
          aria-label={open ? "Close menu" : "Open menu"}
        >
          {open ? <X /> : <Menu />}
        </Button>
      </nav>

      {open && (
        <div className="border-t border-border/60 bg-background/95 px-4 py-4 backdrop-blur-xl md:hidden">
          <div className="flex flex-col gap-1">
            {links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="rounded-md px-3 py-3 text-sm text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}
