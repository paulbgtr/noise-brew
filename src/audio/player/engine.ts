import { Howl } from "howler";

import { SOUND_CATALOG } from "~/data/sound-catalog";

import type { PlayerState } from "./state";

export const createPlayerEngine = (state: PlayerState) => {
  const players: Howl[] = [];

  const effectiveVolume = (
    trackVolume: number,
    muted = state.isMuted(),
    master = state.masterVolume(),
  ) => {
    if (muted) return 0;
    return (trackVolume / 100) * (master / 100);
  };

  const applyTrackVolume = (
    index: number,
    trackVolume = state.trackVolumes()[index],
    muted = state.isMuted(),
    master = state.masterVolume(),
  ) => {
    const player = players[index];
    if (!player) return;
    player.volume(effectiveVolume(trackVolume, muted, master));
  };

  const applyAllVolumes = (
    muted = state.isMuted(),
    master = state.masterVolume(),
  ) => {
    for (let index = 0; index < players.length; index += 1) {
      applyTrackVolume(index, state.trackVolumes()[index], muted, master);
    }
  };

  const initializePlayers = () => {
    if (players.length > 0) return;

    SOUND_CATALOG.forEach((sound, index) => {
      const player = new Howl({
        src: [sound.path],
        loop: true,
        volume: effectiveVolume(state.trackVolumes()[index]),
        onplay: () => state.setTrackPlaying(index, true),
        onpause: () => state.setTrackPlaying(index, false),
        onstop: () => state.setTrackPlaying(index, false),
      });
      players.push(player);
    });
  };

  const disposePlayers = () => {
    players.forEach((player) => player.unload());
    players.length = 0;
    state.setIsTrackPlaying(SOUND_CATALOG.map(() => false));
  };

  const toggleTrack = (index: number) => {
    const player = players[index];
    if (!player) return;

    const currentlyPlaying = state.isTrackPlaying()[index];
    if (currentlyPlaying) {
      player.pause();
      state.setTrackPlaying(index, false);
      return;
    }

    player.play();
    state.setTrackPlaying(index, true);
  };

  const stopAll = () => {
    players.forEach((player, index) => {
      if (player.playing()) {
        player.stop();
      }
      state.setTrackPlaying(index, false);
    });
  };

  const playAll = () => {
    players.forEach((player, index) => {
      if (!player.playing()) {
        player.play();
      }
      state.setTrackPlaying(index, true);
    });
  };

  const handleTrackVolumeChange = (index: number, value: number[]) => {
    const nextVolume = value[0] ?? 0;
    state.setTrackVolumes((prev) => {
      const updated = [...prev];
      updated[index] = nextVolume;
      return updated;
    });
    applyTrackVolume(index, nextVolume);
  };

  const handleMasterVolumeChange = (value: number[]) => {
    const nextVolume = value[0] ?? 0;
    state.setMasterVolume(nextVolume);
    applyAllVolumes(state.isMuted(), nextVolume);
  };

  const toggleMute = () => {
    const nextMuted = !state.isMuted();
    state.setIsMuted(nextMuted);
    applyAllVolumes(nextMuted, state.masterVolume());
  };

  return {
    disposePlayers,
    handleMasterVolumeChange,
    handleTrackVolumeChange,
    initializePlayers,
    playAll,
    stopAll,
    toggleMute,
    toggleTrack,
  };
};
