import { Play, Square, Volume2, VolumeX } from "lucide-solid";

import { usePlayer } from "~/audio/player-provider";
import { Button } from "~/components/ui/button";
import { Card } from "~/components/ui/card";
import { Slider } from "~/components/ui/slider";
import { SOUND_CATALOG } from "~/data/sound-catalog";

export const MixerControls = () => {
  const {
    masterVolume,
    isMuted,
    playAll,
    stopAll,
    handleMasterVolumeChange,
    toggleMute,
  } = usePlayer();

  const trackCount = SOUND_CATALOG.length;

  return (
    <Card as="section" tone="elevated">
      <div class="mb-4 flex flex-wrap items-center justify-between gap-3">
        <div class="flex items-center gap-2">
          <span class="text-sm font-semibold text-white/95">Mixer</span>
          <span class="text-xs text-muted">{trackCount} tracks</span>
        </div>
        <div class="flex items-center gap-2">
          <Button size="sm" variant="ghost" onClick={playAll}>
            <Play size={13} />
            Play all
          </Button>
          <Button size="sm" variant="ghost" onClick={stopAll}>
            <Square size={13} />
            Stop all
          </Button>
          <Button size="sm" variant="ghost" onClick={toggleMute}>
            {isMuted() ? <Volume2 size={13} /> : <VolumeX size={13} />}
            {isMuted() ? "Unmute" : "Mute"}
          </Button>
        </div>
      </div>

      <Slider
        value={[masterVolume()]}
        minValue={0}
        maxValue={100}
        step={1}
        label="Master volume"
        onChange={handleMasterVolumeChange}
      />
    </Card>
  );
};
