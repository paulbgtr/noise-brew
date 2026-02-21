import { Button } from "./ui/button";
import { Slider } from "./ui/slider";
import { createSignal, onCleanup } from "solid-js";
import { Howl } from "howler";
import { Play, Pause } from "lucide-solid";

type Props = {
  soundPath: string;
};

export const AudioPlayer = ({ soundPath }: Props) => {
  const [isPlaying, setIsPlaying] = createSignal(false);
  const [volume, setVolume] = createSignal(100);

  const sound = new Howl({
    src: [soundPath],
    volume: 1,
    onplay: () => setIsPlaying(true),
    onpause: () => setIsPlaying(false),
    onstop: () => setIsPlaying(false),
    onend: () => setIsPlaying(false),
  });

  const toggle = () => {
    if (!isPlaying()) {
      sound.play();
    } else {
      sound.pause();
    }
  };

  const handleVolumeChange = (value: number[]) => {
    const newVolume = value[0] / 100;
    setVolume(value[0]);
    sound.volume(newVolume);
  };

  onCleanup(() => {
    sound.unload();
  });

  const iconSize = 12;

  return (
    <div class="flex w-full items-center gap-3">
      <Button
        size="sm"
        onClick={toggle}
        aria-label={isPlaying() ? "Pause audio" : "Play audio"}
      >
        {isPlaying() ? <Pause size={iconSize} /> : <Play size={iconSize} />}
      </Button>

      <Slider
        class="min-w-0 flex-1"
        value={[volume()]}
        minValue={0}
        maxValue={100}
        step={1}
        label="Volume"
        onChange={handleVolumeChange}
      />
    </div>
  );
};
