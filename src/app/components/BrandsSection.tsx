"use client";

import { useState } from "react";
import { ArrowRight } from "lucide-react";
import { PARTNER_CATEGORIES, getPartnersFlat } from "@/app/data/partnersCategories";

const ALL_ID = "__all__";

const PARTNERS_FLAT = getPartnersFlat();

export function BrandsSection() {
  const [activeCatId, setActiveCatId] = useState<string | null>(ALL_ID);

  const filteredPartners =
    activeCatId === ALL_ID || activeCatId === null
      ? PARTNERS_FLAT
      : PARTNERS_FLAT.filter((p) => p.categoryId === activeCatId);

  return (
    <section id="brands" className="relative overflow-hidden"
      style={{ background: "#050508", padding: "var(--sec-py) var(--sec-px)" }}>

      <div className="absolute inset-0 bg-dots opacity-14 pointer-events-none" />
      <div className="wm" style={{ fontSize: "clamp(10rem,20vw,18rem)", right: "-2rem", top: "-1rem" }}>07</div>

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

        {/* Фильтр по категориям — кнопки в стиле tag-angled */}
        <div className="flex flex-wrap items-center gap-2 mb-8">
          <span style={{ fontFamily: "'Barlow Condensed',sans-serif", fontSize: "0.52rem", letterSpacing: "0.22em", color: "rgba(255,255,255,0.2)", textTransform: "uppercase", marginRight: "6px" }}>Категории:</span>
          <button
            type="button"
            onClick={() => setActiveCatId(ALL_ID)}
            className="tag-angled transition-all duration-200"
            style={{
              background: activeCatId === ALL_ID ? "rgba(0,229,255,0.14)" : "rgba(255,255,255,0.04)",
              border: activeCatId === ALL_ID ? "1px solid rgba(0,229,255,0.35)" : "1px solid rgba(255,255,255,0.08)",
              color: activeCatId === ALL_ID ? "var(--c-cyan,#00E5FF)" : "rgba(255,255,255,0.28)",
              fontSize: "0.56rem",
              cursor: "pointer",
            }}
          >
            Все
          </button>
          {PARTNER_CATEGORIES.map((c) => {
            const isActive = activeCatId === c.id;
            return (
              <button
                key={c.id}
                type="button"
                onClick={() => setActiveCatId(isActive ? ALL_ID : c.id)}
                className="tag-angled transition-all duration-200"
                style={{
                  background: isActive ? `${c.color}18` : "rgba(255,255,255,0.04)",
                  border: isActive ? `1px solid ${c.color}50` : "1px solid rgba(255,255,255,0.08)",
                  color: isActive ? c.color : "rgba(255,255,255,0.28)",
                  fontSize: "0.56rem",
                  cursor: "pointer",
                }}
              >
                {c.cat}
              </button>
            );
          })}
        </div>

        {/* Блоки: каждая компания — отдельный блок */}
        <div className="space-y-px mb-6" style={{ background: "rgba(255,255,255,0.06)" }}>
          {filteredPartners.map((p) => (
            <div key={p.id}
              className="group flex flex-col md:flex-row md:items-center gap-6 md:gap-10 relative overflow-hidden transition-all duration-280 cursor-default"
              style={{ background: "#050508", padding: "28px 36px" }}>
              <div className="absolute left-0 top-0 bottom-0 w-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-300" style={{ background: p.color }} />
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                style={{ background: `radial-gradient(ellipse at left, ${p.color}06 0%, transparent 55%)` }} />

              {/* Category label */}
              <div className="md:w-60 shrink-0 flex items-center gap-4 relative z-10">
                <div className="flex flex-col gap-1 shrink-0">
                  <div className="w-px h-3.5" style={{ background: p.color }} />
                  <div className="w-px h-5" style={{ background: p.color }} />
                  <div className="w-px h-2" style={{ background: p.color }} />
                </div>
                <div>
                  <div style={{ fontFamily: "'Barlow Condensed',sans-serif", fontWeight: 900, color: p.color, fontSize: "0.95rem", letterSpacing: "0.08em", textTransform: "uppercase", lineHeight: 1 }}>{p.cat}</div>
                  <div style={{ fontFamily: "'Barlow Condensed',sans-serif", fontSize: "0.52rem", letterSpacing: "0.18em", color: "rgba(255,255,255,0.16)", textTransform: "uppercase", marginTop: "4px" }}>{p.count} партнёров</div>
                </div>
              </div>

              <div className="hidden md:block w-px h-10 shrink-0" style={{ background: "rgba(255,255,255,0.07)" }} />

              {/* Одна компания в блоке */}
              <div className="flex flex-wrap gap-2.5 flex-1 relative z-10">
                <span className="brand-pill"
                  style={{ background: `${p.color}08`, borderColor: `${p.color}1A` }}>{p.name}</span>
              </div>

              <div className="hidden md:block shrink-0 select-none"
                style={{ fontFamily: "'Barlow Condensed',sans-serif", fontWeight: 900, fontSize: "2.2rem", lineHeight: 1, color: "rgba(255,255,255,0.035)" }}>{p.count}</div>
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
            <a href="#" className="btn-primary shrink-0">
              <span>Стать экспонентом</span>
              <ArrowRight size={14} />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}