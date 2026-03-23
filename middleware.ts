import { type NextRequest, NextResponse } from "next/server";
import { CIS_COUNTRIES } from "./i18n/config";

const LOCALE_COOKIE = "sw-locale";
const RU_ONLY_PATHS = ["/offers", "/privacy", "/agreements", "/consent", "/payment"];

export default function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const host = request.headers.get("host") || "";

  const isComDomain =
    host.includes("street-wave.com") || host.includes("www.street-wave.com");
  const isRuDomain =
    host.includes("street-wave.ru") ||
    host.includes("www.street-wave.ru") ||
    host.includes("localhost");

  // Block RU-only legal pages on .com
  if (isComDomain && RU_ONLY_PATHS.some((p) => pathname.startsWith(p))) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  // Cookie override (user explicitly chose a language)
  const cookieLocale = request.cookies.get(LOCALE_COOKIE)?.value;

  if (cookieLocale === "en" && isRuDomain && !host.includes("localhost")) {
    const url = new URL(pathname, "https://street-wave.com");
    url.search = request.nextUrl.search;
    return NextResponse.redirect(url);
  }
  if (cookieLocale === "ru" && isComDomain) {
    const url = new URL(pathname, "https://street-wave.ru");
    url.search = request.nextUrl.search;
    return NextResponse.redirect(url);
  }

  // Geo-redirect: non-CIS visitors on .ru → .com
  if (!cookieLocale && isRuDomain && !host.includes("localhost")) {
    const country =
      request.headers.get("x-vercel-ip-country") ||
      request.headers.get("cf-ipcountry") ||
      "";

    if (country && !CIS_COUNTRIES.includes(country)) {
      const url = new URL(pathname, "https://street-wave.com");
      url.search = request.nextUrl.search;
      return NextResponse.redirect(url);
    }
  }

  // Determine locale and set header for next-intl
  let locale = "ru";
  if (isComDomain) {
    locale = "en";
  } else if (cookieLocale === "en" || cookieLocale === "ru") {
    locale = cookieLocale;
  }

  const response = NextResponse.next();
  response.headers.set("x-next-intl-locale", locale);
  return response;
}

export const config = {
  matcher: ["/((?!api|_next|.*\\..*).*)"],
};
