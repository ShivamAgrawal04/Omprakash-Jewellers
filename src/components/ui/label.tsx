import { Field } from "@base-ui/react/field"
import { cn } from "@/lib/utils"

function Label({ className, ...props }: React.ComponentProps<typeof Field.Label>) {
  return (
    <Field.Label
      className={cn(
        "mb-1.5 block font-sans text-xs font-semibold uppercase tracking-[0.14em] text-muted-foreground",
        className
      )}
      {...props}
    />
  )
}

export { Label }
