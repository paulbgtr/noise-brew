import { Button } from "@kobalte/core/button";
import { createSignal, onMount, onCleanup } from "solid-js";
import { Howl } from "howler";

export default function Home() {
  const [isPlaying, setIsPlaying] = createSignal(false);

  const sound = new Howl({
    src: ["/forest.mp3"],
    onplay: () => setIsPlaying(true),
    onpause: () => setIsPlaying(false),
    onstop: () => setIsPlaying(false),
    onend: () => setIsPlaying(false),
  });

  const toggle = () => {
    if (!sound) return;

    if (isPlaying()) {
      sound.pause();
    } else {
      sound.play();
    }
  };

  onCleanup(() => {
    sound?.unload();
  });

  return (
    <main>
      <Button onClick={toggle}>{isPlaying() ? "Pause" : "Play"}</Button>
    </main>
  );
}
