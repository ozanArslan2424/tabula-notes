import { cn } from "@/lib/utils";
import { VariantProps, cva } from "class-variance-authority";
import Link from "next/link";
import { forwardRef } from "react";

const linkButtonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground shadow hover:bg-primary/90",
        destructive: "bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90",
        custom_submit:
          "dark:text-secondary-foreground shadow dark:hover:bg-success/90 hover:bg-success/90 hover:text-success-foreground dark:border dark:border-success/70",
        custom_search:
          "dark:text-secondary-foreground shadow dark:hover:bg-sky-500/90 hover:bg-sky-500/90 hover:text-primary-foreground",
        custom_action:
          "dark:text-secondary-foreground shadow dark:hover:bg-action/90 hover:bg-action/90 hover:text-primary-foreground",
        custom_destructive:
          "dark:text-secondary-foreground shadow dark:hover:bg-destructive/90 hover:bg-destructive/90 hover:text-destructive-foreground text-destructive",
        outline: "border border-input bg-secondary shadow-sm hover:bg-accent hover:text-accent-foreground",
        secondary: "bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
        unstyled:
          "bg-transparent text-primary shadow-none hover:shadow-xl border border-transparent hover:border-primary/30 transition-all duration-75",
      },
      size: {
        default: "h-9 px-4 py-2",
        sm: "h-8 px-3 text-xs",
        lg: "h-10 px-8",
        icon: "h-9 w-9 aspect-square",
        circle: "h-10 w-10 rounded-full",
        sm_icon: "h-7 w-7 aspect-square border-none",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

export interface LinkButtonProps
  extends React.AnchorHTMLAttributes<HTMLAnchorElement>,
    VariantProps<typeof linkButtonVariants> {
  href: string;
  className?: string;
}

const LinkButton = forwardRef<HTMLAnchorElement, LinkButtonProps>(
  ({ className, variant, size, href, children, ...props }, ref) => {
    return (
      <Link href={href} className={cn(linkButtonVariants({ variant, size, className }))} ref={ref} {...props}>
        {children}
      </Link>
    );
  },
);

LinkButton.displayName = "LinkButton";

export { LinkButton, linkButtonVariants };
