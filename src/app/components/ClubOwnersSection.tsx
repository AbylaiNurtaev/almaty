import React, { useState } from "react";
import { Users, Handshake, Star, UserPlus, ArrowRight } from "lucide-react";
import { ClubRegistrationModal } from "./ClubRegistrationModal";
import { useLanguage } from "../context/LanguageContext";

const BENEFITS = [
  { Icon: Users,     title: "3 бесплатных пропуска",  color: "#00D4F5", desc: "Каждый зарегистрированный владелец компьютерного клуба получает 3 бесплатных пропуска на фестиваль для своей команды — без условий." },
  { Icon: Handshake, title: "Нетворкинг",     color: "#6B21E8", desc: "Эксклюзивные нетворкинг-сессии с лидерами индустрии, представителями брендов и владельцами клубов со всего Казахстана." },
  { Icon: Star,      title: "Доступ к брендам",   color: "#E8A800", desc: "Прямой доступ к 40+ представителям брендов. Эксклюзивные партнёрства и франшизы оборудования." },
  { Icon: UserPlus,  title: "Зарегистрировать клуб", color: "#00E5FF", desc: "Зарегистрируйте свой компьютерный клуб и получите 3 бесплатных пропуска, доступ к нетворкинг-мероприятиям и партнёрству с брендами.", isAction: true },
];

const OWNER_TOPICS = [
  {
    heading: "3 бесплатных пропуска",
    description:
      "Зарегистрируйте свой клуб и получите 3 бесплатных пропуска для вашей команды на фестиваль.",
    offerTitle: "3 бесплатных пропуска",
    offerSubtitle: "На каждый зарегистрированный клуб",
    accentColor: "#00E5FF",
    Icon: Users,
  },
  {
    heading: "Нетворкинг",
    description:
      "Получите доступ к закрытым нетворкинг-сессиям с представителями брендов, франшиз и владельцами клубов из разных регионов Казахстана. Обменивайтесь опытом и находите партнеров для роста.",
    offerTitle: "Эксклюзивный нетворкинг",
    offerSubtitle: "Только для владельцев клубов",
    accentColor: "#6B21E8",
    Icon: Handshake,
  },
  {
    heading: "Доступ к брендам",
    description:
      "Выходите на прямой контакт с 40+ брендами в одном месте: обсуждайте условия поставок, партнерские программы и возможности для обновления или масштабирования вашего клуба.",
    offerTitle: "Прямой доступ к брендам",
    offerSubtitle: "Партнерства и специальные условия",
    accentColor: "#E8A800",
    Icon: Star,
  },
] as const;

