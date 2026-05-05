"use client";

import { useState } from "react";
import Image from "next/image";
import PlaceholderImage from "@/components/shared/PlaceholderImage";

interface ProductGalleryProps {
  images: string[];
  title: string;
  imageAlt?: string;
}

export default function ProductGallery({ images, title, imageAlt }: ProductGalleryProps) {
  const [active, setActive] = useState(0);
  const activeSrc = images[active];
  const altBase = imageAlt || title;

  return (
    <div className="space-y-4">
      <div className="relative aspect-square overflow-hidden bg-surface">
        {activeSrc ? (
          <Image
            src={activeSrc}
            alt={images.length > 1 ? `${altBase} — фото ${active + 1}` : altBase}
            fill
            sizes="(max-width: 1024px) 100vw, 50vw"
            className="object-cover"
            priority
          />
        ) : (
          <PlaceholderImage aspectRatio="1/1" label={`${title} - фото ${active + 1}`} />
        )}
      </div>
      {images.length > 1 && (
        <div className="flex gap-3">
          {images.map((src, i) => (
            <button
              key={i}
              onClick={() => setActive(i)}
              className={`relative h-20 w-20 overflow-hidden bg-surface border transition-colors ${
                i === active ? "border-accent" : "border-border hover:border-foreground"
              }`}
            >
              {src ? (
                <Image
                  src={src}
                  alt={`${altBase} — превью ${i + 1}`}
                  fill
                  sizes="80px"
                  className="object-cover"
                />
              ) : (
                <PlaceholderImage aspectRatio="1/1" label={`${i + 1}`} />
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
