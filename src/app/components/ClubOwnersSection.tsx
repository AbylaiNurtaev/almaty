import React, { useState } from "react";
import { Users, Handshake, Star, UserPlus, ArrowRight } from "lucide-react";
import { ClubRegistrationModal } from "./ClubRegistrationModal";

const BENEFITS = [
  { Icon: Users,     title: "3 бесплатных пропуска",  color: "#00D4F5", desc: "Каждый зарегистрированный владелец компьютерного клуба получает 3 бесплатных пропуска на фестиваль для своей команды — без условий." },
  { Icon: Handshake, title: "Нетворкинг",     color: "#6B21E8", desc: "Эксклюзивные нетворкинг-сессии с лидерами индустрии, представителями брендов и владельцами клубов со всего Казахстана." },
  { Icon: Star,      title: "Доступ к брендам",   color: "#E8A800", desc: "Прямой доступ к 40+ представителям брендов. Эксклюзивные партнёрства и франшизы оборудования." },
  { Icon: UserPlus,  title: "Зарегистрировать клуб", color: "#00E5FF", desc: "Зарегистрируйте свой компьютерный клуб и получите 3 бесплатных пропуска, доступ к нетворкинг-мероприятиям и партнёрству с брендами.", isAction: true },
];

export function ClubOwnersSection() {
  const [clubModalOpen, setClubModalOpen] = useState(false);
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
            <div className="p-12 md:p-16 lg:border-r max-md:!p-4 max-md:!py-5 max-md:border-b max-md:border-r-0" style={{ borderColor: "rgba(255,255,255,0.05)" }}>
              <div className="eyebrow max-md:!mb-1 max-md:!text-[0.52rem] max-md:!tracking-[0.18em]">Специальная программа</div>
              <h2 className="gh-title text-white mb-6 max-md:!mb-3 max-md:!text-[clamp(1.2rem,4.8vw,1.65rem)] max-md:!leading-tight" style={{ fontSize: "clamp(2rem, 3.4vw, 3.4rem)" }}>
                Для<br />
                <span style={{ color: "var(--c-cyan,#00E5FF)" }}>владельцев компьютерных клубов</span>
              </h2>
              <p className="max-md:!text-[0.84rem] max-md:!leading-relaxed max-md:!mb-4" style={{ fontFamily: "'Barlow',sans-serif", fontSize: "1rem", letterSpacing: "0.03em", color: "rgba(255,255,255,0.42)", lineHeight: 1.82, width: "100%", maxWidth: "100%", marginBottom: "36px" }}>
                GAMEHUB предлагает специальную программу для владельцев компьютерных клубов по всему Казахстану. Зарегистрируйте свой клуб и получите{" "}
                <span style={{ color: "rgba(255,255,255,0.86)" }}>3 бесплатных пропуска</span>, эксклюзивные нетворкинг-мероприятия и прямые возможности партнёрства с брендами.
              </p>

              {/* Highlighted offer */}
              <div className="flex items-center gap-6 p-6 mb-10 max-md:flex-col max-md:items-start max-md:gap-3 max-md:!p-4 max-md:!mb-5"
                style={{ border: "1px solid rgba(0,229,255,0.22)", background: "rgba(0,229,255,0.05)", width: "100%", maxWidth: "100%" }}>
                <div className="flex items-center justify-center shrink-0 max-md:!w-12 max-md:!h-12"
                  style={{ width: "58px", height: "58px", background: "rgba(0,229,255,0.14)", border: "1px solid rgba(0,229,255,0.32)", clipPath: "polygon(10% 0,100% 0,90% 100%,0 100%)" }}>
                  <Users size={24} className="text-[#00E5FF] max-md:!w-5 max-md:!h-5" />
                </div>
                <div className="min-w-0">
                  <div className="gh-title text-white max-md:!text-[1.15rem] max-md:!leading-tight" style={{ fontSize: "2rem" }}>
                    <span style={{ color: "var(--c-cyan,#00E5FF)" }}>3 бесплатных</span> пропуска
                  </div>
                  <div className="max-md:!text-[0.72rem]" style={{ fontFamily: "'Barlow',sans-serif", fontSize: "0.82rem", letterSpacing: "0.03em", color: "rgba(255,255,255,0.34)", marginTop: "4px" }}>На каждый зарегистрированный клуб</div>
                </div>
              </div>
            </div>

            {/* Right: benefits */}
            <div>
              {BENEFITS.map((b, i) => {
                const Icon = b.Icon;
                const isAction = "isAction" in b && b.isAction;
                const cardContent = (
                  <>
                    <div
                      className={isAction ? "absolute left-0 top-0 bottom-0 w-[3px] opacity-100" : "absolute left-0 top-0 bottom-0 w-[2px] opacity-0 group-hover:opacity-60 transition-opacity duration-300"}
                      style={{ background: b.color }}
                    />
                    <div className="flex items-center justify-center shrink-0 transition-all duration-350 group-hover:scale-110"
                      style={{ width: isAction ? "56px" : "52px", height: isAction ? "56px" : "52px", background: `${b.color}${isAction ? "18" : "12"}`, border: `1px solid ${b.color}${isAction ? "48" : "32"}`, clipPath: "polygon(10% 0,100% 0,90% 100%,0 100%)" }}>
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
                  "group relative flex items-start gap-7 p-10 md:p-12 max-md:!gap-3 max-md:!p-4 max-md:!py-4 transition-all duration-200 " +
                  (isAction ? "hover:bg-[rgba(0,229,255,0.06)]" : "hover:bg-white/[0.015]");
                const cardStyle = isAction
                  ? {
                      borderTop: "1px solid rgba(255,255,255,0.05)",
                      borderLeft: "1px solid rgba(0,229,255,0.25)",
                      borderRight: "1px solid rgba(0,229,255,0.25)",
                      borderBottom: "1px solid rgba(0,229,255,0.25)",
                      background: "rgba(0,229,255,0.04)",
                      margin: "12px",
                      boxShadow: "0 0 24px rgba(0,229,255,0.06)",
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
                  <div key={b.title} className={cardClass} style={cardStyle}>
                    {cardContent}
                  </div>
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