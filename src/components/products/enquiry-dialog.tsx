"use client"

import { useRef, useState, useTransition } from "react"
import { MessageCircle, Send } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select } from "@/components/ui/select"
import { submitEnquiry, type EnquiryState } from "@/actions/enquiry"
import { productEnquiryMessage, whatsappLink } from "@/lib/whatsapp"

interface EnquiryDialogProps {
  productName: string
  productSlug: string
  sku: string
  open: boolean
  onOpenChange: (open: boolean) => void
}

const initialState: EnquiryState = { status: "idle" }

export function EnquiryDialog({
  productName,
  productSlug,
  sku,
  open,
  onOpenChange,
}: EnquiryDialogProps) {
  const [state, setState] = useState<EnquiryState>(initialState)
  const [isPending, startTransition] = useTransition()
  const formRef = useRef<HTMLFormElement | null>(null)

  const [prevOpen, setPrevOpen] = useState(open)
  if (open !== prevOpen) {
    setPrevOpen(open)
    if (!open) setState(initialState)
  }

  function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (!formRef.current) return
    const formData = new FormData(formRef.current)
    startTransition(async () => {
      const result = await submitEnquiry(state, formData)
      setState(result)
    })
  }

  const whatsappHref = whatsappLink(productEnquiryMessage(productName, sku))

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[88dvh] overflow-y-auto">
        {state.status === "success" ? (
          <div className="flex flex-col items-center gap-4 py-12 text-center">
            <span className="flex size-14 items-center justify-center rounded-full bg-primary/15 text-primary">
              <Send className="size-6" aria-hidden />
            </span>
            <DialogTitle>Thank you.</DialogTitle>
            <DialogDescription>
              Your enquiry has been received. Our jewellery specialist will contact you
              shortly.
            </DialogDescription>
            <Button variant="outline" className="mt-2" onClick={() => onOpenChange(false)}>
              Close
            </Button>
          </div>
        ) : (
          <>
            <DialogHeader>
              <p className="eyebrow text-primary">Private Enquiry</p>
              <DialogTitle>Enquire About This Piece</DialogTitle>
              <DialogDescription>
                {productName} · {sku}
              </DialogDescription>
            </DialogHeader>

            <form ref={formRef} onSubmit={onSubmit} className="mt-2 grid gap-5" noValidate>
              <input type="hidden" name="productSlug" value={productSlug} />
              <div className="hidden" aria-hidden>
                <label htmlFor="enquiry-website">Website</label>
                <input id="enquiry-website" name="website" type="text" tabIndex={-1} autoComplete="off" />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="enquiry-name">Full Name *</Label>
                <Input
                  id="enquiry-name"
                  name="name"
                  autoComplete="name"
                  placeholder="Your full name"
                  aria-invalid={Boolean(state.errors?.name)}
                  aria-describedby={state.errors?.name ? "enquiry-name-error" : undefined}
                />
                {state.errors?.name ? (
                  <p id="enquiry-name-error" role="alert" className="text-xs text-destructive">
                    {state.errors.name}
                  </p>
                ) : null}
              </div>

              <div className="grid gap-2">
                <Label htmlFor="enquiry-phone">Phone Number *</Label>
                <Input
                  id="enquiry-phone"
                  name="phone"
                  type="tel"
                  autoComplete="tel"
                  placeholder="+91 …"
                  aria-invalid={Boolean(state.errors?.phone)}
                  aria-describedby={state.errors?.phone ? "enquiry-phone-error" : undefined}
                />
                {state.errors?.phone ? (
                  <p id="enquiry-phone-error" role="alert" className="text-xs text-destructive">
                    {state.errors.phone}
                  </p>
                ) : null}
              </div>

              <div className="grid gap-2">
                <Label htmlFor="enquiry-email">Email</Label>
                <Input
                  id="enquiry-email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  placeholder="you@example.com"
                  aria-invalid={Boolean(state.errors?.email)}
                  aria-describedby={state.errors?.email ? "enquiry-email-error" : undefined}
                />
                {state.errors?.email ? (
                  <p id="enquiry-email-error" role="alert" className="text-xs text-destructive">
                    {state.errors.email}
                  </p>
                ) : null}
              </div>

              <div className="grid gap-2">
                <Label htmlFor="enquiry-method">Preferred Contact Method</Label>
                <Select id="enquiry-method" name="contactMethod" defaultValue="phone">
                  <option value="phone">Phone call</option>
                  <option value="whatsapp">WhatsApp</option>
                  <option value="email">Email</option>
                  <option value="visit">At the store</option>
                </Select>
              </div>

              <div className="grid gap-2">
                <Label htmlFor="enquiry-date">Preferred Visit Date</Label>
                <Input id="enquiry-date" name="preferredDate" type="date" />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="enquiry-message">Message</Label>
                <Textarea
                  id="enquiry-message"
                  name="message"
                  rows={4}
                  placeholder="Ring size, stone preference, occasion…"
                  aria-invalid={Boolean(state.errors?.message)}
                  aria-describedby={state.errors?.message ? "enquiry-message-error" : undefined}
                />
                {state.errors?.message ? (
                  <p id="enquiry-message-error" role="alert" className="text-xs text-destructive">
                    {state.errors.message}
                  </p>
                ) : null}
              </div>

              {state.errors?.form ? (
                <p role="alert" className="rounded-md border border-destructive/30 bg-destructive/10 px-3 py-2 text-sm text-destructive">
                  {state.errors.form}
                </p>
              ) : null}

              <div className="grid gap-3 pt-1">
                <Button type="submit" disabled={isPending} className="w-full">
                  {isPending ? "Sending…" : "Send Enquiry"}
                </Button>
                <a
                  href={whatsappHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex w-full items-center justify-center gap-2 rounded-md border border-border px-6 py-3 font-sans text-[0.7rem] font-semibold uppercase tracking-[0.18em] text-foreground transition-colors hover:border-primary/70 hover:text-primary"
                >
                  <MessageCircle className="size-4" aria-hidden />
                  Ask on WhatsApp
                </a>
              </div>
            </form>
          </>
        )}
      </DialogContent>
    </Dialog>
  )
}
