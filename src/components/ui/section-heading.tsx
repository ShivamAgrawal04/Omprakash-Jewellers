import { cn } from "@/lib/utils"
import { Reveal } from "@/components/ui/reveal"

interface SectionHeadingProps {
  eyebrow?: string
  title: string
  description?: string
  align?: "left" | "center"
  className?: string
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  className,
}: SectionHeadingProps) {
  return (
    <Reveal
      className={cn(
        "flex flex-col gap-3",
        align === "center" && "items-center text-center",
        className,
      )}
    >
      {eyebrow ? (
        <span className="eyebrow flex items-center gap-3 text-primary">
          <span className="hidden h-px w-8 bg-primary/60 sm:block" aria-hidden />
          {eyebrow}
        </span>
      ) : null}
      <h2 className="max-w-3xl font-display text-3xl font-medium tracking-tight text-balance text-foreground sm:text-4xl lg:text-5xl">
        {title}
      </h2>
      {description ? (
        <p className="max-w-2xl text-base leading-relaxed text-pretty text-muted-foreground sm:text-lg">
          {description}
        </p>
      ) : null}
    </Reveal>
  )
}
