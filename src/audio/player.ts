import { createPlayerEngine } from "~/audio/player/engine";
import { createPlayerState } from "~/audio/player/state";

export const createPlayer = () => {
  const state = createPlayerState();
  const engine = createPlayerEngine(state);

  return {
    activeTrackNames: state.activeTrackNames,
    isMuted: state.isMuted,
    isTrackPlaying: state.isTrackPlaying,
    masterVolume: state.masterVolume,
    trackVolumes: state.trackVolumes,
    ...engine,
  };
};
