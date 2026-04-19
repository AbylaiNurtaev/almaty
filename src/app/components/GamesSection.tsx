import { useEffect, useRef, useState } from "react";
import { Trophy, ChevronRight } from "lucide-react";
import { useLanguage } from "../context/LanguageContext";

import cs1 from "../../assets/cs1.webp";
import pubg1 from "../../assets/pubg1.webp";
import dota2 from "../../assets/dota2.jpg";
import pubgVideo from "../../assets/PUBG.mp4";
import wrestlemaniaLogo from "../../assets/games/wrestlemania-logo.png";
import wrestlemaniaGameplay from "../../assets/games/wrestlemania-gameplay.jpg";
import nfsCarbonLogo from "../../assets/games/nfs-carbon-logo.png";
import nfsCarbonGameplay from "../../assets/games/nfs-carbon-gameplay.jpg";

import csIcon from "../../icons/cs.png";
import pubgIcon from "../../icons/pubg.png";
import dotaIcon from "../../icons/dota-2.png";

const IMGS = {
  cs2: cs1,
  pubg: pubg1,
  dota: dota2,
  wrestlemania: wrestlemaniaGameplay,
  nfs: nfsCarbonGameplay,
};

const GAME_ICONS = {
  cs2: csIcon,
  pubg: pubgIcon,
  dota: dotaIcon,
  wrestlemania: wrestlemaniaLogo,
  nfs: nfsCarbonLogo,
} as const;

const GAMES = [
  { id: "pubg", name: "PUBG: Battlegrounds", short: "PUBG", color: "#F5B800", stats: [["Игроков", "100"], ["Режим", "Бой насмерть"], ["Карты", "Несколько"]], desc: "100 игроков высаживаются на огромное поле боя. Сжимающаяся зона заставляет устраивать эпичные столкновения, пока не выживет только одна команда. Чистый survival-гейминг." },
  { id: "cs2", name: "Counter-Strike 2", short: "CS2", color: "#FF6500", stats: [["Игроков", "100"], ["Режим", "Бой насмерть"], ["Карты", "de_mirage"]], desc: "Самый популярный тактический шутер в мире. Элитные команды 5v5 сражаются в напряжённых раундах на выбывание — нужны стратегия, точность и стальные нервы." },
  { id: "dota", name: "Dota 2", short: "DOTA 2", color: "#C62828", stats: [["Формат", "1vs25"], ["Режим", "До первой смерти"], ["Средняя игра", "~45 мин"]], desc: "Две команды по пять героев сражаются в одной из самых глубоких стратегических игр. Переиграйте соперника на линии и уничтожьте Древнего врага." },
  { id: "wrestlemania", name: "WrestleMania", short: "WRESTLE", color: "#9B5CF6", stats: [["Формат", "2vs2"], ["Режим", "Шоу-матч"], ["Раундов", "3"]], desc: "Яркие шоу-стычки в формате 2 на 2, где важны реакция, тайминг и зрелищная подача. Игра отлично заходит для быстрых сценических баттлов и плотного контакта с залом." },
  { id: "nfs", name: "NFS: Carbon", short: "NFS", color: "#00C2FF", stats: [["Формат", "1vs1"], ["Режим", "Заезды"], ["Трассы", "Ночные"]], desc: "Аркадные уличные гонки с дрифтом, дуэлями и плотной борьбой за каждую секунду. NFS: Carbon идеально подходит для динамичных шоу-заездов и зрелищных финалов на сцене." },
];

