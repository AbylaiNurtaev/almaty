import { useState } from "react";
import { useLanguage } from "../context/LanguageContext";
import msiPrize from "../../assets/prizes_new/msi.png";
import monitorPrize from "../../assets/prizes_new/monitor-starline.png";
import devicePrize from "../../assets/prizes_new/device-zone51.png";

const TABS = ["Игровые ПК", "Мониторы", "Девайсы"] as const;

type TabId = (typeof TABS)[number];

const IMAGE_BY_TAB: Record<TabId, string> = {
  "Игровые ПК": msiPrize,
  Мониторы: monitorPrize,
  Девайсы: devicePrize,
};

const IMAGE_SCALE_BY_TAB: Record<TabId, number> = {
  "Игровые ПК": 1,
  Мониторы: 1.1,
  Девайсы: 0.9,
};

export function PrizesSection() {
  const { language } = useLanguage();
  const isEn = language === "en";
  const [selectedTab, setSelectedTab] = useState<TabId>("Игровые ПК");
  const tabMap: Record<string, string> = {
    "Игровые ПК": "Gaming PCs",
    Мониторы: "Monitors",
    Девайсы: "Devices",
  };
  const reverseTabMap: Record<string, TabId> = {
    "Gaming PCs": "Игровые ПК",
    Monitors: "Мониторы",
    Devices: "Девайсы",
  };
  const displayTabs = isEn ? (TABS.map((t) => tabMap[t]) as string[]) : (TABS as unknown as string[]);
  const internalTab = (isEn ? reverseTabMap[selectedTab] ?? selectedTab : selectedTab) as TabId;
  const selectedImage = IMAGE_BY_TAB[internalTab];
  const selectedImageScale = IMAGE_SCALE_BY_TAB[internalTab];

  return (
    <section
      id="prizes"
      className="sec-fullscreen relative overflow-hidden md:flex md:items-center"
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
        <div className="grid md:grid-cols-[300px_minmax(0,1fr)] lg:grid-cols-[360px_minmax(0,1fr)] gap-6 md:gap-10 items-start">
          <div className="md:sticky md:top-20">
            <h2
              className="gh-title text-white leading-[0.96]"
              style={{ fontSize: "clamp(2.1rem, 4vw, 4.4rem)" }}
            >
              {isEn ? "Festival" : "Призы"}
              <br />
              <span style={{ color: "var(--c-cyan,#00E5FF)" }}>{isEn ? "Prizes" : "фестиваля"}</span>
            </h2>
            <div className="flex flex-wrap md:flex-col gap-2 md:gap-3 mt-5 md:mt-8">
              {displayTabs.map((tab) => {
                const sourceTab = isEn ? reverseTabMap[tab] : (tab as TabId);
                const isActive = sourceTab === internalTab;
                return (
                  <button
                    key={tab}
                    type="button"
                    onClick={() => setSelectedTab((sourceTab as TabId))}
                    className="transition-all duration-200 text-white/90 hover:text-white md:w-full md:text-left"
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
          </div>

          <div
            className="w-full flex items-center justify-center overflow-hidden"
            style={{ height: "clamp(340px, 64vh, 760px)" }}
          >
            <img
              src={selectedImage}
              alt={internalTab}
              className="w-full h-full object-contain"
              style={{ transform: `scale(${selectedImageScale})` }}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
