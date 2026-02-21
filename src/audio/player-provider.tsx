import { createContext, useContext } from "solid-js";
import type { ParentProps } from "solid-js";
import { createPlayer } from "./player";

const PlayerContext = createContext<ReturnType<typeof createPlayer>>();

export function PlayerProvider(props: ParentProps) {
  const player = createPlayer();

  return (
    <PlayerContext.Provider value={player}>
      {props.children}
    </PlayerContext.Provider>
  );
}

export function usePlayer() {
  const ctx = useContext(PlayerContext);
  if (!ctx) throw new Error("Player context missing");
  return ctx;
}
