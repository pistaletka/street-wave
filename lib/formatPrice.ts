export function formatPrice(price: number): string {
  return price.toLocaleString("ru-RU") + " \u20BD";
}
