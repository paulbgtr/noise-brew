import { Pause, Play } from "lucide-solid";

import type { Sound } from "~/data/sound-catalog";
import { Button } from "~/components/ui/button";
import { Slider } from "~/components/ui/slider";

type Props = {
  sound: Sound;
  isPlaying: boolean;
  volume: number;
  onToggle: () => void;
  onVolumeChange: (value: number[]) => void;
};

export const SoundTrackCard = (props: Props) => {
  return (
    <article class="rounded-2xl border border-border/80 bg-white/[0.03] p-4 shadow-[0_20px_40px_-28px_rgba(2,6,23,0.9)] backdrop-blur-sm">
      <div class="mb-3 flex items-center gap-2">
        <span class="text-base leading-none" aria-hidden="true">
          {props.sound.emoji}
        </span>
        <h2 class="text-base font-medium text-white/95">{props.sound.name}</h2>
      </div>

      <div class="grid gap-3">
        <Button
          size="sm"
          onClick={props.onToggle}
          aria-label={props.isPlaying ? "Pause audio" : "Play audio"}
        >
          {props.isPlaying ? <Pause size={12} /> : <Play size={12} />}
          {props.isPlaying ? "Pause" : "Play"}
        </Button>

        <Slider
          class="min-w-0 flex-1"
          value={[props.volume]}
          minValue={0}
          maxValue={100}
          step={1}
          label="Track volume"
          onChange={props.onVolumeChange}
        />
      </div>
    </article>
  );
};
