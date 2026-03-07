import React, { useState } from "react";
import { Monitor, Cpu, Keyboard } from "lucide-react";

const IMG = "https://images.unsplash.com/photo-1514820720301-4c4790309f46?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlc3BvcnRzJTIwdmljdG9yeSUyMGNlbGVicmF0aW9uJTIwY2hhbXBpb24lMjB0cm9waHklMjBhd2FyZCUyMHdpbiUyMHRlYW18ZW58MXx8fHwxNzcyODA1NDU5fDA&ixlib=rb-4.1.0&q=80&w=1080";

const PRIZES = [
  { Icon: Cpu,      title: "Игровые ПК",   desc: "Высокопроизводительные сборки от топовых брендов для чемпионов.",   color: "#00D4F5", tag: "Главный приз" },
  { Icon: Monitor,  title: "4K Мониторы",  desc: "4K дисплеи с высокой частотой обновления для гейминга нового уровня.", color: "#6B21E8", tag: "Железо" },
  { Icon: Keyboard, title: "Периферия",    desc: "Клавиатуры, мыши, наушники и премиум игровые аксессуары.",        color: "#E8A800", tag: "Экипировка" },
];

const TAGS = ["Игровые ПК", "4K Мониторы", "Наушники"] as const;
const TAG_TO_TITLE: Record<string, string> = { "Игровые ПК": "Игровые ПК", "4K Мониторы": "4K Мониторы", "Наушники": "Периферия" };

const TAG_TO_COLOR: Record<string, string> = { "Игровые ПК": "#00D4F5", "4K Мониторы": "#6B21E8", "Наушники": "#E8A800" };
const DEFAULT_GLOW = "#00E5FF";

