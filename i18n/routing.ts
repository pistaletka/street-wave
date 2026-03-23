export const routing = {
  locales: ["ru", "en"] as const,
  defaultLocale: "ru" as const,
  localePrefix: "never" as const,
  domains: [
    { domain: "street-wave.ru", defaultLocale: "ru" as const },
    { domain: "www.street-wave.ru", defaultLocale: "ru" as const },
    { domain: "street-wave.com", defaultLocale: "en" as const },
    { domain: "www.street-wave.com", defaultLocale: "en" as const },
    { domain: "localhost:3000", defaultLocale: "ru" as const },
  ],
};
