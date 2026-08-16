"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useEffect, useSyncExternalStore, useState } from "react"
import { Gem, Heart, Moon, Search, Sun } from "lucide-react"
import { cn } from "@/lib/utils"
import { mainNav } from "@/data/navigation"
import { siteConfig } from "@/data/site-config"
import { useWishlist } from "@/components/providers/wishlist-provider"
import { useTheme } from "@/components/providers/theme-provider"
import { Button } from "@/components/ui/button"
import { MobileNav } from "@/components/layout/mobile-nav"

function ThemeToggle({ className, lightOnDark }: { className?: string; lightOnDark?: boolean }) {
  const { resolvedTheme, toggleTheme } = useTheme()
  const mounted = useSyncExternalStore(
    () => () => {},
    () => true,
    () => false,
  )

  const isDark = mounted && resolvedTheme === "dark"

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      className={cn(
        "relative z-50 flex size-10 items-center justify-center rounded-full transition-colors focus-visible:outline-2 focus-visible:outline-ring",
        lightOnDark ? "hover:bg-white/10" : "hover:bg-muted",
        className,
      )}
    >
      {isDark ? <Sun className="size-[18px]" /> : <Moon className="size-[18px]" />}
    </button>
  )
}

function SearchLink({ className, lightOnDark }: { className?: string; lightOnDark?: boolean }) {
  return (
    <Link
      href="/search"
      aria-label="Search jewellery"
      className={cn(
        "flex size-10 items-center justify-center rounded-full transition-colors focus-visible:outline-2 focus-visible:outline-ring",
        lightOnDark ? "hover:bg-white/10" : "hover:bg-muted",
        className,
      )}
    >
      <Search className="size-[18px]" />
    </Link>
  )
}

function WishlistLink({ className, lightOnDark }: { className?: string; lightOnDark?: boolean }) {
  const { count } = useWishlist()
  const mounted = useSyncExternalStore(
    () => () => {},
    () => true,
    () => false,
  )

  return (
    <Link
      href="/wishlist"
      aria-label={`Wishlist${mounted && count ? `, ${count} pieces` : ""}`}
      className={cn(
        "relative flex size-10 items-center justify-center rounded-full transition-colors focus-visible:outline-2 focus-visible:outline-ring",
        lightOnDark ? "hover:bg-white/10" : "hover:bg-muted",
        className,
      )}
    >
      <Heart className="size-[18px]" />
      {mounted && count > 0 ? (
        <span className="absolute -right-0.5 -top-0.5 flex min-w-4 items-center justify-center rounded-full bg-primary px-1 text-[0.6rem] font-bold leading-4 text-white dark:text-obsidian">
          {count}
        </span>
      ) : null}
    </Link>
  )
}

export function SiteHeader() {
  const pathname = usePathname()
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const overlay = pathname === "/" && !scrolled

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16)
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  const [prevPathname, setPrevPathname] = useState(pathname)
  if (pathname !== prevPathname) {
    setPrevPathname(pathname)
    setMobileOpen(false)
  }

  if (pathname.startsWith("/admin")) return null

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-500",
        overlay
          ? "border-b border-transparent bg-transparent text-white"
          : "border-b border-border bg-background/90 text-foreground backdrop-blur-md supports-[backdrop-filter]:bg-background/75",
      )}
    >
      <div className="container-lux flex h-16 items-center justify-between gap-3 md:h-20">
        <Link
          href="/"
          className="flex min-w-0 items-center gap-2 focus-visible:outline-2 focus-visible:outline-ring"
          aria-label={`${siteConfig.name} — home`}
        >
          <Gem className="size-5 shrink-0 text-gold" aria-hidden />
          <span className="truncate font-display text-lg font-semibold tracking-wide">
            Omprakash
            <span className="ml-2 hidden font-sans text-[0.55rem] font-semibold uppercase tracking-[0.28em] text-gold sm:inline">
              Jewellers
            </span>
          </span>
        </Link>

        <nav aria-label="Primary" className="hidden min-w-0 lg:block">
          <ul className="flex items-center gap-5 xl:gap-7">
            {mainNav.map((item) => (
              <li key={item.label} className="group relative">
                <Link
                  href={item.href}
                  className={cn(
                    "flex items-center gap-1 py-2 font-sans text-[0.68rem] font-semibold uppercase tracking-[0.16em] transition-colors hover:text-gold",
                    overlay ? "text-white/90" : "text-foreground/80",
                  )}
                >
                  {item.label}
                </Link>
                {item.children ? (
                  <div className="invisible absolute left-1/2 top-full z-50 -translate-x-1/2 translate-y-2 pt-3 opacity-0 transition-all duration-300 group-hover:visible group-hover:translate-y-0 group-hover:opacity-100 group-focus-within:visible group-focus-within:translate-y-0 group-focus-within:opacity-100">
                    <div className="w-52 rounded-md border border-border bg-background p-2 text-foreground shadow-xl shadow-obsidian/10">
                      {item.children.map((child) => (
                        <Link
                          key={child.label}
                          href={child.href}
                          className="block rounded-sm px-3 py-2 font-sans text-[0.68rem] font-semibold uppercase tracking-[0.14em] text-foreground/80 transition-colors hover:bg-muted hover:text-primary"
                        >
                          {child.label}
                        </Link>
                      ))}
                    </div>
                  </div>
                ) : null}
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex shrink-0 items-center gap-0.5 md:gap-1">
          <ThemeToggle lightOnDark={overlay} />
          <SearchLink lightOnDark={overlay} />
          <WishlistLink lightOnDark={overlay} />
          <Link
            href="/contact"
            className="hidden sm:inline-flex h-9 items-center rounded-md bg-gold px-4 font-sans text-[0.68rem] font-semibold uppercase tracking-[0.16em] text-obsidian transition-colors hover:bg-champagne"
          >
            Contact
          </Link>
          <Button
            variant="ghost"
            size="icon"
            className={cn("lg:hidden", overlay && "text-white hover:bg-white/10")}
            aria-label="Open menu"
            aria-expanded={mobileOpen}
            onClick={() => setMobileOpen(true)}
          >
            <span className="flex flex-col gap-1.5" aria-hidden>
              <span className="h-px w-5 bg-current" />
              <span className="h-px w-5 bg-current" />
              <span className="h-px w-5 bg-current" />
            </span>
          </Button>
        </div>
      </div>

      <MobileNav open={mobileOpen} onClose={() => setMobileOpen(false)} />
    </header>
  )
}
