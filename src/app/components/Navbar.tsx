import React, { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";

const LINKS = [
  { label: "Главная",       href: "#hero" },
  { label: "GameFest",     href: "#about" },
  { label: "Активности",   href: "#activities" },
  { label: "Гости",        href: "#streamers" },
  { label: "Игры",         href: "#games" },
  { label: "Программа",    href: "#program" },
  { label: "Челендж",      href: "#challenges" },
  { label: "Призы",        href: "#prizes" },
  { label: "Expo",             href: "#brands" },
  { label: "Франшизы",     href: "#clubs" },
  { label: "Клубы",        href: "#owners" },
  { label: "Билеты",       href: "#tickets" },
];

export function Navbar() {
  const [activeId, setActiveId] = useState<string>("hero");
  const [open, setOpen]         = useState(false);

  useEffect(() => {
    // App.tsx диспатчит этот CustomEvent при скролле внутри snap-контейнера
    const handler = (e: Event) => {
      const id = (e as CustomEvent<string>).detail;
      if (id) setActiveId(id);
    };
    window.addEventListener("snap-section-change", handler);
    return () => window.removeEventListener("snap-section-change", handler);
  }, []);

  const linkStyle = (href: string) => {
    const id = href.slice(1);
    return {
      fontFamily:    "'Barlow Condensed', sans-serif" as const,
      fontWeight:    700,
      fontSize:      "0.68rem",
      letterSpacing: "0.2em",
      color:         "rgba(255,255,255,1)",
      transition:    "color 0.2s ease",
    };
  };

  /* Клик по ссылке — скроллим внутри snap-контейнера */
  const scrollTo = (href: string) => {
    const id = href.slice(1);
    // ищем snap-контейнер (первый overflowY:scroll div внутри .film-grain)
    const container = document.querySelector<HTMLElement>("[data-snap-root]")
      ?? document.querySelector<HTMLElement>('div[style*="scroll-snap-type"]');
    const target = document.getElementById(id);
    if (container && target) {
      container.scrollTo({ top: target.offsetTop, behavior: "smooth" });
    } else {
      target?.scrollIntoView({ behavior: "smooth" });
    }
    setOpen(false);
  };

  const linkContent = LINKS.map((l) => (
    <a
      key={l.label}
      href={l.href}
      onClick={(e) => { e.preventDefault(); scrollTo(l.href); }}
      className="block uppercase py-2 hover:text-white transition-colors duration-200 group relative"
      style={linkStyle(l.href)}
    >
      {l.label}
      <span className="absolute bottom-0 right-0 left-0 h-px bg-[var(--c-cyan,#00D4F5)] origin-right scale-x-0 group-hover:scale-x-100 transition-transform duration-280" />
    </a>
  ));

  return (
    <>
      {/* Desktop: fixed right nav */}
      <nav
        className="fixed top-0 z-50 hidden lg:flex flex-col items-end justify-center h-screen py-20 pointer-events-none"
        aria-label="Навигация по разделам"
        style={{ right: "10px" }}
      >
        <div className="pointer-events-auto">
          <div className="flex flex-col items-end gap-0.5 bg-black/40 backdrop-blur-xl border border-white/10 rounded-2xl px-4 py-4 shadow-[0_0_40px_rgba(0,0,0,0.85)]">
            {linkContent}
          </div>
        </div>
      </nav>

      {/* Mobile: burger */}
      <div className="fixed top-0 right-0 z-50 lg:hidden p-4 pointer-events-auto">
        <button
          onClick={() => setOpen(!open)}
          aria-label="Меню"
          className="w-10 h-10 flex items-center justify-center text-white hover:text-white/90 transition-colors"
          style={{ border: "1px solid rgba(255,255,255,0.1)" }}
        >
          {open ? <X size={18} /> : <Menu size={18} />}
        </button>
      </div>

      {/* Mobile menu overlay */}
      {open && (
        <div
          className="fixed inset-0 z-40 lg:hidden"
          style={{ background: "rgba(5,5,8,0.95)", backdropFilter: "blur(24px)" }}
        >
          <div className="flex flex-col items-center justify-center min-h-screen px-8 pt-20 pb-24">
            <div className="flex flex-col items-center gap-2 w-full max-w-xs">
              {LINKS.map((l) => (
                <a
                  key={l.label}
                  href={l.href}
                  onClick={(e) => { e.preventDefault(); scrollTo(l.href); }}
                  className="w-full text-center py-3 uppercase border-b transition-colors"
                  style={{
                    ...linkStyle(l.href),
                    borderColor: "rgba(255,255,255,0.06)",
                  }}
                >
                  {l.label}
                </a>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
}