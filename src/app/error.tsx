"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  const router = useRouter()

  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <div className="container-lux flex min-h-[60vh] items-center py-16">
      <div className="mx-auto max-w-md rounded-sm border border-border bg-pearl px-6 py-16 text-center">
        <p className="font-display text-6xl font-light text-primary">500</p>
        <h1 className="mt-4 font-display text-2xl font-medium">Something slipped at the bench</h1>
        <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
          An unexpected error occurred while showing this page. Please try again — or call the
          showroom and we will help directly.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Button onClick={reset}>Try Again</Button>
          <Button variant="outline" onClick={() => router.push("/")}>
            Back to Home
          </Button>
        </div>
      </div>
    </div>
  )
}
