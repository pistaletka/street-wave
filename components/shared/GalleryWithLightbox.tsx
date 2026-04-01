"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";

type Props = {
  images: (string | null)[];
  title: string;
};

export default function GalleryWithLightbox({ images, title }: Props) {
  const validImages = images.filter((img): img is string => img !== null);
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
          if (!item) {
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
            <button
              key={i}
              type="button"
              onClick={() => setOpenIndex(idx)}
              className="relative cursor-pointer focus:outline-none"
              style={{ aspectRatio: "4/5" }}
            >
              <Image
                src={item}
                alt={`${title} — фото ${i + 1}`}
                fill
                className="object-cover"
              />
            </button>
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
              alt={`${title} — фото ${openIndex + 1}`}
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

          {/* Counter */}
          <span className="absolute bottom-4 left-1/2 -translate-x-1/2 text-white/50 text-sm">
            {openIndex + 1} / {validImages.length}
          </span>
        </div>
      )}
    </>
  );
}
