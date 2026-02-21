import { createMemo, createSignal } from "solid-js";

import { SOUND_CATALOG } from "~/data/sound-catalog";

export const createPlayerState = () => {
  const [masterVolume, setMasterVolume] = createSignal(100);
  const [isMuted, setIsMuted] = createSignal(false);
  const [trackVolumes, setTrackVolumes] = createSignal<number[]>(
    SOUND_CATALOG.map(() => 100),
  );
  const [isTrackPlaying, setIsTrackPlaying] = createSignal<boolean[]>(
    SOUND_CATALOG.map(() => false),
  );

  const activeTrackNames = createMemo(() =>
    SOUND_CATALOG.filter((_, index) => isTrackPlaying()[index]).map(
      (sound) => sound.name,
    ),
  );

  const setTrackPlaying = (index: number, next: boolean) => {
    setIsTrackPlaying((prev) => {
      const updated = [...prev];
      updated[index] = next;
      return updated;
    });
  };

  return {
    activeTrackNames,
    isMuted,
    isTrackPlaying,
    masterVolume,
    setIsMuted,
    setIsTrackPlaying,
    setMasterVolume,
    setTrackPlaying,
    setTrackVolumes,
    trackVolumes,
  };
};

export type PlayerState = ReturnType<typeof createPlayerState>;
