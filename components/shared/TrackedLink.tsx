"use client";

import { reachGoal } from "@/lib/analytics";
import { GOALS } from "@/lib/goals";

interface TrackedLinkProps {
  href: string;
  children: React.ReactNode;
  className?: string;
  target?: string;
  rel?: string;
}

function detectGoal(href: string): string | null {
  if (href.includes("t.me") || href.includes("telegram")) return GOALS.CLICK_TELEGRAM;
  if (href.includes("wa.me") || href.includes("whatsapp")) return GOALS.CLICK_WHATSAPP;
  if (href.startsWith("tel:")) return GOALS.CLICK_PHONE;
  if (href.startsWith("mailto:")) return GOALS.CLICK_EMAIL;
  return null;
}

export default function TrackedLink({ href, children, className, target, rel }: TrackedLinkProps) {
  const goal = detectGoal(href);

  return (
    <a
      href={href}
      className={className}
      target={target}
      rel={rel}
      onClick={() => {
        if (goal) reachGoal(goal, { href });
      }}
    >
      {children}
    </a>
  );
}
