import { useEffect, useRef, useState } from "react";
import { Navbar }              from "./components/Navbar";
import { HeroSection }         from "./components/HeroSection";
import { AboutSection }        from "./components/AboutSection";
import { ActivitiesSection }   from "./components/ActivitiesSection";
import { StreamersSection }    from "./components/StreamersSection";
import { GamesSection }        from "./components/GamesSection";
import { ProgramSection }      from "./components/ProgramSection";
import { PrizesSection }       from "./components/PrizesSection";
import { BrandsSection }       from "./components/BrandsSection";
import { ClubNetworksSection } from "./components/ClubNetworksSection";
import { MapSection }          from "./components/MapSection";
import { TicketsSection }           from "./components/TicketsSection";
import { Footer }              from "./components/Footer";
import { useLanguage } from "./context/LanguageContext";

/* ─── Ticker items ─────────────────────────────────────────── */
function TickerBar({ accent = "#00E5FF", items }: { accent?: string; items: string[] }) {
  const renderedItems = [...items, ...items];
  return (
    <div
      style={{
        position:     "relative",
        overflow:     "hidden",
        borderTop:    "1px solid rgba(255,255,255,0.06)",
        borderBottom: "1px solid rgba(255,255,255,0.06)",
        background:   "rgba(255,255,255,0.015)",
        padding:      "13px 0",
        flexShrink:   0,
      }}
    >
      <div style={{
        position: "absolute", left: 0, top: 0, bottom: 0, width: "80px",
        background: "linear-gradient(to right, #050508, transparent)", zIndex: 2, pointerEvents: "none",
      }} />
      <div style={{
        position: "absolute", right: 0, top: 0, bottom: 0, width: "80px",
        background: "linear-gradient(to left, #050508, transparent)", zIndex: 2, pointerEvents: "none",
      }} />
      <div className="ticker-wrap">
        <div className="ticker-track">
          {renderedItems.map((item, i) => (
            <div key={i} style={{ display: "flex", alignItems: "center", flexShrink: 0 }}>
              <span style={{
                fontFamily:    "'Barlow Condensed', sans-serif",
                fontWeight:    700,
                fontSize:      "clamp(0.8rem, 1.2vw, 1rem)",
                letterSpacing: "0.3em",
                textTransform: "uppercase",
                color:         "#ffffff",
                whiteSpace:    "nowrap",
                padding:       "0 28px",
              }}>
                {item}
              </span>
              <span style={{
                display:    "inline-block",
                width:      "3px",
                height:     "3px",
                background: `${accent}30`,
                transform:  "rotate(45deg)",
                flexShrink: 0,
              }} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ─── Snap Section wrapper ──────────────────────────────────── */
function SnapSection({
  children,
  id,
  style,
  snapEnabled = true,
}: {
  children: React.ReactNode;
  id?: string;
  style?: React.CSSProperties;
  snapEnabled?: boolean;
}) {
  return (
    <section
      id={id}
      style={{
        /* На десктопе секция ≈ экран, на мобильных может быть выше */
        minHeight:       "100dvh",
        scrollSnapAlign: snapEnabled ? "start" : "none",
        scrollSnapStop:  snapEnabled ? "always" : "normal",
        overflow:        "visible",
        position:        "relative",
        display:         "flex",
        flexDirection:   "column",
        ...style,
      }}
    >
      {children}
    </section>
  );
}

/* ════════════════════════════════════════════════════════════
   APP
   ════════════════════════════════════════════════════════════ */
export default function App() {
  const { t } = useLanguage();
  /* ref на главный scroll-контейнер */
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(false);

  /* Scroll-spy: каждый блок ровно 100vh, делим scrollTop на высоту блока */
  const SECTION_ORDER = [
    "hero", "about", "activities", "streamers", "games",
    "program", "prizes", "brands",
    "clubs", "map", "tickets",
  ];

  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 767px)");
    const updateIsMobile = () => setIsMobile(mediaQuery.matches);

    updateIsMobile();
    mediaQuery.addEventListener("change", updateIsMobile);
    return () => mediaQuery.removeEventListener("change", updateIsMobile);
  }, []);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    const onScroll = () => {
      const index = Math.round(el.scrollTop / el.clientHeight);
      const active = SECTION_ORDER[index] ?? "";
      window.dispatchEvent(new CustomEvent("snap-section-change", { detail: active }));
    };

    onScroll();
    el.addEventListener("scroll", onScroll, { passive: true });
    return () => el.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div
      className="film-grain"
      style={{
        background: "#050508",
        height:     "100vh",          /* контейнер = окно браузера */
        width:      "100%",
        overflow:   "hidden",
        position:   "relative",
      }}
    >
      {/* ── Fixed Navbar ── */}
      <Navbar />

      {/* ══════════════════════════════════════════════════════
          ГЛАВНЫЙ СКРОЛЛ-КОНТЕЙНЕР
          • overflow-y: scroll  — скролл только здесь
          • scroll-snap-type: y mandatory  — жёсткий снэп по Y
          • padding-top: 72px  — место под navbar
          ══════════════════════════════════════════════════════ */}
      <div
        ref={scrollRef}
        data-snap-root
        style={{
          position:       "absolute",
          inset:          0,
          overflowY:      "scroll",
          overflowX:      "hidden",
          scrollSnapType: isMobile ? "none" : "y mandatory",
          paddingBottom:  isMobile ? "0px" : "64px",
          scrollbarWidth: "none",
          touchAction:    "pan-y",
          WebkitOverflowScrolling: "touch",
        }}
      >
        {/* Скрываем скроллбар в WebKit */}
        <style>{`
          div[data-snap-root]::-webkit-scrollbar { display: none; }
          @media (max-width: 767px) {
            div[data-snap-root] { padding-bottom: max(8px, env(safe-area-inset-bottom)); }
          }
        `}</style>

        {/* 0. HERO */}
        <SnapSection id="hero" snapEnabled={!isMobile}>
          <div style={{ flex: 1, overflow: "hidden" }}>
            <HeroSection />
          </div>
        </SnapSection>

        {/* 1. ABOUT */}
        <SnapSection id="about" snapEnabled={!isMobile}>
          <div style={{ flex: 1, overflow: "hidden" }}>
            <AboutSection />
          </div>
        </SnapSection>

        {/* 2. ACTIVITIES */}
        <SnapSection id="activities" snapEnabled={!isMobile}>
          <div style={{flex: 1, overflow: "hidden" }}>
            <ActivitiesSection />
          </div>
        </SnapSection>

        {/* 3. STREAMERS */}
        <SnapSection id="streamers" snapEnabled={!isMobile}>
          <div style={{flex: 1, overflow: "hidden" }}>
            <StreamersSection />
          </div>
        </SnapSection>

        {/* 4. GAMES */}
        <SnapSection id="games" snapEnabled={!isMobile}>
          <div style={{ flex: 1, overflow: "hidden" }}>
            <GamesSection />
          </div>
        </SnapSection>

        {/* 5. PROGRAM */}
        <SnapSection id="program" snapEnabled={!isMobile}>
          <div style={{ flex: 1, overflow: "hidden" }}>
            <ProgramSection />
          </div>
        </SnapSection>

        {/* 6. PRIZES */}
        <SnapSection id="prizes" snapEnabled={!isMobile}>
          <div style={{  flex: 1, overflow: "hidden" }}>
            <PrizesSection />
          </div>
        </SnapSection>

        {/* 8. BRANDS */}
        <SnapSection id="brands" snapEnabled={!isMobile}>
          <div style={{  flex: 1, overflow: "hidden" }}>
            <BrandsSection />
          </div>
        </SnapSection>

        {/* 9. CLUB NETWORKS */}
        <SnapSection id="clubs" snapEnabled={!isMobile}>
          <div style={{  flex: 1, overflow: "hidden" }}>
            <ClubNetworksSection />
          </div>
        </SnapSection>

        {/* 9. MAP */}
        <SnapSection
          id="map"
          snapEnabled={!isMobile}
          style={isMobile ? { minHeight: "auto" } : undefined}
        >
          <div
            style={
              isMobile
                ? { overflow: "visible" }
                : { flex: 1, overflow: "hidden" }
            }
          >
            <MapSection />
          </div>
        </SnapSection>

        {/* 10. TICKETS */}
        <SnapSection id="tickets" snapEnabled={!isMobile}>
          <div style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden" }}>
            <TickerBar accent="#F0B429" items={t.app.tickerItems} />
            <div
              className="tickets-body-wrap"
              style={{ flex: 1, overflow: "hidden", minHeight: 0 }}
            >
              <TicketsSection />
            </div>
          </div>
        </SnapSection>
      </div>

      {/* Футер только на ПК; на мобилке нет — не торчит под билетами */}
      <div className="hidden md:block"
        style={{
          position: "fixed",
          left: 0,
          right: 0,
          bottom: 0,
          zIndex: 30,
        }}
      >
        <Footer />
      </div>
    </div>
  );
}