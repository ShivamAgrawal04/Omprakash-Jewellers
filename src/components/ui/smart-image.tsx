"use client"

import Image from "next/image"
import { useState } from "react"
import { cn } from "@/lib/utils"

const PLACEHOLDER = "/images/placeholder.svg"

interface SmartImageProps {
  src: string
  alt: string
  fill?: boolean
  width?: number
  height?: number
  sizes?: string
  priority?: boolean
  objectFit?: "cover" | "contain"
  className?: string
  fallbackClassName?: string
}

export function SmartImage({
  src,
  alt,
  fill,
  width,
  height,
  sizes,
  priority,
  objectFit = "cover",
  className,
  fallbackClassName,
}: SmartImageProps) {
  const [currentSrc, setCurrentSrc] = useState(src)
  const [errored, setErrored] = useState(false)

  const image = (
    <Image
      src={currentSrc}
      alt={alt}
      fill={fill}
      width={fill ? undefined : width}
      height={fill ? undefined : height}
      sizes={sizes}
      priority={priority}
      onError={() => {
        if (!errored) {
          setErrored(true)
          setCurrentSrc(PLACEHOLDER)
        }
      }}
      className={cn(
        objectFit === "contain" ? "object-contain" : "object-cover",
        className,
        errored && fallbackClassName,
      )}
    />
  )

  if (fill) {
    return (
      <span
        className="block size-full"
        style={{ position: "relative", display: "block", width: "100%", height: "100%" }}
      >
        {image}
      </span>
    )
  }

  return image
}
