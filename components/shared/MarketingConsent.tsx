"use client";

import Link from "next/link";
import { useLocale } from "next-intl";

interface MarketingConsentProps {
  id?: string;
}

export default function MarketingConsent({ id = "marketing-consent" }: MarketingConsentProps) {
  const locale = useLocale();

  // Hide marketing consent on English version
  if (locale !== "ru") return null;

  return (
    <label className="flex items-start gap-3 cursor-pointer group">
      <input
        type="checkbox"
        id={id}
        name="marketingConsent"
        className="mt-1 h-4 w-4 shrink-0 appearance-none border border-border bg-transparent checked:border-accent checked:bg-accent transition-colors cursor-pointer relative after:content-['✓'] after:absolute after:inset-0 after:flex after:items-center after:justify-center after:text-[10px] after:text-accent-foreground after:opacity-0 checked:after:opacity-100"
      />
      <span className="text-xs leading-relaxed text-text-secondary group-hover:text-foreground transition-colors">
        Я согласен(на) получать рекламные и информационные сообщения от Street Wave и ознакомлен(а) с{" "}
        <Link href="/privacy" target="_blank" className="text-accent hover:underline" onClick={(e) => e.stopPropagation()}>
          Политикой конфиденциальности
        </Link>
        .
      </span>
    </label>
  );
}
