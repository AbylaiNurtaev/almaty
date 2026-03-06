import { Cake, Flame, Laugh, Star, Zap, Trophy, ArrowRight } from "lucide-react";

const CHALS = [
  { n: "01", Icon: Cake,   title: "Торт в лицо",   tag: "Главный",    color: "#E8284A", big: true,
    desc: "Легендарный Cake Challenge — смельчаки рискуют получить торт в лицо на сцене перед тысячами зрителей. Кто осмелится выйти?" },
  { n: "02", Icon: Flame,  title: "Спидраны", tag: "Соревнования", color: "#FF6500",
    desc: "Проходите уровни классических игр в прямом эфире на сцене. Самые быстрые пальцы забирают главный приз." },
  { n: "03", Icon: Laugh,  title: "Голосование зала",       tag: "Интерактив", color: "#F5B800",
    desc: "Зрители решают всё. Живые опросы, конкурсы криков и дикие сюрпризы." },
  { n: "04", Icon: Star,   title: "Косплей-батл", tag: "Творчество",    color: "#6B21E8",
    desc: "Лучший игровой костюм выигрывает эпичные призы. Судьи — топ-стримеры и зал." },
  { n: "05", Icon: Zap,    title: "Викторина",     tag: "Знания",   color: "#00D4F5",
    desc: "Молниеносная игровая викторина с мгновенным выбыванием. Последний игрок забирает всё." },
  { n: "06", Icon: Trophy, title: "Битва эмодзи",     tag: "Веселье",         color: "#00C875",
    desc: "Воспроизводите внутриигровые эмодзи на сцене. Судьи — стримеры. Призы лучшим." },
];

