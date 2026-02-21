import { Button } from "./ui/button";
import { createSignal, onCleanup } from "solid-js";
import { Howl } from "howler";

type Props = {
  soundPath: string;
};

export const AudioPlayer = ({ soundPath }: Props) => {
  const [isPlaying, setIsPlaying] = createSignal(false);

  const sound = new Howl({
    src: [soundPath],
    onplay: () => setIsPlaying(true),
    onpause: () => setIsPlaying(false),
    onstop: () => setIsPlaying(false),
    onend: () => setIsPlaying(false),
  });

  const toggle = () => {
    if (!sound) return;

    if (!isPlaying()) {
      return sound.play();
    }

    sound.pause();
  };

  onCleanup(() => {
    sound?.unload();
  });

  return <Button onClick={toggle}>{isPlaying() ? "Pause" : "Play"}</Button>;
};
