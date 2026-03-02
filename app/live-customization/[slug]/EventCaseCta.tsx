"use client";

import { useState } from "react";
import ModalForm from "../../../components/shared/ModalForm";

export default function EventCaseCta() {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setModalOpen(true)}
        className="sw-btn inline-flex h-12 items-center justify-center border border-accent bg-accent px-8 text-accent-foreground transition-colors hover:bg-transparent hover:text-accent"
      >
        Обсудить ивент
      </button>
      <ModalForm
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        variant="brand-project"
        title="Обсудить ивент"
      />
    </>
  );
}
