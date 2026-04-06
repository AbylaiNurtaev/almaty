"use client";

import { useState, useEffect } from "react";
import { Plus } from "lucide-react";
import { PARTNER_CATEGORIES } from "@/app/data/partnersCategories";
import { useLanguage } from "../context/LanguageContext";
import aulaBrandBg from "@/assets/brands/aula.png";
import darkprojectBrandBg from "@/assets/brands/darkproject.jpg";
import mchoseBrandBg from "@/assets/brands/mchose.webp";
import redragonBrandBg from "@/assets/brands/redragon.png";
import havitBrandLogo from "@/assets/brands/Logo_Havit.png";
import hyperpcBrandLogo from "@/assets/brands/hyperpc.png";
import smartHybridBrandLogo from "@/assets/brands/SmartHybrid.png";
import smartShellBrandLogo from "@/assets/brands/smart_shell.png";
import spinClubBrandLogo from "@/assets/brands/spinclub.png";
import zoneBrandLogo from "@/assets/brands/zone.png";
import headphoneSlide1 from "@/assets/headphones/6476335128.jpg";
import headphoneSlide2 from "@/assets/headphones/678c0c9cf0867ab0117ab1097ee8becc.webp";
import headphoneSlide3 from "@/assets/headphones/DSC02867_1.webp";
import headphoneSlide4 from "@/assets/headphones/best-gaming-headset.jpg";
import headphoneSlide5 from "@/assets/headphones/hx-hero-audio-cloud-alpha-s-lg.jpg";
import headphoneSlide6 from "@/assets/headphones/hyperx-cloud-alpha-s-review-07.jpg";
import headphoneSlide7 from "@/assets/headphones/hyperx-cloud-alpha-s-review-11.jpg";
import headphoneSlide8 from "@/assets/headphones/hyperx_cloud_alpha_002.jpg";
import headphoneSlide9 from "@/assets/headphones/shumopodavlenie-hyperx-cloud-alpha-s.jpg";

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

const DEVICE_BRAND_BACKGROUNDS: Record<string, string> = {
  DarkProject: darkprojectBrandBg,
  AULA: aulaBrandBg,
  MCHOSE: mchoseBrandBg,
  REDDRAGON: redragonBrandBg,
};

const BRAND_LOGOS: Record<string, string> = {
  darkproject: darkprojectBrandBg,
  aula: aulaBrandBg,
  mchose: mchoseBrandBg,
  reddragon: redragonBrandBg,
  redragon: redragonBrandBg,
  havit: havitBrandLogo,
  hyperpc: hyperpcBrandLogo,
  smarthybrid: smartHybridBrandLogo,
  smartshell: smartShellBrandLogo,
  spinclub: spinClubBrandLogo,
  zone: zoneBrandLogo,
};

const HEADPHONE_SLIDES = [
  headphoneSlide1,
  headphoneSlide2,
  headphoneSlide3,
  headphoneSlide4,
  headphoneSlide5,
  headphoneSlide6,
  headphoneSlide7,
  headphoneSlide8,
  headphoneSlide9,
];

type BrandTab = "description" | "specs" | "users";

