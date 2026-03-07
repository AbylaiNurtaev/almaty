import { useEffect, useState } from "react";
import { Zap, Star, ArrowRight } from "lucide-react";

const BG = "https://images.unsplash.com/photo-1614609005636-648d357485c9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlc3BvcnRzJTIwYXJlbmElMjBzcGVjdGFjdWxhciUyMGNvbmNlcnQlMjBsaWdodGluZyUyMG1hc3NpdmUlMjBjcm93ZCUyMHN0YWdlfGVufDF8fHx8MTc3MjgwNTQ1M3ww&ixlib=rb-4.1.0&q=80&w=1920";

const TARGET = new Date("2026-04-11T10:00:00");

function useCountdown(t: Date) {
  const calc = () => {
    const d = t.getTime() - Date.now();
    if (d <= 0) return { D: 0, H: 0, M: 0, S: 0 };
    return {
      D: Math.floor(d / 86400000),
      H: Math.floor((d % 86400000) / 3600000),
      M: Math.floor((d % 3600000) / 60000),
      S: Math.floor((d % 60000) / 1000),
    };
  };
  const [v, setV] = useState(calc());
  useEffect(() => {
    const id = setInterval(() => setV(calc()), 1000);
    return () => clearInterval(id);
  }, []);
  return v;
}

const STATS = [
  { val: "7,000+", label: "Посетителей",  accent: true },
  { val: "40+",    label: "Брендов",     accent: false },
  { val: "9+",     label: "Стримеров",  accent: false },
  { val: "2",      label: "Дня",       accent: false },
];

