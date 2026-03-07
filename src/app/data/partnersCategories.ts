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
    cat: "Девайсы",
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
    cat: "Программное обеспечение",
    color: PALETTE[2],
    count: "05",
    brands: ["Senet", "Langame", "Smartshell", "Gizmo", "CCboot"],
  },
  {
    id: "components",
    cat: "Комплектующие",
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
    cat: "Кресла",
    color: PALETTE[5],
    count: "03",
    brands: ["Aqniet Holding", "Knight", "Oubu"],
  },
  {
    id: "drinks",
    cat: "Напитки",
    color: PALETTE[6],
    count: "06",
    brands: ["RedBull", "Monster", "Coca cola", "RG brands", "LIT energy", "Gorilla"],
  },
  {
    id: "telecom",
    cat: "Операторы связи",
    color: PALETTE[7],
    count: "04",
    brands: ["FREEDOM TELECOM", "BEELINE", "Казахтелеком", "NLS Kazakhstan"],
  },
  {
    id: "shops",
    cat: "Магазины",
    color: PALETTE[8],
    count: "20",
    brands: ["MYSKILL shop", "HappyPC", "HyperPC", "Starlinecomp", "KAMRAD"],
  },
  {
    id: "equipment",
    cat: "Оборудование",
    color: PALETTE[9],
    count: "03",
    brands: ["Aerostar", "DAHUA", "HIKVISION"],
  },
  {
    id: "service",
    cat: "Обслуживание",
    color: PALETTE[10],
    count: "03",
    brands: ["—", "—", "—"],
  },
  {
    id: "distributors",
    cat: "Дистрибьютеры",
    color: PALETTE[11],
    count: "07",
    brands: ["ASBIS", "Azerti", "Al-style", "ELCO", "Pulser", "STN", "Forcecom"],
  },
  {
    id: "delivery",
    cat: "Развозка",
    color: PALETTE[0],
    count: "01",
    brands: ["—"],
  },
];
