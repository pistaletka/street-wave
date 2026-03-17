"use client";

import { useEffect, useRef } from "react";
import { useCookieConsent } from "@/context/CookieConsentContext";

/* ─────────────────────────────────────────────────────────────
 * ENV-переменные (заполняются в .env / .env.local):
 *
 *   NEXT_PUBLIC_YANDEX_METRIKA_ID   → analytics  → только .ru
 *   NEXT_PUBLIC_GA_MEASUREMENT_ID   → analytics  → только .com
 *   NEXT_PUBLIC_META_PIXEL_ID       → marketing  → только .com
 *
 * Логика по доменам:
 *   street-wave.ru  → Yandex Metrika
 *   street-wave.com → GA4 + Meta Pixel
 *
 * Домен определяется через window.location.hostname.
 * localhost считается .ru для удобства разработки.
 * ───────────────────────────────────────────────────────────── */

const YM_ID = process.env.NEXT_PUBLIC_YANDEX_METRIKA_ID ?? "";
const GA_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID ?? "";
const META_PIXEL_ID = process.env.NEXT_PUBLIC_META_PIXEL_ID ?? "";

function isRuDomain(): boolean {
  const host = window.location.hostname;
  return host.endsWith("street-wave.ru") || host === "localhost";
}

function isComDomain(): boolean {
  return window.location.hostname.endsWith("street-wave.com");
}

function loadScript(src: string): Promise<void> {
  return new Promise((resolve, reject) => {
    if (document.querySelector(`script[src="${src}"]`)) {
      resolve();
      return;
    }
    const s = document.createElement("script");
    s.src = src;
    s.async = true;
    s.onload = () => resolve();
    s.onerror = () => reject(new Error(`Failed to load ${src}`));
    document.head.appendChild(s);
  });
}

export default function AnalyticsLoader() {
  const { preferences } = useCookieConsent();

  const ymLoaded = useRef(false);
  const gaLoaded = useRef(false);
  const metaLoaded = useRef(false);

  /* ═══════════════════════════════════════════════════════════
   * ANALYTICS
   * ═══════════════════════════════════════════════════════════ */
  useEffect(() => {
    console.log("analytics preferences:", preferences);
    console.log("YM_ID:", YM_ID);
    console.log("isRuDomain:", isRuDomain());

    if (!preferences?.analytics) {
      console.log("Metrika not loaded: analytics consent is false");
      return;
    }

    /* ── Yandex Metrika ── только .ru ─────────────────────── */
    if (YM_ID && isRuDomain() && !ymLoaded.current) {
      ymLoaded.current = true;

      const w = window as Window & {
        ym?: ((...args: any[]) => void) & { a?: any[]; l?: number };
      };

      if (typeof w.ym !== "function") {
        const ymStub = function (...args: any[]) {
          (ymStub.a = ymStub.a || []).push(args);
        } as ((...args: any[]) => void) & { a?: any[]; l?: number };

        ymStub.l = Date.now();
        w.ym = ymStub;
      }

      loadScript("https://mc.yandex.ru/metrika/tag.js").then(() => {
        w.ym?.(Number(YM_ID), "init", {
          clickmap: true,
          trackLinks: true,
          accurateTrackBounce: true,
          webvisor: true,
          ecommerce: "dataLayer",
          referrer: document.referrer,
          url: location.href,
        });
      });
    }

    /* ── Google Analytics 4 ── только .com ────────────────── */
    if (GA_ID && isComDomain() && !gaLoaded.current) {
      gaLoaded.current = true;
      loadScript(`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`).then(() => {
        const w = window as Record<string, unknown>;
        w.dataLayer = (w.dataLayer as unknown[]) || [];
        function gtag(...args: unknown[]) {
          (w.dataLayer as unknown[]).push(args);
        }
        gtag("js", new Date());
        gtag("config", GA_ID);
      });
    }
  }, [preferences?.analytics]);

  /* ═══════════════════════════════════════════════════════════
   * MARKETING
   * ═══════════════════════════════════════════════════════════ */
  useEffect(() => {
    if (!preferences?.marketing) return;

    /* ── Meta Pixel ── только .com ───────────────────────── */
    if (META_PIXEL_ID && isComDomain() && !metaLoaded.current) {
      metaLoaded.current = true;
      loadScript("https://connect.facebook.net/en_US/fbevents.js").then(() => {
        const fbq = (window as Record<string, unknown>).fbq as (
          action: string,
          value: string,
        ) => void;
        if (typeof fbq === "function") {
          fbq("init", META_PIXEL_ID);
          fbq("track", "PageView");
        }
      });
    }
  }, [preferences?.marketing]);

  return null;
}
