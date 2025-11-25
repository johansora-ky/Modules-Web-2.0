import { forwardRef, type ButtonHTMLAttributes } from "react";
import { Slot } from "@radix-ui/react-slot";
import "./button.css";

type ButtonVariant =
  | "default"
  | "destructive"
  | "outline"
  | "secondary"
  | "ghost"
  | "link";

type ButtonSize = "default" | "sm" | "lg" | "icon" | "icon-sm" | "icon-lg";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  asChild?: boolean;
  variant?: ButtonVariant;
  size?: ButtonSize;
};

const variantClassNames: Record<ButtonVariant, string> = {
  default: "button_variant_default_banner_remesas",
  destructive: "button_variant_destructive_banner_remesas",
  outline: "button_variant_outline_banner_remesas",
  secondary: "button_variant_secondary_banner_remesas",
  ghost: "button_variant_ghost_banner_remesas",
  link: "button_variant_link_banner_remesas",
};

const sizeClassNames: Record<ButtonSize, string> = {
  default: "button_size_default_banner_remesas",
  sm: "button_size_sm_banner_remesas",
  lg: "button_size_lg_banner_remesas",
  icon: "button_size_icon_banner_remesas",
  "icon-sm": "button_size_icon_sm_banner_remesas",
  "icon-lg": "button_size_icon_lg_banner_remesas",
};

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className = "",
      variant = "default",
      size = "default",
      asChild = false,
      ...props
    },
    ref,
  ) => {
    const Component = asChild ? Slot : "button";
    const computedClassName = [
      "button_base_banner_remesas",
      variantClassNames[variant],
      sizeClassNames[size],
      className,
    ]
      .filter(Boolean)
      .join(" ")
      .trim();

    return (
      <Component
        ref={ref}
        data-slot="button"
        className={computedClassName}
        {...props}
      />
    );
  },
);

Button.displayName = "Button";

export { Button };
