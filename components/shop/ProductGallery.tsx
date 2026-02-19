"use client";

import { useState } from "react";
import PlaceholderImage from "@/components/shared/PlaceholderImage";

interface ProductGalleryProps {
  images: string[];
  title: string;
}

export default function ProductGallery({ images, title }: ProductGalleryProps) {
  const [active, setActive] = useState(0);

  return (
    <div className="space-y-4">
      <div className="overflow-hidden bg-surface">
        <PlaceholderImage
          aspectRatio="1/1"
          label={`${title} — фото ${active + 1}`}
        />
      </div>
      {images.length > 1 && (
        <div className="flex gap-3">
          {images.map((_, i) => (
            <button
              key={i}
              onClick={() => setActive(i)}
              className={`h-20 w-20 overflow-hidden bg-surface border transition-colors ${
                i === active ? "border-accent" : "border-border hover:border-foreground"
              }`}
            >
              <PlaceholderImage
                aspectRatio="1/1"
                label={`${i + 1}`}
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
