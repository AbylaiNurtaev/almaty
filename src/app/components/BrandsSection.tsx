"use client";

import { useEffect, useState } from "react";
import { PARTNER_CATEGORIES } from "@/app/data/partnersCategories";
import { useLanguage } from "../context/LanguageContext";
import { SponsorApplicationModal } from "./SponsorApplicationModal";
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

type BrandTab = "description" | "specs" | "users";

const MOCK_BRAND_TEXT: Record<BrandTab, string> = {
  description:
    "Премиальная игровая линейка с фокусом на комфорт во время долгих сессий. Модель сочетает лёгкий корпус, плотную посадку и чистое позиционирование звука для соревновательных дисциплин.",
  specs:
    "40 мм драйверы, диапазон 20 Гц - 20 кГц, съёмный микрофон с шумоподавлением, кабель 1.8 м, вес 265 г, поддержка PC/PS/XBOX, мягкие амбушюры с эффектом памяти.",
  users:
    "Любители шутеров, стримеры, киберспортсмены и посетители LAN-ивентов. Бренд выбирают клубы, где важны надёжность девайсов и удобство при 6-8 часовых игровых сессиях.",
};

export function BrandsSection() {
  const { language } = useLanguage();
  const isEn = language === "en";
  const tr = (v: string) =>
    isEn
      ? ({
          "Описание": "Description",
          "Характеристики": "Specs",
          "Пользуются": "Used by",
          "Премиальная игровая линейка с фокусом на комфорт во время долгих сессий. Модель сочетает лёгкий корпус, плотную посадку и чистое позиционирование звука для соревновательных дисциплин.":
            "Premium gaming lineup focused on comfort during long sessions. The model combines a lightweight body, secure fit, and clear positional audio for competitive play.",
          "40 мм драйверы, диапазон 20 Гц - 20 кГц, съёмный микрофон с шумоподавлением, кабель 1.8 м, вес 265 г, поддержка PC/PS/XBOX, мягкие амбушюры с эффектом памяти.":
            "40mm drivers, 20Hz-20kHz range, detachable noise-canceling microphone, 1.8m cable, 265g weight, PC/PS/XBOX support, memory-foam ear cushions.",
          "Любители шутеров, стримеры, киберспортсмены и посетители LAN-ивентов. Бренд выбирают клубы, где важны надёжность девайсов и удобство при 6-8 часовых игровых сессиях.":
            "Shooter fans, streamers, esports players, and LAN visitors. Chosen by clubs where device reliability and comfort for 6-8 hour sessions matter.",
          СОФТ: "SOFTWARE",
          ДЕВАЙСЫ: "DEVICES",
          ЖЕЛЕЗО: "HARDWARE",
          ТЕЛЕКОМ: "TELECOM",
          МАГАЗИНЫ: "SHOPS",
          БИЗНЕС: "BUSINESS",
          МЕБЕЛЬ: "FURNITURE",
          ХОРЕКА: "HORECA",
        }[v] ?? v)
      : v;
  const [selectedCategoryId, setSelectedCategoryId] = useState<string | null>("soft");
  const [selectedBrand, setSelectedBrand] = useState<string | null>(null);
  const [isSponsorModalOpen, setIsSponsorModalOpen] = useState(false);

  const activeCategory = selectedCategoryId
    ? PARTNER_CATEGORIES.find((c) => c.id === selectedCategoryId)
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

  const displayedBrands = activeCategory?.brands.slice(0, 9) ?? [];
  const selectedBrandKey = selectedBrand?.toLowerCase() ?? "";
  const isSpecialSectionBackground = selectedBrandKey === "smarthybrid" || selectedBrandKey === "smartshell";

  return (
    <section
      id="brands"
      className="sec-fullscreen relative overflow-hidden"
      style={{
        background: isSpecialSectionBackground ? "#101D2E" : "#050508",
        padding: "var(--sec-py) var(--sec-px)",
      }}
    >
      {isSpecialSectionBackground ? (
        <div
          className="pointer-events-none absolute inset-0 transition-opacity duration-500"
          style={{
            backgroundColor: "#101D2E",
            opacity: 1,
          }}
        />
      ) : null}
      {isSpecialSectionBackground ? null : (
        <div className="absolute inset-0 bg-dots opacity-14 pointer-events-none" />
      )}
      {/* Подсветка от выбранного бренда */}
      {isSpecialSectionBackground ? null : (
        <div
          className="pointer-events-none absolute inset-0 transition-opacity duration-500"
          style={{
            opacity: activeCategory ? 1 : 0,
            background: `radial-gradient(circle at 75% 40%, ${brandGlowColor}26 0%, transparent 55%)`,
          }}
        />
      )}

      <div style={{ maxWidth: "1380px", margin: "0 auto", position: "relative", zIndex: 10 }}>
        <div className="mb-6">
          <h2 className="gh-title text-white" style={{ fontSize: "var(--h2-sec)" }}>
            {isEn ? "Brand Expo" : "Выставка брендов"}
          </h2>
        </div>

        <div className="brands-showcase-grid">
          <div className="brands-left-pane">
            <div className="brands-product-visual">
              <div className="brands-product-placeholder">{selectedBrand ?? (isEn ? "Brand" : "Бренд")}</div>
            </div>

            <div className="brands-tab-content">{tr(MOCK_BRAND_TEXT.description)}</div>
          </div>

          <div className="brands-right-pane">
            <div className="brands-logo-grid">
              {displayedBrands.map((brandName) => {
                const isBrandActive = selectedBrand === brandName;
                return (
                  <button
                    key={brandName}
                    type="button"
                    onClick={() => setSelectedBrand(brandName)}
                    className={`brands-logo-card ${isBrandActive ? "is-active" : ""}`}
                  >
                    <span>{brandName}</span>
                  </button>
                );
              })}
              {Array.from({ length: Math.max(0, 9 - displayedBrands.length) }).map((_, idx) => (
                <button
                  key={`empty-${idx}`}
                  type="button"
                  onClick={() => setIsSponsorModalOpen(true)}
                  className="brands-logo-card is-empty"
                >
                  <span>{isEn ? "Registration" : "Регистрация"}</span>
                </button>
              ))}
            </div>

            <div className="brands-category-sidebar">
              {PARTNER_CATEGORIES.map((cat) => (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => setSelectedCategoryId(cat.id)}
                  className={`brands-category-btn ${selectedCategoryId === cat.id ? "is-active" : ""}`}
                >
                  {tr(cat.cat)}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
      <SponsorApplicationModal open={isSponsorModalOpen} onOpenChange={setIsSponsorModalOpen} />
    </section>
  );
}
