import React, { useState } from "react";
import { DoorOpen, Mic, Swords, Store, Cake, Star, Trophy, Gift, Award, Gamepad2, Zap, Clock, X } from "lucide-react";

type Ev = { time: string; title: string; desc: string; modalText: string; Icon: React.ElementType; hot?: boolean };

const D1: Ev[] = [
  { time: "10:00", title: "Открытие дверей и регистрация",  desc: "Добро пожаловать на GAMEHUB 2026",  modalText: "Вход на территорию фестиваля открыт. Зарегистрируйтесь на стойках, получите бейдж и карту площадки. Зоны отдыха, фудкорт и игровые стенды уже ждут первых гостей. Рекомендуем прийти заранее, чтобы успеть осмотреть всё до торжественного открытия.", Icon: DoorOpen },
  { time: "11:30", title: "Торжественное открытие",  desc: "Грандиозное открытие со всеми стримерами",  modalText: "Официальный старт GAMEHUB 2026. На главной сцене — приветствие организаторов, звёздные стримеры и гости. Узнайте расписание на два дня, правила турниров и челленджей. Не пропустите анонсы и сюрпризы от партнёров.", Icon: Mic, hot: true },
  { time: "13:00", title: "Шоу-матч CS2",  desc: "Стримеры против про-игроков",  modalText: "Легендарное противостояние: популярные стримеры против про-игроков в Counter-Strike 2. Матч 5v5 на главной сцене с комментаторами и прямой трансляцией. Болейте за любимых и следите за каждым раундом на большом экране.", Icon: Swords, hot: true },
  { time: "14:30", title: "Открытие выставки брендов",  desc: "Исследуйте 40+ игровых брендов",  modalText: "Выставка игровых и tech-брендов развёрнута на всей территории. Стенды производителей ПК, мониторов, периферии и мерча. Демо-зоны, розыгрыши и эксклюзивные предложения только для гостей GAMEHUB.", Icon: Store },
  { time: "16:00", title: "Шоу-матч PUBG",  desc: "Развлечения в жанре королевской битвы",  modalText: "Королевская битва на главной сцене: команды стримеров и про-игроков в PUBG. Зрелищные перестрелки и борьба за «курицу». Комментарии в прямом эфире и болельщики на арене.", Icon: Swords, hot: true },
  { time: "17:30", title: "Вирусные челленджи на сцене",  desc: "Cake Challenge и командные игры",  modalText: "Cake Challenge и другие вирусные челленджи прямо на сцене. Участники из зала выполняют задания на время. Призы каждому победителю. Регистрация на челленджи — у сцены в день мероприятия.", Icon: Cake, hot: true },
  { time: "19:00", title: "Автограф-сессии",  desc: "Встречайтесь с любимыми стримерами",  modalText: "Встречи со стримерами и гостями в отдельной зоне. Фото, автографы и живое общение. Расписание и очередь у стойки «Автограф-сессии». Рекомендуем взять мерч или гаджет для подписи.", Icon: Star },
  { time: "21:00", title: "Завершение первого дня",  desc: "Итоги и объявление призов",  modalText: "Подведение итогов первого дня: обзор матчей, анонс расписания на завтра и объявление победителей дневных активностей. Завтра — квалификации и гранд-финалы.", Icon: Mic },
];

