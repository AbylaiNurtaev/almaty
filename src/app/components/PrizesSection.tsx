import { useState } from "react";
import { Cpu, Monitor, Keyboard } from "lucide-react";

import imgPc from "../../assets/pc.png";
import imgMonitor from "../../assets/monitor.webp";
import imgHeadphones from "../../assets/headphones.png";

const PRIZES = [
  { Icon: Cpu,      title: "Игровые ПК",   color: "#00D4F5" },
  { Icon: Monitor,  title: "Мониторы",    color: "#6B21E8" },
  { Icon: Keyboard, title: "Периферия",    color: "#E8A800" },
];

const TAGS = ["Игровые ПК", "Мониторы", "Наушники"] as const;
const TAG_TO_IMAGE: Record<(typeof TAGS)[number], string> = {
  "Игровые ПК": imgPc,
  Мониторы: imgMonitor,
  Наушники: imgHeadphones,
};
const TAG_TO_TITLE: Record<string, string> = { "Игровые ПК": "Игровые ПК", "Мониторы": "Мониторы", "Наушники": "Периферия" };

const TAG_TO_COLOR: Record<string, string> = { "Игровые ПК": "#00D4F5", "Мониторы": "#6B21E8", "Наушники": "#E8A800" };
const DEFAULT_GLOW = "#00E5FF";

