"use client";

import { useState, useMemo } from "react";
import { ArrowRight } from "lucide-react";
import { PARTNER_CATEGORIES } from "@/app/data/partnersCategories";
import { ExhibitorApplicationModal } from "./ExhibitorApplicationModal";

type FilterKind = "expo" | "franchise" | "partners";

const FILTER_TABS: { id: FilterKind; label: string }[] = [
  { id: "expo", label: "Експо" },
  { id: "franchise", label: "Франшиза" },
  { id: "partners", label: "Партнеры" },
];

export function BrandsSection() {
  const [exhibitorModalOpen, setExhibitorModalOpen] = useState(false);
  const [filter, setFilter] = useState<FilterKind>("expo");

  const filteredCategories = useMemo(() => {
    if (filter === "expo") return PARTNER_CATEGORIES;
    if (filter === "franchise") return PARTNER_CATEGORIES.filter((c) => c.id === "franchise");
    return PARTNER_CATEGORIES.filter((c) => c.id !== "franchise");
  }, [filter]);

  return (
    <section id="brands" className="relative overflow-hidden"
      style={{ background: "#050508", padding: "var(--sec-py) var(--sec-px)" }}>

      <div className="absolute inset-0 bg-dots opacity-14 pointer-events-none" />
      <div className="wm" style={{ fontSize: "clamp(10rem,20vw,18rem)" }}>07</div>

      <div style={{ maxWidth: "1380px", margin: "0 auto", position: "relative", zIndex: 10 }}>

        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-12 mb-14">
          <div>
            <div className="eyebrow">Выставка</div>
            <h2 className="gh-title text-white" style={{ fontSize: "var(--h2-sec)" }}>
              Технологии и<br />
              <span style={{ color: "var(--c-cyan,#00E5FF)" }}>Выставка брендов</span>
            </h2>
          </div>
          <div style={{ paddingBottom: "8px" }}>
            <p style={{ fontFamily: "'Barlow',sans-serif", fontSize: "1rem", color: "rgba(255,255,255,0.32)", lineHeight: 1.78, maxWidth: "380px", marginBottom: "20px" }}>
              40+ ведущих игровых брендов представляют свои новейшие продукты. Открывайте, тестируйте и пробуйте новые технологии из первых рук.
            </p>
            <div className="flex" style={{ gap: "1px", background: "rgba(255,255,255,0.06)" }}>
              {[{ v: "40+", l: "Брендов" }, { v: String(PARTNER_CATEGORIES.length), l: "Категорий" }, { v: "2", l: "Дня" }].map((s) => (
                <div key={s.l} className="px-7 py-4 text-center" style={{ background: "#050508" }}>
                  <div style={{ fontFamily: "'Barlow Condensed',sans-serif", fontWeight: 900, fontSize: "1.85rem", lineHeight: 1, color: "var(--c-cyan,#00E5FF)", letterSpacing: "-0.02em" }}>{s.v}</div>
                  <div style={{ fontFamily: "'Barlow Condensed',sans-serif", fontSize: "0.52rem", letterSpacing: "0.24em", color: "rgba(255,255,255,0.2)", textTransform: "uppercase", marginTop: "5px" }}>{s.l}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Filter tabs — как в header: Франшиза, Експо, Партнеры */}
        <div className="flex flex-wrap gap-1 mb-8" style={{ background: "rgba(255,255,255,0.06)", padding: "4px", maxWidth: "fit-content" }}>
          {FILTER_TABS.map((tab) => {
            const isActive = filter === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setFilter(tab.id)}
                className="transition-all duration-200"
                style={{
                  fontFamily: "'Barlow Condensed',sans-serif",
                  fontWeight: 700,
                  fontSize: "0.7rem",
                  letterSpacing: "0.18em",
                  textTransform: "uppercase",
                  padding: "10px 20px",
                  background: isActive ? "var(--c-cyan,#00E5FF)" : "transparent",
                  color: isActive ? "#050508" : "rgba(255,255,255,0.5)",
                  border: "1px solid " + (isActive ? "var(--c-cyan,#00E5FF)" : "rgba(255,255,255,0.1)"),
                }}
              >
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* Category rows */}
        <div className="space-y-px mb-6" style={{ background: "rgba(255,255,255,0.06)" }}>
          {filteredCategories.map((cat) => (
            <div key={cat.id}
              className="group flex flex-col md:flex-row md:items-center gap-6 md:gap-10 relative overflow-hidden transition-all duration-280 cursor-default"
              style={{ background: "#050508", padding: "28px 36px" }}>
              <div className="absolute left-0 top-0 bottom-0 w-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-300" style={{ background: cat.color }} />
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                style={{ background: `radial-gradient(ellipse at left, ${cat.color}06 0%, transparent 55%)` }} />

              {/* Category label */}
              <div className="md:w-60 shrink-0 flex items-center gap-4 relative z-10">
                <div className="flex flex-col gap-1 shrink-0">
                  <div className="w-px h-3.5" style={{ background: cat.color }} />
                  <div className="w-px h-5" style={{ background: cat.color }} />
                  <div className="w-px h-2" style={{ background: cat.color }} />
                </div>
                <div>
                  <div style={{ fontFamily: "'Barlow Condensed',sans-serif", fontWeight: 900, color: cat.color, fontSize: "0.95rem", letterSpacing: "0.08em", textTransform: "uppercase", lineHeight: 1 }}>{cat.cat}</div>
                  <div style={{ fontFamily: "'Barlow Condensed',sans-serif", fontSize: "0.52rem", letterSpacing: "0.18em", color: "rgba(255,255,255,0.16)", textTransform: "uppercase", marginTop: "4px" }}>{cat.count} партнёров</div>
                </div>
              </div>

              <div className="hidden md:block w-px h-10 shrink-0" style={{ background: "rgba(255,255,255,0.07)" }} />

              {/* Brand names */}
              <div className="flex flex-wrap gap-2.5 flex-1 relative z-10">
                {cat.brands.map((b) => (
                  <span key={b} className="brand-pill"
                    style={{ background: `${cat.color}08`, borderColor: `${cat.color}1A` }}>{b}</span>
                ))}
              </div>

              <div className="hidden md:block shrink-0 select-none"
                style={{ fontFamily: "'Barlow Condensed',sans-serif", fontWeight: 900, fontSize: "2.2rem", lineHeight: 1, color: "rgba(255,255,255,0.035)" }}>{cat.count}</div>
            </div>
          ))}
        </div>

        {/* Exhibitor CTA */}
        <div className="relative overflow-hidden"
          style={{ border: "1px dashed rgba(255,255,255,0.07)", background: "rgba(255,255,255,0.012)" }}>
          <div className="absolute inset-0 bg-dots opacity-18 pointer-events-none" />
          <div className="absolute right-0 bottom-0 select-none pointer-events-none hidden md:block"
            style={{ fontFamily: "'Barlow Condensed',sans-serif", fontWeight: 900, fontSize: "10rem", lineHeight: 0.88, color: "rgba(255,255,255,0.007)", letterSpacing: "-0.06em" }}>EXPO</div>
          <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-7 p-10 md:p-12">
            <div>
              <div className="gh-title text-white" style={{ fontSize: "1.85rem", marginBottom: "6px" }}>Хотите выставиться на GAMEHUB?</div>
              <div style={{ fontFamily: "'Barlow',sans-serif", fontSize: "0.92rem", color: "rgba(255,255,255,0.3)" }}>
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