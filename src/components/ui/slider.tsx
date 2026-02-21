import { Slider as KSlider } from "@kobalte/core/slider";
import { splitProps, type ComponentProps } from "solid-js";

type SliderProps = ComponentProps<typeof KSlider> & {
  label?: string;
  showValueLabel?: boolean;
};

export const Slider = (props: SliderProps) => {
  const [local, others] = splitProps(props, [
    "class",
    "label",
    "showValueLabel",
  ]);

  return (
    <KSlider class={`grid gap-2.5 ${local.class ?? ""}`} {...others}>
      <div class="flex items-center justify-between gap-3">
        <KSlider.Label class="text-xs font-semibold tracking-[0.08em] text-muted uppercase">
          {local.label ?? "Value"}
        </KSlider.Label>
        {(local.showValueLabel ?? true) ? (
          <KSlider.ValueLabel class="px-2.5 py-1 text-right text-xs font-semibold tabular-nums text-muted" />
        ) : null}
      </div>

      <KSlider.Track class="relative h-2.5 rounded-full border border-border/70 bg-surface/55">
        <KSlider.Fill class="absolute h-full rounded-full bg-linear-to-r from-primary/75 to-primary shadow-[0_0_0_1px_rgba(99,102,241,0.25)]" />
        <KSlider.Thumb class="block top-1/2 h-5 w-5 -translate-y-1/2 rounded-full border-2 border-muted bg-white shadow-[0_10px_22px_-12px_rgba(2,6,23,0.85)] transition-transform duration-150 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-primary/25 active:scale-95">
          <KSlider.Input />
        </KSlider.Thumb>
      </KSlider.Track>
    </KSlider>
  );
};
