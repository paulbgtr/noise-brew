import { createMemo, createSignal } from "solid-js";

import { SOUND_CATALOG } from "~/data/sound-catalog";

import type { PlayerPreset } from "./types";

export const createPlayerState = () => {
  const [masterVolume, setMasterVolume] = createSignal(100);
  const [isMuted, setIsMuted] = createSignal(false);
  const [trackVolumes, setTrackVolumes] = createSignal<number[]>(
    SOUND_CATALOG.map(() => 100),
  );
  const [isTrackPlaying, setIsTrackPlaying] = createSignal<boolean[]>(
    SOUND_CATALOG.map(() => false),
  );
  const [hasPausedTracks, setHasPausedTracks] = createSignal(false);
  const [presets, setPresets] = createSignal<PlayerPreset[]>([]);
  const [selectedPresetId, setSelectedPresetId] = createSignal<string | null>(
    null,
  );
  const [hasHydratedPresets, setHasHydratedPresets] = createSignal(false);

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
    hasPausedTracks,
    hasHydratedPresets,
    isMuted,
    isTrackPlaying,
    masterVolume,
    presets,
    selectedPresetId,
    setHasHydratedPresets,
    setHasPausedTracks,
    setIsMuted,
    setIsTrackPlaying,
    setMasterVolume,
    setPresets,
    setSelectedPresetId,
    setTrackPlaying,
    setTrackVolumes,
    trackVolumes,
  };
};

export type PlayerState = ReturnType<typeof createPlayerState>;
