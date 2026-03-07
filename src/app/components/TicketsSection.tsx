"use client";

import React, { useState } from "react";
import { Check, Star, Zap, Shield, ArrowRight, ChevronRight } from "lucide-react";
import { SponsorApplicationModal } from "./SponsorApplicationModal";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/app/components/ui/dialog";
import { cn } from "@/app/components/ui/utils";

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

const SPONSOR_BENEFITS: { id: string; title: string; description: string }[] = [
  {
    id: "general",
    title: "Генеральный спонсор",
    description:
      "Эксклюзивный статус главного партнёра фестиваля GAMEHUB. Ваш бренд получает максимальную видимость: логотип на всех материалах, приветствие от организаторов, отдельная зона на площадке и приоритет во всех медиа-активациях. Идеально для компаний, стремящихся закрепиться в гейм- и киберспортивной аудитории Казахстана и региона.",
  },
  {
    id: "stage",
    title: "Брендинг главной сцены",
    description:
      "Размещение логотипа и брендированных элементов на главной сцене, где проходят шоу-матчи и церемонии. Ваш бренд видят все 7–8 тысяч зрителей в зале и зрители прямой трансляции. В пакет входят баннеры по периметру сцены, упоминание ведущими и интеграция в оформление декораций.",
  },
  {
    id: "showmatches",
    title: "Интеграция в шоу-матчи",
    description:
      "Спонсорство отдельных шоу-матчей или сегментов программы: названия типа «Матч от [Бренд]», брендированные переходы в эфире, логотип на overlay во время трансляции. Возможность привязать активность к конкретной дисциплине или формату и получить целевую аудиторию зрителей.",
  },
  {
    id: "arena",
    title: "Рекламные щиты на арене",
    description:
      "Размещение рекламных конструкций по периметру арены Балуан Шолак — статичные баннеры, световые панели или комбинированные форматы. Высокая частота контакта с аудиторией в течение двух дней мероприятия. Гибкие форматы под размер бюджета и цели кампании.",
  },
  {
    id: "hosts",
    title: "Упоминания ведущими во время мероприятия",
    description:
      "Органичное включение вашего бренда в речи ведущих на сцене и в эфире: благодарности спонсорам, анонсы активностей, упоминание продукта в переходах между блоками. Создаёт эффект личной рекомендации и усиливает доверие аудитории к бренду.",
  },
  {
    id: "zone",
    title: "Брендированная площадка",
    description:
      "Отдельная зона на территории фестиваля под ваш бренд: инсталляция, стенд, игровая или фотозона. Прямой контакт с посетителями, возможность промо-активностей, раздача мерча и сбор контактов. Подходит для продукта, сервиса или HR-брендинга.",
  },
  {
    id: "digital",
    title: "Пакет цифровых активов",
    description:
      "Набор готовых креативов для соцсетей и сайта: баннеры, сторис, посты с логотипом партнёра, видеоролики с мероприятия. Использование контента GAMEHUB в ваших каналах и кампаниях. Экономия на производстве контента и доступ к качественным кадрам с фестиваля.",
  },
  {
    id: "social",
    title: "Кампании в соцсетях",
    description:
      "Интеграция в официальные каналы GAMEHUB и партнёров: посты, сторис, реels с упоминанием бренда, розыгрыши с вашим продуктом, таргетированная реклама на аудиторию фестиваля. Охват не только офлайн-гостей, но и многотысячной онлайн-аудитории.",
  },
  {
    id: "vip",
    title: "VIP-доступ для команды",
    description:
      "Корпоративный пакет для вашей команды или партнёров: VIP-пропуски, доступ в закрытые зоны, приоритет на автограф-сессии и фото с звёздами. Укрепление отношений с клиентами и сотрудниками через уникальный опыт на крупнейшем игровом фестивале региона.",
  },
];

