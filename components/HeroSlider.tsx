"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";

const BANNERS = [
  "/hero-slide-1.png",
  "/hero-slide-2.png",
  "/hero-slide-3.png",
];

interface HeroSliderProps {
  badge: string;
  badgeSub?: string;
  title: string;
  subtitle: string;
  cta1: { label: string; href: string };
  cta2: { label: string; href: string };
}

export default function HeroSlider({ badge, badgeSub, title, subtitle, cta1, cta2 }: HeroSliderProps) {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % BANNERS.length);
    }, 3000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative flex min-h-[calc(60vh-73px)] md:min-h-[calc(80vh-73px)] flex-col items-center justify-center px-6 text-center overflow-hidden">
      {/* Desktop banner */}
      <div className="absolute inset-0 hidden md:block">
        {BANNERS.map((src, i) => (
          <Image
            key={src}
            src={src}
            alt=""
            fill
            className={`object-cover transition-opacity duration-1000 ${
              i === current ? "opacity-100" : "opacity-0"
            }`}
            priority={i === 0}
          />
        ))}
      </div>
      {/* Mobile banner */}
      <div className="absolute inset-0 md:hidden">
        <Image
          src="/hero-banner-main-mobile.png"
          alt=""
          fill
          className="object-cover"
          priority
        />
      </div>
      <div className="absolute inset-0 bg-black/60" />
      <div className="relative z-10 flex flex-col items-center">
        <p className="text-xs uppercase tracking-[0.25em] text-accent">{badge}</p>
        {badgeSub && <p className="text-xs uppercase tracking-[0.25em] text-accent mb-8">{badgeSub}</p>}
        <h1 className="sw-display w-full text-[clamp(1.75rem,5.5vw,8rem)] font-bold drop-shadow-lg md:whitespace-nowrap">
          {title}
        </h1>
        <p className="mt-6 max-w-xl sw-body text-white/80 whitespace-pre-line">
          {subtitle}
        </p>
        <div className="mt-10 flex flex-col gap-4 sm:flex-row">
          <Link
            href={cta1.href}
            className="sw-btn inline-flex h-12 items-center justify-center border border-accent bg-accent px-8 text-accent-foreground transition-colors hover:bg-transparent hover:text-accent"
          >
            {cta1.label}
          </Link>
          <Link
            href={cta2.href}
            className="sw-btn inline-flex h-12 items-center justify-center border border-white/70 px-8 text-white transition-colors hover:border-accent hover:text-accent"
          >
            {cta2.label}
          </Link>
        </div>
      </div>
    </section>
  );
}
