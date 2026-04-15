import { Button as ButtonPrimitive } from "@base-ui/react/button";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "group/button inline-flex shrink-0 items-center justify-center gap-2 rounded-md border border-transparent text-sm font-medium whitespace-nowrap transition-colors duration-150 outline-none select-none focus-visible:ring-2 focus-visible:ring-border-hover focus-visible:ring-offset-2 focus-visible:ring-offset-bg disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
  {
    variants: {
      variant: {
        // Primary: white button on dark bg — the Vercel signature
        default:
          "bg-fg text-bg hover:bg-fg/90 active:bg-fg/80",
        // Outline: hairline border, transparent
        outline:
          "border-border bg-transparent text-fg hover:bg-bg-elevated hover:border-border-hover",
        // Secondary: elevated surface
        secondary:
          "bg-bg-elevated text-fg border-border hover:bg-bg-hover hover:border-border-hover",
        // Ghost: invisible until hover
        ghost:
          "bg-transparent text-fg-muted hover:bg-bg-elevated hover:text-fg",
        // Destructive
        destructive:
          "bg-transparent text-danger border-border hover:bg-danger/10 hover:border-danger/40",
        // Link: text only
        link: "text-fg underline-offset-4 hover:underline px-0 h-auto",
      },
      size: {
        default: "h-9 px-4",
        sm: "h-8 px-3 text-xs",
        xs: "h-7 px-2.5 text-xs",
        lg: "h-11 px-6",
        icon: "size-9",
        "icon-sm": "size-8",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

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
  );
}

export { Button, buttonVariants };
