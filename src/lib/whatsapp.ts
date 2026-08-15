import { siteConfig } from "@/data/site-config"

/**
 * Builds a wa.me deep link with a pre-filled message.
 * The message is assembled server-side from known product fields —
 * never from raw user input.
 */
export function whatsappLink(message: string): string {
  const number = siteConfig.whatsappNumber.replace(/[^\d]/g, "")
  return `https://wa.me/${number}?text=${encodeURIComponent(message)}`
}

export function productEnquiryMessage(
  productName: string,
  sku: string,
): string {
  return [
    `Hello, I am interested in:`,
    `${productName}`,
    `Product Code: ${sku}`,
    ``,
    `I would like to know more about this jewellery piece.`,
  ].join("\n")
}

export function visitMessage(): string {
  return `Hello, I would like to book a visit to your showroom. Please share available slots.`
}

export function contactMessage(): string {
  return `Hello, I would like to speak with someone from Om Prakash Jewellers.`
}
