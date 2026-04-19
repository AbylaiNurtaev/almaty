/**
 * Категории выставки брендов (8 направлений)
 * Используются в секции «Выставка брендов»
 */

const PALETTE = [
  "#00D4F5",
  "#6B21E8",
  "#E8A800",
  "#00C875",
  "#E8284A",
  "#00E5FF",
  "#7C3AED",
  "#F0B429",
];

export interface PartnerCategory {
  id: string;
  cat: string;
  color: string;
  count: string;
  brands: string[];
}

function countLabel(n: number): string {
  return String(n).padStart(2, "0");
}

const PARTNER_CATEGORIES_RAW: Omit<PartnerCategory, "count">[] = [
  {
    id: "soft",
    cat: "СОФТ",
    color: PALETTE[0],
    brands: ["SmartShell", "SmartHybrid", "SpinClub"],
  },
  {
    id: "devices",
    cat: "ДЕВАЙСЫ",
    color: PALETTE[1],
    brands: ["AULA", "MCHOSE", "ZONE 51", "ATK", "WLmouse", "LAMZU"],
  },
  {
    id: "hardware",
    cat: "ЖЕЛЕЗО",
    color: PALETTE[2],
    brands: [
      "MSI",
      "AOC",
      "Samsung",
      "Dell Alienware",
      "Ocypus",
      "Aerostar",
      "DAHUA",
    ],
  },
  {
    id: "telecom",
    cat: "ТЕЛЕКОМ",
    color: PALETTE[3],
    brands: ["BEELINE", "NLS Kazakhstan"],
  },
  {
    id: "shops",
    cat: "МАГАЗИНЫ",
    color: PALETTE[4],
    brands: ["KAMRAD"],
  },
  {
    id: "business",
    cat: "БИЗНЕС",
    color: PALETTE[5],
    brands: [
      "COLIZEUM",
      "CYBERX",
      "1SHOT",
      "TOPGAME",
      "CYBERSHOKE",
      "Т-Aрена",
      "Rave by Buster",
      "Halyk bank",
      "Kaspi bank",
      "Bereke bank",
      "Eurasian bank",
      "ASBIS",
      "Azerti",
      "Al-style",
      "ELCO",
      "Pulser",
      "STN",
      "Forcecom",
    ],
  },
  {
    id: "furniture",
    cat: "МЕБЕЛЬ",
    color: PALETTE[6],
    brands: ["Aqniet Holding", "ZONE 51"],
  },
  {
    id: "horeca",
    cat: "ХОРЕКА",
    color: PALETTE[7],
    brands: ["RedBull", "Monster", "Coca cola", "RG brands", "LIT energy", "Gorilla"],
  },
];

export const PARTNER_CATEGORIES: PartnerCategory[] = PARTNER_CATEGORIES_RAW.map((c) => ({
  ...c,
  count: countLabel(c.brands.length),
}));
