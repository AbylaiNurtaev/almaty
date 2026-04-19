import React, { useEffect, useRef, useState } from "react";
import { useLanguage } from "../context/LanguageContext";
import TwitchIcon from "../../assets/icons/twitch.png";
import TikTokIcon from "../../assets/icons/tiktok.png";
import InstagramIcon from "../../assets/icons/Instagram.webp";
import gerasimovImg from "../../assets/gerasimov.png";
import { StreamerApplicationModal } from "./StreamerApplicationModal";

const PORTRAITS = [
  "https://images.unsplash.com/photo-1634651754953-1565eca58d5c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxnYW1lciUyMHN0cmVhbWVyJTIwY29udGVudCUyMGNyZWF0b3IlMjBicm9hZGNhc3RpbmclMjBsaXZlJTIwbmVvbiUyMGRhcmt8ZW58MXx8fHwxNzcyODA1NDU5fDA&ixlib=rb-4.1.0&q=80&w=800",
  "https://images.unsplash.com/photo-1667355744870-df772b842b0b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlc3BvcnRzJTIwc3RyZWFtZXIlMjBjb250ZW50JTIwY3JlYXRvciUyMGdhbWluZyUyMGhlYWRzZXQlMjBwb3J0cmFpdCUyMG5lb258ZW58MXx8fHwxNzcyODAzOTE2fDA&ixlib=rb-4.1.0&q=80&w=800",
  "https://images.unsplash.com/photo-1515295527612-cb8132ecb496?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlc3BvcnRzJTIwdG91cm5hbWVudCUyMHByb2Zlc3Npb25hbCUyMHBsYXllciUyMGhlYWRzZXQlMjBmb2N1c2VkJTIwY29tcGV0aXRpb258ZW58MXx8fHwxNzcyODA1NDU2fDA&ixlib=rb-4.1.0&q=80&w=800",
  "https://images.unsplash.com/photo-1713012003065-7ca32db003ef?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxnYW1pbmclMjB0b3VybmFtZW50JTIwcHJvJTIwcGxheWVyJTIwa2V5Ym9hcmQlMjBkYXJrJTIwUkdCfGVufDF8fHx8MTc3MjgwMzkxMnww&ixlib=rb-4.1.0&q=80&w=800",
];

const STREAMERS = [
  { name: "Daniil Gerasimov", role: "PUBG",           color: "#F97316", img: 3, followers: "1.1M", platform: "YouTube", featured: false },
  { name: "Buster",           role: "CS2",           color: "#FF6500", img: 0, followers: "2.1M", platform: "Twitch",  featured: true },
  { name: "Bratishkin",       role: "Entertainment",  color: "#00E5FF", img: 1, followers: "5.8M", platform: "YouTube", featured: false },
  { name: "Del1ght",          role: "Dota 2",         color: "#7C3AED", img: 2, followers: "1.4M", platform: "Twitch",  featured: false },
  { name: "Sasavot",          role: "PUBG",           color: "#F5B800", img: 3, followers: "890K",  platform: "YouTube", featured: false },
  { name: "Zubarev",          role: "CS2",            color: "#00D97E", img: 0, followers: "1.2M", platform: "Twitch",  featured: false },
  { name: "Korya",            role: "Entertainment",  color: "#F03558", img: 1, followers: "3.2M", platform: "YouTube", featured: false },
  { name: "Dmitrii Lixx",     role: "Dota 2",         color: "#8B5CF6", img: 2, followers: "670K",  platform: "Twitch",  featured: false },
  { name: "Erik Shokov",      role: "CS2",            color: "#06B6D4", img: 0, followers: "980K",  platform: "Twitch",  featured: false },
];

const PLAT_COLOR: Record<string, string> = { Twitch: "#9147FF", YouTube: "#FF0000" };

const SOCIALS: Record<
  string,
  { twitch?: string; tiktok?: string; instagram?: string }
> = {
  Buster: {
    twitch: "https://www.twitch.tv/buster",
    tiktok: "https://www.tiktok.com/@bustersworld4",
    instagram: "https://www.instagram.com/busterzy",
  },
  Bratishkin: {
    twitch: "https://www.twitch.tv/bratishkinoff",
    tiktok: "https://www.tiktok.com/@nebratishkin",
    instagram: "https://www.instagram.com/br4tishkin",
  },
  Del1ght: {
    twitch: "https://www.twitch.tv/del1ght",
  },
  Sasavot: {
    twitch: "https://www.twitch.tv/sasavot",
    instagram: "https://www.instagram.com/sasavot_rofls",
  },
  Zubarev: {
    twitch: "https://www.twitch.tv/zubarev",
    tiktok: "https://www.tiktok.com/@zubarefff",
  },
  Korya: {
    twitch: "https://www.twitch.tv/korya_mc",
  },
  "Dmitrii Lixx": {
    twitch: "https://www.twitch.tv/dmitry_lixxx",
    instagram: "https://www.instagram.com/dima_lixx/",
  },
};

