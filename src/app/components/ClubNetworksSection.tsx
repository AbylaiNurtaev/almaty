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
  const [selectedIndex, setSelectedIndex] = useState<number | null>(0);
  const autoRotateRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const AUTO_DELAY = 7000;

  const startAutoRotate = () => {
    if (autoRotateRef.current) clearInterval(autoRotateRef.current);
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

  useEffect(() => {
    startAutoRotate();
    return () => {
      if (autoRotateRef.current) clearInterval(autoRotateRef.current);
    };
  }, []);

  const bgImage = selectedIndex !== null && CLUB_IMAGES[CLUBS[selectedIndex].name]
    ? CLUB_IMAGES[CLUBS[selectedIndex].name]
    : IMG;

  const isClubPhoto = selectedIndex !== null && CLUB_IMAGES[CLUBS[selectedIndex].name];

  const renderPill = (i: number, mobileCompact?: boolean) => {
    const c = CLUBS[i];
    const isSelected = selectedIndex === i;
    return (
      <div key={c.name} className={`club-pill-wrapper ${mobileCompact ? "min-w-0 flex-1" : "max-md:shrink-0"}`}>
        {isSelected && (
          <svg className="club-timer-svg" viewBox="0 0 100 40" preserveAspectRatio="none">
            <rect className="club-timer-ring" x="1.5" y="1.5" width="97" height="37" rx="10" ry="10" />
          </svg>
        )}
        <button
          type="button"
          onClick={() => handleSelect(i)}
          className={
            "club-pill-button group flex items-center justify-center transition-all duration-300 cursor-pointer text-center w-full " +
            (mobileCompact
              ? "!py-2 !px-1 min-h-[44px] gap-0"
              : "gap-5 text-left max-md:gap-2 max-md:!py-2.5 max-md:!px-3 max-md:min-h-[44px]")
          }
          style={{
            background: isSelected ? "rgba(0,229,255,0.08)" : "#09091A",
            padding: mobileCompact ? undefined : "16px 22px",
          }}
        >
          <span
            className={
              "gh-mono text-white group-hover:text-white/80 transition-colors duration-200 leading-tight " +
              (mobileCompact
                ? "!text-[0.55rem] !leading-tight break-words hyphens-auto px-0.5"
                : "flex-1 max-md:!text-[0.72rem] max-md:!tracking-wide whitespace-nowrap")
            }
            style={{ fontSize: mobileCompact ? undefined : "1.08rem" }}
          >
            {c.name}
          </span>
        </button>
      </div>
    );
  };

  return (
    <section
      id="networks"
      className="sec-fullscreen relative overflow-hidden max-md:flex max-md:flex-col max-md:!p-0 max-md:!pt-[max(8px,env(safe-area-inset-top))]"
      style={{ padding: "var(--sec-py) var(--sec-px)" }}
    >
      <div key={bgImage} className="absolute inset-0 club-bg-fade-in">
        <div
          className="absolute inset-0 bg-cover bg-center max-md:bg-[position:center_30%]"
          style={{
            backgroundImage: `url(${bgImage})`,
            filter: isClubPhoto ? "none" : "brightness(0.35) saturate(0.9) contrast(1.05)",
          }}
        />
        <div
          className="absolute inset-0 max-md:opacity-95"
          style={{
            background: isClubPhoto
              ? "linear-gradient(180deg, rgba(9,9,26,0.35) 0%, rgba(9,9,26,0.25) 50%, rgba(9,9,26,0.5) 100%)"
              : "linear-gradient(180deg, rgba(9,9,26,0.82) 0%, rgba(9,9,26,0.72) 50%, rgba(9,9,26,0.88) 100%)",
          }}
        />
      </div>

      <div className="absolute inset-0 bg-dots opacity-14 pointer-events-none" />
      <div
        className="absolute left-0 inset-y-0 w-1/3 pointer-events-none max-md:hidden"
        style={{ background: "radial-gradient(ellipse at left, rgba(0,229,255,0.05) 0%, transparent 65%)" }}
      />

      <div
        className="max-md:w-full max-md:flex max-md:flex-col max-md:min-h-0 max-md:flex-1 max-md:items-center max-md:pt-1"
        style={{ maxWidth: "1380px", margin: "0 auto", position: "relative", zIndex: 10 }}
      >
        <div className="mb-14 max-md:mb-0 max-md:w-full max-md:text-center max-md:px-1 max-md:shrink-0">
          <h2
            className="gh-title text-white max-md:!text-[clamp(1.35rem,5.2vw,1.9rem)] max-md:!leading-tight"
            style={{ fontSize: "var(--h2-sec)" }}
          >
            Приглашенные<br />
            <span style={{ color: "var(--c-cyan,#00E5FF)" }}>франшизы</span>
          </h2>
        </div>
      </div>

      <div
        className="absolute z-[20] w-full px-[var(--sec-px)] bottom-20 left-1/2 -translate-x-1/2 max-md:!left-0 max-md:!right-0 max-md:!translate-x-0 max-md:!bottom-[max(12px,env(safe-area-inset-bottom))] max-md:!px-2 max-md:!w-full"
      >
        <div className="mx-auto flex justify-center max-w-[1380px] max-md:max-w-none w-full">
          {/* Десктоп: одна полоса как раньше */}
          <div className="hidden md:contents">
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
              {CLUBS.map((_, i) => renderPill(i))}
            </div>
          </div>

          {/* Мобилка: ряд 1 — 4 кнопки, ряд 2 — 3 кнопки */}
          <div
            className="md:hidden w-full rounded-[10px] overflow-hidden p-1 gap-px flex flex-col"
            style={{ background: "rgba(255,255,255,0.06)" }}
          >
            <div className="grid grid-cols-4 gap-px w-full min-w-0">
              {[0, 1, 2, 3].map((i) => renderPill(i, true))}
            </div>
            <div className="grid grid-cols-3 gap-px w-full min-w-0">
              {[4, 5, 6].map((i) => renderPill(i, true))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
