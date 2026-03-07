import { useState, useEffect } from "react";
import { Trophy, ChevronRight, Target, Shield, Sword } from "lucide-react";

import cs1 from "../../assets/cs1.webp";
import cs2 from "../../assets/cs2.webp";
import cs3 from "../../assets/cs3.webp";
import pubg1 from "../../assets/pubg1.webp";
import pubg2 from "../../assets/pubg2.webp";
import pubg3 from "../../assets/pubg3.jpg";
import dota2Social from "../../assets/dota2_social.jpg";
import dota2 from "../../assets/dota2.jpg";
import dota2Webp from "../../assets/dota2.webp";

const CS2_SLIDER_IMGS = [cs1, cs2, cs3];
const CS2_TRACK = [cs1, cs2, cs3, cs1];

const PUBG_SLIDER_IMGS = [pubg1, pubg2, pubg3];
const PUBG_TRACK = [pubg1, pubg2, pubg3, pubg1];

const DOTA_SLIDER_IMGS = [dota2Social, dota2, dota2Webp];
const DOTA_TRACK = [dota2Social, dota2, dota2Webp, dota2Social];

const IMGS = {
  cs2:  CS2_SLIDER_IMGS[0],
  pubg: PUBG_SLIDER_IMGS[0],
  dota: DOTA_SLIDER_IMGS[0],
};

const GAMES = [
  { id: "cs2",  Icon: Target, name: "Counter-Strike 2",  short: "CS2",  genre: "Тактический шутер",  color: "#FF6500", stats: [["Формат","5v5"],["Режим","Соревновательный"],["Карты","Активный пул"]], desc: "Самый популярный тактический шутер в мире. Элитные команды 5v5 сражаются в напряжённых раундах на выбывание — нужны стратегия, точность и стальные нервы." },
  { id: "pubg", Icon: Shield, name: "PUBG: Battlegrounds",short: "PUBG", genre: "Королевская битва", color: "#F5B800", stats: [["Игроков","100"],["Режим","Отряд"],["Карты","Несколько"]], desc: "100 игроков высаживаются на огромное поле боя. Сжимающаяся зона заставляет устраивать эпичные столкновения, пока не выживет только одна команда. Чистый survival-гейминг." },
  { id: "dota", Icon: Sword,  name: "Dota 2",            short: "DOTA", genre: "MOBA",          color: "#C62828", stats: [["Формат","5v5"],["Героев","100+"],["Средняя игра","~45 мин"]], desc: "Две команды по пять героев сражаются в одной из самых глубоких стратегических игр. Переиграйте и уничтожьте Древнего врага." },
];

