import { Trophy, Swords, Gamepad2, Cake, MicVocal } from "lucide-react";

const ACTS = [
  { n: "01", icon: Trophy,   title: "Турниры",               tag: "Соревнования",  color: "#00E5FF" },
  { n: "02", icon: Swords,   title: "Шоу-матчи",             tag: "Развлечения",  color: "#7C3AED" },
  { n: "03", icon: Gamepad2, title: "Игровые конкурсы",      tag: "Интерактив",   color: "#F0B429" },
  { n: "04", icon: Cake,     title: "Вирусные челленджи",    tag: "Главный хедлайнер", color: "#F03558" },
  { n: "05", icon: MicVocal, title: "Автограф-сессии",       tag: "Эксклюзив",    color: "#00D97E" },
];

export function ActivitiesSection() {
  return (
    <section
      id="activities"
      className="relative overflow-hidden"
      style={{ background: "#050508", padding: "var(--sec-py) var(--sec-px)" }}
    >
      <div className="absolute inset-0 bg-grid opacity-50 pointer-events-none" />
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: "radial-gradient(ellipse 70% 45% at 50% 100%, rgba(0,229,255,0.06) 0%, transparent 70%)" }}
      />
      <div className="wm" style={{ fontSize: "clamp(10rem,20vw,18rem)", right: "-2rem", top: "-1rem" }}>02</div>

      <div style={{ maxWidth: "1380px", margin: "0 auto", position: "relative", zIndex: 10 }}>

        {/* ── Section Header ── */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-10 mb-16">
          <div>
            <div className="eyebrow">Что будет на фестивале</div>
            <h2 className="gh-title text-white" style={{ fontSize: "var(--h2-sec)" }}>
              Основные<br />
              <span style={{ color: "var(--c-cyan,#00E5FF)" }}>активности</span>
            </h2>
          </div>
          <p
            style={{
              fontFamily: "'Barlow',sans-serif",
              fontSize: "1rem",
              color: "rgba(255,255,255,0.32)",
              lineHeight: 1.78,
              maxWidth: "360px",
              paddingBottom: "8px",
            }}
          >
            Пять мировых форматов развлечений в два незабываемых дня на арене Балуан Шолак в Алматы.
          </p>
        </div>

        {/* ── Activity Cards ── */}
        <div
          className="grid sm:grid-cols-2 lg:grid-cols-5"
          style={{ gap: "1px", background: "rgba(255,255,255,0.06)" }}
        >
          {ACTS.map((a) => {
            const Icon = a.icon;
            return (
              <div
                key={a.title}
                className="group relative overflow-hidden flex flex-col cursor-default transition-all duration-350"
                style={{ background: "#050508", minHeight: "180px", padding: "28px 24px" }}
              >
                {/* Hover glow */}
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                  style={{ background: `radial-gradient(ellipse at 100% 0%, ${a.color}18 0%, transparent 70%)` }}
                />
                {/* Top accent bar */}
                <div
                  className="absolute top-0 left-0 right-0 h-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  style={{ background: `linear-gradient(90deg, ${a.color}ee, ${a.color}44, transparent)` }}
                />
                {/* Left accent */}
                <div
                  className="absolute top-0 left-0 bottom-0 w-[2px] opacity-0 group-hover:opacity-70 transition-opacity duration-300"
                  style={{ background: `linear-gradient(to bottom, ${a.color}, transparent)` }}
                />
                {/* BG number */}
                <div
                  className="absolute right-3 bottom-2 select-none pointer-events-none"
                  style={{
                    fontFamily: "'Barlow Condensed',sans-serif",
                    fontWeight: 900,
                    fontSize: "6.5rem",
                    lineHeight: 1,
                    color: `${a.color}06`,
                    letterSpacing: "-0.04em",
                  }}
                >
                  {a.n}
                </div>

                {/* Категория + нумерация в один ряд */}
                <div className="flex items-center gap-3 mb-5 relative z-10">
                  <span
                    className="tag-angled w-fit"
                    style={{ background: `${a.color}12`, border: `1px solid ${a.color}28`, color: a.color }}
                  >
                    {a.tag}
                  </span>
                  <span
                    style={{
                      fontFamily: "'Barlow Condensed',sans-serif",
                      fontSize: "0.54rem",
                      letterSpacing: "0.28em",
                      color: `${a.color}50`,
                      textTransform: "uppercase",
                    }}
                  >
                    {a.n}
                  </span>
                </div>

                {/* Title + Icon в один ряд */}
                <div className="flex items-center gap-4 relative z-10">
                  <div
                    className="w-14 h-14 flex-shrink-0 flex items-center justify-center transition-all duration-350 group-hover:scale-110"
                    style={{
                      background: `${a.color}10`,
                      border: `1px solid ${a.color}28`,
                      clipPath: "polygon(12% 0,100% 0,88% 100%,0 100%)",
                      transition: "all 0.35s ease",
                    }}
                  >
                    <Icon size={20} style={{ color: a.color }} />
                  </div>
                  <h3
                    className="gh-title text-white"
                    style={{ fontSize: "1.75rem" }}
                  >
                    {a.title}
                  </h3>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}