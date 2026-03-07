import { useState } from "react";

const PORTRAITS = [
  "https://images.unsplash.com/photo-1634651754953-1565eca58d5c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxnYW1lciUyMHN0cmVhbWVyJTIwY29udGVudCUyMGNyZWF0b3IlMjBicm9hZGNhc3RpbmclMjBsaXZlJTIwbmVvbiUyMGRhcmt8ZW58MXx8fHwxNzcyODA1NDU5fDA&ixlib=rb-4.1.0&q=80&w=800",
  "https://images.unsplash.com/photo-1667355744870-df772b842b0b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlc3BvcnRzJTIwc3RyZWFtZXIlMjBjb250ZW50JTIwY3JlYXRvciUyMGdhbWluZyUyMGhlYWRzZXQlMjBwb3J0cmFpdCUyMG5lb258ZW58MXx8fHwxNzcyODAzOTE2fDA&ixlib=rb-4.1.0&q=80&w=800",
  "https://images.unsplash.com/photo-1515295527612-cb8132ecb496?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlc3BvcnRzJTIwdG91cm5hbWVudCUyMHByb2Zlc3Npb25hbCUyMHBsYXllciUyMGhlYWRzZXQlMjBmb2N1c2VkJTIwY29tcGV0aXRpb258ZW58MXx8fHwxNzcyODA1NDU2fDA&ixlib=rb-4.1.0&q=80&w=800",
  "https://images.unsplash.com/photo-1713012003065-7ca32db003ef?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxnYW1pbmclMjB0b3VybmFtZW50JTIwcHJvJTIwcGxheWVyJTIwa2V5Ym9hcmQlMjBkYXJrJTIwUkdCfGVufDF8fHx8MTc3MjgwMzkxMnww&ixlib=rb-4.1.0&q=80&w=800",
];

const STREAMERS = [
  { name: "Buster",           role: "CS2",           color: "#FF6500", img: 0, followers: "2.1M", platform: "Twitch",  featured: true },
  { name: "Bratishkin",       role: "Entertainment",  color: "#00E5FF", img: 1, followers: "5.8M", platform: "YouTube", featured: false },
  { name: "Del1ght",          role: "Dota 2",         color: "#7C3AED", img: 2, followers: "1.4M", platform: "Twitch",  featured: false },
  { name: "Sasavot",          role: "PUBG",           color: "#F5B800", img: 3, followers: "890K",  platform: "YouTube", featured: false },
  { name: "Zubarev",          role: "CS2",            color: "#00D97E", img: 0, followers: "1.2M", platform: "Twitch",  featured: false },
  { name: "Korya",            role: "Entertainment",  color: "#F03558", img: 1, followers: "3.2M", platform: "YouTube", featured: false },
  { name: "Dmitrii Lixx",     role: "Dota 2",         color: "#8B5CF6", img: 2, followers: "670K",  platform: "Twitch",  featured: false },
  { name: "Daniil Gerasimov", role: "PUBG",           color: "#F97316", img: 3, followers: "1.1M", platform: "YouTube", featured: false },
  { name: "Erik Shokov",      role: "CS2",            color: "#06B6D4", img: 0, followers: "980K",  platform: "Twitch",  featured: false },
];

const PLAT_COLOR: Record<string, string> = { Twitch: "#9147FF", YouTube: "#FF0000" };

const LEFT_INDICES = [0, 1, 2, 3, 4, 5];   // 6 стримеров слева (3×2)
const RIGHT_INDICES = [6, 7, 8];            // 3 стримера справа + ячейка «ещё»

