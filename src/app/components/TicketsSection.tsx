"use client";

import { useCallback, useState } from "react";
import {
  Check,
  Star,
  Zap,
  Shield,
  ChevronRight,
  ChevronLeft,
  Users,
  Monitor,
  Store,
  Building2,
} from "lucide-react";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/app/components/ui/dialog";
import { Input } from "@/app/components/ui/input";
import { Textarea } from "@/app/components/ui/textarea";
import { cn } from "@/app/components/ui/utils";
import { useLanguage } from "../context/LanguageContext";
import { submitRequest } from "../services/submitRequest";

type AudienceId = "guests" | "clubs" | "smartshell" | "franchise" | "shops" | "stands" | "company";

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
    id: "basic",
    label: "Для посетителей",
    name: "5000",
    display: "5 000 ТГ",
    price: "5 000 тг",
    priceSub: "Количество: 1000",
    Icon: Zap,
    color: "#00D4F5",
    bg: "rgba(0,212,245,0.04)",
    border: "rgba(0,212,245,0.18)",
    desc: "Даёт доступ:",
    perks: [
      "Вход на мероприятие",
      "Доступ в expo-зону",
      "Доступ на автограф-сессию",
    ],
    cta: "Зарегестрироваться",
    ctaMobile: "Зарегестрироваться",
    featured: false,
  },
  {
    id: "plus",
    label: "Для посетителей",
    name: "5000",
    display: "5 000 ТГ",
    price: "5 000 тг",
    priceSub: "Количество: 500",
    Icon: Star,
    color: "#E8A800",
    bg: "rgba(232,168,0,0.06)",
    border: "rgba(232,168,0,0.52)",
    desc: "Даёт доступ:",
    perks: [
      "Всё из Бесплатного",
      "Участие в конкурсах",
      "1 ряд",
      "Приоритетный вход",
      "Возможность крутить рулетку 1 раз",
    ],
    cta: "Купить",
    ctaMobile: "Купить",
    featured: true,
  },
  {
    id: "vip",
    label: "Для посетителей",
    name: "20000",
    display: "20 000 ТГ",
    price: "20 000 тг",
    priceSub: "Количество: 250",
    Icon: Shield,
    color: "#6B21E8",
    bg: "rgba(107,33,232,0.05)",
    border: "rgba(107,33,232,0.28)",
    desc: "Даёт доступ:",
    perks: [
      "Всё из 5000",
      "Доступ к VIP-зоне",
      "Возможность крутить рулетку 5 раз",
      "Детская зона на всё мероприятие",
    ],
    cta: "Купить",
    ctaMobile: "Купить",
    featured: false,
  },
];

type B2BDef = {
  id: AudienceId;
  navTitle: string;
  navShort: string;
  label: string;
  display: string;
  priceSub: string;
  desc: string;
  perks: string[];
  Icon: typeof Users;
  color: string;
  bg: string;
  border: string;
  featured?: boolean;
  cta?: string;
  ctaMobile?: string;
};

const B2B: B2BDef[] = [
  {
    id: "clubs",
    navTitle: "Для клубов",
    navShort: "Клубы",
    label: "B2B · клубы",
    display: "300 000 ТГ",
    priceSub: "Количество: 100",
    desc: "Даёт доступ:",
    perks: [
      "Участие в \"Битва Основателей\"",
      "Участие в \"10 FPS\"",
      "Участие в \"Сборка клуба\"",
      "Участие в \"DRIFT SHOW\"",
      "Брендированная стойка",
      "VIP место в выделенной зоне",
      "Участие в закрытом мероприятии",
      "Билет 1+1",
      "Возможность докупить +1 человек за 50 000 тг",
    ],
    Icon: Monitor,
    color: "#00D4F5",
    bg: "rgba(0,212,245,0.04)",
    border: "rgba(0,212,245,0.22)",
    cta: "Оставить заявку",
    ctaMobile: "Оставить заявку",
  },
  {
    id: "franchise",
    navTitle: "Для франшиз",
    navShort: "Франшиза",
    label: "B2B · франшиза",
    display: "5 000 000 ТГ",
    priceSub: "Количество: 10",
    desc: "Даёт доступ:",
    perks: [
      "Брендированная стойка",
      "Возможность продажи",
      "Выделенные фото/видео отчеты",
    ],
    Icon: Store,
    color: "#E8A800",
    bg: "rgba(232,168,0,0.06)",
    border: "rgba(232,168,0,0.45)",
    featured: true,
    cta: "Оставить заявку",
    ctaMobile: "Оставить заявку",
  },
  {
    id: "smartshell",
    navTitle: "Презентация SmartShell",
    navShort: "SmartShell",
    label: "B2B · SmartShell",
    display: "Бесплатно",
    priceSub: "Количество: 150",
    desc: "Даёт доступ:",
    perks: [
      "Бесплатный билет на презентацию SmartShell",
      "Нетворкинг с представителями индустрии",
      "Q&A с командой проекта",
    ],
    Icon: Monitor,
    color: "#4BC0FF",
    bg: "rgba(75,192,255,0.05)",
    border: "rgba(75,192,255,0.26)",
    cta: "Зарегестрироваться",
    ctaMobile: "Зарегестрироваться",
  },
  {
    id: "shops",
    navTitle: "Для магазинов",
    navShort: "Магазины",
    label: "B2B · магазины",
    display: "500 000 ТГ",
    priceSub: "Количество: 20",
    desc: "Даёт доступ:",
    perks: [
      "Брендированная стойка",
      "Выстовочная стойка для ПК",
      "Участие в \"Сборка клуба\"",
      "Участие в \"Аукцион\"",
      "VIP место в выделенной зоне",
      "Билет 1+1",
      "Возможность докупить +1 человек за 50 000 тг",
      "Возможность продажи",
      "Выделенные фото/видео отчеты",
    ],
    Icon: Store,
    color: "#1FD080",
    bg: "rgba(31,208,128,0.05)",
    border: "rgba(31,208,128,0.3)",
    cta: "Оставить заявку",
    ctaMobile: "Оставить заявку",
  },
  {
    id: "stands",
    navTitle: "Для стендов",
    navShort: "Стенды",
    label: "B2B · стенды",
    display: "Индивидуально",
    priceSub: "Количество: 40",
    desc: "Даёт доступ:",
    perks: [
      "Брендированная стойка",
      "Создание стенда",
      "Монтаж стенда",
      "Демонтаж стенда",
      "Возможность продажи",
      "Выделенные фото/видео отчеты",
    ],
    Icon: Building2,
    color: "#FF6A3D",
    bg: "rgba(255,106,61,0.05)",
    border: "rgba(255,106,61,0.3)",
    cta: "Оставить заявку",
    ctaMobile: "Оставить заявку",
  },
  {
    id: "company",
    navTitle: "Корпоративное участие",
    navShort: "Компания",
    label: "B2B · корпорации",
    display: "Индивидуально",
    priceSub: "Количество: 20",
    desc: "Даёт доступ:",
    perks: [
      "Покупка до 5 мест в шоу-матчах для сотрудников",
      "1 место = 50 000 тг",
      "Участие в \"Битва корпораций\"",
    ],
    Icon: Building2,
    color: "#6B21E8",
    bg: "rgba(107,33,232,0.05)",
    border: "rgba(107,33,232,0.28)",
    cta: "Зарегестрироваться",
    ctaMobile: "Зарегестрироваться",
  },
];

