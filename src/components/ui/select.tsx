"use client"

import { Children, isValidElement, useEffect, useId, useRef, useState } from "react"
import { ChevronDown } from "lucide-react"
import { cn } from "@/lib/utils"

type Option = { value: string; label: string }

function readOptions(children: React.ReactNode): Option[] {
  const list: Option[] = []
  Children.forEach(children, (child) => {
    if (!isValidElement(child)) return
    const props = child.props as { value?: string; children?: React.ReactNode }
    const label = String(props.children ?? "")
    list.push({ value: props.value ?? label, label })
  })
  return list
}

function Select({
  className,
  children,
  value,
  defaultValue,
  onChange,
  name,
  id,
  disabled,
  "aria-label": ariaLabel,
  "aria-invalid": ariaInvalid,
}: React.ComponentProps<"select">) {
  const options = readOptions(children)
  const fallback = String(defaultValue ?? options[0]?.value ?? "")
  const [open, setOpen] = useState(false)
  const [internal, setInternal] = useState(fallback)
  const selected = String(value ?? internal)
  const selectedLabel = options.find((o) => o.value === selected)?.label ?? selected
  const rootRef = useRef<HTMLDivElement>(null)
  const listId = useId()

  useEffect(() => {
    if (!open) return
    function onDoc(event: MouseEvent) {
      if (!rootRef.current?.contains(event.target as Node)) setOpen(false)
    }
    function onKey(event: KeyboardEvent) {
      if (event.key === "Escape") setOpen(false)
    }
    document.addEventListener("mousedown", onDoc)
    document.addEventListener("keydown", onKey)
    return () => {
      document.removeEventListener("mousedown", onDoc)
      document.removeEventListener("keydown", onKey)
    }
  }, [open])

  function choose(next: string) {
    setInternal(next)
    setOpen(false)
    onChange?.({
      target: { value: next, name: name ?? "" },
    } as React.ChangeEvent<HTMLSelectElement>)
  }

  return (
    <div ref={rootRef} className="relative">
      <input type="hidden" name={name} value={selected} />
      <button
        type="button"
        id={id}
        disabled={disabled}
        aria-label={ariaLabel}
        aria-invalid={ariaInvalid}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-controls={listId}
        className={cn(
          "flex h-11 w-full cursor-pointer items-center justify-between rounded-md border border-input bg-card px-3.5 pr-3 text-left text-sm text-foreground outline-none transition-colors focus-visible:border-primary/60 focus-visible:ring-2 focus-visible:ring-ring/40 disabled:cursor-not-allowed disabled:opacity-50",
          className,
        )}
        onClick={() => setOpen((v) => !v)}
      >
        <span className="truncate">{selectedLabel}</span>
        <ChevronDown
          aria-hidden
          className={cn("size-4 shrink-0 text-muted-foreground transition-transform", open && "rotate-180")}
        />
      </button>
      {open ? (
        <ul
          id={listId}
          role="listbox"
          className="absolute z-[80] mt-1 max-h-60 w-full overflow-auto rounded-md border border-border bg-white py-1 text-neutral-900 shadow-lg dark:border-white/15 dark:bg-neutral-900 dark:text-neutral-100"
        >
          {options.map((option) => (
            <li key={option.value} role="option" aria-selected={option.value === selected}>
              <button
                type="button"
                className={cn(
                  "flex w-full px-3.5 py-2.5 text-left text-sm text-neutral-900 hover:bg-neutral-100 dark:text-neutral-100 dark:hover:bg-neutral-800",
                  option.value === selected && "bg-neutral-100 text-amber-800 dark:bg-neutral-800 dark:text-amber-400",
                )}
                onClick={() => choose(option.value)}
              >
                {option.label}
              </button>
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  )
}

export { Select }
