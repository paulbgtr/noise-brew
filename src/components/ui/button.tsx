import { Button as KButton } from "@kobalte/core/button";

export const Button = (props: any) => {
  const base = "px-4 py-2 rounded-xl font-medium transition";

  const variants: Record<string, string> = {
    primary: "bg-primary text-white hover:bg-primaryHover",
    ghost: "bg-transparent text-primary hover:bg-primary/10",
  };

  return (
    <KButton
      class={`${base} ${variants[props.variant ?? "primary"]}`}
      {...props}
    />
  );
};
