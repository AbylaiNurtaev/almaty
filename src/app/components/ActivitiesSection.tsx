import { Trophy, Swords, Gamepad2, Cake, MicVocal } from "lucide-react";

const ACTS = [
  {
    n: "01", icon: Trophy,   title: "Турниры",        tag: "Соревнования",  color: "#00E5FF",
    desc: "Соревнования по CS2, PUBG и Dota 2. Лучшие игроки сражаются за славу и чемпионские титулы два незабываемых дня.",
  },
  {
    n: "02", icon: Swords,   title: "Шоу-матчи",       tag: "Развлечения",color: "#7C3AED",
    desc: "Эпичные шоу-матчи с участием лучших стримеров Казахстана на главной сцене перед тысячами зрителей.",
  },
  {
    n: "03", icon: Gamepad2, title: "Игровые конкурсы",    tag: "Интерактив",  color: "#F0B429",
    desc: "Открытые конкурсы для всех посетителей. Покажите свои навыки, соревнуйтесь в реальном времени и выигрывайте призы на месте.",
  },
  {
    n: "04", icon: Cake,     title: "Вирусные челленджи",   tag: "Главный хедлайнер", color: "#F03558",
    desc: "Легендарный Cake Challenge и другие вирусные моменты на сцене. Любой из толпы может выйти.",
  },
  {
    n: "05", icon: MicVocal, title: "Автограф-сессии", tag: "Эксклюзив",    color: "#00D97E",
    desc: "Встречайтесь с любимыми стримерами на автограф- и фотосессиях — ограниченное количество мест.",
  },
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
                style={{ background: "#050508", minHeight: "320px", padding: "32px 24px" }}
              >
                {/* Hover glow */}
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                  style={{ background: `radial-gradient(ellipse at 50% 0%, ${a.color}18 0%, transparent 70%)` }}
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

                {/* Tag */}
                <span
                  className="tag-angled mb-7 w-fit"
                  style={{ background: `${a.color}12`, border: `1px solid ${a.color}28`, color: a.color }}
                >
                  {a.tag}
                </span>

                {/* Icon */}
                <div
                  className="w-14 h-14 flex items-center justify-center mb-6 transition-all duration-350 group-hover:scale-110"
                  style={{
                    background: `${a.color}10`,
                    border: `1px solid ${a.color}28`,
                    clipPath: "polygon(12% 0,100% 0,88% 100%,0 100%)",
                    boxShadow: `0 0 0 0 ${a.color}`,
                    transition: "all 0.35s ease",
                  }}
                >
                  <Icon size={20} style={{ color: a.color }} />
                </div>

                {/* Number label */}
                <div
                  style={{
                    fontFamily: "'Barlow Condensed',sans-serif",
                    fontSize: "0.54rem",
                    letterSpacing: "0.28em",
                    color: `${a.color}50`,
                    textTransform: "uppercase",
                    marginBottom: "8px",
                  }}
                >
                  {a.n}
                </div>

                {/* Title */}
                <h3
                  className="gh-title text-white relative z-10"
                  style={{ fontSize: "1.75rem", marginBottom: "14px" }}
                >
                  {a.title}
                </h3>

                {/* Description */}
                <p
                  className="relative z-10 flex-1"
                  style={{
                    fontFamily: "'Barlow',sans-serif",
                    fontSize: "0.88rem",
                    color: "rgba(255,255,255,0.32)",
                    lineHeight: 1.75,
                  }}
                >
                  {a.desc}
                </p>
              </div>
            );
          })}
        </div>

        {/* ── Summary strip ── */}
        <div
          className="mt-px grid grid-cols-3"
          style={{ gap: "1px", background: "rgba(255,255,255,0.06)" }}
        >
          {[
            { v: "5", l: "Форматов развлечений" },
            { v: "2", l: "Дня активности" },
            { v: "9+", l: "Звёздных стримеров" },
          ].map((s) => (
            <div
              key={s.l}
              className="flex items-center gap-5 px-8 py-6"
              style={{ background: "#050508" }}
            >
              <div
                style={{
                  fontFamily: "'Barlow Condensed',sans-serif",
                  fontWeight: 900,
                  fontSize: "2rem",
                  lineHeight: 1,
                  color: "var(--c-cyan,#00E5FF)",
                  letterSpacing: "-0.02em",
                }}
              >
                {s.v}
              </div>
              <div
                style={{
                  fontFamily: "'Barlow Condensed',sans-serif",
                  fontSize: "0.68rem",
                  letterSpacing: "0.18em",
                  color: "rgba(255,255,255,0.2)",
                  textTransform: "uppercase",
                  lineHeight: 1.5,
                }}
              >
                {s.l}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}