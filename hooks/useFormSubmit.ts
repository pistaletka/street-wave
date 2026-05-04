"use client";

import { useState } from "react";
import type { LeadSource } from "@/lib/amocrm";
import { buildFormTrackingPayload } from "@/lib/formTracking";

interface SubmitParams {
  name: string;
  phone?: string;
  email?: string;
  source: LeadSource;
  leadName: string;
  price?: number;
  note?: string;
  customFields?: Record<string, string>;
}

interface UseFormSubmitReturn {
  submit: (params: SubmitParams) => Promise<boolean>;
  loading: boolean;
  error: string;
  success: boolean;
  reset: () => void;
}

export function useFormSubmit(): UseFormSubmitReturn {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  async function submit(params: SubmitParams): Promise<boolean> {
    setLoading(true);
    setError("");
    setSuccess(false);

    try {
      const trackingPayload = await buildFormTrackingPayload(params.source);
      const payload = { ...params, tracking: trackingPayload };

      const res = await fetch("/api/crm/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const data = await res.json();
        setError(data.error || "Ошибка отправки");
        setLoading(false);
        return false;
      }

      setSuccess(true);
      setLoading(false);
      return true;
    } catch {
      setError("Ошибка сети. Попробуйте ещё раз.");
      setLoading(false);
      return false;
    }
  }

  function reset() {
    setError("");
    setSuccess(false);
  }

  return { submit, loading, error, success, reset };
}
