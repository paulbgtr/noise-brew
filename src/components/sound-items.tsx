import { For, onCleanup, onMount } from "solid-js";
import { MixerControls } from "~/components/mixer-controls";
import { PresetControls } from "~/components/preset-controls";
import { SOUND_CATALOG } from "~/data/sound-catalog";
import { SoundTrackCard } from "~/components/sound-track-card";

import { usePlayer } from "~/audio/player-provider";

export const SoundItems = () => {
  const {
    disposePlayers,
    handleTrackVolumeChange,
    initializePlayers,
    isTrackPlaying,
    toggleTrack,
    trackVolumes,
  } = usePlayer();

  onMount(() => {
    initializePlayers();
  });

  onCleanup(() => {
    disposePlayers();
  });

  return (
    <div class="grid gap-4 pb-32 sm:pb-36">
      <MixerControls />
      <PresetControls />

      <div class="grid gap-3 sm:grid-cols-2">
        <For each={SOUND_CATALOG}>
          {(sound, index) => (
            <SoundTrackCard
              sound={sound}
              isPlaying={isTrackPlaying()[index()]}
              volume={trackVolumes()[index()]}
              onToggle={() => toggleTrack(index())}
              onVolumeChange={(value) =>
                handleTrackVolumeChange(index(), value)
              }
            />
          )}
        </For>
      </div>
    </div>
  );
};