export function TicketsSection() {
  const [sponsorModalOpen, setSponsorModalOpen] = useState(false);
  const [benefitModalId, setBenefitModalId] = useState<string | null>(null);

  const selectedBenefit = benefitModalId
    ? SPONSOR_BENEFITS.find((b) => b.id === benefitModalId)
    : null;

  const openBenefitModal = (id: string) => setBenefitModalId(id);
  const closeBenefitModal = () => setBenefitModalId(null);
  const openSponsorFromBenefit = () => {
    closeBenefitModal();
    setSponsorModalOpen(true);
  };
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

        {/* Ticket cards — средний блок выровнен по низу, поэтому выше и чуть выше по высоте */}
        <div className="grid md:grid-cols-3 gap-3 mb-5 items-end">
          {TICKETS.map((t) => {
            const Icon = t.Icon;
            const cardInner = (
              <>
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
              </>
            );

            if (t.featured) {
              return (
                <div key={t.id} className="flex flex-col">
                  {/* Полоса снаружи — над карточкой, в потоке */}
                  <div
                    className="py-2.5 text-center shrink-0"
                    style={{ background: `linear-gradient(90deg, ${t.color}C0, ${t.color})` }}
                  >
                    <span style={{ fontFamily: "'Barlow Condensed',sans-serif", fontWeight: 900, fontSize: "0.6rem", letterSpacing: "0.42em", color: "#040410", textTransform: "uppercase" }}>
                      ✦ Самый популярный ✦
                    </span>
                  </div>
                  <div
                    className={`relative flex flex-col flex-1 ticket-shimmer holo-card overflow-hidden`}
                    style={{ background: t.bg, border: `1px solid ${t.border}`, borderTopWidth: 0, minHeight: "480px" }}
                  >
                    {cardInner}
                  </div>
                </div>
              );
            }

            return (
              <div key={t.id}
                className={`relative overflow-hidden flex flex-col ticket-shimmer`}
                style={{ background: t.bg, border: `1px solid ${t.border}` }}
              >
                {cardInner}
              </div>
            );
          })}
        </div>

        {/* Sponsorship section */}
        <div className="relative overflow-hidden"
          style={{ marginTop: "var(--sec-py)", border: "1px solid rgba(255,255,255,0.06)", background: "rgba(255,255,255,0.014)" }}>
          <div className="absolute top-0 left-0 right-0 h-px"
            style={{ background: "linear-gradient(90deg, transparent, rgba(0,229,255,0.4), transparent)" }} />

          {/* Бегущая строка слева направо */}
          <div className="ticker-wrap-ltr py-3 border-b" style={{ borderColor: "rgba(255,255,255,0.06)" }}>
            <div className="ticker-track-ltr" style={{ gap: "2rem" }}>
              {(() => {
                const labels = ["Партнёрство", "Генеральный спонсор", "Брендинг главной сцены", "Шоу-матчи", "Рекламные щиты", "Медиа-освещение", "VIP-доступ", "GAMEHUB 2026"];
                const tag = (l: string, i: number) => (
                  <span key={`${l}-${i}`} className="shrink-0 tag-angled" style={{ fontFamily: "'Barlow Condensed',sans-serif", fontSize: "0.7rem", letterSpacing: "0.2em", color: "rgba(255,255,255,0.2)", background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.06)", padding: "6px 16px" }}>{l}</span>
                );
                return [...labels.map((l, i) => tag(l, i)), ...labels.map((l, i) => tag(l, labels.length + i))];
              })()}
            </div>
          </div>

          <div className="absolute right-0 bottom-0 select-none pointer-events-none hidden md:block"
            style={{ fontFamily: "'Barlow Condensed',sans-serif", fontWeight: 900, fontSize: "clamp(5rem,10vw,11rem)", lineHeight: 0.88, color: "rgba(255,255,255,0.006)", letterSpacing: "-0.06em" }}>PARTNER</div>

            <div className="grid md:grid-cols-2 relative z-10">
            <div
              className="p-12 md:p-14 md:border-r cursor-pointer group transition-colors duration-200 hover:bg-white/[0.02]"
              style={{ borderColor: "rgba(255,255,255,0.05)" }}
              onClick={() => openBenefitModal("general")}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => e.key === "Enter" && openBenefitModal("general")}
            >
              <div className="eyebrow">Партнёрство</div>
              <h3 className="gh-title text-white mb-6 group-hover:text-[var(--c-cyan,#00E5FF)] transition-colors duration-200" style={{ fontSize: "clamp(2rem,4.5vw,3.5rem)" }}>
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
            </div>

            <div className="p-12 md:p-14">
              <div style={{ fontFamily: "'Barlow Condensed',sans-serif", fontSize: "0.52rem", letterSpacing: "0.32em", color: "rgba(255,255,255,0.16)", textTransform: "uppercase", marginBottom: "20px" }}>Преимущества для спонсоров</div>
              <div className="grid grid-cols-2 gap-2.5 mb-8">
                {SPONSOR_BENEFITS.map((b) => (
                  <button
                    key={b.id}
                    type="button"
                    onClick={() => openBenefitModal(b.id)}
                    className="flex items-start gap-3 p-3.5 transition-colors duration-200 hover:bg-white/[0.02] text-left w-full cursor-pointer border border-[rgba(255,255,255,0.05)] hover:border-[var(--c-cyan,#00E5FF)/0.3]"
                    style={{ background: "rgba(0,229,255,0.02)" }}
                  >
                    <div className="w-1 h-1 rounded-full mt-2.5 shrink-0" style={{ background: "var(--c-cyan,#00E5FF)", boxShadow: "0 0 6px rgba(0,229,255,0.6)" }} />
                    <span style={{ fontFamily: "'Barlow',sans-serif", fontSize: "0.84rem", color: "rgba(255,255,255,0.36)", lineHeight: 1.5 }}>{b.title}</span>
                  </button>
                ))}
              </div>
              <div className="flex justify-end">
                <button type="button" onClick={() => setSponsorModalOpen(true)} className="btn-primary">
                  <span>Стать генеральным спонсором</span>
                  <ArrowRight size={14} />
                </button>
              </div>
            </div>
          </div>
        </div>
        <SponsorApplicationModal open={sponsorModalOpen} onOpenChange={setSponsorModalOpen} />

        {/* Модалка с описанием преимущества спонсора */}
        <Dialog open={!!selectedBenefit} onOpenChange={(open) => !open && closeBenefitModal()}>
          <DialogContent
            className={cn(
              "border-[rgba(255,255,255,0.08)] bg-[#050508] text-white p-0 gap-0 overflow-hidden",
              "[&>button]:z-20 [&>button]:text-white [&>button]:opacity-90 [&>button:hover]:opacity-100 [&>button]:right-6 [&>button]:top-6",
              "max-h-[90dvh] w-[calc(100%-2rem)] sm:max-w-[520px] md:max-w-[560px]",
              "rounded-lg shadow-[0_24px_80px_rgba(0,0,0,0.6)] overflow-y-auto"
            )}
            style={{ fontFamily: "'Barlow', sans-serif" }}
          >
            <div className="absolute inset-0 bg-dots opacity-10 pointer-events-none rounded-lg" />
            <div className="relative z-10 p-6 pt-12 pr-12 sm:p-8 sm:pt-12 sm:pr-14">
              {selectedBenefit && (
                <>
                  <DialogHeader className="text-left space-y-2 mb-4">
                    <div
                      className="text-[var(--c-cyan,#00E5FF)] font-bold text-[0.58rem] tracking-[0.42em] uppercase"
                      style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
                    >
                      Преимущества для спонсоров
                    </div>
                    <DialogTitle
                      className="gh-title text-white text-xl sm:text-2xl leading-tight"
                      style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 900 }}
                    >
                      {selectedBenefit.title}
                    </DialogTitle>
                  </DialogHeader>
                  <DialogDescription className="text-left text-[rgba(255,255,255,0.5)] text-sm leading-relaxed mb-6">
                    {selectedBenefit.description}
                  </DialogDescription>
                  <DialogFooter className="flex flex-col-reverse sm:flex-row gap-3 pt-2">
                    <button type="button" onClick={closeBenefitModal} className="btn-outline">
                      Закрыть
                    </button>
                    <button type="button" onClick={openSponsorFromBenefit} className="btn-primary">
                      <span>Оставить заявку на партнёрство</span>
                      <ArrowRight size={14} />
                    </button>
                  </DialogFooter>
                </>
              )}
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </section>
  );
}