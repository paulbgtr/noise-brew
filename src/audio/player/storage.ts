import { SOUND_CATALOG } from "~/data/sound-catalog";

import type { PlayerPreset } from "./types";

const PRESETS_STORAGE_KEY = "noise-brew.presets.v1";

const isBrowser = () => typeof window !== "undefined";

const normalizeBooleanList = (value: unknown, fallback = false) => {
  const list = Array.isArray(value) ? value : [];
  return SOUND_CATALOG.map((_, index) =>
    typeof list[index] === "boolean" ? list[index] : fallback,
  );
};

const normalizeVolumeList = (value: unknown, fallback = 100) => {
  const list = Array.isArray(value) ? value : [];
  return SOUND_CATALOG.map((_, index) => {
    const next = Number(list[index]);
    if (Number.isNaN(next)) return fallback;
    return Math.max(0, Math.min(100, Math.round(next)));
  });
};

const sanitizePreset = (value: unknown): PlayerPreset | null => {
  if (!value || typeof value !== "object") return null;

  const candidate = value as Partial<PlayerPreset>;
  const name =
    typeof candidate.name === "string" ? candidate.name.trim() : "Preset";
  const id =
    typeof candidate.id === "string" && candidate.id.length > 0
      ? candidate.id
      : "";

  if (!id || !name) return null;

  const masterVolume = Number(candidate.masterVolume);

  return {
    createdAt:
      typeof candidate.createdAt === "number" ? candidate.createdAt : Date.now(),
    id,
    isMuted: Boolean(candidate.isMuted),
    isTrackPlaying: normalizeBooleanList(candidate.isTrackPlaying),
    masterVolume: Number.isNaN(masterVolume)
      ? 100
      : Math.max(0, Math.min(100, Math.round(masterVolume))),
    name,
    trackVolumes: normalizeVolumeList(candidate.trackVolumes),
    updatedAt:
      typeof candidate.updatedAt === "number" ? candidate.updatedAt : Date.now(),
  };
};

export const readPresets = (): PlayerPreset[] => {
  if (!isBrowser()) return [];

  try {
    const raw = window.localStorage.getItem(PRESETS_STORAGE_KEY);
    if (!raw) return [];

    const parsed: unknown = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];

    return parsed
      .map((item) => sanitizePreset(item))
      .filter((preset): preset is PlayerPreset => preset !== null);
  } catch {
    return [];
  }
};

export const writePresets = (presets: PlayerPreset[]) => {
  if (!isBrowser()) return;

  window.localStorage.setItem(PRESETS_STORAGE_KEY, JSON.stringify(presets));
};
