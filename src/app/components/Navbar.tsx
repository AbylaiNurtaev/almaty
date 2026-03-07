import { useState, useEffect } from "react";
import { Menu, X, Ticket } from "lucide-react";

const LINKS = [
  { label: "О фестивале", href: "#about" },
  { label: "Активности",  href: "#activities" },
  { label: "Игры",        href: "#games" },
  { label: "Стримеры",   href: "#streamers" },
  { label: "Программа",   href: "#program" },
  { label: "Челленджи",  href: "#challenges" },
  { label: "Призы",      href: "#prizes" },
  { label: "Билеты",     href: "#tickets" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 48);
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-400"
      style={scrolled
        ? { background: "rgba(5,5,8,0.97)", backdropFilter: "blur(32px)", borderBottom: "1px solid rgba(255,255,255,0.06)" }
        : { background: "transparent" }
      }
    >
      {/* Top border (when scrolled) */}
      {scrolled && (
        <div className="absolute top-0 left-0 right-0 h-px pointer-events-none"
          style={{ background: "rgba(255,255,255,0.07)" }} />
      )}

      <div
        className="mx-auto flex items-center justify-between h-16 px-6 md:px-10 xl:px-16"
        style={{ maxWidth: "1380px" }}
      >
        {/* Logo */}
        <a href="#hero" className="flex items-center gap-2.5 shrink-0 group">
          <span style={{ fontFamily: "'Barlow Condensed',sans-serif", fontWeight: 900, fontSize: "1.55rem", lineHeight: 1, letterSpacing: "0.04em" }}>
            <span className="text-white">GAME</span>
            <span style={{ color: "var(--c-cyan,#00E5FF)" }}>HUB</span>
          </span>
        </a>

        {/* Desktop nav */}
        <div className="hidden lg:flex items-center gap-7">
          {LINKS.map((l) => (
            <a key={l.label} href={l.href}
              style={{ fontFamily: "'Barlow Condensed',sans-serif", fontWeight: 700, fontSize: "0.68rem", letterSpacing: "0.2em" }}
              className="relative uppercase text-white hover:text-white/90 transition-colors duration-200 group py-1">
              {l.label}
              <span className="absolute bottom-0 left-0 right-0 h-px bg-[var(--c-cyan,#00D4F5)] origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-280" />
            </a>
          ))}
        </div>

        {/* CTA + burger */}
        <div className="flex items-center gap-3">
          <a href="#tickets" className="hidden md:inline-flex btn-primary" style={{ padding: "10px 22px", fontSize: "0.7rem" }}>
            <Ticket size={12} />
            <span>Получить билет</span>
          </a>
          <button onClick={() => setOpen(!open)} aria-label="Меню"
            className="lg:hidden w-9 h-9 flex items-center justify-center text-white hover:text-white/90 transition-colors"
            style={{ border: "1px solid rgba(255,255,255,0.1)" }}>
            {open ? <X size={16} /> : <Menu size={16} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="lg:hidden border-t" style={{ background: "rgba(7,7,14,0.99)", borderColor: "rgba(255,255,255,0.05)", backdropFilter: "blur(32px)" }}>
          {LINKS.map((l) => (
            <a key={l.label} href={l.href} onClick={() => setOpen(false)}
              className="flex items-center gap-3 px-6 py-3.5 border-b text-white hover:text-white/90 transition-colors"
              style={{ fontFamily: "'Barlow Condensed',sans-serif", fontWeight: 700, fontSize: "1.1rem", letterSpacing: "0.18em", borderColor: "rgba(255,255,255,0.04)" }}>
              <span className="w-2 h-px bg-[var(--c-cyan,#00D4F5)] opacity-50" />
              <span className="uppercase">{l.label}</span>
            </a>
          ))}
          <div className="px-6 py-5">
            <a href="#tickets" onClick={() => setOpen(false)} className="btn-primary w-full justify-center">
              <Ticket size={14} />
              <span>Получить билет</span>
            </a>
          </div>
        </div>
      )}
    </nav>
  );
}