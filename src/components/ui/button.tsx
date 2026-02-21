import { Button as KButton } from "@kobalte/core/button";
import { splitProps, type ComponentProps } from "solid-js";

type ButtonProps = ComponentProps<typeof KButton> & {
  variant?: "primary" | "ghost";
  size?: "sm" | "md" | "lg";
};

export const Button = (props: ButtonProps) => {
  const [local, others] = splitProps(props, ["class", "variant", "size"]);

  const base =
    "inline-flex items-center justify-center gap-2 rounded-xl border font-semibold tracking-[0.01em] transition-all duration-220 select-none disabled:cursor-not-allowed disabled:opacity-45 focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-primary/35 active:translate-y-[1px]";

  const sizes = {
    sm: "h-9 px-3.5 text-sm",
    md: "h-11 px-4.5 text-[0.94rem]",
    lg: "h-12 px-5 text-base",
  };

  const variants = {
    primary:
      "border-primary/65 bg-linear-to-b from-[#7b84ff] via-primary to-primaryHover text-white shadow-[0_14px_36px_-20px_rgba(79,70,229,0.95)] hover:-translate-y-[1px] hover:brightness-108 hover:shadow-[0_20px_45px_-24px_rgba(79,70,229,0.95)] active:brightness-100 active:shadow-[0_10px_24px_-20px_rgba(79,70,229,0.95)]",
    ghost:
      "border-border/85 bg-white/[0.03] text-white/88 shadow-[inset_0_1px_0_rgba(255,255,255,0.06)] hover:-translate-y-[1px] hover:border-primary/45 hover:bg-primary/12 hover:text-white active:bg-primary/16",
  };

  return (
    <KButton
      class={`${base} ${sizes[local.size ?? "md"]} ${variants[local.variant ?? "primary"]} ${local.class ?? ""}`}
      {...others}
    />
  );
};
