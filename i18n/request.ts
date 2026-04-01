import { getRequestConfig } from "next-intl/server";
import { cookies, headers } from "next/headers";

export default getRequestConfig(async () => {
  // Priority: cookie > header from middleware > default
  const cookieStore = await cookies();
  const headerStore = await headers();

  const cookieLocale = cookieStore.get("sw-locale")?.value;
  const headerLocale = headerStore.get("x-next-intl-locale");

  const locale =
    (cookieLocale === "en" || cookieLocale === "ru") ? cookieLocale :
    (headerLocale === "en" || headerLocale === "ru") ? headerLocale :
    "ru";

  return {
    locale,
    messages: {
      common: (await import(`../content/${locale}/common.json`)).default,
      home: (await import(`../content/${locale}/home.json`)).default,
      placeOrder: (await import(`../content/${locale}/place-order.json`)).default,
      projects: (await import(`../content/${locale}/projects.json`)).default,
      liveCustomization: (await import(`../content/${locale}/live-customization.json`)).default,
      art: (await import(`../content/${locale}/art.json`)).default,
      contacts: (await import(`../content/${locale}/contacts.json`)).default,
      shop: (await import(`../content/${locale}/shop.json`)).default,
      faq: (await import(`../content/${locale}/faq.json`)).default,
      checkout: (await import(`../content/${locale}/checkout.json`)).default,
      stereoboogie: (await import(`../content/${locale}/stereoboogie.json`)).default,
    },
  };
});
