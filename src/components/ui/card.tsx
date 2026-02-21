import { Dynamic } from "solid-js/web";
import { splitProps, type ComponentProps } from "solid-js";

type CardProps = ComponentProps<"div"> & {
  as?: "div" | "section" | "article";
  tone?: "subtle" | "elevated";
};

export const Card = (props: CardProps) => {
  const [local, others] = splitProps(props, ["as", "tone", "class"]);

  const base =
    "rounded-2xl border border-border/80 p-4 shadow-[0_20px_40px_-28px_rgba(2,6,23,0.9)] backdrop-blur-sm";
  const tones = {
    subtle: "bg-white/[0.03]",
    elevated: "bg-white/[0.05]",
  };

  return (
    <Dynamic
      component={local.as ?? "div"}
      class={`${base} ${tones[local.tone ?? "subtle"]} ${local.class ?? ""}`}
      {...others}
    />
  );
};
