"use client"

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react"
import { Check, Copy, Info, TriangleAlert, X } from "lucide-react"
import { cn } from "@/lib/utils"

type ToastKind = "success" | "error" | "info" | "copy"

interface Toast {
  id: string
  kind: ToastKind
  message: string
  visible: boolean
}

interface ToastContextValue {
  toast: (kind: ToastKind, message: string) => void
}

const ToastContext = createContext<ToastContextValue | null>(null)

const ICONS: Record<ToastKind, React.ComponentType<{ className?: string }>> = {
  success: Check,
  error: TriangleAlert,
  info: Info,
  copy: Copy,
}

const AUTO_DISMISS_MS = 3200

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([])
  const timers = useRef<Map<string, ReturnType<typeof setTimeout>>>(new Map())

  const dismiss = useCallback((id: string) => {
    setToasts((prev) =>
      prev.map((t) => (t.id === id ? { ...t, visible: false } : t)),
    )
    const timer = timers.current.get(id)
    if (timer) clearTimeout(timer)
    timers.current.delete(id)
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id))
    }, 300)
  }, [])

  const toast = useCallback(
    (kind: ToastKind, message: string) => {
      const id = `${kind}-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`
      setToasts((prev) => [...prev.slice(-3), { id, kind, message, visible: true }])
      const timer = setTimeout(() => dismiss(id), AUTO_DISMISS_MS)
      timers.current.set(id, timer)
    },
    [dismiss],
  )

  useEffect(() => {
    const timersToClear = timers.current
    return () => {
      for (const timer of timersToClear.values()) clearTimeout(timer)
    }
  }, [])

  return (
    <ToastContext.Provider value={{ toast }}>
      {children}
      <div
        aria-live="polite"
        aria-label="Notifications"
        className="pointer-events-none fixed inset-x-0 bottom-4 z-[80] flex flex-col items-center gap-2 px-4 sm:bottom-6"
      >
        {toasts.map((t) => {
          const Icon = ICONS[t.kind]
          return (
            <div
              key={t.id}
              role="status"
              data-kind={t.kind}
              className={cn(
                "pointer-events-auto flex w-full max-w-sm items-center gap-3 rounded-md border border-border bg-background px-4 py-3 shadow-xl shadow-obsidian/10 transition-all duration-300",
                t.visible ? "translate-y-0 opacity-100" : "translate-y-2 opacity-0",
              )}
            >
              <span
                className={cn(
                  "flex size-7 shrink-0 items-center justify-center rounded-full",
                  t.kind === "success" && "bg-primary/15 text-primary",
                  t.kind === "error" && "bg-destructive/10 text-destructive",
                  t.kind === "info" && "bg-secondary text-foreground",
                  t.kind === "copy" && "bg-secondary text-foreground",
                )}
              >
                <Icon className="size-3.5" />
              </span>
              <p className="flex-1 text-sm text-foreground">{t.message}</p>
              <button
                onClick={() => dismiss(t.id)}
                aria-label="Dismiss notification"
                className="flex size-7 shrink-0 items-center justify-center rounded-full text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
              >
                <X className="size-3.5" />
              </button>
            </div>
          )
        })}
      </div>
    </ToastContext.Provider>
  )
}

export function useToast(): ToastContextValue {
  const ctx = useContext(ToastContext)
  if (!ctx) throw new Error("useToast must be used within ToastProvider")
  return ctx
}
