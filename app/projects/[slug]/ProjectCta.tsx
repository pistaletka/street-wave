"use client";

import { useState } from "react";
import { useLocale } from "next-intl";
import ModalForm from "../../../components/shared/ModalForm";

export default function ProjectCta() {
  const [modalOpen, setModalOpen] = useState(false);
  const locale = useLocale();
  const label = locale === "ru" ? "Обсудить проект" : "Discuss a Project";

  return (
    <>
      <button
        onClick={() => setModalOpen(true)}
        className="sw-btn inline-flex h-12 items-center justify-center border border-accent bg-accent px-8 text-accent-foreground transition-colors hover:bg-transparent hover:text-accent"
      >
        {label}
      </button>
      <ModalForm
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        variant="brand-project"
        title={label}
      />
    </>
  );
}
