"use server"

import { headers } from "next/headers"
import {
  isEmail,
  isFutureDate,
  isHoneypot,
  isPhone,
  isRequired,
  sanitizeText,
} from "@/lib/validation"
import { rateLimit, LIMITS } from "@/lib/rate-limit"
import { getProductBySlug } from "@/data/products"
import {
  createEnquiry,
  isDuplicateEnquiry,
} from "@/data/leads-store"

export interface EnquiryState {
  status: "idle" | "success" | "error"
  errors?: Partial<Record<"name" | "phone" | "email" | "message" | "form", string>>
}

async function clientIp(): Promise<string> {
  const header = await headers()
  const fwd = header.get("x-forwarded-for")
  if (fwd) return fwd.split(",")[0].trim()
  return header.get("x-real-ip") ?? "unknown"
}

export async function submitEnquiry(
  _prev: EnquiryState,
  formData: FormData,
): Promise<EnquiryState> {
  const ip = await clientIp()

  const productSlug = sanitizeText(formData.get("productSlug")?.toString() ?? "", 100);
  const product = productSlug ? getProductBySlug(productSlug) : undefined;
  if (productSlug && !product) {
    return {
      status: "error",
      errors: { form: "This piece is no longer available. Please browse our collections." },
    };
  }

  const name = sanitizeText(formData.get("name")?.toString() ?? "", 120);
  const phone = sanitizeText(formData.get("phone")?.toString() ?? "", 24);
  const email = sanitizeText(formData.get("email")?.toString() ?? "", 200);
  const contactMethod = sanitizeText(formData.get("contactMethod")?.toString() ?? "", 40);
  const preferredDate = sanitizeText(formData.get("preferredDate")?.toString() ?? "", 20);
  const message = sanitizeText(formData.get("message")?.toString() ?? "", 1000);
  const honeypot = formData.get("website")?.toString() ?? "";

  const errors: EnquiryState["errors"] = {};

  if (isHoneypot(honeypot)) {
    return { status: "success" }; // silently accept bots
  }

  if (!rateLimit(`enquiry:${ip}`, LIMITS.ENQUIRY)) {
    return {
      status: "error",
      errors: {
        form: "You've sent too many enquiries. Please try again in a few minutes.",
      },
    };
  }

  if (!isRequired(name)) errors.name = "Please enter your name.";
  if (!isRequired(phone)) errors.phone = "Please enter your phone number.";
  else if (!isPhone(phone)) errors.phone = "Enter a valid phone number.";
  if (email && !isEmail(email)) errors.email = "Enter a valid email address.";
  if (preferredDate && !isFutureDate(preferredDate)) {
    errors.message = "Preferred visit date must be today or later.";
  }
  if (message && message.length < 10) {
    errors.message = "Message must be at least 10 characters.";
  }

  if (Object.keys(errors).length > 0) {
    return { status: "error", errors };
  }

  if (isDuplicateEnquiry(phone, productSlug)) {
    return {
      status: "error",
      errors: { form: "We already received this enquiry. Our specialist will contact you shortly." },
    };
  }

  createEnquiry({
    productSlug: product?.slug,
    productName: product?.name,
    name,
    phone,
    email: email || undefined,
    contactMethod: contactMethod || "phone",
    preferredDate: preferredDate || undefined,
    message: message || undefined,
  });

  return { status: "success" };
}
