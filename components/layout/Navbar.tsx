"use client";

import { useState } from "react";
import Link from "next/link";
import { useMessages, useLocale } from "next-intl";
import CartBadge from "./CartBadge";

function LanguageSwitcher() {
  const locale = useLocale();
  const targetLocale = locale === "ru" ? "en" : "ru";

  function handleSwitch() {
    document.cookie = `sw-locale=${targetLocale};path=/;max-age=31536000;samesite=lax`;
    // On production, redirect to the other domain
    // On localhost, just reload (middleware reads the cookie)
    if (typeof window !== "undefined") {
      const host = window.location.host;
      if (host.includes("street-wave.ru") || host.includes("street-wave.com")) {
        const targetDomain = targetLocale === "en" ? "https://street-wave.com" : "https://street-wave.ru";
        window.location.href = targetDomain + window.location.pathname;
      } else {
        window.location.reload();
      }
    }
  }

  return (
    <button
      onClick={handleSwitch}
      className="sw-nav text-xs font-medium border border-border px-2.5 py-1 text-text-secondary transition-colors hover:border-accent hover:text-accent"
      aria-label={targetLocale === "en" ? "Switch to English" : "Переключить на русский"}
    >
      {targetLocale.toUpperCase()}
    </button>
  );
}

export default function Navbar() {
  const [mobileMenu, setMobileMenu] = useState(false);
  const messages = useMessages();
  const common = messages.common as any;

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 border-b border-border bg-background/90 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5">
        <Link href="/" className="block text-foreground" aria-label="streetwave®">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/logo.svg" alt="streetwave®" className="h-5 w-auto" />
        </Link>
        <div className="hidden items-center gap-8 md:flex">
          {common.nav.links.map((link: any) => (
            <Link
              key={link.href}
              href={link.href}
              className="sw-nav text-sm text-text-secondary transition-colors hover:text-foreground"
            >
              {link.label}
            </Link>
          ))}
          <CartBadge />
          <LanguageSwitcher />
        </div>
        <div className="flex items-center gap-3 md:hidden">
          <LanguageSwitcher />
          <button
            className="relative h-6 w-6"
            aria-label="Menu"
            onClick={() => setMobileMenu(!mobileMenu)}
          >
            <span
              className={`absolute left-0 block h-0.5 w-6 bg-foreground transition-all duration-300 ${
                mobileMenu ? "top-[11px] rotate-45" : "top-1"
              }`}
            />
            <span
              className={`absolute left-0 top-[11px] block h-0.5 w-6 bg-foreground transition-all duration-300 ${
                mobileMenu ? "opacity-0" : "opacity-100"
              }`}
            />
            <span
              className={`absolute left-0 block h-0.5 w-6 bg-foreground transition-all duration-300 ${
                mobileMenu ? "top-[11px] -rotate-45" : "top-[18px]"
              }`}
            />
          </button>
        </div>
      </div>
      {mobileMenu && (
        <div className="border-t border-border px-6 py-4 md:hidden">
          <div className="flex flex-col gap-4">
            {common.nav.links.map((link: any) => (
              <Link
                key={link.href}
                href={link.href}
                className="sw-nav text-sm text-text-secondary transition-colors hover:text-foreground"
                onClick={() => setMobileMenu(false)}
              >
                {link.label}
              </Link>
            ))}
            <div onClick={() => setMobileMenu(false)}>
              <CartBadge />
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
