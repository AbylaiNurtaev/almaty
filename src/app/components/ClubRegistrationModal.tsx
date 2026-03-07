"use client";

import * as React from "react";
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

const formFieldClass =
  "w-full bg-[#0a0a10] border border-[rgba(255,255,255,0.1)] rounded px-4 py-3 text-white placeholder:text-[rgba(255,255,255,0.35)] text-sm outline-none transition-colors focus:border-[var(--c-cyan,#00E5FF)] focus:ring-1 focus:ring-[rgba(0,229,255,0.25)]";

const STORAGE_KEY = "gamehub_club_registration_submitted";
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

export function ClubRegistrationModal({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  if (!open) return null;

  const [submitted, setSubmitted] = React.useState(false);
  const [phoneValue, setPhoneValue] = React.useState("");
  const formRef = React.useRef<HTMLFormElement>(null);
  const inCooldown = isInCooldown();

  React.useEffect(() => {
    if (open) {
      setPhoneValue("");
      if (!inCooldown) setSubmitted(false);
    }
  }, [open]);

  const formatPhone = (raw: string): string => {
    const digits = raw.replace(/\D/g, "").slice(0, 11);
    if (digits.length === 0) return "";
    let i = 0;
    if (digits[0] === "8") i = 1;
    else if (digits[0] === "7") i = 1;
    const rest = digits.slice(i);
    if (rest.length <= 3) return `+7 (${rest}`;
    if (rest.length <= 6) return `+7 (${rest.slice(0, 3)}) ${rest.slice(3)}`;
    return `+7 (${rest.slice(0, 3)}) ${rest.slice(3, 6)}-${rest.slice(6, 8)}-${rest.slice(8, 10)}`;
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPhoneValue(formatPhone(e.target.value));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify({ submittedAt: Date.now() }));
    } catch {}
    setTimeout(() => onOpenChange(false), 1500);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className={cn(
          "border-[rgba(255,255,255,0.08)] bg-[#050508] text-white p-0 gap-0 overflow-hidden",
          "[&>button]:z-20 [&>button]:text-white [&>button]:opacity-90 [&>button:hover]:opacity-100 [&>button]:right-6 [&>button]:top-6",
          "max-h-[90dvh] w-[calc(100%-2rem)] sm:max-w-[420px]",
          "rounded-lg shadow-[0_24px_80px_rgba(0,0,0,0.6)] overflow-y-auto"
        )}
        style={{ fontFamily: "'Barlow', sans-serif" }}
      >
        <div className="absolute inset-0 bg-dots opacity-10 pointer-events-none rounded-lg" />
        <div className="relative z-10 p-6 pt-12 pr-12 sm:p-8 sm:pt-12 sm:pr-14">
          <DialogHeader className="text-left space-y-2 mb-5">
            <div
              className="text-[var(--c-cyan,#00E5FF)] font-bold text-[0.58rem] tracking-[0.42em] uppercase"
              style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
            >
              Регистрация клуба
            </div>
            <DialogTitle
              className="gh-title text-white text-lg sm:text-xl leading-tight uppercase tracking-tight"
              style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 900 }}
            >
              Зарегистрировать клуб
            </DialogTitle>
            <DialogDescription className="text-[rgba(255,255,255,0.4)] text-sm">
              Оставьте заявку — свяжемся и оформим регистрацию.
            </DialogDescription>
          </DialogHeader>

          {(submitted || inCooldown) ? (
            <div className="space-y-5">
              <div className="py-6 text-center text-white text-sm">
                Заявка отправлена. Мы свяжемся с вами в ближайшее время.
              </div>
              <div className="flex justify-center">
                <button type="button" onClick={() => onOpenChange(false)} className="btn-primary">
                  Закрыть
                </button>
              </div>
            </div>
          ) : (
            <form ref={formRef} onSubmit={handleSubmit} className="space-y-4">
              <Input name="name" required placeholder="Имя" className={formFieldClass} />
              <Input name="club" required placeholder="Название клуба" className={formFieldClass} />
              <Input
                name="phone"
                type="tel"
                placeholder="+7 (777) 000-00-00"
                value={phoneValue}
                onChange={handlePhoneChange}
                className={formFieldClass}
              />
              <DialogFooter className="flex flex-col-reverse sm:flex-row gap-3 pt-2">
                <button type="button" onClick={() => onOpenChange(false)} className="btn-outline">
                  Отмена
                </button>
                <button type="submit" className="btn-primary">
                  Отправить заявку
                </button>
              </DialogFooter>
            </form>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
