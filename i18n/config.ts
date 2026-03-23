export const locales = ["ru", "en"] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = "ru";

// CIS countries that stay on .ru
export const CIS_COUNTRIES = [
  "RU", "BY", "UA", "KZ", "UZ", "KG", "TJ", "AM", "AZ", "GE", "MD",
];
