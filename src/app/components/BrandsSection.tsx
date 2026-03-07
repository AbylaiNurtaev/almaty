"use client";

import { useState } from "react";
import { ArrowRight } from "lucide-react";
import { PARTNER_CATEGORIES } from "@/app/data/partnersCategories";
import { ExhibitorApplicationModal } from "./ExhibitorApplicationModal";

const HIDDEN_IDS = ["franchise", "delivery", "service"];
const DISPLAY_CATEGORIES = PARTNER_CATEGORIES.filter((c) => !HIDDEN_IDS.includes(c.id));

export function BrandsSection() {
  const [exhibitorModalOpen, setExhibitorModalOpen] = useState(false);

  return (
    <section id="brands" className="relative overflow-hidden"
      style={{ background: "#050508", padding: "var(--sec-py) var(--sec-px)" }}>

      <div className="absolute inset-0 bg-dots opacity-14 pointer-events-none" />

      <div style={{ maxWidth: "1380px", margin: "0 auto", position: "relative", zIndex: 10 }}>

        {/* Header */}
        <div className="mb-14">
          <div className="eyebrow">Выставка</div>
          <h2 className="gh-title text-white" style={{ fontSize: "var(--h2-sec)" }}>
            Технологии и<br />
            <span style={{ color: "var(--c-cyan,#00E5FF)" }}>Выставка брендов</span>
          </h2>
        </div>

        {/* Vertical layout: headers in a row, brands in columns below */}
        <div
          className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 2xl:grid-cols-10 gap-x-4 gap-y-6 mb-6"
          style={{
            background: "rgba(255,255,255,0.06)",
            padding: "24px",
            border: "1px solid rgba(255,255,255,0.06)",
          }}
        >
          {DISPLAY_CATEGORIES.map((cat) => (
            <div
              key={cat.id}
              className="group flex flex-col gap-4 relative overflow-hidden transition-all duration-280 cursor-default"
              style={{ background: "#050508", padding: "20px 16px", minHeight: "120px" }}
            >
              <div className="absolute left-0 top-0 bottom-0 w-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-300" style={{ background: cat.color }} />
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                style={{ background: `radial-gradient(ellipse at left top, ${cat.color}08 0%, transparent 60%)` }} />

              {/* Category header */}
              <div className="relative z-10 flex items-center gap-3 shrink-0">
                <div className="flex flex-col gap-0.5 shrink-0">
                  <div className="w-px h-3" style={{ background: cat.color }} />
                  <div className="w-px h-4" style={{ background: cat.color }} />
                </div>
                <div style={{ fontFamily: "'Barlow Condensed',sans-serif", fontWeight: 900, color: cat.color, fontSize: "0.8rem", letterSpacing: "0.08em", textTransform: "uppercase", lineHeight: 1.15 }}>
                  {cat.cat}
                </div>
              </div>

              {/* Brands stacked vertically */}
              <div className="flex flex-col gap-1.5 flex-1 relative z-10">
                {cat.brands.map((b) => (
                  <span
                    key={b}
                    className="brand-pill w-full text-center"
                    style={{ background: `${cat.color}08`, borderColor: `${cat.color}1A` }}
                  >
                    {b}
                  </span>
                ))}
              </div>
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