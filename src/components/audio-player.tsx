import { Button } from "./ui/button";
import { Slider } from "@kobalte/core/slider";
import { createSignal, onCleanup } from "solid-js";
import { Howl } from "howler";

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

  return (
    <div class="flex flex-col gap-4 w-60">
      <Button onClick={toggle}>{isPlaying() ? "Pause" : "Play"}</Button>

      <Slider
        value={[volume()]}
        minValue={0}
        maxValue={100}
        step={1}
        onChange={handleVolumeChange}
      >
        <div class="flex justify-between text-sm text-muted">
          <Slider.Label>Volume</Slider.Label>
          <Slider.ValueLabel />
        </div>

        <Slider.Track class="relative h-2 bg-border rounded-full">
          <Slider.Fill class="absolute h-full bg-primary rounded-full" />
          <Slider.Thumb class="block w-4 h-4 bg-white rounded-full shadow">
            <Slider.Input />
          </Slider.Thumb>
        </Slider.Track>
      </Slider>
    </div>
  );
};
