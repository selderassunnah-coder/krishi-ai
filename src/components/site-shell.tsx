"use client";

import Link from "next/link";
import { Menu, X } from "lucide-react";
import { useState } from "react";

const nav = [
  { href: "/#features", label: "ফিচার" },
  { href: "/#how", label: "কীভাবে কাজ করে" },
  { href: "/diagnosis", label: "AI Diagnosis" },
  { href: "/about", label: "আমাদের সম্পর্কে" },
];

export function SiteShell({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="flex min-h-dvh flex-col">
      <header className="sticky top-0 z-40 border-b border-border/70 bg-bg/90 backdrop-blur-md">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
          <Link href="/" className="font-display text-lg font-semibold">
            Krishi AI
          </Link>
          <nav className="hidden gap-6 md:flex">
            {nav.map((item) => (
              <Link key={item.href} href={item.href} className="text-sm text-muted hover:text-fg">
                {item.label}
              </Link>
            ))}
          </nav>
          <div className="hidden md:block">
            <Link
              href="/login"
              className="inline-flex h-11 items-center rounded-full bg-primary px-5 text-sm font-semibold text-primary-fg"
            >
              শুরু করুন
            </Link>
          </div>
          <button
            type="button"
            className="grid size-11 place-items-center md:hidden"
            onClick={() => setOpen((v) => !v)}
            aria-label="মেনু"
          >
            {open ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
        {open ? (
          <div className="flex flex-col gap-1 border-t border-border bg-surface px-4 py-4 md:hidden">
            {nav.map((item) => (
              <Link key={item.href} href={item.href} className="py-3" onClick={() => setOpen(false)}>
                {item.label}
              </Link>
            ))}
          </div>
        ) : null}
      </header>
      <div className="flex-1">{children}</div>
      <footer className="border-t border-border bg-surface">
        <div className="mx-auto flex max-w-6xl flex-wrap gap-6 px-4 py-10 text-sm text-muted sm:px-6">
          <Link href="/about">আমাদের সম্পর্কে</Link>
          <Link href="/contact">যোগাযোগ</Link>
          <Link href="/privacy">গোপনীয়তা</Link>
          <Link href="/terms">শর্তাবলী</Link>
          <Link href="/disclaimer">AI Disclaimer</Link>
          <Link href="/help">সহায়তা</Link>
        </div>
      </footer>
    </div>
  );
}