export function ViralChallengesSection() {
  return (
    <section id="challenges" className="relative overflow-hidden"
      style={{ background: "#050508", padding: "var(--sec-py) var(--sec-px)" }}>

      <div className="absolute inset-0 bg-grid opacity-50 pointer-events-none" />
      <div className="absolute inset-0 pointer-events-none"
        style={{ background: "radial-gradient(ellipse 80% 40% at 50% 0%, rgba(240,53,88,0.09) 0%, transparent 65%)" }} />
      <div className="absolute inset-0 pointer-events-none"
        style={{ background: "radial-gradient(ellipse 60% 35% at 50% 100%, rgba(240,53,88,0.05) 0%, transparent 70%)" }} />
      <div className="wm" style={{ fontSize: "clamp(10rem,20vw,18rem)", right: "-2rem", top: "-1rem", color: "rgba(240,53,88,0.022)" }}>VRL</div>

      <div style={{ maxWidth: "1380px", margin: "0 auto", position: "relative", zIndex: 10 }}>

        {/* Header + spotlight */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-14 mb-20">
          <div>
            <div className="eyebrow" style={{ color: "#F03558" }}>Вирусные моменты</div>
            <h2 className="gh-title text-white" style={{ fontSize: "clamp(3.5rem,7vw,8rem)" }}>
              Вирусные<br />
              <span style={{ color: "#F03558" }}>
                челленджи
              </span>
            </h2>
          </div>

          {/* Cake challenge spotlight card */}
          <div className="relative overflow-hidden lg:max-w-sm w-full p-7"
            style={{ background: "rgba(240,53,88,0.05)", border: "1px solid rgba(240,53,88,0.28)" }}>
            <div className="absolute top-0 left-0 right-0 h-[2px]" style={{ background: "linear-gradient(90deg, #F03558, rgba(240,53,88,0.12))" }} />
            <div className="flex items-start gap-4 mb-5">
              <div className="w-12 h-12 flex items-center justify-center shrink-0"
                style={{ background: "rgba(240,53,88,0.15)", border: "1px solid rgba(240,53,88,0.35)", clipPath: "polygon(10% 0,100% 0,90% 100%,0 100%)" }}>
                <Cake size={18} style={{ color: "#F03558" }} />
              </div>
              <div>
                <div style={{ fontFamily: "'Barlow Condensed',sans-serif", fontSize: "0.52rem", letterSpacing: "0.32em", color: "#F03558", textTransform: "uppercase", marginBottom: "4px" }}>Главный хедлайнер</div>
                <div className="gh-title text-white" style={{ fontSize: "1.5rem" }}>Торт в лицо</div>
              </div>
            </div>
            <p style={{ fontFamily: "'Barlow',sans-serif", fontSize: "0.92rem", color: "rgba(255,255,255,0.38)", lineHeight: 1.72 }}>
              Выйдите на сцену и встретьтесь с <span style={{ color: "rgba(255,255,255,0.82)" }}>легендарным тортом</span>. Зал решает, кто получит. Осмелитесь?
            </p>
            <div className="flex items-center gap-2.5 mt-6">
              <span className="dot-live rounded-full shrink-0"
                style={{ width: "7px", height: "7px", background: "#F03558", display: "inline-block" }} />
              <span style={{ fontFamily: "'Barlow Condensed',sans-serif", fontSize: "0.52rem", letterSpacing: "0.22em", color: "rgba(255,255,255,0.22)", textTransform: "uppercase" }}>
                В прямом эфире на главной сцене · Оба дня
              </span>
            </div>
          </div>
        </div>

        {/* Challenge cards */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 mb-px" style={{ gap: "1px", background: "rgba(255,255,255,0.06)" }}>
          {CHALS.map((ch) => {
            const Icon = ch.Icon;
            return (
              <div key={ch.title}
                className="group relative overflow-hidden flex flex-col cursor-default transition-all duration-300"
                style={{ background: "#050508", minHeight: "250px", padding: "36px 30px" }}>
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                  style={{ background: `radial-gradient(ellipse at 50% 0%, ${ch.color}12 0%, transparent 65%)` }} />
                <div className="absolute top-0 left-0 right-0 h-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  style={{ background: `linear-gradient(90deg, ${ch.color}EE, ${ch.color}33, transparent)` }} />
                <div className="absolute top-0 left-0 bottom-0 w-[2px] opacity-0 group-hover:opacity-65 transition-opacity duration-300"
                  style={{ background: ch.color }} />
                <div className="absolute right-3 top-3 select-none pointer-events-none"
                  style={{ fontFamily: "'Barlow Condensed',sans-serif", fontWeight: 900, fontSize: "5.5rem", lineHeight: 1, color: `${ch.color}06`, letterSpacing: "-0.03em" }}>{ch.n}</div>

                <span className="tag-angled mb-6 w-fit" style={{ background: `${ch.color}10`, border: `1px solid ${ch.color}28`, color: ch.color }}>{ch.tag}</span>

                <div className="w-13 h-13 flex items-center justify-center mb-6 transition-all duration-350 group-hover:scale-110"
                  style={{ width: "52px", height: "52px", background: `${ch.color}10`, border: `1px solid ${ch.color}28`, clipPath: "polygon(10% 0,100% 0,90% 100%,0 100%)" }}>
                  <Icon size={18} style={{ color: ch.color }} />
                </div>

                <div style={{ fontFamily: "'Barlow Condensed',sans-serif", fontSize: "0.52rem", letterSpacing: "0.28em", color: `${ch.color}50`, textTransform: "uppercase", marginBottom: "8px" }}>{ch.n}</div>
                <h3 className="gh-title text-white relative z-10" style={{ fontSize: ch.big ? "1.8rem" : "1.6rem", marginBottom: "14px" }}>{ch.title}</h3>
                <p className="relative z-10 flex-1" style={{ fontFamily: "'Barlow',sans-serif", fontSize: "0.88rem", color: "rgba(255,255,255,0.28)", lineHeight: 1.75 }}>{ch.desc}</p>
              </div>
            );
          })}
        </div>

        {/* CTA strip */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6 px-8 py-6"
          style={{ border: "1px solid rgba(240,53,88,0.12)", background: "rgba(240,53,88,0.03)" }}>
          <div className="flex items-center gap-5">
            <div className="w-px h-12 shrink-0 opacity-38" style={{ background: "#F03558" }} />
            <div>
              <div className="gh-mono text-white" style={{ fontSize: "1.1rem" }}>Участвовать может каждый</div>
              <div style={{ fontFamily: "'Barlow',sans-serif", fontSize: "0.82rem", color: "rgba(255,255,255,0.26)", marginTop: "4px" }}>Все челленджи открыты для посетителей фестиваля — призы каждому победителю</div>
            </div>
          </div>
          <a href="#tickets" className="btn-primary shrink-0" style={{ background: "#F03558" }}>
            <span>Получить билет</span>
            <ArrowRight size={14} />
          </a>
        </div>
      </div>
    </section>
  );
}