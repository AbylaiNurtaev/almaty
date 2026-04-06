import React, { useMemo, useState } from "react";
import { Mic, Swords, Trophy, Gift, Award, Gamepad2, Zap, Clock, X } from "lucide-react";
import { useLanguage } from "../context/LanguageContext";

type Ev = {
  time: string;
  title: string;
  desc: string;
  modalText: string;
  Icon: React.ElementType;
  hot?: boolean
};

const FESTIVAL_PROGRAM: Ev[] = [
  {
    time: "11:00",
    title: "Торжественное открытие",
    desc: "Интро ролик, представление партнёров, объявление программы",
    modalText: "Интро ролик, представление партнёров, объявление программы.",
    Icon: Mic, hot: true
  },
  {
    time: "11:30",
    title: "БИТВА ОСНОВАТЕЛЕЙ (СРАЗУ ХАЙП)",
    desc: "100 владельцев клубов",
    modalText: "100 владельцев клубов. Дисциплина: PUBG.",
    Icon: Trophy, hot: true
  },
  {
    time: "12:30",
    title: "СОБРАТЬ ЗА 60 СЕКУНД (Sulpak / Technodom)",
    desc: "2 дорожки",
    modalText: "2 дорожки. Дисциплина: Sulpak / Technodom зона.",
    Icon: Zap
  },
  {
    time: "13:00",
    title: "МЯСОРУБКА",
    desc: "Режим Deathmatch на ножах с 1 удар = 1 xp Gravity 250",
    modalText: "Режим Deathmatch на ножах с 1 удар = 1 xp Gravity 250. Дисциплина: CS2.",
    Icon: Swords
  },
  {
    time: "14:00",
    title: "10 FPS",
    desc: "Режим Deathmatch ИГРАЮТ С 10 FPS",
    modalText: "Режим Deathmatch ИГРАЮТ С 10 FPS. Дисциплина: CS2.",
    Icon: Gamepad2
  },
  {
    time: "15:00",
    title: "СБОРКА КОМПЬЮТЕРНОГО КЛУБА (ЭТАП 1)",
    desc: "Сборка сервера на скорость с отбором на финал",
    modalText: "Сборка сервера на скорость с отбором на финал. Сборка 5 ПК на скорость с отбором на финал. Зона 1 и Зона 2.",
    Icon: Zap
  },
  {
    time: "16:00",
    title: "ОДИН НА ВСЕХ И ВСЕ НА ОДНОГО (DOTA 2)",
    desc: "1 vs 25",
    modalText: "1 vs 25. Дисциплина: Dota2.",
    Icon: Swords, hot: true
  },
  {
    time: "17:00",
    title: "СБОРКА КОМПЬЮТЕРНОГО КЛУБА (ЭТАП 1)",
    desc: "Сборка сервера на скорость с отбором на финал",
    modalText: "Сборка сервера на скорость с отбором на финал. Сборка 5 ПК на скорость с отбором на финал. Зона 1 и Зона 2.",
    Icon: Zap
  },
  {
    time: "18:00",
    title: "БЫСТРЫЕ ШОУ-БЛОКИ",
    desc: "",
    modalText: "Быстрые шоу-блоки. Дисциплина: Wrestlemania 2x2.",
    Icon: Gamepad2
  },
  {
    time: "18:30",
    title: "БЫСТРЫЕ ШОУ-БЛОКИ",
    desc: "Царь горы",
    modalText: "Быстрые шоу-блоки. Дисциплина: MK1.",
    Icon: Gamepad2
  },
  {
    time: "19:00",
    title: "БЫСТРЫЕ ШОУ-БЛОКИ",
    desc: "DRIFT SHOW кто наберет больше всего очков",
    modalText: "Быстрые шоу-блоки. Дисциплина: NFSU2.",
    Icon: Gamepad2
  },
  {
    time: "19:30",
    title: "АУКЦИОН",
    desc: "Реализация подарков от брендов",
    modalText: "Реализация подарков от брендов. Дисциплина: Sulpak / Technodom зона.",
    Icon: Gift
  },
  {
    time: "20:00",
    title: "ПАРТНЁРСКИЙ БЛОК (НО В ФОРМАТЕ ШОУ)",
    desc: "Благодарственные слова за мероприятие",
    modalText: "Благодарственные слова за мероприятие. Дисциплина: Зона 1.",
    Icon: Mic
  },
  {
    time: "20:30",
    title: "РОЗЫГРЫШ ПРИЗОВ",
    desc: "Лучший ПК, Лучший клуб (по фото),",
    modalText: "Лучший ПК, Лучший клуб (по фото). Дисциплина: Зона 1.",
    Icon: Gift, hot: true
  },
  {
    time: "21:00",
    title: "ФИНАЛ НАГРАЖДЕНИЕ",
    desc: "Номинации мероприятия GAMEHUB",
    modalText: "Номинации мероприятия GAMEHUB. Дисциплина: Зона 1.",
    Icon: Award, hot: true
  },
];

