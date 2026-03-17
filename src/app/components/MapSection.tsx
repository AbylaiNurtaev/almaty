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
  { id: "legend-1", left: "19%", top: "49%", width: "4%", height: "4%" },
  { id: "legend-2", left: "19%", top: "56%", width: "4%", height: "4%" },
  { id: "legend-3", left: "19%", top: "63%", width: "4%", height: "4%" },
  { id: "legend-5", left: "19%", top: "77.5%", width: "4%", height: "4%" },

  // Верхний ряд (коридор)
  { id: "top-1", left: "25.8%", top: "19.3%", width: "3%", height: "3%" },
  { id: "top-2", left: "29%", top: "19.3%", width: "2%", height: "3%" },
  { id: "top-3", left: "31.5%", top: "19.3%", width: "3%", height: "3%" },
  { id: "top-4", left: "34.4%", top: "19.3%", width: "2%", height: "3%" },
  { id: "top-5", left: "37.2%", top: "19.3%", width: "3%", height: "3%" },
  { id: "top-6", left: "40.5%", top: "19.3%", width: "3%", height: "3%" },
  { id: "top-7", left: "49%", top: "19.3%", width: "2.7%", height: "3%" },
  { id: "top-8", left: "52%", top: "19.3%", width: "2%", height: "3%" },
  { id: "top-9", left: "55%", top: "19.3%", width: "4%", height: "3%" },


  { id: "top-10", left: "63%", top: "13.3%", width: "4%", height: "5%" },

  
  { id: "top-11", left: "60.5%", top: "8.5%", width: "2%", height: "3%" },
  { id: "top-12", left: "62.5%", top: "5.5%", width: "3.3%", height: "2.8%" },
  { id: "top-13", left: "66.5%", top: "5.5%", width: "2%", height: "2.9%" },

  // Правый блок (синие 3x3)
  { id: "right-blue-1", left: "72.5%", top: "12%", width: "3%", height: "8%" },
  { id: "right-blue-1", left: "80%", top: "12%", width: "3%", height: "8%" },
  { id: "right-blue-2", left: "84%", top: "12%", width: "3%", height: "8%" },
  { id: "right-blue-3", left: "91%", top: "12%", width: "3%", height: "8%" },

  
  { id: "right-blue-4", left: "73%", top: "22%", width: "4%", height: "6%" },
  { id: "right-blue-5", left: "78.5%", top: "22%", width: "4%", height: "6%" },
  { id: "right-blue-6", left: "84.5%", top: "22%", width: "4%", height: "6%" },
  { id: "right-blue-7", left: "90%", top: "22%", width: "4%", height: "6%" },


  { id: "right-green-1", left: "75%", top: "6%", width: "22%", height: "3%" },


  { id: "right-green-3", left: "21.5%", top: "22%", width: "4.5%", height: "4%" },
  { id: "right-green-2", left: "26%", top: "26%", width: "4.5%", height: "3%" },
  { id: "right-green-4", left: "37.5%", top: "26%", width: "4.5%", height: "3%" },
  { id: "right-green-4", left: "43%", top: "26%", width: "4.5%", height: "3%" },
  { id: "right-green-4", left: "55%", top: "26%", width: "4.5%", height: "3%" },
  { id: "right-green-4", left: "61%", top: "26%", width: "4.5%", height: "3%" },

  // Левый столбец
  { id: "left-1", left: "12.5%", top: "48%", width: "3%", height: "5%" },
  { id: "left-2", left: "12.5%", top: "63%", width: "3%", height: "5%" },
  { id: "left-3", left: "11.5%", top: "77.5%", width: "4%", height: "5%" },
  { id: "left-4", left: "11.5%", top: "83%", width: "4%", height: "5%" },
  { id: "left-5", left: "12%", top: "89%", width: "3%", height: "4%" },

  // Нижний длинный ряд (красные 3x4)
  { id: "bottom-red-1", left: "21%", top: "87%", width: "4%", height: "5%" },
  { id: "bottom-red-2", left: "26%", top: "87%", width: "4%", height: "5%" },
  { id: "bottom-red-3", left: "32%", top: "87%", width: "4%", height: "5%" },
  { id: "bottom-red-4", left: "38%", top: "87%", width: "4%", height: "5%" },
  { id: "bottom-red-5", left: "44%", top: "87%", width: "4%", height: "5%" },
  { id: "bottom-red-6", left: "49.5%", top: "87%", width: "4%", height: "5%" },
  { id: "bottom-red-7", left: "55%", top: "87%", width: "4%", height: "5%" },
  { id: "bottom-red-8", left: "62%", top: "87%", width: "4%", height: "5%" },
  { id: "bottom-red-9", left: "68%", top: "87%", width: "4%", height: "5%" },
  { id: "bottom-red-9", left: "73%", top: "87%", width: "4%", height: "5%" },
  { id: "bottom-red-9", left: "79%", top: "87%", width: "4%", height: "5%" },

  // Нижний ряд фиолетовых
  { id: "bottom-purple-1", left: "64%", top: "93.3%", width: "3%", height: "2.5%" },
  { id: "bottom-purple-2", left: "67%", top: "93.3%", width: "3%", height: "2.5%" },
  { id: "bottom-purple-3", left: "70%", top: "93.3%", width: "3%", height: "2.5%" },
  { id: "bottom-purple-4", left: "73%", top: "93.3%", width: "3%", height: "2.5%" },
  { id: "bottom-purple-5", left: "76.5%", top: "93.3%", width: "3%", height: "2.5%" },
  { id: "bottom-purple-6", left: "80%", top: "93.3%", width: "3%", height: "2.5%" },
  { id: "bottom-purple-7", left: "83%", top: "93.3%", width: "3%", height: "2.5%" },
  { id: "bottom-purple-8", left: "86%", top: "93.3%", width: "3%", height: "2.5%" },


  { id: "bottom-purple-33", left: "14.7%", top: "93.3%", width: "3%", height: "2.5%" },
  { id: "bottom-purple-22", left: "17.4%", top: "93.3%", width: "2%", height: "2.5%" },
  { id: "bottom-purple-11", left: "21%", top: "93.3%", width: "2.5%", height: "2.5%" },
  { id: "bottom-purple-44", left: "23.3%", top: "93.3%", width: "2%", height: "2.5%" },
  { id: "bottom-purple-55", left: "26.7%", top: "93.3%", width: "2.5%", height: "2.5%" },
  { id: "bottom-purple-66", left: "29.5%", top: "93.3%", width: "2%", height: "2.5%" },
  { id: "bottom-purple-77", left: "32%", top: "93.3%", width: "2.3%", height: "2.5%" },
  { id: "bottom-purple-88", left: "34.7%", top: "93.3%", width: "2%", height: "2.5%" },
  { id: "bottom-purple-99", left: "37.6%", top: "93.3%", width: "2.7%", height: "2.5%" },
  { id: "bottom-purple-10", left: "40.5%", top: "93.3%", width: "2%", height: "2.5%" },
  { id: "bottom-purple-32", left: "43.2%", top: "93.3%", width: "2.7%", height: "2.5%" },
  { id: "bottom-purple-41", left: "46.2%", top: "93.3%", width: "2%", height: "2.5%" },
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
                      // border: "2px solid rgba(0,229,255,0.9)",
                      // background: "rgba(0,229,255,0.04)",
                      // boxShadow: "0 0 0 1px rgba(0,0,0,0.6)",
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

