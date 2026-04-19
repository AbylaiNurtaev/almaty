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
import { useLanguage } from "../context/LanguageContext";
import { submitRequest } from "../services/submitRequest";

const formFieldClass =
  "w-full bg-[#0a0a10] border border-[rgba(255,255,255,0.1)] rounded px-4 py-3 text-white placeholder:text-[rgba(255,255,255,0.35)] text-sm outline-none transition-colors focus:border-[var(--c-cyan,#00E5FF)] focus:ring-1 focus:ring-[rgba(0,229,255,0.25)]";

export function StreamerApplicationModal({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  if (!open) return null;

  const { language } = useLanguage();
  const isEn = language === "en";
  const [submitted, setSubmitted] = React.useState(false);
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [submitError, setSubmitError] = React.useState<string | null>(null);
  const formRef = React.useRef<HTMLFormElement>(null);

  React.useEffect(() => {
    if (open) {
      setSubmitted(false);
      setSubmitError(null);
    }
  }, [open]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formRef.current || isSubmitting) return;

    setIsSubmitting(true);
    setSubmitError(null);
    const formData = new FormData(formRef.current);
    const youtube = String(formData.get("youtube") ?? "").trim();
    const twitch = String(formData.get("twitch") ?? "").trim();
    const instagram = String(formData.get("instagram") ?? "").trim();
    const tiktok = String(formData.get("tiktok") ?? "").trim();

    if (!youtube && !twitch && !instagram && !tiktok) {
      setSubmitError(
        isEn
          ? "Please provide at least one social link (YouTube, Twitch, Instagram, or TikTok)."
          : "Укажите хотя бы одну ссылку на соцсеть (YouTube, Twitch, Instagram или TikTok).",
      );
      setIsSubmitting(false);
      return;
    }

    const payload = {
      fullName: String(formData.get("fullName") ?? ""),
      email: String(formData.get("email") ?? ""),
      phone: String(formData.get("phone") ?? ""),
      youtube,
      twitch,
      instagram,
      tiktok,
    };

    try {
      await submitRequest({
        title: "Заявка на участие стримера",
        source: "site/streamer-application-modal",
        payload,
      });
      setSubmitted(true);
      setTimeout(() => onOpenChange(false), 1400);
    } catch (error) {
      setSubmitError(error instanceof Error ? error.message : "Не удалось отправить заявку");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className={cn(
          "border-[rgba(255,255,255,0.08)] bg-[#050508] text-white p-0 gap-0 overflow-hidden",
          "[&>button]:z-20 [&>button]:text-white [&>button]:opacity-90 [&>button:hover]:opacity-100 [&>button]:right-6 [&>button]:top-6",
          "max-h-[90dvh] w-[calc(100%-2rem)] sm:max-w-[480px] md:max-w-[520px]",
          "rounded-lg shadow-[0_24px_80px_rgba(0,0,0,0.6)] overflow-y-auto",
        )}
      >
        <div className="absolute inset-0 bg-dots opacity-10 pointer-events-none rounded-lg" />
        <div className="relative z-10 p-6 pt-12 pr-12 sm:p-8 sm:pt-12 sm:pr-14">
          <DialogHeader className="text-left space-y-2 mb-6">
            <div
              className="text-[var(--c-cyan,#00E5FF)] font-bold text-[0.58rem] tracking-[0.42em] uppercase"
              style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
            >
              {isEn ? "Application" : "Заявка на участие"}
            </div>
            <DialogTitle
              className="gh-title text-white text-xl sm:text-2xl leading-tight uppercase tracking-tight"
              style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 900 }}
            >
              {isEn ? "Become a GAMEHUB Streamer" : "Стать стримером GAMEHUB"}
            </DialogTitle>
            <DialogDescription className="text-[rgba(255,255,255,0.4)] text-sm">
              {isEn
                ? "Leave your contacts and channel links. We will get in touch."
                : "Оставьте контакты и ссылки на каналы. Мы свяжемся с вами."}
            </DialogDescription>
          </DialogHeader>

          {submitted ? (
            <div className="space-y-6">
              <div className="py-8 text-center text-white">
                {isEn
                  ? "Thanks! Request sent."
                  : "Спасибо! Ваша заявка отправлена."}
              </div>
              <div className="flex justify-center">
                <button type="button" onClick={() => onOpenChange(false)} className="btn-primary">
                  {isEn ? "Close" : "Закрыть"}
                </button>
              </div>
            </div>
          ) : (
            <form ref={formRef} onSubmit={handleSubmit} className="space-y-4">
              <Input
                name="fullName"
                required
                placeholder={isEn ? "Full Name" : "ФИО"}
                className={formFieldClass}
              />
              <Input
                name="email"
                required
                type="email"
                placeholder="Email"
                className={formFieldClass}
              />
              <Input
                name="phone"
                required
                type="tel"
                placeholder={isEn ? "Phone" : "Телефон"}
                className={formFieldClass}
              />
              <Input
                name="youtube"
                placeholder={isEn ? "Link to YouTube" : "Ссылка на YouTube"}
                className={formFieldClass}
              />
              <Input
                name="twitch"
                placeholder={isEn ? "Link to Twitch" : "Ссылка на Twitch"}
                className={formFieldClass}
              />
              <Input
                name="instagram"
                placeholder={isEn ? "Link to Instagram" : "Ссылка на Instagram"}
                className={formFieldClass}
              />
              <Input
                name="tiktok"
                placeholder={isEn ? "Link to TikTok" : "Ссылка на TikTok"}
                className={formFieldClass}
              />
              {submitError && <p className="text-sm text-red-400">{submitError}</p>}
              <DialogFooter className="flex flex-col-reverse sm:flex-row gap-3 pt-2">
                <button type="button" onClick={() => onOpenChange(false)} className="btn-outline">
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
  );
}
