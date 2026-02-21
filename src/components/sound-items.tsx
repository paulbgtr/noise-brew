import { For } from "solid-js";

import { AudioPlayer } from "~/components/audio-player";

export const SoundItems = () => {
  const sounds = [
    { emoji: "🍃", name: "Forest", path: "/audio/forest.mp3" },
    { emoji: "🔥", name: "Fireplace", path: "/audio/fireplace.mp3" },
    { emoji: "☕", name: "Cafe", path: "/audio/cafe.mp3" },
    { emoji: "🌊", name: "Ocean", path: "/audio/ocean.mp3" },
    { emoji: "🌧️", name: "Rain", path: "/audio/rain.mp3" },
  ];

  return (
    <div class="grid gap-3 sm:grid-cols-2">
      <For each={sounds}>
        {(sound) => (
          <article class="rounded-2xl border border-border/80 bg-white/[0.03] p-4 shadow-[0_20px_40px_-28px_rgba(2,6,23,0.9)] backdrop-blur-sm">
            <div class="mb-3 flex items-center gap-2">
              <span class="text-base leading-none" aria-hidden="true">
                {sound.emoji}
              </span>
              <h2 class="text-base font-medium text-white/95">{sound.name}</h2>
            </div>

            <AudioPlayer soundPath={sound.path} />
          </article>
        )}
      </For>
    </div>
  );
};
