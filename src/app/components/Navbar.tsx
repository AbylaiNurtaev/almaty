import React, { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";

const LINKS = [
  { label: "О фестивале", href: "#about" },
  { label: "Активности", href: "#activities" },
  { label: "Стримеры", href: "#streamers" },
  { label: "Игры", href: "#games" },
  { label: "Программа", href: "#program" },
  { label: "Челленджи", href: "#challenges" },
  { label: "Призы", href: "#prizes" },
  { label: "Технологии", href: "#brands" },
  { label: "Бренды", href: "#brands" },
  { label: "Франшизы", href: "#networks" },
  { label: "Комп клубы", href: "#clubs" },
  { label: "Билеты", href: "#tickets" },
];

const SECTION_IDS = LINKS.map((l) => l.href.slice(1));

export function Navbar() {
  const [activeId, setActiveId] = useState<string | null>(null);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const updateActive = () => {
      const viewportMiddle = window.scrollY + window.innerHeight * 0.4;
      let current: string | null = null;
      for (const id of SECTION_IDS) {
        const el = document.getElementById(id);
        if (!el) continue;
        const rect = el.getBoundingClientRect();
        const sectionTop = rect.top + window.scrollY;
        const sectionBottom = sectionTop + rect.height;
        if (viewportMiddle >= sectionTop && viewportMiddle <= sectionBottom) {
          current = id;
          break;
        }
        if (sectionTop <= viewportMiddle) current = id;
      }
      setActiveId(current || SECTION_IDS[0]);
    };
    updateActive();
    window.addEventListener("scroll", updateActive, { passive: true });
    return () => window.removeEventListener("scroll", updateActive);
  }, []);

  const linkStyle = (href: string) => {
    const id = href.slice(1);
    const isActive = activeId === id;
    return {
      fontFamily: "'Barlow Condensed',sans-serif" as const,
      fontWeight: 700,
      fontSize: "0.68rem",
      letterSpacing: "0.2em",
      color: isActive ? "rgba(255,255,255,1)" : "rgba(255,255,255,0.45)",
      transition: "color 0.2s ease",
    };
  };

  const linkContent = (
    <>
      {LINKS.map((l) => (
        <a
          key={l.label}
          href={l.href}
          onClick={() => setOpen(false)}
          className="block uppercase py-2 hover:text-white transition-colors duration-200 group relative"
          style={linkStyle(l.href)}
        >
          {l.label}
          <span className="absolute bottom-0 right-0 left-0 h-px bg-[var(--c-cyan,#00D4F5)] origin-right scale-x-0 group-hover:scale-x-100 transition-transform duration-280" />
        </a>
      ))}
    </>
  );

  return (
    <>
      {/* Desktop: fixed right nav, no logo */}
      <nav
        className="fixed top-0 right-0 z-50 hidden lg:flex flex-col items-end justify-center h-screen py-20 pr-6 xl:pr-10 pointer-events-none"
        aria-label="Навигация по разделам"
      >
        <div className="pointer-events-auto flex flex-col items-end gap-0.5">
          {linkContent}
        </div>
      </nav>

      {/* Mobile: burger top-right */}
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
                  onClick={() => setOpen(false)}
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
