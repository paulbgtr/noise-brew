import { Button as KButton } from "@kobalte/core/button";
import { splitProps, type ComponentProps } from "solid-js";

type ButtonProps = ComponentProps<typeof KButton> & {
  variant?: "primary" | "ghost";
  size?: "sm" | "md" | "lg";
};

export const Button = (props: ButtonProps) => {
  const [local, others] = splitProps(props, ["class", "variant", "size"]);

  const base =
    "inline-flex items-center justify-center gap-2 rounded-xl border border-transparent font-semibold tracking-[0.01em] transition-all duration-200 select-none disabled:cursor-not-allowed disabled:opacity-45 focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-primary/35";

  const sizes = {
    sm: "h-9 px-3.5 text-sm",
    md: "h-11 px-4.5 text-[0.95rem]",
    lg: "h-12 px-5 text-base",
  };

  const variants = {
    primary:
      "bg-primary text-white shadow-[0_10px_30px_-14px_rgba(99,102,241,0.9)] hover:bg-primaryHover active:translate-y-[1px] active:shadow-[0_6px_16px_-12px_rgba(79,70,229,0.95)]",
    ghost:
      "border-border/70 bg-surface/30 text-primary hover:border-primary/40 hover:bg-primary/10 active:bg-primary/15",
  };

  return (
    <KButton
      class={`${base} ${sizes[local.size ?? "md"]} ${variants[local.variant ?? "primary"]} ${local.class ?? ""}`}
      {...others}
    />
  );
};
