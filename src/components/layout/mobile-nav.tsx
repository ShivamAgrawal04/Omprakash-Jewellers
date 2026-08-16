"use client"

import Link from "next/link"
import { Gem, MapPin, Phone } from "lucide-react"
import { Dialog } from "@base-ui/react/dialog"
import { Accordion, AccordionItem, AccordionHeader, AccordionTrigger, AccordionPanel } from "@/components/ui/accordion"
import { mainNav } from "@/data/navigation"
import { siteConfig } from "@/data/site-config"
import { contactMessage, whatsappLink } from "@/lib/whatsapp"

export function MobileNav({ open, onClose }: { open: boolean; onClose: () => void }) {
  return (
    <Dialog.Root open={open} onOpenChange={(next) => !next && onClose()} modal>
      <Dialog.Portal>
        <Dialog.Backdrop className="fixed inset-0 z-50 bg-obsidian/60 backdrop-blur-[2px] data-[ending-style]:fade-out data-[starting-style]:fade-in" />
        <Dialog.Popup className="fixed inset-0 z-50 flex h-dvh w-full flex-col overflow-y-auto bg-background text-foreground outline-none data-[ending-style]:fade-out data-[starting-style]:fade-in">
          <div className="container-lux flex h-16 shrink-0 items-center justify-between">
            <Link href="/" onClick={onClose} className="flex items-center gap-2.5">
              <Gem className="size-5 text-gold" aria-hidden />
              <span className="font-display text-lg font-semibold tracking-wide">
                Om Prakash
                <span className="ml-2 text-[0.55rem] font-sans font-semibold uppercase tracking-[0.28em] text-gold">
                  Jewellers
                </span>
              </span>
            </Link>
            <Dialog.Close
              aria-label="Close menu"
              className="flex size-10 items-center justify-center rounded-full text-foreground transition-colors hover:bg-muted"
            >
              <span className="relative block h-4 w-4" aria-hidden>
                <span className="absolute left-0 top-1/2 h-px w-full -translate-y-1/2 rotate-45 bg-current" />
                <span className="absolute left-0 top-1/2 h-px w-full -translate-y-1/2 -rotate-45 bg-current" />
              </span>
            </Dialog.Close>
          </div>

          <nav aria-label="Mobile" className="container-lux flex-1 pb-10">
            <Accordion className="border-t border-border">
              {mainNav.map((item) => (
                <AccordionItem key={item.label}>
                  <AccordionHeader>
                    <Link
                      href={item.href}
                      onClick={onClose}
                      className="flex flex-1 items-center py-4 font-display text-2xl font-medium text-foreground"
                    >
                      {item.label}
                    </Link>
                    {item.children ? (
                      <AccordionTrigger aria-label={`Expand ${item.label}`} className="px-2 py-4" />
                    ) : null}
                  </AccordionHeader>
                  {item.children ? (
                    <AccordionPanel>
                      <ul className="space-y-1 border-l border-border pl-4">
                        {item.children.map((child) => (
                          <li key={child.label}>
                            <Link
                              href={child.href}
                              onClick={onClose}
                              className="block py-2 font-sans text-sm uppercase tracking-[0.12em] text-muted-foreground transition-colors hover:text-primary"
                            >
                              {child.label}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </AccordionPanel>
                  ) : null}
                </AccordionItem>
              ))}
            </Accordion>
          </nav>

          <div className="container-lux shrink-0 border-t border-border py-6">
            <div className="flex flex-col gap-3 text-sm text-muted-foreground">
              <a href={`tel:${siteConfig.phoneHref}`} className="flex items-center gap-3">
                <Phone className="size-4 text-gold" aria-hidden />
                {siteConfig.phone}
              </a>
              <a
                href={siteConfig.mapUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3"
              >
                <MapPin className="size-4 text-gold" aria-hidden />
                {siteConfig.address.line1}, {siteConfig.address.city}
              </a>
              <a
                href={whatsappLink(contactMessage())}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-2 inline-flex h-11 items-center justify-center rounded-md bg-gold px-5 font-sans text-[0.68rem] font-semibold uppercase tracking-[0.16em] text-obsidian"
              >
                WhatsApp
              </a>
            </div>
          </div>
        </Dialog.Popup>
      </Dialog.Portal>
    </Dialog.Root>
  )
}
