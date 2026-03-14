import { useState } from "react";
import { Trophy, ChevronRight } from "lucide-react";

import cs1 from "../../assets/cs1.webp";
import pubg1 from "../../assets/pubg1.webp";
import dota2 from "../../assets/dota2.jpg";

import csIcon from "../../icons/cs.png";
import pubgIcon from "../../icons/pubg.png";
import dotaIcon from "../../icons/dota-2.png";

const IMGS = {
  cs2: cs1,
  pubg: pubg1,
  dota: dota2,
};

const GAME_ICONS = {
  cs2: csIcon,
  pubg: pubgIcon,
  dota: dotaIcon,
} as const;

const GAMES = [
  { id: "cs2", name: "Counter-Strike 2", short: "CS2", genre: "Тактический шутер", color: "#FF6500", stats: [["Формат", "5v5"], ["Режим", "Соревнов"], ["Карты", "Мираж"]], desc: "Самый популярный тактический шутер в мире. Элитные команды 5v5 сражаются в напряжённых раундах на выбывание — нужны стратегия, точность и стальные нервы." },
  { id: "pubg", name: "PUBG: Battlegrounds", short: "PUBG", genre: "Королевская битва", color: "#F5B800", stats: [["Игроков", "100"], ["Режим", "Отряд"], ["Карты", "Несколько"]], desc: "100 игроков высаживаются на огромное поле боя. Сжимающаяся зона заставляет устраивать эпичные столкновения, пока не выживет только одна команда. Чистый survival-гейминг." },
  { id: "dota", name: "Dota 2", short: "DOTA", genre: "MOBA", color: "#C62828", stats: [["Формат", "5v5"], ["Героев", "100+"], ["Средняя игра", "~45 мин"]], desc: "Две команды по пять героев сражаются в одной из самых глубоких стратегических игр. Переиграйте и уничтожите Древнего врага." },
];

