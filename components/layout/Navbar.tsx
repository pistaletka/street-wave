"use client";

import { useState } from "react";
import Link from "next/link";
import { useMessages, useLocale } from "next-intl";
import { useCart } from "@/context/CartContext";
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
  const { count: cartCount } = useCart();

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
            className="relative flex h-6 w-6 items-center justify-center"
            aria-label={mobileMenu ? "Close menu" : "Menu"}
            onClick={() => setMobileMenu(!mobileMenu)}
          >
            {mobileMenu ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
                aria-hidden="true"
              >
                <path d="M4 4 L16 16 M16 4 L4 16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
            ) : (
              <span className="flex flex-col gap-1.5">
                <span className="block h-px w-6 bg-foreground" />
                <span className="block h-px w-6 bg-foreground" />
                <span className="block h-px w-6 bg-foreground" />
              </span>
            )}
            {cartCount > 0 && !mobileMenu && (
              <span className="absolute -right-1.5 -top-1.5 flex h-4 w-4 items-center justify-center rounded-full bg-accent text-[9px] font-bold text-accent-foreground">
                {cartCount}
              </span>
            )}
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
