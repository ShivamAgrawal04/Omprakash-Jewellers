import { SmartImage } from "@/components/ui/smart-image"
import { Breadcrumb, type Crumb } from "@/components/ui/breadcrumb"
import { cn } from "@/lib/utils"

interface PageHeroProps {
  eyebrow?: string
  title: string
  description?: string
  image?: string
  imageAlt?: string
  crumbs?: Crumb[]
  compact?: boolean
  className?: string
}

export function PageHero({
  eyebrow,
  title,
  description,
  image,
  imageAlt,
  crumbs,
  compact,
  className,
}: PageHeroProps) {
  return (
    <section
      className={cn(
        "relative overflow-hidden border-b border-border bg-background",
        compact ? "pb-12 pt-28 md:pb-16 md:pt-36" : "pb-16 pt-28 md:pb-24 md:pt-44",
        className,
      )}
    >
      {image ? (
        <div className="absolute inset-0" aria-hidden>
          <SmartImage src={image} alt={imageAlt ?? ""} fill priority sizes="100vw" />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/45 to-background/20" />
        </div>
      ) : null}

      <div className="container-lux relative">
        {crumbs ? <Breadcrumb items={crumbs} className="mb-8" /> : null}
        {eyebrow ? (
          <p className="eyebrow mb-4 flex items-center gap-3 text-primary">
            <span className="h-px w-8 bg-primary/60" aria-hidden />
            {eyebrow}
          </p>
        ) : null}
        <h1 className="max-w-3xl font-display text-4xl font-medium tracking-tight text-balance text-foreground sm:text-5xl lg:text-6xl">
          {title}
        </h1>
        {description ? (
          <p className="mt-5 max-w-2xl text-base leading-relaxed text-pretty text-muted-foreground sm:text-lg">
            {description}
          </p>
        ) : null}
      </div>
    </section>
  )
}
