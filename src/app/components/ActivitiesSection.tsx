import { useState } from "react";
import { Trophy, Swords, Gamepad2, Cake, MicVocal } from "lucide-react";

const ACTS = [
  { n: "01", icon: Trophy,   title: "Турниры",            color: "#00E5FF", desc: "Официальные соревнования по CS2, Dota 2, PUBG и другим играм. Призовые фонды, рейтинг и звание чемпиона арены." },
  { n: "02", icon: Swords,   title: "Шоу-матчи",          color: "#7C3AED", desc: "Звёздные стримеры против про-игроков на главной сцене. Зрелищные матчи и прямая трансляция для всей арены." },
  { n: "03", icon: Gamepad2, title: "Игровые конкурсы",   color: "#F0B429", desc: "Интерактивные конкурсы для зрителей: скоростные забеги, челленджи на сцене и призы от партнёров." },
  { n: "04", icon: Cake,     title: "Вирусные челленджи", color: "#F03558", desc: "Тренды из соцсетей оживают на сцене. Костюмы, эмодзи, мемы — судьи стримеры, призы лучшим." },
  { n: "05", icon: MicVocal, title: "Автограф-сессии",    color: "#00D97E", desc: "Встречи со стримерами и гостями фестиваля. Фото, автографы и живое общение в отдельной зоне." },
];

export function ActivitiesSection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const active = ACTS[activeIndex];

  return (
    <section
      id="activities"
      className="sec-fullscreen relative overflow-hidden flex flex-col"
      style={{
        background: "#050508",
        /* больше отступ сверху от header */
        padding: "clamp(74px, 8vw, 116px) var(--sec-px) clamp(32px, 4vw, 48px)",
      }}
    >
      <div
        className="absolute inset-0 pointer-events-none transition-all duration-700 ease-out"
        style={{
          background: `radial-gradient(ellipse 80% 70% at 50% 40%, ${active.color}18 0%, transparent 55%),
                      radial-gradient(ellipse 60% 50% at 80% 80%, ${active.color}0C 0%, transparent 50%),
                      #050508`,
        }}
      />
      <div className="absolute inset-0 bg-grid opacity-40 pointer-events-none transition-opacity duration-500" />

      <div
        style={{
          maxWidth: "1380px",
          margin: "0 auto",
          position: "relative",
          zIndex: 10,
          flex: 1,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          gap: "20px",
        }}
        className="justify-start gap-4 md:justify-center md:gap-5"
      >

        {/* Header + tabs сверху */}
        <div className="mb-3 md:mb-7">
          <div className="flex flex-col items-start gap-2 mb-4 md:flex-row md:items-end md:justify-between md:gap-6 md:mb-8">
            <h2
              className="gh-title text-white uppercase"
              style={{
                fontFamily: "\"Druk Cyr\", sans-serif",
                fontSize: "clamp(1.7rem, 6.5vw, 3.6rem)",
                lineHeight: 0.95,
                fontStyle: "italic",
                letterSpacing: "0.03em",
              }}
            >
              Основные активности
            </h2>
            <div
              className="hidden md:block"
              style={{ fontFamily: "'Barlow',sans-serif", color: "rgba(255,255,255,0.72)", fontSize: "1rem" }}
            >
              Что будет на фестивале
            </div>
          </div>

          <div className="flex flex-wrap gap-2 md:flex-nowrap md:gap-2.5">
            {ACTS.map((a, i) => {
              const Icon = a.icon;
              const isActive = activeIndex === i;
              return (
                <button
                  key={a.title}
                  type="button"
                  onClick={() => setActiveIndex(i)}
                  className="group relative overflow-hidden flex items-center justify-start text-left cursor-pointer transition-all duration-350 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-[#050508] focus-visible:ring-[var(--c-cyan)] h-11 px-3 basis-[calc(50%-4px)] md:h-[52px] md:px-4 md:basis-0 md:flex-1"
                  style={{
                    clipPath: "polygon(8% 0,100% 0,92% 100%,0 100%)",
                    background: isActive ? "rgba(5,5,8,0.95)" : "#050508",
                    border: isActive ? `1px solid ${a.color}40` : "1px solid transparent",
                    boxShadow: isActive ? `0 0 0 1px ${a.color}20` : "none",
                    fontFamily: "'Barlow Condensed',sans-serif",
                    letterSpacing: "0.03em",
                    fontSize: "0.98rem",
                    fontWeight: 700,
                    minWidth: "0",
                  }}
                >
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

                  <div className="flex items-center gap-2 relative z-10 md:gap-3">
                    <div
                      className="w-7 h-7 flex-shrink-0 flex items-center justify-center transition-transform duration-350 group-hover:scale-105 md:w-8 md:h-8"
                      style={{
                        background: `${a.color}12`,
                        border: `1px solid ${a.color}28`,
                        clipPath: "polygon(12% 0,100% 0,88% 100%,0 100%)",
                      }}
                    >
                      <Icon size={14} style={{ color: a.color }} />
                    </div>
                    <span
                      className="gh-title transition-colors duration-300 text-[0.8rem] leading-none md:text-base md:leading-normal"
                      style={{ color: isActive ? "white" : "rgba(255,255,255,0.5)" }}
                    >
                      {a.title}
                    </span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Блок результата снизу */}
        <div
          className="rounded-lg border transition-all duration-500 flex flex-col min-h-[220px] md:flex-none md:min-h-[460px]"
          style={{
            borderColor: `${active.color}25`,
            background: "rgba(5,5,8,0.4)",
            backdropFilter: "blur(8px)",
          }}
        >
          <div className="p-4 md:p-12">
            <div className="flex items-center gap-2 mb-2 md:gap-5 md:mb-6">
              <div
                className="w-10 h-10 flex-shrink-0 flex items-center justify-center [&_svg]:!w-[18px] [&_svg]:!h-[18px] md:w-16 md:h-16 md:[&_svg]:!w-[28px] md:[&_svg]:!h-[28px]"
                style={{
                  background: `${active.color}15`,
                  border: `1px solid ${active.color}35`,
                  clipPath: "polygon(12% 0,100% 0,88% 100%,0 100%)",
                }}
              >
                <active.icon size={28} style={{ color: active.color }} />
              </div>
              <h3
                className="gh-title text-white !text-base md:!text-[clamp(1.75rem,3vw,2.5rem)]"
              >
                {active.title}
              </h3>
            </div>
            <p
              className="transition-opacity duration-500 text-[0.84rem] leading-snug md:text-[1.05rem] md:leading-[1.8]"
              style={{
                fontFamily: "'Barlow',sans-serif",
                letterSpacing: "0.03em",
                color: "rgba(255,255,255,0.78)",
                maxWidth: "620px",
              }}
            >
              {active.desc}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
