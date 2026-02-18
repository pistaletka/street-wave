"use client";

import { useState } from "react";
import Link from "next/link";
import common from "../../content/common.json";

export default function Navbar() {
  const [mobileMenu, setMobileMenu] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 border-b border-border bg-background/90 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5">
        <Link href="/" className="block text-foreground" aria-label="streetwave®">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/logo.svg" alt="streetwave®" className="h-5 w-auto" />
        </Link>
        <div className="hidden gap-8 md:flex">
          {common.nav.links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="sw-nav text-sm text-text-secondary transition-colors hover:text-foreground"
            >
              {link.label}
            </Link>
          ))}
        </div>
        <button
          className="flex flex-col gap-1.5 md:hidden"
          aria-label="Меню"
          onClick={() => setMobileMenu(!mobileMenu)}
        >
          <span
            className={`block h-px w-6 bg-foreground transition-transform ${
              mobileMenu ? "translate-y-[3.5px] rotate-45" : ""
            }`}
          />
          <span
            className={`block h-px w-6 bg-foreground transition-opacity ${
              mobileMenu ? "opacity-0" : ""
            }`}
          />
          <span
            className={`block h-px w-6 bg-foreground transition-transform ${
              mobileMenu ? "-translate-y-[3.5px] -rotate-45" : ""
            }`}
          />
        </button>
      </div>
      {mobileMenu && (
        <div className="border-t border-border px-6 py-4 md:hidden">
          <div className="flex flex-col gap-4">
            {common.nav.links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="sw-nav text-sm text-text-secondary transition-colors hover:text-foreground"
                onClick={() => setMobileMenu(false)}
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
}
