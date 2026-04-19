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
import { TicketsSection }           from "./components/TicketsSection";
import { Footer }              from "./components/Footer";

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
  /* ref на главный scroll-контейнер */
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);

  /* Scroll-spy: каждый блок ровно 100vh, делим scrollTop на высоту блока */
  const SECTION_ORDER = [
    "hero", "about", "activities", "streamers", "games",
    "program", "prizes", "brands",
    "clubs", "tickets",
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

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    const onScrollVisibility = () => {
      setShowScrollTop(el.scrollTop > 280);
    };

    onScrollVisibility();
    el.addEventListener("scroll", onScrollVisibility, { passive: true });
    return () => el.removeEventListener("scroll", onScrollVisibility);
  }, []);

  const handleScrollToTop = () => {
    const el = scrollRef.current;
    if (!el) return;
    el.scrollTo({ top: 0, behavior: "smooth" });
  };

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

        {/* 9. COMPUTERS
        <SnapSection
          id="computers"
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
            <ComputersSection />
          </div>
        </SnapSection>
        */}

        {/* 10. MAP
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
        */}

        {/* 11. TICKETS */}
        <SnapSection
          id="tickets"
          snapEnabled={!isMobile}
          style={
            isMobile
              ? undefined
              : {
                  minHeight: "calc(100dvh - 128px)",
                  paddingTop: "64px",
                  boxSizing: "border-box",
                }
          }
        >
          <div style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden" }}>
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

      {showScrollTop && (
        <button
          type="button"
          aria-label="Scroll to top"
          onClick={handleScrollToTop}
          style={{
            position: "fixed",
            right: isMobile ? "14px" : "24px",
            bottom: isMobile ? "14px" : "88px",
            width: "48px",
            height: "48px",
            borderRadius: "9999px",
            border: "1px solid rgba(255,255,255,0.2)",
            background: "rgba(10,10,14,0.88)",
            color: "#FFFFFF",
            fontSize: "20px",
            lineHeight: 1,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
            zIndex: 60,
            boxShadow: "0 10px 30px rgba(0, 0, 0, 0.35)",
            backdropFilter: "blur(6px)",
            transition: "opacity 0.2s ease, transform 0.2s ease",
          }}
        >
          ↑
        </button>
      )}
    </div>
  );
}
