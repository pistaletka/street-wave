"use client";

import { CartProvider } from "@/context/CartContext";
import { CookieConsentProvider } from "@/context/CookieConsentContext";
import CookieBanner from "../shared/CookieBanner";
import CookieSettings from "../shared/CookieSettings";
import AnalyticsLoader from "../shared/AnalyticsLoader";
import type { ReactNode } from "react";
import TrackingBootstrap from "@/components/analytics/TrackingBootstrap";

export default function Providers({ children }: { children: ReactNode }) {
  return (
    <CartProvider>
      <CookieConsentProvider>
        <TrackingBootstrap />
        <AnalyticsLoader />
        {children}
        <CookieBanner />
        <CookieSettings />
      </CookieConsentProvider>
    </CartProvider>
  );
}