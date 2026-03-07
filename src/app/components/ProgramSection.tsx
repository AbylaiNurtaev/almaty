import { DoorOpen, Mic, Swords, Store, Cake, Star, Trophy, Gift, Award, Gamepad2, Zap, Clock } from "lucide-react";

type Ev = { time: string; title: string; desc: string; Icon: React.ElementType; hot?: boolean };

const D1: Ev[] = [
  { time: "10:00", title: "Открытие дверей и регистрация",  desc: "Добро пожаловать на GAMEHUB 2026",            Icon: DoorOpen },
  { time: "11:30", title: "Торжественное открытие",            desc: "Грандиозное открытие со всеми стримерами",   Icon: Mic,   hot: true },
  { time: "13:00", title: "Шоу-матч CS2",              desc: "Стримеры против про-игроков",           Icon: Swords,hot: true },
  { time: "14:30", title: "Открытие выставки брендов",      desc: "Исследуйте 40+ игровых брендов",           Icon: Store },
  { time: "16:00", title: "Шоу-матч PUBG",             desc: "Развлечения в жанре королевской битвы",         Icon: Swords,hot: true },
  { time: "17:30", title: "Вирусные челленджи на сцене",      desc: "Cake Challenge и командные игры",    Icon: Cake,  hot: true },
  { time: "19:00", title: "Автограф-сессии",          desc: "Встречайтесь с любимыми стримерами",       Icon: Star },
  { time: "21:00", title: "Завершение первого дня",             desc: "Итоги и объявление призов",         Icon: Mic },
];

const D2: Ev[] = [
  { time: "10:00", title: "Открытие дверей — День второй",       desc: "Начало второго дня, все зоны открыты",     Icon: DoorOpen },
  { time: "11:00", title: "Квалификация турниров",       desc: "Сетки CS2 · PUBG · Dota 2",       Icon: Trophy },
  { time: "13:00", title: "Гранд-финал Dota 2",         desc: "Чемпионский поединок в прямом эфире",          Icon: Swords,hot: true },
  { time: "14:30", title: "Финалы конкурсов на сцене",     desc: "Объявление победителей на главной сцене",     Icon: Gamepad2,hot:true},
  { time: "16:00", title: "Гранд-финал CS2",            desc: "Главный поединок CS2",           Icon: Swords,hot: true },
  { time: "17:30", title: "Розыгрыш призов",             desc: "ПК · Мониторы · Периферия",        Icon: Gift,  hot: true },
  { time: "19:00", title: "Церемония награждения",             desc: "Чемпионы на сцене",          Icon: Award },
  { time: "20:30", title: "Закрытие фестиваля",            desc: "До следующего года — GAMEHUB 2027",      Icon: Zap },
];

function DayCard({ label, date, color, events }: { label: string; date: string; color: string; events: Ev[] }) {
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
            <div key={ev.time} className="flex gap-3.5 group">
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
            </div>
          );
        })}
      </div>
    </div>
  );
}

export function ProgramSection() {
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
          <DayCard label="День первый" date="11 апреля 2026" color="#00E5FF" events={D1} />
          <DayCard label="День второй" date="12 апреля 2026" color="#7C3AED" events={D2} />
        </div>

        {/* Legend bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 px-8 py-5"
          style={{ border: "1px solid rgba(255,255,255,0.05)", background: "rgba(255,255,255,0.014)" }}>
          <div className="flex flex-wrap gap-8">
            {[{ c: "#00E5FF", l: "День 1 · 11 апреля" }, { c: "#7C3AED", l: "День 2 · 12 апреля" }, { c: "rgba(255,255,255,0.2)", l: "Арена Балуан Шолак" }].map((x) => (
              <div key={x.l} className="flex items-center gap-2.5">
                <div className="w-2 h-2 rounded-full" style={{ background: x.c }} />
                <span style={{ fontFamily: "'Barlow Condensed',sans-serif", fontSize: "0.6rem", letterSpacing: "0.18em", color: "rgba(255,255,255,0.28)", textTransform: "uppercase" }}>{x.l}</span>
              </div>
            ))}
          </div>
          <a href="#tickets" className="btn-outline" style={{ padding: "11px 26px", fontSize: "0.74rem" }}>Забронировать место</a>
        </div>
      </div>
    </section>
  );
}