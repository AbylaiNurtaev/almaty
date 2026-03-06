const IMG = "https://images.unsplash.com/photo-1558324190-c940eb141401?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb21wdXRlciUyMGdhbWluZyUyMGNsdWIlMjByb29tJTIwZGFyayUyMG5lb24lMjByb3dzJTIwc2V0dXB8ZW58MXx8fHwxNzcyODAzOTE5fDA&ixlib=rb-4.1.0&q=80&w=1080";

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
  return (
    <section id="networks" className="relative overflow-hidden"
      style={{ background: "#09091A", padding: "var(--sec-py) var(--sec-px)" }}>

      <div className="absolute inset-0 bg-dots opacity-14 pointer-events-none" />
      <div className="absolute left-0 inset-y-0 w-1/3 pointer-events-none"
        style={{ background: "radial-gradient(ellipse at left, rgba(0,229,255,0.05) 0%, transparent 65%)" }} />
      <div className="wm" style={{ fontSize: "clamp(10rem,20vw,18rem)", right: "-2rem", top: "-1rem" }}>08</div>

      <div style={{ maxWidth: "1380px", margin: "0 auto", position: "relative", zIndex: 10 }}>
        <div className="grid lg:grid-cols-2 gap-20 xl:gap-32 items-center">

          {/* Image */}
          <div className="relative order-2 lg:order-1">
            <div className="absolute pointer-events-none z-20" style={{ top: "-18px", right: "-18px", width: "42px", height: "42px" }}>
              <div className="absolute top-0 right-0 w-full h-px" style={{ background: "var(--c-cyan,#00E5FF)" }} />
              <div className="absolute top-0 right-0 h-full w-px" style={{ background: "var(--c-cyan,#00E5FF)" }} />
            </div>
            <div className="absolute pointer-events-none z-20" style={{ bottom: "-18px", left: "-18px", width: "42px", height: "42px" }}>
              <div className="absolute bottom-0 left-0 w-full h-px" style={{ background: "var(--c-cyan,#00E5FF)" }} />
              <div className="absolute bottom-0 left-0 h-full w-px" style={{ background: "var(--c-cyan,#00E5FF)" }} />
            </div>

            <div className="clip-tl relative overflow-hidden" style={{ height: "clamp(360px,50vh,540px)" }}>
              <img src={IMG} alt="Компьютерный игровой клуб" className="w-full h-full object-cover"
                style={{ filter: "brightness(0.48) saturate(0.75)" }} />
              <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(9,9,26,0.9) 0%, transparent 60%)" }} />
              <div className="absolute inset-0" style={{ background: "linear-gradient(to left, rgba(9,9,26,0.45) 0%, transparent 60%)" }} />
            </div>

            {/* Stat badge */}
            <div className="absolute bottom-6 right-6 z-10 p-5"
              style={{ background: "rgba(5,5,8,0.95)", border: "1px solid rgba(0,229,255,0.2)", backdropFilter: "blur(20px)" }}>
              <div className="gh-title text-white" style={{ fontSize: "3rem", letterSpacing: "-0.03em" }}>145+</div>
              <div style={{ fontFamily: "'Barlow Condensed',sans-serif", fontSize: "0.58rem", letterSpacing: "0.24em", color: "rgba(255,255,255,0.3)", textTransform: "uppercase", marginTop: "5px" }}>Локаций клубов</div>
            </div>
          </div>

          {/* Content */}
          <div className="order-1 lg:order-2">
            <div className="eyebrow">Лидеры индустрии</div>
            <h2 className="gh-title text-white mb-6" style={{ fontSize: "var(--h2-sec)" }}>
              Сети компьютерных<br />
              <span style={{ color: "var(--c-cyan,#00E5FF)" }}>клубов</span>
            </h2>
            <p style={{ fontFamily: "'Barlow',sans-serif", fontSize: "1rem", color: "rgba(255,255,255,0.36)", lineHeight: 1.78, marginBottom: "36px" }}>
              Лучшие франшизные сети компьютерных клубов Казахстана в одном месте. Общайтесь, партнёрствуйте и развивайте бизнес на GAMEHUB.
            </p>

            {/* Clubs list */}
            <div style={{ gap: "1px", display: "flex", flexDirection: "column", background: "rgba(255,255,255,0.06)" }}>
              {CLUBS.map((c, i) => (
                <div key={c.name}
                  className="group flex items-center gap-5 transition-all duration-200 cursor-default"
                  style={{ background: "#09091A", padding: "16px 22px" }}>
                  <span style={{ fontFamily: "'Barlow Condensed',sans-serif", fontWeight: 700, fontSize: "0.68rem", color: "rgba(0,229,255,0.22)", letterSpacing: "0.1em", minWidth: "24px" }}>
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div className="w-px h-5 shrink-0" style={{ background: "rgba(255,255,255,0.08)" }} />
                  <span className="gh-mono text-white flex-1 group-hover:text-white/70 transition-colors duration-200" style={{ fontSize: "1.08rem" }}>
                    {c.name}
                  </span>
                  <span style={{ fontFamily: "'Barlow Condensed',sans-serif", fontSize: "0.6rem", letterSpacing: "0.16em", color: "rgba(255,255,255,0.15)", textTransform: "uppercase" }}>{c.region}</span>
                  <div className="shrink-0 px-3 py-1.5"
                    style={{ border: "1px solid rgba(0,229,255,0.16)", background: "rgba(0,229,255,0.05)" }}>
                    <span style={{ fontFamily: "'Barlow Condensed',sans-serif", fontWeight: 800, fontSize: "0.85rem", color: "var(--c-cyan,#00E5FF)", letterSpacing: "0.04em" }}>{c.locs}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}