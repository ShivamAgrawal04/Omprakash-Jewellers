"use server"

import { headers } from "next/headers"
import {
  isEmail,
  isHoneypot,
  isPhone,
  isRequired,
  sanitizeText,
} from "@/lib/validation"
import { rateLimit, LIMITS } from "@/lib/rate-limit"
import { createContactMessage, isDuplicateContact } from "@/data/leads-store"

export interface ContactState {
  status: "idle" | "success" | "error"
  errors?: Partial<Record<"name" | "phone" | "email" | "subject" | "message" | "form", string>>
}

async function clientIp(): Promise<string> {
  const header = await headers()
  const fwd = header.get("x-forwarded-for")
  if (fwd) return fwd.split(",")[0].trim()
  return header.get("x-real-ip") ?? "unknown"
}

export async function submitContact(
  _prev: ContactState,
  formData: FormData,
): Promise<ContactState> {
  const ip = await clientIp()

  const name = sanitizeText(formData.get("name")?.toString() ?? "", 120);
  const phone = sanitizeText(formData.get("phone")?.toString() ?? "", 24);
  const email = sanitizeText(formData.get("email")?.toString() ?? "", 200);
  const subject = sanitizeText(formData.get("subject")?.toString() ?? "", 120);
  const message = sanitizeText(formData.get("message")?.toString() ?? "", 2000);
  const honeypot = formData.get("website")?.toString() ?? "";

  const errors: ContactState["errors"] = {};

  if (isHoneypot(honeypot)) {
    return { status: "success" };
  }

  if (!rateLimit(`contact:${ip}`, LIMITS.CONTACT)) {
    return {
      status: "error",
      errors: { form: "You've sent too many messages. Please try again in a few minutes." },
    };
  }

  if (!isRequired(name)) errors.name = "Please enter your name.";
  if (!isRequired(phone)) errors.phone = "Please enter your phone number.";
  else if (!isPhone(phone)) errors.phone = "Enter a valid phone number.";
  if (email && !isEmail(email)) errors.email = "Enter a valid email address.";
  if (!isRequired(subject)) errors.subject = "Please choose a subject.";
  if (!isRequired(message)) errors.message = "Please write a message.";
  else if (message.length < 10) errors.message = "Message must be at least 10 characters.";

  if (Object.keys(errors).length > 0) {
    return { status: "error", errors };
  }

  if (isDuplicateContact(phone)) {
    return {
      status: "error",
      errors: { form: "We already received a message from this number. We'll respond shortly." },
    };
  }

  createContactMessage({
    name,
    phone,
    email: email || undefined,
    subject,
    message,
  });

  return { status: "success" };
}
