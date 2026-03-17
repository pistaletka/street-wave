"use client";

import { createContext, useContext, useState, useEffect, useCallback, type ReactNode } from "react";

export interface CookiePreferences {
  necessary: boolean;
  analytics: boolean;
  marketing: boolean;
}

interface CookieConsentState {
  /** null = user hasn't made a choice yet */
  preferences: CookiePreferences | null;
  /** Whether the banner should be shown */
  showBanner: boolean;
  /** Whether the settings modal is open */
  showSettings: boolean;
  acceptAll: () => void;
  acceptNecessary: () => void;
  savePreferences: (prefs: CookiePreferences) => void;
  openSettings: () => void;
  closeSettings: () => void;
}

const STORAGE_KEY = "sw-cookie-consent";

const CookieConsentContext = createContext<CookieConsentState | null>(null);

export function CookieConsentProvider({ children }: { children: ReactNode }) {
  const [preferences, setPreferences] = useState<CookiePreferences | null>(null);
  const [showBanner, setShowBanner] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        setPreferences(JSON.parse(stored));
      } else {
        setShowBanner(true);
      }
    } catch {
      setShowBanner(true);
    }
    setLoaded(true);
  }, []);

  const persist = useCallback((prefs: CookiePreferences) => {
    setPreferences(prefs);
    setShowBanner(false);
    setShowSettings(false);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(prefs));
    } catch {
      // silent
    }
  }, []);

  const acceptAll = useCallback(() => {
    persist({ necessary: true, analytics: true, marketing: true });
  }, [persist]);

  const acceptNecessary = useCallback(() => {
    persist({ necessary: true, analytics: false, marketing: false });
  }, [persist]);

  const savePreferences = useCallback((prefs: CookiePreferences) => {
    persist({ ...prefs, necessary: true });
  }, [persist]);

  const openSettings = useCallback(() => {
    setShowSettings(true);
  }, []);

  const closeSettings = useCallback(() => {
    setShowSettings(false);
  }, []);

  return (
    <CookieConsentContext.Provider
      value={{
        preferences: loaded ? preferences : null,
        showBanner: loaded ? showBanner : false,
        showSettings,
        acceptAll,
        acceptNecessary,
        savePreferences,
        openSettings,
        closeSettings,
      }}
    >
      {children}
    </CookieConsentContext.Provider>
  );
}

export function useCookieConsent() {
  const ctx = useContext(CookieConsentContext);
  if (!ctx) throw new Error("useCookieConsent must be used inside CookieConsentProvider");
  return ctx;
}
