"use client";

import { useLocale } from "next-intl";

interface TariffSelectButtonProps {
  tariffValue: string;
}

export default function TariffSelectButton({ tariffValue }: TariffSelectButtonProps) {
  const locale = useLocale();

  const handleClick = () => {
    const select = document.getElementById("po-tariff") as HTMLSelectElement | null;
    if (select) {
      select.value = tariffValue;
      select.dispatchEvent(new Event("change", { bubbles: true }));
    }
    document.getElementById("order-form")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      className="mt-6 sw-btn h-10 w-full border border-accent text-accent text-sm tracking-wide uppercase transition-colors hover:bg-accent hover:text-accent-foreground"
    >
      {locale === "ru" ? "Выбрать" : "Select"}
    </button>
  );
}
