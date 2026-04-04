"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";

type GalleryItem = string | { src: string; caption: string } | null;

type Props = {
  images: GalleryItem[];
  title: string;
};

function getSrc(item: GalleryItem): string | null {
  if (!item) return null;
  return typeof item === "string" ? item : item.src;
}

function getCaption(item: GalleryItem): string | null {
  if (!item || typeof item === "string") return null;
  return item.caption;
}

export default function GalleryWithLightbox({ images, title }: Props) {
  const validItems = images.filter((img): img is string | { src: string; caption: string } => img !== null);
  const validImages = validItems.map(item => typeof item === "string" ? item : item.src);
  const validCaptions = validItems.map(item => typeof item === "string" ? null : item.caption);
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const close = useCallback(() => setOpenIndex(null), []);
  const prev = useCallback(
    () =>
      setOpenIndex((i) =>
        i !== null ? (i - 1 + validImages.length) % validImages.length : null
      ),
    [validImages.length]
  );
  const next = useCallback(
    () =>
      setOpenIndex((i) =>
        i !== null ? (i + 1) % validImages.length : null
      ),
    [validImages.length]
  );

  useEffect(() => {
    if (openIndex === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [openIndex, close, prev, next]);

  // Map from grid index (including nulls) to validImages index
  let validIdx = 0;

  return (
    <>
      {/* Grid */}
      <div className="grid gap-4 grid-cols-2 sm:grid-cols-3 lg:grid-cols-6">
        {images.map((item, i) => {
          const src = getSrc(item);
          const caption = getCaption(item);
          if (!src) {
            return (
              <div
                key={i}
                className="relative border border-dashed border-border"
                style={{ aspectRatio: "4/5" }}
              />
            );
          }
          const idx = validIdx++;
          return (
            <div key={i}>
              <button
                type="button"
                onClick={() => setOpenIndex(idx)}
                className="relative w-full cursor-pointer focus:outline-none"
                style={{ aspectRatio: "4/5" }}
              >
                <Image
                  src={src}
                  alt={caption || `${title} - ${i + 1}`}
                  fill
                  sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 16vw"
                  className="object-cover"
                />
              </button>
              {caption && (
                <p className="mt-2 text-xs text-text-secondary truncate">{caption}</p>
              )}
            </div>
          );
        })}
      </div>

      {/* Lightbox */}
      {openIndex !== null && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90"
          onClick={close}
        >
          {/* Close */}
          <button
            type="button"
            onClick={close}
            className="absolute top-4 right-4 z-10 text-white/70 hover:text-white text-3xl leading-none cursor-pointer"
            aria-label="Закрыть"
          >
            &times;
          </button>

          {/* Prev */}
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              prev();
            }}
            className="absolute left-4 z-10 text-white/70 hover:text-white text-4xl leading-none cursor-pointer"
            aria-label="Предыдущее"
          >
            &#8249;
          </button>

          {/* Image */}
          <div
            className="relative max-h-[90vh] max-w-[90vw]"
            style={{ width: "90vw", height: "90vh" }}
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={validImages[openIndex]}
              alt={`${title} - фото ${openIndex + 1}`}
              fill
              className="object-contain"
              sizes="90vw"
              priority
            />
          </div>

          {/* Next */}
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              next();
            }}
            className="absolute right-4 z-10 text-white/70 hover:text-white text-4xl leading-none cursor-pointer"
            aria-label="Следующее"
          >
            &#8250;
          </button>

          {/* Caption & Counter */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-center">
            {validCaptions[openIndex] && (
              <p className="text-white/80 text-sm mb-1">{validCaptions[openIndex]}</p>
            )}
            <span className="text-white/50 text-sm">
              {openIndex + 1} / {validImages.length}
            </span>
          </div>
        </div>
      )}
    </>
  );
}
