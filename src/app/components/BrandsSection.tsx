"use client";

import { useState, useEffect } from "react";
import { ArrowRight } from "lucide-react";
import { PARTNER_CATEGORIES } from "@/app/data/partnersCategories";
import { ExhibitorApplicationModal } from "./ExhibitorApplicationModal";

const HIDDEN_IDS = ["franchise", "delivery", "service"];
const DISPLAY_CATEGORIES = PARTNER_CATEGORIES.filter((c) => !HIDDEN_IDS.includes(c.id));

const BRAND_GLOW_COLORS = [
  "#00D4F5",
  "#F97316",
  "#22C55E",
  "#6366F1",
  "#EC4899",
  "#EAB308",
  "#0EA5E9",
  "#F43F5E",
];

export function BrandsSection() {
  const [exhibitorModalOpen, setExhibitorModalOpen] = useState(false);
  const [selectedCategoryId, setSelectedCategoryId] = useState<string | null>("devices");
  const [selectedBrand, setSelectedBrand] = useState<string | null>(null);

  const activeCategory = selectedCategoryId
    ? DISPLAY_CATEGORIES.find((c) => c.id === selectedCategoryId)
    : null;

  useEffect(() => {
    if (activeCategory) {
      setSelectedBrand((prev) =>
        prev && activeCategory.brands.includes(prev)
          ? prev
          : activeCategory.brands[0] ?? null,
      );
    }
  }, [activeCategory]);

  const activeBrandIndex =
    activeCategory && selectedBrand
      ? activeCategory.brands.indexOf(selectedBrand)
      : -1;

  const brandGlowColor =
    activeBrandIndex >= 0
      ? BRAND_GLOW_COLORS[activeBrandIndex % BRAND_GLOW_COLORS.length]
      : activeCategory?.color ?? "#00E5FF";

  return (
    <section id="brands" className="sec-fullscreen relative overflow-hidden"
      style={{ background: "#050508", padding: "var(--sec-py) var(--sec-px)" }}>

      <div className="absolute inset-0 bg-dots opacity-14 pointer-events-none" />
      {/* Подсветка от выбранного бренда */}
      <div
        className="pointer-events-none absolute inset-0 transition-opacity duration-500"
        style={{
          opacity: activeCategory ? 1 : 0,
          background: `radial-gradient(circle at 75% 40%, ${brandGlowColor}26 0%, transparent 55%)`,
        }}
      />

      <div style={{ maxWidth: "1380px", margin: "0 auto", position: "relative", zIndex: 10 }}>

        {/* Header — мобилка: меньше отступы и шрифт */}
        <div className="mb-14 max-md:!mb-4 max-md:!mt-0">
          <div className="eyebrow max-md:!mb-1 max-md:!text-[0.5rem] max-md:!tracking-[0.2em]">Выставка</div>
          <h2
            className="gh-title text-white max-md:!text-[clamp(1.05rem,4.2vw,1.4rem)] max-md:!leading-tight max-md:!mt-0"
            style={{ fontSize: "var(--h2-sec)" }}
          >
            <span style={{ color: "var(--c-cyan,#00E5FF)" }}>Выставка брендов</span>
          </h2>
        </div>

        {/* Категории как фильтры */}
        <div
          className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-8 2xl:grid-cols-10 gap-x-2 gap-y-3 mb-4 items-stretch"
          style={{
            background: "rgba(255,255,255,0.06)",
            padding: "12px 14px 10px",
            border: "1px solid rgba(255,255,255,0.06)",
          }}
        >
          {DISPLAY_CATEGORIES.map((cat) => {
            const isActive = selectedCategoryId === cat.id;
            return (
              <button
                key={cat.id}
                type="button"
                onClick={() => {
                  setSelectedCategoryId(cat.id);
                }}
                className="group relative overflow-hidden transition-all duration-280 cursor-pointer flex items-center justify-center h-full text-left"
                style={{
                  background: "#050508",
                  padding: "8px 8px",
                  minHeight: "52px",
                  border: isActive ? `1px solid ${cat.color}66` : "1px solid transparent",
                }}
              >
                <div
                  className="absolute left-0 top-0 bottom-0 w-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  style={{ background: cat.color, opacity: isActive ? 1 : undefined }}
                />
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                  style={{
                    background: `radial-gradient(ellipse at left top, ${cat.color}08 0%, transparent 60%)`,
                    opacity: isActive ? 1 : undefined,
                  }}
                />

                {/* Заголовок категории */}
                <div className="relative z-10 flex items-center justify-center shrink-0 text-center w-full">
                  <div
                    style={{
                      fontFamily: "'Barlow Condensed',sans-serif",
                      fontWeight: 900,
                      color: cat.color,
                      fontSize: "0.62rem",
                      letterSpacing: "0.1em",
                      textTransform: "uppercase",
                      lineHeight: 1.15,
                    }}
                  >
                    {cat.cat}
                  </div>
                </div>
              </button>
            );
          })}
        </div>

        {/* Горизонтальный список брендов выбранной категории */}
        {activeCategory && (
          <div
            className="mt-4 max-md:!mt-2 max-md:!p-3 max-md:!px-3"
            style={{
              background: "rgba(255,255,255,0.02)",
              border: "1px solid rgba(255,255,255,0.06)",
              padding: "16px 20px",
            }}
          >
            <div
              className="mb-3 max-md:!mb-2 max-md:!text-[0.62rem] max-md:!tracking-[0.1em]"
              style={{
                fontFamily: "'Barlow Condensed',sans-serif",
                fontWeight: 700,
                fontSize: "0.78rem",
                letterSpacing: "0.16em",
                textTransform: "uppercase",
                color: "rgba(255,255,255,0.6)",
              }}
            >
              Бренды категории{" "}
              <span style={{ color: activeCategory.color }}>{activeCategory.cat}</span>
            </div>
            {/* Десктоп: одна строка + скролл. Мобилка: перенос на сколько угодно строк */}
            <div className="flex flex-wrap gap-2 gap-y-2 md:flex-nowrap md:overflow-x-auto md:pb-1 max-md:overflow-x-visible max-md:pb-0">
              {activeCategory.brands.map((b, idx) => {
                const isBrandActive = selectedBrand === b;
                const pillGlowColor =
                  BRAND_GLOW_COLORS[idx % BRAND_GLOW_COLORS.length];
                return (
                  <button
                    key={b}
                    type="button"
                    onClick={() => setSelectedBrand(b)}
                    className="brand-pill whitespace-nowrap max-md:whitespace-normal transition-colors duration-200 cursor-pointer shrink-0"
                    style={{
                      background: isBrandActive
                        ? `${pillGlowColor}26`
                        : `${activeCategory.color}08`,
                      borderColor: isBrandActive
                        ? `${pillGlowColor}66`
                        : `${activeCategory.color}1A`,
                      boxShadow: isBrandActive
                        ? `0 0 24px ${pillGlowColor}66`
                        : "none",
                    }}
                  >
                    {b}
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* Exhibitor CTA */}
            <div className="relative overflow-hidden"
          style={{ border: "1px dashed rgba(255,255,255,0.07)", background: "rgba(255,255,255,0.012)" }}>
          <div className="absolute inset-0 bg-dots opacity-18 pointer-events-none" />
          <div className="absolute right-0 bottom-0 select-none pointer-events-none hidden md:block"
            style={{ fontFamily: "'Barlow Condensed',sans-serif", fontWeight: 900, fontSize: "10rem", lineHeight: 0.88, color: "rgba(255,255,255,0.007)", letterSpacing: "0.03em" }}>EXPO</div>
            <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-7 p-10 md:p-12">
          <div>
              <div className="gh-title text-white" style={{ fontSize: "1.85rem", marginBottom: "6px" }}>Хотите выставиться на <span className="gh-logo">GAMEHUB</span>?</div>
              <div style={{ fontFamily: "'Barlow',sans-serif", fontSize: "0.92rem", letterSpacing: "0.03em", color: "rgba(255,255,255,0.3)" }}>
                Представьте свой бренд 7–8 тысячам увлечённых геймеров и профессионалам индустрии.
              </div>
            </div>
            <button
              type="button"
              className="btn-primary shrink-0"
              onClick={() => setExhibitorModalOpen(true)}
            >
              <span>Стать экспонентом</span>
              <ArrowRight size={14} />
            </button>
          </div>
        </div>
        <ExhibitorApplicationModal
          open={exhibitorModalOpen}
          onOpenChange={setExhibitorModalOpen}
        />
      </div>
    </section>
  );
}