export function GamesSection() {
  const [active, setActive] = useState("cs2");
  const [cs2SlideIndex, setCs2SlideIndex] = useState(0);
  const [cs2NoTransition, setCs2NoTransition] = useState(false);
  const [pubgSlideIndex, setPubgSlideIndex] = useState(0);
  const [pubgNoTransition, setPubgNoTransition] = useState(false);
  const [dotaSlideIndex, setDotaSlideIndex] = useState(0);
  const [dotaNoTransition, setDotaNoTransition] = useState(false);
  const g = GAMES.find((x) => x.id === active)!;

  const isCs2 = active === "cs2";
  const isPubg = active === "pubg";
  const isDota = active === "dota";

  useEffect(() => {
    if (!isCs2) setCs2SlideIndex(0);
  }, [isCs2]);
  useEffect(() => {
    if (!isPubg) setPubgSlideIndex(0);
  }, [isPubg]);
  useEffect(() => {
    if (!isDota) setDotaSlideIndex(0);
  }, [isDota]);

  useEffect(() => {
    if (!isCs2) return;
    const t = setInterval(() => {
      setCs2SlideIndex((i) => {
        if (i === CS2_TRACK.length - 1) {
          setCs2NoTransition(true);
          return 0;
        }
        return i + 1;
      });
    }, 4500);
    return () => clearInterval(t);
  }, [isCs2]);
  useEffect(() => {
    if (!isPubg) return;
    const t = setInterval(() => {
      setPubgSlideIndex((i) => {
        if (i === PUBG_TRACK.length - 1) {
          setPubgNoTransition(true);
          return 0;
        }
        return i + 1;
      });
    }, 4500);
    return () => clearInterval(t);
  }, [isPubg]);
  useEffect(() => {
    if (!isDota) return;
    const t = setInterval(() => {
      setDotaSlideIndex((i) => {
        if (i === DOTA_TRACK.length - 1) {
          setDotaNoTransition(true);
          return 0;
        }
        return i + 1;
      });
    }, 4500);
    return () => clearInterval(t);
  }, [isDota]);

  useEffect(() => {
    if (!cs2NoTransition) return;
    const id = requestAnimationFrame(() => setCs2NoTransition(false));
    return () => cancelAnimationFrame(id);
  }, [cs2NoTransition]);
  useEffect(() => {
    if (!pubgNoTransition) return;
    const id = requestAnimationFrame(() => setPubgNoTransition(false));
    return () => cancelAnimationFrame(id);
  }, [pubgNoTransition]);
  useEffect(() => {
    if (!dotaNoTransition) return;
    const id = requestAnimationFrame(() => setDotaNoTransition(false));
    return () => cancelAnimationFrame(id);
  }, [dotaNoTransition]);

  return (
    <section id="games" className="relative overflow-hidden"
      style={{ background: "#050508", padding: "var(--sec-py) var(--sec-px)" }}>

      {/* Dynamic bg tint */}
      <div className="absolute inset-0 pointer-events-none transition-all duration-700"
        style={{ background: `radial-gradient(ellipse 65% 50% at 75% 55%, ${g.color}0D 0%, transparent 70%)` }} />
      <div className="absolute inset-0 bg-dots opacity-14 pointer-events-none" />
      <div className="wm" style={{ fontSize: "clamp(10rem,20vw,18rem)", right: "-2rem", top: "-1rem" }}>04</div>

      <div style={{ maxWidth: "1380px", margin: "0 auto", position: "relative", zIndex: 10 }}>

        {/* Header */}
        <div className="mb-14">
          <div className="eyebrow">Турнирные игры</div>
          <h2 className="gh-title text-white" style={{ fontSize: "var(--h2-sec)" }}>
            Игры<br />
            <span style={{ color: "var(--c-cyan,#00E5FF)" }}>фестиваля</span>
          </h2>
        </div>

        {/* Content */}
        <div className="grid lg:grid-cols-12 gap-3">

          {/* Main panel */}
          <div className="lg:col-span-7 relative overflow-hidden"
            style={{ border: `1px solid ${g.color}38`, clipPath: "polygon(0 0,100% 0,100% 94%,97% 100%,0 100%)", minHeight: "480px" }}>
            {isCs2 ? (
              <div className="absolute inset-0 overflow-hidden">
                <div
                  className="flex h-full ease-out"
                  style={{
                    width: `${CS2_TRACK.length * 100}%`,
                    transform: `translateX(-${(100 / CS2_TRACK.length) * cs2SlideIndex}%)`,
                    transition: cs2NoTransition ? "none" : "transform 700ms ease-out",
                  }}
                >
                  {CS2_TRACK.map((src, i) => (
                    <div key={i} className="flex-[0_0_25%] h-full">
                      <img src={src} alt="" className="w-full h-full object-cover"
                        style={{ filter: "brightness(0.14) saturate(0.4)" }} />
                    </div>
                  ))}
                </div>
              </div>
            ) : isPubg ? (
              <div className="absolute inset-0 overflow-hidden">
                <div
                  className="flex h-full ease-out"
                  style={{
                    width: `${PUBG_TRACK.length * 100}%`,
                    transform: `translateX(-${(100 / PUBG_TRACK.length) * pubgSlideIndex}%)`,
                    transition: pubgNoTransition ? "none" : "transform 700ms ease-out",
                  }}
                >
                  {PUBG_TRACK.map((src, i) => (
                    <div key={i} className="flex-[0_0_25%] h-full">
                      <img src={src} alt="" className="w-full h-full object-cover"
                        style={{ filter: "brightness(0.14) saturate(0.4)" }} />
                    </div>
                  ))}
                </div>
              </div>
            ) : isDota ? (
              <div className="absolute inset-0 overflow-hidden">
                <div
                  className="flex h-full ease-out"
                  style={{
                    width: `${DOTA_TRACK.length * 100}%`,
                    transform: `translateX(-${(100 / DOTA_TRACK.length) * dotaSlideIndex}%)`,
                    transition: dotaNoTransition ? "none" : "transform 700ms ease-out",
                  }}
                >
                  {DOTA_TRACK.map((src, i) => (
                    <div key={i} className="flex-[0_0_25%] h-full">
                      <img src={src} alt="" className="w-full h-full object-cover"
                        style={{ filter: "brightness(0.14) saturate(0.4)" }} />
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <img src={IMGS[g.id as keyof typeof IMGS]} alt={g.name}
                className="absolute inset-0 w-full h-full object-cover transition-all duration-700"
                style={{ filter: "brightness(0.14) saturate(0.4)" }} />
            )}
            <div className="absolute inset-0 transition-all duration-600 pointer-events-none"
              style={{ background: `linear-gradient(135deg, rgba(5,5,8,0.97) 0%, ${g.color}0F 65%, rgba(5,5,8,0.72) 100%)` }} />
            {/* Top accent */}
            <div className="absolute top-0 left-0 right-0 h-[2px]"
              style={{ background: `linear-gradient(90deg, ${g.color}, ${g.color}22, transparent)` }} />
            {/* Giant watermark */}
            <div className="absolute right-0 bottom-0 select-none pointer-events-none"
              style={{ fontFamily: "'Barlow Condensed',sans-serif", fontWeight: 900, fontSize: "clamp(7rem,16vw,14rem)", lineHeight: 0.82, color: `${g.color}06`, letterSpacing: "-0.06em", textTransform: "uppercase" }}>
              {g.short}
            </div>

            <div className="relative z-10 p-12 md:p-14 h-full flex flex-col justify-end">
              {/* Genre */}
              <div className="flex items-center gap-3 mb-8">
                <div className="w-2.5 h-2.5 rounded-full" style={{ background: g.color, boxShadow: `0 0 12px ${g.color}` }} />
                <span style={{ fontFamily: "'Barlow Condensed',sans-serif", fontWeight: 700, fontSize: "0.65rem", letterSpacing: "0.38em", color: g.color, textTransform: "uppercase" }}>{g.genre}</span>
              </div>

              <h3 className="gh-title text-white mb-5" style={{ fontSize: "clamp(2.6rem,5.5vw,4.5rem)" }}>{g.name}</h3>
              <p className="mb-10" style={{ fontFamily: "'Barlow',sans-serif", color: "rgba(255,255,255,0.42)", lineHeight: 1.78, fontSize: "0.96rem", maxWidth: "500px" }}>{g.desc}</p>

              {/* Mini stats */}
              <div className="flex mb-10" style={{ gap: "1px", background: "rgba(255,255,255,0.06)" }}>
                {g.stats.map(([l, v]) => (
                  <div key={l} className="px-6 py-4" style={{ background: "rgba(5,5,8,0.9)" }}>
                    <div style={{ fontFamily: "'Barlow Condensed',sans-serif", fontWeight: 900, fontSize: "1.55rem", lineHeight: 1, color: g.color, letterSpacing: "-0.02em" }}>{v}</div>
                    <div style={{ fontFamily: "'Barlow Condensed',sans-serif", fontSize: "0.52rem", letterSpacing: "0.24em", color: "rgba(255,255,255,0.24)", textTransform: "uppercase", marginTop: "5px" }}>{l}</div>
                  </div>
                ))}
              </div>

              <a href="#tickets" className="btn-outline w-fit"
                style={{ borderColor: `${g.color}55`, color: g.color, fontSize: "0.76rem" }}>
                <Trophy size={13} />
                <span>Зарегистрироваться на турнир</span>
                <ChevronRight size={13} />
              </a>
            </div>
          </div>

          {/* Game selector cards */}
          <div className="lg:col-span-5 flex flex-col gap-3">
            {GAMES.map((gm) => {
              const isA = active === gm.id;
              const GI = gm.Icon;
              return (
                <button key={gm.id} onClick={() => setActive(gm.id)}
                  className="group text-left overflow-hidden relative flex-1"
                  style={{ border: isA ? `1px solid ${gm.color}45` : "1px solid rgba(255,255,255,0.06)", minHeight: "128px", transition: "all .32s ease" }}>
                  <img
                    src={
                      gm.id === "cs2" && isA
                        ? CS2_SLIDER_IMGS[cs2SlideIndex % CS2_SLIDER_IMGS.length]
                        : gm.id === "pubg" && isA
                          ? PUBG_SLIDER_IMGS[pubgSlideIndex % PUBG_SLIDER_IMGS.length]
                          : gm.id === "dota" && isA
                            ? DOTA_SLIDER_IMGS[dotaSlideIndex % DOTA_SLIDER_IMGS.length]
                            : IMGS[gm.id as keyof typeof IMGS]
                    }
                    alt=""
                    className="absolute inset-0 w-full h-full object-cover"
                    style={{ filter: isA ? "brightness(0.22) saturate(0.5)" : "brightness(0.07) saturate(0.15)", transition: "filter .45s ease" }} />
                  <div className="absolute inset-0"
                    style={{ background: isA ? `linear-gradient(to right, rgba(5,5,8,0.95) 40%, ${gm.color}0F)` : "rgba(5,5,8,0.88)", transition: "background .45s ease" }} />
                  <div className="absolute top-0 left-0 bottom-0 w-[3px]"
                    style={{ background: isA ? gm.color : "rgba(255,255,255,0.06)", transition: "background .32s ease" }} />
                  <div className="absolute right-4 top-1/2 -translate-y-1/2 select-none pointer-events-none"
                    style={{ fontFamily: "'Barlow Condensed',sans-serif", fontWeight: 900, fontSize: "4rem", lineHeight: 1, color: isA ? `${gm.color}18` : "rgba(255,255,255,0.03)", textTransform: "uppercase", transition: "color .32s ease" }}>
                    {gm.short}
                  </div>

                  <div className="relative z-10 flex items-center gap-5 p-6">
                    <div className="w-11 h-11 flex items-center justify-center shrink-0"
                      style={{ background: isA ? `${gm.color}1E` : "rgba(255,255,255,0.04)", border: `1px solid ${isA ? gm.color + "42" : "rgba(255,255,255,0.07)"}`, clipPath: "polygon(10% 0,100% 0,90% 100%,0 100%)", transition: "all .32s ease" }}>
                      <GI size={16} style={{ color: isA ? gm.color : "rgba(255,255,255,0.2)", transition: "color .32s ease" }} />
                    </div>
                    <div>
                      <div style={{ fontFamily: "'Barlow Condensed',sans-serif", fontSize: "0.58rem", letterSpacing: "0.3em", color: isA ? gm.color : "rgba(255,255,255,0.2)", textTransform: "uppercase", marginBottom: "6px", transition: "color .32s ease" }}>{gm.genre}</div>
                      <div className="gh-title text-white" style={{ fontSize: "1.45rem" }}>{gm.name}</div>
                    </div>
                  </div>
                </button>
              );
            })}

            {/* Footer tag */}
            <div className="p-5" style={{ border: "1px solid rgba(255,255,255,0.05)", background: "rgba(255,255,255,0.012)" }}>
              <div style={{ fontFamily: "'Barlow Condensed',sans-serif", fontSize: "0.52rem", letterSpacing: "0.22em", color: "rgba(255,255,255,0.2)", textTransform: "uppercase", marginBottom: "12px" }}>Все турниры включают</div>
              <div className="flex flex-wrap gap-2">
                {["Шоу-матчи","Про-игроки","Прямая трансляция","Призовой фонд"].map((t) => (
                  <span key={t} className="tag-angled"
                    style={{ background: "rgba(0,229,255,0.04)", border: "1px solid rgba(0,229,255,0.12)", color: "rgba(255,255,255,0.28)", fontSize: "0.56rem" }}>{t}</span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}