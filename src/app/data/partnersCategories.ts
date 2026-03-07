/**
 * Категории и партнёры — данные из «Смета - Партнеры.pdf»
 * Используются в секции «Технологии и Выставка брендов»
 */

const PALETTE = [
  "#00D4F5", "#6B21E8", "#E8A800", "#00C875", "#E8284A",
  "#00E5FF", "#7C3AED", "#F0B429", "#00D97E", "#FF6500",
  "#F5B800", "#00E5FF",
];

export interface PartnerCategory {
  id: string;
  cat: string;
  color: string;
  count: string;
  brands: string[];
}

export const PARTNER_CATEGORIES: PartnerCategory[] = [
  {
    id: "devices",
    cat: "Компании по девайсам",
    color: PALETTE[0],
    count: "05",
    brands: ["DarkProject", "AULA", "MCHOSE", "REDDRAGON", "Havit"],
  },
  {
    id: "franchise",
    cat: "Компании по франшизам",
    color: PALETTE[1],
    count: "11",
    brands: ["COLIZEUM", "CYBERX", "1SHOT", "MYSKILL room", "TOPGAME", "CYBERSHOKE", "Т-Aрена", "Страйк арена", "Rave by Buster", "BRO arena", "TrueGamers"],
  },
  {
    id: "software",
    cat: "Компании по программному обеспечению",
    color: PALETTE[2],
    count: "05",
    brands: ["Senet", "Langame", "Smartshell", "Gizmo", "CCboot"],
  },
  {
    id: "components",
    cat: "Компании по комплектующим",
    color: PALETTE[3],
    count: "10",
    brands: ["MSI", "AOC", "Samsung", "Lenovo", "Dell Alienware", "PCcooler", "Ocypus", "ASUS", "Kingston", "XPG"],
  },
  {
    id: "banks",
    cat: "Банки",
    color: PALETTE[4],
    count: "04",
    brands: ["Halyk bank", "Kaspi bank", "Bereke bank", "Eurasian bank"],
  },
  {
    id: "chairs",
    cat: "Компании по креслам",
    color: PALETTE[5],
    count: "03",
    brands: ["Aqniet Holding", "Knight", "Oubu"],
  },
  {
    id: "drinks",
    cat: "Компании по напиткам",
    color: PALETTE[6],
    count: "06",
    brands: ["RedBull", "Monster", "Coca cola", "RG brands", "LIT energy", "Gorilla"],
  },
  {
    id: "telecom",
    cat: "Компании операторы связи",
    color: PALETTE[7],
    count: "04",
    brands: ["FREEDOM TELECOM", "BEELINE", "Казахтелеком", "NLS Kazakhstan"],
  },
  {
    id: "shops",
    cat: "Компании магазины",
    color: PALETTE[8],
    count: "20",
    brands: ["MYSKILL shop", "HappyPC", "HyperPC", "Starlinecomp", "KAMRAD"],
  },
  {
    id: "equipment",
    cat: "Компании иное оборудование",
    color: PALETTE[9],
    count: "03",
    brands: ["Aerostar", "DAHUA", "HIKVISION"],
  },
  {
    id: "service",
    cat: "Обслуживающие компании",
    color: PALETTE[10],
    count: "03",
    brands: ["—", "—", "—"],
  },
  {
    id: "distributors",
    cat: "Компании дистрибьютеры",
    color: PALETTE[11],
    count: "07",
    brands: ["ASBIS", "Azerti", "Al-style", "ELCO", "Pulser", "STN", "Forcecom"],
  },
  {
    id: "delivery",
    cat: "Компании развозки",
    color: PALETTE[0],
    count: "01",
    brands: ["—"],
  },
];

/** Один партнёр (компания) для отображения отдельным блоком */
export interface PartnerBlock {
  id: string;
  name: string;
  categoryId: string;
  cat: string;
  color: string;
  count: string;
}

/** Плоский список: каждая компания — отдельный элемент для одного блока */
export function getPartnersFlat(): PartnerBlock[] {
  const list: PartnerBlock[] = [];
  PARTNER_CATEGORIES.forEach((c) => {
    c.brands.forEach((name, i) => {
      list.push({
        id: `${c.id}-${i}-${name}`,
        name,
        categoryId: c.id,
        cat: c.cat,
        color: c.color,
        count: c.count,
      });
    });
  });
  return list;
}
