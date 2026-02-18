"use client";

import common from "../../content/common.json";

type FormVariant = "general" | "place-order" | "brand-project";

interface ContactFormProps {
  variant?: FormVariant;
}

const inputClass =
  "h-12 border border-border bg-transparent px-4 text-sm text-foreground outline-none transition-colors placeholder:text-muted/50 focus:border-accent";
const labelClass = "sw-label text-muted";
const selectClass =
  "h-12 border border-border bg-transparent px-4 text-sm text-foreground outline-none transition-colors appearance-none focus:border-accent";
const textareaClass =
  "border border-border bg-transparent px-4 py-3 text-sm text-foreground outline-none transition-colors placeholder:text-muted/50 focus:border-accent";

export default function ContactForm({ variant = "general" }: ContactFormProps) {
  if (variant === "place-order") {
    const f = common.forms.placeOrder.fields;
    return (
      <form onSubmit={(e) => e.preventDefault()} className="grid gap-6 sm:grid-cols-2">
        <div className="flex flex-col gap-2">
          <label htmlFor="po-name" className={labelClass}>{f.name.label}</label>
          <input id="po-name" type="text" placeholder={f.name.placeholder} className={inputClass} />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="po-tariff" className={labelClass}>{f.tariff.label}</label>
          <select id="po-tariff" defaultValue="" className={selectClass}>
            <option value="" disabled className="bg-surface text-muted">Выберите тариф</option>
            {f.tariff.options.map((opt) => (
              <option key={opt.value} value={opt.value} className="bg-surface text-foreground">{opt.label}</option>
            ))}
          </select>
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="po-item" className={labelClass}>{f.item.label}</label>
          <input id="po-item" type="text" placeholder={f.item.placeholder} className={inputClass} />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="po-contact" className={labelClass}>{f.contact.label}</label>
          <input id="po-contact" type="text" placeholder={f.contact.placeholder} className={inputClass} />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="po-email" className={labelClass}>{f.email.label}</label>
          <input id="po-email" type="email" placeholder={f.email.placeholder} className={inputClass} />
        </div>
        <div className="flex flex-col gap-2 sm:col-span-2">
          <label htmlFor="po-idea" className={labelClass}>{f.idea.label}</label>
          <textarea id="po-idea" rows={4} placeholder={f.idea.placeholder} className={textareaClass} />
        </div>
        <div className="sm:col-span-2">
          <button type="submit" className="sw-btn h-12 w-full border border-accent bg-accent px-8 text-accent-foreground transition-colors hover:bg-transparent hover:text-accent sm:w-auto">
            {common.forms.placeOrder.submit}
          </button>
        </div>
      </form>
    );
  }

  if (variant === "brand-project") {
    const f = common.forms.brandProject.fields;
    return (
      <form onSubmit={(e) => e.preventDefault()} className="grid gap-6 sm:grid-cols-2">
        <div className="flex flex-col gap-2">
          <label htmlFor="bp-name" className={labelClass}>{f.name.label}</label>
          <input id="bp-name" type="text" placeholder={f.name.placeholder} className={inputClass} />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="bp-phone" className={labelClass}>{f.phone.label}</label>
          <input id="bp-phone" type="tel" placeholder={f.phone.placeholder} className={inputClass} />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="bp-email" className={labelClass}>{f.email.label}</label>
          <input id="bp-email" type="email" placeholder={f.email.placeholder} className={inputClass} />
        </div>
        <div className="flex flex-col gap-2 sm:col-span-2">
          <label htmlFor="bp-comment" className={labelClass}>{f.comment.label}</label>
          <textarea id="bp-comment" rows={4} placeholder={f.comment.placeholder} className={textareaClass} />
        </div>
        <div className="sm:col-span-2">
          <button type="submit" className="sw-btn h-12 w-full border border-accent bg-accent px-8 text-accent-foreground transition-colors hover:bg-transparent hover:text-accent sm:w-auto">
            {common.forms.brandProject.submit}
          </button>
        </div>
      </form>
    );
  }

  // General form
  const f = common.forms.general.fields;
  return (
    <form onSubmit={(e) => e.preventDefault()} className="grid gap-6 sm:grid-cols-2">
      <div className="flex flex-col gap-2">
        <label htmlFor="g-name" className={labelClass}>{f.name.label}</label>
        <input id="g-name" type="text" placeholder={f.name.placeholder} className={inputClass} />
      </div>
      <div className="flex flex-col gap-2">
        <label htmlFor="g-contact" className={labelClass}>{f.contact.label}</label>
        <input id="g-contact" type="text" placeholder={f.contact.placeholder} className={inputClass} />
      </div>
      <div className="flex flex-col gap-2">
        <label htmlFor="g-type" className={labelClass}>{f.type.label}</label>
        <select id="g-type" defaultValue="" className={selectClass}>
          <option value="" disabled className="bg-surface text-muted">Выберите тип</option>
          {f.type.options.map((opt) => (
            <option key={opt.value} value={opt.value} className="bg-surface text-foreground">{opt.label}</option>
          ))}
        </select>
      </div>
      <div className="flex flex-col gap-2 sm:col-span-2">
        <label htmlFor="g-message" className={labelClass}>{f.message.label}</label>
        <textarea id="g-message" rows={5} placeholder={f.message.placeholder} className={textareaClass} />
      </div>
      <div className="sm:col-span-2">
        <button type="submit" className="sw-btn h-12 w-full border border-accent bg-accent px-8 text-accent-foreground transition-colors hover:bg-transparent hover:text-accent sm:w-auto">
          {common.forms.general.submit}
        </button>
      </div>
    </form>
  );
}
