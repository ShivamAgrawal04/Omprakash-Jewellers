import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const badgeVariants = cva(
  "inline-flex items-center gap-1 rounded-full border px-2.5 py-0.5 font-sans text-[0.6rem] font-semibold uppercase tracking-[0.16em]",
  {
    variants: {
      variant: {
        default: "border-primary/40 bg-primary/10 text-primary",
        outline: "border-border text-muted-foreground",
        solid: "border-transparent bg-primary text-white dark:text-obsidian",
        dark: "border-transparent bg-charcoal text-ivory dark:bg-ivory dark:text-obsidian",
        destructive: "border-transparent bg-destructive/10 text-destructive",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

function Badge({
  className,
  variant,
  ...props
}: React.ComponentProps<"span"> & VariantProps<typeof badgeVariants>) {
  return (
    <span data-slot="badge" className={cn(badgeVariants({ variant }), className)} {...props} />
  )
}

export { Badge, badgeVariants }