export function PrizesSection() {
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const filteredPrizes = selectedTag
    ? PRIZES.filter((p) => p.title === TAG_TO_TITLE[selectedTag])
    : PRIZES;
  const glowColor = selectedTag ? TAG_TO_COLOR[selectedTag] ?? DEFAULT_GLOW : DEFAULT_GLOW;

  return (
    <section id="prizes" className="relative overflow-hidden"
      style={{ background: "#09091A", padding: "var(--sec-py) var(--sec-px)" }}>

      <div className="absolute inset-0 bg-dots opacity-14 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-1/2 h-2/3 pointer-events-none"
        style={{ background: "radial-gradient(ellipse at left bottom, rgba(124,58,237,0.07) 0%, transparent 65%)" }} />
      <div className="absolute top-0 right-0 w-1/2 h-2/3 pointer-events-none"
        style={{ background: "radial-gradient(ellipse at right top, rgba(0,229,255,0.05) 0%, transparent 65%)" }} />

      <div style={{ maxWidth: "1380px", margin: "0 auto", position: "relative", zIndex: 10 }}>

        {/* Header + hero image */}
        <div className="grid md:grid-cols-2 gap-16 items-center mb-14">
          <div>
            <div className="eyebrow">Выигрывайте крупно</div>
            <h2 className="gh-title text-white mb-7" style={{ fontSize: "var(--h2-sec)" }}>
              Призы<br />
              <span style={{ color: "var(--c-cyan,#00E5FF)" }}>фестиваля</span>
            </h2>
            <p className="mb-9" style={{ fontFamily: "'Barlow',sans-serif", fontSize: "1rem", color: "rgba(255,255,255,0.38)", lineHeight: 1.78, maxWidth: "440px" }}>
              Тысячи долларов в призах: игровые ПК, мониторы, периферия и эксклюзивная техника — ждут чемпионов.
            </p>
            <div className="flex flex-wrap gap-2">
              {TAGS.map((t) => (
                <button
                  key={t}
                  type="button"
                  onClick={() => setSelectedTag(selectedTag === t ? null : t)}
                  className="tag-angled cursor-pointer transition-colors duration-200 hover:bg-cyan-500/15 hover:border-cyan-400/30"
                  style={{
                    background: selectedTag === t ? "rgba(0,229,255,0.12)" : "rgba(0,229,255,0.05)",
                    border: "1px solid " + (selectedTag === t ? "rgba(0,229,255,0.35)" : "rgba(0,229,255,0.15)"),
                    color: "#fff",
                    padding: "6px 15px",
                  }}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>

          {/* Image panel — свечение меняется с выбранным тегом, позже будет тематическая картинка */}
          <div className="relative overflow-hidden clip-both transition-all duration-500">
            <img src={IMG} alt="Festival prizes" className="w-full object-cover"
              style={{ height: "clamp(200px,30vh,300px)", filter: "brightness(0.35) saturate(0.6)" }} />
            <div className="absolute inset-0 transition-opacity duration-500 pointer-events-none"
              style={{
                background: `radial-gradient(ellipse 80% 70% at 50% 50%, ${glowColor}25 0%, ${glowColor}08 40%, transparent 70%)`,
                opacity: 1,
              }} />
            <div className="absolute inset-0 transition-all duration-500 pointer-events-none"
              style={{
                boxShadow: `inset 0 0 80px ${glowColor}18, inset 0 0 140px ${glowColor}08`,
              }} />
            <div className="absolute inset-0" style={{ background: "linear-gradient(to right, rgba(9,9,26,0.8), transparent, rgba(9,9,26,0.8))" }} />
            <div className="absolute inset-0" style={{ background: "linear-gradient(to bottom, transparent, rgba(9,9,26,0.7))" }} />
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <div className="gh-title text-white" style={{ fontSize: "clamp(3.5rem,9vw,6.5rem)" }}>ВЫИГРЫВАЙ</div>
              <div className="gh-title transition-colors duration-500" style={{ fontSize: "clamp(3.5rem,9vw,6.5rem)", color: glowColor }}>КРУПНО</div>
              <div style={{ fontFamily: "'Barlow Condensed',sans-serif", fontSize: "0.58rem", letterSpacing: "0.45em", color: "rgba(255,255,255,0.3)", textTransform: "uppercase", marginTop: "12px" }}>Тысячи в призах</div>
            </div>
            <div className="absolute top-0 left-0 right-0 h-px transition-colors duration-500" style={{ background: `linear-gradient(90deg, transparent, ${glowColor}80, transparent)` }} />
          </div>
        </div>

        {/* Prize cards */}
        <div
          className={selectedTag ? "grid grid-cols-1 max-w-md mb-px" : "grid sm:grid-cols-2 lg:grid-cols-3 mb-px"}
          style={{ gap: "1px", background: "rgba(255,255,255,0.06)" }}
        >
          {filteredPrizes.map((p) => {
            const Icon = p.Icon;
            return (
              <div key={p.title}
                className="group relative overflow-hidden flex flex-col cursor-default transition-all duration-300"
                style={{ background: "#09091A", minHeight: "260px", padding: "34px 28px" }}>
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                  style={{ background: `radial-gradient(ellipse at 100% 0%, ${p.color}14 0%, transparent 65%)` }} />
                <div className="absolute bottom-0 left-0 right-0 h-px opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  style={{ background: `linear-gradient(90deg, transparent, ${p.color}, transparent)` }} />
                <div className="absolute top-0 left-0 bottom-0 w-[2px] opacity-0 group-hover:opacity-60 transition-opacity duration-300"
                  style={{ background: p.color }} />

                <span className="tag-angled mb-6 w-fit" style={{ background: `${p.color}10`, border: `1px solid ${p.color}28`, color: p.color }}>{p.tag}</span>
                <div className="flex flex-row items-center gap-4 mb-6 transition-all duration-350 group-hover:opacity-90">
                  <div className="flex shrink-0 items-center justify-center transition-transform duration-350 group-hover:scale-110"
                    style={{ width: "52px", height: "52px", background: `${p.color}10`, border: `1px solid ${p.color}28`, clipPath: "polygon(10% 0,100% 0,90% 100%,0 100%)" }}>
                    <Icon size={18} style={{ color: p.color }} />
                  </div>
                  <h3 className="gh-title text-white relative z-10" style={{ fontSize: "1.6rem" }}>{p.title}</h3>
                </div>
                <p className="relative z-10 flex-1" style={{ fontFamily: "'Barlow',sans-serif", fontSize: "0.88rem", color: "rgba(255,255,255,0.28)", lineHeight: 1.72 }}>{p.desc}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
