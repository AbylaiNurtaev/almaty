"use client";

import { Check, Star, Zap, Shield, ChevronRight } from "lucide-react";

type TicketDef = {
  id: string;
  label: string;
  name: string;
  display: string;
  price: string;
  priceSub: string;
  Icon: typeof Zap;
  color: string;
  bg: string;
  border: string;
  desc: string;
  perks: string[];
  cta: string;
  ctaMobile: string;
  featured: boolean;
};

const TICKETS: TicketDef[] = [
  {
    id: "free", label: "Общий", name: "FREE", display: "БЕСПЛАТНО",
    price: "Бесплатно", priceSub: "Без оплаты",
    Icon: Zap, color: "#00D4F5",
    bg: "rgba(0,212,245,0.04)", border: "rgba(0,212,245,0.18)",
    desc: "Полный доступ на территорию фестиваля для всех любителей игр.",
    perks: ["Полный доступ на территорию фестиваля", "Вход на выставку брендов", "Просмотр всех шоу-матчей", "Участие в открытых конкурсах", "Бесплатные игровые зоны", "Участие в розыгрышах"],
    cta: "Получить бесплатный билет",
    ctaMobile: "Бесплатный билет",
    featured: false,
  },
  {
    id: "vip", label: "VIP-пропуск", name: "VIP", display: "VIP",
    price: "VIP", priceSub: "Премиум-доступ",
    Icon: Star, color: "#E8A800",
    bg: "rgba(232,168,0,0.06)", border: "rgba(232,168,0,0.52)",
    desc: "Премиум-доступ с эксклюзивными зонами, приоритетными автографами и VIP-привилегиями.",
    perks: ["Всё из бесплатного", "Доступ в VIP-лаунж", "Приоритетные автограф-сессии", "Эксклюзивный мерч-пак", "VIP-зоны просмотра", "Встречи и приветствия", "Приоритетный доступ к челленджам на сцене"],
    cta: "Получить VIP-доступ",
    ctaMobile: "VIP-доступ",
    featured: true,
  },
  {
    id: "star", label: "Креатор", name: "I'M STAR", display: "STAR",
    price: "Креатор", priceSub: "Медиа и стримеры",
    Icon: Shield, color: "#6B21E8",
    bg: "rgba(107,33,232,0.05)", border: "rgba(107,33,232,0.28)",
    desc: "Для стримеров, инфлюенсеров и медиаперсонала. Полный доступ креатора.",
    perks: ["Всё из VIP", "Медиа-аккредитация", "Доступ за кулисы", "Отдельная медиа-зона", "Официальный бейдж стримера", "Поддержка создания контента", "Зона для стриминга"],
    cta: "Подать заявку как креатор",
    ctaMobile: "Заявка креатора",
    featured: false,
  },
];

const TICKET_CARD_HEIGHT = "645px";