const D2: Ev[] = [
  { time: "10:00", title: "Открытие дверей — День второй",  desc: "Начало второго дня, все зоны открыты",  modalText: "Второй день GAMEHUB 2026: двери арены снова открыты. Все зоны работают — выставка, игровые стенды и фудкорт. Регистрация на турниры продолжается.", Icon: DoorOpen },
  { time: "11:00", title: "Квалификация турниров",  desc: "Сетки CS2 · PUBG · Dota 2",  modalText: "Старт отборочных турниров по CS2, PUBG и Dota 2. Команды борются за выход в финалы. Победители выходят в гранд-финалы во второй половине дня.", Icon: Trophy },
  { time: "13:00", title: "Гранд-финал Dota 2",  desc: "Чемпионский поединок в прямом эфире",  modalText: "Главный матч по Dota 2: две лучшие команды определяют чемпиона GAMEHUB 2026. Трансляция на главной сцене с комментаторами. Призовой фонд и награждение после финала.", Icon: Swords, hot: true },
  { time: "14:30", title: "Финалы конкурсов на сцене",  desc: "Объявление победителей на главной сцене",  modalText: "Объявление победителей челленджей и зрительских активностей. Призы вручаются на главной сцене. Список у стойки организаторов.", Icon: Gamepad2, hot: true },
  { time: "16:00", title: "Гранд-финал CS2",  desc: "Главный поединок CS2",  modalText: "Финал турнира по Counter-Strike 2: лучшие команды за звание чемпионов. Матч до двух побед, прямая трансляция. Награждение сразу после матча.", Icon: Swords, hot: true },
  { time: "17:30", title: "Розыгрыш призов",  desc: "ПК · Мониторы · Периферия",  modalText: "Розыгрыш призов от партнёров: ПК, мониторы, клавиатуры, мыши и мерч. Участие по номерам бейджей. Призы забираются на стойке в день мероприятия.", Icon: Gift, hot: true },
  { time: "19:00", title: "Церемония награждения",  desc: "Чемпионы на сцене",  modalText: "Торжественная церемония награждения победителей турниров CS2, PUBG и Dota 2. Кубок, медали и призовой фонд. Благодарности партнёрам и гостям.", Icon: Award },
  { time: "20:30", title: "Закрытие фестиваля",  desc: "До следующего года — GAMEHUB 2027",  modalText: "Официальное закрытие GAMEHUB 2026. Итоги двух дней и анонс GAMEHUB 2027. До встречи на следующем фестивале.", Icon: Zap },
];