export function PrizesSection() {
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const filteredPrizes = selectedTag
    ? PRIZES.filter((p) => p.title === TAG_TO_TITLE[selectedTag])
    : PRIZES;
  const glowColor = selectedTag ? TAG_TO_COLOR[selectedTag] ?? DEFAULT_GLOW : DEFAULT_GLOW;
  return (
    <section
      id="prizes"
      className="sec-fullscreen relative overflow-hidden max-md:!p-0 max-md:flex max-md:flex-col max-md:items-center max-md:min-h-0 max-md:py-[max(8px,env(safe-area-inset-top))] max-md:pb-[max(8px,env(safe-area-inset-bottom))]"
      style={{
        background: "#09091A",
        paddingTop: "var(--sec-py)",
        paddingBottom: "calc(var(--sec-py) * 0.65)",
        paddingLeft: "var(--sec-px)",
        paddingRight: "var(--sec-px)",
      }}
    >

      <div className="absolute inset-0 bg-dots opacity-14 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-1/2 h-2/3 pointer-events-none max-md:hidden"
        style={{ background: "radial-gradient(ellipse at left bottom, rgba(124,58,237,0.07) 0%, transparent 65%)" }} />
      <div className="absolute top-0 right-0 w-1/2 h-2/3 pointer-events-none max-md:hidden"
        style={{ background: "radial-gradient(ellipse at right top, rgba(0,229,255,0.05) 0%, transparent 65%)" }} />

      <div
        className="max-md:w-[95vw] max-md:max-w-[95vw] max-md:mx-auto max-md:flex max-md:flex-col max-md:items-center max-md:min-h-0 max-md:flex-1 max-md:self-stretch"
        style={{ maxWidth: "1380px", margin: "0 auto", position: "relative", zIndex: 10 }}
      >

        <div className="grid md:grid-cols-2 gap-16 items-center mb-10 max-md:grid-cols-1 max-md:gap-3 max-md:mb-2 max-md:shrink-0 max-md:w-full">
          <div className="max-md:text-center max-md:order-2">
            <div className="eyebrow max-md:!mb-1 max-md:!text-[0.55rem] max-md:!tracking-[0.2em]">Выигрывайте крупно</div>
            <h2
              className="gh-title text-white mb-7 max-md:!mb-2 max-md:!text-[clamp(1.35rem,5vw,1.85rem)] max-md:!leading-tight"
              style={{ fontSize: "var(--h2-sec)" }}
            >
              Призы<br />
              <span style={{ color: "var(--c-cyan,#00E5FF)" }}>фестиваля</span>
            </h2>
            <p
              className="mb-9 max-md:!mb-3 max-md:!text-[0.8rem] max-md:!leading-snug max-md:mx-auto max-md:max-w-[95%]"
              style={{
                fontFamily: "'Barlow',sans-serif",
                fontSize: "1rem",
                letterSpacing: "0.03em",
                color: "rgba(255,255,255,0.38)",
                lineHeight: 1.78,
                maxWidth: "440px",
              }}
            >
              Тысячи долларов в призах: игровые ПК, мониторы, периферия и эксклюзивная техника — ждут чемпионов.
            </p>
            <div className="flex flex-wrap gap-2 max-md:justify-center max-md:gap-1.5">
              {TAGS.map((t) => (
                <button
                  key={t}
                  type="button"
                  onClick={() => setSelectedTag(selectedTag === t ? null : t)}
                  className="tag-angled cursor-pointer transition-colors duration-200 hover:bg-cyan-500/15 hover:border-cyan-400/30 max-md:!py-1 max-md:!px-2.5 max-md:!text-[0.65rem]"
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

          <div
            className="relative overflow-hidden clip-both transition-all duration-500 max-md:order-1 max-md:rounded-md max-md:border max-md:border-white/10 bg-[#0c0c18]"
            style={{ minHeight: "clamp(200px,30vh,300px)" }}
          >
            <div className="h-[clamp(200px,30vh,300px)] max-md:!h-[24dvh] max-md:!min-h-[100px] max-md:!max-h-[200px]">
              {selectedTag ? (
                <img
                  key={selectedTag}
                  src={TAG_TO_IMAGE[selectedTag as (typeof TAGS)[number]]}
                  alt=""
                  className="w-full h-full object-contain p-4 max-md:p-3 transition-opacity duration-500"
                />
              ) : (
                <div className="grid grid-cols-3 gap-0.5 h-full p-2 max-md:p-1.5">
                  {TAGS.map((t) => (
                    <div
                      key={t}
                      className="relative overflow-hidden rounded-sm bg-[#12121f]"
                    >
                      <img
                        src={TAG_TO_IMAGE[t]}
                        alt=""
                        className="absolute inset-0 w-full h-full object-contain p-2 max-md:p-1"
                      />
                    </div>
                  ))}
                </div>
              )}
            </div>
            <div
              className="absolute inset-0 pointer-events-none transition-opacity duration-500"
              style={{
                background: `radial-gradient(ellipse 70% 60% at 50% 45%, ${glowColor}18 0%, transparent 65%)`,
                opacity: selectedTag ? 1 : 0.45,
              }}
            />
            <div className="absolute top-0 left-0 right-0 h-px transition-colors duration-500" style={{ background: `linear-gradient(90deg, transparent, ${glowColor}55, transparent)` }} />
          </div>
        </div>

        <div
          className={
            (selectedTag
              ? "grid grid-cols-1 max-w-xs max-md:!max-w-none max-md:flex-none max-md:self-start"
              : "grid grid-cols-3 max-w-3xl max-md:!grid-cols-1 max-md:grid-rows-3 max-md:flex-1 max-md:min-h-0 max-md:auto-rows-fr") +
            " max-md:w-full max-md:rounded-md max-md:overflow-hidden max-md:border max-md:border-white/[0.06]"
          }
          style={{ gap: "1px", background: "rgba(255,255,255,0.06)" }}
        >
          {filteredPrizes.map((p) => {
            const Icon = p.Icon;
            return (
              <div
                key={p.title}
                className={
                  "group relative overflow-hidden flex flex-col justify-center items-start cursor-default transition-all duration-300 bg-[#09091A] md:h-[88px] md:p-4 max-md:w-full max-md:px-3 max-md:py-3 " +
                  (selectedTag
                    ? "max-md:!h-[88px] max-md:min-h-[88px] max-md:max-h-[88px] max-md:shrink-0"
                    : "max-md:min-h-0 max-md:h-full")
                }
              >
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none max-md:hidden"
                  style={{ background: `radial-gradient(ellipse at 100% 0%, ${p.color}14 0%, transparent 65%)` }} />
                <div className="absolute bottom-0 left-0 right-0 h-px opacity-0 group-hover:opacity-100 transition-opacity duration-300 max-md:hidden"
                  style={{ background: `linear-gradient(90deg, transparent, ${p.color}, transparent)` }} />
                <div className="absolute top-0 left-0 bottom-0 w-[2px] opacity-0 group-hover:opacity-60 transition-opacity duration-300 max-md:hidden"
                  style={{ background: p.color }} />

                <div className="flex flex-row items-center gap-3 transition-all duration-350 group-hover:opacity-90 max-md:gap-2.5 max-md:w-full">
                  <div
                    className="flex shrink-0 items-center justify-center transition-transform duration-350 group-hover:scale-110 w-10 h-10 max-md:w-9 max-md:h-9"
                    style={{ background: `${p.color}10`, border: `1px solid ${p.color}28`, clipPath: "polygon(10% 0,100% 0,90% 100%,0 100%)" }}
                  >
                    <Icon className="max-md:!w-3 max-md:!h-3" size={14} style={{ color: p.color }} />
                  </div>
                  <h3 className="gh-title text-white relative z-10 text-xl max-md:!text-[0.95rem]" style={{ fontSize: "1.25rem" }}>
                    {p.title}
                  </h3>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