export function GamesSection() {
  const { language } = useLanguage();
  const isEn = language === "en";
  const [activeIndex, setActiveIndex] = useState(0);
  const autoRotateRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const AUTO_DELAY = 7000;
  const localizedGames = GAMES.map((game) => ({
    ...game,
    stats: game.stats.map(([l, v]) => {
      const label = isEn
        ? {
            "Формат": "Format",
            "Режим": "Mode",
            "Карты": "Maps",
            "Игроков": "Players",
            "Героев": "Heroes",
            "Средняя игра": "Avg Match",
            "Раундов": "Rounds",
            "Трассы": "Tracks",
            "Соревнов": "Competitive",
            "Отряд": "Squad",
            "Несколько": "Multiple",
            "Шоу-матч": "Showmatch",
            "Заезды": "Races",
            "Ночные": "Night",
            "До первой смерти": "First death ends it",
            "Мираж": "Mirage",
          }[l] ?? l
        : l;
      return [label, v] as [string, string];
    }),
    desc: isEn
      ? ({
          "Самый популярный тактический шутер в мире. Элитные команды 5v5 сражаются в напряжённых раундах на выбывание — нужны стратегия, точность и стальные нервы.":
            "The world's most popular tactical shooter. Elite 5v5 teams battle through high-pressure knockout rounds where strategy, precision, and nerves of steel decide everything.",
          "100 игроков высаживаются на огромное поле боя. Сжимающаяся зона заставляет устраивать эпичные столкновения, пока не выживет только одна команда. Чистый survival-гейминг.":
            "100 players drop into a huge battleground. The shrinking zone forces epic clashes until only one squad survives. Pure battle royale action.",
          "Две команды по пять героев сражаются в одной из самых глубоких стратегических игр. Переиграйте соперника на линии и уничтожьте Древнего врага.":
            "Two teams of five heroes compete in one of the deepest strategy games. Outplay your opponents in lane and destroy the enemy Ancient.",
          "Яркие шоу-стычки в формате 2 на 2, где важны реакция, тайминг и зрелищная подача. Игра отлично заходит для быстрых сценических баттлов и плотного контакта с залом.":
            "Fast 2v2 showdowns where reaction, timing, and spectacle matter most. The game works great for quick stage battles and constant crowd engagement.",
          "Аркадные уличные гонки с дрифтом, дуэлями и плотной борьбой за каждую секунду. NFS: Carbon идеально подходит для динамичных шоу-заездов и зрелищных финалов на сцене.":
            "Arcade street racing with drift, duels, and intense battles for every second. NFS: Carbon is a strong fit for dynamic show races and crowd-pleasing stage finals.",
        }[game.desc] ?? game.desc)
      : game.desc,
  }));
  const g = localizedGames[activeIndex];

  const startAutoRotate = () => {
    if (autoRotateRef.current) clearInterval(autoRotateRef.current);
    autoRotateRef.current = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % GAMES.length);
    }, AUTO_DELAY);
  };

  const handleSelectGame = (index: number) => {
    setActiveIndex(index);
    startAutoRotate();
  };

  useEffect(() => {
    startAutoRotate();
    return () => {
      if (autoRotateRef.current) clearInterval(autoRotateRef.current);
    };
  }, []);

  useEffect(() => {
    const resetToPubg = () => {
      setActiveIndex(0);
      startAutoRotate();
    };

    const handleSectionChange = (event: Event) => {
      const id = (event as CustomEvent<string>).detail;
      if (id === "games") {
        resetToPubg();
      }
    };

    const handleHashChange = () => {
      if (window.location.hash === "#games") {
        resetToPubg();
      }
    };

    const links = Array.from(document.querySelectorAll('a[href="#games"]'));
    links.forEach((link) => link.addEventListener("click", resetToPubg));
    window.addEventListener("hashchange", handleHashChange);
    window.addEventListener("snap-section-change", handleSectionChange);

    return () => {
      links.forEach((link) => link.removeEventListener("click", resetToPubg));
      window.removeEventListener("hashchange", handleHashChange);
      window.removeEventListener("snap-section-change", handleSectionChange);
    };
  }, []);

  return (
    <section
      id="games"
      className="games-section-mobile sec-fullscreen relative overflow-hidden flex flex-col max-md:max-h-[100dvh] max-md:min-h-0"
      style={{ background: "#030d1a", padding: "var(--sec-py) var(--sec-px)" }}
    >
      <div className="absolute inset-0 pointer-events-none" style={{ background: "linear-gradient(180deg, #031325 0%, #030d1a 65%)" }} />

      <div
        className="games-section-inner max-md:flex max-md:flex-col max-md:min-h-0 max-md:flex-1 max-md:overflow-hidden"
        style={{
          width: "90%",
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
        <div className="max-md:mb-2 max-md:shrink-0 shrink-0" style={{ marginBottom: "16px", marginTop: "0px" }}>
          <h2 className="gh-title text-white max-md:leading-tight max-md:mt-1" style={{ fontSize: "var(--h2-sec)" }}>
            {isEn ? "Festival " : "Игры "}
            <span style={{ color: "var(--c-cyan,#00E5FF)" }}>{isEn ? "games" : " фестиваля"}</span>
          </h2>
        </div>

        {/* Переключатель игр как у франшиз (мобилка) */}
        <div className="flex md:hidden gap-2 mb-3 shrink-0">
          {localizedGames.map((gm, i) => {
            const isA = g.id === gm.id;
            return (
              <div key={gm.id} className="club-pill-wrapper shrink-0">
                {isA && (
                  <svg className="club-timer-svg" viewBox="0 0 100 40" preserveAspectRatio="none">
                    <rect className="club-timer-ring" x="1.5" y="1.5" width="97" height="37" rx="10" ry="10" />
                  </svg>
                )}
                <button
                  type="button"
                  onClick={() => handleSelectGame(i)}
                  className="flex items-center justify-center shrink-0 rounded-md overflow-hidden transition-all duration-300"
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
              </div>
            );
          })}
        </div>

        {/* Десктоп: переключатель и одна активная карточка */}
        <div className="hidden md:block">
          <div
            className="club-switcher-bar mb-4"
            style={{
              gap: "1px",
              display: "flex",
              flexDirection: "row",
              flexWrap: "wrap",
              background: "rgba(255,255,255,0.06)",
              padding: "4px",
            }}
          >
            {localizedGames.map((game, i) => {
              const isActive = i === activeIndex;
              return (
                <div key={game.id} className="club-pill-wrapper">
                  {isActive && (
                    <svg className="club-timer-svg" viewBox="0 0 100 40" preserveAspectRatio="none">
                      <rect className="club-timer-ring" x="1.5" y="1.5" width="97" height="37" rx="10" ry="10" />
                    </svg>
                  )}
                  <button
                    type="button"
                    onClick={() => handleSelectGame(i)}
                    className="club-pill-button group flex items-center gap-3 px-4 py-3 transition-all duration-300 cursor-pointer"
                    style={{
                      background: isActive ? `${game.color}1A` : "#09091A",
                    }}
                  >
                    <img
                      src={GAME_ICONS[game.id as keyof typeof GAME_ICONS]}
                      alt={game.name}
                      className="w-6 h-6 object-contain shrink-0"
                    />
                    <span className="gh-mono text-white/90 group-hover:text-white transition-colors duration-200 text-sm">
                      {game.short}
                    </span>
                  </button>
                </div>
              );
            })}
          </div>
          <article
            key={g.id}
            className="overflow-hidden games-fade"
            style={{ width: "100%", background: "rgba(3,10,20,0.98)" }}
          >
            <div className="relative h-[320px] lg:h-[400px] w-full">
              {g.id === "pubg" ? (
                <video
                  src={pubgVideo}
                  poster={pubg1}
                  autoPlay
                  muted
                  loop
                  playsInline
                  className="absolute inset-0 w-full h-full object-cover"
                />
              ) : (
                <img
                  src={IMGS[g.id as keyof typeof IMGS]}
                  alt={g.name}
                  className="absolute inset-0 w-full h-full object-cover"
                />
              )}
              <div className="absolute inset-0 bg-black/10" />
            </div>
            <div className="p-5 lg:p-6 border-t" style={{ borderColor: "rgba(255,255,255,0.08)" }}>
              <div className="flex items-center gap-4 mb-4">
                <img
                  src={GAME_ICONS[g.id as keyof typeof GAME_ICONS]}
                  alt={g.name}
                  className="h-12 w-auto max-w-[160px] object-contain shrink-0"
                />
                <h3
                  style={{
                    fontFamily: "'Barlow Condensed',sans-serif",
                    color: "#fff",
                    fontSize: "1.6rem",
                    letterSpacing: "0.04em",
                    textTransform: "uppercase",
                    lineHeight: 1,
                  }}
                >
                  {g.name}
                </h3>
              </div>
              <p style={{ fontFamily: "'Barlow',sans-serif", color: "rgba(255,255,255,0.68)", lineHeight: 1.6, marginBottom: "14px", fontSize: "0.98rem" }}>
                {g.desc}
              </p>
              <div className="grid grid-cols-3 gap-2">
                {g.stats.map(([l, v]) => (
                  <div key={l} className="px-3 py-2 border" style={{ borderColor: "rgba(255,255,255,0.1)", background: "rgba(255,255,255,0.015)" }}>
                    <div style={{ fontFamily: "'Barlow Condensed',sans-serif", fontWeight: 900, color: "#fff", fontSize: "1.1rem" }}>{v}</div>
                    <div style={{ fontFamily: "'Barlow Condensed',sans-serif", color: "rgba(255,255,255,0.65)", letterSpacing: "0.12em", fontSize: "0.58rem", textTransform: "uppercase" }}>{l}</div>
                  </div>
                ))}
              </div>
              <a
                href="#tickets"
                onClick={(e) => {
                  e.preventDefault();
                  document.getElementById("tickets")?.scrollIntoView({ behavior: "smooth" });
                }}
                className="btn-outline justify-center inline-flex mt-4"
                style={{ border: "none", color: "#031325", fontSize: "0.82rem", clipPath: "none", background: "#00D9FF", fontWeight: 800, paddingInline: "18px" }}
              >
                <Trophy size={13} />
                <span>{isEn ? "Register" : "Зарегистрироваться"}</span>
                <ChevronRight size={13} />
              </a>
            </div>
          </article>
        </div>

        {/* Mobile card */}
        <div className="md:hidden max-md:flex-1 max-md:min-h-0">
          <article className="border h-full w-full flex flex-col overflow-hidden" style={{ borderColor: `${g.color}55`, background: "rgba(5,5,8,0.82)" }}>
            <div className="relative h-[220px] w-full">
              {g.id === "pubg" ? (
                <video
                  src={pubgVideo}
                  poster={pubg1}
                  autoPlay
                  muted
                  loop
                  playsInline
                  className="absolute inset-0 w-full h-full object-cover"
                />
              ) : (
                <img
                  src={IMGS[g.id as keyof typeof IMGS]}
                  alt={g.name}
                  className="absolute inset-0 w-full h-full object-cover"
                />
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-[#050508] via-[#050508ac] to-transparent" />
            </div>
            <div className="p-4 flex-1 min-h-0 overflow-y-auto flex flex-col">
              <div className="flex items-center gap-3 mb-3">
                <img
                  src={GAME_ICONS[g.id as keyof typeof GAME_ICONS]}
                  alt={g.name}
                  className="h-9 w-auto max-w-[120px] object-contain shrink-0"
                />
                <h3
                  style={{
                    fontFamily: "'Barlow Condensed',sans-serif",
                    color: "#fff",
                    fontSize: "1.2rem",
                    letterSpacing: "0.04em",
                    textTransform: "uppercase",
                    lineHeight: 1,
                  }}
                >
                  {g.name}
                </h3>
              </div>
              <p style={{ fontFamily: "'Barlow',sans-serif", color: "rgba(255,255,255,0.78)", lineHeight: 1.65, fontSize: "0.9rem", marginBottom: "12px" }}>
                {g.desc}
              </p>
              <div className="grid grid-cols-3 gap-2 mb-3">
                {g.stats.map(([l, v]) => (
                  <div key={l} className="px-2 py-2 border" style={{ borderColor: "rgba(255,255,255,0.12)", background: "rgba(255,255,255,0.02)" }}>
                    <div style={{ fontFamily: "'Barlow Condensed',sans-serif", fontWeight: 900, color: "#fff", fontSize: "1rem" }}>{v}</div>
                    <div style={{ fontFamily: "'Barlow Condensed',sans-serif", color: "rgba(255,255,255,0.65)", letterSpacing: "0.1em", fontSize: "0.52rem", textTransform: "uppercase" }}>{l}</div>
                  </div>
                ))}
              </div>
              <a
                href="#tickets"
                onClick={(e) => {
                  e.preventDefault();
                  document.getElementById("tickets")?.scrollIntoView({ behavior: "smooth" });
                }}
                className="btn-outline justify-center inline-flex self-start mt-auto"
                style={{ border: `1px solid ${g.color}`, color: "#ffffff", fontSize: "0.76rem", clipPath: "none", background: "rgba(5,5,12,0.85)" }}
              >
                <Trophy size={13} />
                <span>{isEn ? "Register" : "Зарегистрироваться"}</span>
                <ChevronRight size={13} />
              </a>
            </div>
          </article>
        </div>
      </div>
    </section>
  );
}
