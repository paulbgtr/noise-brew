import { For, Show } from "solid-js";

import { Card } from "~/components/ui/card";

type Props = {
  activeTrackNames: string[];
  masterVolume: number;
  isMuted: boolean;
};

export const NowPlayingIndicator = (props: Props) => {
  const isActive = () => props.activeTrackNames.length > 0;

  return (
    <Card
      as="section"
      tone="elevated"
      class="sticky top-3 z-10 border-primary/35 bg-linear-to-r from-primary/20 via-surface/80 to-surface/95"
    >
      <div class="flex flex-wrap items-center justify-between gap-3">
        <div class="flex items-center gap-3">
          <div class="flex items-end gap-1" aria-hidden="true">
            <span
              class={`h-2 w-1.5 rounded-full bg-primary/90 ${
                isActive() ? "animate-pulse" : "opacity-40"
              }`}
            />
            <span
              class={`h-4 w-1.5 rounded-full bg-primary ${
                isActive()
                  ? "animate-pulse [animation-delay:120ms]"
                  : "opacity-50"
              }`}
            />
            <span
              class={`h-3 w-1.5 rounded-full bg-primary/80 ${
                isActive()
                  ? "animate-pulse [animation-delay:240ms]"
                  : "opacity-40"
              }`}
            />
          </div>

          <div class="grid gap-0.5">
            <span class="text-xs font-semibold tracking-[0.08em] text-primary/90 uppercase">
              Now Playing
            </span>
            <Show
              when={isActive()}
              fallback={
                <span class="text-sm text-muted">
                  Nothing is playing right now
                </span>
              }
            >
              <span class="text-sm font-medium text-white/95">
                {props.activeTrackNames.length} track
                {props.activeTrackNames.length === 1 ? "" : "s"} active
              </span>
            </Show>
          </div>
        </div>

        <div class="flex items-center gap-2 text-xs text-muted">
          <span>Master {props.masterVolume}%</span>
          <span class={props.isMuted ? "text-primary/90" : ""}>
            {props.isMuted ? "Muted" : "Live"}
          </span>
        </div>
      </div>

      <Show when={isActive()}>
        <div class="mt-3 flex flex-wrap gap-2">
          <For each={props.activeTrackNames}>
            {(name) => (
              <span class="rounded-full border border-primary/35 bg-primary/12 px-2.5 py-1 text-xs font-medium text-white/90">
                {name}
              </span>
            )}
          </For>
        </div>
      </Show>
    </Card>
  );
};
