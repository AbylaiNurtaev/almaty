import { useEffect, useRef, useState } from "react";
const IMG = "https://images.unsplash.com/photo-1558324190-c940eb141401?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb21wdXRlciUyMGdhbWluZyUyMGNsdWIlMjByb29tJTIwZGFyayUyMG5lb24lMjByb3dzJTIwc2V0dXB8ZW58MXx8fHwxNzcyODAzOTE5fDA&ixlib=rb-4.1.0&q=80&w=1080";

import broArenaImg from "@/assets/clubs/BRO Arena.jpg";
import colizeumImg from "@/assets/clubs/COLIZEUM.png";
import cybershokeImg from "@/assets/clubs/CYBERSHOKE.jpg";
import cyberxImg from "@/assets/clubs/CYBERX.jpg";
import trueGamersImg from "@/assets/clubs/TrueGamers.png";

const CLUB_IMAGES: Record<string, string> = {
  "COLIZEUM": colizeumImg,
  "CYBERX": cyberxImg,
  "CYBERSHOKE": cybershokeImg,
  "TrueGamers": trueGamersImg,
  "BRO Arena": broArenaImg,
};

const CLUBS = [
  { name: "COLIZEUM",     locs: "50+", region: "Nationwide" },
  { name: "CYBERX",       locs: "30+", region: "Nationwide" },
  { name: "MYSKILL Room", locs: "20+", region: "Kazakhstan" },
  { name: "TOPGAME",      locs: "15+", region: "Kazakhstan" },
  { name: "CYBERSHOKE",   locs: "12+", region: "Almaty" },
  { name: "TrueGamers",   locs: "10+", region: "Almaty" },
  { name: "BRO Arena",    locs: "8+",  region: "Kazakhstan" },
];

export function ClubNetworksSection() {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(0); // COLIZEUM по умолчанию
  const autoRotateRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const AUTO_DELAY = 7000;

  const startAutoRotate = () => {
    if (autoRotateRef.current) {
      clearInterval(autoRotateRef.current);
    }
    autoRotateRef.current = setInterval(() => {
      setSelectedIndex((prev) => {
        if (prev === null) return 0;
        return (prev + 1) % CLUBS.length;
      });
    }, AUTO_DELAY);
  };

  const handleSelect = (index: number) => {
    setSelectedIndex(index);
    startAutoRotate();
  };

  // Автопереключение выбранной франшизы каждые 7 секунд
  useEffect(() => {
    startAutoRotate();
    return () => {
      if (autoRotateRef.current) {
        clearInterval(autoRotateRef.current);
      }
    };
  }, []);

  const bgImage = selectedIndex !== null && CLUB_IMAGES[CLUBS[selectedIndex].name]
    ? CLUB_IMAGES[CLUBS[selectedIndex].name]
    : IMG;

  const isClubPhoto = selectedIndex !== null && CLUB_IMAGES[CLUBS[selectedIndex].name];

  return (
    <section id="networks" className="sec-fullscreen relative overflow-hidden"
      style={{ padding: "var(--sec-py) var(--sec-px)" }}>

      {/* Full-bleed background: image + dark overlay, smooth transition; club photos in original */}
      <div key={bgImage} className="absolute inset-0 club-bg-fade-in">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url(${bgImage})`,
            filter: isClubPhoto ? "none" : "brightness(0.35) saturate(0.9) contrast(1.05)",
          }}
        />
        <div
          className="absolute inset-0"
          style={{
            background: isClubPhoto
              ? "linear-gradient(180deg, rgba(9,9,26,0.35) 0%, rgba(9,9,26,0.25) 50%, rgba(9,9,26,0.5) 100%)"
              : "linear-gradient(180deg, rgba(9,9,26,0.82) 0%, rgba(9,9,26,0.72) 50%, rgba(9,9,26,0.88) 100%)",
          }}
        />
      </div>

      <div className="absolute inset-0 bg-dots opacity-14 pointer-events-none" />
      <div className="absolute left-0 inset-y-0 w-1/3 pointer-events-none"
        style={{ background: "radial-gradient(ellipse at left, rgba(0,229,255,0.05) 0%, transparent 65%)" }} />

      <div style={{ maxWidth: "1380px", margin: "0 auto", position: "relative", zIndex: 10 }}>
        {/* Заголовок секции — как в остальных секциях */}
        <div className="mb-14">
          <h2 className="gh-title text-white" style={{ fontSize: "var(--h2-sec)" }}>
            Приглашенные<br />
            <span style={{ color: "var(--c-cyan,#00E5FF)" }}>франшизы</span>
          </h2>
        </div>
      </div>

      {/* Горизонтальные переключатели франшиз внизу по центру */}
      <div
        style={{
          position: "absolute",
          left: "50%",
          transform: "translateX(-50%)",
          bottom: "150px",
          zIndex: 20,
          width: "100%",
          padding: "0 var(--sec-px)",
        }}
      >
        <div
          style={{
            maxWidth: "1380px",
            margin: "0 auto",
            display: "flex",
            justifyContent: "center",
          }}
        >
          <div
            className="club-switcher-bar"
            style={{
              gap: "1px",
              display: "flex",
              flexDirection: "row",
              flexWrap: "wrap",
              background: "rgba(255,255,255,0.06)",
              padding: "4px",
            }}
          >
            {CLUBS.map((c, i) => {
              const isSelected = selectedIndex === i;
              return (
                <div key={c.name} className="club-pill-wrapper">
                  {isSelected && (
                    <svg className="club-timer-svg" viewBox="0 0 100 40" preserveAspectRatio="none">
                      <rect className="club-timer-ring" x="1.5" y="1.5" width="97" height="37" rx="10" ry="10" />
                    </svg>
                  )}
                  <button
                    type="button"
                    onClick={() => handleSelect(i)}
                    className="club-pill-button group flex items-center gap-5 transition-all duration-300 cursor-pointer text-left"
                    style={{
                      background: isSelected ? "rgba(0,229,255,0.08)" : "#09091A",
                      padding: "16px 22px",
                    }}
                  >
                    <span
                      className="gh-mono text-white flex-1 group-hover:text-white/80 transition-colors duration-200"
                      style={{ fontSize: "1.08rem" }}
                    >
                      {c.name}
                    </span>
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}