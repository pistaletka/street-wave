import { reachGoal, getMetrikaClientId } from "@/lib/analytics"
import { getStoredTrackingData } from "@/lib/tracking"
import { GOALS, type GoalName } from "@/lib/goals"

export type FormTrackingPayload = {
  form_name: string;
  metrika_client_id: string;
  utm_source: string;
  utm_medium: string;
  utm_campaign: string;
  utm_content: string;
  utm_term: string;
  yclid: string;
  page_url: string;
  page_title: string;
  referrer: string;
  lead_source_readable: string;
};

export function detectLeadSource(params: {
  utm_source?: string;
  yclid?: string;
  referrer?: string;
}): string {
  const utmSource = (params.utm_source || "").toLowerCase();
  const referrer = (params.referrer || "").toLowerCase();
  const yclid = params.yclid || "";

  if (yclid) return "Yandex Ads";
  if (utmSource === "telegram") return "Telegram";
  if (utmSource === "instagram") return "Instagram";
  if (utmSource === "whatsapp") return "WhatsApp";
  if (utmSource === "facebook") return "Facebook";
  if (referrer.includes("t.me")) return "Telegram";
  if (referrer.includes("instagram.com")) return "Instagram";
  if (referrer.includes("wa.me") || referrer.includes("whatsapp")) return "WhatsApp";
  if (referrer.includes("yandex.ru")) return "Yandex Organic";
  if (!referrer) return "Direct / Unknown";

  return "Referral / Other";
}

export async function buildFormTrackingPayload(
  formName: string
): Promise<FormTrackingPayload> {
  const clientId = await getMetrikaClientId();
  const tracking = getStoredTrackingData();

  return {
    form_name: formName,
    metrika_client_id: clientId,
    utm_source: tracking.utm_source,
    utm_medium: tracking.utm_medium,
    utm_campaign: tracking.utm_campaign,
    utm_content: tracking.utm_content,
    utm_term: tracking.utm_term,
    yclid: tracking.yclid,
    page_url: tracking.page_url,
    page_title: tracking.page_title,
    referrer: tracking.referrer,
    lead_source_readable: detectLeadSource({
      utm_source: tracking.utm_source,
      yclid: tracking.yclid,
      referrer: tracking.referrer,
    }),
  };
}

type FormSource = "place-order" | "brand-project" | "live-event" | "general" | "shop-order"

const FORM_GOAL_MAP: Record<FormSource, GoalName> = {
  "place-order": GOALS.FORM_CUSTOM_ORDER,
  "brand-project": GOALS.FORM_BRAND_PROJECT,
  "live-event": GOALS.FORM_EVENT,
  general: GOALS.FORM_CONTACT,
  "shop-order": GOALS.FORM_CHECKOUT,
}

export function trackFormSubmit(source: FormSource, extra: Record<string, string> = {}) {
  const goal = FORM_GOAL_MAP[source]
  if (!goal) return

  const tracking = getStoredTrackingData()

  reachGoal(goal, {
    form_source: source,
    ...tracking,
    ...extra,
  })
}

export function trackClick(goal: GoalName, extra: Record<string, string> = {}) {
  reachGoal(goal, extra)
}

export function trackMessengerClick(type: "telegram" | "whatsapp" | "phone" | "email") {
  const goalMap: Record<string, GoalName> = {
    telegram: GOALS.CLICK_TELEGRAM,
    whatsapp: GOALS.CLICK_WHATSAPP,
    phone: GOALS.CLICK_PHONE,
    email: GOALS.CLICK_EMAIL,
  }

  const goal = goalMap[type]
  if (goal) {
    reachGoal(goal, { contact_type: type })
  }
}

export function trackAddToCart(productName: string, price: number) {
  reachGoal(GOALS.ADD_TO_CART, {
    product_name: productName,
    price: String(price),
  })
}
