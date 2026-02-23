"use client";

import { useState } from "react";
import PlaceholderImage from "./PlaceholderImage";

interface ImageCarouselProps {
  images: string[];
  label: string;
}

export default function ImageCarousel({ images, label }: ImageCarouselProps) {
  const [current, setCurrent] = useState(0);

  function prev() {
    setCurrent((c) => (c === 0 ? images.length - 1 : c - 1));
  }

  function next() {
    setCurrent((c) => (c === images.length - 1 ? 0 : c + 1));
  }

  return (
    <div className="relative overflow-hidden bg-surface border border-border">
      <PlaceholderImage aspectRatio="4/5" label={`${label} #${current + 1}`} />

      {/* Arrows */}
      <button
        onClick={prev}
        className="absolute left-3 top-1/2 -translate-y-1/2 flex h-10 w-10 items-center justify-center bg-background/70 text-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
        aria-label="Предыдущая"
      >
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M10 3L5 8l5 5" stroke="currentColor" strokeWidth="1.5"/></svg>
      </button>
      <button
        onClick={next}
        className="absolute right-3 top-1/2 -translate-y-1/2 flex h-10 w-10 items-center justify-center bg-background/70 text-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
        aria-label="Следующая"
      >
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M6 3l5 5-5 5" stroke="currentColor" strokeWidth="1.5"/></svg>
      </button>

      {/* Dots */}
      <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-2">
        {images.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            className={`h-1.5 rounded-full transition-all ${
              i === current ? "w-6 bg-accent" : "w-1.5 bg-white/40"
            }`}
            aria-label={`Фото ${i + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
