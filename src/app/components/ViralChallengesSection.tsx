import { useState, useRef, useEffect } from "react";
import { ArrowRight } from "lucide-react";

const CHALS = [
  { title: "Торт в лицо",   tag: "Главный",    color: "#E8284A" },
  { title: "Спидраны", tag: "Соревнования", color: "#FF6500" },
  { title: "Голосование зала",       tag: "Интерактив", color: "#F5B800" },
  { title: "Косплей-батл", tag: "Творчество",    color: "#6B21E8" },
  { title: "Викторина",     tag: "Знания",   color: "#00D4F5" },
  { title: "Битва эмодзи",     tag: "Веселье",         color: "#00C875" },
];

const TYPING_SPEED_MS = 60;
const CURSOR_OFFSET = 16;

export function ViralChallengesSection() {
  const [cursor, setCursor] = useState({ x: 0, y: 0 });
  const [hoveredCard, setHoveredCard] = useState<{ title: string; color: string } | null>(null);
  const [typedLen, setTypedLen] = useState(0);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    if (!hoveredCard) {
      setTypedLen(0);
      return;
    }
    const text = hoveredCard.title;
    setTypedLen(1);
    let index = 1;
    const id = setInterval(() => {
      index += 1;
      if (index > text.length) {
        if (intervalRef.current) clearInterval(intervalRef.current);
        intervalRef.current = null;
        return;
      }
      setTypedLen(index);
    }, TYPING_SPEED_MS);
    intervalRef.current = id;
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
      intervalRef.current = null;
    };
  }, [hoveredCard?.title]);

  return (
    <section
      id="challenges"
      className="sec-fullscreen relative overflow-hidden max-md:!p-0 max-md:flex max-md:flex-col max-md:items-center max-md:min-h-0 max-md:py-[max(8px,env(safe-area-inset-top))] max-md:pb-[max(8px,env(safe-area-inset-bottom))]"
      style={{ background: "#050508", padding: "var(--sec-py) var(--sec-px)" }}
    >

      {/* Tooltip у курсора с эффектом печати */}
      {hoveredCard && (
        <div
          className="fixed pointer-events-none z-[9999]"
          style={{
            left: cursor.x + CURSOR_OFFSET,
            top: cursor.y + CURSOR_OFFSET,
          }}
        >
          <div
            className="flex items-center gap-2 px-3 py-2 rounded-full whitespace-nowrap shadow-lg"
            style={{
              background: "rgba(5,5,8,0.95)",
              border: `1px solid ${hoveredCard.color}40`,
              boxShadow: `0 0 20px ${hoveredCard.color}20`,
            }}
          >
            <div className="w-1.5 h-1.5 rounded-full shrink-0" style={{ background: hoveredCard.color }} />
            <span
              style={{
                fontFamily: "'Barlow Condensed',sans-serif",
                fontSize: "0.75rem",
                letterSpacing: "0.08em",
                color: hoveredCard.color,
                textTransform: "uppercase",
              }}
            >
              {hoveredCard.title.slice(0, typedLen)}
              <span
                className="animate-typing-cursor inline-block w-[2px] ml-0.5 align-baseline"
                style={{ background: hoveredCard.color, height: "1em", verticalAlign: "text-bottom" }}
              />
            </span>
          </div>
        </div>
      )}

      <div className="absolute inset-0 bg-grid opacity-50 pointer-events-none" />
      <div className="absolute inset-0 pointer-events-none"
        style={{ background: "radial-gradient(ellipse 80% 40% at 50% 0%, rgba(240,53,88,0.09) 0%, transparent 65%)" }} />
      <div className="absolute inset-0 pointer-events-none"
        style={{ background: "radial-gradient(ellipse 60% 35% at 50% 100%, rgba(240,53,88,0.05) 0%, transparent 70%)" }} />
      <div
        className="max-md:w-[95vw] max-md:max-w-[95vw] max-md:mx-auto max-md:flex max-md:flex-col max-md:items-center max-md:min-h-0 max-md:flex-1 max-md:self-stretch"
        style={{ maxWidth: "1380px", margin: "0 auto", position: "relative", zIndex: 10 }}
      >

        {/* Мобилка: заголовок + сетка на всю высоту 100dvh */}
        <div className="mb-20 max-md:mb-4 max-md:mt-1 max-md:shrink-0 max-md:w-full max-md:text-center max-md:py-1">
          <div
            className="eyebrow max-md:!mb-2 max-md:!text-[0.55rem] max-md:!tracking-[0.18em] max-md:justify-center"
            style={{ color: "#F03558" }}
          >
            Вирусные моменты
          </div>
          <h2
            className="gh-title text-white max-md:!text-[clamp(1.35rem,5vw,1.85rem)] max-md:!leading-tight"
            style={{ fontSize: "var(--h2-sec)" }}
          >
            Вирусные<br />
            <span style={{ color: "#F03558" }}>челленджи</span>
          </h2>
        </div>

        {/* Мобилка: 6 равных строк на остаток высоты экрана */}
        <div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 mb-px w-full max-md:!grid-cols-1 max-md:grid-rows-6 max-md:auto-rows-fr max-md:flex-1 max-md:min-h-0 max-md:rounded-md max-md:border max-md:border-white/[0.06] max-md:overflow-hidden"
          style={{ gap: "1px", background: "rgba(255,255,255,0.06)" }}
        >
          {CHALS.map((ch) => (
              <div
                key={ch.title}
                className="group relative overflow-hidden bg-[#050508] min-h-[140px] p-6 max-md:min-h-0 max-md:h-full max-md:p-0 max-md:w-full max-md:flex max-md:flex-col"
                onMouseEnter={() => setHoveredCard({ title: ch.title, color: ch.color })}
                onMouseLeave={() => setHoveredCard(null)}
                onMouseMove={(e) => setCursor({ x: e.clientX, y: e.clientY })}
              >
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none max-md:hidden"
                  style={{ background: `radial-gradient(ellipse at 100% 0%, ${ch.color}12 0%, transparent 65%)` }} />
                <div className="absolute top-0 left-0 right-0 h-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-300 max-md:hidden"
                  style={{ background: `linear-gradient(90deg, ${ch.color}EE, ${ch.color}33, transparent)` }} />
                <div className="absolute top-0 left-0 bottom-0 w-[2px] opacity-0 group-hover:opacity-65 transition-opacity duration-300 max-md:hidden"
                  style={{ background: ch.color }} />

                {/* Мобилка: вся строка — ссылка, только стрелка */}
                <a
                  href="#tickets"
                  className="md:hidden relative z-10 flex min-h-[48px] h-full flex-1 items-center justify-between gap-3 py-2 px-4 w-full box-border no-underline active:opacity-90"
                  aria-label={`${ch.title} — билеты`}
                  onClick={() => setHoveredCard(null)}
                >
                  <h3
                    className="gh-title text-white !mb-0 !text-[0.82rem] leading-snug flex-1 min-w-0 font-semibold"
                    style={{ fontSize: "1.35rem" }}
                  >
                    {ch.title}
                  </h3>
                  <span
                    className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md text-[#070711]"
                    style={{ background: ch.color }}
                  >
                    <ArrowRight size={18} strokeWidth={2.5} />
                  </span>
                </a>

                {/* Десктоп: как было */}
                <div className="hidden md:flex flex-col min-h-[140px] h-full">
                  <h3 className="gh-title text-white relative z-10 mb-4" style={{ fontSize: "1.35rem" }}>
                    {ch.title}
                  </h3>
                  <a
                    href="#tickets"
                    className="btn-primary w-fit mt-auto shrink-0 relative z-10"
                    style={{ background: ch.color, padding: "10px 18px", fontSize: "0.8rem" }}
                    onMouseEnter={() => setHoveredCard(null)}
                    onMouseLeave={() => setHoveredCard({ title: ch.title, color: ch.color })}
                  >
                    <span>Получить билет</span>
                    <ArrowRight size={12} />
                  </a>
                </div>
              </div>
          ))}
        </div>
      </div>
    </section>
  );
}