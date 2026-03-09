import { Instagram, Youtube, MessageCircle } from "lucide-react";

const SOCIALS = [
  { Icon: Instagram, label: "Instagram", href: "#" },
  { Icon: Youtube,   label: "YouTube",   href: "#" },
  { Icon: MessageCircle, label: "Telegram", href: "#" },
];

export function Footer() {
  return (
    <footer
      className="relative overflow-hidden"
      style={{ background: "#030308", borderTop: "1px solid rgba(255,255,255,0.05)" }}
    >
      <div className="absolute inset-0 bg-dots opacity-8 pointer-events-none" />
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-32 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at top, rgba(0,212,245,0.05) 0%, transparent 70%)",
        }}
      />
      <div
        className="absolute top-0 left-0 right-0 h-px"
        style={{
          background:
            "linear-gradient(90deg, transparent, rgba(0,212,245,0.45), rgba(107,33,232,0.3), transparent)",
        }}
      />

      <div
        className="relative z-10 px-4 sm:px-8 lg:px-12 py-3 sm:py-4"
        style={{ maxWidth: "1320px", margin: "0 auto" }}
      >
        <div
          className="flex flex-wrap sm:flex-nowrap items-center gap-x-4 gap-y-2"
          style={{
            fontFamily: "'Barlow Condensed',sans-serif",
            fontSize: "0.7rem",
            letterSpacing: "0.18em",
            textTransform: "uppercase",
            color: "rgba(255,255,255,1)",
          }}
        >
          {/* Лого */}
          <div className="flex items-center gap-2 whitespace-nowrap">
            <div
              className="w-px h-5 opacity-50"
              style={{ background: "var(--c-cyan,#00E5FF)" }}
            />
            <span
              style={{
                fontFamily: "'Barlow Condensed',sans-serif",
                fontWeight: 900,
                fontSize: "1.1rem",
                lineHeight: 1,
                letterSpacing: "0.12em",
              }}
            >
              <span className="text-white">GAME</span>
              <span style={{ color: "var(--c-cyan,#00E5FF)" }}>HUB</span>
            </span>
          </div>

          {/* Даты и описание места */}
          <span className="whitespace-nowrap">11–12 апреля 2026</span>
          <span className="whitespace-nowrap">Арена Балуан Шолак</span>

          {/* Правовой блок + соцсети справа */}
          <div className="flex items-center gap-3 sm:ml-auto">
            <span
              className="whitespace-nowrap"
              style={{
                fontFamily: "'Barlow',sans-serif",
                letterSpacing: "0.03em",
                textTransform: "none",
                fontSize: "0.7rem",
              }}
            >
              2026 Фестиваль GAMEHUB. Все права защищены. Алматы, Казахстан.
            </span>

            <a
              href="/public-offer"
              className="whitespace-nowrap transition-colors duration-200 hover:text-white"
              style={{
                fontFamily: "'Barlow',sans-serif",
                letterSpacing: "0.03em",
                textTransform: "none",
                fontSize: "0.7rem",
              }}
            >
              Публичная оферта
            </a>

            {/* Соцсети */}
            <div className="flex items-center gap-3">
              {SOCIALS.map(({ Icon, label, href }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="group w-8 h-8 sm:w-9 sm:h-9 flex items-center justify-center relative overflow-hidden transition-all duration-200"
                  style={{ border: "1px solid rgba(255,255,255,0.18)" }}
                >
                  <div className="absolute inset-0 bg-[#00D4F5] opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
                  <Icon
                    size={16}
                    style={{ color: "rgba(255,255,255,1)" }}
                    className="relative z-10 group-hover:text-[#030308] transition-colors duration-200"
                  />
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}