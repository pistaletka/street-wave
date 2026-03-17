export type TrackingData = {
  utm_source: string
  utm_medium: string
  utm_campaign: string
  utm_content: string
  utm_term: string
  yclid: string
  page_url: string
  page_title: string
  referrer: string
}

const TRACKING_STORAGE_KEY = "sw_tracking_data"

export function getTrackingDataFromUrl(): Partial<TrackingData> {
  if (typeof window === "undefined") return {}

  const params = new URLSearchParams(window.location.search)

  return {
    utm_source: params.get("utm_source") || "",
    utm_medium: params.get("utm_medium") || "",
    utm_campaign: params.get("utm_campaign") || "",
    utm_content: params.get("utm_content") || "",
    utm_term: params.get("utm_term") || "",
    yclid: params.get("yclid") || "",
  }
}

export function getPageTrackingData(): Pick<TrackingData, "page_url" | "page_title" | "referrer"> {
  if (typeof window === "undefined") {
    return {
      page_url: "",
      page_title: "",
      referrer: "",
    }
  }

  return {
    page_url: window.location.href,
    page_title: document.title,
    referrer: document.referrer || "",
  }
}

export function saveTrackingData() {
  if (typeof window === "undefined") return

  const existing = getStoredTrackingData()
  const fromUrl = getTrackingDataFromUrl()
  const pageData = getPageTrackingData()

  const merged: TrackingData = {
    utm_source: fromUrl.utm_source || existing.utm_source || "",
    utm_medium: fromUrl.utm_medium || existing.utm_medium || "",
    utm_campaign: fromUrl.utm_campaign || existing.utm_campaign || "",
    utm_content: fromUrl.utm_content || existing.utm_content || "",
    utm_term: fromUrl.utm_term || existing.utm_term || "",
    yclid: fromUrl.yclid || existing.yclid || "",
    page_url: pageData.page_url,
    page_title: pageData.page_title,
    referrer: existing.referrer || pageData.referrer || "",
  }

  localStorage.setItem(TRACKING_STORAGE_KEY, JSON.stringify(merged))
}

export function getStoredTrackingData(): TrackingData {
  if (typeof window === "undefined") {
    return {
      utm_source: "",
      utm_medium: "",
      utm_campaign: "",
      utm_content: "",
      utm_term: "",
      yclid: "",
      page_url: "",
      page_title: "",
      referrer: "",
    }
  }

  try {
    const raw = localStorage.getItem(TRACKING_STORAGE_KEY)
    if (!raw) {
      return {
        utm_source: "",
        utm_medium: "",
        utm_campaign: "",
        utm_content: "",
        utm_term: "",
        yclid: "",
        page_url: window.location.href,
        page_title: document.title,
        referrer: document.referrer || "",
      }
    }

    const parsed = JSON.parse(raw)

    return {
      utm_source: parsed.utm_source || "",
      utm_medium: parsed.utm_medium || "",
      utm_campaign: parsed.utm_campaign || "",
      utm_content: parsed.utm_content || "",
      utm_term: parsed.utm_term || "",
      yclid: parsed.yclid || "",
      page_url: window.location.href,
      page_title: document.title,
      referrer: parsed.referrer || document.referrer || "",
    }
  } catch {
    return {
      utm_source: "",
      utm_medium: "",
      utm_campaign: "",
      utm_content: "",
      utm_term: "",
      yclid: "",
      page_url: window.location.href,
      page_title: document.title,
      referrer: document.referrer || "",
    }
  }
}