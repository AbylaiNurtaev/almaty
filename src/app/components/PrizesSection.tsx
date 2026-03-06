import { Monitor, Cpu, Keyboard, Smartphone, Zap, ArrowRight } from "lucide-react";

const IMG = "https://images.unsplash.com/photo-1514820720301-4c4790309f46?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlc3BvcnRzJTIwdmljdG9yeSUyMGNlbGVicmF0aW9uJTIwY2hhbXBpb24lMjB0cm9waHklMjBhd2FyZCUyMHdpbiUyMHRlYW18ZW58MXx8fHwxNzcyODA1NDU5fDA&ixlib=rb-4.1.0&q=80&w=1080";

const PRIZES = [
  { Icon: Cpu,        title: "Игровые ПК",      desc: "Высокопроизводительные сборки от топовых брендов для чемпионов.",   color: "#00D4F5", n: "01", tag: "Главный приз" },
  { Icon: Monitor,    title: "4K Мониторы",     desc: "4K дисплеи с высокой частотой обновления для гейминга нового уровня.",            color: "#6B21E8", n: "02", tag: "Железо" },
  { Icon: Keyboard,   title: "Периферия",     desc: "Клавиатуры, мыши, наушники и премиум игровые аксессуары.",        color: "#E8A800", n: "03", tag: "Экипировка" },
  { Icon: Smartphone, title: "Гаджеты",    desc: "Смартфоны, планшеты, умные часы и потребительская электроника.",     color: "#00C875", n: "04", tag: "Техника" },
  { Icon: Zap,        title: "Спецпризы",  desc: "Эксклюзивные наборы и загадочные пакеты на тысячи долларов.",          color: "#E8284A", n: "05", tag: "Эксклюзив" },
];

