import site from "../../content/site.json";

const getSiteUrl = (): string => {
  const envUrl = process.env.NEXT_PUBLIC_SITE_URL?.trim();
  if (envUrl) {
    try {
      const urlWithProtocol = /^https?:\/\//i.test(envUrl)
        ? envUrl
        : `https://${envUrl}`;
      return new URL(urlWithProtocol).toString().replace(/\/$/, "");
    } catch {
      // Fallback if envUrl is invalid
    }
  }
  return "http://localhost:3000";
};

const digits = (value: string) => value.replace(/[^\d]/g, "");

const mapQuery = [
  site.address.line1,
  site.address.city,
  site.address.country,
].join(", ");

export const siteConfig = {
  name: site.name,
  shortName: site.shortName,
  tagline: site.tagline,
  heroTitle: site.heroTitle,
  heroSubtitle: site.heroSubtitle,
  heroImage: site.heroImage,
  aboutTitle: site.aboutTitle,
  aboutBody: site.aboutBody,
  url: getSiteUrl(),
  phone: site.phone,
  phoneHref: `+${digits(site.phone)}`,
  whatsappNumber: process.env.WHATSAPP_NUMBER ?? site.whatsappNumber,
  email: site.email,
  address: site.address,
  hours: site.hours,
  socials: site.socials,
  mapUrl: `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(mapQuery)}`,
  mapEmbed: `https://maps.google.com/maps?q=${encodeURIComponent(mapQuery)}&z=16&output=embed`,
} as const;

export type SiteConfig = typeof siteConfig;
export type SiteContent = typeof site;
