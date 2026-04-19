import { createContext, useContext, useMemo, useState } from "react";

export type Language = "ru" | "en";

type TranslationTree = {
  navbar: {
    links: { home: string; guests: string; activities: string; expo: string; tickets: string };
    tickets: string;
    openMenu: string;
    closeMenu: string;
    switchTo: string;
  };
  app: {
    tickerItems: string[];
  };
  hero: {
    meta: string;
    description: string;
    days: string;
    hours: string;
    mins: string;
    secs: string;
    freeTicket: string;
    vipAccess: string;
    clubRegistration: string;
    stats: { visitors: string; brands: string; streamers: string; days: string };
  };
  about: {
    attendanceLabel: string;
    visitorsTwoDays: string;
    title: string;
    p1: string;
    p2: string;
    p3: string;
    facts: { visitors: string; brands: string; streamers: string };
  };
  footer: {
    date: string;
    venue: string;
    legal: string;
    offer: string;
  };
};

const translations: Record<Language, TranslationTree> = {
  ru: {
    navbar: {
      links: {
        home: "Главная",
        guests: "Гости",
        activities: "Развлечения",
        expo: "Выставка",
        tickets: "Билеты",
      },
      tickets: "Получить билеты",
      openMenu: "Открыть меню",
      closeMenu: "Закрыть меню",
      switchTo: "EN",
    },
    app: {
      tickerItems: [
        "GAMEHUB 2026",
        "7 мая",
        "Дворец спорта Балуан Шолак",
        "CS2",
        "PUBG",
        "Dota 2",
        "7 000+ посетителей",
        "9+ стримеров",
        "40+ брендов",
        "Алматы · Казахстан",
        "Бесплатные билеты",
        "VIP-доступ",
      ],
    },
    hero: {
      meta: "7 мая 2026 · Дворец спорта Балуан Шолак · Алматы",
      description:
        "Турниры, выставки брендов, шоу-матчи, франшизы и вирусные челленджи на сцене — два незабываемых дня, определяющих игровую сцену Казахстана.",
      days: "Дней",
      hours: "Час",
      mins: "Мин",
      secs: "Сек",
      freeTicket: "Билеты",
      vipAccess: "Партнеры",
      clubRegistration: "Регистрация клуба",
      stats: {
        visitors: "Посетителей",
        brands: "Брендов",
        streamers: "Стримеров",
        days: "Дня",
      },
    },
    about: {
      attendanceLabel: "Ожидаемая посещаемость",
      visitorsTwoDays: "Посетителей за 2 дня",
      title: "Что такое",
      p1: "GAMEHUB — это крупнейший фестиваль игровой и компьютерной клубной индустрии в Казахстане — встреча всей игровой экосистемы под одной крышей.",
      p2: "Мероприятие объединяет геймеров, стримеров, владельцев компьютерных клубов и мировые игровые бренды на два незабываемых дня в Дворце спорта Балуан Шолак.",
      p3: "Живые турниры, шоу-матчи, выставки брендов, вирусные челленджи на сцене и автограф-сессии — всё в одном месте.",
      facts: {
        visitors: "Посетителей",
        brands: "бренд",
        streamers: "инфлюенсеров",
      },
    },
    footer: {
      date: "7 мая 2026",
      venue: "Дворец спорта Балуан Шолак",
      legal: "2026 Фестиваль GAMEHUB. Все права защищены. Алматы, Казахстан.",
      offer: "Публичная оферта",
    },
  },
  en: {
    navbar: {
      links: {
        home: "Home",
        guests: "Guests",
        activities: "Activities",
        expo: "Expo",
        tickets: "Tickets",
      },
      tickets: "Get Tickets",
      openMenu: "Open menu",
      closeMenu: "Close menu",
      switchTo: "RU",
    },
    app: {
      tickerItems: [
        "GAMEHUB 2026",
        "May 7",
        "Baluan Sholak Sports Palace",
        "CS2",
        "PUBG",
        "Dota 2",
        "7,000+ visitors",
        "9+ streamers",
        "40+ brands",
        "Almaty · Kazakhstan",
        "Free tickets",
        "VIP access",
      ],
    },
    hero: {
      meta: "May 7, 2026 · Baluan Sholak Sports Palace · Almaty",
      description:
        "Tournaments, brand showcases, showmatches, franchises, and viral stage challenges - two unforgettable days shaping Kazakhstan's gaming scene.",
      days: "Days",
      hours: "Hrs",
      mins: "Min",
      secs: "Sec",
      freeTicket: "Tickets",
      vipAccess: "Partners",
      clubRegistration: "Club Registration",
      stats: {
        visitors: "Visitors",
        brands: "Brands",
        streamers: "Streamers",
        days: "Days",
      },
    },
    about: {
      attendanceLabel: "Expected Attendance",
      visitorsTwoDays: "Visitors over 2 days",
      title: "What is",
      p1: "GAMEHUB is Kazakhstan's largest festival for gaming and computer club culture - the entire gaming ecosystem under one roof.",
      p2: "The event unites gamers, streamers, club owners, and global gaming brands for two unforgettable days at Baluan Sholak Sports Palace.",
      p3: "Live tournaments, showmatches, brand exhibitions, viral stage challenges, and autograph sessions - all in one place.",
      facts: {
        visitors: "Visitors",
        brands: "Brands",
        streamers: "Streamers",
      },
    },
    footer: {
      date: "May 7, 2026",
      venue: "Baluan Sholak Sports Palace",
      legal: "2026 GAMEHUB Festival. All rights reserved. Almaty, Kazakhstan.",
      offer: "Public Offer",
    },
  },
};

type LanguageContextValue = {
  language: Language;
  setLanguage: (language: Language) => void;
  toggleLanguage: () => void;
  t: TranslationTree;
};

const LanguageContext = createContext<LanguageContextValue | null>(null);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = useState<Language>("ru");

  const value = useMemo(
    () => ({
      language,
      setLanguage,
      toggleLanguage: () => setLanguage((prev) => (prev === "ru" ? "en" : "ru")),
      t: translations[language],
    }),
    [language],
  );

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) {
    throw new Error("useLanguage must be used within LanguageProvider");
  }
  return ctx;
}
