import { mergeProps } from "@base-ui/react/merge-props"
import { useRender } from "@base-ui/react/use-render"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const badgeVariants = cva(
  "group/badge inline-flex h-5 w-fit shrink-0 items-center justify-center gap-1.5 rounded-md border px-1.5 py-0.5 font-mono text-[10px] uppercase tracking-wider font-normal whitespace-nowrap transition-colors duration-150 [&>svg]:pointer-events-none [&>svg]:size-3",
  {
    variants: {
      variant: {
        default: "border-border bg-bg-elevated text-fg-muted",
        outline: "border-border bg-transparent text-fg-muted",
        solid: "border-fg bg-fg text-bg",
        success: "border-success/30 bg-success/10 text-success",
        destructive: "border-danger/30 bg-danger/10 text-danger",
        ghost: "border-transparent bg-transparent text-fg-muted",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

function Badge({
  className,
  variant = "default",
  render,
  ...props
}: useRender.ComponentProps<"span"> & VariantProps<typeof badgeVariants>) {
  return useRender({
    defaultTagName: "span",
    props: mergeProps<"span">(
      {
        className: cn(badgeVariants({ variant }), className),
      },
      props
    ),
    render,
    state: {
      slot: "badge",
      variant,
    },
  })
}

export { Badge, badgeVariants }
