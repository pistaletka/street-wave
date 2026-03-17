"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useCookieConsent, type CookiePreferences } from "@/context/CookieConsentContext";

const categories: {
  key: keyof CookiePreferences;
  label: string;
  desc: string;
  locked?: boolean;
}[] = [
  {
    key: "necessary",
    label: "Необходимые cookie",
    desc: "Нужны для базовой работы сайта, отправки форм, навигации и безопасности.",
    locked: true,
  },
  {
    key: "analytics",
    label: "Аналитические cookie",
    desc: "Помогают понимать, как пользователи взаимодействуют с сайтом, чтобы улучшать его структуру и контент.",
  },
  {
    key: "marketing",
    label: "Маркетинговые cookie",
    desc: "Могут использоваться для оценки эффективности рекламы и взаимодействия с рекламными платформами, если такие инструменты подключены на сайте.",
  },
];

export default function CookieSettings() {
  const { showSettings, closeSettings, preferences, acceptAll, acceptNecessary, savePreferences } = useCookieConsent();
  const [local, setLocal] = useState<CookiePreferences>({
    necessary: true,
    analytics: preferences?.analytics ?? false,
    marketing: preferences?.marketing ?? false,
  });

  useEffect(() => {
    if (showSettings) {
      setLocal({
        necessary: true,
        analytics: preferences?.analytics ?? false,
        marketing: preferences?.marketing ?? false,
      });
    }
  }, [showSettings, preferences]);

  if (!showSettings) return null;

  const toggle = (key: keyof CookiePreferences) => {
    if (key === "necessary") return;
    setLocal((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/60 backdrop-blur-sm px-4">
      <div className="relative w-full max-w-lg border border-border bg-surface p-6 sm:p-8 max-h-[90vh] overflow-y-auto">
        <h2 className="sw-h2 text-xl mb-2">Настройки cookie</h2>
        <p className="text-sm leading-relaxed text-text-secondary mb-6">
          Мы используем cookie и похожие технологии для корректной работы сайта, сохранения пользовательских настроек,
          анализа посещаемости и поведения пользователей, улучшения контента, структуры и работы сайта.{" "}
          <Link href="/privacy" className="text-accent hover:underline" onClick={closeSettings}>
            Политика конфиденциальности
          </Link>
        </p>

        <div className="flex flex-col gap-4 mb-8">
          {categories.map((cat) => (
            <label
              key={cat.key}
              className={`flex items-start gap-3 ${cat.locked ? "cursor-default" : "cursor-pointer group"}`}
            >
              <input
                type="checkbox"
                checked={local[cat.key]}
                disabled={cat.locked}
                onChange={() => toggle(cat.key)}
                className="mt-1 h-4 w-4 shrink-0 appearance-none border border-border bg-transparent checked:border-accent checked:bg-accent transition-colors cursor-pointer disabled:opacity-60 disabled:cursor-default relative after:content-['✓'] after:absolute after:inset-0 after:flex after:items-center after:justify-center after:text-[10px] after:text-accent-foreground after:opacity-0 checked:after:opacity-100"
              />
              <div>
                <span className={`text-sm font-medium text-foreground ${!cat.locked ? "group-hover:text-accent transition-colors" : ""}`}>
                  {cat.label}
                </span>
                <p className="text-xs leading-relaxed text-text-secondary mt-0.5">{cat.desc}</p>
              </div>
            </label>
          ))}
        </div>

        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => savePreferences(local)}
            className="sw-btn h-10 border border-accent bg-accent px-5 text-accent-foreground transition-colors hover:bg-transparent hover:text-accent"
          >
            Сохранить выбор
          </button>
          <button
            onClick={acceptAll}
            className="sw-btn h-10 border border-border px-5 text-foreground transition-colors hover:border-accent hover:text-accent"
          >
            Принять все
          </button>
          <button
            onClick={acceptNecessary}
            className="sw-btn h-10 border border-border px-5 text-text-secondary transition-colors hover:border-accent hover:text-accent"
          >
            Только необходимые
          </button>
        </div>

        <button
          onClick={closeSettings}
          className="absolute top-4 right-4 text-text-secondary hover:text-foreground transition-colors text-lg"
          aria-label="Закрыть"
        >
          &times;
        </button>
      </div>
    </div>
  );
}
