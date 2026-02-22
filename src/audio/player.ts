import { createPlayerEngine } from "~/audio/player/engine";
import { createPresetManager } from "~/audio/player/presets";
import { createPlayerState } from "~/audio/player/state";

export const createPlayer = () => {
  const state = createPlayerState();
  const engine = createPlayerEngine(state);
  const presets = createPresetManager({
    applyMixState: engine.applyMixState,
    initializePlayers: engine.initializePlayers,
    state,
  });

  return {
    activeTrackNames: state.activeTrackNames,
    hasHydratedPresets: state.hasHydratedPresets,
    isMuted: state.isMuted,
    isTrackPlaying: state.isTrackPlaying,
    masterVolume: state.masterVolume,
    presets: state.presets,
    selectedPresetId: state.selectedPresetId,
    trackVolumes: state.trackVolumes,
    ...engine,
    ...presets,
  };
};
