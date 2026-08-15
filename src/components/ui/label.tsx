import { cn } from "@/lib/utils"

function Label({ className, ...props }: React.ComponentProps<"label">) {
  return (
    <label
      className={cn(
        "mb-1.5 block font-sans text-xs font-semibold uppercase tracking-[0.14em] text-muted-foreground",
        className
      )}
      {...props}
    />
  )
}

export { Label }
