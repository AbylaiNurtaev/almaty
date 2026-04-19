import { useEffect, useRef, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/app/components/ui/dialog";
import { Input } from "@/app/components/ui/input";
import { cn } from "@/app/components/ui/utils";
import { useLanguage } from "../context/LanguageContext";
import { submitRequest } from "../services/submitRequest";
const IMG = "https://images.unsplash.com/photo-1558324190-c940eb141401?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb21wdXRlciUyMGdhbWluZyUyMGNsdWIlMjByb29tJTIwZGFyayUyMG5lb24lMjByb3dzJTIwc2V0dXB8ZW58MXx8fHwxNzcyODAzOTE5fDA&ixlib=rb-4.1.0&q=80&w=1080";

import colizeumImg from "@/assets/clubs/COLIZEUM.png";
import cybershokeImg from "@/assets/clubs/CYBERSHOKE.jpg";
import cyberxImg from "@/assets/clubs/CYBERX.jpg";
import topgameImg from "@/assets/clubs/topgame.webp";
import trueGamersImg from "@/assets/clubs/TrueGamers.png";

const CLUB_IMAGES: Record<string, string> = {
  "COLIZEUM": colizeumImg,
  "CYBERX": cyberxImg,
  "CYBERSHOKE": cybershokeImg,
  "TOPGAME": topgameImg,
  "TrueGamers": trueGamersImg,
};

const CLUBS = [
  { name: "COLIZEUM",     locs: "50+", region: "Nationwide" },
  { name: "CYBERX",       locs: "30+", region: "Nationwide" },
  { name: "TOPGAME",      locs: "15+", region: "Kazakhstan" },
  { name: "CYBERSHOKE",   locs: "12+", region: "Almaty" },
  { name: "TrueGamers",   locs: "10+", region: "Almaty" },
];

const formFieldClass =
  "w-full bg-[#0a0a10] border border-[rgba(255,255,255,0.1)] rounded px-4 py-3 text-white placeholder:text-[rgba(255,255,255,0.35)] text-sm outline-none transition-colors focus:border-[var(--c-cyan,#00E5FF)] focus:ring-1 focus:ring-[rgba(0,229,255,0.25)]";

const STORAGE_KEY = "gamehub_franchise_submitted";
const COOLDOWN_MS = 30 * 60 * 1000;

function getStoredSubmission(): { submittedAt: number } | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const data = JSON.parse(raw) as { submittedAt: number };
    return typeof data?.submittedAt === "number" ? data : null;
  } catch {
    return null;
  }
}

function isInCooldown(): boolean {
  const stored = getStoredSubmission();
  if (!stored) return false;
  return Date.now() - stored.submittedAt < COOLDOWN_MS;
}