const LEFT_INDICES = [0, 1, 2, 3, 4, 5];   // 6 стримеров слева (3×2)
const RIGHT_INDICES = [6, 7, 8];            // 3 стримера справа + ячейка «ещё»
const STREAMERS_VIDEO_URL =
  "https://event-amaz-bucket.s3.eu-north-1.amazonaws.com/%D0%92%D0%95%D0%A0%D0%A2%D0%98%D0%9A%D0%90%D0%9B%D0%9A%D0%90+(1).mp4";

export function StreamersSection() {
  const { language } = useLanguage();
  const isEn = language === "en";
  const [selectedId, setSelectedId] = useState(0);
  const [isVideoVisible, setIsVideoVisible] = useState(false);
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const [isStreamerModalOpen, setIsStreamerModalOpen] = useState(false);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const previewVideoRef = useRef<HTMLVideoElement | null>(null);
  const selected = STREAMERS[selectedId];
  const isDaniilSelected = selected.name === "Daniil Gerasimov";

  useEffect(() => {
    setIsVideoVisible(false);
    setIsVideoPlaying(false);
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }
  }, [selectedId]);

  useEffect(() => {
    if (isVideoVisible && videoRef.current) {
      videoRef.current.play().catch(() => {
        setIsVideoPlaying(false);
      });
    }
  }, [isVideoVisible]);

  useEffect(() => {
    if (!isDaniilSelected || isVideoVisible || !previewVideoRef.current) return;
    const el = previewVideoRef.current;
    const setPreviewFrame = () => {
      try {
        el.currentTime = 1.2;
      } catch {
        // Браузер может временно блокировать seek до готовности метаданных.
      }
    };
    el.addEventListener("loadedmetadata", setPreviewFrame, { once: true });
    return () => {
      el.removeEventListener("loadedmetadata", setPreviewFrame);
    };
  }, [isDaniilSelected, isVideoVisible]);

  const renderStreamerCard = (s: typeof STREAMERS[0], index: number, isSelected: boolean) => {
    if (s.name !== "Daniil Gerasimov") {
      return (
        <button
          type="button"
          key={s.name}
          className="streamer-grid-filler flex flex-col items-center justify-center relative overflow-hidden"
          style={{
            border: "1px dashed rgba(255,255,255,0.08)",
            background: "rgba(255,255,255,0.02)",
            minHeight: "200px",
            cursor: "pointer",
          }}
          onClick={() => setIsStreamerModalOpen(true)}
        >
          <div className="absolute inset-0 bg-dots opacity-20 pointer-events-none" />
          <span
            className="relative z-10 mt-0.5"
            style={{
              fontFamily: "'Barlow Condensed',sans-serif",
              fontSize: "1.8rem",
              letterSpacing: "0.24em",
              color: "rgba(255,255,255,0.26)",
            }}
          >
            +
          </span>
          <span
            className="relative z-10 mt-1"
            style={{
              fontFamily: "'Barlow Condensed',sans-serif",
              fontSize: "0.45rem",
              letterSpacing: "0.3em",
              color: "rgba(255,255,255,0.12)",
              textTransform: "uppercase",
            }}
          >
            {isEn ? "soon" : "скоро"}
          </span>
        </button>
      );
    }

    return (
      <button
        type="button"
        key={s.name}
        className="streamer-card w-full text-left"
        style={{
          border: isSelected ? `1px solid ${s.color}55` : "1px solid rgba(255,255,255,0.06)",
          minHeight: "200px",
        }}
        onClick={() => setSelectedId(index)}
      >
        <img
          src={gerasimovImg}
          alt={s.name}
          className="absolute inset-0 w-full h-full object-cover"
          style={{
            filter: isSelected ? "brightness(0.4) saturate(0.7)" : "brightness(0.2) saturate(0.35)",
            transition: "filter 0.35s ease",
          }}
        />
        <div
          className="absolute inset-0"
          style={{ background: "linear-gradient(to top, rgba(5,5,8,0.98) 0%, rgba(5,5,8,0.25) 55%, transparent 100%)" }}
        />
        {isSelected && (
          <div
            className="absolute inset-0"
            style={{ background: `linear-gradient(to top, ${s.color}18 0%, transparent 60%)` }}
          />
        )}
        <div
          className="absolute bottom-0 left-0 right-0 h-px transition-opacity duration-300"
          style={{
            background: `linear-gradient(90deg, transparent, ${s.color}, transparent)`,
            opacity: isSelected ? 1 : 0,
          }}
        />
        <div
          className="absolute top-0 left-0 bottom-0 w-[2px] transition-opacity duration-300"
          style={{ background: s.color, opacity: isSelected ? 0.9 : 0 }}
        />
        <div className="absolute bottom-0 left-0 right-0 p-4 z-10">
          <span
            className="tag-angled mb-2 inline-block"
            style={{
              background: isSelected ? s.color : "rgba(255,255,255,0.06)",
              color: isSelected ? "#040410" : "rgba(255,255,255,0.4)",
              border: isSelected ? undefined : "1px solid rgba(255,255,255,0.1)",
              fontSize: "0.5rem",
              letterSpacing: "0.25em",
            }}
          >
            {s.role}
          </span>
          <div className="gh-mono text-white" style={{ fontSize: "1.1rem" }}>{s.name}</div>
        </div>
      </button>
    );
  };

  return (
    <section
      id="streamers"
      className="sec-fullscreen relative overflow-hidden"
      style={{
        background: "#09091A",
        padding: "clamp(28px, 3.5vw, 44px) var(--sec-px) clamp(36px, 4vw, 56px) var(--sec-px)",
      }}
    >
      <div className="absolute inset-0 bg-dots opacity-14 pointer-events-none" />
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: "radial-gradient(ellipse 65% 55% at 95% 30%, rgba(0,229,255,0.055) 0%, transparent 70%)" }}
      />

      <div
        style={{
          maxWidth: "1380px",
          margin: "0 auto",
          position: "relative",
          zIndex: 10,
          paddingBottom: "56px", // запас снизу под футер
        }}
      >

        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-10 mb-6" style={{ marginTop: "60px" }}>
          <div>
            <h2
              className="gh-title text-white"
              style={{ fontSize: "clamp(2.2rem, 3.4vw, 3.6rem)" }}
            >
              {isEn ? "Streamers and " : "Стримеры и "}
              <span style={{ color: "var(--c-cyan,#00E5FF)" }}>
                {isEn ? "influencers" : "инфлюенсеры"}
              </span>
            </h2>
          </div>
        </div>

        {/* Layout на всю ширину: слева стримеры | центр видеобращение | справа стримеры */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_auto_1fr] gap-4 lg:gap-6 items-stretch">
          {/* Слева — стримеры (3×2) */}
          <div className="grid grid-cols-2 grid-rows-3 gap-3 order-1 min-w-0">
            {LEFT_INDICES.map((i) => renderStreamerCard(STREAMERS[i], i, selectedId === i))}
          </div>

          {/* По центру — видеобращение (9:16), увеличенный блок */}
          <div className="flex justify-center order-2 min-h-[320px] sm:min-h-[360px] min-w-0">
            <div
              className="streamer-card w-full max-w-[320px] lg:max-w-[380px] flex flex-col overflow-hidden"
              style={{
                aspectRatio: "9/16",
                border: `1px solid ${selected.color}22`,
              }}
            >
              {isDaniilSelected && isVideoVisible ? (
                <>
                  <video
                    ref={videoRef}
                    src={STREAMERS_VIDEO_URL}
                    className="absolute inset-0 w-full h-full object-cover object-top"
                    playsInline
                    preload="metadata"
                    onPlay={() => setIsVideoPlaying(true)}
                    onPause={() => setIsVideoPlaying(false)}
                  />
                  <div
                    className="absolute inset-0"
                    style={{
                      background: "linear-gradient(to top, rgba(5,5,8,0.72) 0%, rgba(5,5,8,0.12) 45%, rgba(5,5,8,0.24) 100%)",
                    }}
                  />
                </>
              ) : isDaniilSelected ? (
                <>
                  <video
                    ref={previewVideoRef}
                    src={STREAMERS_VIDEO_URL}
                    className="absolute inset-0 w-full h-full object-cover object-top"
                    playsInline
                    preload="metadata"
                  />
                  <div
                    className="absolute inset-0"
                    style={{
                      background: `linear-gradient(to top, rgba(5,5,8,0.98) 0%, rgba(5,5,8,0.4) 50%, ${selected.color}0A 100%)`,
                    }}
                  />
                </>
              ) : (
                <>
                  <img
                    src={PORTRAITS[selected.img]}
                    alt={selected.name}
                    className="absolute inset-0 w-full h-full object-cover object-top"
                    style={{ filter: "brightness(0.35) saturate(0.7)" }}
                  />
                  <div
                    className="absolute inset-0"
                    style={{
                      background: `linear-gradient(to top, rgba(5,5,8,0.98) 0%, rgba(5,5,8,0.4) 50%, ${selected.color}0A 100%)`,
                    }}
                  />
                </>
              )}
              <div
                className="absolute top-0 left-0 bottom-0 w-[3px]"
                style={{ background: `linear-gradient(to bottom, ${selected.color}, ${selected.color}33)` }}
              />
              <div
                className="absolute top-0 left-0 right-0 h-px"
                style={{ background: `linear-gradient(90deg, ${selected.color}, transparent 60%)` }}
              />
              {/* Кнопка запуска/паузы в фирменном стиле */}
              {isDaniilSelected ? (
                <div className="absolute inset-0 flex items-center justify-center z-10 pointer-events-none">
                  <button
                    type="button"
                    className="w-14 h-14 rounded-full flex items-center justify-center pointer-events-auto"
                    style={{ background: `${selected.color}22`, border: `2px solid ${selected.color}` }}
                    onClick={() => {
                      if (!isVideoVisible) {
                        setIsVideoVisible(true);
                        return;
                      }
                      if (!videoRef.current) return;
                      if (isVideoPlaying) {
                        videoRef.current.pause();
                      } else {
                        videoRef.current.play().catch(() => {});
                      }
                    }}
                    aria-label={isVideoPlaying ? (isEn ? "Pause video message" : "Пауза видеобращения") : (isEn ? "Play video message" : "Запустить видеобращение")}
                  >
                    {isVideoPlaying ? (
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" style={{ color: selected.color }}>
                        <rect x="7" y="6" width="3.5" height="12" fill="currentColor" />
                        <rect x="13.5" y="6" width="3.5" height="12" fill="currentColor" />
                      </svg>
                    ) : (
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" style={{ color: selected.color }}>
                        <path d="M8.5 7v10l10.5-5L8.5 7z" fill="currentColor" />
                      </svg>
                    )}
                  </button>
                </div>
              ) : (
                <div className="absolute inset-0 flex items-center justify-center z-10">
                  <div
                    className="w-14 h-14 rounded-full flex items-center justify-center"
                    style={{ background: `${selected.color}22`, border: `2px solid ${selected.color}` }}
                  >
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" style={{ color: selected.color }}>
                      <path d="M8.5 7v10l10.5-5L8.5 7z" fill="currentColor" />
                    </svg>
                  </div>
                </div>
              )}
              <div className="absolute bottom-0 left-0 right-0 p-5 z-20">
                <span
                  className="tag-angled mb-2 inline-block"
                  style={{ background: selected.color, color: "#040410", fontSize: "0.5rem", letterSpacing: "0.25em" }}
                >
                  {isDaniilSelected ? (isEn ? "Video Message" : "Видеобращение") : selected.role}
                </span>
                <div className="gh-title text-white mb-2" style={{ fontSize: "clamp(1.15rem, 3.5vw, 1.6rem)" }}>
                  {selected.name}
                </div>
                <div className="flex items-center gap-3 flex-wrap">
                  <div className="flex items-center gap-2">
                    {SOCIALS[selected.name]?.tiktok && (
                      <a
                        href={SOCIALS[selected.name]!.tiktok}
                        target="_blank"
                        rel="noreferrer"
                      >
                        <img
                          src={TikTokIcon}
                          alt="TikTok"
                          className="shrink-0"
                          style={{ width: "18px", height: "18px" }}
                        />
                      </a>
                    )}
                    {SOCIALS[selected.name]?.instagram && (
                      <a
                        href={SOCIALS[selected.name]!.instagram}
                        target="_blank"
                        rel="noreferrer"
                      >
                        <img
                          src={InstagramIcon}
                          alt="Instagram"
                          className="shrink-0"
                          style={{ width: "18px", height: "18px" }}
                        />
                      </a>
                    )}
                    {SOCIALS[selected.name]?.twitch && (
                      <a
                        href={SOCIALS[selected.name]!.twitch}
                        target="_blank"
                        rel="noreferrer"
                      >
                        <img
                          src={TwitchIcon}
                          alt="Twitch"
                          className="shrink-0"
                          style={{ width: "18px", height: "18px" }}
                        />
                      </a>
                    )}
                  </div>
                  <div className="flex items-center gap-2">
                    {selected.platform !== "YouTube" && (
                      <span
                        style={{
                          fontFamily: "'Barlow',sans-serif",
                          fontSize: "0.9rem",
                          letterSpacing: "0.03em",
                          color: "rgba(255,255,255,0.5)",
                        }}
                      >
                        {selected.platform}
                      </span>
                    )}
                    <span
                      style={{
                        fontFamily: "'Barlow Condensed',sans-serif",
                        fontSize: "0.85rem",
                        color: "rgba(255,255,255,0.6)",
                        letterSpacing: "0.05em",
                      }}
                    >
                      {selected.followers}
                    </span>
                    {PLAT_COLOR[selected.platform] &&
                      (selected.name === "Daniil Gerasimov" && selected.platform === "YouTube" ? (
                        <a
                          href="https://www.youtube.com/c/DaniilGerasimov"
                          target="_blank"
                          rel="noreferrer"
                          className="tag-angled"
                          style={{
                            background: `${PLAT_COLOR[selected.platform]}22`,
                            color: "#FFFFFF",
                            border: `1px solid ${PLAT_COLOR[selected.platform]}55`,
                            fontSize: "0.5rem",
                            letterSpacing: "0.16em",
                            marginLeft: "2px",
                            cursor: "pointer",
                            textDecoration: "none",
                          }}
                        >
                          {selected.platform}
                        </a>
                      ) : (
                        <span
                          className="tag-angled"
                          style={{
                            background: `${PLAT_COLOR[selected.platform]}22`,
                            color: PLAT_COLOR[selected.platform],
                            border: `1px solid ${PLAT_COLOR[selected.platform]}55`,
                            fontSize: "0.5rem",
                            letterSpacing: "0.16em",
                            marginLeft: "2px",
                          }}
                        >
                          {selected.platform}
                        </span>
                      ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Справа — стримеры + «ещё» + заглушки (3×2) */}
          <div className="grid grid-cols-2 grid-rows-3 gap-3 order-3 min-w-0">
            {RIGHT_INDICES.map((i) => renderStreamerCard(STREAMERS[i], i, selectedId === i))}
            {/* Ячейка «ещё» */}
            <button
              type="button"
              className="streamer-grid-filler flex flex-col items-center justify-center relative overflow-hidden"
              style={{
                border: "1px dashed rgba(255,255,255,0.08)",
                background: "rgba(255,255,255,0.02)",
                minHeight: "200px",
                cursor: "pointer",
              }}
              onClick={() => setIsStreamerModalOpen(true)}
            >
              <div className="absolute inset-0 bg-dots opacity-20 pointer-events-none" />
              <span
                className="relative z-10 mt-0.5"
                style={{
                  fontFamily: "'Barlow Condensed',sans-serif",
                  fontSize: "1.8rem",
                  letterSpacing: "0.24em",
                  color: "rgba(255,255,255,0.26)",
                }}
              >
                +
              </span>
              <span
                className="relative z-10 mt-1"
                style={{
                  fontFamily: "'Barlow Condensed',sans-serif",
                  fontSize: "0.45rem",
                  letterSpacing: "0.3em",
                  color: "rgba(255,255,255,0.12)",
                  textTransform: "uppercase",
                }}
              >
                {isEn ? "soon" : "скоро"}
              </span>
            </button>
            {/* Две заглушки */}
            {[1, 2].map((n) => (
              <div
                key={n}
                className="streamer-grid-filler flex flex-col items-center justify-center relative overflow-hidden"
                style={{
                  border: "1px dashed rgba(255,255,255,0.06)",
                  background: "rgba(255,255,255,0.015)",
                  minHeight: "200px",
                }}
              >
                <span
                  className="gh-title"
                  style={{ fontSize: "0.9rem", color: "rgba(255,255,255,0.08)" }}
                >
                  TBA
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
      <StreamerApplicationModal open={isStreamerModalOpen} onOpenChange={setIsStreamerModalOpen} />
    </section>
  );
}
