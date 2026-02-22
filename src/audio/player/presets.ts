import { readPresets, writePresets } from "./storage";
import type { PlayerState } from "./state";
import type { PlayerMixState, PlayerPreset } from "./types";

type PresetManagerDeps = {
  applyMixState: (mixState: PlayerMixState) => void;
  initializePlayers: () => void;
  state: PlayerState;
};

const createPresetId = () =>
  typeof crypto !== "undefined" && "randomUUID" in crypto
    ? crypto.randomUUID()
    : `preset_${Date.now()}_${Math.floor(Math.random() * 1_000_000)}`;

const toMixState = (state: PlayerState): PlayerMixState => ({
  isMuted: state.isMuted(),
  isTrackPlaying: [...state.isTrackPlaying()],
  masterVolume: state.masterVolume(),
  trackVolumes: [...state.trackVolumes()],
});

export const createPresetManager = ({
  applyMixState,
  initializePlayers,
  state,
}: PresetManagerDeps) => {
  const hydratePresets = () => {
    if (state.hasHydratedPresets()) return;

    const presets = readPresets().sort((a, b) => b.updatedAt - a.updatedAt);
    state.setPresets(presets);
    state.setHasHydratedPresets(true);
  };

  const persistPresets = (updater: (prev: PlayerPreset[]) => PlayerPreset[]) => {
    state.setPresets((prev) => {
      const next = updater(prev);
      writePresets(next);
      return next;
    });
  };

  const saveCurrentAsPreset = (name: string) => {
    const cleanName = name.trim();
    if (!cleanName) return { ok: false as const, reason: "empty-name" };

    const now = Date.now();
    const mix = toMixState(state);

    persistPresets((prev) => [
      {
        ...mix,
        createdAt: now,
        id: createPresetId(),
        name: cleanName,
        updatedAt: now,
      },
      ...prev,
    ]);

    return { ok: true as const };
  };

  const applyPresetById = (presetId: string) => {
    const preset = state.presets().find((item) => item.id === presetId);
    if (!preset) return;

    initializePlayers();
    applyMixState(preset);
    state.setSelectedPresetId(preset.id);

    persistPresets((prev) =>
      prev.map((item) =>
        item.id === preset.id ? { ...item, updatedAt: Date.now() } : item,
      ),
    );
  };

  const deletePreset = (presetId: string) => {
    persistPresets((prev) => prev.filter((item) => item.id !== presetId));

    if (state.selectedPresetId() === presetId) {
      state.setSelectedPresetId(null);
    }
  };

  return {
    applyPresetById,
    deletePreset,
    hydratePresets,
    saveCurrentAsPreset,
  };
};
