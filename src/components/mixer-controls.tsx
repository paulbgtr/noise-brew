import { Play, Square, Volume2, VolumeX } from "lucide-solid";

import { Button } from "~/components/ui/button";
import { Card } from "~/components/ui/card";
import { Slider } from "~/components/ui/slider";

type Props = {
  trackCount: number;
  masterVolume: number;
  isMuted: boolean;
  onPlayAll: () => void;
  onStopAll: () => void;
  onToggleMute: () => void;
  onMasterVolumeChange: (value: number[]) => void;
};

export const MixerControls = (props: Props) => {
  return (
    <Card as="section" tone="elevated">
      <div class="mb-4 flex flex-wrap items-center justify-between gap-3">
        <div class="flex items-center gap-2">
          <span class="text-sm font-semibold text-white/95">Mixer</span>
          <span class="text-xs text-muted">{props.trackCount} tracks</span>
        </div>
        <div class="flex items-center gap-2">
          <Button size="sm" variant="ghost" onClick={props.onPlayAll}>
            <Play size={13} />
            Play all
          </Button>
          <Button size="sm" variant="ghost" onClick={props.onStopAll}>
            <Square size={13} />
            Stop all
          </Button>
          <Button size="sm" variant="ghost" onClick={props.onToggleMute}>
            {props.isMuted ? <Volume2 size={13} /> : <VolumeX size={13} />}
            {props.isMuted ? "Unmute" : "Mute"}
          </Button>
        </div>
      </div>

      <Slider
        value={[props.masterVolume]}
        minValue={0}
        maxValue={100}
        step={1}
        label="Master volume"
        onChange={props.onMasterVolumeChange}
      />
    </Card>
  );
};
