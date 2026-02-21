import { Play, Square, Volume2, VolumeX } from "lucide-solid";

import { Button } from "~/components/ui/button";
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
    <section class="rounded-2xl border border-border/80 bg-white/[0.05] p-4 shadow-[0_20px_40px_-28px_rgba(2,6,23,0.9)] backdrop-blur-sm">
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
    </section>
  );
};
