"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import common from "../../content/common.json";
import { useFormSubmit } from "@/hooks/useFormSubmit";
import { reachGoal } from "@/lib/analytics";
import { GOALS } from "@/lib/goals";
import LegalConsent from "./LegalConsent";
import MarketingConsent from "./MarketingConsent";

type FormVariant = "general" | "place-order" | "brand-project";

interface ContactFormProps {
  variant?: FormVariant;
  successUrl?: string;
  sourceOverride?: string;
}

const inputClass =
  "h-12 border border-border bg-transparent px-4 text-sm text-foreground outline-none transition-colors placeholder:text-muted/50 focus:border-accent";
const labelClass = "sw-label text-muted";
const selectClass =
  "h-12 border border-border bg-transparent px-4 text-sm text-foreground outline-none transition-colors appearance-none focus:border-accent";
const textareaClass =
  "border border-border bg-transparent px-4 py-3 text-sm text-foreground outline-none transition-colors placeholder:text-muted/50 focus:border-accent";

function getConsentNote(form: HTMLFormElement): string {
  const marketing = form.querySelector<HTMLInputElement>('input[name="marketingConsent"]');
  return [
    "Согласие на обработку ПДн: да",
    `Согласие на рассылку: ${marketing?.checked ? "да" : "нет"}`,
  ].join("\n");
}

