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

export function StreamersSection() {
  const [hov, setHov] = useState<string | null>(null);
  const feat = STREAMERS[0];
  const rest = STREAMERS.slice(1);

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
      <div className="wm" style={{ fontSize: "clamp(10rem,20vw,18rem)", right: "-2rem", top: "-1rem" }}>03</div>

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
          <div style={{ paddingBottom: "8px" }}>
            <p
              style={{
                fontFamily: "'Barlow',sans-serif",
                fontSize: "1rem",
                color: "rgba(255,255,255,0.34)",
                lineHeight: 1.78,
                maxWidth: "360px",
                marginBottom: "16px",
              }}
            >
              Смотрите шоу-матчи, получайте автографы и встречайтесь с любимыми контент-мейкерами лично на арене.
            </p>
            <div
              className="flex items-center gap-3 px-4 py-2.5 w-fit"
              style={{ background: "rgba(0,229,255,0.05)", border: "1px solid rgba(0,229,255,0.2)" }}
            >
              <span
                className="dot-live rounded-full shrink-0"
                style={{ width: "7px", height: "7px", background: "var(--c-cyan,#00E5FF)", display: "inline-block" }}
              />
              <span
                style={{
                  fontFamily: "'Barlow Condensed',sans-serif",
                  fontSize: "0.6rem",
                  letterSpacing: "0.26em",
                  color: "var(--c-cyan,#00E5FF)",
                  textTransform: "uppercase",
                }}
              >
                9 подтверждено + ещё будут объявлены
              </span>
            </div>
          </div>
        </div>

        {/* Grid */}
        <div className="grid md:grid-cols-12 gap-3 mb-3">

          {/* Featured large card */}
          <div
            className="md:col-span-4 streamer-card"
            style={{
              minHeight: "520px",
              clipPath: "polygon(0 0,100% 0,100% 94%,95% 100%,0 100%)",
              border: `1px solid ${feat.color}22`,
            }}
          >
            <img
              src={PORTRAITS[feat.img]}
              alt={feat.name}
              className="absolute inset-0 w-full h-full object-cover object-top"
              style={{ filter: "brightness(0.38) saturate(0.75)" }}
            />
            <div
              className="absolute inset-0"
              style={{
                background: `linear-gradient(to top, rgba(5,5,8,0.99) 0%, rgba(5,5,8,0.42) 45%, ${feat.color}0A 100%)`,
              }}
            />
            {/* Left color bar */}
            <div
              className="absolute top-0 left-0 bottom-0 w-[3px]"
              style={{ background: `linear-gradient(to bottom, ${feat.color}, ${feat.color}33)` }}
            />
            {/* Top line */}
            <div
              className="absolute top-0 left-0 right-0 h-px"
              style={{ background: `linear-gradient(90deg, ${feat.color}, transparent 60%)` }}
            />

            {/* Featured badge */}
            <div
              className="absolute top-5 right-5 flex items-center gap-2 px-3.5 py-2"
              style={{
                background: "rgba(5,5,8,0.9)",
                border: `1px solid ${feat.color}40`,
                backdropFilter: "blur(16px)",
              }}
            >
              <span
                className="dot-live rounded-full shrink-0"
                style={{ width: "6px", height: "6px", background: feat.color, display: "inline-block" }}
              />
              <span
                style={{
                  fontFamily: "'Barlow Condensed',sans-serif",
                  fontSize: "0.52rem",
                  letterSpacing: "0.28em",
                  color: feat.color,
                  textTransform: "uppercase",
                }}
              >
                Избранный
              </span>
            </div>

            {/* Content */}
            <div className="absolute bottom-0 left-0 right-0 p-8 z-10">
              <span
                className="tag-angled mb-5 inline-block"
                style={{ background: feat.color, color: "#040410", fontSize: "0.5rem", letterSpacing: "0.3em" }}
              >
                {feat.role}
              </span>
              <div
                className="gh-title text-white mb-4"
                style={{ fontSize: "clamp(2rem, 4vw, 3.2rem)" }}
              >
                {feat.name}
              </div>
              <div className="flex items-center gap-5">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full" style={{ background: PLAT_COLOR[feat.platform] }} />
                  <span
                    style={{ fontFamily: "'Barlow',sans-serif", fontSize: "0.78rem", color: "rgba(255,255,255,0.34)" }}
                  >
                    {feat.platform}
                  </span>
                </div>
                <span
                  style={{
                    fontFamily: "'Barlow Condensed',sans-serif",
                    fontSize: "0.75rem",
                    color: "rgba(255,255,255,0.2)",
                    letterSpacing: "0.06em",
                  }}
                >
                  {feat.followers} подписчиков
                </span>
              </div>
            </div>
          </div>

          {/* Rest of streamers */}
          <div className="md:col-span-8 grid grid-cols-2 sm:grid-cols-4 gap-3">
            {rest.map((s, i) => {
              const isHov = hov === s.name;
              return (
                <div
                  key={s.name}
                  className="streamer-card"
                  style={{ border: "1px solid rgba(255,255,255,0.06)", minHeight: "220px" }}
                  onMouseEnter={() => setHov(s.name)}
                  onMouseLeave={() => setHov(null)}
                >
                  <img
                    src={PORTRAITS[s.img]}
                    alt={s.name}
                    className="absolute inset-0 w-full h-full object-cover"
                    style={{
                      filter: isHov
                        ? "brightness(0.35) saturate(0.65)"
                        : "brightness(0.16) saturate(0.2)",
                      transition: "filter 0.55s ease",
                    }}
                  />
                  <div
                    className="absolute inset-0"
                    style={{ background: "linear-gradient(to top, rgba(5,5,8,0.98) 0%, rgba(5,5,8,0.3) 60%, transparent 100%)" }}
                  />
                  {isHov && (
                    <div
                      className="absolute inset-0"
                      style={{ background: `linear-gradient(to top, ${s.color}20 0%, transparent 65%)` }}
                    />
                  )}
                  {/* Bottom neon line */}
                  <div
                    className="absolute bottom-0 left-0 right-0 h-px transition-opacity duration-350"
                    style={{
                      background: `linear-gradient(90deg, transparent, ${s.color}, transparent)`,
                      opacity: isHov ? 1 : 0,
                    }}
                  />
                  {/* Left bar */}
                  <div
                    className="absolute top-0 left-0 bottom-0 w-[2px] transition-opacity duration-350"
                    style={{ background: s.color, opacity: isHov ? 0.85 : 0 }}
                  />
                  {/* Index watermark */}
                  <div
                    className="absolute top-3 right-3 select-none"
                    style={{
                      fontFamily: "'Barlow Condensed',sans-serif",
                      fontWeight: 900,
                      fontSize: "2rem",
                      lineHeight: 1,
                      color: isHov ? `${s.color}22` : "rgba(255,255,255,0.04)",
                      transition: "color 0.3s",
                    }}
                  >
                    {String(i + 2).padStart(2, "0")}
                  </div>

                  {/* Name + meta */}
                  <div className="absolute bottom-0 left-0 right-0 p-4 z-10">
                    <div
                      style={{
                        fontFamily: "'Barlow Condensed',sans-serif",
                        fontSize: "0.5rem",
                        letterSpacing: "0.3em",
                        color: isHov ? s.color : "rgba(255,255,255,0.2)",
                        textTransform: "uppercase",
                        marginBottom: "6px",
                        transition: "color 0.3s",
                      }}
                    >
                      {s.role}
                    </div>
                    <div className="gh-mono text-white" style={{ fontSize: "1rem" }}>{s.name}</div>
                    <div className="flex items-center justify-between mt-2">
                      <div className="flex items-center gap-1.5">
                        <div className="w-1.5 h-1.5 rounded-full" style={{ background: PLAT_COLOR[s.platform] }} />
                        <span
                          style={{ fontFamily: "'Barlow',sans-serif", fontSize: "0.64rem", color: "rgba(255,255,255,0.2)" }}
                        >
                          {s.platform}
                        </span>
                      </div>
                      <span
                        style={{
                          fontFamily: "'Barlow Condensed',sans-serif",
                          fontSize: "0.6rem",
                          color: "rgba(255,255,255,0.18)",
                          letterSpacing: "0.06em",
                        }}
                      >
                        {s.followers}
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}

            {/* TBA slot */}
            <div
              className="flex flex-col items-center justify-center relative overflow-hidden"
              style={{
                border: "1px dashed rgba(255,255,255,0.07)",
                background: "rgba(255,255,255,0.012)",
                minHeight: "220px",
              }}
            >
              <div className="absolute inset-0 bg-dots opacity-25 pointer-events-none" />
              <div
                className="gh-title relative z-10"
                style={{ fontSize: "2rem", color: "rgba(255,255,255,0.07)" }}
              >
                +MORE
              </div>
              <span
                style={{
                  fontFamily: "'Barlow Condensed',sans-serif",
                  fontSize: "0.5rem",
                  letterSpacing: "0.35em",
                  color: "rgba(255,255,255,0.1)",
                  textTransform: "uppercase",
                }}
                className="relative z-10 mt-2"
              >
                TBA
              </span>
            </div>
          </div>
        </div>

        {/* CTA strip */}
        <div
          className="flex flex-col sm:flex-row items-center justify-between gap-6 px-8 py-6"
          style={{ border: "1px solid rgba(255,255,255,0.05)", background: "rgba(255,255,255,0.014)" }}
        >
          <p
            style={{ fontFamily: "'Barlow',sans-serif", fontSize: "0.92rem", color: "rgba(255,255,255,0.26)" }}
          >
            Встретьте всех 9+ стримеров лично на арене Балуан Шолак — 11–12 апреля 2026
          </p>
          <a
            href="#tickets"
            className="btn-primary shrink-0"
            style={{ padding: "12px 26px", fontSize: "0.76rem" }}
          >
            <span>Получить билет</span>
          </a>
        </div>
      </div>
    </section>
  );
}