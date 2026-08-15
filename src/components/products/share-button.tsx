"use client"

import { useState } from "react"
import { Check, Share2 } from "lucide-react"
import { useToast } from "@/components/providers/toast-provider"
import { cn } from "@/lib/utils"

interface ShareButtonProps {
  productName?: string
  className?: string
}

export function ShareButton({ productName, className }: ShareButtonProps) {
  const { toast } = useToast()
  const [copied, setCopied] = useState(false)

  async function share() {
    const url = window.location.href
    const title = productName ?? "Om Prakash Jewellers"
    if (typeof navigator.share === "function") {
      try {
        await navigator.share({ title, text: title, url })
        return
      } catch {
        // user dismissed the native sheet — fall through to clipboard
      }
    }
    try {
      await navigator.clipboard.writeText(url)
      setCopied(true)
      toast("copy", "Link copied")
      window.setTimeout(() => setCopied(false), 2000)
    } catch {
      toast("error", "Could not copy the link")
    }
  }

  return (
    <button
      type="button"
      onClick={share}
      aria-label="Share this page"
      className={cn(
        "inline-flex items-center gap-2 rounded-md border border-border px-5 py-3 font-sans text-[0.7rem] font-semibold uppercase tracking-[0.18em] text-foreground transition-colors hover:border-primary/70 hover:text-primary",
        className,
      )}
    >
      {copied ? <Check className="size-4 text-primary" aria-hidden /> : <Share2 className="size-4" aria-hidden />}
      {copied ? "Copied" : "Share"}
    </button>
  )
}
