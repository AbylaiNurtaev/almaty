import { Navbar }              from "./components/Navbar";
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
  /* Дублируем элементы дважды — при сдвиге на -50% вторая копия занимает место первой, цикл бесконечный */
  const items = [...TICKER_ITEMS, ...TICKER_ITEMS];
  return (
    <div
      style={{
        position: "relative",
        overflow: "hidden",
        borderTop:    "1px solid rgba(255,255,255,0.06)",
        borderBottom: "1px solid rgba(255,255,255,0.06)",
        background:   "rgba(255,255,255,0.015)",
        padding:      "13px 0",
        flexShrink:   0,
      }}
    >
      {/* Fade masks */}
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
                color:         `${accent}65`,
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

/* ─── Thin section divider ──────────────────────────────────── */
function SectionDivider() {
  return (
    <div style={{
      height:     "1px",
      background: "rgba(255,255,255,0.05)",
      flexShrink: 0,
    }} />
  );
}

/* ═══════════════════════════════════════════════════════════
   APP  –  single vertical page, all sections stacked
   ═══════════════════════════════════════════════════════════ */
export default function App() {
  return (
    <div
      className="film-grain"
      style={{
        background: "#050508",
        minHeight:  "100vh",
        display:    "flex",
        flexDirection: "column",
        width:      "100%",
        overflowX:  "hidden",
      }}
    >
      {/* ── Fixed navigation ─────────────────────────────────── */}
      <Navbar />

      {/* ── Main page content ────────────────────────────────── */}
      <main style={{ flex: 1, display: "flex", flexDirection: "column" }}>

        {/* 1. HERO */}
        <HeroSection />

        {/* Ticker between Hero and About */}
        <TickerBar accent="#00E5FF" />

        {/* 2. ABOUT THE FESTIVAL */}
        <AboutSection />
        <SectionDivider />

        {/* 3. MAIN ACTIVITIES */}
        <ActivitiesSection />
        <SectionDivider />

        {/* 4. STREAMERS */}
        <StreamersSection />
        <SectionDivider />

        {/* 5. GAMES */}
        <GamesSection />
        <SectionDivider />

        {/* 6. PROGRAM */}
        <ProgramSection />
        <SectionDivider />

        {/* 6.5. VIRAL CHALLENGES */}
        <ViralChallengesSection />
        <SectionDivider />

        {/* 7. PRIZES */}
        <PrizesSection />
        <SectionDivider />

        {/* 8. BRAND EXHIBITION */}
        <BrandsSection />
        <SectionDivider />

        {/* 9. COMPUTER CLUB FRANCHISES */}
        <ClubNetworksSection />
        <SectionDivider />

        {/* 10. CLUB OWNER REGISTRATION */}
        <ClubOwnersSection />

        {/* Ticker before Tickets */}
        <TickerBar accent="#F0B429" />

        {/* 11. TICKETS & SPONSORSHIP */}
        <TicketsSection />

      </main>

      {/* 12. FOOTER */}
      <Footer />
    </div>
  );
}
