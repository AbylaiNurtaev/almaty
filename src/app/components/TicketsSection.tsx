import { Check, Star, Zap, Shield, ArrowRight, ChevronRight } from "lucide-react";

const TICKETS = [
  {
    id: "free", label: "Общий",   name: "FREE",     display: "БЕСПЛАТНО",
    price: "Бесплатно", priceSub: "Без оплаты",
    Icon: Zap, color: "#00D4F5",
    bg: "rgba(0,212,245,0.04)", border: "rgba(0,212,245,0.18)",
    desc: "Полный доступ на территорию фестиваля для всех любителей игр.",
    perks: ["Полный доступ на территорию фестиваля","Вход на выставку брендов","Просмотр всех шоу-матчей","Участие в открытых конкурсах","Бесплатные игровые зоны","Участие в розыгрышах"],
    cta: "Получить бесплатный билет", featured: false,
  },
  {
    id: "vip", label: "VIP-пропуск",   name: "VIP",      display: "VIP",
    price: "VIP", priceSub: "Премиум-доступ",
    Icon: Star, color: "#E8A800",
    bg: "rgba(232,168,0,0.06)", border: "rgba(232,168,0,0.52)",
    desc: "Премиум-доступ с эксклюзивными зонами, приоритетными автографами и VIP-привилегиями.",
    perks: ["Всё из бесплатного","Доступ в VIP-лаунж","Приоритетные автограф-сессии","Эксклюзивный мерч-пак","VIP-зоны просмотра","Встречи и приветствия","Приоритетный доступ к челленджам на сцене"],
    cta: "Получить VIP-доступ", featured: true,
  },
  {
    id: "star", label: "Креатор",   name: "I'M STAR", display: "STAR",
    price: "Креатор", priceSub: "Медиа и стримеры",
    Icon: Shield, color: "#6B21E8",
    bg: "rgba(107,33,232,0.05)", border: "rgba(107,33,232,0.28)",
    desc: "Для стримеров, инфлюенсеров и медиаперсонала. Полный доступ креатора.",
    perks: ["Всё из VIP","Медиа-аккредитация","Доступ за кулисы","Отдельная медиа-зона","Официальный бейдж стримера","Поддержка создания контента","Зона для стриминга"],
    cta: "Подать заявку как креатор", featured: false,
  },
];

const SPONSOR_BENEFITS = [
  "Брендинг главной сцены", "Интеграция в шоу-матчи",
  "Рекламные щиты на арене", "Упоминания ведущими во время мероприятия",
  "Брендированная площадка", "Пакет цифровых активов",
  "Кампании в соцсетях", "VIP-доступ для команды",
];

