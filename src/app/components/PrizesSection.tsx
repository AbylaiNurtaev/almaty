import { useMemo, useState } from "react";
import priz1 from "../../assets/priz/image-1.png";
import priz2 from "../../assets/priz/image-2.png";
import priz3 from "../../assets/priz/image-3.png";
import priz4 from "../../assets/priz/image-4.png";
import priz5 from "../../assets/priz/image-5.png";
import priz6 from "../../assets/priz/image-6.png";
import priz7 from "../../assets/priz/image-7.png";
import priz8 from "../../assets/priz/image.png";
import monitor1 from "../../assets/monitors/1-36.webp";
import monitor2 from "../../assets/monitors/73ea1099-6aed-4071-93f3-69c2a87959c6 (1).jpg";
import monitor3 from "../../assets/monitors/73ea1099-6aed-4071-93f3-69c2a87959c6.jpg";
import monitor4 from "../../assets/monitors/3079104ae6.jpg";
import monitor5 from "../../assets/monitors/a049f3438a.jpg";
import monitor6 from "../../assets/monitors/hi-37.jpg";
import monitor7 from "../../assets/monitors/wide_pic.jpg";
import monitor8 from "../../assets/monitors/ynahjg721a-700x394.jpg";
import headphones1 from "../../assets/headphones/678c0c9cf0867ab0117ab1097ee8becc.webp";
import headphones2 from "../../assets/headphones/6476335128.jpg";
import headphones3 from "../../assets/headphones/best-gaming-headset.jpg";
import headphones4 from "../../assets/headphones/DSC02867_1.webp";
import headphones5 from "../../assets/headphones/hx-hero-audio-cloud-alpha-s-lg.jpg";
import headphones6 from "../../assets/headphones/hyperx_cloud_alpha_002.jpg";
import headphones7 from "../../assets/headphones/hyperx-cloud-alpha-s-review-07.jpg";
import headphones8 from "../../assets/headphones/hyperx-cloud-alpha-s-review-11.jpg";

const TABS = ["Игровые ПК", "Мониторы", "Наушники"] as const;

type TabId = (typeof TABS)[number];

type PrizeItem = {
  id: string;
  label: string;
  image?: string;
};

const ITEMS_BY_TAB: Record<TabId, PrizeItem[]> = {
  "Игровые ПК": [
    { id: "pc-01", label: "Игровой ПК 01", image: priz1 },
    { id: "pc-02", label: "Игровой ПК 02", image: priz2 },
    { id: "pc-03", label: "Игровой ПК 03", image: priz3 },
    { id: "pc-04", label: "Игровой ПК 04", image: priz4 },
    { id: "pc-05", label: "Игровой ПК 05", image: priz5 },
    { id: "pc-06", label: "Игровой ПК 06", image: priz6 },
    { id: "pc-07", label: "Игровой ПК 07", image: priz7 },
    { id: "pc-08", label: "Игровой ПК 08", image: priz8 },
  ],
  Мониторы: [
    { id: "mn-01", label: "Монитор 01", image: monitor1 },
    { id: "mn-02", label: "Монитор 02", image: monitor2 },
    { id: "mn-03", label: "Монитор 03", image: monitor3 },
    { id: "mn-04", label: "Монитор 04", image: monitor4 },
    { id: "mn-05", label: "Монитор 05", image: monitor5 },
    { id: "mn-06", label: "Монитор 06", image: monitor6 },
    { id: "mn-07", label: "Монитор 07", image: monitor7 },
    { id: "mn-08", label: "Монитор 08", image: monitor8 },
  ],
  Наушники: [
    { id: "hp-01", label: "Наушники 01", image: headphones1 },
    { id: "hp-02", label: "Наушники 02", image: headphones2 },
    { id: "hp-03", label: "Наушники 03", image: headphones3 },
    { id: "hp-04", label: "Наушники 04", image: headphones4 },
    { id: "hp-05", label: "Наушники 05", image: headphones5 },
    { id: "hp-06", label: "Наушники 06", image: headphones6 },
    { id: "hp-07", label: "Наушники 07", image: headphones7 },
    { id: "hp-08", label: "Наушники 08", image: headphones8 },
  ],
};

