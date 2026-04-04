"use client";

import Link from "next/link";
import { useLocale } from "next-intl";

type LegalVariant = "contact" | "order";

interface LegalConsentProps {
  id?: string;
  consentError?: boolean;
  /** "contact" - формы обратной связи, проектов, ивентов. "order" - place-order, checkout. */
  variant?: LegalVariant;
}

const linkClass = "text-accent hover:underline";

export default function LegalConsent({ id = "legal-consent", consentError, variant = "contact" }: LegalConsentProps) {
  const locale = useLocale();
  const isRu = locale === "ru";

  return (
    <div className="flex flex-col gap-1.5">
      <label className="flex items-start gap-3 cursor-pointer group">
        <input
          type="checkbox"
          id={id}
          name="legalConsent"
          className="mt-1 h-4 w-4 shrink-0 appearance-none border border-border bg-transparent checked:border-accent checked:bg-accent transition-colors cursor-pointer relative after:content-['✓'] after:absolute after:inset-0 after:flex after:items-center after:justify-center after:text-[10px] after:text-accent-foreground after:opacity-0 checked:after:opacity-100"
        />
        <span className="text-xs leading-relaxed text-text-secondary group-hover:text-foreground transition-colors">
          {isRu ? (
            variant === "order" ? (
              <>
                Я даю{" "}
                <Link href="/consent" target="_blank" className={linkClass} onClick={(e) => e.stopPropagation()}>
                  согласие на обработку персональных данных
                </Link>
                , принимаю условия{" "}
                <Link href="/privacy" target="_blank" className={linkClass} onClick={(e) => e.stopPropagation()}>
                  Политики конфиденциальности
                </Link>
                {" "}и{" "}
                <Link href="/offers" target="_blank" className={linkClass} onClick={(e) => e.stopPropagation()}>
                  Публичной оферты
                </Link>
                .
              </>
            ) : (
              <>
                Я даю{" "}
                <Link href="/consent" target="_blank" className={linkClass} onClick={(e) => e.stopPropagation()}>
                  согласие на обработку персональных данных
                </Link>
                {" "}и принимаю условия{" "}
                <Link href="/privacy" target="_blank" className={linkClass} onClick={(e) => e.stopPropagation()}>
                  Политики конфиденциальности
                </Link>
                .
              </>
            )
          ) : (
            <>
              I agree to the{" "}
              <Link href="/terms" target="_blank" className={linkClass} onClick={(e) => e.stopPropagation()}>
                Terms of Service
              </Link>
              .
            </>
          )}
        </span>
      </label>
      {consentError && (
        <p className="text-xs text-red-400 ml-7">
          {isRu
            ? "Необходимо дать согласие на обработку персональных данных"
            : "You must agree to the Terms of Service"}
        </p>
      )}
    </div>
  );
}