const AUDIENCE_NAV: { id: AudienceId; title: string; short: string; Icon: typeof Users }[] = [
  { id: "guests", title: "Для посетителей", short: "Посетители", Icon: Users },
  ...B2B.map((b) => ({ id: b.id, title: b.navTitle, short: b.navShort, Icon: b.Icon })),
];

export function TicketsSection() {
  const { language } = useLanguage();
  const isEn = language === "en";
  const [audience, setAudience] = useState<AudienceId>("guests");
  const [index, setIndex] = useState(0);
  const [rulesModalOpen, setRulesModalOpen] = useState(false);
  const [guestReqModalOpen, setGuestReqModalOpen] = useState(false);
  const [guestReqSubmitted, setGuestReqSubmitted] = useState(false);
  const [guestReqSubmitting, setGuestReqSubmitting] = useState(false);
  const [guestReqError, setGuestReqError] = useState<string | null>(null);
  const [clubReqModalOpen, setClubReqModalOpen] = useState(false);
  const [clubReqSubmitted, setClubReqSubmitted] = useState(false);
  const [clubReqSubmitting, setClubReqSubmitting] = useState(false);
  const [clubReqError, setClubReqError] = useState<string | null>(null);
  const [reqModalAudience, setReqModalAudience] = useState<"clubs" | "smartshell" | "franchise" | "shops" | "stands" | "company">("clubs");
  const n = TICKETS.length;
  const tr = (value: string) =>
    isEn
      ? ({
          "Для посетителей": "For Visitors",
          "1 000 ТГ": "1,000 KZT",
          "1 000 тг": "1,000 KZT",
          "Количество: 1000": "Quantity: 1000",
          "Даёт доступ:": "Includes access to:",
          "Вход на мероприятие": "Event entry",
          "Доступ в expo-зону": "Access to expo zone",
          "Доступ на автограф-сессию": "Access to autograph session",
          "Зарегестрироваться": "Register",
          "5 000 ТГ": "5,000 KZT",
          "5 000 тг": "5,000 KZT",
          "Количество: 500": "Quantity: 500",
          "Всё из Бесплатного": "Everything from Free",
          "Участие в конкурсах": "Participation in contests",
          "1 ряд": "Front row",
          "Приоритетный вход": "Priority entry",
          "Возможность крутить рулетку 1 раз": "One roulette spin",
          "Купить": "Buy",
          "20 000 ТГ": "20,000 KZT",
          "20 000 тг": "20,000 KZT",
          "Количество: 250": "Quantity: 250",
          "Всё из 5000": "Everything from 5000 plan",
          "Доступ к VIP-зоне": "Access to VIP zone",
          "Возможность крутить рулетку 5 раз": "Five roulette spins",
          "Детская зона на всё мероприятие": "Kids zone for full event",
          "Для клубов": "For Clubs",
          "Клубы": "Clubs",
          "Презентация SmartShell": "SmartShell Presentation",
          "SmartShell": "SmartShell",
          "B2B · клубы": "B2B · Clubs",
          "B2B · SmartShell": "B2B · SmartShell",
          "300 000 ТГ": "300,000 KZT",
          "500 000 ТГ": "500,000 KZT",
          "5 000 000 ТГ": "5,000,000 KZT",
          "Бесплатно": "Free",
          "Индивидуально": "Custom",
          "Количество: 100": "Quantity: 100",
          "Количество: 150": "Quantity: 150",
          "Количество: 10": "Quantity: 10",
          "Количество: 20": "Quantity: 20",
          "Количество: 40": "Quantity: 40",
          "Участие в \"Битва Основателей\"": "Participation in \"Founders Battle\"",
          "Участие в \"10 FPS\"": "Participation in \"10 FPS\"",
          "Участие в \"Сборка клуба\"": "Participation in \"Club Build\"",
          "Участие в \"DRIFT SHOW\"": "Participation in \"DRIFT SHOW\"",
          "Бесплатный билет на презентацию SmartShell": "Free ticket to the SmartShell presentation",
          "Нетворкинг с представителями индустрии": "Networking with industry representatives",
          "Q&A с командой проекта": "Q&A with the project team",
          "Брендированная стойка": "Branded counter",
          "VIP место в выделенной зоне": "VIP seat in dedicated zone",
          "Участие в закрытом мероприятии": "Participation in private event",
          "Билет 1+1": "1+1 ticket",
          "Возможность докупить +1 человек за 50 000 тг": "Add +1 person for 50,000 KZT",
          "Для франшиз": "For Franchises",
          "Франшиза": "Franchise",
          "B2B · франшиза": "B2B · Franchise",
          "Возможность продажи": "Sales opportunity",
          "Выделенные фото/видео отчеты": "Dedicated photo/video reports",
          "Для магазинов": "For Shops",
          "Магазины": "Shops",
          "B2B · магазины": "B2B · Shops",
          "Выстовочная стойка для ПК": "PC showcase stand",
          "Участие в \"Аукцион\"": "Participation in \"Auction\"",
          "Для стендов": "For Booths",
          "Стенды": "Booths",
          "B2B · стенды": "B2B · Booths",
          "Создание стенда": "Booth creation",
          "Монтаж стенда": "Booth setup",
          "Демонтаж стенда": "Booth teardown",
          "Корпоративное участие": "Corporate Participation",
          "Компания": "Company",
          "B2B · корпорации": "B2B · Corporations",
          "Покупка до 5 мест в шоу-матчах для сотрудников": "Purchase up to 5 showmatch slots for employees",
          "1 место = 50 000 тг": "1 slot = 50,000 KZT",
          "Участие в \"Битва корпораций\"": "Participation in \"Corporate Battle\"",
          "Оставить заявку": "Submit request",
          "Посетители": "Visitors",
        }[value] ?? value)
      : value;
  const t = {
    ...TICKETS[index],
    label: tr(TICKETS[index].label),
    display: tr(TICKETS[index].display),
    price: tr(TICKETS[index].price),
    priceSub: tr(TICKETS[index].priceSub),
    desc: tr(TICKETS[index].desc),
    perks: TICKETS[index].perks.map(tr),
    cta: tr(TICKETS[index].cta),
    ctaMobile: tr(TICKETS[index].ctaMobile),
  };

  const b2b = B2B.find((x) => x.id === audience);
  const localizedB2b = b2b
    ? {
        ...b2b,
        navTitle: tr(b2b.navTitle),
        navShort: tr(b2b.navShort),
        label: tr(b2b.label),
        display: tr(b2b.display),
        priceSub: tr(b2b.priceSub),
        desc: tr(b2b.desc),
        perks: b2b.perks.map(tr),
        cta: b2b.cta ? tr(b2b.cta) : b2b.cta,
        ctaMobile: b2b.ctaMobile ? tr(b2b.ctaMobile) : b2b.ctaMobile,
      }
    : null;

  const goPrev = useCallback(() => {
    setIndex((i) => (i - 1 + n) % n);
  }, [n]);

  const goNext = useCallback(() => {
    setIndex((i) => (i + 1) % n);
  }, [n]);

  const formFieldClass =
    "w-full bg-[#0a0a10] border border-[rgba(255,255,255,0.1)] rounded px-4 py-3 text-white placeholder:text-[rgba(255,255,255,0.35)] text-sm outline-none transition-colors focus:border-[var(--c-cyan,#00E5FF)] focus:ring-1 focus:ring-[rgba(0,229,255,0.25)]";

  const handleClubRequestSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (clubReqSubmitting) return;

    setClubReqSubmitting(true);
    setClubReqError(null);
    const formData = new FormData(e.currentTarget);
    const payload = {
      audience: reqModalAudience,
      companyName: String(formData.get("companyName") ?? ""),
      contactName: String(formData.get("contactName") ?? ""),
      email: String(formData.get("email") ?? ""),
      phone: String(formData.get("phone") ?? ""),
      requisites: String(formData.get("requisites") ?? ""),
    };

    try {
      await submitRequest({
        title: "Заявка на B2B участие",
        source: `site/tickets-b2b-${reqModalAudience}`,
        payload,
      });
      setClubReqSubmitted(true);
      setTimeout(() => {
        setClubReqModalOpen(false);
        setClubReqSubmitted(false);
      }, 1400);
    } catch (error) {
      setClubReqError(error instanceof Error ? error.message : "Не удалось отправить заявку");
    } finally {
      setClubReqSubmitting(false);
    }
  };

  const handleGuestRequestSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (guestReqSubmitting) return;

    setGuestReqSubmitting(true);
    setGuestReqError(null);
    const formData = new FormData(e.currentTarget);
    const payload = {
      ticketId: TICKETS[index].id,
      ticketName: TICKETS[index].name,
      ticketPrice: TICKETS[index].price,
      name: String(formData.get("name") ?? ""),
      phone: String(formData.get("phone") ?? ""),
      comment: String(formData.get("comment") ?? ""),
    };

    try {
      await submitRequest({
        title: "Заявка на билет для посетителя",
        source: `site/tickets-guests-${TICKETS[index].id}`,
        payload,
      });
      setGuestReqSubmitted(true);
      setTimeout(() => {
        setGuestReqModalOpen(false);
        setGuestReqSubmitted(false);
      }, 1400);
    } catch (error) {
      setGuestReqError(error instanceof Error ? error.message : "Не удалось отправить заявку");
    } finally {
      setGuestReqSubmitting(false);
    }
  };

  const requisitesAudienceTitle =
    reqModalAudience === "franchise"
      ? tr("Для франшиз")
      : reqModalAudience === "smartshell"
        ? tr("Презентация SmartShell")
        : reqModalAudience === "shops"
          ? tr("Для магазинов")
          : reqModalAudience === "stands"
            ? tr("Для стендов")
            : reqModalAudience === "company"
              ? tr("Корпоративное участие")
              : tr("Для клубов");

  const detailBody = (ticket: TicketDef) => {
    const Icon = ticket.Icon;
    return (
      <>
        {!ticket.featured && (
          <div className="absolute top-0 left-0 right-0 h-px" style={{ background: `linear-gradient(90deg, transparent, ${ticket.color}55, transparent)` }} />
        )}
        <div className="flex-1 flex flex-col items-start min-h-0 px-4 pt-4 pb-4 md:px-6 md:pt-6 md:pb-6">
          <div className="flex items-center justify-start gap-2.5 md:gap-3 mb-3 md:mb-4 shrink-0 w-full">
            <div
              className="flex items-center justify-center shrink-0 max-md:scale-90 max-md:origin-left"
              style={{
                width: "46px",
                height: "46px",
                background: `${ticket.color}12`,
                border: `1px solid ${ticket.color}32`,
                clipPath: "polygon(10% 0,100% 0,90% 100%,0 100%)",
              }}
            >
              <Icon size={16} style={{ color: ticket.color }} />
            </div>
            <div
              className="max-md:tracking-[0.2em] max-md:text-[0.5rem]"
              style={{
                fontFamily: "'Barlow Condensed',sans-serif",
                fontSize: "0.54rem",
                letterSpacing: "0.32em",
                color: ticket.color,
                textTransform: "uppercase",
              }}
            >
              {ticket.label}
            </div>
          </div>
          <div
            className="gh-title mb-1.5 md:mb-2 shrink-0 leading-none max-md:pr-1 text-left w-full"
            style={{
              fontSize:
                ticket.id === "star"
                  ? "clamp(1.7rem, 8.5vw, 2.35rem)"
                  : ticket.id === "free"
                    ? "clamp(1.6rem, 8vw, 2.1rem)"
                    : "clamp(2rem, 11vw, 3.2rem)",
              color: ticket.color,
              letterSpacing: "0.03em",
            }}
          >
            {ticket.display}
          </div>
          <div
            className="shrink-0 max-md:text-[0.72rem] text-left w-full"
            style={{
              fontFamily: "'Barlow',sans-serif",
              fontSize: "0.78rem",
              letterSpacing: "0.03em",
              color: "rgba(255,255,255,0.95)",
              marginBottom: "10px",
            }}
          >
            {ticket.priceSub}
          </div>
          <p
            className="shrink-0 max-md:text-[0.84rem] max-md:leading-relaxed max-md:mb-2.5 text-left w-full"
            style={{
              fontFamily: "'Barlow',sans-serif",
              fontSize: "0.9rem",
              letterSpacing: "0.03em",
              color: "rgba(255,255,255,0.95)",
              lineHeight: 1.7,
              marginBottom: "14px",
            }}
          >
            {ticket.desc}
          </p>
          <div className="perf-edge perf-top pt-3 md:pt-4 pb-1 min-h-0 flex-1 overflow-y-auto max-md:overflow-visible max-md:flex-none w-full max-w-[560px]">
            <ul className="space-y-2 md:space-y-2.5">
              {ticket.perks.map((p) => (
                <li key={p} className="flex items-start gap-3">
                  <Check size={12} style={{ color: ticket.color, marginTop: "3px", flexShrink: 0 }} />
                  <span
                    className="max-md:text-[0.8125rem] max-md:leading-snug"
                    style={{
                      fontFamily: "'Barlow',sans-serif",
                      fontSize: "0.88rem",
                      letterSpacing: "0.03em",
                      color: "rgba(255,255,255,0.95)",
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
            onClick={(e) => {
              e.preventDefault();
              setGuestReqModalOpen(true);
            }}
            className={
              "ticket-cta-btn mt-4 md:mt-5 w-full flex items-center justify-center gap-2 py-3.5 max-md:py-3 max-md:px-2 max-md:gap-1 max-md:min-h-[46px] relative overflow-hidden transition-all duration-240 shrink-0 " +
              "max-md:text-[0.7rem] max-md:tracking-[0.06em] max-md:leading-tight max-md:text-center"
            }
            style={
              ticket.featured
                ? {
                    background: ticket.color,
                    clipPath: "polygon(10px 0,100% 0,calc(100% - 10px) 100%,0 100%)",
                    fontFamily: "'Barlow Condensed',sans-serif",
                    fontWeight: 900,
                    fontSize: "0.8rem",
                    letterSpacing: "0.22em",
                    color: "#040410",
                    textTransform: "uppercase",
                  }
                : {
                    border: `1px solid ${ticket.color}45`,
                    color: ticket.color,
                    background: `${ticket.color}07`,
                    clipPath: "polygon(10px 0,100% 0,calc(100% - 10px) 100%,0 100%)",
                    fontFamily: "'Barlow Condensed',sans-serif",
                    fontWeight: 900,
                    fontSize: "0.8rem",
                    letterSpacing: "0.22em",
                    textTransform: "uppercase",
                  }
            }
          >
                  <span className="max-md:hidden">{isEn ? "Register" : ticket.cta}</span>
                  <span className="md:hidden">{isEn ? "Register" : ticket.ctaMobile}</span>
            <ChevronRight size={14} className="max-md:size-3 shrink-0" />
          </a>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-px" style={{ background: `linear-gradient(90deg, transparent, ${ticket.color}55, transparent)` }} />
      </>
    );
  };

  const b2bBody = (block: B2BDef) => {
    const Icon = block.Icon;
    return (
      <>
        {!block.featured && (
          <div className="absolute top-0 left-0 right-0 h-px" style={{ background: `linear-gradient(90deg, transparent, ${block.color}55, transparent)` }} />
        )}
        <div className="flex-1 flex flex-col items-start min-h-0 px-4 pt-4 pb-4 md:px-6 md:pt-6 md:pb-6">
          <div className="w-full flex flex-col md:flex-row md:items-start md:justify-between md:gap-4 shrink-0">
            <div className="min-w-0 w-full">
              <div className="flex items-center justify-start gap-2.5 md:gap-3 mb-3 md:mb-4 shrink-0 w-full">
                <div
                  className="flex items-center justify-center shrink-0 max-md:scale-90 max-md:origin-left"
                  style={{
                    width: "46px",
                    height: "46px",
                    background: `${block.color}12`,
                    border: `1px solid ${block.color}32`,
                    clipPath: "polygon(10% 0,100% 0,90% 100%,0 100%)",
                  }}
                >
                  <Icon size={16} style={{ color: block.color }} />
                </div>
                <div
                  className="max-md:tracking-[0.2em] max-md:text-[0.5rem]"
                  style={{
                    fontFamily: "'Barlow Condensed',sans-serif",
                    fontSize: "0.54rem",
                    letterSpacing: "0.32em",
                    color: block.color,
                    textTransform: "uppercase",
                  }}
                >
                  {block.label}
                </div>
              </div>
              <div
                className="gh-title mb-1.5 md:mb-2 shrink-0 leading-none max-md:pr-1 text-left w-full"
                style={{
                  // Keep the price headline size consistent with "Для посетителей"
                  fontSize: "clamp(2rem, 11vw, 3.2rem)",
                  color: block.color,
                  letterSpacing: "0.03em",
                }}
              >
                {block.display}
              </div>
              <div
                className="shrink-0 max-md:text-[0.72rem] text-left w-full"
                style={{
                  fontFamily: "'Barlow',sans-serif",
                  fontSize: "0.78rem",
                  letterSpacing: "0.03em",
                  color: "rgba(255,255,255,0.95)",
                  marginBottom: "10px",
                }}
              >
                {block.priceSub}
              </div>
            </div>

          </div>
          <p
            className="shrink-0 max-md:text-[0.84rem] max-md:leading-relaxed max-md:mb-2.5 text-left w-full"
            style={{
              fontFamily: "'Barlow',sans-serif",
              fontSize: "0.9rem",
              letterSpacing: "0.03em",
              color: "rgba(255,255,255,0.95)",
              lineHeight: 1.7,
              marginBottom: "14px",
            }}
          >
            {block.desc}
          </p>
          <div className="perf-edge perf-top pt-3 md:pt-4 pb-1 min-h-0 flex-1 overflow-y-auto max-md:overflow-visible max-md:flex-none w-full max-w-[560px]">
            {block.id === "clubs" ? (
              <>
                <div className="md:flex md:items-start md:gap-4">
                  <ul className="space-y-2 md:space-y-2.5 md:flex-1">
                    {block.perks.slice(0, 4).map((p) => (
                      <li key={p} className="flex items-start gap-3">
                        <Check size={12} style={{ color: block.color, marginTop: "3px", flexShrink: 0 }} />
                        <span
                          className="max-md:text-[0.8125rem] max-md:leading-snug"
                          style={{
                            fontFamily: "'Barlow',sans-serif",
                            fontSize: "0.88rem",
                            letterSpacing: "0.03em",
                            color: "rgba(255,255,255,0.95)",
                            lineHeight: 1.5,
                          }}
                        >
                          {p}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
                <ul className="space-y-2 md:space-y-2.5 mt-2.5">
                  {block.perks.slice(4).map((p) => (
                    <li key={p} className="flex items-start gap-3">
                      <Check size={12} style={{ color: block.color, marginTop: "3px", flexShrink: 0 }} />
                      <span
                        className="max-md:text-[0.8125rem] max-md:leading-snug"
                        style={{
                          fontFamily: "'Barlow',sans-serif",
                          fontSize: "0.88rem",
                          letterSpacing: "0.03em",
                          color: "rgba(255,255,255,0.95)",
                          lineHeight: 1.5,
                        }}
                      >
                        {p}
                      </span>
                    </li>
                  ))}
                </ul>
              </>
            ) : (
              <ul className="space-y-2 md:space-y-2.5">
                {block.perks.map((p) => (
                  <li key={p} className="flex items-start gap-3">
                    <Check size={12} style={{ color: block.color, marginTop: "3px", flexShrink: 0 }} />
                    <span
                      className="max-md:text-[0.8125rem] max-md:leading-snug"
                      style={{
                        fontFamily: "'Barlow',sans-serif",
                        fontSize: "0.88rem",
                        letterSpacing: "0.03em",
                        color: "rgba(255,255,255,0.95)",
                        lineHeight: 1.5,
                      }}
                    >
                      {p}
                    </span>
                  </li>
                ))}
              </ul>
            )}
          </div>
          <a
            href="#"
            onClick={(e) => {
              if (block.id === "clubs" || block.id === "smartshell" || block.id === "franchise" || block.id === "shops" || block.id === "stands" || block.id === "company") {
                e.preventDefault();
                setReqModalAudience(block.id);
                setClubReqModalOpen(true);
              }
            }}
            className={
              "ticket-cta-btn mt-4 md:mt-5 w-full flex items-center justify-center gap-2 py-3.5 max-md:py-3 max-md:px-2 max-md:gap-1 max-md:min-h-[46px] relative overflow-hidden transition-all duration-240 shrink-0 " +
              "max-md:text-[0.7rem] max-md:tracking-[0.06em] max-md:leading-tight max-md:text-center"
            }
            style={
              block.featured
                ? {
                    background: block.color,
                    clipPath: "polygon(10px 0,100% 0,calc(100% - 10px) 100%,0 100%)",
                    fontFamily: "'Barlow Condensed',sans-serif",
                    fontWeight: 900,
                    fontSize: "0.8rem",
                    letterSpacing: "0.22em",
                    color: "#040410",
                    textTransform: "uppercase",
                  }
                : {
                    border: `1px solid ${block.color}45`,
                    color: block.color,
                    background: `${block.color}07`,
                    clipPath: "polygon(10px 0,100% 0,calc(100% - 10px) 100%,0 100%)",
                    fontFamily: "'Barlow Condensed',sans-serif",
                    fontWeight: 900,
                    fontSize: "0.8rem",
                    letterSpacing: "0.22em",
                    textTransform: "uppercase",
                  }
            }
          >
            <span className="max-md:hidden">{block.cta ?? tr("Зарегестрироваться")}</span>
            <span className="md:hidden">{block.ctaMobile ?? tr("Регистрация")}</span>
            <ChevronRight size={14} className="max-md:size-3 shrink-0" />
          </a>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-px" style={{ background: `linear-gradient(90deg, transparent, ${block.color}55, transparent)` }} />
      </>
    );
  };

  const guestFeatured = audience === "guests" && t.featured;
  const guestCard = audience === "guests" ? t : null;
  const b2bCard = audience !== "guests" && localizedB2b ? localizedB2b : null;

  return (
    <section
      className="tickets-section-root sec-fullscreen relative overflow-hidden h-full min-h-0 flex flex-col"
      aria-labelledby="tickets-heading"
      style={{
        background: "#09091A",
        padding: "clamp(26px, 3.2vw, 44px) var(--sec-px) var(--sec-py) var(--sec-px)",
      }}
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

      <div className="flex flex-col flex-1 min-h-0 w-full max-w-[1380px] mx-auto relative z-10">
        <div className="text-center mb-2 md:mb-3 shrink-0 max-md:mt-5">
          <h2
            id="tickets-heading"
            className="gh-title text-white max-md:text-[clamp(2.175rem,9.6vw,2.925rem)] md:[font-size:var(--h2-sec)]"
          >
            <span style={{ color: "var(--c-cyan,#00E5FF)" }}>{isEn ? "Tickets" : "Билеты"}</span>
          </h2>
        </div>

        <div className="flex-1 min-h-0 flex flex-col">
          <div className="flex flex-col md:flex-row gap-3 w-full items-stretch md:justify-center md:flex-1 md:min-h-[min(48vh,468px)] md:max-h-[min(66vh,668px)] mb-1 md:mb-5">
            {/* Карточка: на мобилке под сеткой категорий */}
            <div className="flex flex-col flex-1 min-w-0 min-h-0 order-2 md:order-1 relative md:flex-none md:w-[min(100%,760px)]">
              {guestFeatured && (
                <div
                  className="flex items-center justify-center text-center shrink-0 w-full rounded-t-sm overflow-hidden h-9 md:h-10"
                  style={{ background: `linear-gradient(90deg, ${t.color}C0, ${t.color})` }}
                >
                  <span
                    className="max-md:tracking-[0.28em] max-md:text-[0.5rem]"
                    style={{
                      fontFamily: "'Barlow Condensed',sans-serif",
                      fontWeight: 900,
                      fontSize: "0.58rem",
                      letterSpacing: "0.38em",
                      color: "#040410",
                      textTransform: "uppercase",
                    }}
                  >
                    {isEn ? "✦ Most Popular ✦" : "✦ Самый популярный ✦"}
                  </span>
                </div>
              )}
              {b2bCard?.featured && (
                <div
                  className="flex items-center justify-center text-center shrink-0 w-full rounded-t-sm overflow-hidden h-9 md:h-10"
                  style={{ background: `linear-gradient(90deg, ${b2bCard.color}C0, ${b2bCard.color})` }}
                >
                  <span
                    className="max-md:tracking-[0.28em] max-md:text-[0.5rem]"
                    style={{
                      fontFamily: "'Barlow Condensed',sans-serif",
                      fontWeight: 900,
                      fontSize: "0.58rem",
                      letterSpacing: "0.38em",
                      color: "#040410",
                      textTransform: "uppercase",
                    }}
                  >
                    {isEn ? "✦ B2B Format ✦" : "✦ B2B-формат ✦"}
                  </span>
                </div>
              )}
              <div
                className={
                  "relative flex flex-col flex-1 min-h-0 overflow-hidden max-md:max-h-none " +
                  (guestFeatured || b2bCard?.featured ? "ticket-shimmer holo-card rounded-b-sm" : "ticket-shimmer rounded-sm md:max-h-[min(66vh,668px)]")
                }
                style={{
                  background: guestCard?.bg ?? b2bCard?.bg,
                  border: `1px solid ${guestCard?.border ?? b2bCard?.border}`,
                  borderTopWidth: guestFeatured || b2bCard?.featured ? 0 : 1,
                }}
              >
                {audience === "guests" && (
                  <>
                    <button
                      type="button"
                      onClick={goPrev}
                      className="absolute left-0 top-0 bottom-0 z-20 w-9 md:w-11 flex items-center justify-center transition-opacity hover:opacity-100 opacity-70 touch-manipulation"
                      style={{ color: t.color }}
                      aria-label={isEn ? "Previous ticket" : "Предыдущий билет"}
                    >
                      <ChevronLeft size={24} strokeWidth={1.5} />
                    </button>
                    <button
                      type="button"
                      onClick={goNext}
                      className="absolute right-0 top-0 bottom-0 z-20 w-9 md:w-11 flex items-center justify-center transition-opacity hover:opacity-100 opacity-70 touch-manipulation"
                      style={{ color: t.color }}
                      aria-label={isEn ? "Next ticket" : "Следующий билет"}
                    >
                      <ChevronRight size={24} strokeWidth={1.5} />
                    </button>
                  </>
                )}

                <div className="relative flex flex-col flex-1 min-h-0 overflow-hidden pl-8 pr-8 md:pl-10 md:pr-10">
                  {audience === "guests" && detailBody(t)}
                  {b2bCard && b2bBody(b2bCard)}
                </div>
              </div>

              {audience === "guests" && (
                <div className="flex md:hidden justify-center items-center gap-2 pt-2.5 pb-0.5" role="presentation">
                  {TICKETS.map((tk, i) => (
                    <button
                      key={tk.id}
                      type="button"
                      aria-label={`${tk.label}: ${tk.display}`}
                      aria-current={i === index ? "true" : undefined}
                      onClick={() => setIndex(i)}
                      className="h-2 rounded-full transition-all duration-200 touch-manipulation"
                      style={{
                        width: i === index ? 22 : 7,
                        background: i === index ? tk.color : "rgba(255,255,255,0.22)",
                        boxShadow: i === index ? `0 0 10px ${tk.color}44` : undefined,
                      }}
                    />
                  ))}
                </div>
              )}
            </div>

            {/* Категории: на мобилке select, на десктопе список кнопок */}
            <div className="w-full shrink-0 order-1 md:order-2 md:flex md:flex-col md:flex-none md:w-[min(100%,320px)] md:min-h-0 md:gap-1.5">
              <div className="md:hidden mb-2">
                <label
                  htmlFor="tickets-audience-select"
                  className="block mb-1.5"
                  style={{
                    fontFamily: "'Barlow Condensed',sans-serif",
                    fontSize: "0.56rem",
                    letterSpacing: "0.28em",
                    color: "rgba(255,255,255,0.55)",
                    textTransform: "uppercase",
                  }}
                >
                  {isEn ? "Category" : "Категория"}
                </label>
                <select
                  id="tickets-audience-select"
                  value={audience}
                  onChange={(e) => setAudience(e.target.value as AudienceId)}
                  className="ticket-mobile-select w-full h-12 px-3 rounded-sm"
                  aria-label={isEn ? "Ticket category" : "Категория билетов"}
                >
                  {AUDIENCE_NAV.map((item) => (
                    <option key={item.id} value={item.id}>
                      {tr(item.short)}
                    </option>
                  ))}
                </select>
              </div>

              <div
                className="hidden md:grid md:grid-cols-1 md:gap-1.5 w-full md:flex-1"
                role="tablist"
                aria-label={isEn ? "Ticket category" : "Категория билетов"}
              >
                {AUDIENCE_NAV.map((item) => {
                const Icon = item.Icon;
                const selected = audience === item.id;
                const accent =
                  item.id === "guests"
                    ? { color: "#00E5FF", bg: "rgba(0,229,255,0.06)", border: "rgba(0,229,255,0.25)" }
                    : (() => {
                        const b = B2B.find((x) => x.id === item.id);
                        return b ? { color: b.color, bg: b.bg, border: b.border } : { color: "#fff", bg: "rgba(255,255,255,0.02)", border: "rgba(255,255,255,0.08)" };
                      })();
                  return (
                    <button
                      key={item.id}
                      type="button"
                      role="tab"
                      aria-selected={selected}
                      onClick={() => setAudience(item.id)}
                      className="ticket-shimmer relative flex w-full items-center gap-2.5 md:gap-3 px-3 py-2 md:px-5 md:py-3 text-left min-h-[50px] md:min-h-[64px] md:flex-1 overflow-hidden transition-all duration-200 rounded-sm touch-manipulation cursor-pointer"
                      style={{
                        background: selected ? accent.bg : "rgba(255,255,255,0.02)",
                        border: `1px solid ${selected ? accent.border : "rgba(255,255,255,0.08)"}`,
                        boxShadow: selected ? `0 0 20px ${accent.color}18` : undefined,
                      }}
                    >
                      <div
                        className="flex items-center justify-center shrink-0 w-9 h-9 md:w-11 md:h-11"
                        style={{
                          background: `${accent.color}12`,
                          border: `1px solid ${selected ? `${accent.color}40` : "rgba(255,255,255,0.12)"}`,
                          clipPath: "polygon(10% 0,100% 0,90% 100%,0 100%)",
                        }}
                      >
                        <Icon size={15} style={{ color: selected ? accent.color : "rgba(255,255,255,0.45)" }} />
                      </div>
                      <div className="min-w-0 flex-1 text-left">
                        <div
                          className="gh-title leading-snug text-[0.78rem] md:text-[clamp(0.95rem,2.8vw,1.2rem)] md:leading-tight tracking-wide"
                          style={{
                            color: selected ? "rgba(255,255,255,0.95)" : "rgba(255,255,255,0.95)",
                            letterSpacing: "0.02em",
                          }}
                        >
                          <span>{tr(item.title)}</span>
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>
              <button
                type="button"
                onClick={() => setRulesModalOpen(true)}
                className="ticket-shimmer relative flex w-full items-center gap-2.5 md:gap-3 px-3 py-2 md:px-5 md:py-3 text-left min-h-[50px] md:min-h-[64px] md:flex-none overflow-hidden transition-all duration-200 rounded-sm touch-manipulation cursor-pointer"
                style={{
                  background: "linear-gradient(90deg, rgba(0,229,255,0.08), rgba(0,229,255,0.02) 40%, rgba(255,255,255,0.02) 100%)",
                  border: "1px solid rgba(0,229,255,0.28)",
                  boxShadow: "0 0 20px rgba(0,229,255,0.12)",
                }}
                aria-label={isEn ? "Participation Rules" : "Правила участия"}
              >
                <div
                  className="flex items-center justify-center shrink-0 w-9 h-9 md:w-11 md:h-11"
                  style={{
                    background: "rgba(0,229,255,0.14)",
                    border: "1px solid rgba(0,229,255,0.45)",
                    clipPath: "polygon(10% 0,100% 0,90% 100%,0 100%)",
                  }}
                >
                  <Check size={15} style={{ color: "#00E5FF" }} />
                </div>
                <div className="min-w-0 flex-1 text-left">
                  <div
                    className="max-md:text-[0.54rem]"
                    style={{
                      fontFamily: "'Barlow Condensed',sans-serif",
                      fontSize: "0.56rem",
                      letterSpacing: "0.3em",
                      color: "rgba(0,229,255,0.9)",
                      textTransform: "uppercase",
                      marginBottom: "2px",
                    }}
                  >
                    {isEn ? "Info" : "Инфо"}
                  </div>
                  <div
                    className="gh-title leading-snug text-[0.78rem] md:text-[clamp(0.95rem,2.8vw,1.2rem)] md:leading-tight tracking-wide"
                    style={{
                      color: "rgba(255,255,255,0.97)",
                      letterSpacing: "0.02em",
                    }}
                  >
                    {isEn ? "Participation Rules" : "Правила участия"}
                  </div>
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>
      <Dialog open={rulesModalOpen} onOpenChange={setRulesModalOpen}>
        <DialogContent
          className={cn(
            "border-[rgba(255,255,255,0.08)] bg-[#050508] text-white p-0 gap-0 overflow-hidden",
            "[&>button]:z-20 [&>button]:text-white [&>button]:opacity-90 [&>button:hover]:opacity-100 [&>button]:right-6 [&>button]:top-6",
            "max-h-[90dvh] w-[calc(100%-2rem)] sm:max-w-[640px]",
            "rounded-lg shadow-[0_24px_80px_rgba(0,0,0,0.6)] overflow-y-auto",
          )}
          style={{ fontFamily: "'Barlow', sans-serif", letterSpacing: "0.02em" }}
        >
          <div className="absolute inset-0 bg-dots opacity-10 pointer-events-none rounded-lg" />
          <div className="relative z-10 p-6 pt-12 pr-12 sm:p-8 sm:pt-12 sm:pr-14">
            <DialogHeader className="text-left space-y-2 mb-5">
              <div
                className="text-[var(--c-cyan,#00E5FF)] font-bold text-[0.58rem] tracking-[0.42em] uppercase"
                style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
              >
                {isEn ? "Rules" : "Правила"}
              </div>
              <DialogTitle
                className="gh-title text-white text-lg sm:text-xl leading-tight uppercase tracking-tight"
                style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 900 }}
              >
                {isEn ? "Ticket Terms" : "Условия по билетам"}
              </DialogTitle>
            </DialogHeader>

            <div className="space-y-4 text-sm sm:text-[0.95rem] leading-relaxed text-[rgba(255,255,255,0.86)]">
              {isEn ? (
                <>
                  <p><strong>1. Refunds.</strong> Tickets are non-refundable except in case of event cancellation.</p>
                  <p><strong>2. Late Arrival.</strong> If late by more than 15 minutes, participation may be cancelled.</p>
                  <p><strong>3. Conduct.</strong> Interfering with the event or the show is prohibited.</p>
                  <p><strong>4. Photo / Video.</strong> All participants consent to filming; content rights belong to GAMEHUB.</p>
                  <p><strong>5. Changes.</strong> The program may change without prior approval from participants.</p>
                  <p><strong>6. Show Admission.</strong> Participation in the show is determined by organizers; a ticket does not guarantee participation.</p>
                </>
              ) : (
                <>
                  <p><strong>1. Возвраты.</strong> Билеты возврату не подлежат, кроме отмены мероприятия.</p>
                  <p><strong>2. Опоздание.</strong> Если опоздание больше 15 минут, участие может быть аннулировано.</p>
                  <p><strong>3. Правила поведения.</strong> Запрещено мешать проведению мероприятия и вмешиваться в шоу.</p>
                  <p><strong>4. Фото/видео.</strong> Все участники соглашаются на съёмку; контент принадлежит GAMEHUB.</p>
                  <p><strong>5. Изменения.</strong> Программа может меняться без согласования с участниками.</p>
                  <p><strong>6. Допуск к шоу.</strong> Участие в шоу определяется организаторами; билет не гарантирует участие.</p>
                </>
              )}
            </div>

            <DialogFooter className="pt-6">
              <button type="button" onClick={() => setRulesModalOpen(false)} className="btn-primary">
                {isEn ? "Close" : "Закрыть"}
              </button>
            </DialogFooter>
          </div>
        </DialogContent>
      </Dialog>
      <Dialog
        open={guestReqModalOpen}
        onOpenChange={(open) => {
          setGuestReqModalOpen(open);
          if (!open) {
            setGuestReqSubmitted(false);
            setGuestReqError(null);
          }
        }}
      >
        <DialogContent
          className={cn(
            "border-[rgba(255,255,255,0.08)] bg-[#050508] text-white p-0 gap-0 overflow-hidden",
            "[&>button]:z-20 [&>button]:text-white [&>button]:opacity-90 [&>button:hover]:opacity-100 [&>button]:right-6 [&>button]:top-6",
            "max-h-[90dvh] w-[calc(100%-2rem)] sm:max-w-[520px]",
            "rounded-lg shadow-[0_24px_80px_rgba(0,0,0,0.6)] overflow-y-auto",
          )}
          style={{ fontFamily: "'Barlow', sans-serif", letterSpacing: "0.03em" }}
        >
          <div className="absolute inset-0 bg-dots opacity-10 pointer-events-none rounded-lg" />
          <div className="relative z-10 p-6 pt-12 pr-12 sm:p-8 sm:pt-12 sm:pr-14">
            <DialogHeader className="text-left space-y-2 mb-5">
              <div
                className="text-[var(--c-cyan,#00E5FF)] font-bold text-[0.58rem] tracking-[0.42em] uppercase"
                style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
              >
                {isEn ? "Visitor registration" : "Регистрация посетителя"}
              </div>
              <DialogTitle
                className="gh-title text-white text-lg sm:text-xl leading-tight uppercase tracking-tight"
                style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 900 }}
              >
                {isEn ? "Ticket request" : "Заявка на билет"}
              </DialogTitle>
              <DialogDescription className="text-[rgba(255,255,255,0.4)] text-sm">
                {isEn ? "Leave your contact details and we will contact you." : "Оставьте контакты, и мы свяжемся с вами."}
              </DialogDescription>
            </DialogHeader>

            {guestReqSubmitted ? (
              <div className="space-y-5">
                <div className="py-6 text-center text-white text-sm">
                  {isEn ? "Request sent. We will contact you shortly." : "Заявка отправлена. Мы свяжемся с вами в ближайшее время."}
                </div>
                <div className="flex justify-center">
                  <button type="button" onClick={() => setGuestReqModalOpen(false)} className="btn-primary">
                    {isEn ? "Close" : "Закрыть"}
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleGuestRequestSubmit} className="space-y-4">
                <Input name="name" required placeholder={isEn ? "Name" : "Имя"} className={formFieldClass} />
                <Input name="phone" type="tel" required placeholder="+7 (777) 000-00-00" className={formFieldClass} />
                <Textarea
                  name="comment"
                  placeholder={isEn ? "Comment" : "Комментарий"}
                  rows={4}
                  className={cn(formFieldClass, "min-h-[100px] resize-none")}
                />
                {guestReqError && <p className="text-sm text-red-400">{guestReqError}</p>}
                <DialogFooter className="flex flex-col-reverse sm:flex-row gap-3 pt-2">
                  <button type="button" onClick={() => setGuestReqModalOpen(false)} className="btn-outline">
                    {isEn ? "Cancel" : "Отмена"}
                  </button>
                  <button type="submit" className="btn-primary" disabled={guestReqSubmitting}>
                    {guestReqSubmitting ? (isEn ? "Sending..." : "Отправка...") : (isEn ? "Submit request" : "Отправить заявку")}
                  </button>
                </DialogFooter>
              </form>
            )}
          </div>
        </DialogContent>
      </Dialog>
      <Dialog
        open={clubReqModalOpen}
        onOpenChange={(open) => {
          setClubReqModalOpen(open);
          if (!open) {
            setClubReqSubmitted(false);
            setClubReqError(null);
          }
        }}
      >
        <DialogContent
          className={cn(
            "border-[rgba(255,255,255,0.08)] bg-[#050508] text-white p-0 gap-0 overflow-hidden",
            "[&>button]:z-20 [&>button]:text-white [&>button]:opacity-90 [&>button:hover]:opacity-100 [&>button]:right-6 [&>button]:top-6",
            "max-h-[90dvh] w-[calc(100%-2rem)] sm:max-w-[520px]",
            "rounded-lg shadow-[0_24px_80px_rgba(0,0,0,0.6)] overflow-y-auto",
          )}
          style={{ fontFamily: "'Barlow', sans-serif", letterSpacing: "0.03em" }}
        >
          <div className="absolute inset-0 bg-dots opacity-10 pointer-events-none rounded-lg" />
          <div className="relative z-10 p-6 pt-12 pr-12 sm:p-8 sm:pt-12 sm:pr-14">
            <DialogHeader className="text-left space-y-2 mb-5">
              <div
                className="text-[var(--c-cyan,#00E5FF)] font-bold text-[0.58rem] tracking-[0.42em] uppercase"
                style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
              >
                {isEn ? "Company registration" : requisitesAudienceTitle}
              </div>
              <DialogTitle
                className="gh-title text-white text-lg sm:text-xl leading-tight uppercase tracking-tight"
                style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 900 }}
              >
                {isEn ? "Company details" : "Реквизиты компании"}
              </DialogTitle>
              <DialogDescription className="text-[rgba(255,255,255,0.4)] text-sm">
                {isEn ? "Enter company details for participation registration." : "Укажите данные компании для регистрации участия."}
              </DialogDescription>
            </DialogHeader>

            {clubReqSubmitted ? (
              <div className="space-y-5">
                <div className="py-6 text-center text-white text-sm">
                  {isEn ? "Request sent. We will contact you shortly." : "Заявка отправлена. Мы свяжемся с вами в ближайшее время."}
                </div>
                <div className="flex justify-center">
                  <button type="button" onClick={() => setClubReqModalOpen(false)} className="btn-primary">
                    {isEn ? "Close" : "Закрыть"}
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleClubRequestSubmit} className="space-y-4">
                <Input name="companyName" required placeholder={isEn ? "Company name" : "Название компании"} className={formFieldClass} />
                <Input name="contactName" required placeholder={isEn ? "Contact person" : "Контактное лицо"} className={formFieldClass} />
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Input name="email" type="email" required placeholder="Email" className={formFieldClass} />
                  <Input name="phone" type="tel" required placeholder="+7 (777) 000-00-00" className={formFieldClass} />
                </div>
                <Textarea
                  name="requisites"
                  required
                  placeholder={isEn ? "Company details (BIN, legal entity, legal address, bank, IBAN, etc.)" : "Реквизиты компании (БИН, ИП/ТОО, юр. адрес, банк, IBAN и др.)"}
                  rows={4}
                  className={cn(formFieldClass, "min-h-[100px] resize-none")}
                />
                {clubReqError && <p className="text-sm text-red-400">{clubReqError}</p>}
                <DialogFooter className="flex flex-col-reverse sm:flex-row gap-3 pt-2">
                  <button type="button" onClick={() => setClubReqModalOpen(false)} className="btn-outline">
                    {isEn ? "Cancel" : "Отмена"}
                  </button>
                  <button type="submit" className="btn-primary" disabled={clubReqSubmitting}>
                    {clubReqSubmitting ? (isEn ? "Sending..." : "Отправка...") : (isEn ? "Submit request" : "Отправить заявку")}
                  </button>
                </DialogFooter>
              </form>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </section>
  );
}