function DayCard({ label, date, color, events, onEventClick }: { label: string; date: string; color: string; events: Ev[]; onEventClick: (ev: Ev, color: string) => void }) {
  return (
    <div className="relative overflow-hidden" style={{ border: `1px solid ${color}18`, background: `${color}03` }}>
      {/* Top neon accent */}
      <div className="absolute top-0 left-0 right-0 h-0.5"
        style={{ background: `linear-gradient(90deg, ${color}, ${color}25, transparent)` }} />
      {/* Giant watermark */}
      <div className="absolute right-0 bottom-0 select-none pointer-events-none"
        style={{ fontFamily: "'Barlow Condensed',sans-serif", fontWeight: 900, fontSize: "clamp(7rem,14vw,10rem)", lineHeight: 0.85, color: `${color}03`, letterSpacing: "-0.06em", textTransform: "uppercase" }}>
        {label.split(" ")[1]}
      </div>

      {/* Header */}
      <div className="flex items-center gap-4 px-7 py-5" style={{ borderBottom: `1px solid ${color}10` }}>
        <div className="w-11 h-11 flex items-center justify-center shrink-0"
          style={{ background: `${color}14`, border: `1px solid ${color}30`, clipPath: "polygon(10% 0,100% 0,90% 100%,0 100%)" }}>
          <Clock size={15} style={{ color }} />
        </div>
        <div>
          <div className="gh-title text-white" style={{ fontSize: "1.3rem" }}>{label}</div>
          <div style={{ fontFamily: "'Barlow Condensed',sans-serif", fontSize: "0.57rem", letterSpacing: "0.22em", color: "rgba(255,255,255,0.2)", textTransform: "uppercase", marginTop: "3px" }}>{date}</div>
        </div>
        <div className="ml-auto flex items-center gap-2">
          <div className="w-1.5 h-1.5 rounded-full" style={{ background: color, boxShadow: `0 0 5px ${color}` }} />
          <span style={{ fontFamily: "'Barlow Condensed',sans-serif", fontSize: "0.57rem", letterSpacing: "0.18em", color, textTransform: "uppercase" }}>{events.length} мероприятий</span>
        </div>
      </div>

      {/* Timeline events */}
      <div className="p-7 space-y-0">
        {events.map((ev, i) => {
          const Icon = ev.Icon;
          const isLast = i === events.length - 1;
          return (
            <button
              key={ev.time}
              type="button"
              onClick={() => onEventClick(ev, color)}
              className="flex gap-3.5 group w-full text-left cursor-pointer hover:opacity-90 transition-opacity"
            >
              {/* Spine */}
              <div className="flex flex-col items-center w-5 shrink-0">
                <div className="w-3.5 h-3.5 flex items-center justify-center shrink-0 z-10 mt-0.5"
                  style={{
                    background: ev.hot ? color : "rgba(255,255,255,0.06)",
                    border: `1px solid ${ev.hot ? color : "rgba(255,255,255,0.1)"}`,
                    borderRadius: "2px",
                    boxShadow: ev.hot ? `0 0 8px ${color}55` : "none",
                  }}>
                  <Icon size={7} style={{ color: ev.hot ? "#070711" : "rgba(255,255,255,0.2)" }} />
                </div>
                {!isLast && (
                  <div className="w-px flex-1 mt-1" style={{ background: `linear-gradient(to bottom, ${color}30, rgba(255,255,255,0.025))`, minHeight: "22px" }} />
                )}
              </div>
              {/* Content */}
              <div className={`flex-1 pb-3.5 ${isLast ? "" : "border-b"}`} style={{ borderColor: "rgba(255,255,255,0.04)" }}>
                <div className="flex items-baseline gap-3 flex-wrap">
                  <span style={{ fontFamily: "'Barlow Condensed',sans-serif", fontWeight: 700, fontSize: "0.72rem", color: ev.hot ? color : `${color}50`, minWidth: "38px", letterSpacing: "0.02em" }}>{ev.time}</span>
                  <span style={{ fontFamily: "'Barlow Condensed',sans-serif", fontWeight: 700, fontSize: ev.hot ? "0.88rem" : "0.82rem", color: ev.hot ? "white" : "rgba(255,255,255,0.62)", textTransform: "uppercase", letterSpacing: "0.06em" }}>{ev.title}</span>
                  {ev.hot && <span className="w-1.5 h-1.5 rounded-full shrink-0" style={{ background: color, boxShadow: `0 0 5px ${color}`, marginTop: "2px" }} />}
                </div>
                <p style={{ fontFamily: "'Barlow',sans-serif", fontSize: "0.66rem", color: "rgba(255,255,255,0.2)", lineHeight: 1.5, marginTop: "2px", paddingLeft: "50px" }}>{ev.desc}</p>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}

export function ProgramSection() {
  const [modal, setModal] = useState<{ ev: Ev; color: string } | null>(null);

  return (
    <section id="program" className="relative overflow-hidden"
      style={{ background: "#09091A", padding: "var(--sec-py) var(--sec-px)" }}>

      <div className="absolute inset-0 bg-dots opacity-14 pointer-events-none" />
      <div className="absolute inset-0 pointer-events-none"
        style={{ background: "linear-gradient(135deg, rgba(0,229,255,0.035) 0%, transparent 45%, rgba(124,58,237,0.035) 100%)" }} />

      <div style={{ maxWidth: "1380px", margin: "0 auto", position: "relative", zIndex: 10 }}>
        <div className="mb-14">
          <h2 className="gh-title text-white" style={{ fontSize: "var(--h2-sec)" }}>
            Двухдневная<br />
            <span style={{ color: "var(--c-cyan,#00E5FF)" }}>
              программа
            </span>
          </h2>
        </div>

        <div className="grid md:grid-cols-2 gap-3 mb-5">
          <DayCard label="День первый" date="11 апреля 2026" color="#00E5FF" events={D1} onEventClick={(ev, color) => setModal({ ev, color })} />
          <DayCard label="День второй" date="12 апреля 2026" color="#7C3AED" events={D2} onEventClick={(ev, color) => setModal({ ev, color })} />
        </div>

        {/* Модалка события */}
        {modal && (() => {
          const { ev, color: modalColor } = modal;
          const EvIcon = ev.Icon;
          return (
            <div
              className="fixed inset-0 z-50 flex items-center justify-center p-4"
              style={{ background: "rgba(5,5,8,0.85)", backdropFilter: "blur(8px)" }}
              onClick={() => setModal(null)}
            >
              <div
                className="relative max-w-lg w-full p-8"
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
                  aria-label="Закрыть"
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
                <p style={{ fontFamily: "'Barlow',sans-serif", fontSize: "0.9rem", color: "rgba(255,255,255,0.7)", lineHeight: 1.7 }}>{ev.modalText}</p>
              </div>
            </div>
          );
        })()}
      </div>
    </section>
  );
}