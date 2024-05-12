import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90",
        destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        custom_submit:
          "bg-secondary dark:text-secondary-foreground dark:hover:bg-success/90 hover:bg-success/90 hover:text-success-foreground",
        custom_search:
          "bg-secondary dark:text-secondary-foreground dark:hover:bg-sky-500/90 hover:bg-sky-500/90 hover:text-primary-foreground",
        custom_action:
          "bg-secondary dark:text-secondary-foreground dark:hover:bg-action/90 hover:bg-action/90 hover:text-primary-foreground",
        custom_destructive:
          "bg-secondary dark:text-secondary-foreground dark:hover:bg-destructive/90 hover:bg-destructive/90 hover:text-destructive-foreground text-destructive",
        outline: "border border-input hover:bg-accent hover:text-accent-foreground",
        secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
        unstyled:
          "bg-transparent text-primary hover border border-transparent hover:border-primary/30 transition-all duration-75",
      },
      size: {
        default: "h-9 px-4 py-2",
        sm: "h-7 px-3 text-xs",
        lg: "h-10 px-8",
        icon: "h-9 w-9 aspect-square",
        circle: "h-10 w-10 rounded-full",
        sm_icon: "h-7 w-7 aspect-square",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return <Comp className={cn(buttonVariants({ variant, size, className }))} ref={ref} {...props} />;
  },
);
Button.displayName = "Button";

export { Button, buttonVariants };
