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
          <KSlider.ValueLabel class="rounded-md border border-border/70 bg-white/[0.03] px-2.5 py-1 text-right text-xs font-semibold tabular-nums text-white/85 shadow-[inset_0_1px_0_rgba(255,255,255,0.06)]" />
        ) : null}
      </div>

      <KSlider.Track class="relative h-3 rounded-full border border-border/80 bg-linear-to-r from-surface/95 to-surface/70 shadow-[inset_0_1px_0_rgba(255,255,255,0.05),inset_0_-1px_0_rgba(2,6,23,0.45)]">
        <KSlider.Fill class="absolute h-full rounded-full bg-linear-to-r from-[#7b84ff] via-primary to-primaryHover shadow-[0_0_0_1px_rgba(129,140,248,0.35),0_6px_20px_-10px_rgba(99,102,241,0.75)]" />
        <KSlider.Thumb class="block top-1/2 h-5.5 w-5.5 -translate-y-1/2 rounded-full border border-white/60 bg-linear-to-b from-white via-white to-[#dbe3ff] shadow-[0_12px_24px_-14px_rgba(2,6,23,0.95),0_0_0_1px_rgba(15,23,42,0.45)] transition-all duration-150 hover:scale-105 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-primary/30 active:scale-[0.98]">
          <KSlider.Input />
        </KSlider.Thumb>
      </KSlider.Track>
    </KSlider>
  );
};
