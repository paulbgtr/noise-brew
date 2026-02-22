export type PlayerMixState = {
  isMuted: boolean;
  isTrackPlaying: boolean[];
  masterVolume: number;
  trackVolumes: number[];
};

export type PlayerPreset = PlayerMixState & {
  createdAt: number;
  id: string;
  name: string;
  updatedAt: number;
};
