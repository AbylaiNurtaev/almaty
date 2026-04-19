import React, { useEffect, useMemo, useState } from "react";
import { ArrowRight } from "lucide-react";
import { useLanguage } from "../context/LanguageContext";

export function Navbar() {
  const { t, toggleLanguage } = useLanguage();
  const [activeId, setActiveId] = useState<string>("hero");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const links = useMemo(
    () => [
      { label: t.navbar.links.home, href: "#hero" },
      { label: t.navbar.links.guests, href: "#streamers" },
      { label: t.navbar.links.activities, href: "#games" },
      { label: t.navbar.links.expo, href: "#brands" },
      { label: t.navbar.links.map, href: "#map" },
    ],
    [t],
  );

  useEffect(() => {
    const handler = (e: Event) => {
      const id = (e as CustomEvent<string>).detail;
      if (id) setActiveId(id);
    };
    window.addEventListener("snap-section-change", handler);
    return () => window.removeEventListener("snap-section-change", handler);
  }, []);

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
  };

  const desktopLinks = useMemo(
    () =>
      links.map((l) => {
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
            className="uppercase transition-colors duration-200 hover:text-white"
            style={{
              fontFamily: "'Barlow Condensed', sans-serif",
              fontWeight: 700,
              letterSpacing: "0.06em",
              fontSize: "0.78rem",
              color: active ? "rgba(232, 244, 234, 1)" : "rgba(232, 244, 234, 0.65)",
              whiteSpace: "nowrap",
            }}
          >
            {l.label}
          </a>
        );
      }),
    [activeId, links]
  );

  const mobileLinks = useMemo(
    () =>
      links.map((l) => {
        const id = l.href.slice(1);
        const active = activeId === id;
        return (
          <a
            key={l.label}
            href={l.href}
            onClick={(e) => {
              e.preventDefault();
              scrollTo(l.href);
              setIsMobileMenuOpen(false);
            }}
            className="uppercase transition-colors duration-200"
            style={{
              fontFamily: "'Barlow Condensed', sans-serif",
              fontWeight: 700,
              letterSpacing: "0.06em",
              fontSize: "0.92rem",
              color: active ? "rgba(232, 244, 234, 1)" : "rgba(232, 244, 234, 0.74)",
            }}
          >
            {l.label}
          </a>
        );
      }),
    [activeId, links]
  );

  return (
    <header className="fixed top-0 left-0 right-0 z-50 pointer-events-none">
      <div
        className="pointer-events-auto h-[64px] w-full"
        style={{
          borderBottom: "1px solid rgba(255,255,255,0.08)",
          background: "rgba(5,5,8,0.52)",
          backdropFilter: "blur(8px)",
        }}
      >
        <div className="mx-auto h-full w-full max-w-[1296px] px-3 md:px-0 flex items-center justify-between relative">
          <div className="flex items-center">
            <a
              href="#hero"
              onClick={(e) => {
                e.preventDefault();
                scrollTo("#hero");
              }}
              className="gh-logo text-white leading-none"
              style={{ fontSize: "1.7rem", letterSpacing: "0.05em" }}
            >
              GAME<span style={{ color: "var(--c-cyan,#00E5FF)" }}>HUB</span>
            </a>
          </div>

          <nav className="hidden md:flex items-center gap-12 absolute left-1/2 -translate-x-1/2" aria-label="Site navigation">
            {desktopLinks}
          </nav>

          <div className="hidden md:flex items-center gap-2">
            <button
              type="button"
              onClick={toggleLanguage}
              className="h-[40px] min-w-[56px] px-3 border border-white/20 text-white/80 hover:text-white transition-colors"
              style={{ fontFamily: "'Barlow Condensed', sans-serif", letterSpacing: "0.08em" }}
            >
              {t.navbar.switchTo}
            </button>

          <button
            type="button"
            onClick={() => scrollTo("#tickets")}
            className="hidden md:flex h-[40px] min-w-[172px] px-4 items-center justify-center gap-1 transition-opacity hover:opacity-90"
            style={{
              background: "#03E3FD",
              color: "#1A4C52",
              fontFamily: "'Barlow Condensed', sans-serif",
              fontWeight: 700,
              fontSize: "0.95rem",
              lineHeight: "1",
              letterSpacing: "0.02em",
              borderRadius: "0px",
              cursor: "pointer",
            }}
          >
            <span>{t.navbar.tickets}</span>
            <ArrowRight size={15} />
          </button>
          </div>

          <button
            type="button"
            onClick={() => setIsMobileMenuOpen((v) => !v)}
            aria-label={isMobileMenuOpen ? t.navbar.closeMenu : t.navbar.openMenu}
            aria-expanded={isMobileMenuOpen}
            className="md:hidden relative h-[40px] w-[40px] flex items-center justify-center transition-opacity hover:opacity-90"
            style={{
              border: "1px solid rgba(255,255,255,0.16)",
              background: "rgba(255,255,255,0.03)",
              color: "#E8F4EA",
            }}
          >
            <span className="sr-only">{isMobileMenuOpen ? t.navbar.closeMenu : t.navbar.openMenu}</span>
            <span className="relative block h-[14px] w-[18px]">
              <span
                className="absolute left-0 top-0 block h-[2px] w-full origin-center rounded-full transition-all duration-300"
                style={{
                  background: "#E8F4EA",
                  transform: isMobileMenuOpen ? "translateY(6px) rotate(45deg)" : "translateY(0) rotate(0deg)",
                }}
              />
              <span
                className="absolute left-0 top-1/2 block h-[2px] w-full -translate-y-1/2 rounded-full transition-all duration-200"
                style={{
                  background: "#E8F4EA",
                  opacity: isMobileMenuOpen ? 0 : 1,
                }}
              />
              <span
                className="absolute left-0 bottom-0 block h-[2px] w-full origin-center rounded-full transition-all duration-300"
                style={{
                  background: "#E8F4EA",
                  transform: isMobileMenuOpen ? "translateY(-6px) rotate(-45deg)" : "translateY(0) rotate(0deg)",
                }}
              />
            </span>
          </button>
        </div>
      </div>

      <div
        className={`pointer-events-auto md:hidden border-b border-white/10 transition-all duration-300 ease-out ${
          isMobileMenuOpen
            ? "opacity-100 translate-y-0 max-h-[320px]"
            : "opacity-0 -translate-y-2 max-h-0 pointer-events-none"
        }`}
        style={{
          background: "rgba(5,5,8,0.92)",
          backdropFilter: "blur(10px)",
          overflow: "hidden",
        }}
      >
        <div className="mx-auto w-full max-w-[1296px] px-3 py-4 flex flex-col gap-3">
          <nav className="flex flex-col gap-2" aria-label="Mobile site navigation">
            {mobileLinks}
          </nav>
          <button
            type="button"
            onClick={toggleLanguage}
            className="h-[40px] w-full px-4 flex items-center justify-center border border-white/20 text-white/80 hover:text-white transition-colors"
            style={{ fontFamily: "'Barlow Condensed', sans-serif", letterSpacing: "0.08em" }}
          >
            {t.navbar.switchTo}
          </button>
          <button
            type="button"
            onClick={() => {
              scrollTo("#tickets");
              setIsMobileMenuOpen(false);
            }}
            className="h-[40px] w-full px-4 flex items-center justify-center gap-1 transition-opacity hover:opacity-90"
            style={{
              background: "#03E3FD",
              color: "#1A4C52",
              fontFamily: "'Barlow Condensed', sans-serif",
              fontWeight: 700,
              fontSize: "0.95rem",
              lineHeight: "1",
              letterSpacing: "0.02em",
              borderRadius: "0px",
              cursor: "pointer",
            }}
          >
            <span>{t.navbar.tickets}</span>
            <ArrowRight size={15} />
          </button>
        </div>
      </div>
    </header>
  );
}
