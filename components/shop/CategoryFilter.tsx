"use client";

import { useMessages } from "next-intl";

interface CategoryFilterProps {
  current: string;
  onChange: (value: string) => void;
}

export default function CategoryFilter({ current, onChange }: CategoryFilterProps) {
  const messages = useMessages();
  const shopContent = messages.shop as any;
  return (
    <div className="flex flex-wrap gap-3">
      {shopContent.categories.map((cat) => (
        <button
          key={cat.value}
          onClick={() => onChange(cat.value)}
          className={`sw-btn h-10 border px-5 text-xs transition-colors ${
            current === cat.value
              ? "border-accent bg-accent text-accent-foreground"
              : "border-border text-text-secondary hover:border-foreground hover:text-foreground"
          }`}
        >
          {cat.label}
        </button>
      ))}
    </div>
  );
}