export function GamesSection() {
  const [active, setActive] = useState("cs2");
  const g = GAMES.find((x) => x.id === active)!;
  const currentBg = IMGS[g.id as keyof typeof IMGS];

  return (
    <section
      id="games"
      className="games-section-mobile sec-fullscreen relative overflow-hidden flex flex-col max-md:max-h-[100dvh] max-md:min-h-0"
      style={{ background: "#050508", padding: "var(--sec-py) var(--sec-px)" }}
    >
      <div className="absolute inset-0 overflow-hidden">
        <img src={currentBg} alt={g.name} className="w-full h-full object-cover" />
      </div>

      <div
        className="absolute inset-0 pointer-events-none transition-all duration-700"
        style={{ background: `radial-gradient(ellipse 65% 50% at 75% 55%, ${g.color}14 0%, transparent 70%)` }}
      />

      <div
        className="games-section-inner max-md:flex max-md:flex-col max-md:min-h-0 max-md:flex-1 max-md:overflow-hidden"
        style={{
          maxWidth: "1380px",
          margin: "0 auto",
          position: "relative",
          zIndex: 10,
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          height: "100%",
          paddingBottom: "0px",
        }}
      >
        {/* Заголовок — на мобилке выше */}
        <div className="max-md:mb-2 max-md:shrink-0 shrink-0" style={{ marginBottom: "16px" }}>
          <div className="eyebrow max-md:text-[0.55rem] max-md:mb-0">Турнирные игры</div>
          <h2 className="gh-title text-white max-md:leading-tight max-md:mt-1" style={{ fontSize: "var(--h2-sec)" }}>
            Игры<br />
            <span style={{ color: "var(--c-cyan,#00E5FF)" }}>фестиваля</span>
          </h2>
        </div>

        {/* Мобилка: только иконки под заголовком */}
        <div className="flex lg:hidden gap-2 mb-2 shrink-0">
          {GAMES.map((gm) => {
            const isA = active === gm.id;
            return (
              <button
                key={gm.id}
                type="button"
                onClick={() => setActive(gm.id)}
                className="flex items-center justify-center shrink-0 rounded-md overflow-hidden"
                style={{
                  width: "52px",
                  height: "52px",
                  border: isA ? `2px solid ${gm.color}` : "1px solid rgba(255,255,255,0.12)",
                  background: isA ? `${gm.color}22` : "rgba(5,5,8,0.75)",
                  boxShadow: isA ? `0 0 0 1px ${gm.color}40` : undefined,
                }}
                aria-label={gm.name}
              >
                <img
                  src={GAME_ICONS[gm.id as keyof typeof GAME_ICONS]}
                  alt=""
                  className="w-8 h-8 object-contain"
                />
              </button>
            );
          })}
        </div>

        <div className="grid lg:grid-cols-12 gap-6 items-end pb-4 max-md:grid-cols-1 max-md:gap-3 max-md:items-stretch max-md:pb-2 max-md:flex-1 max-md:min-h-0 max-md:overflow-hidden">
          {/* Описание + мобильная кнопка */}
          <div className="lg:col-span-5 max-md:flex max-md:flex-col max-md:min-h-0 max-md:overflow-hidden" style={{ marginTop: "16px" }}>
            <div key={g.id} className="games-fade max-md:flex max-md:flex-col max-md:min-h-0 max-md:flex-1">
              <div
                className="max-w-[520px] max-md:w-full max-md:max-w-none max-md:flex max-md:flex-col max-md:min-h-0 max-md:flex-1"
              >
                <div
                  className="max-md:min-h-0 max-md:flex-1 max-md:overflow-y-auto"
                  style={{
                    background: "rgba(5,5,8,0.78)",
                    border: "1px solid rgba(255,255,255,0.08)",
                    padding: "16px 18px 18px",
                  }}
                >
                  <p
                    className="max-md:text-[0.88rem] max-md:leading-snug"
                    style={{
                      fontFamily: "'Barlow',sans-serif",
                      letterSpacing: "0.03em",
                      color: "rgba(255,255,255,0.78)",
                      lineHeight: 1.8,
                      fontSize: "0.98rem",
                      margin: 0,
                    }}
                  >
                    {g.desc}
                  </p>
                </div>
                <div className="mt-3 max-md:mt-2 flex flex-col sm:flex-row gap-2 max-md:gap-2 shrink-0">
                  {g.stats.map(([l, v]) => (
                    <div
                      key={l}
                      className="flex flex-col gap-1 px-3 py-2 max-md:py-1.5 max-md:flex-1"
                      style={{
                        background: "rgba(5,5,8,0.78)",
                        border: "1px solid rgba(255,255,255,0.08)",
                        flex: 1,
                        minWidth: 0,
                      }}
                    >
                      <span
                        className="max-md:text-base"
                        style={{
                          fontFamily: "'Barlow Condensed',sans-serif",
                          fontWeight: 900,
                          fontSize: "1.15rem",
                          lineHeight: 1,
                          color: "#ffffff",
                          letterSpacing: "0.03em",
                        }}
                      >
                        {v}
                      </span>
                      <span
                        className="max-md:text-[0.4rem] max-md:tracking-[0.12em]"
                        style={{
                          fontFamily: "'Barlow Condensed',sans-serif",
                          fontSize: "0.48rem",
                          letterSpacing: "0.2em",
                          color: "rgba(255,255,255,0.65)",
                          textTransform: "uppercase",
                        }}
                      >
                        {l}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Кнопка только до 1024px; на ПК — справа у карточек */}
                <div className="games-register-mobile-only w-full shrink-0 mt-3">
                  <a
                    href="#tickets"
                    onClick={(e) => {
                      e.preventDefault();
                      document.getElementById("tickets")?.scrollIntoView({ behavior: "smooth" });
                    }}
                    className="btn-outline justify-center w-full"
                    style={{
                      border: `1px solid ${g.color}`,
                      color: "#ffffff",
                      fontSize: "0.76rem",
                      clipPath: "none",
                      background: "rgba(5,5,12,0.85)",
                    }}
                  >
                    <Trophy size={13} />
                    <span>Зарегистрироваться</span>
                    <ChevronRight size={13} />
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* ПК: карточки игр + кнопка */}
          <div
            className="hidden lg:flex lg:col-span-7 flex-col gap-3"
            style={{ maxWidth: "260px", marginLeft: "auto" }}
          >
            {GAMES.map((gm) => {
              const isA = active === gm.id;
              return (
                <button
                  key={gm.id}
                  onClick={() => setActive(gm.id)}
                  className="group text-left overflow-hidden relative flex-1"
                  style={{
                    border: isA ? `1px solid ${gm.color}45` : "1px solid rgba(255,255,255,0.06)",
                    minHeight: "62px",
                    transition: "all .32s ease",
                  }}
                >
                  <img
                    src={IMGS[gm.id as keyof typeof IMGS]}
                    alt=""
                    className="absolute inset-0 w-full h-full object-cover"
                    style={{
                      filter: isA ? "brightness(0.35) saturate(0.8)" : "brightness(0.18) saturate(0.4)",
                      transition: "filter .45s ease",
                    }}
                  />
                  <div
                    className="absolute inset-0"
                    style={{
                      background: isA
                        ? `linear-gradient(to right, rgba(10,10,16,0.62) 0%, rgba(10,10,16,0.36) 60%, ${gm.color}0F 100%)`
                        : "rgba(10,10,16,0.45)",
                      backdropFilter: "blur(18px)",
                      WebkitBackdropFilter: "blur(18px)",
                      transition: "background .45s ease, backdrop-filter .45s ease",
                    }}
                  />
                  <div
                    className="absolute top-0 left-0 bottom-0 w-[2px]"
                    style={{
                      background: isA ? gm.color : "rgba(255,255,255,0.06)",
                      transition: "background .32s ease",
                    }}
                  />
                  <div className="relative z-10 flex items-center gap-3 px-4 py-2">
                    <div
                      className="w-6 h-6 flex items-center justify-center shrink-0 overflow-hidden rounded-sm"
                      style={{
                        background: isA ? `${gm.color}1E` : "rgba(255,255,255,0.04)",
                        border: `1px solid ${isA ? gm.color + "42" : "rgba(255,255,255,0.07)"}`,
                        transition: "all .32s ease",
                      }}
                    >
                      <img
                        src={GAME_ICONS[gm.id as keyof typeof GAME_ICONS]}
                        alt={gm.name}
                        style={{ width: "100%", height: "100%", objectFit: "contain" }}
                      />
                    </div>
                    <div>
                      <div className="gh-title text-white" style={{ fontSize: "clamp(0.9rem, 1.4vw, 1.1rem)" }}>
                        {gm.name}
                      </div>
                    </div>
                  </div>
                </button>
              );
            })}
            <a
              href="#tickets"
              onClick={(e) => {
                e.preventDefault();
                document.getElementById("tickets")?.scrollIntoView({ behavior: "smooth" });
              }}
              className="btn-outline w-full justify-center mt-3"
              style={{
                border: `1px solid ${g.color}`,
                color: "#ffffff",
                fontSize: "0.76rem",
                clipPath: "none",
                background: "rgba(5,5,12,0.85)",
              }}
            >
              <Trophy size={13} />
              <span>Зарегистрироваться</span>
              <ChevronRight size={13} />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
