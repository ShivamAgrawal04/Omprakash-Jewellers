import { Button as ButtonPrimitive } from "@base-ui/react/button"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "group/button inline-flex shrink-0 items-center justify-center gap-2 whitespace-nowrap rounded-md font-sans text-[0.7rem] font-semibold uppercase tracking-[0.18em] transition-all duration-300 ease-out outline-none select-none focus-visible:ring-2 focus-visible:ring-ring/60 focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:pointer-events-none disabled:opacity-50 active:not-aria-[haspopup]:translate-y-px [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
  {
    variants: {
      variant: {
        default:
          "bg-primary text-white shadow-[inset_0_0_0_1px_transparent] hover:bg-primary/90 dark:text-obsidian",
        outline:
          "border border-border bg-transparent text-foreground hover:border-primary/70 hover:text-primary",
        soft: "bg-secondary text-foreground hover:bg-primary/15",
        ghost: "text-foreground hover:bg-muted",
        dark: "bg-charcoal text-ivory hover:bg-charcoal/85 dark:bg-ivory dark:text-obsidian dark:hover:bg-ivory/90",
        link: "text-primary underline-offset-8 hover:underline",
      },
      size: {
        default: "h-11 px-6",
        sm: "h-9 px-4",
        lg: "h-12 px-8 text-[0.75rem]",
        icon: "size-10",
        "icon-sm": "size-9",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

function Button({
  className,
  variant = "default",
  size = "default",
  ...props
}: ButtonPrimitive.Props & VariantProps<typeof buttonVariants>) {
  return (
    <ButtonPrimitive
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  )
}

export { Button, buttonVariants }