const BRAND_TABS: { id: BrandTab; label: string }[] = [
  { id: "description", label: "Описание" },
  { id: "specs", label: "Характеристики" },
  { id: "users", label: "Пользуются" },
];

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
  const [activeTab, setActiveTab] = useState<BrandTab>("description");
  const [currentSlide, setCurrentSlide] = useState(0);
  const [slideVisible, setSlideVisible] = useState(true);

  const activeCategory = selectedCategoryId
    ? PARTNER_CATEGORIES.find((c) => c.id === selectedCategoryId)
    : null;

  useEffect(() => {
    let timeoutId: number | null = null;
    const interval = window.setInterval(() => {
      setSlideVisible(false);
      timeoutId = window.setTimeout(() => {
        setCurrentSlide((prev) => (prev + 1) % HEADPHONE_SLIDES.length);
        setSlideVisible(true);
      }, 350);
    }, 3000);

    return () => {
      window.clearInterval(interval);
      if (timeoutId) {
        window.clearTimeout(timeoutId);
      }
    };
  }, []);

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

  const activeBrandBackground =
    activeCategory?.id === "devices" && selectedBrand
      ? DEVICE_BRAND_BACKGROUNDS[selectedBrand] ?? null
      : null;

  const displayedBrands = activeCategory?.brands.slice(0, 9) ?? [];
  const selectedBrandKey = selectedBrand?.toLowerCase() ?? "";
  const isSpecialSectionBackground = selectedBrandKey === "smarthybrid" || selectedBrandKey === "smartshell";
  const specialSectionLogo = isSpecialSectionBackground
    ? BRAND_LOGOS[selectedBrandKey]
    : null;

  return (
    <section
      id="brands"
      className="sec-fullscreen relative overflow-hidden"
      style={{
        background: isSpecialSectionBackground ? "#101D2E" : "#050508",
        padding: "var(--sec-py) var(--sec-px)",
      }}
    >
      {isSpecialSectionBackground && specialSectionLogo ? (
        <div
          className="pointer-events-none absolute inset-0 transition-opacity duration-500"
          style={{
            backgroundColor: "#101D2E",
            backgroundImage: `radial-gradient(circle at 50% 35%, rgba(108, 164, 255, 0.34) 0%, rgba(16, 29, 46, 0.08) 46%, rgba(16, 29, 46, 0.98) 78%), url(${specialSectionLogo})`,
            backgroundRepeat: "no-repeat, no-repeat",
            backgroundPosition: "center, center",
            backgroundSize: "cover, min(220px, 22vw)",
            opacity: 0.9,
          }}
        />
      ) : null}
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
        <div className="mb-6">
          <h2 className="gh-title text-white" style={{ fontSize: "var(--h2-sec)" }}>
            {isEn ? "Brand Expo" : "Выставка брендов"}
          </h2>
        </div>

        <div className="brands-showcase-grid">
          <div className="brands-left-pane">
            <div
              style={{
                fontFamily: "'Barlow',sans-serif",
                fontSize: "clamp(1.15rem,1.9vw,1.9rem)",
                fontWeight: 700,
                color: "#fff",
                marginBottom: "16px",
              }}
            >
              {selectedBrand ?? (isEn ? "KD-1 Headset" : "Наушники KD-1")}
            </div>

            <div className="brands-product-visual">
              {activeBrandBackground ? (
                <img
                  src={HEADPHONE_SLIDES[currentSlide]}
                  alt={isEn ? "Product slide" : "Слайд продукта"}
                  className={`brands-product-image ${slideVisible ? "is-visible" : "is-hidden"}`}
                />
              ) : (
                <div className="brands-product-placeholder">PRODUCT</div>
              )}
              <div className="brands-dots">
                {HEADPHONE_SLIDES.map((_, idx) => (
                  <span key={idx} className={`brands-dot ${idx === currentSlide ? "is-active" : ""}`} />
                ))}
              </div>
            </div>

            <div className="brands-tab-buttons">
              {BRAND_TABS.map((tab) => (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setActiveTab(tab.id)}
                  className={`brands-tab-btn ${activeTab === tab.id ? "is-active" : ""}`}
                >
                  {tr(tab.label)}
                </button>
              ))}
            </div>

            <div className="brands-tab-content">{tr(MOCK_BRAND_TEXT[activeTab])}</div>
          </div>

          <div className="brands-right-pane">
            <div className="brands-logo-grid">
              {displayedBrands.map((brandName) => {
                const isBrandActive = selectedBrand === brandName;
                const logoSrc = BRAND_LOGOS[brandName.toLowerCase()];
                return (
                  <button
                    key={brandName}
                    type="button"
                    onClick={() => setSelectedBrand(brandName)}
                    className={`brands-logo-card ${isBrandActive ? "is-active" : ""}`}
                  >
                    {logoSrc ? (
                      <img src={logoSrc} alt={brandName} className="brands-logo-image" />
                    ) : (
                      <span>{brandName}</span>
                    )}
                  </button>
                );
              })}
              {Array.from({ length: Math.max(0, 9 - displayedBrands.length) }).map((_, idx) => (
                <div key={`empty-${idx}`} className="brands-logo-card is-empty">
                  <span>LOGO</span>
                  <Plus className="brands-empty-plus" aria-hidden="true" />
                </div>
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
    </section>
  );
}