function DayCard({
  label,
  date,
  color,
  events,
  showEventsCount = true,
  eventsCountLabel = "мероприятий",
  onEventClick,
}: {
  label: string;
  date: string;
  color: string;
  events: Ev[];
  showEventsCount?: boolean;
  eventsCountLabel?: string;
  onEventClick: (ev: Ev, color: string) => void;
}) {
  return (
    <div className="relative overflow-hidden max-md:min-w-0" style={{ border: `1px solid ${color}18`, background: `${color}03` }}>
      {/* Top neon accent */}
      <div className="absolute top-0 left-0 right-0 h-0.5"
        style={{ background: `linear-gradient(90deg, ${color}, ${color}25, transparent)` }} />
      {/* Header — десктоп как было; мобилка: колонка, без выталкивания за экран */}
      <div
        className="flex items-center gap-3.5 px-6 py-4 max-md:flex-col max-md:items-stretch max-md:gap-2.5 max-md:px-4 max-md:py-3"
        style={{ borderBottom: `1px solid ${color}10` }}
      >
        <div className="flex items-center gap-2.5 min-w-0 flex-1">
          <div
            className="w-9 h-9 max-md:w-8 max-md:h-8 flex items-center justify-center shrink-0"
            style={{ background: `${color}14`, border: `1px solid ${color}30`, clipPath: "polygon(10% 0,100% 0,90% 100%,0 100%)" }}
          >
            <Clock size={13} className="max-md:w-3 max-md:h-3" style={{ color }} />
          </div>
          <div className="min-w-0">
            <div className="gh-title text-white max-md:text-[1rem]" style={{ fontSize: "1.14rem" }}>{label}</div>
            {!!date && (
              <div
                className="max-md:text-[0.5rem] max-md:tracking-[0.14em]"
                style={{
                  fontFamily: "'Barlow Condensed',sans-serif",
                  fontSize: "0.53rem",
                  letterSpacing: "0.18em",
                  color: "rgba(255,255,255,0.2)",
                  textTransform: "uppercase",
                  marginTop: "2px",
                }}
              >
                {date}
              </div>
            )}
          </div>
        </div>
        {showEventsCount && (
          <div className="ml-auto flex items-center gap-2 shrink-0 max-md:ml-0 max-md:pt-0.5">
            <div className="w-1.5 h-1.5 rounded-full" style={{ background: color, boxShadow: `0 0 5px ${color}` }} />
            <span
              className="max-md:text-[0.58rem] max-md:tracking-[0.11em]"
              style={{
                fontFamily: "'Barlow Condensed',sans-serif",
                fontSize: "0.7rem",
                letterSpacing: "0.14em",
                color,
                textTransform: "uppercase",
              }}
            >
              {events.length} {eventsCountLabel}
            </span>
          </div>
        )}
      </div>

      {/* Timeline events */}
      <div className="pt-6 px-5 pb-5 space-y-0 max-md:pt-4 max-md:px-3.5 max-md:pb-4">
        {events.map((ev, i) => {
          const Icon = ev.Icon;
          const isHot = true;
          const isLast = i === events.length - 1;
          return (
            <button
              key={`${ev.time}-${ev.title}-${i}`}
              type="button"
              onClick={() => onEventClick(ev, color)}
              className="flex gap-2.75 max-md:gap-2.25 group w-full min-w-0 text-left cursor-pointer hover:opacity-90 transition-opacity pt-2.5 max-md:pt-2 max-md:items-start"
            >
              {/* Spine */}
              <div className="flex flex-col items-center w-4.5 max-md:w-4 shrink-0">
                <div
                  className="w-3.25 h-3.25 max-md:w-2.75 max-md:h-2.75 flex items-center justify-center shrink-0 z-10 mt-0.5"
                  style={{
                    background: isHot ? color : "rgba(255,255,255,0.06)",
                    border: `1px solid ${isHot ? color : "rgba(255,255,255,0.1)"}`,
                    borderRadius: "2px",
                    boxShadow: isHot ? `0 0 8px ${color}55` : "none",
                  }}
                >
                  <Icon size={6} className="max-md:!w-[4.5px] max-md:!h-[4.5px]" style={{ color: isHot ? "#070711" : "rgba(255,255,255,0.2)" }} />
                </div>
                {!isLast && (
                  <div className="w-px flex-1 mt-1 min-h-[14px] max-md:min-h-[11px]" style={{ background: `linear-gradient(to bottom, ${color}30, rgba(255,255,255,0.025))` }} />
                )}
              </div>
              {/* Content */}
              <div className={`flex-1 min-w-0 pb-3.5 max-md:pb-3 ${isLast ? "" : "border-b"}`} style={{ borderColor: "rgba(255,255,255,0.04)" }}>
                <div className="grid grid-cols-[86px_minmax(0,1fr)] max-md:grid-cols-[74px_minmax(0,1fr)] items-baseline gap-x-3">
                  <span
                    style={{
                      fontFamily: "'Barlow Condensed',sans-serif",
                      fontWeight: 700,
                      fontSize: "0.74rem",
                      color: isHot ? color : `${color}55`,
                      letterSpacing: "0.02em",
                    }}
                  >
                    {ev.time}
                  </span>
                  <span
                    className="min-w-0 break-words max-md:text-[0.7rem] max-md:leading-snug max-md:tracking-[0.04em]"
                    style={{
                      fontFamily: "'Barlow Condensed',sans-serif",
                      fontWeight: 700,
                      fontSize: isHot ? "0.93rem" : "0.87rem",
                      color: isHot ? "white" : "rgba(255,255,255,0.66)",
                      textTransform: "uppercase",
                      letterSpacing: "0.05em",
                    }}
                  >
                    {ev.title}
                    {isHot && (
                      <span
                        className="inline-block w-1.5 h-1.5 rounded-full shrink-0 align-middle ml-1"
                        style={{ background: color, boxShadow: `0 0 5px ${color}` }}
                      />
                    )}
                  </span>
                  {!!ev.desc && (
                    <p
                      className="col-start-2 mt-0.5 max-md:text-[0.64rem]"
                      style={{
                        fontFamily: "'Barlow',sans-serif",
                        fontSize: "0.68rem",
                        letterSpacing: "0.02em",
                        color: "rgba(255,255,255,0.26)",
                        lineHeight: 1.38,
                      }}
                    >
                      {ev.desc}
                    </p>
                  )}
                </div>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}

export function ProgramSection() {
  const { language } = useLanguage();
  const isEn = language === "en";
  const tr = (v: string) =>
    isEn
      ? ({
          "Торжественное открытие": "Grand Opening",
          "Интро ролик, представление партнёров, объявление программы": "Intro video, partner presentation, program announcement",
          "Интро ролик, представление партнёров, объявление программы.": "Intro video, partner presentation, program announcement.",
          "БИТВА ОСНОВАТЕЛЕЙ (СРАЗУ ХАЙП)": "FOUNDERS BATTLE (INSTANT HYPE)",
          "100 владельцев клубов": "100 club owners",
          "100 владельцев клубов. Дисциплина: PUBG.": "100 club owners. Discipline: PUBG.",
          "СОБРАТЬ ЗА 60 СЕКУНД (Sulpak / Technodom)": "BUILD IN 60 SECONDS (Sulpak / Technodom)",
          "2 дорожки": "2 lanes",
          "2 дорожки. Дисциплина: Sulpak / Technodom зона.": "2 lanes. Discipline: Sulpak / Technodom zone.",
          "МЯСОРУБКА": "MAYHEM",
          "Режим Deathmatch на ножах с 1 удар = 1 xp Gravity 250": "Knife Deathmatch mode with 1 hit = 1 xp Gravity 250",
          "Режим Deathmatch на ножах с 1 удар = 1 xp Gravity 250. Дисциплина: CS2.": "Knife Deathmatch mode with 1 hit = 1 xp Gravity 250. Discipline: CS2.",
          "Режим Deathmatch ИГРАЮТ С 10 FPS": "Deathmatch mode played at 10 FPS",
          "Режим Deathmatch ИГРАЮТ С 10 FPS. Дисциплина: CS2.": "Deathmatch mode played at 10 FPS. Discipline: CS2.",
          "СБОРКА КОМПЬЮТЕРНОГО КЛУБА (ЭТАП 1)": "PC CLUB BUILD (STAGE 1)",
          "Сборка сервера на скорость с отбором на финал": "Speed server build with final qualification",
          "Сборка сервера на скорость с отбором на финал. Сборка 5 ПК на скорость с отбором на финал. Зона 1 и Зона 2.": "Speed server build with final qualification. Speed build of 5 PCs with final qualification. Zone 1 and Zone 2.",
          "ОДИН НА ВСЕХ И ВСЕ НА ОДНОГО (DOTA 2)": "ONE VS ALL, ALL VS ONE (DOTA 2)",
          "1 vs 25. Дисциплина: Dota2.": "1 vs 25. Discipline: Dota 2.",
          "БЫСТРЫЕ ШОУ-БЛОКИ": "QUICK SHOW BLOCKS",
          "Быстрые шоу-блоки. Дисциплина: Wrestlemania 2x2.": "Quick show blocks. Discipline: Wrestlemania 2x2.",
          "Царь горы": "King of the Hill",
          "Быстрые шоу-блоки. Дисциплина: MK1.": "Quick show blocks. Discipline: MK1.",
          "DRIFT SHOW кто наберет больше всего очков": "DRIFT SHOW - who scores the most points",
          "Быстрые шоу-блоки. Дисциплина: NFSU2.": "Quick show blocks. Discipline: NFSU2.",
          "АУКЦИОН": "AUCTION",
          "Реализация подарков от брендов": "Brand gift auction",
          "Реализация подарков от брендов. Дисциплина: Sulpak / Technodom зона.": "Brand gift auction. Discipline: Sulpak / Technodom zone.",
          "ПАРТНЁРСКИЙ БЛОК (НО В ФОРМАТЕ ШОУ)": "PARTNER BLOCK (SHOW FORMAT)",
          "Благодарственные слова за мероприятие": "Acknowledgements for the event",
          "Благодарственные слова за мероприятие. Дисциплина: Зона 1.": "Acknowledgements for the event. Discipline: Zone 1.",
          "РОЗЫГРЫШ ПРИЗОВ": "PRIZE DRAW",
          "Лучший ПК, Лучший клуб (по фото),": "Best PC, Best Club (by photo),",
          "Лучший ПК, Лучший клуб (по фото). Дисциплина: Зона 1.": "Best PC, Best Club (by photo). Discipline: Zone 1.",
          "ФИНАЛ НАГРАЖДЕНИЕ": "FINAL AWARD CEREMONY",
          "Номинации мероприятия GAMEHUB": "GAMEHUB event nominations",
          "Номинации мероприятия GAMEHUB. Дисциплина: Зона 1.": "GAMEHUB event nominations. Discipline: Zone 1.",
        }[v] ?? v)
      : v;
  const [modal, setModal] = useState<{ ev: Ev; color: string } | null>(null);
  const events = useMemo(() => {
    const seen = new Set<string>();
    return FESTIVAL_PROGRAM.map((ev) => ({
      ...ev,
      title: tr(ev.title),
      desc: tr(ev.desc),
      modalText: tr(ev.modalText),
    })).filter((ev) => {
      const key = `${ev.time}-${ev.title}`;
      if (seen.has(key)) return false;
      seen.add(key);
      return true;
    }).slice(0, 15);
  }, []);
  const firstPart = events.slice(0, 8);
  const secondPart = events.slice(8);
  return (
    <section
      id="program"
      className="sec-fullscreen relative overflow-hidden max-md:overflow-x-hidden"
      style={{
        background: "#09091A",
        padding: "clamp(62px, 6.8vw, 88px) var(--sec-px) clamp(24px, 3.2vw, 38px)",
      }}
    >

      <div className="absolute inset-0 bg-dots opacity-14 pointer-events-none" />
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: "linear-gradient(135deg, rgba(0,229,255,0.035) 0%, transparent 45%, rgba(124,58,237,0.035) 100%)" }}
      />

      <div
        className="max-md:min-w-0 max-md:w-full"
        style={{
          maxWidth: "1380px",
          margin: "0 auto",
          position: "relative",
          zIndex: 10,
          paddingBottom: "26px",
        }}
      >
        <div className="mb-5 md:mb-6 max-md:mb-4 flex items-end justify-between gap-3 max-md:flex-col max-md:items-start">
          <h2
            className="gh-title text-white max-md:!text-[clamp(1.4rem,5.7vw,1.9rem)] max-md:!leading-tight"
            style={{ fontSize: "var(--h2-sec)" }}
          >
            {isEn ? "Festival " : "Программа "}
            <span style={{ color: "var(--c-cyan,#00E5FF)" }}>{isEn ? "program" : "фестиваля"}</span>
          </h2>
          <span
            style={{
              fontFamily: "'Barlow Condensed',sans-serif",
              fontSize: "0.78rem",
              letterSpacing: "0.14em",
              color: "#00E5FF",
              textTransform: "uppercase",
              border: "1px solid rgba(0,229,255,0.35)",
              background: "rgba(0,229,255,0.08)",
              padding: "7px 12px",
            }}
          >
            {events.length} {isEn ? "events" : "мероприятий"}
          </span>
        </div>

        <div className="grid md:grid-cols-2 gap-3 mb-3 max-md:gap-4 max-md:w-full min-w-0">
          <DayCard
            label={isEn ? "Festival Program - Part 1" : "Программа фестиваля — часть 1"}
            date=""
            color="#00E5FF"
            events={firstPart}
            showEventsCount={false}
            eventsCountLabel={isEn ? "events" : "мероприятий"}
            onEventClick={(ev, color) => setModal({ ev, color })}
          />
          <DayCard
            label={isEn ? "Festival Program - Part 2" : "Программа фестиваля — часть 2"}
            date=""
            color="#7C3AED"
            events={secondPart}
            showEventsCount={false}
            eventsCountLabel={isEn ? "events" : "мероприятий"}
            onEventClick={(ev, color) => setModal({ ev, color })}
          />
        </div>

        {/* Модалка события */}
        {modal && (() => {
          const { ev, color: modalColor } = modal;
          const EvIcon = ev.Icon;
          return (
            <div
              className="program-modal-backdrop fixed inset-0 z-50 flex items-center justify-center p-4"
              style={{ background: "rgba(5,5,8,0.85)", backdropFilter: "blur(8px)" }}
              onClick={() => setModal(null)}
            >
              <div
                className="program-modal-panel relative max-w-lg w-full p-8 max-md:p-5 max-md:max-h-[85dvh] max-md:overflow-y-auto"
                style={{
                  background: "var(--c-bg2,#09091A)",
                  border: `1px solid ${modalColor}40`,
                  boxShadow: `0 0 40px ${modalColor}15`,
                }}
                onClick={(e) => e.stopPropagation()}
              >
                <button
                  type="button"
                  className="absolute top-4 right-4 p-1 rounded hover:bg-white/10 transition-colors"
                  onClick={() => setModal(null)}
                  aria-label={isEn ? "Close" : "Закрыть"}
                >
                  <X size={20} style={{ color: "rgba(255,255,255,0.5)" }} />
                </button>
                <div className="flex items-center gap-3 mb-5">
                  <div className="w-10 h-10 flex items-center justify-center shrink-0" style={{ background: `${modalColor}20`, border: `1px solid ${modalColor}50` }}>
                    <EvIcon size={18} style={{ color: modalColor }} />
                  </div>
                  <div>
                    <span style={{ fontFamily: "'Barlow Condensed',sans-serif", fontWeight: 700, fontSize: "0.7rem", color: modalColor, letterSpacing: "0.2em", textTransform: "uppercase" }}>{ev.time}</span>
                    <h3 className="gh-title text-white mt-0.5" style={{ fontSize: "1.35rem" }}>{ev.title}</h3>
                  </div>
                </div>
                <p style={{ fontFamily: "'Barlow',sans-serif", fontSize: "0.9rem", letterSpacing: "0.03em", color: "rgba(255,255,255,0.7)", lineHeight: 1.7 }}>{ev.modalText}</p>
              </div>
            </div>
          );
        })()}
      </div>
    </section>
  );
}