export function HeroSection() {
  const { D, H, M, S } = useCountdown(TARGET);

  return (
    <section
      id="hero"
      className="relative w-full min-h-screen flex flex-col overflow-hidden"
      style={{ background: "#050508" }}
    >
      {/* ════ BACKGROUND STACK ════ */}
      <div className="absolute inset-0">
        {/* Photo */}
        <img
          src={BG}
          alt=""
          className="absolute inset-0 w-full h-full object-cover object-center"
          style={{ filter: "brightness(0.18) saturate(1.2) contrast(1.08)", transform: "scale(1.05)" }}
        />

        {/* Left heavy vignette — content zone */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(100deg, #050508 0%, #050508 28%, rgba(5,5,8,0.88) 50%, rgba(5,5,8,0.25) 80%, rgba(5,5,8,0.08) 100%)",
          }}
        />

        {/* Top + bottom vignette */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to bottom, rgba(5,5,8,0.8) 0%, transparent 22%, transparent 62%, #050508 100%)",
          }}
        />

        {/* Atmospheric cyan glow — lower left */}
        <div
          className="absolute bottom-0 left-0 w-[1100px] h-[700px] pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse at 20% 90%, rgba(0,229,255,0.14) 0%, rgba(0,229,255,0.04) 35%, transparent 70%)",
          }}
        />

        {/* Purple glow — upper right */}
        <div
          className="absolute top-0 right-0 w-[700px] h-[700px] pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse at 80% 10%, rgba(124,58,237,0.1) 0%, transparent 65%)",
          }}
        />

        {/* Horizontal scan line across middle */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "linear-gradient(to bottom, transparent 48%, rgba(0,229,255,0.015) 50%, transparent 52%)",
          }}
        />

        {/* Dot grid */}
        <div className="absolute inset-0 bg-dots opacity-25 pointer-events-none" />

        {/* Scanlines */}
        <div className="absolute inset-0 scanlines pointer-events-none" />
      </div>

      {/* ════ TOP META BAR ════ */}
      <div className="relative z-20 pt-[76px]" style={{ padding: "76px var(--sec-px) 0" }}>
        <div
          style={{ maxWidth: "1380px", margin: "0 auto" }}
          className="flex flex-wrap items-center justify-between gap-4 pt-8"
        >
          {/* Live badge */}
          <div
            className="flex items-center gap-3 px-5 py-2.5"
            style={{
              background: "rgba(0,229,255,0.05)",
              border: "1px solid rgba(0,229,255,0.2)",
              backdropFilter: "blur(16px)",
            }}
          >
            <span
              className="dot-live rounded-full shrink-0"
              style={{ width: "8px", height: "8px", background: "var(--c-cyan,#00E5FF)", display: "inline-block" }}
            />
            <span
              style={{
                fontFamily: "'Barlow Condensed',sans-serif",
                fontSize: "0.72rem",
                letterSpacing: "0.24em",
                color: "var(--c-cyan,#00E5FF)",
                textTransform: "uppercase",
              }}
            >
              11–12 апреля 2026 · Арена Балуан Шолак · Алматы
            </span>
          </div>

        </div>
      </div>

      {/* ════ MAIN CONTENT ════ */}
      <div
        className="relative z-20 flex-1 flex items-center justify-center py-16"
        style={{ padding: "48px var(--sec-px) 48px" }}
      >
        <div style={{ maxWidth: "1380px", margin: "0 auto", width: "100%", display: "flex", flexDirection: "column", alignItems: "center" }}>
          <div style={{ maxWidth: "900px", width: "100%", textAlign: "center" }}>

            {/* Eyebrow */}
            <div className="eyebrow eyebrow-no-deco">Крупнейший игровой фестиваль Казахстана</div>

            {/* ── GAMEHUB TITLE ── */}
            <h1
              style={{
                fontFamily: "'Barlow Condensed',sans-serif",
                fontWeight: 900,
                textTransform: "uppercase",
                letterSpacing: "-0.045em",
                lineHeight: 0.80,
                fontSize: "clamp(3.5rem, 10vw, 8rem)",
                color: "white",
                marginBottom: "32px",
                position: "relative",
                whiteSpace: "nowrap",
                textAlign: "center",
              }}
            >
              GAME
              <span
                style={{
                  color: "var(--c-cyan,#00E5FF)",
                  display: "inline-block",
                }}
              >
                HUB
              </span>
            </h1>

            {/* Descriptor */}
            <p
              style={{
                fontFamily: "'Barlow',sans-serif",
                fontSize: "clamp(0.95rem, 1.5vw, 1.1rem)",
                color: "rgba(255,255,255,0.44)",
                lineHeight: 1.75,
                maxWidth: "740px",
                marginBottom: "48px",
                marginLeft: "auto",
                marginRight: "auto",
                fontWeight: 700,
              }}
            >
              Турниры, выставки брендов, шоу-матчи, франшизы и вирусные челленджи на сцене —
              два незабываемых дня, определяющих игровую сцену Казахстана.
            </p>

            {/* ── COUNTDOWN ── */}
            <div className="mb-12 flex flex-col items-center">
              <div className="eyebrow eyebrow-no-deco" style={{ marginBottom: "16px" }}>
                <Zap size={9} />
                Обратный отсчёт
              </div>
              <div className="flex items-start justify-center gap-2">
                {[
                  { v: D, l: "Дней" },
                  { v: H, l: "Час" },
                  { v: M, l: "Мин" },
                  { v: S, l: "Сек" },
                ].map(({ v, l }, i) => (
                  <div key={l} className="flex items-start gap-2">
                    <div className="cd-box">
                      <span className="cd-val">{String(v).padStart(2, "0")}</span>
                      <span className="cd-lbl">{l}</span>
                    </div>
                    {i < 3 && <span className="cd-colon">:</span>}
                  </div>
                ))}
              </div>
            </div>

            {/* ── CTAs ── */}
            <div className="flex flex-wrap justify-center gap-3 mb-16">
              <a href="#tickets" className="btn-primary">
                <Zap size={14} />
                <span>Бесплатный билет</span>
              </a>
              <a href="#tickets" className="btn-gold">
                <Star size={14} />
                <span>VIP-доступ</span>
              </a>
              <a href="#clubs" className="btn-outline">
                <span>Регистрация клуба</span>
                <ArrowRight size={14} />
              </a>
            </div>

            {/* ── STATS ROW ── */}
            <div
              style={{
                borderTop: "1px solid rgba(255,255,255,0.07)",
                paddingTop: "36px",
                display: "flex",
                flexWrap: "wrap",
                justifyContent: "center",
                gap: 0,
              }}
            >
              {STATS.map((s, i) => (
                <div
                  key={s.label}
                  style={{
                    paddingLeft: i === 0 ? 0 : "clamp(20px,4vw,40px)",
                    paddingRight: "clamp(20px,4vw,40px)",
                    borderRight:
                      i < STATS.length - 1 ? "1px solid rgba(255,255,255,0.07)" : "none",
                  }}
                >
                  <div
                    className="stat-num"
                    style={{
                      fontSize: "clamp(2rem, 4vw, 3rem)",
                      color: s.accent ? "var(--c-cyan,#00E5FF)" : "white",
                    }}
                  >
                    {s.val}
                  </div>
                  <div className="stat-lbl">{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

    </section>
  );
}