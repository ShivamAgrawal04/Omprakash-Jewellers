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

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: `${siteConfig.name} — Timeless Gold & Diamond Jewellery`,
    template: `%s — ${siteConfig.name}`,
  },
  description:
    "Om Prakash Jewellers — handcrafted gold, diamond and bridal jewellery. Visit our showroom for 22K & 18K certified pieces, custom designs and jewellery care.",
  applicationName: siteConfig.name,
  keywords: [
    "gold jewellery",
    "diamond jewellery",
    "bridal jewellery",
    "22k gold",
    "18k gold",
    "jewellery showroom",
    "custom jewellery",
    "rings",
    "necklaces",
    "earrings",
    "bangles",
  ],
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: siteConfig.url,
    siteName: siteConfig.name,
    title: `${siteConfig.name} — Timeless Gold & Diamond Jewellery`,
    description:
      "Handcrafted gold, diamond and bridal jewellery. Crafted to be remembered.",
  },
  twitter: {
    card: "summary_large_image",
    title: `${siteConfig.name} — Timeless Gold & Diamond Jewellery`,
    description:
      "Handcrafted gold, diamond and bridal jewellery. Crafted to be remembered.",
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
      suppressHydrationWarning
      className={cn("h-full antialiased", manrope.variable, cormorant.variable)}
    >
      <body className="flex min-h-full flex-col">
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
