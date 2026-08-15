export const FIELD_REQUIRED = "This field is required.";
export const PHONE_INVALID = "Enter a valid phone number.";
export const EMAIL_INVALID = "Enter a valid email address.";
export const MESSAGE_SHORT = "Message must be at least 10 characters.";

export function isEmail(value: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(value.trim());
}

/**
 * Accepts Indian and international phone formats loosely,
 * including +91 prefixes, spaces, dashes and digits 7–15 long.
 */
export function isPhone(value: string): boolean {
  const digits = value.replace(/[^\d]/g, "");
  return digits.length >= 10 && digits.length <= 15;
}

export function isFutureDate(value: string): boolean {
  if (!value) return false;
  const date = new Date(`${value}T00:00:00`);
  if (Number.isNaN(date.getTime())) return false;
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return date >= today;
}

export function isRequired(value: string | undefined): boolean {
  return typeof value === "string" && value.trim().length > 0;
}

export function cleanText(value: string, max = 2000): string {
  return value.trim().slice(0, max);
}

/** Removes control characters and script-like content from free text. */
export function sanitizeText(value: string, max = 2000): string {
  // eslint-disable-next-line no-control-regex
  const cleaned = value.replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F]/g, "");
  return cleaned.trim().slice(0, max);
}

export function isHoneypot(value: string): boolean {
  return value.length > 0;
}
