export type Sound = {
  emoji: string;
  name: string;
  path: string;
};

export const SOUND_CATALOG: Sound[] = [
  { emoji: "🍃", name: "Forest", path: "/audio/forest.mp3" },
  { emoji: "🔥", name: "Fireplace", path: "/audio/fireplace.mp3" },
  { emoji: "☕", name: "Cafe", path: "/audio/cafe.mp3" },
  { emoji: "🌊", name: "Ocean", path: "/audio/ocean.mp3" },
  { emoji: "🌧️", name: "Rain", path: "/audio/rain.mp3" },
  { emoji: "💦", name: "River", path: "/audio/river.mp3" },
];
