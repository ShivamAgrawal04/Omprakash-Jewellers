import { Drawer as DrawerPrimitive } from "@base-ui/react/drawer"
import { X } from "lucide-react"
import { cn } from "@/lib/utils"

function Sheet(props: DrawerPrimitive.Root.Props) {
  return <DrawerPrimitive.Root {...props} />
}

const SheetTrigger = DrawerPrimitive.Trigger
const SheetClose = DrawerPrimitive.Close

function SheetPortal(props: DrawerPrimitive.Portal.Props) {
  return <DrawerPrimitive.Portal {...props} />
}

function SheetOverlay({ className, ...props }: DrawerPrimitive.Backdrop.Props) {
  return (
    <DrawerPrimitive.Backdrop
      className={cn(
        "fixed inset-0 z-50 bg-obsidian/50 backdrop-blur-[2px] data-[ending-style]:fade-out data-[starting-style]:fade-in",
        className
      )}
      {...props}
    />
  )
}

function SheetContent({
  className,
  children,
  showCloseButton = true,
  ...props
}: DrawerPrimitive.Content.Props & { showCloseButton?: boolean }) {
  return (
    <DrawerPrimitive.Content
      data-slot="sheet-content"
      className={cn(
        "fixed inset-x-0 bottom-0 z-50 mx-auto flex max-h-[88dvh] w-full max-w-2xl flex-col rounded-t-xl border border-border border-b-0 bg-background p-6 shadow-2xl shadow-obsidian/15 outline-none data-[ending-style]:slide-out-to-bottom data-[starting-style]:slide-in-from-bottom sm:p-8",
        className
      )}
      {...props}
    >
      {children}
      {showCloseButton ? (
        <DrawerPrimitive.Close
          aria-label="Close"
          className="absolute right-4 top-4 flex size-9 items-center justify-center rounded-full text-muted-foreground transition-colors hover:bg-muted hover:text-foreground focus-visible:outline-2 focus-visible:outline-ring"
        >
          <X className="size-4" />
        </DrawerPrimitive.Close>
      ) : null}
    </DrawerPrimitive.Content>
  )
}

function SheetTitle({ className, ...props }: DrawerPrimitive.Title.Props) {
  return (
    <DrawerPrimitive.Title
      className={cn("font-display text-xl font-medium tracking-tight text-foreground", className)}
      {...props}
    />
  )
}

function SheetDescription({ className, ...props }: DrawerPrimitive.Description.Props) {
  return (
    <DrawerPrimitive.Description
      className={cn("text-sm leading-relaxed text-muted-foreground", className)}
      {...props}
    />
  )
}

function SheetViewport(props: DrawerPrimitive.Viewport.Props) {
  return <DrawerPrimitive.Viewport {...props} />
}

function SheetHeader({ className, ...props }: React.ComponentProps<"div">) {
  return <div className={cn("flex flex-col gap-1.5 text-left", className)} {...props} />
}

export {
  Sheet,
  SheetPortal,
  SheetOverlay,
  SheetTrigger,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetViewport,
}
