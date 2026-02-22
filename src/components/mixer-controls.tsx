import { Pause, Play } from "lucide-solid";

import { usePlayer } from "~/audio/player-provider";
import { Button } from "~/components/ui/button";
import { Card } from "~/components/ui/card";
import { Slider } from "~/components/ui/slider";

export const MixerControls = () => {
  const {
    hasPausedTracks,
    isTrackPlaying,
    masterVolume,
    handleMasterVolumeChange,
    pauseCurrentTracks,
    resumePausedTracks,
  } = usePlayer();

  const activeCount = () => isTrackPlaying().filter(Boolean).length;
  const transportLabel = () => (hasPausedTracks() ? "Resume paused" : "Pause all");
  const handleTransport = () => {
    if (hasPausedTracks()) {
      resumePausedTracks();
      return;
    }
    pauseCurrentTracks();
  };

  return (
    <Card
      as="section"
      tone="elevated"
      class="fixed inset-x-4 bottom-4 z-40 mx-auto w-auto max-w-4xl border-primary/25 bg-linear-to-r from-surface/92 via-surface/92 to-surface/88 p-3 shadow-[0_24px_56px_-36px_rgba(2,6,23,0.95)]"
    >
      <div class="grid gap-2">
        <div class="flex items-center justify-between gap-3">
          <div class="flex min-w-0 items-center gap-2">
            <span class="text-xs font-semibold tracking-[0.08em] text-muted uppercase">
              Mixer
            </span>
            <span class="truncate text-xs text-muted">{activeCount()} active</span>
          </div>
        <Button
          size="sm"
          variant="ghost"
          onClick={handleTransport}
          disabled={activeCount() === 0 && !hasPausedTracks()}
          class="h-8 px-3 text-xs"
        >
          {hasPausedTracks() ? <Play size={13} /> : <Pause size={13} />}
          {transportLabel()}
        </Button>
        </div>

        <Slider
          value={[masterVolume()]}
          minValue={0}
          maxValue={100}
          step={1}
          label="Master"
          showValueLabel={false}
          onChange={handleMasterVolumeChange}
          class="gap-2"
        />
      </div>
    </Card>
  );
};
