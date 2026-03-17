"use client";

import Link from "next/link";
import { useCookieConsent } from "@/context/CookieConsentContext";

export default function CookieBanner() {
  const { showBanner, acceptAll, acceptNecessary, openSettings } = useCookieConsent();

  if (!showBanner) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 border-t border-border bg-surface/95 backdrop-blur-sm px-6 py-5 animate-in slide-in-from-bottom">
      <div className="mx-auto flex max-w-5xl flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm leading-relaxed text-text-secondary max-w-2xl">
          Мы используем cookie, чтобы сайт работал корректно, а также для аналитики и улучшения сервиса.
          Продолжая пользоваться сайтом, вы соглашаетесь с использованием cookie в соответствии с{" "}
          <Link href="/privacy" className="text-accent hover:underline">
            Политикой конфиденциальности
          </Link>
          .
        </p>
        <div className="flex shrink-0 flex-wrap gap-2">
          <button
            onClick={acceptAll}
            className="sw-btn h-10 border border-accent bg-accent px-5 text-accent-foreground transition-colors hover:bg-transparent hover:text-accent"
          >
            Принять
          </button>
          <button
            onClick={acceptNecessary}
            className="sw-btn h-10 border border-border px-5 text-foreground transition-colors hover:border-accent hover:text-accent"
          >
            Только необходимые
          </button>
          <button
            onClick={openSettings}
            className="sw-btn h-10 border border-border px-5 text-text-secondary transition-colors hover:border-accent hover:text-accent"
          >
            Настройки
          </button>
        </div>
      </div>
    </div>
  );
}
