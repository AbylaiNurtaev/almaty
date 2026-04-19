import { useEffect, useRef, useState, type MouseEvent, type TouchEvent } from "react";
import { useLanguage } from "../context/LanguageContext";

const TYPING_SPEED_MS = 60;
const CURSOR_OFFSET = 16;

const ACCENT_LEFT = "#00E5FF";
const ACCENT_RIGHT = "#F03558";

function buildLabels(isEn: boolean) {
  const left: { id: number; title: string; color: string }[] = [];
  const right: { id: number; title: string; color: string }[] = [];
  for (let i = 1; i <= 25; i += 1) {
    left.push({
      id: i,
      title: isEn ? `PC ${String(i).padStart(2, "0")} · side A` : `ПК ${String(i).padStart(2, "0")} · сторона A`,
      color: ACCENT_LEFT,
    });
    right.push({
      id: i + 25,
      title: isEn ? `PC ${String(i + 25).padStart(2, "0")} · side B` : `ПК ${String(i + 25).padStart(2, "0")} · сторона B`,
      color: ACCENT_RIGHT,
    });
  }
  return { left, right };
}

export function ComputersSection() {
  const { language } = useLanguage();
  const isEn = language === "en";
  const { left, right } = buildLabels(isEn);

  const [cursor, setCursor] = useState({ x: 0, y: 0 });
  const [hovered, setHovered] = useState<{ title: string; color: string } | null>(null);
  const [typedLen, setTypedLen] = useState(0);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    if (!hovered) {
      setTypedLen(0);
      return;
    }
    const text = hovered.title;
    setTypedLen(1);
    let index = 1;
    const id = setInterval(() => {
      index += 1;
      if (index > text.length) {
        if (intervalRef.current) clearInterval(intervalRef.current);
        intervalRef.current = null;
        return;
      }
      setTypedLen(index);
    }, TYPING_SPEED_MS);
    intervalRef.current = id;
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
      intervalRef.current = null;
    };
  }, [hovered?.title]);

  const bindHover = (item: { title: string; color: string }) => ({
    onMouseEnter: () => setHovered(item),
    onMouseLeave: () => setHovered(null),
    onMouseMove: (e: MouseEvent) => setCursor({ x: e.clientX, y: e.clientY }),
    onTouchStart: (e: TouchEvent) => {
      const t = e.touches[0];
      if (t) {
        setCursor({ x: t.clientX, y: t.clientY });
        setHovered(item);
      }
    },
    onTouchEnd: () => setHovered(null),
  });

  return (
    <section
      id="computers"
      className="sec-fullscreen relative overflow-hidden max-md:!p-0 max-md:flex max-md:flex-col max-md:min-h-0 max-md:py-[max(8px,env(safe-area-inset-top))] max-md:pb-[max(8px,env(safe-area-inset-bottom))]"
      style={{ background: "#050508", padding: "var(--sec-py) var(--sec-px)" }}
    >
      {hovered && (
        <div
          className="fixed pointer-events-none z-[9999]"
          style={{
            left: cursor.x + CURSOR_OFFSET,
            top: cursor.y + CURSOR_OFFSET,
          }}
        >
          <div
            className="flex items-center gap-2 px-3 py-2 rounded-full whitespace-nowrap shadow-lg max-w-[min(92vw,420px)]"
            style={{
              background: "rgba(5,5,8,0.95)",
              border: `1px solid ${hovered.color}40`,
              boxShadow: `0 0 20px ${hovered.color}20`,
            }}
          >
            <div className="w-1.5 h-1.5 rounded-full shrink-0" style={{ background: hovered.color }} />
            <span
              className="min-w-0 truncate"
              style={{
                fontFamily: "'Barlow Condensed',sans-serif",
                fontSize: "0.75rem",
                letterSpacing: "0.08em",
                color: hovered.color,
                textTransform: "uppercase",
              }}
            >
              {hovered.title.slice(0, typedLen)}
              <span
                className="animate-typing-cursor inline-block w-[2px] ml-0.5 align-baseline shrink-0"
                style={{ background: hovered.color, height: "1em", verticalAlign: "text-bottom" }}
              />
            </span>
          </div>
        </div>
      )}

      <div className="absolute inset-0 bg-grid opacity-50 pointer-events-none" />
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 80% 40% at 50% 0%, rgba(0,229,255,0.07) 0%, transparent 65%)",
        }}
      />
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 60% 35% at 50% 100%, rgba(240,53,88,0.06) 0%, transparent 70%)",
        }}
      />

      <div
        className="max-md:w-[95vw] max-md:max-w-[95vw] max-md:mx-auto max-md:flex max-md:flex-col max-md:min-h-0 max-md:flex-1 max-md:self-stretch"
        style={{ maxWidth: "1200px", margin: "0 auto", position: "relative", zIndex: 10 }}
      >
        <div className="mb-8 max-md:mb-4 max-md:mt-1 max-md:shrink-0 max-md:w-full max-md:text-center max-md:py-1">
          <h2
            className="gh-title text-white max-md:!text-[clamp(1.35rem,5vw,1.85rem)] max-md:!leading-tight"
            style={{ fontSize: "var(--h2-sec)" }}
          >
            {isEn ? (
              <span style={{ color: ACCENT_LEFT }}>Computers</span>
            ) : (
              <span style={{ color: ACCENT_LEFT }}>Компьютеры</span>
            )}
          </h2>
          <p
            className="mt-2 text-white/55 max-md:text-[0.8rem]"
            style={{
              fontFamily: "'Barlow Condensed', sans-serif",
              letterSpacing: "0.04em",
              fontSize: "0.92rem",
            }}
          >
            {isEn
              ? "25 stations per side — hover for details."
              : "25 мест с каждой стороны — наведите для подписи."}
          </p>
        </div>

        <div className="flex flex-col md:flex-row gap-6 md:gap-10 max-md:flex-1 max-md:min-h-0 items-stretch justify-center">
          {[
            { label: isEn ? "Side A" : "Сторона A", items: left, accent: ACCENT_LEFT },
            { label: isEn ? "Side B" : "Сторона B", items: right, accent: ACCENT_RIGHT },
          ].map((zone) => (
            <div key={zone.label} className="flex-1 min-w-0 flex flex-col gap-3 max-md:min-h-0">
              <div
                className="text-center md:text-left shrink-0"
                style={{
                  fontFamily: "'Barlow Condensed', sans-serif",
                  fontWeight: 700,
                  letterSpacing: "0.12em",
                  fontSize: "0.72rem",
                  color: zone.accent,
                  textTransform: "uppercase",
                }}
              >
                {zone.label}
              </div>
              <div
                className="grid grid-cols-5 gap-1.5 sm:gap-2 flex-1 min-h-0 content-start"
                style={{ gridAutoRows: "minmax(0, auto)" }}
              >
                {zone.items.map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    aria-label={item.title}
                    className="group relative aspect-[4/5] w-full min-h-[44px] rounded-md border border-white/[0.08] bg-[#0a0a10] p-1 transition-[border-color,box-shadow] duration-300 hover:border-white/20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-400/60"
                    style={{
                      boxShadow: "inset 0 0 0 1px rgba(0,0,0,0.4)",
                    }}
                    {...bindHover({ title: item.title, color: item.color })}
                  >
                    <div
                      className="absolute inset-1 rounded-sm opacity-80 transition-opacity duration-300 group-hover:opacity-100"
                      style={{
                        background: `linear-gradient(180deg, ${item.color}22 0%, transparent 55%)`,
                        border: `1px solid ${item.color}35`,
                      }}
                    />
                    <div className="relative z-10 flex h-full flex-col items-center justify-end pb-0.5">
                      <div
                        className="mb-0.5 h-[42%] w-[72%] rounded-[3px] border transition-colors duration-300"
                        style={{
                          borderColor: `${item.color}55`,
                          background: "linear-gradient(180deg, #12121a 0%, #07070c 100%)",
                          boxShadow: `0 0 12px ${item.color}18`,
                        }}
                      />
                      <div
                        className="h-[6%] w-[28%] rounded-sm"
                        style={{ background: `${item.color}40` }}
                      />
                    </div>
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