export function PrizesSection() {
  const [selectedTab, setSelectedTab] = useState<TabId>("Игровые ПК");
  const items = useMemo(() => ITEMS_BY_TAB[selectedTab], [selectedTab]);

  return (
    <section
      id="prizes"
      className="sec-fullscreen relative overflow-hidden"
      style={{
        background: "#020a18",
        paddingTop: "max(64px, calc(var(--sec-py) * 0.7))",
        paddingBottom: "max(38px, calc(var(--sec-py) * 0.45))",
        paddingLeft: "var(--sec-px)",
        paddingRight: "var(--sec-px)",
      }}
    >
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: "linear-gradient(180deg, #020a18 0%, #030d1e 65%, #020a18 100%)" }}
      />
      <div className="absolute inset-0 bg-grid opacity-8 pointer-events-none" />

      <div
        className="w-full"
        style={{ maxWidth: "1260px", margin: "0 auto", position: "relative", zIndex: 10 }}
      >
        <div className="grid md:grid-cols-[auto_1fr] gap-5 md:gap-10 items-start mb-7 md:mb-10">
          <div>
            <h2
              className="gh-title text-white leading-[0.96]"
              style={{ fontSize: "clamp(2.1rem, 4vw, 4.4rem)" }}
            >
              Призы
              <br />
              <span style={{ color: "var(--c-cyan,#00E5FF)" }}>фестиваля</span>
            </h2>
          </div>
          <div
            style={{
              fontFamily: "'Barlow',sans-serif",
              color: "rgba(255,255,255,0.55)",
              letterSpacing: "0.03em",
              lineHeight: 1.5,
              fontSize: "clamp(0.95rem, 1.2vw, 1.5rem)",
              maxWidth: "720px",
              paddingTop: "8px",
            }}
          >
            Тысячи долларов в призах: игровые ПК, мониторы, периферия и эксклюзивная техника — ждут чемпионов.
          </div>
        </div>

        <div
          className="flex flex-wrap gap-2 md:gap-3 mb-7 md:mb-8"
        >
          {TABS.map((tab) => {
            const isActive = tab === selectedTab;
            return (
              <button
                key={tab}
                type="button"
                onClick={() => setSelectedTab(tab)}
                className="transition-all duration-200 text-white/90 hover:text-white"
                style={{
                  minWidth: "clamp(152px, 20vw, 220px)",
                  padding: "14px 28px",
                  background: isActive ? "#19d4ef" : "rgba(255,255,255,0.14)",
                  color: isActive ? "#062034" : "rgba(255,255,255,0.85)",
                  fontFamily: "'SF Pro',sans-serif",
                  fontWeight: 500,
                  fontSize: "clamp(0.98rem, 1.1vw, 1.4rem)",
                  clipPath: "polygon(3% 0,100% 0,97% 100%,0 100%)",
                }}
              >
                {tab}
              </button>
            );
          })}
        </div>

        <div
          className="grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-[12px]"
          style={{ gridTemplateRows: "repeat(2, minmax(110px, 1fr))" }}
        >
          {items.map((item, index) => (
            <div
              key={item.id}
              className="relative overflow-hidden"
              style={{
                minHeight: "clamp(92px, 12vw, 150px)",
                background:
                  index % 3 === 0
                    ? "linear-gradient(135deg, #100f2a 0%, #431677 45%, #142f90 100%)"
                    : index % 3 === 1
                      ? "linear-gradient(135deg, #121a38 0%, #0b63b1 48%, #53106e 100%)"
                      : "linear-gradient(135deg, #1b1039 0%, #9c0ddf 42%, #0e4ba5 100%)",
              }}
            >
              <div
                className="absolute inset-0"
                style={{
                  background: "radial-gradient(circle at 15% 25%, rgba(255,255,255,0.2), transparent 45%)",
                }}
              />
              {item.image && (
                <img
                  src={item.image}
                  alt={item.label}
                  className="absolute inset-0 w-full h-full object-cover"
                />
              )}
              <div
                className="absolute inset-0"
                style={{
                  background: "linear-gradient(180deg, transparent 0%, rgba(2,10,24,0.5) 100%)",
                }}
              />
              <span
                className="absolute left-3 bottom-2 md:left-4 md:bottom-3"
                style={{
                  fontFamily: "'SF Pro',sans-serif",
                  fontSize: "0.76rem",
                  letterSpacing: "0.08em",
                  color: "rgba(255,255,255,0.65)",
                  textTransform: "uppercase",
                }}
              >
                {item.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