export function ClubNetworksSection() {
  const { language } = useLanguage();
  const isEn = language === "en";
  const [selectedIndex, setSelectedIndex] = useState<number | null>(0);
  const [isFranchiseModalOpen, setIsFranchiseModalOpen] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [phoneValue, setPhoneValue] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const autoRotateRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const AUTO_DELAY = 10000;
  const inCooldown = isInCooldown();

  const startAutoRotate = () => {
    if (autoRotateRef.current) clearInterval(autoRotateRef.current);
    autoRotateRef.current = setInterval(() => {
      setSelectedIndex((prev) => {
        if (prev === null) return 0;
        return (prev + 1) % CLUBS.length;
      });
    }, AUTO_DELAY);
  };

  const handleSelect = (index: number) => {
    setSelectedIndex(index);
    startAutoRotate();
  };

  useEffect(() => {
    startAutoRotate();
    return () => {
      if (autoRotateRef.current) clearInterval(autoRotateRef.current);
    };
  }, []);

  useEffect(() => {
    if (isFranchiseModalOpen) {
      setPhoneValue("");
      setSubmitError(null);
      if (!inCooldown) setIsSubmitted(false);
    }
  }, [isFranchiseModalOpen, inCooldown]);

  const bgImage = selectedIndex !== null && CLUB_IMAGES[CLUBS[selectedIndex].name]
    ? CLUB_IMAGES[CLUBS[selectedIndex].name]
    : IMG;

  const isClubPhoto = selectedIndex !== null && CLUB_IMAGES[CLUBS[selectedIndex].name];

  const renderPill = (i: number, mobileCompact?: boolean) => {
    const c = CLUBS[i];
    const isSelected = selectedIndex === i;
    return (
      <div key={c.name} className={`club-pill-wrapper ${mobileCompact ? "min-w-0 flex-1" : "max-md:shrink-0"}`}>
        {isSelected && (
          <svg className="club-timer-svg" viewBox="0 0 100 40" preserveAspectRatio="none">
            <rect className="club-timer-ring" x="1.5" y="1.5" width="97" height="37" rx="10" ry="10" />
          </svg>
        )}
        <button
          type="button"
          onClick={() => handleSelect(i)}
          className={
            "club-pill-button group flex items-center justify-center transition-all duration-300 cursor-pointer text-center w-full h-[58px] max-md:h-[44px] " +
            (mobileCompact
              ? "!py-2 !px-1 gap-0"
              : "gap-5 text-left max-md:gap-2 max-md:!py-2.5 max-md:!px-3")
          }
          style={{
            background: isSelected ? "rgba(0,229,255,0.08)" : "#09091A",
            padding: mobileCompact ? undefined : "16px 22px",
          }}
        >
          <span
            className={
              "gh-mono text-white group-hover:text-white/80 transition-colors duration-200 leading-tight " +
              (mobileCompact
                ? "!text-[0.55rem] !leading-tight break-words hyphens-auto px-0.5"
                : "flex-1 max-md:!text-[0.72rem] max-md:!tracking-wide whitespace-nowrap")
            }
            style={{ fontSize: mobileCompact ? undefined : "1.08rem" }}
          >
            {c.name}
          </span>
        </button>
      </div>
    );
  };

  const formatPhone = (raw: string): string => {
    const digits = raw.replace(/\D/g, "").slice(0, 11);
    if (digits.length === 0) return "";

    let i = 0;
    if (digits[0] === "8") i = 1;
    else if (digits[0] === "7") i = 1;

    const rest = digits.slice(i);

    if (rest.length <= 3) return `+7 (${rest}`;
    if (rest.length <= 6) return `+7 (${rest.slice(0, 3)}) ${rest.slice(3)}`;

    return `+7 (${rest.slice(0, 3)}) ${rest.slice(3, 6)}-${rest.slice(
      6,
      8
    )}-${rest.slice(8, 10)}`;
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPhoneValue(formatPhone(e.target.value));
  };

  const handleFranchiseSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formRef.current || isSubmitting) return;

    setIsSubmitting(true);
    setSubmitError(null);
    const formData = new FormData(formRef.current);
    const payload = {
      representativeFullName: String(formData.get("representativeFullName") ?? ""),
      franchiseWebsite: String(formData.get("franchiseWebsite") ?? ""),
      email: String(formData.get("email") ?? ""),
      phone: String(formData.get("phone") ?? ""),
    };

    try {
      await submitRequest({
        title: "Заявка на франшизу",
        source: "site/franchise-registration-modal",
        payload,
      });
      setIsSubmitted(true);
      try {
        localStorage.setItem(
          STORAGE_KEY,
          JSON.stringify({ submittedAt: Date.now() })
        );
      } catch {}
      setTimeout(() => setIsFranchiseModalOpen(false), 1500);
    } catch (error) {
      setSubmitError(error instanceof Error ? error.message : "Не удалось отправить заявку");
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderPlusPill = (mobileCompact?: boolean) => (
    <div key="club-plus-pill" className={`club-pill-wrapper ${mobileCompact ? "min-w-0 flex-1" : "max-md:shrink-0"}`}>
      <button
        type="button"
        onClick={() => setIsFranchiseModalOpen(true)}
        className={
          "club-pill-button group flex items-center justify-center transition-all duration-300 cursor-pointer text-center w-full h-[58px] max-md:h-[44px] " +
          (mobileCompact
            ? "!py-2 !px-1 gap-0"
            : "gap-5 text-left max-md:gap-2 max-md:!py-2.5 max-md:!px-3")
        }
        style={{
          background: "#09091A",
          padding: mobileCompact ? undefined : "16px 22px",
        }}
        aria-label={isEn ? "Open franchise application" : "Открыть заявку на франшизу"}
      >
        <span
          className={
            "gh-title text-white group-hover:text-white/80 transition-colors duration-200 leading-tight " +
            (mobileCompact
              ? "!text-[0.55rem] !leading-tight break-words hyphens-auto px-0.5"
              : "flex-1 max-md:!text-[0.72rem] max-md:!tracking-wide whitespace-nowrap")
          }
          style={{ fontSize: mobileCompact ? undefined : "1.08rem" }}
        >
          {isEn ? "Registration" : "Регистрация"}
        </span>
      </button>
    </div>
  );

  return (
    <section
      id="networks"
      className="sec-fullscreen relative overflow-hidden max-md:flex max-md:flex-col max-md:!p-0 max-md:!pt-[max(8px,env(safe-area-inset-top))]"
      style={{ padding: "var(--sec-py) var(--sec-px)" }}
    >
      <div key={bgImage} className="absolute inset-0 club-bg-fade-in">
        <div
          className="absolute inset-0 bg-cover bg-center max-md:bg-[position:center_30%]"
          style={{
            backgroundImage: `url(${bgImage})`,
            filter: isClubPhoto ? "none" : "brightness(0.35) saturate(0.9) contrast(1.05)",
          }}
        />
        <div
          className="absolute inset-0 max-md:opacity-95"
          style={{
            background: isClubPhoto
              ? "linear-gradient(180deg, rgba(9,9,26,0.35) 0%, rgba(9,9,26,0.25) 50%, rgba(9,9,26,0.5) 100%)"
              : "linear-gradient(180deg, rgba(9,9,26,0.82) 0%, rgba(9,9,26,0.72) 50%, rgba(9,9,26,0.88) 100%)",
          }}
        />
      </div>

      <div className="absolute inset-0 bg-dots opacity-14 pointer-events-none" />
      <div
        className="absolute left-0 inset-y-0 w-1/3 pointer-events-none max-md:hidden"
        style={{ background: "radial-gradient(ellipse at left, rgba(0,229,255,0.05) 0%, transparent 65%)" }}
      />

      <div
        className="max-md:w-full max-md:flex max-md:flex-col max-md:min-h-0 max-md:flex-1 max-md:items-center max-md:pt-1"
        style={{ maxWidth: "1380px", margin: "0 auto", position: "relative", zIndex: 10 }}
      >
        <div className="mb-14 max-md:mb-0 max-md:w-full max-md:text-center max-md:px-1 max-md:shrink-0">
          <h2
            className="gh-title text-white max-md:!text-[clamp(1.35rem,5.2vw,1.9rem)] max-md:!leading-tight"
            style={{ fontSize: "var(--h2-sec)" }}
          >
            {isEn ? "Invited" : "Приглашенные"}<br />
            <span style={{ color: "var(--c-cyan,#00E5FF)" }}>{isEn ? "franchises" : "франшизы"}</span>
          </h2>
        </div>
      </div>

      <div
        className="absolute z-[20] w-full px-[var(--sec-px)] bottom-20 left-1/2 -translate-x-1/2 max-md:!left-0 max-md:!right-0 max-md:!translate-x-0 max-md:!bottom-[max(12px,env(safe-area-inset-bottom))] max-md:!px-2 max-md:!w-full"
      >
        <div className="mx-auto flex justify-center max-w-[1380px] max-md:max-w-none w-full">
          {/* Десктоп: одна полоса как раньше */}
          <div className="hidden md:contents">
            <div
              className="club-switcher-bar"
              style={{
                gap: "1px",
                display: "flex",
                flexDirection: "row",
                flexWrap: "wrap",
                background: "rgba(255,255,255,0.06)",
                padding: "4px",
              }}
            >
              {CLUBS.map((_, i) => renderPill(i))}
              {renderPlusPill()}
            </div>
          </div>

          {/* Мобилка: ряд 1 — 4 кнопки, ряд 2 — 3 кнопки */}
          <div
            className="md:hidden w-full rounded-[10px] overflow-hidden p-1 gap-px flex flex-col"
            style={{ background: "rgba(255,255,255,0.06)" }}
          >
            <div className="grid grid-cols-4 gap-px w-full min-w-0">
              {CLUBS.slice(0, 4).map((_, i) => renderPill(i, true))}
            </div>
            <div className="grid grid-cols-4 gap-px w-full min-w-0">
              {CLUBS.slice(4).map((_, offset) => renderPill(4 + offset, true))}
              {renderPlusPill(true)}
            </div>
          </div>
        </div>
      </div>

      <Dialog open={isFranchiseModalOpen} onOpenChange={setIsFranchiseModalOpen}>
        <DialogContent
          className={cn(
            "border-[rgba(255,255,255,0.08)] bg-[#050508] text-white p-0 gap-0 overflow-hidden",
            "[&>button]:z-20 [&>button]:text-white [&>button]:opacity-90 [&>button:hover]:opacity-100 [&>button]:right-6 [&>button]:top-6",
            "max-h-[90dvh] w-[calc(100%-2rem)] sm:max-w-[420px]",
            "rounded-lg shadow-[0_24px_80px_rgba(0,0,0,0.6)] overflow-y-auto"
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
                {isEn ? "Franchise" : "Франшиза"}
              </div>
              <DialogTitle
                className="gh-title text-white text-lg sm:text-xl leading-tight uppercase tracking-tight"
                style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 900 }}
              >
                {isEn ? "Franchise Application" : "Заявка на франшизу"}
              </DialogTitle>
              <DialogDescription className="text-[rgba(255,255,255,0.4)] text-sm">
                {isEn
                  ? "Leave your contacts - we will discuss franchise terms."
                  : "Оставьте контакты — обсудим условия подключения к франшизе."}
              </DialogDescription>
            </DialogHeader>

            {(isSubmitted || inCooldown) ? (
              <div className="space-y-5">
                <div className="py-6 text-center text-white text-sm">
                  {isEn
                    ? "Request sent. We will contact you shortly."
                    : "Заявка отправлена. Мы свяжемся с вами в ближайшее время."}
                </div>
                <div className="flex justify-center">
                  <button type="button" onClick={() => setIsFranchiseModalOpen(false)} className="btn-primary">
                    {isEn ? "Close" : "Закрыть"}
                  </button>
                </div>
              </div>
            ) : (
              <form ref={formRef} onSubmit={handleFranchiseSubmit} className="space-y-4">
                <Input
                  name="representativeFullName"
                  required
                  placeholder={isEn ? "Representative full name" : "ФИО представителя"}
                  className={formFieldClass}
                />
                <Input
                  name="franchiseWebsite"
                  required
                  type="url"
                  placeholder={isEn ? "Franchise website" : "Сайт франшизы"}
                  className={formFieldClass}
                />
                <Input
                  name="email"
                  required
                  type="email"
                  placeholder={isEn ? "Email" : "Электронная почта"}
                  className={formFieldClass}
                />
                <Input
                  name="phone"
                  type="tel"
                  required
                  placeholder="+7 (777) 000-00-00"
                  value={phoneValue}
                  onChange={handlePhoneChange}
                  className={formFieldClass}
                />
                {submitError && <p className="text-sm text-red-400">{submitError}</p>}
                <DialogFooter className="flex flex-col-reverse sm:flex-row gap-3 pt-2">
                  <button type="button" onClick={() => setIsFranchiseModalOpen(false)} className="btn-outline">
                    {isEn ? "Cancel" : "Отмена"}
                  </button>
                  <button type="submit" className="btn-primary" disabled={isSubmitting}>
                    {isSubmitting ? (isEn ? "Sending..." : "Отправка...") : (isEn ? "Submit Request" : "Отправить заявку")}
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
