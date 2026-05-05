"use client";

import { useState } from "react";
import { useCart } from "@/context/CartContext";
import { useMessages } from "next-intl";
import LegalConsent from "../shared/LegalConsent";
import MarketingConsent from "../shared/MarketingConsent";
import { reachGoal } from "@/lib/analytics";
import { GOALS } from "@/lib/goals";
import { buildFormTrackingPayload } from "@/lib/formTracking";
import type { DeliveryZone } from "@/app/checkout/page";

const inputClass =
  "h-12 border border-border bg-transparent px-4 text-sm text-foreground outline-none transition-colors placeholder:text-muted/50 focus:border-accent";
const labelClass = "sw-label text-muted";
const textareaClass =
  "border border-border bg-transparent px-4 py-3 text-sm text-foreground outline-none transition-colors placeholder:text-muted/50 focus:border-accent";

const DELIVERY_COST: Record<DeliveryZone, number> = {
  pickup: 0,
  moscow: 1000,
  russia: 2000,
};

const ZONE_LABEL_RU: Record<DeliveryZone, string> = {
  pickup: "Самовывоз",
  moscow: "Москва",
  russia: "МО и Россия",
};

function isValidRuPhone(raw: string): boolean {
  const digits = raw.replace(/\D/g, "");
  return digits.length === 11 && (digits[0] === "7" || digits[0] === "8");
}

function formatPhone(raw: string): string {
  const digits = raw.replace(/\D/g, "");
  if (!digits) return "";
  let d = digits;
  if (d[0] === "8") d = "7" + d.slice(1);
  if (d.length > 11) d = d.slice(0, 11);
  // Build display
  const p1 = d.slice(1, 4);
  const p2 = d.slice(4, 7);
  const p3 = d.slice(7, 9);
  const p4 = d.slice(9, 11);
  let out = "+7";
  if (p1) out += ` (${p1}`;
  if (p1.length === 3) out += ")";
  if (p2) out += ` ${p2}`;
  if (p3) out += `-${p3}`;
  if (p4) out += `-${p4}`;
  return out;
}

interface CheckoutFormProps {
  zone: DeliveryZone;
  onZoneChange: (z: DeliveryZone) => void;
}

export default function CheckoutForm({ zone, onZoneChange }: CheckoutFormProps) {
  const messages = useMessages();
  const checkoutContent = messages.checkout as any;
  const { items, total } = useCart();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [phoneError, setPhoneError] = useState("");
  const [addressError, setAddressError] = useState("");
  const [consentError, setConsentError] = useState(false);
  const [phoneValue, setPhoneValue] = useState("");

  const f = checkoutContent.fields;
  const errs = checkoutContent.errors || {};
  const deliveryOpts = checkoutContent.delivery?.options || [];
  const requiresAddress = zone !== "pickup";
  const deliveryCost = DELIVERY_COST[zone];
  const grandTotal = total + deliveryCost;

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");
    setPhoneError("");
    setAddressError("");

    const checkbox = e.currentTarget.querySelector<HTMLInputElement>('input[name="legalConsent"]');
    if (!checkbox?.checked) {
      setConsentError(true);
      return;
    }
    setConsentError(false);

    const form = new FormData(e.currentTarget);
    const phone = (form.get("phone") as string) || "";
    if (!isValidRuPhone(phone)) {
      setPhoneError(errs.phoneInvalid || "Неверный телефон");
      return;
    }

    const address = ((form.get("address") as string) || "").trim();
    if (requiresAddress && address.length < 10) {
      setAddressError(errs.addressInvalid || "Укажите полный адрес");
      return;
    }

    setLoading(true);

    const marketingCheckbox = e.currentTarget.querySelector<HTMLInputElement>('input[name="marketingConsent"]');
    const buyer = {
      name: form.get("name") as string,
      phone,
      email: form.get("email") as string,
      address: requiresAddress ? address : "Самовывоз",
      comment: [
        (form.get("comment") as string) || "",
        `Способ доставки: ${ZONE_LABEL_RU[zone]} (${deliveryCost} ₽)`,
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
          total: grandTotal,
          deliveryZone: zone,
          deliveryCost,
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
      {/* Delivery zone */}
      <div className="flex flex-col gap-3 sm:col-span-2">
        <label className={labelClass}>{checkoutContent.delivery?.label || "Способ доставки"}</label>
        <div className="grid gap-2">
          {deliveryOpts.map((opt: { value: DeliveryZone; label: string; priceLabel: string }) => (
            <label
              key={opt.value}
              className={`flex cursor-pointer items-center justify-between border px-4 py-3 transition-colors ${
                zone === opt.value ? "border-accent bg-accent/5" : "border-border hover:border-foreground"
              }`}
            >
              <div className="flex items-center gap-3">
                <input
                  type="radio"
                  name="deliveryZone"
                  value={opt.value}
                  checked={zone === opt.value}
                  onChange={() => onZoneChange(opt.value)}
                  className="accent-accent"
                />
                <span className="sw-body-sm text-foreground">{opt.label}</span>
              </div>
              <span className="sw-caption text-muted">{opt.priceLabel}</span>
            </label>
          ))}
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="ch-name" className={labelClass}>{f.name.label}</label>
        <input id="ch-name" name="name" type="text" required placeholder={f.name.placeholder} className={inputClass} />
      </div>
      <div className="flex flex-col gap-2">
        <label htmlFor="ch-phone" className={labelClass}>{f.phone.label}</label>
        <input
          id="ch-phone"
          name="phone"
          type="tel"
          required
          inputMode="tel"
          autoComplete="tel"
          value={phoneValue}
          onChange={(e) => setPhoneValue(formatPhone(e.target.value))}
          placeholder={f.phone.placeholder}
          className={`${inputClass} ${phoneError ? "border-red-400" : ""}`}
        />
        {phoneError && <p className="sw-caption text-red-400">{phoneError}</p>}
      </div>
      <div className="flex flex-col gap-2">
        <label htmlFor="ch-email" className={labelClass}>{f.email.label}</label>
        <input id="ch-email" name="email" type="email" required placeholder={f.email.placeholder} className={inputClass} />
      </div>
      {requiresAddress && (
        <div className="flex flex-col gap-2">
          <label htmlFor="ch-address" className={labelClass}>{f.address.label}</label>
          <input
            id="ch-address"
            name="address"
            type="text"
            required
            autoComplete="street-address"
            placeholder={f.address.placeholder}
            className={`${inputClass} ${addressError ? "border-red-400" : ""}`}
          />
          {addressError && <p className="sw-caption text-red-400">{addressError}</p>}
        </div>
      )}
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
