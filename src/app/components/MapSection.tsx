import React, { useState } from "react";
import mapImg from "../../assets/Carta.png";

type Hotspot = {
  id: string;
  left: string;
  top: string;
  width: string;
  height: string;
};

const HOTSPOTS: Hotspot[] = [
  // Легенда в центре
  { id: "legend-1", left: "15%", top: "42%", width: "4%", height: "4%" },
  { id: "legend-2", left: "15%", top: "48%", width: "4%", height: "4%" },
  { id: "legend-3", left: "15%", top: "54%", width: "4%", height: "4%" },
  { id: "legend-5", left: "15%", top: "66%", width: "4%", height: "4%" },

  // Верхний ряд (коридор)
  { id: "top-1", left: "20.8%", top: "17.3%", width: "2.5%", height: "3%" },
  { id: "top-2", left: "23%", top: "17.3%", width: "2%", height: "3%" },
  { id: "top-3", left: "25%", top: "17.3%", width: "3%", height: "3%" },
  { id: "top-4", left: "27.4%", top: "17.3%", width: "2%", height: "3%" },
  { id: "top-5", left: "30%", top: "17.3%", width: "2.5%", height: "3%" },
  { id: "top-6", left: "32%", top: "17.3%", width: "3%", height: "3%" },
  { id: "top-7", left: "39%", top: "17.3%", width: "2.7%", height: "3%" },
  { id: "top-8", left: "41.5%", top: "17.3%", width: "2%", height: "3%" },
  { id: "top-9", left: "44%", top: "17.3%", width: "3%", height: "3%" },
  { id: "top-10", left: "51%", top: "13.3%", width: "3%", height: "3%" },
  { id: "top-11", left: "48%", top: "8.3%", width: "2%", height: "3%" },
  { id: "top-12", left: "50%", top: "6.3%", width: "3%", height: "2.2%" },
  { id: "top-13", left: "53%", top: "6.3%", width: "2%", height: "2.2%" },

  // Правый блок (синие 3x3)
  { id: "right-blue-1", left: "58%", top: "12%", width: "3%", height: "6%" },
  { id: "right-blue-2", left: "63%", top: "12%", width: "3%", height: "6%" },
  { id: "right-blue-3", left: "67%", top: "12%", width: "3%", height: "6%" },

  { id: "right-blue-4", left: "58%", top: "20%", width: "3.5%", height: "5%" },
  { id: "right-blue-5", left: "63%", top: "20%", width: "3.5%", height: "5%" },
  { id: "right-blue-6", left: "67.5%", top: "20%", width: "3.5%", height: "5%" },
  { id: "right-blue-7", left: "72%", top: "20%", width: "3.5%", height: "5%" },

  // Правый нижний ряд (зелёные 2x4)
  { id: "right-green-1", left: "60%", top: "6.4%", width: "18%", height: "3%" },


  { id: "right-green-2", left: "21%", top: "23%", width: "4%", height: "3%" },
  { id: "right-green-3", left: "17%", top: "20%", width: "4%", height: "4%" },
  { id: "right-green-4", left: "30%", top: "23%", width: "4%", height: "3%" },
  { id: "right-green-4", left: "35%", top: "23%", width: "4%", height: "3%" },
  { id: "right-green-4", left: "44%", top: "23%", width: "4%", height: "3%" },
  { id: "right-green-4", left: "48.6%", top: "23%", width: "4%", height: "3%" },

  // Левый столбец
  { id: "left-1", left: "10%", top: "41%", width: "3%", height: "5%" },
  { id: "left-2", left: "10%", top: "53%", width: "3%", height: "5%" },
  { id: "left-3", left: "9%", top: "66%", width: "4%", height: "5%" },
  { id: "left-4", left: "9%", top: "71%", width: "4%", height: "5%" },
  { id: "left-5", left: "9.5%", top: "75.5%", width: "3%", height: "4%" },

  // Нижний длинный ряд (красные 3x4)
  { id: "bottom-red-1", left: "16%", top: "74%", width: "4%", height: "5%" },
  { id: "bottom-red-2", left: "21%", top: "74%", width: "4%", height: "5%" },
  { id: "bottom-red-3", left: "26%", top: "74%", width: "4%", height: "5%" },
  { id: "bottom-red-4", left: "30%", top: "74%", width: "4%", height: "5%" },
  { id: "bottom-red-5", left: "35%", top: "74%", width: "4%", height: "5%" },
  { id: "bottom-red-6", left: "39%", top: "74%", width: "4%", height: "5%" },
  { id: "bottom-red-7", left: "44%", top: "74%", width: "4%", height: "5%" },
  { id: "bottom-red-8", left: "49%", top: "74%", width: "4%", height: "5%" },
  { id: "bottom-red-9", left: "54%", top: "74%", width: "4%", height: "5%" },
  { id: "bottom-red-9", left: "58%", top: "74%", width: "4%", height: "5%" },
  { id: "bottom-red-9", left: "63%", top: "74%", width: "4%", height: "5%" },

  // Нижний ряд фиолетовых
  { id: "bottom-purple-1", left: "51%", top: "79.3%", width: "2.5%", height: "2.5%" },
  { id: "bottom-purple-2", left: "53.6%", top: "79.3%", width: "2.5%", height: "2.5%" },
  { id: "bottom-purple-3", left: "56.2%", top: "79.3%", width: "2.5%", height: "2.5%" },
  { id: "bottom-purple-4", left: "58.8%", top: "79.3%", width: "2.5%", height: "2.5%" },
  { id: "bottom-purple-5", left: "61.4%", top: "79.3%", width: "2.5%", height: "2.5%" },
  { id: "bottom-purple-6", left: "64%", top: "79.3%", width: "2.5%", height: "2.5%" },
  { id: "bottom-purple-7", left: "66.6%", top: "79.3%", width: "2.3%", height: "2.5%" },
  { id: "bottom-purple-8", left: "69%", top: "79.3%", width: "2.5%", height: "2.5%" },


  { id: "bottom-purple-22", left: "16.6%", top: "79.3%", width: "2.5%", height: "2.5%" },
  { id: "bottom-purple-33", left: "14.2%", top: "79.3%", width: "2%", height: "2.5%" },
  { id: "bottom-purple-11", left: "21%", top: "79.3%", width: "2.5%", height: "2.5%" },
  { id: "bottom-purple-44", left: "18.8%", top: "79.3%", width: "2%", height: "2.5%" },
  { id: "bottom-purple-55", left: "11.9%", top: "79.3%", width: "2.5%", height: "2.5%" },
  { id: "bottom-purple-66", left: "23.2%", top: "79.3%", width: "2%", height: "2.5%" },
  { id: "bottom-purple-77", left: "25.6%", top: "79.3%", width: "2.3%", height: "2.5%" },
  { id: "bottom-purple-88", left: "28%", top: "79.3%", width: "2%", height: "2.5%" },
  { id: "bottom-purple-99", left: "30%", top: "79.3%", width: "2.7%", height: "2.5%" },
  { id: "bottom-purple-10", left: "32.5%", top: "79.3%", width: "2%", height: "2.5%" },
  { id: "bottom-purple-32", left: "34.5%", top: "79.3%", width: "2.7%", height: "2.5%" },
  { id: "bottom-purple-41", left: "36.9%", top: "79.3%", width: "2%", height: "2.5%" },
];