export function PrizesSection() {
  return (
    <section id="prizes" className="relative overflow-hidden"
      style={{ background: "#09091A", padding: "var(--sec-py) var(--sec-px)" }}>

      <div className="absolute inset-0 bg-dots opacity-14 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-1/2 h-2/3 pointer-events-none"
        style={{ background: "radial-gradient(ellipse at left bottom, rgba(124,58,237,0.07) 0%, transparent 65%)" }} />
      <div className="absolute top-0 right-0 w-1/2 h-2/3 pointer-events-none"
        style={{ background: "radial-gradient(ellipse at right top, rgba(0,229,255,0.05) 0%, transparent 65%)" }} />
      <div className="wm" style={{ fontSize: "clamp(10rem,20vw,18rem)", right: "-2rem", top: "-1rem" }}>06</div>

      <div style={{ maxWidth: "1380px", margin: "0 auto", position: "relative", zIndex: 10 }}>

        {/* Header + hero image */}
        <div className="grid md:grid-cols-2 gap-16 items-center mb-14">
          <div>
            <div className="eyebrow">Выигрывайте крупно</div>
            <h2 className="gh-title text-white mb-7" style={{ fontSize: "var(--h2-sec)" }}>
              Призы<br />
              <span style={{ color: "var(--c-cyan,#00E5FF)" }}>фестиваля</span>
            </h2>
            <p className="mb-9" style={{ fontFamily: "'Barlow',sans-serif", fontSize: "1rem", color: "rgba(255,255,255,0.38)", lineHeight: 1.78, maxWidth: "440px" }}>
              Тысячи долларов в призах: игровые ПК, мониторы, периферия и эксклюзивная техника — ждут чемпионов.
            </p>
            <div className="flex flex-wrap gap-2">
              {["Игровые ПК","4K Мониторы","Наушники","Смартфоны","+Ещё"].map((t) => (
                <span key={t} className="tag-angled"
                  style={{ background: "rgba(0,229,255,0.05)", border: "1px solid rgba(0,229,255,0.15)", color: "rgba(255,255,255,0.3)", padding: "6px 15px" }}>{t}</span>
              ))}
            </div>
          </div>

          {/* Image panel */}
          <div className="relative overflow-hidden clip-both">
            <img src={IMG} alt="Festival prizes" className="w-full object-cover"
              style={{ height: "clamp(200px,30vh,300px)", filter: "brightness(0.35) saturate(0.6)" }} />
            <div className="absolute inset-0" style={{ background: "linear-gradient(to right, rgba(9,9,26,0.8), transparent, rgba(9,9,26,0.8))" }} />
            <div className="absolute inset-0" style={{ background: "linear-gradient(to bottom, transparent, rgba(9,9,26,0.7))" }} />
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <div className="gh-title text-white" style={{ fontSize: "clamp(3.5rem,9vw,6.5rem)" }}>ВЫИГРЫВАЙ</div>
              <div className="gh-title" style={{ fontSize: "clamp(3.5rem,9vw,6.5rem)", color: "var(--c-cyan,#00E5FF)" }}>КРУПНО</div>
              <div style={{ fontFamily: "'Barlow Condensed',sans-serif", fontSize: "0.58rem", letterSpacing: "0.45em", color: "rgba(255,255,255,0.3)", textTransform: "uppercase", marginTop: "12px" }}>Тысячи в призах</div>
            </div>
            <div className="absolute top-0 left-0 right-0 h-px" style={{ background: "linear-gradient(90deg, transparent, rgba(0,229,255,0.5), transparent)" }} />
          </div>
        </div>

        {/* Prize cards */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-5 mb-px" style={{ gap: "1px", background: "rgba(255,255,255,0.06)" }}>
          {PRIZES.map((p) => {
            const Icon = p.Icon;
            return (
              <div key={p.title}
                className="group relative overflow-hidden flex flex-col cursor-default transition-all duration-300"
                style={{ background: "#09091A", minHeight: "260px", padding: "34px 28px" }}>
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                  style={{ background: `radial-gradient(ellipse at 50% 0%, ${p.color}14 0%, transparent 65%)` }} />
                <div className="absolute bottom-0 left-0 right-0 h-px opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  style={{ background: `linear-gradient(90deg, transparent, ${p.color}, transparent)` }} />
                <div className="absolute top-0 left-0 bottom-0 w-[2px] opacity-0 group-hover:opacity-60 transition-opacity duration-300"
                  style={{ background: p.color }} />
                <div className="absolute right-2 bottom-2 select-none pointer-events-none"
                  style={{ fontFamily: "'Barlow Condensed',sans-serif", fontWeight: 900, fontSize: "5.5rem", lineHeight: 0.9, color: "rgba(255,255,255,0.012)" }}>{p.n}</div>

                <span className="tag-angled mb-6 w-fit" style={{ background: `${p.color}10`, border: `1px solid ${p.color}28`, color: p.color }}>{p.tag}</span>
                <div className="flex items-center justify-center mb-6 transition-all duration-350 group-hover:scale-110"
                  style={{ width: "52px", height: "52px", background: `${p.color}10`, border: `1px solid ${p.color}28`, clipPath: "polygon(10% 0,100% 0,90% 100%,0 100%)" }}>
                  <Icon size={18} style={{ color: p.color }} />
                </div>
                <h3 className="gh-title text-white relative z-10" style={{ fontSize: "1.6rem", marginBottom: "12px" }}>{p.title}</h3>
                <p className="relative z-10 flex-1" style={{ fontFamily: "'Barlow',sans-serif", fontSize: "0.88rem", color: "rgba(255,255,255,0.28)", lineHeight: 1.72 }}>{p.desc}</p>
              </div>
            );
          })}
        </div>

        {/* CTA */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-7 px-9 py-8"
          style={{ border: "1px solid rgba(0,229,255,0.12)", background: "rgba(0,229,255,0.03)" }}>
          <div className="flex items-center gap-6">
            <div className="w-px h-14 shrink-0 opacity-35" style={{ background: "var(--c-cyan,#00E5FF)" }} />
            <div>
              <div className="gh-title text-white" style={{ fontSize: "1.7rem" }}>Выигрывайте призы просто посещая</div>
              <div style={{ fontFamily: "'Barlow',sans-serif", fontSize: "0.88rem", color: "rgba(255,255,255,0.26)", marginTop: "5px" }}>Владельцы бесплатных билетов участвуют во всех розыгрышах и призовых лотереях</div>
            </div>
          </div>
          <a href="#tickets" className="btn-primary shrink-0">
            <span>Получить бесплатный билет</span>
            <ArrowRight size={14} />
          </a>
        </div>
      </div>
    </section>
  );
}