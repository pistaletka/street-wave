"use client";

import { useRef } from "react";
import { useRouter } from "next/navigation";
import common from "../../content/common.json";
import { useFormSubmit } from "@/hooks/useFormSubmit";

type FormVariant = "general" | "place-order" | "brand-project";

interface ContactFormProps {
  variant?: FormVariant;
  successUrl?: string;
}

const inputClass =
  "h-12 border border-border bg-transparent px-4 text-sm text-foreground outline-none transition-colors placeholder:text-muted/50 focus:border-accent";
const labelClass = "sw-label text-muted";
const selectClass =
  "h-12 border border-border bg-transparent px-4 text-sm text-foreground outline-none transition-colors appearance-none focus:border-accent";
const textareaClass =
  "border border-border bg-transparent px-4 py-3 text-sm text-foreground outline-none transition-colors placeholder:text-muted/50 focus:border-accent";

export default function ContactForm({ variant = "general", successUrl }: ContactFormProps) {
  const { submit, loading, error, success } = useFormSubmit();
  const formRef = useRef<HTMLFormElement>(null);
  const router = useRouter();

  if (success) {
    if (successUrl) {
      router.push(successUrl);
      return null;
    }
    return (
      <div className="flex flex-col items-center gap-4 py-12 text-center">
        <p className="sw-h3 text-xl text-accent">Заявка отправлена!</p>
        <p className="sw-body text-text-secondary">Мы свяжемся с вами в ближайшее время.</p>
      </div>
    );
  }

  if (variant === "place-order") {
    const f = common.forms.placeOrder.fields;
    return (
      <form
        ref={formRef}
        onSubmit={async (e) => {
          e.preventDefault();
          const fd = new FormData(e.currentTarget);
          const tariffLabel = f.tariff.options.find((o) => o.value === fd.get("tariff"))?.label || "";
          const ok = await submit({
            name: fd.get("name") as string,
            phone: fd.get("contact") as string,
            email: fd.get("email") as string,
            source: "place-order",
            leadName: `Кастом: ${fd.get("item") || "не указано"}`,
            note: [
              `Тариф: ${tariffLabel}`,
              `Предмет: ${fd.get("item")}`,
              `Идея: ${fd.get("idea")}`,
            ].join("\n"),
          });
          if (ok) formRef.current?.reset();
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
          <input id="po-item" name="item" type="text" placeholder={f.item.placeholder} className={inputClass} />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="po-contact" className={labelClass}>{f.contact.label}</label>
          <input id="po-contact" name="contact" type="text" required placeholder={f.contact.placeholder} className={inputClass} />
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
          const fd = new FormData(e.currentTarget);
          const ok = await submit({
            name: fd.get("name") as string,
            phone: fd.get("phone") as string,
            email: fd.get("email") as string,
            source: "brand-project",
            leadName: `Бренд-проект от ${fd.get("name")}`,
            note: fd.get("comment") as string,
          });
          if (ok) formRef.current?.reset();
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
        const fd = new FormData(e.currentTarget);
        const typeLabel = f.type.options.find((o) => o.value === fd.get("type"))?.label || "";
        const ok = await submit({
          name: fd.get("name") as string,
          phone: fd.get("contact") as string,
          source: "general",
          leadName: `Обращение: ${typeLabel || "общее"}`,
          note: fd.get("message") as string,
        });
        if (ok) formRef.current?.reset();
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
