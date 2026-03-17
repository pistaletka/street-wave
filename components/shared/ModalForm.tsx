"use client";

import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import ContactForm from "./ContactForm";

interface ModalFormProps {
  open: boolean;
  onClose: () => void;
  variant?: "general" | "place-order" | "brand-project";
  title?: string;
  sourceOverride?: string;
}

export default function ModalForm({ open, onClose, variant = "brand-project", title, sourceOverride }: ModalFormProps) {
  const overlayRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [open, onClose]);

  if (!open) return null;

  return createPortal(
    <div
      ref={overlayRef}
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 p-6 backdrop-blur-sm"
      onClick={(e) => {
        if (e.target === overlayRef.current) onClose();
      }}
    >
      <div className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto border border-border bg-background p-8 sm:p-12">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 flex h-10 w-10 items-center justify-center text-text-secondary transition-colors hover:text-foreground"
          aria-label="Закрыть"
        >
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M4 4l12 12M16 4L4 16" />
          </svg>
        </button>
        {title && (
          <h2 className="sw-h2 mb-8 text-2xl sm:text-3xl">{title}</h2>
        )}
        <ContactForm variant={variant} sourceOverride={sourceOverride} />
      </div>
    </div>,
    document.body
  );
}
