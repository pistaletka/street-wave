/** Minimum digits required for a valid phone number */
const MIN_DIGITS = 10;

/** Strip everything except digits from input */
function extractDigits(value: string): string {
  return value.replace(/\D/g, "");
}

/** Check if value contains a valid phone number (>= 10 digits) */
export function isValidPhone(value: string): boolean {
  return extractDigits(value).length >= MIN_DIGITS;
}
