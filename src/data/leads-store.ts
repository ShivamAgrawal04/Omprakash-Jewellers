import "server-only"
import type { ContactRecord, EnquiryRecord } from "@/data/types"

/**
 * In-memory lead store — the repository boundary for enquiries and
 * contact messages. Replace the implementation with a database-backed
 * repository in production without changing callers.
 */

const enquiries: EnquiryRecord[] = [];
const contactMessages: ContactRecord[] = [];

const MAX_RECORDS = 500;

export function createEnquiry(record: Omit<EnquiryRecord, "id" | "createdAt">): EnquiryRecord {
  const next: EnquiryRecord = {
    ...record,
    id: crypto.randomUUID(),
    createdAt: new Date().toISOString(),
  };
  enquiries.unshift(next);
  if (enquiries.length > MAX_RECORDS) enquiries.length = MAX_RECORDS;
  return next;
}

export function createContactMessage(
  record: Omit<ContactRecord, "id" | "createdAt">,
): ContactRecord {
  const next: ContactRecord = {
    ...record,
    id: crypto.randomUUID(),
    createdAt: new Date().toISOString(),
  };
  contactMessages.unshift(next);
  if (contactMessages.length > MAX_RECORDS) contactMessages.length = MAX_RECORDS;
  return next;
}

export function listEnquiries(): readonly EnquiryRecord[] {
  return enquiries;
}

export function listContactMessages(): readonly ContactRecord[] {
  return contactMessages;
}

/** Duplicate-submission guard: same phone + product within the window. */
export function isDuplicateEnquiry(
  phone: string,
  productSlug: string | undefined,
  windowMs = 60_000,
): boolean {
  const now = Date.now();
  return enquiries.some(
    (e) =>
      e.phone === phone &&
      (productSlug ? e.productSlug === productSlug : true) &&
      now - new Date(e.createdAt).getTime() < windowMs,
  );
}

/** Duplicate-submission guard for contact messages. */
export function isDuplicateContact(phone: string, windowMs = 60_000): boolean {
  const now = Date.now();
  return contactMessages.some(
    (e) => e.phone === phone && now - new Date(e.createdAt).getTime() < windowMs,
  );
}