export default function ContactForm({ variant = "general", successUrl, sourceOverride }: ContactFormProps) {
  const { submit, loading, error, success } = useFormSubmit();
  const formRef = useRef<HTMLFormElement>(null);
  const router = useRouter();
  const [consentError, setConsentError] = useState(false);

  useEffect(() => {
    if (success && successUrl) {
      router.push(successUrl);
    }
  }, [success, successUrl, router]);

  if (success && !successUrl) {
    return (
      <div className="flex flex-col items-center gap-4 py-12 text-center">
        <p className="sw-h3 text-xl text-accent">Заявка отправлена!</p>
        <p className="sw-body text-text-secondary">Мы свяжемся с вами в ближайшее время.</p>
      </div>
    );
  }

  function checkConsent(form: HTMLFormElement): boolean {
    const checkbox = form.querySelector<HTMLInputElement>('input[name="legalConsent"]');
    if (!checkbox?.checked) {
      setConsentError(true);
      return false;
    }
    setConsentError(false);
    return true;
  }

  if (variant === "place-order") {
    const f = common.forms.placeOrder.fields;
    return (
      <form
        ref={formRef}
        onSubmit={async (e) => {
          e.preventDefault();
          if (!checkConsent(e.currentTarget)) return;
          const fd = new FormData(e.currentTarget);
          const tariffOption = f.tariff.options.find((o) => o.value === fd.get("tariff"));
          const tariffLabel = tariffOption?.label || "";
          const tariffPrices: Record<string, number> = { malevich: 10000, "van-gogh": 18000, picasso: 25000 };
          const tariffPrice = tariffPrices[fd.get("tariff") as string] || 0;
          const itemOption = f.item.options.find((o) => o.value === fd.get("item"));
          const ownOption = f.ownItem.options.find((o) => o.value === fd.get("ownItem"));
          const consentInfo = getConsentNote(e.currentTarget);
          const ok = await submit({
            name: fd.get("name") as string,
            phone: fd.get("contact") as string,
            email: fd.get("email") as string,
            source: "place-order",
            leadName: `Кастом: ${itemOption?.label || "не указано"}`,
            price: tariffPrice,
            note: [
              `Тариф: ${tariffLabel}`,
              `Предмет: ${itemOption?.label || "не указано"}`,
              `Изделие: ${ownOption?.label || "не указано"}`,
              `Мессенджер: ${fd.get("messenger") || "не выбран"}`,
              `Идея: ${fd.get("idea")}`,
              `---`,
              consentInfo,
            ].join("\n"),
            customFields: {
              itemType: String(itemOption?.enumId || ""),
              ownItem: String(ownOption?.enumId || ""),
            },
          });
          if (ok) {
            reachGoal(GOALS.FORM_CUSTOM_ORDER);
            formRef.current?.reset();
          }
        }}
        className="grid gap-6 sm:grid-cols-2"
      >
        <div className="flex flex-col gap-2">
          <label htmlFor="po-name" className={labelClass}>{f.name.label}</label>
          <input id="po-name" name="name" type="text" required placeholder={f.name.placeholder} className={inputClass} />
        </div>
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-2">
            <label htmlFor="po-tariff" className={labelClass}>{f.tariff.label}</label>
            <a
              href="#tariffs"
              onClick={(e) => {
                e.preventDefault();
                document.getElementById("tariffs")?.scrollIntoView({ behavior: "smooth" });
              }}
              className="text-xs text-accent hover:underline"
            >&darr; Подробнее о тарифах</a>
          </div>
          <select id="po-tariff" name="tariff" defaultValue="" className={selectClass}>
            <option value="" disabled className="bg-surface text-muted">Выберите тариф</option>
            {f.tariff.options.map((opt) => (
              <option key={opt.value} value={opt.value} className="bg-surface text-foreground">{opt.label}</option>
            ))}
          </select>
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="po-item" className={labelClass}>{f.item.label}</label>
          <select id="po-item" name="item" defaultValue="" className={selectClass}>
            <option value="" disabled className="bg-surface text-muted">Выберите тип</option>
            {f.item.options.map((opt) => (
              <option key={opt.value} value={opt.value} className="bg-surface text-foreground">{opt.label}</option>
            ))}
          </select>
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="po-own" className={labelClass}>{f.ownItem.label}</label>
          <select id="po-own" name="ownItem" defaultValue="" className={selectClass}>
            <option value="" disabled className="bg-surface text-muted">Своё или закупаем</option>
            {f.ownItem.options.map((opt) => (
              <option key={opt.value} value={opt.value} className="bg-surface text-foreground">{opt.label}</option>
            ))}
          </select>
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="po-contact" className={labelClass}>{f.contact.label}</label>
          {"messengerOptions" in f.contact && (
            <div className="flex gap-4">
              {(f.contact as { messengerOptions: string[] }).messengerOptions.map((opt: string, idx: number) => (
                <label key={opt} className="flex items-center gap-1.5 cursor-pointer">
                  <input
                    type="radio"
                    name="messenger"
                    value={opt}
                    defaultChecked={idx === 0}
                    className="accent-accent w-3 h-3"
                  />
                  <span className="text-[11px] text-muted">{opt}</span>
                </label>
              ))}
            </div>
          )}
          <input id="po-contact" name="contact" type="tel" required placeholder={f.contact.placeholder} className={inputClass} />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="po-email" className={labelClass}>{f.email.label}</label>
          <input id="po-email" name="email" type="email" placeholder={f.email.placeholder} className={inputClass} />
        </div>
        <div className="flex flex-col gap-2 sm:col-span-2">
          <label htmlFor="po-idea" className={labelClass}>{f.idea.label}</label>
          <textarea id="po-idea" name="idea" rows={4} placeholder={f.idea.placeholder} className={textareaClass} />
        </div>
        {error && (
          <div className="sm:col-span-2">
            <p className="sw-caption text-red-400">{error}</p>
          </div>
        )}
        <div className="sm:col-span-2 flex flex-col gap-4">
          <LegalConsent id="po-consent" consentError={consentError} variant="order" />
          <MarketingConsent id="po-marketing" />
        </div>
        <div className="sm:col-span-2">
          <button
            type="submit"
            disabled={loading}
            className="sw-btn h-12 w-full border border-accent bg-accent px-8 text-accent-foreground transition-colors hover:bg-transparent hover:text-accent disabled:opacity-50 sm:w-auto"
          >
            {loading ? "Отправка..." : common.forms.placeOrder.submit}
          </button>
        </div>
      </form>
    );
  }

  if (variant === "brand-project") {
    const f = common.forms.brandProject.fields;
    return (
      <form
        ref={formRef}
        onSubmit={async (e) => {
          e.preventDefault();
          if (!checkConsent(e.currentTarget)) return;
          const fd = new FormData(e.currentTarget);
          const consentInfo = getConsentNote(e.currentTarget);
          const isEvent = sourceOverride === "live-event";
          const ok = await submit({
            name: fd.get("name") as string,
            phone: fd.get("phone") as string,
            email: fd.get("email") as string,
            source: isEvent ? "live-customization" : "brand-project",
            leadName: isEvent
              ? `Лайв-кастомизация от ${fd.get("name")}`
              : `Бренд-проект от ${fd.get("name")}`,
            note: [(fd.get("comment") as string) || "", `---`, consentInfo].join("\n"),
          });
          if (ok) {
            reachGoal(isEvent ? GOALS.FORM_EVENT : GOALS.FORM_BRAND_PROJECT);
            formRef.current?.reset();
          }
        }}
        className="grid gap-6 sm:grid-cols-2"
      >
        <div className="flex flex-col gap-2">
          <label htmlFor="bp-name" className={labelClass}>{f.name.label}</label>
          <input id="bp-name" name="name" type="text" required placeholder={f.name.placeholder} className={inputClass} />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="bp-phone" className={labelClass}>{f.phone.label}</label>
          <input id="bp-phone" name="phone" type="tel" required placeholder={f.phone.placeholder} className={inputClass} />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="bp-email" className={labelClass}>{f.email.label}</label>
          <input id="bp-email" name="email" type="email" placeholder={f.email.placeholder} className={inputClass} />
        </div>
        <div className="flex flex-col gap-2 sm:col-span-2">
          <label htmlFor="bp-comment" className={labelClass}>{f.comment.label}</label>
          <textarea id="bp-comment" name="comment" rows={4} placeholder={f.comment.placeholder} className={textareaClass} />
        </div>
        {error && (
          <div className="sm:col-span-2">
            <p className="sw-caption text-red-400">{error}</p>
          </div>
        )}
        <div className="sm:col-span-2 flex flex-col gap-4">
          <LegalConsent id="bp-consent" consentError={consentError} />
          <MarketingConsent id="bp-marketing" />
        </div>
        <div className="sm:col-span-2">
          <button
            type="submit"
            disabled={loading}
            className="sw-btn h-12 w-full border border-accent bg-accent px-8 text-accent-foreground transition-colors hover:bg-transparent hover:text-accent disabled:opacity-50 sm:w-auto"
          >
            {loading ? "Отправка..." : common.forms.brandProject.submit}
          </button>
        </div>
      </form>
    );
  }

  // General form
  const f = common.forms.general.fields;
  return (
    <form
      ref={formRef}
      onSubmit={async (e) => {
        e.preventDefault();
        if (!checkConsent(e.currentTarget)) return;
        const fd = new FormData(e.currentTarget);
        const typeLabel = f.type.options.find((o) => o.value === fd.get("type"))?.label || "";
        const consentInfo = getConsentNote(e.currentTarget);
        const ok = await submit({
          name: fd.get("name") as string,
          phone: fd.get("contact") as string,
          source: "general",
          leadName: `Обращение: ${typeLabel || "общее"}`,
          note: [(fd.get("message") as string) || "", `---`, consentInfo].join("\n"),
        });
        if (ok) {
          reachGoal(GOALS.FORM_CONTACT);
          formRef.current?.reset();
        }
      }}
      className="grid gap-6 sm:grid-cols-2"
    >
      <div className="flex flex-col gap-2">
        <label htmlFor="g-name" className={labelClass}>{f.name.label}</label>
        <input id="g-name" name="name" type="text" required placeholder={f.name.placeholder} className={inputClass} />
      </div>
      <div className="flex flex-col gap-2">
        <label htmlFor="g-contact" className={labelClass}>{f.contact.label}</label>
        <input id="g-contact" name="contact" type="text" required placeholder={f.contact.placeholder} className={inputClass} />
      </div>
      <div className="flex flex-col gap-2">
        <label htmlFor="g-type" className={labelClass}>{f.type.label}</label>
        <select id="g-type" name="type" defaultValue="" className={selectClass}>
          <option value="" disabled className="bg-surface text-muted">Выберите тип</option>
          {f.type.options.map((opt) => (
            <option key={opt.value} value={opt.value} className="bg-surface text-foreground">{opt.label}</option>
          ))}
        </select>
      </div>
      <div className="flex flex-col gap-2 sm:col-span-2">
        <label htmlFor="g-message" className={labelClass}>{f.message.label}</label>
        <textarea id="g-message" name="message" rows={5} placeholder={f.message.placeholder} className={textareaClass} />
      </div>
      {error && (
        <div className="sm:col-span-2">
          <p className="sw-caption text-red-400">{error}</p>
        </div>
      )}
      <div className="sm:col-span-2 flex flex-col gap-4">
        <LegalConsent id="g-consent" consentError={consentError} />
        <MarketingConsent id="g-marketing" />
      </div>
      <div className="sm:col-span-2">
        <button
          type="submit"
          disabled={loading}
          className="sw-btn h-12 w-full border border-accent bg-accent px-8 text-accent-foreground transition-colors hover:bg-transparent hover:text-accent disabled:opacity-50 sm:w-auto"
        >
          {loading ? "Отправка..." : common.forms.general.submit}
        </button>
      </div>
    </form>
  );
}
