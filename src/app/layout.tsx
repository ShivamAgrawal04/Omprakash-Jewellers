import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, Manrope } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { ThemeProvider } from "@/components/providers/theme-provider";
import { WishlistProvider } from "@/components/providers/wishlist-provider";
import { ToastProvider } from "@/components/providers/toast-provider";
import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";
import { siteConfig } from "@/data/site-config";

const manrope = Manrope({
  variable: "--font-sans",
  subsets: ["latin"],
  display: "swap",
});

const cormorant = Cormorant_Garamond({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
  display: "swap",
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#faf8f3" },
    { media: "(prefers-color-scheme: dark)", color: "#0d0d0d" },
  ],
};

const getMetadataBase = (): URL => {
  try {
    return new URL(siteConfig.url);
  } catch {
    return new URL("http://localhost:3000");
  }
};

export const metadata: Metadata = {
  metadataBase: getMetadataBase(),
  title: {
    default: `${siteConfig.name} — Gold, silver & custom work in Porsa`,
    template: `%s — ${siteConfig.name}`,
  },
  description:
    "Omprakash Jewellers, Imli Chowk, Porsa — gold, silver, stones, custom making, repair and polish. Visit the shop or WhatsApp. We do not sell online.",
  applicationName: siteConfig.name,
  keywords: [
    "Omprakash Jewellers",
    "Porsa jeweller",
    "Imli Chowk",
    "gold jewellery Porsa",
    "silver jewellery",
    "custom jewellery",
    "jewellery repair",
  ],
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: siteConfig.url,
    siteName: siteConfig.name,
    title: `${siteConfig.name} — Gold, silver & custom work in Porsa`,
    description:
      "A single jewellery shop in Porsa. Visit or WhatsApp — we do not sell online.",
  },
  twitter: {
    card: "summary_large_image",
    title: `${siteConfig.name} — Gold, silver & custom work in Porsa`,
    description:
      "A single jewellery shop in Porsa. Visit or WhatsApp — we do not sell online.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      data-scroll-behavior="smooth"
      suppressHydrationWarning
      className={cn("h-full antialiased", manrope.variable, cormorant.variable)}
    >
      <body className="flex min-h-full flex-col" cz-shortcut-listen="true">
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem("opj-theme")||"system";var d=t==="dark"||(t==="system"&&matchMedia("(prefers-color-scheme: dark)").matches);document.documentElement.classList.toggle("dark",d);document.documentElement.style.colorScheme=d?"dark":"light"}catch(e){}})();`,
          }}
        />
        <ThemeProvider>
          <ToastProvider>
            <WishlistProvider>
              <SiteHeader />
              <div className="flex-1">{children}</div>
              <SiteFooter />
            </WishlistProvider>
          </ToastProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