export function ClubOwnersSection() {
  const { language } = useLanguage();
  const isEn = language === "en";
  const tr = (v: string) =>
    isEn
      ? ({
          "3 бесплатных пропуска": "3 free passes",
          "Каждый зарегистрированный владелец компьютерного клуба получает 3 бесплатных пропуска на фестиваль для своей команды — без условий.":
            "Every registered computer club owner receives 3 free festival passes for their team - no conditions.",
          "Нетворкинг": "Networking",
          "Эксклюзивные нетворкинг-сессии с лидерами индустрии, представителями брендов и владельцами клубов со всего Казахстана.":
            "Exclusive networking sessions with industry leaders, brand representatives, and club owners from across Kazakhstan.",
          "Доступ к брендам": "Brand access",
          "Прямой доступ к 40+ представителям брендов. Эксклюзивные партнёрства и франшизы оборудования.":
            "Direct access to 40+ brand representatives. Exclusive partnerships and equipment franchise opportunities.",
          "Зарегистрировать клуб": "Register a club",
          "Зарегистрируйте свой компьютерный клуб и получите 3 бесплатных пропуска, доступ к нетворкинг-мероприятиям и партнёрству с брендами.":
            "Register your computer club and get 3 free passes, access to networking events, and brand partnerships.",
          "Зарегистрируйте свой клуб и получите 3 бесплатных пропуска для вашей команды на фестиваль.":
            "Register your club and get 3 free passes for your team at the festival.",
          "На каждый зарегистрированный клуб": "For every registered club",
          "Получите доступ к закрытым нетворкинг-сессиям с представителями брендов, франшиз и владельцами клубов из разных регионов Казахстана. Обменивайтесь опытом и находите партнеров для роста.":
            "Get access to private networking sessions with brand reps, franchises, and club owners from different regions of Kazakhstan. Share experience and find growth partners.",
          "Эксклюзивный нетворкинг": "Exclusive networking",
          "Только для владельцев клубов": "Only for club owners",
          "Выходите на прямой контакт с 40+ брендами в одном месте: обсуждайте условия поставок, партнерские программы и возможности для обновления или масштабирования вашего клуба.":
            "Connect directly with 40+ brands in one place: discuss supply terms, partner programs, and opportunities to upgrade or scale your club.",
          "Прямой доступ к брендам": "Direct brand access",
          "Партнерства и специальные условия": "Partnerships and special terms",
          "GAMEHUB предлагает специальную программу для владельцев компьютерных клубов по всему Казахстану. Сейчас в фокусе:":
            "GAMEHUB offers a special program for computer club owners across Kazakhstan. Current focus:",
        }[v] ?? v)
      : v;
  const benefits = BENEFITS.map((b) => ({ ...b, title: tr(b.title), desc: tr(b.desc) }));
  const topics = OWNER_TOPICS.map((o) => ({
    ...o,
    heading: tr(o.heading),
    description: tr(o.description),
    offerTitle: tr(o.offerTitle),
    offerSubtitle: tr(o.offerSubtitle),
  }));
  const [clubModalOpen, setClubModalOpen] = useState(false);
  const [activeBenefitIndex, setActiveBenefitIndex] = useState(0);
  const activeTopic = topics[activeBenefitIndex];
  const ActiveTopicIcon = activeTopic.Icon;

  return (
    <section id="owners" className="sec-fullscreen club-owners-section relative overflow-hidden max-md:!pt-[max(10px,env(safe-area-inset-top))] max-md:!pb-4 max-md:!px-3"
      style={{ background: "#050508", padding: "var(--sec-py) var(--sec-px)" }}>

      <div className="absolute inset-0 bg-grid opacity-50 pointer-events-none" />
      <div className="absolute inset-0 pointer-events-none"
        style={{ background: "radial-gradient(ellipse 70% 55% at 50% 55%, rgba(0,229,255,0.045) 0%, transparent 65%)" }} />

      <div style={{ maxWidth: "1380px", margin: "0 auto", position: "relative", zIndex: 10 }}>
        <div className="relative overflow-hidden"
          style={{ border: "1px solid rgba(0,229,255,0.12)", background: "rgba(0,229,255,0.02)" }}>
          <div className="absolute top-0 left-0 right-0 h-px"
            style={{ background: "linear-gradient(90deg, transparent, var(--c-cyan,#00E5FF), transparent)" }} />

          <div className="grid lg:grid-cols-2">
            {/* Left: text */}
            <div className="p-8 md:p-10 lg:border-r max-md:!p-4 max-md:!py-4 max-md:border-b max-md:border-r-0" style={{ borderColor: "rgba(255,255,255,0.05)" }}>
              <h2 className="gh-title text-white mb-6 max-md:!mb-3 max-md:!text-[clamp(1.2rem,4.8vw,1.65rem)] max-md:!leading-tight" style={{ fontSize: "clamp(2rem, 3.4vw, 3.4rem)" }}>
                {isEn ? "For" : "Для"}<br />
                <span style={{ color: "var(--c-cyan,#00E5FF)" }}>
                  {isEn ? "computer club owners" : "владельцев компьютерных клубов"}
                </span>
              </h2>
              <p className="max-md:!text-[0.84rem] max-md:!leading-relaxed max-md:!mb-3" style={{ fontFamily: "'Barlow',sans-serif", fontSize: "1rem", letterSpacing: "0.03em", color: "rgba(255,255,255,0.42)", lineHeight: 1.72, width: "100%", maxWidth: "100%", marginBottom: "24px" }}>
                {tr("GAMEHUB предлагает специальную программу для владельцев компьютерных клубов по всему Казахстану. Сейчас в фокусе:")}{" "}
                <span style={{ color: "rgba(255,255,255,0.86)" }}>{activeTopic.heading}</span>. {activeTopic.description}
              </p>

              {/* Highlighted offer */}
              <div className="flex items-center gap-5 p-5 mb-6 max-md:flex-col max-md:items-start max-md:gap-3 max-md:!p-3 max-md:!mb-4"
                style={{ border: `1px solid ${activeTopic.accentColor}55`, background: `${activeTopic.accentColor}12`, width: "100%", maxWidth: "100%" }}>
                <div className="flex items-center justify-center shrink-0 max-md:!w-12 max-md:!h-12"
                  style={{ width: "52px", height: "52px", background: `${activeTopic.accentColor}22`, border: `1px solid ${activeTopic.accentColor}66`, clipPath: "polygon(10% 0,100% 0,90% 100%,0 100%)" }}>
                  <ActiveTopicIcon size={24} style={{ color: activeTopic.accentColor }} className="max-md:!w-5 max-md:!h-5" />
                </div>
                <div className="min-w-0">
                  <div className="gh-title text-white max-md:!text-[1.05rem] max-md:!leading-tight" style={{ fontSize: "1.7rem" }}>
                    <span style={{ color: activeTopic.accentColor }}>{activeTopic.offerTitle}</span>
                  </div>
                  <div className="max-md:!text-[0.72rem]" style={{ fontFamily: "'Barlow',sans-serif", fontSize: "0.82rem", letterSpacing: "0.03em", color: "rgba(255,255,255,0.34)", marginTop: "4px" }}>{activeTopic.offerSubtitle}</div>
                </div>
              </div>
            </div>

            {/* Right: benefits */}
            <div>
              {benefits.map((b, i) => {
                const Icon = b.Icon;
                const isAction = "isAction" in b && b.isAction;
                const isSelectableBenefit = !isAction;
                const isActiveSelectable = isSelectableBenefit && i === activeBenefitIndex;
                const cardContent = (
                  <>
                    <div
                      className={
                        isAction
                          ? "absolute left-0 top-0 bottom-0 w-[3px] opacity-100"
                          : isActiveSelectable
                            ? "absolute left-0 top-0 bottom-0 w-[3px] opacity-100"
                            : "absolute left-0 top-0 bottom-0 w-[2px] opacity-0 group-hover:opacity-60 transition-opacity duration-300"
                      }
                      style={{ background: b.color }}
                    />
                    <div className="flex items-center justify-center shrink-0 transition-all duration-350 group-hover:scale-110"
                      style={{ width: isAction ? "56px" : "52px", height: isAction ? "56px" : "52px", background: `${b.color}${isAction || isActiveSelectable ? "18" : "12"}`, border: `1px solid ${b.color}${isAction || isActiveSelectable ? "48" : "32"}`, clipPath: "polygon(10% 0,100% 0,90% 100%,0 100%)" }}>
                      <Icon size={isAction ? 22 : 20} style={{ color: b.color }} />
                    </div>
                    <div className="relative z-10 flex-1 flex items-center justify-between gap-4 max-md:flex-col max-md:items-stretch max-md:gap-2">
                      <div className="min-w-0">
                        <h3 className="gh-title text-white mb-3 max-md:!mb-1 max-md:!text-[0.95rem]" style={{ fontSize: isAction ? "1.5rem" : "1.35rem" }}>{b.title}</h3>
                        <p className="max-md:!text-[0.78rem] max-md:!leading-snug" style={{ fontFamily: "'Barlow',sans-serif", fontSize: "0.9rem", letterSpacing: "0.03em", color: "rgba(255,255,255,0.36)", lineHeight: 1.72 }}>{b.desc}</p>
                      </div>
                      {isAction && <ArrowRight size={22} style={{ color: b.color }} className="shrink-0 max-md:self-end max-md:!w-5 max-md:!h-5" />}
                    </div>
                  </>
                );
                const cardClass =
                  "group relative flex items-start gap-5 p-7 md:p-8 max-md:!gap-3 max-md:!p-3 max-md:!py-3 transition-all duration-200 " +
                  (isAction ? "hover:bg-[rgba(0,229,255,0.06)]" : isActiveSelectable ? "" : "hover:bg-white/[0.015]");
                const cardStyle = isAction
                  ? {
                      borderTop: "1px solid rgba(255,255,255,0.05)",
                      borderLeft: "1px solid rgba(0,229,255,0.25)",
                      borderRight: "1px solid rgba(0,229,255,0.25)",
                      borderBottom: "1px solid rgba(0,229,255,0.25)",
                      background: "rgba(0,229,255,0.04)",
                      margin: "8px",
                      boxShadow: "0 0 24px rgba(0,229,255,0.06)",
                    }
                  : isActiveSelectable
                    ? {
                        borderTop: i > 0 ? "1px solid rgba(255,255,255,0.05)" : "none",
                        borderLeft: `1px solid ${b.color}44`,
                        background: `${b.color}12`,
                      }
                    : { borderTop: i > 0 ? "1px solid rgba(255,255,255,0.05)" : "none" };
                return isAction ? (
                  <button
                    key={b.title}
                    type="button"
                    onClick={() => setClubModalOpen(true)}
                    className={cardClass + " club-owner-cta max-md:!m-2"}
                    style={{ ...cardStyle, width: "100%", textAlign: "left", cursor: "pointer" }}
                  >
                    {cardContent}
                  </button>
                ) : (
                  <button
                    key={b.title}
                    type="button"
                    onClick={() => setActiveBenefitIndex(i)}
                    className={cardClass}
                    style={{ ...cardStyle, width: "100%", textAlign: "left", cursor: "pointer" }}
                  >
                    {cardContent}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>
      <ClubRegistrationModal open={clubModalOpen} onOpenChange={setClubModalOpen} />
    </section>
  );
}