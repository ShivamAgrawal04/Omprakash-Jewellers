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

export const siteConfig = {
  name: "Om Prakash Jewellers",
  shortName: "OPJ",
  tagline: "Crafted to be remembered",
  url: getSiteUrl(),
  phone: "+91 98765 43210",
  phoneHref: "+919876543210",
  whatsappNumber: process.env.WHATSAPP_NUMBER ?? "919876543210",
  email: "hello@omprakashjewellers.com",
  address: {
    line1: "12, Heritage Market, MG Road",
    line2: "Near City Railway Station",
    city: "Jaipur, Rajasthan 302001",
    country: "India",
  },
  hours: [
    { days: "Monday – Saturday", time: "10:00 AM – 8:30 PM" },
    { days: "Sunday", time: "11:00 AM – 7:00 PM" },
  ],
  socials: {
    instagram: "https://instagram.com",
    facebook: "https://facebook.com",
  },
  mapUrl:
    "https://www.google.com/maps/search/?api=1&query=Jaipur+Rajasthan+India",
  mapEmbed:
    "https://maps.google.com/maps?q=Jaipur%2C%20Rajasthan&z=14&output=embed",
} as const;

export type SiteConfig = typeof siteConfig;
