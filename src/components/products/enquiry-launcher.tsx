"use client"

import { useState } from "react"
import { MessageCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { EnquiryDialog } from "@/components/products/enquiry-dialog"

interface EnquiryLauncherProps {
  productName: string
  productSlug: string
  sku: string
}

export function EnquiryLauncher({ productName, productSlug, sku }: EnquiryLauncherProps) {
  const [open, setOpen] = useState(false)

  return (
    <>
      <Button onClick={() => setOpen(true)} aria-haspopup="dialog">
        <MessageCircle className="size-4" aria-hidden />
        Enquire Now
      </Button>
      <EnquiryDialog
        open={open}
        onOpenChange={setOpen}
        productName={productName}
        productSlug={productSlug}
        sku={sku}
      />
    </>
  )
}
