import { useEffect, useRef } from "react";
import { Navbar }              from "./components/Navbar";
import { Ticket }              from "lucide-react";
import { HeroSection }         from "./components/HeroSection";
import { AboutSection }        from "./components/AboutSection";
import { ActivitiesSection }   from "./components/ActivitiesSection";
import { StreamersSection }    from "./components/StreamersSection";
import { GamesSection }        from "./components/GamesSection";
import { ProgramSection }      from "./components/ProgramSection";
import { ViralChallengesSection } from "./components/ViralChallengesSection";
import { PrizesSection }       from "./components/PrizesSection";
import { BrandsSection }       from "./components/BrandsSection";
import { ClubNetworksSection } from "./components/ClubNetworksSection";
import { ClubOwnersSection }   from "./components/ClubOwnersSection";
import { TicketsSection }      from "./components/TicketsSection";
import { Footer }              from "./components/Footer";

/* ─── Ticker items ─────────────────────────────────────────── */
const TICKER_ITEMS = [
  "GAMEHUB 2026", "11–12 апреля", "Арена Балуан Шолак",
  "CS2", "PUBG", "Dota 2", "7 000+ посетителей",
  "9+ стримеров", "40+ брендов", "Алматы · Казахстан",
  "Бесплатные билеты", "VIP-доступ",
];

function TickerBar({ accent = "#00E5FF" }: { accent?: string }) {
  const items = [...TICKER_ITEMS, ...TICKER_ITEMS];
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
          {items.map((item, i) => (
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
}: {
  children: React.ReactNode;
  id?: string;
  style?: React.CSSProperties;
}) {
  return (
    <section
      id={id}
      style={{
        /* Каждая секция = ровно 100vh. Scroll-snap останавливается точно здесь */
        height:          "100vh",
        scrollSnapAlign: "start",
        scrollSnapStop:  "always",   /* ← ключевой флаг: не перепрыгивает блоки */
        overflow:        "hidden",
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

  /* Scroll-spy: каждый блок ровно 100vh, делим scrollTop на высоту блока */
  const SECTION_ORDER = [
    "hero", "about", "activities", "streamers", "games",
    "program", "challenges", "prizes", "brands",
    "clubs", "owners", "tickets",
  ];

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

      {/* ── Fixed CTA ── */}
      <a
        href="#tickets"
        onClick={(e) => {
          e.preventDefault();
          scrollRef.current
            ?.querySelector<HTMLElement>("#tickets")
            ?.scrollIntoView({ behavior: "smooth" });
        }}
        className="fixed bottom-[100px] right-6 xl:right-10 z-40 flex items-center justify-center gap-2 btn-primary"
        style={{
          padding:  "10px 22px",
          fontSize: "0.7rem",
          clipPath: "polygon(10px 0, 100% 0, calc(100% - 10px) 100%, 0 100%)",
        }}
      >
        <Ticket size={12} />
        <span>Получить билет</span>
      </a>

      {/* ══════════════════════════════════════════════════════
          ГЛАВНЫЙ СКРОЛЛ-КОНТЕЙНЕР
          • overflow-y: scroll  — скролл только здесь
          • scroll-snap-type: y mandatory  — жёсткий снэп по Y
          • padding-top: 72px  — место под navbar
          ══════════════════════════════════════════════════════ */}
      <div
        ref={scrollRef}
        style={{
          position:       "absolute",
          inset:          0,
          overflowY:      "scroll",
          overflowX:      "hidden",
          scrollSnapType: "y mandatory",
          paddingBottom:  "64px",      /* место под фиксированный футер */
          /* Убираем стандартный скроллбар — снэп уже управляет навигацией */
          scrollbarWidth: "none",          /* Firefox */
        }}
      >
        {/* Скрываем скроллбар в WebKit */}
        <style>{`
          div[data-snap-root]::-webkit-scrollbar { display: none; }
        `}</style>

        {/* 0. HERO (ticker + hero = 100vh) */}
        <SnapSection id="hero">
          {/* Navbar-offset: ticker + hero занимают 100vh, navbar поверх */}
          <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
            <TickerBar accent="#00E5FF" />
            <div style={{ flex: 1, overflow: "hidden" }}>
              <HeroSection />
            </div>
          </div>
        </SnapSection>

        {/* 1. ABOUT */}
        <SnapSection id="about">
          <div style={{ flex: 1, overflow: "hidden" }}>
            <AboutSection />
          </div>
        </SnapSection>

        {/* 2. ACTIVITIES */}
        <SnapSection id="activities">
          <div style={{flex: 1, overflow: "hidden" }}>
            <ActivitiesSection />
          </div>
        </SnapSection>

        {/* 3. STREAMERS */}
        <SnapSection id="streamers">
          <div style={{flex: 1, overflow: "hidden" }}>
            <StreamersSection />
          </div>
        </SnapSection>

        {/* 4. GAMES */}
        <SnapSection id="games">
          <div style={{ flex: 1, overflow: "hidden" }}>
            <GamesSection />
          </div>
        </SnapSection>

        {/* 5. PROGRAM */}
        <SnapSection id="program">
          <div style={{ flex: 1, overflow: "hidden" }}>
            <ProgramSection />
          </div>
        </SnapSection>

        {/* 6. VIRAL CHALLENGES */}
        <SnapSection id="challenges">
          <div style={{ flex: 1, overflow: "hidden" }}>
            <ViralChallengesSection />
          </div>
        </SnapSection>

        {/* 7. PRIZES */}
        <SnapSection id="prizes">
          <div style={{  flex: 1, overflow: "hidden" }}>
            <PrizesSection />
          </div>
        </SnapSection>

        {/* 8. BRANDS */}
        <SnapSection id="brands">
          <div style={{  flex: 1, overflow: "hidden" }}>
            <BrandsSection />
          </div>
        </SnapSection>

        {/* 9. CLUB NETWORKS */}
        <SnapSection id="clubs">
          <div style={{  flex: 1, overflow: "hidden" }}>
            <ClubNetworksSection />
          </div>
        </SnapSection>

        {/* 10. CLUB OWNERS */}
        <SnapSection id="owners">
          <div style={{  flex: 1, overflow: "hidden" }}>
            <ClubOwnersSection />
          </div>
        </SnapSection>

        {/* 11. TICKETS (с ticker-bar сверху) */}
        <SnapSection id="tickets">
          <div style={{  flex: 1, display: "flex", flexDirection: "column", overflow: "hidden" }}>
            <TickerBar accent="#F0B429" />
            <div style={{ flex: 1, overflow: "hidden" }}>
              <TicketsSection />
            </div>
          </div>
        </SnapSection>
      </div>

      {/* Фиксированный футер по низу экрана */}
      <div
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