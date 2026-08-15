"use client"

import { useRef, useState, useTransition } from "react"
import { Send } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select } from "@/components/ui/select"
import { submitContact, type ContactState } from "@/actions/contact"

const SUBJECTS = [
  "General enquiry",
  "Bridal appointment",
  "Custom jewellery commission",
  "Repair & care",
  "Old gold exchange / valuation",
  "Partnership or media",
]

const initialState: ContactState = { status: "idle" }

export function ContactForm() {
  const [state, setState] = useState<ContactState>(initialState)
  const [isPending, startTransition] = useTransition()
  const formRef = useRef<HTMLFormElement | null>(null)

  function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const formData = new FormData(event.currentTarget)
    startTransition(async () => {
      const result = await submitContact(state, formData)
      setState(result)
    })
  }

  if (state.status === "success") {
    return (
      <div className="flex flex-col items-center gap-4 rounded-sm border border-border bg-pearl px-6 py-16 text-center">
        <span className="flex size-14 items-center justify-center rounded-full bg-primary/15 text-primary">
          <Send className="size-6" aria-hidden />
        </span>
        <p className="font-display text-2xl font-medium">Thank you.</p>
        <p className="max-w-md text-sm leading-relaxed text-muted-foreground">
          Your message has been received. We reply to every enquiry — usually the
          same day, 10 AM to 8:30 PM.
        </p>
        <Button variant="outline" onClick={() => setState(initialState)}>
          Send another message
        </Button>
      </div>
    )
  }

  return (
    <form
      ref={formRef}
      onSubmit={onSubmit}
      noValidate
      className="grid gap-5 rounded-sm border border-border bg-background p-6 md:p-8"
    >
      <div className="hidden" aria-hidden>
        <label htmlFor="website">Website</label>
        <input id="website" name="website" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      <div className="grid gap-2 sm:grid-cols-2">
        <div className="grid gap-2">
          <Label htmlFor="contact-name">Full Name *</Label>
          <Input
            id="contact-name"
            name="name"
            autoComplete="name"
            placeholder="Your full name"
            aria-invalid={Boolean(state.errors?.name)}
            aria-describedby={state.errors?.name ? "contact-name-error" : undefined}
          />
          {state.errors?.name ? (
            <p id="contact-name-error" role="alert" className="text-xs text-destructive">
              {state.errors.name}
            </p>
          ) : null}
        </div>
        <div className="grid gap-2">
          <Label htmlFor="contact-phone">Phone Number *</Label>
          <Input
            id="contact-phone"
            name="phone"
            type="tel"
            autoComplete="tel"
            placeholder="+91 …"
            aria-invalid={Boolean(state.errors?.phone)}
            aria-describedby={state.errors?.phone ? "contact-phone-error" : undefined}
          />
          {state.errors?.phone ? (
            <p id="contact-phone-error" role="alert" className="text-xs text-destructive">
              {state.errors.phone}
            </p>
          ) : null}
        </div>
      </div>

      <div className="grid gap-2 sm:grid-cols-2">
        <div className="grid gap-2">
          <Label htmlFor="contact-email">Email</Label>
          <Input
            id="contact-email"
            name="email"
            type="email"
            autoComplete="email"
            placeholder="you@example.com"
            aria-invalid={Boolean(state.errors?.email)}
            aria-describedby={state.errors?.email ? "contact-email-error" : undefined}
          />
          {state.errors?.email ? (
            <p id="contact-email-error" role="alert" className="text-xs text-destructive">
              {state.errors.email}
            </p>
          ) : null}
        </div>
        <div className="grid gap-2">
          <Label htmlFor="contact-subject">Subject *</Label>
          <Select
            id="contact-subject"
            name="subject"
            defaultValue="General enquiry"
            aria-invalid={Boolean(state.errors?.subject)}
          >
            {SUBJECTS.map((subject) => (
              <option key={subject}>{subject}</option>
            ))}
          </Select>
          {state.errors?.subject ? (
            <p role="alert" className="text-xs text-destructive">
              {state.errors.subject}
            </p>
          ) : null}
        </div>
      </div>

      <div className="grid gap-2">
        <Label htmlFor="contact-message">Message *</Label>
        <Textarea
          id="contact-message"
          name="message"
          rows={6}
          placeholder="Tell us what you're looking for…"
          aria-invalid={Boolean(state.errors?.message)}
          aria-describedby={state.errors?.message ? "contact-message-error" : undefined}
        />
        {state.errors?.message ? (
          <p id="contact-message-error" role="alert" className="text-xs text-destructive">
            {state.errors.message}
          </p>
        ) : null}
      </div>

      {state.errors?.form ? (
        <p role="alert" className="rounded-md border border-destructive/30 bg-destructive/10 px-3 py-2 text-sm text-destructive">
          {state.errors.form}
        </p>
      ) : null}

      <Button type="submit" disabled={isPending} className="w-full sm:w-auto">
        <Send className="size-4" aria-hidden />
        {isPending ? "Sending…" : "Send Message"}
      </Button>
    </form>
  )
}