export function TicketsSection() {
  return (
    <section
      className="sec-fullscreen relative overflow-hidden h-full min-h-0"
      aria-labelledby="tickets-heading"
      style={{ background: "#09091A", padding: "clamp(10px, 1.6vw, 20px) var(--sec-px) var(--sec-py) var(--sec-px)" }}
    >
      <div className="absolute inset-0 bg-dots opacity-14 pointer-events-none" />
      <div
        className="absolute top-0 right-0 w-1/2 h-1/2 pointer-events-none"
        style={{ background: "radial-gradient(ellipse at right top, rgba(240,180,41,0.06) 0%, transparent 65%)" }}
      />
      <div
        className="absolute bottom-0 left-0 w-1/2 h-1/2 pointer-events-none"
        style={{ background: "radial-gradient(ellipse at left bottom, rgba(124,58,237,0.06) 0%, transparent 65%)" }}
      />

      <div style={{ maxWidth: "1380px", margin: "0 auto", position: "relative", zIndex: 10 }}>
        <div className="text-center mb-3">
          <h2 id="tickets-heading" className="gh-title text-white" style={{ fontSize: "var(--h2-sec)" }}>
            <span style={{ color: "var(--c-cyan,#00E5FF)" }}>Билеты</span>
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-3 mb-5 items-stretch">
          {TICKETS.map((t) => {
            const Icon = t.Icon;
            const cardInner = (
              <>
                {!t.featured && (
                  <div className="absolute top-0 left-0 right-0 h-px" style={{ background: `linear-gradient(90deg, transparent, ${t.color}55, transparent)` }} />
                )}
                <div className="flex-1 flex flex-col p-7 pb-10">
                  <div className="flex items-center gap-4 mb-6">
                    <div
                      className="flex items-center justify-center shrink-0"
                      style={{
                        width: "46px",
                        height: "46px",
                        background: `${t.color}12`,
                        border: `1px solid ${t.color}32`,
                        clipPath: "polygon(10% 0,100% 0,90% 100%,0 100%)",
                      }}
                    >
                      <Icon size={16} style={{ color: t.color }} />
                    </div>
                    <div
                      style={{
                        fontFamily: "'Barlow Condensed',sans-serif",
                        fontSize: "0.54rem",
                        letterSpacing: "0.32em",
                        color: t.color,
                        textTransform: "uppercase",
                      }}
                    >
                      {t.label}
                    </div>
                  </div>
                  <div
                    className="gh-title mb-3"
                    style={{
                      fontSize: t.id === "star" ? "2.7rem" : t.id === "free" ? "2.4rem" : "3.8rem",
                      color: t.color,
                      letterSpacing: "0.03em",
                    }}
                  >
                    {t.display}
                  </div>
                  <div
                    style={{
                      fontFamily: "'Barlow',sans-serif",
                      fontSize: "0.78rem",
                      letterSpacing: "0.03em",
                      color: "rgba(255,255,255,0.28)",
                      marginBottom: "18px",
                    }}
                  >
                    {t.priceSub}
                  </div>
                  <p
                    style={{
                      fontFamily: "'Barlow',sans-serif",
                      fontSize: "0.9rem",
                      letterSpacing: "0.03em",
                      color: "rgba(255,255,255,0.36)",
                      lineHeight: 1.7,
                      marginBottom: "22px",
                    }}
                  >
                    {t.desc}
                  </p>
                  <div className="perf-edge perf-top pt-6 pb-2">
                    <ul className="space-y-3">
                      {t.perks.map((p) => (
                        <li key={p} className="flex items-start gap-3">
                          <Check size={12} style={{ color: t.color, marginTop: "3px", flexShrink: 0 }} />
                          <span
                            style={{
                              fontFamily: "'Barlow',sans-serif",
                              fontSize: "0.88rem",
                              letterSpacing: "0.03em",
                              color: "rgba(255,255,255,0.4)",
                              lineHeight: 1.5,
                            }}
                          >
                            {p}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <a
                    href="#"
                    className={
                      "ticket-cta-btn mt-7 w-full flex items-center justify-center gap-2 py-4 max-md:py-3 max-md:px-2 max-md:gap-1 max-md:min-h-[48px] relative overflow-hidden transition-all duration-240 " +
                      "max-md:text-[0.7rem] max-md:tracking-[0.06em] max-md:leading-tight max-md:text-center"
                    }
                    style={
                      t.featured
                        ? {
                            background: t.color,
                            clipPath: "polygon(10px 0,100% 0,calc(100% - 10px) 100%,0 100%)",
                            fontFamily: "'Barlow Condensed',sans-serif",
                            fontWeight: 900,
                            fontSize: "0.8rem",
                            letterSpacing: "0.22em",
                            color: "#040410",
                            textTransform: "uppercase",
                          }
                        : {
                            border: `1px solid ${t.color}45`,
                            color: t.color,
                            background: `${t.color}07`,
                            clipPath: "polygon(10px 0,100% 0,calc(100% - 10px) 100%,0 100%)",
                            fontFamily: "'Barlow Condensed',sans-serif",
                            fontWeight: 900,
                            fontSize: "0.8rem",
                            letterSpacing: "0.22em",
                            textTransform: "uppercase",
                          }
                    }
                  >
                    <span className="max-md:hidden">{t.cta}</span>
                    <span className="md:hidden">{t.ctaMobile}</span>
                    <ChevronRight size={14} className="max-md:size-3 shrink-0" />
                  </a>
                </div>
                <div className="absolute bottom-0 left-0 right-0 h-px" style={{ background: `linear-gradient(90deg, transparent, ${t.color}55, transparent)` }} />
              </>
            );
            if (t.featured) {
              return (
                <div key={t.id} className="flex flex-col">
                  <div
                    className="flex items-center justify-center text-center shrink-0 w-full"
                    style={{ height: "44px", background: `linear-gradient(90deg, ${t.color}C0, ${t.color})` }}
                  >
                    <span
                      style={{
                        fontFamily: "'Barlow Condensed',sans-serif",
                        fontWeight: 900,
                        fontSize: "0.6rem",
                        letterSpacing: "0.42em",
                        color: "#040410",
                        textTransform: "uppercase",
                      }}
                    >
                      ✦ Самый популярный ✦
                    </span>
                  </div>
                  <div
                    className="relative flex flex-col ticket-shimmer holo-card overflow-hidden ticket-vip-mobile-taller"
                    style={{ background: t.bg, border: `1px solid ${t.border}`, borderTopWidth: 0, maxHeight: TICKET_CARD_HEIGHT }}
                  >
                    {cardInner}
                  </div>
                </div>
              );
            }
            return (
              <div
                key={t.id}
                className="relative overflow-hidden flex flex-col ticket-shimmer"
                style={{ background: t.bg, border: `1px solid ${t.border}`, maxHeight: TICKET_CARD_HEIGHT }}
              >
                {cardInner}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
