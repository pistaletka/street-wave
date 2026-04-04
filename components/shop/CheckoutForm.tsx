"use client";

import { useState } from "react";
import { useCart } from "@/context/CartContext";
import { useMessages } from "next-intl";
import LegalConsent from "../shared/LegalConsent";
import MarketingConsent from "../shared/MarketingConsent";
import { reachGoal } from "@/lib/analytics";
import { GOALS } from "@/lib/goals";
import { isValidPhone } from "@/lib/validatePhone";
import { buildFormTrackingPayload } from "@/lib/formTracking";

const inputClass =
  "h-12 border border-border bg-transparent px-4 text-sm text-foreground outline-none transition-colors placeholder:text-muted/50 focus:border-accent";
const labelClass = "sw-label text-muted";
const textareaClass =
  "border border-border bg-transparent px-4 py-3 text-sm text-foreground outline-none transition-colors placeholder:text-muted/50 focus:border-accent";

export default function CheckoutForm() {
  const messages = useMessages();
  const checkoutContent = messages.checkout as any;
  const { items, total } = useCart();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [consentError, setConsentError] = useState(false);
  const [phoneError, setPhoneError] = useState(false);

  const f = checkoutContent.fields;

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");

    const checkbox = e.currentTarget.querySelector<HTMLInputElement>('input[name="legalConsent"]');
    if (!checkbox?.checked) {
      setConsentError(true);
      return;
    }
    setConsentError(false);

    const form = new FormData(e.currentTarget);
    const phoneVal = (form.get("phone") as string) || "";
    if (!isValidPhone(phoneVal)) { setPhoneError(true); return; }
    setPhoneError(false);

    setLoading(true);
    const marketingCheckbox = e.currentTarget.querySelector<HTMLInputElement>('input[name="marketingConsent"]');
    const buyer = {
      name: form.get("name") as string,
      phone: form.get("phone") as string,
      email: form.get("email") as string,
      address: form.get("address") as string,
      comment: [
        (form.get("comment") as string) || "",
        "---",
        "Согласие на обработку ПДн: да",
        `Согласие на рассылку: ${marketingCheckbox?.checked ? "да" : "нет"}`,
      ].join("\n"),
    };

    try {
      const trackingPayload = await buildFormTrackingPayload("form_checkout");

      const res = await fetch("/api/payment/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          items: items.map((i) => ({ slug: i.slug, title: i.title, price: i.price })),
          buyer,
          total,
          tracking: trackingPayload,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Ошибка при создании заказа");
        setLoading(false);
        return;
      }

      if (data.paymentUrl) {
        reachGoal(GOALS.FORM_CHECKOUT);
        window.location.href = data.paymentUrl;
      }
    } catch {
      setError("Ошибка сети. Попробуйте ещё раз.");
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="grid gap-6 sm:grid-cols-2">
      <div className="flex flex-col gap-2">
        <label htmlFor="ch-name" className={labelClass}>{f.name.label}</label>
        <input id="ch-name" name="name" type="text" required placeholder={f.name.placeholder} className={inputClass} />
      </div>
      <div className="flex flex-col gap-2">
        <label htmlFor="ch-phone" className={labelClass}>{f.phone.label}</label>
        <input id="ch-phone" name="phone" type="tel" required placeholder={f.phone.placeholder} className={inputClass} />
        {phoneError && <p className="sw-caption text-red-400 mt-1">Введите корректный номер телефона</p>}
      </div>
      <div className="flex flex-col gap-2">
        <label htmlFor="ch-email" className={labelClass}>{f.email.label}</label>
        <input id="ch-email" name="email" type="email" required placeholder={f.email.placeholder} className={inputClass} />
      </div>
      <div className="flex flex-col gap-2">
        <label htmlFor="ch-address" className={labelClass}>{f.address.label}</label>
        <input id="ch-address" name="address" type="text" required placeholder={f.address.placeholder} className={inputClass} />
      </div>
      <div className="flex flex-col gap-2 sm:col-span-2">
        <label htmlFor="ch-comment" className={labelClass}>{f.comment.label}</label>
        <textarea id="ch-comment" name="comment" rows={3} placeholder={f.comment.placeholder} className={textareaClass} />
      </div>

      {error && (
        <div className="sm:col-span-2">
          <p className="sw-caption text-red-400">{error}</p>
        </div>
      )}

      <div className="sm:col-span-2 flex flex-col gap-4">
        <LegalConsent id="ch-consent" consentError={consentError} variant="order" />
        <MarketingConsent id="ch-marketing" />
      </div>

      <div className="sm:col-span-2">
        <button
          type="submit"
          disabled={loading || items.length === 0}
          className="sw-btn h-12 w-full border border-accent bg-accent px-8 text-accent-foreground transition-colors hover:bg-transparent hover:text-accent disabled:opacity-50 disabled:cursor-not-allowed sm:w-auto"
        >
          {loading ? "Создаём заказ..." : checkoutContent.submit}
        </button>
      </div>
    </form>
  );
}
