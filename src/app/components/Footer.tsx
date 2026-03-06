import { Instagram, Youtube, MessageCircle, MapPin, Calendar, Users } from "lucide-react";

const COLS = [
  { h: "Фестиваль",     links: [{ l: "О фестивале",       h: "#about" },  { l: "Активности",  h: "#activities" }, { l: "Программа",     h: "#program" },  { l: "Призы",      h: "#prizes" }] },
  { h: "Участие",  links: [{ l: "Бесплатный билет",  h: "#tickets" },{ l: "VIP-доступ",  h: "#tickets" },   { l: "Пропуск креатора",h: "#tickets" },  { l: "Клубы",       h: "#clubs" }] },
  { h: "Разделы",      links: [{ l: "Стримеры",    h: "#streamers"},{ l: "Игры",       h: "#games" },     { l: "Челленджи",  h: "#challenges"},{ l: "Выставка брендов",  h: "#brands" }] },
];

const SOCIALS = [
  { Icon: Instagram,     label: "Instagram", href: "#" },
  { Icon: Youtube,       label: "YouTube",   href: "#" },
  { Icon: MessageCircle, label: "Telegram",  href: "#" },
];

export function Footer() {
  return (
    <footer className="relative overflow-hidden"
      style={{ background: "#030308", borderTop: "1px solid rgba(255,255,255,0.05)" }}>

      <div className="absolute inset-0 bg-dots opacity-8 pointer-events-none" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-72 pointer-events-none"
        style={{ background: "radial-gradient(ellipse at top, rgba(0,212,245,0.04) 0%, transparent 65%)" }} />
      {/* Top neon */}
      <div className="absolute top-0 left-0 right-0 h-px"
        style={{ background: "linear-gradient(90deg, transparent, rgba(0,212,245,0.45), rgba(107,33,232,0.3), transparent)" }} />
      {/* GAMEHUB watermark */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 select-none pointer-events-none whitespace-nowrap"
        style={{ fontFamily: "'Barlow Condensed',sans-serif", fontWeight: 900, fontSize: "clamp(5rem,16vw,14rem)", lineHeight: 0.85, color: "rgba(255,255,255,0.008)", letterSpacing: "-0.05em" }}>
        GAMEHUB
      </div>

      <div className="relative z-10 px-8 md:px-12 xl:px-20 pt-20 pb-10"
        style={{ maxWidth: "1320px", margin: "0 auto" }}>

        {/* Top row */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10 md:gap-12 mb-16">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <div className="flex items-center gap-2.5 mb-6">
              <div className="w-px h-7 opacity-50" style={{ background: "var(--c-cyan,#00E5FF)" }} />
              <span style={{ fontFamily: "'Barlow Condensed',sans-serif", fontWeight: 900, fontSize: "1.7rem", lineHeight: 1, letterSpacing: "0.04em" }}>
                <span className="text-white">GAME</span>
                <span style={{ color: "var(--c-cyan,#00E5FF)" }}>HUB</span>
              </span>
            </div>
            <p style={{ fontFamily: "'Barlow',sans-serif", fontSize: "0.85rem", color: "rgba(255,255,255,0.2)", lineHeight: 1.72, marginBottom: "22px" }}>
              Крупнейший игровой и компьютерный клубный фестиваль Казахстана. 11–12 апреля на арене Балуан Шолак, Алматы.
            </p>
            <div className="space-y-2.5">
              {[{ I: Calendar, t: "11–12 апреля 2026" }, { I: MapPin, t: "Арена Балуан Шолак" }, { I: Users, t: "7 000+ посетителей" }].map(({ I, t }) => (
                <div key={t} className="flex items-center gap-2.5">
                  <I size={11} style={{ color: "#00D4F5", opacity: 0.5 }} />
                  <span style={{ fontFamily: "'Barlow Condensed',sans-serif", fontSize: "0.6rem", letterSpacing: "0.18em", color: "rgba(255,255,255,0.18)", textTransform: "uppercase" }}>{t}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Link columns */}
          {COLS.map((col) => (
            <div key={col.h}>
              <div style={{ fontFamily: "'Barlow Condensed',sans-serif", fontSize: "0.55rem", letterSpacing: "0.32em", color: "rgba(255,255,255,0.14)", textTransform: "uppercase", marginBottom: "18px", display: "flex", alignItems: "center", gap: "8px" }}>
                <span style={{ width: "14px", height: "1px", background: "rgba(255,255,255,0.12)", display: "inline-block" }} />
                {col.h}
              </div>
              <ul className="space-y-3">
                {col.links.map((link) => (
                  <li key={link.l}>
                    <a href={link.h}
                      className="group inline-flex items-center gap-2 transition-colors duration-200"
                      style={{ fontFamily: "'Barlow',sans-serif", fontSize: "0.88rem", color: "rgba(255,255,255,0.26)" }}>
                      <span className="w-3 h-px" style={{ background: "rgba(255,255,255,0.14)", display: "inline-block" }} />
                      <span className="group-hover:text-white transition-colors duration-200">{link.l}</span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-5 pt-6"
          style={{ borderTop: "1px solid rgba(255,255,255,0.04)" }}>
          <div className="flex flex-col sm:flex-row items-center gap-3 sm:gap-6">
            <div style={{ fontFamily: "'Barlow',sans-serif", fontSize: "0.78rem", color: "rgba(255,255,255,0.14)" }}>
              © 2026 Фестиваль GAMEHUB. Все права защищены. Алматы, Казахстан.
            </div>
            <a href="/public-offer" className="text-sm transition-colors duration-200 hover:text-white"
              style={{ fontFamily: "'Barlow',sans-serif", color: "rgba(255,255,255,0.3)" }}>
              Публичная оферта
            </a>
          </div>
          <div className="flex items-center gap-4">
            {SOCIALS.map(({ Icon, label, href }) => (
              <a key={label} href={href} aria-label={label}
                className="group w-14 h-14 flex items-center justify-center relative overflow-hidden transition-all duration-200"
                style={{ border: "1px solid rgba(255,255,255,0.07)" }}>
                <div className="absolute inset-0 bg-[#00D4F5] opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
                <Icon size={24} style={{ color: "rgba(255,255,255,0.2)" }}
                  className="relative z-10 group-hover:text-[#030308] transition-colors duration-200" />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}