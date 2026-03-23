import { getMessages, getLocale } from "next-intl/server";

export async function getContent<T = any>(namespace: string): Promise<T> {
  const messages = await getMessages();
  return messages[namespace] as T;
}

export async function getLocaleCasesIndex() {
  const locale = await getLocale();
  return (await import(`../content/${locale}/cases/index.json`)).default;
}

export async function getLocaleCase(slug: string) {
  const locale = await getLocale();
  return (await import(`../content/${locale}/cases/${slug}.json`)).default;
}

export async function getLocaleProductsIndex() {
  const locale = await getLocale();
  return (await import(`../content/${locale}/products/index.json`)).default;
}

export async function getLocaleProduct(slug: string) {
  const locale = await getLocale();
  return (await import(`../content/${locale}/products/${slug}.json`)).default;
}
