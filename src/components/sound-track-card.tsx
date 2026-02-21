import { Pause, Play } from "lucide-solid";

import type { Sound } from "~/data/sound-catalog";
import { Button } from "~/components/ui/button";
import { Card } from "~/components/ui/card";
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
    <Card as="article" tone="subtle">
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
    </Card>
  );
};
