import React, { useState, useEffect } from "react";
import { Menu, X, Ticket, Instagram, Youtube, MessageCircle } from "lucide-react";

const LINKS = [
  { label: "Главная", href: "#hero" },
  { label: "Гости", href: "#streamers" },
  { label: "Развлечения", href: "#games" },
  { label: "Выставка", href: "#brands" },
  { label: "Билеты", href: "#tickets" },
];

const SOCIALS = [
  { Icon: Instagram, label: "Instagram", href: "#" },
  { Icon: Youtube, label: "YouTube", href: "#" },
  { Icon: MessageCircle, label: "Telegram", href: "#" },
];

export function Navbar() {
  const [activeId, setActiveId] = useState<string>("hero");
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const handler = (e: Event) => {
      const id = (e as CustomEvent<string>).detail;
      if (id) setActiveId(id);
    };
    window.addEventListener("snap-section-change", handler);
    return () => window.removeEventListener("snap-section-change", handler);
  }, []);

  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const scrollTo = (href: string) => {
    const id = href.startsWith("#") ? href.slice(1) : "";
    if (!id) return;
    const container =
      document.querySelector<HTMLElement>("[data-snap-root]") ??
      document.querySelector<HTMLElement>('div[style*="scroll-snap-type"]');
    const target = document.getElementById(id);
    if (container && target) {
      container.scrollTo({ top: target.offsetTop, behavior: "smooth" });
    } else {
      target?.scrollIntoView({ behavior: "smooth" });
    }
    setOpen(false);
  };

  const linkStyle = (href: string) => ({
    fontFamily: "'Barlow Condensed', sans-serif" as const,
    fontWeight: 800,
    letterSpacing: "0.22em",
    fontSize: "0.72rem",
    color: "rgba(255,255,255,0.92)",
  });

  const linkContent = LINKS.map((l) => (
    <a
      key={l.label}
      href={l.href}
      onClick={(e) => {
        e.preventDefault();
        scrollTo(l.href);
      }}
      className="side-nav-link block uppercase py-2 hover:text-white transition-colors duration-200 group relative"
      style={linkStyle(l.href)}
    >
      {l.label}
      <span className="absolute bottom-0 right-0 left-0 h-px bg-[var(--c-cyan,#00D4F5)] origin-right scale-x-0 group-hover:scale-x-100 transition-transform duration-280" />
    </a>
  ));

  return (
    <>
      <nav
        className="fixed top-0 z-50 hidden lg:flex flex-col items-end justify-center h-screen py-20 pointer-events-none"
        aria-label="Навигация по разделам"
        style={{ right: "10px" }}
      >
        <div className="pointer-events-auto">
          <div className="side-nav-panel flex flex-col items-end gap-0.5 bg-black/40 backdrop-blur-xl border border-white/10 rounded-2xl px-4 py-4 shadow-[0_0_40px_rgba(0,0,0,0.85)]">
            {linkContent}
          </div>
        </div>
      </nav>

      {/* Мобилка: бургер в стиле сайта */}
      <div className="fixed top-0 right-0 z-[60] lg:hidden p-3 pt-[max(12px,env(safe-area-inset-top))] pointer-events-auto">
        <button
          type="button"
          onClick={() => setOpen(!open)}
          aria-label={open ? "Закрыть меню" : "Меню"}
          aria-expanded={open}
          className="relative w-11 h-11 flex items-center justify-center text-white transition-all duration-200 active:scale-[0.98]"
          style={{
            background: "rgba(5,5,12,0.92)",
            border: "1px solid rgba(0,229,255,0.35)",
            boxShadow: "0 0 24px rgba(0,229,255,0.12), inset 0 1px 0 rgba(255,255,255,0.06)",
            clipPath: "polygon(8px 0, 100% 0, calc(100% - 8px) 100%, 0 100%)",
          }}
        >
          {open ? <X size={20} strokeWidth={2} style={{ color: "#00E5FF" }} /> : <Menu size={20} strokeWidth={2} />}
        </button>
      </div>

      {open && (
        <div
          className="fixed inset-0 z-[55] lg:hidden flex flex-col overflow-hidden nav-mobile-drawer"
          style={{
            background: "#050508",
            paddingTop: "env(safe-area-inset-top)",
            paddingBottom: "env(safe-area-inset-bottom)",
            height: "100dvh",
            maxHeight: "100dvh",
          }}
        >
          <div className="absolute inset-0 bg-dots opacity-[0.12] pointer-events-none" />
          <div
            className="absolute top-0 left-0 right-0 h-px pointer-events-none"
            style={{
              background:
                "linear-gradient(90deg, transparent, rgba(0,229,255,0.5), rgba(240,180,41,0.25), transparent)",
            }}
          />
          <div
            className="absolute top-1/4 right-0 w-[70%] h-[40%] pointer-events-none opacity-30"
            style={{
              background: "radial-gradient(ellipse at right center, rgba(0,229,255,0.08) 0%, transparent 70%)",
            }}
          />

          {/* Шапка: только лого (закрытие — кнопка-бургер справа) */}
          <div
            className="relative z-10 flex items-center px-5 py-5 shrink-0 pr-16"
            style={{ borderBottom: "1px solid rgba(255,255,255,0.06)" }}
          >
            <div className="flex items-center gap-2">
              <div className="w-0.5 h-6 shrink-0" style={{ background: "var(--c-cyan,#00E5FF)" }} />
              <span className="gh-logo text-white" style={{ fontSize: "1.15rem", letterSpacing: "0.14em" }}>
                GAME<span style={{ color: "var(--c-cyan,#00E5FF)" }}>HUB</span>
              </span>
            </div>
          </div>

          <div
            className="relative z-10 flex-1 min-h-0 overflow-hidden flex flex-col px-5 py-6 max-w-md mx-auto w-full"
            style={{ maxHeight: "100%" }}
          >
            <nav className="flex flex-col gap-0 shrink-0" aria-label="Разделы">
              {LINKS.map((l) => {
                const id = l.href.slice(1);
                const active = activeId === id;
                return (
                  <a
                    key={l.label}
                    href={l.href}
                    onClick={(e) => {
                      e.preventDefault();
                      scrollTo(l.href);
                    }}
                    className="flex items-center gap-3 py-5 uppercase transition-colors"
                    style={{
                      fontFamily: "'Barlow Condensed',sans-serif",
                      fontWeight: 800,
                      letterSpacing: "0.2em",
                      fontSize: "0.72rem",
                      color: active ? "#00E5FF" : "rgba(255,255,255,0.88)",
                      borderBottom: "1px solid rgba(255,255,255,0.06)",
                    }}
                  >
                    <span
                      className="w-1 h-6 shrink-0 rounded-sm transition-colors"
                      style={{ background: active ? "#00E5FF" : "rgba(255,255,255,0.12)" }}
                    />
                    {l.label}
                  </a>
                );
              })}
            </nav>

            <div className="w-full shrink-0 mt-3 space-y-2">
              <button
                type="button"
                onClick={() => scrollTo("#tickets")}
                className="btn-primary w-full flex items-center justify-center gap-2"
                style={{
                  padding: "12px 18px",
                  fontSize: "0.65rem",
                  letterSpacing: "0.2em",
                  clipPath: "polygon(10px 0, 100% 0, calc(100% - 10px) 100%, 0 100%)",
                }}
              >
                <Ticket size={14} />
                Получить билет
              </button>
              <div className="text-center py-1">
                <a
                  href="/public-offer"
                  onClick={() => setOpen(false)}
                  style={{
                    fontFamily: "'Barlow',sans-serif",
                    fontSize: "0.65rem",
                    letterSpacing: "0.06em",
                    color: "rgba(255,255,255,0.28)",
                  }}
                  className="hover:text-white/45 transition-colors"
                >
                  Публичная оферта
                </a>
              </div>
            </div>

            <div className="flex-1 min-h-0 flex flex-col justify-end pb-1">
              <p
                className="text-center mb-2"
                style={{
                  fontFamily: "'Barlow Condensed',sans-serif",
                  fontSize: "0.5rem",
                  letterSpacing: "0.3em",
                  color: "rgba(255,255,255,0.35)",
                  textTransform: "uppercase",
                }}
              >
                Мы в соцсетях
              </p>
              <div className="flex items-center justify-center gap-2">
                {SOCIALS.map(({ Icon, label, href }) => (
                  <a
                    key={label}
                    href={href}
                    aria-label={label}
                    onClick={() => setOpen(false)}
                    className="w-10 h-10 flex items-center justify-center transition-all duration-200 active:scale-95 shrink-0"
                    style={{
                      border: "1px solid rgba(0,229,255,0.25)",
                      background: "rgba(5,5,14,0.9)",
                      clipPath: "polygon(6px 0, 100% 0, calc(100% - 6px) 100%, 0 100%)",
                    }}
                  >
                    <Icon size={18} style={{ color: "#00E5FF" }} />
                  </a>
                ))}
              </div>
              <p
                className="text-center mt-3"
                style={{
                  fontFamily: "'Barlow',sans-serif",
                  fontSize: "0.6rem",
                  color: "rgba(255,255,255,0.22)",
                  letterSpacing: "0.02em",
                }}
              >
                11–12 апреля 2026 · Алматы
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
