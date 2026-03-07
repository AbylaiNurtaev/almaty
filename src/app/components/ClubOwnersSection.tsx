"use client";

import { useState } from "react";
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
    <section id="clubs" className="relative overflow-hidden"
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
            <div className="p-12 md:p-16 lg:border-r" style={{ borderColor: "rgba(255,255,255,0.05)" }}>
              <div className="eyebrow">Специальная программа</div>
              <h2 className="gh-title text-white mb-6" style={{ fontSize: "var(--h2-sec)" }}>
                Для владельцев<br />
                <span style={{ color: "var(--c-cyan,#00E5FF)" }}>компьютерных клубов</span>
              </h2>
              <p style={{ fontFamily: "'Barlow',sans-serif", fontSize: "1rem", color: "rgba(255,255,255,0.42)", lineHeight: 1.82, width: "100%", maxWidth: "100%", marginBottom: "36px" }}>
                GAMEHUB предлагает специальную программу для владельцев компьютерных клубов по всему Казахстану. Зарегистрируйте свой клуб и получите{" "}
                <span style={{ color: "rgba(255,255,255,0.86)" }}>3 бесплатных пропуска</span>, эксклюзивные нетворкинг-мероприятия и прямые возможности партнёрства с брендами.
              </p>

              {/* Highlighted offer */}
              <div className="flex items-center gap-6 p-6 mb-10"
                style={{ border: "1px solid rgba(0,229,255,0.22)", background: "rgba(0,229,255,0.05)", width: "100%", maxWidth: "100%" }}>
                <div className="flex items-center justify-center shrink-0"
                  style={{ width: "58px", height: "58px", background: "rgba(0,229,255,0.14)", border: "1px solid rgba(0,229,255,0.32)", clipPath: "polygon(10% 0,100% 0,90% 100%,0 100%)" }}>
                  <Users size={24} className="text-[#00E5FF]" />
                </div>
                <div>
                  <div className="gh-title text-white" style={{ fontSize: "2rem" }}>
                    <span style={{ color: "var(--c-cyan,#00E5FF)" }}>3 бесплатных</span> пропуска
                  </div>
                  <div style={{ fontFamily: "'Barlow',sans-serif", fontSize: "0.82rem", color: "rgba(255,255,255,0.34)", marginTop: "4px" }}>На каждый зарегистрированный клуб</div>
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
                    <div className="relative z-10 flex-1 flex items-center justify-between gap-4">
                      <div>
                        <h3 className="gh-title text-white mb-3" style={{ fontSize: isAction ? "1.5rem" : "1.35rem" }}>{b.title}</h3>
                        <p style={{ fontFamily: "'Barlow',sans-serif", fontSize: "0.9rem", color: "rgba(255,255,255,0.36)", lineHeight: 1.72 }}>{b.desc}</p>
                      </div>
                      {isAction && <ArrowRight size={22} style={{ color: b.color }} className="shrink-0" />}
                    </div>
                  </>
                );
                const cardClass = "group relative flex items-start gap-7 p-10 md:p-12 transition-all duration-200 " + (isAction ? "hover:bg-[rgba(0,229,255,0.06)]" : "hover:bg-white/[0.015]");
                const cardStyle = isAction
                  ? { borderTop: "1px solid rgba(255,255,255,0.05)", borderLeft: "1px solid rgba(0,229,255,0.25)", borderRight: "1px solid rgba(0,229,255,0.25)", borderBottom: "1px solid rgba(0,229,255,0.25)", background: "rgba(0,229,255,0.04)", margin: "12px", boxShadow: "0 0 24px rgba(0,229,255,0.06)" }
                  : { borderTop: i > 0 ? "1px solid rgba(255,255,255,0.05)" : "none" };
                return isAction ? (
                  <button
                    key={b.title}
                    type="button"
                    onClick={() => setClubModalOpen(true)}
                    className={cardClass}
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