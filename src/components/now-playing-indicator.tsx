import { For, Show } from "solid-js";

import { usePlayer } from "~/audio/player-provider";
import { Card } from "~/components/ui/card";

export const NowPlayingIndicator = () => {
  const { activeTrackNames, masterVolume, isMuted } = usePlayer();

  const isVisible = () => activeTrackNames().length >= 1;
  const visibleNames = () => activeTrackNames().slice(0, 3);
  const hiddenCount = () => Math.max(0, activeTrackNames().length - 3);

  return (
    <Show when={isVisible()}>
      <Card
        as="section"
        tone="elevated"
        class="fixed bottom-4 right-4 z-30 w-[calc(100%-2rem)] max-w-84 border-primary/35 bg-linear-to-br from-primary/22 via-surface/90 to-surface/95 shadow-[0_30px_60px_-35px_rgba(79,70,229,0.95)] sm:bottom-6 sm:right-6"
      >
        <div class="flex flex-wrap items-center justify-between gap-3">
          <div class="flex items-center gap-3">
            <div class="flex items-end gap-1" aria-hidden="true">
              <span class="h-2 w-1.5 animate-pulse rounded-full bg-primary/90" />
              <span class="h-4 w-1.5 animate-pulse rounded-full bg-primary [animation-delay:120ms]" />
              <span class="h-3 w-1.5 animate-pulse rounded-full bg-primary/80 [animation-delay:240ms]" />
            </div>

            <div class="grid gap-0.5">
              <span class="text-xs font-semibold tracking-[0.08em] text-primary/90 uppercase">
                Now Playing
              </span>
              <span class="text-sm font-medium text-white/95">
                {activeTrackNames().length} tracks active
              </span>
            </div>
          </div>

          <div class="flex items-center gap-2 text-xs text-muted">
            <span>Master {masterVolume()}%</span>
            <span class={isMuted() ? "text-primary/90" : ""}>
              {isMuted() ? "Muted" : "Live"}
            </span>
          </div>
        </div>

        <div class="mt-3 flex flex-wrap gap-2">
          <For each={visibleNames()}>
            {(name) => (
              <span class="rounded-full border border-primary/35 bg-primary/12 px-2.5 py-1 text-xs font-medium text-white/90">
                {name}
              </span>
            )}
          </For>
          <Show when={hiddenCount() > 0}>
            <span class="rounded-full border border-primary/35 bg-primary/10 px-2.5 py-1 text-xs font-medium text-primary/90">
              +{hiddenCount()} more
            </span>
          </Show>
        </div>

        <Show when={isMuted()}>
          <div class="mt-3 rounded-lg border border-primary/25 bg-primary/10 px-2.5 py-2 text-xs text-primary/90">
            Audio is muted. Tracks are still running.
          </div>
        </Show>
      </Card>
    </Show>
  );
};