export function StreamersSection() {
  const [selectedId, setSelectedId] = useState(0);
  const selected = STREAMERS[selectedId];

  const renderStreamerCard = (s: typeof STREAMERS[0], index: number, isSelected: boolean) => (
    <button
      type="button"
      key={s.name}
      className="streamer-card w-full text-left"
      style={{
        border: isSelected ? `1px solid ${s.color}55` : "1px solid rgba(255,255,255,0.06)",
        minHeight: "200px",п
      }}
      onClick={() => setSelectedId(index)}
    >
      <img
        src={PORTRAITS[s.img]}
        alt={s.name}
        className="absolute inset-0 w-full h-full object-cover"
        style={{
          filter: isSelected ? "brightness(0.4) saturate(0.7)" : "brightness(0.2) saturate(0.35)",
          transition: "filter 0.35s ease",
        }}
      />
      <div
        className="absolute inset-0"
        style={{ background: "linear-gradient(to top, rgba(5,5,8,0.98) 0%, rgba(5,5,8,0.25) 55%, transparent 100%)" }}
      />
      {isSelected && (
        <div
          className="absolute inset-0"
          style={{ background: `linear-gradient(to top, ${s.color}18 0%, transparent 60%)` }}
        />
      )}
      <div
        className="absolute bottom-0 left-0 right-0 h-px transition-opacity duration-300"
        style={{
          background: `linear-gradient(90deg, transparent, ${s.color}, transparent)`,
          opacity: isSelected ? 1 : 0,
        }}
      />
      <div
        className="absolute top-0 left-0 bottom-0 w-[2px] transition-opacity duration-300"
        style={{ background: s.color, opacity: isSelected ? 0.9 : 0 }}
      />
      <div className="absolute bottom-0 left-0 right-0 p-4 z-10">
        <span
          className="tag-angled mb-2 inline-block"
          style={{
            background: isSelected ? s.color : "rgba(255,255,255,0.06)",
            color: isSelected ? "#040410" : "rgba(255,255,255,0.4)",
            border: isSelected ? undefined : "1px solid rgba(255,255,255,0.1)",
            fontSize: "0.5rem",
            letterSpacing: "0.25em",
          }}
        >
          {s.role}
        </span>
        <div className="gh-mono text-white" style={{ fontSize: "1.1rem" }}>{s.name}</div>
      </div>
    </button>
  );

  return (
    <section
      id="streamers"
      className="relative overflow-hidden"
      style={{ background: "#09091A", padding: "var(--sec-py) var(--sec-px)" }}
    >
      <div className="absolute inset-0 bg-dots opacity-14 pointer-events-none" />
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: "radial-gradient(ellipse 65% 55% at 95% 30%, rgba(0,229,255,0.055) 0%, transparent 70%)" }}
      />

      <div style={{ maxWidth: "1380px", margin: "0 auto", position: "relative", zIndex: 10 }}>

        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-10 mb-14">
          <div>
            <div className="eyebrow">Специальные гости</div>
            <h2 className="gh-title text-white" style={{ fontSize: "var(--h2-sec)" }}>
              Стримеры и<br />
              <span style={{ color: "var(--c-cyan,#00E5FF)" }}>
                инфлюенсеры
              </span>
            </h2>
          </div>
        </div>

        {/* Layout на всю ширину: слева стримеры | центр видеобращение | справа стримеры */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_auto_1fr] gap-4 lg:gap-6 items-stretch">
          {/* Слева — стримеры (3×2) */}
          <div className="grid grid-cols-2 grid-rows-3 gap-3 order-1 min-w-0">
            {LEFT_INDICES.map((i) => renderStreamerCard(STREAMERS[i], i, selectedId === i))}
          </div>

          {/* По центру — видеобращение (9:16), увеличенный блок */}
          <div className="flex justify-center order-2 min-h-[360px] min-w-0">
            <div
              className="streamer-card w-full max-w-[320px] lg:max-w-[380px] flex flex-col justify-end"
              style={{
                aspectRatio: "9/16",
                border: `1px solid ${selected.color}22`,
              }}
            >
            <img
              src={PORTRAITS[selected.img]}
              alt={selected.name}
              className="absolute inset-0 w-full h-full object-cover object-top"
              style={{ filter: "brightness(0.35) saturate(0.7)" }}
            />
            <div
              className="absolute inset-0"
              style={{
                background: `linear-gradient(to top, rgba(5,5,8,0.98) 0%, rgba(5,5,8,0.4) 50%, ${selected.color}0A 100%)`,
              }}
            />
            <div
              className="absolute top-0 left-0 bottom-0 w-[3px]"
              style={{ background: `linear-gradient(to bottom, ${selected.color}, ${selected.color}33)` }}
            />
            <div
              className="absolute top-0 left-0 right-0 h-px"
              style={{ background: `linear-gradient(90deg, ${selected.color}, transparent 60%)` }}
            />
            {/* Кнопка play */}
            <div className="absolute inset-0 flex items-center justify-center z-10">
              <div
                className="w-14 h-14 rounded-full flex items-center justify-center"
                style={{ background: `${selected.color}22`, border: `2px solid ${selected.color}` }}
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" style={{ color: selected.color }}>
                  <path d="M8.5 7v10l10.5-5L8.5 7z" fill="currentColor" />
                </svg>
              </div>
            </div>
            <div className="absolute bottom-0 left-0 right-0 p-5 z-20">
              <span
                className="tag-angled mb-2 inline-block"
                style={{ background: selected.color, color: "#040410", fontSize: "0.5rem", letterSpacing: "0.25em" }}
              >
                {selected.role}
              </span>
              <div className="gh-title text-white mb-2" style={{ fontSize: "clamp(1.15rem, 3.5vw, 1.6rem)" }}>
                {selected.name}
              </div>
              <div className="flex items-center gap-2 flex-wrap">
                <div className="flex items-center gap-1.5">
                  <div className="w-2.5 h-2.5 rounded-full shrink-0" style={{ background: PLAT_COLOR[selected.platform] }} />
                  <span style={{ fontFamily: "'Barlow',sans-serif", fontSize: "0.9rem", color: "rgba(255,255,255,0.5)" }}>
                    {selected.platform}
                  </span>
                </div>
                <span
                  style={{
                    fontFamily: "'Barlow Condensed',sans-serif",
                    fontSize: "0.85rem",
                    color: "rgba(255,255,255,0.35)",
                    letterSpacing: "0.05em",
                  }}
                >
                  {selected.followers}
                </span>
              </div>
            </div>
            </div>
          </div>

          {/* Справа — стримеры + «ещё» + заглушки (3×2) */}
          <div className="grid grid-cols-2 grid-rows-3 gap-3 order-3 min-w-0">
            {RIGHT_INDICES.map((i) => renderStreamerCard(STREAMERS[i], i, selectedId === i))}
            {/* Ячейка «ещё» */}
            <div
              className="flex flex-col items-center justify-center relative overflow-hidden"
              style={{
                border: "1px dashed rgba(255,255,255,0.08)",
                background: "rgba(255,255,255,0.02)",
                minHeight: "200px",
              }}
            >
              <div className="absolute inset-0 bg-dots opacity-20 pointer-events-none" />
              <span className="gh-title relative z-10" style={{ fontSize: "1.5rem", color: "rgba(255,255,255,0.2)" }}>
                ещё
              </span>
              <span
                className="relative z-10 mt-1"
                style={{
                  fontFamily: "'Barlow Condensed',sans-serif",
                  fontSize: "0.45rem",
                  letterSpacing: "0.3em",
                  color: "rgba(255,255,255,0.12)",
                  textTransform: "uppercase",
                }}
              >
                скоро
              </span>
            </div>
            {/* Две заглушки */}
            {[1, 2].map((n) => (
              <div
                key={n}
                className="flex flex-col items-center justify-center relative overflow-hidden"
                style={{
                  border: "1px dashed rgba(255,255,255,0.06)",
                  background: "rgba(255,255,255,0.015)",
                  minHeight: "200px",
                }}
              >
                <span
                  className="gh-title"
                  style={{ fontSize: "0.9rem", color: "rgba(255,255,255,0.08)" }}
                >
                  TBA
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
