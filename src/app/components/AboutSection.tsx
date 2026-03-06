const IMG = "https://images.unsplash.com/photo-1515295527612-cb8132ecb496?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlc3BvcnRzJTIwdG91cm5hbWVudCUyMHByb2Zlc3Npb25hbCUyMHBsYXllciUyMGhlYWRzZXQlMjBmb2N1c2VkJTIwY29tcGV0aXRpb258ZW58MXx8fHwxNzcyODA1NDU2fDA&ixlib=rb-4.1.0&q=80&w=1080";

const FACTS = [
  { val: "7K+", label: "Посетителей" },
  { val: "40+", label: "Брендов" },
  { val: "9+",  label: "Стримеров" },
  { val: "2",   label: "Дня" },
];

export function AboutSection() {
  return (
    <section
      id="about"
      className="relative overflow-hidden"
      style={{ background: "#09091A", padding: "var(--sec-py) var(--sec-px)" }}
    >
      {/* Textures */}
      <div className="absolute inset-0 bg-dots opacity-18 pointer-events-none" />
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 70% 60% at 90% 50%, rgba(0,229,255,0.05) 0%, transparent 70%)",
        }}
      />

      {/* Watermark */}
      <div
        className="wm"
        style={{ fontSize: "clamp(10rem,20vw,18rem)", right: "-2rem", top: "-1rem" }}
      >
        01
      </div>

      <div style={{ maxWidth: "1380px", margin: "0 auto", position: "relative", zIndex: 10 }}>
        <div className="grid lg:grid-cols-2 gap-20 xl:gap-32 items-center">

          {/* ── Image column ── */}
          <div className="relative order-2 lg:order-1">
            {/* TL bracket */}
            <div
              className="absolute pointer-events-none z-20"
              style={{ top: "-18px", left: "-18px", width: "42px", height: "42px" }}
            >
              <div className="absolute top-0 left-0 w-full h-px" style={{ background: "var(--c-cyan,#00E5FF)" }} />
              <div className="absolute top-0 left-0 h-full w-px" style={{ background: "var(--c-cyan,#00E5FF)" }} />
            </div>
            {/* BR bracket */}
            <div
              className="absolute pointer-events-none z-20"
              style={{ bottom: "-18px", right: "-18px", width: "42px", height: "42px" }}
            >
              <div className="absolute bottom-0 right-0 w-full h-px" style={{ background: "var(--c-cyan,#00E5FF)" }} />
              <div className="absolute bottom-0 right-0 h-full w-px" style={{ background: "var(--c-cyan,#00E5FF)" }} />
            </div>

            {/* Main image */}
            <div
              className="clip-br relative overflow-hidden"
              style={{ height: "clamp(360px, 50vh, 560px)" }}
            >
              <img
                src={IMG}
                alt="GAMEHUB esports"
                className="w-full h-full object-cover object-top"
                style={{ filter: "brightness(0.55) saturate(0.8)" }}
              />
              <div
                className="absolute inset-0"
                style={{ background: "linear-gradient(to top, rgba(9,9,26,0.92) 0%, rgba(9,9,26,0.2) 55%, transparent 100%)" }}
              />
              <div
                className="absolute inset-0"
                style={{ background: "linear-gradient(to right, rgba(9,9,26,0.5) 0%, transparent 55%)" }}
              />
              {/* Cyan top bar */}
              <div
                className="absolute top-0 left-0 right-0 h-px"
                style={{ background: "linear-gradient(90deg, var(--c-cyan,#00E5FF) 0%, rgba(0,229,255,0.08) 80%, transparent 100%)" }}
              />

              {/* Floating stat badge */}
              <div
                className="absolute bottom-6 left-6 z-10"
                style={{
                  background: "rgba(5,5,8,0.94)",
                  border: "1px solid rgba(0,229,255,0.2)",
                  backdropFilter: "blur(20px)",
                  padding: "18px 24px",
                }}
              >
                <div className="flex items-center gap-2 mb-2">
                  <span
                    className="dot-live rounded-full shrink-0"
                    style={{ width: "7px", height: "7px", background: "var(--c-cyan,#00E5FF)", display: "inline-block" }}
                  />
                  <span
                    style={{
                      fontFamily: "'Barlow Condensed',sans-serif",
                      fontSize: "0.54rem",
                      letterSpacing: "0.3em",
                      color: "var(--c-cyan,#00E5FF)",
                      textTransform: "uppercase",
                    }}
                  >
                    Ожидаемая посещаемость
                  </span>
                </div>
                <div
                  style={{
                    fontFamily: "'Barlow Condensed',sans-serif",
                    fontWeight: 900,
                    fontSize: "2.6rem",
                    lineHeight: 1,
                    color: "white",
                    letterSpacing: "-0.03em",
                  }}
                >
                  7,000+
                </div>
                <div
                  style={{
                    fontFamily: "'Barlow',sans-serif",
                    fontSize: "0.72rem",
                    color: "rgba(255,255,255,0.32)",
                    marginTop: "4px",
                  }}
                >
                  Посетителей за 2 дня
                </div>
              </div>
            </div>

            {/* Stat strip */}
            <div
              className="grid grid-cols-4 mt-px"
              style={{ gap: "1px", background: "rgba(255,255,255,0.06)" }}
            >
              {FACTS.map((f) => (
                <div
                  key={f.label}
                  className="py-5 text-center"
                  style={{ background: "#09091A" }}
                >
                  <div
                    style={{
                      fontFamily: "'Barlow Condensed',sans-serif",
                      fontWeight: 900,
                      fontSize: "1.7rem",
                      lineHeight: 1,
                      color: "var(--c-cyan,#00E5FF)",
                      letterSpacing: "-0.02em",
                    }}
                  >
                    {f.val}
                  </div>
                  <div
                    style={{
                      fontFamily: "'Barlow Condensed',sans-serif",
                      fontSize: "0.52rem",
                      letterSpacing: "0.24em",
                      color: "rgba(255,255,255,0.2)",
                      textTransform: "uppercase",
                      marginTop: "6px",
                    }}
                  >
                    {f.label}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* ── Text column ── */}
          <div className="order-1 lg:order-2">
            <div className="eyebrow">О фестивале</div>

            <h2
              className="gh-title text-white"
              style={{ fontSize: "var(--h2-sec)", marginBottom: "32px" }}
            >
              Что такое<br />
              <span style={{ color: "var(--c-cyan,#00E5FF)" }}>
                GAMEHUB?
              </span>
            </h2>

            <div
              style={{
                fontFamily: "'Barlow',sans-serif",
                color: "rgba(255,255,255,0.48)",
                lineHeight: 1.82,
                fontSize: "1rem",
                marginBottom: "40px",
              }}
            >
              <p style={{ marginBottom: "18px" }}>
                GAMEHUB — это{" "}
                <span style={{ color: "rgba(255,255,255,0.88)" }}>крупнейший фестиваль игровой и компьютерной клубной индустрии</span>{" "}
                в Казахстане — встреча всей игровой экосистемы под одной крышей.
              </p>
              <p style={{ marginBottom: "18px" }}>
                Мероприятие объединяет{" "}
                <span style={{ color: "rgba(255,255,255,0.88)" }}>
                  геймеров, стримеров, владельцев компьютерных клубов и мировые игровые бренды
                </span>{" "}
                на два незабываемых дня в Арене Балуан Шолак.
              </p>
              <p>
                Живые турниры, шоу-матчи, выставки брендов, вирусные челленджи на сцене и автограф-сессии —
                всё в одном месте.
              </p>
            </div>

            {/* Info chips */}
            <div className="flex flex-wrap gap-3 mb-10">
              {[
                { l: "11–12 апреля", s: "Даты фестиваля" },
                { l: "Алматы, КЗ",  s: "Место" },
                { l: "Балуан Шолак", s: "Арена" },
              ].map((x) => (
                <div
                  key={x.l}
                  className="px-5 py-3.5"
                  style={{ border: "1px solid rgba(255,255,255,0.07)", background: "rgba(255,255,255,0.025)" }}
                >
                  <div
                    style={{
                      fontFamily: "'Barlow Condensed',sans-serif",
                      fontWeight: 900,
                      fontSize: "1rem",
                      color: "white",
                      textTransform: "uppercase",
                      letterSpacing: "0.04em",
                    }}
                  >
                    {x.l}
                  </div>
                  <div
                    style={{
                      fontFamily: "'Barlow',sans-serif",
                      fontSize: "0.6rem",
                      color: "rgba(255,255,255,0.24)",
                      letterSpacing: "0.18em",
                      marginTop: "3px",
                      textTransform: "uppercase",
                    }}
                  >
                    {x.s}
                  </div>
                </div>
              ))}
            </div>

            <a href="#tickets" className="btn-primary">
              <span>Получить бесплатный билет</span>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}