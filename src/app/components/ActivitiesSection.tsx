import { useState } from "react";
import { Trophy, Swords, Gamepad2, Cake, MicVocal } from "lucide-react";

const ACTS = [
  { n: "01", icon: Trophy,   title: "Турниры",               tag: "Соревнования",  color: "#00E5FF", desc: "Официальные соревнования по CS2, Dota 2, PUBG и другим играм. Призовые фонды, рейтинг и звание чемпиона арены." },
  { n: "02", icon: Swords,   title: "Шоу-матчи",             tag: "Развлечения",  color: "#7C3AED", desc: "Звёздные стримеры против про-игроков на главной сцене. Зрелищные матчи и прямая трансляция для всей арены." },
  { n: "03", icon: Gamepad2, title: "Игровые конкурсы",      tag: "Интерактив",   color: "#F0B429", desc: "Интерактивные конкурсы для зрителей: скоростные забеги, челленджи на сцене и призы от партнёров." },
  { n: "04", icon: Cake,     title: "Вирусные челленджи",    tag: "Главный хедлайнер", color: "#F03558", desc: "Тренды из соцсетей оживают на сцене. Костюмы, эмодзи, мемы — судьи стримеры, призы лучшим." },
  { n: "05", icon: MicVocal, title: "Автограф-сессии",       tag: "Эксклюзив",    color: "#00D97E", desc: "Встречи со стримерами и гостями фестиваля. Фото, автографы и живое общение в отдельной зоне." },
];

export function ActivitiesSection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const active = ACTS[activeIndex];

  return (
    <section
      id="activities"
      className="relative overflow-hidden min-h-screen flex flex-col"
      style={{ background: "#050508", padding: "var(--sec-py) var(--sec-px)" }}
    >
      {/* Фон: плавно меняется в зависимости от выбранной активности */}
      <div
        className="absolute inset-0 pointer-events-none transition-all duration-700 ease-out"
        style={{
          background: `radial-gradient(ellipse 80% 70% at 50% 40%, ${active.color}18 0%, transparent 55%),
                      radial-gradient(ellipse 60% 50% at 80% 80%, ${active.color}0C 0%, transparent 50%),
                      #050508`,
        }}
      />
      <div className="absolute inset-0 bg-grid opacity-40 pointer-events-none transition-opacity duration-500" />

      <div style={{ maxWidth: "1380px", margin: "0 auto", position: "relative", zIndex: 10, flex: 1, display: "flex", flexDirection: "column" }}>

        {/* ── Сверху: заголовок и описание ── */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-10 mb-10 md:mb-14">
          <div>
            <div className="eyebrow">Что будет на фестивале</div>
            <h2 className="gh-title text-white" style={{ fontSize: "var(--h2-sec)" }}>
              Основные<br />
              <span style={{ color: "var(--c-cyan,#00E5FF)" }}>активности</span>
            </h2>
          </div>
        </div>

        {/* ── Центр: контент выбранной активности (зона под фото/фон) ── */}
        <div
          className="flex-1 flex flex-col justify-center min-h-[280px] md:min-h-[360px] rounded-lg border transition-all duration-500"
          style={{
            borderColor: `${active.color}25`,
            background: "rgba(5,5,8,0.4)",
            backdropFilter: "blur(8px)",
          }}
        >
          <div className="p-8 md:p-12">
            <div className="flex items-center gap-4 mb-6">
              <span
                className="tag-angled"
                style={{ background: `${active.color}22`, border: `1px solid ${active.color}44`, color: active.color }}
              >
                {active.tag}
              </span>
            </div>
            <div className="flex items-center gap-5 mb-6">
              <div
                className="w-16 h-16 flex-shrink-0 flex items-center justify-center"
                style={{
                  background: `${active.color}15`,
                  border: `1px solid ${active.color}35`,
                  clipPath: "polygon(12% 0,100% 0,88% 100%,0 100%)",
                }}
              >
                <active.icon size={28} style={{ color: active.color }} />
              </div>
              <h3 className="gh-title text-white" style={{ fontSize: "clamp(1.75rem, 3vw, 2.5rem)" }}>
                {active.title}
              </h3>
            </div>
            <p
              className="transition-opacity duration-500"
              style={{
                fontFamily: "'Barlow',sans-serif",
                fontSize: "1.05rem",
                color: "rgba(255,255,255,0.78)",
                lineHeight: 1.8,
                maxWidth: "620px",
              }}
            >
              {active.desc}
            </p>
          </div>
        </div>

        {/* ── Снизу: кликабельные переключатели ── */}
        <div
          className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 mt-8 md:mt-10"
          style={{ gap: "1px", background: "rgba(255,255,255,0.06)" }}
        >
          {ACTS.map((a, i) => {
            const Icon = a.icon;
            const isActive = activeIndex === i;
            return (
              <button
                key={a.title}
                type="button"
                onClick={() => setActiveIndex(i)}
                className="group relative overflow-hidden flex flex-col items-start text-left cursor-pointer transition-all duration-350 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-[#050508] focus-visible:ring-[var(--c-cyan)]"
                style={{
                  background: isActive ? "rgba(5,5,8,0.95)" : "#050508",
                  minHeight: "140px",
                  padding: "20px 18px",
                  border: isActive ? `1px solid ${a.color}40` : "1px solid transparent",
                  boxShadow: isActive ? `0 0 0 1px ${a.color}20` : "none",
                }}
              >
                {/* Hover / active glow */}
                <div
                  className="absolute inset-0 pointer-events-none transition-opacity duration-400"
                  style={{
                    opacity: isActive ? 1 : 0,
                    background: `linear-gradient(to top, ${a.color}12 0%, transparent 50%)`,
                  }}
                />
                {!isActive && (
                  <div
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity duration-400"
                    style={{ background: `radial-gradient(ellipse at 100% 0%, ${a.color}0E 0%, transparent 70%)` }}
                  />
                )}
                {/* Top accent bar when active */}
                <div
                  className="absolute top-0 left-0 right-0 h-[2px] transition-opacity duration-300"
                  style={{
                    opacity: isActive ? 1 : 0,
                    background: `linear-gradient(90deg, ${a.color}, ${a.color}44, transparent)`,
                  }}
                />
                <div
                  className="absolute top-0 left-0 bottom-0 w-[2px] transition-opacity duration-300"
                  style={{ background: a.color, opacity: isActive ? 0.8 : 0 }}
                />

                <div className="flex items-center gap-3 mb-3 relative z-10">
                  <span
                    className="tag-angled w-fit"
                    style={{
                      background: isActive ? `${a.color}22` : `${a.color}0C`,
                      border: `1px solid ${a.color}28`,
                      color: a.color,
                      fontSize: "0.5rem",
                    }}
                  >
                    {a.tag}
                  </span>
                </div>

                <div className="flex items-center gap-3 relative z-10">
                  <div
                    className="w-11 h-11 flex-shrink-0 flex items-center justify-center transition-transform duration-350 group-hover:scale-105"
                    style={{
                      background: `${a.color}12`,
                      border: `1px solid ${a.color}28`,
                      clipPath: "polygon(12% 0,100% 0,88% 100%,0 100%)",
                    }}
                  >
                    <Icon size={18} style={{ color: a.color }} />
                  </div>
                  <h3
                    className="gh-title transition-colors duration-300"
                    style={{
                      fontSize: "1.1rem",
                      color: isActive ? "white" : "rgba(255,255,255,0.5)",
                    }}
                  >
                    {a.title}
                  </h3>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}