export function TicketsSection() {
  return (
    <section id="tickets" className="relative overflow-hidden"
      style={{ background: "#09091A", padding: "var(--sec-py) var(--sec-px)" }}>

      <div className="absolute inset-0 bg-dots opacity-14 pointer-events-none" />
      <div className="absolute top-0 right-0 w-1/2 h-1/2 pointer-events-none"
        style={{ background: "radial-gradient(ellipse at right top, rgba(240,180,41,0.06) 0%, transparent 65%)" }} />
      <div className="absolute bottom-0 left-0 w-1/2 h-1/2 pointer-events-none"
        style={{ background: "radial-gradient(ellipse at left bottom, rgba(124,58,237,0.06) 0%, transparent 65%)" }} />
      <div className="wm" style={{ fontSize: "clamp(10rem,20vw,18rem)", right: "-2rem", top: "-1rem" }}>10</div>

      <div style={{ maxWidth: "1380px", margin: "0 auto", position: "relative", zIndex: 10 }}>

        {/* Header */}
        <div className="text-center mb-20">
          <div className="eyebrow justify-center">Присоединяйтесь к фестивалю</div>
          <h2 className="gh-title text-white" style={{ fontSize: "var(--h2-sec)" }}>
            Выберите свой<br />
            <span style={{ color: "var(--c-cyan,#00E5FF)" }}>билет</span>
          </h2>
          <p style={{ fontFamily: "'Barlow',sans-serif", fontSize: "1rem", color: "rgba(255,255,255,0.28)", lineHeight: 1.72, marginTop: "20px", maxWidth: "520px", marginLeft: "auto", marginRight: "auto" }}>
            11–12 апреля 2026 · Арена Балуан Шолак, Алматы, Казахстан
          </p>
        </div>

        {/* Ticket cards */}
        <div className="grid md:grid-cols-3 gap-3 mb-5">
          {TICKETS.map((t) => {
            const Icon = t.Icon;
            return (
              <div key={t.id}
                className={`relative overflow-hidden flex flex-col ticket-shimmer ${t.featured ? "holo-card" : ""}`}
                style={{ background: t.bg, border: `1px solid ${t.border}` }}>

                {/* Featured banner */}
                {t.featured && (
                  <div className="py-3 text-center"
                    style={{ background: `linear-gradient(90deg, ${t.color}C0, ${t.color})` }}>
                    <span style={{ fontFamily: "'Barlow Condensed',sans-serif", fontWeight: 900, fontSize: "0.6rem", letterSpacing: "0.42em", color: "#040410", textTransform: "uppercase" }}>
                      ✦ Самый популярный ✦
                    </span>
                  </div>
                )}

                {!t.featured && (
                  <div className="absolute top-0 left-0 right-0 h-px"
                    style={{ background: `linear-gradient(90deg, transparent, ${t.color}55, transparent)` }} />
                )}

                <div className="flex-1 flex flex-col p-9">
                  {/* Icon + label */}
                  <div className="flex items-center gap-4 mb-8">
                    <div className="flex items-center justify-center shrink-0"
                      style={{ width: "46px", height: "46px", background: `${t.color}12`, border: `1px solid ${t.color}32`, clipPath: "polygon(10% 0,100% 0,90% 100%,0 100%)" }}>
                      <Icon size={16} style={{ color: t.color }} />
                    </div>
                    <div style={{ fontFamily: "'Barlow Condensed',sans-serif", fontSize: "0.54rem", letterSpacing: "0.32em", color: t.color, textTransform: "uppercase" }}>{t.label}</div>
                  </div>

                  {/* Name display */}
                  <div className="gh-title mb-3"
                    style={{ fontSize: t.id === "star" ? "2.7rem" : "3.8rem", color: t.color, letterSpacing: "-0.03em" }}>
                    {t.display}
                  </div>
                  <div style={{ fontFamily: "'Barlow',sans-serif", fontSize: "0.78rem", color: "rgba(255,255,255,0.28)", marginBottom: "22px" }}>{t.priceSub}</div>

                  <p style={{ fontFamily: "'Barlow',sans-serif", fontSize: "0.9rem", color: "rgba(255,255,255,0.36)", lineHeight: 1.7, marginBottom: "28px" }}>{t.desc}</p>

                  {/* Perforated separator + perks */}
                  <div className="perf-edge perf-top pt-6 pb-2">
                    <ul className="space-y-3">
                      {t.perks.map((p) => (
                        <li key={p} className="flex items-start gap-3">
                          <Check size={12} style={{ color: t.color, marginTop: "3px", flexShrink: 0 }} />
                          <span style={{ fontFamily: "'Barlow',sans-serif", fontSize: "0.88rem", color: "rgba(255,255,255,0.4)", lineHeight: 1.5 }}>{p}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* CTA */}
                  <a href="#"
                    className="mt-7 w-full flex items-center justify-center gap-2 py-4 relative overflow-hidden transition-all duration-240"
                    style={t.featured
                      ? { background: t.color, clipPath: "polygon(10px 0,100% 0,calc(100% - 10px) 100%,0 100%)", fontFamily: "'Barlow Condensed',sans-serif", fontWeight: 900, fontSize: "0.8rem", letterSpacing: "0.22em", color: "#040410", textTransform: "uppercase" }
                      : { border: `1px solid ${t.color}45`, color: t.color, background: `${t.color}07`, clipPath: "polygon(10px 0,100% 0,calc(100% - 10px) 100%,0 100%)", fontFamily: "'Barlow Condensed',sans-serif", fontWeight: 900, fontSize: "0.8rem", letterSpacing: "0.22em", textTransform: "uppercase" }}>
                    <span>{t.cta}</span>
                    <ChevronRight size={14} />
                  </a>
                </div>
                <div className="absolute bottom-0 left-0 right-0 h-px"
                  style={{ background: `linear-gradient(90deg, transparent, ${t.color}55, transparent)` }} />
              </div>
            );
          })}
        </div>

        {/* Sponsorship section */}
        <div className="relative overflow-hidden"
          style={{ border: "1px solid rgba(255,255,255,0.06)", background: "rgba(255,255,255,0.014)" }}>
          <div className="absolute top-0 left-0 right-0 h-px"
            style={{ background: "linear-gradient(90deg, transparent, rgba(0,229,255,0.4), transparent)" }} />
          <div className="absolute right-0 bottom-0 select-none pointer-events-none hidden md:block"
            style={{ fontFamily: "'Barlow Condensed',sans-serif", fontWeight: 900, fontSize: "clamp(5rem,10vw,11rem)", lineHeight: 0.88, color: "rgba(255,255,255,0.006)", letterSpacing: "-0.06em" }}>PARTNER</div>

          <div className="grid md:grid-cols-2 relative z-10">
            <div className="p-12 md:p-14 md:border-r" style={{ borderColor: "rgba(255,255,255,0.05)" }}>
              <div className="eyebrow">Партнёрство</div>
              <h3 className="gh-title text-white mb-6" style={{ fontSize: "clamp(2rem,4.5vw,3.5rem)" }}>
                Генеральный спонсор<br />
                <span style={{ color: "rgba(255,255,255,0.1)" }}>возможности</span>
              </h3>
              <p style={{ fontFamily: "'Barlow',sans-serif", fontSize: "0.96rem", color: "rgba(255,255,255,0.36)", lineHeight: 1.78, maxWidth: "400px", marginBottom: "24px" }}>
                Станьте партнёром GAMEHUB и представьте свой бренд 7 000–8 000 увлечённым геймерам, владельцам клубов и профессионалам индустрии.
              </p>
              <div className="flex flex-wrap gap-2 mb-9">
                {["7–8 тыс. посетителей","40+ брендов","2 дня","Медиа-освещение","Прямая трансляция"].map((p) => (
                  <span key={p} className="tag-angled"
                    style={{ background: "rgba(255,255,255,0.025)", border: "1px solid rgba(255,255,255,0.07)", color: "rgba(255,255,255,0.26)", padding: "6px 14px" }}>{p}</span>
                ))}
              </div>
              <a href="#" className="btn-primary">
                <span>Стать генеральным спонсором</span>
                <ArrowRight size={14} />
              </a>
            </div>

            <div className="p-12 md:p-14">
              <div style={{ fontFamily: "'Barlow Condensed',sans-serif", fontSize: "0.52rem", letterSpacing: "0.32em", color: "rgba(255,255,255,0.16)", textTransform: "uppercase", marginBottom: "20px" }}>Преимущества для спонсоров</div>
              <div className="grid grid-cols-2 gap-2.5">
                {SPONSOR_BENEFITS.map((b) => (
                  <div key={b} className="flex items-start gap-3 p-3.5 transition-colors duration-200 hover:bg-white/[0.02]"
                    style={{ border: "1px solid rgba(255,255,255,0.05)", background: "rgba(0,229,255,0.02)" }}>
                    <div className="w-1 h-1 rounded-full mt-2.5 shrink-0" style={{ background: "var(--c-cyan,#00E5FF)", boxShadow: "0 0 6px rgba(0,229,255,0.6)" }} />
                    <span style={{ fontFamily: "'Barlow',sans-serif", fontSize: "0.84rem", color: "rgba(255,255,255,0.36)", lineHeight: 1.5 }}>{b}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}