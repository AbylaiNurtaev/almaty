import { useState } from "react";
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

  const bgImage = selectedIndex !== null && CLUB_IMAGES[CLUBS[selectedIndex].name]
    ? CLUB_IMAGES[CLUBS[selectedIndex].name]
    : IMG;

  const isClubPhoto = selectedIndex !== null && CLUB_IMAGES[CLUBS[selectedIndex].name];

  return (
    <section id="networks" className="relative overflow-hidden"
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
      <div className="wm" style={{ fontSize: "clamp(10rem,20vw,18rem)", right: "-2rem", top: "-1rem" }}>08</div>

      <div style={{ maxWidth: "1380px", margin: "0 auto", position: "relative", zIndex: 10 }}>
        <div className="grid lg:grid-cols-2 gap-20 xl:gap-32 items-center">

          {/* Image */}
          <div className="relative order-2 lg:order-1">


            {/* Stat badge */}
            
          </div>

          {/* Content */}
          <div className="order-1 lg:order-2">
            <h2 className="gh-title text-white mb-6" style={{ fontSize: "var(--h2-sec)" }}>
              Приглашенные<br />
              <span style={{ color: "var(--c-cyan,#00E5FF)" }}>франшизы</span>
            </h2>
            

            {/* Clubs list */}
            <div style={{ gap: "1px", display: "flex", flexDirection: "column", background: "rgba(255,255,255,0.06)" }}>
              {CLUBS.map((c, i) => {
                const isSelected = selectedIndex === i;
                return (
                  <button
                    key={c.name}
                    type="button"
                    onClick={() => setSelectedIndex(i)}
                    className="group flex items-center gap-5 transition-all duration-300 cursor-pointer text-left w-full border-l-2"
                    style={{
                      background: isSelected ? "rgba(0,229,255,0.08)" : "#09091A",
                      padding: "16px 22px",
                      borderLeftColor: isSelected ? "var(--c-cyan,#00E5FF)" : "transparent",
                    }}
                  >
                    <span style={{ fontFamily: "'Barlow Condensed',sans-serif", fontWeight: 700, fontSize: "0.68rem", color: "rgba(0,229,255,0.22)", letterSpacing: "0.1em", minWidth: "24px" }}>
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <div className="w-px h-5 shrink-0" style={{ background: "rgba(255,255,255,0.08)" }} />
                    <span className="gh-mono text-white flex-1 group-hover:text-white/80 transition-colors duration-200" style={{ fontSize: "1.08rem" }}>
                      {c.name}
                    </span>
                    <span style={{ fontFamily: "'Barlow Condensed',sans-serif", fontSize: "0.6rem", letterSpacing: "0.16em", color: "rgba(255,255,255,0.15)", textTransform: "uppercase" }}>{c.region}</span>
                    <div className="shrink-0 px-3 py-1.5"
                      style={{ border: "1px solid rgba(0,229,255,0.16)", background: "rgba(0,229,255,0.05)" }}>
                      <span style={{ fontFamily: "'Barlow Condensed',sans-serif", fontWeight: 800, fontSize: "0.85rem", color: "var(--c-cyan,#00E5FF)", letterSpacing: "0.04em" }}>{c.locs}</span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}