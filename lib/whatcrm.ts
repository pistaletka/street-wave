const TOKEN = process.env.WHATCRM_TOKEN || "";
const CHAT_KEY = process.env.WHATCRM_CHAT_KEY || "";
const OWNER_CHAT_ID = process.env.WHATCRM_OWNER_CHAT_ID || "";

const BASE_URL = "https://chat.whatcrm.net/instances";

function isConfigured(): boolean {
  return Boolean(TOKEN && CHAT_KEY);
}

interface SendMessageParams {
  chatId: string;
  body: string;
}

async function sendMessage({ chatId, body }: SendMessageParams): Promise<boolean> {
  if (!isConfigured()) {
    console.warn("WhatCRM not configured, skipping message");
    return false;
  }

  try {
    const res = await fetch(`${BASE_URL}/${CHAT_KEY}/sendMessage`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Crm-Token": TOKEN,
      },
      body: JSON.stringify({ chatId, body }),
    });

    if (!res.ok) {
      const text = await res.text();
      console.error(`WhatCRM sendMessage error ${res.status}: ${text}`);
      return false;
    }

    return true;
  } catch (err) {
    console.error("WhatCRM sendMessage failed:", err);
    return false;
  }
}

/**
 * Normalize a phone string to WhatsApp chatId format: 79001234567@c.us
 * Returns null if the input doesn't look like a phone number.
 */
function phoneToChatId(input: string): string | null {
  // Strip everything except digits and leading +
  const cleaned = input.replace(/[^\d+]/g, "");
  // Extract digits only
  const digits = cleaned.replace(/\D/g, "");

  if (digits.length < 10) return null;

  // Normalize Russian numbers: 8xxx -> 7xxx
  let normalized = digits;
  if (normalized.length === 11 && normalized.startsWith("8")) {
    normalized = "7" + normalized.slice(1);
  }
  // If 10 digits, assume Russian (+7)
  if (normalized.length === 10) {
    normalized = "7" + normalized;
  }

  return `${normalized}@c.us`;
}

// ── Source labels for messages ──

const SOURCE_LABELS: Record<string, string> = {
  "place-order": "Заказ кастома",
  "brand-project": "Бренд-проект",
  general: "Общее обращение",
  "shop-order": "Заказ из магазина",
};

// ── Public API ──

interface NotifyParams {
  source: string;
  name: string;
  phone?: string;
  email?: string;
  leadName: string;
  note?: string;
}

/**
 * Send notification to business owner about a new lead.
 * Fire-and-forget - errors are logged but don't throw.
 */
export async function notifyOwner(params: NotifyParams): Promise<void> {
  if (!OWNER_CHAT_ID) return;

  const sourceLabel = SOURCE_LABELS[params.source] || params.source;
  const lines = [
    `📩 Новая заявка - ${sourceLabel}`,
    "",
    `👤 ${params.name}`,
  ];

  if (params.phone) lines.push(`📱 ${params.phone}`);
  if (params.email) lines.push(`📧 ${params.email}`);
  lines.push("", `📋 ${params.leadName}`);
  if (params.note) lines.push("", params.note);

  await sendMessage({ chatId: OWNER_CHAT_ID, body: lines.join("\n") });
}

/**
 * Send confirmation message to the client.
 * Only works if the client provided a phone number (not a Telegram @username).
 * Fire-and-forget - errors are logged but don't throw.
 */
export async function confirmToClient(phone: string | undefined): Promise<void> {
  if (!phone) return;

  const chatId = phoneToChatId(phone);
  if (!chatId) return; // not a phone number (e.g. @telegram), skip

  const message = [
    "Спасибо за заявку в streetwave®! 🎨",
    "",
    "Мы получили ваш запрос и свяжемся с вами в ближайшее время.",
    "",
    "streetwave.ru",
  ].join("\n");

  await sendMessage({ chatId, body: message });
}
