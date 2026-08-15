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

function ThemeToggle({ className }: { className?: string }) {
  const { resolvedTheme, setTheme } = useTheme()
  const mounted = useSyncExternalStore(
    () => () => {},
    () => true,
    () => false,
  )

  const toggle = () => setTheme(resolvedTheme === "dark" ? "light" : "dark")

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={
        mounted && resolvedTheme === "dark" ? "Switch to light mode" : "Switch to dark mode"
      }
      className={cn(
        "flex size-10 items-center justify-center rounded-full transition-colors hover:bg-white/10 focus-visible:outline-2 focus-visible:outline-ring",
        className,
      )}
    >
      {mounted && resolvedTheme === "dark" ? (
        <Sun className="size-[18px]" />
      ) : (
        <Moon className="size-[18px]" />
      )}
    </button>
  )
}

function SearchLink({ className }: { className?: string }) {
  return (
    <Link
      href="/search"
      aria-label="Search jewellery"
      className={cn(
        "flex size-10 items-center justify-center rounded-full transition-colors hover:bg-white/10 focus-visible:outline-2 focus-visible:outline-ring",
        className,
      )}
    >
      <Search className="size-[18px]" />
    </Link>
  )
}

function WishlistLink({ className }: { className?: string }) {
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
        "relative flex size-10 items-center justify-center rounded-full transition-colors hover:bg-white/10 focus-visible:outline-2 focus-visible:outline-ring",
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

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-500",
        overlay
          ? "border-b border-transparent bg-transparent text-white"
          : "border-b border-border bg-background/90 text-foreground backdrop-blur-md supports-[backdrop-filter]:bg-background/75",
      )}
    >
      <div className="container-lux flex h-16 items-center justify-between gap-4 md:h-20">
        <Link
          href="/"
          className="flex items-center gap-2.5 focus-visible:outline-2 focus-visible:outline-ring"
          aria-label={`${siteConfig.name} — home`}
        >
          <Gem className="size-5 text-gold" aria-hidden />
          <span className="font-display text-lg font-semibold tracking-wide whitespace-nowrap">
            Om Prakash
            <span className="ml-2 hidden text-[0.55rem] font-sans font-semibold uppercase tracking-[0.28em] text-gold sm:inline">
              Jewellers
            </span>
          </span>
        </Link>

        <nav aria-label="Primary" className="hidden lg:block">
          <ul className="flex items-center gap-7">
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
                    <div className="w-56 rounded-md border border-border bg-background p-2 text-foreground shadow-xl shadow-obsidian/10">
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

        <div className="flex items-center gap-1 md:gap-2">
          <ThemeToggle />
          <SearchLink />
          <WishlistLink />
          <Link
            href="/contact"
            className="hidden xl:inline-flex"
            aria-label="Contact or enquire"
          >
            <Button
              variant={overlay ? "outline" : "default"}
              size="sm"
              className={cn(
                overlay && "border-white/40 text-white hover:border-gold hover:text-gold",
              )}
            >
              Contact
            </Button>
          </Link>
          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden"
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