export function MapSection() {
  const [openZoneModal, setOpenZoneModal] = useState(false);

  return (
    <section
      id="map"
      className="sec-fullscreen relative overflow-hidden flex flex-col max-md:!p-0 max-md:min-h-0"
      style={{
        background: "#050508",
        // Чуть меньше верхний паддинг, чем у других секций
        padding: "clamp(8px, 1.2vh, 14px) var(--sec-px) var(--sec-py) var(--sec-px)",
      }}
    >
      <div className="absolute inset-0 bg-dots opacity-10 pointer-events-none" />
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 65% 55% at 50% 10%, rgba(0,229,255,0.06) 0%, transparent 70%)",
        }}
      />

      <div
        style={{
          maxWidth: "1380px",
          margin: "0 auto",
          position: "relative",
          zIndex: 10,
          display: "flex",
          flexDirection: "column",
          height: "100%",
        }}
      >
        <div className="mb-5 max-md:mb-2 max-md:px-4 max-md:pt-[max(4px,env(safe-area-inset-top))]">
          <div className="eyebrow max-md:text-[0.58rem] max-md:mb-0.5">Навигация по фестивалю</div>
          <h2
            className="gh-title text-white max-md:leading-snug"
            style={{
              fontSize: "var(--h2-sec)",
              whiteSpace: "nowrap",
            }}
          >
            Карта <span style={{ color: "var(--c-cyan,#00E5FF)" }}>площадки</span>
          </h2>
        </div>

        <div className="flex-1 flex items-center justify-center max-md:px-4 max-md:pb-[max(4px,env(safe-area-inset-bottom))]">
          <div
            className="w-full max-w-[960px] rounded-2xl overflow-hidden relative"
            style={{
              background: "#050508",
              border: "1px solid rgba(0,229,255,0.25)",
              minHeight: "min(300px, 52vh)",
              boxShadow: "0 0 40px rgba(0,0,0,0.85)",
            }}
          >
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_0_0,rgba(0,229,255,0.08),transparent_55%)] pointer-events-none" />
            <div
              className="absolute top-0 left-0 right-0 h-px"
              style={{
                background:
                  "linear-gradient(90deg, transparent, rgba(0,229,255,0.6), rgba(240,180,41,0.45), transparent)",
              }}
            />
            <div
              className="absolute bottom-0 left-0 right-0 h-px"
              style={{
                background:
                  "linear-gradient(90deg, transparent, rgba(0,229,255,0.4), rgba(107,33,232,0.35), transparent)",
              }}
            />

            {/* Карта */}
            <div className="relative z-10 h-full w-full flex items-center justify-center px-3 py-3 max-md:px-2 max-md:py-2">
              <div className="relative w-full max-w-full">
                <img
                  src={mapImg}
                  alt="Карта площадки фестиваля"
                  className="w-full h-auto block select-none pointer-events-none"
                />
                {HOTSPOTS.map((h) => (
                  <button
                    key={h.id}
                    type="button"
                    onClick={() => setOpenZoneModal(true)}
                    aria-label={`Зона ${h.id}`}
                    className="absolute pointer-events-auto"
                    style={{
                      left: h.left,
                      top: h.top,
                      width: h.width,
                      height: h.height,
                      borderRadius: "6px",
                      border: "2px solid transparent",
                      background: "transparent",
                      boxShadow: "none",
                      cursor: "pointer",
                    }}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Модальное окно по клику по красной зоне */}
      {openZoneModal && (
        <div
          className="fixed inset-0 z-[120] flex items-center justify-center px-4"
          style={{
            background: "rgba(0,0,0,0.82)",
            backdropFilter: "blur(10px)",
          }}
          onClick={() => setOpenZoneModal(false)}
        >
          <div
            className="relative w-full max-w-md rounded-2xl border overflow-hidden"
            style={{
              background: "#050508",
              borderColor: "rgba(0,229,255,0.4)",
              boxShadow: "0 24px 80px rgba(0,0,0,0.9)",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div
              className="absolute top-0 left-0 right-0 h-px"
              style={{
                background:
                  "linear-gradient(90deg, transparent, rgba(0,229,255,0.7), rgba(240,180,41,0.6), transparent)",
              }}
            />
            <div className="px-5 pt-5 pb-4">
              <p
                className="mb-2"
                style={{
                  fontFamily: "'Barlow Condensed',sans-serif",
                  fontSize: "0.6rem",
                  letterSpacing: "0.28em",
                  textTransform: "uppercase",
                  color: "rgba(0,229,255,0.9)",
                }}
              >
                Свободная партнёрская зона
              </p>
              <h3
                className="gh-title text-white mb-3"
                style={{ fontSize: "1.3rem", lineHeight: 1.2 }}
              >
                Площадка для вашего бренда
              </h3>
              <p
                style={{
                  fontFamily: "'Barlow',sans-serif",
                  fontSize: "0.9rem",
                  letterSpacing: "0.03em",
                  color: "rgba(255,255,255,0.78)",
                  lineHeight: 1.7,
                }}
              >
                Свободная партнёрская зона на карте фестиваля. Здесь может быть стенд вашего бренда,
                активации, промо‑зона или интерактив для гостей. Наполнить блок можно финальной
                информацией о партнёрах и формате размещения.
              </p>
            </div>
            <div className="px-5 pb-4 flex justify-end">
              <button
                type="button"
                onClick={() => setOpenZoneModal(false)}
                className="btn-outline"
                style={{
                  fontSize: "0.7rem",
                  padding: "8px 18px",
                  letterSpacing: "0.16em",
                }}
              >
                Закрыть
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

