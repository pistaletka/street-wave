"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";

const SLIDES = [
  { desktop: "/hero-slide-1.png", tablet: "/home-slide-1-tablet.jpg", mobile: "/home-slide-1-mobile.jpg" },
  { desktop: "/hero-slide-2.png", tablet: "/home-slide-2-tablet.jpg", mobile: "/home-slide-2-mobile.jpg" },
  { desktop: "/hero-slide-3.png", tablet: "/home-slide-3-tablet.jpg", mobile: "/home-slide-3-mobile.jpg" },
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
      setCurrent((prev) => (prev + 1) % SLIDES.length);
    }, 3000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative flex h-[380px] sm:h-auto sm:min-h-[calc(60vh-73px)] md:min-h-[calc(80vh-73px)] flex-col items-center justify-center px-6 text-center overflow-hidden">
      <div className="absolute inset-0">
        {SLIDES.map((slide, i) => (
          <picture key={slide.desktop}>
            <source media="(max-width: 639px)" srcSet={slide.mobile} />
            <source media="(max-width: 1023px)" srcSet={slide.tablet} />
            <Image
              src={slide.desktop}
              alt=""
              fill
              className={`object-cover transition-opacity duration-1000 ${
                i === current ? "opacity-100" : "opacity-0"
              }`}
              priority={i === 0}
            />
          </picture>
        ))}
      </div>
      <div className="absolute inset-0 bg-black/60" />
      <div className="relative z-10 flex flex-col items-center">
        <p className="text-[9px] sm:text-xs uppercase tracking-[0.18em] sm:tracking-[0.25em] text-accent whitespace-nowrap">{badge}</p>
        {badgeSub && <p className="text-[9px] sm:text-xs uppercase tracking-[0.18em] sm:tracking-[0.25em] text-accent mb-4 sm:mb-8">{badgeSub}</p>}
        <h1 className="sw-display w-full text-[clamp(1.75rem,5.5vw,8rem)] font-bold drop-shadow-lg md:whitespace-nowrap">
          {title}
        </h1>
        <p className="mt-2 sm:mt-6 max-w-xl text-xs sm:text-base text-white/80 whitespace-pre-line">
          {subtitle}
        </p>
        <div className="mt-3 sm:mt-10 flex flex-col gap-2 sm:flex-row sm:gap-4">
          <Link
            href={cta1.href}
            className="sw-btn inline-flex h-9 sm:h-12 items-center justify-center border border-accent bg-accent px-5 sm:px-8 text-xs sm:text-base text-accent-foreground transition-colors hover:bg-transparent hover:text-accent"
          >
            {cta1.label}
          </Link>
          <Link
            href={cta2.href}
            className="sw-btn inline-flex h-9 sm:h-12 items-center justify-center border border-white/70 px-5 sm:px-8 text-xs sm:text-base text-white transition-colors hover:border-accent hover:text-accent"
          >
            {cta2.label}
          </Link>
        </div>
      </div>
    </section>
  );
}
