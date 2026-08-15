"use client"

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react"
import { useToast } from "@/components/providers/toast-provider"

interface WishlistContextValue {
  ids: string[]
  isWishlisted: (id: string) => boolean
  toggle: (id: string, name?: string) => void
  add: (id: string) => void
  remove: (id: string) => void
  clear: () => void
  count: number
}

const WishlistContext = createContext<WishlistContextValue | null>(null)

const STORAGE_KEY = "opj-wishlist"

function readStoredIds(): string[] {
  if (typeof window === "undefined") return []
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY)
    if (!raw) return []
    const parsed = JSON.parse(raw)
    if (!Array.isArray(parsed)) return []
    return parsed.filter((v): v is string => typeof v === "string")
  } catch {
    return []
  }
}

export function WishlistProvider({ children }: { children: React.ReactNode }) {
  const { toast } = useToast()
  const [ids, setIds] = useState<string[]>([])

  useEffect(() => {
    const id = requestAnimationFrame(() => setIds(readStoredIds()))
    return () => cancelAnimationFrame(id)
  }, [])

  const isWishlisted = useCallback((id: string) => ids.includes(id), [ids])

  const add = useCallback(
    (id: string) => {
      setIds((prev) => {
        if (prev.includes(id)) return prev
        const next = [id, ...prev]
        try {
          window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next))
        } catch {
          /* noop */
        }
        return next
      })
    },
    [],
  )

  const remove = useCallback((id: string) => {
    setIds((prev) => {
      const next = prev.filter((v) => v !== id)
      try {
        window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next))
      } catch {
        /* noop */
      }
      return next
    })
  }, [])

  const toggle = useCallback(
    (id: string) => {
      setIds((prev) => {
        const exists = prev.includes(id)
        const next = exists ? prev.filter((v) => v !== id) : [id, ...prev]
        try {
          window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next))
        } catch {
          /* noop */
        }
        toast(
          exists ? "info" : "success",
          exists ? "Removed from wishlist" : "Added to wishlist",
        )
        return next
      })
    },
    [toast],
  )

  const clear = useCallback(() => {
    setIds([])
    try {
      window.localStorage.removeItem(STORAGE_KEY)
    } catch {
      /* noop */
    }
  }, [])

  return (
    <WishlistContext.Provider
      value={{
        ids,
        isWishlisted,
        toggle,
        add,
        remove,
        clear,
        count: ids.length,
      }}
    >
      {children}
    </WishlistContext.Provider>
  )
}

export function useWishlist(): WishlistContextValue {
  const ctx = useContext(WishlistContext)
  if (!ctx) throw new Error("useWishlist must be used within WishlistProvider")
  return ctx
}
