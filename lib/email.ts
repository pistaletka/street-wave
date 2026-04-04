import { Resend } from "resend";

let _resend: Resend | null = null;
function getResend(): Resend | null {
  if (!process.env.RESEND_API_KEY) return null;
  if (!_resend) _resend = new Resend(process.env.RESEND_API_KEY);
  return _resend;
}

const FROM_RU = process.env.EMAIL_FROM_RU || "streetwave® <hello@street-wave.ru>";
const FROM_EN = process.env.EMAIL_FROM_EN || "streetwave® <hello@street-wave.com>";

// ── Source-specific subjects & messages ──

interface EmailConfig {
  subject: string;
  heading: string;
  body: string;
  cta: string;
  footer: string;
  siteUrl: string;
}

type Locale = "ru" | "en";

const CONFIG: Record<Locale, Record<string, EmailConfig>> = {
  ru: {
    "place-order": {
      subject: "Заявка на кастом принята - streetwave®",
      heading: "Заявка принята",
      body: "Мы получили вашу заявку на кастомизацию и уже начинаем работу. В ближайшее время наш менеджер свяжется с вами, чтобы обсудить детали, сроки и следующие шаги.",
      cta: "Если у вас есть вопросы - пишите нам в <a href=\"https://t.me/streetwavecustom\" style=\"color:#c8ff00;text-decoration:none\">Telegram</a> или отвечайте на это письмо.",
      footer: "streetwave® - студия арт-кастомизации",
      siteUrl: "street-wave.ru",
    },
    "brand-project": {
      subject: "Запрос на бренд-проект получен - streetwave®",
      heading: "Запрос получен",
      body: "Спасибо за интерес к сотрудничеству. Мы изучим ваш запрос и свяжемся с вами для обсуждения проекта.",
      cta: "Если у вас есть вопросы - пишите нам в <a href=\"https://t.me/streetwavecustom\" style=\"color:#c8ff00;text-decoration:none\">Telegram</a> или отвечайте на это письмо.",
      footer: "streetwave® - студия арт-кастомизации",
      siteUrl: "street-wave.ru",
    },
    "live-customization": {
      subject: "Запрос на выездную кастомизацию - streetwave®",
      heading: "Запрос получен",
      body: "Мы получили ваш запрос на выездную кастомизацию. Свяжемся с вами, чтобы обсудить формат, дату и все детали.",
      cta: "Если у вас есть вопросы - пишите нам в <a href=\"https://t.me/streetwavecustom\" style=\"color:#c8ff00;text-decoration:none\">Telegram</a> или отвечайте на это письмо.",
      footer: "streetwave® - студия арт-кастомизации",
      siteUrl: "street-wave.ru",
    },
    "live-event": {
      subject: "Запрос на ивент получен - streetwave®",
      heading: "Запрос получен",
      body: "Спасибо за обращение. Мы свяжемся с вами для обсуждения формата и деталей мероприятия.",
      cta: "Если у вас есть вопросы - пишите нам в <a href=\"https://t.me/streetwavecustom\" style=\"color:#c8ff00;text-decoration:none\">Telegram</a> или отвечайте на это письмо.",
      footer: "streetwave® - студия арт-кастомизации",
      siteUrl: "street-wave.ru",
    },
    "shop-order": {
      subject: "Заказ оформлен - streetwave®",
      heading: "Заказ оформлен",
      body: "Спасибо за покупку. После подтверждения оплаты мы начнём подготовку вашего заказа. Следите за статусом - мы будем держать вас в курсе.",
      cta: "Если у вас есть вопросы - пишите нам в <a href=\"https://t.me/streetwavecustom\" style=\"color:#c8ff00;text-decoration:none\">Telegram</a> или отвечайте на это письмо.",
      footer: "streetwave® - студия арт-кастомизации",
      siteUrl: "street-wave.ru",
    },
    general: {
      subject: "Обращение получено - streetwave®",
      heading: "Мы на связи",
      body: "Спасибо за обращение. Мы получили ваше сообщение и ответим в ближайшее время.",
      cta: "Если у вас есть вопросы - пишите нам в <a href=\"https://t.me/streetwavecustom\" style=\"color:#c8ff00;text-decoration:none\">Telegram</a> или отвечайте на это письмо.",
      footer: "streetwave® - студия арт-кастомизации",
      siteUrl: "street-wave.ru",
    },
  },
  en: {
    "place-order": {
      subject: "Custom order request received - streetwave®",
      heading: "Request received",
      body: "We got your custom order request and are already on it. Our manager will reach out shortly to discuss the details, timeline and next steps.",
      cta: "Got questions? Message us on <a href=\"https://t.me/streetwavecustom\" style=\"color:#c8ff00;text-decoration:none\">Telegram</a> or reply to this email.",
      footer: "streetwave® - art customization studio",
      siteUrl: "street-wave.com",
    },
    "brand-project": {
      subject: "Brand project inquiry received - streetwave®",
      heading: "Inquiry received",
      body: "Thank you for your interest in collaboration. We'll review your request and get back to you to discuss the project.",
      cta: "Got questions? Message us on <a href=\"https://t.me/streetwavecustom\" style=\"color:#c8ff00;text-decoration:none\">Telegram</a> or reply to this email.",
      footer: "streetwave® - art customization studio",
      siteUrl: "street-wave.com",
    },
    "live-customization": {
      subject: "Live customization request received - streetwave®",
      heading: "Request received",
      body: "We got your live customization request. We'll be in touch to discuss the format, date and all the details.",
      cta: "Got questions? Message us on <a href=\"https://t.me/streetwavecustom\" style=\"color:#c8ff00;text-decoration:none\">Telegram</a> or reply to this email.",
      footer: "streetwave® - art customization studio",
      siteUrl: "street-wave.com",
    },
    "live-event": {
      subject: "Event inquiry received - streetwave®",
      heading: "Inquiry received",
      body: "Thank you for reaching out. We'll contact you to discuss the event format and details.",
      cta: "Got questions? Message us on <a href=\"https://t.me/streetwavecustom\" style=\"color:#c8ff00;text-decoration:none\">Telegram</a> or reply to this email.",
      footer: "streetwave® - art customization studio",
      siteUrl: "street-wave.com",
    },
    "shop-order": {
      subject: "Order confirmed - streetwave®",
      heading: "Order confirmed",
      body: "Thank you for your purchase. Once the payment is confirmed, we'll start preparing your order. We'll keep you updated on the status.",
      cta: "Got questions? Message us on <a href=\"https://t.me/streetwavecustom\" style=\"color:#c8ff00;text-decoration:none\">Telegram</a> or reply to this email.",
      footer: "streetwave® - art customization studio",
      siteUrl: "street-wave.com",
    },
    general: {
      subject: "We got your message - streetwave®",
      heading: "We're on it",
      body: "Thank you for reaching out. We received your message and will reply shortly.",
      cta: "Got questions? Message us on <a href=\"https://t.me/streetwavecustom\" style=\"color:#c8ff00;text-decoration:none\">Telegram</a> or reply to this email.",
      footer: "streetwave® - art customization studio",
      siteUrl: "street-wave.com",
    },
  },
};

const DEFAULT_CONFIG: Record<Locale, EmailConfig> = {
  ru: {
    subject: "Заявка получена - streetwave®",
    heading: "Заявка принята",
    body: "Мы получили ваше обращение и свяжемся с вами в ближайшее время.",
    cta: "Если у вас есть вопросы - пишите нам в <a href=\"https://t.me/streetwavecustom\" style=\"color:#c8ff00;text-decoration:none\">Telegram</a> или отвечайте на это письмо.",
    footer: "streetwave® - студия арт-кастомизации",
    siteUrl: "street-wave.ru",
  },
  en: {
    subject: "Request received - streetwave®",
    heading: "Request received",
    body: "We got your request and will get back to you shortly.",
    cta: "Got questions? Message us on <a href=\"https://t.me/streetwavecustom\" style=\"color:#c8ff00;text-decoration:none\">Telegram</a> or reply to this email.",
    footer: "streetwave® - art customization studio",
    siteUrl: "street-wave.com",
  },
};

// ── HTML template ──

function buildHtml(config: EmailConfig, name: string, locale: Locale): string {
  const firstName = name.split(" ")[0];
  const greeting = locale === "ru"
    ? `${firstName}, ${config.body.charAt(0).toLowerCase()}${config.body.slice(1)}`
    : `${firstName}, ${config.body.charAt(0).toLowerCase()}${config.body.slice(1)}`;

  return `<!DOCTYPE html>
<html lang="${locale}">
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;padding:0;background:#0a0a0a;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#0a0a0a;padding:40px 20px">
    <tr><td align="center">
      <table width="560" cellpadding="0" cellspacing="0" style="max-width:560px;width:100%">

        <!-- Logo -->
        <tr><td style="padding:0 0 32px">
          <span style="font-size:14px;font-weight:600;letter-spacing:0.12em;color:#ffffff;text-transform:uppercase">streetwave<span style="color:#c8ff00">&reg;</span></span>
        </td></tr>

        <!-- Divider -->
        <tr><td style="border-top:1px solid #222;padding:0"></td></tr>

        <!-- Content -->
        <tr><td style="padding:40px 0">
          <h1 style="margin:0 0 8px;font-size:28px;font-weight:500;color:#ffffff;letter-spacing:-0.02em">${config.heading}</h1>
          <p style="margin:0 0 24px;font-size:15px;color:#888;line-height:1.6">${greeting}</p>
          <p style="margin:0;font-size:15px;color:#888;line-height:1.6">${config.cta}</p>
        </td></tr>

        <!-- Divider -->
        <tr><td style="border-top:1px solid #222;padding:0"></td></tr>

        <!-- Footer -->
        <tr><td style="padding:24px 0 0">
          <p style="margin:0 0 4px;font-size:12px;color:#555">${config.footer}</p>
          <p style="margin:0;font-size:12px;color:#555">
            <a href="https://${config.siteUrl}" style="color:#555;text-decoration:none">${config.siteUrl}</a>
          </p>
        </td></tr>

      </table>
    </td></tr>
  </table>
</body>
</html>`;
}

// ── Public API ──

interface ConfirmEmailParams {
  to: string;
  name: string;
  source: string;
  locale?: string;
}

/**
 * Send confirmation email to the client after form submission.
 * Fire-and-forget - errors are logged but don't throw.
 */
export async function confirmByEmail({ to, name, source, locale: rawLocale }: ConfirmEmailParams): Promise<void> {
  const client = getResend();
  if (!client) {
    console.warn("RESEND_API_KEY not set, skipping email");
    return;
  }

  const locale: Locale = rawLocale === "en" ? "en" : "ru";
  const config = CONFIG[locale][source] || DEFAULT_CONFIG[locale];
  const from = locale === "en" ? FROM_EN : FROM_RU;

  try {
    const { error } = await client.emails.send({
      from,
      to,
      subject: config.subject,
      html: buildHtml(config, name, locale),
    });

    if (error) {
      console.error("Resend error:", error);
    }
  } catch (err) {
    console.error("Email send failed:", err);
  }
}
